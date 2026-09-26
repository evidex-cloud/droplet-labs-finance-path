// 交互演示：当智能变便宜，什么变贵。
// A. 通胀篮子：AI 可渗透服务（价格下降）、建设期瓶颈（电力、芯片等，价格上涨）与其余部分的加权通胀；价格指数路径与固定名义债务的实际负担。
// B. 劳动与资本：生产率增量 g 中劳动分到的比例 λ → 实际工资增速与劳动收入份额路径（示意）。
// C. 稀缺地图：同一股“储值需求”增速，落在供给增速不同的资产上，价格变化 ≈ (1 + 需求) ÷ (1 + 供给) − 1（玩具模型）。
// 计算走 _fin.js（fv / pv / realRate / fmtPct / clamp）。
import { fv, pv, realRate, fmtPct, fmtNum, clamp, tex } from "./_fin.js";
import { lineChart, chartBlock } from "./_chart.js";

const texv = (s) => String(s).replace(/\$/g, "\\$").replace(/,/g, "{,}").replace(/%/g, "\\%");
const P = (x, d) => texv(fmtPct(x, d)); // 小数 → LaTeX 百分数
const Pp = (x, d) => (x < 0 ? `(${P(x, d)})` : P(x, d)); // 负数加括号
const Ps = (x, d) => (x > 0 ? "+" : "") + P(x, d); // 带正号

