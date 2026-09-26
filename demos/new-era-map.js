// 交互演示：新金融全景地图——点任一节点看“它是谁的负债、规模（带日期）、主要观念、哪一阶段讲透”；
// 再施加一个冲击（利率上升 / 比特币下跌），用共享引擎真算每个节点受到的影响，看风险沿哪座桥流动。
import { bondPrice, gordon, perpetuity, btcRating, fmtPct, fmtNum, fmtBig, clamp } from "./_fin.js";

export default function mount(root, lang) {
  const en = lang === "en";
  const T = (zh, e) => (en ? e : zh);

  const ZONES = [
    { k: "trad", name: T("传统金融", "Traditional finance"), bg: "var(--blue-soft)", bd: "var(--blue)" },
    { k: "bridge", name: T("桥梁", "The bridges"), bg: "var(--surface-2)", bd: "var(--line)" },
    { k: "chain", name: T("链上世界", "The on-chain world"), bg: "var(--btc-soft)", bd: "var(--btc)" },
    { k: "dat", name: T("数字资产财库公司", "Digital asset treasury companies"), bg: "var(--orange-soft)", bd: "var(--orange-line)" },
    { k: "ai", name: "AI", bg: "var(--green-soft)", bd: "var(--green)" },
  ];

  // 橙子公司：比特币净值 10 亿美元，优先索取权合计 3 亿美元，其中到 F 层 2.5 亿
  const OC_NAV = 1e9, OC_CLAIMS = 300e6;

  const N = [
    { k: "bank", z: "trad", name: T("银行与存款", "Banks & deposits"), size: T("数十万亿美元", "Tens of trillions"),
      whose: T("存款是银行的负债", "Deposits are the bank's liability"), ideas: "②③", st: T("阶段 1.2 · 阶段 10.3", "Stage 1.2 · Stage 10.3"),
      rate: (dy) => { const p = bondPrice(100, 0.03, 0.03 + dy, 10); return { v: p / 100 - 1, txt: T("持有的 10 年期 3% 债券", "10-year 3% bonds held") }; },
      btc: () => ({ v: 0, txt: T("几乎无直接敞口", "Almost no direct exposure") }) },
    { k: "ust", z: "trad", name: T("美国国债", "US Treasuries"), size: T("公众持有约 32.4 万亿美元（2026-09-24）", "About $32.4T held by the public (2026-09-24)"),
      whose: T("美国政府的负债", "The US government's liability"), ideas: "①②", st: T("阶段 4.1 · 阶段 4.5", "Stage 4.1 · Stage 4.5"),
      rate: (dy) => { const p = bondPrice(100, 0.055, 0.055 + dy, 30); return { v: p / 100 - 1, txt: T("30 年期（票息 5.5%）价格", "30-year (5.5% coupon) price") }; },
      btc: () => ({ v: 0, txt: T("无直接敞口", "No direct exposure") }) },
    { k: "stk", z: "trad", name: T("股票", "Stocks"), size: T("美股 60 万亿美元以上；标普 500 约 7,700（2026-09-25）", "US stocks $60T+; S&P 500 about 7,700 (2026-09-25)"),
      whose: T("对公司剩余利润的索取权", "A claim on companies' residual profits"), ideas: "①④", st: T("阶段 5.1 · 阶段 5.3", "Stage 5.1 · Stage 5.3"),
      rate: (dy) => ({ v: gordon(1, 0.08 + dy, 0.04) / gordon(1, 0.08, 0.04) - 1, txt: T("戈登模型：要求回报 8% 起，股息增长 4%", "Gordon model: 8% required return, 4% dividend growth") }),
      btc: () => ({ v: 0, txt: T("间接（风险偏好）", "Indirect (risk appetite)") }) },
    { k: "pc", z: "trad", name: T("基金与私募信贷", "Funds & private credit"), size: T("私募信贷全球约 1.5 万亿—2 万亿美元（2024 年底）", "Private credit about $1.5–2T globally (end-2024)"),
      whose: T("基金份额是基金的负债；贷款是企业的负债", "Fund shares are the fund's liability; loans are companies' liabilities"), ideas: "②③", st: T("阶段 8.4", "Stage 8.4"),
      rate: (dy) => ({ v: 0, pos: dy, txt: T("浮动利率：票息随之上升 ", "Floating rate: coupons rise by ") + fmtNum(dy * 10000, 0) + T(" 个基点，借款人压力加大", " bp; borrowers feel more strain") }),
      btc: () => ({ v: 0, txt: T("无直接敞口", "No direct exposure") }) },
    { k: "etf", z: "bridge", name: T("现货比特币 ETF", "Spot bitcoin ETFs"), size: T("IBIT 净资产约 671 亿美元（2026-09-25）", "IBIT net assets about $67.1B (2026-09-25)"),
      whose: T("基金份额是基金的负债；币由托管人保管", "Shares are the fund's liability; a custodian holds the coins"), ideas: "③", st: T("阶段 12.5 · 阶段 15.5", "Stage 12.5 · Stage 15.5"),
      rate: () => ({ v: null, txt: T("无现金流可折现；持有不生息资产的机会成本上升", "No cash flows to discount; the opportunity cost of a non-yielding asset rises") }),
      btc: (d) => ({ v: -d, txt: T("与比特币一比一", "One-for-one with bitcoin") }) },
    { k: "stable", z: "bridge", name: T("稳定币", "Stablecoins"), size: T("约 3,120 亿美元（2026-09-26）", "About $312B (2026-09-26)"),
      whose: T("发行人的负债，储备以现金和短期国债为主", "The issuer's liability, reserves mainly cash and T-bills"), ideas: "①②③", st: T("阶段 13.2 · 阶段 14.5", "Stage 13.2 · Stage 14.5"),
      rate: (dy) => ({ v: 0, pos: dy, txt: T("面值不变；发行人储备利息每年约多 ", "Par unchanged; issuers' reserve income rises by about ") + fmtBig(312e9 * dy, 1) + T(" 美元", " a year") }),
      btc: () => ({ v: 0, txt: T("法币储备型面值不变，但赎回压力可能上升", "Fiat-backed coins hold par, though redemptions may rise") }) },
    { k: "tbill", z: "bridge", name: T("代币化国债", "Tokenized Treasuries"), size: T("约 150 亿—160 亿美元（2026 年年中）", "About $15–16B (mid-2026)"),
      whose: T("基金份额，背后是短期国债", "Fund shares backed by short-dated Treasuries"), ideas: "①③", st: T("阶段 14.2", "Stage 14.2"),
      rate: (dy) => { const p = bondPrice(100, 0.0424, 0.0424 + dy, 0.25, 4); return { v: p / 100 - 1, txt: T("3 个月期限：价格几乎不动，收益率随之上升", "3-month maturity: price barely moves, yield resets higher") }; },
      btc: () => ({ v: 0, txt: T("无直接敞口", "No direct exposure") }) },
    { k: "tstk", z: "bridge", name: T("代币化股票", "Tokenized stocks"), size: T("约 45 亿美元纪录（2026-08-26，rwa.xyz）", "About $4.5B record (2026-08-26, rwa.xyz)"),
      whose: T("取决于结构：真实股份或合成敞口", "Depends on structure: real shares or synthetic exposure"), ideas: "②③", st: T("阶段 14.3 · 阶段 14.4", "Stage 14.3 · Stage 14.4"),
      rate: (dy) => ({ v: gordon(1, 0.08 + dy, 0.04) / gordon(1, 0.08, 0.04) - 1, txt: T("跟随底层股票", "Follows the underlying stock") }),
      btc: () => ({ v: 0, txt: T("间接", "Indirect") }) },
    { k: "btc", z: "chain", name: T("比特币", "Bitcoin"), size: T("总市值约 1.69 万亿美元，约 8.4 万美元/枚（2026-09-25）", "About $1.69T market value at about $84k per coin (2026-09-25)"),
      whose: T("不是任何人的负债（无对手方）", "Nobody's liability (no counterparty)"), ideas: "②④", st: T("阶段 12.1 · 阶段 12.3", "Stage 12.1 · Stage 12.3"),
      rate: () => ({ v: null, txt: T("无现金流；历史上常对流动性与实际利率敏感", "No cash flows; historically sensitive to liquidity and real rates") }),
      btc: (d) => ({ v: -d, txt: T("市值减少约 ", "Market value falls by about ") + fmtBig(1.69e12 * d, 2) + T(" 美元", "") }) },
    { k: "defi", z: "chain", name: "DeFi", size: T("锁仓价值约 950 亿美元（2026-09-26）", "About $95B locked (2026-09-26)"),
      whose: T("智能合约里的存款与借贷头寸", "Deposits and loans inside smart contracts"), ideas: "③④", st: T("阶段 13.1 · 阶段 13.4", "Stage 13.1 · Stage 13.4"),
      rate: () => ({ v: null, txt: T("链上利率与传统利率竞争资金", "On-chain rates compete with TradFi rates for money") }),
      btc: (d) => ({ v: -d, txt: T("大体随币价下跌，杠杆头寸触发清算", "Falls broadly with token prices; levered positions get liquidated") }) },
    { k: "occ", z: "dat", name: T("DAT 普通股（橙子公司示意）", "DAT common stock (Orange Corp, illustrative)"), size: T("上市公司合计约 127 万—130 万枚比特币（2026-09-26）", "Listed companies hold about 1.27–1.30M BTC (2026-09-26)"),
      whose: T("对“比特币减去优先索取权”的剩余索取权", "A residual claim on bitcoin minus senior claims"), ideas: "②④", st: T("阶段 15.1 · 阶段 16.4", "Stage 15.1 · Stage 16.4"),
      rate: () => ({ v: null, txt: T("通过融资成本与溢价间接受影响", "Hit indirectly via funding costs and the premium") }),
      btc: (d) => { const nav = OC_NAV * (1 - d), eq0 = OC_NAV - OC_CLAIMS, eq1 = Math.max(0, nav - OC_CLAIMS); return { v: eq1 / eq0 - 1, txt: T("按持币价值计（mNAV 不变），放大约 1.43 倍", "At constant mNAV, amplified about 1.43x") }; } },
    { k: "ocp", z: "dat", name: T("DAT 优先股（橙子公司示意）", "DAT preferred (Orange Corp, illustrative)"), size: T("Strategy 持有约 84.6 万枚比特币（2026-09-20）", "Strategy holds about 846,000 BTC (2026-09-20)"),
      whose: T("排在可转债之后、普通股之前的索取权", "A claim behind converts, ahead of common"), ideas: "①②④", st: T("阶段 17.3 · 阶段 18.1", "Stage 17.3 · Stage 18.1"),
      rate: (dy) => ({ v: perpetuity(10, 0.1 + dy) / 100 - 1, txt: T("永续：股息 10 美元，原按 10% 定价", "Perpetual: $10 dividend, priced at 10%") }),
      btc: (d) => { const r = btcRating(OC_NAV * (1 - d), OC_CLAIMS); return { v: null, cov: r, txt: T("D 层资产覆盖：", "D-layer asset coverage: ") + fmtNum(r, 2) + "x" + T("（原 3.33x）", " (was 3.33x)") }; } },
    { k: "ai", z: "ai", name: T("AI 资本开支", "AI capital spending"), size: T("2025—2028 年约 2.9 万亿美元，约 1.5 万亿外部融资（FSB 引用）", "About $2.9T over 2025–28, about $1.5T externally financed (cited by FSB)"),
      whose: T("数据中心债券、私募信贷、资产支持证券", "Data-center bonds, private credit, asset-backed securities"), ideas: "①②", st: T("阶段 19.1 · 阶段 19.2", "Stage 19.1 · Stage 19.2"),
      rate: (dy) => ({ v: 0, pos: -dy, txt: T("外部融资每年多付利息约 ", "Extra yearly interest on outside financing: about ") + fmtBig(1.5e12 * dy, 1) + T(" 美元", "") }),
      btc: () => ({ v: 0, txt: T("无直接敞口", "No direct exposure") }) },
  ];

  let sel = "ust", shock = "rate", size = 100; // rate: bp；btc: %

  root.innerHTML = `
    <div class="demo">
      <div class="demo-head">${T("🗺️ 新金融全景地图：点一个节点，再施加一个冲击", "🗺️ The new-era map: click a node, then apply a shock")}</div>
      <div class="demo-block">
        <label class="demo-label">${T("① 选择冲击", "① Choose a shock")}</label>
        <div class="demo-seg" id="nm-shock">
          <button data-s="rate">${T("长期利率上升", "Long-term rates rise")}</button>
          <button data-s="btc">${T("比特币下跌", "Bitcoin falls")}</button>
        </div>
        <label class="demo-label" style="margin-top:10px">${T("冲击大小", "Shock size")}${T("：", ": ")}<b id="nm-sv"></b></label>
        <input class="demo-slider" type="range" id="nm-size"/>
      </div>
      <div class="demo-block">
        <label class="demo-label">${T("② 地图：颜色越红，受冲击越大（点节点看详情）", "② The map: the redder, the harder hit (click a node for details)")}</label>
        <div id="nm-map"></div>
      </div>
      <div class="demo-block">
        <label class="demo-label">${T("③ 节点详情", "③ Node details")}</label>
        <div class="scn"><div class="scn-q" id="nm-title">–</div><div class="scn-meta" id="nm-meta">–</div></div>
        <div class="stat-row" id="nm-stats"></div>
        <div class="demo-log" id="nm-log"></div>
      </div>
      <p class="demo-tip">${T(
        "先选“长期利率上升”：受伤最重的都是“久期长”的东西——30 年期国债、永续优先股，以及现金流远在未来的股票（戈登模型）；3 个月的代币化国债几乎不动，稳定币面值不变，发行人反而多赚。再切到“比特币下跌”：左边几乎不动，风险沿着 ETF 和 DAT 这两座桥流出，DAT 普通股因杠杆跌得比比特币还多。<strong>钱主要在左边，放大器主要在右边，而利率是总开关。</strong>规模均为带日期的约数，橙子公司为示意。",
        "Start with “long-term rates rise”: the worst hit are all long-duration things — the 30-year Treasury, the perpetual preferred, and stocks whose cash flows lie far in the future (Gordon model); 3-month tokenized Treasuries barely move, and stablecoins hold par while their issuers earn more. Then switch to “bitcoin falls”: the left barely moves, risk flows out across the ETF and DAT bridges, and DAT common falls further than bitcoin because of leverage. <strong>The money is mostly on the left, the amplifiers mostly on the right, and rates are the master switch.</strong> Sizes are dated approximations; Orange Corp is illustrative."
      )}</p>
    </div>`;

  const $ = (s) => root.querySelector(s);

  const impact = (n) => {
    const s = size;
    return shock === "rate" ? n.rate(s / 10000) : n.btc(s / 100);
  };

  const heat = (r) => {
    if (r.cov !== undefined) return r.cov < 1.5 ? "var(--red-soft)" : r.cov < 2.5 ? "var(--btc-soft)" : "var(--surface-2)";
    if (r.v === null) return "var(--surface-2)";
    const a = Math.abs(r.v);
    if (r.v < 0 && a > 0.25) return "var(--red-soft)";
    if (r.v < 0 && a > 0.05) return "var(--btc-soft)";
    if (r.pos && r.pos > 0) return "var(--green-soft)";
    return "var(--surface-2)";
  };
  const label = (r) => {
    if (r.cov !== undefined) return fmtNum(r.cov, 2) + "x";
    if (r.v === null) return T("间接", "indirect");
    if (r.v === 0) return r.pos ? (r.pos > 0 ? T("收益↑", "income ↑") : T("成本↑", "cost ↑")) : "≈ 0";
    return (r.v > 0 ? "+" : "") + fmtPct(r.v, 1);
  };

  const paintSlider = () => {
    root.querySelectorAll("#nm-shock button").forEach((b) => b.classList.toggle("on", b.dataset.s === shock));
    const sl = $("#nm-size");
    if (shock === "rate") { sl.min = 0; sl.max = 300; sl.step = 25; } else { sl.min = 0; sl.max = 90; sl.step = 5; }
    sl.value = size;
  };

  const paintMap = () => {
    $("#nm-sv").textContent = shock === "rate" ? "+" + fmtNum(size, 0) + T(" 个基点", " bp") : "−" + fmtNum(size, 0) + "%";
    $("#nm-map").innerHTML = ZONES.map((z) => {
      const nodes = N.filter((n) => n.z === z.k);
      return `<div style="border:1px solid ${z.bd};background:${z.bg};border-radius:10px;padding:8px 10px;margin-bottom:8px">
        <div style="font-weight:700;font-size:13px;margin-bottom:6px">${z.name}</div>
        <div style="display:flex;flex-wrap:wrap;gap:6px">${nodes.map((n) => {
          const r = impact(n);
          return `<button class="demo-btn${n.k === sel ? " active" : ""}" data-n="${n.k}" style="background:${heat(r)};text-align:left">${n.name}<br><b>${label(r)}</b></button>`;
        }).join("")}</div></div>`;
    }).join("");
    root.querySelectorAll("#nm-map [data-n]").forEach((b) => b.addEventListener("click", () => { sel = b.dataset.n; paintMap(); paintSel(); }));
  };

  const paintSel = () => {
    const n = N.find((x) => x.k === sel), r = impact(n), z = ZONES.find((x) => x.k === n.z);
    $("#nm-title").textContent = n.name;
    $("#nm-meta").innerHTML = z.name + T(" · 主要观念 ", " · Main ideas ") + "<b>" + n.ideas + "</b>";
    $("#nm-stats").innerHTML = `
      <div class="stat"><div class="k">${T("规模（约，带日期）", "Size (approx., dated)")}</div><div class="v" style="font-size:14px">${n.size}</div></div>
      <div class="stat"><div class="k">${T("是谁的负债 / 什么索取权", "Whose liability / what claim")}</div><div class="v" style="font-size:14px">${n.whose}</div></div>
      <div class="stat"><div class="k">${T("本次冲击的影响", "Impact of this shock")}</div><div class="v ${r.v !== null && r.v < 0 ? "neg" : r.cov !== undefined && r.cov < 1.5 ? "neg" : "acc"}">${label(r)}</div></div>`;
    const lines = [`<div>${r.txt}</div>`, `<div>${T("哪一节讲透它", "Where the course unpacks it")}${T("：", ": ")}<b>${n.st}</b></div>`];
    if (n.z === "dat") lines.push(`<div class="warn">${T("橙子公司是全课的玩具公司，不是任何真实公司的数据。本课只讲机制，不构成投资建议。", "Orange Corp is the course's toy company, not any real company's data. Mechanisms only — not investment advice.")}</div>`);
    $("#nm-log").innerHTML = lines.join("");
  };

  root.querySelectorAll("#nm-shock button").forEach((b) => b.addEventListener("click", () => {
    shock = b.dataset.s; size = shock === "rate" ? 100 : 50; paintSlider(); paintMap(); paintSel();
  }));
  $("#nm-size").addEventListener("input", (e) => { size = clamp(+e.target.value, 0, 300); paintMap(); paintSel(); });

  paintSlider();
  paintMap();
  paintSel();
}
