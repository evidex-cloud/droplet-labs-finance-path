// 交互演示：比特币估值沙盘——
// 上半部分“数字黄金份额法”：黄金盘子（吨数 × 金价，可选全部黄金或只算投资 + 央行部分）× 你假设的份额 ÷ 有效供给 = 隐含价格，
// 并算出从当前价格到那里所需的年化增长率；
// 下半部分“情景加权”：熊 / 基准 / 牛三个情景的价格与概率 → 期望价格 → 按要求回报折现回今天（观念①），
// 再反推“按当前价格买入，你这组假设隐含的年化期望回报”，并画出现值对折现率的敏感度。
import { pv, fmtUsd, fmtPct, fmtNum, fmtBig } from "./_fin.js";
import { lineChart, chartBlock } from "./_chart.js";

const OZ_PER_TONNE = 32150.7466;
const SUPPLY = 20.09e6; // 2026-09-26 约 2,009 万枚

export default function mount(root, lang) {
  const en = lang === "en";
  const T = (zh, e) => (en ? e : zh);
  const COLON = T("：", ": ");

  const st = {
    tonnes: 216000, goldPx: 4321, pie: "all", share: 0.10, lost: 0, cur: 84000, years: 10,
    sc: [
      { name: T("熊市：叙事失败", "Bear: the story fails"), px: 10000, p: 25 },
      { name: T("基准：小众数字黄金", "Base: niche digital gold"), px: 250000, p: 50 },
      { name: T("牛市：全球储备资产", "Bull: global reserve asset"), px: 1000000, p: 25 },
    ],
    r: 0.15,
  };
  // 价格滑块用对数刻度：位置 0–100 ↔ 1,000–5,000,000 美元
  const toPx = (s) => Math.round(1000 * Math.pow(5000, s / 100) / 100) * 100;
  const fromPx = (px) => (Math.log(px / 1000) / Math.log(5000)) * 100;

  const slider = (id, label, min, max, step, val) => `
    <div class="demo-block">
      <label class="demo-label">${label}${COLON}<b id="${id}-v"></b></label>
      <input class="demo-slider" id="${id}" type="range" min="${min}" max="${max}" step="${step}" value="${val}">
    </div>`;

  root.innerHTML = `
    <div class="demo">
      <div class="demo-head">${T("🧮 比特币估值沙盘：份额法 + 情景加权 + 折现", "🧮 Bitcoin valuation sandbox: share of gold + weighted scenarios + discounting")}</div>
      <div class="demo-label">${T("A. 数字黄金份额法", "A. Digital-gold share method")}</div>
      <div class="demo-row">
        <span class="demo-label">${T("拿来比的黄金盘子", "Which gold pie")}${COLON}</span>
        <div class="demo-seg" id="bv-pie">
          <button data-p="all" class="on">${T("全部地上黄金", "All above-ground gold")}</button>
          <button data-p="mon">${T("只算投资 + 央行部分（约 40%）", "Investment + central banks only (~40%)")}</button>
        </div>
      </div>
      <div class="demo-grid">
        ${slider("bv-tonnes", T("地上黄金存量（吨）", "Above-ground gold (tonnes)"), 180000, 240000, 1000, st.tonnes)}
        ${slider("bv-goldpx", T("金价（美元/盎司）", "Gold price ($/oz)"), 2000, 7000, 10, st.goldPx)}
        ${slider("bv-share", T("比特币拿到的份额", "Bitcoin's share"), 0, 1.5, 0.01, st.share)}
        ${slider("bv-lost", T("永久丢失的币（百万枚）", "Permanently lost coins (millions)"), 0, 5, 0.25, st.lost)}
        ${slider("bv-cur", T("当前比特币价格", "Current bitcoin price"), 20000, 200000, 1000, st.cur)}
        ${slider("bv-years", T("多少年达到", "Years to get there"), 3, 20, 1, st.years)}
      </div>
      <div class="stat-row">
        <div class="stat"><div class="k">${T("黄金盘子", "Gold pie")}</div><div class="v" id="bv-gold">–</div></div>
        <div class="stat"><div class="k">${T("隐含比特币市值", "Implied bitcoin value")}</div><div class="v" id="bv-cap">–</div></div>
        <div class="stat"><div class="k">${T("隐含价格 / 枚", "Implied price per coin")}</div><div class="v acc" id="bv-px">–</div></div>
        <div class="stat"><div class="k">${T("相对当前 / 所需年化", "vs today / CAGR needed")}</div><div class="v" id="bv-mult">–</div></div>
      </div>
      <div class="demo-label" style="margin-top:14px">${T("B. 情景加权：把不确定性写成数字", "B. Weighted scenarios: putting numbers on uncertainty")}</div>
      <div id="bv-sc"></div>
      ${slider("bv-r", T("你的要求回报率（折现率）", "Your required return (discount rate)"), 0.05, 0.3, 0.005, st.r)}
      <div class="stat-row">
        <div class="stat"><div class="k">${T("期望价格（期末）", "Expected price (at horizon)")}</div><div class="v" id="bv-ev">–</div></div>
        <div class="stat"><div class="k">${T("折现回今天", "Discounted to today")}</div><div class="v acc" id="bv-pv">–</div></div>
        <div class="stat"><div class="k">${T("按当前价买入的隐含年化回报", "Implied annual return at today's price")}</div><div class="v" id="bv-irr">–</div></div>
        <div class="stat"><div class="k">${T("期末低于当前价的概率", "Chance of ending below today's price")}</div><div class="v" id="bv-lose">–</div></div>
      </div>
      <div id="bv-chart"></div>
      <div class="demo-log" id="bv-log"></div>
      <p class="demo-tip">${T(
        "先在 A 里切换“只算投资 + 央行部分”：同样 10% 的份额，隐含价格一下子少了六成——可争夺的盘子比看上去小。再到 B 里只动折现率：从 15% 拖到 10%，现值上升一半多；然后把熊市概率从 25% 调到 40%，看期望值怎么缩水。最后看“隐含年化回报”：它告诉你，在你自己的假设下，今天这个价格是贵还是便宜。所有数字都只是框架练习，不构成投资建议。",
        "In A, switch to “investment + central banks only”: the same 10% share now implies a price about 60% lower — the pie up for grabs is smaller than it looks. In B, move only the discount rate: from 15% to 10% raises the present value by more than half. Then lift the bear probability from 25% to 40% and watch the expected value shrink. Finally read the “implied annual return”: under your own assumptions, it tells you whether today's price looks cheap or dear. Everything here is a framework exercise, not investment advice."
      )}</p>
    </div>`;

  const $ = (id) => root.querySelector("#" + id);

  $("bv-sc").innerHTML = st.sc.map((s, i) => `
    <div class="demo-grid" style="align-items:end">
      <div class="demo-block">
        <label class="demo-label">${s.name} · ${T("价格", "price")}${COLON}<b id="bv-sp${i}-v"></b></label>
        <input class="demo-slider" id="bv-sp${i}" type="range" min="0" max="100" step="0.5" value="${fromPx(s.px)}">
      </div>
      <div class="demo-block">
        <label class="demo-label">${T("权重", "Weight")}${COLON}<b id="bv-sw${i}-v"></b></label>
        <input class="demo-slider" id="bv-sw${i}" type="range" min="0" max="100" step="1" value="${s.p}">
      </div>
    </div>`).join("");

  function paint() {
    // A. 份额法
    const goldAll = st.tonnes * OZ_PER_TONNE * st.goldPx;
    const pie = st.pie === "all" ? goldAll : goldAll * 0.4;
    const cap = pie * st.share;
    const eff = SUPPLY - st.lost * 1e6;
    const px = cap / eff;
    const mult = px / st.cur;
    const cagr = Math.pow(Math.max(mult, 1e-9), 1 / st.years) - 1;
    $("bv-tonnes-v").textContent = fmtNum(st.tonnes, 0);
    $("bv-goldpx-v").textContent = fmtUsd(st.goldPx);
    $("bv-share-v").textContent = fmtPct(st.share, 0);
    $("bv-lost-v").textContent = fmtNum(st.lost, 2) + T(" 百万", "M");
    $("bv-cur-v").textContent = fmtUsd(st.cur);
    $("bv-years-v").textContent = st.years + T(" 年", " yrs");
    $("bv-gold").textContent = "$" + fmtBig(pie, 1);
    $("bv-cap").textContent = "$" + fmtBig(cap, 2);
    $("bv-px").textContent = fmtUsd(px);
    $("bv-mult").textContent = `${fmtNum(mult, 2)}× · ${fmtPct(cagr, 1)}${T("/年", "/yr")}`;
    $("bv-mult").className = "v " + (mult >= 1 ? "pos" : "neg");

    // B. 情景加权
    const wsum = st.sc.reduce((s, x) => s + x.p, 0) || 1;
    st.sc.forEach((s, i) => {
      $(`bv-sp${i}-v`).textContent = fmtUsd(s.px);
      $(`bv-sw${i}-v`).textContent = fmtPct(s.p / wsum, 0);
    });
    $("bv-r-v").textContent = fmtPct(st.r, 1);
    const ev = st.sc.reduce((s, x) => s + (x.p / wsum) * x.px, 0);
    const pvNow = pv(ev, st.r, st.years);
    const irr = Math.pow(ev / st.cur, 1 / st.years) - 1;
    const lose = st.sc.filter((x) => x.px < st.cur).reduce((s, x) => s + x.p / wsum, 0);
    $("bv-ev").textContent = fmtUsd(ev);
    $("bv-pv").textContent = fmtUsd(pvNow);
    $("bv-irr").textContent = fmtPct(irr, 1);
    $("bv-irr").className = "v " + (irr >= st.r ? "pos" : "neg");
    $("bv-lose").textContent = fmtPct(lose, 0);

    const ch = lineChart({
      fns: [{ f: (x) => pv(ev, x / 100, st.years) / 1000, cls: "line5" }, { f: () => st.cur / 1000, cls: "line3" }],
      lo: 6, hi: 30, xlabel: T("要求回报率（%）· 纵轴：今天的现值（千美元）", "Required return (%) · y-axis: present value today ($ thousands)"),
      markerX: st.r * 100, markerLabel: fmtPct(st.r, 1), forceZero: true, uid: "bv",
    });
    $("bv-chart").innerHTML = chartBlock(ch, [["var(--btc)", T("情景加权的现值", "Present value of the weighted scenarios")], ["var(--red)", T("当前价格", "Current price")]]);

    const lines = [];
    lines.push(`${T("份额法：黄金盘子", "Share method: a gold pie of")} $${fmtBig(pie, 1)} × ${fmtPct(st.share, 0)} ÷ ${fmtBig(eff, 2)} ${T("枚", "coins")} = <b>${fmtUsd(px)}</b>${T("，", ", ")}${T("要在", "which needs")} ${st.years} ${T("年内达到需要年化", "years at an annual rate of")} <b>${fmtPct(cagr, 1)}</b>${T("。", ".")}`);
    lines.push(`${T("情景加权：期望价格", "Scenarios: expected price")} ${fmtUsd(ev)} ÷ (1 + ${fmtPct(st.r, 1)})^${st.years} = <b>${fmtUsd(pvNow)}</b>${T("。", ".")}`);
    if (pvNow >= st.cur) lines.push(`<span class="ok">${T("在你的假设下，现值高于当前价格：隐含年化回报", "Under your assumptions the present value exceeds today's price: implied annual return")} ${fmtPct(irr, 1)} ${T("高于你要求的", "beats your required")} ${fmtPct(st.r, 1)}${T("。但注意，有", ". But note there is a")} ${fmtPct(lose, 0)} ${T("的概率期末低于今天的价格——期望值高不等于大概率赚钱。", "chance of ending below today's price — a high expected value is not the same as a likely gain.")}</span>`);
    else lines.push(`<span class="warn">${T("在你的假设下，现值低于当前价格：隐含年化回报", "Under your assumptions the present value is below today's price: implied annual return")} ${fmtPct(irr, 1)} ${T("低于你要求的", "falls short of your required")} ${fmtPct(st.r, 1)}${T("。要么市场用了更乐观的概率，要么用了更低的折现率。", ". Either the market is using rosier odds or a lower discount rate.")}</span>`);
    $("bv-log").innerHTML = lines.map((l) => `<div>${l}</div>`).join("");
  }

  const bind = (id, key) => $(id).addEventListener("input", (e) => { st[key] = +e.target.value; paint(); });
  bind("bv-tonnes", "tonnes"); bind("bv-goldpx", "goldPx"); bind("bv-share", "share");
  bind("bv-lost", "lost"); bind("bv-cur", "cur"); bind("bv-years", "years"); bind("bv-r", "r");
  st.sc.forEach((s, i) => {
    $(`bv-sp${i}`).addEventListener("input", (e) => { s.px = toPx(+e.target.value); paint(); });
    $(`bv-sw${i}`).addEventListener("input", (e) => { s.p = +e.target.value; paint(); });
  });
  root.querySelectorAll("#bv-pie button").forEach((b) => b.addEventListener("click", () => {
    root.querySelectorAll("#bv-pie button").forEach((x) => x.classList.remove("on"));
    b.classList.add("on"); st.pie = b.dataset.p; paint();
  }));
  paint();
}
