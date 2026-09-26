// 交互演示：可转债套利损益——橙子公司的 0% 可转债（面值 1,000、40 股、转股价 25、5 年）。
// 基金按“隐含波动率”买入、卖空 Delta 股票对冲，股价按“已实现波动率”走一条可复现的随机路径（1 年、252 天），
// 比较：对冲（每日 / 每周 / 不调仓）与不对冲的损益；把损益拆成“债底增值”与“期权 + 对冲”两部分。
import { bsCall, pv, rng, randn, stdev, fmtPct, fmtNum, fmtUsd } from "./_fin.js";
import { lineChart, chartBlock } from "./_chart.js";

export default function mount(root, lang) {
  const en = lang === "en";
  const T = (zh, e) => (en ? e : zh);

  const FACE = 1000, RATIO = 40, K = 25, TERM = 5, R = 0.045, Y = 0.08, S0 = 15, DAYS = 252;
  const st = { iv: 70, rv: 90, drift: 0, hedge: "daily", seed: 7 };

  root.innerHTML = `
    <div class="demo">
      <div class="demo-head">${T("🎢 可转债套利：多可转债、空 Delta，收割比特币的波动率", "🎢 Convertible arbitrage: long the convert, short delta, harvest bitcoin's volatility")}</div>
      <div class="demo-grid">
        <div class="demo-block">
          <label class="demo-label">${T("买入时的隐含波动率（决定买价与对冲比例）", "Implied volatility at purchase (sets the price paid and the hedge)")}${T("：", ": ")}<b id="cv-iv-v"></b></label>
          <input class="demo-slider" id="cv-iv" type="range" min="30" max="130" step="5" value="${st.iv}" />
          <label class="demo-label">${T("之后股价实际的波动率（已实现）", "Volatility the stock actually delivers (realized)")}${T("：", ": ")}<b id="cv-rv-v"></b></label>
          <input class="demo-slider" id="cv-rv" type="range" min="20" max="150" step="5" value="${st.rv}" />
        </div>
        <div class="demo-block">
          <label class="demo-label">${T("股价年化漂移（方向）", "Annual drift of the stock (direction)")}${T("：", ": ")}<b id="cv-dr-v"></b></label>
          <input class="demo-slider" id="cv-dr" type="range" min="-80" max="150" step="10" value="${st.drift}" />
          <label class="demo-label">${T("对冲调仓频率", "Rebalancing frequency")}</label>
          <div class="demo-seg" id="cv-hedge">
            <button data-h="daily" class="on">${T("每日", "Daily")}</button>
            <button data-h="weekly">${T("每周", "Weekly")}</button>
            <button data-h="none">${T("只在开头对冲一次", "Hedge once, never rebalance")}</button>
          </div>
          <div class="demo-btns" style="margin-top:8px"><button class="demo-btn" id="cv-seed">${T("🎲 换一条随机路径", "🎲 New random path")}</button></div>
        </div>
      </div>
      <div class="stat-row" id="cv-stats"></div>
      <div class="demo-block" id="cv-chart1"></div>
      <div class="demo-block" id="cv-chart2"></div>
      <div class="cmp" id="cv-cmp"></div>
      <div class="demo-block"><div class="demo-log" id="cv-log"></div></div>
      <p class="demo-tip">${T(
        "把漂移拖到 −50% 再拖到 +100%：不对冲的损益大起大落，对冲后的损益基本不跟方向走。再把“已实现波动率”拖到比隐含波动率低（比如隐含 70%、实际 40%）：对冲组合开始亏钱——套利基金赌的不是涨跌，是“实际晃得比定价时更猛”。",
        "Drag the drift to −50% and then to +100%: the unhedged P&L swings wildly while the hedged P&L barely follows direction. Then set realized volatility below implied (say 70% implied, 40% realized): the hedged book starts losing. The arbitrage fund isn't betting on direction; it's betting that the stock will shake harder than it was priced to."
      )}</p>
    </div>`;

  const q = (s) => root.querySelector(s);

  // 可转债价值（按隐含波动率估值）：债底 + 40 份看涨期权
  const floorAt = (tau) => pv(FACE, Y, tau);
  const convVal = (S, tau, iv) => floorAt(tau) + RATIO * bsCall(S, K, tau, R, iv);
  // Delta 用引擎的 bsCall 做数值差分，避免另写一套公式
  const deltaShares = (S, tau, iv) => { const h = S * 0.001; return RATIO * (bsCall(S + h, K, tau, R, iv) - bsCall(S - h, K, tau, R, iv)) / (2 * h); };

  const simulate = () => {
    const rand = rng(st.seed), iv = st.iv / 100, rv = st.rv / 100, mu = st.drift / 100, dt = 1 / DAYS;
    const S = [S0];
    for (let d = 1; d <= DAYS; d++) S.push(S[d - 1] * Math.exp((mu - 0.5 * rv * rv) * dt + rv * Math.sqrt(dt) * randn(rand)));
    const V0 = convVal(S0, TERM, iv);
    let n = deltaShares(S0, TERM, iv), hedgePnl = 0;
    const hedged = [0], unhedged = [0];
    for (let d = 1; d <= DAYS; d++) {
      hedgePnl += n * (S[d - 1] - S[d]); // 空头：股价跌则赚
      const tau = TERM - d * dt, V = convVal(S[d], tau, iv);
      unhedged.push(V - V0);
      hedged.push(V - V0 + hedgePnl);
      const rebal = st.hedge === "daily" || (st.hedge === "weekly" && d % 5 === 0);
      if (rebal) n = deltaShares(S[d], tau, iv);
    }
    const rets = S.slice(1).map((x, i) => Math.log(x / S[i]));
    const realized = stdev(rets) * Math.sqrt(DAYS);
    const floorGain = floorAt(TERM - 1) - floorAt(TERM);
    return { S, V0, n0: deltaShares(S0, TERM, iv), hedged, unhedged, realized, floorGain, Vend: convVal(S[DAYS], TERM - 1, iv) };
  };

  const paint = () => {
    q("#cv-iv-v").textContent = st.iv + "%";
    q("#cv-rv-v").textContent = st.rv + "%";
    q("#cv-dr-v").textContent = (st.drift > 0 ? "+" : "") + st.drift + "%";
    const s = simulate();
    const H = s.hedged[DAYS], U = s.unhedged[DAYS];

    q("#cv-stats").innerHTML = `
      <div class="stat"><div class="k">${T("买入价（每 1,000 面值）", "Price paid (per $1,000)")}</div><div class="v">${fmtUsd(s.V0, 0)}</div></div>
      <div class="stat"><div class="k">${T("初始卖空股数", "Shares shorted at start")}</div><div class="v">${fmtNum(s.n0, 1)}</div></div>
      <div class="stat"><div class="k">${T("一年后股价", "Stock after 1 year")}</div><div class="v">${fmtUsd(s.S[DAYS], 2)}</div></div>
      <div class="stat"><div class="k">${T("路径实测波动率", "Realized vol on this path")}</div><div class="v acc">${fmtPct(s.realized, 0)}</div></div>`;

    const px = (arr) => (x) => arr[Math.max(0, Math.min(DAYS, Math.round(x)))];
    const c1 = lineChart({ fns: [{ f: px(s.S), cls: "line5" }], lo: 0, hi: DAYS, xlabel: T("交易日", "trading day"), uid: "cv1" });
    q("#cv-chart1").innerHTML = `<div class="demo-label">${T("股价路径（美元）", "Stock price path ($)")}</div>` + chartBlock(c1, [["var(--btc)", T("橙子公司股价", "Orange Corp stock")]]);
    const c2 = lineChart({ fns: [{ f: px(s.hedged), cls: "line" }, { f: px(s.unhedged), cls: "line3" }], lo: 0, hi: DAYS, xlabel: T("交易日", "trading day"), forceZero: true, uid: "cv2" });
    q("#cv-chart2").innerHTML = `<div class="demo-label">${T("累计损益（每 1,000 美元面值）", "Cumulative P&L (per $1,000 face)")}</div>` +
      chartBlock(c2, [["var(--orange)", T("对冲后", "Hedged")], ["var(--red)", T("只买可转债、不对冲", "Convert only, unhedged")]]);

    const optHedge = H - s.floorGain;
    q("#cv-cmp").innerHTML = `
      <div class="cmp-cell hl"><h5>${T("对冲组合（多可转债 + 空 Delta）", "Hedged book (long convert + short delta)")}</h5>
        <div class="stat-row" style="margin-top:0">
          <div class="stat"><div class="k">${T("一年损益", "1-year P&L")}</div><div class="v ${H >= 0 ? "pos" : "neg"}">${fmtUsd(H, 0)}</div></div>
          <div class="stat"><div class="k">${T("回报率", "Return")}</div><div class="v ${H >= 0 ? "pos" : "neg"}">${fmtPct(H / s.V0, 1)}</div></div>
        </div>
        <div class="demo-meta">${T("其中债底增值（信用利差的“息差”）", "of which bond-floor accretion (credit carry)")} ${fmtUsd(s.floorGain, 0)}${T("；期权 + 对冲", "; option + hedge")} ${fmtUsd(optHedge, 0)}</div>
      </div>
      <div class="cmp-cell cold"><h5>${T("只买可转债、不对冲", "Convert only, unhedged")}</h5>
        <div class="stat-row" style="margin-top:0">
          <div class="stat"><div class="k">${T("一年损益", "1-year P&L")}</div><div class="v ${U >= 0 ? "pos" : "neg"}">${fmtUsd(U, 0)}</div></div>
          <div class="stat"><div class="k">${T("回报率", "Return")}</div><div class="v ${U >= 0 ? "pos" : "neg"}">${fmtPct(U / s.V0, 1)}</div></div>
        </div>
        <div class="demo-meta">${T("到期末可转债估值", "Convert value at year end")} ${fmtUsd(s.Vend, 0)}${T("（仍按隐含波动率估值）", " (still marked at implied vol)")}</div>
      </div>`;

    const lines = [];
    const gap = s.realized - st.iv / 100;
    if (st.hedge === "none") lines.push(`<span class="warn">${T("只在开头对冲一次：Delta 很快过时，组合重新暴露在方向风险里——对冲的价值来自持续调仓。", "Hedged once and never rebalanced: the delta goes stale fast and the book is exposed to direction again. The value of hedging comes from rebalancing.")}</span>`);
    if (gap > 0.05) lines.push(`<span class="ok">${T("实际波动", "Realized vol")} ${fmtPct(s.realized, 0)} ${T("高于隐含", "beat implied")} ${st.iv}%${T("：调仓低买高卖的收益超过了期权的时间损耗。", ": rebalancing gains outran the option's time decay.")}</span>`);
    else if (gap < -0.05) lines.push(`<span class="bad">${T("实际波动", "Realized vol")} ${fmtPct(s.realized, 0)} ${T("低于隐含", "fell short of implied")} ${st.iv}%${T("：基金为期权多付了钱，时间价值流失，调仓补不回来。", ": the fund overpaid for the option; time value bled away and rebalancing couldn't make it back.")}</span>`);
    else lines.push(`${T("实际波动与隐含波动接近：期权与对冲部分大致打平，收益主要来自债底增值（信用息差）。", "Realized and implied are close: the option-plus-hedge piece roughly breaks even, and the return comes mostly from bond-floor accretion (credit carry).")}`);
    lines.push(`${T("方向的影响：不对冲损益", "Effect of direction: unhedged P&L")} ${fmtUsd(U, 0)}${T("，对冲后", " versus hedged")} ${fmtUsd(H, 0)}${T("。套利基金把方向风险卖回给了股票市场。", ". The fund has passed direction risk back to the stock market.")}`);
    lines.push(`${T("发行人这一侧：橙子公司按", "The issuer's side: Orange Corp sold volatility at")} ${st.iv}% ${T("的隐含波动率卖出了波动率，换来 0% 票息。隐含波动率越高，买价", "implied, in exchange for a 0% coupon. The higher the implied vol, the higher the price")} ${fmtUsd(s.V0, 0)} ${T("越高，公司越能抬高转股价或压低票息。", "and the more room the company has to raise the conversion price or cut the coupon.")}`);
    q("#cv-log").innerHTML = lines.map((l) => `<div>${l}</div>`).join("");
  };

  const bind = (id, key) => q(id).addEventListener("input", (e) => { st[key] = +e.target.value; paint(); });
  bind("#cv-iv", "iv"); bind("#cv-rv", "rv"); bind("#cv-dr", "drift");
  root.querySelectorAll("#cv-hedge button").forEach((b) => b.addEventListener("click", () => {
    st.hedge = b.dataset.h;
    root.querySelectorAll("#cv-hedge button").forEach((o) => o.classList.toggle("on", o === b));
    paint();
  }));
  q("#cv-seed").addEventListener("click", () => { st.seed = (st.seed * 7919 + 13) % 100003; paint(); });
  paint();
}
