// 交互演示：波动率交易实验室——
// 以某个隐含波动率买入/卖出一份三个月平价看涨期权，并每天做 delta 对冲；
// 标的按你设定的“真实波动率”走一条可复现的随机路径（可加暴跌跳空），
// 看已实现波动率怎么从路径里算出来、对冲后的盈亏怎样只取决于“已实现 vs 隐含”，
// 再一次跑 500 条路径，看卖波动率“多数小赚、偶尔巨亏”的分布形状。
import { mean, stdev, rng, randn, fmtPct, fmtNum, fmtUsd, tex } from "./_fin.js";
import { lineChart, chartBlock } from "./_chart.js";

function normCdf(x) {
  const a1 = 0.254829592, a2 = -0.284496736, a3 = 1.421413741, a4 = -1.453152027, a5 = 1.061405429, p = 0.3275911;
  const s = x < 0 ? -1 : 1, z = Math.abs(x) / Math.SQRT2, t = 1 / (1 + p * z);
  const y = 1 - ((((a5 * t + a4) * t + a3) * t + a2) * t + a1) * t * Math.exp(-z * z);
  return 0.5 * (1 + s * y);
}
// 本演示专用的布莱克-斯科尔斯看涨价格与 delta（_fin.js 中没有期权公式）
function bsCall(S, K, T, r, v) {
  if (T <= 1e-9) return Math.max(0, S - K);
  const sq = v * Math.sqrt(T), d1 = (Math.log(S / K) + (r + v * v / 2) * T) / sq;
  return S * normCdf(d1) - K * Math.exp(-r * T) * normCdf(d1 - sq);
}
function bsDelta(S, K, T, r, v) {
  if (T <= 1e-9) return S > K ? 1 : 0;
  const sq = v * Math.sqrt(T);
  return normCdf((Math.log(S / K) + (r + v * v / 2) * T) / sq);
}

