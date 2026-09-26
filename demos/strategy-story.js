// 交互演示：Strategy 时间线——按类别筛选事件；在公司披露的时点之间切换，看持仓与（按你设定的比特币价格）市值；
// 最新时点对照总成本算浮盈浮亏；最后算一笔 2026 年“卖币再买回”的账。所有数据来自 _research/dat-facts.md。
import { btcNav, fmtNum, fmtUsd, fmtBig, fmtPct } from "./_fin.js";

export default function mount(root, lang) {
  const en = lang === "en";
  const T = (zh, e) => (en ? e : zh);

  // 公司文件披露的持仓时点
  const H = [
    { d: "2020-08-11", btc: 21454, cost: 250e6 },
    { d: "2024-12-31", btc: 447470 },
    { d: "2025-12-31", btc: 672500, approx: true },
    { d: "2026-02-13", btc: 717131 },
    { d: "2026-05-03", btc: 818334 },
    { d: "2026-06-28", btc: 847363, avg: 75651 },
    { d: "2026-07-05", btc: 843775 },
    { d: "2026-08-23", btc: 840447 },
    { d: "2026-08-30", btc: 845050 },
    { d: "2026-09-20", btc: 846000, cost: 63.80e9, avg: 75416 },
  ];

  // cat: buy 买币 / fin 融资 / rule 会计与规则 / stress 熊市应对
  const E = [
    ["2020-08-11", "buy", T("第一笔：21,454 BTC，2.5 亿美元（自有现金）", "First purchase: 21,454 BTC for $250M (own cash)")],
    ["2020-09", "rule", T("董事会通过财库储备政策：比特币为主要储备资产", "Board adopts Treasury Reserve Policy: bitcoin as primary reserve asset")],
    ["2020-12-09", "fin", T("第一期可转债：5.5 亿美元 + 1 亿期权，票息 0.750%，2025 年到期", "First convertible: $550M + $100M option, 0.750%, due 2025")],
    ["2024-08-07", "fin", T("1 拆 10 股票拆分", "10-for-1 stock split")],
    ["2024-10-30", "fin", T("“21/21 计划”：三年融资 420 亿美元", "“21/21 Plan”: raise $42B over three years")],
    ["2025-01-01", "rule", T("采用 ASU 2023-08 公允价值会计；留存收益 +127.5 亿美元", "ASU 2023-08 fair value adopted; retained earnings +$12.75B")],
    ["2025-02-05", "fin", T("改名 Strategy；首只优先股 STRK（8%，可转换）", "Rebrand to Strategy; first preferred STRK (8%, convertible)")],
    ["2025-03-25", "fin", T("STRF 上市（10% 累积，最高级优先股）", "STRF lists (10% cumulative, most senior preferred)")],
    ["2025-05", "fin", T("“42/42 计划”：840 亿美元", "“42/42 Plan”: $84B")],
    ["2025-06-10", "fin", T("STRD 上市（10% 非累积）", "STRD lists (10% non-cumulative)")],
    ["2025-07-29", "fin", T("STRC 上市（浮动利率，初始 9.00%）", "STRC lists (variable rate, 9.00% at launch)")],
    ["2025-10-06", "mkt", T("比特币历史新高，盘中约 12.62 万美元", "Bitcoin all-time high, about $126.2k intraday")],
    ["2025-10-27", "rule", T("标普给予发行人评级 B-", "S&P assigns a B- issuer rating")],
    ["2025-11-13", "fin", T("STRE 上市（欧元，10%）", "STRE lists (euro, 10%)")],
    ["2025-12-01", "stress", T("建立美元储备 14.4 亿美元（约 1.17 倍 mNAV 卖股）", "USD Reserve created: $1.44B (stock sold at ~1.17x mNAV)")],
    ["2026-01-06", "rule", T("MSCI 暂不剔除 DAT，冻结股数增加，开启新咨询", "MSCI keeps DATs for now, freezes share-count increases, opens new consultation")],
    ["2026-03-23", "fin", T("新 ATM：普通股 210 亿、STRC 210 亿、STRK 21 亿美元", "New ATMs: common $21B, STRC $21B, STRK $2.1B")],
    ["2026-05-19", "stress", T("以 13.8 亿美元回购 15 亿美元 2029 年可转债", "Repurchases $1.5B of 2029 converts for $1.38B")],
    ["2026-05-31", "stress", T("2022 年以来首次卖币：32 BTC，用于 STRC 股息", "First sale since 2022: 32 BTC, for STRC dividends")],
    ["2026-06-28", "buy", T("持仓峰值 847,363 BTC", "Holdings peak: 847,363 BTC")],
    ["2026-06-29", "stress", T("数字信用资本框架；STRC 利率 7 月起 12.00%", "Digital Credit Capital Framework; STRC at 12.00% from July")],
    ["2026-07-01", "mkt", T("比特币盘中低点约 5.78 万美元，较高点约 −54%", "Bitcoin intraday low about $57.8k, roughly −54% from the peak")],
    ["2026-07", "stress", T("卖出 3,588 BTC（约 5.9–6.1 万美元）付股息与储备；首次回购 STRC", "Sells 3,588 BTC (~$59–61k) for dividends and reserve; first STRC buybacks")],
    ["2026-08-09", "stress", T("再卖 3,328 BTC，所得用于回购 STRC", "Sells another 3,328 BTC; proceeds fund STRC buybacks")],
    ["2026-08-23", "stress", T("美元储备 51.0 亿 + 新设 USD Cash 15.9 亿美元", "USD Reserve $5.10B + new USD Cash pool $1.59B")],
    ["2026-08-30", "buy", T("恢复买币：4,603 BTC，均价约 80,318 美元", "Buying resumes: 4,603 BTC at ~$80,318")],
    ["2026-09-20", "buy", T("持有 846,000 BTC，均价 75,416 美元", "Holds 846,000 BTC, average cost $75,416")],
    ["2026-09-25", "rule", T("提议优先股改为按日登记股息，10 月 28 日表决", "Proposes daily dividend record dates; vote on Oct 28")],
  ];
  const CAT = { all: T("全部", "All"), buy: T("买币", "Buying"), fin: T("融资工具", "Financing"), rule: T("会计与规则", "Accounting & rules"), stress: T("熊市应对", "Stress & response"), mkt: T("市场", "Market") };
  const CATC = { buy: "var(--btc)", fin: "var(--blue)", rule: "var(--muted)", stress: "var(--red)", mkt: "var(--green)" };

  // 2026 年卖币（来自文件与报道，均价为推算）
  const SALES = [[32, 77135], [3588, 216e6 / 3588], [1638, 63957], [1690, 108.6e6 / 1690]];
  const soldBtc = SALES.reduce((s, [n]) => s + n, 0);
  const proceeds = SALES.reduce((s, [n, p]) => s + n * p, 0);

  const st = { cat: "all", idx: H.length - 1, px: 84000, rebuy: 80000 };

  root.innerHTML = `
    <div class="demo">
      <div class="demo-head">${T("📜 Strategy 时间线：六年、四幕、十个披露时点", "📜 Strategy timeline: six years, four acts, ten disclosed data points")}</div>
      <div class="demo-block">
        <div class="demo-label">${T("按类别筛选事件", "Filter events by type")}</div>
        <div class="demo-seg" id="ss-seg">${Object.keys(CAT).map((k) => `<button data-c="${k}" class="${k === "all" ? "on" : ""}">${CAT[k]}</button>`).join("")}</div>
        <div class="tl" id="ss-tl" style="max-height:260px;overflow:auto;margin-top:8px"></div>
      </div>
      <div class="demo-grid">
        <div class="demo-block">
          <label class="demo-label">${T("披露时点：", "Disclosure date: ")}<b id="ss-v-idx"></b></label>
          <input class="demo-slider" type="range" id="ss-idx" min="0" max="${H.length - 1}" step="1" value="${st.idx}" />
        </div>
        <div class="demo-block">
          <label class="demo-label">${T("假设比特币价格：", "Assumed bitcoin price: ")}<b id="ss-v-px"></b></label>
          <input class="demo-slider" type="range" id="ss-px" min="10000" max="200000" step="1000" value="${st.px}" />
        </div>
      </div>
      <div id="ss-chart"></div>
      <div class="stat-row" id="ss-stats"></div>
      <div class="demo-block">
        <label class="demo-label">${T("2026 年卖出的币若全部买回，买回价：", "If the coins sold in 2026 were all bought back, at a price of: ")}<b id="ss-v-rb"></b></label>
        <input class="demo-slider" type="range" id="ss-rb" min="40000" max="150000" step="1000" value="${st.rebuy}" />
      </div>
      <div class="demo-log" id="ss-log"></div>
      <p class="demo-tip">${T(
        "先点“融资工具”：看工具是怎么一层层加上去的——先可转债，后优先股家族。再点“熊市应对”：2025 年底到 2026 年的动作几乎都是在为“付现金股息”做准备。最后把买回价拖到 6.2 万美元上下：2026 年那笔卖币的账，取决于你站在哪个价格回头看。",
        "Click “Financing” first: see how the tools were stacked one layer at a time — converts first, then the preferred family. Then click “Stress & response”: nearly everything from late 2025 through 2026 was about funding cash dividends. Finally drag the buy-back price around $62k: whether the 2026 sales look good or bad depends on the price you look back from."
      )}</p>
    </div>`;

  const q = (s) => root.querySelector(s);

  const paintTl = () => {
    q("#ss-tl").innerHTML = E.filter(([, c]) => st.cat === "all" || c === st.cat).map(([d, c, txt]) =>
      `<div class="tl-item"><div class="when" style="color:${CATC[c]}">${d} · ${CAT[c]}</div><div>${txt}</div></div>`).join("");
  };

  const paintChart = () => {
    const W = 600, Hh = 190, base = 160, maxB = 850000, bw = 44, gap = (W - 40 - H.length * bw) / (H.length - 1);
    const bars = H.map((h, i) => {
      const x = 20 + i * (bw + gap), hgt = Math.max(2, (h.btc / maxB) * 130);
      const on = i === st.idx;
      return `<rect x="${x.toFixed(1)}" y="${(base - hgt).toFixed(1)}" width="${bw}" height="${hgt.toFixed(1)}" fill="var(--btc)" opacity="${on ? 1 : 0.35}"/>` +
        `<text x="${(x + bw / 2).toFixed(1)}" y="${(base - hgt - 4).toFixed(1)}" text-anchor="middle" font-size="9" fill="var(--ink)">${fmtBig(h.btc, 0)}</text>` +
        `<text x="${(x + bw / 2).toFixed(1)}" y="${base + 13}" text-anchor="middle" font-size="8.5" fill="${on ? "var(--orange-ink)" : "var(--muted)"}">${h.d.slice(2)}</text>`;
    }).join("");
    q("#ss-chart").innerHTML = `<svg viewBox="0 0 ${W} ${Hh}" style="width:100%;height:auto" font-family="Inter, system-ui, sans-serif"><line x1="10" y1="${base}" x2="${W - 10}" y2="${base}" stroke="var(--line)"/>${bars}<text x="${W / 2}" y="${Hh - 6}" text-anchor="middle" font-size="10" fill="var(--muted)">${T("只画公司披露的时点；横轴不是等距时间", "Only disclosed dates are shown; the x-axis is not evenly spaced in time")}</text></svg>`;
  };

  const paint = () => {
    const h = H[st.idx];
    q("#ss-v-idx").textContent = h.d + (h.approx ? T("（约）", " (approx.)") : "");
    q("#ss-v-px").textContent = fmtUsd(st.px);
    q("#ss-v-rb").textContent = fmtUsd(st.rebuy);
    paintChart();
    const mv = btcNav(h.btc, st.px);
    const cost = h.cost != null ? h.cost : h.avg != null ? h.avg * h.btc : null;
    const pnl = cost != null ? mv - cost : null;
    q("#ss-stats").innerHTML = [
      [T("持仓（BTC）", "Holdings (BTC)"), fmtNum(h.btc, 0), "acc"],
      [T("按假设价格的市值", "Value at assumed price"), "$" + fmtBig(mv, 2), ""],
      [T("已披露成本", "Disclosed cost"), cost != null ? "$" + fmtBig(cost, 2) : T("本课未收录", "not in our data"), ""],
      [T("浮盈 / 浮亏", "Unrealized gain / loss"), pnl != null ? (pnl >= 0 ? "+$" : "−$") + fmtBig(Math.abs(pnl), 2) : "–", pnl == null ? "" : pnl >= 0 ? "pos" : "neg"],
    ].map(([k, v, c]) => `<div class="stat"><div class="k">${k}</div><div class="v ${c}">${v}</div></div>`).join("");

    const lines = [];
    const prev = st.idx > 0 ? H[st.idx - 1] : null;
    if (prev) {
      const d = h.btc - prev.btc;
      lines.push(`${T("与上一个披露时点（", "Versus the previous disclosure (")}${prev.d}${T("）相比：", "): ")}<b>${d >= 0 ? "+" : "−"}${fmtNum(Math.abs(d), 0)} BTC</b>${d < 0 ? T("——净卖出", " — net selling") : ""}`);
    }
    if (h.avg) {
      const be = h.avg;
      lines.push(`${T("平均成本 ", "Average cost ")}${fmtUsd(be)}${T("：比特币低于这个价格时，整体持仓处于浮亏。当前假设价格相对均价 ", ": below that bitcoin price the whole position shows a loss. Your assumed price versus the average: ")}<b>${st.px >= be ? "+" : ""}${fmtPct(st.px / be - 1, 1)}</b>`);
    }
    if (st.idx === 0) lines.push(`${T("第一笔每枚约 ", "The first purchase cost about ")}${fmtUsd(250e6 / 21454)}${T("：那时用的还是公司自己的现金。", " per coin — still the company's own cash.")}`);
    const avgSale = proceeds / soldBtc;
    const rebuyCost = soldBtc * st.rebuy;
    const diff = proceeds - rebuyCost;
    lines.push(`${T("2026 年约卖出 ", "About ")}${fmtNum(soldBtc, 0)} BTC${T("，所得约 ", " sold in 2026 for about ")}$${fmtBig(proceeds, 2)}${T("（推算均价约 ", " (derived average about ")}${fmtUsd(avgSale)}${T("）。", ").")}`);
    lines.push(`${T("按 ", "Buying them back at ")}${fmtUsd(st.rebuy)}${T(" 全部买回需 ", " would cost ")}$${fmtBig(rebuyCost, 2)} → ${diff >= 0 ? `<span class="ok">${T("比卖出所得少 ", "less than the proceeds by ")}$${fmtBig(diff, 2)}${T("：事后看，卖币“赚到了”", ": in hindsight the sale “made money”")}</span>` : `<span class="bad">${T("比卖出所得多 ", "more than the proceeds by ")}$${fmtBig(-diff, 2)}${T("：事后看，这是为付股息付出的代价", ": in hindsight, the price paid for funding dividends")}</span>`}`);
    lines.push(`<span class="warn">${T("卖出均价为按文件与报道推算的近似值；本演示只讲机制，不构成投资建议。", "The average sale price is an approximation derived from filings and press reports; this demo explains mechanics only and is not investment advice.")}</span>`);
    q("#ss-log").innerHTML = lines.map((l) => `<div>${l}</div>`).join("");
  };

  root.querySelectorAll("#ss-seg button").forEach((b) => b.addEventListener("click", () => {
    st.cat = b.dataset.c;
    root.querySelectorAll("#ss-seg button").forEach((o) => o.classList.toggle("on", o === b));
    paintTl();
  }));
  q("#ss-idx").addEventListener("input", (e) => { st.idx = +e.target.value; paint(); });
  q("#ss-px").addEventListener("input", (e) => { st.px = +e.target.value; paint(); });
  q("#ss-rb").addEventListener("input", (e) => { st.rebuy = +e.target.value; paint(); });
  paintTl();
  paint();
}
