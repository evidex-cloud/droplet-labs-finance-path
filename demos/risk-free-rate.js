// 交互演示：必要回报叠叠乐。无风险利率是地板，每种资产在上面叠期限、信用、股权、流动性溢价；
// 选一种资产、调它的各层溢价，看必要回报与三种现金流（永续 $10、戈登增长股息、30 年期 5% 债券）的估值；
// 再给无风险利率一个冲击（±1%/+2%），看整排资产怎么一起重估。计算走 _fin.js（perpetuity / gordon / bondPrice）。
import { perpetuity, gordon, bondPrice, fmtPct, fmtUsd } from "./_fin.js";

export default function mount(root, lang) {
  const en = lang === "en";
  const T = (zh, e) => (en ? e : zh);

  const LAYERS = [
    ["term", T("期限溢价", "Term premium"), "var(--green)", 3],
    ["credit", T("信用溢价", "Credit premium"), "var(--orange)", 10],
    ["equity", T("股权风险溢价", "Equity risk premium"), "var(--red)", 12],
    ["illiq", T("流动性 / 额外风险", "Illiquidity / extra risk"), "var(--muted)", 15],
  ];
  const ASSETS = [
    { k: "bill", name: T("3 个月国库券", "3-month T-bill"), p: { term: 0, credit: 0, equity: 0, illiq: 0 } },
    { k: "t10", name: T("10 年期国债", "10-year Treasury"), p: { term: 0.5, credit: 0, equity: 0, illiq: 0 } },
    { k: "ig", name: T("投资级公司债", "IG corporate bond"), p: { term: 0.5, credit: 1.2, equity: 0, illiq: 0 } },
    { k: "hy", name: T("高收益债", "High-yield bond"), p: { term: 0.5, credit: 3.5, equity: 0, illiq: 0 } },
    { k: "pref", name: T("比特币支撑的永续优先股（示意）", "BTC-backed perpetual preferred (illustrative)"), p: { term: 1, credit: 3.5, equity: 0, illiq: 1 } },
    { k: "stock", name: T("股票指数", "Stock index"), p: { term: 0, credit: 0, equity: 5, illiq: 0 } },
    { k: "startup", name: T("创业公司", "Startup stake"), p: { term: 0, credit: 0, equity: 8, illiq: 8 } },
  ];
  let sel = "ig", shock = 0;

  root.innerHTML = `
    <div class="demo">
      <div class="demo-head">${T("🏗️ 必要回报叠叠乐：地板一动，整栋楼都动", "🏗️ Stack the required return: move the floor and the whole building moves")}</div>
      <div class="demo-block">
        <label class="demo-label">${T("无风险利率（地板，示意）", "Risk-free rate (the floor, illustrative)")}${T("：", ": ")}<b id="rf-rf-v"></b></label>
        <input class="demo-slider" type="range" id="rf-rf" min="0" max="8" step="0.25" value="4">
      </div>
      <div class="demo-btns" id="rf-assets">
        ${ASSETS.map((a) => `<button class="demo-btn ${a.k === sel ? "active" : ""}" data-k="${a.k}">${a.name}</button>`).join("")}
      </div>
      <div class="demo-grid" id="rf-layers">
        ${LAYERS.map(([k, lab, , max]) => `<div><label class="demo-label">${lab}${T("：", ": ")}<b id="rf-${k}-v"></b></label><input class="demo-slider" type="range" data-layer="${k}" min="0" max="${max}" step="0.25"></div>`).join("")}
      </div>
      <div class="demo-label" style="margin-top:14px">${T("整排资产的必要回报（点击上方按钮选中一项并调整它的溢价）", "Required return for the whole row (select one above to edit its premia)")}</div>
      <div class="stages" id="rf-ladder"></div>
      <div class="demo-block">
        <label class="demo-label">${T("给无风险利率一个冲击", "Shock the risk-free rate")}</label>
        <div class="demo-seg" id="rf-shock">
          ${[-1, 0, 1, 2].map((s) => `<button data-s="${s}" class="${s === shock ? "on" : ""}">${s > 0 ? "+" : ""}${s}%</button>`).join("")}
        </div>
      </div>
      <div class="cmp-3" id="rf-vals"></div>
      <div class="demo-log" id="rf-log" style="margin-top:12px"></div>
      <p class="demo-tip">${T(
        "先点“+1%”，看每一根柱子怎么一起右移，再看下面三种现金流的价格怎么同时下跌——这就是“一切资产以国债为锚”。然后选中“比特币支撑的永续优先股”，把信用溢价拉高或拉低：<strong>收益率减去无风险利率，就是市场给风险开的价</strong>。",
        "Click “+1%” and watch every bar shift right together, then watch all three cash-flow prices below fall at once — that is “every asset is priced against Treasuries.” Then select the “BTC-backed perpetual preferred” and drag its credit premium up and down: <strong>yield minus the risk-free rate is the price the market puts on risk</strong>."
      )}</p>
    </div>`;

  const $ = (s) => root.querySelector(s);
  const req = (a, rf) => rf + (a.p.term + a.p.credit + a.p.equity + a.p.illiq) / 100;

  const paint = () => {
    const rf0 = +$("#rf-rf").value / 100, rf1 = Math.max(0, rf0 + shock / 100);
    $("#rf-rf-v").textContent = fmtPct(rf0, 2) + (shock ? ` → ${fmtPct(rf1, 2)}` : "");
    const a = ASSETS.find((x) => x.k === sel);
    LAYERS.forEach(([k]) => {
      const inp = root.querySelector(`[data-layer="${k}"]`);
      inp.value = a.p[k];
      $(`#rf-${k}-v`).textContent = fmtPct(a.p[k] / 100, 2);
    });

    // 阶梯：每项资产的必要回报（分层着色），冲击后的位置用虚线框表示
    const maxR = 0.3;
    $("#rf-ladder").innerHTML = ASSETS.map((x) => {
      const r0 = req(x, rf0), r1 = req(x, rf1);
      let segs = `<div style="position:absolute;left:0;top:0;height:100%;width:${(rf0 / maxR) * 100}%;background:var(--blue)"></div>`;
      let off = rf0;
      LAYERS.forEach(([k, , col]) => {
        const w = x.p[k] / 100;
        if (w > 0) segs += `<div style="position:absolute;left:${(off / maxR) * 100}%;top:0;height:100%;width:${(w / maxR) * 100}%;background:${col}"></div>`;
        off += w;
      });
      const ghost = shock ? `<div class="fill ghost" style="width:${Math.min(100, (r1 / maxR) * 100)}%"></div>` : "";
      const on = x.k === sel;
      return `<div class="stage-bar"><span class="lab" style="${on ? "color:var(--orange-ink);font-weight:700" : ""}">${x.name}</span><div class="track" style="${on ? "outline:2px solid var(--orange-line)" : ""}">${segs}${ghost}</div><span class="val">${fmtPct(shock ? r1 : r0, 2)}</span></div>`;
    }).join("");

    // 三种现金流在选中资产的必要回报下的估值
    const r0 = req(a, rf0), r1 = req(a, rf1);
    const cases = [
      [T("永续 $10/年", "Perpetual $10/yr"), (r) => perpetuity(10, r), T("优先股、统一公债", "preferreds, consols")],
      [T("增长股息 $5，g = 4%", "Growing dividend $5, g = 4%"), (r) => gordon(5, r, 0.04), T("股票（戈登）", "stocks (Gordon)")],
      [T("30 年期、票息 5% 的债券（面值 100）", "30-year 5% coupon bond (face 100)"), (r) => bondPrice(100, 0.05, r, 30), T("长期国债 / 公司债", "long Treasuries / corporates")],
    ];
    $("#rf-vals").innerHTML = cases.map(([lab, f, note]) => {
      const v0 = f(r0), v1 = f(r1), ch = isFinite(v0) && isFinite(v1) && v0 > 0 ? v1 / v0 - 1 : NaN;
      const show = (v) => (isFinite(v) ? fmtUsd(v, 2) : "∞");
      return `<div class="cmp-cell ${shock ? (ch < 0 ? "cold" : "hl") : ""}"><h5>${lab}</h5><div style="font-size:20px;font-weight:700;color:var(--ink)">${show(shock ? v1 : v0)}</div><div class="demo-meta">${shock ? `${T("冲击前", "before")} ${show(v0)} · <b style="color:${ch < 0 ? "var(--red)" : "var(--green)"}">${isFinite(ch) ? (ch > 0 ? "+" : "") + fmtPct(ch, 1) : "–"}</b>` : T("类比：", "e.g. ") + note}</div></div>`;
    }).join("");

    const lines = [];
    lines.push(`${a.name}${T("：必要回报 = 无风险", ": required return = risk-free")} ${fmtPct(rf1, 2)} + ${T("风险溢价", "risk premia")} ${fmtPct(r1 - rf1, 2)} = <b>${fmtPct(r1, 2)}</b>`);
    if (r1 <= 0.04) lines.push(`<span class="warn">${T("必要回报 ≤ 4%：戈登模型中 r ≤ g，增长股息的估值发散——现实里意味着这个组合不可能长期成立。", "Required return ≤ 4%: in the Gordon case r ≤ g and the value explodes — in practice that combination can't last.")}</span>`);
    if (sel === "pref") lines.push(`<span class="warn">${T("优先股收益率 − 无风险利率 =", "Preferred yield − risk-free rate =")} ${fmtPct(r1 - rf1, 2)}${T("：这是市场对信用、次级地位、永续期限、流动性的定价（阶段 18.1）。示意数字，不构成投资建议。", ": the market's price for credit, subordination, perpetual term and liquidity (Stage 18.1). Illustrative numbers; not investment advice.")}</span>`);
    if (shock) lines.push(`<span class="${shock > 0 ? "bad" : "ok"}">${T("地板移动", "The floor moved")} ${shock > 0 ? "+" : ""}${shock}%${T("，整排资产的必要回报同时移动；现金流没变，价格只能反向调整。", "; every asset's required return moved with it. Cash flows are unchanged, so prices must move the other way.")}</span>`);
    $("#rf-log").innerHTML = lines.map((l) => `<div>${l}</div>`).join("");
  };

  root.querySelectorAll("#rf-assets button").forEach((b) => b.addEventListener("click", () => {
    sel = b.dataset.k;
    root.querySelectorAll("#rf-assets button").forEach((x) => x.classList.toggle("active", x === b));
    paint();
  }));
  root.querySelectorAll("[data-layer]").forEach((inp) => inp.addEventListener("input", () => {
    ASSETS.find((x) => x.k === sel).p[inp.dataset.layer] = +inp.value;
    paint();
  }));
  root.querySelectorAll("#rf-shock button").forEach((b) => b.addEventListener("click", () => {
    shock = +b.dataset.s;
    root.querySelectorAll("#rf-shock button").forEach((x) => x.classList.toggle("on", x === b));
    paint();
  }));
  $("#rf-rf").addEventListener("input", paint);
  paint();
}
