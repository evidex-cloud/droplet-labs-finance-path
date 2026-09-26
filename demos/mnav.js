// 交互演示：mNAV 计算器——同一家公司，按口径切换（市值 / 稀释市值 / EV（Strategy 2025）/ 股价 ÷ 每股净比特币（Strategy 2026）/ Strive 增值溢价）。
// 默认 = 橙子公司。另画出四种 mNAV 随股价变化的曲线，并给出“以当前股价增发 10% 买币”对毛/净每股比特币的影响。
import { mnavBasic, mnavDiluted, mnavEV, mnavNetBps, netReserve, amplificationStrategy, issueAndBuy, fmtNum, fmtPct, fmtUsd } from "./_fin.js";
import { lineChart, chartBlock } from "./_chart.js";

export default function mount(root, lang) {
  const en = lang === "en";
  const T = (zh, e) => (en ? e : zh);

  const s = { btcPx: 100000, px: 15, btc: 10000, shares: 100, conv: 150, convPx: 25, pref: 150, cash: 30 };
  let def = "net";

  const sliders = [
    ["px", T("股价（美元）", "Share price ($)"), 2, 50, 0.25],
    ["btcPx", T("比特币价格（美元）", "Bitcoin price ($)"), 20000, 250000, 1000],
    ["btc", T("持有比特币（枚）", "Bitcoin held (BTC)"), 2000, 30000, 100],
    ["shares", T("基本股数（百万股）", "Basic shares (millions)"), 20, 300, 1],
    ["conv", T("可转债名义（百万美元）", "Convertible notional ($M)"), 0, 600, 10],
    ["convPx", T("转股价（美元）", "Conversion price ($)"), 5, 60, 0.5],
    ["pref", T("优先股名义（百万美元）", "Preferred notional ($M)"), 0, 700, 10],
    ["cash", T("现金 / 美元资产（百万美元）", "Cash / USD assets ($M)"), 0, 300, 5],
  ];
  const defs = [
    ["basic", T("市值口径", "Market cap")],
    ["diluted", T("稀释市值（全转）", "Diluted (all convert)")],
    ["ev", T("EV（Strategy 2025）", "EV (Strategy 2025)")],
    ["net", T("股价 ÷ 每股净币（Strategy 2026）", "Price ÷ Net BPS (Strategy 2026)")],
    ["strive", T("Strive 增值溢价", "Strive accretion premium")],
  ];

  root.innerHTML = `
    <div class="demo">
      <div class="demo-head">${T("🧮 mNAV 计算器：一家公司，几种口径", "🧮 mNAV calculator: one company, several definitions")}</div>
      <div class="demo-block"><div class="demo-seg" id="mn-seg">${defs.map(([k, l]) => `<button data-d="${k}" class="${k === def ? "on" : ""}">${l}</button>`).join("")}</div></div>
      <div class="demo-grid" id="mn-ctrl"></div>
      <div class="stat-row" id="mn-stats"></div>
      <div class="stages" id="mn-bars"></div>
      <div class="demo-log" id="mn-log"></div>
      <div id="mn-chart"></div>
      <p class="demo-tip">${T(
        "默认是橙子公司：四个口径 1.50 / 1.59 / 1.77 / 2.05。把优先股从 150 拖到 600：市值口径纹丝不动，2026 口径却一路飙升——杠杆越高，市值口径越会低估普通股的真实溢价。再把股价拖到 7.30 美元附近，看 2026 口径正好穿过 1.0，“增发 10% 买币”对每股净比特币的影响也在这里由正转负。",
        "The default is Orange Corp: 1.50 / 1.59 / 1.77 / 2.05. Drag preferred from 150 to 600: market-cap mNAV doesn't move while the 2026 definition soars — the more leverage, the more market-cap mNAV understates the common's true premium. Then drag the share price toward $7.30 and watch the 2026 mNAV cross 1.0 exactly where “issue 10% and buy bitcoin” flips from raising to cutting Net BTC per share."
      )}</p>
    </div>`;

  const q = (sel) => root.querySelector(sel);
  q("#mn-ctrl").innerHTML = sliders.map(([k, lab, lo, hi, st]) => `
    <div><label class="demo-label">${lab} <b id="mn-v-${k}"></b></label>
    <input class="demo-slider" type="range" data-k="${k}" min="${lo}" max="${hi}" step="${st}" value="${s[k]}" /></div>`).join("");
  q("#mn-ctrl").querySelectorAll("[data-k]").forEach((el) => el.addEventListener("input", () => { s[el.dataset.k] = +el.value; paint(); }));
  root.querySelectorAll("#mn-seg button").forEach((b) => b.addEventListener("click", () => {
    def = b.dataset.d;
    root.querySelectorAll("#mn-seg button").forEach((o) => o.classList.toggle("on", o === b));
    paint();
  }));

  // 所有金额单位：百万美元；股数单位：百万股
  function calc(px) {
    const nav = (s.btc * s.btcPx) / 1e6;
    const convSh = s.convPx > 0 ? s.conv / s.convPx : 0;
    const itm = px >= s.convPx;
    const mcap = px * s.shares;
    const fully = s.shares + (itm ? convSh : 0);
    const otm = itm ? 0 : s.conv;
    return {
      nav, convSh, itm, mcap, fully, otm,
      basic: mnavBasic(mcap, s.btc, s.btcPx / 1e6),
      diluted: mnavDiluted(px, s.shares + convSh, nav),
      ev: mnavEV(mcap, s.conv, s.pref, s.cash, s.btc, s.btcPx / 1e6),
      net: mnavNetBps(px, nav, otm, s.pref, s.cash, fully),
      netRes: netReserve(nav, otm, s.pref, s.cash),
      amp: amplificationStrategy(nav, otm, s.pref, s.cash),
    };
  }

  function paint() {
    for (const [k] of sliders) q("#mn-v-" + k).textContent = k === "px" || k === "convPx" ? fmtUsd(s[k], 2) : k === "btcPx" ? fmtUsd(s[k]) : fmtNum(s[k], 0);
    const c = calc(s.px);
    const striveP = Math.max(0, c.basic - 1);
    const vals = { basic: c.basic, diluted: c.diluted, ev: c.ev, net: c.net, strive: striveP };
    const shown = def === "strive" ? fmtPct(striveP, 1) : (c.netRes <= 0 && def === "net" ? "∞" : fmtNum(vals[def], 2) + "x");
    const netBps = c.netRes / c.fully;

    q("#mn-stats").innerHTML = [
      [T("所选口径", "Chosen definition"), shown, "acc"],
      [T("比特币净值", "Bitcoin NAV"), fmtUsd(c.nav) + "M", ""],
      [T("净储备", "Net Reserve"), fmtUsd(c.netRes) + "M", c.netRes > 0 ? "pos" : "neg"],
      [T("每股净比特币", "Net BTC per share"), fmtUsd(netBps, 2), ""],
      [T("溢价金额", "Premium in dollars"), fmtUsd(c.mcap - c.netRes) + "M", c.mcap >= c.netRes ? "pos" : "neg"],
    ].map(([k, v, cl]) => `<div class="stat"><div class="k">${k}</div><div class="v ${cl}">${v}</div></div>`).join("");

    const list = [["basic", c.basic], ["diluted", c.diluted], ["ev", c.ev], ["net", c.netRes > 0 ? c.net : NaN]];
    const mx = Math.max(2.5, ...list.map((r) => (isFinite(r[1]) ? r[1] : 0)));
    q("#mn-bars").innerHTML = `<div class="demo-label">${T("四种 mNAV 并排（红色 = 低于 1 倍）", "Four mNAVs side by side (red = below 1x)")}</div>` + list.map(([k, v]) => {
      const name = defs.find((d) => d[0] === k)[1];
      const w = isFinite(v) ? Math.min(100, (v / mx) * 100) : 100;
      const col = !isFinite(v) ? "var(--muted)" : v < 1 ? "var(--red)" : k === def ? "var(--btc)" : "var(--orange)";
      return `<div class="stage-bar"><span class="lab">${name}</span><div class="track"><div class="fill" style="width:${w}%;background:${col}"></div></div><span class="val">${isFinite(v) ? fmtNum(v, 2) + "x" : T("净储备 ≤ 0", "Net ≤ 0")}</span></div>`;
    }).join("");

    // 增发 10% 买币：毛口径用 issueAndBuy；净口径按净储备同理计算
    const n = s.shares * 0.1;
    const gross = issueAndBuy({ btc: s.btc, shares: s.shares * 1e6, btcPrice: s.btcPx, px: s.px, newShares: n * 1e6 });
    const netAfter = (c.netRes + n * s.px) / (c.fully + n);
    const netChg = c.netRes > 0 ? netAfter / netBps - 1 : NaN;
    const lines = [];
    lines.push(`${T("可转债 ", "Convertible ")}${c.itm ? T("价内", "in the money") : T("价外", "out of the money")}${T("（可转 ", " (")}${fmtNum(c.convSh, 2)}M${T(" 股）；净储备 = ", " shares); Net Reserve = ")}${fmtNum(c.nav, 0)} − ${fmtNum(c.otm, 0)} − ${fmtNum(s.pref, 0)} + ${fmtNum(s.cash, 0)} = <b>${fmtNum(c.netRes, 0)}</b>${T("；完全稀释股数 ", "; fully diluted shares ")}${fmtNum(c.fully, 1)}M`);
    lines.push(`${T("EV 口径 − 1 = ", "EV mNAV − 1 = ")}${fmtNum(c.ev - 1, 3)}${T("；2026 口径 − 1 = ", "; 2026 mNAV − 1 = ")}${fmtNum(c.net - 1, 3)}${T("；Strategy 放大倍数 = ", "; Strategy amplification = ")}${fmtNum(c.amp, 2)}x${T("。可转债价外时，(EV − 1) × 放大倍数 = ", ". With the convert out of the money, (EV − 1) × amplification = ")}${fmtNum((c.ev - 1) * c.amp, 3)}`);
    lines.push(`${T("以 ", "Issue 10% more shares at ")}${fmtUsd(s.px, 2)}${T(" 增发 10% 股票全部买币：毛口径每股比特币 ", " and buy bitcoin: gross BTC per share ")}<b>${fmtPct(gross.change, 2)}</b>${T("；每股净比特币 ", "; Net BTC per share ")}<b class="${netChg >= 0 ? "ok" : "bad"}">${fmtPct(netChg, 2)}</b>${T("。分界线：2026 口径 mNAV = 1（阶段 16.7）。", ". The dividing line: 2026 mNAV = 1 (Stage 16.7).")}`);
    if (def === "strive") lines.push(`${T("Strive 的增值溢价 = 市值 ÷ 比特币价值 − 1，低于 0 时显示 0%：", "Strive's accretion premium = market cap ÷ bitcoin value − 1, shown as 0% when negative: ")}${fmtNum(c.basic, 3)} − 1 ⇒ <b>${fmtPct(striveP, 1)}</b>`);
    q("#mn-log").innerHTML = lines.map((l) => `<div>${l}</div>`).join("");

    const safe = (v) => (isFinite(v) && v < 12 ? v : NaN);
    const res = lineChart({
      fns: [
        { f: (x) => safe(calc(x).basic), cls: "line" },
        { f: (x) => safe(calc(x).ev), cls: "line2" },
        { f: (x) => safe(calc(x).netRes > 0 ? calc(x).net : NaN), cls: "line5" },
        { f: () => 1, cls: "line3" },
      ],
      lo: 2, hi: 50, xlabel: T("股价（美元）", "Share price ($)"), markerX: s.px, markerLabel: T("当前", "now"), forceZero: true, uid: "mnc",
    });
    q("#mn-chart").innerHTML = chartBlock(res, [["var(--orange)", T("市值口径", "Market cap")], ["var(--blue)", T("EV 口径", "EV")], ["var(--btc)", T("2026 口径", "2026 definition")], ["var(--red)", T("1.0 倍", "1.0x")]]);
  }

  paint();
}
