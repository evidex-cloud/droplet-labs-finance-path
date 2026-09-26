// 交互演示：价格–收益率跷跷板。拖动市场收益率（或反过来拖动价格求到期收益率），
// 看 2 年 / 10 年 / 30 年三只债券的价格如何反向摆动、期限越长摆得越猛；可一键套用 2020–2026 年的真实 30 年期收益率。
import { bondPrice, bondYield, fmtUsd, fmtPct, fmtNum, clamp } from "./_fin.js";
import { lineChart, chartBlock } from "./_chart.js";

export default function mount(root, lang) {
  const en = lang === "en";
  const T = (zh, e) => (en ? e : zh);

  const FACE = 1000;
  const MATS = [2, 10, 30];
  const COLS = ["var(--blue)", "var(--orange)", "var(--red)"];
  const st = { mode: "y", ytm: 5, coupon: 5, anchor: 5, price: 1000 };

  const scenarios = [
    { y: 5, label: T("平价 5%", "Par 5%") },
    { y: 1.65, label: T("1.65%（2020 年底 30 年期）", "1.65% (30y, end-2020)") },
    { y: 5.11, label: T("5.11%（2023-10-19 30 年期高点）", "5.11% (30y peak, Oct 19 2023)") },
    { y: 4.64, label: T("4.64%（2026-02-27 30 年期低点）", "4.64% (30y low, Feb 27 2026)") },
    { y: 5.49, label: T("5.49%（2026-09-25 30 年期）", "5.49% (30y, Sep 25 2026)") },
  ];

  root.innerHTML = `
    <div class="demo">
      <div class="demo-head">${T("⚖️ 价格–收益率跷跷板：利率一涨，债券就跌", "⚖️ The price–yield seesaw: rates up, bonds down")}</div>
      <div class="demo-block">
        <div class="demo-seg" id="py-mode">
          <button data-m="y" class="on">${T("给收益率 → 求价格", "Yield → price")}</button>
          <button data-m="p">${T("给价格 → 求到期收益率", "Price → yield to maturity")}</button>
        </div>
      </div>
      <div class="demo-grid">
        <div class="demo-block" id="py-yblock">
          <label class="demo-label">${T("市场收益率（三只债券同时适用）", "Market yield (applied to all three bonds)")} <b id="py-v-ytm"></b></label>
          <input class="demo-slider" type="range" id="py-ytm" min="0.5" max="10" step="0.01" />
          <div class="demo-btns" id="py-scn">${scenarios.map((s, i) => `<button class="demo-btn" data-i="${i}">${s.label}</button>`).join("")}</div>
        </div>
        <div class="demo-block" id="py-pblock" style="display:none">
          <label class="demo-label">${T("10 年期债券的市场价格", "Market price of the 10-year bond")} <b id="py-v-price"></b></label>
          <input class="demo-slider" type="range" id="py-price" min="600" max="1500" step="0.5" />
          <div class="demo-meta">${T("程序用二分法反复试算，找出让折现值恰好等于这个价格的收益率（_fin.js 的 bondYield）。", "The code searches by bisection for the rate that makes discounted value equal this price (bondYield in _fin.js).")}</div>
        </div>
        <div class="demo-block">
          <label class="demo-label">${T("票面利率（写死在合同里）", "Coupon rate (fixed by contract)")} <b id="py-v-coupon"></b></label>
          <input class="demo-slider" type="range" id="py-coupon" min="0" max="10" step="0.25" />
          <label class="demo-label">${T("比较起点（锚定收益率）", "Reference yield for comparison")} <b id="py-v-anchor"></b></label>
          <div class="demo-btns"><button class="demo-btn" id="py-setanchor">${T("把当前收益率设为起点", "Set current yield as reference")}</button></div>
        </div>
      </div>
      <div class="demo-block"><div id="py-saw"></div></div>
      <div class="stat-row" id="py-stats"></div>
      <div class="demo-block">
        <div class="demo-label">${T("相对起点的价格变化", "Price change versus the reference yield")}</div>
        <div class="stages" id="py-bars"></div>
      </div>
      <div id="py-chart"></div>
      <div class="demo-log" id="py-log"></div>
      <p class="demo-tip">${T(
        "先点“平价 5%”，再点“5.49%（2026-09-25）”：同样涨了 0.49 个百分点，2 年期几乎不动，30 年期跌了约 7%。再点“1.65%（2020 年底）”后把它设为起点，然后点 5.49%——这就是 2020 年买入长债的人到 2026 年看到的账面：没有任何违约，价格腰斩。",
        "Click “Par 5%”, then “5.49% (Sep 25 2026)”: the same 0.49-point rise barely moves the 2-year but knocks about 7% off the 30-year. Then click “1.65% (end-2020)”, set it as the reference, and click 5.49%. That is what someone who bought long bonds in 2020 sees on their statement in 2026: no default anywhere, and the price roughly halved."
      )}</p>
    </div>`;

  const q = (s) => root.querySelector(s);
  const priceOf = (m, y) => bondPrice(FACE, st.coupon / 100, y / 100, m);

  const drawSaw = (p10) => {
    const diff = st.ytm - st.coupon;
    const th = (clamp(diff * 3.2, -14, 14) * Math.PI) / 180;
    const cx = 300, cy = 118, half = 210;
    const lx = cx - half * Math.cos(th), ly = cy - half * Math.sin(th);
    const rx = cx + half * Math.cos(th), ry = cy + half * Math.sin(th);
    const box = (x, y, w, t1, t2, fill, stroke, ink) => `<rect x="${(x - w / 2).toFixed(1)}" y="${(y - 44).toFixed(1)}" width="${w}" height="38" rx="6" fill="${fill}" stroke="${stroke}"/>
      <text x="${x.toFixed(1)}" y="${(y - 28).toFixed(1)}" text-anchor="middle" font-size="11" font-weight="700" fill="${ink}">${t1}</text>
      <text x="${x.toFixed(1)}" y="${(y - 13).toFixed(1)}" text-anchor="middle" font-size="12" fill="var(--ink)">${t2}</text>`;
    const up = diff > 0.005, down = diff < -0.005;
    q("#py-saw").innerHTML = `<svg viewBox="0 0 600 175" xmlns="http://www.w3.org/2000/svg" font-family="Inter, system-ui, sans-serif" role="img">
      <line x1="${lx.toFixed(1)}" y1="${ly.toFixed(1)}" x2="${rx.toFixed(1)}" y2="${ry.toFixed(1)}" stroke="var(--ink)" stroke-width="6" stroke-linecap="round"/>
      <polygon points="${cx},${cy + 2} ${cx - 20},${cy + 42} ${cx + 20},${cy + 42}" fill="var(--muted)"/>
      <text x="${cx}" y="${cy + 56}" text-anchor="middle" font-size="10" fill="var(--muted)">${T("支点：写死的票息", "Fulcrum: the fixed coupon")} ${fmtNum(st.coupon, 2)}%</text>
      ${box(lx, ly, 150, T("市场收益率", "Market yield") + (up ? " ↑" : down ? " ↓" : ""), fmtNum(st.ytm, 2) + "%", up ? "var(--red-soft)" : "var(--surface-2)", up ? "var(--red)" : "var(--line)", up ? "var(--red)" : "var(--ink)")}
      ${box(rx, ry, 170, T("10 年期债券价格", "10-year bond price") + (up ? " ↓" : down ? " ↑" : ""), fmtUsd(p10, 2), down ? "var(--green-soft)" : up ? "var(--orange-soft)" : "var(--surface-2)", down ? "var(--green)" : up ? "var(--orange-line)" : "var(--line)", down ? "var(--green)" : up ? "var(--orange-ink)" : "var(--ink)")}
    </svg>`;
  };

  const paint = () => {
    if (st.mode === "p") st.ytm = bondYield(st.price, FACE, st.coupon / 100, 10) * 100;
    const p = MATS.map((m) => priceOf(m, st.ytm));
    const p0 = MATS.map((m) => priceOf(m, st.anchor));
    if (st.mode === "y") st.price = p[1];

    q("#py-ytm").value = st.ytm; q("#py-coupon").value = st.coupon; q("#py-price").value = st.price;
    q("#py-v-ytm").textContent = fmtNum(st.ytm, 2) + "%";
    q("#py-v-coupon").textContent = fmtNum(st.coupon, 2) + "%";
    q("#py-v-price").textContent = fmtUsd(st.price, 2);
    q("#py-v-anchor").textContent = fmtNum(st.anchor, 2) + "%";

    drawSaw(p[1]);

    const cy = st.coupon > 0 ? (FACE * st.coupon / 100) / p[1] : 0;
    const kind = Math.abs(p[1] - FACE) < 0.01 ? "par" : p[1] > FACE ? "prem" : "disc";
    q("#py-stats").innerHTML = [
      [T("10 年期价格", "10-year price"), fmtUsd(p[1], 2), kind === "prem" ? "pos" : kind === "disc" ? "neg" : "acc"],
      [T("状态", "Status"), kind === "par" ? T("平价", "par") : kind === "prem" ? T("溢价", "premium") : T("折价", "discount"), "acc"],
      [T("票面利率", "Coupon rate"), fmtNum(st.coupon, 2) + "%", ""],
      [T("当期收益率", "Current yield"), st.coupon > 0 ? fmtPct(cy, 2) : "–", ""],
      [T("到期收益率", "Yield to maturity"), fmtNum(st.ytm, 2) + "%", "acc"],
    ].map(([k, v, c]) => `<div class="stat"><div class="k">${k}</div><div class="v ${c}">${v}</div></div>`).join("");

    const chg = p.map((x, i) => x / p0[i] - 1);
    const maxAbs = Math.max(0.05, ...chg.map((c) => Math.abs(c)));
    q("#py-bars").innerHTML = MATS.map((m, i) => {
      const c = chg[i], w = (Math.abs(c) / maxAbs) * 100;
      return `<div class="stage-bar"><span class="lab">${m}${T(" 年期", "-year")} · ${fmtUsd(p[i], 2)}</span><div class="track"><div class="fill" style="width:${w.toFixed(1)}%;background:${c < 0 ? "var(--red)" : "var(--green)"}"></div></div><span class="val" style="color:${c < 0 ? "var(--red)" : "var(--green)"}">${c >= 0 ? "+" : ""}${fmtPct(c, 2)}</span></div>`;
    }).join("");

    const res = lineChart({
      fns: MATS.map((m, i) => ({ f: (y) => priceOf(m, y), cls: ["line2", "line", "line3"][i] })),
      lo: 0.5, hi: 10, xlabel: T("市场收益率（%）", "Market yield (%)"), markerX: st.ytm, markerLabel: fmtNum(st.ytm, 2) + "%", uid: "py",
    });
    q("#py-chart").innerHTML = chartBlock(res, MATS.map((m, i) => [COLS[i], `${m}${T(" 年期价格", "-year price")}`]));

    const lines = [];
    const gap = FACE - p[1];
    if (kind === "par") {
      lines.push(`<span class="ok">${T("收益率 = 票面利率：票息刚好补偿等待，三只债券都在面值 1,000 美元。", "Yield = coupon: the coupons exactly pay for the wait, so all three bonds sit at $1,000 face value.")}</span>`);
    } else if (kind === "disc") {
      lines.push(`${T("买家付", "A buyer pays")} ${fmtUsd(p[1], 2)}${T("，每年收", ", collects")} ${fmtUsd(FACE * st.coupon / 100, 2)} ${T("票息，10 年后拿回 1,000 美元——多拿回的", "a year in coupons, and gets $1,000 back in ten years. The extra")} ${fmtUsd(gap, 2)} ${T("把少收的票息补足，年化回报正好", "at maturity makes up for the smaller coupon, for an annual return of exactly")} <b>${fmtNum(st.ytm, 2)}%</b>${T("。", ".")}`);
    } else {
      lines.push(`${T("买家付", "A buyer pays")} ${fmtUsd(p[1], 2)}${T("，比到期能拿回的 1,000 美元多", ", which is")} ${fmtUsd(-gap, 2)}${T("——这部分会在 10 年里慢慢“还回去”，所以真实回报只有", " more than the $1,000 returned at maturity. That premium is slowly “given back” over ten years, so the true return is only")} <b>${fmtNum(st.ytm, 2)}%</b>${T("，低于票面利率。", ", below the coupon rate.")}`);
    }
    if (Math.abs(st.ytm - st.anchor) > 0.009 && Math.abs(chg[0]) > 1e-6) {
      const ratio = chg[2] / chg[0];
      lines.push(`${T("收益率从", "Yield moved from")} ${fmtNum(st.anchor, 2)}% ${T("变到", "to")} ${fmtNum(st.ytm, 2)}%${T("：30 年期的价格变化是 2 年期的", ": the 30-year's price change is")} <b>${fmtNum(ratio, 1)}</b> ${T("倍——期限越长，跷跷板越长（阶段 4.4 用久期精确衡量）。", "times the 2-year's. Longer bond, longer seesaw (Stage 4.4 measures it precisely with duration).")}`);
      const up = priceOf(30, st.anchor + Math.abs(st.ytm - st.anchor)) / p0[2] - 1;
      const dn = priceOf(30, st.anchor - Math.abs(st.ytm - st.anchor)) / p0[2] - 1;
      if (st.anchor - Math.abs(st.ytm - st.anchor) > 0) lines.push(`${T("不对称：同样幅度，30 年期收益率上升时跌", "Asymmetry: for the same size move, the 30-year falls")} ${fmtPct(Math.abs(up), 2)}${T("，下降时涨", " when yields rise but gains")} ${fmtPct(dn, 2)}${T("——这就是凸性。", " when they fall. That is convexity.")}`);
    }
    if (st.ytm - st.anchor >= 3) lines.push(`<span class="bad">${T("这就是低利率年代买入长债的人在利率回升后看到的账面：没有违约，却是巨额未实现亏损。被迫卖出时，它就变成真亏损（阶段 10.3 的硅谷银行）。", "This is what long-bond buyers from the low-rate era see once rates rise: no default, yet a huge unrealized loss. A forced sale turns it into a real one (Silicon Valley Bank, Stage 10.3).")}</span>`);
    q("#py-log").innerHTML = lines.map((l) => `<div>${l}</div>`).join("");
  };

  q("#py-ytm").addEventListener("input", (e) => { st.ytm = +e.target.value; paint(); });
  q("#py-price").addEventListener("input", (e) => { st.price = +e.target.value; paint(); });
  q("#py-coupon").addEventListener("input", (e) => { st.coupon = +e.target.value; if (st.mode === "p") st.price = priceOf(10, st.ytm); paint(); });
  q("#py-setanchor").addEventListener("click", () => { st.anchor = st.ytm; paint(); });
  root.querySelectorAll("#py-scn button").forEach((b) => b.addEventListener("click", () => {
    st.mode = "y"; setMode();
    st.ytm = scenarios[+b.dataset.i].y;
    paint();
  }));
  const setMode = () => {
    root.querySelectorAll("#py-mode button").forEach((o) => o.classList.toggle("on", o.dataset.m === st.mode));
    q("#py-yblock").style.display = st.mode === "y" ? "" : "none";
    q("#py-pblock").style.display = st.mode === "p" ? "" : "none";
  };
  root.querySelectorAll("#py-mode button").forEach((b) => b.addEventListener("click", () => {
    st.mode = b.dataset.m;
    if (st.mode === "p") st.price = priceOf(10, st.ytm);
    setMode(); paint();
  }));
  setMode();
  paint();
}
