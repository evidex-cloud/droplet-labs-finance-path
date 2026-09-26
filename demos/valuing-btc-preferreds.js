// 交互演示：比特币支撑优先股的“五把尺子”计算器——收益率、利差、久期、赎回、信用。
// 预设：橙子公司 Orange-F / Orange-D（AUTHORING §0.2）与 STRC（2026-08-21/23 的真实数据，来自 Strategy FWP）。
// 全部计算走 _fin.js：perpetuity / bondRisk / priceChangeApprox / bondYield / btcRiskProb / btcCredit / btcFloorPrice。
import { perpetuity, bondRisk, priceChangeApprox, bondYield, btcRiskProb, btcCredit, btcFloorPrice, fmtPct, fmtNum, fmtUsd, tex } from "./_fin.js";
import { lineChart, chartBlock } from "./_chart.js";

// 把格式化好的数字放进 LaTeX：$ → \$，千分位 , → {,}，% → \%
const texv = (s) => String(s).replace(/\$/g, "\\$").replace(/,/g, "{,}").replace(/%/g, "\\%");

export default function mount(root, lang) {
  const en = lang === "en";
  const T = (zh, e) => (en ? e : zh);

  const PRESETS = {
    of: { rate: 10, price: 100, tsy: 5.49, rating: 4.0, btc: 100000, vol: 40, arr: 10, call: false, callPx: 100, callYrs: 5, floater: false, freq: 4 },
    od: { rate: 10, price: 88, tsy: 5.49, rating: 3.33, btc: 100000, vol: 40, arr: 10, call: false, callPx: 100, callYrs: 5, floater: false, freq: 4 },
    strc: { rate: 12, price: 96.18, tsy: 5.49, rating: 5.74, btc: 77004, vol: 40, arr: 10, call: true, callPx: 101, callYrs: 0.25, floater: false, freq: 24 },
  };
  const st = { preset: "of", shock: 0, ...PRESETS.of };

  const slider = (id, label, min, max, step) =>
    `<label class="demo-label">${label}${T("：", ": ")}<b id="vbp-${id}-v"></b></label>
     <input class="demo-slider" id="vbp-${id}" type="range" min="${min}" max="${max}" step="${step}" />`;

  root.innerHTML = `
    <div class="demo">
      <div class="demo-head">${T("📏 优先股的五把尺子：收益率 · 利差 · 久期 · 赎回 · 信用", "📏 Five rulers for a preferred: yield · spread · duration · call · credit")}</div>
      <div class="demo-block">
        <label class="demo-label">${T("预设", "Preset")}</label>
        <div class="demo-seg" id="vbp-preset">
          <button data-p="of" class="on">${T("Orange-F（10% 累积）", "Orange-F (10% cumulative)")}</button>
          <button data-p="od">${T("Orange-D（10% 非累积）", "Orange-D (10% non-cumulative)")}</button>
          <button data-p="strc">${T("STRC（2026-08-21/23 数据）", "STRC (2026-08-21/23 data)")}</button>
        </div>
      </div>
      <div class="demo-grid">
        <div class="demo-block">
          ${slider("rate", T("股息率（按 100 美元面值）", "Dividend rate (on $100 stated)"), 4, 16, 0.25)}
          ${slider("price", T("市价", "Market price"), 60, 120, 0.01)}
          ${slider("tsy", T("30 年期国债收益率", "30-year Treasury yield"), 3, 7, 0.01)}
          ${slider("shock", T("利率冲击（基点，利差不变）", "Rate shock (bp, spread unchanged)"), -200, 300, 5)}
        </div>
        <div class="demo-block">
          ${slider("rating", T("BTC 评级（倍）", "BTC Rating (x)"), 1, 10, 0.01)}
          ${slider("vol", T("比特币年化波动率", "Bitcoin annual volatility"), 20, 80, 1)}
          ${slider("arr", T("假设比特币年化增长（ARR）", "Assumed bitcoin growth (ARR)"), -10, 25, 1)}
          ${slider("callPx", T("赎回价", "Call price"), 100, 115, 0.5)}
          ${slider("callYrs", T("距可赎回（年）", "Years until callable"), 0.25, 10, 0.25)}
        </div>
      </div>
      <div class="demo-block">
        <div class="demo-btns">
          <button class="demo-btn" id="vbp-call">${T("有赎回权", "Has a call")}</button>
          <button class="demo-btn" id="vbp-float">${T("浮动利率：公司及时调息保持面值", "Variable rate: issuer resets to hold par")}</button>
        </div>
      </div>
      <div class="stat-row" id="vbp-stats"></div>
      <div class="stat-row" id="vbp-stats2"></div>
      <div class="demo-block" id="vbp-chart"></div>
      <div class="demo-block"><div class="demo-log" id="vbp-log"></div></div>
      <p class="demo-tip">${T(
        "先看 Orange-F：把利率冲击拖到 +85 基点（2026 年 2 月底到 9 月下旬 30 年期国债的涨幅），价格从 100 跌到约 92——信用一点没变。再把波动率从 40% 拖到 60%，看 BTC Credit 怎么翻几倍。最后切到 STRC：我们的引擎复算出 Strategy 公布的 59 个基点与 8.1 年久期，而市场利差约 7 个百分点——差距就是分析师要解释的东西。",
        "Start with Orange-F: drag the rate shock to +85 bp (the 30-year Treasury's rise from late February to late September 2026) and the price falls from 100 to about 92 with no change in credit at all. Then drag volatility from 40% to 60% and watch BTC Credit multiply. Finally switch to STRC: the engine reproduces Strategy's published 59 bp and 8.1-year duration, while the market spread is about 7 points. That gap is what an analyst has to explain."
      )}</p>
    </div>`;

  const q = (s) => root.querySelector(s);
  const KEYS = ["rate", "price", "tsy", "shock", "rating", "vol", "arr", "callPx", "callYrs"];

  const syncInputs = () => KEYS.forEach((k) => { q("#vbp-" + k).value = st[k]; });

  const paint = () => {
    const c = st.rate / 100, D = st.rate, P = st.price;
    const y = D / P;                                    // 永续：y = D ÷ P
    const risk = bondRisk(100, c, y, 200, st.freq);     // 200 年近似永续
    const dy = st.shock / 10000;
    const spread = y - st.tsy / 100;

    // 冲击后价格：固定利率 → 精确用永续公式；浮动（及时调息）→ 利率部分被吸收
    let pShock = st.floater ? P : perpetuity(D, y + dy);
    const pApprox = st.floater ? P : P * (1 + priceChangeApprox(risk.modified, risk.convexity, dy));
    if (st.call && pShock > st.callPx) pShock = st.callPx;

    // 赎回收益率（面值换成赎回价，票面率按金额折算）
    const ytc = st.call ? bondYield(P, st.callPx, D / st.callPx, st.callYrs, st.freq === 24 ? 12 : st.freq) : NaN;
    const ytw = st.call ? Math.min(ytc, y) : y;

    // 信用：久期用麦考利久期（Strategy 口径）
    const dur = risk.macaulay;
    const bRisk = btcRiskProb(st.rating, st.arr / 100, st.vol / 100, dur);
    const bCredit = btcCredit(bRisk, dur);
    const floor = btcFloorPrice(st.btc, st.rating);
    const gap = spread - bCredit;

    q("#vbp-rate-v").textContent = fmtPct(c, 2);
    q("#vbp-price-v").textContent = fmtUsd(P, 2);
    q("#vbp-tsy-v").textContent = fmtPct(st.tsy / 100, 2);
    q("#vbp-shock-v").textContent = (st.shock > 0 ? "+" : "") + st.shock + " bp";
    q("#vbp-rating-v").textContent = fmtNum(st.rating, 2) + "x";
    q("#vbp-vol-v").textContent = st.vol + "%";
    q("#vbp-arr-v").textContent = st.arr + "%";
    q("#vbp-callPx-v").textContent = fmtUsd(st.callPx, 2);
    q("#vbp-callYrs-v").textContent = fmtNum(st.callYrs, 2);
    q("#vbp-call").classList.toggle("active", st.call);
    q("#vbp-float").classList.toggle("active", st.floater);

    const chg = pShock / P - 1;
    q("#vbp-stats").innerHTML = `
      <div class="stat"><div class="k">${T("当期收益率", "Current yield")}</div><div class="v">${fmtPct(y, 2)}</div></div>
      <div class="stat"><div class="k">${T("对 30 年国债利差", "Spread over 30y")}</div><div class="v acc">${fmtPct(spread, 2)}</div></div>
      <div class="stat"><div class="k">${T("修正久期 / 麦考利", "Modified / Macaulay")}</div><div class="v">${st.floater ? "≈ 0" : fmtNum(risk.modified, 1)} / ${fmtNum(dur, 1)}</div></div>
      <div class="stat"><div class="k">${T("冲击后价格", "Price after shock")}</div><div class="v ${chg >= 0 ? "pos" : "neg"}">${fmtUsd(pShock, 2)} (${chg >= 0 ? "+" : ""}${fmtPct(chg, 1)})</div></div>
      <div class="stat"><div class="k">${T("最差收益率", "Yield to worst")}</div><div class="v">${fmtPct(ytw, 2)}</div></div>`;
    q("#vbp-stats2").innerHTML = `
      <div class="stat"><div class="k">${T("BTC 地板价", "BTC Floor Price")}</div><div class="v">${fmtUsd(floor, 0)}</div></div>
      <div class="stat"><div class="k">BTC Risk</div><div class="v neg">${fmtPct(bRisk, 2)}</div></div>
      <div class="stat"><div class="k">BTC Credit</div><div class="v">${fmtNum(bCredit * 10000, 0)} bp</div></div>
      <div class="stat"><div class="k">${T("市场利差 − 模型", "Market spread − model")}</div><div class="v acc">${fmtNum(gap * 10000, 0)} bp</div></div>`;

    const cap = st.call ? st.callPx : null;
    const res = lineChart({
      fns: [
        { f: (yy) => D / (yy / 100), cls: "line" },
        ...(cap ? [{ f: () => cap, cls: "line3" }] : []),
        { f: () => 100, cls: "line2" },
      ],
      lo: 4, hi: 20, xlabel: T("要求收益率（%）", "Required yield (%)"), markerX: y * 100, markerLabel: T("当前", "now"), uid: "vbp",
    });
    const legend = [["var(--orange)", tex(String.raw`\text{${T("价格", "price")}} = \dfrac{\text{${T("股息", "dividend")}}}{\text{${T("收益率", "yield")}}}`)],["var(--blue)", T("面值 100 美元", "$100 stated amount")]];
    if (cap) legend.splice(1, 0, ["var(--red)", T("赎回价（封顶）", "call price (cap)")]);
    q("#vbp-chart").innerHTML = `<div class="demo-label">${T("永续优先股的价格—收益率曲线", "Price–yield curve of a perpetual preferred")}</div>` + chartBlock(res, legend);

    const lines = [];
    lines.push(`${T("当期收益率：", "Current yield: ")}${tex(String.raw`y = \dfrac{D}{P} = \dfrac{${texv(fmtNum(D, 2))}}{${texv(fmtNum(P, 2))}} = ${texv(fmtPct(y, 2))}`)}${st.floater ? "" : T("；冲击后：", "; after the shock: ")}${st.floater ? "" : tex(String.raw`P' = \dfrac{D}{y + \Delta y} = \dfrac{${texv(fmtNum(D, 2))}}{${texv(fmtPct(y + dy, 2))}} = ${texv(fmtUsd(perpetuity(D, y + dy), 2))}`)}${T("。", ".")}`);
    lines.push(`${tex(String.raw`\text{${T("BTC 地板价", "BTC Floor Price")}} = \dfrac{${texv(fmtUsd(st.btc, 0))}}{${texv(fmtNum(st.rating, 2))}} = ${texv(fmtUsd(floor, 0))}`)}${T("；", "; ")}${tex(String.raw`\text{BTC Credit} = \dfrac{-\ln(1 - ${texv(fmtPct(bRisk, 2))})}{${texv(fmtNum(dur, 1))}} = ${texv(fmtNum(bCredit * 10000, 0))}\ \text{bp}`)}${T("。", ".")}`);
    lines.push(`${T("收益率冲击", "A shock of")} ${st.shock > 0 ? "+" : ""}${st.shock} bp${T("：精确价格", ": exact price")} ${fmtUsd(pShock, 2)}${T("，久期+凸性近似", ", duration-plus-convexity estimate")} ${fmtUsd(pApprox, 2)}${T("。", ".")}`);
    if (st.floater) lines.push(`<span class="warn">${T("浮动模式假设公司每月及时调息把价格拉回面值——这是管理层的选择，不是合约义务；Strategy 2026-06-29 的政策说不会仅因低于面值而加息。", "Variable mode assumes the issuer resets monthly to pull the price back to par. That is a management choice, not a contractual duty; Strategy's 2026-06-29 policy says it will not raise the rate merely because the price is below par.")}</span>`);
    if (st.call && ytc < y) lines.push(`<span class="warn">${T("价格高于赎回价：赎回收益率", "Price is above the call: yield to call")} ${fmtPct(ytc, 2)} ${T("低于当期收益率", "is below current yield")} ${fmtPct(y, 2)}${T("，按最差收益率比较。", "; compare on yield to worst.")}</span>`);
    if (bCredit * 10000 < 150) lines.push(`<span class="ok">${T("模型认为覆盖很厚：地板价", "The model sees thick coverage: floor price")} ${fmtUsd(floor, 0)}${T("，要跌", ", a fall of")} ${fmtPct(1 - 1 / st.rating, 0)} ${T("才触及 1 倍。", "to reach 1x.")}</span>`);
    else if (bCredit * 10000 < 500) lines.push(`<span class="warn">${T("模型要求的信用利差已经不小，覆盖在这组假设下偏薄。", "The model's required credit spread is material; coverage is thin under these assumptions.")}</span>`);
    else lines.push(`<span class="bad">${T("在这组波动率/增长假设下，模型本身就要求很高的利差——覆盖倍数并不安全。", "Under these volatility and growth assumptions the model itself demands a large spread; the coverage is not safe.")}</span>`);
    lines.push(`${T("利差", "The spread of")} ${fmtNum(spread * 10000, 0)} bp ${T("中，模型只解释了", "is only")} ${fmtNum(bCredit * 10000, 0)} bp${T("；其余是劣后、流动性、途中付息风险与模型不确定性的价格。本演示只讲机制，不构成投资建议。", " explained by the model; the rest prices subordination, liquidity, the risk of missing dividends along the way, and model uncertainty. Mechanics only, not investment advice.")}`);
    q("#vbp-log").innerHTML = lines.map((l) => `<div>${l}</div>`).join("");
  };

  KEYS.forEach((k) => q("#vbp-" + k).addEventListener("input", (e) => { st[k] = +e.target.value; paint(); }));
  q("#vbp-call").addEventListener("click", () => { st.call = !st.call; paint(); });
  q("#vbp-float").addEventListener("click", () => { st.floater = !st.floater; paint(); });
  root.querySelectorAll("#vbp-preset button").forEach((b) => b.addEventListener("click", () => {
    Object.assign(st, PRESETS[b.dataset.p]); st.preset = b.dataset.p;
    root.querySelectorAll("#vbp-preset button").forEach((o) => o.classList.toggle("on", o === b));
    syncInputs(); paint();
  }));
  syncInputs();
  paint();
}
