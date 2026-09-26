// 交互演示：购买力侵蚀计算器——设定通胀率、年数、存款利率与房贷利率，
// 看现金、存款、固定利率债务与一张 1,000 美元 5% 10 年期债券在通胀下各自是赢是输。
import { fv, pv, realRate, rule72, npv, fmtPct, fmtUsd, fmtNum } from "./_fin.js";
import { lineChart, chartBlock } from "./_chart.js";

export default function mount(root, lang) {
  const en = lang === "en";
  const T = (zh, e) => (en ? e : zh);

  let st = { amt: 10000, pi: 0.03, n: 10, s: 0.04, m: 0.03 };
  const PRESETS = [
    { k: 0.02, lab: T("美联储目标 2%", "Fed target 2%") },
    { k: 0.03, lab: T("温和 3%", "Moderate 3%") },
    { k: 0.091, lab: T("2022 年 6 月峰值 9.1%", "June 2022 peak 9.1%") },
    { k: 0.135, lab: T("1980 年约 13.5%", "1980, about 13.5%") },
  ];
  const LOAN = 300000;

  // 年金系数（每期 1 元、共 k 期、每期利率 r）——用现值引擎
  const annuity = (r, k) => { const f = []; for (let i = 1; i <= k; i++) f.push({ t: i, cf: 1 }); return npv(f, r); };

  root.innerHTML = `
    <div class="demo">
      <div class="demo-head">${T("🎈 购买力侵蚀计算器：通胀下，谁赢谁输？", "🎈 The purchasing-power eraser: under inflation, who wins and who loses?")}</div>
      <div class="demo-btns" id="inf-pre">${PRESETS.map((p, i) => `<button class="demo-btn" data-i="${i}">${p.lab}</button>`).join("")}</div>
      <div class="demo-grid">
        <div class="demo-block"><label class="demo-label">${T("年通胀率", "Annual inflation")}${T("：", ": ")}<b id="inf-piv"></b></label><input class="demo-slider" type="range" id="inf-pi" min="0" max="15" step="0.1"/></div>
        <div class="demo-block"><label class="demo-label">${T("经过年数", "Years")}${T("：", ": ")}<b id="inf-nv"></b></label><input class="demo-slider" type="range" id="inf-n" min="1" max="40" step="1"/></div>
        <div class="demo-block"><label class="demo-label">${T("抽屉里的现金", "Cash in the drawer")}${T("：", ": ")}<b id="inf-av"></b></label><input class="demo-slider" type="range" id="inf-a" min="1000" max="100000" step="1000"/></div>
        <div class="demo-block"><label class="demo-label">${T("存款/货币基金利率", "Savings / money-fund rate")}${T("：", ": ")}<b id="inf-sv"></b></label><input class="demo-slider" type="range" id="inf-s" min="0" max="10" step="0.1"/></div>
      </div>
      <div class="stat-row">
        <div class="stat"><div class="k">${T("同一篮子东西的价格", "Price of the same basket")}</div><div class="v" id="inf-bk">–</div></div>
        <div class="stat"><div class="k">${T("现金的实际购买力", "Real value of the cash")}</div><div class="v neg" id="inf-cash">–</div></div>
        <div class="stat"><div class="k">${T("存款的实际价值", "Real value of savings")}</div><div class="v" id="inf-sav">–</div></div>
        <div class="stat"><div class="k">${T("购买力减半需要", "Purchasing power halves in")}</div><div class="v acc" id="inf-half">–</div></div>
      </div>
      <div id="inf-chart"></div>
      <div class="cmp">
        <div class="cmp-cell hl"><h5>${T("🏠 借款人：30 万美元、30 年固定利率房贷", "🏠 Borrower: $300,000 30-year fixed mortgage")}</h5>
          <label class="demo-label">${T("房贷利率", "Mortgage rate")}${T("：", ": ")}<b id="inf-mv"></b></label><input class="demo-slider" type="range" id="inf-m" min="2" max="8" step="0.25"/>
          <div class="demo-meta" id="inf-debt"></div></div>
        <div class="cmp-cell cold"><h5>${T("📜 债权人：1,000 美元、票息 5%、10 年期债券", "📜 Lender: $1,000 bond, 5% coupon, 10 years")}</h5>
          <div class="demo-meta" id="inf-bond"></div></div>
      </div>
      <div class="demo-log" id="inf-log" style="margin-top:12px"></div>
      <p class="demo-tip">${T(
        "盯住三条线：紫线是 2% 目标下 100 美元的购买力，红线是你选的通胀，绿线是存款扣除通胀后的实际价值——<strong>存款利率低于通胀时，绿线也在往下走</strong>。再点“2022 年峰值”：借款人一栏的“通胀替你还掉的比例”猛增，债券一栏的实际收益率变成负数——这就是通胀的财富再分配。",
        "Watch three lines: violet is the purchasing power of $100 at the 2% target, red is the inflation rate you chose, green is your savings after inflation — <strong>whenever the savings rate is below inflation, the green line falls too.</strong> Then click “June 2022 peak”: in the borrower panel the share of debt “repaid by inflation” jumps, and in the bond panel the real yield turns negative — inflation's redistribution in action."
      )}</p>
    </div>`;

  const $ = (q) => root.querySelector(q);

  const paint = () => {
    const { amt, pi, n, s, m } = st;
    $("#inf-piv").textContent = fmtPct(pi, 1);
    $("#inf-nv").textContent = n + T(" 年", " yrs");
    $("#inf-av").textContent = fmtUsd(amt);
    $("#inf-sv").textContent = fmtPct(s, 1);
    $("#inf-mv").textContent = fmtPct(m, 2);
    root.querySelectorAll("#inf-pre button").forEach((b) => b.classList.toggle("active", Math.abs(PRESETS[+b.dataset.i].k - pi) < 1e-9));

    const basket = fv(100, pi, n);
    const cashReal = pv(amt, pi, n);
    const rr = realRate(s, pi);
    const savReal = amt * Math.pow(1 + rr, n);
    $("#inf-bk").textContent = T("100 → ", "100 → ") + fmtNum(basket, 1);
    $("#inf-cash").textContent = fmtUsd(cashReal);
    const sv = $("#inf-sav"); sv.textContent = fmtUsd(savReal); sv.className = "v " + (savReal >= amt ? "pos" : "neg");
    $("#inf-half").textContent = pi > 0 ? fmtNum(rule72(pi), 1) + T(" 年", " yrs") : "∞";

    const res = lineChart({
      fns: [
        { f: (t) => pv(100, 0.02, t), cls: "line2" },
        { f: (t) => pv(100, pi, t), cls: "line3" },
        { f: (t) => 100 * Math.pow(1 + rr, t), cls: "line4" },
      ],
      lo: 0, hi: 40, samples: 80, xlabel: T("年", "Years"), markerX: n, markerLabel: n + T(" 年", " yrs"), forceZero: true, uid: "inf",
    });
    $("#inf-chart").innerHTML = chartBlock(res, [
      ["var(--blue)", T("100 美元的购买力 @2%", "Purchasing power of $100 @2%")],
      ["var(--red)", T("100 美元的购买力 @", "Purchasing power of $100 @") + fmtPct(pi, 1)],
      ["var(--green)", T("100 美元存款的实际价值（利率 ", "Real value of $100 saved (rate ") + fmtPct(s, 1) + ")"],
    ]);

    // 借款人：30 年固定利率房贷，n 年后剩余本金的实际价值
    const r = m / 12, pay = LOAN / annuity(r, 360);
    const left = Math.max(0, 360 - n * 12);
    const bal = left > 0 ? pay * annuity(r, left) : 0;
    const balReal = pv(bal, pi, n);
    const eased = bal > 0 ? 1 - balReal / bal : 0;
    const payReal = pv(pay, pi, n);
    $("#inf-debt").innerHTML = `${T("月供", "Monthly payment")} <b>${fmtUsd(pay)}</b>${T("（固定不变）", " (fixed)")}<br>
      ${n} ${T("年后剩余本金", "years in, principal left")} <b>${fmtUsd(bal)}</b> → ${T("按起点购买力只值", "worth only")} <b>${fmtUsd(balReal)}</b>${T("", " in starting-year dollars")}<br>
      ${T("通胀替你“还掉”了剩余债务的", "Inflation has “repaid”")} <b style="color:var(--green)">${fmtPct(eased, 0)}</b>${T("", " of the remaining debt")}${T("；", "; ")}${T("到时的月供按起点购买力只相当于", "the payment then feels like")} <b>${fmtUsd(payReal)}</b>`;

    // 债权人：1,000 美元、5% 票息、10 年期债券
    const bondReal = realRate(0.05, pi);
    const princReal = pv(1000, pi, 10);
    $("#inf-bond").innerHTML = `${T("名义收益率", "Nominal yield")} <b>5.00%</b> → ${T("实际收益率", "real yield")} <b style="color:${bondReal < 0 ? "var(--red)" : "var(--green)"}">${fmtPct(bondReal, 2)}</b><br>
      ${T("10 年后拿回的 1,000 美元本金，按今天购买力只值", "The $1,000 principal returned in 10 years is worth only")} <b>${fmtUsd(princReal)}</b><br>
      ${T("每年 50 美元利息中，被通胀吃掉约", "Of each $50 coupon, inflation eats roughly")} <b>${fmtUsd(Math.min(50, 1000 * pi))}</b>${T("（按本金 × 通胀率粗算）", " (principal × inflation, rough)")}`;

    const lines = [];
    if (Math.abs(rr) < 0.0005) lines.push(`<span class="warn">${T("实际利率约为零：存款刚好跟上通胀，购买力不增不减。", "Real rate is about zero: savings just keep pace with inflation.")}</span>`);
    else if (rr < 0) lines.push(`<span class="bad">${T("实际利率为负：", "Negative real rate: ")}${fmtPct(s, 1)} − ${fmtPct(pi, 1)} ≈ ${fmtPct(rr, 2)}${T("。存款的数字在涨，购买力在跌——这就是“看不见的税”（阶段 2.5）。", ". The balance grows while purchasing power shrinks — the “invisible tax” (Stage 2.5).")}</span>`);
    else lines.push(`<span class="ok">${T("实际利率为正：", "Positive real rate: ")}${fmtPct(rr, 2)}${T("，存款跑赢了通胀。", " — savings are beating inflation.")}</span>`);
    const lost = `<b>${fmtPct(1 - cashReal / amt, 0)}</b>`, halfY = pi > 0 ? fmtNum(rule72(pi), 1) : "∞";
    lines.push(en
      ? `Over ${n} years the ${fmtUsd(amt)} in the drawer loses ${lost} of its purchasing power; Rule of 72: 72 ÷ ${fmtNum(pi * 100, 1)} ≈ ${halfY} years to halve.`
      : `抽屉里的 ${fmtUsd(amt)} 在 ${n} 年里损失了 ${lost} 的购买力；72 法则：72 ÷ ${fmtNum(pi * 100, 1)} ≈ ${halfY} 年减半。`);
    if (pi >= 0.09) lines.push(`<span class="warn">${T("在这样的通胀下，固定利率借款人（和政府）是大赢家，现金与债券持有人是大输家。", "At inflation like this, fixed-rate borrowers (and governments) are big winners; holders of cash and bonds are big losers.")}</span>`);
    $("#inf-log").innerHTML = lines.map((l) => `<div>${l}</div>`).join("");
  };

  const sync = () => {
    $("#inf-pi").value = st.pi * 100; $("#inf-n").value = st.n; $("#inf-a").value = st.amt; $("#inf-s").value = st.s * 100; $("#inf-m").value = st.m * 100;
    paint();
  };
  $("#inf-pi").addEventListener("input", (e) => { st.pi = +e.target.value / 100; paint(); });
  $("#inf-n").addEventListener("input", (e) => { st.n = +e.target.value; paint(); });
  $("#inf-a").addEventListener("input", (e) => { st.amt = +e.target.value; paint(); });
  $("#inf-s").addEventListener("input", (e) => { st.s = +e.target.value / 100; paint(); });
  $("#inf-m").addEventListener("input", (e) => { st.m = +e.target.value / 100; paint(); });
  root.querySelectorAll("#inf-pre button").forEach((b) => b.addEventListener("click", () => { st.pi = PRESETS[+b.dataset.i].k; sync(); }));
  sync();
}
