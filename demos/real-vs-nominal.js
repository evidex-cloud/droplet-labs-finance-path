// 交互演示：名义 vs 实际回报计算器。调名义利率、通胀、利息税率、年限与 TIPS 实际收益率，
// 看费雪方程的精确值与近似值、税后实际回报、盈亏平衡通胀率，以及 10,000 美元在四种选择下的实际购买力路径。
// 计算走 _fin.js（realRate / fv）。
import { realRate, fv, fmtPct, fmtUsd, tex } from "./_fin.js";
import { lineChart, chartBlock } from "./_chart.js";

export default function mount(root, lang) {
  const en = lang === "en";
  const T = (zh, e) => (en ? e : zh);
  // 把格式化好的数字（"$1,000.00" / "10.00%"）转成可放进 LaTeX 的写法
  const tx = (s) => String(s).replace(/,/g, "{,}").replace(/%/g, String.raw`\%`).replace(/\$/g, String.raw`\$`);

  const PRESETS = {
    normal: { i: 5, pi: 3, tax: 30, tips: 1.8, n: 20, name: T("常态：5% 利率 / 3% 通胀", "Normal: 5% rate / 3% inflation") },
    y2021: { i: 0.1, pi: 7, tax: 30, tips: -1, n: 5, name: T("2021 式：0.1% 存款 / 7% 通胀", "2021-style: 0.1% savings / 7% CPI") },
    s1970: { i: 7, pi: 9, tax: 40, tips: 1, n: 10, name: T("1970 年代式（示意）", "1970s-style (illustrative)") },
    hyper: { i: 40, pi: 35, tax: 0, tips: 3, n: 5, name: T("高通胀国家（示意）", "High-inflation country (illustrative)") },
  };
  const START = 10000;

  root.innerHTML = `
    <div class="demo">
      <div class="demo-head">${T("📏 名义 vs 实际：你的钱到底长了多少", "📏 Nominal vs real: how much did your money really grow?")}</div>
      <div class="demo-btns" id="rn-presets">
        ${Object.keys(PRESETS).map((k) => `<button class="demo-btn" data-k="${k}">${PRESETS[k].name}</button>`).join("")}
      </div>
      <div class="demo-grid">
        <div><label class="demo-label">${T("名义利率 i", "Nominal rate i")}${T("：", ": ")}<b id="rn-i-v"></b></label><input class="demo-slider" type="range" id="rn-i" min="0" max="45" step="0.1"></div>
        <div><label class="demo-label">${T("通胀率 π", "Inflation π")}${T("：", ": ")}<b id="rn-pi-v"></b></label><input class="demo-slider" type="range" id="rn-pi" min="-2" max="40" step="0.1"></div>
        <div><label class="demo-label">${T("利息税率", "Tax rate on interest")}${T("：", ": ")}<b id="rn-tax-v"></b></label><input class="demo-slider" type="range" id="rn-tax" min="0" max="50" step="1"></div>
        <div><label class="demo-label">${T("TIPS 实际收益率", "TIPS real yield")}${T("：", ": ")}<b id="rn-tips-v"></b></label><input class="demo-slider" type="range" id="rn-tips" min="-2" max="4" step="0.1"></div>
        <div><label class="demo-label">${T("年数", "Years")}${T("：", ": ")}<b id="rn-n-v"></b></label><input class="demo-slider" type="range" id="rn-n" min="1" max="40" step="1"></div>
      </div>
      <div class="stat-row">
        <div class="stat"><div class="k">${T("实际利率（精确）", "Real rate (exact)")}</div><div class="v" id="rn-real"></div></div>
        <div class="stat"><div class="k">${T("近似 ", "Approx. ")}${tex(String.raw`i - \pi`)}</div><div class="v" id="rn-approx"></div></div>
        <div class="stat"><div class="k">${T("税后实际回报", "After-tax real return")}</div><div class="v" id="rn-atr"></div></div>
        <div class="stat"><div class="k">${T("盈亏平衡通胀率", "Breakeven inflation")}</div><div class="v" id="rn-be"></div></div>
      </div>
      <div id="rn-chart"></div>
      <div class="stat-row">
        <div class="stat"><div class="k">${T("名义账面", "Nominal balance")}</div><div class="v" id="rn-nom"></div></div>
        <div class="stat"><div class="k">${T("折成今天的购买力", "In today's dollars")}</div><div class="v" id="rn-realv"></div></div>
        <div class="stat"><div class="k">${T("税后，今天的购买力", "After tax, today's dollars")}</div><div class="v" id="rn-taxv"></div></div>
        <div class="stat"><div class="k">${T("现金放抽屉", "Cash in a drawer")}</div><div class="v neg" id="rn-cash"></div></div>
      </div>
      <div class="demo-log" id="rn-log" style="margin-top:12px"></div>
      <p class="demo-tip">${T(
        "点“2021 式”：账面数字在涨，紫线以外的每条线却都在往下走——这就是负实际利率。再把税率拉高：<strong>税按名义收益征收，通胀越高，税后实际回报越惨</strong>。最后拖动通胀，看它越过盈亏平衡点时，TIPS（绿线）怎么反超普通债券。",
        "Click “2021-style”: the balance keeps rising, yet the real lines all slope down — that is a negative real rate. Then raise the tax rate: <strong>tax falls on nominal returns, so the higher inflation runs, the worse the after-tax real return</strong>. Finally drag inflation past the breakeven and watch TIPS (green) overtake the ordinary bond."
      )}</p>
    </div>`;

  const $ = (s) => root.querySelector(s);
  const cls = (el, x) => { el.classList.toggle("pos", x > 0.00005); el.classList.toggle("neg", x < -0.00005); };

  const paint = () => {
    const i = +$("#rn-i").value / 100, pi = +$("#rn-pi").value / 100, tax = +$("#rn-tax").value / 100;
    const tips = +$("#rn-tips").value / 100, n = +$("#rn-n").value;
    $("#rn-i-v").textContent = fmtPct(i, 1); $("#rn-pi-v").textContent = fmtPct(pi, 1);
    $("#rn-tax-v").textContent = fmtPct(tax, 0); $("#rn-tips-v").textContent = fmtPct(tips, 1); $("#rn-n-v").textContent = n;

    const r = realRate(i, pi), rTax = realRate(i * (1 - tax), pi), be = realRate(i, tips);
    $("#rn-real").textContent = fmtPct(r, 2); cls($("#rn-real"), r);
    $("#rn-approx").textContent = fmtPct(i - pi, 2);
    $("#rn-atr").textContent = fmtPct(rTax, 2); cls($("#rn-atr"), rTax);
    $("#rn-be").textContent = fmtPct(be, 2);

    // 以“今天的美元”计的实际购买力路径
    const nomBal = (t) => fv(START, i, t);
    const realBond = (t) => fv(START, r, t);
    const realTax = (t) => fv(START, rTax, t);
    const realTips = (t) => fv(START, tips, t);
    const realCash = (t) => fv(START, realRate(0, pi), t);
    const res = lineChart({
      fns: [{ f: nomBal, cls: "line2" }, { f: realBond, cls: "line" }, { f: realTax, cls: "line3" }, { f: realTips, cls: "line4" }, { f: realCash, cls: "line5" }],
      lo: 0, hi: n, xlabel: T("年", "years"), forceZero: true, uid: "rn",
    });
    $("#rn-chart").innerHTML = chartBlock(res, [
      ["var(--blue)", T("名义账面（美元数字）", "Nominal balance (dollar count)")],
      ["var(--orange)", T("实际购买力（税前）", "Real value (pre-tax)")],
      ["var(--red)", T("实际购买力（税后）", "Real value (after tax)")],
      ["var(--green)", T("TIPS 实际购买力", "TIPS real value")],
      ["var(--btc)", T("现金 0%", "Cash at 0%")],
    ]);

    $("#rn-nom").textContent = fmtUsd(nomBal(n));
    $("#rn-realv").textContent = fmtUsd(realBond(n));
    $("#rn-taxv").textContent = fmtUsd(realTax(n));
    $("#rn-cash").textContent = fmtUsd(realCash(n));

    const lines = [];
    lines.push(`${T("费雪方程：", "Fisher: ")}${tex(String.raw`r = \frac{1 + ${tx(fmtPct(i, 1))}}{1 + ${tx(fmtPct(pi, 1))}} - 1 = \mathbf{${tx(fmtPct(r, 2))}}`)}${T("；近似式误差", "; approximation error")} ${fmtPct(i - pi - r, 2)}${Math.abs(i - pi - r) > 0.005 ? `<span class="warn">${T("——通胀高时必须用精确式。", " — at high inflation, use the exact form.")}</span>` : ""}`);
    if (r < 0) lines.push(`<span class="bad">${T("负实际利率：账面从", "Negative real rate: the balance goes from")} ${fmtUsd(START)} ${T("涨到", "to")} ${fmtUsd(nomBal(n))}${T("，购买力却只剩今天的", ", yet it buys only")} ${fmtUsd(realBond(n))}${T("。差额就是“看不见的税”，流向了债务人。", " in today's money. The gap is the invisible tax, flowing to debtors.")}</span>`);
    if (tax > 0 && rTax < r) lines.push(r > 0
      ? `${T("对名义收益征税后，实际回报从", "Taxing the nominal return cuts the real return from")} ${fmtPct(r, 2)} ${T("降到", "to")} ${fmtPct(rTax, 2)}${T("。相当于对实际收益征收了", ". That is an effective tax on the real gain of")} <b>${fmtPct(1 - rTax / r, 0)}</b>${T("。", ".")}`
      : `<span class="bad">${T("实际回报本已为负，税却仍按名义收益征收：实际回报从", "The real return was already negative, yet tax still falls on the nominal return: it drops from")} ${fmtPct(r, 2)} ${T("进一步降到", "to")} ${fmtPct(rTax, 2)}${T("。", ".")}</span>`);
    lines.push(pi > be
      ? `<span class="ok">${T("通胀", "Inflation")} ${fmtPct(pi, 1)} ${T("高于盈亏平衡", "is above the breakeven of")} ${fmtPct(be, 2)}${T("：TIPS 胜过普通债券。", ": TIPS beat the ordinary bond.")}</span>`
      : `${T("通胀", "Inflation")} ${fmtPct(pi, 1)} ${T("低于盈亏平衡", "is below the breakeven of")} ${fmtPct(be, 2)}${T("：普通债券胜过 TIPS。", ": the ordinary bond beats TIPS.")}`);
    $("#rn-log").innerHTML = lines.map((l) => `<div>${l}</div>`).join("");
  };

  const load = (k) => {
    const p = PRESETS[k];
    $("#rn-i").value = p.i; $("#rn-pi").value = p.pi; $("#rn-tax").value = p.tax; $("#rn-tips").value = p.tips; $("#rn-n").value = p.n;
    root.querySelectorAll("#rn-presets button").forEach((b) => b.classList.toggle("active", b.dataset.k === k));
    paint();
  };
  root.querySelectorAll("#rn-presets button").forEach((b) => b.addEventListener("click", () => load(b.dataset.k)));
  ["#rn-i", "#rn-pi", "#rn-tax", "#rn-tips", "#rn-n"].forEach((s) => $(s).addEventListener("input", () => {
    root.querySelectorAll("#rn-presets button").forEach((b) => b.classList.remove("active"));
    paint();
  }));
  load("normal");
}
