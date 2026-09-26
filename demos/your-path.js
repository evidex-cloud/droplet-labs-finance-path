// 交互演示：新金融路线规划器——选角色、起点、每周小时数，勾掉已掌握的技能，
// 生成技能缺口条、按周排好的学习时间线（课内阶段 + 姊妹课程），并用 _fin.js 当场解出该角色的“第一道练习题”。
// 小时数为示意估计；练习题数字用橙子公司（AUTHORING §0.2）与标准债券例子。
import { coverageByLayer, mnavBasic, mnavDiluted, mnavEV, mnavNetBps, bondPrice, bondRisk, ammSwap, kelly, monthsCovered, fmtPct, fmtNum, fmtUsd, clamp, tex } from "./_fin.js";

// 把格式化好的数字放进 LaTeX：$ → \$，千分位逗号 → {,}，% → \%
const texv = (s) => String(s).replace(/\$/g, "\\$").replace(/,/g, "{,}").replace(/%/g, "\\%");

export default function mount(root, lang) {
  const en = lang === "en";
  const T = (zh, e) => (en ? e : zh);
  const C = T("：", ": ");

  // 技能目录：示意学时；where = 课内阶段 / 姊妹课程
  const S = {
    ideas: { n: T("四个观念与现值", "The four ideas & present value"), h: 20, where: T("阶段 0–2", "Stages 0–2"), course: true },
    bonds: { n: T("债券、久期与利差", "Bonds, duration & spreads"), h: 25, where: T("阶段 4", "Stage 4"), course: true, pro: true },
    stack: { n: T("资本结构与优先股", "Capital stack & preferreds"), h: 20, where: T("阶段 6", "Stage 6"), course: true, pro: true },
    macro: { n: T("宏观与央行", "Macro & central banks"), h: 25, where: T("阶段 3、9、20.2", "Stages 3, 9, 20.2"), course: true },
    btc: { n: T("比特币与 DAT 指标", "Bitcoin & DAT metrics"), h: 35, where: T("阶段 12、15–18", "Stages 12, 15–18"), course: true },
    deriv: { n: T("期权与波动率", "Options & volatility"), h: 40, where: T("阶段 7 + 期权之路", "Stage 7 + Options Path"), course: false },
    defi: { n: T("DeFi 与智能合约", "DeFi & smart contracts"), h: 60, where: T("阶段 13 + 中本聪之路", "Stage 13 + Satoshi Path"), course: false },
    token: { n: T("代币化与法律结构", "Tokenization & legal structure"), h: 30, where: T("阶段 14 + RWA 之路", "Stage 14 + RWA Path"), course: false },
    filings: { n: T("读 SEC 文件", "Reading SEC filings"), h: 15, where: T("EDGAR：10-K / 10-Q / 8-K", "EDGAR: 10-K / 10-Q / 8-K"), course: false, pro: true },
    data: { n: T("表格 / Python / 数据", "Spreadsheets / Python / data"), h: 40, where: T("FRED、DefiLlama、链上数据", "FRED, DefiLlama, on-chain data"), course: false, pro: true },
    risk: { n: T("风险度量与压力测试", "Risk metrics & stress tests"), h: 25, where: T("阶段 11、18.2", "Stages 11, 18.2"), course: true },
    writing: { n: T("写一页分析备忘录", "Writing a one-page memo"), h: 15, where: T("阶段 ∞.3", "Stage ∞.3"), course: false, pro: true },
  };
  const R = {
    credit: { n: T("信用分析师", "Credit analyst"), skills: ["ideas", "bonds", "stack", "filings", "btc", "risk", "data", "writing"], proj: T("项目 B：比特币优先股比较表", "Project B: bitcoin-preferreds comparison sheet") },
    dat: { n: T("DAT 分析师", "DAT analyst"), skills: ["ideas", "stack", "btc", "filings", "deriv", "data", "writing"], proj: T("项目 A：DAT 周度追踪表", "Project A: weekly DAT tracker") },
    macro: { n: T("利率策略师", "Rates strategist"), skills: ["ideas", "bonds", "macro", "deriv", "data", "writing"], proj: T("项目 C：新管道仪表盘 + 收益率曲线笔记", "Project C: new-plumbing dashboard + yield-curve notes") },
    defi: { n: T("DeFi 建设者", "DeFi builder"), skills: ["ideas", "defi", "data", "risk", "token", "deriv"], proj: T("一个带清算与预言机保护的借贷原型", "A lending prototype with liquidation and oracle safeguards") },
    tokenize: { n: T("代币化 / 合规", "Tokenization / compliance"), skills: ["ideas", "token", "stack", "filings", "defi", "writing"], proj: T("项目 C：代币化国债与稳定币仪表盘", "Project C: tokenized-Treasury and stablecoin dashboard") },
    risk: { n: T("风险经理", "Risk manager"), skills: ["ideas", "bonds", "risk", "deriv", "macro", "data", "btc"], proj: T("项目 D：一页压力测试备忘录", "Project D: one-page stress-test memo") },
    investor: { n: T("个人投资者", "Private investor"), skills: ["ideas", "bonds", "stack", "btc", "risk", "writing"], proj: T("你自己的投资规则 + 清单（阶段 18.6）", "Your own investing rules + checklist (Stage 18.6)") },
  };
  const LV = [
    { k: "zero", n: T("零基础", "Starting from zero") },
    { k: "course", n: T("学完本课", "Finished this course") },
    { k: "pro", n: T("已在金融业", "Already in finance") },
  ];

  const st = { role: "dat", lv: "course", hrs: 7, have: new Set(), ans: false };

  root.innerHTML = `
    <div class="demo">
      <div class="demo-head">${T("🗺️ 新金融路线规划器：从你现在的位置出发", "🗺️ New-finance route planner: start from where you are")}</div>
      <div class="demo-block">
        <label class="demo-label">${T("目标角色", "Target role")}</label>
        <div class="demo-seg" id="yp-role" style="flex-wrap:wrap;border-radius:14px">${Object.entries(R).map(([k, r]) => `<button data-r="${k}" class="${k === st.role ? "on" : ""}">${r.n}</button>`).join("")}</div>
      </div>
      <div class="demo-grid">
        <div class="demo-block">
          <label class="demo-label">${T("起点", "Starting point")}</label>
          <div class="demo-seg" id="yp-lv" style="flex-wrap:wrap;border-radius:14px">${LV.map((l) => `<button data-l="${l.k}" class="${l.k === st.lv ? "on" : ""}">${l.n}</button>`).join("")}</div>
        </div>
        <div class="demo-block">
          <label class="demo-label">${T("每周可投入", "Hours per week")}${C}<b id="yp-hrs-v"></b></label>
          <input class="demo-slider" id="yp-hrs" type="range" min="2" max="30" step="1" value="${st.hrs}" />
        </div>
      </div>
      <div class="demo-block">
        <label class="demo-label">${T("点击你已经掌握的技能（再点取消）", "Click the skills you already have (click again to undo)")}</label>
        <div class="demo-btns" id="yp-have"></div>
      </div>
      <div class="stat-row" id="yp-stats"></div>
      <div class="demo-grid">
        <div class="demo-block"><div class="demo-label">${T("技能缺口（剩余学时）", "Skill gaps (hours remaining)")}</div><div class="stages" id="yp-gaps"></div></div>
        <div class="demo-block"><div class="demo-label">${T("按周排好的路线", "Your week-by-week route")}</div><div class="tl" id="yp-tl"></div></div>
      </div>
      <div class="demo-block">
        <div class="demo-label">${T("这个角色的第一道练习题", "Your role's first exercise")}</div>
        <div class="scn"><div class="scn-q" id="yp-ex-q"></div><div class="scn-meta" id="yp-ex-a"></div></div>
        <div class="demo-btns" style="margin-top:8px"><button class="demo-btn" id="yp-show">${T("用 _fin.js 解出答案", "Solve it with _fin.js")}</button></div>
      </div>
      <p class="demo-tip">${T(
        "先选“DAT 分析师 + 学完本课 + 每周 7 小时”，看剩下的缺口主要在哪（通常是读 SEC 文件、期权与写作）。再把角色换成“DeFi 建设者”：路线立刻变长，因为智能合约是本课没有深入的部分——这时姊妹课程就派上了用场。学时是示意估计，重要的是顺序：先补主战场，再补其余。",
        "Start with \"DAT analyst + finished this course + 7 hours a week\" and see where the remaining gaps are (usually reading SEC filings, options and writing). Then switch to \"DeFi builder\": the route gets much longer, because smart contracts are the part this course doesn't go deep on, which is where the sister courses come in. Hours are rough estimates; what matters is the order: your main battlefield first, then the rest."
      )}</p>
    </div>`;

  const q = (s) => root.querySelector(s);

  // 每项技能剩余学时
  const remaining = (k) => {
    if (st.have.has(k)) return 0;
    const s = S[k];
    let f = 1;
    if (st.lv === "course" && s.course) f = 0.3;
    if (st.lv === "pro" && (s.pro || s.course)) f = s.pro ? 0.3 : 0.6;
    return Math.round(s.h * f);
  };

  // 第一道练习题：真算
  const exercise = () => {
    const nav = 1e9, layers = [{ name: T("可转债", "Converts"), claim: 150e6 }, { name: "Orange-F", claim: 100e6 }, { name: "Orange-D", claim: 50e6 }];
    // 金额写成 LaTeX：中文用“亿”，英文用 $…M
    const amt = (x) => T(String.raw`${+(x / 1e8).toFixed(2)}\ \text{亿}`, String.raw`\$${fmtNum(x / 1e6, 0)}\text{M}`);
    switch (st.role) {
      case "credit": {
        const c = coverageByLayer(nav * 0.2, layers);
        return [T("橙子公司：比特币 −80% 后，可转债、Orange-F、Orange-D 三层的 BTC 评级各是多少？", "Orange Corp: after bitcoin falls 80%, what are the BTC Ratings of the convertible, Orange-F and Orange-D layers?"),
          tex(String.raw`\text{${T("BTC 评级", "BTC Rating")}} = \dfrac{\text{${T("BTC 储备", "BTC Reserve")}}}{\text{${T("本层 + 更优先层名义", "this layer + all senior notional")}}}`) + T("：", ": ") +
          c.map((r) => `${r.name} ${tex(String.raw`\dfrac{${amt(nav * 0.2)}}{${amt(r.cum)}} = ${fmtNum(r.coverage, 2)}\times`)}`).join(" · ") + T("。F 层约 0.8 倍、D 层约 0.67 倍：都跌破 1 倍，已不被比特币完全覆盖。", ". F is about 0.8x and D about 0.67x: both below 1x, no longer fully covered by bitcoin.")];
      }
      case "dat": {
        const a = mnavBasic(1.5e9, 10000, 100000), b = mnavDiluted(15, 106e6, nav), c = mnavEV(1.5e9, 150e6, 150e6, 30e6, 10000, 100000), d = mnavNetBps(15, nav, 150e6, 150e6, 30e6, 100e6);
        return [T("橙子公司（股价 15 美元）的 mNAV，按四种口径分别是多少？", "What is Orange Corp's mNAV (share price $15) on each of the four definitions?"),
          `${T("市值", "Market cap")} ${fmtNum(a, 2)}x · ${T("稀释", "Diluted")} ${fmtNum(b, 2)}x · ${T("企业价值", "EV")} ${fmtNum(c, 2)}x · ${tex(String.raw`\dfrac{\text{${T("股价", "price")}}}{\text{${T("每股净比特币", "net BTC per share")}}}`)} ${fmtNum(d, 2)}x${T("。提 mNAV 必须说口径。", ". Always name the definition.")}`];
      }
      case "macro": {
        const p0 = bondPrice(100, 0.05, 0.05, 30), p1 = bondPrice(100, 0.05, 0.06, 30), md = bondRisk(100, 0.05, 0.05, 30).modified;
        return [T("30 年期、5% 票息国债，收益率从 5% 升到 6%，价格变多少？修正久期是多少？", "A 30-year 5% Treasury: if its yield rises from 5% to 6%, how much does the price change, and what is its modified duration?"),
          `${tex(String.raw`P_{5\%} = ${fmtNum(p0, 1)} \to P_{6\%} = ${fmtNum(p1, 1)}\ (${texv(fmtPct(p1 / p0 - 1, 1))})`)} · ${tex(String.raw`\text{${T("修正久期", "modified duration")}} \approx ${fmtNum(md, 1)}`)}`];
      }
      case "defi": {
        const r = ammSwap(1000, 1000000, 10);
        return [T("一个 1,000 ETH / 1,000,000 USDC 的恒定乘积池，卖入 10 ETH（0.3% 手续费），成交均价和滑点是多少？", "In a constant-product pool of 1,000 ETH / 1,000,000 USDC, selling 10 ETH (0.3% fee): what are the average fill price and the slippage?"),
          `${T("成交均价", "Average fill")} ${fmtUsd(r.execPrice, 2)} · ${T("相对池价", "vs pool price")} ${fmtPct(r.execPrice / r.priceBefore - 1, 2)} · ${T("池价变为", "new pool price")} ${fmtUsd(r.priceAfter, 2)}`];
      }
      case "tokenize": {
        const size = 15.9e9, bills = 7.25e12;
        return [T("代币化国债约 159 亿美元、国库券市场约 7.25 万亿美元：占比多少？若代币化让相当于规模 5% 的闲置抵押品缓冲得以释放，按 4.24% 融资成本每年省多少？", "Tokenized Treasuries of about $15.9B against a bill market of about $7.25T: what share is that? If tokenization frees an idle collateral buffer equal to 5% of that, what does it save per year at a 4.24% funding cost?"),
          `${T("占比", "Share")} ${tex(String.raw`\dfrac{${T(String.raw`159\ \text{亿}`, String.raw`\$15.9\text{B}`)}}{${T(String.raw`7.25\ \text{万亿}`, String.raw`\$7.25\text{T}`)}} \approx ${texv(fmtPct(size / bills, 2))}`)} · ${T("每年约省", "annual saving about")} ${tex(String.raw`${T(String.raw`159\ \text{亿}`, String.raw`\$15.9\text{B}`)} \times 5\% \times 4.24\% \approx ${texv(fmtUsd(size * 0.05 * 0.0424, 0))}`)}`];
      }
      case "risk": {
        const k = kelly(0.55, 1);
        return [T("一个胜率 55%、赔率 1:1 的机会，凯利仓位是多少？半凯利呢？年化波动率 60% 的资产，波动率拖累约多少？", "A bet with a 55% win rate at even odds: what is the Kelly fraction, and half-Kelly? For an asset with 60% volatility, roughly how big is the volatility drag?"),
          `${T("凯利", "Kelly")} ${tex(String.raw`f^{*} = \dfrac{bp - (1 - p)}{b} = \dfrac{1 \times 0.55 - 0.45}{1} = ${texv(fmtPct(k, 0))}`)} · ${T("半凯利", "half-Kelly")} ${tex(String.raw`\dfrac{f^{*}}{2} = ${texv(fmtPct(k / 2, 0))}`)} · ${T("拖累", "drag")} ${tex(String.raw`\approx \dfrac{\sigma^{2}}{2} = \dfrac{0.6^{2}}{2} = ${texv(fmtPct(0.6 * 0.6 / 2, 0))}`)}`];
      }
      default: {
        const m = monthsCovered(30e6, 15e6);
        return [T("持有一家 DAT 的优先股前先问：年度股息 1,500 万、美元储备 3,000 万，能覆盖几个月？这张优先股排在第几层？", "Before owning a DAT preferred, ask: with $15M of annual dividends and a $30M USD reserve, how many months are covered? Which layer is this preferred in?"),
          `${tex(String.raw`\dfrac{${T(String.raw`3{,}000\ \text{万}`, String.raw`\$30\text{M}`)}}{${T(String.raw`1{,}500\ \text{万}`, String.raw`\$15\text{M}`)}} \times 12 = ${fmtNum(m, 0)}`)} ${T("个月；Orange-F 排在可转债之后、Orange-D 之前（BTC 评级 4.0x）。本课只讲框架，不构成投资建议。", "months; Orange-F ranks after the converts and ahead of Orange-D (BTC Rating 4.0x). Frameworks only, not investment advice.")}`];
      }
    }
  };

  const paint = () => {
    const role = R[st.role];
    q("#yp-hrs-v").textContent = st.hrs + T(" 小时", " hours");
    q("#yp-have").innerHTML = role.skills.map((k) => `<button class="demo-btn ${st.have.has(k) ? "active" : ""}" data-k="${k}">${S[k].n}</button>`).join("");
    root.querySelectorAll("#yp-have button").forEach((b) => b.addEventListener("click", () => {
      const k = b.dataset.k; st.have.has(k) ? st.have.delete(k) : st.have.add(k); paint();
    }));

    const rows = role.skills.map((k) => ({ k, left: remaining(k), full: S[k].h }));
    const total = rows.reduce((s, r) => s + r.left, 0);
    const weeks = total / st.hrs;
    const done = rows.filter((r) => r.left === 0).length;
    q("#yp-stats").innerHTML = `
      <div class="stat"><div class="k">${T("剩余学时（示意）", "Hours remaining (rough)")}</div><div class="v acc">${fmtNum(total, 0)}</div></div>
      <div class="stat"><div class="k">${T("需要的周数", "Weeks needed")}</div><div class="v">${fmtNum(Math.ceil(weeks), 0)}</div></div>
      <div class="stat"><div class="k">${T("约合月数", "About how many months")}</div><div class="v">${fmtNum(weeks / 4.33, 1)}</div></div>
      <div class="stat"><div class="k">${T("已掌握技能", "Skills already covered")}</div><div class="v ${done ? "pos" : ""}">${done} / ${rows.length}</div></div>`;

    q("#yp-gaps").innerHTML = rows.map((r) => {
      const pct = clamp(r.left / r.full, 0, 1) * 100;
      return `<div class="stage-bar"><div class="lab">${S[r.k].n}</div><div class="track"><div class="fill" style="width:${pct.toFixed(0)}%;background:${r.left === 0 ? "var(--green)" : "var(--orange)"}"></div></div><div class="val">${r.left === 0 ? T("已掌握", "done") : r.left + T(" 小时", " h")}</div></div>`;
    }).join("");

    let wk = 0;
    const items = rows.filter((r) => r.left > 0).map((r) => {
      const a = wk, b = wk + r.left / st.hrs; wk = b;
      const a1 = Math.floor(a) + 1, b1 = Math.max(a1, Math.ceil(b));
      const lab = a1 === b1 ? T("第 " + a1 + " 周", "Week " + a1) : T("第 " + a1 + "–" + b1 + " 周", "Weeks " + a1 + "–" + b1);
      return `<div class="tl-item"><div class="when">${lab}</div><div><b>${S[r.k].n}</b> · ${S[r.k].where}</div></div>`;
    });
    items.push(`<div class="tl-item"><div class="when">${T("第", "Weeks ")}${Math.ceil(wk) + 1}–${Math.ceil(wk) + 2}${T(" 周", "")}</div><div><b>${T("作品集", "Portfolio")}</b>${C}${role.proj}</div></div>`);
    items.push(`<div class="tl-item"><div class="when">${T("然后", "Then")}</div><div>${T("完成阶段 ∞.3 毕业设计并公开发布；每周读一份一手文件。", "Finish the Stage ∞.3 capstone and publish it; read one primary filing every week.")}</div></div>`);
    q("#yp-tl").innerHTML = items.join("");

    const [eq, ea] = exercise();
    q("#yp-ex-q").textContent = eq;
    q("#yp-ex-a").innerHTML = st.ans ? ea : T("先自己算，再点下面的按钮。", "Work it out yourself first, then click the button below.");
    q("#yp-show").classList.toggle("active", st.ans);
  };

  root.querySelectorAll("#yp-role button").forEach((b) => b.addEventListener("click", () => {
    st.role = b.dataset.r; st.ans = false;
    root.querySelectorAll("#yp-role button").forEach((o) => o.classList.toggle("on", o === b));
    paint();
  }));
  root.querySelectorAll("#yp-lv button").forEach((b) => b.addEventListener("click", () => {
    st.lv = b.dataset.l;
    root.querySelectorAll("#yp-lv button").forEach((o) => o.classList.toggle("on", o === b));
    paint();
  }));
  q("#yp-hrs").addEventListener("input", (e) => { st.hrs = +e.target.value; paint(); });
  q("#yp-show").addEventListener("click", () => { st.ans = !st.ans; paint(); });
  paint();
}
