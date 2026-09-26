// 交互演示：凯利实验室——(1) 离散下注：设胜率、赢/输幅度与下注比例，让 300 位玩家各玩 N 轮，
// 看中位数、10%/90% 分位与“平均值”怎样分道扬镳；(2) 连续杠杆：设超额收益与波动率，看波动拖累怎样让最优杠杆远低于直觉。
import { kelly, rng, fmtPct, fmtNum, clamp, tex } from "./_fin.js";
import { lineChart, chartBlock } from "./_chart.js";

export default function mount(root, lang) {
  const en = lang === "en";
  const T = (zh, e) => (en ? e : zh);

  const S = { p: 60, b: 100, l: 100, f: 20, R: 200, seed: 3, ex: 20, sig: 60, L: 1 };
  const presets = [
    { k: "k60", label: T("胜率 60%，1 赔 1", "60% win, even money"), v: { p: 60, b: 100, l: 100, f: 20 } },
    { k: "coin", label: T("+50% / −40% 硬币，全押", "+50% / −40% coin, all-in"), v: { p: 50, b: 50, l: 40, f: 100 } },
    { k: "coin25", label: T("同一枚硬币，只押 25%", "Same coin, bet 25%"), v: { p: 50, b: 50, l: 40, f: 25 } },
    { k: "over", label: T("胜率 60%，2 倍凯利", `60% win, ${tex(String.raw`2\times`)} Kelly`), v: { p: 60, b: 100, l: 100, f: 40 } },
  ];
  const NP = 300;

  const sl = (id, label, min, max, step, unit) => `
    <div class="demo-block">
      <label class="demo-label">${label}${T("：", ": ")}<b id="ps-v-${id}"></b>${unit}</label>
      <input class="demo-slider" type="range" id="ps-s-${id}" min="${min}" max="${max}" step="${step}" />
    </div>`;

  root.innerHTML = `
    <div class="demo">
      <div class="demo-head">${T("🎯 凯利实验室：同一个优势，不同的下注大小", "🎯 Kelly lab: same edge, different bet sizes")}</div>
      <div class="demo-block">
        <div class="demo-label">${T("一键场景", "Quick scenarios")}</div>
        <div class="demo-btns" id="ps-presets">${presets.map((p) => `<button class="demo-btn" data-k="${p.k}">${p.label}</button>`).join("")}</div>
      </div>
      <div class="demo-grid">
        ${sl("p", T("胜率", "Win probability"), 30, 80, 1, "%")}
        ${sl("b", T("赢时每 1 元赚", "Win: gain per $1 staked"), 10, 300, 5, "%")}
        ${sl("l", T("输时每 1 元亏", "Lose: loss per $1 staked"), 10, 100, 5, "%")}
        ${sl("f", T("每轮押上财富的比例", "Fraction of wealth staked each round"), 0, 100, 1, "%")}
        ${sl("R", T("轮数", "Rounds"), 10, 500, 10, "")}
      </div>
      <div class="demo-btns"><button class="demo-btn" id="ps-seed">${T("🎲 重新抽签（300 位玩家）", "🎲 Re-roll (300 players)")}</button></div>
      <div class="stat-row">
        <div class="stat"><div class="k">${T("凯利比例", "Kelly fraction")} ${tex("f^{*}")}</div><div class="v acc" id="ps-k">–</div></div>
        <div class="stat"><div class="k">${T("你的下注是凯利的几倍", "Your bet as a multiple of Kelly")}</div><div class="v" id="ps-mult">–</div></div>
        <div class="stat"><div class="k">${T("每轮算术期望", "Arithmetic expectation / round")}</div><div class="v" id="ps-ar">–</div></div>
        <div class="stat"><div class="k">${T("每轮几何增长", "Geometric growth / round")}</div><div class="v" id="ps-g">–</div></div>
      </div>
      <div class="stat-row">
        <div class="stat"><div class="k">${T("中位数终值", "Median final wealth")}</div><div class="v" id="ps-med">–</div></div>
        <div class="stat"><div class="k">${T("平均终值", "Mean final wealth")}</div><div class="v" id="ps-mean">–</div></div>
        <div class="stat"><div class="k">${T("亏钱的玩家", "Players below start")}</div><div class="v neg" id="ps-lose">–</div></div>
        <div class="stat"><div class="k">${T("几乎输光（< 1%）", "Nearly ruined (< 1%)")}</div><div class="v neg" id="ps-ruin">–</div></div>
      </div>
      <div id="ps-chart"></div>
      <div id="ps-gchart"></div>
      <div class="demo-block">
        <div class="demo-label">${T("连续版本：持有一项波动资产，加多少杠杆？（教学假设，不是预测）", "Continuous version: how much leverage on a volatile asset? (teaching assumptions, not forecasts)")}</div>
        <div class="demo-grid-3">
          ${sl("ex", `${T("算术超额收益", "Arithmetic excess return")} ${tex(String.raw`\mu - r`)}`, 0, 40, 1, "%")}
          ${sl("sig", `${T("波动率", "Volatility")} ${tex(String.raw`\sigma`)}`, 5, 100, 1, "%")}
          ${sl("L", `${T("杠杆", "Leverage")} ${tex("L")}`, 0, 3, 0.05, "×")}
        </div>
        <div class="stat-row">
          <div class="stat"><div class="k">${T("最优杠杆", "Optimal leverage")} ${tex("L^{*}")}</div><div class="v acc" id="ps-Ls">–</div></div>
          <div class="stat"><div class="k">${T("你的长期增长（超出无风险）", "Your long-run growth (above risk-free)")}</div><div class="v" id="ps-gL">–</div></div>
          <div class="stat"><div class="k">${T("波动拖累", "Volatility drag")} ${tex(String.raw`\tfrac{L^{2}\sigma^{2}}{2}`)}</div><div class="v neg" id="ps-drag">–</div></div>
        </div>
        <div id="ps-lchart"></div>
        <div class="demo-meta" id="ps-lform"></div>
      </div>
      <div class="demo-log" id="ps-log"></div>
      <p class="demo-tip">${T(
        `先点“+50% / −40% 硬币，全押”：每轮期望 ${tex(String.raw`0.5 \times 50\% - 0.5 \times 40\% = +5\%`)}，可是中位数玩家几乎输光，而“平均终值”被极少数幸运儿撑得很高。再点“只押 25%”：同一枚硬币，大多数玩家变富了。然后在胜率 60% 的游戏里把下注比例从 20% 拖到 40%：几何增长跌到零以下。最后在连续版本里把杠杆拉到 2 倍——看波动拖累 ${tex(String.raw`\tfrac{L^{2}\sigma^{2}}{2}`)} 如何按平方增长。`,
        `Start with “+50% / −40% coin, all-in”: the expectation is ${tex(String.raw`0.5 \times 50\% - 0.5 \times 40\% = +5\%`)} a round, yet the median player is nearly wiped out while a few lucky players prop up the mean. Then “Same coin, bet 25%”: identical coin, and most players get richer. In the 60% game, drag the bet from 20% to 40% and watch geometric growth fall below zero. Finally set leverage to ${tex(String.raw`2\times`)} in the continuous panel and see volatility drag ${tex(String.raw`\tfrac{L^{2}\sigma^{2}}{2}`)} grow with the square.`
      )}</p>
    </div>`;

  const q = (s) => root.querySelector(s);
  const keys = ["p", "b", "l", "f", "R", "ex", "sig", "L"];
  const fmtW = (w) => (w >= 1000 ? fmtNum(w, 0) + "×" : w >= 0.01 ? fmtNum(w, 2) + "×" : w.toExponential(1) + "×");

  function paint() {
    keys.forEach((k) => { q(`#ps-s-${k}`).value = S[k]; q(`#ps-v-${k}`).textContent = k === "L" ? Number(S[k]).toFixed(2) : S[k]; });
    const p = S.p / 100, b = S.b / 100, l = S.l / 100, f = S.f / 100, R = S.R;
    // 一般赔率下的凯利：输时亏 l、赢时赚 b → f* = kelly(p, b/l) / l
    const fk = kelly(p, b / l) / l;
    const fStar = clamp(fk, 0, 1 / l);
    const g = (x) => (1 - l * x > 0 ? p * Math.log(1 + b * x) + (1 - p) * Math.log(1 - l * x) : -Infinity);
    q("#ps-k").textContent = fk > 0 ? fmtPct(Math.min(fk, 1), 1) : T("0（没有优势，别下注）", "0 (no edge — don't bet)");
    q("#ps-mult").textContent = fk > 0 ? (f / fk).toFixed(2) + "×" : "–";
    const ar = p * b * f - (1 - p) * l * f;
    q("#ps-ar").textContent = (ar >= 0 ? "+" : "") + fmtPct(ar, 2);
    const gf = g(f), ge = Math.exp(gf) - 1;
    const gEl = q("#ps-g"); gEl.textContent = isFinite(gf) ? (ge >= 0 ? "+" : "") + fmtPct(ge, 2) : T("归零", "wiped out"); gEl.className = "v " + (gf > 0 ? "pos" : "neg");

    // 模拟 300 位玩家
    const rand = rng(S.seed * 104729 + 17);
    const W = new Float64Array(NP).fill(1);
    const q10 = [0], q50 = [0], q90 = [0];
    const pct = (arr, x) => arr[Math.min(arr.length - 1, Math.floor(x * arr.length))];
    for (let t = 1; t <= R; t++) {
      for (let i = 0; i < NP; i++) W[i] = Math.max(0, W[i] * (rand() < p ? 1 + b * f : 1 - l * f));
      const s = Array.from(W).sort((a, c) => a - c);
      const lg = (v) => Math.log10(Math.max(v, 1e-12));
      q10.push(lg(pct(s, 0.1))); q50.push(lg(pct(s, 0.5))); q90.push(lg(pct(s, 0.9)));
    }
    const fin = Array.from(W).sort((a, c) => a - c);
    const med = pct(fin, 0.5), avg = fin.reduce((s, x) => s + x, 0) / NP;
    const medEl = q("#ps-med"); medEl.textContent = fmtW(med); medEl.className = "v " + (med >= 1 ? "pos" : "neg");
    q("#ps-mean").textContent = fmtW(avg);
    q("#ps-lose").textContent = fmtPct(fin.filter((x) => x < 1).length / NP, 0);
    q("#ps-ruin").textContent = fmtPct(fin.filter((x) => x < 0.01).length / NP, 0);

    const step = (arr) => (x) => arr[Math.min(arr.length - 1, Math.round(x))];
    const ch = lineChart({ fns: [{ f: step(q90), cls: "line4" }, { f: step(q50), cls: "line" }, { f: step(q10), cls: "line3" }], lo: 0, hi: R, samples: 300, xlabel: T("轮数", "round"), forceZero: true, uid: "ps1" });
    q("#ps-chart").innerHTML = chartBlock(ch, [
      ["var(--green)", T("第 90 百分位", "90th percentile")], ["var(--orange)", T("中位数", "median")], ["var(--red)", T("第 10 百分位", "10th percentile")],
    ]) + `<div class="demo-meta">${T("纵轴是财富的对数", "Vertical axis is")} ${tex(String.raw`\log_{10}`)}${T("：0 是起点，1 是 10 倍，−1 是只剩十分之一。", " of wealth: 0 is the start, 1 is ten times, −1 is one-tenth left.")}</div>`;

    const hiF = Math.min(1, 0.999 / l);
    const gch = lineChart({ fns: [{ f: (x) => { const v = g(x / 100); return isFinite(v) ? Math.max(v * 100, -15) : -15; }, cls: "line" }], lo: 0, hi: hiF * 100, xlabel: T("下注比例 %", "bet fraction %"), markerX: S.f, markerLabel: T("你", "you"), forceZero: true, uid: "ps2" });
    q("#ps-gchart").innerHTML = chartBlock(gch, [["var(--orange)", T("每轮对数增长率 %（山顶即凯利）", "log growth per round % (the peak is Kelly)")]]);

    // 连续版本
    const ex = S.ex / 100, sg = S.sig / 100, L = S.L;
    const gc = (x) => x * ex - (x * x * sg * sg) / 2;
    const Ls = ex / (sg * sg);
    q("#ps-Ls").textContent = Ls.toFixed(2) + "×";
    const gl = q("#ps-gL"); gl.textContent = (gc(L) >= 0 ? "+" : "") + fmtPct(gc(L), 1) + T(" / 年", " / yr"); gl.className = "v " + (gc(L) >= 0 ? "pos" : "neg");
    q("#ps-drag").textContent = fmtPct((L * L * sg * sg) / 2, 1);
    const lch = lineChart({ fns: [{ f: (x) => gc(x) * 100, cls: "line5" }], lo: 0, hi: 3, xlabel: T("杠杆倍数", "leverage ×"), markerX: L, markerLabel: T("你", "you"), forceZero: true, uid: "ps3" });
    q("#ps-lchart").innerHTML = chartBlock(lch, [["var(--btc)", T("长期增长率 %/年（超出无风险利率）", "long-run growth %/yr (above risk-free)")]]);
    const n2 = (x) => x.toFixed(2);
    q("#ps-lform").innerHTML = tex(String.raw`L^{*} = \frac{\mu - r}{\sigma^{2}} = \frac{${n2(ex)}}{${n2(sg)}^{2}} = ${n2(Ls)}`)
      + "<br>" + tex(String.raw`g(${n2(L)}) \approx ${n2(L)} \times ${n2(ex)} - \frac{${n2(L)}^{2} \times ${n2(sg)}^{2}}{2} = ${(gc(L) * 100).toFixed(1)}\%`);

    const lines = [];
    lines.push(tex(String.raw`f^{*} = \frac{p}{l} - \frac{1 - p}{b} = \frac{${p.toFixed(2)}}{${l.toFixed(2)}} - \frac{${(1 - p).toFixed(2)}}{${b.toFixed(2)}} = ${(fk * 100).toFixed(1)}\%`)
      + ` <span class="demo-meta">${T(`（${tex("b")}、${tex("l")} 为赢时赚、输时亏的比例；${tex("l = 1")} 时就是课文里的`, `(${tex("b")} and ${tex("l")} are the gain and loss per $1 staked; with ${tex("l = 1")} this is the lesson's`)} ${tex(String.raw`p - \tfrac{q}{b}`)}${T("）", ")")}</span>`);
    if (fk <= 0) lines.push(`<span class="bad">${T("这个游戏没有正期望，凯利的答案是：不下注。", "This game has no positive edge; Kelly's answer is: don't bet.")}</span>`);
    else if (f > 2 * fk) lines.push(`<span class="bad">${T("下注超过 2 倍凯利：即使每一注都有优势，长期几何增长也为负。", `Betting more than ${tex(String.raw`2\times`)} Kelly: even with an edge on every bet, long-run geometric growth is negative.`)}</span>`);
    else if (f > 1.1 * fk) lines.push(`<span class="warn">${T("过度下注：增长更低、回撤更深。往左挪一点几乎没有代价。", "Overbetting: lower growth, deeper drawdowns. Moving left costs almost nothing.")}</span>`);
    else if (f >= 0.4 * fk) lines.push(`<span class="ok">${T("在凯利附近或以下：增长接近最优，波动可控。", "At or below Kelly: near-optimal growth with manageable swings.")}</span>`);
    if (avg > 3 * med && med < 1) lines.push(`${T("平均终值是中位数的", "The mean is")} ${en ? tex(String.raw`${fmtNum(avg / Math.max(med, 1e-12), 0).replace(/,/g, "{,}")}\times`) : fmtNum(avg / Math.max(med, 1e-12), 0)}${T(" 倍：平均值被少数幸运路径撑起来，大多数人并没有赚到。", " the median: a few lucky paths prop up the average while most players lose.")}`);
    if (L > 2 * Ls) lines.push(`<span class="bad">${T("连续版本：杠杆超过最优值的 2 倍，长期增长低于无风险利率。", `Continuous version: leverage above ${tex(String.raw`2\times`)} the optimum grows slower than the risk-free rate.`)}</span>`);
    q("#ps-log").innerHTML = lines.map((x) => `<div>${x}</div>`).join("");
  }

  const clearActive = () => root.querySelectorAll("#ps-presets .demo-btn").forEach((b) => b.classList.remove("active"));
  keys.forEach((k) => q(`#ps-s-${k}`).addEventListener("input", (ev) => { S[k] = +ev.target.value; if (["p", "b", "l", "f"].includes(k)) clearActive(); paint(); }));
  q("#ps-seed").addEventListener("click", () => { S.seed += 1; paint(); });
  root.querySelectorAll("#ps-presets .demo-btn").forEach((b) => b.addEventListener("click", () => {
    const pr = presets.find((x) => x.k === b.dataset.k); Object.assign(S, pr.v); paint(); clearActive(); b.classList.add("active");
  }));
  paint();
  q('#ps-presets .demo-btn[data-k="k60"]').classList.add("active");
}
