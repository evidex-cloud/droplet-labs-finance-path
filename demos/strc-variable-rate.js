// 交互演示：STRC 恒温器——模拟 24 个月：SOFR 变动、信用（比特币）冲击，
// 发行人按 2025 年 10 月的 VWAP 框架调利率（受合同的降息上限与 SOFR 地板约束），
// 或按 2026-06-29 的新政策“维持利率 + 折价回购”；对照同票息的固定利率永续优先股。
// 价格模型（示意）：价格 = 可信度 κ × 理想每月重置价 +（1 − κ）× 永续年金价，封顶 101（赎回价）。
import { perpetuity, clamp, fmtPct, fmtNum, fmtUsd, tex } from "./_fin.js";
import { lineChart, chartBlock } from "./_chart.js";

const texv = (s) => String(s).replace(/\$/g, "\\$").replace(/,/g, "{,}").replace(/%/g, "\\%");

export default function mount(root, lang) {
  const en = lang === "en";
  const T = (zh, e) => (en ? e : zh);

  const M = 24, SOFR0 = 0.039, SPREAD0 = 0.081, R0 = 0.12, N0 = 10; // 名义 100 亿美元（约数）
  const AUTH = 2.0; // 回购授权上限 20 亿美元（2026-09-07 提高后的数字，覆盖全部数字信用证券）
  const st = { policy: "bands", sofr: 0, shock: 4, kappa: 70, buy: 0.3 };

  root.innerHTML = `
    <div class="demo">
      <div class="demo-head">${T("🌡️ STRC 恒温器：价格低于面值就加息，能把它拉回 100 吗？", "🌡️ The STRC thermostat: raise the rate when price is below par, and can it get back to 100?")}</div>
      <div class="demo-block">
        <label class="demo-label">${T("发行人政策", "Issuer policy")}</label>
        <div class="demo-seg" id="sv-pol">
          <button data-p="bands" class="on">${T("2025 年 10 月框架：看 VWAP 调利率", "Oct 2025 framework: set rate by VWAP")}</button>
          <button data-p="hold">${T("2026-06-29 政策：维持利率 + 折价回购", "Jun 29, 2026 policy: hold rate + buy back below par")}</button>
        </div>
      </div>
      <div class="demo-grid">
        <div class="demo-block">
          <label class="demo-label">${T("12 个月内 SOFR 变动", "Change in SOFR over 12 months")}${T("：", ": ")}<b id="sv-sofr-v"></b></label>
          <input class="demo-slider" id="sv-sofr" type="range" min="-2" max="2" step="0.25" value="${st.sofr}" />
          <label class="demo-label">${T("第 3 个月的信用冲击（比特币大跌，要求利差跳升，半衰期 6 个月）", "Credit shock in month 3 (bitcoin crash widens the required spread; 6-month half-life)")}${T("：", ": ")}<b id="sv-shock-v"></b></label>
          <input class="demo-slider" id="sv-shock" type="range" min="0" max="10" step="0.5" value="${st.shock}" />
        </div>
        <div class="demo-block">
          <label class="demo-label">${T("市场对“会继续调利率”的信任度 κ", "Market's trust that the rate will keep resetting (κ)")}${T("：", ": ")}<b id="sv-k-v"></b></label>
          <input class="demo-slider" id="sv-k" type="range" min="0" max="100" step="5" value="${st.kappa}" />
          <label class="demo-label">${T("回购力度（每月最多花费，十亿美元，仅新政策）", "Buyback pace (max spend per month, $B, new policy only)")}${T("：", ": ")}<b id="sv-buy-v"></b></label>
          <input class="demo-slider" id="sv-buy" type="range" min="0" max="1" step="0.05" value="${st.buy}" />
        </div>
      </div>
      <div class="stat-row" id="sv-stats"></div>
      <div class="demo-block" id="sv-c1"></div>
      <div class="demo-block" id="sv-c2"></div>
      <div class="demo-block"><div class="demo-log" id="sv-log"></div></div>
      <p class="demo-tip">${T(
        "先把信用冲击设为 0、SOFR 拖到 +2%：恒温器轻松把价格拉回 100，固定利率永续却一路下跌——这就是被“拿掉”的久期。再把信用冲击拖到 8 个百分点：旧框架要连续加息很多次，每年多付的股息快速增加；切到新政策，利率不动、价格停在面值下方更久，但公司用折价回购注销了名义金额。两条路都有代价。",
        "Set the credit shock to 0 and drag SOFR to +2%: the thermostat easily pulls the price back to 100 while the fixed-rate perpetual keeps sliding. That is duration engineered away. Now drag the credit shock to 8 points: the old framework has to raise the rate again and again, and the annual dividend bill climbs fast. Switch to the new policy: the rate stays put and the price sits below par for longer, but the company retires notional through discounted buybacks. Both roads have a cost."
      )}</p>
    </div>`;

  const q = (s) => root.querySelector(s);

  const run = () => {
    const kap = st.kappa / 100;
    let r = R0, N = N0, spent = 0, retired = 0, divPaid = 0, below = 0, maxRate = R0;
    const P = [], F = [], Rr = [], Y = [], S = [];
    for (let t = 0; t <= M; t++) {
      const sofr = SOFR0 + (st.sofr / 100) * Math.min(t, 12) / 12;
      const spread = SPREAD0 + (t >= 3 ? (st.shock / 100) * Math.pow(0.5, (t - 3) / 6) : 0);
      const y = sofr + spread;
      const reset = 100 * (1 + (r - y) / 12);
      const price = Math.min(101, kap * reset + (1 - kap) * perpetuity(100 * r, y));
      P.push(price); F.push(perpetuity(100 * R0, y)); Rr.push(r * 100); Y.push(y * 100); S.push(sofr * 100);
      if (price < 99) below++;
      divPaid += N * r / 12;
      // 月末决策
      if (st.policy === "bands") {
        const prevSofr = SOFR0 + (st.sofr / 100) * Math.min(Math.max(t - 1, 0), 12) / 12;
        const sofrDrop = Math.max(0, prevSofr - sofr);
        let next = r;
        if (price < 95) next = r + 0.005;
        else if (price < 99) next = r + 0.0025;
        else if (price >= 101) next = r - (0.0025 + sofrDrop); // 按框架降息，且合同上限为 25bp + SOFR 降幅
        r = Math.max(next, sofr); // 合同：不低于 SOFR
      } else if (price < 99 && st.buy > 0) {
        const spend = Math.min(st.buy, N * price / 100 * 0.1, AUTH - spent); // 每月上限、10% 流通量、授权余额
        const notional = spend / (price / 100);
        spent += spend; retired += notional; N -= notional;
      }
      maxRate = Math.max(maxRate, r);
    }
    return { P, F, Rr, Y, S, r, N, spent, retired, divPaid, below, maxRate };
  };

  const paint = () => {
    q("#sv-sofr-v").textContent = (st.sofr > 0 ? "+" : "") + st.sofr.toFixed(2) + "%";
    q("#sv-shock-v").textContent = "+" + st.shock.toFixed(1) + T(" 个百分点", " pts");
    q("#sv-k-v").textContent = st.kappa + "%";
    q("#sv-buy-v").textContent = fmtUsd(st.buy, 2) + "B";
    const s = run();
    const minP = Math.min(...s.P), minF = Math.min(...s.F);
    const y0 = SOFR0 + SPREAD0, kap = st.kappa / 100;
    const dEff = kap * (1 / 12) + (1 - kap) * (1 / y0);
    const annualNow = s.N * s.r * 1000; // 百万美元

    q("#sv-stats").innerHTML = `
      <div class="stat"><div class="k">${T("STRC 最低价", "STRC low")}</div><div class="v ${minP < 99 ? "neg" : "pos"}">${fmtUsd(minP, 2)}</div></div>
      <div class="stat"><div class="k">${T("固定 12% 永续最低价", "Fixed 12% perpetual low")}</div><div class="v neg">${fmtUsd(minF, 2)}</div></div>
      <div class="stat"><div class="k">${T("低于 99 美元的月数", "Months below $99")}</div><div class="v">${s.below}</div></div>
      <div class="stat"><div class="k">${T("期末股息率", "Rate at the end")}</div><div class="v acc">${fmtPct(s.r, 2)}</div></div>
      <div class="stat"><div class="k">${T("期末年度股息", "Annual dividends at end")}</div><div class="v">${fmtUsd(annualNow, 0)}M</div></div>
      <div class="stat"><div class="k">${T("有效久期（期初）", "Effective duration (start)")}</div><div class="v">${fmtNum(dEff, 1)} ${T("年", "yrs")}</div></div>`;

    const at = (arr) => (x) => arr[clamp(Math.round(x), 0, M)];
    const c1 = lineChart({ fns: [{ f: at(s.P), cls: "line" }, { f: at(s.F), cls: "line3" }, { f: () => 100, cls: "line4" }], lo: 0, hi: M, xlabel: T("月", "month"), uid: "sv1" });
    q("#sv-c1").innerHTML = `<div class="demo-label">${T("价格（美元，名义 100）", "Price ($, stated 100)")}</div>` +
      chartBlock(c1, [["var(--orange)", "STRC"], ["var(--red)", T("同票息固定利率永续", "Fixed perpetual, same coupon")], ["var(--green)", T("面值 100", "Par 100")]]);
    const c2 = lineChart({ fns: [{ f: at(s.Rr), cls: "line5" }, { f: at(s.Y), cls: "line2" }, { f: at(s.S), cls: "line4" }], lo: 0, hi: M, xlabel: T("月", "month"), forceZero: true, uid: "sv2" });
    q("#sv-c2").innerHTML = `<div class="demo-label">${T("利率（%）", "Rates (%)")}</div>` +
      chartBlock(c2, [["var(--btc)", T("STRC 股息率", "STRC dividend rate")], ["var(--blue)", T("市场要求收益率", "Required yield")], ["var(--green)", "1M SOFR"]]);

    const lines = [];
    lines.push(T(
      `期初（约数）：${tex(String.raw`\underbrace{3.9\%}_{\text{SOFR}} + \underbrace{8.1\ \text{个百分点}}_{\text{比特币信用利差}} = \underbrace{12.0\%}_{\text{要求收益率}}`)}，与 12% 股息率相等，价格在 100。`,
      `Start (approx.): ${tex(String.raw`\underbrace{3.9\%}_{\text{SOFR}} + \underbrace{8.1\ \text{pts}}_{\text{bitcoin credit spread}} = \underbrace{12.0\%}_{\text{required yield}}`)}, equal to the 12% rate, so the price sits at 100.`
    ));
    const endP = s.P[M], perHalf = (100 * s.r) / 24;
    lines.push(`${T("期末：", "At the end: ")}${tex(String.raw`\text{${T("每半月股息", "half-month dividend")}} = \dfrac{\$100 \times ${texv(fmtPct(s.r, 2))}}{24} = ${texv(fmtUsd(perHalf, 4))}`)}${T("；", "; ")}${tex(String.raw`\text{${T("当前收益率", "current yield")}} = \dfrac{\$100 \times ${texv(fmtPct(s.r, 2))}}{${texv(fmtUsd(endP, 2))}} \approx ${texv(fmtPct((100 * s.r) / endP, 2))}`)}`);
    if (st.policy === "bands") {
      lines.push(`${T("旧框架下股息率最高升到", "Under the old framework the rate peaked at")} <b>${fmtPct(s.maxRate, 2)}</b>${T(`；每加 25 个基点，按 100 亿美元名义每年多付约 ${tex(String.raw`0.25\% \times 100\ \text{亿} = 2{,}500\ \text{万}`)} 美元。`, `; each 25 bp costs about ${tex(String.raw`0.25\% \times \$10\text{B} = \$25\text{M}`)} a year on $10B of notional.`)}`);
      if (st.sofr < 0) lines.push(`${T(`SOFR 下降时，降息仍受“${tex(String.raw`\text{每月降幅} \le 25\ \text{bp} + \text{SOFR 降幅}`)}”与“不低于 SOFR”约束——利率只能慢慢往下走。`, "As SOFR falls, cuts are still limited to 25 bp plus the SOFR decline a month, and never below SOFR, so the rate can only drift down slowly.")}`);
    } else {
      lines.push(`${T("新政策：利率维持", "New policy: the rate holds at")} ${fmtPct(s.r, 2)}${T("；折价回购花费", "; discounted buybacks spent")} ${fmtUsd(s.spent, 2)}B${T("，注销名义", ", retiring")} ${fmtUsd(s.retired, 2)}B ${T("名义，折价收益约", "of notional, a discount capture of about")} ${fmtUsd((s.retired - s.spent) * 1000, 0)}M${T("。", ".")}`);
      lines.push(`${T("（简化：真实政策每月仍综合评估是否调整，这里假设利率一直不动；回购总额以 20 亿美元授权为上限。）", "(Simplified: the real policy still reviews the rate monthly; here the rate never moves, and buybacks are capped at the $2.0B authorization.)")}`);
      if (s.below > 6) lines.push(`<span class="warn">${T("价格在面值下方停留了", "The price stayed below par for")} ${s.below} ${T("个月——恒温器没开，靠回购托底。", "months: the thermostat is off and buybacks are doing the supporting.")}</span>`);
    }
    if (st.shock === 0 && st.sofr !== 0) lines.push(`<span class="ok">${T("只有利率变动、没有信用冲击时，STRC 的价格几乎不动，而固定永续跌到", "With a rate move and no credit shock, STRC barely moves while the fixed perpetual falls to")} ${fmtUsd(minF, 2)}${T("：这就是被“拿掉”的久期。", ": duration engineered away.")}</span>`);
    if (st.kappa < 30) lines.push(`<span class="bad">${T("市场不相信会继续调利率（κ 很低）时，STRC 的定价就接近固定永续——恒温器的效果来自可信度。", "When the market doesn't trust further resets (low κ), STRC prices like a fixed perpetual: the thermostat works only if it is believed.")}</span>`);
    lines.push(`${T("24 个月累计支付股息约", "Dividends paid over 24 months: about")} ${fmtUsd(s.divPaid, 2)}B${T("（示意模型，非预测）。", " (illustrative model, not a forecast).")}`);
    q("#sv-log").innerHTML = lines.map((l) => `<div>${l}</div>`).join("");
  };

  root.querySelectorAll("#sv-pol button").forEach((b) => b.addEventListener("click", () => {
    st.policy = b.dataset.p;
    root.querySelectorAll("#sv-pol button").forEach((o) => o.classList.toggle("on", o === b));
    paint();
  }));
  const bind = (id, key) => q(id).addEventListener("input", (e) => { st[key] = +e.target.value; paint(); });
  bind("#sv-sofr", "sofr"); bind("#sv-shock", "shock"); bind("#sv-k", "kappa"); bind("#sv-buy", "buy");
  paint();
}
