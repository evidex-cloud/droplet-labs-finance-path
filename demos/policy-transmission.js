// 交互演示：政策冲击的传导沙盘（示意模型）——设定加息/降息幅度、期限溢价反应、固定利率房贷占比、央行信誉与信贷压力，
// 看 2 年期、10 年期、房贷月供、股票估值、美元、产出缺口与通胀在 36 个月里怎么一步步反应，以及五条管道各贡献多少。
import { npv, gordon, fmtPct, fmtUsd, fmtNum, clamp } from "./_fin.js";
import { lineChart, chartBlock } from "./_chart.js";

export default function mount(root, lang) {
  const en = lang === "en";
  const T = (zh, e) => (en ? e : zh);

  const BASE_MORT = 0.07, LOAN = 400000, R0 = 0.08, G0 = 0.04;
  const BASE = { shock: 100, tp: 0, fixed: 0.9, cred: "mid", stress: false, m: 12 };
  let st = { ...BASE };
  const CRED = { low: 0.3, mid: 0.6, high: 0.9 };

  // 驼峰形脉冲响应：t = τ 时达到峰值 1
  const h = (t, tau) => (t <= 0 ? 0 : (t / tau) * Math.exp(1 - t / tau));
  const pay = (r) => { const fl = []; for (let k = 1; k <= 360; k++) fl.push({ t: k, cf: 1 }); return LOAN / npv(fl, r / 12); };

  const model = (s) => {
    const c = CRED[s.cred];
    const d2 = s.shock * (0.85 + 0.1 * c);           // 2 年期：立刻按预期重定价（bp）
    const d10 = s.shock * 0.45 + s.tp;                // 10 年期：预期的一部分 + 期限溢价（bp）
    const val = gordon(1, R0 + d10 / 1e4, G0) / gordon(1, R0, G0) - 1; // 估值（折现率）效应
    const ch = [
      { k: "rates", zh: "① 利率（房贷、投资）", en: "① Rates (housing, capex)", peak: -0.35 * ((d2 + d10) / 200) * (1.4 - s.fixed), tau: 14 },
      { k: "credit", zh: "② 信贷（放贷、利差）", en: "② Credit (lending, spreads)", peak: -0.18 * (s.shock / 100) * (s.stress ? 2.2 : 1), tau: 12 },
      { k: "wealth", zh: "③ 资产价格（财富效应）", en: "③ Asset prices (wealth effect)", peak: 2 * val, tau: 9 },
      { k: "fx", zh: "④ 汇率（净出口）", en: "④ Exchange rate (net exports)", peak: -0.07 * (d2 / 100), tau: 10 },
      { k: "exp", zh: "⑤ 预期（信心）", en: "⑤ Expectations (confidence)", peak: -0.05 * c * (s.shock / 100), tau: 4 },
    ];
    const gap = (t) => ch.reduce((a, x) => a + x.peak * h(t, x.tau), 0);
    const infl = (t) => 0.5 * ch.reduce((a, x) => a + x.peak * h(t, x.tau + 10), 0)
      - 0.1 * (d2 / 100) * h(t, 6)
      - 0.2 * c * (s.shock / 100) * (1 - Math.exp(-t / 6));
    const mortAvg = (t) => (d10 / 100) * ((1 - s.fixed) + s.fixed * Math.min(1, (t * 0.07) / 12));
    const eq = (t) => val * 100 + 3 * gap(t);
    return { c, d2, d10, val, ch, gap, infl, mortAvg, eq };
  };

  root.innerHTML = `
    <div class="demo">
      <div class="demo-head">${T("🚢 政策冲击传导沙盘：美联储转一下舵，经济多久才转向？（示意模型）", "🚢 Policy-shock sandbox: the Fed turns the wheel — how long until the economy turns? (illustrative model)")}</div>
      <div class="demo-grid">
        <div class="demo-block">
          <label class="demo-label">${T("政策利率变动", "Policy-rate change")}${T("：", ": ")}<b id="pt-sv"></b></label>
          <input class="demo-slider" type="range" id="pt-s" min="-300" max="500" step="25" value="100"/>
          <label class="demo-label">${T("期限溢价的额外变动（赤字、油价、供给担忧）", "Extra term-premium move (deficits, oil, supply worries)")}${T("：", ": ")}<b id="pt-tv"></b></label>
          <input class="demo-slider" type="range" id="pt-t" min="-50" max="150" step="10" value="0"/>
        </div>
        <div class="demo-block">
          <label class="demo-label">${T("存量房贷中固定利率的占比", "Share of existing mortgages at fixed rates")}${T("：", ": ")}<b id="pt-fv"></b></label>
          <input class="demo-slider" type="range" id="pt-f" min="40" max="95" step="5" value="90"/>
          <label class="demo-label">${T("央行信誉（预期渠道强度）", "Central-bank credibility (strength of expectations channel)")}</label>
          <div class="demo-seg" id="pt-c">
            <button data-c="low">${T("低", "Low")}</button><button data-c="mid">${T("中", "Medium")}</button><button data-c="high">${T("高", "High")}</button>
          </div>
          <div class="demo-seg" id="pt-x" style="margin-top:8px">
            <button data-x="0">${T("信贷正常", "Credit normal")}</button><button data-x="1">${T("信贷紧张（如 2023 年 3 月）", "Credit stress (like March 2023)")}</button>
          </div>
        </div>
      </div>
      <div class="demo-block">
        <label class="demo-label">${T("查看第几个月", "Read off month")}${T("：", ": ")}<b id="pt-mv"></b></label>
        <input class="demo-slider" type="range" id="pt-m" min="0" max="36" step="1" value="12"/>
      </div>
      <div id="pt-chart"></div>
      <div class="stat-row">
        <div class="stat"><div class="k">${T("2 年期 / 10 年期国债", "2-year / 10-year Treasury")}</div><div class="v" id="pt-y">–</div></div>
        <div class="stat"><div class="k">${T("新借 40 万美元 30 年房贷月供", "New $400k 30-yr mortgage payment")}</div><div class="v" id="pt-p">–</div></div>
        <div class="stat"><div class="k">${T("股票 / 高贝塔风险资产（示意，如比特币）", "Stocks / high-beta risk asset (illustrative, e.g. BTC)")}</div><div class="v" id="pt-e">–</div></div>
        <div class="stat"><div class="k">${T("美元", "Dollar")}</div><div class="v" id="pt-d">–</div></div>
      </div>
      <div class="demo-label" style="margin-top:12px">${T("此刻五条管道对产出缺口的贡献（百分点）", "Each pipe's contribution to the output gap right now (percentage points)")}</div>
      <div class="stages" id="pt-bars"></div>
      <div class="demo-btns">
        <button class="demo-btn" data-p="p22">${T("📖 2022–23：+525bp、九成固定房贷", "📖 2022–23: +525bp, 90% fixed mortgages")}</button>
        <button class="demo-btn" data-p="p26">${T("📖 2026 年 9 月：+25bp，长端被期限溢价推高", "📖 Sept 2026: +25bp, long end pushed by term premium")}</button>
        <button class="demo-btn" data-p="uk">${T("📖 英国式浮动房贷", "📖 UK-style floating mortgages")}</button>
        <button class="demo-btn" data-p="reset">${T("⟲ 重置", "⟲ Reset")}</button>
      </div>
      <div class="demo-log" id="pt-log"></div>
      <p class="demo-tip">${T(
        "先看图：收益率、股价、美元在第 0 个月就跳了，产出缺口（蓝线）要到一年左右才触底，通胀（红线）更晚——这就是“长而多变的时滞”。再把固定房贷占比从 90% 拉到 50%：同样的加息，利率管道的力量明显变大。点“2026 年 9 月”：政策只动 25bp，10 年期和房贷月供却大涨——长端主要由预期和期限溢价决定。最后切换信誉“低/高”，看“牺牲率”：信誉越高，压下同样的通胀要付出的产出越少。模型为示意，不是预测。",
        "Look at the chart first: yields, stocks and the dollar jump in month 0, but the output gap (blue) bottoms only around a year out, and inflation (red) later still — long and variable lags. Now drag the fixed-rate share from 90% to 50%: the same hike gets much more force through the rate pipe. Hit “Sept 2026”: policy moves 25bp, yet the 10-year and the mortgage payment jump — the long end is driven by expectations and the term premium. Finally flip credibility between low and high and watch the sacrifice ratio: the more credible the central bank, the less output it gives up for the same disinflation. Illustrative model, not a forecast."
      )}</p>
    </div>`;

  const $ = (q) => root.querySelector(q);
  const bp = (x) => (x >= 0 ? "+" : "") + Math.round(x) + "bp";
  const pp = (x, d = 2) => (x >= 0 ? "+" : "") + fmtNum(x, d);

  const paint = () => {
    const M = model(st), t = st.m;
    $("#pt-sv").textContent = bp(st.shock);
    $("#pt-tv").textContent = bp(st.tp);
    $("#pt-fv").textContent = Math.round(st.fixed * 100) + "%";
    $("#pt-mv").textContent = t + T(" 个月", " months");
    root.querySelectorAll("#pt-c button").forEach((b) => b.classList.toggle("on", b.dataset.c === st.cred));
    root.querySelectorAll("#pt-x button").forEach((b) => b.classList.toggle("on", (b.dataset.x === "1") === st.stress));

    const res = lineChart({
      fns: [
        { f: (x) => M.gap(x), cls: "line" },
        { f: (x) => M.infl(x), cls: "line3" },
        { f: (x) => M.mortAvg(x), cls: "line2" },
      ],
      lo: 0, hi: 36, samples: 72, xlabel: T("月份 → 相对基准的变化（百分点）", "Months → change vs baseline (percentage points)"),
      markerX: t, markerLabel: t + T(" 月", "m"), uid: "pt", forceZero: true,
    });
    $("#pt-chart").innerHTML = chartBlock(res, [
      ["var(--orange)", T("产出缺口", "Output gap")],
      ["var(--red)", T("通胀变化", "Inflation change")],
      ["var(--blue)", T("存量房贷平均利率变化", "Average rate on existing mortgages")],
    ]);

    $("#pt-y").textContent = bp(M.d2) + " / " + bp(M.d10);
    const p0 = pay(BASE_MORT), p1 = pay(BASE_MORT + M.d10 / 1e4);
    const pe = $("#pt-p"); pe.textContent = fmtUsd(p1) + T("（", " (") + (p1 >= p0 ? "+" : "−") + fmtUsd(Math.abs(p1 - p0)) + T("）", ")"); pe.className = "v " + (p1 > p0 + 1 ? "neg" : p1 < p0 - 1 ? "pos" : "");
    const e = M.eq(t);
    const ee = $("#pt-e"); ee.textContent = pp(e, 1) + "% / " + pp(2.5 * e, 1) + "%"; ee.className = "v " + (e < 0 ? "neg" : "pos");
    $("#pt-d").textContent = pp(3 * M.d2 / 100, 1) + "%";

    const contrib = M.ch.map((x) => ({ ...x, v: x.peak * h(t, x.tau) }));
    const mx = Math.max(0.05, ...M.ch.map((x) => Math.abs(x.peak)));
    $("#pt-bars").innerHTML = contrib.map((x) => `<div class="stage-bar"><span class="lab">${en ? x.en : x.zh}</span>
      <div class="track"><div class="fill" style="width:${clamp(Math.abs(x.v) / mx * 100, 0, 100)}%;background:${x.v < 0 ? "var(--red)" : "var(--green)"}"></div></div>
      <span class="val">${pp(x.v)}</span></div>`).join("");

    // 36 个月累计：产出损失与通胀下降 → 牺牲率
    let cumGap = 0, cumInf = 0, trough = 0, troughM = 0;
    for (let k = 1; k <= 36; k++) { const g = M.gap(k); cumGap += g / 12; cumInf += M.infl(k) / 12; if (g < trough) { trough = g; troughM = k; } }
    const lines = [];
    lines.push(`${T("第 " + t + " 个月：产出缺口", "Month " + t + ": output gap")} <b>${pp(M.gap(t))}</b>${T("，", ", ")}${T("通胀", "inflation")} <b>${pp(M.infl(t))}</b>${T("（百分点）", " (pp)")}`);
    if (st.shock > 0) {
      lines.push(`${T("产出缺口在第 " + troughM + " 个月触底，约", "The output gap bottoms in month " + troughM + ", at about")} <b>${pp(trough)}</b>${T("；金融价格在第 0 个月就已经动完了。", "; financial prices had finished moving in month 0.")}`);
      if (cumInf < -0.01) {
        const sr = cumGap / cumInf;
        lines.push(`<span class="${sr > 1.5 ? "warn" : "ok"}">${T("牺牲率（36 个月累计产出损失 ÷ 累计通胀下降）约", "Sacrifice ratio (36-month cumulative output loss ÷ cumulative disinflation) about")} <b>${fmtNum(sr, 2)}</b>${T("——信誉越高，这个数越小。", " — the more credible the bank, the smaller this gets.")}</span>`);
      }
    }
    if (Math.abs(st.tp) >= 50) lines.push(`<span class="warn">${T("期限溢价变动了", "The term premium moved")} ${bp(st.tp)}${T("：10 年期的变化里，来自政策本身的只有", ": of the 10-year's move, only")} ${bp(st.shock * 0.45)}${T("。", " came from policy itself.")}</span>`);
    if (st.fixed >= 0.85 && st.shock > 0) lines.push(`${T("固定利率房贷占比", "With")} ${Math.round(st.fixed * 100)}%${T("：存量房贷平均利率 36 个月后只上升约", " of mortgages fixed, the average rate on existing mortgages rises only about")} ${pp(M.mortAvg(36))} ${T("个百分点——锁定效应。", "points after 36 months — the lock-in effect.")}`);
    $("#pt-log").innerHTML = lines.map((l) => `<div>${l}</div>`).join("");
  };

  const sync = () => { $("#pt-s").value = st.shock; $("#pt-t").value = st.tp; $("#pt-f").value = Math.round(st.fixed * 100); $("#pt-m").value = st.m; paint(); };
  $("#pt-s").addEventListener("input", (e) => { st.shock = +e.target.value; paint(); });
  $("#pt-t").addEventListener("input", (e) => { st.tp = +e.target.value; paint(); });
  $("#pt-f").addEventListener("input", (e) => { st.fixed = +e.target.value / 100; paint(); });
  $("#pt-m").addEventListener("input", (e) => { st.m = +e.target.value; paint(); });
  root.querySelectorAll("#pt-c button").forEach((b) => b.addEventListener("click", () => { st.cred = b.dataset.c; paint(); }));
  root.querySelectorAll("#pt-x button").forEach((b) => b.addEventListener("click", () => { st.stress = b.dataset.x === "1"; paint(); }));
  root.querySelectorAll("[data-p]").forEach((b) => b.addEventListener("click", () => {
    const p = b.dataset.p;
    if (p === "reset") st = { ...BASE };
    if (p === "p22") st = { ...BASE, shock: 500, tp: 0, fixed: 0.9, m: 18 };
    if (p === "p26") st = { ...BASE, shock: 25, tp: 100, fixed: 0.9, m: 0 };
    if (p === "uk") st = { ...BASE, shock: 100, fixed: 0.5, m: 12 };
    sync();
  }));
  sync();
}
