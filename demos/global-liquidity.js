// 交互演示：流动性水位 vs 风险资产（示意模拟）——设定美联储购债/缩表、TGA、逆回购释放、信贷增速，
// 再加一段“利率冲击”和随机噪音，看风险资产指数怎么跟着水位走、什么时候脱钩；并亲手体验“挑最佳滞后”的过拟合陷阱。
import { mean, stdev, rng, randn, fmtNum, fmtPct } from "./_fin.js";
import { lineChart, chartBlock } from "./_chart.js";

export default function mount(root, lang) {
  const en = lang === "en";
  const T = (zh, e) => (en ? e : zh);

  const N = 48, NL0 = 5850; // 起点“净流动性”约 5.85 万亿美元（示意，单位十亿美元）
  const BASE = { qe: 0, tga: "steady", rrp: "none", credit: 4, shock: 0, when: "late", beta: 2, lag: 2, noise: 3, seed: 7 };
  let st = { ...BASE };

  const corr = (a, b) => {
    const n = Math.min(a.length, b.length); if (n < 3) return NaN;
    const x = a.slice(0, n), y = b.slice(0, n), mx = mean(x), my = mean(y), sx = stdev(x), sy = stdev(y);
    if (!(sx > 0 && sy > 0)) return NaN;
    let c = 0; for (let i = 0; i < n; i++) c += (x[i] - mx) * (y[i] - my);
    return c / (n - 1) / (sx * sy);
  };

  const simulate = (s) => {
    const rand = rng(s.seed);
    let nl = NL0, rrpBal = s.rrp === "drain" ? 2000 : 0;
    const g = [0], r = [0], L = [100], A = [100];
    for (let t = 1; t <= N; t++) {
      const tgaFlow = s.tga === "rebuild" ? (t <= 12 ? 40 : 0) : s.tga === "spend" ? -20 : 0;
      const release = s.rrp === "drain" ? Math.min(rrpBal, 80) : 0; rrpBal -= release;
      const dNL = s.qe - tgaFlow + release;
      // 本月“水位”变化（%）：一半来自央行净流动性，一半来自信贷，再加上财政收支与信贷的月度起伏
      const gt = 0.5 * (dNL / nl) * 100 + 0.5 * (s.credit / 12) + 0.8 * randn(rand);
      nl = Math.max(500, nl + dNL);
      g.push(gt);
      const s0 = s.when === "early" ? 1 : 25;
      const dy = t >= s0 && t < s0 + 12 ? (s.shock / 12 / 100) * (1 + 0.8 * randn(rand)) : 0; // 本月实际利率上升（百分点），重定价是一阵一阵的
      const gl = t - s.lag >= 1 ? g[t - s.lag] : 0;
      const rt = 0.3 + s.beta * gl - 15 * dy + s.noise * randn(rand);
      r.push(rt);
      L.push(L[t - 1] * (1 + gt / 100));
      A.push(Math.max(1, A[t - 1] * (1 + rt / 100)));
    }
    return { g, r, L, A };
  };

  // 在 [from, to] 月份区间里，用滞后 k 计算“水位变化”与资产回报的相关系数
  const lagCorr = (sim, k, from, to) => {
    const x = [], y = [];
    for (let t = from; t <= to; t++) if (t - k >= 1) { x.push(sim.g[t - k]); y.push(sim.r[t]); }
    return corr(x, y);
  };

  root.innerHTML = `
    <div class="demo">
      <div class="demo-head">${T("🌊 流动性水位 vs 风险资产：什么时候同涨同跌，什么时候脱钩？（示意模拟）", "🌊 Liquidity tide vs risk assets: when do they move together, and when do they split? (illustrative simulation)")}</div>
      <div class="demo-grid">
        <div class="demo-block">
          <label class="demo-label">${T("美联储每月购债（+）或缩表（−）", "Fed monthly purchases (+) or runoff (−)")}${T("：", ": ")}<b id="gl-qv"></b></label>
          <input class="demo-slider" type="range" id="gl-q" min="-100" max="150" step="5" value="0"/>
          <label class="demo-label">${T("银行与私人信贷年增速", "Bank and private credit growth, per year")}${T("：", ": ")}<b id="gl-cv"></b></label>
          <input class="demo-slider" type="range" id="gl-c" min="-2" max="10" step="0.5" value="4"/>
          <label class="demo-label">${T("财政部账户 TGA", "Treasury account (TGA)")}</label>
          <div class="demo-seg" id="gl-tga">
            <button data-v="rebuild">${T("前 12 个月补仓（抽水）", "Rebuild in first 12 months (drain)")}</button>
            <button data-v="steady">${T("持平", "Steady")}</button>
            <button data-v="spend">${T("持续花钱（放水）", "Spending down (release)")}</button>
          </div>
          <label class="demo-label" style="margin-top:8px">${T("货币基金的 ON RRP", "Money funds' ON RRP")}</label>
          <div class="demo-seg" id="gl-rrp">
            <button data-v="none">${T("已抽干", "Already drained")}</button>
            <button data-v="drain">${T("从 2 万亿美元开始释放", "Releasing from $2T")}</button>
          </div>
        </div>
        <div class="demo-block">
          <label class="demo-label">${T("实际利率冲击（12 个月内累计上升）", "Real-rate shock (cumulative rise over 12 months)")}${T("：", ": ")}<b id="gl-sv"></b></label>
          <input class="demo-slider" type="range" id="gl-s" min="0" max="300" step="25" value="0"/>
          <div class="demo-seg" id="gl-when">
            <button data-v="early">${T("发生在第 1–12 月", "In months 1–12")}</button>
            <button data-v="late">${T("发生在第 25–36 月", "In months 25–36")}</button>
          </div>
          <label class="demo-label" style="margin-top:8px">${T("资产对水位的敏感度（贝塔）", "Asset sensitivity to the tide (beta)")}${T("：", ": ")}<b id="gl-bv"></b></label>
          <input class="demo-slider" type="range" id="gl-b" min="0" max="6" step="0.5" value="2"/>
          <label class="demo-label">${T("真实滞后（月）", "True lag (months)")}${T("：", ": ")}<b id="gl-lv"></b></label>
          <input class="demo-slider" type="range" id="gl-l" min="0" max="6" step="1" value="2"/>
          <label class="demo-label">${T("随机噪音（每月波动）", "Random noise (monthly swing)")}${T("：", ": ")}<b id="gl-nv"></b></label>
          <input class="demo-slider" type="range" id="gl-n" min="0" max="12" step="1" value="3"/>
        </div>
      </div>
      <div id="gl-chart"></div>
      <div class="stat-row">
        <div class="stat"><div class="k">${T("48 个月水位变化", "Tide change over 48 months")}</div><div class="v" id="gl-dl">–</div></div>
        <div class="stat"><div class="k">${T("风险资产变化", "Risk-asset change")}</div><div class="v" id="gl-da">–</div></div>
        <div class="stat"><div class="k">${T("相关性：前 24 月 / 后 24 月", "Correlation: first 24 / last 24 months")}</div><div class="v" id="gl-cr">–</div></div>
      </div>
      <div class="demo-btns">
        <button class="demo-btn" data-p="p20">${T("📖 2020–21：QE 洪水", "📖 2020–21: the QE flood")}</button>
        <button class="demo-btn" data-p="p22">${T("📖 2022：缩表 + 加息", "📖 2022: QT + hikes")}</button>
        <button class="demo-btn" data-p="p23">${T("📖 2023：缩表但 ON RRP 释放", "📖 2023: QT, but ON RRP releases cash")}</button>
        <button class="demo-btn" data-p="p26">${T("📖 2026：小幅扩表但利率飙升", "📖 2026: modest expansion, soaring rates")}</button>
        <button class="demo-btn" data-p="seed">${T("🎲 换一组随机噪音", "🎲 Reroll the noise")}</button>
        <button class="demo-btn" data-p="fit">${T("🔍 挑“最佳滞后”并做样本外检验", "🔍 Pick the “best lag” and test it out of sample")}</button>
        <button class="demo-btn" data-p="reset">${T("⟲ 重置", "⟲ Reset")}</button>
      </div>
      <div class="demo-log" id="gl-log"></div>
      <p class="demo-tip">${T(
        "先点“2020–21”：水位一路上涨，高贝塔资产涨得更猛——“比特币就是流动性”的由来。再点“2026”：水位还在小幅上升，可利率冲击一来，资产线就和水位线分道扬镳，后 24 个月的相关性明显变弱。最后点“挑最佳滞后”：在前 24 个月里试遍 0–12 个月的滞后、挑出相关性最高的那个，再拿去后 24 个月检验——多换几次随机噪音，你会发现“最佳滞后”经常不是你设定的真实滞后，样本外的相关性也常常塌掉。这是示意模拟，不是真实数据。",
        "Start with “2020–21”: the tide rises steadily and the high-beta asset rises harder — the origin of “Bitcoin is liquidity.” Then “2026”: the tide is still edging up, but once the rate shock hits, the asset line splits from the tide and the correlation in the last 24 months weakens sharply. Finally “pick the best lag”: it tries every lag from 0 to 12 months on the first 24 months, keeps the best, then tests it on the last 24. Reroll the noise a few times and you'll see the “best lag” is often not the true lag you set, and the out-of-sample correlation often collapses. Illustrative simulation, not real data."
      )}</p>
    </div>`;

  const $ = (q) => root.querySelector(q);
  let fitMsg = "";
  const sg = (x, d = 1) => (x >= 0 ? "+" : "") + fmtNum(x, d);
  const cf = (x) => (isFinite(x) ? fmtNum(x, 2) : "–");

  const paint = () => {
    const sim = simulate(st);
    $("#gl-qv").textContent = (st.qe >= 0 ? "+" : "−") + T(fmtNum(Math.abs(st.qe) * 10, 0) + " 亿美元/月", "$" + fmtNum(Math.abs(st.qe), 0) + "B/month");
    $("#gl-cv").textContent = sg(st.credit, 1) + "%";
    $("#gl-sv").textContent = "+" + st.shock + "bp";
    $("#gl-bv").textContent = fmtNum(st.beta, 1);
    $("#gl-lv").textContent = st.lag;
    $("#gl-nv").textContent = "±" + st.noise + "%";
    [["#gl-tga", st.tga], ["#gl-rrp", st.rrp], ["#gl-when", st.when]].forEach(([id, v]) =>
      root.querySelectorAll(id + " button").forEach((b) => b.classList.toggle("on", b.dataset.v === v)));

    const res = lineChart({
      fns: [
        { f: (x) => sim.L[Math.round(x)], cls: "line2" },
        { f: (x) => sim.A[Math.round(x)], cls: "line5" },
      ],
      lo: 0, hi: N, samples: N, xlabel: T("月份 → 指数（起点 = 100）", "Months → index (start = 100)"), uid: "gl",
      markerX: st.shock > 0 ? (st.when === "early" ? 1 : 25) : null, markerLabel: T("利率冲击", "rate shock"),
    });
    $("#gl-chart").innerHTML = chartBlock(res, [["var(--blue)", T("流动性水位（净流动性与信贷）", "Liquidity tide (net liquidity and credit)")], ["var(--btc)", T("高贝塔风险资产（示意）", "High-beta risk asset (illustrative)")]]);

    const dl = sim.L[N] / 100 - 1, da = sim.A[N] / 100 - 1;
    const e1 = $("#gl-dl"); e1.textContent = fmtPct(dl, 1); e1.className = "v " + (dl >= 0 ? "pos" : "neg");
    const e2 = $("#gl-da"); e2.textContent = fmtPct(da, 1); e2.className = "v " + (da >= 0 ? "pos" : "neg");
    const c1 = lagCorr(sim, st.lag, 1, 24), c2 = lagCorr(sim, st.lag, 25, 48);
    $("#gl-cr").textContent = cf(c1) + " / " + cf(c2);

    const lines = [];
    lines.push(`${T("按真实滞后", "At the true lag of")} ${st.lag} ${T("个月计算：前 24 个月相关系数", (st.lag === 1 ? "month" : "months") + ": correlation in the first 24 months")} <b>${cf(c1)}</b>${T("，", ", ")}${T("后 24 个月", "last 24 months")} <b>${cf(c2)}</b>`);
    if (st.shock > 0 && isFinite(c1) && isFinite(c2)) {
      const hit = st.when === "early" ? c1 : c2, other = st.when === "early" ? c2 : c1;
      if (hit < other - 0.1) lines.push(`<span class="warn">${T("利率冲击所在的那一段，相关性明显更弱：风浪盖过了水位。", "Correlation is clearly weaker in the half with the rate shock: the storm overwhelmed the tide.")}</span>`);
    }
    if (dl > 0 && da < 0) lines.push(`<span class="bad">${T("水位上涨，资产却下跌——这正是 2026 年上半年的样子。", "The tide rose while the asset fell — exactly what the first half of 2026 looked like.")}</span>`);
    if (st.beta === 0) lines.push(`<span class="warn">${T("贝塔为 0：资产与水位毫无因果联系，但你仍可能在某一段里看到“相关性”——那是噪音。", "Beta is 0: the asset has no causal link to the tide, yet you may still see “correlation” in some stretch — that's noise.")}</span>`);
    if (fitMsg) lines.push(fitMsg);
    $("#gl-log").innerHTML = lines.map((l) => `<div>${l}</div>`).join("");
  };

  const fit = () => {
    const sim = simulate(st);
    let best = 0, bc = -Infinity;
    for (let k = 0; k <= 12; k++) { const c = lagCorr(sim, k, 13, 24); if (isFinite(c) && c > bc) { bc = c; best = k; } }
    const oos = lagCorr(sim, best, 25, 48);
    const right = best === st.lag;
    fitMsg = `<span class="${right && oos > 0.3 ? "ok" : "bad"}">${T("在第 13–24 月里试遍 0–12 个月的滞后，“最佳滞后”是", "Trying every lag from 0 to 12 on months 13–24, the “best lag” is")} <b>${best}</b> ${T("个月（样本内相关", (best === 1 ? "month" : "months") + " (in-sample correlation")} <b>${cf(bc)}</b>${T("）；拿到第 25–48 月检验，相关变成", "); tested on months 25–48, the correlation becomes")} <b>${cf(oos)}</b>${T("。", ".")}${right ? "" : T(" 它甚至不是你设定的真实滞后。", " It isn't even the true lag you set.")}</span>`;
  };

  const sync = () => {
    $("#gl-q").value = st.qe; $("#gl-c").value = st.credit; $("#gl-s").value = st.shock; $("#gl-b").value = st.beta; $("#gl-l").value = st.lag; $("#gl-n").value = st.noise;
    paint();
  };
  const bind = (id, key) => $(id).addEventListener("input", (e) => { st[key] = +e.target.value; fitMsg = ""; paint(); });
  bind("#gl-q", "qe"); bind("#gl-c", "credit"); bind("#gl-s", "shock"); bind("#gl-b", "beta"); bind("#gl-l", "lag"); bind("#gl-n", "noise");
  [["#gl-tga", "tga"], ["#gl-rrp", "rrp"], ["#gl-when", "when"]].forEach(([id, key]) =>
    root.querySelectorAll(id + " button").forEach((b) => b.addEventListener("click", () => { st[key] = b.dataset.v; fitMsg = ""; paint(); })));
  root.querySelectorAll("[data-p]").forEach((b) => b.addEventListener("click", () => {
    const p = b.dataset.p;
    if (p === "reset") { st = { ...BASE }; fitMsg = ""; }
    if (p === "p20") { st = { ...BASE, qe: 80, tga: "spend", rrp: "none", credit: 8, shock: 0 }; fitMsg = ""; }
    if (p === "p22") { st = { ...BASE, qe: -60, tga: "rebuild", rrp: "none", credit: 2, shock: 250, when: "early" }; fitMsg = ""; }
    if (p === "p23") { st = { ...BASE, qe: -60, tga: "rebuild", rrp: "drain", credit: 2, shock: 0 }; fitMsg = ""; }
    if (p === "p26") { st = { ...BASE, qe: 15, tga: "steady", rrp: "none", credit: 2, shock: 300, when: "late" }; fitMsg = ""; }
    if (p === "seed") { st.seed = (st.seed * 7919 + 13) % 100000; fitMsg = ""; }
    if (p === "fit") fit();
    sync();
  }));
  sync();
}
