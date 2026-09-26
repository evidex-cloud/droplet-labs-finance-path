// 交互演示：橙子公司资产负债表探索器——拖动比特币价格与股价，
// 同时看四种 mNAV 口径、两种放大倍数、Strive 放大比率、两种每股聪数、各层 BTC 评级与地板价。
import {
  btcNav, mnavBasic, mnavDiluted, mnavEV, mnavNetBps, netReserve, amplification, amplificationStrategy,
  striveAmpRatio, coverageByLayer, btcFloorPrice, breakevenArr, monthsCovered, btcPerShare, fmtNum, fmtPct, fmtUsd, fmtBig, tex,
} from "./_fin.js";

// LaTeX 里的数字：大数缩写放进 \text{}，千分位写成 {,}，百分号转义
const tb = (x, d) => String.raw`\text{${fmtBig(x, d)}}`;
const tn = (x, d) => fmtNum(x, d).replace(/,/g, "{,}");
const tp = (x, d) => fmtPct(x, d).replace("%", "\\%");

export default function mount(root, lang) {
  const en = lang === "en";
  const T = (zh, e) => (en ? e : zh);

  // 橙子公司固定参数（AUTHORING §0.2）
  const BTC = 10000, SHARES = 100e6, CONV = 150e6, CONV_PX = 25, CONV_SH = CONV / CONV_PX, PREF_F = 100e6, PREF_D = 50e6, CASH = 30e6;
  const DIVS = (PREF_F + PREF_D) * 0.10;
  const st = { btcPx: 100000, px: 15, def: "net" };

  root.innerHTML = `
    <div class="demo">
      <div class="demo-head">${T("🍊 橙子公司探索器：一张资产负债表，四种 mNAV", "🍊 Orange Corp explorer: one balance sheet, four mNAVs")}</div>
      <div class="demo-grid">
        <div class="demo-block">
          <label class="demo-label">${T("比特币价格：", "Bitcoin price: ")}<b id="dw-v-btc"></b></label>
          <input class="demo-slider" type="range" id="dw-btc" min="10000" max="250000" step="1000" value="${st.btcPx}" />
        </div>
        <div class="demo-block">
          <label class="demo-label">${T("橙子公司股价：", "Orange Corp share price: ")}<b id="dw-v-px"></b></label>
          <input class="demo-slider" type="range" id="dw-px" min="2" max="40" step="0.5" value="${st.px}" />
        </div>
      </div>
      <div class="demo-block">
        <div class="demo-btns" id="dw-scn">
          <button class="demo-btn" data-b="100000" data-p="15">${T("标准状态", "Baseline")}</button>
          <button class="demo-btn" data-b="150000" data-p="27">${T("牛市：比特币 +50%、溢价扩张", "Bull: BTC +50%, premium expands")}</button>
          <button class="demo-btn" data-b="50000" data-p="4.5">${T("熊市：比特币 −50%、溢价消失", "Bear: BTC −50%, premium gone")}</button>
          <button class="demo-btn" data-b="30000" data-p="2">${T("深熊：比特币 −70%", "Deep bear: BTC −70%")}</button>
        </div>
      </div>
      <div class="demo-block">
        <div class="demo-label">${T("高亮哪种 mNAV 口径？", "Which mNAV definition to highlight?")}</div>
        <div class="demo-seg" id="dw-seg">
          <button data-d="basic">${T("市值口径", "Basic market cap")}</button>
          <button data-d="diluted">${T("稀释市值", "Diluted market cap")}</button>
          <button data-d="ev">${T("企业价值（2025）", "Enterprise value (2025)")}</button>
          <button data-d="net" class="on">${T("每股净比特币（2026）", "Net BTC/share (2026)")}</button>
        </div>
      </div>
      <div class="cmp" id="dw-mnav" style="grid-template-columns:repeat(auto-fit,minmax(130px,1fr))"></div>
      <div class="stat-row" id="dw-stats"></div>
      <div class="stages" id="dw-bars"></div>
      <div class="demo-log" id="dw-log"></div>
      <p class="demo-tip">${T(
        "先看标准状态：四个 mNAV 从 1.50 到 2.05，都是“对”的。再把股价拖过 25 美元：可转债变成价内，2026 口径的净储备不再扣它、股数却多出 600 万——注意哪一格跳了。最后点“深熊”：各层 BTC 评级一起塌缩，Orange-D 跌到 1 倍附近，放大倍数反而变大。",
        "Start at the baseline: four mNAVs from 1.50 to 2.05, all “correct.” Now drag the share price past $25: the converts go in the money, so the 2026 definition stops subtracting them but adds 6 million shares — watch which box jumps. Finally hit “Deep bear”: every layer's BTC Rating collapses, Orange-D sinks toward 1x, and amplification gets larger, not smaller."
      )}</p>
    </div>`;

  const q = (s) => root.querySelector(s);

  const paint = () => {
    const nav = btcNav(BTC, st.btcPx);
    const mcap = st.px * SHARES;
    const itm = st.px >= CONV_PX;
    const otmDebt = itm ? 0 : CONV;
    const fdShares = SHARES + (itm ? CONV_SH : 0);
    const assumedShares = SHARES + CONV_SH;
    const m = {
      basic: mnavBasic(mcap, BTC, st.btcPx),
      diluted: mnavDiluted(st.px, assumedShares, nav),
      ev: mnavEV(mcap, CONV, PREF_F + PREF_D, CASH, BTC, st.btcPx),
      net: mnavNetBps(st.px, nav, otmDebt, PREF_F + PREF_D, CASH, fdShares),
    };
    const nr = netReserve(nav, otmDebt, PREF_F + PREF_D, CASH);
    q("#dw-v-btc").textContent = fmtUsd(st.btcPx);
    q("#dw-v-px").textContent = fmtUsd(st.px, 2);

    const names = {
      basic: T("市值口径", "Basic"),
      diluted: T("稀释市值口径", "Diluted"),
      ev: T("企业价值口径（2025）", "EV (2025)"),
      net: tex(String.raw`\text{${T("股价", "Price")}} \div \text{${T("每股净比特币", "net BTC/share")}}`) + T("（2026）", " (2026)"),
    };
    q("#dw-mnav").innerHTML = Object.keys(m).map((k) => {
      const v = m[k];
      const txt = isFinite(v) && v > 0 ? fmtNum(v, 2) + "x" : T("净储备 ≤ 0", "net reserve ≤ 0");
      const col = !(isFinite(v) && v > 0) ? "var(--red)" : v >= 1 ? "var(--green)" : "var(--red)";
      return `<div class="cmp-cell ${k === st.def ? "hl" : "cold"}"><div class="demo-meta">${names[k]}</div><div style="font-size:1.35em;font-weight:700;color:${col}">${txt}</div></div>`;
    }).join("");

    const ampS = amplification(nav, CONV + PREF_F + PREF_D);
    const ampO = amplificationStrategy(nav, otmDebt, PREF_F + PREF_D, CASH);
    const sr = striveAmpRatio(CONV, PREF_F + PREF_D, nav);
    const sats1 = btcPerShare(BTC, SHARES) * 1e8, sats2 = btcPerShare(BTC, assumedShares) * 1e8;
    q("#dw-stats").innerHTML = [
      [T("比特币净值", "Bitcoin NAV"), "$" + fmtBig(nav, 2), "acc"],
      [T("市值", "Market cap"), "$" + fmtBig(mcap, 2), ""],
      [T("放大（简单口径）", "Amplification (simple)"), isFinite(ampS) ? fmtNum(ampS, 2) + "x" : "∞", ampS <= 1.6 ? "pos" : "neg"],
      [T("放大（Strategy 官方）", "Amplification (Strategy)"), nr > 0 ? fmtNum(ampO, 2) + "x" : "∞", nr > 0 && ampO <= 1.6 ? "pos" : "neg"],
      [T("Strive 放大比率", "Strive Amplification Ratio"), fmtPct(sr, 1), sr <= 0.5 ? "pos" : "neg"],
      [T("每股聪数（1 亿股 / 1.06 亿股）", "Sats per share (100M / 106M)"), fmtNum(sats1, 0) + " / " + fmtNum(sats2, 0), ""],
    ].map(([k, v, c]) => `<div class="stat"><div class="k">${k}</div><div class="v ${c}">${v}</div></div>`).join("");

    const layers = [
      { name: T("可转债", "Converts"), claim: CONV },
      { name: "Orange-F", claim: PREF_F },
      { name: "Orange-D", claim: PREF_D },
    ];
    const cov = coverageByLayer(nav, layers);
    const maxCov = 10;
    q("#dw-bars").innerHTML = `<div class="demo-label" style="margin-bottom:2px">${T("各层 BTC 评级（满格 = 10 倍）与 BTC 地板价", "BTC Rating by layer (full bar = 10x) and BTC floor price")}</div>` +
      cov.map((c) => {
        const w = Math.min(100, (Math.min(c.coverage, maxCov) / maxCov) * 100);
        const col = c.coverage >= 3 ? "var(--green)" : c.coverage >= 1.5 ? "var(--orange)" : "var(--red)";
        return `<div class="stage-bar"><span class="lab">${c.name}</span><div class="track"><div class="fill" style="width:${w}%;background:${col}"></div></div><span class="val">${fmtNum(c.coverage, 2)}x · ${T("地板", "floor")} ${fmtUsd(btcFloorPrice(st.btcPx, c.coverage))}</span></div>`;
      }).join("");

    const under0 = nav + CASH - (CONV + PREF_F + PREF_D);
    const under1 = nav * 1.1 + CASH - (CONV + PREF_F + PREF_D);
    const lines = [];
    const nbps = nr / fdShares;
    lines.push(tex(String.raw`\text{${T("净储备", "Net Reserve")}} = ${tb(nav, 2)} - \text{${T("价外可转债 ", "OTM converts ")}${fmtBig(otmDebt, 2)}} - \text{${T("优先股 ", "preferred ")}${fmtBig(PREF_F + PREF_D, 2)}} + \text{${T("美元资产 ", "USD assets ")}${fmtBig(CASH, 2)}} = \textbf{${fmtBig(nr, 2)}}`)
      + T("；", "; ")
      + tex(String.raw`\text{${T("每股净比特币", "net BTC per share")}} = \dfrac{${tb(nr, 2)}}{${tb(fdShares, 0)}\ \text{${T("股", "shares")}}} = \mathbf{${nbps < 0 ? "-" : ""}\$${tn(Math.abs(nbps), 2)}}`));
    lines.push(itm
      ? `<span class="warn">${T("股价 ≥ 25 美元：可转债是价内的。2026 口径把它当作将来的股票（+600 万股），不再当作要扣掉的债务。", "Share price ≥ $25: the converts are in the money. The 2026 definition treats them as future shares (+6M) instead of debt to subtract.")}</span>`
      : `${T("股价 < 25 美元：可转债是价外的，2026 口径把 1.5 亿当作债务从储备里扣掉，股数仍按 1 亿股。", "Share price < $25: the converts are out of the money, so the 2026 definition subtracts the $150M as debt and keeps 100M shares.")}`);
    if (under0 > 0) {
      lines.push(`${T("比特币再涨 10%：普通股的“底子”从 ", "If bitcoin rises another 10%, the common's underlying value goes from ")}${fmtBig(under0, 2)}${T(" 变成 ", " to ")}${fmtBig(under1, 2)}${T("，涨 ", ", up ")}<b>${fmtPct(under1 / under0 - 1, 1)}</b>${T("——这就是放大。", " — that is amplification.")}`);
    } else {
      lines.push(`<span class="bad">${T("比特币净值加现金已经不够覆盖全部优先索取权：普通股的“底子”为负，只剩期权价值。", "Bitcoin NAV plus cash no longer covers all senior claims: the common's underlying value is negative — only option value remains.")}</span>`);
    }
    lines.push(`${T("年度优先股股息 ", "Annual preferred dividends ")}${fmtUsd(DIVS / 1e6)}M → ${tex(String.raw`\text{BTC Breakeven ARR} = \dfrac{${tb(DIVS, 0)}}{${tb(nav, 2)}} = \mathbf{${tp(breakevenArr(DIVS, nav), 2)}}`)}${T("；", "; ")}${T("现金覆盖 ", "cash covers ")}<b>${fmtNum(monthsCovered(CASH, DIVS), 0)} ${T("个月", "months")}</b>`);
    const mv = m[st.def];
    lines.push(`${T("你选的口径：", "Your chosen definition: ")}${names[st.def]} = <b>${isFinite(mv) && mv > 0 ? fmtNum(mv, 2) + "x" : "–"}</b> → ${isFinite(mv) && mv > 1 ? `<span class="ok">${T("溢价：按这个口径，增发买币会增厚每股比特币（阶段 16.7）", "premium: on this definition, issuing to buy bitcoin is accretive (Stage 16.7)")}</span>` : `<span class="bad">${T("折价：按这个口径，增发买币会稀释（阶段 18.3）", "discount: on this definition, issuing to buy bitcoin dilutes (Stage 18.3)")}</span>`}`);
    q("#dw-log").innerHTML = lines.map((l) => `<div>${l}</div>`).join("");
  };

  q("#dw-btc").addEventListener("input", (e) => { st.btcPx = +e.target.value; paint(); });
  q("#dw-px").addEventListener("input", (e) => { st.px = +e.target.value; paint(); });
  root.querySelectorAll("#dw-seg button").forEach((b) => b.addEventListener("click", () => {
    st.def = b.dataset.d;
    root.querySelectorAll("#dw-seg button").forEach((o) => o.classList.toggle("on", o === b));
    paint();
  }));
  root.querySelectorAll("#dw-scn button").forEach((b) => b.addEventListener("click", () => {
    st.btcPx = +b.dataset.b; st.px = +b.dataset.p;
    q("#dw-btc").value = st.btcPx; q("#dw-px").value = st.px;
    root.querySelectorAll("#dw-scn button").forEach((o) => o.classList.toggle("active", o === b));
    paint();
  }));
  paint();
}
