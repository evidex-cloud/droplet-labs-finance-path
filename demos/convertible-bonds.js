// 交互演示：可转债 = 债券地板 + 看涨期权。拖动股价、波动率、信用收益率与票息，
// 看可转债价值曲线、平价、转换溢价、Delta，反解“公允票息”，并模拟可转债套利的 Delta 对冲收益。
// 债券地板用共享引擎 bondPrice；期权部分用布莱克-斯科尔斯（_fin.js 未提供，这里局部实现）。
import { bondPrice, fmtNum, fmtPct, fmtUsd , enPunct, tex } from "./_fin.js";
import { lineChart, chartBlock } from "./_chart.js";

// 把格式化好的数字放进 LaTeX：千分位写成 {,}，$ 与 % 转义
const texv = (s) => String(s).replace(/\$/g, "\\$").replace(/,/g, "{,}").replace(/%/g, "\\%");

// 标准正态分布函数（Abramowitz–Stegun 近似）与看涨期权
const ncdf = (x) => {
  const t = 1 / (1 + 0.2316419 * Math.abs(x));
  const d = 0.3989423 * Math.exp(-x * x / 2);
  const p = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
  return x > 0 ? 1 - p : p;
};
function bsCall(S, K, T, r, v) {
  if (S <= 0) return { c: 0, delta: 0 };
  const d1 = (Math.log(S / K) + (r + v * v / 2) * T) / (v * Math.sqrt(T)), d2 = d1 - v * Math.sqrt(T);
  return { c: S * ncdf(d1) - K * Math.exp(-r * T) * ncdf(d2), delta: ncdf(d1) };
}

