// 交互演示：只用优先股（Strive 式） vs 可转债 + 多层优先股（Strategy 式）。
// 两种模式：① 真实快照（Strive 2026-09-18；Strategy 2026-09-20 推算）；② 橙子公司：同样 3 亿美元杠杆，两种写法。
// 拖动比特币涨跌：看各层清算回收（waterfall）、各层 BTC 覆盖（coverageByLayer）、普通股的放大、
// 现金可覆盖的股息月数，以及“有没有到期 / 回售压力”。
import { waterfall, coverageByLayer, amplification, striveAmpRatio, monthsCovered, fmtPct, fmtNum, fmtUsd, fmtBig, tex } from "./_fin.js";

export default function mount(root, lang) {
  const en = lang === "en";
  const T = (zh, e) => (en ? e : zh);

  const MODES = {
    real: [
      { name: T("Strive（2026-09-18）", "Strive (2026-09-18)"), btc: 26355, p0: 84080, cash: 0.2794e9, annual: 0.14539e9,
        layers: [{ name: "SATA", claim: 1.118e9 }], debt: 0, puts: T("无债务、无回售日", "No debt, no put dates") },
      { name: T("Strategy（2026-09-20，推算）", "Strategy (2026-09-20, derived)"), btc: 846000, p0: 84000, cash: 6.09e9, reserve: 5.04e9, annual: 1.62e9,
        layers: [{ name: T("债务", "Debt"), claim: 6.754e9 }, { name: "STRF", claim: 1.284e9 }, { name: "STRC", claim: 9.32e9 }, { name: T("次级优先*", "Junior prefs*"), claim: 3.70e9 }],
        debt: 6.754e9, puts: T("约 59 亿美元可转债可在 2028 年底前回售", "About $5.9B of converts puttable by end-2028") },
    ],
    toy: [
      { name: T("乙：只用优先股（Strive 式）", "B: preferred only (Strive-style)"), btc: 10000, p0: 100000, cash: 30e6, annual: 30e6,
        layers: [{ name: T("优先股 10%", "Pref 10%"), claim: 300e6 }], debt: 0, puts: T("无到期日", "No maturity") },
      { name: T("甲：橙子公司（Strategy 式）", "A: Orange Corp (Strategy-style)"), btc: 10000, p0: 100000, cash: 30e6, annual: 15e6,
        layers: [{ name: T("可转债 0%", "Converts 0%"), claim: 150e6 }, { name: "Orange-F", claim: 100e6 }, { name: "Orange-D", claim: 50e6 }],
        debt: 150e6, puts: T("1.5 亿美元可转债有到期 / 回售日", "$150M of converts with maturity / put dates") },
    ],
  };
  const st = { mode: "real", chg: 0, cash: false };

  root.innerHTML = `
    <div class="demo">
      <div class="demo-head">${T("⚖️ 没有债的结构更安全吗？两种“放大比特币”的写法", "⚖️ Is a structure without debt safer? Two ways to write amplified bitcoin")}</div>
      <div class="demo-grid">
        <div class="demo-block">
          <label class="demo-label">${T("对比对象", "Compare")}</label>
          <div class="demo-seg" id="ss-mode">
            <button data-m="real" class="on">${T("真实快照：Strive vs Strategy", "Real snapshots: Strive vs Strategy")}</button>
            <button data-m="toy">${T("橙子公司：同样杠杆、两种结构", "Orange Corp: same leverage, two structures")}</button>
          </div>
        </div>
        <div class="demo-block">
          <label class="demo-label">${T("清算时是否计入现金 / 美元储备", "Count cash / USD reserve in a liquidation?")}</label>
          <div class="demo-seg" id="ss-cash">
            <button data-c="0" class="on">${T("不计（更保守）", "No (more conservative)")}</button>
            <button data-c="1">${T("计入", "Yes")}</button>
          </div>
        </div>
      </div>
      <div class="demo-block">
        <label class="demo-label">${T("比特币相对快照的涨跌", "Bitcoin move from the snapshot")}${T("：", ": ")}<b id="ss-chg-v"></b></label>
        <input class="demo-slider" id="ss-chg" type="range" min="-90" max="100" step="5" value="0" />
        <div class="demo-btns">${[-30, -50, -70, -85].map((v) => `<button class="demo-btn" data-v="${v}">${v}%</button>`).join("")}<button class="demo-btn" data-v="0">0%</button></div>
      </div>
      <div class="cmp" id="ss-cmp"></div>
      <div class="demo-block"><div class="demo-log" id="ss-log"></div></div>
      <p class="demo-tip">${T(
        "在“真实快照”下把比特币拖到 −50%：SATA 刚好落到覆盖约 1 倍的边缘，而 Strategy 的每一层优先股仍被全额覆盖——但 Strategy 那一栏写着“约 59 亿美元可回售”。切到“橙子公司”：两种结构的普通股放大倍数一样，但只用优先股的那家每年要多付一倍的现金股息（可转债的票息是 0%）。没有免费的结构。",
        "In “real snapshots,” drag bitcoin to −50%: SATA lands right at the edge of about 1x coverage, while every one of Strategy's preferred layers is still fully covered, but Strategy's column reads “about $5.9B puttable.” Switch to “Orange Corp”: both commons are amplified the same, yet the preferred-only company pays twice the cash dividends each year (the converts pay a 0% coupon). There is no free structure."
      )}</p>
    </div>`;

  const q = (s) => root.querySelector(s);

  const colHtml = (c) => {
    const p = c.p0 * (1 + st.chg / 100), btcV = c.btc * p, btcV0 = c.btc * c.p0;
    const assets = btcV + (st.cash ? c.cash : 0), assets0 = btcV0 + (st.cash ? c.cash : 0);
    const claims = c.layers.reduce((a, l) => a + l.claim, 0);
    const w = waterfall(assets, c.layers), w0 = waterfall(assets0, c.layers);
    const cov = coverageByLayer(assets, c.layers);
    const eqChg = w0.equity > 0 ? w.equity / w0.equity - 1 : NaN;
    const amp = amplification(btcV0, claims);
    const ratio = striveAmpRatio(c.debt, claims - c.debt, btcV);
    const months = monthsCovered(c.reserve ?? c.cash, c.annual); // Strategy：只用美元储备（USD Reserve），不含 USD Cash
    const bars = w.rows.map((r, i) => {
      const cv = cov[i].coverage, col = r.recovery >= 0.999 ? (cv >= 2 ? "var(--green)" : "var(--btc)") : "var(--red)";
      return `<div class="stage-bar"><span class="lab">${r.name}</span><div class="track"><div class="fill" style="width:${(r.recovery * 100).toFixed(1)}%;background:${col}"></div></div><span class="val">${fmtNum(cv, 2)}x</span></div>`;
    }).join("");
    return `<div class="cmp-cell">
      <h5>${c.name}</h5>
      <div class="demo-meta">${T("比特币价格", "Bitcoin price")} ${fmtUsd(p, 0)} · ${T("比特币价值", "bitcoin value")} ${fmtBig(btcV)}</div>
      <div class="stages">${bars}<div class="stage-bar"><span class="lab">${T("普通股", "Common")}</span><div class="track"><div class="fill ghost" style="width:${Math.min(100, assets > 0 ? (w.equity / assets) * 100 : 0).toFixed(1)}%"></div></div><span class="val">${fmtBig(w.equity)}</span></div></div>
      <div class="demo-meta">${T("条形：清算回收率；右侧：该层 BTC 覆盖倍数", "bar: liquidation recovery; right: that layer's coverage")}</div>
      <div class="stat-row">
        <div class="stat"><div class="k">${tex(T(String.raw`(\text{债务} + \text{优先股}) \div \text{比特币}`, String.raw`(\text{debt} + \text{pref}) \div \text{bitcoin}`))}</div><div class="v">${fmtPct(ratio, 1)}</div></div>
        <div class="stat"><div class="k">${T("普通股放大（快照时）", "Common amplification (at snapshot)")}</div><div class="v acc">${fmtNum(amp, 2)}x</div></div>
        <div class="stat"><div class="k">${T("普通股剩余价值变化", "Change in common residual")}</div><div class="v ${eqChg >= 0 ? "pos" : "neg"}">${isFinite(eqChg) ? fmtPct(eqChg, 1) : "–"}</div></div>
        <div class="stat"><div class="k">${T("现金可覆盖股息", "Cash covers dividends for")}</div><div class="v">${fmtNum(months, 0)} ${T("个月", "mo")}</div></div>
        <div class="stat"><div class="k">${T("年度现金股息 / 利息", "Annual cash dividends / interest")}</div><div class="v">${fmtBig(c.annual)}</div></div>
      </div>
      <div class="demo-meta">${T("到期 / 回售压力", "Maturity / put pressure")}${T("：", ": ")}<b>${c.puts}</b></div>
    </div>`;
  };

  const paint = () => {
    q("#ss-chg-v").textContent = (st.chg > 0 ? "+" : "") + st.chg + "%";
    const cols = MODES[st.mode];
    q("#ss-cmp").innerHTML = cols.map(colHtml).join("");
    const lines = [];
    const [a, b] = cols;
    const lastCov = (c) => {
      const p = c.p0 * (1 + st.chg / 100), assets = c.btc * p + (st.cash ? c.cash : 0);
      const cov = coverageByLayer(assets, c.layers); return cov[cov.length - 1].coverage;
    };
    const ca = lastCov(a), cb = lastCov(b);
    lines.push(`${T("最劣后一层优先股的覆盖", "Coverage of the most junior preferred")}${T("：", ": ")}${a.layers[a.layers.length - 1].name} <b>${fmtNum(ca, 2)}x</b> · ${b.layers[b.layers.length - 1].name} <b>${fmtNum(cb, 2)}x</b>${T("。", ".")}`);
    if (ca < 1 || cb < 1) lines.push(`<span class="bad">${T("至少有一层优先股的覆盖低于 1 倍：若此刻清算，它拿不满名义金额。但两家都没有按市值追加保证金的条款——真实世界里先出现的是股息压力与价格跌破面值，而不是强制清算（阶段 17.6）。", "At least one preferred layer is below 1x: in a liquidation today it would not recover its full notional. Neither company has mark-to-market margin terms, though; in the real world the first symptoms are dividend strain and prices below par, not forced liquidation (Stage 17.6).")}</span>`);
    else if (ca < 1.5 || cb < 1.5) lines.push(`<span class="warn">${T("覆盖已经很薄：再跌一段，最劣后的优先股就会跌破 1 倍。", "Coverage is thin: a further fall would push the most junior preferred below 1x.")}</span>`);
    if (st.mode === "toy") lines.push(`${T("两种写法的普通股放大倍数相同（都是 3 亿美元杠杆压在 10 亿美元比特币上），但只用优先股的那家每年现金股息 3,000 万美元，是橙子公司（1,500 万美元，可转债票息 0%）的两倍——没有债，是用更高的现金成本换来的。", "Both commons are amplified the same ($300M of leverage on $1B of bitcoin), but the preferred-only company pays $30M a year in cash dividends, twice Orange Corp's $15M (its converts pay 0%). Having no debt is bought with a higher cash cost.")}`);
    else lines.push(T(
      `按同一个公式 ${tex(String.raw`(\text{债务} + \text{优先股}) \div \text{比特币}`)}，Strive 约 50%，Strategy 约 30%；Strive 普通股的放大更高，SATA 的覆盖更薄——但 Strive 没有任何到期或回售日期。`,
      `On one formula, ${tex(String.raw`(\text{debt} + \text{preferred}) \div \text{bitcoin}`)}, Strive is about 50% and Strategy about 30%: Strive's common is more amplified and SATA's coverage thinner, but Strive has no maturity or put dates at all.`
    ));
    if (st.mode === "real") lines.push(`<span class="warn">${T("* Strategy 的三只次级优先股（STRE、STRK、STRD）合为一层；它们之间的相对顺序未经一手文件核实。", "* Strategy's three junior preferreds (STRE, STRK, STRD) are shown as one layer; their relative order is not verified in primary documents.")}</span>`);
    q("#ss-log").innerHTML = lines.map((l) => `<div>${l}</div>`).join("");
  };

  root.querySelectorAll("#ss-mode button").forEach((btn) => btn.addEventListener("click", () => {
    st.mode = btn.dataset.m; root.querySelectorAll("#ss-mode button").forEach((o) => o.classList.toggle("on", o === btn)); paint();
  }));
  root.querySelectorAll("#ss-cash button").forEach((btn) => btn.addEventListener("click", () => {
    st.cash = btn.dataset.c === "1"; root.querySelectorAll("#ss-cash button").forEach((o) => o.classList.toggle("on", o === btn)); paint();
  }));
  q("#ss-chg").addEventListener("input", (e) => { st.chg = +e.target.value; paint(); });
  root.querySelectorAll("[data-v]").forEach((btn) => btn.addEventListener("click", () => { st.chg = +btn.dataset.v; q("#ss-chg").value = st.chg; paint(); }));
  paint();
}
