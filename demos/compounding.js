// 交互演示：复利计算器 + 72 法则检验。
// 预设四种场景（储蓄、信用卡债务、基金费用、橙子公司每股比特币），可调利率、年限、结息频率、费用和波动率；
// 曲线同时画出单利、复利、扣费后、含波动拖累的路径。所有计算走 _fin.js（fv / rule72）。
import { fv, rule72, fmtPct, fmtNum, fmtUsd } from "./_fin.js";
import { lineChart, chartBlock } from "./_chart.js";

export default function mount(root, lang) {
  const en = lang === "en";
  const T = (zh, e) => (en ? e : zh);

  const PRESETS = {
    save: { p: 1000, r: 7, n: 30, m: 1, fee: 0, vol: 0, unit: "usd", name: T("储蓄 / 指数基金", "Savings / index fund") },
    card: { p: 1000, r: 22, n: 5, m: 12, fee: 0, vol: 0, unit: "usd", name: T("信用卡欠款", "Credit-card balance") },
    fee: { p: 10000, r: 7, n: 30, m: 1, fee: 1, vol: 0, unit: "usd", name: T("基金收 1% 费用", "Fund with a 1% fee") },
    vol: { p: 10000, r: 10, n: 20, m: 1, fee: 0, vol: 50, unit: "usd", name: T("高波动资产", "Volatile asset") },
    bps: { p: 10000, r: 10, n: 10, m: 1, fee: 0, vol: 0, unit: "sats", name: T("橙子公司每股比特币", "Orange Corp BTC per share") },
  };
  const FREQS = [[1, T("每年", "Yearly")], [2, T("半年", "Semi")], [4, T("季度", "Quarterly")], [12, T("每月", "Monthly")], [365, T("每天", "Daily")]];
  let preset = "save", m = 1, unit = "usd";

  root.innerHTML = `
    <div class="demo">
      <div class="demo-head">${T("❄️ 复利雪球计算器：单利、复利、费用与波动", "❄️ The compounding snowball: simple, compound, fees and volatility")}</div>
      <div class="demo-btns" id="cp-presets">
        ${Object.keys(PRESETS).map((k) => `<button class="demo-btn ${k === preset ? "active" : ""}" data-k="${k}">${PRESETS[k].name}</button>`).join("")}
      </div>
      <div class="demo-grid">
        <div><label class="demo-label" id="cp-p-l"></label><input class="demo-slider" type="range" id="cp-p" min="100" max="100000" step="100"></div>
        <div><label class="demo-label">${T("年利率 / 年增长率", "Annual rate / growth")}${T("：", ": ")}<b id="cp-r-v"></b></label><input class="demo-slider" type="range" id="cp-r" min="0" max="30" step="0.5"></div>
        <div><label class="demo-label">${T("年数", "Years")}${T("：", ": ")}<b id="cp-n-v"></b></label><input class="demo-slider" type="range" id="cp-n" min="1" max="50" step="1"></div>
        <div><label class="demo-label">${T("每年费用", "Annual fee")}${T("：", ": ")}<b id="cp-fee-v"></b></label><input class="demo-slider" type="range" id="cp-fee" min="0" max="3" step="0.1"></div>
        <div><label class="demo-label">${T("年波动率（看波动拖累）", "Annual volatility (for volatility drag)")}${T("：", ": ")}<b id="cp-vol-v"></b></label><input class="demo-slider" type="range" id="cp-vol" min="0" max="90" step="5"></div>
        <div><label class="demo-label">${T("结息频率", "Compounding frequency")}</label><div class="demo-seg" id="cp-m">${FREQS.map(([k, l]) => `<button data-m="${k}">${l}</button>`).join("")}</div></div>
      </div>
      <div id="cp-chart"></div>
      <div class="stat-row">
        <div class="stat"><div class="k">${T("复利终值", "Compound result")}</div><div class="v acc" id="cp-fv"></div></div>
        <div class="stat"><div class="k">${T("单利终值", "Simple-interest result")}</div><div class="v" id="cp-simple"></div></div>
        <div class="stat"><div class="k">${T("利息的利息", "Interest on interest")}</div><div class="v pos" id="cp-ioi"></div></div>
        <div class="stat"><div class="k">${T("有效年利率", "Effective annual rate")}</div><div class="v" id="cp-ear"></div></div>
      </div>
      <div class="stat-row">
        <div class="stat"><div class="k">${T("72 法则：翻倍年数", "Rule of 72: years to double")}</div><div class="v" id="cp-r72"></div></div>
        <div class="stat"><div class="k">${T("精确翻倍年数", "Exact years to double")}</div><div class="v" id="cp-exact"></div></div>
        <div class="stat"><div class="k">${T("扣费 / 波动后终值", "After fees / volatility")}</div><div class="v neg" id="cp-net"></div></div>
      </div>
      <div class="demo-log" id="cp-log" style="margin-top:12px"></div>
      <p class="demo-tip">${T(
        "先把年数从 10 拖到 40，看橙色曲线怎么在后半段突然抬头——复利的力量主要来自时间。再点“基金收 1% 费用”和“高波动资产”：<strong>费用和波动都是反向复利</strong>，平均回报一样，终值却差一大截。最后点“橙子公司每股比特币”，想一想：10% 的年增长要靠什么前提才能持续十年？",
        "First drag the years from 10 to 40 and watch the orange curve lift off in the back half — compounding's power is mostly time. Then try “Fund with a 1% fee” and “Volatile asset”: <strong>fees and volatility are compounding in reverse</strong>; the same average return ends far lower. Finally click “Orange Corp BTC per share” and ask what has to stay true for 10% a year to last a decade."
      )}</p>
    </div>`;

  const $ = (s) => root.querySelector(s);
  const fmtV = (x) => (unit === "sats" ? fmtNum(x, 0) + T(" 聪", " sats") : fmtUsd(x, 0));

  const load = (k) => {
    const p = PRESETS[k];
    preset = k; m = p.m; unit = p.unit;
    $("#cp-p").value = p.p; $("#cp-r").value = p.r; $("#cp-n").value = p.n; $("#cp-fee").value = p.fee; $("#cp-vol").value = p.vol;
    root.querySelectorAll("#cp-presets button").forEach((b) => b.classList.toggle("active", b.dataset.k === k));
    paint();
  };

  const paint = () => {
    const P = +$("#cp-p").value, r = +$("#cp-r").value / 100, n = +$("#cp-n").value;
    const fee = +$("#cp-fee").value / 100, vol = +$("#cp-vol").value / 100;
    root.querySelectorAll("#cp-m button").forEach((b) => b.classList.toggle("on", +b.dataset.m === m));
    $("#cp-p-l").innerHTML = `${unit === "sats" ? T("起点（聪/股）", "Starting point (sats/share)") : T("本金", "Principal")}${T("：", ": ")}<b>${fmtV(P)}</b>`;
    $("#cp-r-v").textContent = fmtPct(r, 1);
    $("#cp-n-v").textContent = n;
    $("#cp-fee-v").textContent = fmtPct(fee, 1);
    $("#cp-vol-v").textContent = fmtPct(vol, 0);

    const ear = fv(1, r, 1, m) - 1;
    const gNet = ear - fee;                                // 扣费后的年复利（毛回报 − 费率，与课文口径一致）
    const gGeo = Math.exp(Math.log(1 + gNet) - (vol * vol) / 2) - 1; // 几何平均 ≈ 算术 − σ²/2（对数近似）
    const compound = (t) => fv(P, r, t, m);
    const simple = (t) => P * (1 + r * t);
    const net = (t) => fv(P, gGeo, t);
    const showNet = fee > 0 || vol > 0;

    const exact = ear > 0 ? Math.log(2) / Math.log(1 + ear) : Infinity;
    const res = lineChart({
      fns: [
        { f: simple, cls: "line2" },
        { f: compound, cls: unit === "sats" ? "line5" : "line" },
        ...(showNet ? [{ f: net, cls: "line3" }] : []),
      ],
      lo: 0, hi: n, xlabel: T("年", "years"), forceZero: true, uid: "cp",
      markerX: isFinite(exact) && exact <= n ? exact : null, markerLabel: T("翻倍", "2×"),
    });
    $("#cp-chart").innerHTML = chartBlock(res, [
      ["var(--blue)", T("单利", "Simple interest")],
      [unit === "sats" ? "var(--btc)" : "var(--orange)", T("复利", "Compound")],
      ...(showNet ? [["var(--red)", T("扣费 / 含波动拖累", "After fees / volatility drag")]] : []),
    ]);

    const F = compound(n), S = simple(n), N = net(n);
    $("#cp-fv").textContent = fmtV(F);
    $("#cp-simple").textContent = fmtV(S);
    $("#cp-ioi").textContent = fmtV(F - S);
    $("#cp-ear").textContent = fmtPct(ear, 2);
    $("#cp-r72").textContent = r > 0 ? fmtNum(rule72(ear), 1) : "∞";
    $("#cp-exact").textContent = isFinite(exact) ? fmtNum(exact, 1) : "∞";
    $("#cp-net").textContent = showNet ? fmtV(N) : "–";

    const lines = [];
    const share = F - P > 0 ? (F - S) / (F - P) : 0;
    lines.push(`${T("总增长里有", "Of the total growth,")} <b>${fmtPct(share, 0)}</b> ${T("来自“利息的利息”。", "came from interest on interest.")}`);
    if (Math.abs(ear - r) > 0.0005) lines.push(`<span class="warn">${T("报价利率", "Quoted rate")} ${fmtPct(r, 1)} → ${T("按所选频率结息，有效年利率", "compounded at this frequency, the effective annual rate is")} ${fmtPct(ear, 2)}${T("（APR 与 APY 的差别）。", " (the APR vs APY gap).")}</span>`);
    if (r > 0) {
      const err = rule72(ear) - exact;
      lines.push(`${T("72 法则误差", "Rule-of-72 error")}${T("：", ": ")}${err >= 0 ? "+" : ""}${fmtNum(err, 2)} ${T("年", "yrs")} ${Math.abs(err) < 0.3 ? `<span class="ok">${T("——在这个利率下心算足够准。", "— close enough for mental math at this rate.")}</span>` : `<span class="warn">${T("——利率越偏离 8%，误差越大。", "— the further the rate from 8%, the larger the error.")}</span>`}`);
    }
    if (showNet) {
      const lost = 1 - N / F;
      lines.push(`<span class="bad">${T("费用与波动拖累合计吃掉了终值的", "Fees and volatility drag together ate")} ${fmtPct(lost, 0)}${T("。几何年回报约", " of the final value. The geometric annual return is about")} ${fmtPct(gGeo, 2)}${T("，而不是", ", not")} ${fmtPct(ear, 2)}${T("。", ".")}</span>`);
    }
    if (preset === "card") lines.push(`<span class="bad">${T(`这是欠款：复利站在放贷人那边。不还款，${fmtUsd(P)} 会在 ${n} 年后变成 ${fmtUsd(F)}。`, `This is debt: compounding works for the lender. Left unpaid, ${fmtUsd(P)} grows to ${fmtUsd(F)} in ${n} years.`)}</span>`);
    if (unit === "sats") lines.push(`<span class="warn">${T("每股比特币的“复利”要求每年都能以溢价（mNAV > 1）增发买币；溢价一消失，增长率就不是这个数了（阶段 16.7、18.3）。", "BTC-per-share “compounding” requires issuing at a premium (mNAV > 1) every single year; once the premium goes, this growth rate no longer applies (Stages 16.7, 18.3).")}</span>`);
    $("#cp-log").innerHTML = lines.map((l) => `<div>${l}</div>`).join("");
  };

  root.querySelectorAll("#cp-presets button").forEach((b) => b.addEventListener("click", () => load(b.dataset.k)));
  root.querySelectorAll("#cp-m button").forEach((b) => b.addEventListener("click", () => { m = +b.dataset.m; paint(); }));
  ["#cp-p", "#cp-r", "#cp-n", "#cp-fee", "#cp-vol"].forEach((s) => $(s).addEventListener("input", paint));
  load("save");
}
