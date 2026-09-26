// 交互演示：债务雪球计算器。起点接近 2026 年的量级（债务/GDP ≈ 101%、平均利率 ≈ 3.3%、名义 GDP ≈ 32.5 万亿美元），
// 设基本赤字、名义增长 g、新发债的市场利率，以及每年有多少债务到期滚动（决定平均利率向市场利率靠拢的速度）。
// 逐年递推 d' = d × (1 + r) ÷ (1 + g) + 基本赤字；名义 GDP 用 _fin.js fv 复利。示意模型，不是 CBO 预测。
import { fv, fmtPct, fmtNum, fmtBig, tex } from "./_fin.js";
import { lineChart, chartBlock } from "./_chart.js";

export default function mount(root, lang) {
  const en = lang === "en";
  const T = (zh, e) => (en ? e : zh);
  const C = T("：", ": ");

  const PRESETS = {
    base: { n: T("接近 CBO 2026 年 2 月假设", "Close to CBO's Feb 2026 assumptions"), pd: 2.5, g: 4, rm: 4.1, roll: 20 },
    mkt: { n: T("2026 年 9 月的市场利率", "September 2026 market rates"), pd: 2.5, g: 4, rm: 5.2, roll: 20 },
    aus: { n: T("财政紧缩：基本盈余 1%", "Austerity: 1% primary surplus"), pd: -1, g: 4, rm: 5.2, roll: 20 },
    infl: { n: T("通胀路线：", "Inflation route: ") + tex("g") + T(" 升到 7%", " rises to 7%"), pd: 2.5, g: 7, rm: 5.2, roll: 20 },
    bills: { n: T("多发短债：每年 35% 滚动", "Bill-heavy: 35% rolls each year"), pd: 2.5, g: 4, rm: 5.2, roll: 35 },
  };
  const D0 = 1.01, R0 = 0.033, GDP0 = 32.5e12, YEARS = 30;

  root.innerHTML = `
    <div class="demo">
      <div class="demo-head">${T("❄️ 债务雪球计算器：", "❄️ The debt snowball: ")}${tex("r")}${T("、", " vs ")}${tex("g")}${T(" 与基本赤字的赛跑", " vs the primary deficit")}</div>
      <div class="demo-btns" id="dd-presets">
        ${Object.entries(PRESETS).map(([k, p]) => `<button class="demo-btn ${k === "mkt" ? "active" : ""}" data-k="${k}">${p.n}</button>`).join("")}
      </div>
      <div class="demo-grid">
        <div><label class="demo-label">${T("基本赤字（占 GDP，负数表示盈余）", "Primary deficit (% of GDP; negative means surplus)")}${C}<b id="dd-pd-v"></b></label><input class="demo-slider" type="range" id="dd-pd" min="-3" max="6" step="0.25" value="2.5"></div>
        <div><label class="demo-label">${T("名义 GDP 增长 ", "Nominal GDP growth ")}${tex("g")}${C}<b id="dd-g-v"></b></label><input class="demo-slider" type="range" id="dd-g" min="0" max="9" step="0.25" value="4"></div>
        <div><label class="demo-label">${T("新发国债的市场利率", "Market rate on new debt")}${C}<b id="dd-rm-v"></b></label><input class="demo-slider" type="range" id="dd-rm" min="1" max="8" step="0.1" value="5.2"></div>
        <div><label class="demo-label">${T("每年到期滚动的债务比例", "Share of debt rolling over each year")}${C}<b id="dd-roll-v"></b></label><input class="demo-slider" type="range" id="dd-roll" min="5" max="50" step="1" value="20"></div>
      </div>
      <div id="dd-chart"></div>
      <div class="stat-row" id="dd-stats"></div>
      <div class="demo-label" style="margin-top:12px">${T("利息占 GDP 的比例（逐年）", "Interest as % of GDP, over time")}</div>
      <div id="dd-bars"></div>
      <div class="demo-log" id="dd-log"></div>
      <p class="demo-tip">${T(
        "先点“接近 CBO 假设”，再点“2026 年 9 月的市场利率”：基本赤字没变，只是新债利率从 4.1% 变成 5.2%，30 年后的债务率和利息负担却明显更高——<strong>债务越大，利率越重要</strong>。再试“多发短债”：滚动越快，平均利率追上市场利率越快。最后试“通胀路线”：" + tex("g") + " 变大，雪球会化，但前提是市场不因此要求更高的利率。",
        "Click \"Close to CBO\" and then \"September 2026 market rates\": the primary deficit is unchanged, only the rate on new debt moves from 4.1% to 5.2%, yet debt and interest 30 years out are clearly higher — <strong>the bigger the debt, the more rates matter</strong>. Try \"Bill-heavy\": faster rollover means the average rate catches up with the market rate sooner. Then try the \"Inflation route\": a bigger " + tex("g") + " melts the snowball — as long as markets don't demand higher rates in response."
      )}</p>
    </div>`;

  const $ = (s) => root.querySelector(s);

  const simulate = (pd, g, rm, roll) => {
    const d = [D0], r = [R0], int = [R0 * D0];
    for (let t = 1; t <= YEARS; t++) {
      const rPrev = r[t - 1];
      const dNext = (d[t - 1] * (1 + rPrev)) / (1 + g) + pd;
      const rNext = rPrev + roll * (rm - rPrev); // 滚动的部分按市场利率重新定价
      d.push(dNext); r.push(rNext); int.push(rNext * dNext);
    }
    return { d, r, int };
  };

  const paint = () => {
    const pd = +$("#dd-pd").value / 100, g = +$("#dd-g").value / 100, rm = +$("#dd-rm").value / 100, roll = +$("#dd-roll").value / 100;
    $("#dd-pd-v").textContent = (pd >= 0 ? "" : "−") + fmtPct(Math.abs(pd), 2) + (pd < 0 ? T("（盈余）", " (surplus)") : "");
    $("#dd-g-v").textContent = fmtPct(g, 2);
    $("#dd-rm-v").textContent = fmtPct(rm, 1);
    $("#dd-roll-v").textContent = fmtPct(roll, 0);

    const s = simulate(pd, g, rm, roll);
    const base = simulate(pd, g, R0, roll); // 对照：利率一直停在 3.3%
    const at = (arr, x) => { const i = Math.max(0, Math.min(YEARS, Math.round(x))); return arr[i] * 100; };
    const res = lineChart({
      fns: [{ f: (x) => at(s.d, x), cls: "line" }, { f: (x) => at(base.d, x), cls: "line2" }, { f: () => 106, cls: "line3" }],
      lo: 0, hi: YEARS, samples: YEARS, xlabel: T("年后", "years ahead"), uid: "dd",
    });
    $("#dd-chart").innerHTML = chartBlock(res, [
      ["var(--orange)", T("债务/GDP（%）", "Debt-to-GDP (%)")],
      ["var(--blue)", T("对照：平均利率一直停在 3.3%", "Comparison: average rate stays at 3.3%")],
      ["var(--red)", T("1946 年纪录 106%", "1946 record, 106%")],
    ]);

    const y10 = 10, rEnd = s.r[y10], dEnd = s.d[y10];
    const gdp10 = fv(GDP0, g, y10);
    const int10 = s.int[y10] * gdp10;
    const pbStar = ((s.r[YEARS] - g) / (1 + g)) * s.d[YEARS];
    const pbNow = ((R0 - g) / (1 + g)) * D0;
    $("#dd-stats").innerHTML = `
      <div class="stat"><div class="k">${T("10 年后债务/GDP", "Debt-to-GDP in 10 yrs")}</div><div class="v ${dEnd > D0 ? "neg" : "pos"}">${fmtPct(dEnd, 0)}</div></div>
      <div class="stat"><div class="k">${T("30 年后债务/GDP", "Debt-to-GDP in 30 yrs")}</div><div class="v ${s.d[YEARS] > D0 ? "neg" : "pos"}">${fmtPct(s.d[YEARS], 0)}</div></div>
      <div class="stat"><div class="k">${T("10 年后平均利率", "Average rate in 10 yrs")}</div><div class="v">${fmtPct(rEnd, 2)}</div></div>
      <div class="stat"><div class="k">${T("10 年后年利息（名义美元）", "Yearly interest in 10 yrs (nominal $)")}</div><div class="v acc">$${fmtBig(int10)}</div></div>`;

    $("#dd-bars").innerHTML = [0, 5, 10, 20, 30].map((t) => {
      const v = s.int[t];
      return `<div class="bar2"><span class="lab">${T("第 ", "Year ")}${t}${T(" 年", "")}</span><div class="track"><div class="fill" style="width:${Math.min(100, (v / 0.12) * 100)}%;background:${v > 0.05 ? "var(--red)" : "var(--orange)"}"></div></div><span class="val">${fmtPct(v, 1)}</span></div>`;
    }).join("");

    const lines = [];
    lines.push(`${T("起点", "Start")}${C}${T("债务/GDP", "debt-to-GDP")} ${fmtPct(D0, 0)}${T("，平均利率", ", average rate")} ${fmtPct(R0, 1)}${T("，名义 GDP 约", ", nominal GDP about")} $${fmtBig(GDP0)}${T("（接近 2026 年的量级）", " (close to 2026 orders of magnitude)")}`);
    const tp = (x) => fmtPct(x, 2).replace("%", "\\%");
    lines.push(`${T("今天的 ", "Today's ")}${tex(`r - g = ${tp(R0 - g)}`)}${T("；长期的 ", "; long-run ")}${tex(`r - g = ${tp(s.r[YEARS] - g)}`)} ${s.r[YEARS] > g ? `<span class="bad">${T("（", "(")}${tex("r > g")}${T("：雪球自己会长大）", ": the snowball grows by itself)")}</span>` : `<span class="ok">${T("（", "(")}${tex("g > r")}${T("：增长帮你稀释旧债）", ": growth dilutes old debt)")}</span>`}`);
    lines.push(`${T("让债务/GDP 在 30 年后的水平稳定所需的基本余额 ", "Primary balance needed to stabilize debt at its year-30 level, ")}${tex(String.raw`\dfrac{r - g}{1 + g} \times d`)}${C}<b>${pbStar >= 0 ? T("盈余 ", "surplus of ") : T("赤字可达 ", "deficit of up to ")}${fmtPct(Math.abs(pbStar), 2)}</b>${T(" 的 GDP（今天的起点约需", " of GDP (at today's starting point about")} ${pbNow >= 0 ? T("盈余 ", "surplus ") : T("赤字 ", "deficit ")}${fmtPct(Math.abs(pbNow), 2)}${T("）", ")")}`);
    if (s.d[YEARS] > 1.5) lines.push(`<span class="warn">${T("30 年后债务超过 GDP 的 150%：利息会越来越多地挤占其他开支，这正是市场讨论“财政主导”的情景（阶段 9.4）。", "Debt above 150% of GDP after 30 years: interest crowds out ever more spending — the scenario behind talk of \"fiscal dominance\" (Stage 9.4).")}</span>`);
    if (g >= 0.065) lines.push(`<span class="warn">${T("高 g 路线靠的是通胀。如果市场预期到了，会要求更高的新债利率——试着把市场利率也调高看看。", "The high-g route relies on inflation. If markets see it coming, they demand higher rates on new debt — try raising the market rate too.")}</span>`);
    $("#dd-log").innerHTML = lines.map((l) => `<div>${l}</div>`).join("");
  };

  root.querySelectorAll("#dd-presets button").forEach((b) => b.addEventListener("click", () => {
    const p = PRESETS[b.dataset.k];
    $("#dd-pd").value = p.pd; $("#dd-g").value = p.g; $("#dd-rm").value = p.rm; $("#dd-roll").value = p.roll;
    root.querySelectorAll("#dd-presets button").forEach((x) => x.classList.toggle("active", x === b));
    paint();
  }));
  ["#dd-pd", "#dd-g", "#dd-rm", "#dd-roll"].forEach((id) => $(id).addEventListener("input", paint));
  paint();
}
