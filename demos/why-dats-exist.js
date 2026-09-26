// 交互演示：DAT 的三台“套利机器”——卖溢价（增发买币）、卖波动率（0% 可转债定价）、卖收益率（优先股加杠杆）。
// 全部以橙子公司为底：10,000 BTC、比特币 10 万美元、1 亿股、每股比特币净值 10 美元。
import { issueAndBuy, btcGain, btcDollarGain, bondPrice, bsCall, netReserve, fmtNum, fmtPct, fmtUsd, fmtBig } from "./_fin.js";
import { lineChart, chartBlock } from "./_chart.js";

export default function mount(root, lang) {
  const en = lang === "en";
  const T = (zh, e) => (en ? e : zh);

  const BTC = 10000, SH = 100e6, P = 100000, NAVPS = (BTC * P) / SH; // 每股比特币净值 10 美元
  const S0 = 15, RF = 0.045;
  const st = {
    mode: "prem",
    prem: { m: 1.5, k: 10 },
    conv: { vol: 60, y: 8, T: 5, cp: 67 },
    pref: { X: 100, r: 10, g: 15, t: 5 },
  };

  root.innerHTML = `
    <div class="demo">
      <div class="demo-head">${T("⚙️ DAT 的三台机器：卖溢价、卖波动率、卖收益率", "⚙️ A DAT's three machines: selling premium, volatility and yield")}</div>
      <div class="demo-block">
        <div class="demo-seg" id="wd-seg">
          <button data-m="prem" class="on">${T("① 溢价增发", "① Premium issuance")}</button>
          <button data-m="conv">${T("② 0% 可转债", "② 0% convertible")}</button>
          <button data-m="pref">${T("③ 优先股杠杆", "③ Preferred leverage")}</button>
        </div>
      </div>
      <div id="wd-ctrl" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(210px,1fr));gap:10px"></div>
      <div class="stat-row" id="wd-stats"></div>
      <div id="wd-chart"></div>
      <div class="demo-log" id="wd-log"></div>
      <p class="demo-tip">${T(
        "机器①：把 mNAV 拖过 1.0，看 BTC Yield 从负翻正——增厚与稀释只隔一条线。机器②：把波动率从 40% 拖到 80%，看 0% 票息的可转债从“没人要”变成“值面值”。机器③：注意发行当天“BTC Yield”立刻为正，而 Strategy 2026 口径的每股净比特币纹丝不动——真正的输赢要看比特币回报能否跑赢股息率。",
        "Machine ①: drag mNAV across 1.0 and watch BTC Yield flip from negative to positive — accretion and dilution are one line apart. Machine ②: drag volatility from 40% to 80% and watch a 0% coupon convertible go from unsellable to worth par. Machine ③: note that on issuance day “BTC Yield” jumps while net BTC per share on Strategy's 2026 definition doesn't move at all — the real verdict depends on whether bitcoin's return beats the dividend rate."
      )}</p>
    </div>`;

  const q = (s) => root.querySelector(s);
  const DEF = {
    prem: [["m", T("市值口径 mNAV", "Basic market-cap mNAV"), 0.5, 3, 0.05, (v) => fmtNum(v, 2) + "x"], ["k", T("增发比例（占现有股数 %）", "Issuance (% of existing shares)"), 1, 50, 1, (v) => v + "%"]],
    conv: [["vol", T("股票隐含波动率（%）", "Stock implied volatility (%)"), 20, 120, 1, (v) => v + "%"], ["y", T("信用收益率（折现债券地板，%）", "Credit yield for the bond floor (%)"), 4, 15, 0.5, (v) => v + "%"], ["T", T("期限（年）", "Term (years)"), 2, 10, 1, (v) => v], ["cp", T("转股溢价（%）", "Conversion premium (%)"), 10, 150, 1, (v) => v + "%"]],
    pref: [["X", T("发行优先股（百万美元）", "Preferred issued ($M)"), 50, 500, 10, (v) => fmtUsd(v) + "M"], ["r", T("股息率（%）", "Dividend rate (%)"), 6, 14, 0.25, (v) => fmtNum(v, 2) + "%"], ["g", T("比特币年化回报（%）", "Bitcoin annual return (%)"), -20, 60, 1, (v) => v + "%"], ["t", T("持有年限", "Horizon (years)"), 1, 10, 1, (v) => v]],
  };

  const build = () => {
    const s = st[st.mode];
    q("#wd-ctrl").innerHTML = DEF[st.mode].map(([k, lab, lo, hi, step]) => `
      <div class="demo-block" style="margin:6px 0">
        <label class="demo-label">${lab}${T("：", ": ")}<b id="wd-v-${k}"></b></label>
        <input class="demo-slider" type="range" data-k="${k}" min="${lo}" max="${hi}" step="${step}" value="${s[k]}" />
      </div>`).join("");
    q("#wd-ctrl").querySelectorAll("[data-k]").forEach((el) => el.addEventListener("input", () => { s[el.dataset.k] = +el.value; paint(); }));
  };
  const stats = (arr) => arr.map(([k, v, c]) => `<div class="stat"><div class="k">${k}</div><div class="v ${c || ""}">${v}</div></div>`).join("");
  const labels = () => DEF[st.mode].forEach(([k, , , , , f]) => { q("#wd-v-" + k).textContent = f(st[st.mode][k]); });

  const convValue = (vol, y, Tm, cp, coupon = 0) => {
    const K = S0 * (1 + cp / 100), ratio = 1000 / K;
    const floor = bondPrice(1000, coupon, y / 100, Tm, 1);
    const opt = ratio * bsCall(S0, K, Tm, RF, vol / 100);
    return { K, ratio, floor, opt, total: floor + opt };
  };

  const paintPrem = () => {
    const { m, k } = st.prem;
    const px = m * NAVPS, n = (k / 100) * SH;
    const r = issueAndBuy({ btc: BTC, shares: SH, btcPrice: P, px, newShares: n });
    const y = r.change;
    const transfer = (px - r.bps1 * P) * n; // 新股东多付、转给老股东的美元
    q("#wd-stats").innerHTML = stats([
      [T("增发价", "Issue price"), fmtUsd(px, 2), ""],
      [T("每股聪数 前→后", "Sats per share before → after"), fmtNum(r.bps0 * 1e8, 0) + " → " + fmtNum(r.bps1 * 1e8, 0), ""],
      ["BTC Yield", (y >= 0 ? "+" : "") + fmtPct(y, 2), y >= 0 ? "pos" : "neg"],
      ["BTC Gain", fmtNum(btcGain(BTC, y), 0) + " BTC", y >= 0 ? "pos" : "neg"],
      ["BTC $ Gain", (y >= 0 ? "$" : "−$") + fmtBig(Math.abs(btcDollarGain(BTC, y, P)), 1), y >= 0 ? "pos" : "neg"],
    ]);
    const ch = lineChart({ fns: [{ f: (x) => issueAndBuy({ btc: BTC, shares: SH, btcPrice: P, px: x * NAVPS, newShares: n }).change * 100, cls: "line5" }], lo: 0.5, hi: 3, xlabel: T("市值口径 mNAV", "Basic mNAV"), markerX: m, markerLabel: fmtNum(m, 2) + "x", forceZero: true, uid: "wdp" });
    q("#wd-chart").innerHTML = chartBlock(ch, [["var(--btc)", T("每股比特币变化（%）", "Change in BTC per share (%)")]]);
    const lines = [];
    lines.push(`${T("以 ", "Sell ")}${fmtUsd(px, 2)}${T(" 增发 ", " × ")}${fmtBig(n, 1)}${T(" 股，募得 ", " shares, raise ")}$${fmtBig(px * n, 2)} → ${T("买入 ", "buy ")}${fmtNum((px * n) / P, 0)} BTC${T("；新旧每股比特币之比 = (1 + k·m) ÷ (1 + k) = ", "; new/old BTC per share = (1 + k·m) ÷ (1 + k) = ")}<b>${fmtNum(1 + y, 4)}</b>`);
    lines.push(transfer >= 0
      ? `<span class="ok">${T("新股东比他们得到的比特币多付了约 ", "New holders paid about ")}$${fmtBig(transfer, 1)}${T("——这笔钱变成了老股东的每股比特币（财富转移，不是凭空创造）。", " more than the bitcoin they received — that money became the old holders' bitcoin per share (a transfer, not creation).")}</span>`
      : `<span class="bad">${T("新股东买到的比特币比付出的多约 ", "New holders received about ")}$${fmtBig(-transfer, 1)}${T("——老股东被稀释了。mNAV < 1 时增发买币是在“倒着转”。", " more bitcoin than they paid for — old holders are diluted. Below 1x mNAV, issuing to buy bitcoin runs the machine backwards.")}</span>`);
    q("#wd-log").innerHTML = lines.map((l) => `<div>${l}</div>`).join("");
  };

  const paintConv = () => {
    const { vol, y, T: Tm, cp } = st.conv;
    const v = convValue(vol, y, Tm, cp);
    // 反解：给定其他条件，value = 1000 时所需的波动率
    let lo = 0.01, hi = 3;
    for (let i = 0; i < 80; i++) { const mid = (lo + hi) / 2; if (convValue(mid * 100, y, Tm, cp).total < 1000) lo = mid; else hi = mid; }
    const beVol = (lo + hi) / 2;
    // 反解：当前波动率下，要值面值需要多少票息
    let cl = 0, chh = 0.3;
    for (let i = 0; i < 80; i++) { const mid = (cl + chh) / 2; if (convValue(vol, y, Tm, cp, mid).total < 1000) cl = mid; else chh = mid; }
    const needC = v.total >= 1000 ? 0 : (cl + chh) / 2;
    q("#wd-stats").innerHTML = stats([
      [T("转股价", "Conversion price"), fmtUsd(v.K, 2), ""],
      [T("债券地板", "Bond floor"), fmtUsd(v.floor, 0), ""],
      [T("期权价值（" + fmtNum(v.ratio, 1) + " 股）", "Option value (" + fmtNum(v.ratio, 1) + " shares)"), fmtUsd(v.opt, 0), "acc"],
      [T("0% 票息可转债价值", "Value of 0% convert"), fmtUsd(v.total, 0), v.total >= 1000 ? "pos" : "neg"],
      [T("值面值所需波动率", "Volatility needed for par"), beVol < 2.99 ? fmtPct(beVol, 0) : "> 300%", ""],
    ]);
    const ch = lineChart({ fns: [{ f: (x) => convValue(x, y, Tm, cp).total, cls: "line" }, { f: () => 1000, cls: "line3" }, { f: (x) => convValue(x, y, Tm, cp).floor, cls: "line2" }], lo: 20, hi: 120, xlabel: T("隐含波动率（%）", "Implied volatility (%)"), markerX: vol, markerLabel: vol + "%", uid: "wdc" });
    q("#wd-chart").innerHTML = chartBlock(ch, [["var(--orange)", T("可转债价值（每 1,000 美元面值）", "Convertible value (per $1,000 face)")], ["var(--red)", T("面值 1,000", "Par 1,000")], ["var(--blue)", T("债券地板", "Bond floor")]]);
    const lines = [];
    lines.push(`${T("每 1,000 美元面值 = 债券地板 ", "Per $1,000 face = bond floor ")}${fmtUsd(v.floor, 0)}${T("（0% 票息、", " (0% coupon, ")}${Tm}${T(" 年、按 ", " years, discounted at ")}${y}%${T(" 折现）+ ", ") + ")}${fmtNum(v.ratio, 1)}${T(" 张行权价 ", " calls struck at ")}${fmtUsd(v.K, 2)}${T(" 的看涨期权 ", " worth ")}${fmtUsd(v.opt, 0)}`);
    lines.push(v.total >= 1000
      ? `<span class="ok">${T("在这个波动率下，0% 票息就够了：公司是在把自己股票的波动率卖个好价钱。", "At this volatility a 0% coupon is enough: the company is selling its own stock's volatility at a good price.")}</span>`
      : `<span class="bad">${T("波动率不够高：要按面值卖出，每年约需 ", "Volatility is too low: to sell at par the company would need a coupon of about ")}${fmtPct(needC, 2)}${T(" 的票息。", " a year.")}</span>`);
    lines.push(`<span class="warn">${T("简化：布莱克-斯科尔斯、无风险利率 4.5%、不计稀释与回售权；真实定价见阶段 17.2。", "Simplified: Black–Scholes, 4.5% risk-free rate, no dilution or put rights; real pricing in Stage 17.2.")}</span>`);
    q("#wd-log").innerHTML = lines.map((l) => `<div>${l}</div>`).join("");
  };

  const paintPref = () => {
    const { X, r, g, t } = st.pref;
    const Xd = X * 1e6, rr = r / 100, gg = g / 100;
    const nav = BTC * P, prefOld = 150e6, cash = 30e6, conv = 150e6;
    const yieldIssue = (BTC + Xd / P) / BTC - 1; // 不发新股，每股比特币上升
    const nr0 = netReserve(nav, conv, prefOld, cash), nr1 = netReserve(nav + Xd, conv, prefOld + Xd, cash);
    const gain = Xd * (Math.pow(1 + gg, t) - 1 - rr * t);
    const beG = Math.pow(1 + rr * t, 1 / t) - 1;
    q("#wd-stats").innerHTML = stats([
      [T("发行当天 BTC Yield", "BTC Yield on issue day"), "+" + fmtPct(yieldIssue, 2), "pos"],
      [T("发行当天 每股净比特币变化", "Net BTC/share change on issue day"), fmtPct(nr1 / nr0 - 1, 2), ""],
      [T("年度新增股息", "Added annual dividends"), "$" + fmtBig(Xd * rr, 1), "neg"],
      [T("持有期满对普通股的净增值", "Net gain to common at horizon"), (gain >= 0 ? "+$" : "−$") + fmtBig(Math.abs(gain), 1), gain >= 0 ? "pos" : "neg"],
      [T("不赚不亏的比特币年化回报", "Break-even bitcoin return"), fmtPct(beG, 1), "acc"],
    ]);
    const ch = lineChart({ fns: [{ f: (x) => (Xd * (Math.pow(1 + x / 100, t) - 1 - rr * t)) / 1e6, cls: "line4" }], lo: -20, hi: 60, xlabel: T("比特币年化回报（%）", "Bitcoin annual return (%)"), markerX: g, markerLabel: g + "%", forceZero: true, uid: "wdf" });
    q("#wd-chart").innerHTML = chartBlock(ch, [["var(--green)", T("对普通股的净增值（百万美元）", "Net gain to common ($M)")]]);
    const lines = [];
    lines.push(`${T("发行 ", "Issue ")}$${fmtBig(Xd, 0)}${T(" 优先股、买入 ", " of preferred, buy ")}${fmtNum(Xd / P, 0)} BTC${T("：股数不变，所以 BTC Yield 立刻 +", ": the share count is unchanged, so BTC Yield jumps +")}${fmtPct(yieldIssue, 2)}${T("——但新增的 ", " — but the new ")}$${fmtBig(Xd, 0)}${T(" 优先索取权排在普通股前面，所以 Strategy 2026 口径的净储备纹丝不动。", " senior claim ranks ahead of the common, so net reserve on Strategy's 2026 definition doesn't move.")}`);
    lines.push(`${t}${T(" 年后：比特币部分值 ", t === 1 ? " year later: the bitcoin is worth " : " years later: the bitcoin is worth ")}$${fmtBig(Xd * Math.pow(1 + gg, t), 1)}${T("，累计付出股息 ", ", dividends paid total ")}$${fmtBig(Xd * rr * t, 1)} → ${gain >= 0 ? `<span class="ok">${T("比特币跑赢了股息，杠杆为普通股赚钱", "bitcoin beat the dividend; the leverage made money for the common")}</span>` : `<span class="bad">${T("比特币跑输了股息，杠杆在侵蚀普通股", "bitcoin lagged the dividend; the leverage is eroding the common")}</span>`}`);
    lines.push(`<span class="warn">${T("简化：股息按单利累计、从现金支付；Strategy 用 BTC Hurdle ARR 表达类似门槛（2026 年 8 月约 10.74%）。不构成投资建议。", "Simplified: dividends accrue as simple interest and are paid from cash; Strategy expresses a similar bar as BTC Hurdle ARR (about 10.74% in August 2026). Not investment advice.")}</span>`);
    q("#wd-log").innerHTML = lines.map((l) => `<div>${l}</div>`).join("");
  };

  const paint = () => { labels(); if (st.mode === "prem") paintPrem(); else if (st.mode === "conv") paintConv(); else paintPref(); };

  root.querySelectorAll("#wd-seg button").forEach((b) => b.addEventListener("click", () => {
    st.mode = b.dataset.m;
    root.querySelectorAll("#wd-seg button").forEach((o) => o.classList.toggle("on", o === b));
    build(); paint();
  }));
  build();
  paint();
}
