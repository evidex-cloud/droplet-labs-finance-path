// 交互演示：DAT 横向记分卡——同一套公式（_fin.js）算橙子公司、Strategy、Strive、Metaplanet 的
// 比特币净值、占总量比例、各层覆盖、地板价、Breakeven ARR、储备月数、两种放大公式、每年为付股息需卖出的持仓比例；
// 拖动比特币价格冲击看排序怎么变；切换“信用层 / 普通股”视角，高亮各自最在乎的行。
// 数据日期：Strategy 2026-09-20（部分派生）、Strive 2026-09-18、Metaplanet 持仓 2026-07-02 与借款 2026-03（粗算）。
import { btcNav, btcRating, btcFloorPrice, breakevenArr, monthsCovered, amplificationStrategy, striveAmpRatio, fmtPct, fmtNum, fmtUsd, fmtBig, tex } from "./_fin.js";

export default function mount(root, lang) {
  const en = lang === "en";
  const T = (zh, e) => (en ? e : zh);

  const CO = [
    { id: "orange", name: T("橙子公司（示意）", "Orange Corp (illustrative)"), btc: 10000, px: 100000, debt: 150e6, pref: 150e6, cash: 30e6, oblig: 15e6, secured: false, mnav: T("1.50 倍（市值口径）", "1.50x (basic)"), date: T("示意", "illustrative") },
    { id: "mstr", name: "Strategy", btc: 846000, px: 84100, debt: 6.754e9, pref: 14.31e9, cash: 6.09e9, reserve: 5.04e9, oblig: 1.62e9, secured: false, mnav: T("1.01 倍（2026 净口径，08-21）", "1.01x (2026 net, 08-21)"), date: T("2026-09-20，部分派生", "2026-09-20, partly derived") },
    { id: "asst", name: "Strive", btc: 26355, px: 84080, debt: 0, pref: 1.118e9, cash: 229.6e6, oblig: 145.39e6, secured: false, mnav: T("约 1.33 倍（市值口径等价，09-25）", "about 1.33x (basic equivalent, 09-25)"), date: "2026-09-18" },
    { id: "mtpl", name: "Metaplanet", btc: 43000, px: 84100, debt: 280e6, pref: 150e6, cash: null, oblig: null, secured: true, mnav: T("0.58 倍（市值口径，09-26）", "0.58x (basic, 09-26)"), date: T("日期混合，粗算", "mixed dates, rough") },
  ];
  const st = { shock: 0, view: "credit", on: { orange: true, mstr: true, asst: true, mtpl: true } };

  root.innerHTML = `
    <div class="demo">
      <div class="demo-head">${T("⚖️ DAT 横向记分卡：同一把秤，量四家公司", "⚖️ DAT scorecard: one scale, four companies")}</div>
      <div class="demo-grid">
        <div class="demo-block">
          <label class="demo-label">${T("比特币价格相对基准日的变化", "Bitcoin price change from each base date")}${T("：", ": ")}<b id="cmpd-shock-v"></b></label>
          <input class="demo-slider" id="cmpd-shock" type="range" min="-85" max="100" step="5" value="0" />
          <label class="demo-label">${T("视角", "Perspective")}</label>
          <div class="demo-seg" id="cmpd-view">
            <button data-v="credit" class="on">${T("信用层（债务 / 优先股持有人）", "Credit layers (debt / preferred holders)")}</button>
            <button data-v="common">${T("普通股股东", "Common shareholders")}</button>
          </div>
        </div>
        <div class="demo-block">
          <label class="demo-label">${T("纳入比较的公司", "Companies in the comparison")}</label>
          <div class="demo-btns" id="cmpd-on">${CO.map((c) => `<button class="demo-btn active" data-c="${c.id}">${c.name}</button>`).join("")}</div>
        </div>
      </div>
      <div class="demo-block" id="cmpd-table" style="overflow-x:auto"></div>
      <div class="demo-block"><div class="demo-log" id="cmpd-log"></div></div>
      <p class="demo-tip">${T(
        "把比特币冲击拖到 −60%：看哪家公司的最劣后层先跌破 1 倍、哪家每年要卖掉的持仓比例最高。再切到“普通股股东”视角，高亮的行变成放大倍数与杠杆比率——同一张表，站的位置不同，关心的行就不同。这不是排名，也不是推荐。",
        "Drag the bitcoin shock to −60%: see whose most junior layer breaks 1x first and who must sell the largest share of holdings each year. Then switch to the common-shareholder view and the highlighted rows become amplification and leverage. Same table; where you stand decides which rows matter. This is not a ranking or a recommendation."
      )}</p>
    </div>`;

  const q = (s) => root.querySelector(s);

  // 每一行：[标签, 取值函数, 格式化, 方向(1 越大越好 / -1 越小越好 / 0 不比较), 视角]
  const ROWS = [
    [T("数据日期", "Data date"), (c) => c.date, (v) => v, 0, ""],
    [T("持有比特币", "Bitcoin held"), (c) => c.btc, (v) => fmtNum(v, 0), 0, ""],
    [T("占 2,100 万枚的比例", "Share of the 21M cap"), (c) => c.btc / 21e6, (v) => fmtPct(v, 3), 0, ""],
    [T("冲击后比特币价格", "Bitcoin price after shock"), (c) => c.pxs, (v) => fmtUsd(v, 0), 0, ""],
    [T("BTC 储备", "BTC Reserve"), (c) => c.nav, (v) => fmtBig(v), 0, ""],
    [T("报告的溢价（口径不同！）", "Reported premium (definitions differ!)"), (c) => c.mnav, (v) => v, 0, "common"],
    [T("债务层覆盖", "Debt-layer coverage"), (c) => (c.debt > 0 ? btcRating(c.nav, c.debt) : Infinity), (v) => (isFinite(v) ? fmtNum(v, 2) + "x" : T("无债务", "no debt")), 1, "credit"],
    [T("最劣后层覆盖", "Most junior layer coverage"), (c) => btcRating(c.nav, c.debt + c.pref), (v) => fmtNum(v, 2) + "x", 1, "credit"],
    [T("最劣后层地板价", "Most junior floor price"), (c) => btcFloorPrice(c.pxs, btcRating(c.nav, c.debt + c.pref)), (v) => fmtUsd(v, 0), -1, "credit"],
    [T("Breakeven ARR（即每年付息需卖出的持仓比例）", "Breakeven ARR (the share of holdings sold per year to pay)"), (c) => (c.oblig ? breakevenArr(c.oblig, c.nav) : NaN), (v) => (isFinite(v) ? fmtPct(v, 2) : T("数据不足", "no data")), -1, "both"],
    [T("年度利息与股息", "Annual interest and dividends"), (c) => (c.oblig ? c.oblig : NaN), (v) => (isFinite(v) ? fmtBig(v) : T("数据不足", "no data")), 0, "credit"],
    [T("美元储备覆盖（月）", "USD reserve cover (months)"), (c) => (c.oblig && c.cash != null ? monthsCovered(c.reserve != null ? c.reserve : c.cash, c.oblig) : NaN), (v) => (isFinite(v) ? fmtNum(v, 0) : T("数据不足", "no data")), 1, "credit"],
    [T("放大（Strategy 式）", "Amplification (Strategy-style)"), (c) => amplificationStrategy(c.nav, c.debt, c.pref, c.cash || 0), (v) => (isFinite(v) && v > 0 ? fmtNum(v, 2) + "x" : "–"), 0, "common"],
    [T("杠杆比率（Strive 式）", "Leverage ratio (Strive-style)"), (c) => striveAmpRatio(c.debt, c.pref, c.nav), (v) => fmtPct(v, 1), -1, "common"],
    [T("以比特币质押的借款", "Bitcoin-secured borrowing"), (c) => (c.secured ? 1 : 0), (v) => (v ? T("有", "yes") : T("无", "no")), -1, "credit"],
  ];

  const paint = () => {
    q("#cmpd-shock-v").textContent = (st.shock > 0 ? "+" : "") + st.shock + "%";
    const cos = CO.filter((c) => st.on[c.id]).map((c) => {
      const pxs = c.px * (1 + st.shock / 100);
      return { ...c, pxs, nav: btcNav(c.btc, pxs) };
    });
    if (!cos.length) { q("#cmpd-table").innerHTML = ""; q("#cmpd-log").innerHTML = ""; return; }
    const th = `<tr><th style="text-align:left;padding:6px;border-bottom:1px solid var(--line)"></th>${cos.map((c) => `<th style="text-align:right;padding:6px;border-bottom:1px solid var(--line)">${c.name}</th>`).join("")}</tr>`;
    const rows = ROWS.map(([lab, fn, fmt, dir, view]) => {
      const vals = cos.map(fn);
      const nums = vals.filter((v) => typeof v === "number" && !isNaN(v));
      const best = dir === 1 ? Math.max(...nums) : Math.min(...nums), worst = dir === 1 ? Math.min(...nums) : Math.max(...nums);
      const hl = view === st.view || view === "both";
      const cells = vals.map((v) => {
        let col = "var(--ink)";
        if (dir !== 0 && nums.length > 1 && typeof v === "number" && !isNaN(v) && best !== worst) col = v === best ? "var(--green)" : v === worst ? "var(--red)" : "var(--ink)";
        return `<td style="text-align:right;padding:6px;border-bottom:1px solid var(--line);color:${col};${hl ? "font-weight:700" : ""}">${fmt(v)}</td>`;
      }).join("");
      return `<tr style="${hl ? "background:var(--orange-soft)" : ""}"><td style="padding:6px;border-bottom:1px solid var(--line);${hl ? "font-weight:700" : "color:var(--muted)"}">${lab}</td>${cells}</tr>`;
    }).join("");
    q("#cmpd-table").innerHTML = `<table style="width:100%;border-collapse:collapse;font-size:13px">${th}${rows}</table>`;

    const L = [];
    const broke = cos.filter((c) => btcRating(c.nav, c.debt + c.pref) < 1);
    if (broke.length) L.push(`<span class="bad">${T("最劣后层跌破 1 倍", "Most junior layer below 1x")}${T("：", ": ")}${broke.map((c) => c.name).join(T("、", ", "))}</span>`);
    else L.push(`<span class="ok">${T("所有公司的最劣后层覆盖仍在 1 倍以上。", "Every company's most junior layer is still above 1x.")}</span>`);
    const heavy = cos.filter((c) => c.oblig && c.oblig / c.pxs / c.btc > 0.05);
    if (heavy.length) L.push(`<span class="warn">${T("若市场关门、储备耗尽，每年需卖出 5% 以上持仓", "If markets shut and the reserve runs out, these must sell over 5% of holdings a year")}${T("：", ": ")}${heavy.map((c) => c.name).join(T("、", ", "))}</span>`);
    if (cos.some((c) => c.secured)) L.push(`<span class="warn">${T("有以比特币质押的借款：这是结构里唯一可能被追加保证金的环节。", "Bitcoin-secured borrowing present: the one link in these structures that can face a margin call.")}</span>`);
    L.push(`${T("统一公式：", "The shared formulas: ")}${tex(String.raw`\text{${T("最劣后层覆盖", "junior coverage")}} = \dfrac{\text{${T("BTC 储备", "BTC Reserve")}}}{\text{${T("债务", "debt")}} + \text{${T("优先股", "preferred")}}}`)}${T("；", "; ")}${tex(String.raw`\text{${T("地板价", "floor price")}} = \dfrac{\text{${T("比特币价格", "bitcoin price")}}}{\text{${T("覆盖", "coverage")}}}`)}${T("；", "; ")}${tex(String.raw`\text{Breakeven ARR} = \dfrac{\text{${T("年度利息与股息", "annual interest and dividends")}}}{\text{${T("BTC 储备", "BTC Reserve")}}}`)}${T("；", "; ")}${tex(String.raw`\text{${T("杠杆比率", "leverage ratio")}} = \dfrac{\text{${T("债务", "debt")}} + \text{${T("优先股", "preferred")}}}{\text{${T("比特币价值", "bitcoin value")}}}`)}${T("。", ".")}`);
    L.push(`${T("“报告的溢价”一行口径各不相同，不能直接比较（本节 ①）。Metaplanet 的数字混合了不同日期与币种，仅作粗算。仅讲机制，不构成投资建议。", "The “reported premium” row uses different definitions and cannot be compared directly (section ①). Metaplanet's figures mix dates and currencies and are rough. Mechanics only, not investment advice.")}`);
    q("#cmpd-log").innerHTML = L.map((l) => `<div>${l}</div>`).join("");
  };

  q("#cmpd-shock").addEventListener("input", (e) => { st.shock = +e.target.value; paint(); });
  root.querySelectorAll("#cmpd-view button").forEach((b) => b.addEventListener("click", () => {
    st.view = b.dataset.v;
    root.querySelectorAll("#cmpd-view button").forEach((o) => o.classList.toggle("on", o === b));
    paint();
  }));
  root.querySelectorAll("#cmpd-on button").forEach((b) => b.addEventListener("click", () => {
    st.on[b.dataset.c] = !st.on[b.dataset.c];
    b.classList.toggle("active", st.on[b.dataset.c]);
    paint();
  }));
  paint();
}
