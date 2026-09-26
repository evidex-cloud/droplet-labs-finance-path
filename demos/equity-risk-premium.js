// 交互演示：风险回报阶梯的蒙特卡洛沙盘——现金、债券、股票、比特币（参数均为示意），
// 拖动持有年限与股权风险溢价，看中位数回报、亏损概率、最大回撤与“股票跑赢债券”的概率怎么变。
import { rng, randn, maxDrawdown, sharpe, fmtPct, fmtNum, clamp } from "./_fin.js";
import { lineChart, chartBlock } from "./_chart.js";

export default function mount(root, lang) {
  const en = lang === "en";
  const T = (zh, e) => (en ? e : zh);

  const st = { years: 10, rf: 0.03, erp: 0.06, btcMu: 0.3, btcVol: 0.6, seed: 7 };
  const N = 400;

  const assets = () => [
    { key: "cash", name: T("现金/国库券", "Cash / T-bills"), mu: st.rf, vol: 0.01, color: "var(--blue)", cls: "line2" },
    { key: "bond", name: T("长期国债", "Long Treasuries"), mu: st.rf + 0.02, vol: 0.09, color: "var(--green)", cls: "line4" },
    { key: "stock", name: T("股票", "Stocks"), mu: st.rf + st.erp, vol: 0.17, color: "var(--orange)", cls: "line" },
    { key: "btc", name: T("比特币（假设）", "Bitcoin (assumed)"), mu: st.btcMu, vol: st.btcVol, color: "var(--btc)", cls: "line5" },
  ];

  const defs = [
    ["years", T("持有年限", "Holding period"), 1, 30, 1, (v) => v + T(" 年", " yrs")],
    ["rf", T("无风险利率", "Risk-free rate"), 0, 0.06, 0.0025, (v) => fmtPct(v, 2)],
    ["erp", T("股权风险溢价（算术）", "Equity risk premium (arithmetic)"), 0, 0.1, 0.005, (v) => fmtPct(v, 1)],
    ["btcMu", T("比特币假设算术回报", "Bitcoin assumed arithmetic return"), 0, 0.8, 0.05, (v) => fmtPct(v, 0)],
    ["btcVol", T("比特币假设波动率", "Bitcoin assumed volatility"), 0.3, 1.0, 0.05, (v) => fmtPct(v, 0)],
  ];

  root.innerHTML = `
    <div class="demo">
      <div class="demo-head">${T("🪜 风险回报阶梯：400 条模拟路径里的真相", "🪜 The risk–return ladder: the truth across 400 simulated paths")}</div>
      <div class="demo-grid">
        <div class="demo-block">${defs.map(([k, lab, lo, hi, step, fmt]) => `
          <label class="demo-label">${lab}${T("：", ": ")}<b id="erp-v-${k}">${fmt(st[k])}</b></label>
          <input class="demo-slider" type="range" min="${lo}" max="${hi}" step="${step}" value="${st[k]}" data-k="${k}" />`).join("")}
          <div class="demo-btns"><button class="demo-btn" id="erp-seed">${T("🎲 换一组随机路径", "🎲 Draw new random paths")}</button></div>
          <div class="demo-meta">${T("参数为示意：债券 = 无风险 + 2%、波动 9%；股票波动 17%；按月模拟、正态分布（真实尾部更胖）。", "Illustrative parameters: bonds = risk-free + 2%, 9% vol; stocks 17% vol; monthly steps, normal shocks (real tails are fatter).")}</div>
        </div>
        <div class="demo-block">
          <div id="erp-bars"></div>
          <div class="stat-row">
            <div class="stat"><div class="k">${T("股票跑赢债券的概率", "P(stocks beat bonds)")}</div><div class="v acc" id="erp-p1">–</div></div>
            <div class="stat"><div class="k">${T("股票跑赢现金的概率", "P(stocks beat cash)")}</div><div class="v" id="erp-p2">–</div></div>
          </div>
        </div>
      </div>
      <div class="demo-block">
        <div class="demo-label">${T("每类资产的一条样本路径（1 元起步，纵轴为对数：log₁₀ 财富）", "One sample path per asset ($1 start; vertical axis is log₁₀ of wealth)")}</div>
        <div id="erp-chart"></div>
      </div>
      <div class="demo-block"><div class="demo-log" id="erp-log"></div></div>
      <p class="demo-tip">${T(
        "把持有年限从 1 年拖到 30 年，盯住“股票跑赢债券的概率”：它会上升，但到不了 100%。再把比特币波动率拖到 90%：算术回报不变，中位数回报却大幅下降——这就是波动拖累（几何 ≈ 算术 − 波动²/2）。",
        "Drag the holding period from 1 year to 30 and watch “P(stocks beat bonds)”: it rises, but never reaches 100%. Then push bitcoin's volatility to 90%: the arithmetic return is unchanged, yet the median return collapses — volatility drag (geometric ≈ arithmetic − vol²/2)."
      )}</p>
    </div>`;

  const simulate = () => {
    const A = assets(), months = st.years * 12, rand = rng(st.seed);
    const res = A.map(() => ({ finals: [], mdds: [], sample: null }));
    for (let i = 0; i < N; i++) {
      A.forEach((a, j) => {
        const m = a.mu / 12, s = a.vol / Math.sqrt(12);
        let w = 1; const path = [1];
        for (let t = 0; t < months; t++) { w *= Math.max(0.01, 1 + m + s * randn(rand)); path.push(w); }
        res[j].finals.push(w);
        res[j].mdds.push(maxDrawdown(path));
        if (i === 0) res[j].sample = path;
      });
    }
    return { A, res, months };
  };

  const median = (arr) => { const s = [...arr].sort((a, b) => a - b); return s[Math.floor(s.length / 2)]; };
  const pct = (arr, p) => { const s = [...arr].sort((a, b) => a - b); return s[clamp(Math.floor(s.length * p), 0, s.length - 1)]; };

  const paint = () => {
    defs.forEach(([k, , , , , fmt]) => { root.querySelector(`#erp-v-${k}`).textContent = fmt(st[k]); });
    const { A, res, months } = simulate();
    const Y = st.years;
    const rows = A.map((a, j) => {
      const r = res[j];
      const medAnn = Math.pow(median(r.finals), 1 / Y) - 1;
      const pLoss = r.finals.filter((x) => x < 1).length / N;
      const mdd = median(r.mdds), worst = pct(r.finals, 0.05);
      const sh = a.key === "cash" ? null : sharpe(a.mu, st.rf, a.vol);
      return { a, medAnn, pLoss, mdd, worst, sh };
    });
    const maxAnn = Math.max(...rows.map((r) => Math.abs(r.medAnn)), 0.05);
    root.querySelector("#erp-bars").innerHTML = rows.map((r) => `
      <div class="bar2"><span class="lab">${r.a.name}</span><div class="track"><div class="fill" style="width:${clamp((Math.max(0, r.medAnn) / maxAnn) * 100, 0, 100)}%;background:${r.a.color}"></div></div><span class="val">${fmtPct(r.medAnn, 1)}</span></div>
      <div class="demo-meta" style="margin:-4px 0 6px 98px">${T("亏损概率", "P(loss)")} ${fmtPct(r.pLoss, 0)} · ${T("典型最大回撤", "typical max drawdown")} ${fmtPct(r.mdd, 0)} · ${T("最差 5% 终值", "worst-5% ending")} ${fmtNum(r.worst, 2)}× · ${T("夏普", "Sharpe")} ${r.sh == null ? "–" : fmtNum(r.sh, 2)}</div>`).join("") +
      `<div class="demo-meta">${T("条形 = 中位数年化（几何）回报", "Bars = median annualized (geometric) return")}</div>`;

    const [cash, bond, stock] = res;
    let beatB = 0, beatC = 0;
    for (let i = 0; i < N; i++) { if (stock.finals[i] > bond.finals[i]) beatB++; if (stock.finals[i] > cash.finals[i]) beatC++; }
    root.querySelector("#erp-p1").textContent = fmtPct(beatB / N, 0);
    root.querySelector("#erp-p2").textContent = fmtPct(beatC / N, 0);

    const chart = lineChart({
      fns: A.map((a, j) => ({ f: (x) => Math.log10(res[j].sample[clamp(Math.round(x * 12), 0, months)]), cls: a.cls })),
      lo: 0, hi: Y, samples: Math.min(months, 240), xlabel: T("年", "Years"), uid: "erp",
    });
    root.querySelector("#erp-chart").innerHTML = chartBlock(chart, A.map((a) => [a.color, a.name]));

    const s = rows[2], b = rows[3];
    const log = [];
    log.push(`${T("股票：算术预期 ", "Stocks: arithmetic expectation ")}${fmtPct(A[2].mu, 1)}${T("，中位数年化 ", ", median annualized ")}<b>${fmtPct(s.medAnn, 1)}</b>${T("（波动拖累约 ", " (volatility drag ≈ ")}${fmtPct(A[2].vol ** 2 / 2, 1)}${T("）", ")")}`);
    log.push(`${T("比特币（假设）：算术 ", "Bitcoin (assumed): arithmetic ")}${fmtPct(A[3].mu, 0)}${T("，波动 ", ", vol ")}${fmtPct(A[3].vol, 0)} → ${T("中位数年化 ", "median annualized ")}<b class="${b.medAnn < A[3].mu / 2 ? "warn" : ""}">${fmtPct(b.medAnn, 1)}</b>${T("，拖累约 ", ", drag ≈ ")}${fmtPct(A[3].vol ** 2 / 2, 1)}${T("；典型最大回撤 ", "; typical max drawdown ")}<span class="bad">${fmtPct(b.mdd, 0)}</span>`);
    if (Y <= 3) log.push(`<span class="warn">${T("持有期很短：股票亏损的概率接近 ", "Short horizon: the chance stocks lose money is about ")}${fmtPct(s.pLoss, 0)}${T("。风险溢价需要时间来兑现。", ". The risk premium needs time to show up.")}</span>`);
    else if (beatB / N < 1) log.push(`<span class="ok">${Y}${T(" 年里股票跑赢债券的概率 ", " years: stocks beat bonds with probability ")}${fmtPct(beatB / N, 0)}${T("——高，但仍有约 ", " — high, but roughly ")}${fmtPct(1 - beatB / N, 0)}${T(" 的路径输了。这就是“通常”。", " of paths still lose. That is the “usually.”")}</span>`);
    if (st.erp < 0.02) log.push(`<span class="bad">${T("股权风险溢价被压到很薄：承担股票的全部波动，却几乎拿不到补偿。", "The equity risk premium is razor thin: you bear all of stocks' volatility for almost no compensation.")}</span>`);
    root.querySelector("#erp-log").innerHTML = log.map((l) => `<div>${l}</div>`).join("");
  };

  root.querySelectorAll("input[data-k]").forEach((el) => el.addEventListener("input", () => { st[el.dataset.k] = +el.value; paint(); }));
  root.querySelector("#erp-seed").addEventListener("click", () => { st.seed = (st.seed * 7919 + 13) % 100000; paint(); });
  paint();
}
