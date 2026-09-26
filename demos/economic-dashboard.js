// 交互演示：“意外”游戏。选一项数据（非农、核心 CPI、失业率、PMI、零售销售），设共识与实际值，
// 演示按“标准化意外 × 经验敏感度”估算 2 年期 / 10 年期收益率的变动（示意的经验法则），用 _fin.js bondPrice
// 换算标准例子（面值 1,000、票息 5%、10 年期）的价格变化；并按“环境”（通胀担忧 / 衰退担忧）给出股票与比特币的方向。
// 游戏模式：先猜 2 年期收益率和股票的方向，再揭晓。所有系数均为教学示意，不是交易模型。
import { bondPrice, fmtPct, fmtNum, fmtUsd, tex } from "./_fin.js";

export default function mount(root, lang) {
  const en = lang === "en";
  const T = (zh, e) => (en ? e : zh);
  const C = T("：", ": ");

  // kind: g = 增长类，i = 通胀类；sign: 数值越大越“热”为 +1（失业率为 −1）；sd: 通常的预测误差；bp2: 1 个标准差意外对 2 年期的影响（bp）
  const IND = {
    nfp: { name: T("非农就业新增（千人）", "Nonfarm payrolls (thousands)"), kind: "g", sign: 1, sd: 75, bp2: 6, lo: -100, hi: 400, step: 5, unit: "k", dec: 0 },
    cpi: { name: T("核心 CPI 环比（%）", "Core CPI, month over month (%)"), kind: "i", sign: 1, sd: 0.1, bp2: 8, lo: -0.2, hi: 0.8, step: 0.05, unit: "%", dec: 2 },
    ur: { name: T("失业率（%）", "Unemployment rate (%)"), kind: "g", sign: -1, sd: 0.1, bp2: 5, lo: 3, hi: 6, step: 0.05, unit: "%", dec: 2 },
    pmi: { name: T("ISM 制造业 PMI", "ISM manufacturing PMI"), kind: "g", sign: 1, sd: 1.5, bp2: 3, lo: 40, hi: 60, step: 0.5, unit: "", dec: 1 },
    rs: { name: T("零售销售环比（%）", "Retail sales, month over month (%)"), kind: "g", sign: 1, sd: 0.5, bp2: 3, lo: -2, hi: 2, step: 0.1, unit: "%", dec: 1 },
  };
  const SCN = [
    { k: "nfp", cons: 150, act: 260 },
    { k: "cpi", cons: 0.3, act: 0.5 },
    { k: "ur", cons: 4.1, act: 4.4 },
    { k: "pmi", cons: 49.5, act: 52 },
    { k: "rs", cons: 0.4, act: -0.6 },
    { k: "nfp", cons: 120, act: 125 },
    { k: "cpi", cons: 0.3, act: 0.1 },
  ];
  let sel = "nfp", regime = "infl", guessY = null, guessS = null, revealed = false, sc = 0, score = 0, played = 0;

  root.innerHTML = `
    <div class="demo">
      <div class="demo-head">${T("📊 意外游戏：市场只为“没想到”的部分付钱", "📊 The surprise game: markets only pay for what they didn't expect")}</div>
      <div class="demo-block">
        <label class="demo-label">${T("市场环境（决定“好消息”对股票是好是坏）", "Market regime (decides whether good news is good for stocks)")}</label>
        <div class="demo-seg" id="ed-regime">
          <button data-r="infl" class="on">${T("通胀是主要担忧（如 2026 年秋）", "Inflation is the main worry (e.g. fall 2026)")}</button>
          <button data-r="growth">${T("衰退是主要担忧", "Recession is the main worry")}</button>
        </div>
      </div>
      <div class="demo-btns" id="ed-inds">
        ${Object.entries(IND).map(([k, v]) => `<button class="demo-btn ${k === sel ? "active" : ""}" data-k="${k}">${v.name}</button>`).join("")}
      </div>
      <div class="demo-grid">
        <div><label class="demo-label">${T("共识预期", "Consensus")}${C}<b id="ed-cons-v"></b></label><input class="demo-slider" type="range" id="ed-cons"></div>
        <div><label class="demo-label">${T("实际公布", "Actual")}${C}<b id="ed-act-v"></b></label><input class="demo-slider" type="range" id="ed-act"></div>
      </div>
      <div class="stat-row" id="ed-stats"></div>
      <div class="cmp-3" id="ed-moves"></div>
      <div class="demo-log" id="ed-log"></div>

      <div class="demo-label" style="margin-top:18px">${T("游戏模式：先猜，再揭晓", "Game mode: guess first, then reveal")}</div>
      <div class="scn" id="ed-game"></div>
      <p class="demo-tip">${T(
        "把“实际”拖到和“共识”一样——无论数字本身多好看，价格几乎不动。再切换市场环境：<strong>同一个强劲的非农意外，在“通胀担忧”里让股票下跌，在“衰退担忧”里让股票上涨</strong>，而 2 年期收益率的方向不变。系数是示意的经验法则，不是交易模型。",
        "Drag \"Actual\" onto \"Consensus\" — however good the number looks, prices barely move. Then switch the regime: <strong>the same strong payroll surprise pushes stocks down when inflation is the worry and up when recession is the worry</strong>, while the 2-year yield moves the same way both times. The coefficients are illustrative rules of thumb, not a trading model."
      )}</p>
    </div>`;

  const $ = (s) => root.querySelector(s);
  const fmtV = (ind, x) => fmtNum(x, ind.dec) + (ind.unit === "k" ? "k" : ind.unit);

  // 核心计算：标准化意外 → 2 年期、10 年期、股票、比特币（示意系数）
  const reaction = (k, cons, act, reg) => {
    const ind = IND[k];
    const z = ((act - cons) / ind.sd) * ind.sign; // >0 = 比预期“热”
    const zc = Math.max(-4, Math.min(4, z));
    const d2 = zc * ind.bp2;                 // bp
    const d10 = d2 * 0.6;                    // 长端反应较小
    let eq;
    if (ind.kind === "i") eq = -0.6 * zc;    // 通胀意外对股票总是不利
    else eq = reg === "infl" ? -0.3 * zc : 0.5 * zc;
    const btc = ind.kind === "i" ? -1.2 * zc : reg === "infl" ? -0.6 * zc : 0.9 * zc;
    return { z, d2, d10, eq, btc };
  };

  const setSliders = (k, cons, act) => {
    const ind = IND[k];
    ["#ed-cons", "#ed-act"].forEach((id, j) => {
      const el = $(id);
      el.min = ind.lo; el.max = ind.hi; el.step = ind.step; el.value = j === 0 ? cons : act;
    });
  };

  const paint = () => {
    const ind = IND[sel];
    const cons = +$("#ed-cons").value, act = +$("#ed-act").value;
    $("#ed-cons-v").textContent = fmtV(ind, cons);
    $("#ed-act-v").textContent = fmtV(ind, act);
    const r = reaction(sel, cons, act, regime);
    const p0 = bondPrice(1000, 0.05, 0.05, 10), p1 = bondPrice(1000, 0.05, 0.05 + r.d10 / 10000, 10);
    const sgn = (x, d = 1) => (x > 0 ? "+" : x < 0 ? "−" : "") + fmtNum(Math.abs(x), d);

    $("#ed-stats").innerHTML = `
      <div class="stat"><div class="k">${T("意外", "Surprise")} ${tex(String.raw`= \text{${T("实际", "actual")}} - \text{${T("共识", "consensus")}}`)}</div><div class="v acc">${sgn(act - cons, ind.dec)}${ind.unit === "k" ? "k" : ind.unit}</div></div>
      <div class="stat"><div class="k">${T("标准化意外（“热”为正）", "Standardized surprise (hot = +)")}</div><div class="v ${r.z > 0.5 ? "neg" : r.z < -0.5 ? "pos" : ""}">${sgn(r.z, 1)}σ</div></div>
      <div class="stat"><div class="k">${T("通常预测误差", "Typical forecast error")}</div><div class="v">${fmtV(ind, ind.sd)}</div></div>`;

    const cell = (title, val, sub, bad) => `<div class="cmp-cell ${Math.abs(parseFloat(val)) < 0.05 ? "" : bad ? "cold" : "hl"}"><h5>${title}</h5><div style="font-size:20px;font-weight:700;color:var(--ink)">${val}</div><div class="demo-meta">${sub}</div></div>`;
    $("#ed-moves").innerHTML =
      cell(T("2 年期收益率", "2-year yield"), sgn(r.d2, 1) + " bp", T("对美联储预期最敏感", "most sensitive to Fed expectations"), r.d2 > 0) +
      cell(T("10 年期收益率", "10-year yield"), sgn(r.d10, 1) + " bp", `${T("1,000 美元、5%、10 年期债券", "$1,000 5% 10-year bond")}${C}${fmtUsd(p1, 2)} (${fmtPct(p1 / p0 - 1, 2)})`, r.d10 > 0) +
      cell(T("股票指数 / 比特币", "Stock index / Bitcoin"), sgn(r.eq, 2) + "%", `${T("比特币", "Bitcoin")} ${sgn(r.btc, 2)}%${T("（示意）", " (illustrative)")}`, r.eq < 0);

    const lines = [];
    if (Math.abs(r.z) < 0.5) lines.push(`<span class="ok">${T("意外不到半个标准差：基本“计入价格”，市场波澜不惊。", "Surprise under half a standard deviation: essentially priced in, so markets barely react.")}</span>`);
    else {
      lines.push(`${T("数据比预期", "The data came in")} <b>${r.z > 0 ? T("更热", "hotter") : T("更冷", "cooler")}</b>${T(" → 市场上调", " than expected → markets")} ${r.z > 0 ? T("加息预期", "price more hikes") : T("降息预期", "price more cuts")} → ${T("2 年期收益率", "2-year yield")} ${r.d2 > 0 ? "↑" : "↓"}`);
      if (ind.kind === "g") lines.push(`<span class="warn">${regime === "infl" ? T("通胀担忧环境：增长意外被读成“利率更高更久”，好消息就是坏消息。", "Inflation-worry regime: a growth surprise reads as \"higher for longer\" — good news is bad news.") : T("衰退担忧环境：增长意外被读成“衰退风险下降”，好消息就是好消息。", "Recession-worry regime: a growth surprise reads as \"lower recession risk\" — good news is good news.")}</span>`);
      else lines.push(`<span class="warn">${T("通胀意外：无论什么环境，对债券和股票通常都不利。", "Inflation surprise: in almost any regime, bad for both bonds and stocks.")}</span>`);
      if (Math.abs(r.z) >= 3) lines.push(`<span class="bad">${T("超过 3 个标准差：这是会上头条的数据日。", "More than 3 standard deviations: a headline-making data day.")}</span>`);
    }
    $("#ed-log").innerHTML = lines.map((l) => `<div>${l}</div>`).join("");
  };

  const paintGame = () => {
    const s = SCN[sc], ind = IND[s.k];
    const r = reaction(s.k, s.cons, s.act, regime);
    const dir = (x) => (Math.abs(x) < 0.05 ? 0 : x > 0 ? 1 : -1);
    const btn = (grp, v, lab, cur) => `<button data-g="${grp}" data-v="${v}" class="${cur === v ? "on" : ""}">${lab}</button>`;
    let html = `<div class="scn-q">${T("第", "Round ")}${sc + 1}${T(" 题 · ", " · ")}${ind.name}${C}${T("共识", "consensus")} <b>${fmtV(ind, s.cons)}</b>${T("，实际", ", actual")} <b>${fmtV(ind, s.act)}</b>${T("。", ".")}</div>
      <div class="demo-row" style="gap:14px;flex-wrap:wrap">
        <div><div class="demo-label">${T("2 年期收益率", "2-year yield")}</div><div class="demo-seg">${btn("y", 1, T("上升", "Up"), guessY)}${btn("y", 0, T("基本不动", "Flat"), guessY)}${btn("y", -1, T("下降", "Down"), guessY)}</div></div>
        <div><div class="demo-label">${T("股票指数", "Stock index")}</div><div class="demo-seg">${btn("s", 1, T("上涨", "Up"), guessS)}${btn("s", 0, T("基本不动", "Flat"), guessS)}${btn("s", -1, T("下跌", "Down"), guessS)}</div></div>
      </div>
      <div class="demo-btns" style="margin-top:10px"><button class="demo-btn" id="ed-reveal">${T("揭晓", "Reveal")}</button><button class="demo-btn" id="ed-next">${T("下一题", "Next round")}</button></div>`;
    if (revealed) {
      const okY = guessY === dir(r.d2 / 10), okS = guessS === dir(r.eq);
      html += `<div class="scn-meta">${T("标准化意外", "Standardized surprise")} ${fmtNum(r.z, 1)}σ${T("；2 年期", "; 2-year")} ${r.d2 >= 0 ? "+" : ""}${fmtNum(r.d2, 1)} bp <span class="pill ${okY ? "ok" : "bad"}">${okY ? T("猜对", "right") : T("猜错", "wrong")}</span>${T("；股票", "; stocks")} ${r.eq >= 0 ? "+" : ""}${fmtNum(r.eq, 2)}% <span class="pill ${okS ? "ok" : "bad"}">${okS ? T("猜对", "right") : T("猜错", "wrong")}</span></div>`;
    }
    html += `<div class="scn-meta">${T("得分", "Score")}${C}<b>${score}</b> / ${played * 2}</div>`;
    $("#ed-game").innerHTML = html;
    root.querySelectorAll("#ed-game [data-g]").forEach((b) => b.addEventListener("click", () => {
      if (revealed) return;
      if (b.dataset.g === "y") guessY = +b.dataset.v; else guessS = +b.dataset.v;
      paintGame();
    }));
    $("#ed-reveal").addEventListener("click", () => {
      if (revealed || guessY === null || guessS === null) return;
      revealed = true; played += 1;
      if (guessY === dir(r.d2 / 10)) score += 1;
      if (guessS === dir(r.eq)) score += 1;
      paintGame();
    });
    $("#ed-next").addEventListener("click", () => {
      sc = (sc + 1) % SCN.length; guessY = null; guessS = null; revealed = false;
      paintGame();
    });
  };

  root.querySelectorAll("#ed-inds button").forEach((b) => b.addEventListener("click", () => {
    sel = b.dataset.k;
    root.querySelectorAll("#ed-inds button").forEach((x) => x.classList.toggle("active", x === b));
    const first = SCN.find((s) => s.k === sel);
    setSliders(sel, first.cons, first.act);
    paint();
  }));
  root.querySelectorAll("#ed-regime button").forEach((b) => b.addEventListener("click", () => {
    regime = b.dataset.r;
    root.querySelectorAll("#ed-regime button").forEach((x) => x.classList.toggle("on", x === b));
    paint(); paintGame();
  }));
  ["#ed-cons", "#ed-act"].forEach((id) => $(id).addEventListener("input", paint));
  setSliders(sel, 150, 260);
  paint();
  paintGame();
}
