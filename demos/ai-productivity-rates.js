// 交互演示：AI 与中性利率 r∗ 的拔河。用拉姆齐式 r∗ ≈ ρ + θ·g 加上“投资需求”与“储蓄过剩”两个楔子，
// 再叠加通胀预期与期限溢价得到 30 年期收益率；计算 5% 票息 30 年期国债价格、10% 永续优先股价格、
// 戈登模型下股票的“每 1 美元股息的价格”，以及 r − g 的债务动态信号。计算走 _fin.js。
import { bondPrice, bondRisk, perpetuity, gordon, fmtPct, fmtNum, clamp, tex } from "./_fin.js";
import { lineChart, chartBlock } from "./_chart.js";

const texv = (s) => String(s).replace(/\$/g, "\\$").replace(/,/g, "{,}").replace(/%/g, "\\%");
const pv = (x, d = 2) => texv(fmtPct(x / 100, d)); // 百分数 → LaTeX
const pvp = (x, d = 2) => (x < 0 ? `(${pv(x, d)})` : pv(x, d)); // 负数加括号
const RS = tex(String.raw`r^{*}`);

export default function mount(root, lang) {
  const en = lang === "en";
  const T = (zh, e) => (en ? e : zh);

  // 数值单位：百分数
  const PRESETS = {
    stag: { g: 1.5, rho: 1.0, th: 1.0, sav: 2.0, inv: 0.0, pi: 2.0, tp: 0.0, k: 1.0, name: T("2010 年代：长期停滞", "2010s: secular stagnation") },
    build: { g: 2.0, rho: 1.0, th: 1.0, sav: 1.5, inv: 1.0, pi: 2.5, tp: 0.5, k: 1.0, name: T("AI 建设期（接近 2026 年秋）", "AI build-out (close to autumn 2026)") },
    deliver: { g: 3.0, rho: 1.0, th: 1.0, sav: 1.5, inv: 1.0, pi: 2.3, tp: 0.6, k: 1.0, name: T("AI 兑现：增长真的来了", "AI delivers: growth arrives") },
    fizzle: { g: 1.5, rho: 1.0, th: 1.0, sav: 1.5, inv: 1.0, pi: 2.5, tp: 1.0, k: 0.3, name: T("只借不长：利率升、盈利没跟上", "All borrowing, no growth") },
    glut: { g: 2.5, rho: 1.0, th: 1.0, sav: 3.0, inv: 0.0, pi: 1.0, tp: 0.0, k: 1.0, name: T("建成后：储蓄集中 + 廉价智能通缩", "After the build: saving glut + cheap-AI deflation") },
  };
  const ERP = 3.0; // 股票风险溢价（固定，百分数）
  const PREF_SPREAD = 5.0; // 10% 优先股在 5% 国债下的利差
  const BASE = PRESETS.stag;

  const sl = (id, zh, e, min, max, step) =>
    `<div><label class="demo-label">${T(zh, e)}${T("：", ": ")}<b id="apr-${id}-v"></b></label><input class="demo-slider" type="range" id="apr-${id}" min="${min}" max="${max}" step="${step}"></div>`;

  root.innerHTML = `
    <div class="demo">
      <div class="demo-head">${T(`🪢 AI 与中性利率的拔河：从 ${RS} 到 30 年期收益率，再到你手里的资产`, `🪢 The AI tug-of-war: from ${RS} to the 30-year yield to the assets you hold`)}</div>
      <div class="demo-btns" id="apr-presets">
        ${Object.keys(PRESETS).map((k) => `<button class="demo-btn" data-k="${k}">${PRESETS[k].name}</button>`).join("")}
      </div>
      <div class="demo-block">
        <div class="demo-label">${T(`① ${RS} 的零件（拉姆齐：${tex(String.raw`r^{*} \approx \rho + \theta \times g`)}，再加减两个楔子）`, `① Parts of ${RS} (Ramsey: ${tex(String.raw`r^{*} \approx \rho + \theta \times g`)}, plus two wedges)`)}</div>
        <div class="demo-grid">
          ${sl("g", "趋势增长 g（AI 生产率）", "Trend growth g (AI productivity)", 0.5, 4, 0.1)}
          ${sl("th", "θ（多在意平滑消费）", "θ (desire to smooth consumption)", 0.5, 2, 0.1)}
          ${sl("rho", "时间偏好 ρ", "Time preference ρ", 0, 2, 0.1)}
          ${sl("inv", "AI 投资需求楔子（往上拉）", "AI investment-demand wedge (pulls up)", 0, 2, 0.1)}
          ${sl("sav", "储蓄过剩楔子（往下拽）", "Saving-glut wedge (pulls down)", 0, 4, 0.1)}
        </div>
      </div>
      <div class="demo-block">
        <div class="demo-label">${T("② 从实际利率到名义长债收益率", "② From the real rate to the nominal long yield")}</div>
        <div class="demo-grid">
          ${sl("pi", "预期通胀（AI 廉价智能会压低它）", "Expected inflation (cheap AI pushes it down)", 0, 5, 0.1)}
          ${sl("tp", "30 年期期限溢价", "30-year term premium", -1, 2, 0.05)}
          ${sl("k", "盈利增长跟上 g 的程度", "How far earnings growth keeps up with g", 0, 1.5, 0.05)}
        </div>
      </div>
      <div class="stat-row">
        <div class="stat"><div class="k">${T(`中性利率 ${RS}（实际）`, `Neutral rate ${RS} (real)`)}</div><div class="v acc" id="apr-rstar"></div></div>
        <div class="stat"><div class="k">${T("30 年期名义收益率", "30-year nominal yield")}</div><div class="v" id="apr-y30"></div></div>
        <div class="stat"><div class="k">${T("5% 票息 30 年国债价格", "5%-coupon 30y bond price")}</div><div class="v" id="apr-bond"></div></div>
        <div class="stat"><div class="k">${T("修正久期", "Modified duration")}</div><div class="v" id="apr-dur"></div></div>
      </div>
      <div class="stat-row">
        <div class="stat"><div class="k">${T("10 美元股息永续优先股", "Perpetual preferred, $10 dividend")}</div><div class="v" id="apr-pref"></div></div>
        <div class="stat"><div class="k">${T("股票：每 1 美元股息的价格", "Stock: price per $1 of dividend")}</div><div class="v" id="apr-stock"></div></div>
        <div class="stat"><div class="k">${T("相对 2010 年代基准", "vs the 2010s baseline")}</div><div class="v" id="apr-stockchg"></div></div>
        <div class="stat"><div class="k">${T("债务动态", "Debt dynamics")} ${tex("r - g")}</div><div class="v" id="apr-rg"></div></div>
      </div>
      <div id="apr-chart"></div>
      <div class="demo-log" id="apr-log" style="margin-top:12px"></div>
      <p class="demo-tip">${T(
        `先点“2010 年代”，再点“AI 建设期”：${RS} 与 30 年期收益率一起上升，长债和永续优先股应声下跌。接着对比“AI 兑现”和“只借不长”——<strong>“只借不长”的利率反而更低，股票却更便宜</strong>，差别只在盈利增长有没有跟上。最后试“建成后”：储蓄过剩和廉价智能把利率又拉回来。`,
        `Click “2010s”, then “AI build-out”: ${RS} and the 30-year yield rise together,and long bonds and perpetual preferreds fall. Then compare “AI delivers” with “All borrowing, no growth” — <strong>“All borrowing” has the lower yield yet the cheaper stocks</strong>, and the only difference is whether earnings growth keeps up. Finally try “After the build”: the saving glut and cheap intelligence pull rates back down.`
      )}</p>
    </div>`;

  const $ = (s) => root.querySelector(s);
  const ids = ["g", "th", "rho", "inv", "sav", "pi", "tp", "k"];
  const read = () => {
    const o = {};
    ids.forEach((id) => (o[id] = +$("#apr-" + id).value));
    return o;
  };
  const rstarOf = (p, g) => p.rho + p.th * g - p.sav + p.inv; // 百分数
  const y30Of = (p, g) => rstarOf(p, g) + p.pi + p.tp;
  const stockMult = (p) => {
    const y = y30Of(p, p.g) / 100, re = y + ERP / 100, gd = (p.pi + p.k * p.g) / 100;
    return re > gd + 0.005 ? gordon(1, re, gd) : Infinity;
  };
  const baseMult = stockMult(BASE);

  const paint = () => {
    const p = read();
    ids.forEach((id) => ($("#apr-" + id + "-v").textContent = id === "th" || id === "k" ? fmtNum(p[id], 2) : fmtPct(p[id] / 100, id === "tp" ? 2 : 1)));
    const rs = rstarOf(p, p.g), y30 = y30Of(p, p.g);
    const yDec = clamp(y30 / 100, -0.009, 0.3);
    const price = bondPrice(100, 0.05, yDec, 30);
    const risk = bondRisk(100, 0.05, yDec, 30);
    const prefY = yDec + PREF_SPREAD / 100;
    const pref = prefY > 0 ? perpetuity(10, prefY) : Infinity;
    const mult = stockMult(p);
    const nomGrowth = p.g + p.pi + 0.5; // 名义 GDP 增速 ≈ 生产率 + 通胀 + 约 0.5% 劳动力增长（示意）
    const rg = y30 - 0.8 - nomGrowth; // 平均债务利率 ≈ 长端收益率 − 约 0.8（期限结构折让，示意）

    $("#apr-rstar").textContent = fmtPct(rs / 100, 2);
    $("#apr-y30").textContent = fmtPct(y30 / 100, 2);
    const b = $("#apr-bond");
    b.textContent = fmtNum(price, 1) + T("（", " (") + (price >= 100 ? "+" : "") + fmtPct(price / 100 - 1, 1) + T("）", ")");
    b.classList.toggle("pos", price > 100.05); b.classList.toggle("neg", price < 99.95);
    $("#apr-dur").textContent = fmtNum(risk.modified, 1) + T(" 年", " yrs");
    const pr = $("#apr-pref");
    pr.textContent = isFinite(pref) ? "$" + fmtNum(pref, 1) + T("（收益率 ", " (yield ") + fmtPct(prefY, 1) + T("）", ")") : "–";
    pr.classList.toggle("pos", pref > 100.05); pr.classList.toggle("neg", pref < 99.95);
    const st = $("#apr-stock");
    st.innerHTML = isFinite(mult) ? "$" + fmtNum(mult, 1) : tex(String.raw`r \le g`) + T("：模型失效", ": model breaks");
    const chg = isFinite(mult) && isFinite(baseMult) ? mult / baseMult - 1 : NaN;
    const sc = $("#apr-stockchg");
    sc.textContent = isFinite(chg) ? (chg >= 0 ? "+" : "") + fmtPct(chg, 0) : "–";
    sc.classList.toggle("pos", chg > 0.005); sc.classList.toggle("neg", chg < -0.005);
    const rgEl = $("#apr-rg");
    rgEl.textContent = (rg >= 0 ? "+" : "") + fmtPct(rg / 100, 1);
    rgEl.classList.toggle("neg", rg > 0); rgEl.classList.toggle("pos", rg <= 0);

    const res = lineChart({
      fns: [
        { f: (g) => rstarOf(p, g), cls: "line" },
        { f: (g) => y30Of(p, g), cls: "line3" },
        { f: (g) => p.pi + p.k * g, cls: "line4" },
      ],
      lo: 0.5, hi: 4, xlabel: T("趋势增长 g（%）", "trend growth g (%)"), markerX: p.g, markerLabel: T("当前 g", "current g"), forceZero: true, uid: "apr",
    });
    $("#apr-chart").innerHTML = chartBlock(res, [
      ["var(--orange)", tex(String.raw`r^{*}`) + T("（实际，%）", " (real, %)")],
      ["var(--red)", T("30 年期名义收益率（%）", "30-year nominal yield (%)")],
      ["var(--green)", T("股息名义增速（%）", "Nominal dividend growth (%)")],
    ]);

    const L = [];
    const up = p.th * p.g + p.inv, down = p.sav;
    L.push(`${T("拔河：往上拉", "Tug-of-war: pulling up")} ${tex(String.raw`\rho + \theta \times g + \text{${T("投资", "investment")}} = \mathbf{${pv(p.rho + up)}}`)}${T("，往下拽（储蓄过剩）", "; pulling down (saving glut)")} ${tex(String.raw`\mathbf{${pv(down)}}`)} → ${tex(String.raw`r^{*} = ${pv(p.rho + up)} - ${pv(down)} = \mathbf{${pv(rs)}}`)}${T("。", ".")}`);
    L.push(`${tex(String.raw`\text{${T("30 年期收益率", "30-year yield")}} = \underbrace{${pvp(rs)}}_{r^{*}} + \underbrace{${pvp(p.pi, 1)}}_{\text{${T("通胀预期", "inflation exp.")}}} + \underbrace{${pvp(p.tp)}}_{\text{${T("期限溢价", "term premium")}}} = \mathbf{${pv(y30)}}`)}${T("。", ".")}`);
    if (y30 > 5.0) L.push(`<span class="warn">${T("长端收益率在 5% 以上——小林第一条新闻的世界。票息 5% 的 30 年期国债低于面值交易，永续优先股的价格跟着受压。", "The long yield is above 5% — the world of Lin's first headline. The 5% 30-year trades below par and perpetual preferreds are squeezed.")}</span>`);
    if (isFinite(mult)) {
      const re = y30 / 100 + ERP / 100, gd = (p.pi + p.k * p.g) / 100;
      L.push(`${T("股票：要求回报", "Stocks: required return")} ${tex(String.raw`r = \text{${T("长端收益率", "long yield")}} + 3\%\ \text{${T("风险溢价", "ERP")}} = ${pv(re * 100)}`)}${T("，股息增长", "; dividend growth")} ${tex(String.raw`g = ${pv(gd * 100)}`)}${T("，", "; ")}${tex(String.raw`r - g = \mathbf{${pv((re - gd) * 100)}}`)}${T("。", ".")}${p.k < 0.6 ? `<span class="bad">${T("盈利没跟上增长预期——利率涨了、g 没涨，估值被两头夹击。", "Earnings didn't keep up — rates rose but g didn't, so valuations get squeezed from both sides.")}</span>` : `<span class="ok">${T("盈利跟上了：r 和 g 一起升，股票可以扛住更高的利率。", "Earnings kept up: r and g rise together, so stocks can absorb higher rates.")}</span>`}`);
    } else {
      L.push(`<span class="warn">${T("股息增速接近或超过要求回报，戈登公式不再适用——这通常意味着市场的增长假设过于乐观。", "Dividend growth is at or above the required return, so the Gordon formula breaks — usually a sign the growth assumption is too optimistic.")}</span>`);
    }
    L.push(rg > 0
      ? `<span class="bad">${T(`债务动态：平均债务利率高于名义增长（${tex("r - g > 0")}），在不改变赤字的情况下，债务占 GDP 会继续上升（阶段 9.4 的逻辑，示意）。`, `Debt dynamics: the average rate on debt exceeds nominal growth (${tex("r - g > 0")}), so with unchanged deficits debt-to-GDP keeps rising (the Stage 9.4 logic, illustrative).`)}</span>`
      : `<span class="ok">${T(`债务动态：名义增长高于平均债务利率（${tex(String.raw`r - g \le 0`)}），增长在帮忙稀释债务负担（示意）。`, `Debt dynamics: nominal growth exceeds the average rate on debt (${tex(String.raw`r - g \le 0`)}), so growth helps dilute the debt burden (illustrative).`)}</span>`);
    $("#apr-log").innerHTML = L.map((l) => `<div>${l}</div>`).join("");
  };

  const load = (key) => {
    const p = PRESETS[key];
    ids.forEach((id) => ($("#apr-" + id).value = p[id]));
    root.querySelectorAll("#apr-presets button").forEach((b) => b.classList.toggle("active", b.dataset.k === key));
    paint();
  };
  root.querySelectorAll("#apr-presets button").forEach((b) => b.addEventListener("click", () => load(b.dataset.k)));
  ids.forEach((id) => $("#apr-" + id).addEventListener("input", () => {
    root.querySelectorAll("#apr-presets button").forEach((b) => b.classList.remove("active"));
    paint();
  }));
  load("build");
}
