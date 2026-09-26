// 交互演示：30 年期收益率冲击台。选一个真实起点（2020 年底 / 2023-10-19 / 2026-02-27 / 2026-09-25），
// 拖动 30 年期收益率，看同一冲击如何同时打到：30 年期国债价格、房贷月供、股票合理市盈率、联邦利息账单、
// 比特币财库公司式的永续优先股价格、持有不生息资产的机会成本；再用“债务–利息循环”玩具模型看 10 年后的债务率。
import { bondPrice, npv, gordon, fmtUsd, fmtPct, fmtNum, fmtBig, clamp, tex } from "./_fin.js";
import { lineChart, chartBlock } from "./_chart.js";

export default function mount(root, lang) {
  const en = lang === "en";
  const T = (zh, e) => (en ? e : zh);

  // 真实起点（10 年期与 30 年期收益率，%）。来源：FRED / 美国财政部，见课文。
  const anchors = [
    { k: "2020", y10: 0.93, y30: 1.65, label: T("2020 年底", "End-2020") },
    { k: "2023", y10: 4.98, y30: 5.11, label: T("2023-10-19 高点", "Oct 19 2023 peak") },
    { k: "feb26", y10: 3.97, y30: 4.64, label: T("2026-02-27 低点", "Feb 27 2026 low") },
    { k: "sep26", y10: 5.17, y30: 5.49, label: T("2026-09-25", "Sep 25 2026") },
  ];
  const DEBT = 32.36e12;       // 公众持有债务，2026-09-24
  const GDP = 32.5e12;         // 名义 GDP（年化），2026 年二季度
  const LOAN = 400000;         // 示意房贷本金
  const BTC_HOLD = 100000;     // 示意：持有 10 万美元的不生息资产

  const st = {
    a: 3, y30: 5.49, beta: 1,
    mSpread: 1.8, erp: 3.0, g: 4.0, pSpread: 4.51, share: 0.3,
    fb: 3, gN: 4.0, prim: 2.5,
  };

  root.innerHTML = `
    <div class="demo">
      <div class="demo-head">${T("🏛️ 30 年期收益率冲击台：一个数字，六条传导链", "🏛️ The 30-year yield shock desk: one number, six transmission chains")}</div>
      <div class="demo-block">
        <div class="demo-label">${T("选择起点（真实收盘数据）", "Pick a starting point (actual closing data)")}</div>
        <div class="demo-btns" id="lb-anc">${anchors.map((a, i) => `<button class="demo-btn" data-i="${i}">${a.label} · 30y ${fmtNum(a.y30, 2)}%</button>`).join("")}</div>
        <label class="demo-label">${T("30 年期国债收益率", "30-year Treasury yield")} <b id="lb-v-y30"></b> <span id="lb-v-d" class="demo-meta"></span></label>
        <input class="demo-slider" type="range" id="lb-y30" min="1" max="8" step="0.01" />
        <div class="demo-seg" id="lb-beta">
          <button data-b="1">${T("平行冲击：10 年期同幅变动", "Parallel: the 10-year moves the same")}</button>
          <button data-b="0.5">${T("长端领涨：10 年期只动一半（熊陡）", "Long end leads: the 10-year moves half (bear steepener)")}</button>
        </div>
      </div>
      <div class="stat-row" id="lb-stats"></div>
      <div class="demo-block">
        <div class="demo-label">${T("相对起点的变化（同一个冲击，打在六个地方）", "Change versus the starting point (one shock, six places)")}</div>
        <div class="stages" id="lb-bars"></div>
      </div>
      <div id="lb-chart"></div>
      <div class="demo-block">
        <div class="demo-label">${T("假设（可调，均为示意）", "Assumptions (adjustable, all illustrative)")}</div>
        <div class="demo-grid">
          <div>
            <label class="demo-label">${tex(String.raw`\text{${T("房贷利率", "Mortgage rate")}} = \text{${T("10 年期", "10-year")}} +`)} <b id="lb-v-mSpread"></b></label>
            <input class="demo-slider" type="range" id="lb-mSpread" min="1" max="3" step="0.05" />
            <label class="demo-label">${T("股权风险溢价", "Equity risk premium")} <b id="lb-v-erp"></b></label>
            <input class="demo-slider" type="range" id="lb-erp" min="1" max="6" step="0.1" />
            <label class="demo-label">${T("股票长期名义增长率 g", "Long-run nominal growth g for stocks")} <b id="lb-v-g"></b></label>
            <input class="demo-slider" type="range" id="lb-g" min="2" max="6" step="0.1" />
          </div>
          <div>
            <label class="demo-label">${T("优先股对 30 年期的信用利差", "Preferred credit spread over the 30-year")} <b id="lb-v-pSpread"></b></label>
            <input class="demo-slider" type="range" id="lb-pSpread" min="2" max="8" step="0.05" />
            <div class="demo-label">${T("联邦债务已按新利率重新定价的比例", "Share of federal debt already repriced at new rates")}</div>
            <div class="demo-seg" id="lb-share">
              <button data-s="0.3">${T("约 1 年后（约 30%）", "After ~1 year (~30%)")}</button>
              <button data-s="0.55">${T("约 3 年后（约 55%）", "After ~3 years (~55%)")}</button>
              <button data-s="1">${T("全部", "All of it")}</button>
            </div>
          </div>
        </div>
      </div>
      <div class="demo-block">
        <div class="demo-label">${T("🔁 债务–利息循环：10 年玩具模型（从 2026 年债务率约 101% 出发）", "🔁 The debt–interest loop: a 10-year toy model (starting from ~101% debt-to-GDP in 2026)")}</div>
        <div class="demo-grid-3">
          <div><label class="demo-label">${T("期限溢价反馈（每 1 个百分点债务率 → 基点）", "Term-premium feedback (bp per 1 point of debt/GDP)")} <b id="lb-v-fb"></b></label><input class="demo-slider" type="range" id="lb-fb" min="0" max="8" step="0.5" /></div>
          <div><label class="demo-label">${T("名义 GDP 增长率", "Nominal GDP growth")} <b id="lb-v-gN"></b></label><input class="demo-slider" type="range" id="lb-gN" min="2" max="7" step="0.1" /></div>
          <div><label class="demo-label">${T("基本赤字（不含利息，占 GDP）", "Primary deficit (ex-interest, % of GDP)")} <b id="lb-v-prim"></b></label><input class="demo-slider" type="range" id="lb-prim" min="0" max="5" step="0.1" /></div>
        </div>
        <div class="stat-row" id="lb-loopstats"></div>
        <div id="lb-loopchart"></div>
      </div>
      <div class="demo-log" id="lb-log"></div>
      <p class="demo-tip">${T(
        "先点“2020 年底”，再把 30 年期拖到 5.49%：同一只 30 年期国债约腰斩、房贷月供多出一半以上、合理市盈率大幅压缩——这就是 2020–2026 年发生的事。再点“2026-09-25”，只加 1 个百分点：优先股约 −9%、国债约 −13%，联邦利息全部重新定价后每年多约 3,000 亿美元。最后在循环模型里把“期限溢价反馈”从 0 拉到 5：看 10 年后的债务率和利息占比怎么被这个圈推高。",
        "Click “End-2020”, then drag the 30-year to 5.49%: the same 30-year Treasury roughly halves, the mortgage payment rises by more than half and the fair P/E shrinks sharply. That's what happened from 2020 to 2026. Then click “Sep 25 2026” and add just 1 point: the preferred loses about 9%, the Treasury about 13%, and once all federal debt reprices, interest rises by roughly $300 billion a year. Finally, in the loop model, push “term-premium feedback” from 0 to 5 and watch the loop drive up debt-to-GDP and the interest burden ten years out."
      )}</p>
    </div>`;

  const q = (s) => root.querySelector(s);
  const annuity = (() => { const fl = []; for (let t = 1; t <= 360; t++) fl.push({ t, cf: 1 }); return fl; })();
  const payment = (rate) => LOAN / npv(annuity, rate / 12);
  const pe = (y10) => gordon(1, (y10 + st.erp) / 100, st.g / 100);
  const prefPx = (y30) => 10 / ((y30 + st.pSpread) / 100);
  const bond30 = (y30) => bondPrice(100, 0.05, y30 / 100, 30);

  // 债务–利息循环：债务率 d、平均融资成本 r；市场利率 = 10 年期 + 反馈 × (d − 101)；每年约 1/6 的债务按市场利率重新定价
  const runLoop = (y10, fbBp) => {
    let d = 101, r = 3.09; const D = [d], I = [r * d / 100];
    for (let t = 1; t <= 10; t++) {
      const mkt = y10 + (fbBp / 100) * Math.max(0, d - 101);
      r = r + (mkt - r) / 6;
      d = d * (1 + r / 100) / (1 + st.gN / 100) + st.prim;
      D.push(d); I.push(r * d / 100);
    }
    return { D, I };
  };
  const arrFn = (arr) => (x) => { const i = clamp(Math.floor(x), 0, arr.length - 2), f = x - i; return arr[i] + (arr[i + 1] - arr[i]) * f; };

  const setVals = () => {
    q("#lb-y30").value = st.y30;
    for (const k of ["mSpread", "erp", "g", "pSpread", "fb", "gN", "prim"]) q("#lb-" + k).value = st[k];
    q("#lb-v-mSpread").textContent = fmtNum(st.mSpread, 2) + T(" 个百分点", " pts");
    q("#lb-v-erp").textContent = fmtNum(st.erp, 1) + "%";
    q("#lb-v-g").textContent = fmtNum(st.g, 1) + "%";
    q("#lb-v-pSpread").textContent = fmtNum(st.pSpread, 2) + T(" 个百分点", " pts");
    q("#lb-v-fb").textContent = fmtNum(st.fb, 1) + "bp";
    q("#lb-v-gN").textContent = fmtNum(st.gN, 1) + "%";
    q("#lb-v-prim").textContent = fmtNum(st.prim, 1) + "%";
    root.querySelectorAll("#lb-anc button").forEach((b) => b.classList.toggle("active", +b.dataset.i === st.a));
    root.querySelectorAll("#lb-beta button").forEach((b) => b.classList.toggle("on", +b.dataset.b === st.beta));
    root.querySelectorAll("#lb-share button").forEach((b) => b.classList.toggle("on", +b.dataset.s === st.share));
  };

  const paint = () => {
    setVals();
    const A = anchors[st.a];
    const d30 = st.y30 - A.y30, y10 = Math.max(0.05, A.y10 + st.beta * d30);
    q("#lb-v-y30").textContent = fmtNum(st.y30, 2) + "%";
    q("#lb-v-d").textContent = `${T("相对起点", "vs start")} ${d30 >= 0 ? "+" : ""}${fmtNum(d30 * 100, 0)}bp · ${T("10 年期", "10-year")} ${fmtNum(y10, 2)}%`;

    const b0 = bond30(A.y30), b1 = bond30(st.y30);
    const m0 = payment((A.y10 + st.mSpread) / 100), m1 = payment((y10 + st.mSpread) / 100);
    const pe0 = pe(A.y10), pe1 = pe(y10);
    const p0 = prefPx(A.y30), p1 = prefPx(st.y30);
    const dInt = DEBT * (y10 - A.y10) / 100 * st.share;
    const opp = BTC_HOLD * st.y30 / 100;
    const peTxt = (x) => (isFinite(x) && x > 0 ? fmtNum(x, 1) + "x" : T("无意义（r ≤ g）", "n/a (r ≤ g)"));

    q("#lb-stats").innerHTML = [
      [T("30 年期国债价格（5% 票息）", "30-year Treasury price (5% coupon)"), fmtNum(b1, 1), b1 < b0 ? "neg" : "pos"],
      [T("房贷月供（40 万美元）", "Mortgage payment ($400k)"), fmtUsd(m1, 0), m1 > m0 ? "neg" : "pos"],
      [T("合理市盈率", "Fair P/E"), peTxt(pe1), pe1 < pe0 ? "neg" : "pos"],
      [T("联邦年利息变化", "Change in federal interest / yr"), (dInt >= 0 ? "+" : "") + "$" + fmtBig(dInt, 0).replace("-", ""), dInt > 0 ? "neg" : "pos"],
      [T("10% 永续优先股价格", "10% perpetual preferred price"), fmtUsd(p1, 2), p1 < p0 ? "neg" : "pos"],
      [T("10 万美元不生息资产的年机会成本", "Opportunity cost / yr ($100k, no yield)"), fmtUsd(opp, 0), "acc"],
    ].map(([k, v, c]) => `<div class="stat"><div class="k">${k}</div><div class="v ${c}">${v}</div></div>`).join("");

    const rows = [
      [T("30 年期国债价格", "30-year Treasury price"), b1 / b0 - 1],
      [T("永续优先股价格", "Perpetual preferred price"), p1 / p0 - 1],
      [T("合理市盈率", "Fair P/E"), isFinite(pe0) && isFinite(pe1) && pe0 > 0 && pe1 > 0 ? pe1 / pe0 - 1 : NaN],
      [T("房贷月供", "Mortgage payment"), m1 / m0 - 1],
      [T("联邦利息 / GDP", "Federal interest / GDP"), dInt / GDP],
    ];
    const maxAbs = Math.max(0.05, ...rows.map((r) => (isFinite(r[1]) ? Math.abs(r[1]) : 0)));
    q("#lb-bars").innerHTML = rows.map(([lab, v], i) => {
      const bad = i >= 3 ? v > 0 : v < 0;
      const col = !isFinite(v) ? "var(--muted)" : bad ? "var(--red)" : "var(--green)";
      const txt = !isFinite(v) ? "–" : i === 4 ? `${v >= 0 ? "+" : ""}${fmtNum(v * 100, 2)}${T(" 个百分点", " pts")}` : `${v >= 0 ? "+" : ""}${fmtPct(v, 1)}`;
      return `<div class="stage-bar"><span class="lab">${lab}</span><div class="track"><div class="fill" style="width:${isFinite(v) ? (Math.abs(v) / maxAbs * 100).toFixed(1) : 0}%;background:${col}"></div></div><span class="val" style="color:${col}">${txt}</span></div>`;
    }).join("");

    const res = lineChart({
      fns: [
        { f: (x) => (bond30(x) / b0) * 100, cls: "line" },
        { f: (x) => (prefPx(x) / p0) * 100, cls: "line5" },
        { f: (x) => { const v = pe(Math.max(0.05, A.y10 + st.beta * (x - A.y30))); return isFinite(v) && v > 0 && v < 200 ? (v / pe0) * 100 : NaN; }, cls: "line3" },
      ],
      lo: 1, hi: 8, xlabel: T("30 年期收益率（%）；纵轴：起点记为 100", "30-year yield (%); vertical axis: start indexed to 100"), markerX: st.y30, markerLabel: fmtNum(st.y30, 2) + "%", uid: "lb",
    });
    q("#lb-chart").innerHTML = chartBlock(res, [["var(--orange)", T("30 年期国债价格", "30-year Treasury price")], ["var(--btc)", T("10% 永续优先股价格", "10% perpetual preferred price")], ["var(--red)", T("合理市盈率", "Fair P/E")]]);

    // 循环模型
    const L0 = runLoop(y10, 0), L1 = runLoop(y10, st.fb), Lc = runLoop(3.9, 0);
    q("#lb-loopstats").innerHTML = [
      [T("对照：10 年期约 3.9%、无反馈", "Benchmark: 10-year ~3.9%, no feedback"), fmtNum(Lc.D[10], 0) + "%", "acc"],
      [T("10 年后债务率（无反馈）", "Debt/GDP in 10 yrs (no feedback)"), fmtNum(L0.D[10], 0) + "%", L0.D[10] > 106 ? "neg" : "acc"],
      [T("10 年后债务率（有反馈）", "Debt/GDP in 10 yrs (with feedback)"), fmtNum(L1.D[10], 0) + "%", L1.D[10] > 106 ? "neg" : "acc"],
      [T("10 年后利息 / GDP（有反馈）", "Interest/GDP in 10 yrs (with feedback)"), fmtNum(L1.I[10], 2) + "%", L1.I[10] > 4 ? "neg" : "acc"],
    ].map(([k, v, c]) => `<div class="stat"><div class="k">${k}</div><div class="v ${c}">${v}</div></div>`).join("");
    const lc = lineChart({
      fns: [{ f: arrFn(L0.D), cls: "line2" }, { f: arrFn(L1.D), cls: "line3" }, { f: () => 106, cls: "line4" }],
      lo: 0, hi: 10, xlabel: T("年（从 2026 年起）；纵轴：公众持有债务 / GDP（%）", "Years from 2026; vertical axis: debt held by the public / GDP (%)"), uid: "lbl",
    });
    q("#lb-loopchart").innerHTML = chartBlock(lc, [["var(--blue)", T("无期限溢价反馈", "No term-premium feedback")], ["var(--red)", T("有反馈：债务越高，利率越高", "With feedback: more debt, higher rates")], ["var(--green)", T("二战纪录 106%", "WWII record 106%")]]);

    const lines = [];
    lines.push(`${T("起点", "Start")} ${A.label}${T("：30 年期", ": 30-year")} ${fmtNum(A.y30, 2)}%${T("，10 年期", ", 10-year")} ${fmtNum(A.y10, 2)}%${T("。", ".")}`);
    if (Math.abs(d30) >= 0.01) {
      lines.push(`${T("30 年期国债", "The 30-year Treasury")} ${fmtNum(b0, 1)} → <b>${fmtNum(b1, 1)}</b>${T("（", " (")}${fmtPct(b1 / b0 - 1, 1)}${T("）；10% 永续优先股", "); the 10% perpetual preferred")} ${fmtUsd(p0, 2)} → <b>${fmtUsd(p1, 2)}</b>${T("（必要收益率 ", " (required yield ")}${fmtNum(A.y30 + st.pSpread, 2)}% → ${fmtNum(st.y30 + st.pSpread, 2)}%${T("）。", ").")}`);
      lines.push(`${T("房贷利率", "Mortgage rate")} ${fmtNum(A.y10 + st.mSpread, 2)}% → ${fmtNum(y10 + st.mSpread, 2)}%${T("：40 万美元房贷月供", ": the monthly payment on $400k goes")} ${fmtUsd(m0, 0)} → <b>${fmtUsd(m1, 0)}</b>${T("，一年多付", ", an extra")} ${fmtUsd((m1 - m0) * 12, 0)}${T("。", " a year.")}`);
      lines.push(`${tex(String.raw`\text{${T("合理市盈率", "Fair P/E")}} = \dfrac{1}{\text{${T("10 年期", "10-year")}} + \text{${T("风险溢价", "risk premium")}} - g}`)}${T("：", ": ")}${peTxt(pe0)} → <b>${peTxt(pe1)}</b>${T("。同样的盈利，值的钱变了。", ". Same earnings, different value.")}`);
      lines.push(`${T("联邦利息：", "Federal interest: ")}${tex(String.raw`\text{${T("公众持有债务", "public debt")}}\ ${T(String.raw`32.36\ \text{万亿美元}`, String.raw`\$32.36\text{T}`)} \times \text{${T("10 年期变动", "change in the 10-year")}}\ ${fmtNum((y10 - A.y10) * 100, 0)}\ \text{bp} \times \text{${T("已重新定价比例", "share repriced")}}\ ${fmtPct(st.share, 0).replace("%", String.raw`\%`)} \approx \mathbf{${dInt >= 0 ? "+" : "-"}\$\text{${fmtBig(Math.abs(dInt), 0)}}}`)}${T(" / 年，约占 GDP 的 ", " a year, about ")}${fmtNum(Math.abs(dInt) / GDP * 100, 2)}%${T("。", " of GDP.")}`);
    }
    if (st.a === 0 && st.y30 >= 5) lines.push(`<span class="bad">${T("这就是 2020 年底到 2026 年 9 月的真实距离：一个违约都没有，30 年期国债的价格却约腰斩——“无风险资产”的久期风险。", "This is the real distance from end-2020 to September 2026: not a single default, yet the 30-year Treasury's price roughly halved. That is the duration risk inside a “risk-free asset.”")}</span>`);
    if (st.beta === 0.5 && d30 > 0) lines.push(`<span class="warn">${T("熊陡：长端比 10 年期涨得多，受伤最重的是永续优先股和 30 年期国债，房贷和市盈率受影响相对小——期限溢价推动的上涨就是这个样子。", "Bear steepener: the long end rises more than the 10-year, so the perpetual preferred and the 30-year Treasury take the biggest hit while mortgages and P/E suffer less. A term-premium-driven selloff looks like this.")}</span>`);
    lines.push(`${T("循环模型：10 年后债务率", "Loop model: debt/GDP after 10 years")} ${fmtNum(L0.D[10], 0)}% ${T("（无反馈）vs", "(no feedback) vs")} <b>${fmtNum(L1.D[10], 0)}%</b> ${T("（有反馈）；利息占 GDP 从约 3.1% 走到", "(with feedback); interest goes from about 3.1% of GDP to")} ${fmtNum(L1.I[10], 2)}%${T("。反馈越强、增长越慢，圈转得越快（阶段 9.4）。", ". The stronger the feedback and the slower the growth, the faster the loop spins (Stage 9.4).")}`);
    lines.push(`${T("校准说明：把 10 年期设在约 3.9%（接近 CBO 2026 年 2 月基线、战前的利率假设），这个玩具模型给出 10 年后债务率约", "Calibration: with the 10-year at about 3.9% (close to the pre-war rate assumptions in CBO's February 2026 baseline), this toy model gives debt/GDP of about")} ${fmtNum(Lc.D[10], 0)}%${T("、利息约占 GDP ", " and interest of about ")}${fmtNum(Lc.I[10], 1)}%${T("，与 CBO 预测的 2036 年约 120%、约 4.6% 相当；按你设定的利率水平，结果就是上面那条红线。", " of GDP after ten years, in line with CBO's roughly 120% and 4.6% for 2036. At the rate level you've set, the result is the red line above.")}`);
    lines.push(`<span class="warn">${T("以上全部为机制示意，不构成投资建议；实时数据以美国财政部、FRED 与 CBO 为准。", "Everything here illustrates mechanisms only and is not investment advice; for live data use the US Treasury, FRED and CBO.")}</span>`);
    q("#lb-log").innerHTML = lines.map((l) => `<div>${l}</div>`).join("");
  };

  q("#lb-y30").addEventListener("input", (e) => { st.y30 = +e.target.value; paint(); });
  for (const k of ["mSpread", "erp", "g", "pSpread", "fb", "gN", "prim"]) q("#lb-" + k).addEventListener("input", (e) => { st[k] = +e.target.value; paint(); });
  root.querySelectorAll("#lb-anc button").forEach((b) => b.addEventListener("click", () => { st.a = +b.dataset.i; st.y30 = anchors[st.a].y30; paint(); }));
  root.querySelectorAll("#lb-beta button").forEach((b) => b.addEventListener("click", () => { st.beta = +b.dataset.b; paint(); }));
  root.querySelectorAll("#lb-share button").forEach((b) => b.addEventListener("click", () => { st.share = +b.dataset.s; paint(); }));
  paint();
}
