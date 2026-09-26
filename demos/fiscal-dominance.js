// 交互演示：债务/GDP 路径模拟器——设定基本收支、实际增长、通胀、新债的市场利率与平均期限（重新定价速度），
// 可选“金融抑制”把新债利率压住；看 30 年里债务率、利息负担、r − g 与“稳定债务所需的基本盈余”怎么变，并与 CBO 式假设对比。
import { realRate, fmtNum, fmtPct, clamp } from "./_fin.js";
import { lineChart, chartBlock } from "./_chart.js";

export default function mount(root, lang) {
  const en = lang === "en";
  const T = (zh, e) => (en ? e : zh);

  const YRS = 30, GDP_T = 32.5, R0 = 0.033, CAP = 0.025; // 名义 GDP 约 32.5 万亿美元；起点平均利率约 3.3%；抑制时新债利率上限 2.5%
  const BASE = { d0: 101, pb: -2.5, rg: 1.8, inf: 2.2, mkt: 5.2, mat: 6, rep: false };
  const CBO = { ...BASE, mkt: 4.1 };
  let st = { ...BASE };

  const run = (s) => {
    const g = (1 + s.rg / 100) * (1 + s.inf / 100) - 1;
    const rNew = s.rep ? Math.min(s.mkt / 100, CAP) : s.mkt / 100;
    let d = s.d0, r = R0;
    const D = [d], R = [r], I = [d * r / (1 + g)];
    for (let t = 1; t <= YRS; t++) {
      d = Math.max(0, d * (1 + r) / (1 + g) - s.pb);
      r = r + (rNew - r) / s.mat;      // 每年约 1/平均期限 的债务按新利率重新定价
      D.push(d); R.push(r); I.push(d * r / (1 + g));
    }
    return { g, rNew, D, R, I };
  };

  root.innerHTML = `
    <div class="demo">
      <div class="demo-head">${T("🧮 r 与 g 的赛跑：美国债务/GDP 的 30 年路径（示意模型）", "🧮 The race between r and g: a 30-year path for US debt/GDP (illustrative model)")}</div>
      <div class="demo-grid">
        <div class="demo-block">
          <label class="demo-label">${T("起点债务率（公众持有债务 / GDP）", "Starting debt ratio (debt held by public / GDP)")}${T("：", ": ")}<b id="fd-d0v"></b></label>
          <input class="demo-slider" type="range" id="fd-d0" min="40" max="160" step="1" value="101"/>
          <label class="demo-label">${T("基本收支（不含利息；负数 = 赤字）", "Primary balance (excl. interest; negative = deficit)")}${T("：", ": ")}<b id="fd-pbv"></b></label>
          <input class="demo-slider" type="range" id="fd-pb" min="-6" max="3" step="0.1" value="-2.5"/>
          <label class="demo-label">${T("实际 GDP 增速", "Real GDP growth")}${T("：", ": ")}<b id="fd-rgv"></b></label>
          <input class="demo-slider" type="range" id="fd-rg" min="-1" max="4" step="0.1" value="1.8"/>
          <label class="demo-label">${T("通胀", "Inflation")}${T("：", ": ")}<b id="fd-infv"></b></label>
          <input class="demo-slider" type="range" id="fd-inf" min="0" max="10" step="0.1" value="2.2"/>
        </div>
        <div class="demo-block">
          <label class="demo-label">${T("新债的市场利率（2026 年 9 月 10 年期约 5.2%）", "Market rate on new debt (10-year about 5.2% in Sept 2026)")}${T("：", ": ")}<b id="fd-mktv"></b></label>
          <input class="demo-slider" type="range" id="fd-mkt" min="0" max="10" step="0.1" value="5.2"/>
          <label class="demo-label">${T("债务平均期限（越短，重新定价越快）", "Average maturity of the debt (shorter = reprices faster)")}${T("：", ": ")}<b id="fd-matv"></b></label>
          <input class="demo-slider" type="range" id="fd-mat" min="1" max="12" step="0.5" value="6"/>
          <label class="demo-label">${T("金融抑制", "Financial repression")}</label>
          <div class="demo-seg" id="fd-rep">
            <button data-v="0">${T("关闭：按市场利率借", "Off: borrow at market")}</button>
            <button data-v="1">${T("开启：新债利率压在 2.5%", "On: new debt capped at 2.5%")}</button>
          </div>
          <div class="demo-meta" id="fd-meta"></div>
        </div>
      </div>
      <div id="fd-c1"></div>
      <div id="fd-c2"></div>
      <div class="stat-row">
        <div class="stat"><div class="k">${T("10 年后 / 30 年后债务率", "Debt ratio after 10 / 30 years")}</div><div class="v acc" id="fd-d">–</div></div>
        <div class="stat"><div class="k">${T("10 年后利息负担（按今天的 GDP 折算）", "Interest burden in year 10 (in today's GDP dollars)")}</div><div class="v" id="fd-i">–</div></div>
        <div class="stat"><div class="k">${T("第 10 年 r − g", "r − g in year 10")}</div><div class="v" id="fd-rg10">–</div></div>
        <div class="stat"><div class="k">${T("第 10 年稳定债务所需基本收支", "Primary balance needed to stabilize, year 10")}</div><div class="v" id="fd-pbs">–</div></div>
      </div>
      <div class="demo-btns">
        <button class="demo-btn" data-p="cbo">${T("📖 CBO 式假设（10 年期 4.1%）", "📖 CBO-style assumption (10-year at 4.1%)")}</button>
        <button class="demo-btn" data-p="mkt">${T("📖 2026 年 9 月的市场利率", "📖 September 2026 market rates")}</button>
        <button class="demo-btn" data-p="growth">${T("🚀 出口一：增长（AI 生产率）", "🚀 Exit 1: growth (AI productivity)")}</button>
        <button class="demo-btn" data-p="aust">${T("✂️ 出口二：紧缩", "✂️ Exit 2: austerity")}</button>
        <button class="demo-btn" data-p="infl">${T("🔥 出口三：通胀 + 抑制", "🔥 Exit 3: inflation + repression")}</button>
        <button class="demo-btn" data-p="ww2">${T("📜 战后 1946 年式", "📜 Postwar, 1946-style")}</button>
        <button class="demo-btn" data-p="reset">${T("⟲ 重置", "⟲ Reset")}</button>
      </div>
      <div class="demo-log" id="fd-log"></div>
      <p class="demo-tip">${T(
        "先对比两条线：蓝色是你的设定，紫色是“CBO 式”假设（新债利率 4.1%）。只把市场利率从 4.1% 拉到 5.2%，30 年后的债务率就差出一大截——r 一旦超过 g，利息会自己滚大。再把“平均期限”调短：多发短债让利率上升更快地传到利息账单上。最后依次点三个“出口”：增长和紧缩都能稳住债务，但“通胀 + 抑制”也能——代价是实际利率为负，国债持有人的购买力被悄悄拿走。模型为示意，不是预测。",
        "Compare the two lines first: blue is your setting, violet is a “CBO-style” assumption (new debt at 4.1%). Just moving the market rate from 4.1% to 5.2% opens a wide gap in the debt ratio after 30 years — once r exceeds g, interest compounds on itself. Then shorten the average maturity: leaning on bills passes higher rates into the interest bill faster. Finally try the three exits: growth and austerity can both stabilize the debt — but so can “inflation + repression,” at the cost of negative real rates that quietly take bondholders' purchasing power. Illustrative model, not a forecast."
      )}</p>
    </div>`;

  const $ = (q) => root.querySelector(q);
  const sg = (x, d = 1) => (x >= 0 ? "+" : "") + fmtNum(x, d);

  const paint = () => {
    const A = run(st), B = run({ ...CBO, d0: st.d0 });
    $("#fd-d0v").textContent = fmtNum(st.d0, 0) + "%";
    $("#fd-pbv").textContent = sg(st.pb) + "%";
    $("#fd-rgv").textContent = sg(st.rg) + "%";
    $("#fd-infv").textContent = fmtNum(st.inf, 1) + "%";
    $("#fd-mktv").textContent = fmtNum(st.mkt, 1) + "%";
    $("#fd-matv").textContent = fmtNum(st.mat, 1) + T(" 年", " yrs");
    root.querySelectorAll("#fd-rep button").forEach((b) => b.classList.toggle("on", (b.dataset.v === "1") === st.rep));
    const real = realRate(A.rNew, st.inf / 100);
    $("#fd-meta").innerHTML = `${T("名义增速 g", "Nominal growth g")} = <b>${fmtPct(A.g, 2)}</b>${T("；新债利率", "; new-debt rate")} <b>${fmtPct(A.rNew, 2)}</b>${T("，实际利率", ", real rate")} <b style="color:${real < 0 ? "var(--red)" : "var(--ink)"}">${fmtPct(real, 2)}</b>`;

    const c1 = lineChart({
      fns: [{ f: (x) => B.D[Math.round(x)], cls: "line2" }, { f: (x) => A.D[Math.round(x)], cls: "line" }],
      lo: 0, hi: YRS, samples: YRS, xlabel: T("年 → 债务 / GDP（%）", "Years → debt / GDP (%)"), uid: "fd1", forceZero: true, markerX: 10, markerLabel: T("第 10 年", "yr 10"),
    });
    $("#fd-c1").innerHTML = chartBlock(c1, [["var(--orange)", T("你的设定", "Your settings")], ["var(--blue)", T("CBO 式假设（新债 4.1%）", "CBO-style (new debt at 4.1%)")]]);
    const c2 = lineChart({
      fns: [{ f: (x) => B.I[Math.round(x)], cls: "line2" }, { f: (x) => A.I[Math.round(x)], cls: "line3" }],
      lo: 0, hi: YRS, samples: YRS, xlabel: T("年 → 利息支出 / GDP（%）", "Years → interest / GDP (%)"), uid: "fd2", forceZero: true,
    });
    $("#fd-c2").innerHTML = chartBlock(c2, [["var(--red)", T("你的设定：利息 / GDP", "Your settings: interest / GDP")], ["var(--blue)", T("CBO 式假设", "CBO-style")]]);

    const d10 = A.D[10], d30 = A.D[30], r10 = A.R[10], i10 = A.I[10];
    const e = $("#fd-d"); e.textContent = fmtNum(d10, 0) + "% / " + fmtNum(d30, 0) + "%"; e.className = "v " + (d30 > st.d0 + 5 ? "neg" : d30 < st.d0 - 5 ? "pos" : "acc");
    $("#fd-i").textContent = fmtNum(i10, 2) + "%" + T("（约 ", " (about $") + fmtNum(i10 / 100 * GDP_T, 2) + T(" 万亿美元）", "T)");
    const rg = (r10 - A.g) * 100;
    const eg = $("#fd-rg10"); eg.textContent = sg(rg, 2) + T(" 个百分点", " pts"); eg.className = "v " + (rg > 0 ? "neg" : "pos");
    const pbStar = d10 * (r10 - A.g) / (1 + A.g);
    $("#fd-pbs").textContent = sg(pbStar, 1) + "%";

    const lines = [];
    const gap = pbStar - st.pb;
    if (gap > 0.05) lines.push(`${T("第 10 年：要让债务率不再上升，基本收支需要约", "Year 10: to stop the ratio rising, the primary balance must be about")} <b>${sg(pbStar, 1)}%</b>${T("，你设定的是", "; you set")} <b>${sg(st.pb, 1)}%</b>${T("——差距约 GDP 的", " — a gap of about")} <b>${fmtNum(gap, 1)}%</b>${T("（按今天 GDP 约 ", " of GDP (about $")}${fmtNum(gap / 100 * GDP_T, 2)}${T(" 万亿美元/年）。", "T a year at today's GDP).")}`);
    else lines.push(`<span class="ok">${T("第 10 年：稳定债务只需要约", "Year 10: stabilizing the debt needs only about")} <b>${sg(pbStar, 1)}%</b>${T("，你设定的", "; your")} <b>${sg(st.pb, 1)}%</b> ${T("已经足够，债务率在下降或持平。", "is already enough, so the ratio is flat or falling.")}</span>`);
    const cross = A.D.findIndex((x) => x >= 130);
    if (cross > 0) lines.push(`<span class="bad">${T("债务率在第 " + cross + " 年超过 GDP 的 130%。", "The ratio passes 130% of GDP in year " + cross + ".")}</span>`);
    if (d30 < st.d0 - 5) lines.push(`<span class="ok">${T("30 年后债务率比起点低了 " + fmtNum(st.d0 - d30, 0) + " 个百分点。", "After 30 years the ratio is " + fmtNum(st.d0 - d30, 0) + " points below where it started.")}</span>`);
    if (st.rep && real < 0) lines.push(`<span class="warn">${T("金融抑制开启：新债实际利率为", "Repression on: the real rate on new debt is")} ${fmtPct(real, 2)}${T("。债务率下降的一部分，是从国债持有人的购买力里“悄悄”拿走的——本课说的第三个出口。", ". Part of the fall in the debt ratio is quietly taken from bondholders' purchasing power — the third exit.")}</span>`);
    if (st.mat <= 3 && !st.rep) lines.push(`<span class="warn">${T("平均期限很短：利率变化几乎马上传到利息账单上——多发短债把利率风险留给了财政部。", "Very short average maturity: rate changes hit the interest bill almost at once — leaning on bills leaves the rate risk with the Treasury.")}</span>`);
    $("#fd-log").innerHTML = lines.map((l) => `<div>${l}</div>`).join("");
  };

  const sync = () => {
    $("#fd-d0").value = st.d0; $("#fd-pb").value = st.pb; $("#fd-rg").value = st.rg; $("#fd-inf").value = st.inf; $("#fd-mkt").value = st.mkt; $("#fd-mat").value = st.mat;
    paint();
  };
  [["#fd-d0", "d0"], ["#fd-pb", "pb"], ["#fd-rg", "rg"], ["#fd-inf", "inf"], ["#fd-mkt", "mkt"], ["#fd-mat", "mat"]].forEach(([id, k]) =>
    $(id).addEventListener("input", (e) => { st[k] = clamp(+e.target.value, -100, 1000); paint(); }));
  root.querySelectorAll("#fd-rep button").forEach((b) => b.addEventListener("click", () => { st.rep = b.dataset.v === "1"; paint(); }));
  root.querySelectorAll("[data-p]").forEach((b) => b.addEventListener("click", () => {
    const p = b.dataset.p;
    if (p === "reset" || p === "mkt") st = { ...BASE };
    if (p === "cbo") st = { ...CBO };
    if (p === "growth") st = { ...BASE, rg: 3.5 };
    if (p === "aust") st = { ...BASE, pb: 1.0 };
    if (p === "infl") st = { ...BASE, inf: 5.5, rep: true };
    if (p === "ww2") st = { d0: 106, pb: 0.5, rg: 3.0, inf: 4.0, mkt: 2.5, mat: 8, rep: true };
    sync();
  }));
  sync();
}
