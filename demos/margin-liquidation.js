// 交互演示：两个沙盘——
// ① 一个人的杠杆：选杠杆倍数，算出强平价；在一条可复现的随机价格路径上，看“方向对了却中途被强平”；
// ② 一群人的瀑布：市场里 400 个杠杆交易者（强平价各不相同），施加一次初始下跌，
//    强平卖单按市场深度冲击价格，逐轮触发下一批强平，看最终跌幅被放大了多少倍。
import { rng, randn, fmtPct, fmtNum, fmtUsd, fmtBig, clamp } from "./_fin.js";
import { lineChart, chartBlock } from "./_chart.js";

export default function mount(root, lang) {
  const en = lang === "en";
  const T = (zh, e) => (en ? e : zh);
  const C = en ? ": " : "：";
  const P0 = 100000, MM = 0.005;
  let mode = "one";
  const one = { lev: 10, vol: 0.6, drift: 0.5, seed: 11 };
  const crowd = { avgLev: 15, shock: 0.05, depth: 1.5e9, oi: 20e9, seed: 5 };

  // 做多仓位的强平价：开仓价 × (1 − 1/杠杆) ÷ (1 − 维持保证金)
  const liqPrice = (entry, lev) => entry * (1 - 1 / lev) / (1 - MM);

  root.innerHTML = `
    <div class="demo">
      <div class="demo-head">${T("🧊 杠杆与清算瀑布沙盘", "🧊 Leverage & liquidation-cascade sandbox")}</div>
      <div class="demo-seg" id="ml-mode">
        <button data-m="one" class="on">${T("① 一个人的杠杆", "① One trader's leverage")}</button>
        <button data-m="crowd">${T("② 一群人的瀑布", "② A crowd's cascade")}</button>
      </div>
      <div id="ml-one">
        <div class="demo-grid">
          <div class="demo-block">
            <label class="demo-label">${T("杠杆倍数", "Leverage")}${C}<b id="ml-lev-v"></b></label>
            <input class="demo-slider" id="ml-lev" type="range" min="1" max="100" step="1" value="${one.lev}">
            <label class="demo-label">${T("比特币年化波动率", "Bitcoin annualized volatility")}${C}<b id="ml-vol-v"></b></label>
            <input class="demo-slider" id="ml-vol" type="range" min="0.2" max="1.2" step="0.05" value="${one.vol}">
          </div>
          <div class="demo-block">
            <label class="demo-label">${T("你对方向的判断：一年后的预期涨幅", "Your directional view: expected rise over one year")}${C}<b id="ml-dr-v"></b></label>
            <input class="demo-slider" id="ml-dr" type="range" min="0" max="1.5" step="0.05" value="${one.drift}">
            <div class="demo-btns"><button class="demo-btn" id="ml-new">${T("换一条路径", "New path")}</button><button class="demo-btn" id="ml-mc">${T("跑 1,000 条路径", "Run 1,000 paths")}</button></div>
          </div>
        </div>
        <div class="stat-row">
          <div class="stat"><div class="k">${T("强平价", "Liquidation price")}</div><div class="v neg" id="ml-lp">–</div></div>
          <div class="stat"><div class="k">${T("距强平的跌幅", "Drop to liquidation")}</div><div class="v" id="ml-dd">–</div></div>
          <div class="stat"><div class="k">${T("一年后币价", "Price after one year")}</div><div class="v" id="ml-end">–</div></div>
          <div class="stat"><div class="k">${T("你的结果（本金 2 万）", "Your result ($20k stake)")}</div><div class="v" id="ml-res">–</div></div>
        </div>
        <div class="demo-block" id="ml-chart"></div>
        <div class="demo-log" id="ml-log"></div>
      </div>
      <div id="ml-crowd" style="display:none">
        <div class="demo-grid">
          <div class="demo-block">
            <label class="demo-label">${T("市场平均杠杆", "Average leverage in the market")}${C}<b id="mc-lev-v"></b></label>
            <input class="demo-slider" id="mc-lev" type="range" min="2" max="50" step="1" value="${crowd.avgLev}">
            <label class="demo-label">${T("初始冲击（一则坏消息）", "Initial shock (one piece of bad news)")}${C}<b id="mc-sh-v"></b></label>
            <input class="demo-slider" id="mc-sh" type="range" min="0.01" max="0.15" step="0.005" value="${crowd.shock}">
          </div>
          <div class="demo-block">
            <label class="demo-label">${T("市场深度（压低 1% 需要的卖单）", "Market depth (selling needed to move price 1%)")}${C}<b id="mc-dp-v"></b></label>
            <input class="demo-slider" id="mc-dp" type="range" min="500000000" max="5000000000" step="100000000" value="${crowd.depth}">
            <div class="demo-meta">${T("杠杆多头总持仓 200 亿美元，由 400 个交易者组成；开仓价分布在现价 ±8% 内。", "Leveraged longs total $20B across 400 traders; entry prices are spread within ±8% of the current price.")}</div>
            <div class="demo-btns"><button class="demo-btn" id="mc-new">${T("换一批交易者", "New crowd")}</button></div>
          </div>
        </div>
        <div class="stat-row">
          <div class="stat"><div class="k">${T("初始冲击", "Initial shock")}</div><div class="v" id="mc-s0">–</div></div>
          <div class="stat"><div class="k">${T("瀑布后的总跌幅", "Total fall after cascade")}</div><div class="v neg" id="mc-tot">–</div></div>
          <div class="stat"><div class="k">${T("放大倍数", "Amplification")}</div><div class="v acc" id="mc-amp">–</div></div>
          <div class="stat"><div class="k">${T("被强平的持仓", "Positions liquidated")}</div><div class="v" id="mc-liq">–</div></div>
        </div>
        <div class="demo-block" id="mc-rounds"></div>
        <div class="demo-log" id="mc-log"></div>
      </div>
      <p class="demo-tip">${T(
        "在①里把预期涨幅设到 +50%、杠杆设到 20 倍，点“跑 1,000 条路径”：大多数路径一年后币价更高，可大多数 20 倍多头早已被强平——方向对了，路径错了。在②里保持初始冲击 5% 不变，只把市场平均杠杆从 5 倍拖到 30 倍，或把市场深度拖小：同一则坏消息，跌幅可以从 5% 变成 15% 以上；市场再薄一点，就超过 20%。",
        "In ①, set the expected rise to +50% and leverage to 20x, then run 1,000 paths: on most paths bitcoin ends the year higher, yet most 20x longs were liquidated long before — right direction, wrong path. In ②, keep the initial shock at 5% and only drag average leverage from 5x to 30x, or shrink market depth: the same piece of bad news can turn a 5% dip into a fall of 15% or more — and past 20% if the market is a little thinner."
      )}</p>
    </div>`;

  const $ = (id) => root.querySelector("#" + id);

  // 一条日频价格路径（365 天，比特币全年交易）
  function pathOf(rand) {
    const out = [P0], dt = 1 / 365, mu = Math.log(1 + one.drift);
    let S = P0;
    for (let d = 1; d <= 365; d++) {
      S *= Math.exp((mu - 0) * dt - 0.5 * one.vol * one.vol * dt + one.vol * Math.sqrt(dt) * randn(rand));
      out.push(S);
    }
    return out;
  }
  function outcome(path, lev) {
    const lp = liqPrice(P0, lev);
    const stake = 20000, size = stake * lev;
    for (let d = 0; d < path.length; d++) if (path[d] <= lp) return { liquidated: true, day: d, value: 0 };
    const end = path[path.length - 1];
    return { liquidated: false, value: stake + size * (end / P0 - 1) };
  }

  function paintOne() {
    const lp = liqPrice(P0, one.lev);
    $("ml-lev-v").textContent = one.lev + "×";
    $("ml-vol-v").textContent = fmtPct(one.vol, 0);
    $("ml-dr-v").textContent = "+" + fmtPct(one.drift, 0);
    $("ml-lp").textContent = fmtUsd(lp, 0);
    $("ml-dd").textContent = "−" + fmtPct(1 - lp / P0, 1);
    const path = pathOf(rng(one.seed));
    const end = path[path.length - 1];
    const o = outcome(path, one.lev);
    $("ml-end").textContent = fmtUsd(end, 0);
    const r = $("ml-res");
    r.textContent = o.liquidated ? T("已强平", "Liquidated") : fmtUsd(o.value, 0);
    r.className = "v " + (o.liquidated || o.value < 20000 ? "neg" : "pos");
    const series = (x) => { const i = clamp(x, 0, 365), lo = Math.floor(i), hi = Math.min(365, lo + 1); return path[lo] + (path[hi] - path[lo]) * (i - lo); };
    const res = lineChart({
      fns: [{ f: series, cls: "line5" }, { f: () => lp, cls: "line3" }],
      lo: 0, hi: 365, samples: 365, xlabel: T("天", "Day"), markerX: o.liquidated ? o.day : null, markerLabel: T("强平", "liquidated"), uid: "ml",
    });
    $("ml-chart").innerHTML = chartBlock(res, [["var(--btc)", T("比特币价格", "Bitcoin price")], ["var(--red)", T(`${one.lev} 倍多头的强平线`, `Liquidation line for a ${one.lev}x long`)]]);
    const lines = [];
    if (o.liquidated) {
      lines.push(`<span class="bad">${T("第 " + o.day + " 天被强平，2 万本金归零。", "Liquidated on day " + o.day + "; the $20k stake is gone.")}</span> ${end > P0 ? `<span class="warn">${T("而一年后币价是 " + fmtUsd(end, 0) + "，比开仓时更高——你的判断是对的。", "Yet a year later bitcoin is at " + fmtUsd(end, 0) + ", above your entry — your call was right.")}</span>` : ""}`);
    } else {
      lines.push(`<span class="ok">${T("活过了这一年：", "Survived the year: ")}</span>${T("本金变成 ", "the stake became ")}<b>${fmtUsd(o.value, 0)}</b>${T("（无杠杆持有则为 ", " (unlevered it would be ")}${fmtUsd(20000 * end / P0, 0)}${T("）。", ").")}`);
    }
    lines.push(`${T("这条路径上的最低点：", "Lowest point on this path: ")}${fmtUsd(Math.min(...path), 0)}（${fmtPct(Math.min(...path) / P0 - 1, 1)}）`.replace("（", en ? " (" : "（").replace("）", en ? ")" : "）"));
    $("ml-log").innerHTML = lines.map((l) => `<div>${l}</div>`).join("");
  }

  function runMC() {
    const rand = rng(500 + one.seed);
    let up = 0, liq = 0, liqButUp = 0, sumV = 0;
    for (let i = 0; i < 1000; i++) {
      const p = pathOf(rand), o = outcome(p, one.lev), isUp = p[p.length - 1] > P0;
      if (isUp) up++;
      if (o.liquidated) { liq++; if (isUp) liqButUp++; }
      sumV += o.value;
    }
    $("ml-log").innerHTML = [
      `${T("1,000 条路径中，一年后币价高于开仓价的：", "Of 1,000 paths, bitcoin ended the year above entry on: ")}<b>${fmtPct(up / 1000, 0)}</b>`,
      `<span class="bad">${T(one.lev + " 倍多头途中被强平的：", "The " + one.lev + "x long was liquidated along the way on: ")}<b>${fmtPct(liq / 1000, 0)}</b></span>`,
      `<span class="warn">${T("其中“方向对了却被强平”的：", "“Right direction, still liquidated”: ")}<b>${fmtPct(liqButUp / 1000, 0)}</b></span>`,
      `${T("平均期末本金：", "Average ending stake: ")}<b>${fmtUsd(sumV / 1000, 0)}</b>${T("（起始 20,000）", " (started at 20,000)")}`,
    ].map((l) => `<div>${l}</div>`).join("");
  }

  function paintCrowd() {
    $("mc-lev-v").textContent = crowd.avgLev + "×";
    $("mc-sh-v").textContent = "−" + fmtPct(crowd.shock, 1);
    $("mc-dp-v").textContent = "$" + fmtBig(crowd.depth, 2);
    // 生成交易者：杠杆围绕平均值对数正态分布，开仓价分布在 ±8%
    const rand = rng(crowd.seed), N = 400, each = crowd.oi / N;
    const traders = [];
    for (let i = 0; i < N; i++) {
      const lev = clamp(crowd.avgLev * Math.exp(0.5 * randn(rand) - 0.125), 1.2, 125);
      let entry = P0 * (1 + (rand() * 2 - 1) * 0.08);
      if (liqPrice(entry, lev) >= P0) entry = P0 * (1 - rand() * 0.08); // 已经在现价之上被强平的人不会还在场上
      traders.push({ lp: liqPrice(entry, lev), alive: true, units: each / entry });
    }
    let P = P0 * (1 - crowd.shock);
    const rounds = [{ P, sold: 0, n: 0 }];
    let totalSold = 0, totalN = 0;
    for (let r = 0; r < 30; r++) {
      let sold = 0, n = 0;
      for (const t of traders) if (t.alive && P <= t.lp) { t.alive = false; sold += t.units * P; n++; }
      if (n === 0) break;
      totalSold += sold; totalN += n;
      P = P * (1 - (sold / crowd.depth) * 0.01);
      rounds.push({ P, sold, n });
      if (P < P0 * 0.05) break;
    }
    const tot = 1 - P / P0;
    $("mc-s0").textContent = "−" + fmtPct(crowd.shock, 1);
    $("mc-tot").textContent = "−" + fmtPct(tot, 1);
    $("mc-amp").textContent = fmtNum(tot / crowd.shock, 1) + "×";
    $("mc-liq").textContent = totalN + " / 400";

    const maxDrop = Math.max(tot, 0.01);
    $("mc-rounds").innerHTML = `<div class="demo-label">${T("逐轮价格（每一轮 = 一批强平被执行）", "Price round by round (each round = one batch of liquidations executed)")}</div><div class="stages">` +
      rounds.map((r, i) => `<div class="stage-bar"><span class="lab">${i === 0 ? T("初始冲击", "Initial shock") : T("第 " + i + " 轮", "Round " + i)}</span><div class="track"><div class="fill" style="width:${clamp((1 - r.P / P0) / maxDrop, 0, 1) * 100}%;background:${i === 0 ? "var(--orange)" : "var(--red)"}"></div></div><span class="val">${fmtUsd(r.P, 0)}</span></div>`).join("") + "</div>";

    const lines = [];
    if (rounds.length === 1) lines.push(`<span class="ok">${T("初始冲击没有碰到任何人的强平价——没有瀑布。低杠杆的市场能把坏消息“吸收掉”。", "The initial shock didn't reach anyone's liquidation price — no cascade. A lightly levered market absorbs bad news.")}</span>`);
    else {
      lines.push(`${T("共执行 ", "Executed ")}${rounds.length - 1}${T(" 轮强平，被迫卖出约 ", " rounds of liquidations, force-selling about ")}<b>$${fmtBig(totalSold, 2)}</b>${T("；第一轮卖单 ", "; the first round sold ")}$${fmtBig(rounds[1].sold, 2)}${T("。", ".")}`);
      lines.push(`<span class="${tot / crowd.shock > 2 ? "bad" : "warn"}">${T("一则只值 ", "News worth only ")}${fmtPct(crowd.shock, 1)}${T(" 的坏消息，最终造成 ", " of downside ended in a ")}${fmtPct(tot, 1)}${T(" 的下跌——多出来的部分全部来自强平卖单本身。", " fall — everything beyond the shock came from the forced selling itself.")}</span>`);
    }
    $("mc-log").innerHTML = lines.map((l) => `<div>${l}</div>`).join("");
  }

  const paint = () => (mode === "one" ? paintOne() : paintCrowd());
  root.querySelectorAll("#ml-mode button").forEach((b) => b.addEventListener("click", () => {
    mode = b.dataset.m;
    root.querySelectorAll("#ml-mode button").forEach((x) => x.classList.toggle("on", x === b));
    $("ml-one").style.display = mode === "one" ? "" : "none";
    $("ml-crowd").style.display = mode === "crowd" ? "" : "none";
    paint();
  }));
  const bind = (id, obj, key) => $(id).addEventListener("input", (e) => { obj[key] = +e.target.value; paint(); });
  bind("ml-lev", one, "lev"); bind("ml-vol", one, "vol"); bind("ml-dr", one, "drift");
  bind("mc-lev", crowd, "avgLev"); bind("mc-sh", crowd, "shock"); bind("mc-dp", crowd, "depth");
  $("ml-new").addEventListener("click", () => { one.seed += 1; paintOne(); });
  $("ml-mc").addEventListener("click", runMC);
  $("mc-new").addEventListener("click", () => { crowd.seed += 1; paintCrowd(); });
  paint();
}
