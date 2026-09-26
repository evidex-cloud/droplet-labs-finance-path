// 交互演示：飞轮沙盘——三种动作（增发普通股买币 / 发优先股买币 / 卖币回购普通股），多轮执行，
// 同时追踪毛口径每股比特币（issueAndBuy）与每股净比特币（净储备 ÷ 股数），并显示两条分界线。
import { issueAndBuy, btcRating, fmtNum, fmtPct, fmtUsd } from "./_fin.js";
import { lineChart, chartBlock } from "./_chart.js";

export default function mount(root, lang) {
  const en = lang === "en";
  const T = (zh, e) => (en ? e : zh);

  const s = { mode: "common", m0: 1.5, frac: 10, rounds: 8, decay: 0, g: 20, rate: 10, issuePct: 100 };
  const START = { btc: 10000, shares: 100e6, px: 100000, claims: 300, cash: 30 }; // claims/cash 单位：百万美元

  const modes = [
    ["common", T("增发普通股买币", "Issue common, buy BTC")],
    ["pref", T("发优先股买币", "Issue preferred, buy BTC")],
    ["buyback", T("卖币回购普通股", "Sell BTC, buy back common")],
  ];

  root.innerHTML = `
    <div class="demo">
      <div class="demo-head">${T("🎡 飞轮沙盘：增值、稀释与两条分界线", "🎡 Flywheel sandbox: accretion, dilution and the two lines")}</div>
      <div class="demo-block"><div class="demo-seg" id="fw-seg">${modes.map(([k, l]) => `<button data-m="${k}" class="${k === s.mode ? "on" : ""}">${l}</button>`).join("")}</div></div>
      <div class="demo-grid" id="fw-ctrl"></div>
      <div class="stat-row" id="fw-stats"></div>
      <div id="fw-chart"></div>
      <div class="demo-log" id="fw-log"></div>
      <p class="demo-tip">${T(
        "先在“增发普通股”里把市值口径 mNAV 拖到 0.8：毛口径（橙线）下降，净口径（绿线）却在上升——价格落在 7.30 与 10 美元之间。再拖到 0.6：两条线一起向下。把“每轮 mNAV 衰减”调到 10%，看飞轮怎样自己减速直至倒转。切到“发优先股”：比特币年回报低于股息率时，绿线低于“什么都不做”的虚线；把发行价调到面值的 90%，第一轮就吃亏。",
        "In “Issue common”, drag market-cap mNAV to 0.8: gross (orange) falls while net (green) rises — the price sits between $7.30 and $10. Drag it to 0.6 and both fall. Set “mNAV decay per round” to 10% and watch the flywheel slow down until it reverses. Switch to “Issue preferred”: when bitcoin's annual return is below the dividend rate, the green line falls below the “do nothing” baseline; set the issue price to 90% of par and you lose from round one."
      )}</p>
    </div>`;

  const q = (sel) => root.querySelector(sel);
  const ctrlDefs = () => {
    const common = [
      ["m0", T("起始 mNAV（市值口径）", "Starting mNAV (market cap)"), 0.4, 4, 0.05],
      ["frac", T("每轮增发比例（%）", "Issued per round (%)"), 1, 30, 1],
      ["rounds", T("轮数", "Rounds"), 1, 20, 1],
      ["decay", T("每轮 mNAV 衰减（%）", "mNAV decay per round (%)"), 0, 20, 1],
    ];
    if (s.mode === "pref") return [
      ["frac", T("每轮发行（占比特币价值 %）", "Issued per round (% of bitcoin value)"), 1, 30, 1],
      ["rate", T("股息率（%）", "Dividend rate (%)"), 4, 16, 0.25],
      ["issuePct", T("发行价（占面值 %）", "Issue price (% of par)"), 80, 105, 1],
      ["g", T("比特币年回报（%）", "Bitcoin annual return (%)"), -40, 80, 1],
      ["rounds", T("年数（每年一轮）", "Years (one round each)"), 1, 15, 1],
    ];
    if (s.mode === "buyback") return [
      ["m0", T("mNAV（市值口径）", "mNAV (market cap)"), 0.3, 1.5, 0.05],
      ["frac", T("每轮回购比例（%）", "Bought back per round (%)"), 1, 20, 1],
      ["rounds", T("轮数", "Rounds"), 1, 10, 1],
    ];
    return common;
  };
  function buildCtrl() {
    q("#fw-ctrl").innerHTML = ctrlDefs().map(([k, lab, lo, hi, st]) => `
      <div><label class="demo-label">${lab} <b id="fw-v-${k}"></b></label>
      <input class="demo-slider" type="range" data-k="${k}" min="${lo}" max="${hi}" step="${st}" value="${s[k]}" /></div>`).join("");
    q("#fw-ctrl").querySelectorAll("[data-k]").forEach((el) => el.addEventListener("input", () => { s[el.dataset.k] = +el.value; paint(); }));
  }
  root.querySelectorAll("#fw-seg button").forEach((b) => b.addEventListener("click", () => {
    s.mode = b.dataset.m;
    if (s.mode === "buyback" && s.m0 > 1.5) s.m0 = 0.8;
    root.querySelectorAll("#fw-seg button").forEach((o) => o.classList.toggle("on", o === b));
    buildCtrl(); paint();
  }));

  function simulate() {
    let btc = START.btc, shares = START.shares, px = START.px, claims = START.claims, cash = START.cash;
    const gross0 = btc / shares, net0 = ((btc * px) / 1e6 - claims + cash) / (shares / 1e6);
    const gross = [1], net = [1], base = [1], notes = [];
    let bBtc = START.btc, bCash = START.cash, bPx = START.px; // “什么都不做”的基线（仅优先股模式）
    for (let r = 1; r <= s.rounds; r++) {
      if (s.mode === "common") {
        const m = s.m0 * Math.pow(1 - s.decay / 100, r - 1);
        const P = m * (btc / shares) * px;
        const n = shares * s.frac / 100;
        const res = issueAndBuy({ btc, shares, btcPrice: px, px: P, newShares: n });
        const navBefore = (btc * px) / 1e6 - claims + cash;
        btc = res.btc; shares = res.shares;
        notes.push({ r, m, P, netLine: navBefore / ((shares - n) / 1e6) });
      } else if (s.mode === "buyback") {
        const P = s.m0 * (btc / shares) * px;
        const n = shares * s.frac / 100;
        const coins = (n * P) / px;
        const navBefore = (btc * px) / 1e6 - claims + cash;
        notes.push({ r, m: s.m0, P, netLine: navBefore / (shares / 1e6) });
        btc -= coins; shares -= n;
      } else {
        const bv = (btc * px) / 1e6;
        const X = bv * s.frac / 100;              // 新增名义（百万美元）
        const proceeds = X * s.issuePct / 100;
        btc += (proceeds * 1e6) / px; claims += X;
        px *= 1 + s.g / 100; bPx = px;
        // 一年股息：全部优先股（原有 1.5 亿 + 新增）按 s.rate；原有部分按 10%。先用现金，再卖币
        const newPref = claims - START.claims;
        let div = 150 * 0.10 + newPref * s.rate / 100;
        const fromCash = Math.min(cash, div); cash -= fromCash; div -= fromCash;
        btc -= (div * 1e6) / px;
        let bdiv = 150 * 0.10; const bfc = Math.min(bCash, bdiv); bCash -= bfc; bdiv -= bfc; bBtc -= (bdiv * 1e6) / bPx;
        const bNet = ((bBtc * bPx) / 1e6 - START.claims + bCash) / (START.shares / 1e6);
        base.push(bNet / net0);
        notes.push({ r, X, proceeds });
      }
      gross.push((btc / shares) / gross0);
      net.push((((btc * px) / 1e6 - claims + cash) / (shares / 1e6)) / net0);
    }
    return { gross, net, base, notes, btc, shares, px, claims, cash, net0 };
  }

  function paint() {
    for (const [k] of ctrlDefs()) {
      const el = q("#fw-v-" + k); if (!el) continue;
      el.textContent = k === "m0" ? fmtNum(s[k], 2) + "x" : k === "rounds" ? s[k] : s[k] + "%";
    }
    const r = simulate();
    const N = s.rounds;
    const grossChg = r.gross[N] - 1, netChg = r.net[N] - 1;
    const endNav = (r.btc * r.px) / 1e6;
    const ratingF = btcRating(endNav, 250);

    q("#fw-stats").innerHTML = [
      [T("毛口径每股比特币", "Gross BTC per share"), fmtPct(grossChg, 1), grossChg >= 0 ? "pos" : "neg"],
      [T("每股净比特币", "Net BTC per share"), fmtPct(netChg, 1), netChg >= 0 ? "pos" : "neg"],
      [T("股数", "Shares"), fmtNum(r.shares / 1e6, 1) + "M", ""],
      [T("持币", "Bitcoin held"), fmtNum(r.btc, 0), ""],
      [T("F 层 BTC 评级", "F-layer BTC Rating"), fmtNum(ratingF, 2) + "x", ratingF >= 3 ? "pos" : ratingF >= 1.5 ? "acc" : "neg"],
    ].map(([k, v, c]) => `<div class="stat"><div class="k">${k}</div><div class="v ${c}">${v}</div></div>`).join("");

    const fns = [
      { f: (t) => r.gross[Math.max(0, Math.min(N, Math.round(t)))], cls: "line5" },
      { f: (t) => r.net[Math.max(0, Math.min(N, Math.round(t)))], cls: "line4" },
    ];
    const legend = [["var(--btc)", T("毛口径每股比特币", "Gross BTC per share")], ["var(--green)", T("每股净比特币", "Net BTC per share")]];
    if (s.mode === "pref") { fns.push({ f: (t) => r.base[Math.max(0, Math.min(N, Math.round(t)))], cls: "line2" }); legend.push(["var(--blue)", T("什么都不做（只付原有股息）", "Do nothing (pay existing dividends only)")]); }
    fns.push({ f: () => 1, cls: "line3" }); legend.push(["var(--red)", T("起点", "Start")]);
    const res = lineChart({ fns, lo: 0, hi: N, samples: Math.max(N, 1), xlabel: s.mode === "pref" ? T("年", "years") : T("轮", "rounds"), uid: "fwc" });
    q("#fw-chart").innerHTML = chartBlock(res, legend);

    const lines = [];
    if (s.mode === "common") {
      const first = r.notes[0], last = r.notes[r.notes.length - 1];
      lines.push(`${T("第 1 轮：股价 ", "Round 1: share price ")}${fmtUsd(first.P, 2)}${T("；毛口径分界 = 每股比特币价值 10.00 美元，净口径分界 = 每股净比特币 ", "; gross line = bitcoin value per share $10.00, net line = Net BTC per share ")}${fmtUsd(first.netLine, 2)}`);
      const zone = first.P > 10 ? `<span class="ok">${T("两者都增值", "accretive on both")}</span>` : first.P > first.netLine ? `<span class="warn">${T("毛降净升：BTC Yield 为负，但新股本在降杠杆", "gross down, net up: negative BTC Yield, but the new equity is de-levering")}</span>` : `<span class="bad">${T("两者都稀释", "dilutive on both")}</span>`;
      lines.push(`${T("所在区间：", "Zone: ")}${zone}`);
      lines.push(`${T("单轮公式：(1 + x × m) ÷ (1 + x) − 1 = ", "One-round formula: (1 + x × m) ÷ (1 + x) − 1 = ")}(1 + ${s.frac / 100} × ${fmtNum(first.m, 2)}) ÷ ${fmtNum(1 + s.frac / 100, 2)} − 1 = <b>${fmtPct((1 + (s.frac / 100) * first.m) / (1 + s.frac / 100) - 1, 2)}</b>`);
      if (s.decay > 0) lines.push(`${T("反身性：mNAV 从 ", "Reflexivity: mNAV slides from ")}${fmtNum(first.m, 2)}x${T(" 衰减到 ", " to ")}${fmtNum(last.m, 2)}x${T("；当股价跌破净口径分界线，飞轮开始倒转。", "; once the price falls below the net line, the flywheel runs backwards.")}`);
    } else if (s.mode === "buyback") {
      const first = r.notes[0];
      lines.push(`${T("回购价 ", "Buyback price ")}${fmtUsd(first.P, 2)}${T("（mNAV ", " (mNAV ")}${fmtNum(s.m0, 2)}x${T("）；毛口径分界 10.00 美元，净口径分界 ", "); gross line $10.00, net line ")}${fmtUsd(first.netLine, 2)}`);
      lines.push(first.P < first.netLine
        ? `<span class="ok">${T("价格低于每股净比特币：毛、净两本账都增值。", "Price below Net BTC per share: accretive on both books.")}</span>`
        : first.P < 10 ? `<span class="warn">${T("价格在两线之间：毛口径增值，净口径减值——按净账是“买贵了”。", "Price between the lines: gross accretive, net dilutive — on the net books the company overpaid.")}</span>`
        : `<span class="bad">${T("价格高于每股比特币价值：两本账都在毁灭价值。", "Price above bitcoin value per share: value-destroying on both books.")}</span>`);
      lines.push(`${T("代价：卖币让 F 层 BTC 评级从 4.00 倍降到 ", "The cost: selling coins cuts the F layer's BTC Rating from 4.00x to ")}<b>${fmtNum(ratingF, 2)}x</b>${T("——普通股的回购用的是优先股的覆盖。", " — the common's buyback is paid for with the preferreds' coverage.")}`);
    } else {
      const n1 = r.notes[0];
      lines.push(`${T("每年发行名义 ", "Each year issues notional ")}${fmtNum(n1.X, 0)}M${T("，收款 ", ", receiving ")}${fmtNum(n1.proceeds, 0)}M${s.issuePct < 100 ? T("——低于面值发行，发行当天就少了 ", " — issuing below par loses ") + fmtNum(n1.X - n1.proceeds, 1) + T("M 净储备", "M of Net Reserve on day one") : ""}${T("。有效成本 ", ". Effective cost ")}${fmtPct((s.rate / 100) / (s.issuePct / 100), 2)}${T("，比特币年回报 ", " vs bitcoin's annual return ")}${s.g}%`);
      lines.push(s.g / 100 > (s.rate / 100) / (s.issuePct / 100)
        ? `<span class="ok">${T("比特币跑赢成本：借来的币在增值（每股净比特币高于基线）。", "Bitcoin beats the cost: the borrowed coins add value (Net BTC per share above the baseline).")}</span>`
        : `<span class="bad">${T("比特币跑输成本：放大在减值——这就是 BTC Hurdle ARR 的含义。", "Bitcoin trails the cost: amplification is subtracting value — the meaning of the BTC Hurdle ARR.")}</span>`);
      lines.push(`${T("毛口径每股比特币 ", "Gross BTC per share ")}${fmtPct(grossChg, 1)}${T(" 远高于净口径——毛口径把借来的币也算成了股东的币。", " runs far above net — the gross figure counts borrowed coins as shareholders' coins.")}`);
    }
    q("#fw-log").innerHTML = lines.map((l) => `<div>${l}</div>`).join("");
  }

  buildCtrl();
  paint();
}
