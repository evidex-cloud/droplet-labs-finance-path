// 交互演示：ATM 执行台——橙子公司用 ATM 卖股：调 mNAV、卖出规模、成交量参与率、佣金与波动率，
// 看执行天数、价格冲击（平方根律）、到手净价、买到多少 BTC、每股比特币变化；对照包销增发；
// 还可以切换“卖股买币”与“卖股换美元储备”（Strategy 2025-12 与 2026-08 的做法）。
import { issueAndBuy, monthsCovered, fmtPct, fmtNum, fmtUsd, fmtBig, tex } from "./_fin.js";
import { lineChart, chartBlock } from "./_chart.js";

const texv = (s) => String(s).replace(/\$/g, "\\$").replace(/,/g, "{,}").replace(/%/g, "\\%");

export default function mount(root, lang) {
  const en = lang === "en";
  const T = (zh, e) => (en ? e : zh);

  // 橙子公司基准（AUTHORING §0.2）
  const BTC = 10000, SH = 100e6, BTCP = 100000, NAVPS = (BTC * BTCP) / SH; // 每股比特币净值 10 美元
  const ADV = 5e6;          // 日均成交 500 万股（示意）
  const OBLIG = 15e6;       // 年度优先股股息 1,500 万美元
  const UW_DISC = 0.04, UW_FEE = 0.02; // 包销：折扣 4% + 承销费 2%（示意）

  const st = { mnav: 1.5, sell: 10, part: 10, comm: 2, vol: 4, use: "btc" };

  root.innerHTML = `
    <div class="demo">
      <div class="demo-head">${T("💧 ATM 执行台：用滴管卖股，算清每一滴的成本", "💧 ATM execution desk: selling stock with an eyedropper, and what each drop costs")}</div>
      <div class="demo-grid">
        <div class="demo-block">
          <label class="demo-label">${T(`mNAV（${tex(String.raw`\text{股价} \div \text{每股比特币净值 } 10\ \text{美元}`)}）`, `mNAV (${tex(String.raw`\text{share price} \div \$10\ \text{of bitcoin per share}`)})`)}${T("：", ": ")}<b id="atm-mnav-v"></b></label>
          <input class="demo-slider" id="atm-mnav" type="range" min="0.8" max="3" step="0.05" value="${st.mnav}" />
          <label class="demo-label">${T("卖出股数（百万股）", "Shares to sell (millions)")}${T("：", ": ")}<b id="atm-sell-v"></b></label>
          <input class="demo-slider" id="atm-sell" type="range" min="1" max="30" step="1" value="${st.sell}" />
        </div>
        <div class="demo-block">
          <label class="demo-label">${T("成交量参与率（占日均 500 万股）", "Participation rate (share of 5M daily volume)")}${T("：", ": ")}<b id="atm-part-v"></b></label>
          <input class="demo-slider" id="atm-part" type="range" min="2" max="40" step="1" value="${st.part}" />
          <label class="demo-label">${T("佣金", "Commission")}${T("：", ": ")}<b id="atm-comm-v"></b> · ${T("日波动率", "daily volatility")}${T("：", ": ")}<b id="atm-vol-v"></b></label>
          <input class="demo-slider" id="atm-comm" type="range" min="0" max="3" step="0.25" value="${st.comm}" />
          <input class="demo-slider" id="atm-vol" type="range" min="1" max="8" step="0.5" value="${st.vol}" />
        </div>
      </div>
      <div class="demo-block">
        <label class="demo-label">${T("钱拿去做什么？", "What is the money for?")}</label>
        <div class="demo-seg" id="atm-use">
          <button data-u="btc" class="on">${T("买比特币（飞轮）", "Buy bitcoin (flywheel)")}</button>
          <button data-u="usd">${T("存成美元储备（付股息）", "Hold as a USD reserve (for dividends)")}</button>
        </div>
      </div>
      <div class="stat-row" id="atm-stats"></div>
      <div class="cmp" id="atm-cmp"></div>
      <div class="demo-block" id="atm-chart"></div>
      <div class="demo-block"><div class="demo-log" id="atm-log"></div></div>
      <p class="demo-tip">${T(
        "先把 mNAV 拖到 1.0：卖股买币已经在稀释了——成本把盈亏平衡线推到 1 倍以上。再把参与率从 10% 拖到 30%：卖得更快，冲击更大。最后切到“存成美元储备”：每股比特币一定下降，换来的是股息覆盖月数。这正是溢价消失后 DAT 面对的取舍。",
        "Drag mNAV to 1.0 first: selling stock to buy bitcoin already dilutes, because costs push breakeven above 1x. Then drag participation from 10% to 30%: faster, but more impact. Finally switch to “hold as a USD reserve”: BTC per share always falls, and what you buy is months of dividend coverage. That is the trade-off a DAT faces once the premium is gone."
      )}</p>
    </div>`;

  const q = (s) => root.querySelector(s);

  // 平方根冲击律（示意系数 1）：冲击 ≈ 日波动率 × √参与率
  const impactOf = (vol, part) => vol * Math.sqrt(part);
  const bpsChange = (px, newShares, use) => {
    if (use === "usd") return SH / (SH + newShares) - 1; // 股数增加、比特币不变
    return issueAndBuy({ btc: BTC, shares: SH, btcPrice: BTCP, px, newShares }).change;
  };

  const paint = () => {
    const price = st.mnav * NAVPS, n = st.sell * 1e6, part = st.part / 100, comm = st.comm / 100, vol = st.vol / 100;
    const impact = impactOf(vol, part);
    const days = Math.ceil(n / (ADV * part));
    const netPx = price * (1 - impact) * (1 - comm);
    const uwPx = price * (1 - UW_DISC) * (1 - UW_FEE);
    const gross = n * price, net = n * netPx, uwNet = n * uwPx;
    const chg = bpsChange(netPx, n, st.use), uwChg = bpsChange(uwPx, n, st.use);
    const beATM = 1 / ((1 - impact) * (1 - comm)), beUW = 1 / ((1 - UW_DISC) * (1 - UW_FEE));
    const btcBought = net / BTCP;

    q("#atm-mnav-v").textContent = st.mnav.toFixed(2) + "x · " + fmtUsd(price, 2);
    q("#atm-sell-v").textContent = st.sell + "M";
    q("#atm-part-v").textContent = st.part + "%";
    q("#atm-comm-v").textContent = st.comm.toFixed(2) + "%";
    q("#atm-vol-v").textContent = st.vol.toFixed(1) + "%";

    q("#atm-stats").innerHTML = `
      <div class="stat"><div class="k">${T("执行天数", "Days to finish")}</div><div class="v">${days}</div></div>
      <div class="stat"><div class="k">${T("价格冲击", "Market impact")}</div><div class="v neg">${fmtPct(impact, 2)}</div></div>
      <div class="stat"><div class="k">${T("到手净价 / 股", "Net per share")}</div><div class="v">${fmtUsd(netPx, 2)}</div></div>
      <div class="stat"><div class="k">${T("净收入", "Net proceeds")}</div><div class="v">${fmtUsd(net / 1e6, 1)}M</div></div>
      <div class="stat"><div class="k">${T("盈亏平衡 mNAV", "Breakeven mNAV")}</div><div class="v acc">${fmtNum(beATM, 3)}x</div></div>`;

    const usdLine = st.use === "usd"
      ? `${T("新增股息覆盖", "Dividend coverage added")}${T("：", ": ")}<b>${fmtNum(monthsCovered(net, OBLIG), 0)}</b> ${T("个月（年度股息 1,500 万美元）", "months (annual dividends $15M)")}`
      : `${T("买入约", "Buys about")} <b>${fmtNum(btcBought, 0)}</b> BTC`;
    const usdLineUw = st.use === "usd"
      ? `${T("新增股息覆盖", "Dividend coverage added")}${T("：", ": ")}<b>${fmtNum(monthsCovered(uwNet, OBLIG), 0)}</b> ${T("个月", "months")}`
      : `${T("买入约", "Buys about")} <b>${fmtNum(uwNet / BTCP, 0)}</b> BTC`;
    q("#atm-cmp").innerHTML = `
      <div class="cmp-cell hl"><h5>ATM · ${T("按市价分批卖", "sold in batches at market")}</h5>
        <div class="stat-row" style="margin-top:0">
          <div class="stat"><div class="k">${T("每股比特币变化", "Change in BTC per share")}</div><div class="v ${chg >= 0 ? "pos" : "neg"}">${chg >= 0 ? "+" : ""}${fmtPct(chg, 2)}</div></div>
        </div>
        <div class="demo-meta">${usdLine} · ${T("毛额", "gross")} ${fmtBig(gross)} → ${T("净额", "net")} ${fmtBig(net)}</div>
      </div>
      <div class="cmp-cell cold"><h5>${T("包销增发（折扣 4% + 承销费 2%，示意）", "Underwritten deal (4% discount + 2% spread, illustrative)")}</h5>
        <div class="stat-row" style="margin-top:0">
          <div class="stat"><div class="k">${T("每股比特币变化", "Change in BTC per share")}</div><div class="v ${uwChg >= 0 ? "pos" : "neg"}">${uwChg >= 0 ? "+" : ""}${fmtPct(uwChg, 2)}</div></div>
        </div>
        <div class="demo-meta">${usdLineUw} · ${T("盈亏平衡 mNAV", "breakeven mNAV")} ${fmtNum(beUW, 3)}x · ${T("一天完成", "done in a day")}</div>
      </div>`;

    const res = lineChart({
      fns: [
        { f: (m) => bpsChange(m * NAVPS * (1 - impact) * (1 - comm), n, st.use) * 100, cls: "line5" },
        { f: (m) => bpsChange(m * NAVPS * (1 - UW_DISC) * (1 - UW_FEE), n, st.use) * 100, cls: "line2" },
        { f: () => 0, cls: "line3" },
      ],
      lo: 0.8, hi: 3, xlabel: T("mNAV（倍）", "mNAV (x)"), markerX: st.mnav, markerLabel: T("当前", "now"), uid: "atm",
    });
    q("#atm-chart").innerHTML = `<div class="demo-label">${T("每股比特币变化（%）随 mNAV 的变化", "Change in BTC per share (%) as mNAV varies")}</div>` +
      chartBlock(res, [["var(--btc)", "ATM"], ["var(--blue)", T("包销", "Underwritten")], ["var(--red)", T("零线：不增不减", "zero line: no change")]]);

    const lines = [];
    if (st.use === "usd") {
      lines.push(`<span class="warn">${T("卖股换美元：比特币没有增加、股数增加了，所以每股比特币必然下降", "Selling for dollars: no new bitcoin, more shares, so BTC per share must fall")} ${fmtPct(chg, 2)}${T("。换来的是股息保险——Strategy 2025-12-01 以约 1.17 倍 mNAV 卖股建立 14.4 亿美元美元储备，就是这笔交易。", ". What you buy is dividend insurance; Strategy's $1.44B USD Reserve, built on 2025-12-01 by selling stock at about 1.17x mNAV, was this trade.")}</span>`);
    } else if (chg > 0.02) {
      lines.push(`<span class="ok">${T("明显增值：卖价扣成本后仍远高于每股比特币净值，飞轮在转。", "Clearly accretive: even after costs the sale price is well above the bitcoin value per share. The flywheel is turning.")}</span>`);
    } else if (chg > 0) {
      lines.push(`<span class="warn">${T("勉强增值：溢价大部分被佣金与冲击吃掉了。", "Barely accretive: commissions and impact have eaten most of the premium.")}</span>`);
    } else {
      lines.push(`<span class="bad">${T("稀释：到手净价低于每股比特币净值 10 美元，每卖一股，老股东分到的比特币就少一点。", "Dilutive: the net price is below the $10 of bitcoin per share, so every share sold leaves existing holders with a little less bitcoin.")}</span>`);
    }
    lines.push(`${T("卖完", "Selling")} ${st.sell}M ${T("股需要", "shares takes")} ${days} ${T("个交易日；冲击", "trading days; impact")} ${fmtPct(impact, 2)}${T("、佣金", ", commission")} ${fmtPct(comm, 2)} → ${tex(String.raw`\mathrm{mNAV}_{\text{${T("盈亏平衡", "breakeven")}}} = \dfrac{1}{(1 - ${texv(fmtPct(impact, 2))})(1 - ${texv(fmtPct(comm, 2))})} = ${texv(fmtNum(beATM, 3))}\times`)}${T("。", ".")}`);
    if (st.part >= 25) lines.push(`<span class="warn">${T(`参与率很高：卖得快，但冲击随 ${tex(String.raw`\sqrt{\text{参与率}}`)} 上升，还可能把“有人在大量卖”的信号暴露给市场。`, `A high participation rate: fast, but impact grows with ${tex(String.raw`\sqrt{\text{participation}}`)}, and heavy selling may become visible to the market.`)}</span>`);
    if (chg > uwChg) lines.push(`${T("ATM 比包销多出", "The ATM beats the underwritten deal by")} ${fmtPct(chg - uwChg, 2)} ${T("的每股比特币——代价是慢。", "of BTC per share; the price is speed.")}`);
    else lines.push(`${T("这组参数下包销反而更好：冲击成本已经超过一次性折扣。", "With these settings the underwritten deal is better: impact costs now exceed the one-time discount.")}`);
    q("#atm-log").innerHTML = lines.map((l) => `<div>${l}</div>`).join("");
  };

  const bind = (id, key) => q(id).addEventListener("input", (e) => { st[key] = +e.target.value; paint(); });
  bind("#atm-mnav", "mnav"); bind("#atm-sell", "sell"); bind("#atm-part", "part"); bind("#atm-comm", "comm"); bind("#atm-vol", "vol");
  root.querySelectorAll("#atm-use button").forEach((b) => b.addEventListener("click", () => {
    st.use = b.dataset.u;
    root.querySelectorAll("#atm-use button").forEach((o) => o.classList.toggle("on", o === b));
    paint();
  }));
  paint();
}
