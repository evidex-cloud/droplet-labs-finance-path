// 交互演示：宏观体制选择器——选增长、通胀、流动性三根轴，看：
// ① 各类资产的历史倾向（框架，不是预测）；② 60/40 组合波动如何随股债相关性变化（port2Vol）；
// ③ 费雪公式的实际利率（realRate）；④ 一个示意情景下橙子公司普通股与 Orange-F 的结果（amplification / btcRating / perpetuity）。
import { port2Vol, realRate, amplification, btcRating, perpetuity, fmtPct, fmtNum, fmtUsd, clamp } from "./_fin.js";

export default function mount(root, lang) {
  const en = lang === "en";
  const T = (zh, e) => (en ? e : zh);

  // 象限键：g(+/-) i(+/-)
  const Q = {
    "++": { name: T("过热 / 再通胀", "Overheating / reflation"), rho: 0.4, dy: 100, btc: 5 },
    "+-": { name: T("金发姑娘", "Goldilocks"), rho: -0.3, dy: -25, btc: 40 },
    "-+": { name: T("滞胀", "Stagflation"), rho: 0.5, dy: 150, btc: -50 },
    "--": { name: T("通缩式衰退", "Deflationary bust"), rho: -0.4, dy: -150, btc: -35 },
  };
  // 资产倾向分（−2..+2），顺序：++, +-, -+, --；liq = 对流动性的敏感度（加减分）
  const ASSETS = [
    { k: T("长期国债", "Long Treasuries"), s: { "++": -2, "+-": 1, "-+": -2, "--": 2 }, liq: 0.5, why: T("久期大，只怕通胀与加息", "High duration; fears only inflation and hikes") },
    { k: T("股票", "Stocks"), s: { "++": 1, "+-": 2, "-+": -2, "--": -1 }, liq: 1, why: T("盈利与折现率双重敏感", "Sensitive to profits and discount rates") },
    { k: T("黄金", "Gold"), s: { "++": 0, "+-": 0, "-+": 1, "--": 1 }, liq: 0.5, why: T("看实际利率与制度信任", "Driven by real rates and trust in institutions") },
    { k: T("现金 / 短期国库券", "Cash / T-bills"), s: { "++": 1, "+-": 0, "-+": 1, "--": 0 }, liq: 0, why: T("久期≈0，跟着政策利率", "Duration ≈ 0; tracks the policy rate") },
    { k: T("比特币", "Bitcoin"), s: { "++": 0, "+-": 2, "-+": -2, "--": -1 }, liq: 2, why: T("流动性与实际利率最敏感", "Most sensitive to liquidity and real rates") },
    { k: T("DAT 普通股", "DAT common"), s: { "++": 0, "+-": 2, "-+": -2, "--": -2 }, liq: 2, why: T("比特币 × 放大 × mNAV 情绪", "Bitcoin × amplification × mNAV mood") },
    { k: T("DAT 固定利率优先股", "DAT fixed-rate preferred"), s: { "++": -1, "+-": 1, "-+": -2, "--": 0 }, liq: 1, why: T("长端利率 + BTC 评级两把刀", "Two knives: long rates + BTC Rating") },
    { k: T("DAT 浮动利率优先股", "DAT variable-rate preferred"), s: { "++": 0, "+-": 1, "-+": -1, "--": 0 }, liq: 1, why: T("挡利率、挡不住信用", "Parries rates, not credit") },
    { k: T("链上美元收益（代币化国库券）", "On-chain dollar yield (tokenized T-bills)"), s: { "++": 1, "+-": 0, "-+": 1, "--": -1 }, liq: -0.5, why: T("跟着短端利率走", "Follows short-term rates") },
  ];

  const PRESETS = {
    s70: { g: "-", i: "+", liq: "tight", label: T("1970 年代", "1970s"), nom: 8, inf: 9 },
    s08: { g: "-", i: "-", liq: "ease", label: T("2008 年", "2008"), nom: 3.7, inf: 0.1 },
    s10: { g: "+", i: "-", liq: "ease", label: T("2010 年代", "2010s"), nom: 2.3, inf: 1.8 },
    s21: { g: "+", i: "+", liq: "ease", label: T("2021 年", "2021"), nom: 1.5, inf: 5 },
    s22: { g: "-", i: "+", liq: "tight", label: T("2022 年", "2022"), nom: 3.9, inf: 7 },
    s26: { g: "+", i: "+", liq: "tight", label: T("2026 年 9 月（本课判断）", "Sep 2026 (this course's view)"), nom: 5.17, inf: 3.4 },
  };
  const st = { g: "+", i: "+", liq: "tight", rho: 0.4, nom: 5.17, inf: 3.4, preset: "s26" };

  const seg = (id, items) => `<div class="demo-seg" id="mr-${id}">${items.map(([v, t]) => `<button data-v="${v}">${t}</button>`).join("")}</div>`;

  root.innerHTML = `
    <div class="demo">
      <div class="demo-head">${T("🧭 宏观体制选择器：先定位，再看每种资产的“天气”", "🧭 Regime picker: locate the regime first, then check each asset's weather")}</div>
      <div class="demo-block">
        <label class="demo-label">${T("历史样本与现在", "Historical episodes and now")}</label>
        <div class="demo-btns" id="mr-presets">${Object.entries(PRESETS).map(([k, p]) => `<button class="demo-btn" data-p="${k}">${p.label}</button>`).join("")}</div>
      </div>
      <div class="demo-grid-3">
        <div class="demo-block"><label class="demo-label">${T("增长（相对预期）", "Growth (vs expectations)")}</label>${seg("g", [["+", T("加速", "Accelerating")], ["-", T("减速", "Slowing")]])}</div>
        <div class="demo-block"><label class="demo-label">${T("通胀（相对预期）", "Inflation (vs expectations)")}</label>${seg("i", [["+", T("上行", "Rising")], ["-", T("下行", "Falling")]])}</div>
        <div class="demo-block"><label class="demo-label">${T("流动性", "Liquidity")}</label>${seg("liq", [["ease", T("放水", "Easing")], ["tight", T("抽水", "Tightening")]])}</div>
      </div>
      <div class="stat-row" id="mr-top"></div>
      <div class="demo-block">
        <label class="demo-label">${T("各资产的历史倾向（−2 很差 … +2 很好；框架，不是预测）", "Historical tendency by asset (−2 very poor … +2 very good; a framework, not a forecast)")}</label>
        <div class="stages" id="mr-bars"></div>
      </div>
      <div class="demo-grid">
        <div class="demo-block">
          <label class="demo-label">${T("股债相关性 ρ", "Stock–bond correlation ρ")}${T("：", ": ")}<b id="mr-rho-v"></b></label>
          <input class="demo-slider" id="mr-rho" type="range" min="-0.8" max="0.8" step="0.05" />
          <div class="stat-row" id="mr-6040"></div>
        </div>
        <div class="demo-block">
          <label class="demo-label">${T("10 年期名义收益率", "10-year nominal yield")}${T("：", ": ")}<b id="mr-nom-v"></b></label>
          <input class="demo-slider" id="mr-nom" type="range" min="0" max="16" step="0.05" />
          <label class="demo-label">${T("通胀", "Inflation")}${T("：", ": ")}<b id="mr-inf-v"></b></label>
          <input class="demo-slider" id="mr-inf" type="range" min="-2" max="14" step="0.1" />
          <div class="stat-row" id="mr-real"></div>
        </div>
      </div>
      <div class="demo-block">
        <label class="demo-label">${T("示意情景：这一格里橙子公司会怎样（假设的利率与币价变化）", "Illustrative scenario: what happens to Orange Corp in this box (assumed rate and BTC moves)")}</label>
        <div class="stat-row" id="mr-orange"></div>
      </div>
      <div class="demo-block"><div class="demo-log" id="mr-log"></div></div>
      <p class="demo-tip">${T(
        "先点“2022 年”：股债相关性自动变正，60/40 的波动明显抬高，DAT 普通股与固定利率优先股同时垫底。再点“2008 年”：长期国债登顶，比特币先挨打。最后点“2026 年 9 月”，把流动性切到“放水”，看比特币与 DAT 普通股的分数怎么跳——同一个象限，流动性这根轴能改变“音量”。",
        "Click \"2022\" first: the stock–bond correlation turns positive, 60/40 volatility jumps, and DAT common and fixed-rate preferreds sink to the bottom together. Then click \"2008\": long Treasuries go to the top and bitcoin takes the first hit. Finally click \"Sep 2026\" and switch liquidity to easing. Watch bitcoin's and DAT common's scores jump: in the same quadrant, the liquidity axis changes the volume."
      )}</p>
    </div>`;

  const $ = (s) => root.querySelector(s);

  function paint() {
    const key = st.g + st.i, q = Q[key];
    ["g", "i", "liq"].forEach((id) => root.querySelectorAll(`#mr-${id} button`).forEach((b) => b.classList.toggle("on", b.dataset.v === st[id])));
    root.querySelectorAll("#mr-presets .demo-btn").forEach((b) => b.classList.toggle("active", b.dataset.p === st.preset));
    $("#mr-rho").value = st.rho; $("#mr-rho-v").textContent = fmtNum(st.rho, 2);
    $("#mr-nom").value = st.nom; $("#mr-nom-v").textContent = fmtNum(st.nom, 2) + "%";
    $("#mr-inf").value = st.inf; $("#mr-inf-v").textContent = fmtNum(st.inf, 1) + "%";

    const liqSign = st.liq === "ease" ? 1 : -1;
    $("#mr-top").innerHTML = `
      <div class="stat"><div class="k">${T("象限", "Quadrant")}</div><div class="v acc">${q.name}</div></div>
      <div class="stat"><div class="k">${T("流动性", "Liquidity")}</div><div class="v ${liqSign > 0 ? "pos" : "neg"}">${liqSign > 0 ? T("放水", "Easing") : T("抽水", "Tightening")}</div></div>`;

    const scored = ASSETS.map((a) => ({ ...a, v: clamp(a.s[key] + 0.5 * a.liq * liqSign, -2.5, 2.5) }));
    $("#mr-bars").innerHTML = scored.map((a) => {
      const w = ((a.v + 2.5) / 5) * 100, col = a.v > 0.25 ? "var(--green)" : a.v < -0.25 ? "var(--red)" : "var(--muted)";
      return `<div class="stage-bar" title="${a.why}">
        <span class="lab">${a.k}</span>
        <div class="track"><div class="fill" style="width:${w}%;background:${col}"></div></div>
        <span class="val" style="min-width:44px">${(a.v > 0 ? "+" : "") + fmtNum(a.v, 1)}</span>
      </div>`;
    }).join("");

    // 60/40
    const v6040 = port2Vol(0.6, 0.16, 0.07, st.rho), vNeg = port2Vol(0.6, 0.16, 0.07, -0.3);
    $("#mr-6040").innerHTML = `
      <div class="stat"><div class="k">${T("60/40 年化波动", "60/40 annual volatility")}</div><div class="v ${v6040 > vNeg + 0.005 ? "neg" : ""}">${fmtPct(v6040, 1)}</div></div>
      <div class="stat"><div class="k">${T("对比 ρ = −0.3", "vs ρ = −0.3")}</div><div class="v">${(v6040 / vNeg - 1 > 0 ? "+" : "") + fmtPct(v6040 / vNeg - 1, 0)}</div></div>`;

    // 实际利率
    const rr = realRate(st.nom / 100, st.inf / 100);
    $("#mr-real").innerHTML = `
      <div class="stat"><div class="k">${T("实际收益率（费雪）", "Real yield (Fisher)")}</div><div class="v ${rr < 0 ? "pos" : "neg"}">${fmtPct(rr, 2)}</div></div>`;

    // 橙子公司示意情景
    const dy = q.dy / 10000 + (st.liq === "ease" ? -0.0025 : 0.0025);
    const btcMove = (q.btc + (st.liq === "ease" ? 10 : -10)) / 100;
    const nav0 = 1000, nav = nav0 * (1 + btcMove); // 百万美元
    const eq0 = nav0 - 300, eq = nav - 300; // 简单口径：BTC − 优先索取权（不计现金）
    const ampl = amplification(nav0, 300);
    const rating = btcRating(nav, 250);
    const creditAdd = rating >= 4 ? 0 : (4 - rating) * 0.01; // 示意：评级每低于 4 倍 1 档，利差 +1 个百分点
    const prefPx = perpetuity(10, 0.10 + dy + creditAdd);
    $("#mr-orange").innerHTML = `
      <div class="stat"><div class="k">${T("假设 30 年期变化", "Assumed 30-year move")}</div><div class="v">${(dy > 0 ? "+" : "") + Math.round(dy * 10000)}${T(" 基点", " bp")}</div></div>
      <div class="stat"><div class="k">${T("假设比特币变化", "Assumed BTC move")}</div><div class="v ${btcMove >= 0 ? "pos" : "neg"}">${(btcMove > 0 ? "+" : "") + fmtPct(btcMove, 0)}</div></div>
      <div class="stat"><div class="k">${T("普通股净值变化（放大 " + fmtNum(ampl, 2) + " 倍）", "Common equity change (" + fmtNum(ampl, 2) + "x amplified)")}</div><div class="v ${eq >= eq0 ? "pos" : "neg"}">${eq > 0 ? (eq / eq0 - 1 > 0 ? "+" : "") + fmtPct(eq / eq0 - 1, 0) : T("归零", "Wiped out")}</div></div>
      <div class="stat"><div class="k">${T("Orange-F BTC 评级", "Orange-F BTC Rating")}</div><div class="v">${fmtNum(rating, 2)}x</div></div>
      <div class="stat"><div class="k">${T("Orange-F 价格（面值 100）", "Orange-F price (par 100)")}</div><div class="v ${prefPx >= 100 ? "pos" : "neg"}">${fmtNum(prefPx, 1)}</div></div>`;

    const L = [];
    const hi = Math.max(...scored.map((a) => a.v)), lo = Math.min(...scored.map((a) => a.v));
    const tops = scored.filter((a) => a.v === hi), bots = scored.filter((a) => a.v === lo);
    const names = (arr) => arr.map((a) => T(`「${a.k}」`, `"${a.k}"`)).join(T("、", ", "));
    L.push(`<span class="ok">${T(`这一格里历史上最舒服的是${names(tops)}：${tops[0].why}。`, `Historically the most comfortable here: ${names(tops)}. ${tops[0].why}.`)}</span>`);
    L.push(`<span class="bad">${T(`最难受的是${names(bots)}：${bots[0].why}。`, `The most uncomfortable: ${names(bots)}. ${bots[0].why}.`)}</span>`);
    if (rr < 0) L.push(`<span class="warn">${T("实际收益率为负：这是 1970 年代黄金大放光彩的条件，也是“金融抑制”悄悄减债的方式（阶段 9.4）。", "Negative real yield: the condition under which gold shone in the 1970s, and the way financial repression quietly shrinks debt (Stage 9.4).")}</span>`);
    else L.push(`<span class="warn">${T(`实际收益率 ${fmtPct(rr, 2)} 为正：持有黄金、比特币这类不生息资产的机会成本更高。`, `Real yield of ${fmtPct(rr, 2)} is positive: holding non-yielding assets such as gold and bitcoin costs more in forgone income.`)}</span>`);
    L.push(`<span>${T("历史预设里的名义利率与通胀是该时期的粗略示意值（2026 年 9 月的 5.17% 与 3.4% 来自事实表）；情景里的利率与币价变化是示意假设，只为演示传导方向；分数是历史倾向的粗略概括，不构成投资建议。", "Nominal yields and inflation in the historical presets are rough illustrative values (September 2026's 5.17% and 3.4% come from the fact sheet); the rate and BTC moves in the scenario are illustrative assumptions meant only to show direction; the scores roughly summarize historical tendencies and are not investment advice.")}</span>`);
    $("#mr-log").innerHTML = L.join("");
  }

  ["g", "i", "liq"].forEach((id) => root.querySelectorAll(`#mr-${id} button`).forEach((b) => b.addEventListener("click", () => {
    st[id] = b.dataset.v; st.preset = null;
    if (id !== "liq") st.rho = Q[st.g + st.i].rho;
    paint();
  })));
  root.querySelectorAll("#mr-presets .demo-btn").forEach((b) => b.addEventListener("click", () => {
    const p = PRESETS[b.dataset.p];
    Object.assign(st, { g: p.g, i: p.i, liq: p.liq, nom: p.nom, inf: p.inf, rho: Q[p.g + p.i].rho, preset: b.dataset.p });
    paint();
  }));
  $("#mr-rho").addEventListener("input", (e) => { st.rho = Number(e.target.value); paint(); });
  $("#mr-nom").addEventListener("input", (e) => { st.nom = Number(e.target.value); st.preset = null; paint(); });
  $("#mr-inf").addEventListener("input", (e) => { st.inf = Number(e.target.value); st.preset = null; paint(); });
  paint();
}
