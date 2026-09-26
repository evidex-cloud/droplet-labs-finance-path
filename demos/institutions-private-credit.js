// 交互演示：机构资产负债表搭建器——“负债决定资产”。
// 选一类机构（它的负债久期、可被挤兑的比例、要跨过的收益线不同），调六类资产的配置，
// 实时算出：资产久期与久期缺口、利率冲击下的盈余变化、组合收益 vs 收益线、流动性覆盖、风险事件下的资金充足率。
import { bondRisk, bondPrice, priceChangeApprox, fmtPct, fmtNum, clamp, tex } from "./_fin.js";

export default function mount(root, lang) {
  const en = lang === "en";
  const T = (zh, e) => (en ? e : zh);
  const L = 100, A0 = 105; // 负债现值 100，资产 105（资金充足率 105%）

  // 资产类别：收益率取自 2026 年 9 月的国债曲线，其余为示意；久期由 _fin.js 的 bondRisk 计算
  const r30 = bondRisk(100, 0.0549, 0.0549, 30), rig = bondRisk(100, 0.062, 0.062, 10), rpf = bondRisk(100, 0.10, 0.10, 100), rb = bondRisk(100, 0.0424, 0.0424, 0.25, 4);
  const ASSETS = [
    { k: "bill", name: T("国库券 / 回购", "T-bills / repo"), yld: 0.0424, mod: rb.modified, cvx: rb.convexity, liq: 1, stress: 0 },
    { k: "t30", name: T("30 年期国债", "30-year Treasuries"), yld: 0.0549, mod: r30.modified, cvx: r30.convexity, liq: 0.9, stress: 0 },
    { k: "ig", name: T("投资级公司债", "IG corporate bonds"), yld: 0.062, mod: rig.modified, cvx: rig.convexity, liq: 0.6, stress: bondPrice(100, 0.062, 0.077, 10) / 100 - 1 },
    { k: "pc", name: T("非公开贷款（私募信贷）", "Private loans (private credit)"), yld: 0.099, mod: 0.25, cvx: 0, liq: 0.05, stress: -0.08 },
    { k: "pref", name: T("永续优先股（10%）", "Perpetual preferreds (10%)"), yld: 0.10, mod: rpf.modified, cvx: rpf.convexity, liq: 0.5, stress: -0.15 },
    { k: "risk", name: T("股票与比特币等风险资产", "Stocks, bitcoin & other risk assets"), yld: 0.08, mod: 0, cvx: 0, liq: 0.9, stress: -0.35 },
  ];
  const INST = {
    mmf: { name: T("货币基金", "Money fund"), ld: 0.1, run: 0.5, hurdle: 0.042, mix: { bill: 100, t30: 0, ig: 0, pc: 0, pref: 0, risk: 0 } },
    bank: { name: T("银行", "Bank"), ld: 1.5, run: 0.2, hurdle: 0.03, mix: { bill: 25, t30: 15, ig: 10, pc: 45, pref: 0, risk: 5 } },
    life: { name: T("寿险公司", "Life insurer"), ld: 12, run: 0.05, hurdle: 0.05, mix: { bill: 5, t30: 20, ig: 45, pc: 20, pref: 5, risk: 5 } },
    pension: { name: T("确定给付型养老金", "DB pension"), ld: 11, run: 0.02, hurdle: 0.07, mix: { bill: 5, t30: 25, ig: 15, pc: 10, pref: 0, risk: 45 } },
    sov: { name: T("主权基金 / 捐赠基金", "Sovereign fund / endowment"), ld: 25, run: 0.01, hurdle: 0.07, mix: { bill: 5, t30: 5, ig: 5, pc: 15, pref: 0, risk: 70 } },
    retail: { name: T("收益型散户", "Retail income investor"), ld: 3, run: 0.3, hurdle: 0.06, mix: { bill: 20, t30: 0, ig: 20, pc: 0, pref: 40, risk: 20 } },
  };
  const st = { inst: "pension", w: { ...INST.pension.mix }, dy: -100 };

  root.innerHTML = `
    <div class="demo">
      <div class="demo-head">${T("🏛️ 负债决定资产：给一家机构搭资产负债表", "🏛️ Liabilities determine assets: build an institution's balance sheet")}</div>
      <div class="demo-btns" id="ip-inst">
        ${Object.entries(INST).map(([k, v]) => `<button class="demo-btn${k === st.inst ? " active" : ""}" data-k="${k}">${v.name}</button>`).join("")}
      </div>
      <div class="demo-meta" id="ip-liab"></div>
      <div class="demo-grid">
        <div class="demo-block" id="ip-sliders"></div>
        <div class="demo-block">
          <label class="demo-label">${T("利率冲击（整条曲线平移，基点）：", "Rate shock (parallel shift, bp): ")}<b id="ip-dy-v"></b></label>
          <input class="demo-slider" id="ip-dy" type="range" min="-200" max="200" step="25" value="${st.dy}">
          <div class="demo-btns"><button class="demo-btn" id="ip-typ">${T("恢复这类机构的典型配置", "Reset to this institution's typical mix")}</button></div>
          <div class="stages" id="ip-mixbars"></div>
        </div>
      </div>
      <div class="stat-row">
        <div class="stat"><div class="k">${T("资产久期 vs 负债久期", "Asset vs liability duration")}</div><div class="v" id="ip-dur">–</div></div>
        <div class="stat"><div class="k">${T("利率冲击后的资金充足率", "Funded ratio after rate shock")}</div><div class="v" id="ip-fr">–</div></div>
        <div class="stat"><div class="k">${T("组合收益 vs 收益线", "Portfolio yield vs hurdle")}</div><div class="v" id="ip-yld">–</div></div>
        <div class="stat"><div class="k">${T("流动性覆盖", "Liquidity coverage")}</div><div class="v" id="ip-liq">–</div></div>
        <div class="stat"><div class="k">${T("风险事件后的资金充足率", "Funded ratio after risk-off event")}</div><div class="v" id="ip-st">–</div></div>
      </div>
      <div class="demo-log" id="ip-log"></div>
      <p class="demo-tip">${T(
        "先选“货币基金”，再把一半配置拖到 30 年期国债或私募信贷，看流动性覆盖和利率冲击怎样同时亮红灯——这就是期限错配。然后选“确定给付型养老金”，把利率冲击设为 −100 基点：资产久期短于负债久期时，利率下降反而让它“变穷”。最后给“收益型散户”加满永续优先股，看它的收益和它的利率风险一起上升——这就是阶段 18.1 要给比特币支撑的优先股估值时的核心问题。",
        "Pick the money fund, then drag half its mix into 30-year Treasuries or private credit: liquidity coverage and the rate shock turn red together — that's a maturity mismatch. Then pick the DB pension and set the shock to −100 bp: with assets shorter than liabilities, falling rates make it poorer. Finally, load the retail income investor up on perpetual preferreds and watch its yield and its rate risk rise together — the core issue Stage 18.1 faces when valuing bitcoin-backed preferreds."
      )}</p>
    </div>`;

  const $ = (id) => root.querySelector("#" + id);

  function sliders() {
    $("ip-sliders").innerHTML = ASSETS.map((a) => `
      <label class="demo-label">${a.name}${T("（收益约 ", " (yield ~")}${fmtPct(a.yld, 1)}${T("，久期 ", ", duration ")}${fmtNum(a.mod, 1)}${T("）：", "): ")}<b id="ip-w-${a.k}-v"></b></label>
      <input class="demo-slider" type="range" min="0" max="100" step="5" value="${st.w[a.k]}" data-a="${a.k}">`).join("");
    root.querySelectorAll("#ip-sliders [data-a]").forEach((s) => s.addEventListener("input", () => { st.w[s.dataset.a] = +s.value; paint(); }));
  }

  function paint() {
    const inst = INST[st.inst];
    $("ip-liab").innerHTML = `${T("负债：现值 100，修正久期 ", "Liabilities: present value 100, modified duration ")}<b>${fmtNum(inst.ld, 1)}</b>${T("；压力下一个月内可能被取走 ", "; share that could be withdrawn within a month under stress: ")}<b>${fmtPct(inst.run, 0)}</b>${T("；要跨过的收益线 ", "; hurdle rate to clear: ")}<b>${fmtPct(inst.hurdle, 1)}</b>${T("。资产 105（资金充足率 105%）。", ". Assets 105 (funded ratio 105%).")}`;
    $("ip-dy-v").textContent = (st.dy > 0 ? "+" : "") + st.dy;
    const tot = ASSETS.reduce((s, a) => s + st.w[a.k], 0) || 1;
    const wt = {};
    ASSETS.forEach((a) => { wt[a.k] = st.w[a.k] / tot; const el = $(`ip-w-${a.k}-v`); if (el) el.textContent = fmtPct(wt[a.k], 0); });
    $("ip-mixbars").innerHTML = ASSETS.map((a) => `<div class="stage-bar"><span class="lab">${a.name}</span><div class="track"><div class="fill" style="width:${wt[a.k] * 100}%"></div></div><span class="val">${fmtNum(wt[a.k] * A0, 1)}</span></div>`).join("");

    const dy = st.dy / 10000;
    const durA = ASSETS.reduce((s, a) => s + wt[a.k] * a.mod, 0);
    const A1 = ASSETS.reduce((s, a) => s + wt[a.k] * A0 * (1 + priceChangeApprox(a.mod, a.cvx, dy)), 0);
    const L1 = L * (1 + priceChangeApprox(inst.ld, inst.ld * inst.ld, dy));
    const fr0 = A0 / L, fr1 = A1 / L1;
    const yld = ASSETS.reduce((s, a) => s + wt[a.k] * a.yld, 0);
    const liqCov = ASSETS.reduce((s, a) => s + wt[a.k] * A0 * a.liq, 0) / (inst.run * L);
    const AS = ASSETS.reduce((s, a) => s + wt[a.k] * A0 * (1 + a.stress), 0);
    const frS = AS / L;

    const set = (id, txt, cls) => { const e = $(id); e.textContent = txt; e.className = "v " + (cls || ""); };
    set("ip-dur", fmtNum(durA, 1) + " / " + fmtNum(inst.ld, 1), Math.abs(durA * A0 - inst.ld * L) / L > 3 ? "acc" : "pos");
    set("ip-fr", fmtPct(fr1, 1), fr1 < 1 ? "neg" : fr1 < fr0 ? "acc" : "pos");
    set("ip-yld", fmtPct(yld, 2) + " / " + fmtPct(inst.hurdle, 1), yld < inst.hurdle ? "neg" : "pos");
    set("ip-liq", fmtNum(clamp(liqCov, 0, 999), 1) + "×", liqCov < 1 ? "neg" : liqCov < 1.5 ? "acc" : "pos");
    set("ip-st", fmtPct(frS, 1), frS < 0.9 ? "neg" : frS < 1 ? "acc" : "pos");

    const lines = [];
    const gap = durA * A0 - inst.ld * L;
    lines.push(`${T("美元久期缺口（", "Dollar-duration gap (")}${tex(String.raw`\text{${T("资产久期", "asset duration")}} \times \text{${T("资产", "assets")}} - \text{${T("负债久期", "liability duration")}} \times \text{${T("负债", "liabilities")}}`)}${T("）：", "): ")}<b>${fmtNum(gap, 0)}</b>${T("。", ". ")}${Math.abs(gap) < 150 ? T("资产与负债对利率的敏感度大致匹配。", "Assets and liabilities are roughly matched in rate sensitivity.") : gap < 0 ? T("资产比负债“短”：利率下降时负债涨得更多，盈余缩水。", "Assets are shorter than liabilities: when rates fall, liabilities rise more and the surplus shrinks.") : T("资产比负债“长”：利率上升时资产跌得更多，盈余缩水。", "Assets are longer than liabilities: when rates rise, assets fall more and the surplus shrinks.")}`);
    lines.push(`${T("利率 ", "A ")}${st.dy > 0 ? "+" : ""}${st.dy}${T(" 基点：资产 105 → ", " bp shift: assets 105 → ")}${fmtNum(A1, 1)}${T("，负债 100 → ", ", liabilities 100 → ")}${fmtNum(L1, 1)}${T("，资金充足率 ", ", funded ratio ")}${fmtPct(fr0, 0)} → <span class="${fr1 < 1 ? "bad" : fr1 < fr0 ? "warn" : "ok"}">${fmtPct(fr1, 1)}</span>${T("。", ".")}`);
    if (liqCov < 1) lines.push(`<span class="bad">${T("流动性错配：压力下可能被取走 ", "Liquidity mismatch: under stress ")}${fmtNum(inst.run * L, 0)}${T("，但能快速变现的资产只有约 ", " could be withdrawn, but only about ")}${fmtNum(liqCov * inst.run * L, 0)}${T("——这就是挤兑的种子（阶段 1.2、阶段 10.3）。", " of assets can be sold quickly — the seed of a run (Stage 1.2, Stage 10.3).")}</span>`);
    if (yld < inst.hurdle) lines.push(`<span class="warn">${T("组合收益低于收益线 ", "Portfolio yield falls short of the ")}${fmtPct(inst.hurdle, 1)}${T("：这正是机构“追逐收益”、加仓私募信贷与另类资产的压力来源。", " hurdle: this is exactly the pressure that pushes institutions to reach for yield in private credit and alternatives.")}</span>`);
    lines.push(`${T("风险事件（股票与比特币 −35%、优先股 −15%、私募贷款 −8%、公司债利差 +150 基点）：资金充足率 ", "Risk-off event (stocks & bitcoin −35%, preferreds −15%, private loans −8%, IG spreads +150 bp): funded ratio ")}<span class="${frS < 0.9 ? "bad" : frS < 1 ? "warn" : "ok"}">${fmtPct(frS, 1)}</span>${T("。注意私募贷款按模型估值，账面跌幅往往比真实跌幅小、来得晚。", ". Note that private loans are marked by models, so their reported losses tend to be smaller and later than the real ones.")}`);
    if (wt.pref > 0.25) lines.push(`${T("你配了 ", "You hold ")}${fmtPct(wt.pref, 0)}${T(" 的永续优先股：收益高，但它的修正久期约 ", " in perpetual preferreds: high yield, but a modified duration of about ")}${fmtNum(rpf.modified, 0)}${T("，接近 30 年期国债——收益型买家往往低估了这一点（阶段 18.1）。本演示只讲框架，不构成投资建议。", ", close to a 30-year Treasury — something income buyers often underestimate (Stage 18.1). This demo is a framework, not investment advice.")}`);
    $("ip-log").innerHTML = lines.map((l) => `<div>${l}</div>`).join("");
  }

  root.querySelectorAll("#ip-inst button").forEach((b) => b.addEventListener("click", () => {
    st.inst = b.dataset.k; st.w = { ...INST[st.inst].mix };
    root.querySelectorAll("#ip-inst button").forEach((x) => x.classList.toggle("active", x === b));
    sliders(); paint();
  }));
  $("ip-typ").addEventListener("click", () => { st.w = { ...INST[st.inst].mix }; sliders(); paint(); });
  $("ip-dy").addEventListener("input", (e) => { st.dy = +e.target.value; paint(); });
  sliders();
  paint();
}
