// 交互演示：久期与凸性计算器。选一只债券（或自己调票息/期限/收益率），施加 ±bp 冲击，
// 对比“精确重新定价”“只用久期的直线估算”“久期 + 凸性”三者；并给出 DV01、持仓美元风险与“一年票息能扛住多少基点”。
import { bondRisk, bondPrice, priceChangeApprox, fmtNum, fmtPct, fmtUsd, tex } from "./_fin.js";

// 把格式化好的数放进 LaTeX：% → \%，$ → \$，千分位逗号 → {,}
const pc = (s) => String(s).replace(/%/g, "\\%");
const tx = (s) => String(s).replace(/\$/g, "\\$").replace(/,/g, "{,}");
import { lineChart, chartBlock } from "./_chart.js";

export default function mount(root, lang) {
  const en = lang === "en";
  const T = (zh, e) => (en ? e : zh);

  const presets = [
    { k: "t2", label: T("2 年期国债", "2-year Treasury"), v: { coupon: 5, years: 2, ytm: 5 } },
    { k: "t10", label: T("标准 10 年期", "Standard 10-year"), v: { coupon: 5, years: 10, ytm: 5 } },
    { k: "t30", label: T("30 年期国债", "30-year Treasury"), v: { coupon: 5, years: 30, ytm: 5 } },
    { k: "z30", label: T("30 年零息债", "30-year zero"), v: { coupon: 0, years: 30, ytm: 5 } },
    { k: "old", label: T("2020 式低票息长债（1.375%，剩 24 年，5.5%）", "2020-style low-coupon bond (1.375%, 24y left, 5.5%)"), v: { coupon: 1.375, years: 24, ytm: 5.5 } },
    { k: "perp", label: T("近似永续优先股（10%，100 年）", "Near-perpetual preferred (10%, 100y)"), v: { coupon: 10, years: 100, ytm: 10 } },
  ];
  const sizes = [[1000, "$1,000"], [1e6, "$1M"], [1e8, "$100M"]];
  const st = { coupon: 5, years: 30, ytm: 5, shock: 100, size: 1e6 };

  root.innerHTML = `
    <div class="demo">
      <div class="demo-head">${T("📏 久期与凸性计算器：利率动一下，债券动多少", "📏 Duration & convexity calculator: rates move, how much does the bond move?")}</div>
      <div class="demo-block">
        <div class="demo-btns" id="dc-pre">${presets.map((p) => `<button class="demo-btn" data-k="${p.k}">${p.label}</button>`).join("")}</div>
      </div>
      <div class="demo-grid">
        <div class="demo-block">
          <label class="demo-label">${T("票面利率", "Coupon rate")} <b id="dc-v-coupon"></b></label>
          <input class="demo-slider" type="range" id="dc-coupon" min="0" max="12" step="0.125" />
          <label class="demo-label">${T("剩余期限", "Years to maturity")} <b id="dc-v-years"></b></label>
          <input class="demo-slider" type="range" id="dc-years" min="1" max="100" step="0.5" />
          <label class="demo-label">${T("当前收益率", "Current yield")} <b id="dc-v-ytm"></b></label>
          <input class="demo-slider" type="range" id="dc-ytm" min="0.5" max="12" step="0.05" />
        </div>
        <div class="demo-block">
          <label class="demo-label">${T("收益率冲击", "Yield shock")} <b id="dc-v-shock"></b></label>
          <input class="demo-slider" type="range" id="dc-shock" min="-300" max="300" step="5" />
          <div class="demo-label">${T("持仓面值", "Position (face value)")}</div>
          <div class="demo-seg" id="dc-size">${sizes.map(([v, l]) => `<button data-s="${v}">${l}</button>`).join("")}</div>
          <div class="stat-row" id="dc-risk"></div>
        </div>
      </div>
      <div class="demo-block">
        <div class="demo-label">${T("冲击后的价格变化：三种算法", "Price change after the shock: three methods")}</div>
        <div class="stages" id="dc-bars"></div>
      </div>
      <div id="dc-chart"></div>
      <div class="demo-log" id="dc-log"></div>
      <p class="demo-tip">${T(
        "先点“30 年期国债”，把冲击拖到 +100bp：直线（只用久期）估 −15.5%，精确 −13.8%，加上凸性后几乎重合。再把冲击拖到 −100bp，看凸性让上涨比下跌多。然后点“近似永续优先股”：修正久期约等于 ",
        "Click “30-year Treasury” and drag the shock to +100bp: the straight line (duration only) says −15.5%, the exact answer is −13.8%, and adding convexity nearly closes the gap. Drag to −100bp and watch convexity make the gain bigger than the loss. Then click “Near-perpetual preferred”: modified duration is about "
      )}${tex(String.raw`\dfrac{1}{10\%} = 10`)}${T(
        "；把收益率降到 6%，久期拉长到约 16——收益率越低，跷跷板越长。",
        ". Lower the yield to 6% and duration stretches to about 16. The lower the yield, the longer the seesaw."
      )}</p>
    </div>`;

  const q = (s) => root.querySelector(s);

  const paint = () => {
    q("#dc-coupon").value = st.coupon; q("#dc-years").value = st.years; q("#dc-ytm").value = st.ytm; q("#dc-shock").value = st.shock;
    q("#dc-v-coupon").textContent = String(+st.coupon.toFixed(3)) + "%";
    q("#dc-v-years").textContent = String(+st.years.toFixed(1)) + T(" 年", " yrs");
    q("#dc-v-ytm").textContent = fmtNum(st.ytm, 2) + "%";
    q("#dc-v-shock").textContent = (st.shock > 0 ? "+" : "") + st.shock + "bp";
    root.querySelectorAll("#dc-size button").forEach((b) => b.classList.toggle("on", +b.dataset.s === st.size));

    const y = st.ytm / 100, dy = st.shock / 10000, c = st.coupon / 100;
    const r = bondRisk(100, c, y, st.years);
    const pNew = bondPrice(100, c, Math.max(y + dy, -0.04), st.years);
    const exact = pNew / r.price - 1;
    const durOnly = -r.modified * dy;
    const durConv = priceChangeApprox(r.modified, r.convexity, dy);
    const posValue = st.size * r.price / 100;
    const dv01Pos = r.dv01 / 100 * st.size;
    const cy = r.price > 0 ? (100 * c) / r.price : 0;
    const beBp = r.modified > 0 ? (cy / r.modified) * 10000 : Infinity;

    q("#dc-risk").innerHTML = [
      [T("价格（每 100 面值）", "Price (per 100 face)"), fmtNum(r.price, 2), ""],
      [T("麦考利久期", "Macaulay duration"), fmtNum(r.macaulay, 2) + T(" 年", " yrs"), ""],
      [T("修正久期", "Modified duration"), fmtNum(r.modified, 2), "acc"],
      [T("凸性", "Convexity"), fmtNum(r.convexity, 1), ""],
      [T("持仓 DV01", "Position DV01"), fmtUsd(dv01Pos, dv01Pos < 10 ? 2 : 0) + T(" / 基点", " / bp"), "neg"],
    ].map(([k, v, cl]) => `<div class="stat"><div class="k">${k}</div><div class="v ${cl}">${v}</div></div>`).join("");

    const rows = [
      [T("精确重新定价", "Exact repricing"), exact, "var(--ink)"],
      [T("只用久期（直线）", "Duration only (line)"), durOnly, "var(--blue)"],
      [T("久期 + 凸性", "Duration + convexity"), durConv, "var(--green)"],
    ];
    const maxAbs = Math.max(0.01, ...rows.map((x) => Math.abs(x[1])));
    q("#dc-bars").innerHTML = rows.map(([lab, v, col]) => `<div class="stage-bar"><span class="lab">${lab}</span><div class="track"><div class="fill" style="width:${(Math.abs(v) / maxAbs * 100).toFixed(1)}%;background:${col};opacity:${v < 0 ? 0.85 : 0.6}"></div></div><span class="val" style="color:${v < 0 ? "var(--red)" : "var(--green)"}">${v >= 0 ? "+" : ""}${fmtPct(v, 2)}</span></div>`).join("");

    const span = Math.max(3, Math.abs(st.shock) / 100 + 1.5);
    const lo = Math.max(0.25, st.ytm - span), hi = st.ytm + span;
    const res = lineChart({
      fns: [
        { f: (x) => bondPrice(100, c, x / 100, st.years), cls: "line3" },
        { f: (x) => r.price * (1 - r.modified * (x - st.ytm) / 100), cls: "line2" },
        { f: (x) => r.price * (1 + priceChangeApprox(r.modified, r.convexity, (x - st.ytm) / 100)), cls: "line4" },
      ],
      lo, hi, xlabel: T("收益率（%）", "Yield (%)"), markerX: st.ytm + st.shock / 100, markerLabel: T("冲击后", "after shock"), uid: "dc",
    });
    q("#dc-chart").innerHTML = chartBlock(res, [["var(--red)", T("真实价格", "True price")], ["var(--blue)", T("久期直线", "Duration line")], ["var(--green)", T("久期 + 凸性", "Duration + convexity")]]);

    const lines = [];
    lines.push(`${tex(String.raw`-\text{${T("修正久期", "modified duration")}}\ ${fmtNum(r.modified, 2)} \times \text{${T("冲击", "shock")}}\ ${(st.shock / 100).toFixed(2)}\% \approx ${pc(fmtPct(durOnly, 2))}`)}${T("；精确重新定价", "; exact repricing gives")} ${fmtPct(exact, 2)}${T("；误差", "; error")} ${fmtPct(durOnly - exact, 2)}${T("，加上 ", ", and after adding ")}${tex(String.raw`\tfrac{1}{2} \times \text{${T("凸性", "convexity")}} \times (\Delta y)^{2}`)}${T(" 后只剩", " only")} ${fmtPct(durConv - exact, 2)}${T("。", " remains.")}`);
    lines.push(`${T("持仓市值", "Position value")} ${fmtUsd(posValue, 0)}${T("，冲击后盈亏约", "; P&L after the shock about")} <b>${fmtUsd(posValue * exact, 0)}</b>${T("（", " (")}${tex(String.raw`-\mathrm{DV01} \times \text{${T("基点数", "bp")}} \approx ${tx(fmtUsd(-dv01Pos * st.shock, 0))}`)}${T("）。", ").")}`);
    if (st.coupon > 0 && isFinite(beBp)) lines.push(`${tex(String.raw`\dfrac{\text{${T("当期收益率", "current yield")}}\ ${pc(fmtPct(cy, 2))}}{\text{${T("修正久期", "modified duration")}}\ ${fmtNum(r.modified, 2)}} \approx \mathbf{${Math.round(beBp)}}\ \text{bp}`)}${T("：收益率只要上升这么多，一整年的票息收入就被价格下跌抵消。久期越长，这层“垫子”越薄。", ": a yield rise of just this much wipes out a full year of coupon income through the price drop. The longer the duration, the thinner this cushion.")}`);
    else lines.push(`${T("零息债没有票息垫子：它的久期就是期限，全部回报都押在最后一天。", "A zero has no coupon cushion: its duration equals its maturity and the whole return rides on the final day.")}`);
    if (st.years >= 60) lines.push(`<span class="warn">${T("100 年期近似永续：", "At 100 years this is nearly perpetual: ")}${tex(String.raw`\text{${T("修正久期", "modified duration")}}\ ${fmtNum(r.modified, 2)} \approx \dfrac{1}{\text{${T("收益率", "yield")}}} = ${fmtNum(1 / y, 2)}`)}${T("。没有到期拉回面值的锚，这是最长的跷跷板（阶段 18.1）。", ". With no maturity to pull it back to par, this is the longest seesaw (Stage 18.1).")}</span>`);
    if (st.shock > 0 && exact > durOnly) lines.push(`<span class="ok">${T("凸性在帮你：真实跌幅比直线估算少", "Convexity is working for you: the true loss is smaller than the straight line by")} ${fmtPct(exact - durOnly, 2)}${T("。", ".")}</span>`);
    if (st.shock < 0 && exact > durOnly) lines.push(`<span class="ok">${T("凸性在帮你：真实涨幅比直线估算多", "Convexity is working for you: the true gain beats the straight line by")} ${fmtPct(exact - durOnly, 2)}${T("。", ".")}</span>`);
    q("#dc-log").innerHTML = lines.map((l) => `<div>${l}</div>`).join("");
  };

  for (const k of ["coupon", "years", "ytm", "shock"]) q("#dc-" + k).addEventListener("input", (e) => { st[k] = +e.target.value; paint(); });
  root.querySelectorAll("#dc-size button").forEach((b) => b.addEventListener("click", () => { st.size = +b.dataset.s; paint(); }));
  root.querySelectorAll("#dc-pre button").forEach((b) => b.addEventListener("click", () => {
    Object.assign(st, presets.find((p) => p.k === b.dataset.k).v);
    root.querySelectorAll("#dc-pre button").forEach((o) => o.classList.toggle("active", o === b));
    paint();
  }));
  q('#dc-pre button[data-k="t30"]').classList.add("active");
  paint();
}
