// 交互演示：DCF 与利率滑块——预测晨光咖啡的自由现金流，拖动无风险利率与风险溢价，
// 看每股价值、终值占比、“股票久期”怎么变；再反推：市价 12 元隐含了多高的永续增长？
import { npv, gordon, fmtPct, fmtNum, tex } from "./_fin.js";
import { lineChart, chartBlock } from "./_chart.js";

export default function mount(root, lang) {
  const en = lang === "en";
  const T = (zh, e) => (en ? e : zh);
  const K = en ? 10 : 1; // 内部单位万元；英文显示 $K
  const unit = T("万元", "$K");
  const cur = (x) => (en ? "$" + fmtNum(x, 2) : fmtNum(x, 2) + " 元");

  const NET_DEBT = 400, SHARES = 100, PRICE = 12; // 万元、万股、元/股
  const st = { fcf1: 100, g5: 0.10, gT: 0.03, rf: 0.045, erp: 0.045 };

  const defs = [
    ["fcf1", T("明年自由现金流", "Next year's free cash flow"), 40, 250, 5, (v) => fmtNum(v * K, 0) + " " + unit],
    ["g5", T("第 1–5 年增长率", "Growth, years 1–5"), 0, 0.3, 0.01, (v) => fmtPct(v, 0)],
    ["gT", T("第 5 年后永续增长率", "Perpetual growth after year 5"), 0, 0.05, 0.0025, (v) => fmtPct(v, 2)],
    ["rf", T("无风险利率（长期国债）", "Risk-free rate (long Treasury)"), 0.01, 0.08, 0.0025, (v) => fmtPct(v, 2)],
    ["erp", T("股权风险溢价", "Equity risk premium"), 0.02, 0.08, 0.0025, (v) => fmtPct(v, 2)],
  ];

  root.innerHTML = `
    <div class="demo">
      <div class="demo-head">${T("📉 DCF 沙盘：利率一动，估值倍数就动", "📉 DCF sandbox: move rates, and the multiple moves")}</div>
      <div class="demo-grid">
        <div class="demo-block">${defs.map(([k, lab, lo, hi, step, fmt]) => `
          <label class="demo-label">${lab}${T("：", ": ")}<b id="vl-v-${k}">${fmt(st[k])}</b></label>
          <input class="demo-slider" type="range" min="${lo}" max="${hi}" step="${step}" value="${st[k]}" data-k="${k}" />`).join("")}
          <div class="demo-btns">
            <button class="demo-btn" data-p="base">${T("基准", "Base case")}</button>
            <button class="demo-btn" data-p="shock">${T("长债收益率 +1 个百分点", "Long yield +1 point")}</button>
            <button class="demo-btn" data-p="zero">${T("2021 式低利率", "2021-style low rates")}</button>
          </div>
        </div>
        <div class="demo-block">
          <div class="stat-row">
            <div class="stat"><div class="k">${T("折现率 r", "Discount rate r")}</div><div class="v" id="vl-r">–</div></div>
            <div class="stat"><div class="k">${T("每股价值", "Value per share")}</div><div class="v acc" id="vl-ps">–</div></div>
            <div class="stat"><div class="k">${T("对比市价 12 元", "vs market price $12")}</div><div class="v" id="vl-up">–</div></div>
          </div>
          <div class="stat-row">
            <div class="stat"><div class="k">${T("终值占比", "Terminal-value share")}</div><div class="v" id="vl-tv">–</div></div>
            <div class="stat"><div class="k">${T("股票久期（年）", "Equity duration (yrs)")}</div><div class="v" id="vl-dur">–</div></div>
            <div class="stat"><div class="k">${T("隐含永续增长", "Implied perpetual growth")}</div><div class="v" id="vl-ig">–</div></div>
          </div>
          <div class="demo-out" id="vl-bridge"></div>
        </div>
      </div>
      <div class="demo-block">
        <div class="demo-label">${T("每股价值 vs 折现率：你的公司（蓝）与一家同价的“短久期”价值型公司（紫）", "Value per share vs discount rate: your company (blue) vs a same-price short-duration value company (violet)")}</div>
        <div id="vl-chart"></div>
      </div>
      <div class="demo-block"><div class="demo-log" id="vl-log"></div></div>
      <p class="demo-tip">${T(
        "先点“长债收益率 +1 个百分点”：生意什么都没变，每股价值却跌了近两成。再把第 1–5 年增长拖到 25%、永续增长拖到 4.5%——价值飙升，但久期也变得极长，图上那条蓝线变得陡峭：高增长意味着长久期，也就对利率最敏感（",
        "Click “Long yield +1 point” first: nothing about the business changed, yet value per share drops by nearly a fifth. Then push years 1–5 growth to 25% and perpetual growth to 4.5% — value soars, but duration gets very long and the blue curve turns steep: high growth means long duration, which means the most rate sensitivity ("
      )}${tex(String.raw`\text{${T("久期", "duration")}} \approx \dfrac{1}{r - g}`)}${T("）。", ").")}</p>
    </div>`;

  // 企业价值（万元）
  const ev = (r, fcf1, g5, gT) => {
    if (r <= gT + 1e-9) return Infinity;
    const flows = [];
    for (let t = 1; t <= 5; t++) flows.push({ t, cf: fcf1 * Math.pow(1 + g5, t - 1) });
    const tv = gordon(flows[4].cf * (1 + gT), r, gT);
    const pvExplicit = npv(flows, r), pvTv = tv / Math.pow(1 + r, 5);
    return { total: pvExplicit + pvTv, pvExplicit, pvTv, tv };
  };
  const perShare = (r, fcf1 = st.fcf1, g5 = st.g5, gT = st.gT) => {
    const e = ev(r, fcf1, g5, gT);
    return e === Infinity ? Infinity : (e.total - NET_DEBT) / SHARES;
  };

  const paint = () => {
    defs.forEach(([k, , , , , fmt]) => { root.querySelector(`#vl-v-${k}`).textContent = fmt(st[k]); });
    const r = st.rf + st.erp;
    root.querySelector("#vl-r").textContent = fmtPct(r, 2);
    const log = [];
    if (r <= st.gT + 0.005) {
      ["#vl-ps", "#vl-up", "#vl-tv", "#vl-dur", "#vl-ig"].forEach((id) => { root.querySelector(id).textContent = "∞?"; });
      root.querySelector("#vl-bridge").innerHTML = "";
      root.querySelector("#vl-chart").innerHTML = "";
      root.querySelector("#vl-log").innerHTML = `<div class="bad">${T("折现率几乎等于（或低于）永续增长率：戈登公式的分母趋近于零，价值趋于无穷——这是泡沫里“估值无上限”的数学原形。调高利率或调低永续增长。", "The discount rate is at or below perpetual growth: the Gordon denominator goes to zero and value heads to infinity — the mathematical shape of “no valuation is too high” in a bubble. Raise rates or lower perpetual growth.")}</div>`;
      return;
    }
    const e = ev(r, st.fcf1, st.g5, st.gT);
    const ps = (e.total - NET_DEBT) / SHARES;
    const psUp = perShare(r + 0.01), psDn = perShare(r - 0.01);
    const dur = (psDn - psUp) / (2 * 0.01 * ps);
    // 反推：市价 12 元隐含的永续增长率（二分法）
    let lo = -0.05, hi = r - 0.0005;
    for (let i = 0; i < 80; i++) { const mid = (lo + hi) / 2; if (perShare(r, st.fcf1, st.g5, mid) > PRICE) hi = mid; else lo = mid; }
    const ig = (lo + hi) / 2;

    const psEl = root.querySelector("#vl-ps"); psEl.textContent = cur(ps);
    const up = ps / PRICE - 1, upEl = root.querySelector("#vl-up");
    upEl.textContent = (up >= 0 ? "+" : "") + fmtPct(up, 0); upEl.className = "v " + (up >= 0 ? "pos" : "neg");
    root.querySelector("#vl-tv").textContent = fmtPct(e.pvTv / e.total, 0);
    root.querySelector("#vl-dur").textContent = fmtNum(dur, 1);
    root.querySelector("#vl-ig").textContent = ig <= -0.0499 ? "< −5%" : fmtPct(ig, 2);
    const n0 = (x) => fmtNum(x * K, 0).replace(/,/g, "{,}");
    const unitT = String.raw`\text{${en ? "\\$K" : "万元"}}`;
    const psT = en ? String.raw`\$${fmtNum(ps, 2)}` : String.raw`${fmtNum(ps, 2)}\ \text{元}`;
    root.querySelector("#vl-bridge").innerHTML =
      tex(String.raw`\mathrm{EV} = \underbrace{${n0(e.pvExplicit)}}_{\text{${T("前 5 年现值", "PV of years 1–5")}}} + \underbrace{${n0(e.pvTv)}}_{\text{${T("终值现值", "PV of terminal value")}}} = ${n0(e.total)}\ ${unitT}`, true) +
      tex(String.raw`\text{${T("每股价值", "Value per share")}} = \frac{\mathrm{EV} - \text{${T("净负债", "net debt")}}}{\text{${T("股数", "shares")}}} = \frac{${n0(e.total)} - ${n0(NET_DEBT)}}{\text{${T("100 万股", "1M shares")}}} = ${psT}`, true);

    // 同价“短久期”公司：无负债、永续增长 1%（戈登），按比例缩放到当前 r 下与你的公司同价
    const vv = (rr) => gordon(1, rr, 0.01);
    const scale = ps / vv(r);
    const loR = Math.max(st.gT + 0.01, 0.03), hiR = 0.15;
    const res = lineChart({
      fns: [
        { f: (x) => perShare(x / 100), cls: "line" },
        { f: (x) => vv(x / 100) * scale, cls: "line2" },
      ],
      lo: loR * 100, hi: hiR * 100, xlabel: T("折现率 r（%）", "Discount rate r (%)"), markerX: r * 100, markerLabel: fmtPct(r, 1), uid: "vl",
    });
    root.querySelector("#vl-chart").innerHTML = chartBlock(res, [["var(--orange)", T("你的公司", "Your company")], ["var(--blue)", T("同价价值型公司（无负债、增长 1%）", "Same-price value company (no debt, 1% growth)")]]);

    const dUp = psUp / ps - 1, dV = vv(r + 0.01) / vv(r) - 1;
    log.push(`${T("折现率 +1 个百分点 → 你的公司", "Discount rate +1 point → your company")} <b class="bad">${fmtPct(dUp, 1)}</b>${T("，价值型公司", ", value company")} <b>${fmtPct(dV, 1)}</b>`);
    log.push(`${tex(String.raw`\text{${T("股票久期", "Equity duration")}} \approx ${fmtNum(dur, 1)}`)}${T(" 年；对比：30 年期国债修正久期约 15.5。", " years; compare the 30-year Treasury's modified duration of about 15.5.")}${dur > 15.5 ? ` <span class="warn">${T("这只股票比 30 年期国债还“长”。", "This stock is “longer” than a 30-year bond.")}</span>` : ""}`);
    log.push(`${T("终值占 ", "The terminal value is ")}${fmtPct(e.pvTv / e.total, 0)}${T(" 的价值：大部分价值来自第 5 年以后。", " of the value: most of the value lies beyond year 5.")}`);
    log.push(`${T("反向 DCF：要让市价 12 元“刚好合理”，第 5 年后的永续增长需要约 ", "Reverse DCF: for the $12 market price to be “just right,” perpetual growth after year 5 would need to be about ")}<b>${ig <= -0.0499 ? "< −5%" : fmtPct(ig, 2)}</b>${T("。你觉得这个假设保守还是激进？", ". Is that assumption conservative or aggressive?")}`);
    root.querySelector("#vl-log").innerHTML = log.map((l) => `<div>${l}</div>`).join("");
  };

  root.querySelectorAll("input[data-k]").forEach((el) => el.addEventListener("input", () => { st[el.dataset.k] = +el.value; paint(); }));
  const presets = {
    base: { fcf1: 100, g5: 0.10, gT: 0.03, rf: 0.045, erp: 0.045 },
    shock: { rf: 0.055 },
    zero: { rf: 0.015, erp: 0.045 },
  };
  root.querySelectorAll("[data-p]").forEach((b) => b.addEventListener("click", () => {
    const p = b.dataset.p;
    if (p === "shock") st.rf = Math.min(0.08, st.rf + 0.01); else Object.assign(st, presets[p]);
    root.querySelectorAll("input[data-k]").forEach((el) => { el.value = st[el.dataset.k]; });
    root.querySelectorAll("[data-p]").forEach((x) => x.classList.toggle("active", x === b));
    paint();
  }));
  paint();
}
