// 交互演示：债券现金流构建器——设定面值、票息、期限、付息方式与市场收益率，
// 看一张债券的全部现金流（名义金额 vs 今天的现值），以及价格 = 现值之和、溢价/折价/平价、当期收益率。
import { bondCashflows, npv, pv, fmtUsd, fmtPct, fmtNum } from "./_fin.js";

export default function mount(root, lang) {
  const en = lang === "en";
  const T = (zh, e) => (en ? e : zh);

  const st = { face: 1000, coupon: 5, years: 10, freq: 2, ytm: 5 };

  const presets = [
    { k: "std", label: T("标准债券 5% · 10 年", "Standard bond 5% · 10y"), v: { face: 1000, coupon: 5, years: 10, freq: 2, ytm: 5 } },
    { k: "t10", label: T("10 年期国债 @ 5.17%", "10-year Treasury @ 5.17%"), v: { face: 1000, coupon: 5, years: 10, freq: 2, ytm: 5.17 } },
    { k: "t30", label: T("30 年期国债 @ 5.49%", "30-year Treasury @ 5.49%"), v: { face: 1000, coupon: 5, years: 30, freq: 2, ytm: 5.49 } },
    { k: "zero", label: T("10 年零息债 @ 5%", "10-year zero @ 5%"), v: { face: 1000, coupon: 0, years: 10, freq: 0, ytm: 5 } },
    { k: "bill", label: T("3 个月国库券 @ 4.24%", "3-month T-bill @ 4.24%"), v: { face: 1000, coupon: 0, years: 0.25, freq: 0, ytm: 4.24 } },
  ];

  root.innerHTML = `
    <div class="demo">
      <div class="demo-head">${T("🧾 债券现金流构建器：一张借条值多少钱", "🧾 Bond cash-flow builder: what is an IOU worth?")}</div>
      <div class="demo-block">
        <div class="demo-label">${T("预设", "Presets")}</div>
        <div class="demo-btns" id="wb-pre">${presets.map((p) => `<button class="demo-btn" data-p="${p.k}">${p.label}</button>`).join("")}</div>
        <div class="demo-meta">${T("国债收益率为 2026 年 9 月 25 日美国财政部每日曲线的约数；预设的票息 5% 为示意。", "Treasury yields are rounded from the US Treasury daily curve for Sep 25, 2026; the 5% coupons in the presets are illustrative.")}</div>
      </div>
      <div class="demo-grid">
        <div class="demo-block">
          <label class="demo-label">${T("票面利率", "Coupon rate")} <b id="wb-v-coupon"></b></label>
          <input class="demo-slider" type="range" id="wb-coupon" min="0" max="10" step="0.125" />
          <label class="demo-label">${T("剩余期限", "Years to maturity")} <b id="wb-v-years"></b></label>
          <input class="demo-slider" type="range" id="wb-years" min="0.25" max="30" step="0.25" />
        </div>
        <div class="demo-block">
          <label class="demo-label">${T("市场要求的收益率", "Yield the market demands")} <b id="wb-v-ytm"></b></label>
          <input class="demo-slider" type="range" id="wb-ytm" min="0" max="12" step="0.01" />
          <div class="demo-label">${T("付息方式", "Payment schedule")}</div>
          <div class="demo-seg" id="wb-freq">
            <button data-f="2">${T("每半年", "Semiannual")}</button>
            <button data-f="1">${T("每年", "Annual")}</button>
            <button data-f="0">${T("零息", "Zero coupon")}</button>
          </div>
        </div>
      </div>
      <div class="demo-block"><div id="wb-svg"></div></div>
      <div class="stat-row" id="wb-stats"></div>
      <div class="demo-log" id="wb-log"></div>
      <p class="demo-tip">${T(
        "先点“标准债券”：价格正好 1,000 美元。然后只拖动“市场要求的收益率”——现金流柱子（浅色）一根都不变，变的只是实心的现值柱，价格随之涨跌。再点“30 年期国债”：注意越远的现金流被折得越小，这就是长债对利率格外敏感的原因（阶段 4.2、4.4）。",
        "Click “Standard bond” first: the price is exactly $1,000. Now drag only the market yield. Not a single cash-flow bar (light) changes; only the solid present-value bars move, and the price with them. Then click “30-year Treasury”: the further out a payment is, the harder it gets shrunk. That is why long bonds are so sensitive to rates (Stages 4.2 and 4.4)."
      )}</p>
    </div>`;

  const q = (s) => root.querySelector(s);
  const cpn = () => String(+st.coupon.toFixed(3));

  const flowsOf = () => {
    if (st.freq === 0 || st.coupon === 0) return [{ t: st.years, cf: st.face }];
    return bondCashflows(st.face, st.coupon / 100, st.years, st.freq);
  };

  const drawSvg = (flows, pvs) => {
    const W = 620, H = 210, L = 40, R = 610, base = 170, top = 24;
    const maxCf = Math.max(...flows.map((f) => f.cf));
    const tMax = Math.max(st.years, 0.25);
    const xOf = (t) => L + (t / tMax) * (R - L - 12);
    const bw = Math.max(3, Math.min(22, ((R - L) / Math.max(flows.length, 1)) * 0.6));
    const hOf = (v) => Math.max(1.5, (v / maxCf) * (base - top));
    let bars = "";
    flows.forEach((f, i) => {
      const x = xOf(f.t) - bw / 2;
      const isLast = i === flows.length - 1;
      const col = isLast && st.face > 0 ? "var(--orange)" : "var(--blue)";
      const hN = hOf(f.cf), hP = hOf(pvs[i]);
      bars += `<rect x="${x.toFixed(1)}" y="${(base - hN).toFixed(1)}" width="${bw.toFixed(1)}" height="${hN.toFixed(1)}" fill="${col}" opacity="0.22" rx="1.5"/>`;
      bars += `<rect x="${x.toFixed(1)}" y="${(base - hP).toFixed(1)}" width="${bw.toFixed(1)}" height="${hP.toFixed(1)}" fill="${col}" rx="1.5"/>`;
    });
    let ticks = "";
    const step = tMax <= 1 ? 0.25 : tMax <= 10 ? 1 : 5;
    for (let t = 0; t <= tMax + 1e-9; t += step) {
      ticks += `<text x="${xOf(t).toFixed(1)}" y="${base + 14}" text-anchor="middle" font-size="10" fill="var(--muted)">${fmtNum(t, t % 1 ? 2 : 0)}</text>`;
    }
    const last = flows[flows.length - 1];
    const lx = Math.min(xOf(last.t), R - 70);
    q("#wb-svg").innerHTML = `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" font-family="Inter, system-ui, sans-serif" role="img">
      <line x1="${L}" y1="${base}" x2="${R}" y2="${base}" stroke="var(--line)" stroke-width="1.5"/>
      ${bars}${ticks}
      <text x="${(L + R) / 2}" y="${H - 6}" text-anchor="middle" font-size="10" fill="var(--muted)">${T("年", "years")}</text>
      <text x="${lx.toFixed(1)}" y="16" text-anchor="middle" font-size="10" fill="var(--orange-ink)">${T("最后一笔 ", "last payment ")}${fmtUsd(last.cf, 2)} → ${T("今天值 ", "worth today ")}${fmtUsd(pvs[pvs.length - 1], 2)}</text>
      <g font-size="10"><rect x="${L}" y="6" width="10" height="8" fill="var(--blue)" opacity="0.22"/><text x="${L + 14}" y="14" fill="var(--muted)">${T("名义现金流", "cash flow")}</text><rect x="${L + 90}" y="6" width="10" height="8" fill="var(--blue)"/><text x="${L + 104}" y="14" fill="var(--muted)">${T("今天的现值", "present value")}</text></g>
    </svg>`;
  };

  const paint = () => {
    q("#wb-coupon").value = st.coupon; q("#wb-years").value = st.years; q("#wb-ytm").value = st.ytm;
    q("#wb-v-coupon").textContent = cpn() + "%";
    q("#wb-v-years").textContent = String(+st.years.toFixed(2)) + T(" 年", " yrs");
    q("#wb-v-ytm").textContent = fmtNum(st.ytm, 2) + "%";
    root.querySelectorAll("#wb-freq button").forEach((b) => b.classList.toggle("on", +b.dataset.f === st.freq));

    const y = st.ytm / 100;
    const flows = flowsOf();
    // 每笔现金流按“每半年复利”的市场收益率折现（与 bondPrice 的约定一致）；零息用 pv()
    const perYear = st.freq === 1 ? 1 : 2;
    const zero = st.freq === 0 || st.coupon === 0;
    const pvs = flows.map((f) => pv(f.cf, y, f.t, zero ? 2 : perYear));
    const price = st.freq === 0 || st.coupon === 0
      ? pv(st.face, y, st.years, 2)
      : npv(flows.map((f) => ({ t: f.t * perYear, cf: f.cf })), y / perYear);
    const totalCash = flows.reduce((s, f) => s + f.cf, 0);
    const coupons = totalCash - st.face;
    const annualCoupon = st.freq === 0 ? 0 : st.face * st.coupon / 100;
    const curY = price > 0 ? annualCoupon / price : 0;
    const pvPrincipal = pv(st.face, y, flows[flows.length - 1].t, zero ? 2 : perYear);
    const diff = price - st.face;
    const kind = Math.abs(diff) < 0.005 ? "par" : diff > 0 ? "prem" : "disc";

    drawSvg(flows, pvs);

    q("#wb-stats").innerHTML = [
      [T("价格（现值之和）", "Price (sum of PVs)"), fmtUsd(price, 2), kind === "prem" ? "pos" : kind === "disc" ? "neg" : "acc"],
      [T("持有到期共收到", "Total cash to maturity"), fmtUsd(totalCash, 2), ""],
      [T("其中利息", "of which interest"), fmtUsd(coupons, 2), ""],
      [T("当期收益率", "Current yield"), st.freq === 0 ? T("无票息", "no coupon") : fmtPct(curY, 2), ""],
      [T("本金占价格", "Principal's share of price"), fmtPct(price > 0 ? pvPrincipal / price : 0, 1), ""],
    ].map(([k, v, c]) => `<div class="stat"><div class="k">${k}</div><div class="v ${c}">${v}</div></div>`).join("");

    const lines = [];
    const n = flows.length;
    if (st.freq === 0 || st.coupon === 0) {
      lines.push(`${T("零息债：只有一笔现金流", "Zero coupon: a single cash flow of ")} ${fmtUsd(st.face, 0)}${T("，在第 ", " in year ")}${fmtNum(st.years, 2)}${T(" 年到账。价格 = ", ". Price = ")}${fmtUsd(st.face, 0)} ÷ (1 + ${fmtNum(st.ytm, 2)}% ÷ 2)^${fmtNum(st.years * 2, 1)} = <b>${fmtUsd(price, 2)}</b>${T("。利息就藏在折价里", ". The interest is hidden in the discount")}${T("（", " (")}${fmtUsd(st.face - price, 2)}${T("）。", ").")}`);
    } else {
      lines.push(`${n} ${T("笔票息，每笔", "coupon payments of")} ${fmtUsd(annualCoupon / perYear, 2)}${T("，最后一笔连同本金", "; the last one arrives with the principal")} ${fmtUsd(st.face, 0)}${T("。名义合计", ". Nominal total")} ${fmtUsd(totalCash, 2)}${T("，按", ", discounted at")} ${fmtNum(st.ytm, 2)}% ${T("折现后只值", "is worth only")} <b>${fmtUsd(price, 2)}</b>${T("。", " today.")}`);
    }
    if (kind === "par") lines.push(`<span class="ok">${T("平价：票面利率 = 市场收益率，票息恰好补偿等待的时间，价格等于面值。", "At par: coupon rate = market yield. The coupons exactly pay for the wait, so the price equals face value.")}</span>`);
    else if (kind === "prem") lines.push(`<span class="ok">${T("溢价：票面利率", "Premium: the coupon rate")} ${cpn()}% ${T("高于市场要求的", "is above the")} ${fmtNum(st.ytm, 2)}%${T("，这张借条比新发行的更“慷慨”，买家愿意多付", " the market demands. This IOU is more generous than a new one, so buyers pay")} ${fmtUsd(diff, 2)}${T("。", " extra.")}</span>`);
    else lines.push(`<span class="warn">${T("折价：票面利率", "Discount: the coupon rate")} ${cpn()}% ${T("低于市场要求的", "is below the")} ${fmtNum(st.ytm, 2)}%${T("，买家要少付", " the market demands, so buyers pay")} ${fmtUsd(-diff, 2)}${T("，靠到期多拿回的差价把收益补足。", " less and earn the gap back as the price pulls up to face value at maturity.")}</span>`);
    if (st.years >= 20 && st.freq !== 0 && st.coupon > 0) lines.push(`${T("长债的价格大部分来自票息：本金只占价格的", "Most of a long bond's price comes from the coupons: the principal is only")} ${fmtPct(price > 0 ? pvPrincipal / price : 0, 1)}${T("——因为", " of it, because")} ${fmtNum(st.years, 0)} ${T("年后的 1 美元今天只值", "years out, $1 is worth only")} ${fmtUsd(pv(1, y, st.years, 2), 3)}${T("。", " today.")}`);
    q("#wb-log").innerHTML = lines.map((l) => `<div>${l}</div>`).join("");
  };

  q("#wb-coupon").addEventListener("input", (e) => { st.coupon = +e.target.value; if (st.coupon > 0 && st.freq === 0) st.freq = 2; paint(); });
  q("#wb-years").addEventListener("input", (e) => { st.years = +e.target.value; paint(); });
  q("#wb-ytm").addEventListener("input", (e) => { st.ytm = +e.target.value; paint(); });
  root.querySelectorAll("#wb-freq button").forEach((b) => b.addEventListener("click", () => {
    st.freq = +b.dataset.f;
    if (st.freq === 0) st.coupon = 0; else if (st.coupon === 0) st.coupon = 5;
    paint();
  }));
  root.querySelectorAll("#wb-pre button").forEach((b) => b.addEventListener("click", () => {
    const p = presets.find((x) => x.k === b.dataset.p);
    Object.assign(st, p.v);
    root.querySelectorAll("#wb-pre button").forEach((o) => o.classList.toggle("active", o === b));
    paint();
  }));
  root.querySelector('#wb-pre button[data-p="std"]').classList.add("active");
  paint();
}
