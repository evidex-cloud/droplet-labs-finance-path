// 交互演示：同一家橙子公司、同样四个季度的比特币价格，用两套会计规则记账——
// 减值模型（只减不增）vs 公允价值模型（ASU 2023-08）。看账面价值、季度损益、每股收益、递延税与 CAMT 口径的 AFSI。
import { btcNav, fmtNum, fmtUsd, fmtPct } from "./_fin.js";
import { lineChart, chartBlock } from "./_chart.js";

export default function mount(root, lang) {
  const en = lang === "en";
  const T = (zh, e) => (en ? e : zh);

  const BTC = 10000, P0 = 100000, COST = btcNav(BTC, P0) / 1e6; // 百万美元
  const SHARES = 100, OPINC = 2, PREFDIV_Q = 3.75, TAX = 0.21; // 软件业务每季经营利润 2 百万（示意）；优先股股息每季 3.75 百万
  const st = { px: [60000, 120000, 90000, 110000], low: 0, view: "both" };

  root.innerHTML = `
    <div class="demo">
      <div class="demo-head">${T("🧾 两套账本：减值模型 vs 公允价值模型（橙子公司，四个季度）", "🧾 Two sets of books: impairment vs fair value (Orange Corp, four quarters)")}</div>
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(170px,1fr));gap:10px">
        ${[0, 1, 2, 3].map((i) => `<div class="demo-block"><label class="demo-label">${T("第 " + (i + 1) + " 季末比特币：", "BTC at end of Q" + (i + 1) + ": ")}<b id="da-v-${i}"></b></label><input class="demo-slider" type="range" data-q="${i}" min="30000" max="200000" step="1000" value="${st.px[i]}" /></div>`).join("")}
      </div>
      <div class="demo-grid">
        <div class="demo-block"><label class="demo-label">${T("季度内最低价比季末低（旧规则按期间最低价减值）：", "Intra-quarter low below quarter-end (old rules impaired at the period low): ")}<b id="da-v-low"></b></label><input class="demo-slider" type="range" id="da-low" min="0" max="30" step="1" value="${st.low}" /></div>
        <div class="demo-block"><div class="demo-label">${T("显示", "Show")}</div><div class="demo-seg" id="da-seg"><button data-v="imp">${T("减值模型", "Impairment")}</button><button data-v="fv">${T("公允价值", "Fair value")}</button><button data-v="both" class="on">${T("两者对比", "Compare both")}</button></div></div>
      </div>
      <div class="stat-row" id="da-stats"></div>
      <div id="da-chart"></div>
      <div id="da-table" style="overflow-x:auto"></div>
      <div class="demo-log" id="da-log"></div>
      <p class="demo-tip">${T(
        "把第 2 季拖到 15 万美元：公允价值模型报出巨额盈利，减值模型却一分收益都不认——账面价值卡在最低点。再把“季度内最低价”拖到 30%：旧规则的减值更大，因为它看的是期间最低价而不是季末价。最后看 AFSI 两行：临时指引出台前，未实现收益会进入 CAMT 的税基。",
        "Drag Q2 up to $150k: fair value reports a huge profit while the impairment model recognizes nothing — the carrying value is stuck at the low. Then drag the “intra-quarter low” to 30%: old-rule impairments grow, because they looked at the period low rather than the quarter-end price. Finally compare the two AFSI rows: before the interim guidance, unrealized gains would have entered the CAMT base."
      )}</p>
    </div>`;

  const q = (s) => root.querySelector(s);

  const compute = () => {
    let imp = COST, fvPrev = COST;
    const rows = [];
    st.px.forEach((p, i) => {
      const mv = btcNav(BTC, p) / 1e6;
      const lowMv = mv * (1 - st.low / 100);
      // 减值：期间最低市值低于账面就减记，回升不转回
      const impNew = Math.min(imp, lowMv);
      const impPL = impNew - imp;
      imp = impNew;
      const fvPL = mv - fvPrev;
      fvPrev = mv;
      const niImp = impPL + OPINC, niFv = fvPL + OPINC;
      rows.push({
        q: i + 1, p, mv, imp, impPL, fvPL, niImp, niFv,
        epsImp: (niImp - PREFDIV_Q) / SHARES, epsFv: (niFv - PREFDIV_Q) / SHARES,
        dtl: Math.max(0, mv - COST) * TAX,
        afsiWith: niFv, afsiWithout: niFv - fvPL,
      });
    });
    return rows;
  };

  const paint = () => {
    st.px.forEach((p, i) => { q("#da-v-" + i).textContent = fmtUsd(p); });
    q("#da-v-low").textContent = st.low + "%";
    const rows = compute();
    const last = rows[3];
    const sumImp = rows.reduce((s, r) => s + r.niImp, 0), sumFv = rows.reduce((s, r) => s + r.niFv, 0);
    q("#da-stats").innerHTML = [
      [T("期末市值", "Ending market value"), fmtUsd(last.mv) + "M", "acc"],
      [T("减值模型账面", "Impairment carrying value"), fmtUsd(last.imp) + "M", last.imp < last.mv * 0.95 ? "neg" : ""],
      [T("被低估的部分", "Understatement"), fmtPct(1 - last.imp / last.mv, 0), last.imp < last.mv ? "neg" : "pos"],
      [T("全年净利润：减值 / 公允", "Full-year net income: impairment / fair value"), fmtUsd(sumImp) + "M / " + fmtUsd(sumFv) + "M", ""],
      [T("期末递延税负债（21%，示意）", "Ending deferred tax liability (21%, illustrative)"), fmtUsd(last.dtl) + "M", ""],
    ].map(([k, v, c]) => `<div class="stat"><div class="k">${k}</div><div class="v ${c}">${v}</div></div>`).join("");

    const pts = [{ x: 0, mv: COST, imp: COST }].concat(rows.map((r) => ({ x: r.q, mv: r.mv, imp: r.imp })));
    const interp = (key) => (x) => { const i = Math.min(3, Math.floor(x)), t = x - i; return pts[i][key] * (1 - t) + pts[i + 1][key] * t; };
    const fns = [];
    if (st.view !== "imp") fns.push({ f: interp("mv"), cls: "line5" });
    if (st.view !== "fv") fns.push({ f: interp("imp"), cls: "line2" });
    const legend = [];
    if (st.view !== "imp") legend.push(["var(--btc)", T("公允价值账面 = 市值（百万美元）", "Fair-value carrying value = market value ($M)")]);
    if (st.view !== "fv") legend.push(["var(--blue)", T("减值模型账面（百万美元）", "Impairment carrying value ($M)")]);
    q("#da-chart").innerHTML = chartBlock(lineChart({ fns, lo: 0, hi: 4, xlabel: T("季度（0 = 买入时）", "Quarter (0 = purchase)"), forceZero: true, uid: "dac" }), legend);

    const showImp = st.view !== "fv", showFv = st.view !== "imp";
    const head = `<tr style="text-align:left;border-bottom:1px solid var(--line)"><th>${T("季度", "Qtr")}</th><th>${T("比特币", "BTC")}</th>${showImp ? `<th>${T("减值：账面 / 损益", "Impairment: carrying / P&L")}</th><th>${T("减值 EPS", "Impairment EPS")}</th>` : ""}${showFv ? `<th>${T("公允：账面 / 损益", "Fair value: carrying / P&L")}</th><th>${T("公允 EPS", "Fair-value EPS")}</th>` : ""}<th>${T("AFSI 含 / 不含未实现", "AFSI with / without unrealized")}</th></tr>`;
    const sign = (x) => (x >= 0 ? "+" : "") + fmtNum(x, 0);
    q("#da-table").innerHTML = `<table style="width:100%;border-collapse:collapse;font-size:.86em">${head}${rows.map((r) => `<tr style="border-bottom:1px solid var(--line)"><td>Q${r.q}</td><td>${fmtUsd(r.p)}</td>${showImp ? `<td>${fmtNum(r.imp, 0)} / <span style="color:${r.impPL < 0 ? "var(--red)" : "var(--muted)"}">${sign(r.impPL)}</span></td><td>${fmtUsd(r.epsImp, 2)}</td>` : ""}${showFv ? `<td>${fmtNum(r.mv, 0)} / <span style="color:${r.fvPL < 0 ? "var(--red)" : "var(--green)"}">${sign(r.fvPL)}</span></td><td>${fmtUsd(r.epsFv, 2)}</td>` : ""}<td>${sign(r.afsiWith)} / ${sign(r.afsiWithout)}</td></tr>`).join("")}</table>`;

    const lines = [];
    const noRev = rows.filter((r, i) => i > 0 && r.fvPL > 0 && r.impPL === 0).length;
    if (noRev) lines.push(`<span class="warn">${T("有 ", "In ")}${noRev}${T(" 个季度比特币上涨，公允价值模型确认了收益，减值模型却记 0——“只减不增”。", " quarter(s) bitcoin rose and fair value booked a gain while the impairment model booked 0 — “down but never up.”")}</span>`);
    lines.push(`${T("每季经营利润只有 ", "Quarterly operating income is only ")}${fmtUsd(OPINC)}M${T("，优先股股息 ", ", preferred dividends ")}${fmtUsd(PREFDIV_Q, 2)}M${T("；公允价值下每股收益在 ", "; under fair value EPS ranges from ")}${fmtUsd(Math.min(...rows.map((r) => r.epsFv)), 2)}${T(" 到 ", " to ")}${fmtUsd(Math.max(...rows.map((r) => r.epsFv)), 2)}${T(" 之间摆动——它报告的基本上只是比特币的涨跌。", " — it mostly reports what bitcoin did.")}`);
    const afsiW = rows.reduce((s, r) => s + r.afsiWith, 0), afsiWo = rows.reduce((s, r) => s + r.afsiWithout, 0);
    lines.push(`${T("全年 AFSI：含未实现 ", "Full-year AFSI: with unrealized ")}${fmtUsd(afsiW)}M${T(" vs 按 2025 年 9 月 30 日临时指引剔除后 ", " vs excluding it per the September 30, 2025 interim guidance ")}${fmtUsd(afsiWo)}M${T("。CAMT 只适用于三年平均 AFSI 超过 10 亿美元的公司——橙子公司太小，这里只演示税基的差别。", ". CAMT applies only above $1B of three-year average AFSI — Orange Corp is too small; this only shows the difference in the base.")}`);
    lines.push(`<span class="demo-meta">${T("示意模型：减值按季度内最低价判断；递延税按 21% 乘以（市值 − 成本）粗算；不构成投资或税务建议。", "Illustrative model: impairment tested at the intra-quarter low; deferred tax roughly 21% × (market value − cost); not investment or tax advice.")}</span>`);
    q("#da-log").innerHTML = lines.map((l) => `<div>${l}</div>`).join("");
  };

  root.querySelectorAll("[data-q]").forEach((el) => el.addEventListener("input", () => { st.px[+el.dataset.q] = +el.value; paint(); }));
  q("#da-low").addEventListener("input", (e) => { st.low = +e.target.value; paint(); });
  root.querySelectorAll("#da-seg button").forEach((b) => b.addEventListener("click", () => {
    st.view = b.dataset.v;
    root.querySelectorAll("#da-seg button").forEach((o) => o.classList.toggle("on", o === b));
    paint();
  }));
  paint();
}
