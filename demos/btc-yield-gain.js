// 交互演示：由两个时点快照算 BTC Yield / BTC Gain / BTC $ Gain，并对照“每股净比特币”的变化；
// 下半部分：2026 年季度口径（相对年初、可相加）与传统环比口径的对照。
import { btcYield, btcGain, btcDollarGain, netReserve, fmtNum, fmtPct, fmtUsd, tex } from "./_fin.js";

// 把格式化好的数字放进 LaTeX：千分位写成 {,}，$ 与 % 转义
const texv = (s) => String(s).replace(/\$/g, "\\$").replace(/,/g, "{,}").replace(/%/g, "\\%");

export default function mount(root, lang) {
  const en = lang === "en";
  const T = (zh, e) => (en ? e : zh);

  const START = { btc: 10000, sh: 100, pref: 150, cash: 30, conv: 150 };
  const e = { btc: 11500, sh: 110, pref: 150, cash: 30, px: 100000 };
  const qv = [100, 110, 125, 120, 135];

  const scen = {
    A: { btc: 11500, sh: 110, pref: 150, cash: 30, zh: "以 15 美元增发 1,000 万股买币", en: "Sell 10M shares at $15, buy BTC" },
    B: { btc: 10800, sh: 110, pref: 150, cash: 30, zh: "以 8 美元增发 1,000 万股买币", en: "Sell 10M shares at $8, buy BTC" },
    C: { btc: 11000, sh: 100, pref: 250, cash: 30, zh: "发 1 亿美元优先股买币", en: "Issue $100M preferred, buy BTC" },
    D: { btc: 9850, sh: 100, pref: 150, cash: 30, zh: "卖 150 BTC 付一年股息", en: "Sell 150 BTC to pay a year of dividends" },
    E: { btc: 10000, sh: 102, pref: 150, cash: 60, zh: "以 15 美元增发 200 万股存美元储备", en: "Sell 2M shares at $15, hold as USD reserve" },
  };

  const sl = [
    ["btc", T("期末持币（枚）", "End bitcoin held (BTC)"), 8000, 16000, 50],
    ["sh", T("期末股数（百万股）", "End shares (millions)"), 90, 160, 0.5],
    ["pref", T("期末优先股名义（百万美元）", "End preferred notional ($M)"), 0, 600, 10],
    ["cash", T("期末美元储备（百万美元）", "End USD reserve ($M)"), 0, 200, 5],
    ["px", T("计量时点比特币价格（美元）", "Bitcoin price at measurement ($)"), 30000, 200000, 1000],
  ];

  root.innerHTML = `
    <div class="demo">
      <div class="demo-head">${T("📈 BTC Yield 计算器：两个快照、三个 KPI、一个净口径对照", "📈 BTC Yield calculator: two snapshots, three KPIs, one net check")}</div>
      <div class="demo-block">
        <div class="demo-label">${T("期初（橙子公司）：10,000 BTC · 1 亿股 · 优先股 1.5 亿 · 价外可转债 1.5 亿 · 美元储备 3,000 万", "Start (Orange Corp): 10,000 BTC · 100M shares · $150M preferred · $150M OTM converts · $30M USD reserve")}</div>
        <div class="demo-btns" id="yg-scn">${Object.keys(scen).map((k) => `<button class="demo-btn${k === "A" ? " active" : ""}" data-s="${k}">${k}${T("：", ": ")}${en ? scen[k].en : scen[k].zh}</button>`).join("")}</div>
      </div>
      <div class="demo-grid" id="yg-ctrl"></div>
      <div class="stat-row" id="yg-stats"></div>
      <div class="demo-log" id="yg-log"></div>
      <div class="demo-block">
        <div class="demo-label">${T("2026 季度口径：输入年初与各季度末的 BPS（聪/股，任意单位）", "2026 quarterly convention: BPS at the start of the year and at each quarter-end (any units)")}</div>
        <div class="demo-grid" id="yg-qctrl"></div>
        <div id="yg-qtab"></div>
      </div>
      <p class="demo-tip">${T(
        "依次点 A 到 E：A 的 BTC Yield 为正，B、D、E 为负——注意 E 是以溢价发股，却因为钱没变成比特币而为负。点 C 时看最后一行：毛口径 +10%，每股净比特币却是 0%。再把比特币价格滑块拖来拖去：BTC Yield 与 BTC Gain 不动，只有 BTC $ Gain 跟着币价变。",
        "Click A through E in turn: A's BTC Yield is positive; B, D and E are negative — note that E issues at a premium but turns negative because the cash never became bitcoin. On C, read the last line: +10% gross, 0% on Net BTC per share. Then slide the bitcoin price around: BTC Yield and BTC Gain stay put; only BTC $ Gain moves with the price."
      )}</p>
    </div>`;

  const q = (s) => root.querySelector(s);
  q("#yg-ctrl").innerHTML = sl.map(([k, lab, lo, hi, st]) => `
    <div><label class="demo-label">${lab} <b id="yg-v-${k}"></b></label>
    <input class="demo-slider" type="range" data-k="${k}" min="${lo}" max="${hi}" step="${st}" value="${e[k]}" /></div>`).join("");
  q("#yg-ctrl").querySelectorAll("[data-k]").forEach((el) => el.addEventListener("input", () => {
    e[el.dataset.k] = +el.value;
    root.querySelectorAll("#yg-scn .demo-btn").forEach((b) => b.classList.remove("active"));
    paint();
  }));
  root.querySelectorAll("#yg-scn .demo-btn").forEach((b) => b.addEventListener("click", () => {
    const sc = scen[b.dataset.s];
    Object.assign(e, { btc: sc.btc, sh: sc.sh, pref: sc.pref, cash: sc.cash });
    root.querySelectorAll("#yg-scn .demo-btn").forEach((o) => o.classList.toggle("active", o === b));
    q("#yg-ctrl").querySelectorAll("[data-k]").forEach((el) => { el.value = e[el.dataset.k]; });
    paint();
  }));

  const qLabels = [T("年初", "Start"), T("一季末", "End Q1"), T("二季末", "End Q2"), T("三季末", "End Q3"), T("四季末", "End Q4")];
  q("#yg-qctrl").innerHTML = qv.map((v, i) => `
    <div><label class="demo-label">${qLabels[i]} <b id="yg-qv-${i}"></b></label>
    <input class="demo-slider" type="range" data-q="${i}" min="60" max="180" step="1" value="${v}" /></div>`).join("");
  q("#yg-qctrl").querySelectorAll("[data-q]").forEach((el) => el.addEventListener("input", () => { qv[+el.dataset.q] = +el.value; paintQ(); }));

  function paint() {
    q("#yg-v-btc").textContent = fmtNum(e.btc, 0);
    q("#yg-v-sh").textContent = fmtNum(e.sh, 1);
    q("#yg-v-pref").textContent = fmtNum(e.pref, 0);
    q("#yg-v-cash").textContent = fmtNum(e.cash, 0);
    q("#yg-v-px").textContent = fmtUsd(e.px);

    const y = btcYield(START.btc, START.sh, e.btc, e.sh);
    const g = btcGain(START.btc, y);
    const dg = btcDollarGain(START.btc, y, e.px);
    const bps0 = (START.btc / (START.sh * 1e6)) * 1e8, bps1 = (e.btc / (e.sh * 1e6)) * 1e8;
    // 每股净比特币（以 BTC 计，避免币价影响）：净储备 ÷ 股数；可转债视为价外
    const net0 = netReserve(START.btc * e.px / 1e6, START.conv, START.pref, START.cash) / START.sh;
    const net1 = netReserve(e.btc * e.px / 1e6, START.conv, e.pref, e.cash) / e.sh;
    const netChg = net0 > 0 ? net1 / net0 - 1 : NaN;
    const bought = e.btc - START.btc;

    q("#yg-stats").innerHTML = [
      ["BTC Yield", fmtPct(y, 2), y >= 0 ? "pos" : "neg"],
      ["BTC Gain", fmtNum(g, 0) + " BTC", g >= 0 ? "pos" : "neg"],
      ["BTC $ Gain", fmtUsd(dg / 1e6, 1) + "M", dg >= 0 ? "pos" : "neg"],
      [T("每股净比特币变化", "Change in Net BTC/share"), fmtPct(netChg, 2), netChg >= 0 ? "pos" : "neg"],
    ].map(([k, v, c]) => `<div class="stat"><div class="k">${k}</div><div class="v ${c}">${v}</div></div>`).join("");

    const lines = [];
    lines.push(`BPS${T("：", ": ")}${fmtNum(bps0, 0)} → ${fmtNum(bps1, 0)} ${T("聪", "sats")} ⇒ ${tex(String.raw`\text{BTC Yield} = \frac{${texv(fmtNum(bps1, 0))}}{${texv(fmtNum(bps0, 0))}} - 1 = \mathbf{${texv(fmtPct(y, 2))}}`)}`);
    lines.push(`${tex(String.raw`\text{BTC Gain} = \text{${T("期初持币", "starting holdings")}}\ ${texv(fmtNum(START.btc, 0))} \times ${texv(fmtPct(y, 2))} = \mathbf{${texv(fmtNum(g, 1))}}\ \text{BTC}`)}${T("；本期持币变化 ", "; change in holdings this period ")}${bought >= 0 ? "+" : ""}${fmtNum(bought, 0)} BTC${bought > 0 && g < bought ? T("——差额属于新股东。", " — the difference belongs to new shareholders.") : T("。", ".")}`);
    lines.push(tex(String.raw`\text{BTC \$ Gain} = ${texv(fmtNum(g, 1))} \times ${texv(fmtUsd(e.px))} = \mathbf{${texv(fmtUsd(dg))}}`));
    const note = Math.abs(y - netChg) > 0.005
      ? `<span class="warn">${T("毛口径与净口径分歧：BTC Yield 没有扣除新增的优先索取权、也不承认美元储备——这就是阶段 16.1 讲的“毛与净”。", "Gross and net disagree: BTC Yield ignores new senior claims and gives no credit for the USD reserve — the gross-versus-net gap of Stage 16.1.")}</span>`
      : `<span class="ok">${T("毛口径与净口径基本一致：没有新增优先索取权或现金变化。", "Gross and net roughly agree: no new senior claims or cash changes.")}</span>`;
    lines.push(`${tex(String.raw`\text{${T("每股净比特币", "Net BTC per share")}} = \frac{\text{${T("净储备", "Net Reserve")}}}{\text{${T("股数", "shares")}}}`)}${T("：", ": ")}${fmtUsd(net0, 2)} → ${fmtUsd(net1, 2)} (${fmtPct(netChg, 2)}) ${note}`);
    q("#yg-log").innerHTML = lines.map((l) => `<div>${l}</div>`).join("");
  }

  function paintQ() {
    qv.forEach((v, i) => { q("#yg-qv-" + i).textContent = v; });
    const base = qv[0];
    let rows = "", sumNew = 0, chain = 1;
    for (let i = 1; i < 5; i++) {
      const newQ = (qv[i] - qv[i - 1]) / base;
      const qoq = qv[i] / qv[i - 1] - 1;
      sumNew += newQ; chain *= 1 + qoq;
      rows += `<tr style="border-top:1px solid var(--line)"><td>Q${i}</td><td>${fmtPct(newQ, 1)}</td><td>${fmtPct(qoq, 1)}</td><td>${fmtPct(sumNew, 1)}</td><td>${fmtPct(chain - 1, 1)}</td></tr>`;
    }
    q("#yg-qtab").innerHTML = `<table style="width:100%;border-collapse:collapse;font-size:13px;margin:8px 0"><tr><th>${T("季度", "Quarter")}</th><th>${T("2026 口径（相对年初）", "2026 convention (vs start)")}</th><th>${T("环比口径", "Quarter on quarter")}</th><th>${T("2026 口径累加", "2026 running sum")}</th><th>${T("环比连乘", "Q-o-Q compounded")}</th></tr>${rows}</table>
      <div class="demo-out">${T("两列累计值永远相等（都等于 ", "The two cumulative columns always match (both equal ")}${tex(String.raw`\frac{\mathrm{BPS}_{\text{${T("期末", "end")}}}}{\mathrm{BPS}_{\text{${T("年初", "start")}}}} - 1`)}${T("），但季度数不同：2026 口径可以直接相加，也更容易出现负的季度。", "), but the quarterly figures differ: 2026-style quarters simply add, and negative quarters show up more readily.")}</div>`;
  }

  paint();
  paintQ();
}