export default function mount(root, lang) {
  const en = lang === "en";
  const T = (zh, e) => (en ? e : zh);
  const S0 = 100, K = 100, R = 0.04, DAYS = 63, TY = DAYS / 252, DT = 1 / 252, QTY = 100;
  let st = { side: 1, trueVol: 0.6, iv: 0.5, jumps: false, seed: 3 };

  root.innerHTML = `
    <div class="demo">
      <div class="demo-head">${T("🌪️ 波动率实验室：只赌“动多大”，不赌“往哪动”", "🌪️ Volatility lab: bet on how far it moves, not which way")}</div>
      <div class="demo-row">
        <div class="demo-seg" id="va-side">
          <button data-s="1" class="on">${T("买波动率（买期权 + 对冲）", "Long vol (buy option + hedge)")}</button>
          <button data-s="-1">${T("卖波动率（卖期权 + 对冲）", "Short vol (sell option + hedge)")}</button>
        </div>
        <div class="demo-seg" id="va-jump">
          <button data-j="0" class="on">${T("平稳行情", "No jumps")}</button>
          <button data-j="1">${T("偶发暴跌跳空", "Occasional crash gaps")}</button>
        </div>
      </div>
      <div class="demo-grid">
        <div class="demo-block">
          <label class="demo-label">${T("标的的“真实”波动率（生成路径用）", "The underlying's “true” volatility (drives the path)")}${en ? ": " : "："}<b id="va-tv-v"></b></label>
          <input class="demo-slider" id="va-tv" type="range" min="0.1" max="1.2" step="0.05" value="${st.trueVol}">
        </div>
        <div class="demo-block">
          <label class="demo-label">${T("你成交的隐含波动率（期权价格）", "Implied vol you trade at (the option's price)")}${en ? ": " : "："}<b id="va-iv-v"></b></label>
          <input class="demo-slider" id="va-iv" type="range" min="0.1" max="1.2" step="0.05" value="${st.iv}">
        </div>
      </div>
      <div class="stat-row">
        <div class="stat"><div class="k">${T("期权权利金（100 份）", "Premium (100 options)")}</div><div class="v" id="va-prem">–</div></div>
        <div class="stat"><div class="k">${T("这条路径的已实现波动率", "Realized vol on this path")}</div><div class="v acc" id="va-rv">–</div></div>
        <div class="stat"><div class="k">${T("盈亏平衡日波动", "Break-even daily move")}</div><div class="v" id="va-be">–</div></div>
        <div class="stat"><div class="k">${T("对冲后总盈亏", "Hedged P&L")}</div><div class="v" id="va-pnl">–</div></div>
      </div>
      <div class="demo-grid">
        <div id="va-path"></div>
        <div id="va-cum"></div>
      </div>
      <div class="demo-btns">
        <button class="demo-btn" id="va-new">${T("换一条路径", "New path")}</button>
        <button class="demo-btn" id="va-mc">${T("一次跑 500 条路径", "Run 500 paths")}</button>
      </div>
      <div class="demo-block" id="va-hist"></div>
      <div class="demo-log" id="va-log"></div>
      <div class="demo-block" id="va-vega"></div>
      <p class="demo-tip">${T(
        "先让两个波动率相等（比如都是 50%），多换几条路径：对冲后的盈亏围着 0 打转——方向被对冲掉了。再把真实波动率拖到 80%：买波动率几乎每条路径都赚。然后切到“卖波动率 + 偶发暴跌跳空”，把隐含波动率设得比真实略高，跑 500 条路径：胜率很高，但看看最差那一条——这就是“在压路机前捡硬币”。",
        "Start with both vols equal (say 50%) and click through a few paths: the hedged P&L hovers around zero — direction has been hedged away. Now drag true vol to 80%: long vol wins on almost every path. Then switch to “Short vol + occasional crash gaps,” set implied a bit above true vol and run 500 paths: the win rate is high, but look at the worst path — that is “picking up nickels in front of a steamroller.”"
      )}</p>
    </div>`;

  const $ = (id) => root.querySelector("#" + id);

  // 生成一条路径并做每日 delta 对冲；返回价格序列、累计盈亏序列、已实现波动率与最终盈亏
  function simulate(rand) {
    const prices = [S0], rets = [];
    let S = S0;
    for (let d = 1; d <= DAYS; d++) {
      let lr = (R - 0.5 * st.trueVol * st.trueVol) * DT + st.trueVol * Math.sqrt(DT) * randn(rand);
      if (st.jumps && rand() < 0.02) lr += Math.log(0.88); // 约每 50 天一次、单日 −12% 的跳空
      S = S * Math.exp(lr);
      prices.push(S); rets.push(lr);
    }
    const rv = stdev(rets) * Math.sqrt(252);
    // 期权多头 + 卖空 delta 股；side = −1 时整体取反
    const prem = bsCall(S0, K, TY, R, st.iv);
    let delta = bsDelta(S0, K, TY, R, st.iv);
    let cash = -prem + delta * S0;
    const cum = [0];
    for (let d = 1; d <= DAYS; d++) {
      const Sd = prices[d], tLeft = TY - d * DT;
      cash *= Math.exp(R * DT);
      const optVal = bsCall(Sd, K, tLeft, R, st.iv);
      const mtm = optVal - delta * Sd + cash; // 按隐含波动率盯市
      cum.push(st.side * mtm * QTY);
      const nd = bsDelta(Sd, K, tLeft, R, st.iv);
      cash += (nd - delta) * Sd; // 再平衡：delta 变大就多卖，变小就买回
      delta = nd;
    }
    const final = cum[cum.length - 1];
    return { prices, cum, rv, final, prem };
  }

  const series = (arr) => (x) => {
    const i = Math.max(0, Math.min(arr.length - 1, x));
    const lo = Math.floor(i), hi = Math.min(arr.length - 1, lo + 1), w = i - lo;
    return arr[lo] * (1 - w) + arr[hi] * w;
  };

  function paint() {
    $("va-tv-v").textContent = fmtPct(st.trueVol, 0);
    $("va-iv-v").textContent = fmtPct(st.iv, 0);
    const res = simulate(rng(st.seed));
    $("va-prem").textContent = fmtUsd(res.prem * QTY, 0);
    $("va-rv").textContent = fmtPct(res.rv, 1);
    $("va-be").textContent = "±" + fmtPct(st.iv / Math.sqrt(252), 2);
    const e = $("va-pnl");
    e.textContent = fmtUsd(res.final, 0); e.className = "v " + (res.final >= 0 ? "pos" : "neg");

    $("va-path").innerHTML = chartBlock(lineChart({ fns: [{ f: series(res.prices), cls: "line5" }], lo: 0, hi: DAYS, samples: DAYS * 2, xlabel: T("交易日", "Trading day"), markerX: 0, uid: "vap" }), [["var(--btc)", T("标的价格（起点 100）", "Underlying (starts at 100)")]]);
    $("va-cum").innerHTML = chartBlock(lineChart({ fns: [{ f: series(res.cum), cls: st.side > 0 ? "line4" : "line3" }], lo: 0, hi: DAYS, samples: DAYS * 2, xlabel: T("交易日", "Trading day"), forceZero: true, uid: "vac" }), [[st.side > 0 ? "var(--green)" : "var(--red)", T("对冲后累计盈亏（美元）", "Cumulative hedged P&L ($)")]]);

    const gap = res.rv - st.iv;
    const lines = [];
    lines.push(`${T("已实现", "Realized")} ${fmtPct(res.rv, 1)} ${T("vs 隐含", "vs implied")} ${fmtPct(st.iv, 0)} → ${gap > 0 ? T("路径比“租金”更颠簸", "the path was bumpier than the “rent”") : T("路径比“租金”更平静", "the path was calmer than the “rent”")}${T("：", ": ")}<span class="${res.final >= 0 ? "ok" : "bad"}">${st.side > 0 ? T("买波动率", "long vol") : T("卖波动率", "short vol")} ${res.final >= 0 ? T("赚钱", "makes money") : T("亏钱", "loses money")}</span>`);
    const endS = res.prices[res.prices.length - 1];
    lines.push(`${T("标的终点", "Underlying ends at")} ${fmtNum(endS, 1)}${endS >= S0 ? T("（上涨）", " (up)") : T("（下跌）", " (down)")}${T("——但盈亏几乎不取决于方向，只取决于颠簸程度。", " — yet the P&L barely depends on direction, only on how bumpy the ride was.")}`);
    $("va-log").innerHTML = lines.map((l) => `<div>${l}</div>`).join("");

    const vegaRes = lineChart({ fns: [{ f: (v) => bsCall(S0, K, TY, R, v) * QTY, cls: "line" }], lo: 0.1, hi: 1.2, xlabel: T("隐含波动率 →", "Implied volatility →"), markerX: st.iv, markerLabel: fmtPct(st.iv, 0), forceZero: true, uid: "vav" });
    $("va-vega").innerHTML = `<div class="demo-label">${T("期权价值 vs 隐含波动率（100 份三个月平价看涨）：几乎是一条直线——期权价格就是波动率的价格", "Option value vs implied vol (100 three-month ATM calls): nearly a straight line — an option's price is a volatility price")}</div>` + chartBlock(vegaRes, [["var(--orange)", T("权利金（美元）", "Premium ($)")]]);
  }

  function runMC() {
    const rand = rng(1000 + st.seed);
    const out = [];
    for (let i = 0; i < 500; i++) out.push(simulate(rand).final);
    out.sort((a, b) => a - b);
    const avg = mean(out), win = out.filter((x) => x > 0).length / out.length;
    const worst = out[0], best = out[out.length - 1];
    const lo = worst, hi = best, bins = 10, w = (hi - lo) / bins || 1;
    const counts = Array(bins).fill(0);
    out.forEach((x) => { counts[Math.min(bins - 1, Math.floor((x - lo) / w))]++; });
    const maxC = Math.max(...counts);
    $("va-hist").innerHTML = `
      <div class="demo-label">${T("500 条路径的盈亏分布（美元）", "P&L distribution over 500 paths ($)")}</div>
      ${counts.map((c, i) => {
        const a = lo + i * w, b = a + w, mid = (a + b) / 2;
        return `<div class="bar2"><span class="lab">${fmtUsd(a, 0)}</span><div class="track"><div class="fill" style="width:${(c / maxC) * 100}%;background:${mid >= 0 ? "var(--green)" : "var(--red)"}"></div></div><span class="val">${c}</span></div>`;
      }).join("")}
      <div class="stat-row">
        <div class="stat"><div class="k">${T("平均盈亏", "Average P&L")}</div><div class="v ${avg >= 0 ? "pos" : "neg"}">${fmtUsd(avg, 0)}</div></div>
        <div class="stat"><div class="k">${T("胜率", "Win rate")}</div><div class="v">${fmtPct(win, 0)}</div></div>
        <div class="stat"><div class="k">${T("最差一条", "Worst path")}</div><div class="v neg">${fmtUsd(worst, 0)}</div></div>
        <div class="stat"><div class="k">${T("最好一条", "Best path")}</div><div class="v pos">${fmtUsd(best, 0)}</div></div>
      </div>
      <div class="demo-meta">${tex(String.raw`\left|\dfrac{\text{${T("最差一条", "worst path")}}}{\text{${T("平均盈亏", "average")}}}\right| = ${avg !== 0 ? String.raw`\mathbf{${fmtNum(Math.abs(worst / avg), 1).replace(/,/g, "{,}")}}\times` : String.raw`\text{–}`}`)}${T("。卖波动率时这个数字往往很大：一次悬崖吃掉很多次小赚。", ". For short vol this ratio tends to be large: one cliff eats many small wins.")}</div>`;
  }

  root.querySelectorAll("#va-side button").forEach((b) => b.addEventListener("click", () => {
    st.side = +b.dataset.s;
    root.querySelectorAll("#va-side button").forEach((x) => x.classList.toggle("on", x === b));
    $("va-hist").innerHTML = ""; paint();
  }));
  root.querySelectorAll("#va-jump button").forEach((b) => b.addEventListener("click", () => {
    st.jumps = b.dataset.j === "1";
    root.querySelectorAll("#va-jump button").forEach((x) => x.classList.toggle("on", x === b));
    $("va-hist").innerHTML = ""; paint();
  }));
  $("va-tv").addEventListener("input", (e) => { st.trueVol = +e.target.value; $("va-hist").innerHTML = ""; paint(); });
  $("va-iv").addEventListener("input", (e) => { st.iv = +e.target.value; $("va-hist").innerHTML = ""; paint(); });
  $("va-new").addEventListener("click", () => { st.seed += 1; paint(); });
  $("va-mc").addEventListener("click", runMC);
  paint();
}
