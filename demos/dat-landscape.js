// 交互演示：DAT 全景表——按资产、类型筛选，按持仓排序；拖动比特币价格看美元市值；
// 计算集中度（第一名份额、前五份额、赫芬达尔指数）。数据全部来自 _research/dat-facts.md，并注明日期与来源。
import { btcNav, fmtNum, fmtPct, fmtBig } from "./_fin.js";

export default function mount(root, lang) {
  const en = lang === "en";
  const T = (zh, e) => (en ? e : zh);

  const TRACKER_TOTAL = 1272886; // bitcointreasuries.net，约 196 家上市公司（2026 年 9 月下旬，无时间戳）
  // [名称, 代码, 资产, 数量, 截至, 类型(dat/miner/fin/op), mNAV 文字, 结构说明, 有无质押]
  const ROWS = [
    ["Strategy", "MSTR", "BTC", 846000, "2026-09-20", "dat", T("1.01 倍（2026 口径，8-21）", "1.01x (2026 def., Aug 21)"), T("可转债 + 5 只优先股；无质押", "Converts + 5 preferreds; nothing pledged"), false],
    ["Twenty One", "XXI", "BTC", 43514, T("2026-09 下旬（榜单）", "late Sep 2026 (tracker)"), "dat", T("0.68 倍（市值口径）", "0.68x (basic)"), T("Tether/Bitfinex 控股", "Controlled by Tether/Bitfinex"), false],
    ["Metaplanet", "3350.T", "BTC", 43000, "2026-07-02", "dat", T("0.58 / 0.73 / 0.79 倍（市值/稀释/EV）", "0.58 / 0.73 / 0.79x (basic/diluted/EV)"), T("比特币抵押信用额度 + 优先股", "BTC-secured credit line + preferreds"), true],
    ["MARA", "MARA", "BTC", 35577, T("2026-09 下旬（榜单）", "late Sep 2026 (tracker)"), "miner", "–", T("矿企：比特币是产品", "Miner: bitcoin is its product"), false],
    ["Strive", "ASST", "BTC", 26355, "2026-09-18", "dat", T("约 1.33 倍（增值溢价 33%）", "~1.33x (accretion premium 33%)"), T("只有 SATA 优先股；零债务", "SATA preferred only; zero debt"), false],
    ["Bullish", "", "BTC", 22000, T("2026-09 下旬（榜单）", "late Sep 2026 (tracker)"), "fin", "–", T("交易所", "Exchange"), false],
    ["Coinbase", "COIN", "BTC", 17311, T("2026-09 下旬（榜单）", "late Sep 2026 (tracker)"), "fin", "–", T("交易所", "Exchange"), false],
    ["Trump Media", "DJT", "BTC", 14139, T("2026-07-31（10-Q；来源冲突）", "2026-07-31 (10-Q; sources conflict)"), "op", "–", T("约 4,261 BTC 为可转债抵押", "About 4,261 BTC pledged for converts"), true],
    ["CleanSpark", "CLSK", "BTC", 13703, T("2026-09 下旬（榜单）", "late Sep 2026 (tracker)"), "miner", "–", T("矿企", "Miner"), false],
    ["Tesla", "TSLA", "BTC", 11509, "2026-06-30", "op", "–", T("经营公司，顺便持币，未卖出", "Operating company; incidental holder; no sales"), false],
    ["GameStop", "GME", "BTC", 4710, "2026-08-01", "op", "–", T("4,709 BTC 质押用于备兑期权", "4,709 BTC pledged for covered calls"), true],
    ["Nakamoto", "NAKA", "BTC", 4467, T("2026-06（报道）", "Jun 2026 (press)"), "dat", "–", T("USDT 贷款，质押 ≥ 2,000 BTC", "USDT loan, ≥ 2,000 BTC pledged"), true],
    ["Bitmine", "BMNR", "ETH", 5983940, "2026-09-21", "dat", T("高于 1（DWF，2026-09）", "above 1 (DWF, Sep 2026)"), T("约 507 万 ETH 在质押", "~5.07M ETH staked"), false],
    ["SharpLink", "SBET", "ETH", 888938, "2026-08-03", "dat", "–", T("回购约 4,170 万美元股票", "~$41.7M of stock bought back"), false],
    ["Forward Industries", "FWDI", "SOL", 8160000, "2026-09-21", "dat", "–", T("Solana 财库", "Solana treasury"), false],
    ["DeFi Development", "DFDV", "SOL", 2490000, "2026-09-21", "dat", "–", T("3 亿美元优先股 ATM", "$300M preferred ATM"), false],
    ["Upexi", "UPXI", "SOL", 2340000, "2026-06-30", "dat", "–", T("Solana 财库", "Solana treasury"), false],
  ];
  const TYPE = { dat: T("DAT", "DAT"), miner: T("矿企", "Miner"), fin: T("交易所/金融", "Exchange/financial"), op: T("经营公司", "Operating co.") };

  const st = { asset: "BTC", type: "all", sort: "amt", px: 84000 };

  root.innerHTML = `
    <div class="demo">
      <div class="demo-head">${T("🗺️ DAT 全景表：谁持有什么、截至何时、背着什么结构", "🗺️ DAT landscape: who holds what, as of when, with what structure")}</div>
      <div class="demo-grid">
        <div class="demo-block">
          <div class="demo-label">${T("资产", "Asset")}</div>
          <div class="demo-seg" id="dl-asset"><button data-v="BTC" class="on">BTC</button><button data-v="ETH">ETH</button><button data-v="SOL">SOL</button></div>
        </div>
        <div class="demo-block">
          <div class="demo-label">${T("公司类型", "Company type")}</div>
          <div class="demo-seg" id="dl-type"><button data-v="all" class="on">${T("全部", "All")}</button><button data-v="dat">${T("只看 DAT", "DATs only")}</button><button data-v="non">${T("非 DAT", "Non-DATs")}</button></div>
        </div>
      </div>
      <div class="demo-grid">
        <div class="demo-block">
          <div class="demo-label">${T("排序", "Sort by")}</div>
          <div class="demo-btns" id="dl-sort"><button class="demo-btn active" data-v="amt">${T("持仓", "Holdings")}</button><button class="demo-btn" data-v="name">${T("名称", "Name")}</button><button class="demo-btn" data-v="pledge">${T("有质押在前", "Pledged first")}</button></div>
        </div>
        <div class="demo-block" id="dl-pxwrap">
          <label class="demo-label">${T("比特币价格（用于换算美元）：", "Bitcoin price (for dollar values): ")}<b id="dl-v-px"></b></label>
          <input class="demo-slider" type="range" id="dl-px" min="30000" max="200000" step="1000" value="${st.px}" />
        </div>
      </div>
      <div class="stat-row" id="dl-stats"></div>
      <div id="dl-table" style="overflow-x:auto"></div>
      <div class="demo-log" id="dl-log"></div>
      <p class="demo-tip">${T(
        "先在 BTC 下选“全部”：第一名份额和赫芬达尔指数说明这是“一个巨人加一群追随者”。再选“非 DAT”：矿企、交易所、特斯拉都持币，但 mNAV 对它们没有意义。最后点“有质押在前”：2026 年被迫卖币还债的，正是这几行。",
        "Start with BTC and “All”: the leader's share and the Herfindahl index show “one giant and its followers.” Then pick “Non-DATs”: miners, exchanges and Tesla all hold bitcoin, but mNAV means nothing for them. Finally sort by “Pledged first”: the companies forced to sell coins to repay debt in 2026 sit in those rows."
      )}</p>
    </div>`;

  const q = (s) => root.querySelector(s);

  const paint = () => {
    q("#dl-v-px").textContent = "$" + fmtNum(st.px, 0);
    q("#dl-pxwrap").style.opacity = st.asset === "BTC" ? 1 : 0.4;
    let rows = ROWS.filter((r) => r[2] === st.asset);
    if (st.type === "dat") rows = rows.filter((r) => r[5] === "dat");
    if (st.type === "non") rows = rows.filter((r) => r[5] !== "dat");
    if (st.sort === "amt") rows.sort((a, b) => b[3] - a[3]);
    if (st.sort === "name") rows.sort((a, b) => a[0].localeCompare(b[0]));
    if (st.sort === "pledge") rows.sort((a, b) => (b[8] - a[8]) || (b[3] - a[3]));

    const tot = rows.reduce((s, r) => s + r[3], 0);
    const isBtc = st.asset === "BTC";
    q("#dl-table").innerHTML = `<table style="width:100%;border-collapse:collapse;font-size:.88em">
      <tr style="text-align:left;border-bottom:1px solid var(--line)"><th>${T("公司", "Company")}</th><th>${T("持仓", "Holdings")}</th>${isBtc ? `<th>${T("美元值", "USD value")}</th>` : ""}<th>${T("截至", "As of")}</th><th>${T("类型", "Type")}</th><th>mNAV</th><th>${T("结构", "Structure")}</th></tr>
      ${rows.map((r) => `<tr style="border-bottom:1px solid var(--line)">
        <td><b>${r[0]}</b> <span class="demo-meta">${r[1]}</span></td>
        <td>${fmtNum(r[3], 0)} ${r[2]}</td>
        ${isBtc ? `<td>$${fmtBig(btcNav(r[3], st.px), 1)}</td>` : ""}
        <td class="demo-meta">${r[4]}</td>
        <td><span class="pill ${r[5] === "dat" ? "ok" : ""}">${TYPE[r[5]]}</span></td>
        <td>${r[6]}</td>
        <td>${r[8] ? `<span class="pill bad">${T("有质押", "pledged")}</span> ` : ""}${r[7]}</td></tr>`).join("")}
    </table>`;

    const lines = [];
    if (isBtc) {
      const shares = rows.map((r) => r[3] / tot);
      const hhi = shares.reduce((s, x) => s + x * x, 0);
      const top = rows.slice().sort((a, b) => b[3] - a[3]);
      const top1 = top.length ? top[0][3] / tot : 0;
      const top5 = top.slice(0, 5).reduce((s, r) => s + r[3], 0) / tot;
      const mstrShare = 846000 / TRACKER_TOTAL;
      q("#dl-stats").innerHTML = [
        [T("所列公司合计", "Shown companies, total"), fmtNum(tot, 0) + " BTC", "acc"],
        [T("按假设价格的美元值", "Value at assumed price"), "$" + fmtBig(btcNav(tot, st.px), 1), ""],
        [T("第一名份额（所列范围）", "Leader's share (of shown)"), fmtPct(top1, 1), top1 > 0.5 ? "neg" : ""],
        [T("前五份额（所列范围）", "Top-five share (of shown)"), fmtPct(top5, 1), ""],
        [T("赫芬达尔指数", "Herfindahl index"), fmtNum(hhi, 3), hhi > 0.25 ? "neg" : "pos"],
      ].map(([k, v, c]) => `<div class="stat"><div class="k">${k}</div><div class="v ${c}">${v}</div></div>`).join("");
      lines.push(`${T("按榜单全口径：约 196 家上市公司合计约 ", "On the tracker's full count: about 196 listed companies hold about ")}${fmtNum(TRACKER_TOTAL, 0)} BTC${T("，Strategy 占 ", "; Strategy's share is ")}<b>${fmtPct(mstrShare, 1)}</b>${T("，按你设定的价格约值 $", ", worth about $")}${fmtBig(btcNav(TRACKER_TOTAL, st.px), 1)}${T("。", " at your price.")}`);
      lines.push(`${T("赫芬达尔指数 = 各家份额平方之和；", "Herfindahl index = sum of squared shares; ")}${hhi > 0.25 ? `<span class="bad">${T("高于 0.25，属于“高度集中”。", "above 0.25, i.e. “highly concentrated.”")}</span>` : `<span class="ok">${T("低于 0.25，集中度不算高。", "below 0.25, not highly concentrated.")}</span>`}`);
      const pledged = rows.filter((r) => r[8]);
      if (pledged.length) lines.push(`<span class="warn">${T("有质押或抵押的：", "With pledged coins or collateral: ")}${pledged.map((r) => r[0]).join(T("、", ", "))}${T("——熊市里这类结构最容易被迫卖币。", " — the structures most likely to force coin sales in a bear market.")}</span>`);
    } else {
      q("#dl-stats").innerHTML = [
        [T("所列公司合计", "Shown companies, total"), fmtNum(tot, 0) + " " + st.asset, "acc"],
        [T("第一名份额", "Leader's share"), tot ? fmtPct(Math.max(...rows.map((r) => r[3])) / tot, 1) : "–", ""],
      ].map(([k, v, c]) => `<div class="stat"><div class="k">${k}</div><div class="v ${c}">${v}</div></div>`).join("");
      lines.push(`${T("以太坊与 Solana 可以质押产生代币计价的收益，比特币不能；但收益随代币价格波动，并带来锁定期与技术风险。本课事实表未收录这两种资产的价格，所以这里只显示数量。", "Ether and Solana can be staked for a token-denominated yield, bitcoin cannot; but the yield moves with the token price and brings lock-ups and technical risk. Our fact sheet does not record prices for these assets, so only quantities are shown.")}`);
    }
    lines.push(`<span class="demo-meta">${T("数据每周都在变；以公司披露与 bitcointreasuries.net 实时数据为准。不构成投资建议。", "These figures change weekly; check company disclosures and bitcointreasuries.net. Not investment advice.")}</span>`);
    q("#dl-log").innerHTML = lines.map((l) => `<div>${l}</div>`).join("");
  };

  const seg = (id, key) => root.querySelectorAll(`#${id} button`).forEach((b) => b.addEventListener("click", () => {
    st[key] = b.dataset.v;
    root.querySelectorAll(`#${id} button`).forEach((o) => o.classList.toggle(id === "dl-sort" ? "active" : "on", o === b));
    paint();
  }));
  seg("dl-asset", "asset");
  seg("dl-type", "type");
  seg("dl-sort", "sort");
  q("#dl-px").addEventListener("input", (e) => { st.px = +e.target.value; paint(); });
  paint();
}
