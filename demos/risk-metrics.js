// 交互演示：风险仪表盘——用可复现的随机路径（可加“尾部崩盘”与杠杆）生成价格序列，
// 同时算出年化收益、波动率、最大回撤、水下时间、夏普、索提诺、卡玛、95% VaR 与 ES，
// 看同一条路径在不同指标下“长什么样”，以及卖期权式策略如何骗过夏普比率。
import { mean, stdev, sharpe, maxDrawdown, rng, randn, fmtPct, fmtNum, tex } from "./_fin.js";
import { lineChart, chartBlock } from "./_chart.js";

export default function mount(root, lang) {
  const en = lang === "en";
  const T = (zh, e) => (en ? e : zh);
  const D = 252;

  const S = { mu: 8, sig: 16, jn: 0, jsz: 20, lev: 1, yrs: 10, seed: 7, rf: 3 };
  const presets = [
    { k: "stk", label: T("股票式（8% / 16%）", "Stock-like (8% / 16%)"), v: { mu: 8, sig: 16, jn: 0.1, jsz: 20, lev: 1 } },
    { k: "btc", label: T("比特币式（σ 60%，收益为假设）", "Bitcoin-like (σ 60%, return assumed)"), v: { mu: 25, sig: 60, jn: 0.2, jsz: 30, lev: 1 } },
    { k: "opt", label: T("卖期权式：平时稳赚、偶尔崩盘", "Option-seller: steady gains, rare crashes"), v: { mu: 10, sig: 3, jn: 0.1, jsz: 30, lev: 1, yrs: 10 } },
    { k: "lev", label: `${T("比特币式（", "Bitcoin-like (")}${tex(String.raw`2\times`)}${T(" 杠杆）", " leverage)")}`, v: { mu: 25, sig: 60, jn: 0.2, jsz: 30, lev: 2 } },
  ];

  const sl = (id, label, min, max, step, unit) => `
    <div class="demo-block">
      <label class="demo-label">${label}${T("：", ": ")}<b id="rm-v-${id}"></b>${unit}</label>
      <input class="demo-slider" type="range" id="rm-s-${id}" min="${min}" max="${max}" step="${step}" />
    </div>`;

  root.innerHTML = `
    <div class="demo">
      <div class="demo-head">${T("📉 风险仪表盘：同一条路径，五种“风险”", "📉 Risk dashboard: one path, five kinds of \"risk\"")}</div>
      <div class="demo-block">
        <div class="demo-label">${T("一键场景（参数为教学假设，不是预测）", "Quick scenarios (teaching assumptions, not forecasts)")}</div>
        <div class="demo-btns" id="rm-presets">${presets.map((p) => `<button class="demo-btn" data-k="${p.k}">${p.label}</button>`).join("")}</div>
      </div>
      <div class="demo-grid">
        ${sl("mu", T("年化漂移（平时的平均收益）", "Annual drift (normal-times return)"), -10, 40, 1, "%")}
        ${sl("sig", T("年化波动率", "Annual volatility"), 1, 100, 1, "%")}
        ${sl("jn", T("尾部崩盘：平均每年次数", "Tail crashes: average per year"), 0, 1, 0.05, "")}
        ${sl("jsz", T("每次崩盘跌幅", "Size of each crash"), 5, 60, 1, "%")}
        ${sl("lev", T("每日再平衡杠杆", "Daily-rebalanced leverage"), 1, 3, 0.1, "×")}
        ${sl("yrs", T("模拟年数", "Years simulated"), 2, 20, 1, "")}
      </div>
      <div class="demo-btns"><button class="demo-btn" id="rm-seed">${T("🎲 换一条随机路径", "🎲 Draw another random path")}</button><span class="demo-meta" id="rm-seedlab"></span></div>
      <div class="stat-row">
        <div class="stat"><div class="k">${T("年化复合收益", "CAGR")}</div><div class="v" id="rm-cagr">–</div></div>
        <div class="stat"><div class="k">${T("年化波动率", "Annual volatility")}</div><div class="v" id="rm-vol">–</div></div>
        <div class="stat"><div class="k">${T("最大回撤", "Max drawdown")}</div><div class="v neg" id="rm-mdd">–</div></div>
        <div class="stat"><div class="k">${T("最长水下时间", "Longest time underwater")}</div><div class="v" id="rm-uw">–</div></div>
      </div>
      <div class="stat-row">
        <div class="stat"><div class="k">${T("夏普（无风险 3%）", "Sharpe (3% risk-free)")}</div><div class="v acc" id="rm-sh">–</div></div>
        <div class="stat"><div class="k">${T("索提诺", "Sortino")}</div><div class="v" id="rm-so">–</div></div>
        <div class="stat"><div class="k">${T("卡玛", "Calmar")}</div><div class="v" id="rm-ca">–</div></div>
        <div class="stat"><div class="k">${T("95% 单日 VaR（历史 / 正态）", "95% 1-day VaR (historical / normal)")}</div><div class="v" id="rm-var">–</div></div>
        <div class="stat"><div class="k">${T("95% 单日 ES（历史）", "95% 1-day ES (historical)")}</div><div class="v neg" id="rm-es">–</div></div>
      </div>
      <div id="rm-chart"></div>
      <div id="rm-dd"></div>
      <div class="demo-log" id="rm-log"></div>
      <p class="demo-tip">${T(
        `先点“卖期权式”，把崩盘次数拉到 0：夏普高得惊人。再把崩盘次数调回 0.1，多换几条路径——在没碰上崩盘的路径里，夏普依然漂亮，碰上一次，最大回撤和 ES 立刻露馅。然后点“比特币式（${tex(String.raw`2\times`)} 杠杆）”，对比 ${tex(String.raw`1\times`)}：波动率翻倍，但复合收益并没有翻倍，回撤却深得多——这就是下一节（阶段 11.4）要讲的波动拖累。`,
        `Click “Option-seller” and set crashes to 0: the Sharpe ratio looks spectacular. Put crashes back to 0.1 and draw several paths — on paths that dodge a crash, the Sharpe still looks great; hit one and the max drawdown and ES give the game away. Then compare “Bitcoin-like (${tex(String.raw`2\times`)} leverage)” with ${tex(String.raw`1\times`)}: volatility doubles, but the compound return doesn't — and the drawdown gets far deeper. That's the volatility drag of the next lesson (Stage 11.4).`
      )}</p>
    </div>`;

  const q = (s) => root.querySelector(s);
  const keys = ["mu", "sig", "jn", "jsz", "lev", "yrs"];

  function simulate() {
    const rand = rng(S.seed * 7919 + 13);
    const n = S.yrs * D, mu = S.mu / 100, sg = S.sig / 100, pj = S.jn / D, js = S.jsz / 100, L = S.lev, rb = S.rf / 100;
    const px = [1], rets = [];
    let v = 1, dead = false, crashes = 0;
    for (let t = 0; t < n; t++) {
      let r = Math.exp((mu - 0.5 * sg * sg) / D + (sg / Math.sqrt(D)) * randn(rand)) - 1;
      if (rand() < pj) { r = (1 + r) * (1 - js) - 1; crashes++; }
      let rl = L * r - (L - 1) * rb / D;
      if (dead) rl = 0;
      else if (1 + rl <= 0) { rl = -1; dead = true; }
      v = Math.max(0, v * (1 + rl));
      rets.push(rl); px.push(v);
    }
    return { px, rets, dead, crashes };
  }

  function paint() {
    keys.forEach((k) => { q(`#rm-s-${k}`).value = S[k]; q(`#rm-v-${k}`).textContent = k === "lev" ? Number(S[k]).toFixed(1) : S[k]; });
    q("#rm-seedlab").textContent = T("路径编号 ", "Path #") + S.seed;
    const { px, rets, dead, crashes } = simulate();
    const yrs = S.yrs, end = px[px.length - 1];
    const cagr = end > 0 ? Math.pow(end, 1 / yrs) - 1 : -1;
    const vol = stdev(rets) * Math.sqrt(D);
    const annMean = mean(rets) * D;
    const mdd = maxDrawdown(px);
    const sh = sharpe(annMean, S.rf / 100, vol);
    const dRf = S.rf / 100 / D;
    const downs = rets.map((r) => Math.min(0, r - dRf));
    const dd = Math.sqrt(downs.reduce((s, x) => s + x * x, 0) / downs.length) * Math.sqrt(D);
    const sortino = dd > 0 ? (annMean - S.rf / 100) / dd : Infinity;
    const calmar = mdd < 0 ? cagr / Math.abs(mdd) : Infinity;
    const sorted = rets.slice().sort((a, b) => a - b);
    const k = Math.max(1, Math.floor(0.05 * sorted.length));
    const hVar = -sorted[k - 1];
    const es = -mean(sorted.slice(0, k));
    const pVar = 1.645 * stdev(rets) - mean(rets);
    // 水下时间与回撤序列
    let peak = 0, uw = 0, maxUw = 0; const ddSeries = [];
    px.forEach((p) => { if (p >= peak) { peak = p; uw = 0; } else uw++; maxUw = Math.max(maxUw, uw); ddSeries.push(peak > 0 ? p / peak - 1 : 0); });

    const set = (id, txt, cls) => { const el = q(id); el.textContent = txt; if (cls) el.className = "v " + cls; };
    set("#rm-cagr", fmtPct(cagr, 1), cagr >= 0 ? "pos" : "neg");
    set("#rm-vol", fmtPct(vol, 1));
    set("#rm-mdd", fmtPct(mdd, 1));
    set("#rm-uw", maxUw >= D ? fmtNum(maxUw / D, 1) + T(" 年", " yrs") : maxUw + T(" 天", " days"));
    set("#rm-sh", isFinite(sh) ? sh.toFixed(2) : "–");
    set("#rm-so", isFinite(sortino) ? sortino.toFixed(2) : "∞");
    set("#rm-ca", isFinite(calmar) ? calmar.toFixed(2) : "∞");
    set("#rm-var", fmtPct(hVar, 2) + " / " + fmtPct(pVar, 2));
    set("#rm-es", fmtPct(es, 2));

    const at = (arr) => (x) => arr[Math.min(arr.length - 1, Math.max(0, Math.round(x * D)))];
    const ch = lineChart({ fns: [{ f: at(px), cls: S.sig >= 40 ? "line5" : "line" }], lo: 0, hi: yrs, samples: 400, xlabel: T("年", "years"), uid: "rm1" });
    q("#rm-chart").innerHTML = chartBlock(ch, [[S.sig >= 40 ? "var(--btc)" : "var(--orange)", T("组合价值（起点为 1）", "portfolio value (starting at 1)")]]);
    const ch2 = lineChart({ fns: [{ f: (x) => at(ddSeries)(x) * 100, cls: "line3" }], lo: 0, hi: yrs, samples: 400, forceZero: true, xlabel: T("年", "years"), uid: "rm2" });
    q("#rm-dd").innerHTML = chartBlock(ch2, [["var(--red)", T("距前高的回撤 %（水下曲线）", "drawdown from prior peak, % (underwater curve)")]]);

    const lines = [];
    lines.push(`${T("本路径遭遇尾部崩盘", "Tail crashes on this path")}: ${crashes}${T(" 次。", ". ")}${T("回本所需涨幅（从最深处）", "Gain needed from the deepest point")}: ${mdd > -1 ? tex(String.raw`\frac{1}{1 - ${(-mdd * 100).toFixed(1)}\%} - 1 = ${((1 / (1 + mdd) - 1) * 100).toFixed(0)}\%`) : tex(String.raw`\infty`)}`);
    if (isFinite(sh)) lines.push(tex(String.raw`\text{${T("夏普", "Sharpe")}} = \frac{${(annMean * 100).toFixed(1)}\% - ${S.rf}\%}{${(vol * 100).toFixed(1)}\%} = ${sh.toFixed(2)}`));
    if (dead) lines.push(`<span class="bad">${T("杠杆下单日亏损超过 100%，账户归零——之后的一切上涨都与你无关。", "A single day's levered loss exceeded 100% and the account went to zero — every rally after that is irrelevant to you.")}</span>`);
    if (isFinite(sh) && sh > 1 && mdd < -0.2) lines.push(`<span class="warn">${T("夏普 > 1，但最大回撤超过 20%：高夏普并没有替你挡住尾部。", "Sharpe above 1 with a drawdown worse than 20%: a high Sharpe didn't protect you from the tail.")}</span>`);
    if (es > 1.3 * hVar) lines.push(`<span class="warn">${T("ES 明显高于 VaR：越过门槛后的亏损很深，这是肥尾的信号。", "ES is well above VaR: losses past the threshold are deep — a sign of fat tails.")}</span>`);
    if (S.lev > 1) lines.push(`${T("杠杆", "Leverage")} ${S.lev.toFixed(1)}×${T("：", ": ")}${T("波动率约放大同样倍数，但复合收益会被“波动拖累”吃掉（阶段 11.4）。", "volatility scales up by about the same multiple, but volatility drag eats into the compound return (Stage 11.4).")}`);
    q("#rm-log").innerHTML = lines.map((l) => `<div>${l}</div>`).join("");
  }

  const clearActive = () => root.querySelectorAll("#rm-presets .demo-btn").forEach((b) => b.classList.remove("active"));
  keys.forEach((k) => q(`#rm-s-${k}`).addEventListener("input", (ev) => { S[k] = +ev.target.value; clearActive(); paint(); }));
  q("#rm-seed").addEventListener("click", () => { S.seed += 1; paint(); });
  root.querySelectorAll("#rm-presets .demo-btn").forEach((b) => b.addEventListener("click", () => {
    const p = presets.find((x) => x.k === b.dataset.k); Object.assign(S, p.v); paint(); clearActive(); b.classList.add("active");
  }));
  Object.assign(S, presets[0].v);
  paint();
  q('#rm-presets .demo-btn[data-k="stk"]').classList.add("active");
}
