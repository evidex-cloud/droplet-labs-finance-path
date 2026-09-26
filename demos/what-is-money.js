// 交互演示：钱性打分器——①按场景给三种职能加权，给六个“候选货币”排名；
// ②记账单位压力测试：用每种候选给一杯咖啡标价 24 个月，看菜单要重印多少次（种子随机路径，示意）。
import { mean, stdev, rng, randn, fmtPct, fmtNum, clamp } from "./_fin.js";
import { lineChart, chartBlock } from "./_chart.js";

export default function mount(root, lang) {
  const en = lang === "en";
  const T = (zh, e) => (en ? e : zh);

  // 候选：三种职能的基准分（0–10，示意），发行人（谁的负债）、层级、每年波动率与漂移（相对美元，示意）
  const C = [
    { k: "cash", name: T("美元现金", "Dollar cash"), s: [9, 10, 5], issuer: T("美联储", "Federal Reserve"), tier: T("第 1 层（顶层）", "Tier 1 (top)"), vol: 0, drift: 0 },
    { k: "dep", name: T("银行存款", "Bank deposit"), s: [10, 10, 6], issuer: T("商业银行", "Commercial bank"), tier: T("第 2 层", "Tier 2"), vol: 0, drift: 0 },
    { k: "usdc", name: "USDC", s: [9, 7, 5], issuer: T("发行商 Circle", "The issuer (Circle)"), tier: T("第 3 层", "Tier 3"), vol: 0.004, drift: 0 },
    { k: "gold", name: T("黄金", "Gold"), s: [2, 3, 8], issuer: T("无人（实物）", "Nobody (physical)"), tier: T("层级之外", "Outside the hierarchy"), vol: 0.15, drift: 0.04 },
    { k: "btc", name: T("比特币", "Bitcoin"), s: [5, 2, 6], issuer: T("无人（协议）", "Nobody (protocol)"), tier: T("层级之外", "Outside the hierarchy"), vol: 0.55, drift: 0.15 },
    { k: "miles", name: T("航空里程", "Airline miles"), s: [2, 0, 2], issuer: T("航空公司", "The airline"), tier: T("私人积分", "Private points"), vol: 0.02, drift: -0.05 },
  ];
  const FN = [T("交易媒介", "Medium of exchange"), T("记账单位", "Unit of account"), T("价值储藏", "Store of value")];
  const SCN = [
    { k: "shop", name: T("日常买菜", "Daily shopping"), w: [60, 30, 10] },
    { k: "save", name: T("存钱 10 年", "Saving for 10 years"), w: [5, 15, 80] },
    { k: "xb", name: T("跨境汇款", "Cross-border transfer"), w: [70, 10, 20] },
    { k: "biz", name: T("给公司记账", "Running a company's books"), w: [25, 65, 10] },
  ];

  let w = [...SCN[0].w], scn = "shop", pick = "btc", seed = 7, depeg = false;

  root.innerHTML = `
    <div class="demo">
      <div class="demo-head">${T("🧪 钱性打分器：用三把尺子量一量“什么才算钱”", "🧪 The moneyness meter: three rulers for “what counts as money”")}</div>
      <div class="demo-block">
        <label class="demo-label">${T("① 选一个使用场景（决定三种职能各占多少权重）", "① Pick a use case (it sets how much each function matters)")}</label>
        <div class="demo-seg" id="wm-scn">${SCN.map((s) => `<button data-s="${s.k}">${s.name}</button>`).join("")}</div>
        <div class="demo-grid-3" style="margin-top:12px">
          ${FN.map((f, i) => `<div><label class="demo-label">${f}${T("：", ": ")}<b id="wm-wv-${i}">${w[i]}</b></label><input class="demo-slider" type="range" min="0" max="100" step="5" value="${w[i]}" data-w="${i}"/></div>`).join("")}
        </div>
        <div id="wm-rank"></div>
      </div>
      <div class="demo-block">
        <label class="demo-label">${T("② 记账单位压力测试：一杯咖啡在美元里约 4 美元、每年涨 3%；换成用下面的候选来标价，24 个月里菜单要改多少次？", "② Unit-of-account stress test: a coffee costs about $4 and rises 3% a year in dollars. Price it in the candidate below instead — how often must the menu be reprinted over 24 months?")}</label>
        <div class="demo-btns" id="wm-pick">${C.map((c) => `<button class="demo-btn" data-c="${c.k}">${c.name}</button>`).join("")}</div>
        <div class="stat-row">
          <div class="stat"><div class="k">${T("是谁的负债", "Whose liability")}</div><div class="v acc" id="wm-iss" style="font-size:15px">–</div></div>
          <div class="stat"><div class="k">${T("货币层级", "Hierarchy")}</div><div class="v" id="wm-tier" style="font-size:15px">–</div></div>
          <div class="stat"><div class="k">${T("月度标价波动", "Monthly price swing")}</div><div class="v" id="wm-sd">–</div></div>
          <div class="stat"><div class="k">${T("重印菜单次数", "Menu reprints")}</div><div class="v" id="wm-re">–</div></div>
        </div>
        <div id="wm-chart"></div>
        <div class="demo-btns">
          <button class="demo-btn" id="wm-seed">${T("🎲 换一条随机路径", "🎲 Try another random path")}</button>
          <button class="demo-btn" id="wm-depeg">${T("⚡ 模拟一次稳定币脱锚（第 8 个月）", "⚡ Simulate a stablecoin depeg (month 8)")}</button>
        </div>
        <div class="demo-log" id="wm-log"></div>
      </div>
      <p class="demo-tip">${T(
        "先切换场景：“日常买菜”里存款和现金领先，“存钱 10 年”里黄金和比特币追上来——<strong>没有哪个候选在所有场景都第一</strong>。再看压力测试：比特币的咖啡价格一个月能跳 10% 以上，这就是它难当记账单位的原因；点“脱锚”看看 USDC 为什么仍然要看发行人的储备。分值与波动均为示意。",
        "Switch use cases first: deposits and cash lead for “daily shopping,” while gold and Bitcoin catch up for “saving for 10 years” — <strong>no candidate wins every use case</strong>. Then look at the stress test: a Bitcoin-priced coffee can jump 10%+ in a month, which is why it struggles as a unit of account; hit “depeg” to see why USDC still depends on its issuer's reserves. Scores and volatilities are illustrative."
      )}</p>
    </div>`;

  const $ = (s) => root.querySelector(s);

  const paintRank = () => {
    const tot = w[0] + w[1] + w[2] || 1;
    const rows = C.map((c) => ({ c, score: (c.s[0] * w[0] + c.s[1] * w[1] + c.s[2] * w[2]) / tot }))
      .sort((a, b) => b.score - a.score);
    $("#wm-rank").innerHTML = rows.map((r, i) => `<div class="bar2">
        <span class="lab" style="${i === 0 ? "color:var(--orange-ink);font-weight:700" : ""}">${r.c.name}</span>
        <div class="track"><div class="fill" style="width:${clamp(r.score * 10, 0, 100)}%;background:${r.c.k === "btc" ? "var(--btc)" : r.c.k === "gold" ? "var(--orange-line)" : "var(--orange)"}"></div></div>
        <span class="val">${fmtNum(r.score, 1)} / 10</span></div>`).join("");
    FN.forEach((_, i) => { $("#wm-wv-" + i).textContent = w[i]; });
    root.querySelectorAll("#wm-scn button").forEach((b) => b.classList.toggle("on", b.dataset.s === scn));
  };

  // 生成 25 个月的“候选/美元”价格路径与咖啡的美元价格，得到“以候选计价的咖啡价格”
  const simulate = (c) => {
    const rand = rng(seed * 97 + c.k.length * 13), dt = 1 / 12;
    let px = 1; const coffee = [];
    for (let m = 0; m <= 24; m++) {
      if (m > 0) {
        px *= Math.exp((c.drift - 0.5 * c.vol * c.vol) * dt + c.vol * Math.sqrt(dt) * randn(rand));
        if (c.k === "miles" && m === 14) px *= 0.8; // 航空公司单方面改兑换表
      }
      let p = px;
      if (c.k === "usdc" && depeg) p = m === 8 ? px * 0.87 : m === 9 ? px * 0.97 : px;
      const usdCoffee = 4 * Math.pow(1.03, m / 12);
      coffee.push(usdCoffee / p);
    }
    return coffee;
  };

  const paintTest = () => {
    const c = C.find((x) => x.k === pick);
    root.querySelectorAll("#wm-pick button").forEach((b) => b.classList.toggle("active", b.dataset.c === pick));
    const cof = simulate(c), usd = simulate(C[0]);
    const chg = cof.slice(1).map((v, i) => v / cof[i] - 1);
    const sd = chg.length > 1 ? stdev(chg) : 0;
    const reprints = chg.filter((x) => Math.abs(x) > 0.05).length;
    $("#wm-iss").textContent = c.issuer;
    $("#wm-tier").textContent = c.tier;
    $("#wm-sd").textContent = fmtPct(sd, 1);
    const re = $("#wm-re"); re.textContent = reprints; re.className = "v " + (reprints === 0 ? "pos" : reprints > 4 ? "neg" : "acc");
    const base0 = cof[0], u0 = usd[0];
    const res = lineChart({
      fns: [
        { f: (x) => (usd[Math.round(x)] / u0) * 100, cls: "line2" },
        { f: (x) => (cof[Math.round(x)] / base0) * 100, cls: c.k === "btc" ? "line5" : "line" },
      ],
      lo: 0, hi: 24, samples: 24, xlabel: T("月份", "Month"), uid: "wm",
    });
    $("#wm-chart").innerHTML = chartBlock(res, [["var(--blue)", T("用美元标价的咖啡（起点 = 100）", "Coffee priced in dollars (start = 100)")], [c.k === "btc" ? "var(--btc)" : "var(--orange)", T("用 ", "Coffee priced in ") + c.name + T(" 标价的咖啡", "")]]);
    const avg = mean(chg);
    const lines = [];
    lines.push(`${T("平均每月标价变化", "Average monthly price change")} <b>${fmtPct(avg, 2)}</b>${T("，", ", ")}${T("月度波动", "monthly swing")} <b>${fmtPct(sd, 1)}</b>${T("；", "; ")}${T("超过 ±5% 的月份（需要重印菜单）", "months beyond ±5% (menu reprint needed)")}${T("：", ": ")}<b>${reprints}</b>`);
    if (c.k === "btc") lines.push(`<span class="warn">${T("以比特币计价，咖啡有时“变便宜”、有时“变贵”——店主、员工和房东都没法按它签约。这就是“记账单位”这把尺子上的低分。", "Priced in Bitcoin, the coffee keeps getting “cheaper” or “dearer” — the owner, staff and landlord cannot contract in it. That is the low score on the unit-of-account ruler.")}</span>`);
    if (c.k === "gold") lines.push(`<span class="warn">${T("黄金的波动比比特币小，但也足以让菜单每隔几个月就要改一次；它的强项在“价值储藏”。", "Gold swings less than Bitcoin but still forces a new menu every few months; its strength is as a store of value.")}</span>`);
    if (c.k === "usdc") lines.push(depeg
      ? `<span class="bad">${T("第 8 个月 USDC 跌到约 0.87 美元：同一杯咖啡突然要多付约 15% 的 USDC。这就是 2023 年 3 月的真实剧本——1:1 取决于发行人的储备。", "In month 8 USDC falls to about $0.87: the same coffee suddenly costs about 15% more USDC. That is the real March 2023 script — par depends on the issuer's reserves.")}</span>`
      : `<span class="ok">${T("正常情况下 USDC 与美元几乎重合——它“借用”了美元这个记账单位。试试“脱锚”按钮。", "Normally USDC tracks the dollar almost perfectly — it borrows the dollar as its unit of account. Try the depeg button.")}</span>`);
    if (c.k === "miles") lines.push(`<span class="bad">${T("第 14 个月航空公司单方面把兑换表贬值 20%——发行人可以随时改写你的“钱”。", "In month 14 the airline devalues its award chart by 20% on its own — the issuer can rewrite your “money” at will.")}</span>`);
    if (c.k === "cash" || c.k === "dep") lines.push(`<span class="ok">${T("用美元计价，咖啡只是随通胀缓慢上涨，菜单一年改一次就够——这就是记账单位满分的样子；代价是每年约 3% 的购买力流失（阶段 1.4）。", "Priced in dollars, the coffee just drifts up with inflation and the menu changes once a year — a perfect unit of account; the cost is about 3% of purchasing power lost each year (Stage 1.4).")}</span>`);
    $("#wm-log").innerHTML = lines.map((l) => `<div>${l}</div>`).join("");
    $("#wm-depeg").classList.toggle("active", depeg);
  };

  root.querySelectorAll("#wm-scn button").forEach((b) => b.addEventListener("click", () => {
    scn = b.dataset.s; w = [...SCN.find((s) => s.k === scn).w];
    root.querySelectorAll("[data-w]").forEach((sl) => { sl.value = w[+sl.dataset.w]; });
    paintRank();
  }));
  root.querySelectorAll("[data-w]").forEach((sl) => sl.addEventListener("input", () => {
    w[+sl.dataset.w] = +sl.value; scn = ""; paintRank();
  }));
  root.querySelectorAll("#wm-pick button").forEach((b) => b.addEventListener("click", () => { pick = b.dataset.c; paintTest(); }));
  $("#wm-seed").addEventListener("click", () => { seed += 1; paintTest(); });
  $("#wm-depeg").addEventListener("click", () => { depeg = !depeg; pick = "usdc"; paintTest(); });

  paintRank();
  paintTest();
}
