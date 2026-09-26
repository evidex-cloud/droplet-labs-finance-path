// 交互演示：每股比特币计算器——三种分母（基本 / 假设稀释 / 完全稀释）、毛与净，以及每股比特币的复利投影。
// 默认值 = 橙子公司：10,000 BTC、1 亿股、可转债 1.5 亿（转股价 25）、优先股 1.5 亿、美元储备 3,000 万、股价 15、币价 10 万。
import { btcPerShare, netReserve, rule72, fmtNum, fmtPct, fmtUsd } from "./_fin.js";
import { lineChart, chartBlock } from "./_chart.js";

export default function mount(root, lang) {
  const en = lang === "en";
  const T = (zh, e) => (en ? e : zh);

  const s = { btc: 10000, shares: 100, conv: 150, convPx: 25, pref: 150, usd: 30, px: 15, btcPx: 100000, g: 20, yrs: 10 };
  let denom = "assumed";

  const sliders = [
    ["btc", T("持有比特币（枚）", "Bitcoin held (BTC)"), 1000, 30000, 100],
    ["shares", T("基本股数（百万股）", "Basic shares (millions)"), 20, 300, 1],
    ["conv", T("可转债名义（百万美元）", "Convertible notional ($M)"), 0, 600, 10],
    ["convPx", T("转股价（美元）", "Conversion price ($)"), 5, 60, 0.5],
    ["pref", T("优先股名义（百万美元）", "Preferred notional ($M)"), 0, 600, 10],
    ["usd", T("美元储备（百万美元）", "USD reserve ($M)"), 0, 200, 5],
    ["px", T("股价（美元）", "Share price ($)"), 2, 60, 0.5],
    ["btcPx", T("比特币价格（美元）", "Bitcoin price ($)"), 20000, 250000, 1000],
  ];

  root.innerHTML = `
    <div class="demo">
      <div class="demo-head">${T("🪙 每股比特币计算器：分母、毛与净、复利", "🪙 BTC-per-share calculator: denominators, gross vs net, compounding")}</div>
      <div class="demo-block">
        <div class="demo-label">${T("选择 BPS 的分母口径", "Choose the BPS denominator")}</div>
        <div class="demo-seg" id="bps-seg">
          <button data-d="basic">${T("基本股数", "Basic shares")}</button>
          <button data-d="assumed" class="on">${T("假设稀释（Strategy BPS）", "Assumed diluted (Strategy BPS)")}</button>
          <button data-d="fully">${T("完全稀释（只算价内）", "Fully diluted (ITM only)")}</button>
        </div>
      </div>
      <div class="demo-grid" id="bps-ctrl"></div>
      <div class="stat-row" id="bps-stats"></div>
      <div class="stages" id="bps-bars"></div>
      <div class="demo-log" id="bps-log"></div>
      <div class="demo-block">
        <div class="demo-label">${T("复利投影", "Compounding projection")}</div>
        <div class="demo-grid">
          <div><label class="demo-label">${T("每股比特币年增长率", "Annual BPS growth")} <b id="bps-v-g"></b></label>
          <input class="demo-slider" type="range" id="bps-g" min="-20" max="60" step="1" value="20" /></div>
          <div><label class="demo-label">${T("年数", "Years")} <b id="bps-v-yrs"></b></label>
          <input class="demo-slider" type="range" id="bps-yrs" min="1" max="15" step="1" value="10" /></div>
        </div>
        <div id="bps-chart"></div>
        <div class="demo-out" id="bps-proj"></div>
      </div>
      <p class="demo-tip">${T(
        "先在三个分母之间切换：可转债价外时，“假设稀释”比“完全稀释”少约 6% 的聪。再把股价拖过 25 美元的转股价，看完全稀释股数怎么“跳崖”、可转债怎么从净储备的扣减项里消失。然后把优先股从 150 加到 400：毛口径不变，每股净比特币却被压低——借来的币不是你的币。",
        "Flip between the three denominators first: while the converts are out of the money, “assumed diluted” shows about 6% fewer sats than “fully diluted”. Then drag the share price past the $25 conversion price and watch the fully diluted count jump off its cliff while the convert drops out of the Net Reserve deductions. Finally raise preferred from 150 to 400: gross BPS doesn't move, but Net BTC per share sinks — borrowed coins aren't your coins."
      )}</p>
    </div>`;

  const q = (sel) => root.querySelector(sel);
  q("#bps-ctrl").innerHTML = sliders.map(([k, lab, lo, hi, st]) => `
    <div><label class="demo-label">${lab} <b id="bps-v-${k}"></b></label>
    <input class="demo-slider" type="range" data-k="${k}" min="${lo}" max="${hi}" step="${st}" value="${s[k]}" /></div>`).join("");
  q("#bps-ctrl").querySelectorAll("[data-k]").forEach((el) => el.addEventListener("input", () => { s[el.dataset.k] = +el.value; paint(); }));
  root.querySelectorAll("#bps-seg button").forEach((b) => b.addEventListener("click", () => {
    denom = b.dataset.d;
    root.querySelectorAll("#bps-seg button").forEach((o) => o.classList.toggle("on", o === b));
    paint();
  }));
  q("#bps-g").addEventListener("input", (e) => { s.g = +e.target.value; paint(); });
  q("#bps-yrs").addEventListener("input", (e) => { s.yrs = +e.target.value; paint(); });

  const SATS = 1e8;

  function paint() {
    q("#bps-v-btc").textContent = fmtNum(s.btc, 0);
    q("#bps-v-shares").textContent = fmtNum(s.shares, 0);
    q("#bps-v-conv").textContent = fmtNum(s.conv, 0);
    q("#bps-v-convPx").textContent = fmtUsd(s.convPx, 2);
    q("#bps-v-pref").textContent = fmtNum(s.pref, 0);
    q("#bps-v-usd").textContent = fmtNum(s.usd, 0);
    q("#bps-v-px").textContent = fmtUsd(s.px, 2);
    q("#bps-v-btcPx").textContent = fmtUsd(s.btcPx);
    q("#bps-v-g").textContent = s.g + "%";
    q("#bps-v-yrs").textContent = s.yrs;

    const convShares = s.convPx > 0 ? s.conv / s.convPx : 0; // 百万股
    const itm = s.px >= s.convPx;
    const shBasic = s.shares, shAssumed = s.shares + convShares, shFully = s.shares + (itm ? convShares : 0);
    const shMap = { basic: shBasic, assumed: shAssumed, fully: shFully };
    const bpsOf = (sh) => btcPerShare(s.btc, sh * 1e6) * SATS;
    const chosen = bpsOf(shMap[denom]);

    const reserve = (s.btc * s.btcPx) / 1e6; // 百万美元
    const otmDebt = itm ? 0 : s.conv;
    const net = netReserve(reserve, otmDebt, s.pref, s.usd);
    const netBpsUsd = net / shFully; // 美元/股（百万美元 ÷ 百万股）
    const netBpsSats = (netBpsUsd / s.btcPx) * SATS;
    const gapPct = 1 - netBpsSats / bpsOf(shFully);

    q("#bps-stats").innerHTML = [
      [T("所选口径 BPS", "BPS (chosen basis)"), fmtNum(chosen, 0) + T(" 聪", " sats"), "acc"],
      [T("每股比特币净值", "BTC NAV per share"), fmtUsd((chosen / SATS) * s.btcPx, 2), ""],
      [T("每股净比特币", "Net BTC per share"), fmtNum(netBpsSats, 0) + T(" 聪", " sats"), netBpsSats > 0 ? "pos" : "neg"],
      [T("净储备", "Net Reserve"), fmtUsd(net) + "M", net > 0 ? "pos" : "neg"],
      [T("可转债状态", "Convert status"), itm ? T("价内", "In the money") : T("价外", "Out of the money"), itm ? "acc" : ""],
    ].map(([k, v, c]) => `<div class="stat"><div class="k">${k}</div><div class="v ${c}">${v}</div></div>`).join("");

    const rows = [
      [T("基本股数", "Basic"), bpsOf(shBasic), shBasic],
      [T("假设稀释", "Assumed diluted"), bpsOf(shAssumed), shAssumed],
      [T("完全稀释", "Fully diluted"), bpsOf(shFully), shFully],
      [T("每股净比特币", "Net BTC/share"), netBpsSats, shFully],
    ];
    const mx = Math.max(...rows.map((r) => r[1]), 1);
    q("#bps-bars").innerHTML = `<div class="demo-label">${T("四种算法并排（聪/股）", "Four measures side by side (sats/share)")}</div>` + rows.map(([n, v, sh], i) => {
      const w = Math.max(0, (v / mx) * 100);
      const col = i === 3 ? "var(--btc)" : "var(--orange)";
      return `<div class="stage-bar"><span class="lab">${n}</span><div class="track"><div class="fill" style="width:${w}%;background:${col}"></div></div><span class="val">${fmtNum(v, 0)}${T("（", " (")}${fmtNum(sh, 1)}M${T("）", ")")}</span></div>`;
    }).join("");

    const lines = [];
    lines.push(`${T("可转债可转股数", "Shares from the convert")} = ${fmtNum(s.conv, 0)}M ÷ ${fmtUsd(s.convPx, 2)} = <b>${fmtNum(convShares, 2)}M</b>${T("。股价 ", ". Share price ")}${fmtUsd(s.px, 2)} ${itm ? "≥" : "<"} ${T("转股价 ", "conversion price ")}${fmtUsd(s.convPx, 2)} ⇒ ${itm ? T("价内：算进完全稀释股数，不再从净储备中扣除。", "in the money: counted in fully diluted shares and no longer deducted from Net Reserve.") : T("价外：完全稀释股数不含它，但净储备要把它当债务扣掉。", "out of the money: excluded from fully diluted shares but deducted from Net Reserve as debt.")}`);
    lines.push(`${T("净储备", "Net Reserve")} = ${fmtNum(reserve, 0)} − ${fmtNum(otmDebt, 0)} − ${fmtNum(s.pref, 0)} + ${fmtNum(s.usd, 0)} = <b>${fmtNum(net, 0)}M</b>${T("；÷ ", "; ÷ ")}${fmtNum(shFully, 1)}M ${T("股 = ", "shares = ")}<b>${fmtUsd(netBpsUsd, 2)}</b>${T(" 每股", " per share")}`);
    lines.push(`${T("毛口径（完全稀释）与净口径之差 ", "Gap between gross (fully diluted) and net ")}<b>${fmtPct(gapPct, 1)}</b>${T("：这是优先索取权压在每股上的分量。", ": the weight of senior claims on each share.")}`);
    const mBasic = (s.px * s.shares) / reserve;
    lines.push(`${T("顺带：市值口径 mNAV = ", "Aside: market-cap mNAV = ")}${fmtNum(mBasic, 2)}x${T("；每花 1 美元买到约 ", "; each dollar of stock buys about ")}<b>${fmtNum(bpsOf(shBasic) / s.px, 0)}</b>${T(" 聪（阶段 16.2）。", " sats (Stage 16.2).")}`);
    q("#bps-log").innerHTML = lines.map((l) => `<div>${l}</div>`).join("");

    const g = s.g / 100, start = chosen;
    const res = lineChart({
      fns: [
        { f: (t) => start * Math.pow(1 + g, t), cls: "line5" },
        { f: () => start, cls: "line2" },
      ],
      lo: 0, hi: s.yrs, xlabel: T("年", "years"), forceZero: true, uid: "bpsc",
    });
    q("#bps-chart").innerHTML = chartBlock(res, [["var(--btc)", T("每股比特币（聪）", "BTC per share (sats)")], ["var(--blue)", T("起点", "Starting level")]]);
    const endV = start * Math.pow(1 + g, s.yrs);
    const dbl = g > 0 ? T("约 ", "about ") + fmtNum(rule72(g), 1) + T(" 年翻倍（72 法则）", " years to double (Rule of 72)") : T("增长率不为正，永远不会翻倍", "growth isn't positive, so it never doubles");
    q("#bps-proj").innerHTML = `${fmtNum(start, 0)} → <b>${fmtNum(endV, 0)}</b>${T(" 聪，", " sats, ")}${fmtNum(endV / start, 2)}x${T("；", "; ")}${dbl}${T("。币价与 mNAV 不变时，股价按同样倍数变化。", ". With the BTC price and mNAV unchanged, the share price moves by the same multiple.")}`;
  }

  paint();
}
