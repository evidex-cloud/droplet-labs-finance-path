// 交互演示：100 美元的三种命运——从你选的起始年份，把 100 美元分别拿着现金、换成黄金、换成比特币，
// 看到 2024 年的名义价值与实际购买力（对数刻度）。数据为按年均价取整的示意值，仅用于理解量级，不构成投资建议。
import { realRate, maxDrawdown, fmtPct, fmtUsd, fmtBig, fmtNum } from "./_fin.js";
import { lineChart, chartBlock } from "./_chart.js";

export default function mount(root, lang) {
  const en = lang === "en";
  const T = (zh, e) => (en ? e : zh);

  // 年均值（取整，示意）：美国 CPI-U、金价（美元/盎司）、比特币（美元）
  const CPI = [[1971, 40.5], [1975, 53.8], [1980, 82.4], [1985, 107.6], [1990, 130.7], [1995, 152.4], [2000, 172.2], [2005, 195.3], [2010, 218.1], [2011, 224.9], [2013, 233.0], [2015, 237.0], [2017, 245.1], [2020, 258.8], [2021, 271.0], [2022, 292.7], [2023, 304.7], [2024, 313.7]];
  const GOLD = [[1971, 41], [1975, 161], [1980, 615], [1985, 317], [1990, 384], [1995, 384], [2000, 279], [2005, 445], [2010, 1225], [2011, 1572], [2013, 1411], [2015, 1160], [2017, 1257], [2020, 1770], [2021, 1799], [2022, 1800], [2023, 1943], [2024, 2386]];
  const BTC = [[2011, 5], [2013, 190], [2015, 270], [2017, 4000], [2020, 11100], [2021, 47400], [2022, 28200], [2023, 28900], [2024, 65000]];
  const END = 2024;

  // 对数线性插值
  const at = (tab, yr) => {
    if (yr <= tab[0][0]) return tab[0][1];
    for (let i = 1; i < tab.length; i++) {
      const [y1, v1] = tab[i], [y0, v0] = tab[i - 1];
      if (yr <= y1) { const w = (yr - y0) / (y1 - y0); return Math.exp(Math.log(v0) + w * (Math.log(v1) - Math.log(v0))); }
    }
    return tab[tab.length - 1][1];
  };

  let start = 2011, real = true;
  const QUICK = [
    [1971, T("1971：关闭黄金窗口", "1971: gold window closes")],
    [1980, T("1980：金价高点", "1980: gold's peak")],
    [2011, T("2011：比特币有了市价", "2011: Bitcoin has a market price")],
    [2017, T("2017", "2017")],
    [2021, T("2021：比特币周期高点附近", "2021: near a Bitcoin cycle top")],
  ];

  root.innerHTML = `
    <div class="demo">
      <div class="demo-head">${T("🪙 100 美元的三种命运：拿着现金、换成黄金、换成比特币（示意数据）", "🪙 Three fates for $100: hold cash, buy gold, buy Bitcoin (illustrative data)")}</div>
      <div class="demo-btns" id="gfb-q">${QUICK.map(([y, l]) => `<button class="demo-btn" data-y="${y}">${l}</button>`).join("")}</div>
      <div class="demo-block">
        <label class="demo-label">${T("起始年份（持有到 2024 年）", "Start year (held until 2024)")}${T("：", ": ")}<b id="gfb-yv"></b></label>
        <input class="demo-slider" type="range" id="gfb-y" min="1971" max="2023" step="1"/>
      </div>
      <div class="demo-block">
        <div class="demo-seg" id="gfb-m">
          <button data-r="1">${T("实际购买力（按起始年美元）", "Real purchasing power (start-year dollars)")}</button>
          <button data-r="0">${T("名义美元", "Nominal dollars")}</button>
        </div>
      </div>
      <div class="cmp-3" id="gfb-cards"></div>
      <div id="gfb-chart"></div>
      <div class="demo-log" id="gfb-log"></div>
      <p class="demo-tip">${T(
        "先点“1971”：现金的实际购买力只剩约 13 美元，黄金却涨了几十倍——法币贬值是真实的。再点“1980”：买在金价高点的人，要等二十多年才回本，<strong>硬钱也会让你输很久</strong>。最后点“2021”：比特币的年均价口径已经很颠簸，盘中回撤更深（2022 年约 −77%）。纵轴是对数刻度；数据为年均价取整的示意值，不构成投资建议。",
        "Click “1971” first: cash keeps only about $13 of purchasing power while gold rises dozens of times — fiat debasement is real. Then “1980”: whoever bought gold at the top waited more than twenty years to break even — <strong>hard money can make you lose for a long time too.</strong> Finally “2021”: even on annual averages Bitcoin's path is bumpy, and intra-year drawdowns were deeper (about −77% in 2022). The vertical axis is logarithmic; data are rounded annual averages for illustration, not investment advice."
      )}</p>
    </div>`;

  const $ = (q) => root.querySelector(q);

  const paint = () => {
    $("#gfb-y").value = start;
    $("#gfb-yv").textContent = start;
    root.querySelectorAll("#gfb-q button").forEach((b) => b.classList.toggle("active", +b.dataset.y === start));
    root.querySelectorAll("#gfb-m button").forEach((b) => b.classList.toggle("on", (b.dataset.r === "1") === real));
    const c0 = at(CPI, start), c1 = at(CPI, END), yrs = END - start;
    const defl = (yr) => (real ? c0 / at(CPI, yr) : 1);
    const hasBtc = start >= 2011;
    const val = {
      cash: (yr) => 100 * defl(yr),
      gold: (yr) => 100 * at(GOLD, yr) / at(GOLD, start) * defl(yr),
      btc: (yr) => (hasBtc ? 100 * at(BTC, yr) / at(BTC, start) * defl(yr) : NaN),
    };
    const inflCagr = Math.pow(c1 / c0, 1 / yrs) - 1;
    const card = (key, title, color, cls) => {
      const v = val[key](END);
      if (!isFinite(v)) return `<div class="cmp-cell"><h5>${title}</h5><div class="demo-meta">${T("比特币 2009 年才诞生、约 2010–2011 年才有市场价格——把起始年份拖到 2011 年或之后。", "Bitcoin was born in 2009 and only had a market price from about 2010–2011 — drag the start year to 2011 or later.")}</div></div>`;
      const nomEnd = key === "cash" ? 100 : 100 * (key === "gold" ? at(GOLD, END) / at(GOLD, start) : at(BTC, END) / at(BTC, start));
      const nomCagr = Math.pow(nomEnd / 100, 1 / yrs) - 1;
      const realCagr = realRate(nomCagr, inflCagr);
      const series = []; for (let y = start; y <= END; y++) series.push(val[key](y));
      const mdd = maxDrawdown(series);
      return `<div class="cmp-cell ${cls}"><h5>${title}</h5>
        <div style="font-size:22px;font-weight:700;color:${color}">${v >= 1e5 ? "$" + fmtBig(v, 1) : fmtUsd(v)}</div>
        <div class="demo-meta">${T("年化名义", "Annualized nominal")} ${fmtPct(nomCagr, 1)} · ${T("年化实际", "real")} <b style="color:${realCagr < 0 ? "var(--red)" : "var(--green)"}">${fmtPct(realCagr, 1)}</b><br>${T("年均价口径最大回撤", "Max drawdown (annual averages)")} ${fmtPct(mdd, 0)}</div></div>`;
    };
    $("#gfb-cards").innerHTML =
      card("cash", T("💵 拿着现金", "💵 Hold cash"), "var(--blue)", "cold") +
      card("gold", T("🥇 换成黄金", "🥇 Buy gold"), "var(--orange-ink)", "") +
      card("btc", T("₿ 换成比特币", "₿ Buy Bitcoin"), "var(--btc)", "hl");

    const lg = (f) => (yr) => { const v = f(Math.round(yr)); return isFinite(v) && v > 0 ? Math.log10(v) : NaN; };
    const fns = [{ f: lg(val.cash), cls: "line2" }, { f: lg(val.gold), cls: "line" }];
    if (hasBtc) fns.push({ f: lg(val.btc), cls: "line5" });
    const res = lineChart({ fns, lo: start, hi: END, samples: Math.max(4, yrs), xlabel: T("年份 · 纵轴为对数刻度：2 = 100 美元，3 = 1,000，4 = 10,000", "Year · log scale: 2 = $100, 3 = $1,000, 4 = $10,000"), uid: "gfb" });
    const leg = [["var(--blue)", T("现金", "Cash")], ["var(--orange)", T("黄金", "Gold")]];
    if (hasBtc) leg.push(["var(--btc)", T("比特币", "Bitcoin")]);
    $("#gfb-chart").innerHTML = chartBlock(res, leg);

    const lines = [];
    lines.push(`${T("这", "Over these")} ${yrs} ${T("年里美国 CPI 年均通胀约", "years US CPI inflation averaged about")} <b>${fmtPct(inflCagr, 1)}</b>${T("；起始年的 100 美元现金，到 2024 年只剩约", "; $100 of cash from the start year kept only about")} <b>${fmtUsd(100 * c0 / c1)}</b> ${T("的购买力。", "of purchasing power by 2024.")}`);
    // 黄金回本年份（实际口径）
    let be = null; for (let y = start + 1; y <= END; y++) { if (at(GOLD, y) / at(GOLD, start) * (c0 / at(CPI, y)) >= 1) { be = y; break; } }
    if (be === null) lines.push(`<span class="bad">${T("按实际购买力，黄金到 2024 年仍未回到起始水平。", "In real terms, gold still hadn't recovered its starting level by 2024.")}</span>`);
    else if (be - start > 10) lines.push(`<span class="warn">${T("按实际购买力，黄金直到", "In real terms, gold didn't get back to even until")} ${be} ${T("年才回本——等了", "— a wait of")} ${be - start} ${T("年。", "years.")}</span>`);
    if (hasBtc) lines.push(`<span class="warn">${T("比特币的数字最惊人，但请记住：年均价会抹平波动；它在 2011、2014–15、2018、2022 年都经历过 70–90% 的盘中回撤（阶段 12.4）。过去的表现不代表未来。", "Bitcoin's numbers are the most striking, but remember that annual averages smooth the ride; it suffered intra-year drawdowns of 70–90% in 2011, 2014–15, 2018 and 2022 (Stage 12.4). Past performance says nothing certain about the future.")}</span>`);
    $("#gfb-log").innerHTML = lines.map((l) => `<div>${l}</div>`).join("");
  };

  $("#gfb-y").addEventListener("input", (e) => { start = +e.target.value; paint(); });
  root.querySelectorAll("#gfb-q button").forEach((b) => b.addEventListener("click", () => { start = +b.dataset.y; paint(); }));
  root.querySelectorAll("#gfb-m button").forEach((b) => b.addEventListener("click", () => { real = b.dataset.r === "1"; paint(); }));
  paint();
}
