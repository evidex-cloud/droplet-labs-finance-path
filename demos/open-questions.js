// 交互演示：五个未解问题的“辩论沙盘”——每个问题一个真实计算的小模型（BTC 信用利差、mNAV 赚回年数、
// 代币化国债复利、稳定币与银行存款、AI 与长端利率），外加“你的倾向 + 信号”记录卡。
// 数据锚：_research/macro-facts.md、dat-facts.md（2026 年 9 月快照）；橙子公司见 AUTHORING §0.2。仅讲机制，不构成投资建议。
import { btcRiskProb, btcCredit, btcFloorPrice, issueAndBuy, fv, bondPrice, perpetuity, fmtPct, fmtNum, fmtUsd, fmtBig, clamp } from "./_fin.js";
import { lineChart, chartBlock } from "./_chart.js";

export default function mount(root, lang) {
  const en = lang === "en";
  const T = (zh, e) => (en ? e : zh);
  const C = T("：", ": ");

  const Q = [
    { k: "credit", n: "①", t: T("比特币信用", "Bitcoin credit"), sign: T("没有牛市帮忙时利差是否收窄；是否出现评级方法论与更多发行人", "Whether spreads narrow without a bull market; whether rating methods and more issuers appear") },
    { k: "premium", n: "②", t: T("DAT 溢价", "DAT premiums"), sign: T("跨完整周期的 mNAV 中位数；每股比特币增长来自普通股还是优先股；MSCI 决定", "Through-cycle median mNAV; whether BTC-per-share growth comes from common or preferred issuance; the MSCI ruling") },
    { k: "token", n: "③", t: T("代币化抵押品", "Tokenized collateral"), sign: T("清算所是否接受为保证金；DTCC 试点规模；熊市中是否仍增长", "Clearinghouse acceptance as margin; DTCC pilot size; growth during a bear market") },
    { k: "stable", n: "④", t: T("稳定币与银行", "Stablecoins vs banks"), sign: T("存款流向；是否出现变相付息；存款代币使用量", "Where deposits flow; any disguised yield; deposit-token usage") },
    { k: "ai", n: "⑤", t: T("AI 与利率", "AI and rates"), sign: T("生产率数据；期限溢价；AI 资本开支靠借钱的比重；通胀", "Productivity data; term premium; how much AI capex is borrowed; inflation") },
  ];
  const leanLab = [T("强烈不会", "Strong no"), T("偏不会", "Lean no"), T("不确定", "Unsure"), T("偏会", "Lean yes"), T("强烈会", "Strong yes")];
  const leanProb = [10, 30, 50, 70, 90];

  const st = {
    tab: "credit",
    rating: 5.7, vol: 40, mu: 10, dur: 8.1, mkt: 12, tsy: 5.2,
    mnav: 1.5, iss: 10,
    g: 150, yrs: 4, buf: 5,
    supply: 1.0, fromDep: 60, bills: 80, ldr: 75,
    rstar: 0, tp: 0, spr: 4.5,
    lean: { credit: 2, premium: 2, token: 2, stable: 2, ai: 2 },
  };

  const sl = (id, label, min, max, step, val) => `
    <label class="demo-label">${label}${C}<b id="oq-${id}-v"></b></label>
    <input class="demo-slider" id="oq-${id}" type="range" min="${min}" max="${max}" step="${step}" value="${val}" />`;

  root.innerHTML = `
    <div class="demo">
      <div class="demo-head">${T("🧭 五个未解问题：用真实计算把争论拆开", "🧭 Five open questions: take the arguments apart with real math")}</div>
      <div class="demo-block">
        <div class="demo-seg" id="oq-tabs" style="flex-wrap:wrap;border-radius:14px">${Q.map((q, i) => `<button data-t="${q.k}" class="${i === 0 ? "on" : ""}">${q.n} ${q.t}</button>`).join("")}</div>
      </div>

      <div data-p="credit" class="oq-panel">
        <div class="demo-grid">
          <div class="demo-block">
            ${sl("rating", T("BTC 评级（覆盖倍数）", "BTC Rating (coverage)"), 1.5, 8, 0.1, st.rating)}
            ${sl("vol", T("比特币年化波动率", "Bitcoin annual volatility"), 20, 90, 5, st.vol)}
            ${sl("mu", T("比特币年化预期回报", "Bitcoin expected annual return"), -10, 30, 1, st.mu)}
          </div>
          <div class="demo-block">
            ${sl("dur", T("久期（年）", "Duration (years)"), 3, 15, 0.1, st.dur)}
            ${sl("mkt", T("优先股股息率（市场）", "Preferred dividend yield (market)"), 6, 16, 0.25, st.mkt)}
            ${sl("tsy", T("10 年期美债收益率", "10-year Treasury yield"), 3, 7, 0.05, st.tsy)}
          </div>
        </div>
        <div class="stat-row" id="oq-credit-stats"></div>
        <div class="demo-block" id="oq-credit-chart"></div>
      </div>

      <div data-p="premium" class="oq-panel" style="display:none">
        <div class="demo-grid">
          <div class="demo-block">${sl("mnav", T("mNAV（市值口径）", "mNAV (market-cap basis)"), 0.5, 3, 0.05, st.mnav)}</div>
          <div class="demo-block">${sl("iss", T("每年按市价增发（占股本 %）", "Annual issuance at market (% of shares)"), 0, 30, 1, st.iss)}</div>
        </div>
        <div class="stat-row" id="oq-prem-stats"></div>
        <div class="demo-block" id="oq-prem-chart"></div>
      </div>

      <div data-p="token" class="oq-panel" style="display:none">
        <div class="demo-grid">
          <div class="demo-block">${sl("g", T("代币化国债年增速", "Tokenized-Treasury annual growth"), 0, 200, 5, st.g)}${sl("yrs", T("年数", "Years"), 1, 10, 1, st.yrs)}</div>
          <div class="demo-block">${sl("buf", T("为周末与结算时差预留的闲置抵押品（占规模）", "Idle collateral pre-positioned for weekends and settlement gaps (share of pool)"), 0, 20, 1, st.buf)}</div>
        </div>
        <div class="stat-row" id="oq-token-stats"></div>
      </div>

      <div data-p="stable" class="oq-panel" style="display:none">
        <div class="demo-grid">
          <div class="demo-block">${sl("supply", T("稳定币总供应（万亿美元）", "Stablecoin supply ($ trillion)"), 0.3, 3, 0.05, st.supply)}${sl("fromDep", T("新增部分来自银行存款的比例", "Share of new supply coming out of bank deposits"), 0, 100, 5, st.fromDep)}</div>
          <div class="demo-block">${sl("bills", T("储备中国库券占比（示意）", "Share of reserves in T-bills (illustrative)"), 0, 100, 5, st.bills)}${sl("ldr", T("银行贷存比（示意）", "Bank loan-to-deposit ratio (illustrative)"), 50, 100, 5, st.ldr)}</div>
        </div>
        <div class="stat-row" id="oq-stable-stats"></div>
      </div>

      <div data-p="ai" class="oq-panel" style="display:none">
        <div class="demo-grid">
          <div class="demo-block">${sl("rstar", T("AI 对中性利率的影响（百分点）", "AI's effect on the neutral rate (points)"), -1.5, 1.5, 0.1, st.rstar)}${sl("tp", T("期限溢价变化（百分点）", "Change in term premium (points)"), -1, 1.5, 0.1, st.tp)}</div>
          <div class="demo-block">${sl("spr", T("比特币信用相对 30 年期美债的利差", "Bitcoin-credit spread over the 30-year"), 2, 8, 0.25, st.spr)}</div>
        </div>
        <div class="stat-row" id="oq-ai-stats"></div>
      </div>

      <div class="demo-block"><div class="demo-log" id="oq-log"></div></div>

      <div class="demo-block">
        <div class="demo-label">${T("你的倾向（本题）", "Your lean (this question)")}</div>
        <div class="demo-seg" id="oq-lean" style="flex-wrap:wrap;border-radius:14px">${leanLab.map((l, i) => `<button data-l="${i}">${l}</button>`).join("")}</div>
        <div class="demo-label" style="margin-top:12px">${T("你的五题记录卡", "Your five-question scorecard")}</div>
        <div class="stages" id="oq-card"></div>
      </div>

      <p class="demo-tip">${T(
        "先在 ① 里把波动率从 40% 拖到 60%：模型所需利差会从不到 1% 跳到好几个百分点——这就是“十倍缺口”争论的核心。再到 ② 把 mNAV 拖到 1 以下，看“赚回溢价年数”变成“永远”。每题都给自己一个倾向，然后读记录卡里的信号：真正的分析者记下的是“什么会让我改变主意”。",
        "Start in ① and drag volatility from 40% to 60%: the model's required spread jumps from under 1% to several points. That is the heart of the \"tenfold gap\" debate. Then go to ② and drag mNAV below 1 to watch \"years to earn back the premium\" turn into \"never\". Give yourself a lean on each question and read the signposts on the scorecard: a real analyst writes down what would change their mind."
      )}</p>
    </div>`;

  const q = (s) => root.querySelector(s);
  const stat = (k, v, cls = "") => `<div class="stat"><div class="k">${k}</div><div class="v ${cls}">${v}</div></div>`;
  const bp = (x) => (isFinite(x) ? fmtNum(x * 10000, 0) + " bp" : "–");

  const paintCredit = (L) => {
    const r = st.rating, vol = st.vol / 100, mu = st.mu / 100, T0 = st.dur;
    const risk = btcRiskProb(r, mu, vol, T0);
    const need = btcCredit(risk, T0);
    const mktSpr = (st.mkt - st.tsy) / 100;
    const ratio = need > 0 ? mktSpr / need : Infinity;
    q("#oq-credit-stats").innerHTML =
      stat(T("跌破 1 倍的概率（BTC Risk）", "Chance of falling below 1x (BTC Risk)"), fmtPct(risk, 1), risk > 0.2 ? "neg" : "") +
      stat(T("模型所需利差（BTC Credit）", "Model-required spread (BTC Credit)"), bp(need), "acc") +
      stat(T("市场实际利差", "Actual market spread"), bp(mktSpr)) +
      stat(T("市场 ÷ 模型", "Market ÷ model"), isFinite(ratio) ? fmtNum(ratio, 1) + "x" : "∞", ratio > 3 ? "pos" : ratio < 1 ? "neg" : "") +
      stat(T("BTC 地板价（按 $84,100）", "BTC floor price (at $84,100)"), fmtUsd(btcFloorPrice(84100, r), 0));
    const res = lineChart({
      fns: [{ f: (v) => btcCredit(btcRiskProb(r, mu, v / 100, T0), T0) * 100, cls: "line5" }, { f: () => mktSpr * 100, cls: "line2" }],
      lo: 20, hi: 90, samples: 70, forceZero: true, xlabel: T("比特币年化波动率（%）", "Bitcoin annual volatility (%)"), markerX: st.vol, markerLabel: T("当前", "now"), uid: "oqc",
    });
    q("#oq-credit-chart").innerHTML = `<div class="demo-label">${T("所需利差对波动率假设有多敏感（%）", "How sensitive the required spread is to the volatility assumption (%)")}</div>` +
      chartBlock(res, [["var(--btc)", T("模型所需利差", "model-required spread")], ["var(--blue)", T("市场实际利差", "actual market spread")]]);
    if (ratio > 3) L.push(`<span class="ok">${T("市场给的补偿是模型的", "The market pays")} ${fmtNum(ratio, 1)}${T(" 倍。支持方读作“新资产类别溢价，会收窄”；反对方读作“模型漏掉了尾部与‘坏事一起发生’的风险”。", "x what the model needs. Bulls read this as a new-asset-class premium that will shrink; bears read it as the model missing tail risk and bad things happening together.")}</span>`);
    else if (ratio >= 1) L.push(`<span class="warn">${T("在这组假设下，市场利差只比模型略宽——缺口大部分被“更悲观的假设”解释掉了。", "Under these assumptions the market spread is only a little wider than the model's: pessimistic assumptions explain most of the gap.")}</span>`);
    else L.push(`<span class="bad">${T("在这组假设下，模型要的利差比市场给的还多：按这个模型，这张证券的补偿不够。", "Under these assumptions the model demands more spread than the market pays: by this model, the security is under-compensated.")}</span>`);
    L.push(`${T("Strategy 2026-08-23 对 STRC 的公布值：BTC 评级约 5.7x、BTC Credit 约 59bp（假设 10% 回报、40% 波动）。改动任何一个假设，结论都会变——这正是问题“未解”的原因。", "Strategy's published figures for STRC on 2026-08-23: BTC Rating about 5.7x and BTC Credit about 59bp (assuming 10% return and 40% volatility). Change any one assumption and the conclusion moves, which is exactly why the question is open.")}`);
  };

  const paintPremium = (L) => {
    const btc = 10000, shares = 100e6, px0 = 100000, navps = (btc * px0) / shares;
    const px = st.mnav * navps;
    const r = issueAndBuy({ btc, shares, btcPrice: px0, px, newShares: shares * st.iss / 100 });
    const g = r.change;
    const years = g > 0 && st.mnav > 1 ? Math.log(st.mnav) / Math.log(1 + g) : Infinity;
    const bps5 = fv(1, g, 5);
    q("#oq-prem-stats").innerHTML =
      stat(T("增发价", "Issue price"), fmtUsd(px, 2)) +
      stat(T("每股比特币年增速 g", "BTC-per-share growth g"), fmtPct(g, 2), g > 0 ? "pos" : g < 0 ? "neg" : "") +
      stat(T("赚回溢价年数", "Years to earn back premium"), st.mnav <= 1 ? T("无溢价", "no premium") : isFinite(years) ? fmtNum(years, 1) : T("永远", "never"), "acc") +
      stat(T("5 年后每股比特币（期初 = 1）", "BTC per share after 5 yrs (start = 1)"), fmtNum(bps5, 3));
    const res = lineChart({
      fns: [{ f: (m) => { const c = issueAndBuy({ btc, shares, btcPrice: px0, px: m * navps, newShares: shares * Math.max(st.iss, 1) / 100 }).change; return c > 0 && m > 1 ? clamp(Math.log(m) / Math.log(1 + c), 0, 40) : NaN; }, cls: "line" }],
      lo: 1.05, hi: 3, samples: 80, forceZero: true, xlabel: "mNAV", markerX: st.mnav, markerLabel: T("当前", "now"), uid: "oqp",
    });
    q("#oq-prem-chart").innerHTML = `<div class="demo-label">${T("赚回溢价所需年数 vs mNAV（按当前增发比例，封顶 40 年）", "Years to earn back the premium vs mNAV (at the current issuance rate, capped at 40)")}</div>` + chartBlock(res, [["var(--orange)", T("年数", "years")]]);
    if (st.mnav < 1) L.push(`<span class="bad">${T("mNAV < 1：按市价增发会稀释每股比特币（g 为负）。飞轮反转，公司只能靠回购、卖币或发优先股（后者增加更高级的索取权）。", "mNAV below 1: issuing at market dilutes bitcoin per share (g is negative). The flywheel reverses, leaving buybacks, bitcoin sales, or preferred issuance (which adds more senior claims).")}</span>`);
    else L.push(`${T("溢价", "A premium of")} ${fmtPct(st.mnav - 1, 0)} ${T("配上每年", "plus annual issuance of")} ${st.iss}% ${T("的增发，每股比特币每年增长约", "grows bitcoin per share by about")} ${fmtPct(g, 2)}${T("。争论的实质是：这个 g 能在熊市里维持吗？", " a year. The real argument: can that g survive a bear market?")}`);
    L.push(`${T("反身性：g 依赖 mNAV，mNAV 又依赖市场对 g 的预期（阶段 10.4）。2026 年 9 月，最大的 20 家 DAT 中 16 家低于 1 倍。", "Reflexivity: g depends on mNAV, and mNAV depends on what the market expects g to be (Stage 10.4). In September 2026, 16 of the 20 largest DATs traded below 1x.")}`);
  };

  const paintToken = (L) => {
    const start = 15.9e9, bills = 7.25e12, g = st.g / 100;
    const size = fv(start, g, st.yrs);
    const share = size / bills;
    const yrs10 = g > 0 ? Math.log((0.1 * bills) / start) / Math.log(1 + g) : Infinity;
    const saving = size * (st.buf / 100) * 0.0424;
    q("#oq-token-stats").innerHTML =
      stat(T("起点（2026 年年中）", "Start (mid-2026)"), "$" + fmtBig(start)) +
      stat(T(st.yrs + " 年后规模", "Size after " + st.yrs + " yrs"), "$" + fmtBig(size), "acc") +
      stat(T("占国库券市场", "Share of the bill market"), fmtPct(share, share < 0.01 ? 2 : 1)) +
      stat(T("到 10% 需要", "Years to reach 10%"), isFinite(yrs10) ? fmtNum(yrs10, 1) + T(" 年", " yrs") : T("永远", "never")) +
      stat(T("若释放这部分缓冲，每年省下的融资成本（按 4.24%）", "Funding cost saved per year if that buffer is freed (at 4.24%)"), "$" + fmtBig(saving));
    L.push(`${T("起点只占约 7.25 万亿美元国库券市场的", "The starting point is only about")} ${fmtPct(start / bills, 2)}${T("。复利能把小数字变大，但前提是增速在比特币熊市、法律检验和清算所的审慎之下还能维持。", " of the roughly $7.25 trillion bill market. Compounding can make a small number big, but only if growth survives a bitcoin bear market, legal testing and clearinghouse caution.")}`);
    if (share > 0.312e12 / bills) L.push(`<span class="ok">${T("这个规模已超过 2026 年 9 月全部稳定币（约 3,120 亿美元）——那将是“进入核心管道”的有力信号。", "At this size it would exceed all stablecoins in September 2026 (about $312 billion), a strong sign of entering the core plumbing.")}</span>`);
    else L.push(`<span class="warn">${T("仍小于 2026 年 9 月的稳定币总量（约 3,120 亿美元）：更像加密世界内部的工具，而非主流抵押品。", "Still smaller than total stablecoins in September 2026 (about $312 billion): more a crypto-internal tool than mainstream collateral.")}</span>`);
  };

  const paintStable = (L) => {
    const now = 0.312e12, s = st.supply * 1e12, inc = Math.max(0, s - now);
    const billDemand = s * st.bills / 100, depLost = inc * st.fromDep / 100, loanCap = depLost * st.ldr / 100;
    q("#oq-stable-stats").innerHTML =
      stat(T("对国库券的需求", "Demand for T-bills"), "$" + fmtBig(billDemand), "acc") +
      stat(T("占国库券市场", "Share of the bill market"), fmtPct(billDemand / 7.25e12, 1)) +
      stat(T("流出的银行存款", "Bank deposits drained"), "$" + fmtBig(depLost), depLost > 0 ? "neg" : "") +
      stat(T("银行放贷能力减少（示意）", "Lending capacity lost (illustrative)"), "$" + fmtBig(loanCap), loanCap > 0 ? "neg" : "");
    L.push(`${T("这就是堪萨斯城联储的论点：国库券多了", "This is the Kansas City Fed's point: bills gain")} $${fmtBig(billDemand)} ${T("的买家，但其中来自存款的部分意味着银行少了", "of buyers, but the part funded from deposits means banks lose")} $${fmtBig(depLost)} ${T("的资金。", "of funding.")}`);
    L.push(`<span class="warn">${T("GENIUS 法案禁止发行人付息：不付息的钱更像“数字现金”，很难大规模吸走储蓄存款。把“来自存款的比例”调低，就是“互补 / 被收编”的世界。", "The GENIUS Act bars issuers from paying interest: money that pays nothing looks like digital cash and struggles to pull in savings. Turn the deposit share down and you are in the \"complement or absorbed\" world.")}</span>`);
  };

  const paintAi = (L) => {
    const base = 0.0549, y = base + (st.rstar + st.tp) / 100, req = y + st.spr / 100;
    const b0 = bondPrice(100, 0.05, base, 30), b1 = bondPrice(100, 0.05, y, 30);
    const p0 = perpetuity(10, base + st.spr / 100), p1 = perpetuity(10, req);
    q("#oq-ai-stats").innerHTML =
      stat(T("30 年期美债收益率", "30-year Treasury yield"), fmtPct(y, 2), y > base ? "neg" : y < base ? "pos" : "") +
      stat(T("30 年期 5% 债券价格", "Price of a 30-yr 5% bond"), fmtNum(b1, 1), b1 < b0 ? "neg" : "") +
      stat(T("相对 5.49% 基准", "vs the 5.49% base"), fmtPct(b1 / b0 - 1, 1), b1 < b0 ? "neg" : "pos") +
      stat(T("10% 永续优先股价格", "Price of a 10% perpetual preferred"), fmtNum(p1, 1), "acc") +
      stat(T("优先股价格变化", "Preferred price change"), fmtPct(p1 / p0 - 1, 1), p1 < p0 ? "neg" : "pos");
    L.push(`${T("基准：2026-09-25 的 30 年期美债约 5.49%。AI 推高中性利率 + 期限溢价上升 →", "Base: the 30-year yielded about 5.49% on 2026-09-25. AI lifting the neutral rate plus a higher term premium →")} ${fmtPct(y, 2)}${T("。同一个利率变化同时打到国债、优先股和 DAT 的融资成本上。", ". The same rate move hits Treasuries, preferreds and DATs' cost of capital all at once.")}`);
    if (st.rstar + st.tp > 0) L.push(`<span class="warn">${T("“AI 让利率更高”的世界里，比特币信用要么价格下跌，要么要求更高的股息率——数字信用与国债之间的利差更难维持。", "In an \"AI means higher rates\" world, bitcoin credit either falls in price or must pay a higher dividend, and the spread between Digital Credit and Treasuries gets harder to sustain.")}</span>`);
    else if (st.rstar + st.tp < 0) L.push(`<span class="ok">${T("“AI 通缩”的世界里，长端利率下降，永续优先股与长债同时受益（观念①）。", "In an \"AI deflation\" world, long rates fall and perpetual preferreds rally along with long bonds (Idea ①).")}</span>`);
  };

  const paint = () => {
    const L = [];
    ["rating", "vol", "mu", "dur", "mkt", "tsy", "mnav", "iss", "g", "yrs", "buf", "supply", "fromDep", "bills", "ldr", "rstar", "tp", "spr"].forEach((k) => {
      const v = st[k], el = q("#oq-" + k + "-v"); if (!el) return;
      el.textContent = ["vol", "mu", "iss", "g", "buf", "fromDep", "bills", "ldr"].includes(k) ? v + "%"
        : ["mkt", "tsy", "spr"].includes(k) ? fmtNum(v, 2) + "%"
        : ["rstar", "tp"].includes(k) ? (v > 0 ? "+" : "") + fmtNum(v, 1)
        : k === "supply" ? "$" + fmtNum(v, 2) + T(" 万亿", "T")
        : k === "rating" || k === "mnav" ? fmtNum(v, 2) + "x"
        : k === "yrs" ? v + T(" 年", " yrs") : fmtNum(v, 1);
    });
    ({ credit: paintCredit, premium: paintPremium, token: paintToken, stable: paintStable, ai: paintAi })[st.tab](L);
    L.push(`<span class="warn">${T("示意模型，只讲机制，不构成投资建议，也不预测价格。", "Illustrative models: mechanics only, not investment advice, and no price forecasts.")}</span>`);
    q("#oq-log").innerHTML = L.map((l) => `<div>${l}</div>`).join("");
    root.querySelectorAll("#oq-lean button").forEach((b) => b.classList.toggle("on", +b.dataset.l === st.lean[st.tab]));
    q("#oq-card").innerHTML = Q.map((x) => {
      const li = st.lean[x.k], p = leanProb[li];
      return `<div class="stage-bar"><div class="lab">${x.n} ${x.t}</div><div class="track"><div class="fill" style="width:${p}%;background:${li > 2 ? "var(--green)" : li < 2 ? "var(--red)" : "var(--muted)"}"></div></div><div class="val">${leanLab[li]} ${T("（约", "(about ")}${p}%${T("）", ")")}</div></div><div class="demo-meta" style="margin:-2px 0 8px">${T("改变主意的信号", "Signposts that would change your mind")}${C}${x.sign}</div>`;
    }).join("");
  };

  root.querySelectorAll("#oq-tabs button").forEach((b) => b.addEventListener("click", () => {
    st.tab = b.dataset.t;
    root.querySelectorAll("#oq-tabs button").forEach((o) => o.classList.toggle("on", o === b));
    root.querySelectorAll(".oq-panel").forEach((p) => { p.style.display = p.dataset.p === st.tab ? "" : "none"; });
    paint();
  }));
  root.querySelectorAll("#oq-lean button").forEach((b) => b.addEventListener("click", () => { st.lean[st.tab] = +b.dataset.l; paint(); }));
  ["rating", "vol", "mu", "dur", "mkt", "tsy", "mnav", "iss", "g", "yrs", "buf", "supply", "fromDep", "bills", "ldr", "rstar", "tp", "spr"].forEach((k) => {
    q("#oq-" + k).addEventListener("input", (e) => { st[k] = +e.target.value; paint(); });
  });
  paint();
}
