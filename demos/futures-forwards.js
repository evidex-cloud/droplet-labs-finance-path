// 交互演示：对冲一位农民 / 一家比特币矿工——
// 用持有成本算出期货价格（基差、年化基差），拖动对冲比率与到期价格，看收入如何被锁定；
// 再用一条可复现的随机价格路径，看“账面对冲”背后每天的保证金现金流压力。
import { fv, fmtUsd, fmtPct, fmtNum, clamp, rng, randn } from "./_fin.js";
import { lineChart, chartBlock } from "./_chart.js";

export default function mount(root, lang) {
  const en = lang === "en";
  const T = (zh, e) => (en ? e : zh);

  const presets = {
    miner: { name: T("比特币矿工", "Bitcoin miner"), unit: T("BTC", "BTC"), spot: 100000, qty: 30, cost: 60000, storage: 0, vol: 0.5, qStep: 1, qMax: 100, dp: 0 },
    farmer: { name: T("小麦农民", "Wheat farmer"), unit: T("蒲式耳", "bushels"), spot: 6, qty: 50000, cost: 5, storage: 0.02, vol: 0.25, qStep: 5000, qMax: 200000, dp: 2 },
  };
  let kind = "miner";
  let st = { r: 0.04, months: 3, hedge: 0.5, move: -0.3, seed: 7 };

  root.innerHTML = `
    <div class="demo">
      <div class="demo-head">${T("🌾⛏️ 对冲沙盘：用期货锁定明天的价格", "🌾⛏️ Hedging sandbox: lock in tomorrow's price with futures")}</div>
      <div class="demo-row">
        <div class="demo-seg" id="ff-kind">
          <button data-k="miner" class="on">${presets.miner.name}</button>
          <button data-k="farmer">${presets.farmer.name}</button>
        </div>
        <span class="demo-meta" id="ff-desc"></span>
      </div>
      <div class="demo-grid">
        <div class="demo-block">
          <label class="demo-label">${T("无风险利率（年）", "Risk-free rate (annual)")}${en ? ": " : "："}<b id="ff-r-v"></b></label>
          <input class="demo-slider" id="ff-r" type="range" min="0" max="0.1" step="0.0025" value="${st.r}">
          <label class="demo-label">${T("距离交割（月）", "Months to delivery")}${en ? ": " : "："}<b id="ff-m-v"></b></label>
          <input class="demo-slider" id="ff-m" type="range" min="1" max="12" step="1" value="${st.months}">
        </div>
        <div class="demo-block">
          <label class="demo-label">${T("对冲比率（卖出期货 / 预期产量）", "Hedge ratio (futures sold / expected output)")}${en ? ": " : "："}<b id="ff-h-v"></b></label>
          <input class="demo-slider" id="ff-h" type="range" min="0" max="1" step="0.05" value="${st.hedge}">
          <label class="demo-label">${T("交割日现货价相对今天", "Spot at delivery vs today")}${en ? ": " : "："}<b id="ff-mv-v"></b></label>
          <input class="demo-slider" id="ff-mv" type="range" min="-0.6" max="0.6" step="0.05" value="${st.move}">
        </div>
      </div>
      <div class="stat-row">
        <div class="stat"><div class="k">${T("期货价 F", "Futures price F")}</div><div class="v acc" id="ff-F">–</div></div>
        <div class="stat"><div class="k">${T("基差 / 年化", "Basis / annualized")}</div><div class="v" id="ff-basis">–</div></div>
        <div class="stat"><div class="k">${T("不对冲的利润", "Profit unhedged")}</div><div class="v" id="ff-p0">–</div></div>
        <div class="stat"><div class="k">${T("对冲后的利润", "Profit hedged")}</div><div class="v" id="ff-p1">–</div></div>
      </div>
      <div class="demo-block" id="ff-chart"></div>
      <div class="demo-block">
        <div class="demo-row">
          <span class="demo-label" style="margin:0">${T("🧾 现金流压力：一条随机价格路径上，期货空头每天要补多少保证金？", "🧾 Cash-flow stress: along one random price path, how much margin does the short hedge demand?")}</span>
          <button class="demo-btn" id="ff-new">${T("换一条路径", "New path")}</button>
        </div>
        <div class="demo-log" id="ff-log"></div>
      </div>
      <p class="demo-tip">${T(
        "先把对冲比率拖到 100%：无论到期价格怎么变，利润那条线变成一条水平线——这就是“锁定”。再拖回 0%，你拿回了全部上行和全部下行。然后点“换一条路径”：即使最终结果被锁定，途中期货空头可能要先垫付一大笔保证金——对冲者往往不是死于价格，而是死于现金流。",
        "Push the hedge ratio to 100% first: however the delivery price moves, the profit line goes flat — that is what “locking in” means. Drag it back to 0% and you own all the upside and all the downside. Then hit “New path”: even with the end result locked, the short futures may demand a large pile of margin along the way. Hedgers rarely die from price; they die from cash flow."
      )}</p>
    </div>`;

  const $ = (id) => root.querySelector("#" + id);
  const money = (x) => fmtUsd(x, 0);

  function paint() {
    const p = presets[kind];
    const Ty = st.months / 12;
    const F = fv(p.spot, st.r + p.storage, Ty);
    const basis = F - p.spot;
    const annBasis = Math.pow(F / p.spot, 1 / Ty) - 1;
    const hedgedQty = p.qty * st.hedge;
    const ST = p.spot * (1 + st.move);
    const profitAt = (S, h) => p.qty * (S - p.cost) + p.qty * h * (F - S);
    const p0 = profitAt(ST, 0), p1 = profitAt(ST, st.hedge);

    $("ff-desc").textContent = T(
      `预期产量 ${fmtNum(p.qty, 0)} ${p.unit} · 现货 ${fmtUsd(p.spot, p.dp)} · 成本 ${fmtUsd(p.cost, p.dp)}/${p.unit}${p.storage ? " · 仓储 2%/年" : ""}`,
      `Expected output ${fmtNum(p.qty, 0)} ${p.unit} · spot ${fmtUsd(p.spot, p.dp)} · cost ${fmtUsd(p.cost, p.dp)}/${kind === "miner" ? "BTC" : "bushel"}${p.storage ? " · storage 2%/yr" : ""}`
    );
    $("ff-r-v").textContent = fmtPct(st.r, 2);
    $("ff-m-v").textContent = st.months;
    $("ff-h-v").textContent = fmtPct(st.hedge, 0) + T(`（${fmtNum(hedgedQty, 0)} ${p.unit}）`, ` (${fmtNum(hedgedQty, 0)} ${p.unit})`);
    $("ff-mv-v").textContent = (st.move >= 0 ? "+" : "") + fmtPct(st.move, 0) + " → " + fmtUsd(ST, p.dp);
    $("ff-F").textContent = fmtUsd(F, p.dp);
    $("ff-basis").textContent = fmtUsd(basis, p.dp) + " / " + fmtPct(annBasis, 1);
    const e0 = $("ff-p0"), e1 = $("ff-p1");
    e0.textContent = money(p0); e0.className = "v " + (p0 >= 0 ? "pos" : "neg");
    e1.textContent = money(p1); e1.className = "v " + (p1 >= 0 ? "pos" : "neg");

    const lo = p.spot * 0.4, hi = p.spot * 1.6;
    const res = lineChart({
      fns: [
        { f: (S) => profitAt(S, 0), cls: "line3" },
        { f: (S) => profitAt(S, st.hedge), cls: "line" },
        { f: (S) => profitAt(S, 1), cls: "line4" },
      ],
      lo, hi, xlabel: T("交割日现货价 →", "Spot at delivery →"), markerX: ST, markerLabel: T("你的情景", "your scenario"), forceZero: true, uid: "ff",
    });
    $("ff-chart").innerHTML = chartBlock(res, [
      ["var(--red)", T("不对冲（0%）", "Unhedged (0%)")],
      ["var(--orange)", T(`当前对冲 ${fmtPct(st.hedge, 0)}`, `Your hedge ${fmtPct(st.hedge, 0)}`)],
      ["var(--green)", T("完全对冲（100%）", "Fully hedged (100%)")],
    ]);

    // 随机路径上的每日盯市：空头在价格上涨时每天亏损，需要补保证金
    const rand = rng(st.seed);
    const days = Math.max(20, Math.round(st.months * 21));
    const dt = Ty / days;
    let S = p.spot, cum = 0, worst = 0, worstDay = 0, maxS = S;
    let Fprev = F;
    for (let d = 1; d <= days; d++) {
      S = S * Math.exp(-0.5 * p.vol * p.vol * dt + p.vol * Math.sqrt(dt) * randn(rand));
      maxS = Math.max(maxS, S);
      const Ft = fv(S, st.r + p.storage, Ty - d * dt);
      cum += -hedgedQty * (Ft - Fprev); // 空头的每日变动保证金
      Fprev = Ft;
      if (cum < worst) { worst = cum; worstDay = d; }
    }
    const endProfit = p.qty * (S - p.cost) + hedgedQty * (F - S);
    const lines = [];
    lines.push(`${T("路径终点现货", "Spot at the end of the path")}: <b>${fmtUsd(S, p.dp)}</b>${T("（途中最高 ", " (path high ")}${fmtUsd(maxS, p.dp)}${T("）", ")")} · ${T("最终合计利润", "final total profit")} <b>${money(endProfit)}</b>`);
    if (hedgedQty === 0) {
      lines.push(`<span class="warn">${T("没有对冲，也就没有保证金追缴——但你承担了全部价格风险。", "No hedge, so no margin calls — but you carry all of the price risk.")}</span>`);
    } else if (worst < 0) {
      lines.push(`<span class="bad">${T("期货空头途中累计最多要垫付", "At its worst, the short futures had cumulatively demanded")} <b>${money(-worst)}</b> ${T("保证金（第 " + worstDay + " 个交易日）——而你的货还没卖出去。", "of margin (on trading day " + worstDay + ") — before you had sold a single unit of output.")}</span>`);
      const share = -worst / Math.max(1, p.qty * p.cost);
      lines.push(`${T("相当于你总生产成本的", "That equals")} <b>${fmtPct(clamp(share, 0, 99), 0)}</b>${T("。准备好这笔现金，对冲才真的有效。", " of your total production cost. Have that cash ready, or the hedge is only a hedge on paper.")}`);
    } else {
      lines.push(`<span class="ok">${T("这条路径上价格一路走低，期货空头每天都在收钱——对冲者最舒服的一种情形。", "On this path prices drifted lower and the short futures collected margin every day — the most comfortable case for a hedger.")}</span>`);
    }
    $("ff-log").innerHTML = lines.map((l) => `<div>${l}</div>`).join("");
  }

  root.querySelectorAll("#ff-kind button").forEach((b) => b.addEventListener("click", () => {
    kind = b.dataset.k;
    root.querySelectorAll("#ff-kind button").forEach((x) => x.classList.toggle("on", x === b));
    paint();
  }));
  const bind = (id, key) => $(id).addEventListener("input", (e) => { st[key] = +e.target.value; paint(); });
  bind("ff-r", "r"); bind("ff-m", "months"); bind("ff-h", "hedge"); bind("ff-mv", "move");
  $("ff-new").addEventListener("click", () => { st.seed += 1; paint(); });
  paint();
}
