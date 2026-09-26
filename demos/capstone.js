// 交互演示：毕业设计报告生成器——按“宏观 → 利率 → 比特币情景 → 公司指标 → 资本结构 → 压力测试 → 写作”
// 收集读者输入，全部指标用 _fin.js 计算，拼成一份结构化报告（可复制为纯文本）。
// 默认值 = 橙子公司（AUTHORING §0.2）；宏观与利率默认值 = 2026 年 9 月快照（_research/macro-facts.md）。仅讲框架，不构成投资建议。
import {
  btcNav, mnavBasic, mnavDiluted, mnavEV, mnavNetBps, netReserve, amplification, amplificationStrategy, striveAmpRatio,
  coverageByLayer, waterfall, btcFloorPrice, monthsCovered, breakevenArr, issueAndBuy, btcRiskProb, btcCredit,
  bondPrice, perpetuity, fmtPct, fmtNum, fmtUsd,
} from "./_fin.js";

export default function mount(root, lang) {
  const en = lang === "en";
  const T = (zh, e) => (en ? e : zh);
  const C = T("：", ": ");
  const L = (a, b) => T("（", " (") + a + (b ? T("，", ", ") + b : "") + T("）", ")");

  const DEF = {
    growth: "strong", infl: "high", liq: "tight",
    y30: 5.49, spr: 4.5,
    px: 100000, bear: -50, bull: 50, pBear: 30, pBull: 30,
    btc: 10000, shares: 100, price: 15, conv: 150, convPx: 25, F: 100, rF: 10, D: 50, rD: 10, cash: 30,
    shock: -70, shut: 24, putM: 24,
  };
  const st = { ...DEF, name: T("橙子公司", "Orange Corp"), thesis: "", bullTxt: "", bearTxt: "", sign: "" };

  // 滑块注册表：[key, 标签, min, max, step, 显示格式]
  const pct = (v) => fmtNum(v, 2) + "%";
  const SL = {
    rates: [["y30", T("30 年期美债收益率", "30-year Treasury yield"), 3, 8, 0.01, pct], ["spr", T("优先股信用利差（相对 30 年期）", "Preferred credit spread (over the 30-year)"), 1, 10, 0.25, pct]],
    btcS: [["px", T("比特币价格（基准）", "Bitcoin price (base)"), 20000, 200000, 1000, (v) => fmtUsd(v, 0)], ["bear", T("熊市情景", "Bear scenario"), -90, -10, 5, (v) => v + "%"], ["bull", T("牛市情景", "Bull scenario"), 10, 200, 5, (v) => "+" + v + "%"], ["pBear", T("熊市权重", "Bear weight"), 0, 100, 5, (v) => v + "%"], ["pBull", T("牛市权重", "Bull weight"), 0, 100, 5, (v) => v + "%"]],
    co1: [["btc", T("持有比特币（枚）", "Bitcoin held (coins)"), 1000, 50000, 500, (v) => fmtNum(v, 0)], ["shares", T("普通股（百万股）", "Common shares (millions)"), 10, 500, 5, (v) => fmtNum(v, 0) + "M"], ["price", T("股价", "Share price"), 1, 60, 0.5, (v) => fmtUsd(v, 2)], ["cash", T("现金 / 美元储备（百万）", "Cash / USD reserve ($M)"), 0, 200, 5, (v) => "$" + v + "M"], ["conv", T("可转债（百万，0% 票息）", "Convertibles ($M, 0% coupon)"), 0, 600, 10, (v) => "$" + v + "M"]],
    co2: [["convPx", T("转股价", "Conversion price"), 5, 100, 1, (v) => fmtUsd(v, 0)], ["F", T("高级优先股 F（百万，累积）", "Senior preferred F ($M, cumulative)"), 0, 400, 10, (v) => "$" + v + "M"], ["rF", T("F 股息率", "F dividend rate"), 4, 16, 0.25, pct], ["D", T("次级优先股 D（百万，非累积）", "Junior preferred D ($M, non-cumulative)"), 0, 300, 10, (v) => "$" + v + "M"], ["rD", T("D 股息率", "D dividend rate"), 4, 16, 0.25, pct]],
    stress: [["shock", T("比特币冲击", "Bitcoin shock"), -95, 0, 5, (v) => v + "%"], ["shut", T("资本市场关门（月）", "Capital markets shut (months)"), 0, 36, 1, (v) => v + T(" 个月", " months")], ["putM", T("可转债回售月", "Convertible put month"), 1, 60, 1, (v) => T("第 " + v + " 个月", "month " + v)]],
  };
  const ALL = Object.values(SL).flat();
  const sliders = (group) => SL[group].map(([k, lab, mn, mx, stp]) => `
    <label class="demo-label">${lab}${C}<b id="cs-${k}-v"></b></label>
    <input class="demo-slider" id="cs-${k}" type="range" min="${mn}" max="${mx}" step="${stp}" value="${st[k]}" />`).join("");
  const seg = (id, opts) => `<div class="demo-seg" id="cs-${id}">${opts.map(([v, l]) => `<button data-v="${v}" class="${st[id] === v ? "on" : ""}">${l}</button>`).join("")}</div>`;
  const taStyle = "width:100%;min-height:52px;box-sizing:border-box;padding:8px 10px;border:1px solid var(--line);border-radius:8px;background:var(--surface);color:var(--ink);font:inherit;font-size:13.5px;resize:vertical;margin-top:4px";
  const ta = (id, lab, ph) => `<label class="demo-label">${lab}</label><textarea id="cs-${id}" style="${taStyle}" placeholder="${ph}"></textarea>`;

  root.innerHTML = `
    <div class="demo">
      <div class="demo-head">${T("🎓 毕业设计报告生成器：从宏观一路写到资本结构", "🎓 Capstone report builder: from macro all the way down to the capital stack")}</div>

      <div class="demo-block">
        <div class="demo-label"><b>${T("第 1 步 · 宏观体制", "Step 1 · Macro regime")}</b>${T("（默认 = 2026 年 9 月的读数）", " (default = September 2026 readings)")}</div>
        <div class="demo-grid-3">
          <div><div class="demo-meta">${T("增长", "Growth")}</div>${seg("growth", [["strong", T("偏强", "Stronger")], ["weak", T("偏弱", "Weaker")]])}</div>
          <div><div class="demo-meta">${T("通胀", "Inflation")}</div>${seg("infl", [["high", T("偏高", "Higher")], ["low", T("偏低", "Lower")]])}</div>
          <div><div class="demo-meta">${T("流动性", "Liquidity")}</div>${seg("liq", [["loose", T("宽松", "Loosening")], ["tight", T("收紧", "Tightening")]])}</div>
        </div>
      </div>

      <div class="demo-grid">
        <div class="demo-block"><div class="demo-label"><b>${T("第 2 步 · 利率", "Step 2 · Rates")}</b></div>${sliders("rates")}</div>
        <div class="demo-block"><div class="demo-label"><b>${T("第 3 步 · 比特币情景", "Step 3 · Bitcoin scenarios")}</b></div>${sliders("btcS")}</div>
      </div>

      <div class="demo-block">
        <div class="demo-label"><b>${T("第 4 步 · 公司（默认 = 橙子公司）", "Step 4 · The company (default = Orange Corp)")}</b></div>
        <label class="demo-label">${T("公司名称", "Company name")}</label>
        <input id="cs-name" type="text" style="${taStyle};min-height:0" value="${st.name}" />
        <div class="demo-grid" style="margin-top:8px"><div>${sliders("co1")}</div><div>${sliders("co2")}</div></div>
      </div>

      <div class="demo-grid">
        <div class="demo-block"><div class="demo-label"><b>${T("第 5 步 · 压力测试", "Step 5 · Stress test")}</b></div>${sliders("stress")}</div>
        <div class="demo-block"><div class="demo-label"><b>${T("第 6 步 · 你的判断（写进报告）", "Step 6 · Your judgment (goes into the report)")}</b></div>
          ${ta("thesis", T("一句话结论（结构与风险，不写买卖）", "One-sentence conclusion (structure and risk, no buy/sell call)"), T("例：比特币不跌破约 3 万美元时，储备覆盖 24 个月股息；主要风险在第 24 个月的回售。", "e.g. Above roughly $30k bitcoin, the reserve covers 24 months of dividends; the main risk is the month-24 put."))}
          ${ta("bullTxt", T("支持方最强论证", "Strongest case for"), T("例：覆盖透明、无追加保证金……", "e.g. transparent coverage, no margin calls..."))}
          ${ta("bearTxt", T("反对方最强论证", "Strongest case against"), T("例：回售墙、mNAV 跌破 1 后飞轮反转……", "e.g. the put wall, the flywheel reversing below 1x mNAV..."))}
          ${ta("sign", T("什么会改变我的判断（信号）", "What would change my mind (signposts)"), T("例：储备覆盖跌破 12 个月；比特币跌破 3 万美元。", "e.g. reserve cover below 12 months; bitcoin below $30k."))}
        </div>
      </div>

      <div class="demo-btns">
        <button class="demo-btn" id="cs-reset">${T("恢复橙子公司默认值", "Reset to Orange Corp defaults")}</button>
        <button class="demo-btn" id="cs-copy">${T("复制报告（纯文本）", "Copy report (plain text)")}</button>
      </div>

      <div class="stat-row" id="cs-stats"></div>
      <div class="demo-block">
        <div class="demo-label">${T("报告自查", "Report self-check")}</div>
        <div id="cs-checks" style="display:flex;flex-wrap:wrap;gap:6px;margin-top:6px"></div>
      </div>
      <div class="demo-block" id="cs-report" style="background:var(--surface);border:1px solid var(--line);border-radius:10px;padding:16px 18px;line-height:1.65;font-size:14px"></div>

      <p class="demo-tip">${T(
        "先不动任何输入，读一遍自动生成的报告：这就是橙子公司的“标准答案”（mNAV 1.50 / 1.59 / 1.77 / 2.05，三层 BTC 评级 6.7x / 4.0x / 3.3x，储备 24 个月）。然后只改一个上游输入——把比特币价格拖到 8.4 万美元，或把 30 年期收益率拉到 6.5%——看它如何一路传到下游的覆盖倍数、优先股价格和压力测试时间表。最后写下你自己的结论和信号，报告就完整了。",
        "First leave every input alone and read the generated report: that is Orange Corp's reference answer (mNAV 1.50 / 1.59 / 1.77 / 2.05, BTC Ratings 6.7x / 4.0x / 3.3x, 24 months of reserve). Then change one upstream input (drag bitcoin to $84,000, or the 30-year yield to 6.5%) and watch it flow all the way down to coverage, preferred prices and the stress-test timetable. Finally write your own conclusion and signposts, and the report is complete."
      )}</p>
    </div>`;

  const q = (s) => root.querySelector(s);
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const x = (v) => (isFinite(v) ? fmtNum(v, 2) + "x" : "∞");

  const regime = () => {
    const g = st.growth === "strong", i = st.infl === "high";
    const name = g && i ? T("过热（带滞胀风险）", "Overheating (with stagflation risk)")
      : g ? T("金发姑娘（增长强、通胀低）", "Goldilocks (strong growth, low inflation)")
      : i ? T("滞胀", "Stagflation") : T("通缩式放缓", "Disinflationary slowdown");
    const liq = st.liq === "tight" ? T("流动性收紧", "liquidity tightening") : T("流动性宽松", "liquidity loosening");
    const note = g && i ? T("折现率偏高、发行窗口更挑剔；阶段 9.5 提醒：此类体制里股债可能同跌。", "Discount rates run high and issuance windows get pickier; Stage 9.5's warning: stocks and bonds can fall together in this regime.")
      : g ? T("风险资产的传统顺风环境；但要问估值是否已计入（阶段 20.2）。", "The classic tailwind for risk assets; but ask whether valuations already price it (Stage 20.2).")
      : i ? T("对长债与高杠杆结构都最不友好的组合；比特币的“对冲通胀”说法在这里被检验。", "The least friendly mix for both long bonds and levered structures; bitcoin's inflation-hedge claim gets tested here.")
      : T("利率可能下行、长债受益；但风险资产与比特币的需求可能走弱。", "Rates may fall and long bonds benefit, but demand for risk assets and bitcoin may weaken.");
    return { name, liq, note };
  };

  const compute = () => {
    const M = 1e6;
    const btc = st.btc, px = st.px, shares = st.shares * M, price = st.price;
    const conv = st.conv * M, F = st.F * M, D = st.D * M, cash = st.cash * M, pref = F + D, claims = conv + pref;
    const nav = btcNav(btc, px), mkt = shares * price;
    const convSh = st.convPx > 0 ? conv / st.convPx : 0, itm = price >= st.convPx;
    const otm = itm ? 0 : conv, fd = shares + (itm ? convSh : 0);
    const nr = netReserve(nav, otm, pref, cash);
    const safeAmp = (v, c) => (v - c > v * 1e-9 ? amplification(v, c) : Infinity);
    const layers = [[T("可转债", "Convertibles"), conv], ["F", F], ["D", D]].filter(([, c]) => c > 0).map(([name, claim]) => ({ name, claim }));
    const oblig = F * st.rF / 100 + D * st.rD / 100;
    const m = {
      nav, mkt, nr, oblig, layers,
      mB: mnavBasic(mkt, btc, px), mD: mnavDiluted(price, shares + convSh, nav), mE: mnavEV(mkt, conv, pref, cash, btc, px),
      mN: nr > 0 ? mnavNetBps(price, nav, otm, pref, cash, fd) : Infinity,
      bps: (btc / shares) * 1e8, bpsA: (btc / (shares + convSh)) * 1e8,
      amp: safeAmp(nav, claims), ampS: nr > 0 ? amplificationStrategy(nav, otm, pref, cash) : Infinity, ampV: striveAmpRatio(conv, pref, nav),
      cov: coverageByLayer(nav, layers), months: monthsCovered(cash, oblig), be: breakevenArr(oblig, nav),
      fly: issueAndBuy({ btc, shares, btcPrice: px, px: price, newShares: shares * 0.1 }),
    };
    m.cov.forEach((r) => { r.floor = btcFloorPrice(px, r.coverage); r.risk = btcRiskProb(r.coverage, 0.10, 0.45, 10); r.credit = btcCredit(r.risk, 10); });
    // 利率
    const y = st.y30 / 100, req = y + st.spr / 100;
    m.b30 = bondPrice(100, 0.05, y, 30); m.b30up = bondPrice(100, 0.05, y + 0.01, 30);
    m.req = req; m.Fpx = perpetuity(st.rF, req); m.FsprPar = st.rF / 100 - y;
    // 情景
    let wB = st.pBear, wU = st.pBull; if (wB + wU > 100) { const k = 100 / (wB + wU); wB *= k; wU *= k; }
    const wM = 100 - wB - wU;
    m.scen = [[T("熊市", "Bear"), st.bear / 100, wB], [T("基准", "Base"), 0, wM], [T("牛市", "Bull"), st.bull / 100, wU]].map(([n, s, w]) => {
      const p = px * (1 + s), v = btcNav(btc, p);
      return { n, p, w, jr: claims > 0 ? v / claims : Infinity, eq: Math.max(0, v + cash - claims) / shares };
    });
    m.ePx = m.scen.reduce((s, r) => s + r.p * r.w / 100, 0);
    // 压力测试
    const pS = px * (1 + st.shock / 100), navS = btcNav(btc, pS);
    m.pS = pS; m.navS = navS; m.covS = coverageByLayer(navS, layers); m.wf = waterfall(navS, layers); m.ampStress = safeAmp(navS, claims);
    let res = cash, sold = 0, outAt = null, putSold = 0;
    const mdiv = oblig / 12;
    for (let k = 1; k <= st.shut; k++) {
      const payD = Math.min(res, mdiv); res -= payD; if (mdiv - payD > 0) sold += (mdiv - payD) / pS;
      if (res <= 1e-6 && outAt === null && mdiv > 0) outAt = k;
      if (k === st.putM && conv > 0) { const payP = Math.min(res, conv); res -= payP; putSold = (conv - payP) / pS; sold += putSold; }
    }
    m.sold = sold; m.putSold = putSold; m.outAt = outAt; m.putInWindow = st.putM <= st.shut && conv > 0;
    const btcEnd = Math.max(0, btc - sold), layersEnd = m.putInWindow ? layers.slice(1) : layers; // 回售已付清 → 可转债层移除
    m.covEnd = layersEnd.length ? coverageByLayer(btcNav(btcEnd, pS), layersEnd) : [];
    return m;
  };

  const build = (m) => {
    const R = regime();
    const blank = (v, ph) => (v.trim() ? esc(v.trim()) : `<span style="color:var(--muted)">${ph}</span>`);
    const S = [];
    S.push([T("1. 结论", "1. Conclusion"), [
      blank(st.thesis, T("（在上方写下你的一句话结论）", "(write your one-sentence conclusion above)")),
      T("体制", "Regime") + C + R.name + T("，", ", ") + R.liq + T("。", "."),
    ]]);
    S.push([T("2. 宏观与利率", "2. Macro and rates"), [
      R.note,
      T("30 年期美债", "30-year Treasury") + C + fmtPct(st.y30 / 100, 2) + T("；5% 票息 30 年期债券价格约 ", "; a 30-year 5% bond prices at about ") + fmtNum(m.b30, 1) + T("，收益率再升 1 个百分点约 ", "; one point higher, about ") + fmtNum(m.b30up, 1) + T("（修正久期约 15.5，阶段 4.4）。", " (modified duration about 15.5, Stage 4.4)."),
      T("优先股要求收益率 = 30 年期 + 利差 ", "Preferred required yield = 30-year + spread ") + fmtPct(st.spr / 100, 2) + " = " + fmtPct(m.req, 2) + T("；", "; ") + fmtPct(st.rF / 100, 2) + T(" 股息的 F 约值 ", " F is worth about ") + fmtUsd(m.Fpx, 2) + T("（永续年金，阶段 18.1）。按面值计，F 相对 30 年期的利差为 ", " (perpetuity, Stage 18.1). At par, F's spread over the 30-year is ") + fmtPct(m.FsprPar, 2) + T("。", "."),
    ]]);
    S.push([T("3. 比特币情景（不是预测）", "3. Bitcoin scenarios (not forecasts)"), [
      ...m.scen.map((r) => `${r.n} ${fmtUsd(r.p, 0)} · ${T("权重", "weight")} ${fmtNum(r.w, 0)}% · ${T("最劣后层覆盖", "junior-most coverage")} ${x(r.jr)} · ${T("穿透每股净值", "look-through NAV per share")} ${fmtUsd(r.eq, 2)}`),
      T("加权比特币价格 ", "Probability-weighted bitcoin price ") + fmtUsd(m.ePx, 0) + T("。BTC Breakeven ARR（年度股息 ÷ 比特币净值）", ". BTC Breakeven ARR (annual dividends ÷ bitcoin NAV)") + C + fmtPct(m.be, 2) + T("（阶段 16.6）。", " (Stage 16.6)."),
    ]]);
    S.push([T("4. 指标（每项写明口径）", "4. Metrics (each with its definition)"), [
      T("比特币净值 ", "Bitcoin NAV ") + fmtUsd(m.nav / 1e6, 0) + "M" + T("；普通股市值 ", "; common market cap ") + fmtUsd(m.mkt / 1e6, 0) + "M" + T("。", "."),
      `mNAV${C}${T("市值口径", "market cap")} ${x(m.mB)} · ${T("稀释市值口径", "diluted market cap")} ${x(m.mD)} · ${T("企业价值口径（Strategy 2025）", "enterprise value (Strategy 2025)")} ${x(m.mE)} · ${T("股价 ÷ 每股净比特币（Strategy 2026）", "price ÷ net BTC per share (Strategy 2026)")} ${x(m.mN)}${T("（阶段 16.2）", " (Stage 16.2)")}`,
      T("每股比特币 ", "BTC per share ") + fmtNum(m.bps, 0) + T(" 聪（基本股数）/ ", " sats (basic shares) / ") + fmtNum(m.bpsA, 0) + T(" 聪（假设全部转股）", " sats (all converts assumed converted)") + T("（阶段 16.1）", " (Stage 16.1)"),
      T("放大倍数", "Amplification") + C + T("简单口径 ", "simple ") + x(m.amp) + T(" · Strategy 口径 ", " · Strategy's ") + x(m.ampS) + T(" · Strive 比率 ", " · Strive's ratio ") + fmtPct(m.ampV, 0) + T("（阶段 16.4）", " (Stage 16.4)"),
      T("飞轮一次（以当前股价增发 10% 股本全部买币）", "One turn of the flywheel (issue 10% of shares at the current price, buy bitcoin)") + C + T("每股比特币 ", "BTC per share ") + fmtPct(m.fly.change, 2) + (m.fly.change < 0 ? T("——mNAV 低于 1，发股稀释（阶段 16.7）", ": mNAV below 1, issuance dilutes (Stage 16.7)") : T("（阶段 16.7）", " (Stage 16.7)")),
    ]]);
    S.push([T("5. 资本结构", "5. Capital stack"), [
      ...m.cov.map((r) => `${r.name}${C}${T("累计索取权", "cumulative claims")} ${fmtUsd(r.cum / 1e6, 0)}M · ${T("BTC 评级", "BTC Rating")} ${x(r.coverage)} · ${T("地板价", "floor price")} ${fmtUsd(r.floor, 0)} · ${T("模型所需利差", "model-required spread")} ${fmtNum(r.credit * 1e4, 0)} bp`),
      T("美元储备 ", "USD reserve ") + fmtUsd(st.cash, 0) + "M" + T(" ÷ 年度股息 ", " ÷ annual dividends ") + fmtUsd(m.oblig / 1e6, 1) + "M" + T(" = 覆盖 ", " = ") + fmtNum(m.months, 0) + T(" 个月（阶段 16.6）。", " months of cover (Stage 16.6)."),
      T("模型假设：年化回报 10%、波动率 45%、久期 10 年（阶段 ∞.1 讨论了这些假设有多敏感）。", "Model assumptions: 10% expected return, 45% volatility, 10-year duration (Stage ∞.1 discusses how sensitive these are)."),
    ]]);
    const stressLines = [
      T("比特币 ", "Bitcoin ") + st.shock + "% → " + fmtUsd(m.pS, 0) + T("，比特币净值 ", ", bitcoin NAV ") + fmtUsd(m.navS / 1e6, 0) + "M" + T("；简单放大倍数 ", "; simple amplification ") + x(m.ampStress) + T("。", "."),
      ...m.covS.map((r, i) => `${r.name}${C}${x(r.coverage)} · ${T("清算回收", "liquidation recovery")} ${fmtPct(m.wf.rows[i].recovery, 0)}`),
      T("资本市场关门 ", "Markets shut for ") + st.shut + T(" 个月", " months") + T("；储备", "; the reserve ") + (m.outAt ? T("在第 " + m.outAt + " 个月耗尽", "runs out in month " + m.outAt) : T("在关门期内没有耗尽", "lasts through the shutdown")) + T("。", "."),
      m.putInWindow
        ? T("第 " + st.putM + " 个月可转债回售（假设股价低于转股价、持有人要现金）", "Month " + st.putM + " convertible put (stock assumed below the conversion price, so holders want cash)") + C + T("卖出约 ", "sell about ") + fmtNum(m.putSold, 0) + T(" 枚比特币。", " bitcoin.")
        : T("回售日不在关门期内：假设市场重开后可再融资。", "The put falls outside the shutdown: refinancing assumed once markets reopen."),
      T("关门期内合计卖出约 ", "Total sold during the shutdown: about ") + fmtNum(m.sold, 0) + T(" 枚（占持仓 ", " bitcoin (") + fmtPct(m.sold / st.btc, 1) + T("）；之后最劣后层覆盖 ", " of holdings); junior-most coverage afterwards ") + (m.covEnd.length ? x(m.covEnd[m.covEnd.length - 1].coverage) : "–") + T("（阶段 18.2）。", " (Stage 18.2)."),
    ];
    S.push([T("6. 压力测试", "6. Stress test"), stressLines]);
    S.push([T("7. 多空双方最强论证", "7. Strongest case on each side"), [
      T("支持", "For") + C + blank(st.bullTxt, T("（写下支持方最强论证）", "(write the strongest case for)")),
      T("反对", "Against") + C + blank(st.bearTxt, T("（写下反对方最强论证）", "(write the strongest case against)")),
    ]]);
    S.push([T("8. 信号与声明", "8. Signposts and disclaimer"), [
      T("什么会改变我的判断", "What would change my mind") + C + blank(st.sign, T("（写下信号，阶段 ∞.1 的方法）", "(write your signposts, the Stage ∞.1 method)")),
      T("本报告只分析结构与风险，不构成投资建议，也不预测价格。数字为示意计算，真实公司请用带日期的官方数据。", "This report analyzes structure and risk only. It is not investment advice and forecasts no prices. Figures are illustrative; for real companies use dated official data."),
    ]]);
    return S;
  };

  let lastText = "";
  const paint = () => {
    ALL.forEach(([k, , , , , f]) => { q("#cs-" + k + "-v").textContent = f(st[k]); });
    const m = compute();
    const S = build(m);
    const jr = m.cov.length ? m.cov[m.cov.length - 1].coverage : Infinity;
    const jrS = m.covS.length ? m.covS[m.covS.length - 1].coverage : Infinity;
    q("#cs-stats").innerHTML = `
      <div class="stat"><div class="k">${T("体制", "Regime")}</div><div class="v acc" style="font-size:15px">${regime().name}</div></div>
      <div class="stat"><div class="k">mNAV${L(T("企业价值口径", "EV basis"))}</div><div class="v ${m.mE < 1 ? "neg" : ""}">${x(m.mE)}</div></div>
      <div class="stat"><div class="k">${T("最劣后层 BTC 评级", "Junior-most BTC Rating")}</div><div class="v">${x(jr)}</div></div>
      <div class="stat"><div class="k">${T("冲击后", "After the shock")}</div><div class="v ${jrS < 1 ? "neg" : "pos"}">${x(jrS)}</div></div>
      <div class="stat"><div class="k">${T("储备覆盖", "Reserve cover")}</div><div class="v ${m.months < 12 ? "neg" : ""}">${fmtNum(m.months, 0)} ${T("个月", "months")}</div></div>
      <div class="stat"><div class="k">${T("关门期卖币", "Bitcoin sold while shut")}</div><div class="v ${m.sold > 0 ? "neg" : ""}">${fmtPct(m.sold / st.btc, 1)}</div></div>`;
    const title = esc(st.name.trim() || T("（未命名公司）", "(unnamed company)")) + T("：从宏观到资本结构的分析", ": an analysis from macro down to the capital stack");
    q("#cs-report").innerHTML = `<div style="font-weight:700;font-size:16px;color:var(--ink);margin-bottom:4px">${title}</div>` +
      `<div class="demo-meta" style="margin-top:0">${T("宏观与利率默认值为 2026 年 9 月快照；公司默认值为橙子公司示意数据。", "Macro and rate defaults are a September 2026 snapshot; company defaults are illustrative Orange Corp data.")}</div>` +
      S.map(([h, lines]) => `<div style="margin-top:12px;font-weight:700;color:var(--orange-ink)">${h}</div>` + lines.map((l) => `<div style="margin-left:4px">· ${l}</div>`).join("")).join("");
    const tmp = document.createElement("div");
    lastText = [title.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"'), ""].concat(S.flatMap(([h, lines]) => [h, ...lines.map((l) => { tmp.innerHTML = l; return "- " + tmp.textContent; }), ""])).join("\n");
    // 自查
    const wSum = st.pBear + st.pBull;
    const checks = [
      [true, T("mNAV 已写明口径", "mNAV definitions named")],
      [wSum <= 100, T("三个情景权重合计 ≤ 100%", "Scenario weights sum to ≤ 100%")],
      [!!st.thesis.trim(), T("写了一句话结论", "One-sentence conclusion written")],
      [!!st.bullTxt.trim() && !!st.bearTxt.trim(), T("写了多空双方论证", "Both cases written")],
      [!!st.sign.trim(), T("写了改变主意的信号", "Signposts written")],
      [jrS >= 1, T("冲击后最劣后层仍 ≥ 1 倍", "Junior-most layer still ≥ 1x after the shock")],
      [m.months >= 12, T("储备覆盖 ≥ 12 个月", "Reserve cover ≥ 12 months")],
      [true, T("含“不构成投资建议”声明", "Includes the not-investment-advice line")],
    ];
    q("#cs-checks").innerHTML = checks.map(([ok, t]) => `<span class="pill ${ok ? "ok" : "bad"}">${ok ? "✓" : "✗"} ${t}</span>`).join("");
  };

  ALL.forEach(([k]) => q("#cs-" + k).addEventListener("input", (e) => { st[k] = +e.target.value; paint(); }));
  ["growth", "infl", "liq"].forEach((id) => root.querySelectorAll("#cs-" + id + " button").forEach((b) => b.addEventListener("click", () => {
    st[id] = b.dataset.v;
    root.querySelectorAll("#cs-" + id + " button").forEach((o) => o.classList.toggle("on", o === b));
    paint();
  })));
  q("#cs-name").addEventListener("input", (e) => { st.name = e.target.value; paint(); });
  ["thesis", "bullTxt", "bearTxt", "sign"].forEach((id) => q("#cs-" + id).addEventListener("input", (e) => { st[id] = e.target.value; paint(); }));
  q("#cs-reset").addEventListener("click", () => {
    Object.assign(st, DEF, { name: T("橙子公司", "Orange Corp") });
    ALL.forEach(([k]) => { q("#cs-" + k).value = st[k]; });
    q("#cs-name").value = st.name;
    ["growth", "infl", "liq"].forEach((id) => root.querySelectorAll("#cs-" + id + " button").forEach((o) => o.classList.toggle("on", o.dataset.v === st[id])));
    paint();
  });
  q("#cs-copy").addEventListener("click", async () => {
    const btn = q("#cs-copy");
    try { await navigator.clipboard.writeText(lastText); btn.textContent = T("已复制 ✓", "Copied ✓"); }
    catch { btn.textContent = T("复制失败：请手动选中报告文本", "Copy failed: select the report text by hand"); }
    setTimeout(() => { btn.textContent = T("复制报告（纯文本）", "Copy report (plain text)"); }, 1800);
  });
  paint();
}
