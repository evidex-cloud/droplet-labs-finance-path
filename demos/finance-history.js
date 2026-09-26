// 交互演示：五千年金融创新时间线——按时代筛选、点选事件，看“谁来记账、凭什么信”、点亮哪个观念、之后的狂热/危机与对应阶段；
// 再用共享引擎做一个“跨越历史的复利”实验：从该事件起按某利率复利到 2026 年会变成多少，说明复利为何不可能永远持续。
import { fv, rule72, fmtNum, fmtPct, clamp } from "./_fin.js";

export default function mount(root, lang) {
  const en = lang === "en";
  const T = (zh, e) => (en ? e : zh);

  const TRUST = [
    { k: "t", name: T("神庙与君主", "Temples & monarchs") },
    { k: "b", name: T("可核对的账本与公司法", "Checkable books & company law") },
    { k: "s", name: T("央行、美元与清算所", "Central banks, the dollar & clearinghouses") },
    { k: "c", name: T("代码与共识", "Code & consensus") },
  ];
  const ERAS = [
    { k: "all", name: T("全部", "All") },
    { k: "anc", name: T("古代", "Ancient") },
    { k: "mer", name: T("商人与公司", "Merchants & companies") },
    { k: "gold", name: T("黄金、央行与美元", "Gold, central banks & the dollar") },
    { k: "eng", name: T("金融工程", "Financial engineering") },
    { k: "chain", name: T("链上时代", "The on-chain era") },
  ];

  const EV = [
    { y: -3000, when: T("约公元前 3000 年", "c. 3000 BC"), era: "anc", tr: "t", ideas: "①②", t: T("美索不达米亚神庙泥板记录借贷与利息", "Mesopotamian temple tablets record loans and interest"),
      d: T("大麦与白银的借贷写在泥板上：借多少、何时还、利息几何。借贷比硬币早了两千年。", "Loans of barley and silver are inscribed on clay: how much, when due, what interest. Lending predates coins by two millennia."), st: T("阶段 1.1", "Stage 1.1") },
    { y: -1754, when: T("约公元前 1754 年", "c. 1754 BC"), era: "anc", tr: "t", ideas: "①④", t: T("《汉谟拉比法典》规定利率上限", "The Code of Hammurabi caps interest rates"),
      d: T("白银约 20%、谷物约 33⅓%。高利率反映高风险：歉收、战争、借款人跑路。", "About 20% on silver, 33⅓% on grain. High rates reflect high risk: failed harvests, war, vanishing borrowers."), st: T("阶段 2.1", "Stage 2.1"), rate: 20 },
    { y: -600, when: T("约公元前 600 年", "c. 600 BC"), era: "anc", tr: "t", ideas: "②③", t: T("吕底亚铸造带印记的金属币", "Lydia strikes stamped metal coins"),
      d: T("印记免去了称重与验成色，信任从“我验过”变成“国王担保过”。", "The stamp ends weighing and assaying; trust shifts from “I checked it” to “the king vouched for it.”"), st: T("阶段 1.1", "Stage 1.1") },
    { y: 1024, when: T("11 世纪 20 年代", "1020s"), era: "anc", tr: "s", ideas: "②", t: T("北宋官方发行交子纸币", "Song China issues official jiaozi paper money"),
      d: T("纸本身不值钱，值钱的是发行者的承诺——钱是负债。", "The paper is worthless; the issuer's promise is what counts — money as a liability."), st: T("阶段 1.1 · 阶段 1.5", "Stage 1.1 · Stage 1.5") },
    { y: 1494, when: "1494", era: "mer", tr: "b", ideas: "②", t: T("帕乔利系统写下复式记账法", "Pacioli sets out double-entry bookkeeping"),
      d: T("有借必有贷，资产 = 负债 + 权益。外人第一次能核对一家企业的账。", "Every debit has a credit; assets = liabilities + equity. Outsiders can finally check a firm's books."), st: T("阶段 5.2", "Stage 5.2") },
    { y: 1602, when: "1602", era: "mer", tr: "b", ideas: "②④", t: T("荷兰东印度公司（VOC）发行可转让股份", "The Dutch East India Company (VOC) issues transferable shares"),
      d: T("有限责任、公众募股、阿姆斯特丹常设交易——普通股的原型。", "Limited liability, public share sales, continuous trading in Amsterdam — the prototype of common stock."), st: T("阶段 5.1", "Stage 5.1"), crisis: T("1630 年代郁金香热", "Tulip mania, 1630s") },
    { y: 1694, when: "1694", era: "mer", tr: "s", ideas: "①②", t: T("英格兰银行成立，借钱给政府", "The Bank of England is founded to lend to the government"),
      d: T("政府长期债务 + 可发行货币的银行：现代金融的骨架。", "Long-term government debt plus a bank that can issue money: the skeleton of modern finance."), st: T("阶段 1.3", "Stage 1.3"), crisis: T("1720 年南海泡沫", "The South Sea Bubble, 1720") },
    { y: 1821, when: "1821", era: "gold", tr: "s", ideas: "①②", t: T("英国正式确立金本位", "Britain formally adopts the gold standard"),
      d: T("纸币按固定比例兑换黄金，黄金成为各国账本共同的锚：有纪律，也僵硬。", "Notes convert to gold at a fixed rate; gold anchors every ledger — disciplined, but rigid."), st: T("阶段 1.5", "Stage 1.5"), crisis: T("1930 年代大萧条", "The Great Depression, 1930s") },
    { y: 1913, when: "1913", era: "gold", tr: "s", ideas: "③", t: T("美联储成立", "The Federal Reserve is created"),
      d: T("1907 年大恐慌之后，美国有了最后贷款人和“最终账本”。", "After the Panic of 1907, the US gets a lender of last resort and a ledger of last resort."), st: T("阶段 1.3", "Stage 1.3") },
    { y: 1944, when: "1944", era: "gold", tr: "s", ideas: "②③", t: T("布雷顿森林：美元挂钩黄金，各国货币挂钩美元", "Bretton Woods: the dollar pegged to gold, other currencies to the dollar"),
      d: T("每盎司 35 美元。美元成为全球账本的中心。", "$35 an ounce. The dollar becomes the center of the global ledger."), st: T("阶段 3.4", "Stage 3.4") },
    { y: 1971, when: T("1971 年 8 月 15 日", "Aug 15, 1971"), era: "gold", tr: "s", ideas: "①②", t: T("尼克松关闭黄金兑换窗口", "Nixon closes the gold window"),
      d: T("主要货币从此不与任何实物挂钩，价值完全依赖国家信用。", "Major currencies are no longer tied to anything physical; their value rests on state credit alone."), st: T("阶段 1.5 · 阶段 9.4", "Stage 1.5 · Stage 9.4"), crisis: T("1970 年代高通胀", "The high inflation of the 1970s") },
    { y: 1973, when: "1973", era: "eng", tr: "s", ideas: "④", t: T("CBOE 上市期权开张；布莱克-斯科尔斯公式发表", "CBOE lists options; the Black–Scholes formula is published"),
      d: T("波动率成为可以计算、可以买卖的东西。", "Volatility becomes something you can calculate and trade."), st: T("阶段 7.2 · 阶段 7.3", "Stage 7.2 · Stage 7.3") },
    { y: 1976, when: "1976", era: "eng", tr: "b", ideas: "④", t: T("第一只面向散户的指数基金", "The first index fund for ordinary investors"),
      d: T("分散变得人人可用；后来的 ETF 把它做成可交易的证券。", "Diversification for everyone; ETFs later make it a tradable security."), st: T("阶段 5.6", "Stage 5.6") },
    { y: 2008, when: T("2008 年 9 月 15 日", "Sep 15, 2008"), era: "eng", tr: "s", ideas: "②③④", t: T("雷曼兄弟破产", "Lehman Brothers fails"),
      d: T("风险切得太细、传得太远，没人知道损失落在谁的资产负债表上。短期融资冻结。", "Risk sliced too fine and spread too far; nobody knows whose balance sheet holds the losses. Short-term funding freezes."), st: T("阶段 10.2", "Stage 10.2") },
    { y: 2009, when: T("2009 年 1 月 3 日", "Jan 3, 2009"), era: "chain", tr: "c", ideas: "②③", t: T("比特币创世区块", "Bitcoin's genesis block"),
      d: T("第一本不需要中心机构来记的全球账本。区块里嵌着当天关于银行救助的报纸标题。", "The first global ledger kept by no central institution, stamped with that day's headline about a bank bailout."), st: T("阶段 12.1", "Stage 12.1") },
    { y: 2015, when: "2015", era: "chain", tr: "c", ideas: "③", t: T("以太坊上线", "Ethereum launches"),
      d: T("账本上可以运行程序：智能合约，为 DeFi 和稳定币铺路。", "Programs run on the ledger: smart contracts pave the way for DeFi and stablecoins."), st: T("阶段 13.1", "Stage 13.1"), crisis: T("2018 年 ICO 崩盘", "The 2018 ICO bust") },
    { y: 2020, when: T("2020 年夏", "Summer 2020"), era: "chain", tr: "c", ideas: "①③④", t: T("“DeFi 之夏”", "“DeFi summer”"),
      d: T("链上借贷、交易所与收益耕作爆发。", "On-chain lending, exchanges and yield farming explode."), st: T("阶段 13.1 · 阶段 13.5", "Stage 13.1 · Stage 13.5"), crisis: T("2022 年 Terra/Luna 与 FTX", "Terra/Luna and FTX, 2022") },
    { y: 2020.6, when: T("2020 年 8 月 11 日", "Aug 11, 2020"), era: "chain", tr: "b", ideas: "②④", t: T("MicroStrategy 首次买入 21,454 枚比特币", "MicroStrategy buys its first 21,454 bitcoin"),
      d: T("约 2.5 亿美元。第一家把比特币作为主要储备资产的上市公司。", "About $250 million. The first listed company to make bitcoin its primary treasury reserve."), st: T("阶段 15.2", "Stage 15.2") },
    { y: 2024, when: T("2024 年 1 月", "Jan 2024"), era: "chain", tr: "s", ideas: "③", t: T("美国现货比特币 ETF 开始交易", "US spot bitcoin ETFs begin trading"),
      d: T("比特币进入传统券商账户，旧管道接上新账本。", "Bitcoin enters ordinary brokerage accounts; old pipes connect to the new ledger."), st: T("阶段 12.5", "Stage 12.5") },
    { y: 2025, when: "2025", era: "chain", tr: "b", ideas: "①②④", t: T("Strategy 改名并推出系列永续优先股；《GENIUS 法案》签署", "Strategy renames itself and launches perpetual preferreds; the GENIUS Act is signed"),
      d: T("用优先股“出售收益”为买币融资；稳定币获得联邦法律框架。", "Selling yield through preferreds to buy bitcoin; stablecoins get a federal legal framework."), st: T("阶段 15.2 · 阶段 17.3", "Stage 15.2 · Stage 17.3"), crisis: T("2025 年底—2026 年比特币回落、财库公司洗牌", "Bitcoin's late-2025–2026 retreat and the treasury-company shakeout") },
    { y: 2026, when: T("2026 年 9 月", "Sep 2026"), era: "chain", tr: "b", ideas: "②④", t: T("Strategy 持有约 84.6 万枚比特币（截至 9 月 20 日）", "Strategy holds about 846,000 bitcoin (as of Sep 20)"),
      d: T("约占比特币总量上限的 4%：新账本上的资产，旧工具做的负债。", "About 4% of all bitcoin that will ever exist: assets on the new ledger, liabilities built from old tools."), st: T("阶段 15.1 · 阶段 18.2", "Stage 15.1 · Stage 18.2") },
  ];

  let era = "all", sel = 5, rate = 5;

  root.innerHTML = `
    <div class="demo">
      <div class="demo-head">${T("⏳ 五千年金融时间线：谁在记账，我们凭什么相信？", "⏳ 5,000 years of finance: who keeps the ledger, and why do we trust it?")}</div>
      <div class="demo-block">
        <label class="demo-label">${T("① 按时代筛选，再点一个事件", "① Filter by era, then click an event")}</label>
        <div class="demo-seg" id="fh-era">${ERAS.map((e) => `<button data-e="${e.k}">${e.name}</button>`).join("")}</div>
        <div class="tl" id="fh-tl" style="margin-top:12px;max-height:320px;overflow:auto"></div>
      </div>
      <div class="demo-block">
        <label class="demo-label">${T("② 这个事件改变了什么", "② What this event changed")}</label>
        <div class="scn"><div class="scn-q" id="fh-title">–</div><div class="scn-meta" id="fh-meta">–</div></div>
        <div id="fh-desc" class="demo-out"></div>
        <div class="strip" id="fh-strip"></div>
        <div class="demo-log" id="fh-log"></div>
      </div>
      <div class="demo-block">
        <label class="demo-label">${T("③ 跨越历史的复利：从这个事件起，1 单位价值按下面的利率一直复利到 2026 年", "③ Compounding across history: 1 unit of value compounded from this event to 2026 at the rate below")}${T("：", ": ")}<b id="fh-rv"></b></label>
        <input class="demo-slider" type="range" id="fh-rate" min="0.5" max="20" step="0.5" value="${rate}"/>
        <div class="stat-row">
          <div class="stat"><div class="k">${T("经过年数", "Years elapsed")}</div><div class="v" id="fh-yrs">–</div></div>
          <div class="stat"><div class="k">${T("翻倍一次约需（72 法则）", "Years to double (Rule of 72)")}</div><div class="v" id="fh-dbl">–</div></div>
          <div class="stat"><div class="k">${T("翻倍次数", "Number of doublings")}</div><div class="v" id="fh-nd">–</div></div>
          <div class="stat"><div class="k">${T("1 单位变成", "1 unit becomes")}</div><div class="v acc" id="fh-fv">–</div></div>
        </div>
        <div class="demo-log" id="fh-clog"></div>
      </div>
      <p class="demo-tip">${T(
        "点一点时间线，留意第三行的“信任来源”条：从神庙到账本、从央行到代码，<strong>每一层都叠在上一层之上</strong>。再用复利实验：从 1602 年起按 5% 复利，1 单位会变成约 10 亿——现实中没有任何索取权活得这么久，违约、战争、通胀和货币改革一次次把账本清零。这正是风险有价格（观念④）的历史证据。",
        "Click through the timeline and watch the “source of trust” strip: temples to ledgers, central banks to code — <strong>each layer stacks on the one before</strong>. Then try the compounding experiment: 1 unit compounded at 5% since 1602 becomes about a billion — yet no real claim has survived that long, because defaults, wars, inflation and currency reforms keep wiping ledgers clean. That's the historical evidence that risk has a price (Idea ④)."
      )}</p>
    </div>`;

  const $ = (s) => root.querySelector(s);

  const paintTl = () => {
    root.querySelectorAll("#fh-era button").forEach((b) => b.classList.toggle("on", b.dataset.e === era));
    const list = EV.map((e, i) => ({ e, i })).filter(({ e }) => era === "all" || e.era === era);
    if (!list.some(({ i }) => i === sel)) sel = list[0].i;
    $("#fh-tl").innerHTML = list.map(({ e, i }) => `<div class="tl-item" data-i="${i}" style="cursor:pointer;${i === sel ? "background:var(--orange-soft);border-radius:8px" : ""}">
      <div class="when">${e.when}</div><div>${e.era === "chain" ? `<b style="color:var(--btc)">${e.t}</b>` : e.t}</div></div>`).join("");
    root.querySelectorAll("#fh-tl .tl-item").forEach((el) => el.addEventListener("click", () => { sel = +el.dataset.i; paintTl(); paintSel(); }));
  };

  const paintSel = () => {
    const e = EV[sel];
    $("#fh-title").textContent = e.t;
    $("#fh-meta").innerHTML = e.when + T(" · 点亮观念 ", " · Ideas lit: ") + "<b>" + e.ideas + "</b>";
    $("#fh-desc").textContent = e.d;
    $("#fh-strip").innerHTML = TRUST.map((t) => `<div class="strip-cell" style="${t.k === e.tr ? "background:" + (t.k === "c" ? "var(--btc-soft)" : "var(--orange-soft)") + ";font-weight:700" : "opacity:.5"}">${t.name}</div>`).join("");
    const lines = [`<div>${T("信任来源", "Source of trust")}${T("：", ": ")}<b>${TRUST.find((t) => t.k === e.tr).name}</b></div>`,
      `<div>${T("哪一节讲透它", "Where the course unpacks it")}${T("：", ": ")}<b>${e.st}</b></div>`];
    if (e.crisis) lines.push(`<div class="warn">${T("随后的狂热或危机", "The mania or crisis that followed")}${T("：", ": ")}${e.crisis}${T("——信任的扩张总伴随一次透支（阶段 10）。", " — every expansion of trust comes with an overdraft (Stage 10).")}</div>`);
    $("#fh-log").innerHTML = lines.join("");
    if (e.rate) { rate = e.rate; $("#fh-rate").value = rate; }
    paintFv();
  };

  const paintFv = () => {
    const e = EV[sel], r = rate / 100, n = Math.max(0, 2026 - Math.floor(e.y));
    $("#fh-rv").textContent = fmtNum(rate, 1) + "%";
    $("#fh-yrs").textContent = fmtNum(n, 0);
    const dbl = rule72(r);
    $("#fh-dbl").textContent = fmtNum(dbl, 1) + T(" 年", " yrs");
    $("#fh-nd").textContent = fmtNum(n / dbl, 1);
    const val = fv(1, r, n), exp10 = n * Math.log10(1 + r);
    const shown = isFinite(val) && val < 1e15 ? fmtNum(val, val < 100 ? 2 : 0) : "10^" + fmtNum(exp10, 0);
    $("#fh-fv").textContent = shown;
    const lines = [];
    if (exp10 > 12) lines.push(`<div class="bad">${T("这个数字比人类历史上所有财富加起来还大得多。复利在纸面上可以无限延伸，现实中的索取权却会被违约、战争、通胀与货币改革一次次清零。", "That number dwarfs all the wealth in human history combined. On paper compounding runs forever; in reality claims keep getting wiped out by default, war, inflation and currency reform.")}</div>`);
    else if (exp10 > 3) lines.push(`<div class="warn">${T("几百年的复利就能把 1 变成成千上万。这是时间的价格（观念①）的威力，也解释了为什么长期利率的一点点差别都很要紧。", "A few centuries of compounding turn 1 into thousands or more. That's the power of the price of time (Idea ①) — and why small differences in long-term rates matter.")}</div>`);
    else lines.push(`<div class="ok">${T("时间较短或利率较低时，复利还算温和。", "Over shorter spans or at low rates, compounding stays tame.")}</div>`);
    lines.push(`<div>${T("对照：从 1971 年起按 5% 复利 55 年约为 ", "For comparison: 5% a year for the 55 years since 1971 gives about ")}<b>${fmtNum(fv(1, 0.05, 55), 1)}</b>${T(" 倍；按 3% 约为 ", "x; at 3% about ")}<b>${fmtNum(fv(1, 0.03, 55), 1)}</b>${T(" 倍。", "x.")}</div>`);
    $("#fh-clog").innerHTML = lines.join("");
  };

  root.querySelectorAll("#fh-era button").forEach((b) => b.addEventListener("click", () => { era = b.dataset.e; paintTl(); paintSel(); }));
  $("#fh-rate").addEventListener("input", (ev) => { rate = clamp(+ev.target.value, 0.5, 20); paintFv(); });

  paintTl();
  paintSel();
}