export default function mount(root, lang) {
  const en = lang === "en";
  const T = (zh, e) => (en ? e : zh);
  const BTC_SUPPLY_GROWTH = (3.125 * 52560) / 20.09e6; // 2024 减半后的年供给增速（约 0.82%）
  const L0 = 0.6; // 起始劳动份额（示意）

  const PRESETS = {
    build: { w: 20, a: -3, b: 10, bi: 8, r: 3, g: 1, lam: 60, d: 5, name: T("建设期：瓶颈通胀为主", "Build-out: bottleneck inflation dominates") },
    good: { w: 35, a: -8, b: 5, bi: 2, r: 2.5, g: 2.5, lam: 80, d: 8, name: T("AI 兑现：好通缩、工资跟上", "AI delivers: good deflation, wages keep up") },
    split: { w: 35, a: -8, b: 5, bi: 2, r: 2.5, g: 2.5, lam: 30, d: 15, name: T("AI 兑现，但收益流向资本", "AI delivers, but gains go to capital") },
    bust: { w: 15, a: -2, b: 5, bi: -5, r: 1.5, g: 0.3, lam: 50, d: -25, name: T("泡沫破裂：需求退潮", "Bubble bursts: demand ebbs") },
  };

  const sl = (id, zh, e, min, max, step) =>
    `<div><label class="demo-label">${T(zh, e)}${T("：", ": ")}<b id="ads-${id}-v"></b></label><input class="demo-slider" type="range" id="ads-${id}" min="${min}" max="${max}" step="${step}"></div>`;

  root.innerHTML = `
    <div class="demo">
      <div class="demo-head">${T("⚖️ 智能变便宜之后：通胀、工资与稀缺", "⚖️ After intelligence gets cheap: inflation, wages and scarcity")}</div>
      <div class="demo-btns" id="ads-presets">
        ${Object.keys(PRESETS).map((k) => `<button class="demo-btn" data-k="${k}">${PRESETS[k].name}</button>`).join("")}
      </div>
      <div class="demo-block">
        <div class="demo-label">${T("A. 通胀篮子（阶段 1.4 的思路）", "A. The inflation basket (the Stage 1.4 logic)")}</div>
        <div class="demo-grid">
          ${sl("w", "AI 可渗透服务占篮子", "AI-exposed services, share of basket", 0, 60, 1)}
          ${sl("a", "这些服务的年价格变化", "Their annual price change", -20, 2, 0.5)}
          ${sl("b", "建设期瓶颈（电力、芯片）占篮子", "Build-out bottlenecks (power, chips), share", 0, 20, 1)}
          ${sl("bi", "瓶颈的年价格变化", "Bottleneck annual price change", -10, 15, 0.5)}
          ${sl("r", "其余部分的年通胀", "Rest of basket, annual inflation", 0, 6, 0.1)}
        </div>
        <div class="stat-row">
          <div class="stat"><div class="k">${T("总体年通胀", "Overall annual inflation")}</div><div class="v acc" id="ads-pi"></div></div>
          <div class="stat"><div class="k">${T("10 年后物价指数", "Price index after 10 yrs")}</div><div class="v" id="ads-idx"></div></div>
          <div class="stat"><div class="k">${T("100 美元固定债务的实际负担（10 年后）", "Real burden of $100 fixed debt (10 yrs)")}</div><div class="v" id="ads-debt"></div></div>
        </div>
        <div id="ads-chart"></div>
      </div>
      <div class="demo-block">
        <div class="demo-label">${T("B. 蛋糕怎么分", "B. How the pie is divided")}</div>
        <div class="demo-grid">
          ${sl("g", "AI 带来的额外生产率增速 g", "Extra productivity growth from AI, g", 0, 4, 0.1)}
          ${sl("lam", "劳动分到的比例 λ", "Labor's share of the gain, λ", 0, 100, 5)}
        </div>
        <div class="stat-row">
          <div class="stat"><div class="k">${T("名义工资增速", "Nominal wage growth")}</div><div class="v" id="ads-nw"></div></div>
          <div class="stat"><div class="k">${T("实际工资增速（费雪）", "Real wage growth (Fisher)")}</div><div class="v" id="ads-rw"></div></div>
          <div class="stat"><div class="k">${T("10 年后劳动份额", "Labor share after 10 yrs")}</div><div class="v" id="ads-ls"></div></div>
        </div>
      </div>
      <div class="demo-block">
        <div class="demo-label">${T("C. 稀缺地图：同样的储值需求，落在不同供给弹性的资产上", "C. Scarcity map: the same store-of-value demand, landing on assets with different supply growth")}</div>
        <div class="demo-label" style="margin-top:6px">${tex(String.raw`\text{${T("价格年变化", "annual price change")}} \approx \dfrac{1 + \text{${T("需求增速", "demand growth")}}}{1 + \text{${T("供给增速", "supply growth")}}} - 1`)}</div>
        <div class="demo-grid">${sl("d", "对“储值资产”的需求年增速", "Annual growth in demand for stores of value", -30, 30, 1)}</div>
        <div id="ads-scar" style="margin-top:8px"></div>
      </div>
      <div class="demo-log" id="ads-log" style="margin-top:12px"></div>
      <p class="demo-tip">${T(
        "先点“建设期”：AI 服务在降价，瓶颈却在涨价，总体通胀并没下来。切到“AI 兑现”：总体通胀被拉低，固定债务的实际负担<strong>反而变重</strong>。再对比两种“兑现”：通胀一样，劳动份额的去向完全不同。最后把 C 的需求拖成负数——<strong>供给固定的资产跌得最狠</strong>：稀缺只放大需求，不保证上涨。",
        "Start with “Build-out”: AI services get cheaper but bottlenecks get dearer, so overall inflation doesn't fall. Switch to “AI delivers”: overall inflation drops, and the real burden of fixed debt <strong>gets heavier</strong>. Compare the two “delivers” presets: same inflation, very different paths for labor's share. Finally drag the demand in C below zero — <strong>fixed-supply assets fall hardest</strong>: scarcity amplifies demand, it doesn't guarantee gains."
      )}</p>
    </div>`;

  const $ = (s) => root.querySelector(s);
  const ids = ["w", "a", "b", "bi", "r", "g", "lam", "d"];
  const N = 10;

  const paint = () => {
    const p = {};
    ids.forEach((id) => (p[id] = +$("#ads-" + id).value));
    if (p.w + p.b > 90) { p.b = 90 - p.w; $("#ads-b").value = p.b; }
    const sgn = (x, d) => (x > 0 ? "+" : "") + fmtPct(x, d);
    $("#ads-w-v").textContent = p.w + "%"; $("#ads-a-v").textContent = sgn(p.a / 100, 1);
    $("#ads-b-v").textContent = p.b + "%"; $("#ads-bi-v").textContent = sgn(p.bi / 100, 1);
    $("#ads-r-v").textContent = fmtPct(p.r / 100, 1); $("#ads-g-v").textContent = fmtPct(p.g / 100, 1);
    $("#ads-lam-v").textContent = fmtNum(p.lam / 100, 2); $("#ads-d-v").textContent = sgn(p.d / 100, 0);

    // A. 篮子
    const w = p.w / 100, b = p.b / 100, rest = 1 - w - b;
    const pi = w * p.a / 100 + b * p.bi / 100 + rest * p.r / 100;
    const idx = fv(100, pi, N);
    const burden = pv(100, pi, N); // 以今天购买力计：通胀为负时 > 100
    $("#ads-pi").textContent = sgn(pi, 2);
    $("#ads-idx").textContent = fmtNum(idx, 1);
    const dEl = $("#ads-debt");
    dEl.textContent = fmtNum(burden, 1);
    dEl.classList.toggle("neg", burden > 100.05); dEl.classList.toggle("pos", burden < 99.95);
    const res = lineChart({
      fns: [
        { f: (t) => fv(100, p.a / 100, t), cls: "line2" },
        { f: (t) => fv(100, p.bi / 100, t), cls: "line5" },
        { f: (t) => fv(100, p.r / 100, t), cls: "line4" },
        { f: (t) => fv(100, pi, t), cls: "line" },
      ],
      lo: 0, hi: N, xlabel: T("年", "years"), uid: "ads",
    });
    $("#ads-chart").innerHTML = chartBlock(res, [
      ["var(--blue)", T("AI 可渗透服务", "AI-exposed services")],
      ["var(--btc)", T("建设期瓶颈", "Build-out bottlenecks")],
      ["var(--green)", T("其余部分", "Rest of basket")],
      ["var(--orange)", T("总体物价指数", "Overall price index")],
    ]);

    // B. 劳动
    const g = p.g / 100, lam = p.lam / 100;
    const nomWage = pi + lam * g + 0.01; // 另加约 1% 的基准实际工资增长（示意）
    const realWage = realRate(nomWage, pi);
    const share = L0 * Math.pow((1 + lam * g) / (1 + g), N);
    $("#ads-nw").textContent = sgn(nomWage, 2);
    const rw = $("#ads-rw"); rw.textContent = sgn(realWage, 2); rw.classList.toggle("pos", realWage > 0); rw.classList.toggle("neg", realWage < 0);
    const ls = $("#ads-ls"); ls.textContent = fmtPct(share, 1); ls.classList.toggle("neg", share < L0 - 0.005); ls.classList.toggle("pos", share > L0 + 0.005);

    // C. 稀缺
    const D = p.d / 100;
    const assets = [
      [T("比特币（现在）", "Bitcoin (now)"), BTC_SUPPLY_GROWTH, "var(--btc)"],
      [T("比特币（2028 减半后）", "Bitcoin (after 2028 halving)"), BTC_SUPPLY_GROWTH / 2, "var(--btc)"],
      [T("核心地段土地（示意 0.5%）", "Prime land (illustrative 0.5%)"), 0.005, "var(--orange)"],
      [T("黄金（示意 1.5%）", "Gold (illustrative 1.5%)"), 0.015, "var(--orange)"],
      [T("算力容量（示意 40%）", "Compute capacity (illustrative 40%)"), 0.4, "var(--blue)"],
    ];
    const maxAbs = 0.35;
    $("#ads-scar").innerHTML = assets.map(([lab, s, col]) => {
      const chg = (1 + D) / (1 + s) - 1;
      const wpct = clamp(Math.abs(chg) / maxAbs * 50, 0, 50);
      const left = chg >= 0 ? 50 : 50 - wpct;
      return `<div class="stage-bar"><span class="lab" style="width:190px">${lab}${T("：供给 +", ": supply +")}${fmtPct(s, s < 0.01 ? 2 : 1)}</span><div class="track" style="position:relative"><div style="position:absolute;left:50%;top:0;bottom:0;width:1px;background:var(--line)"></div><div class="fill" style="position:absolute;left:${left}%;width:${wpct}%;background:${chg >= 0 ? col : "var(--red)"}"></div></div><span class="val" style="width:80px">${sgn(chg, 1)}</span></div>`;
    }).join("");

    const L = [];
    L.push(`${tex(String.raw`\text{${T("总体通胀", "Overall inflation")}} = ${P(w, 0)} \times ${Pp(p.a / 100, 1)} + ${P(b, 0)} \times ${Pp(p.bi / 100, 1)} + ${P(rest, 0)} \times ${P(p.r / 100, 1)} = \mathbf{${Ps(pi, 2)}}`)}${T("。", ".")}`);
    if (b * p.bi > Math.abs(w * p.a)) L.push(`<span class="warn">${T("瓶颈涨价对总体通胀的贡献，超过了 AI 服务降价的拉低作用——这是建设期的典型形态。", "Bottleneck inflation adds more to the total than cheaper AI services subtract — the typical build-out pattern.")}</span>`);
    if (pi < 0) L.push(`<span class="bad">${T("物价下降：100 美元固定债务 10 年后的实际负担变成", "Prices are falling: the real burden of $100 of fixed debt becomes")} ${fmtNum(burden, 1)}${T("。即便是“好通缩”，也会加重债务人的负担——对一个债务超过 40 万亿美元的国家尤其敏感。", " after 10 years. Even good deflation makes debtors worse off — a sensitive point for a country with over $40 trillion of debt.")}</span>`);
    L.push(`${T("劳动份额 10 年后从", "Labor's share goes from")} ${fmtPct(L0, 0)} ${T("变为", "to")} ${tex(String.raw`${P(L0, 0)} \times \left(\dfrac{1 + ${fmtNum(lam, 2)} \times ${P(g, 1)}}{1 + ${P(g, 1)}}\right)^{10} = \mathbf{${P(share, 1)}}`)}${lam < 0.999 && g > 0 ? T("：多出来的蛋糕更多流向利润——储蓄更集中，中性利率被往下拽（阶段 19.1）。", ": more of the extra pie goes to profits — saving concentrates and the neutral rate gets pulled down (Stage 19.1).") : T("：劳动与资本同步增长。", ": labor and capital grow together.")}`);
    const btcChg = (1 + D) / (1 + BTC_SUPPLY_GROWTH) - 1, compChg = (1 + D) / 1.4 - 1;
    L.push(D >= 0
      ? `${T("需求增长", "With demand growing")} ${sgn(D, 0)}${T("：比特币约", ": bitcoin about")} ${tex(String.raw`\dfrac{1 + ${P(D, 0)}}{1 + ${P(BTC_SUPPLY_GROWTH, 2)}} - 1 \approx ${Ps(btcChg, 1)}`)}${T("，算力约", ", compute about")} ${tex(String.raw`\dfrac{1 + ${P(D, 0)}}{1 + 40\%} - 1 \approx ${Ps(compChg, 1)}`)}${T("——供给越能扩张，价格越被压住。", " — the more supply can expand, the more prices are held down.")}`
      : `<span class="bad">${T("需求下降", "With demand falling")} ${sgn(D, 0)}${T("：供给固定的资产几乎同比例下跌（比特币约", ": fixed-supply assets fall almost one-for-one (bitcoin about")} ${tex(String.raw`\dfrac{1 - ${P(-D, 0)}}{1 + ${P(BTC_SUPPLY_GROWTH, 2)}} - 1 \approx ${Ps(btcChg, 1)}`)}${T("）。稀缺放大的是需求，而不是保证上涨。", "). Scarcity amplifies demand; it doesn't guarantee gains.")}</span>`);
    $("#ads-log").innerHTML = L.map((l) => `<div>${l}</div>`).join("");
  };

  const load = (key) => {
    const p = PRESETS[key];
    ids.forEach((id) => ($("#ads-" + id).value = p[id]));
    root.querySelectorAll("#ads-presets button").forEach((b) => b.classList.toggle("active", b.dataset.k === key));
    paint();
  };
  root.querySelectorAll("#ads-presets button").forEach((b) => b.addEventListener("click", () => load(b.dataset.k)));
  ids.forEach((id) => $("#ads-" + id).addEventListener("input", () => {
    root.querySelectorAll("#ads-presets button").forEach((b) => b.classList.remove("active"));
    paint();
  }));
  load("build");
}
