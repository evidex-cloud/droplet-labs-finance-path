// 交互演示：比特币发行时间表——
// 按真实规则（每 210,000 个区块补贴减半）逐区块算出任意年份的累计供给、区块补贴、年新增率与存量-流量比；
// 可设“永久丢失的币”看有效供给；与黄金、与一个可调的法币货币增长率对比 30 年后的“被稀释程度”；
// 最后用一个币价算出每天新币的美元价值（矿工需要卖出或持有的新供给）。
import { fmtPct, fmtNum, fmtUsd, fmtBig, fv } from "./_fin.js";
import { lineChart, chartBlock } from "./_chart.js";

const HALVING = 210000;
const BLOCKS_PER_YEAR = 52560;
// 真实锚点（年份, 区块高度）：历次减半与 2026-09-26 的高度；之后按 10 分钟一个区块外推
const ANCHORS = [[2009.0, 0], [2012.91, 210000], [2016.52, 420000], [2020.36, 630000], [2024.30, 840000], [2026.735, 968619]];

function heightAt(year) {
  if (year <= ANCHORS[0][0]) return 0;
  for (let i = 1; i < ANCHORS.length; i++) {
    const [y0, h0] = ANCHORS[i - 1], [y1, h1] = ANCHORS[i];
    if (year <= y1) return h0 + (h1 - h0) * (year - y0) / (y1 - y0);
  }
  const [yl, hl] = ANCHORS[ANCHORS.length - 1];
  return hl + (year - yl) * BLOCKS_PER_YEAR;
}
// 区块高度 h 时的补贴（按聪取整）
function subsidyAt(h) {
  const era = Math.floor(h / HALVING);
  if (era >= 64) return 0;
  return Math.floor(50e8 / Math.pow(2, era)) / 1e8;
}
// 截至区块高度 h 的累计供给（逐个时代精确加总）
function supplyAt(h) {
  let s = 0, left = Math.max(0, h);
  for (let era = 0; era < 64 && left > 0; era++) {
    const n = Math.min(left, HALVING);
    s += n * (Math.floor(50e8 / Math.pow(2, era)) / 1e8);
    left -= n;
  }
  return s;
}
// _chart.js 会把 2026 显示成 “2.0k”；这里把 x 轴刻度改写成整年份
const yearAxis = (res, lo, hi) => {
  let i = 0;
  res.svg = res.svg.replace(/(<text class="lbl-axis" x="[0-9.]+" y="263" text-anchor="middle">)[^<]*(<\/text>)/g,
    (m, a, b) => a + Math.round(lo + (hi - lo) * (i++) / 6) + b);
  return res;
};
const yearOfHeight = (h) => {
  let lo = 2009, hi = 2200;
  for (let i = 0; i < 60; i++) { const m = (lo + hi) / 2; if (heightAt(m) < h) lo = m; else hi = m; }
  return (lo + hi) / 2;
};

