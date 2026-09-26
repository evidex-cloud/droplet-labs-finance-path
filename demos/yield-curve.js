// 交互演示：收益率曲线编辑器 + 形状识别器 + “预期 + 期限溢价”拼装器。
// 编辑模式：拖动 5 个期限的收益率或套用预设/牛熊陡平冲击，自动判断形状与变化类型；
// 拼装模式：设定当前政策利率、长期预期利率、收敛速度与期限溢价，看曲线如何由两部分叠出来（玩具模型）。
import { bondPrice, fmtNum, fmtUsd, clamp, tex } from "./_fin.js";
import { lineChart, chartBlock } from "./_chart.js";

export default function mount(root, lang) {
  const en = lang === "en";
  const T = (zh, e) => (en ? e : zh);

  const M = [0.25, 2, 10, 20, 30];
  const ML = [T("3 个月", "3m"), T("2 年", "2y"), T("10 年", "10y"), T("20 年", "20y"), T("30 年", "30y")];
  const presets = [
    { k: "now", label: T("2026-09-25 实际", "Sep 25 2026 (actual)"), c: [4.24, 4.81, 5.17, 5.54, 5.49] },
    { k: "normal", label: T("正常（示意）", "Normal (illustrative)"), c: [3.0, 3.5, 4.2, 4.6, 4.7] },
    { k: "inv", label: T("倒挂，2023 年式（示意）", "Inverted, 2023-style (illustrative)"), c: [5.45, 4.9, 4.3, 4.55, 4.45] },
    { k: "flat", label: T("平坦（示意）", "Flat (illustrative)"), c: [4.5, 4.5, 4.55, 4.6, 4.55] },
    { k: "hump", label: T("驼峰（示意）", "Humped (illustrative)"), c: [4.0, 4.8, 4.6, 4.4, 4.3] },
  ];
  const shocks = [
    { k: "bs", label: T("牛陡：短端 −60bp，长端 −10bp", "Bull steepener: short −60bp, long −10bp"), d: [-0.6, -0.5, -0.25, -0.12, -0.1] },
    { k: "bes", label: T("熊陡：短端 +10bp，长端 +60bp", "Bear steepener: short +10bp, long +60bp"), d: [0.1, 0.15, 0.4, 0.55, 0.6] },
    { k: "bf", label: T("牛平：短端 −10bp，长端 −60bp", "Bull flattener: short −10bp, long −60bp"), d: [-0.1, -0.15, -0.4, -0.55, -0.6] },
    { k: "bef", label: T("熊平：短端 +60bp，长端 +10bp", "Bear flattener: short +60bp, long +10bp"), d: [0.6, 0.5, 0.25, 0.12, 0.1] },
  ];

  const st = { mode: "edit", c: presets[0].c.slice(), before: null, r0: 3.88, rL: 4.5, tau: 2, tp: 0.8 };

  root.innerHTML = `
    <div class="demo">
      <div class="demo-head">${T("📈 收益率曲线编辑器：形状、斜率与“预期 + 期限溢价”", "📈 Yield-curve editor: shape, slope and “expectations + term premium”")}</div>
      <div class="demo-block">
        <div class="demo-seg" id="yc-mode">
          <button data-m="edit" class="on">${T("编辑曲线", "Edit the curve")}</button>
          <button data-m="build">${T("拼装曲线（预期 + 期限溢价）", "Build the curve (expectations + term premium)")}</button>
        </div>
      </div>
      <div id="yc-edit">
        <div class="demo-block">
          <div class="demo-label">${T("预设", "Presets")}</div>
          <div class="demo-btns" id="yc-pre">${presets.map((p) => `<button class="demo-btn" data-k="${p.k}">${p.label}</button>`).join("")}</div>
          <div class="demo-label">${T("对当前曲线施加一次冲击", "Hit the current curve with a move")}</div>
          <div class="demo-btns" id="yc-shock">${shocks.map((s) => `<button class="demo-btn" data-k="${s.k}">${s.label}</button>`).join("")}</div>
        </div>
        <div class="demo-grid-3" id="yc-sliders">${M.map((m, i) => `
          <div class="demo-block">
            <label class="demo-label">${ML[i]} <b id="yc-v-${i}"></b></label>
            <input class="demo-slider" type="range" data-i="${i}" min="0" max="8" step="0.01" />
          </div>`).join("")}
        </div>
      </div>
      <div id="yc-build" style="display:none">
        <div class="demo-block">
          <div class="demo-btns" id="yc-bpre">
            <button class="demo-btn" data-b="0">${T("预期降息 → 倒挂", "Cuts expected → inversion")}</button>
            <button class="demo-btn" data-b="1">${T("预期加息 → 陡峭", "Hikes expected → steep")}</button>
            <button class="demo-btn" data-b="2">${T("期限溢价飙升", "Term premium spikes")}</button>
          </div>
        </div>
        <div class="demo-grid">
          <div class="demo-block">
            <label class="demo-label">${T("今天的政策利率", "Policy rate today")} <b id="yc-v-r0"></b></label>
            <input class="demo-slider" type="range" id="yc-r0" min="0" max="8" step="0.05" />
            <label class="demo-label">${T("市场预期的长期政策利率", "Expected long-run policy rate")} <b id="yc-v-rL"></b></label>
            <input class="demo-slider" type="range" id="yc-rL" min="0" max="8" step="0.05" />
          </div>
          <div class="demo-block">
            <label class="demo-label">${T("向长期水平收敛的速度（年）", "Years to converge to the long-run rate")} <b id="yc-v-tau"></b></label>
            <input class="demo-slider" type="range" id="yc-tau" min="0.5" max="8" step="0.25" />
            <label class="demo-label">${T("10 年期期限溢价", "10-year term premium")} <b id="yc-v-tp"></b></label>
            <input class="demo-slider" type="range" id="yc-tp" min="-1.5" max="2.5" step="0.05" />
          </div>
        </div>
        <div class="demo-meta">${T("玩具模型：预期短端利率从“今天”按指数方式收敛到“长期”；", "Toy model: expected short rates glide exponentially from “today” to “long run”; ")}${tex(String.raw`\text{${T("某期限收益率", "a maturity's yield")}} = \text{${T("该期限内预期短端利率的平均", "average expected short rate over that horizon")}} + \text{${T("随期限递增的期限溢价", "a term premium that grows with maturity")}}`)}${T("。参考：ACM 模型的 10 年期期限溢价 2020 年 7 月约 −1.36%，2026 年 7 月约 +0.84%。", ". For reference, the ACM model's 10-year term premium was about −1.36% in July 2020 and about +0.84% in July 2026.")}</div>
      </div>
      <div class="stat-row" id="yc-stats"></div>
      <div id="yc-chart"></div>
      <div class="demo-log" id="yc-log"></div>
      <p class="demo-tip">${T(
        "编辑模式：先点“2026-09-25 实际”，再依次点四种冲击，看识别器怎么给变化命名，灰线是冲击前的曲线。拼装模式：把“长期预期”拉到比“今天”低 2 个百分点、期限溢价调到 0 以下——倒挂就出现了；再把期限溢价推到 +2%，同一套利率预期下，曲线又翻回陡峭。倒挂里有多少是“预期降息”，多少是“期限溢价太低”，正是 2022–2024 年争论的焦点。",
        "Edit mode: click “Sep 25 2026 (actual)”, then try the four moves one by one and watch the classifier name each change; the grey line is the curve before the move. Build mode: set the long-run expectation 2 points below today and push the term premium below zero, and an inversion appears. Now raise the term premium to +2%: with exactly the same rate expectations, the curve flips back to steep. How much of an inversion is “expected cuts” versus “a term premium that's too low” was exactly the 2022–2024 debate."
      )}</p>
    </div>`;

  const q = (s) => root.querySelector(s);

  const interp = (c) => (x) => {
    if (x <= M[0]) return c[0];
    for (let i = 1; i < M.length; i++) if (x <= M[i]) return c[i - 1] + (c[i] - c[i - 1]) * (x - M[i - 1]) / (M[i] - M[i - 1]);
    return c[c.length - 1];
  };
  // 玩具模型：预期短端路径 r(t) = rL + (r0 − rL)·e^(−t/τ)；其在 [0, m] 上的平均值；期限溢价 tp(m) 随期限增长、10 年处等于 tp10
  const expAvg = (m) => st.rL + (st.r0 - st.rL) * (st.tau / m) * (1 - Math.exp(-m / st.tau));
  const expPath = (t) => st.rL + (st.r0 - st.rL) * Math.exp(-t / st.tau);
  const tpOf = (m) => st.tp * (1 - Math.exp(-m / 6)) / (1 - Math.exp(-10 / 6));
  const built = () => M.map((m) => expAvg(m) + tpOf(m));

  const shapeOf = (c) => {
    const s210 = c[2] - c[1], s3m10 = c[2] - c[0], s230 = c[4] - c[1];
    const mid = Math.max(c[1], c[2], c[3]), ends = Math.max(c[0], c[4]);
    if (mid - ends > 0.15 && Math.min(c[1], c[2], c[3]) > Math.min(c[0], c[4]) - 0.05 && s210 < 0.1) return ["hump", T("驼峰", "Humped")];
    if (s210 < -0.05 && s3m10 < 0) return ["inv", T("倒挂", "Inverted")];
    if (Math.abs(s210) <= 0.15 && Math.abs(c[4] - c[0]) <= 0.35) return ["flat", T("平坦", "Flat")];
    if (s210 > 0.15 || (s3m10 > 0.3 && s230 > 0)) return ["normal", T("正常（向上倾斜）", "Normal (upward-sloping)")];
    return ["mixed", T("部分倒挂 / 过渡形态", "Partly inverted / transitional")];
  };

  const bp = (x) => (x >= 0 ? "+" : "") + Math.round(x * 100) + "bp";

  const paint = () => {
    const edit = st.mode === "edit";
    q("#yc-edit").style.display = edit ? "" : "none";
    q("#yc-build").style.display = edit ? "none" : "";
    root.querySelectorAll("#yc-mode button").forEach((b) => b.classList.toggle("on", b.dataset.m === st.mode));

    const c = edit ? st.c : built();
    if (edit) {
      root.querySelectorAll("#yc-sliders input").forEach((el) => { const i = +el.dataset.i; el.value = st.c[i]; q("#yc-v-" + i).textContent = fmtNum(st.c[i], 2) + "%"; });
    } else {
      for (const k of ["r0", "rL", "tau", "tp"]) { q("#yc-" + k).value = st[k]; q("#yc-v-" + k).textContent = k === "tau" ? fmtNum(st.tau, 2) + T(" 年", " yrs") : fmtNum(st[k], 2) + "%"; }
    }

    const [shapeK, shapeName] = shapeOf(c);
    const p10 = bondPrice(1000, 0.05, c[2] / 100, 10);
    q("#yc-stats").innerHTML = [
      [T("形状", "Shape"), shapeName, shapeK === "inv" ? "neg" : shapeK === "normal" ? "pos" : "acc"],
      [T("10 年 − 2 年", "10y − 2y"), bp(c[2] - c[1]), c[2] - c[1] < 0 ? "neg" : "pos"],
      [T("10 年 − 3 个月", "10y − 3m"), bp(c[2] - c[0]), c[2] - c[0] < 0 ? "neg" : "pos"],
      [T("30 年 − 2 年", "30y − 2y"), bp(c[4] - c[1]), c[4] - c[1] < 0 ? "neg" : "pos"],
      [T("5% 票息 10 年债价格", "Price of a 5% 10y bond"), fmtUsd(p10, 2), p10 >= 1000 ? "pos" : "neg"],
    ].map(([k, v, cl]) => `<div class="stat"><div class="k">${k}</div><div class="v ${cl}">${v}</div></div>`).join("");

    let fns, legend;
    if (edit) {
      fns = [{ f: interp(c), cls: "line" }];
      legend = [["var(--orange)", T("当前曲线", "Current curve")]];
      if (st.before) { fns.unshift({ f: interp(st.before), cls: "line2" }); legend.push(["var(--blue)", T("冲击前", "Before the move")]); }
    } else {
      fns = [{ f: (x) => expPath(x), cls: "line4" }, { f: (x) => expAvg(Math.max(x, 0.05)), cls: "line2" }, { f: (x) => expAvg(Math.max(x, 0.05)) + tpOf(x), cls: "line" }];
      legend = [["var(--green)", T("预期的政策利率路径", "Expected policy-rate path")], ["var(--blue)", T("预期部分（平均短端利率）", "Expectations part (average short rate)")], ["var(--orange)", tex(String.raw`\text{${T("收益率曲线", "Yield curve")}} = \text{${T("预期", "expectations")}} + \text{${T("期限溢价", "term premium")}}`)]];
    }
    const res = lineChart({ fns, lo: 0.25, hi: 30, xlabel: T("期限（年）", "Maturity (years)"), uid: "yc" });
    q("#yc-chart").innerHTML = chartBlock(res, legend);

    const lines = [];
    const s210 = c[2] - c[1];
    if (shapeK === "inv") lines.push(`<span class="bad">${T("倒挂：短端高于长端。市场在押注未来降息；借短放长的银行，每做一笔 10 年贷款、用 3 个月存款融资，利差是", "Inverted: short yields above long. The market is betting on future cuts; a bank funding a 10-year loan with 3-month deposits earns a spread of")} ${bp(c[2] - c[0])}${T("。", ".")}</span>`);
    else if (shapeK === "normal") lines.push(`<span class="ok">${T("正常：期限越长收益率越高。借短放长有利可图（", "Normal: longer maturities pay more. Borrowing short to lend long pays (")}${tex(String.raw`y_{\text{${T("10 年", "10y")}}} - y_{\text{${T("3 个月", "3m")}}} = ${bp(c[2] - c[0]).replace("bp", "")}\ \text{bp}`)}${T("）。", ").")}</span>`);
    else if (shapeK === "flat") lines.push(`<span class="warn">${T("平坦：各期限差不多，常见于加息周期末段或方向不明的转折点。", "Flat: maturities yield about the same, typical late in a hiking cycle or at a turning point.")}</span>`);
    else if (shapeK === "hump") lines.push(`<span class="warn">${T("驼峰：中段最高。可能是“先加息、后降息”的预期，也可能是某些期限的供求特殊。", "Humped: the middle is highest. Could be “hikes first, cuts later,” or unusual supply and demand at certain maturities.")}</span>`);
    else lines.push(`<span class="warn">${T("过渡形态：部分期限倒挂、部分正常，曲线正在换挡。", "Transitional: some segments inverted, some normal; the curve is changing gear.")}</span>`);

    if (edit && st.before) {
      const dS = (c[0] + c[1]) / 2 - (st.before[0] + st.before[1]) / 2;
      const dL = (c[3] + c[4]) / 2 - (st.before[3] + st.before[4]) / 2;
      const lvl = (dS + dL) / 2, slope = dL - dS;
      const name = Math.abs(slope) < 0.05 ? (lvl > 0 ? T("平行上移", "parallel shift up") : T("平行下移", "parallel shift down"))
        : (lvl > 0.01 ? T("熊", "bear ") : lvl < -0.01 ? T("牛", "bull ") : T("扭转式", "twist ")) + (slope > 0 ? T("陡", "steepening") : T("平", "flattening"));
      lines.push(`${T("这次变化：短端", "This move: short end")} ${bp(dS)}${T("，长端", ", long end")} ${bp(dL)} → <b>${name}</b>${T("。", ".")}${slope > 0 && lvl > 0 ? T("长端领涨：期限溢价、赤字与供给担忧的典型画面（阶段 4.5）。", " The long end leads higher: the classic picture of a rising term premium and supply worries (Stage 4.5).") : slope < 0 && lvl > 0 ? T("短端领涨：市场在押注加息，就像 2026 年 2 月底到 9 月。", " The short end leads higher: the market is pricing hikes, as from late February to September 2026.") : slope > 0 && lvl < 0 ? T("短端领跌：市场在押注降息。", " The short end leads lower: the market is pricing cuts.") : slope < 0 && lvl < 0 ? T("长端领跌：避险资金买入长债，或增长预期转弱。", " The long end leads lower: a flight to safety, or a weaker growth outlook.") : ""}`);
      const p10b = bondPrice(1000, 0.05, st.before[2] / 100, 10);
      lines.push(`${T("同一只 5% 票息 10 年期债券：", "The same 5% 10-year bond: ")}${fmtUsd(p10b, 2)} → ${fmtUsd(p10, 2)}${T("（阶段 4.2 的跷跷板）。", " (the seesaw from Stage 4.2).")}`);
    }
    if (!edit) {
      const e10 = expAvg(10), t10 = tpOf(10), e2 = expAvg(2);
      lines.push(`${tex(String.raw`\text{${T("10 年期收益率", "10-year yield")}}\ ${fmtNum(c[2], 2)}\% = \text{${T("预期部分", "expectations")}}\ ${fmtNum(e10, 2)}\% + \text{${T("期限溢价", "term premium")}}\ ${fmtNum(t10, 2)}\%`)}${T("；2 年期收益率 ", "; the 2-year yield: ")}${tex(String.raw`${fmtNum(c[1], 2)}\% = ${fmtNum(e2, 2)}\% + ${fmtNum(tpOf(2), 2)}\%`)}${T("——期限越短，期限溢价越小，收益率越接近纯粹的利率预期。", ". The shorter the maturity, the smaller the term premium and the closer the yield is to a pure rate expectation.")}`);
      if (st.tp < 0 && shapeK === "inv" && st.r0 - st.rL < 1) lines.push(`<span class="warn">${T("注意：这次倒挂有相当一部分来自负的期限溢价，而不是大幅降息预期——这正是有人解释 2022–2024 年“倒挂却没衰退”的思路之一。", "Note: much of this inversion comes from a negative term premium rather than big expected cuts, one of the explanations offered for 2022–2024's “inversion without recession.”")}</span>`);
    }
    q("#yc-log").innerHTML = lines.map((l) => `<div>${l}</div>`).join("");
  };

  root.querySelectorAll("#yc-mode button").forEach((b) => b.addEventListener("click", () => { st.mode = b.dataset.m; paint(); }));
  root.querySelectorAll("#yc-sliders input").forEach((el) => el.addEventListener("input", () => { st.c[+el.dataset.i] = +el.value; paint(); }));
  root.querySelectorAll("#yc-pre button").forEach((b) => b.addEventListener("click", () => {
    st.c = presets.find((p) => p.k === b.dataset.k).c.slice(); st.before = null;
    root.querySelectorAll("#yc-pre button").forEach((o) => o.classList.toggle("active", o === b));
    paint();
  }));
  root.querySelectorAll("#yc-shock button").forEach((b) => b.addEventListener("click", () => {
    const s = shocks.find((x) => x.k === b.dataset.k);
    st.before = st.c.slice();
    st.c = st.c.map((v, i) => clamp(+(v + s.d[i]).toFixed(2), 0, 8));
    paint();
  }));
  const bpre = [
    { r0: 5.4, rL: 3.0, tau: 2, tp: -0.4 },
    { r0: 1.0, rL: 4.0, tau: 2.5, tp: 0.5 },
    { r0: 4.0, rL: 4.0, tau: 2, tp: 2.0 },
  ];
  root.querySelectorAll("#yc-bpre button").forEach((b) => b.addEventListener("click", () => { Object.assign(st, bpre[+b.dataset.b]); paint(); }));
  for (const k of ["r0", "rL", "tau", "tp"]) q("#yc-" + k).addEventListener("input", (e) => { st[k] = +e.target.value; paint(); });
  q('#yc-pre button[data-k="now"]').classList.add("active");
  paint();
}
