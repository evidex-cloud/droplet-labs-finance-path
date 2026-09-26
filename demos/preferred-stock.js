// 交互演示：优先股计算器——永续优先股的价格 = 股息 ÷ 要求收益率。
// 调无风险利率、信用利差、股息率，看价格、久期与利率冲击；并与 30 年期国债对照；
// 下半部分切换“好年 / 紧张年 / 破产”，看债、优先股、普通股各自拿到什么。
import { perpetuity, bondPrice, bondRisk, waterfall, fmtPct, fmtNum, fmtUsd , enPunct } from "./_fin.js";
import { lineChart, chartBlock } from "./_chart.js";

export default function mount(root, lang) {
  const en = lang === "en";
  const T = (zh, e) => (en ? e : zh);
  if (en) enPunct(root);

  let rf = 5, spread = 1, coupon = 6, par = 25, scen = "good";

  root.innerHTML = `
    <div class="demo">
      <div class="demo-head">${T("🧬 优先股计算器：固定股息 + 永续 = 超长久期", "🧬 Preferred calculator: fixed dividend + perpetual = very long duration")}</div>
      <div class="demo-block">
        <div class="demo-seg" id="ps-par">
          <button data-p="25" class="on">${T("面值 $25（传统零售）", "$25 par (classic retail)")}</button>
          <button data-p="100">${T("面值 $100（DAT 常见）", "$100 par (common for DATs)")}</button>
        </div>
      </div>
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:10px">
        <div class="demo-block">
          <label class="demo-label">${T("30 年期国债收益率", "30-year Treasury yield")}${T("：", ": ")}<b id="ps-rfv"></b></label>
          <input class="demo-slider" type="range" id="ps-rf" min="2" max="8" step="0.1" value="${rf}" />
        </div>
        <div class="demo-block">
          <label class="demo-label">${T("优先股利差（信用 + 劣后 + 条款）", "Preferred spread (credit + subordination + terms)")}${T("：", ": ")}<b id="ps-spv"></b></label>
          <input class="demo-slider" type="range" id="ps-sp" min="0.5" max="8" step="0.1" value="${spread}" />
        </div>
        <div class="demo-block">
          <label class="demo-label">${T("股息率（按面值）", "Dividend rate (on par)")}${T("：", ": ")}<b id="ps-cv"></b></label>
          <input class="demo-slider" type="range" id="ps-c" min="3" max="12" step="0.25" value="${coupon}" />
        </div>
      </div>
      <div class="stat-row">
        <div class="stat"><div class="k">${T("要求收益率", "Required yield")}</div><div class="v acc" id="ps-y">–</div></div>
        <div class="stat"><div class="k">${T("理论价格", "Fair price")}</div><div class="v" id="ps-p">–</div></div>
        <div class="stat"><div class="k">${T("修正久期 ≈ 1/y", "Mod. duration ≈ 1/y")}</div><div class="v" id="ps-d">–</div></div>
        <div class="stat"><div class="k">${T("收益率 +1 个百分点", "Yield +1 point")}</div><div class="v neg" id="ps-up">–</div></div>
        <div class="stat"><div class="k">${T("30 年期国债 +1 个百分点", "30y Treasury +1 point")}</div><div class="v neg" id="ps-tu">–</div></div>
      </div>
      <div class="demo-block" id="ps-chart"></div>
      <div class="demo-log" id="ps-log"></div>
      <div class="demo-block" style="margin-top:14px">
        <label class="demo-label">${T("同一家公司（枫叶制造）的三种年份：谁拿到什么？", "Three kinds of year at one company (Maple Manufacturing): who gets what?")}</label>
        <div class="demo-seg" id="ps-scn">
          <button data-s="good" class="on">${T("好年", "Good year")}</button>
          <button data-s="tight">${T("紧张年", "Tight year")}</button>
          <button data-s="bust">${T("破产（资产 60）", "Bankruptcy (assets 60)")}</button>
        </div>
        <div class="cmp-3" id="ps-cmp"></div>
      </div>
      <p class="demo-tip">${T(
        "把国债收益率从 5% 拖到 6%，看优先股和 30 年期国债的跌幅几乎一样——“固定收入”不等于“固定价格”。再把股息率调到 10%：久期明显缩短，但你为此承担的是更大的信用风险（利差更宽）。",
        "Drag the Treasury yield from 5% to 6% and watch the preferred and the 30-year Treasury fall by almost the same amount — fixed income is not a fixed price. Then set the dividend rate to 10%: duration shrinks noticeably, but what you are taking on in exchange is more credit risk (a wider spread)."
      )}</p>
    </div>`;

  const q = (s) => root.querySelector(s);

  const paintScn = () => {
    // 枫叶制造：高级债 25（6%）→ 年息 1.5；优先股 10（8%）→ 年股息 0.8；普通股 1 亿股示意
    const layers = [{ name: "sec", claim: 30 }, { name: "snr", claim: 25 }, { name: "sub", claim: 15 }, { name: "pref", claim: 10 }];
    let cells;
    if (scen === "good") {
      cells = [
        [T("高级债券（25，6%）", "Senior bonds (25, 6%)"), T("拿到利息 1.5，一分不多。", "Collects 1.5 of interest — not a cent more."), "ok"],
        [T("优先股（10，8%）", "Preferred (10, 8%)"), T("拿到股息 0.8，一分不多。", "Collects 0.8 of dividends — not a cent more."), "ok"],
        [T("普通股", "Common"), T("付完所有固定数后的利润全归你——上不封顶。", "Everything left after the fixed payments is yours — no ceiling."), "ok"],
      ];
    } else if (scen === "tight") {
      cells = [
        [T("高级债券", "Senior bonds"), T("利息必须照付，否则违约 → 债权人可逼破产。", "Interest must be paid; otherwise it's a default and creditors can force bankruptcy."), "ok"],
        [T("优先股", "Preferred"), T("董事会可以跳过 0.8 的股息：不算违约。累积型记为欠款，非累积型直接消失（阶段 6.3）。", "The board can skip the 0.8 dividend: not a default. Cumulative → recorded as arrears; non-cumulative → simply gone (Stage 6.3)."), "bad"],
        [T("普通股", "Common"), T("优先股股息没付清之前，普通股不能分红（股息阻断）。", "No common dividend until the preferred is paid (the dividend stopper)."), "bad"],
      ];
    } else {
      const w = waterfall(60, layers);
      const r = w.rows;
      cells = [
        [T("高级债券", "Senior bonds"), `${T("拿回", "Recovers")} ${fmtNum(r[1].paid, 0)} / 25 = ${fmtPct(r[1].recovery, 0)}`, r[1].recovery >= 1 ? "ok" : "bad"],
        [T("优先股", "Preferred"), `${T("拿回", "Recovers")} ${fmtNum(r[3].paid, 0)} / 10 = ${fmtPct(r[3].recovery, 0)} · ${T("排在全部债务之后", "behind all debt")}`, "bad"],
        [T("普通股", "Common"), `${T("剩余", "Residual")} ${fmtNum(w.equity, 0)}`, "bad"],
      ];
    }
    q("#ps-cmp").innerHTML = cells.map(([h, t, c]) => `<div class="cmp-cell${c === "ok" ? " hl" : ""}"><h5>${h}</h5><div style="font-size:13.5px;line-height:1.55">${t}</div></div>`).join("");
  };

  const paint = () => {
    const y = (rf + spread) / 100, c = coupon / 100, D = par * c;
    const P = perpetuity(D, y), Pup = perpetuity(D, y + 0.01), Pdn = perpetuity(D, Math.max(0.005, y - 0.01));
    const tb = bondRisk(100, 0.05, rf / 100, 30), tbUp = bondPrice(100, 0.05, rf / 100 + 0.01, 30);
    q("#ps-rfv").textContent = rf.toFixed(1) + "%";
    q("#ps-spv").textContent = spread.toFixed(1) + "%";
    q("#ps-cv").textContent = coupon.toFixed(2) + "%";
    q("#ps-y").textContent = fmtPct(y, 2);
    q("#ps-p").textContent = fmtUsd(P, 2);
    q("#ps-d").textContent = fmtNum(1 / y, 1);
    q("#ps-up").textContent = fmtPct(Pup / P - 1, 1);
    q("#ps-tu").textContent = fmtPct(tbUp / tb.price - 1, 1);

    const res = lineChart({
      fns: [
        { f: (x) => Math.min(250, perpetuity(c * 100, x / 100)), cls: "line" },
        { f: (x) => bondPrice(100, 0.05, x / 100, 30), cls: "line2" },
      ],
      lo: 3, hi: 14, xlabel: T("要求收益率（%）", "Required yield (%)"),
      markerX: y * 100, markerLabel: T("当前", "now"), uid: "ps",
    });
    q("#ps-chart").innerHTML = chartBlock(res, [
      ["var(--orange)", T("优先股价格（% 面值）", "Preferred price (% of par)")],
      ["var(--blue)", T("30 年期国债，5% 票息（% 面值）", "30-year Treasury, 5% coupon (% of face)")],
    ]);

    const lines = [];
    lines.push(`${T("每年股息", "Annual dividend")} = ${fmtUsd(par, 0)} × ${fmtPct(c, 2)} = <b>${fmtUsd(D, 2)}</b>；${T("价格", "price")} = ${fmtUsd(D, 2)} ÷ ${fmtPct(y, 2)} = <b>${fmtUsd(P, 2)}</b>（${fmtPct(P / par, 1)} ${T("面值", "of par")}）`);
    lines.push(`${T("利率 −1 个百分点：", "Yield −1 point: ")}${fmtUsd(Pdn, 2)}（+${fmtPct(Pdn / P - 1, 1)}）；${T("利率 +1 个百分点：", "yield +1 point: ")}${fmtUsd(Pup, 2)}（${fmtPct(Pup / P - 1, 1)}）。${T("涨得比跌得多——这是凸性。", "It gains more than it loses — that's convexity.")}`);
    lines.push(`${T("对照：30 年期国债修正久期", "Benchmark: 30-year Treasury modified duration")} ≈ ${fmtNum(tb.modified, 1)}，${T("优先股", "preferred")} ≈ ${fmtNum(1 / y, 1)}。${1 / y > tb.modified ? `<span class="warn">${T("这张优先股比 30 年期国债还怕加息。", "This preferred is even more rate-sensitive than the 30-year Treasury.")}</span>` : `<span class="ok">${T("高收益率把久期压到了 30 年期国债以下——但代价是更大的信用风险。", "The high yield pulls duration below the 30-year's — at the cost of more credit risk.")}</span>`}`);
    if (P > par * 1.05) lines.push(`<span class="warn">${T("价格远高于面值：现实中若可赎回，发行人很可能按面值赎回后低息重发，价格会被“压”在面值附近（负凸性，阶段 6.3）。", "Price is well above par: if callable, the issuer would likely redeem at par and refinance cheaper, pinning the price near par (negative convexity, Stage 6.3).")}</span>`);
    if (P < par * 0.8) lines.push(`<span class="bad">${T("价格低于面值 20% 以上：市场要求的收益率远高于票面股息率——要么利率大涨，要么市场在担心信用。", "Price is more than 20% below par: the market demands far more than the coupon — either rates have jumped or the market is worried about credit.")}</span>`);
    q("#ps-log").innerHTML = lines.map((l) => `<div>${l}</div>`).join("");
  };

  q("#ps-rf").addEventListener("input", (e) => { rf = +e.target.value; paint(); });
  q("#ps-sp").addEventListener("input", (e) => { spread = +e.target.value; paint(); });
  q("#ps-c").addEventListener("input", (e) => { coupon = +e.target.value; paint(); });
  root.querySelectorAll("#ps-par button").forEach((b) => b.addEventListener("click", () => {
    par = +b.dataset.p;
    root.querySelectorAll("#ps-par button").forEach((o) => o.classList.toggle("on", o === b));
    paint();
  }));
  root.querySelectorAll("#ps-scn button").forEach((b) => b.addEventListener("click", () => {
    scen = b.dataset.s;
    root.querySelectorAll("#ps-scn button").forEach((o) => o.classList.toggle("on", o === b));
    paintScn();
  }));
  paint();
  paintScn();
}
