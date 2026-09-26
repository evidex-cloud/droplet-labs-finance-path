// 交互演示：经济的心电图。上半部分：用 C + I + G + (X − M) 拼出 GDP，并用平减指数把名义增长换算成实际增长（_fin.js realRate）；
// 下半部分：一个示意的经济周期——趋势增长（_fin.js fv 复利）+ 周期波动 + 可选的油价冲击，拖动“你在这里”看产出缺口、周期阶段、
// 央行倾向与市场“天气”。所有数字都是教学示意，不是预测。
import { fv, realRate, fmtPct, fmtNum, tex } from "./_fin.js";
import { lineChart, chartBlock } from "./_chart.js";

export default function mount(root, lang) {
  const en = lang === "en";
  const T = (zh, e) => (en ? e : zh);
  const C = (s) => T("：", ": ") + s;

  const PARTS = [
    ["c", T("C 消费", "C consumption"), 400, 1000, 700, "var(--orange)"],
    ["i", T("I 投资", "I investment"), 0, 400, 180, "var(--green)"],
    ["g", T("G 政府购买", "G government"), 0, 400, 170, "var(--blue)"],
    ["x", T("X 出口", "X exports"), 0, 300, 110, "var(--btc)"],
    ["m", T("M 进口（减项）", "M imports (subtracted)"), 0, 300, 160, "var(--red)"],
  ];

  root.innerHTML = `
    <div class="demo">
      <div class="demo-head">${T("💓 经济的心电图：拼出 GDP，再看周期怎么跳", "💓 The economy's heartbeat: build GDP, then watch the cycle beat")}</div>

      <div class="demo-label">${T("第一步 · 用 ", "Step 1 · Build this year's nominal GDP from ")}${tex(String.raw`C + I + G + (X - M)`)}${T(" 拼出今年的名义 GDP（去年 GDP 为 1,000，去年平减指数为 100）", " (last year's GDP: 1,000; last year's deflator: 100)")}</div>
      <div class="demo-grid" id="gc-parts">
        ${PARTS.map(([k, lab, lo, hi, v]) => `<div><label class="demo-label">${lab}${T("：", ": ")}<b id="gc-${k}-v"></b></label><input class="demo-slider" type="range" id="gc-${k}" min="${lo}" max="${hi}" step="5" value="${v}"></div>`).join("")}
        <div><label class="demo-label">${T("今年平减指数（物价水平）", "This year's deflator (price level)")}${T("：", ": ")}<b id="gc-def-v"></b></label><input class="demo-slider" type="range" id="gc-def" min="95" max="115" step="0.5" value="104"></div>
      </div>
      <div id="gc-bars"></div>
      <div class="stat-row" id="gc-stats1"></div>
      <div class="demo-log" id="gc-log1"></div>

      <div class="demo-label" style="margin-top:18px">${T("第二步 · 一个示意的经济周期（实际 GDP 指数，第 0 年记为 100）", "Step 2 · An illustrative business cycle (real GDP index, year 0 set to 100)")}</div>
      <div class="demo-grid">
        <div><label class="demo-label">${T("长期趋势增长（潜在增速）", "Long-run trend growth (potential)")}${T("：", ": ")}<b id="gc-tg-v"></b></label><input class="demo-slider" type="range" id="gc-tg" min="0" max="4" step="0.25" value="2"></div>
        <div><label class="demo-label">${T("周期振幅（产出缺口最大值）", "Cycle amplitude (max output gap)")}${T("：", ": ")}<b id="gc-amp-v"></b></label><input class="demo-slider" type="range" id="gc-amp" min="0" max="5" step="0.25" value="2.5"></div>
        <div><label class="demo-label">${T("一个完整周期的长度", "Length of one full cycle")}${T("：", ": ")}<b id="gc-per-v"></b></label><input class="demo-slider" type="range" id="gc-per" min="4" max="12" step="0.5" value="8"></div>
        <div><label class="demo-label">${T("“你在这里”（第几年）", "\"You are here\" (year)")}${T("：", ": ")}<b id="gc-now-v"></b></label><input class="demo-slider" type="range" id="gc-now" min="1" max="16" step="0.25" value="5"></div>
      </div>
      <div class="demo-block">
        <label class="demo-label">${T("在第 6 年加一个供给冲击（比如油价暴涨）", "Add a supply shock in year 6 (e.g. an oil spike)")}</label>
        <div class="demo-seg" id="gc-shock">
          <button data-s="0" class="on">${T("无冲击", "No shock")}</button>
          <button data-s="3">${T("中等冲击 −3%", "Moderate −3%")}</button>
          <button data-s="6">${T("严重冲击 −6%", "Severe −6%")}</button>
        </div>
      </div>
      <div id="gc-chart"></div>
      <div class="stat-row" id="gc-stats2"></div>
      <div class="cmp-3" id="gc-weather"></div>
      <p class="demo-tip">${T(
        "先在第一步把进口 M 从 160 拉到 60，同时把消费 C 降 100——GDP 不变：少买进口货并不自动让经济变大。再把平减指数调到 106，看名义增长和实际增长怎么分家。第二步里拖动“你在这里”走过一整个周期：<strong>产出缺口由负转正时央行开始想加息，由正转负时想降息</strong>；再加一个“严重冲击”，看为什么供给冲击会让央行左右为难。",
        "In Step 1, drag imports M from 160 down to 60 and cut consumption C by 100 at the same time — GDP doesn't change: buying fewer imports does not automatically grow the economy. Then set the deflator to 106 and watch nominal and real growth part ways. In Step 2, drag \"You are here\" through a whole cycle: <strong>when the output gap turns from negative to positive the central bank starts leaning toward hikes; when it turns negative, toward cuts</strong>. Then add a severe shock to see why supply shocks leave central banks stuck."
      )}</p>
    </div>`;

  const $ = (s) => root.querySelector(s);
  let shock = 0;

  const paintGdp = () => {
    const v = {};
    PARTS.forEach(([k]) => { v[k] = +$("#gc-" + k).value; $("#gc-" + k + "-v").textContent = fmtNum(v[k], 0); });
    const def = +$("#gc-def").value;
    $("#gc-def-v").textContent = fmtNum(def, 1);
    const nx = v.x - v.m;
    const gdp = v.c + v.i + v.g + nx;
    const nomG = gdp / 1000 - 1;
    const infl = def / 100 - 1;
    const realG = realRate(nomG, infl);
    const realGdp = gdp / (def / 100);

    const maxV = 1000;
    $("#gc-bars").innerHTML = PARTS.map(([k, lab, , , , col]) => {
      const val = k === "m" ? -v.m : v[k];
      return `<div class="bar2"><span class="lab">${lab}</span><div class="track"><div class="fill" style="width:${(Math.abs(val) / maxV) * 100}%;background:${col}"></div></div><span class="val">${val < 0 ? "−" : "+"}${fmtNum(Math.abs(val), 0)}</span></div>`;
    }).join("");

    $("#gc-stats1").innerHTML = `
      <div class="stat"><div class="k">${T("名义 GDP", "Nominal GDP")}</div><div class="v acc">${fmtNum(gdp, 0)}</div></div>
      <div class="stat"><div class="k">${T("名义增长", "Nominal growth")}</div><div class="v ${nomG >= 0 ? "pos" : "neg"}">${fmtPct(nomG, 1)}</div></div>
      <div class="stat"><div class="k">${T("通胀（平减指数）", "Inflation (deflator)")}</div><div class="v">${fmtPct(infl, 1)}</div></div>
      <div class="stat"><div class="k">${T("实际 GDP（去年价格）", "Real GDP (last year's prices)")}</div><div class="v">${fmtNum(realGdp, 1)}</div></div>
      <div class="stat"><div class="k">${T("实际增长", "Real growth")}</div><div class="v ${realG >= 0 ? "pos" : "neg"}">${fmtPct(realG, 2)}</div></div>`;

    const lines = [];
    const n0 = (x) => fmtNum(x, 0).replace(/,/g, "{,}");
    lines.push(tex(String.raw`\mathrm{GDP} = ${n0(v.c)} + ${n0(v.i)} + ${n0(v.g)} + (${n0(v.x)} - ${n0(v.m)}) = \mathbf{${n0(gdp)}}`));    lines.push(`${T("消费占比", "Consumption share")}${C(fmtPct(v.c / gdp, 1))}${T("；净出口", "; net exports")} ${nx >= 0 ? "+" : "−"}${fmtNum(Math.abs(nx), 0)}${nx < 0 ? T("（贸易逆差）", " (trade deficit)") : T("（贸易顺差）", " (trade surplus)")}`);
    if (Math.abs(nomG - realG) > 0.03) lines.push(`<span class="warn">${T("名义增长与实际增长差了", "Nominal and real growth differ by")} ${fmtPct(nomG - realG, 1)}${T("——大部分“增长”只是物价上涨。", " — much of the \"growth\" is just higher prices.")}</span>`);
    if (realG < 0) lines.push(`<span class="bad">${T("实际 GDP 下降：产出真的变少了。连续多个季度、并且在就业、收入等指标上广泛出现，NBER 才可能认定衰退。", "Real GDP fell: output really shrank. Only a broad, sustained decline across jobs, income and more would lead the NBER to call a recession.")}</span>`);
    else lines.push(`<span class="ok">${T("实际增长为正：扣掉物价后，经济多生产了东西。", "Real growth is positive: after stripping out prices, the economy produced more.")}</span>`);
    $("#gc-log1").innerHTML = lines.map((l) => `<div>${l}</div>`).join("");
  };

  const paintCycle = () => {
    const g = +$("#gc-tg").value / 100, A = +$("#gc-amp").value / 100, P = +$("#gc-per").value, now = +$("#gc-now").value;
    $("#gc-tg-v").textContent = fmtPct(g, 2);
    $("#gc-amp-v").textContent = "±" + fmtPct(A, 2);
    $("#gc-per-v").textContent = fmtNum(P, 1) + T(" 年", " yrs");
    $("#gc-now-v").textContent = fmtNum(now, 2);

    const S = shock / 100, s0 = 6;
    const shockF = (t) => (t >= s0 ? -S * Math.exp(-(t - s0) / 1.5) * (1 - Math.exp(-(t - s0) * 4)) : 0);
    const gapF = (t) => A * Math.sin((2 * Math.PI * t) / P) + shockF(t);
    const trend = (t) => fv(100, g, t);
    const actual = (t) => trend(t) * (1 + gapF(t));

    const res = lineChart({
      fns: [{ f: trend, cls: "line2" }, { f: actual, cls: "line" }],
      lo: 0, hi: 16, xlabel: T("年", "year"), markerX: now, markerLabel: T("你在这里", "you are here"), uid: "gc",
    });
    $("#gc-chart").innerHTML = chartBlock(res, [["var(--blue)", T("长期趋势（潜在产出）", "Long-run trend (potential)")], ["var(--orange)", T("实际 GDP", "Actual real GDP")]]);

    const gap = gapF(now), dGap = (gapF(now + 0.05) - gapF(now - 0.05)) / 0.1;
    const yoy = now >= 1 ? actual(now) / actual(now - 1) - 1 : NaN;
    let phase, bank, yields, stocks, cls;
    if (dGap >= 0 && gap < 0) { phase = T("复苏 / 早期扩张", "Recovery / early expansion"); bank = T("维持低利率", "Keep rates low"); yields = T("从低位回升", "Rising from lows"); stocks = T("通常最强，市场提前反弹", "Often strongest; markets rebound early"); cls = "ok"; }
    else if (dGap >= 0 && gap >= 0) { phase = T("后期扩张 / 过热", "Late expansion / overheating"); bank = T("加息踩刹车", "Hike to tap the brakes"); yields = T("上升，曲线变平", "Rising; curve flattens"); stocks = T("估值受压，分化", "Valuations squeezed; mixed"); cls = "warn"; }
    else if (dGap < 0 && gap >= 0) { phase = T("见顶后放缓", "Slowing after the peak"); bank = T("停止加息，观望", "Stop hiking, wait and see"); yields = T("见顶，可能倒挂", "Peaking; may invert"); stocks = T("往往提前见顶", "Often peak early"); cls = "warn"; }
    else { phase = T("收缩 / 衰退", "Contraction / recession"); bank = T("降息", "Cut rates"); yields = T("下降（债券上涨）", "Falling (bonds rally)"); stocks = T("下跌；信用利差走阔", "Falling; credit spreads widen"); cls = "bad"; }
    const stag = shock && now >= s0 && now <= s0 + 3;

    $("#gc-stats2").innerHTML = `
      <div class="stat"><div class="k">${T("产出缺口", "Output gap")}</div><div class="v ${gap >= 0 ? "pos" : "neg"}">${gap >= 0 ? "+" : ""}${fmtPct(gap, 2)}</div></div>
      <div class="stat"><div class="k">${T("过去一年实际增长", "Real growth, past year")}</div><div class="v ${yoy >= 0 ? "pos" : "neg"}">${fmtPct(yoy, 2)}</div></div>
      <div class="stat"><div class="k">${T("周期阶段", "Phase")}</div><div class="v acc" style="font-size:15px">${phase}</div></div>`;

    $("#gc-weather").innerHTML = `
      <div class="cmp-cell ${cls === "bad" ? "cold" : "hl"}"><h5>${T("央行倾向（观念①）", "Central bank lean (Idea ①)")}</h5><div style="font-weight:700;color:var(--ink)">${stag ? T("两难：物价涨、产出跌", "Stuck: prices up, output down") : bank}</div></div>
      <div class="cmp-cell"><h5>${T("国债收益率", "Treasury yields")}</h5><div style="font-weight:700;color:var(--ink)">${stag ? T("通胀担忧可能推高长端", "Inflation fears may lift the long end") : yields}</div></div>
      <div class="cmp-cell"><h5>${T("股票与风险资产（含比特币）", "Stocks & risk assets (incl. BTC)")}</h5><div style="font-weight:700;color:var(--ink)">${stocks}</div></div>`;
  };

  PARTS.forEach(([k]) => $("#gc-" + k).addEventListener("input", paintGdp));
  $("#gc-def").addEventListener("input", paintGdp);
  ["#gc-tg", "#gc-amp", "#gc-per", "#gc-now"].forEach((id) => $(id).addEventListener("input", paintCycle));
  root.querySelectorAll("#gc-shock button").forEach((b) => b.addEventListener("click", () => {
    shock = +b.dataset.s;
    root.querySelectorAll("#gc-shock button").forEach((x) => x.classList.toggle("on", x === b));
    paintCycle();
  }));
  paintGdp();
  paintCycle();
}