export default function mount(root, lang) {
  const en = lang === "en";
  const T = (zh, e) => (en ? e : zh);
  if (en) enPunct(root);

  const FACE = 1000, RF = 0.04;
  let st = { S: 15, K: 25, vol: 60, cy: 8, cpn: 0, yrs: 5, move: 10 };

  const sliders = [
    ["S", T("当前股价（美元）", "Share price ($)"), 1, 60, 0.5],
    ["K", T("转股价（美元）", "Conversion price ($)"), 10, 50, 0.5],
    ["vol", T("股价年化波动率（%）", "Stock volatility (%, annual)"), 15, 120, 1],
    ["cy", T("信用收益率（%，决定地板）", "Credit yield (%, sets the floor)"), 4, 20, 0.25],
    ["cpn", T("票息（%）", "Coupon (%)"), 0, 8, 0.25],
    ["yrs", T("期限（年）", "Term (years)"), 1, 7, 1],
  ];

  root.innerHTML = `
    <div class="demo">
      <div class="demo-head">${T("🔀 可转债拆解器：地板 + 期权", "🔀 Convertible dissector: floor + option")}</div>
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(190px,1fr));gap:10px">
        ${sliders.map(([k, lab, lo, hi, step]) => `
          <div class="demo-block" style="margin:6px 0">
            <label class="demo-label">${lab}${T("：", ": ")}<b id="cb-v-${k}"></b></label>
            <input class="demo-slider" type="range" data-k="${k}" min="${lo}" max="${hi}" step="${step}" value="${st[k]}" />
          </div>`).join("")}
      </div>
      <div class="stat-row">
        <div class="stat"><div class="k">${T("债券地板", "Bond floor")}</div><div class="v" id="cb-floor">–</div></div>
        <div class="stat"><div class="k">${T("期权价值", "Option value")}</div><div class="v" id="cb-opt">–</div></div>
        <div class="stat"><div class="k">${T("可转债价值", "Convertible value")}</div><div class="v acc" id="cb-val">–</div></div>
        <div class="stat"><div class="k">${T("平价", "Parity")}</div><div class="v" id="cb-par">–</div></div>
        <div class="stat"><div class="k">${T("转换溢价", "Conv. premium")}</div><div class="v" id="cb-prem">–</div></div>
        <div class="stat"><div class="k">Delta（${T("股", "sh")}）</div><div class="v" id="cb-delta">–</div></div>
      </div>
      <div class="demo-block" id="cb-chart"></div>
      <div class="demo-log" id="cb-log"></div>
      <div class="demo-block" style="margin-top:14px">
        <label class="demo-label">${T("可转债套利：买 1 张可转债、卖空 Delta 股。股价一次性变动", "Convertible arbitrage: long 1 bond, short delta shares. One-off share move of")} ±<b id="cb-mv"></b></label>
        <input class="demo-slider" type="range" id="cb-move" min="2" max="40" step="1" value="${st.move}" />
        <div class="cmp" id="cb-arb"></div>
      </div>
      <p class="demo-tip">${T(
        "把波动率从 30% 拖到 80%，盯着“公允票息”：同样的转股条款，高波动发行人几乎不用付利息。再把股价拖到 3 美元：可转债贴在地板上，变成一张低息债——此时再把信用收益率调高，看“下有底”的底怎么往下沉。",
        "Drag volatility from 30% to 80% and watch the fair coupon: with identical conversion terms, a volatile issuer pays almost no interest. Then drag the stock to $3: the convertible sits on its floor as a low-coupon bond — now raise the credit yield and watch that “floor” sink."
      )}</p>
    </div>`;

  const q = (s) => root.querySelector(s);

  const valueAt = (S, s = st) => {
    const ratio = FACE / s.K;
    const floor = bondPrice(FACE, s.cpn / 100, s.cy / 100, s.yrs);
    const o = bsCall(S, s.K, s.yrs, RF, s.vol / 100);
    return { floor, opt: ratio * o.c, val: floor + ratio * o.c, parity: ratio * S, delta: ratio * o.delta, ratio };
  };

  const fairCoupon = () => {
    const ratio = FACE / st.K, opt = ratio * bsCall(st.S, st.K, st.yrs, RF, st.vol / 100).c;
    if (bondPrice(FACE, 0, st.cy / 100, st.yrs) + opt >= FACE) return 0;
    let lo = 0, hi = 0.3;
    for (let i = 0; i < 80; i++) { const m = (lo + hi) / 2; if (bondPrice(FACE, m, st.cy / 100, st.yrs) + opt > FACE) hi = m; else lo = m; }
    return (lo + hi) / 2;
  };

  const paint = () => {
    const fmtV = { S: (v) => "$" + v, K: (v) => "$" + v, vol: (v) => v + "%", cy: (v) => v + "%", cpn: (v) => v + "%", yrs: (v) => v };
    for (const k of Object.keys(fmtV)) q("#cb-v-" + k).textContent = fmtV[k](st[k]);
    q("#cb-mv").textContent = st.move + "%";

    const v = valueAt(st.S);
    q("#cb-floor").textContent = fmtNum(v.floor, 0);
    q("#cb-opt").textContent = fmtNum(v.opt, 0);
    q("#cb-val").textContent = fmtNum(v.val, 0);
    q("#cb-par").textContent = fmtNum(v.parity, 0);
    q("#cb-prem").textContent = fmtPct(v.val / v.parity - 1, 1);
    q("#cb-delta").textContent = fmtNum(v.delta, 1);

    const hiS = Math.max(60, st.K * 2.2);
    const res = lineChart({
      fns: [
        { f: (S) => valueAt(S).val, cls: "line" },
        { f: () => v.floor, cls: "line2" },
        { f: (S) => (FACE / st.K) * S, cls: "line4" },
      ],
      lo: 0.5, hi: hiS, xlabel: T("股价（美元）", "Share price ($)"), markerX: st.S, markerLabel: T("当前", "now"), uid: "cb", forceZero: true,
    });
    q("#cb-chart").innerHTML = chartBlock(res, [
      ["var(--orange)", T("可转债价值", "Convertible value")],
      ["var(--blue)", T("债券地板", "Bond floor")],
      ["var(--green)", T("平价（立即转股价值）", "Parity (convert now)")],
    ]);

    const fc = fairCoupon();
    const share = v.delta / v.ratio;
    const persona = share < 0.35 ? ["bad", T("债性 / 接近破发：主要是信用与利率风险", "Bond-like / near busted: mainly credit and rate risk")]
      : share < 0.8 ? ["warn", T("平衡型：凸性最大，涨时跟得多、跌时跌得少", "Balanced: maximum convexity — more upside than downside")]
      : ["ok", T("股性：几乎一比一跟随股价", "Equity-like: moves almost one-for-one with the stock")];
    const lines = [];
    lines.push(`${tex(String.raw`\text{${T("转换比例", "Conversion ratio")}} = \dfrac{${texv(fmtNum(FACE, 0))}}{${st.K}} = \mathbf{${texv(fmtNum(v.ratio, 2))}}`)} ${T("股；发行 1.5 亿美元若全部转股，新增", "shares; if all $150M converted, new shares")} ${tex(String.raw`= \dfrac{${T(String.raw`1.5\ \text{亿美元}`, String.raw`\$150\text{M}`)}}{${texv(fmtUsd(st.K, 1))}} \approx \mathbf{${texv(fmtNum(150 / st.K, 2))}\text{M}}`)}（${T("原 1 亿股", "vs 100M today")}）`);
    lines.push(`${T("性格", "Personality")}：<span class="${persona[0]}">${persona[1]}</span>（${tex(String.raw`\Delta / \text{${T("转换比例", "ratio")}} = ${texv(fmtNum(share, 2))}`)}）`);
    lines.push(`${T("让可转债按面值 1,000 发行的“公允票息”", "Fair coupon for issuing at 1,000 par")} ${tex(String.raw`\approx \mathbf{${texv(fmtPct(fc, 2))}}`)}${fc === 0 ? T("——0% 票息已足够：期权的价值抵掉了全部利息。", " — 0% is already enough: the option pays for all the interest.") : T("（对照：同信用的普通债要 ", " (versus a straight bond at ") + st.cy + T("%）。", "%).")}`);
    if (st.S < st.K * 0.35) lines.push(`<span class="bad">${T("股价远低于转股价：到期（或回售日）很可能要用现金还本——风险在那一天，而不在票息。", "Stock far below conversion price: principal will probably have to be repaid in cash at maturity (or the put date) — that day is the risk, not the coupon.")}</span>`);
    q("#cb-log").innerHTML = lines.map((l) => `<div>${l}</div>`).join("");

    // 套利：买可转债，卖空 delta 股；股价瞬间 ±m
    const m = st.move / 100, cells = [];
    for (const sgn of [1, -1]) {
      const S1 = st.S * (1 + sgn * m), v1 = valueAt(S1);
      const bondPnl = v1.val - v.val, shortPnl = -v.delta * (S1 - st.S), tot = bondPnl + shortPnl;
      cells.push(`<div class="cmp-cell${tot > 0 ? " hl" : ""}"><h5>${sgn > 0 ? T("股价上涨", "Stock up") : T("股价下跌", "Stock down")} ${sgn > 0 ? "+" : "−"}${st.move}% → ${fmtUsd(S1, 2)}</h5>
        <div style="font-size:13.5px;line-height:1.7">${T("可转债", "Convertible")}：${bondPnl >= 0 ? "+" : ""}${fmtNum(bondPnl, 1)}<br>${T("空头", "Short")} ${fmtNum(v.delta, 1)} ${T("股", "sh")}：${shortPnl >= 0 ? "+" : ""}${fmtNum(shortPnl, 1)}<br><b>${T("合计", "Net")}：${tot >= 0 ? "+" : ""}${fmtNum(tot, 1)}</b></div></div>`);
    }
    q("#cb-arb").innerHTML = cells.join("") + `<div class="demo-meta" style="grid-column:1/-1">${T("涨跌两个方向合计都为正，就是做多 Gamma：套利者不押方向，靠波动赚钱（未计借券成本、利息与再对冲频率）。", "Net positive in both directions means long gamma: the arbitrageur takes no view on direction and earns from movement (ignoring borrow cost, carry and hedge frequency).")}</div>`;
  };

  root.querySelectorAll("[data-k]").forEach((el) => el.addEventListener("input", () => { st[el.dataset.k] = +el.value; paint(); }));
  q("#cb-move").addEventListener("input", (e) => { st.move = +e.target.value; paint(); });
  paint();
}
