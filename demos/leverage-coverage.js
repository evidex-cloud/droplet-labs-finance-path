// 交互演示：覆盖率计算器——两种公司、两套尺子。
// 现金流公司（枫叶制造）：负债/EBITDA、LTV、利息覆盖、固定费用覆盖、资产覆盖；
// 比特币财库（橙子公司）：按层资产覆盖（BTC 评级思路）、储备月数、放大倍数，现金流尺子失灵。
import { coverageByLayer, btcRating, monthsCovered, amplification, fmtNum, fmtPct, fmtUsd , enPunct, tex } from "./_fin.js";

// 把格式化好的数字放进 LaTeX：千分位写成 {,}，$ 与 % 转义
const texv = (s) => String(s).replace(/\$/g, "\\$").replace(/,/g, "{,}").replace(/%/g, "\\%");

export default function mount(root, lang) {
  const en = lang === "en";
  const T = (zh, e) => (en ? e : zh);
  if (en) enPunct(root);

  let mode = "cf";
  const cf = { ebitda: 20, debt: 70, rate: 6.4, pref: 10, assets: 100 };
  const bt = { px: 100000, newPref: 0, reserve: 30 };
  const DA = 5, TAX = 0.21, PREF_RATE = 0.08;

  root.innerHTML = `
    <div class="demo">
      <div class="demo-head">${T("📏 覆盖率计算器：两种公司，两套尺子", "📏 Coverage calculator: two kinds of company, two sets of rulers")}</div>
      <div class="demo-block">
        <div class="demo-seg" id="lc-seg">
          <button data-m="cf" class="on">${T("现金流公司（枫叶制造）", "Cash-flow company (Maple)")}</button>
          <button data-m="bt">${T("比特币财库（橙子公司）", "Bitcoin treasury (Orange Corp)")}</button>
        </div>
      </div>
      <div id="lc-ctrl" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:10px"></div>
      <div class="stat-row" id="lc-stats"></div>
      <div class="stages" id="lc-bars"></div>
      <div class="demo-log" id="lc-log"></div>
      <p class="demo-tip">${T(
        "在枫叶制造里把 EBITDA 从 20 拖到 8：利息覆盖跌破 1.5 倍，杠杆指标一起变红——现金流尺子很灵。切到橙子公司：利息覆盖一栏永远是“无意义”，真正会动的是比特币滑块下的资产覆盖，以及储备滑块下的月数。再加 2 亿新优先股，看 D 层的垫子怎么变薄、储备月数怎么缩短。",
        "In Maple, drag EBITDA from 20 down to 8: interest coverage drops below 1.5x and the leverage ratios turn red — the cash-flow rulers work. Switch to Orange Corp: the interest-coverage box is always “meaningless”; what actually moves is asset coverage under the bitcoin slider and months under the reserve slider. Then add $200M of new preferred and watch the D layer's cushion thin and the months shrink."
      )}</p>
    </div>`;

  const q = (s) => root.querySelector(s);
  const pill = (ok, txt) => `<span class="pill ${ok ? "ok" : "bad"}">${txt}</span>`;

  const ctrlDefs = {
    cf: [
      ["ebitda", T("年 EBITDA（百万美元）", "Annual EBITDA ($M)"), 0, 40, 0.5],
      ["debt", T("总债务（百万美元）", "Total debt ($M)"), 0, 150, 1],
      ["rate", T("平均利率（%）", "Average interest rate (%)"), 2, 14, 0.1],
      ["pref", T("优先股（百万美元，8% 股息）", "Preferred ($M, 8% dividend)"), 0, 40, 1],
      ["assets", T("资产价值（百万美元）", "Asset value ($M)"), 30, 200, 1],
    ],
    bt: [
      ["px", T("比特币价格（美元）", "Bitcoin price ($)"), 10000, 200000, 1000],
      ["newPref", T("新增优先股（百万美元，10%，排在 D 层之后）", "New preferred ($M, 10%, junior to D)"), 0, 500, 10],
      ["reserve", T("美元储备（百万美元）", "USD reserve ($M)"), 0, 150, 1],
    ],
  };

  const buildCtrl = () => {
    const st = mode === "cf" ? cf : bt;
    q("#lc-ctrl").innerHTML = ctrlDefs[mode].map(([k, lab, lo, hi, step]) => `
      <div class="demo-block" style="margin:6px 0">
        <label class="demo-label">${lab}${T("：", ": ")}<b id="lc-v-${k}"></b></label>
        <input class="demo-slider" type="range" data-k="${k}" min="${lo}" max="${hi}" step="${step}" value="${st[k]}" />
      </div>`).join("");
    q("#lc-ctrl").querySelectorAll("[data-k]").forEach((el) => el.addEventListener("input", () => { st[el.dataset.k] = +el.value; paint(); }));
  };

  const bars = (rows, maxCov) => rows.map((r) => {
    const w = Math.min(100, (Math.min(r.coverage, maxCov) / maxCov) * 100);
    const col = r.coverage >= 3 ? "var(--green)" : r.coverage >= 1.5 ? "var(--orange)" : "var(--red)";
    return `<div class="stage-bar"><span class="lab">${r.name}</span><div class="track"><div class="fill" style="width:${w}%;background:${col}"></div></div><span class="val">${isFinite(r.coverage) ? fmtNum(r.coverage, 2) + "x" : "∞"}</span></div>`;
  }).join("");

  const paintCF = () => {
    for (const k of Object.keys(cf)) q("#lc-v-" + k).textContent = k === "rate" ? cf[k].toFixed(1) + "%" : fmtNum(cf[k], k === "ebitda" ? 1 : 0);
    const ebit = cf.ebitda - DA, interest = cf.debt * cf.rate / 100, prefDiv = cf.pref * PREF_RATE;
    const prefPretax = prefDiv / (1 - TAX);
    const icov = interest > 0 ? ebit / interest : Infinity;
    const fcc = interest + prefPretax > 0 ? ebit / (interest + prefPretax) : Infinity;
    const dEbitda = cf.ebitda > 0 ? cf.debt / cf.ebitda : Infinity;
    const ltv = cf.debt / cf.assets;
    const equity = cf.assets - cf.debt - cf.pref;
    const de = equity > 0 ? cf.debt / equity : Infinity;
    q("#lc-stats").innerHTML = [
      [T("负债 / EBITDA", "Debt / EBITDA"), isFinite(dEbitda) ? fmtNum(dEbitda, 2) + "x" : "∞", dEbitda <= 3 ? "pos" : dEbitda <= 5 ? "acc" : "neg"],
      [T("负债 / 权益", "Debt / equity"), isFinite(de) ? fmtNum(de, 2) + "x" : "∞", de <= 2 ? "pos" : de <= 4 ? "acc" : "neg"],
      ["LTV", fmtPct(ltv, 1), ltv <= 0.5 ? "pos" : ltv <= 0.8 ? "acc" : "neg"],
      [T("利息覆盖", "Interest cover"), isFinite(icov) ? fmtNum(icov, 2) + "x" : "∞", icov >= 3 ? "pos" : icov >= 1.5 ? "acc" : "neg"],
      [T("固定费用覆盖", "Fixed-charge cover"), isFinite(fcc) ? fmtNum(fcc, 2) + "x" : "∞", fcc >= 2.5 ? "pos" : fcc >= 1.2 ? "acc" : "neg"],
    ].map(([k, v, c]) => `<div class="stat"><div class="k">${k}</div><div class="v ${c}">${v}</div></div>`).join("");

    // 按楼层的资产覆盖：沿用枫叶制造的债务结构比例（担保 30/70、高级 25/70、次级 15/70）
    const layers = [
      { name: T("担保贷款", "Secured"), claim: cf.debt * 30 / 70 },
      { name: T("高级债", "Senior"), claim: cf.debt * 25 / 70 },
      { name: T("次级票据", "Sub notes"), claim: cf.debt * 15 / 70 },
      { name: T("优先股", "Preferred"), claim: cf.pref },
    ];
    const cov = coverageByLayer(cf.assets, layers);
    q("#lc-bars").innerHTML = `<div class="demo-label" style="margin-bottom:2px">${T("按层累计资产覆盖（满格 = 4 倍）", "Cumulative asset coverage by layer (full bar = 4x)")}</div>` + bars(cov, 4);

    const lines = [];
    lines.push(`${tex(String.raw`\mathrm{EBIT} = \mathrm{EBITDA} - \text{${T("折旧摊销", "D\\&A")}}\ ${DA} = \mathbf{${texv(fmtNum(ebit, 1))}}`)}；${tex(String.raw`\text{${T("利息", "interest")}} = ${texv(fmtNum(cf.debt, 0))} \times ${cf.rate.toFixed(1)}\% = \mathbf{${texv(fmtNum(interest, 2))}}`)}；${T("优先股股息", "preferred dividend")} ${fmtNum(prefDiv, 2)} → ${T("税前等值", "pre-tax equivalent")} ${tex(String.raw`\dfrac{${texv(fmtNum(prefDiv, 2))}}{1 - 21\%} = ${texv(fmtNum(prefPretax, 2))}`)}`);
    if (isFinite(icov) && icov > 0) lines.push(`${T("利息覆盖 ", "Interest cover ")}${fmtNum(icov, 2)}x ⇒ ${T("经营利润可再下滑 ", "operating profit can fall another ")}${tex(String.raw`1 - \dfrac{1}{${texv(fmtNum(icov, 2))}} \approx \mathbf{${texv(fmtPct(Math.max(0, 1 - 1 / icov), 0))}}`)}${T(" 才付不起利息。", " before interest can't be paid.")}`);
    else lines.push(`<span class="bad">${T("EBIT 不足以支付利息：只能靠现金、卖资产或再融资——这就是违约的前夜。", "EBIT doesn't cover interest: only cash, asset sales or refinancing remain — the eve of default.")}</span>`);
    const last = cov[cov.length - 1];
    lines.push(`${T("优先股层累计覆盖 ", "Preferred layer cumulative coverage ")}${fmtNum(last.coverage, 2)}x ⇒ ${T("资产可跌 ", "assets can fall ")}${tex(String.raw`1 - \dfrac{1}{${texv(fmtNum(last.coverage, 2))}} \approx \mathbf{${texv(fmtPct(Math.max(0, 1 - 1 / last.coverage), 0))}}`)}${T(" 而优先股仍能拿满。", " with the preferred still paid in full.")} ${pill(last.coverage >= 1.25, last.coverage >= 1.25 ? T("尚可", "OK") : T("垫子太薄", "cushion too thin"))}`);
    q("#lc-log").innerHTML = lines.map((l) => `<div>${l}</div>`).join("");
  };

  const paintBT = () => {
    q("#lc-v-px").textContent = fmtUsd(bt.px);
    q("#lc-v-newPref").textContent = fmtNum(bt.newPref, 0);
    q("#lc-v-reserve").textContent = fmtNum(bt.reserve, 0);
    const nav = (10000 * bt.px) / 1e6; // 百万美元
    const layers = [
      { name: T("可转债", "Converts"), claim: 150 },
      { name: "Orange-F", claim: 100 },
      { name: "Orange-D", claim: 50 },
    ];
    if (bt.newPref > 0) layers.push({ name: T("新优先股", "New pref"), claim: bt.newPref });
    const claims = layers.reduce((s, l) => s + l.claim, 0);
    const annual = (150 + bt.newPref) * 0.10; // F + D + 新优先股 10%；可转债 0% 票息
    const cov = coverageByLayer(nav, layers);
    const months = monthsCovered(bt.reserve, annual);
    const amp = amplification(nav, claims);
    const rating = btcRating(nav, claims);
    q("#lc-stats").innerHTML = [
      [T("比特币净值", "BTC NAV"), fmtNum(nav, 0), "acc"],
      [T("利息覆盖", "Interest cover"), T("无意义", "meaningless"), ""],
      [T("最劣后层覆盖", "Most junior layer cover"), fmtNum(rating, 2) + "x", rating >= 3 ? "pos" : rating >= 1.5 ? "acc" : "neg"],
      [T("储备月数", "Reserve months"), fmtNum(months, 1), months >= 18 ? "pos" : months >= 9 ? "acc" : "neg"],
      [T("放大倍数", "Amplification"), isFinite(amp) ? fmtNum(amp, 2) + "x" : "∞", amp <= 1.6 ? "pos" : amp <= 2.5 ? "acc" : "neg"],
    ].map(([k, v, c]) => `<div class="stat"><div class="k">${k}</div><div class="v ${c}">${v}</div></div>`).join("");
    q("#lc-bars").innerHTML = `<div class="demo-label" style="margin-bottom:2px">${T("按层累计资产覆盖（BTC 评级思路；满格 = 8 倍）", "Cumulative asset coverage by layer (the BTC Rating idea; full bar = 8x)")}</div>` + bars(cov, 8);

    const lines = [];
    lines.push(`${tex(String.raw`\text{${T("年度固定支出", "annual fixed payments")}} = \text{${T("优先股", "preferred")}}\ ${texv(fmtNum(150 + bt.newPref, 0))} \times 10\% = \mathbf{${texv(fmtNum(annual, 1))}}`)}${T("（可转债 0% 票息）；", " (converts pay 0%); ")}${tex(String.raw`\mathrm{EBIT} \approx 0`)}${T("，所以利息/固定费用覆盖的分子是零——现金流尺子在这里失灵。", ", so the numerator of interest/fixed-charge cover is zero — the cash-flow rulers break down here.")}`);
    cov.forEach((c) => {
      const fallTo = (c.cum * 1e6) / 10000;
      lines.push(`${c.name}：${T("累计", "cumulative")} ${fmtNum(c.cum, 0)} → ${tex(String.raw`\dfrac{${texv(fmtNum(nav, 0))}}{${texv(fmtNum(c.cum, 0))}} = ${texv(fmtNum(c.coverage, 2))}\times`)} ⇒ ${T("比特币可跌 ", "bitcoin can fall ")}${tex(String.raw`1 - \dfrac{1}{${texv(fmtNum(c.coverage, 2))}} \approx ${texv(fmtPct(Math.max(0, 1 - 1 / c.coverage), 0))}`)}${T("（到约 ", " (to about ")}${fmtUsd(fallTo)}${T("，未计现金）", ", ignoring cash)")}`);
    });
    lines.push(`${tex(String.raw`\text{${T("储备覆盖", "reserve coverage")}} = \dfrac{${texv(fmtNum(bt.reserve, 0))}}{${texv(fmtNum(annual, 1))}} \times 12 = \mathbf{${texv(fmtNum(months, 1))}}\ \textbf{${T("个月", "months")}}`)}${T("：不融资、不卖币能撑多久。", ": how long it lasts without raising money or selling bitcoin.")} ${pill(months >= 12, months >= 12 ? T("≥ 12 个月", "≥ 12 months") : T("不足一年", "under a year"))}`);
    if (bt.newPref > 0) lines.push(`<span class="warn">${T("新增优先股带来更多比特币（若募资买币）——但本演示只看负债端：它加厚了楼层、稀释了劣后层的覆盖，也缩短了储备月数。阶段 16.7 会把“买到的币”一起算进来。", "New preferred would buy more bitcoin if the proceeds were invested — but this demo looks only at the claims side: it adds floors, dilutes the junior layers' coverage and shortens the reserve months. Stage 16.7 adds the bitcoin bought back into the math.")}</span>`);
    q("#lc-log").innerHTML = lines.map((l) => `<div>${l}</div>`).join("");
  };

  const paint = () => (mode === "cf" ? paintCF() : paintBT());

  root.querySelectorAll("#lc-seg button").forEach((b) => b.addEventListener("click", () => {
    mode = b.dataset.m;
    root.querySelectorAll("#lc-seg button").forEach((o) => o.classList.toggle("on", o === b));
    buildCtrl();
    paint();
  }));
  buildCtrl();
  paint();
}
