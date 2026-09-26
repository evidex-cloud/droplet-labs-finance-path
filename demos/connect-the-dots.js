// 交互演示：因果链传导器——给 30 年期国债收益率一个冲击，看它一环环传到：
// 30 年期国债价格 → 联邦利息账单 → 股票估值倍数 → 比特币情景 → 橙子公司的净储备与放大倍数 →
// Orange-F 优先股的 BTC 评级、BTC Credit、要求收益率与价格 → 覆盖指标 → “收益菜单”与稳定币储备收入。
// 全部计算走 _fin.js；橙子公司数字见 AUTHORING §0.2；真实锚点来自 _research（2026 年 9 月）。
import {
  bondPrice, gordon, netReserve, amplificationStrategy, btcRating, btcFloorPrice, btcRiskProb, btcCredit,
  perpetuity, breakevenArr, monthsCovered, clamp, fmtPct, fmtNum, fmtUsd, fmtBig, tex,
} from "./_fin.js";
import { lineChart, chartBlock } from "./_chart.js";

export default function mount(root, lang) {
  const en = lang === "en";
  const T = (zh, e) => (en ? e : zh);

  // 基准（2026 年 9 月 25 日锚点 + 橙子公司）
  const BASE30 = 0.0464;       // 起点：30 年期国债 2026 年低点（2026-02-27，战争前一天）；+85 基点 ≈ 2026-09-25 的 5.49%
  const TODAY_SHOCK = 0.0085;  // 从起点到 2026-09-25 的上行幅度
  const BILL = 0.0424;         // 3 个月国库券（2026-09-25）
  const DEBT_PUBLIC = 32.36e12; // 公众持有国债（2026-09-24）
  const STABLES = 312e9;       // 稳定币总量（DefiLlama，2026-09-26）
  const ERP = 0.03, G = 0.04;  // 示意用股权风险溢价与增长
  const ORANGE = { btc: 10000, conv: 150e6, pref: 150e6, cumF: 250e6, usd: 30e6, shares: 100e6, div: 15e6 };
  const MU = Math.log(1.10), DUR = 10; // BTC Risk 假设：年化 10% 增长；久期约 1/10%

  const st = { shock: 85, cause: "tight", beta: -15, own: 0, vol: 40, xs: 0 };

  const PRESETS = {
    y26: { shock: 85, cause: "tight", beta: -15, own: 0, vol: 40, xs: 0 },
    stag: { shock: 200, cause: "tight", beta: -15, own: -35, vol: 60, xs: 150 },
    fiscal: { shock: 150, cause: "fiscal", beta: 10, own: 0, vol: 45, xs: 50 },
    ease: { shock: -100, cause: "tight", beta: -15, own: 15, vol: 40, xs: -25 },
  };

  const slider = (id, label, min, max, step) =>
    `<label class="demo-label">${label}${T("：", ": ")}<b id="ctd-${id}-v"></b></label>
     <input class="demo-slider" id="ctd-${id}" type="range" min="${min}" max="${max}" step="${step}" />`;

  root.innerHTML = `
    <div class="demo">
      <div class="demo-head">${T("🔗 因果链传导器：推一下 30 年期收益率，看它一路传到 MSTR 式优先股", "🔗 Causal-chain propagator: nudge the 30-year yield and follow it all the way to an MSTR-style preferred")}</div>
      <div class="demo-block">
        <label class="demo-label">${T("情景预设", "Scenario presets")}</label>
        <div class="demo-btns" id="ctd-presets">
          <button class="demo-btn active" data-p="y26">${T("2026 年 2 月底 → 9 月下旬（+85 基点）", "Late Feb → late Sep 2026 (+85 bp)")}</button>
          <button class="demo-btn" data-p="stag">${T("滞胀冲击：+200 基点、币价下跌", "Stagflation shock: +200 bp, BTC falls")}</button>
          <button class="demo-btn" data-p="fiscal">${T("财政失信：+150 基点、贬值交易", "Fiscal distrust: +150 bp, debasement trade")}</button>
          <button class="demo-btn" data-p="ease">${T("降息周期：−100 基点", "Easing cycle: −100 bp")}</button>
        </div>
      </div>
      <div class="demo-block">
        <label class="demo-label">${T("收益率为什么上升（决定比特币走哪条渠道）", "Why yields are rising (decides which channel bitcoin follows)")}</label>
        <div class="demo-seg" id="ctd-cause">
          <button data-c="tight" class="on">${T("央行收紧 / 实际利率上升", "Central-bank tightening / higher real rates")}</button>
          <button data-c="fiscal">${T("财政失信 / 贬值担忧", "Fiscal distrust / debasement fears")}</button>
        </div>
      </div>
      <div class="demo-grid">
        <div class="demo-block">
          ${slider("shock", T("30 年期收益率冲击（基点，起点：2026 年 2 月 27 日的 4.64%）", "Shock to the 30-year yield (bp, starting from 4.64% on Feb 27, 2026)"), -150, 250, 5)}
          ${slider("beta", T("比特币对每 +100 基点的反应（假设）", "Bitcoin's response per +100 bp (assumption)"), -30, 20, 1)}
          ${slider("own", T("比特币其他原因的涨跌", "Bitcoin move from other causes"), -80, 100, 1)}
        </div>
        <div class="demo-block">
          ${slider("vol", T("比特币年化波动率（BTC Risk 用）", "Bitcoin annual volatility (for BTC Risk)"), 20, 80, 1)}
          ${slider("xs", T("风险厌恶带来的额外利差（基点）", "Extra spread from risk aversion (bp)"), -50, 400, 5)}
        </div>
      </div>
      <div id="ctd-chain"></div>
      <div class="demo-block" id="ctd-chart"></div>
      <div class="demo-block"><div class="demo-log" id="ctd-log"></div></div>
      <p class="demo-tip">${T(
        "先按“2026 年 2 月底 → 9 月下旬”：只动利率、比特币按“央行收紧”渠道小跌，Orange-F 从 100 跌到约 90——其中约 7.8 个点是纯利率效应，其余来自币价小跌带来的信用变化。再按“滞胀冲击”，看 BTC 评级从 4.0 倍掉到约 1.4 倍、BTC Credit 飙到 900 多个基点、价格接近腰斩：利率与信用两把刀同时落下。最后把“收益率为什么上升”切到“财政失信”，同样的利率冲击，比特币这一环的方向反过来了——这就是整张图里最关键的那个岔路口。",
        "Start with \"Late Feb → late Sep 2026\": only rates move, bitcoin slips a little via the tightening channel, and Orange-F falls from 100 to about 90. About 7.8 points of that is the pure rate effect; the rest is the credit change from bitcoin's small dip. Then press \"Stagflation shock\" and watch the BTC Rating drop from 4.0x to about 1.4x, BTC Credit jump past 900 bp, and the price nearly halve: the rate knife and the credit knife fall at once. Finally switch \"why yields are rising\" to fiscal distrust. The same rate shock now pushes the bitcoin link the other way. That fork is the single most important junction in the whole picture."
      )}</p>
    </div>`;

  const $ = (s) => root.querySelector(s);

  // 基准下 Orange-F 的“非信用溢价”：让基准价格恰好 = 100（10% 股息、要求收益率 10%）
  const baseRating = btcRating(ORANGE.btc * 100000, ORANGE.cumF);
  const baseCredit = btcCredit(btcRiskProb(baseRating, MU, 0.40, DUR), DUR);
  const OTHER = 0.10 - BASE30 - baseCredit;

  function calc(s) {
    const dy = s.shock / 10000;
    const y30 = BASE30 + dy;
    const bond0 = bondPrice(100, 0.05, BASE30, 30), bond1 = bondPrice(100, 0.05, y30, 30);
    const extraInterest = DEBT_PUBLIC * dy;
    const pe0 = gordon(1, BASE30 + ERP, G), pe1 = gordon(1, y30 + ERP, G);
    const btcMove = s.beta / 100 * (s.shock / 100) + s.own / 100;
    const px = Math.max(1000, 100000 * (1 + btcMove));
    const nav0 = ORANGE.btc * 100000, nav = ORANGE.btc * px;
    const nr0 = netReserve(nav0, ORANGE.conv, ORANGE.pref, ORANGE.usd), nr = netReserve(nav, ORANGE.conv, ORANGE.pref, ORANGE.usd);
    const amp = amplificationStrategy(nav, ORANGE.conv, ORANGE.pref, ORANGE.usd);
    const rating = btcRating(nav, ORANGE.cumF);
    const floor = btcFloorPrice(px, rating);
    const risk = btcRiskProb(rating, MU, s.vol / 100, DUR);
    const credit = btcCredit(risk, DUR);
    const req = y30 + OTHER + credit + s.xs / 10000;
    const price = req > 0.001 ? perpetuity(10, req) : Infinity;
    const priceRateOnly = perpetuity(10, y30 + OTHER + baseCredit);
    const bill = BILL + (s.cause === "tight" ? 0.5 * (dy - TODAY_SHOCK) : 0); // 以 2026-09-25 为基准，收紧时短端跟涨一半（假设）
    return {
      y30, bond0, bond1, extraInterest, pe0, pe1, btcMove, px, nav, nr0, nr, amp, rating, floor, risk, credit, req, price, priceRateOnly,
      breakeven: breakevenArr(ORANGE.div, nav), months: monthsCovered(ORANGE.usd, ORANGE.div), bill, stableIncome: STABLES * bill,
    };
  }

  const node = (n, title, stats) => `
    <div class="scn">
      <div class="scn-q"><b>${n}</b> ${title}</div>
      <div class="stat-row">${stats.map(([k, v, c]) => `<div class="stat"><div class="k">${k}</div><div class="v ${c || ""}">${v}</div></div>`).join("")}</div>
    </div>
    <div style="text-align:center;color:var(--muted);font-size:16px;line-height:1.2">↓</div>`;
  const sgn = (x) => (x > 0 ? "neg" : x < 0 ? "pos" : "");
  const chg = (a, b) => (b / a - 1);
  const pctS = (x, d = 1) => (x > 0 ? "+" : "") + fmtPct(x, d);

  function paint() {
    const r = calc(st);
    const set = (id, v, txt) => { $(`#ctd-${id}`).value = v; $(`#ctd-${id}-v`).textContent = txt; };
    set("shock", st.shock, (st.shock > 0 ? "+" : "") + st.shock + T(" 基点", " bp"));
    set("beta", st.beta, (st.beta > 0 ? "+" : "") + st.beta + "%");
    set("own", st.own, (st.own > 0 ? "+" : "") + st.own + "%");
    set("vol", st.vol, st.vol + "%");
    set("xs", st.xs, (st.xs > 0 ? "+" : "") + st.xs + T(" 基点", " bp"));
    root.querySelectorAll("#ctd-cause button").forEach((b) => b.classList.toggle("on", b.dataset.c === st.cause));

    const nrps0 = r.nr0 / ORANGE.shares, nrps = r.nr / ORANGE.shares;
    let html = "";
    html += node("①", T("30 年期国债：长期资金的价格（阶段 4.5）", "30-year Treasury: the price of long-term money (Stage 4.5)"), [
      [T("收益率", "Yield"), fmtPct(r.y30, 2), "acc"],
      [T("5% 票息 30 年期价格", "Price, 5% 30-year"), fmtNum(r.bond1, 1), sgn(-(r.bond1 - r.bond0))],
      [T("价格变化", "Price change"), pctS(chg(r.bond0, r.bond1)), sgn(-(r.bond1 - r.bond0))],
    ]);
    html += node("②", T("政府账本与股票估值（阶段 9.4、阶段 5.3）", "Government ledger and stock valuations (Stages 9.4, 5.3)"), [
      [T("公众持有国债全部重新定价后的年利息增量", "Extra annual interest once all publicly held debt reprices"), (r.extraInterest >= 0 ? "+" : "−") + "$" + fmtBig(Math.abs(r.extraInterest)), sgn(r.extraInterest)],
      [T("示意市盈率（ERP 3%、增长 4%）", "Stylized P/E (ERP 3%, growth 4%)"), isFinite(r.pe1) ? fmtNum(r.pe1, 1) + "x" : "∞", sgn(-(r.pe1 - r.pe0))],
    ]);
    html += node("③", T("比特币：折现率渠道还是贬值渠道（阶段 12.3、阶段 12.4）", "Bitcoin: discount-rate or debasement channel (Stages 12.3, 12.4)"), [
      [T("情景币价", "Scenario BTC price"), fmtUsd(r.px), sgn(-r.btcMove)],
      [T("相对 10 万美元", "vs $100,000"), pctS(r.btcMove), sgn(-r.btcMove)],
      [T("橙子公司比特币净值", "Orange Corp BTC NAV"), "$" + fmtBig(r.nav, 2), ""],
    ]);
    html += node("④", T("橙子公司的普通股：被放大的那一层（阶段 16.4）", "Orange Corp common: the amplified layer (Stage 16.4)"), [
      [T("每股净储备", "Net Reserve per share"), fmtUsd(nrps, 2), sgn(-(nrps - nrps0))],
      [T("变化", "Change"), pctS(chg(nrps0, nrps)), sgn(-(nrps - nrps0))],
      [T("官方放大倍数", "Strategy-style Amplification"), isFinite(r.amp) && r.amp > 0 ? fmtNum(r.amp, 2) + "x" : "∞", ""],
    ]);
    html += node("⑤", T("Orange-F：用国债定价，用 BTC 评级把关（阶段 16.5、阶段 18.1）", "Orange-F: priced off Treasuries, policed by BTC Rating (Stages 16.5, 18.1)"), [
      [T("BTC 评级", "BTC Rating"), fmtNum(r.rating, 2) + "x", r.rating < 2 ? "neg" : ""],
      [T("BTC 地板价", "BTC floor price"), fmtUsd(r.floor), ""],
      [T("BTC Risk / BTC Credit", "BTC Risk / BTC Credit"), fmtPct(r.risk, 1) + " / " + fmtNum(r.credit * 10000, 0) + T(" 基点", " bp"), ""],
      [T("要求收益率", "Required yield"), fmtPct(r.req, 2), "acc"],
      [T("价格（面值 100）", "Price (par 100)"), isFinite(r.price) ? fmtNum(r.price, 1) : "–", sgn(-(r.price - 100))],
    ]);
    html += node("⑥", T("现金一侧：谁来付股息（阶段 16.6、阶段 18.2）", "The cash side: who pays the dividends (Stages 16.6, 18.2)"), [
      [T("BTC Breakeven ARR", "BTC Breakeven ARR"), fmtPct(r.breakeven, 2), r.breakeven > 0.015 ? "neg" : ""],
      [T("美元储备覆盖", "USD reserve coverage"), fmtNum(r.months, 0) + T(" 个月", " months"), ""],
    ]);
    html += `<div class="scn">
      <div class="scn-q"><b>⑦</b> ${T("收益菜单与新管道：同一笔钱的其他去处（阶段 13.2、阶段 14.2）", "The yield menu and the new plumbing: where else the money can go (Stages 13.2, 14.2)")}</div>
      <div class="stat-row">
        <div class="stat"><div class="k">${T("代币化国库券（跟随 3 个月国库券）", "Tokenized T-bill (tracks the 3-month bill)")}</div><div class="v">${fmtPct(r.bill, 2)}</div></div>
        <div class="stat"><div class="k">${T("30 年期国债", "30-year Treasury")}</div><div class="v">${fmtPct(r.y30, 2)}</div></div>
        <div class="stat"><div class="k">${T("Orange-F 要求收益率", "Orange-F required yield")}</div><div class="v acc">${fmtPct(r.req, 2)}</div></div>
        <div class="stat"><div class="k">${T("稳定币发行人储备收入/年", "Stablecoin issuers' reserve income / yr")}</div><div class="v">$${fmtBig(r.stableIncome)}</div></div>
      </div>
    </div>`;
    $("#ctd-chain").innerHTML = html;

    // 图：Orange-F 价格 vs 30 年期收益率（当前信用条件不变）
    const extra = OTHER + r.credit + st.xs / 10000;
    const res = lineChart({
      fns: [
        { f: (y) => perpetuity(10, y / 100 + extra), cls: "line5" },
        { f: (y) => bondPrice(100, 0.05, y / 100, 30), cls: "line2" },
      ],
      lo: 3, hi: 8, xlabel: T("30 年期国债收益率（%）", "30-year Treasury yield (%)"),
      markerX: r.y30 * 100, markerLabel: T("当前", "now"), uid: "ctd",
    });
    $("#ctd-chart").innerHTML = chartBlock(res, [
      ["var(--btc)", T("Orange-F 价格（当前信用条件）", "Orange-F price (current credit conditions)")],
      ["var(--blue)", T("5% 票息 30 年期国债价格", "5%-coupon 30-year Treasury price")],
    ]);

    // 叙述
    const L = [];
    const rateHit = r.priceRateOnly - 100, total = r.price - 100;
    const priceTex = isFinite(r.price)
      ? tex(String.raw`\text{${T("价格", "Price")}} = \frac{10}{${fmtNum(r.req * 100, 2)}\%} = ${fmtNum(r.price, 1)}`)
      : "–";
    L.push(`<span class="${total < 0 ? "bad" : "ok"}">${T(
      `Orange-F ${priceTex}（${pctS(total / 100)}）：其中纯利率效应约 ${pctS(rateHit / 100)}，其余来自信用与风险厌恶。`,
      `Orange-F: ${priceTex} (${pctS(total / 100)}). The pure rate effect is about ${pctS(rateHit / 100)}; the rest comes from credit and risk aversion.`
    )}</span>`);
    if (st.cause === "fiscal" && st.shock > 0) {
      L.push(`<span class="warn">${T("你选了“财政失信”：同样的利率上升，比特币这一环按“贬值交易”逻辑上行——但注意优先股仍然挨利率的刀，因为它的锚是国债收益率。", "You chose fiscal distrust: the same rate rise now lifts the bitcoin link through the debasement logic. Yet the preferred still takes the rate hit, because its anchor is the Treasury yield.")}</span>`);
    } else if (st.shock > 0) {
      L.push(`<span class="warn">${T("“央行收紧”渠道：更高的实际利率让不生息资产变贵，比特币这一环向下——这是 2026 年上半年的剧本。", "Tightening channel: higher real rates make non-yielding assets costlier to hold, so the bitcoin link points down. That was the first-half-2026 script.")}</span>`);
    }
    if (r.rating < 1.5) L.push(`<span class="bad">${T(`BTC 评级只剩 ${fmtNum(r.rating, 2)} 倍：币价离地板价 ${fmtUsd(r.floor)} 不远了，BTC Credit 飙升——这时“约 10% 的收益”补偿不了风险。`, `BTC Rating is down to ${fmtNum(r.rating, 2)}x: the price is close to the ${fmtUsd(r.floor)} floor and BTC Credit is soaring. An "about 10% yield" no longer pays for the risk.`)}</span>`);
    else {
      const floorTex = tex(String.raw`\text{${T("地板价", "floor")}} = \frac{\text{${T("累计索取权", "cumulative claims")}}}{\text{${T("持币量", "coins held")}}} = \frac{\$${ORANGE.cumF / 1e6}\text{M}}{${fmtNum(ORANGE.btc, 0).replace(/,/g, "{,}")}} = \$${fmtNum(r.floor, 0).replace(/,/g, "{,}")}`);
      L.push(`<span class="ok">${T(`BTC 评级 ${fmtNum(r.rating, 2)} 倍，地板价固定：${floorTex}，不随币价变。`, `BTC Rating ${fmtNum(r.rating, 2)}x; the floor is fixed whatever the price: ${floorTex}.`)}</span>`);
    }
    L.push(`<span>${T(
      `普通股每股净储备变化 ${pctS(chg(nrps0, nrps))}，比特币变化 ${pctS(r.btcMove)}——约 ${fmtNum(amplificationStrategy(1e9, ORANGE.conv, ORANGE.pref, ORANGE.usd), 2)} 倍的基准放大。`,
      `Net Reserve per common share moves ${pctS(chg(nrps0, nrps))} against bitcoin's ${pctS(r.btcMove)}: roughly the baseline ${fmtNum(amplificationStrategy(1e9, ORANGE.conv, ORANGE.pref, ORANGE.usd), 2)}x amplification.`
    )}</span>`);
    L.push(`<span>${T("图中国债与 Orange-F 两条线都向右下倾斜：第一条新闻与第三条新闻，在这张图上是同一根杠杆。数字为示意，不构成投资建议。", "Both lines in the chart slope down to the right: headline one and headline three are the same lever on this chart. Figures are illustrative, not investment advice.")}</span>`);
    $("#ctd-log").innerHTML = L.join("");
  }

  const bind = (id, key) => $(`#ctd-${id}`).addEventListener("input", (e) => { st[key] = Number(e.target.value); clearPreset(); paint(); });
  const clearPreset = () => root.querySelectorAll("#ctd-presets .demo-btn").forEach((b) => b.classList.remove("active"));
  bind("shock", "shock"); bind("beta", "beta"); bind("own", "own"); bind("vol", "vol"); bind("xs", "xs");
  root.querySelectorAll("#ctd-cause button").forEach((b) => b.addEventListener("click", () => {
    st.cause = b.dataset.c;
    st.beta = st.cause === "fiscal" ? 10 : -15;
    clearPreset(); paint();
  }));
  root.querySelectorAll("#ctd-presets .demo-btn").forEach((b) => b.addEventListener("click", () => {
    Object.assign(st, PRESETS[b.dataset.p]);
    clearPreset(); b.classList.add("active"); paint();
  }));
  paint();
}