export default function mount(root, lang) {
  const en = lang === "en";
  const T = (zh, e) => (en ? e : zh);
  const COLON = T("：", ": ");
  const st = { year: 2026.73, lost: 3.5, fiat: 0.06, price: 84000 };

  root.innerHTML = `
    <div class="demo">
      <div class="demo-head">${T("⛏️ 写进代码的货币政策：拖动时间，看供给怎么“半步半步”逼近 2,100 万", "⛏️ Monetary policy in code: drag through time and watch supply half-step toward 21M")}</div>
      <div class="demo-block">
        <label class="demo-label">${T("年份", "Year")}${COLON}<b id="bs-year-v"></b></label>
        <input class="demo-slider" id="bs-year" type="range" min="2009" max="2060" step="0.25" value="${st.year}">
      </div>
      <div class="stat-row">
        <div class="stat"><div class="k">${T("区块高度（估）", "Block height (est.)")}</div><div class="v" id="bs-h">–</div></div>
        <div class="stat"><div class="k">${T("区块补贴", "Block subsidy")}</div><div class="v acc" id="bs-sub">–</div></div>
        <div class="stat"><div class="k">${T("累计供给", "Cumulative supply")}</div><div class="v" id="bs-sup">–</div></div>
        <div class="stat"><div class="k">${T("占 2,100 万", "Share of 21M")}</div><div class="v" id="bs-pct">–</div></div>
      </div>
      <div class="stat-row">
        <div class="stat"><div class="k">${T("年新增 / 存量（供给通胀）", "New per year / stock (supply inflation)")}</div><div class="v" id="bs-infl">–</div></div>
        <div class="stat"><div class="k">${T("存量-流量比", "Stock-to-flow")}</div><div class="v" id="bs-s2f">–</div></div>
        <div class="stat"><div class="k">${T("下一次减半", "Next halving")}</div><div class="v" id="bs-next">–</div></div>
      </div>
      <div class="demo-grid">
        <div id="bs-ch1"></div>
        <div id="bs-ch2"></div>
      </div>
      <div class="demo-grid">
        <div class="demo-block">
          <label class="demo-label">${T("估计永久丢失的币（百万枚）", "Coins assumed permanently lost (millions)")}${COLON}<b id="bs-lost-v"></b></label>
          <input class="demo-slider" id="bs-lost" type="range" min="0" max="6" step="0.25" value="${st.lost}">
        </div>
        <div class="demo-block">
          <label class="demo-label">${T("对比：法币货币供给年增长率", "Compare: fiat money-supply growth per year")}${COLON}<b id="bs-fiat-v"></b></label>
          <input class="demo-slider" id="bs-fiat" type="range" min="0" max="0.15" step="0.005" value="${st.fiat}">
        </div>
        <div class="demo-block">
          <label class="demo-label">${T("假设的比特币价格", "Assumed bitcoin price")}${COLON}<b id="bs-px-v"></b></label>
          <input class="demo-slider" id="bs-px" type="range" min="10000" max="300000" step="1000" value="${st.price}">
        </div>
      </div>
      <div id="bs-cmp"></div>
      <div class="demo-log" id="bs-log"></div>
      <p class="demo-tip">${T(
        "先把年份拖回 2010：年新增率高得惊人，那时的比特币一点也不“硬”。再拖到 2024 年 4 月之后，看供给通胀跌破 1%、存量-流量比超过黄金的约 60。然后把年份拉到 2040：供给几乎不再增长——注意此时矿工的补贴已经很小，这就是阶段 12.6 “安全预算”问题的起点。最后调“丢失的币”：有效供给更小，但它是一个没人能确切知道的数字。",
        "Start by dragging the year back to 2010: annual new supply was enormous — bitcoin was not “hard” at all then. Move past April 2024 and watch supply inflation drop below 1% and stock-to-flow overtake gold's roughly 60. Then go to 2040: supply barely grows — and notice how small the miners' subsidy has become, which is where the “security budget” question of Stage 12.6 begins. Finally play with “lost coins”: effective supply shrinks, but nobody can know that number exactly."
      )}</p>
    </div>`;

  const $ = (id) => root.querySelector("#" + id);
  const GOLD_GROWTH = 3600 / 216000; // 约 1.7%/年（地上存量约 21.6 万吨，年产约 3,600 吨）

  const yearLabel = (y) => {
    const yr = Math.floor(y), m = Math.min(12, Math.floor((y - yr) * 12) + 1);
    return en ? `${yr}-${String(m).padStart(2, "0")}` : `${yr} 年 ${m} 月`;
  };

  function paint() {
    const h = heightAt(st.year);
    const sub = subsidyAt(h);
    const sup = supplyAt(h);
    const flow = sub * BLOCKS_PER_YEAR;
    const infl = sup > 0 ? flow / sup : Infinity;
    const s2f = flow > 0 ? sup / flow : Infinity;
    const nextH = (Math.floor(h / HALVING) + 1) * HALVING;
    const nextY = yearOfHeight(nextH);

    $("bs-year-v").textContent = yearLabel(st.year);
    $("bs-h").textContent = fmtNum(h, 0);
    $("bs-sub").textContent = fmtNum(sub, sub < 1 ? 4 : 3) + " BTC";
    $("bs-sup").textContent = fmtBig(sup, 2);
    $("bs-pct").textContent = fmtPct(sup / 21e6, 1);
    $("bs-infl").textContent = isFinite(infl) ? fmtPct(infl, 2) : "–";
    $("bs-s2f").textContent = isFinite(s2f) ? fmtNum(s2f, 0) + T(" 年", " yrs") : "–";
    $("bs-next").textContent = `${T("区块", "Block")} ${fmtNum(nextH, 0)} ≈ ${yearLabel(nextY)}`;
    $("bs-lost-v").textContent = fmtNum(st.lost, 2) + T(" 百万", "M");
    $("bs-fiat-v").textContent = fmtPct(st.fiat, 1);
    $("bs-px-v").textContent = fmtUsd(st.price);

    const c1 = lineChart({
      fns: [{ f: (y) => supplyAt(heightAt(y)) / 1e6, cls: "line5" }, { f: () => 21, cls: "line3" }],
      lo: 2008, hi: 2062, xlabel: T("年份 · 累计供给（百万枚）", "Year · cumulative supply (millions)"),
      markerX: st.year, markerLabel: yearLabel(st.year), forceZero: true, uid: "bs1",
    });
    yearAxis(c1, 2008, 2062);
    $("bs-ch1").innerHTML = chartBlock(c1, [["var(--btc)", T("累计供给", "Cumulative supply")], ["var(--red)", T("2,100 万上限", "21M cap")]]);
    const c2 = lineChart({
      fns: [
        { f: (y) => { const hh = heightAt(y), s = supplyAt(hh); return s > 0 ? Math.min(25, subsidyAt(hh) * BLOCKS_PER_YEAR / s * 100) : 25; }, cls: "line5" },
        { f: () => GOLD_GROWTH * 100, cls: "line4" },
        { f: () => st.fiat * 100, cls: "line2" },
      ],
      lo: 2010, hi: 2058, xlabel: T("年份 · 年供给增长率（%，上限截到 25）", "Year · annual supply growth (%, capped at 25)"),
      markerX: st.year, forceZero: true, uid: "bs2",
    });
    yearAxis(c2, 2010, 2058);
    $("bs-ch2").innerHTML = chartBlock(c2, [["var(--btc)", T("比特币", "Bitcoin")], ["var(--green)", T("黄金（约）", "Gold (approx.)")], ["var(--blue)", T("法币（你设的）", "Fiat (your setting)")]]);

    // 30 年后：你手里占总量的份额被稀释了多少
    const sup30 = supplyAt(heightAt(st.year + 30));
    const btcKeep = sup / sup30;
    const goldKeep = 1 / fv(1, GOLD_GROWTH, 30);
    const fiatKeep = 1 / fv(1, st.fiat, 30);
    const bar = (lab, v, color) => `<div class="bar2"><span class="lab">${lab}</span><div class="track"><div class="fill" style="width:${(v * 100).toFixed(1)}%;background:${color}"></div></div><span class="val">${fmtPct(v, 1)}</span></div>`;
    $("bs-cmp").innerHTML = `<div class="demo-label">${T("从所选年份起 30 年后，你今天持有的“占总量份额”还剩多少：", "Thirty years after the selected year, how much of today's “share of the total” you still hold:")}</div>`
      + bar(T("比特币", "Bitcoin"), btcKeep, "var(--btc)")
      + bar(T("黄金（年增约 1.7%）", "Gold (about 1.7%/yr)"), goldKeep, "var(--green)")
      + bar(T("法币（你设的增长率）", "Fiat (your growth rate)"), fiatKeep, "var(--blue)");

    const eff = Math.max(1, sup - st.lost * 1e6);
    const dailyNew = sub * 144;
    const lines = [];
    lines.push(`${T("扣掉丢失的币，有效流通供给约", "Net of lost coins, effective circulating supply is about")} <b>${fmtBig(eff, 2)}</b>${T("，有效年新增率约", ", and effective supply inflation about")} <b>${fmtPct(flow / eff, 2)}</b>${T("。", ".")}`);
    lines.push(`${T("每天新币约", "New coins per day: about")} ${fmtNum(dailyNew, dailyNew < 10 ? 2 : 0)} BTC × ${fmtUsd(st.price)} ≈ <b>${fmtUsd(dailyNew * st.price)}</b>${T("；一年约", "; per year about")} <b>${en ? fmtUsd(flow * st.price / 1e9, 1) + "B" : fmtNum(flow * st.price / 1e8, 0) + " 亿美元"}</b>${T("——这是矿工要卖出或持有的新供给。", " — the new supply miners must sell or hold.")}`);
    if (isFinite(s2f) && s2f > 60) lines.push(`<span class="ok">${T("存量-流量比已超过黄金（约 60）：按“新供给稀释存量的速度”这个口径，比特币此时比黄金更“硬”。但记住，这只说明稀缺，不说明价格。", "Stock-to-flow exceeds gold's (about 60): by the “how fast new supply dilutes the stock” yardstick, bitcoin is now harder than gold. Remember, that speaks to scarcity, not price.")}</span>`);
    else if (isFinite(s2f)) lines.push(`<span class="warn">${T("存量-流量比仍低于黄金：这时比特币的新供给相对存量还很大。", "Stock-to-flow is still below gold's: new supply is still large relative to the stock.")}</span>`);
    if (sub < 0.5) lines.push(`<span class="bad">${T("补贴已不足 0.5 BTC：矿工收入越来越要靠手续费，安全预算问题开始变得尖锐（阶段 12.6）。", "The subsidy is below 0.5 BTC: miners depend more and more on fees, and the security-budget question sharpens (Stage 12.6).")}</span>`);
    $("bs-log").innerHTML = lines.map((l) => `<div>${l}</div>`).join("");
  }

  $("bs-year").addEventListener("input", (e) => { st.year = +e.target.value; paint(); });
  $("bs-lost").addEventListener("input", (e) => { st.lost = +e.target.value; paint(); });
  $("bs-fiat").addEventListener("input", (e) => { st.fiat = +e.target.value; paint(); });
  $("bs-px").addEventListener("input", (e) => { st.price = +e.target.value; paint(); });
  paint();
}
