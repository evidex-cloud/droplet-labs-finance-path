// 交互演示：五问法练习场——挑一条 2025–2026 年的真实新闻，自己回答第 ②③④⑤ 问，再对照参考答案。
// 每条新闻附一行“顺手算一下”，用 _fin.js 把标题里的形容词换成数字（第 ① 问）。
import { bondPrice, perpetuity, monthsCovered, issueAndBuy, realRate, fmtPct, fmtNum, fmtUsd, fmtBig } from "./_fin.js";

export default function mount(root, lang) {
  const en = lang === "en";
  const T = (zh, e) => (en ? e : zh);

  const IDEAS = [T("① 时间的价格", "① Price of time"), T("② 资产负债表", "② Balance sheets"), T("③ 流动性与信任", "③ Liquidity & trust"), T("④ 风险与杠杆", "④ Risk & leverage")];
  const EXP = [T("基本已被计入", "Largely priced in"), T("明显的意外", "A clear surprise"), T("光看标题判断不了，要查预期", "Can't tell from the headline; check expectations")];

  // 每条：headline, date, facts(①), math(), exp(正确索引), idea(正确索引), bs(选项, 正确), so(选项, 正确), note
  const NEWS = [
    {
      h: T("“美联储自 2023 年以来首次加息”", "\"Fed hikes for the first time since 2023\""), d: "2026-09-16",
      f: T("+25 基点至 3.75%–4.00%，12–0；2 年期约 4.8%，早已高于政策利率。", "+25 bp to 3.75–4.00%, 12–0; the 2-year at about 4.8% was already above the policy rate."),
      math: () => T(`约 7.25 万亿美元国库券滚动后，每年多付约 $${fmtBig(7.25e12 * 0.0025)} 利息；约 3,120 亿美元稳定币储备每年多赚约 $${fmtBig(312e9 * 0.0025)}。`,
        `Once ~$7.25T of bills roll over, about $${fmtBig(7.25e12 * 0.0025)} a year of extra interest; ~$312B of stablecoin reserves earn about $${fmtBig(312e9 * 0.0025)} more a year.`),
      exp: 0, idea: 0,
      bs: [[T("浮动利率借款人与持有国库券的稳定币发行人", "Floating-rate borrowers and bill-holding stablecoin issuers"), 1], [T("只有美联储自己", "Only the Fed itself"), 0], [T("比特币矿工", "Bitcoin miners"), 0]],
      so: [[T("如果继续加息，实际利率上升，不生息资产承压，除非通胀先回落", "If hikes continue, real rates rise and non-yielding assets struggle, unless inflation falls first"), 1], [T("加息一定会让股市崩盘", "A hike always crashes stocks"), 0], [T("没有二阶效应", "There is no second-order effect"), 0]],
    },
    {
      h: T("“美国 30 年期收益率升至 2004 年以来最高”", "\"US 30-year yield hits highest since 2004\""), d: "2026-09-24/25",
      f: T("约 5.47%–5.49%；2 月 27 日年内低点约 4.64%，上行约 85 基点。", "About 5.47–5.49%; the Feb 27 low was about 4.64%, a rise of roughly 85 bp."),
      math: () => T(`5% 票息 30 年期国债：${fmtNum(bondPrice(100, 0.05, 0.0464, 30), 1)} → ${fmtNum(bondPrice(100, 0.05, 0.0549, 30), 1)}；10% 永续优先股（利差不变）：100 → ${fmtNum(perpetuity(10, 0.1085), 1)}。`,
        `5%-coupon 30-year: ${fmtNum(bondPrice(100, 0.05, 0.0464, 30), 1)} → ${fmtNum(bondPrice(100, 0.05, 0.0549, 30), 1)}; 10% perpetual preferred (spread unchanged): 100 → ${fmtNum(perpetuity(10, 0.1085), 1)}.`),
      exp: 0, idea: 0,
      bs: [[T("长债持有人、政府利息账单、永续优先股持有人", "Long-bond holders, the government's interest bill, perpetual-preferred holders"), 1], [T("只有美国财政部", "Only the US Treasury"), 0], [T("没人，国债不会违约", "Nobody; Treasuries don't default"), 0]],
      so: [[T("如果收益竞争延续，DAT 优先股需要更高股息，覆盖指标承压", "If yield competition persists, DAT preferreds need higher dividends and coverage comes under pressure"), 1], [T("比特币一定上涨", "Bitcoin must rise"), 0], [T("房贷利率会下降", "Mortgage rates will fall"), 0]],
    },
    {
      h: T("“Strategy 自 2022 年以来首次卖出比特币”", "\"Strategy sells bitcoin for the first time since 2022\""), d: "2026-06-01",
      f: T("5 月最后一周卖出 32 枚，约 250 万美元，用于 STRC 股息。", "Sold 32 BTC, about $2.5M, in the last week of May to fund STRC dividends."),
      math: () => T(`32 ÷ 约 840,000 ≈ ${fmtPct(32 / 840000, 4)} 的持仓；250 万美元只够约 ${fmtNum(monthsCovered(2.5, 1703) * 30, 1)} 天的年度义务（约 17 亿美元/年）。`,
        `32 ÷ about 840,000 ≈ ${fmtPct(32 / 840000, 4)} of holdings; $2.5M covers about ${fmtNum(monthsCovered(2.5, 1703) * 30, 1)} days of annual obligations (about $1.7B/yr).`),
      exp: 2, idea: 1,
      bs: [[T("普通股（每股比特币）与优先股（覆盖）持有人", "Common holders (BTC per share) and preferred holders (coverage)"), 1], [T("比特币 ETF", "Bitcoin ETFs"), 0], [T("美联储", "The Fed"), 0]],
      so: [[T("如果“卖币付息”成为常规工具，飞轮进入新阶段，除非 mNAV 回升让增发重新增值", "If selling BTC for dividends becomes routine, the flywheel enters a new phase, unless mNAV recovers and issuance turns accretive again"), 1], [T("公司马上要破产", "The company is about to go bankrupt"), 0], [T("比特币价格会因 32 枚被砸穿", "32 coins will crash the bitcoin price"), 0]],
    },
    {
      h: T("“CLARITY 法案在参议院程序投票中失败”", "\"CLARITY Act fails Senate procedural vote\""), d: "2026-09-15",
      f: T("终结辩论投票 49–50，未达 60 票；法案未成法，SEC 与 CFTC 推进各自规则。", "Cloture failed 49–50, short of 60; the bill is not law and the SEC and CFTC move ahead with their own rules."),
      math: () => T("这条新闻没有可以直接算的数字——这本身就是线索：它改变的是概率与时间表，而不是现金流。", "No number here to compute. That is itself a clue: it changes probabilities and timelines, not cash flows."),
      exp: 2, idea: 2,
      bs: [[T("加密交易所、代币发行方、想走合规路径的机构", "Crypto exchanges, token issuers, institutions seeking a compliant path"), 1], [T("美国财政部", "The US Treasury"), 0], [T("长期国债持有人", "Long-bond holders"), 0]],
      so: [[T("如果监管靠机构规则推进，确定性更低、诉讼风险更高，除非国会重启", "If regulation proceeds through agency rules, certainty is lower and litigation risk higher, unless Congress revives the bill"), 1], [T("加密资产从此违法", "Crypto becomes illegal"), 0], [T("稳定币法规也被废除", "The stablecoin law is repealed too"), 0]],
    },
    {
      h: T("“MSCI 征询：可能把 Strategy 等‘非经营性公司’剔出指数”", "\"MSCI consultation could drop Strategy and other 'non-operating companies' from its indexes\""), d: "2026-08 → ≤10-16",
      f: T("模拟剔除名单含 Strategy、Metaplanet、Yellow Cake；结论预计 10 月 16 日前、11 月生效；截至 9 月 26 日未定。", "Simulated deletions include Strategy, Metaplanet and Yellow Cake; decision due by Oct 16, effective in November; pending as of Sep 26."),
      math: () => T(`第一轮征询时媒体引用的潜在流出估计约 100–150 亿美元；对比 Strategy 8 月 21 日约 496 亿美元的基本市值，约 ${fmtPct(10 / 49.6, 0)}–${fmtPct(15 / 49.6, 0)}（示意）。`,
        `Press estimates of potential outflows in the first round were about $10–15B; against Strategy's ~$49.6B basic market cap on Aug 21, that is about ${fmtPct(10 / 49.6, 0)}–${fmtPct(15 / 49.6, 0)} (illustrative).`),
      exp: 2, idea: 2,
      bs: [[T("DAT 普通股股东与跟踪指数的被动基金", "DAT common holders and index-tracking funds"), 1], [T("优先股的清偿顺序会改变", "The preferreds' seniority changes"), 0], [T("比特币矿工", "Bitcoin miners"), 0]],
      so: [[T("如果被剔除，被动资金需卖出，除非已被计入；若不剔除，则不确定性解除", "If excluded, passive funds must sell, unless priced in; if not, uncertainty lifts"), 1], [T("被剔除意味着公司破产", "Exclusion means bankruptcy"), 0], [T("指数决定与股价无关", "Index decisions don't affect prices"), 0]],
    },
    {
      h: T("“Metaplanet 股价跌破其比特币价值（mNAV 约 0.72 倍）”", "\"Metaplanet trades below the value of its bitcoin (mNAV about 0.72x)\""), d: "2026-09",
      f: T("CoinGecko 约 0.72 倍；bitcointreasuries.net 基本口径约 0.58 倍——口径不同。", "About 0.72x on CoinGecko; about 0.58x on bitcointreasuries.net's basic measure. Different definitions."),
      math: () => {
        const r = issueAndBuy({ btc: 10000, shares: 100e6, btcPrice: 100000, px: 7.2, newShares: 10e6 });
        return T(`用橙子公司示意：mNAV 0.72 时增发 10% 新股买币，每股比特币变化 ${fmtPct(r.change, 1)}——发股变成稀释。`,
          `Orange Corp illustration: at mNAV 0.72, issuing 10% more shares to buy BTC changes BTC per share by ${fmtPct(r.change, 1)}. Issuance turns dilutive.`);
      },
      exp: 2, idea: 3,
      bs: [[T("普通股股东（飞轮停转、可能回购或卖币）", "Common holders (the flywheel stalls; buybacks or coin sales possible)"), 1], [T("日本央行", "The Bank of Japan"), 0], [T("稳定币持有人", "Stablecoin holders"), 0]],
      so: [[T("如果 mNAV 持续低于 1，增发停止，公司转向回购、卖币或合并，除非币价与情绪回升", "If mNAV stays below 1, issuance stops and the company turns to buybacks, coin sales or mergers, unless price and sentiment recover"), 1], [T("公司应该加速增发", "The company should issue faster"), 0], [T("mNAV 与增发无关", "mNAV has nothing to do with issuance"), 0]],
    },
    {
      h: T("“8 月核心 CPI 降至 2021 年 3 月以来最低”", "\"August core CPI falls to its lowest since March 2021\""), d: "2026-09-11",
      f: T("核心 CPI 约 2.4%，但整体 CPI 约 3.4%，能源同比 +16.3%；核心 PCE 约 3.3%。", "Core CPI about 2.4%, but headline about 3.4% with energy +16.3%; core PCE about 3.3%."),
      math: () => T(`费雪公式：10 年期约 5.17%、整体通胀约 3.4% → 实际收益率约 ${fmtPct(realRate(0.0517, 0.034), 2)}；若用 2.4% 核心 → 约 ${fmtPct(realRate(0.0517, 0.024), 2)}。`,
        `Fisher: 10-year about 5.17%, headline inflation about 3.4% → real yield about ${fmtPct(realRate(0.0517, 0.034), 2)}; using 2.4% core → about ${fmtPct(realRate(0.0517, 0.024), 2)}.`),
      exp: 2, idea: 0,
      bs: [[T("所有以实际利率定价的资产：长债、黄金、比特币", "Every asset priced off real rates: long bonds, gold, bitcoin"), 1], [T("只有能源公司", "Only energy companies"), 0], [T("只有美联储", "Only the Fed"), 0]],
      so: [[T("如果核心通胀继续回落而油价不再上涨，加息压力减轻，除非油价冲击传导到核心", "If core keeps easing and oil stops rising, hike pressure eases, unless the oil shock seeps into core"), 1], [T("通胀问题已经彻底解决", "Inflation is fully solved"), 0], [T("美联储一定会马上降息", "The Fed will cut right away"), 0]],
    },
  ];

  // 让参考答案不总在第一个：按新闻序号轮换选项顺序
  const rot = (arr, k) => arr.slice(k % arr.length).concat(arr.slice(0, k % arr.length));
  NEWS.forEach((n, i) => { n.bs = rot(n.bs, i + 1); n.so = rot(n.so, i + 2); });

  let idx = 0;
  const ans = {};
  let checked = false;

  root.innerHTML = `
    <div class="demo">
      <div class="demo-head">${T("📰 五问法练习场：拿真实新闻练手", "📰 Five-question practice room: train on real headlines")}</div>
      <div class="demo-block">
        <label class="demo-label">${T("选一条新闻", "Pick a headline")}</label>
        <div class="demo-btns" id="rn-list">${NEWS.map((n, i) => `<button class="demo-btn" data-i="${i}">${i + 1}</button>`).join("")}</div>
      </div>
      <div class="scn" id="rn-card"></div>
      <div class="demo-block">
        <div class="demo-btns">
          <button class="demo-btn" id="rn-check">${T("对照参考答案", "Check against the model answer")}</button>
          <button class="demo-btn" id="rn-next">${T("下一条", "Next headline")}</button>
        </div>
      </div>
      <div class="stat-row" id="rn-score"></div>
      <div class="demo-block"><div class="demo-log" id="rn-log"></div></div>
      <p class="demo-tip">${T(
        "先别急着看答案：每条新闻都自己回答第②③④⑤问，再按“对照”。注意“顺手算一下”那一行——它就是第①问：把“首次”“创纪录”“跌破”翻译成带分母的数字。做完 7 条，你会发现大多数新闻的第②问答案都是“光看标题判断不了”。",
        "Don't peek: answer questions ②③④⑤ yourself for each headline, then press Check. Watch the \"quick math\" line: that is question ①, turning \"first,\" \"record\" and \"below\" into numbers with denominators. After all 7, you will notice that for most headlines the honest answer to question ② is \"can't tell from the headline alone.\""
      )}</p>
    </div>`;

  const $ = (s) => root.querySelector(s);
  const pick = (name, items, sel, correct) => `
    <div class="demo-seg" data-q="${name}" style="flex-wrap:wrap">${items.map((t, i) => {
      const mark = checked ? (i === correct ? "outline:2px solid var(--green);outline-offset:-2px" : (i === sel ? "outline:2px solid var(--red);outline-offset:-2px" : "")) : "";
      return `<button data-v="${i}" class="${sel === i ? "on" : ""}" style="${mark}">${t}</button>`;
    }).join("")}</div>`;

  function paint() {
    const n = NEWS[idx], a = ans[idx] || {};
    root.querySelectorAll("#rn-list .demo-btn").forEach((b) => b.classList.toggle("active", Number(b.dataset.i) === idx));
    const bsCorrect = n.bs.findIndex((x) => x[1]), soCorrect = n.so.findIndex((x) => x[1]);
    $("#rn-card").innerHTML = `
      <div class="scn-q"><b>${n.h}</b> <span class="pill ok">${n.d}</span></div>
      <div class="demo-label">${T("① 变了什么（事实）", "① What changed (facts)")}</div>
      <div class="scn-meta">${n.f}</div>
      <div class="demo-out" style="font-size:13px">${T("顺手算一下", "Quick math")}${T("：", ": ")}${n.math()}</div>
      <div class="demo-label" style="margin-top:10px">${T("② 和预期比？", "② Versus expectations?")}</div>${pick("exp", EXP, a.exp, n.exp)}
      <div class="demo-label" style="margin-top:10px">${T("③ 主要落在哪个观念？", "③ Which idea does it mainly touch?")}</div>${pick("idea", IDEAS, a.idea, n.idea)}
      <div class="demo-label" style="margin-top:10px">${T("④ 风险在谁的资产负债表上？", "④ Whose balance sheet holds the risk?")}</div>${pick("bs", n.bs.map((x) => x[0]), a.bs, bsCorrect)}
      <div class="demo-label" style="margin-top:10px">${T("⑤ 二阶效应（“如果……那么……除非……”）", "⑤ Second-order effect (\"if … then … unless …\")")}</div>${pick("so", n.so.map((x) => x[0]), a.so, soCorrect)}`;
    root.querySelectorAll("#rn-card .demo-seg").forEach((seg) => seg.querySelectorAll("button").forEach((b) => b.addEventListener("click", () => {
      ans[idx] = { ...(ans[idx] || {}), [seg.dataset.q]: Number(b.dataset.v) };
      checked = false; paint();
    })));

    // 总分
    let done = 0, right = 0;
    NEWS.forEach((m, i) => {
      const x = ans[i]; if (!x) return;
      const keys = [["exp", m.exp], ["idea", m.idea], ["bs", m.bs.findIndex((y) => y[1])], ["so", m.so.findIndex((y) => y[1])]];
      keys.forEach(([k, c]) => { if (x[k] !== undefined) { done++; if (x[k] === c) right++; } });
    });
    $("#rn-score").innerHTML = `
      <div class="stat"><div class="k">${T("已作答", "Answered")}</div><div class="v">${done} / ${NEWS.length * 4}</div></div>
      <div class="stat"><div class="k">${T("与参考答案一致", "Match the model answer")}</div><div class="v acc">${done ? fmtPct(right / done, 0) : "–"}</div></div>`;

    const L = [];
    if (!checked) L.push(`<span>${T("选好四个答案后按“对照参考答案”。绿框 = 参考答案，红框 = 你选的但不一致。", "Choose all four answers, then press Check. Green outline = model answer; red outline = your different choice.")}</span>`);
    else {
      const rows = [["exp", n.exp, T("第②问", "Q②")], ["idea", n.idea, T("第③问", "Q③")], ["bs", bsCorrect, T("第④问", "Q④")], ["so", soCorrect, T("第⑤问", "Q⑤")]];
      rows.forEach(([k, c, lab]) => {
        const v = a[k];
        if (v === undefined) L.push(`<span class="warn">${lab}${T("：还没作答。", ": not answered yet.")}</span>`);
        else if (v === c) L.push(`<span class="ok">${lab}${T("：一致。", ": matches.")}</span>`);
        else L.push(`<span class="bad">${lab}${T("：参考答案不同——看绿框。", ": the model answer differs; see the green outline.")}</span>`);
      });
      if (n.exp === 2) L.push(`<span class="warn">${T("第②问的参考答案是“查预期”：标题本身不告诉你市场事先怎么想——去看期货、一致预期、公司已公布的政策与价格反应。", "The model answer to Q② is \"check expectations\": the headline alone doesn't say what the market thought beforehand. Look at futures, consensus, the company's published policy and the price reaction.")}</span>`);
      L.push(`<span>${T("参考答案是一种合理读法，不是唯一答案；重要的是把理由写出来。本演示不构成投资建议。", "The model answer is one reasonable reading, not the only one; what matters is writing down your reasoning. Not investment advice.")}</span>`);
    }
    $("#rn-log").innerHTML = L.join("");
  }

  root.querySelectorAll("#rn-list .demo-btn").forEach((b) => b.addEventListener("click", () => { idx = Number(b.dataset.i); checked = false; paint(); }));
  $("#rn-check").addEventListener("click", () => { checked = true; paint(); });
  $("#rn-next").addEventListener("click", () => { idx = (idx + 1) % NEWS.length; checked = false; paint(); });
  paint();
}
