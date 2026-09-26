// 交互演示：现金流时间线构建器。选一种资产（标准债券 / 永续优先股 / 增长股息 / 投资项目 / 自定义），
// 拖动折现率，看每一笔现金流的名义值（虚线框）与现值（实心柱）；总价值用 _fin.js 的 npv / perpetuity / gordon 计算，
// 同时给出 ±1% 利率冲击、IRR 与“远期现金流占比”。
import { npv, perpetuity, gordon, fmtPct, fmtUsd, fmtNum } from "./_fin.js";

export default function mount(root, lang) {
  const en = lang === "en";
  const T = (zh, e) => (en ? e : zh);

  const HORIZON = 30;
  const KINDS = {
    bond: { name: T("标准债券 1,000 / 5% / 10 年", "Standard bond $1,000 / 5% / 10y"), r: 5 },
    perp: { name: T("永续优先股 Orange-F（年付 $10）", "Perpetual preferred Orange-F ($10/yr)"), r: 10 },
    gordon: { name: T("增长股息（戈登）", "Growing dividend (Gordon)"), r: 9 },
    project: { name: T("投资项目 −1,000 / +300×5", "Project −1,000 / +300×5"), r: 8 },
    custom: { name: T("自定义", "Custom"), r: 5 },
  };
  let kind = "bond";
  let custom = [{ t: 0, cf: -500 }, { t: 3, cf: 200 }, { t: 7, cf: 500 }];

  root.innerHTML = `
    <div class="demo">
      <div class="demo-head">${T("🔭 现金流时间线：把未来的每一笔钱折回今天", "🔭 Cash-flow timeline: bring every future payment back to today")}</div>
      <div class="demo-btns" id="pv-kinds">
        ${Object.keys(KINDS).map((k) => `<button class="demo-btn ${k === kind ? "active" : ""}" data-k="${k}">${KINDS[k].name}</button>`).join("")}
      </div>
      <div class="demo-grid">
        <div><label class="demo-label">${T("折现率 r", "Discount rate r")}${T("：", ": ")}<b id="pv-r-v"></b></label><input class="demo-slider" type="range" id="pv-r" min="0.5" max="20" step="0.25"></div>
        <div id="pv-g-box"><label class="demo-label">${T("股息增长率 g", "Dividend growth g")}${T("：", ": ")}<b id="pv-g-v"></b></label><input class="demo-slider" type="range" id="pv-g" min="0" max="8" step="0.25" value="4"></div>
      </div>
      <div class="demo-block" id="pv-custom-box">
        <div class="demo-grid-3">
          <div><label class="demo-label">${T("第几年", "Year")}${T("：", ": ")}<b id="pv-ct-v"></b></label><input class="demo-slider" type="range" id="pv-ct" min="0" max="30" step="1" value="5"></div>
          <div><label class="demo-label">${T("金额", "Amount")}${T("：", ": ")}<b id="pv-ca-v"></b></label><input class="demo-slider" type="range" id="pv-ca" min="-1000" max="1000" step="50" value="300"></div>
          <div class="demo-btns" style="align-items:end"><button class="demo-btn" id="pv-add">${T("添加现金流", "Add cash flow")}</button><button class="demo-btn" id="pv-clear">${T("清空", "Clear")}</button></div>
        </div>
      </div>
      <div class="chart" id="pv-chart"></div>
      <div class="stat-row">
        <div class="stat"><div class="k" id="pv-tot-k"></div><div class="v acc" id="pv-tot"></div></div>
        <div class="stat"><div class="k">${T("利率 −1%", "Rate −1%")}</div><div class="v pos" id="pv-dn"></div></div>
        <div class="stat"><div class="k">${T("利率 +1%", "Rate +1%")}</div><div class="v neg" id="pv-up"></div></div>
        <div class="stat"><div class="k" id="pv-x-k"></div><div class="v" id="pv-x"></div></div>
      </div>
      <div class="demo-log" id="pv-log" style="margin-top:12px"></div>
      <p class="demo-tip">${T(
        "拖动折现率，盯住两样东西：<strong>越靠右（越远）的柱子缩得越厉害</strong>；而“利率 ±1%”的价格变化，永续优先股和增长股息远大于 10 年期债券——价值越集中在远方，对时间价格越敏感。把戈登模型的 g 拖近 r，看估值怎么爆炸。",
        "Drag the discount rate and watch two things: <strong>bars further to the right (further away) shrink the most</strong>, and the ±1% price moves are far larger for the perpetual preferred and the growing dividend than for the 10-year bond — the more of an asset's value sits far away, the more it cares about the price of time. In the Gordon case, drag g toward r and watch the valuation blow up."
      )}</p>
    </div>`;

  const $ = (s) => root.querySelector(s);

  // 每种资产的现金流（前 HORIZON 年，用来画图）与总价值函数
  const flowsOf = (k, g) => {
    if (k === "bond") return Array.from({ length: 10 }, (_, i) => ({ t: i + 1, cf: 50 + (i === 9 ? 1000 : 0) }));
    if (k === "perp") return Array.from({ length: HORIZON }, (_, i) => ({ t: i + 1, cf: 10 }));
    if (k === "gordon") return Array.from({ length: HORIZON }, (_, i) => ({ t: i + 1, cf: 5 * Math.pow(1 + g, i) }));
    if (k === "project") return [{ t: 0, cf: -1000 }, ...[1, 2, 3, 4, 5].map((t) => ({ t, cf: 300 }))];
    return custom.slice().sort((a, b) => a.t - b.t);
  };
  const valueOf = (k, r, g) => {
    if (k === "perp") return perpetuity(10, r);
    if (k === "gordon") return gordon(5, r, g);
    return npv(flowsOf(k, g), r);
  };
  const irr = (flows) => {
    const hasNeg = flows.some((f) => f.cf < 0), hasPos = flows.some((f) => f.cf > 0);
    if (!hasNeg || !hasPos) return null;
    let lo = -0.99, hi = 5;
    const sLo = Math.sign(npv(flows, lo));
    if (sLo === Math.sign(npv(flows, hi))) return null;
    for (let i = 0; i < 200; i++) { const mid = (lo + hi) / 2; if (Math.sign(npv(flows, mid)) === sLo) lo = mid; else hi = mid; }
    return (lo + hi) / 2;
  };

  const drawBars = (flows, r) => {
    const W = 600, H = 220, L = 40, R = 590, top = 16, bot = 190;
    const maxT = Math.max(10, ...flows.map((f) => f.t));
    const maxAbs = Math.max(1, ...flows.map((f) => Math.abs(f.cf)));
    const hasNeg = flows.some((f) => f.cf < 0);
    const base = hasNeg ? top + (bot - top) * 0.62 : bot;
    const scale = (hasNeg ? (base - top) : (bot - top)) / maxAbs;
    const step = (R - L) / (maxT + 1), bw = Math.max(4, Math.min(28, step * 0.7));
    let s = `<svg viewBox="0 0 ${W} ${H + 18}" role="img"><line class="axis" x1="${L}" y1="${base}" x2="${R}" y2="${base}"/>`;
    flows.forEach(({ t, cf }) => {
      const x = L + step * (t + 0.5) - bw / 2, pvv = cf / Math.pow(1 + r, t);
      const hN = Math.abs(cf) * scale, hP = Math.abs(pvv) * scale;
      const yN = cf >= 0 ? base - hN : base, yP = cf >= 0 ? base - hP : base;
      s += `<rect x="${x.toFixed(1)}" y="${yN.toFixed(1)}" width="${bw.toFixed(1)}" height="${hN.toFixed(1)}" fill="none" stroke="var(--muted)" stroke-dasharray="3 2"/>`;
      s += `<rect x="${x.toFixed(1)}" y="${yP.toFixed(1)}" width="${bw.toFixed(1)}" height="${hP.toFixed(1)}" fill="${cf >= 0 ? (kind === "perp" ? "var(--btc)" : "var(--orange)") : "var(--red)"}" opacity=".9"/>`;
    });
    const ticks = maxT <= 10 ? [0, 2, 4, 6, 8, 10] : [0, 5, 10, 15, 20, 25, 30].filter((v) => v <= maxT);
    ticks.forEach((t) => { s += `<text class="lbl-axis" x="${(L + step * (t + 0.5)).toFixed(1)}" y="${H + 4}" text-anchor="middle">${t}</text>`; });
    s += `<text class="lbl-axis" x="${R}" y="${H + 16}" text-anchor="end">${T("年（虚线 = 名义金额，实心 = 今天的现值）", "year (dashed = nominal, solid = present value)")}</text></svg>`;
    return s;
  };

  const paint = () => {
    const r = +$("#pv-r").value / 100, g = +$("#pv-g").value / 100;
    $("#pv-r-v").textContent = fmtPct(r, 2);
    $("#pv-g-v").textContent = fmtPct(g, 2);
    $("#pv-g-box").style.display = kind === "gordon" ? "" : "none";
    $("#pv-custom-box").style.display = kind === "custom" ? "" : "none";
    $("#pv-ct-v").textContent = $("#pv-ct").value;
    $("#pv-ca-v").textContent = fmtUsd(+$("#pv-ca").value);

    const flows = flowsOf(kind, g);
    $("#pv-chart").innerHTML = drawBars(flows, r);

    const V = valueOf(kind, r, g), Vd = valueOf(kind, Math.max(0.0001, r - 0.01), g), Vu = valueOf(kind, r + 0.01, g);
    const isNpv = kind === "project" || kind === "custom";
    $("#pv-tot-k").textContent = isNpv ? T("净现值 NPV", "Net present value") : T("价值（现值合计）", "Value (sum of PVs)");
    $("#pv-tot").textContent = isFinite(V) ? fmtUsd(V, 2) : "∞";
    const pct = (a) => (isFinite(a) && isFinite(V) && Math.abs(V) > 1e-9 && !isNpv ? ` (${a >= V ? "+" : ""}${fmtPct(a / V - 1, 1)})` : "");
    $("#pv-dn").textContent = isFinite(Vd) ? fmtUsd(Vd, 2) + pct(Vd) : "∞";
    $("#pv-up").textContent = isFinite(Vu) ? fmtUsd(Vu, 2) + pct(Vu) : "∞";

    const lines = [];
    if (isNpv) {
      const ir = irr(flows);
      $("#pv-x-k").textContent = T("内部收益率 IRR", "Internal rate of return");
      $("#pv-x").textContent = ir != null ? fmtPct(ir, 2) : "–";
      lines.push(V >= 0
        ? `<span class="ok">${T("NPV 为正：按", "NPV is positive: at")} ${fmtPct(r, 2)} ${T("的资金成本，这笔投资创造价值。", "cost of capital, this investment creates value.")}</span>`
        : `<span class="bad">${T("NPV 为负：资金成本", "NPV is negative: a cost of capital of")} ${fmtPct(r, 2)} ${T("高于这笔投资的回报，它在毁掉价值。", "exceeds what this investment earns — it destroys value.")}</span>`);
      if (ir != null) lines.push(`${T("IRR = 让 NPV 恰好为 0 的折现率。资金成本低于", "IRR is the rate that makes NPV exactly zero. Any cost of capital below")} ${fmtPct(ir, 2)} ${T("时就值得做。债券的到期收益率就是同一个概念（阶段 4.2）。", "makes it worth doing. A bond's yield to maturity is the same idea (Stage 4.2).")}`);
    } else {
      const near = npv(flows.filter((f) => f.t <= 10), r);
      const farShare = isFinite(V) && V > 0 ? 1 - near / V : 1;
      $("#pv-x-k").textContent = T("10 年以后贡献的价值占比", "Share of value beyond year 10");
      $("#pv-x").textContent = isFinite(V) ? fmtPct(Math.max(0, farShare), 0) : "–";
      if (kind === "bond") {
        const nominal = flows.reduce((s, f) => s + f.cf, 0);
        lines.push(`${T("名义合计", "Nominal total")} ${fmtUsd(nominal)} ${T("→ 现值合计", "→ present value")} ${fmtUsd(V, 2)}${T("。票息率 5% 与折现率相等时，价格正好是面值 1,000。", ". When the discount rate equals the 5% coupon, the price is exactly the $1,000 face value.")}`);
        lines.push(`${T("本金那一笔（第 10 年 1,000）今天只值", "The principal alone ($1,000 in year 10) is worth only")} <b>${fmtUsd(1000 / Math.pow(1 + r, 10), 2)}</b>${T("。", " today.")}`);
      }
      if (kind === "perp") {
        lines.push(`${T("永续年金：价值 = 10 ÷", "Perpetuity: value = 10 ÷")} ${fmtPct(r, 2)} = <b>${fmtUsd(V, 2)}</b>${T("。图里只画了前 30 年，第 31 年到永远还贡献", ". The chart shows only 30 years; years 31 to forever still add")} ${fmtUsd(V - npv(flows, r), 2)}${T("。", ".")}`);
        lines.push(`${T("反过来读：若它的市价是 80 美元，市场要求的收益率就是", "Read it backward: if it trades at $80, the market's required yield is")} ${fmtPct(10 / 80, 1)}${T("（阶段 18.1）。修正久期约 1 ÷ r ≈", " (Stage 18.1). Modified duration ≈ 1 ÷ r ≈")} ${fmtNum(1 / r, 1)} ${T("年。", "years.")}`);
      }
      if (kind === "gordon") {
        if (!isFinite(V)) lines.push(`<span class="bad">${T("g ≥ r：公式失效——“永远比折现率增长更快”在数学上等于无穷大，在现实里不可能。", "g ≥ r: the formula breaks — “growing faster than the discount rate forever” is infinite on paper and impossible in reality.")}</span>`);
        else {
          lines.push(`${T("戈登：5 ÷ (", "Gordon: 5 ÷ (")}${fmtPct(r, 2)} − ${fmtPct(g, 2)}) = <b>${fmtUsd(V, 2)}</b>${T("。隐含股息率", ". Implied dividend yield")} ${fmtPct(5 / V, 2)} + ${T("增长", "growth")} ${fmtPct(g, 2)} = ${T("要求回报", "required return")} ${fmtPct(r, 2)}${T("。", ".")}`);
          if (r - g < 0.025) lines.push(`<span class="warn">${T("r − g 只剩", "r − g is only")} ${fmtPct(r - g, 2)}${T("：分母太小，估值对任何假设的微小变化都极端敏感。", ": with a denominator this small, the valuation is hypersensitive to every assumption.")}</span>`);
        }
      }
    }
    $("#pv-log").innerHTML = lines.map((l) => `<div>${l}</div>`).join("");
  };

  const setKind = (k) => {
    kind = k;
    $("#pv-r").value = KINDS[k].r;
    root.querySelectorAll("#pv-kinds button").forEach((b) => b.classList.toggle("active", b.dataset.k === k));
    paint();
  };
  root.querySelectorAll("#pv-kinds button").forEach((b) => b.addEventListener("click", () => setKind(b.dataset.k)));
  ["#pv-r", "#pv-g", "#pv-ct", "#pv-ca"].forEach((s) => $(s).addEventListener("input", paint));
  $("#pv-add").addEventListener("click", () => {
    const t = +$("#pv-ct").value, cf = +$("#pv-ca").value;
    const hit = custom.find((f) => f.t === t);
    if (hit) hit.cf += cf; else custom.push({ t, cf });
    custom = custom.filter((f) => f.cf !== 0);
    paint();
  });
  $("#pv-clear").addEventListener("click", () => { custom = []; paint(); });
  setKind("bond");
}
