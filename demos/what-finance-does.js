// 交互演示：金融的三种搬运——①分类游戏：把日常行为归到“跨时间 / 跨空间 / 跨风险”；
// ②三种搬运各有价格：房贷利率（时间的价格）、跨境汇款成本（管道的价格）、保险汇聚（风险的价格，种子随机模拟）。
import { npv, mean, stdev, rng, fmtUsd, fmtPct, fmtNum, clamp } from "./_fin.js";

export default function mount(root, lang) {
  const en = lang === "en";
  const T = (zh, e) => (en ? e : zh);

  const DIM = {
    time: { name: T("跨时间", "Across time"), color: "var(--orange)" },
    space: { name: T("跨空间", "Across space"), color: "var(--blue)" },
    risk: { name: T("跨风险", "Across risk"), color: "var(--btc)" },
  };

  const ITEMS = [
    { q: T("贷款 40 万美元买房，分 30 年还清", "Taking a $400,000, 30-year mortgage to buy a home"), a: "time",
      why: T("把未来 30 年的工资搬到今天买房，付的“搬运费”就是房贷利率。固定利率还顺带把利率风险搬给了放贷人。", "You pull 30 years of future pay into today; the moving fee is the mortgage rate. A fixed rate also hands interest-rate risk to the lender."), st: T("阶段 2.1 · 阶段 4.5", "Stage 2.1 · Stage 4.5") },
    { q: T("每年交 1,200 美元车险", "Paying $1,200 a year for car insurance"), a: "risk",
      why: T("一次严重车祸的赔偿你扛不住，保险公司把成千上万车主的风险汇聚起来平均掉。", "You couldn't absorb a serious crash on your own; the insurer pools thousands of drivers so the risk averages out."), st: T("阶段 11.1", "Stage 11.1") },
    { q: T("每月定投一只全市场指数基金", "Putting money into a total-market index fund every month"), a: "risk",
      why: T("主要是分散：几百家公司的风险互相抵消。它当然也在跨时间储蓄——真实交易常常同时搬两样。", "Mainly diversification: hundreds of companies' risks offset each other. It is also saving across time — real deals often move two things."), st: T("阶段 5.6 · 阶段 11.1", "Stage 5.6 · Stage 11.1") },
    { q: T("用稳定币给海外家人转 500 美元", "Sending $500 to family abroad in a stablecoin"), a: "space",
      why: T("价值从这里搬到那里，走的是区块链管道而不是代理行链条。稳定币仍是发行人的负债（观念②）。", "Value moves from here to there over blockchain rails instead of a chain of correspondent banks. The stablecoin is still its issuer's liability (Idea ②)."), st: T("阶段 13.2", "Stage 13.2") },
    { q: T("买入一只年股息约 10% 的永续优先股", "Buying a perpetual preferred stock paying about 10% a year"), a: "risk",
      why: T("你拿今天的钱换一串未来股息（跨时间），但那多出来的收益是在补偿你替发行人扛的风险——它是资本结构里被切出来的一层。", "You swap money today for a stream of future dividends (time), but the extra yield is pay for carrying the issuer's risk — it's one slice of the capital stack."), st: T("阶段 6.2 · 阶段 17.3", "Stage 6.2 · Stage 17.3") },
    { q: T("用信用卡买一杯咖啡，当月全额还款", "Buying a coffee by credit card and paying the bill in full"), a: "space",
      why: T("主要是支付：一串账本同步更新，钱从你的银行到店家的银行。只有欠款滚到下个月，才变成跨时间的借贷。", "Mainly a payment: a chain of ledgers updates and money moves from your bank to the café's. It only becomes borrowing across time if you carry a balance."), st: T("阶段 8.2", "Stage 8.2") },
    { q: T("往退休账户里每月存 500 美元", "Saving $500 a month into a retirement account"), a: "time",
      why: T("今天少花，把购买力搬到几十年后。复利让这趟搬运越走越值钱。", "Spend less now and move purchasing power decades ahead. Compounding makes the trip more valuable the longer it runs."), st: T("阶段 2.2", "Stage 2.2") },
    { q: T("农民春天卖出秋天交货的小麦期货", "A farmer selling autumn wheat futures in spring"), a: "risk",
      why: T("锁定卖价，把“麦价暴跌”的风险转给期货买方。", "Locking in a price hands the risk of a wheat-price crash to the futures buyer."), st: T("阶段 7.1", "Stage 7.1") },
    { q: T("一家上市公司发债筹钱，全部买入比特币", "A listed company selling bonds and using all the cash to buy bitcoin"), a: "risk",
      why: T("它用借来的钱放大自己对比特币的敞口——这是杠杆，风险被“加码”到普通股身上。这类公司叫数字资产财库公司。", "It uses borrowed money to magnify its bitcoin exposure — leverage that piles risk onto the common stock. Such firms are called digital asset treasury companies."), st: T("阶段 15.1 · 阶段 16.4", "Stage 15.1 · Stage 16.4") },
    { q: T("把代币化国债基金份额作为 24 小时抵押品转给交易所", "Moving tokenized Treasury-fund shares to an exchange as round-the-clock collateral"), a: "space",
      why: T("同一份国债敞口，在不同平台之间随时移动、随时可用——这就是“管道翻修”。", "The same Treasury exposure moves between platforms and is usable at any hour — that is the plumbing being rebuilt."), st: T("阶段 14.2", "Stage 14.2") },
    { q: T("学生贷款读四年大学", "Taking a student loan for four years of college"), a: "time",
      why: T("把毕业后几十年的收入搬到今天付学费。利率决定这趟搬运的总价。", "You move decades of post-graduation income into today to pay tuition. The rate sets the total price of the trip."), st: T("阶段 2.1", "Stage 2.1") },
    { q: T("买一份股票的看跌期权，防止持仓大跌", "Buying a put option to protect a stock position from a crash"), a: "risk",
      why: T("付一笔权利金，把下跌的尾部风险交给期权卖方——这就是给风险付价。", "You pay a premium to hand the downside tail to the option seller — paying a price for risk."), st: T("阶段 7.2", "Stage 7.2") },
  ];

  let idx = 0, picked = null, score = 0, answered = 0, tab = "time";
  const tally = { time: 0, space: 0, risk: 0 };

  root.innerHTML = `
    <div class="demo">
      <div class="demo-head">${T("🧭 三种搬运：把日常金融行为分类，再给每种搬运算个价", "🧭 Three kinds of moving: sort everyday finance, then price each move")}</div>
      <div class="demo-block">
        <label class="demo-label">${T("① 分类游戏：这件事主要把价值搬过了什么？", "① Sorting game: what does this mainly move value across?")}</label>
        <div class="scn">
          <div class="scn-q" id="wf-q">–</div>
          <div class="scn-meta" id="wf-n">–</div>
        </div>
        <div class="demo-btns" id="wf-pick">
          ${Object.keys(DIM).map((k) => `<button class="demo-btn" data-d="${k}">${DIM[k].name}</button>`).join("")}
        </div>
        <div class="demo-log" id="wf-log"></div>
        <div class="demo-btns"><button class="demo-btn" id="wf-next">${T("下一题 →", "Next →")}</button><button class="demo-btn" id="wf-reset">${T("重新开始", "Start over")}</button></div>
        <div class="stat-row">
          <div class="stat"><div class="k">${T("得分", "Score")}</div><div class="v acc" id="wf-score">0 / 0</div></div>
          <div class="stat"><div class="k">${T("跨时间", "Across time")}</div><div class="v" id="wf-t-time">0</div></div>
          <div class="stat"><div class="k">${T("跨空间", "Across space")}</div><div class="v" id="wf-t-space">0</div></div>
          <div class="stat"><div class="k">${T("跨风险", "Across risk")}</div><div class="v" id="wf-t-risk">0</div></div>
        </div>
      </div>
      <div class="demo-block">
        <label class="demo-label">${T("② 每种搬运都有价格：切换看看", "② Every kind of moving has a price: switch between them")}</label>
        <div class="demo-seg" id="wf-tab">
          <button data-t="time">${T("时间的价格：房贷", "Price of time: a mortgage")}</button>
          <button data-t="space">${T("管道的价格：跨境汇款", "Price of plumbing: sending money abroad")}</button>
          <button data-t="risk">${T("风险的价格：保险汇聚", "Price of risk: pooling insurance")}</button>
        </div>
        <div id="wf-panel" style="margin-top:12px"></div>
      </div>
      <p class="demo-tip">${T(
        "分类时注意：很多行为同时搬两样（优先股既跨时间又跨风险），问的是“主要”搬什么。再到第二部分拖动滑块：房贷利率从 3% 到 7%，房子没变、总利息多出约 35 万美元；保险池从 1 户扩大到 1 万户，每户每年的赔付波动从几万美元缩到几百美元——<strong>这就是“搬运”本身创造的价值</strong>。汇款费用为可调的示意假设。",
        "When sorting, remember many actions move two things at once (a preferred moves both time and risk) — the question is what they mainly move. Then drag the sliders in part two: from a 3% to a 7% mortgage the house is unchanged but total interest rises by about $350,000; grow the insurance pool from 1 home to 10,000 and each home's year-to-year claims swing shrinks from tens of thousands of dollars to a few hundred — <strong>that is the value the moving itself creates</strong>. Transfer fees are adjustable, illustrative assumptions."
      )}</p>
    </div>`;

  const $ = (s) => root.querySelector(s);

  const paintQ = () => {
    const it = ITEMS[idx];
    $("#wf-q").textContent = it.q;
    $("#wf-n").textContent = T("第 ", "Item ") + (idx + 1) + T(" / ", " of ") + ITEMS.length + T(" 题", "");
    root.querySelectorAll("#wf-pick button").forEach((b) => {
      b.classList.toggle("active", picked === b.dataset.d);
      b.disabled = picked !== null;
    });
    if (picked === null) { $("#wf-log").innerHTML = `<div>${T("先选一个答案。", "Pick an answer first.")}</div>`; }
    else {
      const ok = picked === it.a;
      $("#wf-log").innerHTML = `<div class="${ok ? "ok" : "bad"}">${ok ? T("✓ 对了：", "✓ Right: ") : T("✗ 主要是", "✗ Mainly ") + DIM[it.a].name + T("：", ": ")}${it.why}</div><div>${T("哪一节讲透它", "Where the course unpacks it")}${T("：", ": ")}<b>${it.st}</b></div>`;
    }
    $("#wf-score").textContent = score + " / " + answered;
    Object.keys(tally).forEach((k) => { $("#wf-t-" + k).textContent = tally[k]; });
  };

  root.querySelectorAll("#wf-pick button").forEach((b) => b.addEventListener("click", () => {
    if (picked !== null) return;
    picked = b.dataset.d; answered += 1;
    if (picked === ITEMS[idx].a) score += 1;
    tally[ITEMS[idx].a] += 1;
    paintQ();
  }));
  $("#wf-next").addEventListener("click", () => {
    if (idx === ITEMS.length - 1 && picked !== null) {
      $("#wf-log").innerHTML = `<div class="done-banner">${T("全部完成！得分 ", "All done! Score ")}${score} / ${answered}${T("。三种搬运里，跨风险的例子最多——因为现代金融的大部分创新都是在重新切分风险。", ". Risk has the most examples — most modern financial innovation is about re-slicing risk.")}</div>`;
      return;
    }
    idx = (idx + 1) % ITEMS.length; picked = null; paintQ();
  });
  $("#wf-reset").addEventListener("click", () => {
    idx = 0; picked = null; score = 0; answered = 0; tally.time = tally.space = tally.risk = 0; paintQ();
  });

  /* ---------- 第二部分：三种价格 ---------- */
  let loan = 400000, rate = 0.07, years = 30;
  let amt = 500, wireFee = 25, fxSpread = 0.03, rampFee = 0.01, chainFee = 1;
  let homes = 1000, prob = 0.01, loss = 300000, seed = 11;

  // 等额本息月供：贷款额 ÷ 每月 1 美元年金的现值（用共享引擎 npv）
  const payment = (P, r, n) => {
    const flows = []; for (let k = 1; k <= n * 12; k++) flows.push({ t: k, cf: 1 });
    return P / npv(flows, r / 12);
  };

  const slider = (id, label, min, max, step, val) =>
    `<div><label class="demo-label">${label}${T("：", ": ")}<b id="${id}-v"></b></label><input class="demo-slider" type="range" id="${id}" min="${min}" max="${max}" step="${step}" value="${val}"/></div>`;

  const panelTime = () => {
    $("#wf-panel").innerHTML = `
      <div class="demo-grid-3">
        ${slider("wf-loan", T("贷款额", "Loan amount"), 100000, 1000000, 10000, loan)}
        ${slider("wf-rate", T("房贷利率", "Mortgage rate"), 0.02, 0.1, 0.0025, rate)}
        ${slider("wf-yrs", T("期限（年）", "Term (years)"), 10, 30, 5, years)}
      </div>
      <div class="stat-row">
        <div class="stat"><div class="k">${T("月供", "Monthly payment")}</div><div class="v acc" id="wf-pmt">–</div></div>
        <div class="stat"><div class="k">${T("总利息", "Total interest")}</div><div class="v neg" id="wf-int">–</div></div>
        <div class="stat"><div class="k">${T("与 3% 利率相比每月多付", "Extra per month vs a 3% rate")}</div><div class="v" id="wf-ext">–</div></div>
      </div>
      <div id="wf-bars"></div>
      <div class="demo-log" id="wf-tlog"></div>`;
    const upd = () => {
      if (!$("#wf-loan")) return; // 面板已切换、旧控件已移除时忽略迟到的事件
      loan = +$("#wf-loan").value; rate = +$("#wf-rate").value; years = +$("#wf-yrs").value;
      $("#wf-loan-v").textContent = fmtUsd(loan);
      $("#wf-rate-v").textContent = fmtPct(rate, 2);
      $("#wf-yrs-v").textContent = years;
      const p = payment(loan, rate, years), p3 = payment(loan, 0.03, years);
      const interest = p * years * 12 - loan;
      $("#wf-pmt").textContent = fmtUsd(p);
      $("#wf-int").textContent = fmtUsd(interest);
      $("#wf-ext").textContent = (p - p3 >= 0 ? "+" : "") + fmtUsd(p - p3);
      const tot = p * years * 12;
      $("#wf-bars").innerHTML = `
        <div class="bar2"><span class="lab">${T("本金", "Principal")}</span><div class="track"><div class="fill" style="width:${clamp((loan / tot) * 100, 0, 100)}%;background:var(--blue)"></div></div><span class="val">${fmtUsd(loan)}</span></div>
        <div class="bar2"><span class="lab">${T("利息（时间的价格）", "Interest (the price of time)")}</span><div class="track"><div class="fill" style="width:${clamp((interest / tot) * 100, 0, 100)}%;background:var(--orange)"></div></div><span class="val">${fmtUsd(interest)}</span></div>`;
      const note = rate >= 0.065
        ? `<span class="warn">${T("截至 2026 年 9 月，美国 30 年期房贷利率约 7%，而 30 年期国债收益率约 5.5%（2004 年以来最高）。房贷利率大体跟着长期国债走（阶段 4.5）。", "As of September 2026, US 30-year mortgage rates were about 7% and the 30-year Treasury yield about 5.5% (the highest since 2004). Mortgage rates broadly track long Treasury yields (Stage 4.5).")}</span>`
        : rate <= 0.035
        ? `<span class="ok">${T("这是 2021 年前后的低利率世界：同样的房子，月供便宜得多。", "This is the low-rate world of around 2021: same house, far cheaper monthly payment.")}</span>`
        : `<span>${T("利率每升 1 个百分点，月供就明显抬高——房子没变，变的只是时间的价格。", "Each extra percentage point lifts the payment noticeably — the house is the same; only the price of time changed.")}</span>`;
      $("#wf-tlog").innerHTML = `<div>${T("利息占你 ", "Interest is ")}<b>${fmtPct(interest / tot, 0)}</b>${T(" 的总还款。", " of everything you repay.")}</div><div>${note}</div>`;
    };
    ["#wf-loan", "#wf-rate", "#wf-yrs"].forEach((s) => $(s).addEventListener("input", upd));
    upd();
  };

  const panelSpace = () => {
    $("#wf-panel").innerHTML = `
      <div class="demo-grid">
        ${slider("wf-amt", T("汇款金额", "Amount sent"), 50, 5000, 50, amt)}
        ${slider("wf-wf", T("银行电汇固定手续费", "Bank wire flat fee"), 0, 50, 1, wireFee)}
        ${slider("wf-fx", T("银行汇率差价", "Bank FX markup"), 0, 0.06, 0.0025, fxSpread)}
        ${slider("wf-rf", T("稳定币出入金费率（两端合计）", "Stablecoin on/off-ramp fees (both ends)"), 0, 0.04, 0.0025, rampFee)}
      </div>
      <div class="cmp">
        <div class="cmp-cell cold"><b>${T("传统电汇", "Traditional wire")}</b><div id="wf-c1"></div></div>
        <div class="cmp-cell hl"><b>${T("稳定币转账", "Stablecoin transfer")}</b><div id="wf-c2"></div></div>
      </div>
      <div class="demo-log" id="wf-slog"></div>`;
    const upd = () => {
      if (!$("#wf-amt")) return;
      amt = +$("#wf-amt").value; wireFee = +$("#wf-wf").value; fxSpread = +$("#wf-fx").value; rampFee = +$("#wf-rf").value;
      $("#wf-amt-v").textContent = fmtUsd(amt);
      $("#wf-wf-v").textContent = fmtUsd(wireFee);
      $("#wf-fx-v").textContent = fmtPct(fxSpread, 2);
      $("#wf-rf-v").textContent = fmtPct(rampFee, 2);
      const c1 = wireFee + amt * fxSpread, c2 = chainFee + amt * rampFee;
      $("#wf-c1").innerHTML = `${T("成本", "Cost")}${T("：", ": ")}<b>${fmtUsd(c1, 2)}</b>${T("（", " (")}${fmtPct(c1 / amt, 1)}${T("）", ")")}<br>${T("到账", "Arrives")}${T("：", ": ")}${T("约 1–3 个工作日", "about 1–3 business days")}<br>${T("家人收到", "Family receives")}${T("：", ": ")}${fmtUsd(amt - c1, 2)}`;
      $("#wf-c2").innerHTML = `${T("成本", "Cost")}${T("：", ": ")}<b>${fmtUsd(c2, 2)}</b>${T("（", " (")}${fmtPct(c2 / amt, 1)}${T("）", ")")}<br>${T("到账", "Arrives")}${T("：", ": ")}${T("几分钟，7×24", "minutes, 24/7")}<br>${T("家人收到", "Family receives")}${T("：", ": ")}${fmtUsd(amt - c2, 2)}`;
      const lines = [`<div>${T("每汇 100 美元，差价约 ", "Per $100 sent, the gap is about ")}<b>${fmtUsd(((c1 - c2) / amt) * 100, 2)}</b>${T("。", ".")}</div>`];
      lines.push(`<div class="warn">${T("但稳定币不是“免费的美元”：它是发行人的负债，要看储备质量（阶段 13.2）；家人那一端还得有地方把它换成本地货币。截至 2026 年 9 月，美国《GENIUS 法案》已生效，但市场结构法案《CLARITY 法案》仍卡在参议院。", "But a stablecoin isn't “free dollars”: it's the issuer's liability and only as good as its reserves (Stage 13.2), and the family still needs somewhere to cash out locally. As of September 2026 the US GENIUS Act is law, but the CLARITY market-structure bill is still stuck in the Senate.")}</div>`);
      $("#wf-slog").innerHTML = lines.join("");
    };
    ["#wf-amt", "#wf-wf", "#wf-fx", "#wf-rf"].forEach((s) => $(s).addEventListener("input", upd));
    upd();
  };

  const panelRisk = () => {
    $("#wf-panel").innerHTML = `
      <div class="demo-grid-3">
        ${slider("wf-h", T("保险池里的家庭数", "Homes in the pool"), 0, 4, 1, Math.log10(homes))}
        ${slider("wf-p", T("每户每年着火概率", "Yearly fire probability per home"), 0.002, 0.03, 0.001, prob)}
        ${slider("wf-l", T("一次着火的损失", "Loss per fire"), 50000, 800000, 10000, loss)}
      </div>
      <div class="stat-row">
        <div class="stat"><div class="k">${T("公平保费（每户每年）", "Fair premium (per home, per year)")}</div><div class="v acc" id="wf-prem">–</div></div>
        <div class="stat"><div class="k">${T("200 年模拟：每户年均赔付", "200-year simulation: avg claims per home")}</div><div class="v" id="wf-avg">–</div></div>
        <div class="stat"><div class="k">${T("每户年度赔付波动（标准差）", "Year-to-year swing per home (std. dev.)")}</div><div class="v neg" id="wf-sd">–</div></div>
        <div class="stat"><div class="k">${T("最糟糕的一年（每户）", "Worst year (per home)")}</div><div class="v" id="wf-max">–</div></div>
      </div>
      <div id="wf-rbars"></div>
      <div class="demo-btns"><button class="demo-btn" id="wf-seed">${T("🎲 换一组随机的 200 年", "🎲 Roll another 200 years")}</button></div>
      <div class="demo-log" id="wf-rlog"></div>`;
    const simulate = (N) => {
      const rand = rng(seed * 131 + N);
      const perHome = [];
      for (let y = 0; y < 200; y++) {
        let fires = 0;
        for (let i = 0; i < N; i++) if (rand() < prob) fires += 1;
        perHome.push((fires * loss) / N);
      }
      return perHome;
    };
    const upd = () => {
      if (!$("#wf-h")) return;
      homes = Math.round(Math.pow(10, +$("#wf-h").value)); prob = +$("#wf-p").value; loss = +$("#wf-l").value;
      $("#wf-h-v").textContent = fmtNum(homes, 0);
      $("#wf-p-v").textContent = fmtPct(prob, 1);
      $("#wf-l-v").textContent = fmtUsd(loss);
      const s = simulate(homes);
      const sd = stdev(s), mx = Math.max(...s);
      $("#wf-prem").textContent = fmtUsd(prob * loss);
      $("#wf-avg").textContent = fmtUsd(mean(s));
      $("#wf-sd").textContent = fmtUsd(sd);
      $("#wf-max").textContent = fmtUsd(mx);
      // 对比不同池子规模的波动
      const sizes = [1, 10, 100, 1000, 10000];
      const sds = sizes.map((n) => stdev(simulate(n)));
      const top = Math.max(...sds) || 1;
      $("#wf-rbars").innerHTML = sizes.map((n, i) => `<div class="bar2"><span class="lab" style="${n === homes ? "color:var(--btc);font-weight:700" : ""}">${fmtNum(n, 0)} ${T("户", n === 1 ? "home" : "homes")}</span><div class="track"><div class="fill" style="width:${clamp((sds[i] / top) * 100, 1, 100)}%;background:var(--btc)"></div></div><span class="val">${fmtUsd(sds[i])}</span></div>`).join("");
      $("#wf-rlog").innerHTML = homes === 1
        ? `<div class="bad">${T("只有你一户：大多数年份赔付为 0，但一旦着火就是 ", "Just your home: most years cost nothing, but a fire costs ")}${fmtUsd(loss)}${T("——要么没事，要么破产。", " — fine or ruined, nothing in between.")}</div>`
        : `<div class="ok">${T("池子越大，每户每年的实际赔付越贴近公平保费 ", "The bigger the pool, the closer each home's actual yearly cost sits to the fair premium of ")}${fmtUsd(prob * loss)}${T("。风险没有消失，只是被汇聚后平均掉了（大数定律）。", ". The risk didn't vanish — pooling averaged it out (the law of large numbers).")}</div>`;
    };
    ["#wf-h", "#wf-p", "#wf-l"].forEach((s) => $(s).addEventListener("input", upd));
    $("#wf-seed").addEventListener("click", () => { seed += 1; upd(); });
    upd();
  };

  const paintTab = () => {
    root.querySelectorAll("#wf-tab button").forEach((b) => b.classList.toggle("on", b.dataset.t === tab));
    if (tab === "time") panelTime(); else if (tab === "space") panelSpace(); else panelRisk();
  };
  root.querySelectorAll("#wf-tab button").forEach((b) => b.addEventListener("click", () => { tab = b.dataset.t; paintTab(); }));

  paintQ();
  paintTab();
}
