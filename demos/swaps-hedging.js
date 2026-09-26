// 交互演示：两个沙盘——
// ① 互换对冲：一笔 SOFR + 利差的浮动贷款，选对冲比率，拖动未来 SOFR 与互换利率，看利息成本、互换市值与 DV01；
// ② 国债基差交易：自有资本、回购抵押折扣（=杠杆）、年化净价差，再施加“基差扩大 / 折扣上调”冲击，看何时被迫平仓。
import { bondPrice, bondRisk, fmtUsd, fmtPct, fmtNum, fmtBig, clamp } from "./_fin.js";
import { lineChart, chartBlock } from "./_chart.js";

export default function mount(root, lang) {
  const en = lang === "en";
  const T = (zh, e) => (en ? e : zh);
  const C = en ? ": " : "：";
  let mode = "swap";
  const sw = { notional: 100e6, spread: 0.015, fixed: 0.04, years: 5, hedge: 1, sofr: 0.06, newSwap: 0.05 };
  const bt = { equity: 20e6, haircut: 0.02, carry: 0.002, widen: 0.005, newHaircut: 0.05 };

  root.innerHTML = `
    <div class="demo">
      <div class="demo-head">${T("🔁 互换与基差交易沙盘", "🔁 Swap & basis-trade sandbox")}</div>
      <div class="demo-seg" id="sh-mode">
        <button data-m="swap" class="on">${T("① 用互换对冲浮动贷款", "① Hedge a floating loan with a swap")}</button>
        <button data-m="basis">${T("② 国债基差交易", "② Treasury basis trade")}</button>
      </div>
      <div id="sh-swap">
        <div class="demo-grid">
          <div class="demo-block">
            <label class="demo-label">${T("对冲比率（互换名义 / 贷款）", "Hedge ratio (swap notional / loan)")}${C}<b id="sh-h-v"></b></label>
            <input class="demo-slider" id="sh-h" type="range" min="0" max="1" step="0.05" value="${sw.hedge}">
            <label class="demo-label">${T("未来几年 SOFR 平均水平", "Average SOFR over the coming years")}${C}<b id="sh-s-v"></b></label>
            <input class="demo-slider" id="sh-s" type="range" min="0" max="0.09" step="0.0025" value="${sw.sofr}">
          </div>
          <div class="demo-block">
            <label class="demo-label">${T("签约后 5 年期互换利率变为", "5-year swap rate after signing moves to")}${C}<b id="sh-n-v"></b></label>
            <input class="demo-slider" id="sh-n" type="range" min="0.01" max="0.08" step="0.0025" value="${sw.newSwap}">
            <div class="demo-meta">${T("贷款 1 亿美元，SOFR + 1.5%，5 年；互换：支付固定 4.0%、收取 SOFR。", "Loan: $100M at SOFR + 1.5% for 5 years. Swap: pay fixed 4.0%, receive SOFR.")}</div>
          </div>
        </div>
        <div class="stat-row">
          <div class="stat"><div class="k">${T("不对冲的年利息率", "Unhedged interest rate")}</div><div class="v" id="sh-u">–</div></div>
          <div class="stat"><div class="k">${T("对冲后的年利息率", "Hedged interest rate")}</div><div class="v acc" id="sh-hd">–</div></div>
          <div class="stat"><div class="k">${T("互换当前市值（公司视角）", "Swap value now (company's view)")}</div><div class="v" id="sh-mtm">–</div></div>
          <div class="stat"><div class="k">DV01</div><div class="v" id="sh-dv">–</div></div>
        </div>
        <div class="demo-block" id="sh-chart"></div>
        <div class="demo-log" id="sh-log"></div>
      </div>
      <div id="sh-basis" style="display:none">
        <div class="demo-grid">
          <div class="demo-block">
            <label class="demo-label">${T("回购抵押折扣（haircut）", "Repo haircut")}${C}<b id="sb-hc-v"></b></label>
            <input class="demo-slider" id="sb-hc" type="range" min="0.01" max="0.1" step="0.005" value="${bt.haircut}">
            <label class="demo-label">${T("年化净价差（期货隐含融资利率 − 回购利率）", "Net annual spread (implied financing rate − repo rate)")}${C}<b id="sb-c-v"></b></label>
            <input class="demo-slider" id="sb-c" type="range" min="0.0005" max="0.006" step="0.0005" value="${bt.carry}">
          </div>
          <div class="demo-block">
            <label class="demo-label">${T("冲击①：基差不利扩大（占面值）", "Shock ①: basis widens against you (% of face)")}${C}<b id="sb-w-v"></b></label>
            <input class="demo-slider" id="sb-w" type="range" min="0" max="0.03" step="0.0025" value="${bt.widen}">
            <label class="demo-label">${T("冲击②：回购方把折扣上调到", "Shock ②: repo lenders raise the haircut to")}${C}<b id="sb-nh-v"></b></label>
            <input class="demo-slider" id="sb-nh" type="range" min="0.01" max="0.15" step="0.005" value="${bt.newHaircut}">
          </div>
        </div>
        <div class="stat-row">
          <div class="stat"><div class="k">${T("头寸规模（自有资本 2,000 万）", "Position size ($20M own capital)")}</div><div class="v" id="sb-pos">–</div></div>
          <div class="stat"><div class="k">${T("杠杆", "Leverage")}</div><div class="v acc" id="sb-lev">–</div></div>
          <div class="stat"><div class="k">${T("平静时年化资本回报", "Return on capital in calm times")}</div><div class="v pos" id="sb-roe">–</div></div>
          <div class="stat"><div class="k">${T("冲击后剩余资本", "Capital left after shocks")}</div><div class="v" id="sb-left">–</div></div>
        </div>
        <div class="demo-block" id="sb-bars"></div>
        <div class="demo-log" id="sb-log"></div>
      </div>
      <p class="demo-tip">${T(
        "在①里把对冲比率拖到 100%，再来回拖 SOFR：橙线变成一条水平线——利率风险被搬走了；同时看“互换市值”：利率上升时它是正的，下降时变成负值，而负值意味着你要每天交保证金。在②里先把折扣调到 1%，看平静时回报多漂亮；然后只把折扣上调到 5%：不需要任何亏损，单是融资条件一变，就足以让基金被迫卖出国债——这就是 2020 年 3 月。",
        "In ①, set the hedge ratio to 100% and sweep SOFR back and forth: the orange line goes flat — the rate risk has been moved away. Watch the swap's value too: positive when rates rise, negative when they fall, and negative means posting margin every day. In ②, set the haircut to 1% and admire the calm-times return; then raise only the haircut to 5%: without any trading loss at all, a change in financing terms alone forces the fund to sell Treasuries. That is March 2020."
      )}</p>
    </div>`;

  const $ = (id) => root.querySelector("#" + id);

  function paintSwap() {
    const h = sw.hedge;
    const rateAt = (sofr, hr) => sofr + sw.spread + hr * (sw.fixed - sofr);
    const u = rateAt(sw.sofr, 0), hd = rateAt(sw.sofr, h);
    $("sh-h-v").textContent = fmtPct(h, 0);
    $("sh-s-v").textContent = fmtPct(sw.sofr, 2);
    $("sh-n-v").textContent = fmtPct(sw.newSwap, 2);
    $("sh-u").textContent = fmtPct(u, 2);
    $("sh-hd").textContent = fmtPct(hd, 2);
    // 支付固定方的市值 ≈ 名义 × (1 − 按新互换利率折现的固定端债券价格)
    const swapNotional = sw.notional * h;
    const mtm = swapNotional * (1 - bondPrice(1, sw.fixed, sw.newSwap, sw.years, 2));
    const risk = bondRisk(1, sw.fixed, sw.newSwap, sw.years, 2);
    const dv01 = risk.modified * risk.price * swapNotional * 0.0001;
    const m = $("sh-mtm");
    m.textContent = (mtm >= 0 ? "+" : "") + fmtUsd(mtm, 0); m.className = "v " + (mtm >= 0 ? "pos" : "neg");
    $("sh-dv").textContent = fmtUsd(dv01, 0) + T(" / 基点", " / bp");

    const res = lineChart({
      fns: [
        { f: (s) => rateAt(s, 0) * 100, cls: "line3" },
        { f: (s) => rateAt(s, h) * 100, cls: "line" },
      ],
      lo: 0, hi: 9, xlabel: T("SOFR（%）→ 纵轴：年利息率（%）", "SOFR (%) → vertical: annual interest rate (%)"), markerX: sw.sofr * 100, markerLabel: T("你的情景", "your scenario"), forceZero: true, uid: "sh",
    });
    $("sh-chart").innerHTML = chartBlock(res, [["var(--red)", T("不对冲", "Unhedged")], ["var(--orange)", T(`对冲 ${fmtPct(h, 0)}`, `Hedged ${fmtPct(h, 0)}`)]]);

    const diff = (u - hd) * sw.notional;
    const lines = [];
    lines.push(`${T("按当前 SOFR，对冲每年", "At this SOFR, the hedge")} ${diff >= 0 ? T("省下", "saves") : T("多花", "costs an extra")} <b>${fmtUsd(Math.abs(diff), 0)}</b>${T(" 利息。", " a year in interest.")} ${diff < 0 ? `<span class="warn">${T("利率下降时对冲“吃亏”——这是保险费，不是失败。", "The hedge “loses” when rates fall — that's the insurance premium, not a failure.")}</span>` : ""}`);
    if (h > 0) {
      lines.push(mtm >= 0
        ? `<span class="ok">${T("互换利率上升，支付固定的一方获利：互换市值为正，对手方要向你交保证金。", "Swap rates rose, so the fixed payer gains: the swap has positive value and the counterparty posts margin to you.")}</span>`
        : `<span class="bad">${T("互换利率下降，互换市值为负：你每天要交变动保证金，合计约", "Swap rates fell, so the swap is under water: you post variation margin daily, about")} ${fmtUsd(-mtm, 0)}${T("——贷款成本虽然下降了，但那要几年后才体现在利息里。", " in total — even though your loan got cheaper, that only shows up in interest over the coming years.")}</span>`);
      lines.push(`${T("每 1 个基点的利率变动，互换市值变化约", "Every 1bp move in rates changes the swap's value by about")} <b>${fmtUsd(dv01, 0)}</b>${T("（DV01 = 修正久期 × 市值 × 0.0001，修正久期", " (DV01 = modified duration × value × 0.0001; modified duration")} ${fmtNum(risk.modified, 2)}${T("）。", ").")}`);
    }
    $("sh-log").innerHTML = lines.map((l) => `<div>${l}</div>`).join("");
  }

  function paintBasis() {
    const pos = bt.equity / bt.haircut;
    const lev = pos / bt.equity;
    const roe = bt.carry * lev;
    const loss = pos * bt.widen;
    const afterLoss = bt.equity - loss;
    const extraMargin = pos * Math.max(0, bt.newHaircut - bt.haircut);
    const need = loss + extraMargin; // 需要的额外现金
    const left = bt.equity - need;
    $("sb-hc-v").textContent = fmtPct(bt.haircut, 1);
    $("sb-c-v").textContent = fmtPct(bt.carry, 2);
    $("sb-w-v").textContent = fmtPct(bt.widen, 2);
    $("sb-nh-v").textContent = fmtPct(bt.newHaircut, 1);
    $("sb-pos").textContent = "$" + fmtBig(pos, 2);
    $("sb-lev").textContent = fmtNum(lev, 0) + "×";
    $("sb-roe").textContent = fmtPct(roe, 1);
    const l = $("sb-left");
    l.textContent = fmtUsd(left, 0); l.className = "v " + (left >= 0 ? "pos" : "neg");

    const maxV = Math.max(bt.equity, loss, extraMargin, 1);
    const bar = (lab, v, color) => `<div class="bar2"><span class="lab">${lab}</span><div class="track"><div class="fill" style="width:${clamp(v / maxV, 0, 1) * 100}%;background:${color}"></div></div><span class="val">${fmtBig(v, 1)}</span></div>`;
    $("sb-bars").innerHTML =
      bar(T("自有资本", "Own capital"), bt.equity, "var(--green)") +
      bar(T("基差亏损", "Basis loss"), loss, "var(--red)") +
      bar(T("追加抵押品", "Extra collateral"), extraMargin, "var(--orange)");

    const lines = [];
    lines.push(`${T("平静时：", "In calm times: ")}${fmtPct(bt.carry, 2)} × ${fmtNum(lev, 0)}${T(" 倍杠杆 = ", "x leverage = ")}<b>${fmtPct(roe, 1)}</b>${T(" 年化资本回报，每年约 ", " annual return on capital, about ")}${fmtUsd(bt.carry * pos, 0)}${T("。", " a year.")}`);
    lines.push(`${T("基差扩大 ", "Basis widening of ")}${fmtPct(bt.widen, 2)}${T(" → 账面亏损 ", " → mark-to-market loss of ")}${fmtUsd(loss, 0)}${T("，占资本 ", ", or ")}<b>${fmtPct(loss / bt.equity, 0)}</b>${T("。", " of capital.")}`);
    if (extraMargin > 0) lines.push(`${T("折扣从 ", "Haircut from ")}${fmtPct(bt.haircut, 1)}${T(" 升到 ", " to ")}${fmtPct(bt.newHaircut, 1)}${T(" → 要立刻多拿出 ", " → must post another ")}<b>${fmtUsd(extraMargin, 0)}</b>${T(" 抵押品（这一项与盈亏无关，纯粹是融资条件变了）。", " of collateral at once (nothing to do with P&L — purely a change in financing terms).")}`);
    if (left < 0) {
      const sellShare = clamp((-left) / bt.equity, 0, 1);
      const newPos = afterLoss > 0 ? afterLoss / bt.newHaircut : 0;
      lines.push(`<span class="bad">${T("现金缺口 ", "Cash shortfall of ")}${fmtUsd(-left, 0)}${T("：基金只能卖出国债、平掉期货。按新折扣，剩余资本只撑得起约 ", ": the fund must sell Treasuries and close futures. At the new haircut its remaining capital supports only about ")}$${fmtBig(newPos, 2)}${T(" 的头寸，即要卖出约 ", " of position, so it must sell about ")}$${fmtBig(Math.max(0, pos - newPos), 2)}${T(" 国债。所有同类基金同时这么做——这就是 2020 年 3 月。", " of Treasuries. Every similar fund doing this at once — that was March 2020.")}</span>`);
      if (sellShare >= 1) lines.push(`<span class="bad">${T("资本已被全部吞没。", "Capital is completely wiped out.")}</span>`);
    } else {
      lines.push(`<span class="ok">${T("资本还够应付冲击——但缓冲只剩 ", "Capital still covers the shocks — but the buffer is down to ")}${fmtUsd(left, 0)}${T("。", ".")}</span>`);
    }
    $("sb-log").innerHTML = lines.map((x) => `<div>${x}</div>`).join("");
  }

  const paint = () => (mode === "swap" ? paintSwap() : paintBasis());
  root.querySelectorAll("#sh-mode button").forEach((b) => b.addEventListener("click", () => {
    mode = b.dataset.m;
    root.querySelectorAll("#sh-mode button").forEach((x) => x.classList.toggle("on", x === b));
    $("sh-swap").style.display = mode === "swap" ? "" : "none";
    $("sh-basis").style.display = mode === "basis" ? "" : "none";
    paint();
  }));
  const bind = (id, obj, key) => $(id).addEventListener("input", (e) => { obj[key] = +e.target.value; paint(); });
  bind("sh-h", sw, "hedge"); bind("sh-s", sw, "sofr"); bind("sh-n", sw, "newSwap");
  bind("sb-hc", bt, "haircut"); bind("sb-c", bt, "carry"); bind("sb-w", bt, "widen"); bind("sb-nh", bt, "newHaircut");
  paint();
}
