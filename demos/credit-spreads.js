// 交互演示：信用利差实验室。选评级（示意参数）或自己调国债收益率、利差、违约概率与回收率：
// 算出公司债收益率与价格、预期损失 = PD × LGD、风险溢价、盈亏平衡违约率；一键“危机”看利差走阔的价格冲击；
// 再用 100 只债券 × 10 年的可复现蒙特卡洛，看“多拿的利差”在平均与坏运气下各剩多少。
import { bondPrice, bondRisk, rng, fmtPct, fmtNum, fmtUsd, clamp, tex } from "./_fin.js";

// 把格式化好的百分数放进 LaTeX：% → \%
const pc = (s) => String(s).replace(/%/g, "\\%");

export default function mount(root, lang) {
  const en = lang === "en";
  const T = (zh, e) => (en ? e : zh);

  // 示意参数：利差（bp）、年违约概率（%）、回收率（%）；危机时利差倍数
  const grades = [
    { k: "AAA", sp: 50, pd: 0.01, rec: 40, crisis: 2.0 },
    { k: "A", sp: 100, pd: 0.06, rec: 40, crisis: 2.2 },
    { k: "BBB", sp: 140, pd: 0.2, rec: 40, crisis: 2.3 },
    { k: "BB", sp: 250, pd: 0.8, rec: 40, crisis: 2.5 },
    { k: "B", sp: 380, pd: 3.5, rec: 40, crisis: 2.5 },
    { k: "CCC", sp: 900, pd: 12, rec: 30, crisis: 2.0 },
  ];
  const st = { g: 4, tsy: 5.17, sp: 380, pd: 3.5, rec: 40, crisis: false, seed: 7 };

  root.innerHTML = `
    <div class="demo">
      <div class="demo-head">${T("🏷️ 信用利差实验室：从 AAA 到垃圾债", "🏷️ Credit-spread lab: from AAA to junk")}</div>
      <div class="demo-block">
        <div class="demo-label">${T("选一个评级（参数为示意，粗略参考长期历史平均）", "Pick a rating (illustrative parameters, loosely based on long-run averages)")}</div>
        <div class="demo-seg" id="cs-grade">${grades.map((g, i) => `<button data-i="${i}">${g.k}</button>`).join("")}</div>
      </div>
      <div class="demo-grid">
        <div class="demo-block">
          <label class="demo-label">${T("10 年期国债收益率", "10-year Treasury yield")} <b id="cs-v-tsy"></b></label>
          <input class="demo-slider" type="range" id="cs-tsy" min="0.5" max="8" step="0.01" />
          <label class="demo-label">${T("信用利差", "Credit spread")} <b id="cs-v-sp"></b></label>
          <input class="demo-slider" type="range" id="cs-sp" min="0" max="2000" step="5" />
        </div>
        <div class="demo-block">
          <label class="demo-label">${T("年违约概率 PD", "Annual probability of default (PD)")} <b id="cs-v-pd"></b></label>
          <input class="demo-slider" type="range" id="cs-pd" min="0" max="25" step="0.01" />
          <label class="demo-label">${T("违约时回收率", "Recovery rate in default")} <b id="cs-v-rec"></b></label>
          <input class="demo-slider" type="range" id="cs-rec" min="0" max="90" step="1" />
          <div class="demo-btns"><button class="demo-btn" id="cs-crisis"></button></div>
        </div>
      </div>
      <div class="stat-row" id="cs-stats"></div>
      <div class="demo-block">
        <div class="demo-label">${T("收益率拆解（每年，百分点）", "Yield decomposition (per year, percentage points)")}</div>
        <div class="stages" id="cs-bars"></div>
      </div>
      <div class="demo-block">
        <div class="demo-label">${T("🎲 100 只同评级债券、持有 10 年：多拿的利差，扣掉违约后还剩多少？（200 次可复现模拟）", "🎲 100 bonds of this grade held for 10 years: after defaults, how much of the extra spread is left? (200 reproducible runs)")}</div>
        <div class="demo-btns"><button class="demo-btn" id="cs-reroll">${T("换一组随机数", "New random seed")}</button></div>
        <div class="stat-row" id="cs-sim"></div>
      </div>
      <div class="demo-log" id="cs-log"></div>
      <p class="demo-tip">${T(
        "依次点 AAA → BBB → B：看红色的“预期损失”在利差里的占比从几乎为零变成一半以上——投资级利差大多是风险与流动性溢价。再点“危机：利差走阔”，B 级债一个违约没发生就跌约三成。最后看模拟：B 级组合平均能跑赢国债，但违约扎堆的坏情形里会跑输国债——利差是风险的价格，不是白送的收益。",
        "Click AAA → BBB → B in turn: the red “expected loss” goes from almost nothing to more than half of the spread, so investment-grade spreads are mostly risk and liquidity premium. Then hit “Crisis: spreads widen” and the B-rated bond loses about 30% without a single default. Finally, check the simulation: a B-rated portfolio beats Treasuries on average, but in the runs where defaults bunch up, it trails Treasuries. A spread is the price of risk, not a free gift."
      )}</p>
    </div>`;

  const q = (s) => root.querySelector(s);

  const simulate = (spEff) => {
    // 每只债券平价买入，年票息 = 国债 + 利差；违约时回收 rec，回收款与票息都按国债利率再投资。
    // 违约会“扎堆”：每年有 15% 的概率是坏年份（违约概率 ×3、回收率 −15 个百分点），其余年份违约概率相应调低，长期平均仍等于 PD。
    const rand = rng(st.seed * 7919 + Math.round(st.pd * 100) + Math.round(spEff));
    const tsy = st.tsy / 100, cpn = tsy + spEff / 10000, pd = st.pd / 100, rec = st.rec / 100;
    const pdBad = Math.min(1, pd * 3), pdGood = Math.max(0, (pd - 0.15 * pdBad) / 0.85), recBad = Math.max(0, rec - 0.15);
    const outs = [];
    let totalDefaults = 0;
    for (let run = 0; run < 200; run++) {
      const alive = new Array(100).fill(true);
      let wealth = 0;
      for (let y = 1; y <= 10; y++) {
        const bad = rand() < 0.15, pdY = bad ? pdBad : pdGood, recY = bad ? recBad : rec, grow = Math.pow(1 + tsy, 10 - y);
        for (let b = 0; b < 100; b++) {
          if (!alive[b]) continue;
          if (rand() < pdY) { alive[b] = false; totalDefaults++; wealth += recY * grow; }
          else { wealth += cpn * grow; if (y === 10) wealth += 1; }
        }
      }
      outs.push(Math.pow(wealth / 100, 1 / 10) - 1);
    }
    outs.sort((a, b) => a - b);
    const mean = outs.reduce((s, x) => s + x, 0) / outs.length;
    return { mean, p5: outs[Math.floor(0.05 * outs.length)], lose: outs.filter((x) => x < tsy).length / outs.length, defaults: totalDefaults / 200 };
  };

  const paint = () => {
    const G = grades[st.g];
    const spEff = st.crisis ? st.sp * G.crisis : st.sp;
    root.querySelectorAll("#cs-grade button").forEach((b) => b.classList.toggle("on", +b.dataset.i === st.g));
    q("#cs-tsy").value = st.tsy; q("#cs-sp").value = st.sp; q("#cs-pd").value = st.pd; q("#cs-rec").value = st.rec;
    q("#cs-v-tsy").textContent = fmtNum(st.tsy, 2) + "%";
    q("#cs-v-sp").textContent = st.sp + "bp" + (st.crisis ? T("（危机中 ×", " (crisis ×") + G.crisis + " = " + Math.round(spEff) + "bp" + T("）", ")") : "");
    q("#cs-v-pd").textContent = fmtNum(st.pd, 2) + "%";
    q("#cs-v-rec").textContent = st.rec + "%";
    q("#cs-crisis").textContent = st.crisis ? T("恢复平静时期的利差", "Back to calm-market spreads") : T("危机：利差走阔", "Crisis: spreads widen");
    q("#cs-crisis").classList.toggle("active", st.crisis);

    const y = st.tsy / 100 + spEff / 10000;
    const yCalm = st.tsy / 100 + st.sp / 10000;
    const price = bondPrice(1000, 0.05, y, 10), priceCalm = bondPrice(1000, 0.05, yCalm, 10), priceTsy = bondPrice(1000, 0.05, st.tsy / 100, 10);
    const lgd = 1 - st.rec / 100;
    const el = (st.pd / 100) * lgd;
    const prem = spEff / 10000 - el;
    const be = lgd > 0 ? (spEff / 10000) / lgd : Infinity;
    const mod = bondRisk(1000, 0.05, y, 10).modified;
    const ig = st.g <= 2;

    q("#cs-stats").innerHTML = [
      [T("公司债收益率", "Corporate yield"), fmtPct(y, 2), "acc"],
      [T("5% 票息 10 年债价格", "Price of a 5% 10y bond"), fmtUsd(price, 2), price < priceTsy ? "neg" : "pos"],
      [T("预期损失 ", "Expected loss ") + tex(String.raw`\mathrm{PD} \times \mathrm{LGD}`), fmtPct(el, 2), el > spEff / 10000 ? "neg" : ""],
      [T("风险 + 流动性溢价", "Risk + liquidity premium"), fmtPct(prem, 2), prem < 0 ? "neg" : "pos"],
      [T("盈亏平衡违约率", "Break-even default rate"), isFinite(be) ? fmtPct(be, 2) : "∞", ""],
    ].map(([k, v, c]) => `<div class="stat"><div class="k">${k}</div><div class="v ${c}">${v}</div></div>`).join("");

    const parts = [
      [T("国债收益率（时间的价格）", "Treasury yield (price of time)"), st.tsy / 100, "var(--blue)"],
      [T("预期违约损失", "Expected default loss"), el, "var(--red)"],
      [T("风险 + 流动性溢价", "Risk + liquidity premium"), Math.max(0, prem), "var(--orange)"],
    ];
    const tot = Math.max(y, st.tsy / 100 + el);
    q("#cs-bars").innerHTML = parts.map(([lab, v, col]) => `<div class="stage-bar"><span class="lab">${lab}</span><div class="track"><div class="fill" style="width:${(v / Math.max(tot, 0.0001) * 100).toFixed(1)}%;background:${col}"></div></div><span class="val">${fmtNum(v * 100, 2)}</span></div>`).join("")
      + `<div class="demo-meta">${T("预期损失占利差：", "Expected loss as a share of the spread: ")}${spEff > 0 ? fmtPct(el / (spEff / 10000), 0) : "–"}${ig ? T(" · 投资级", " · investment grade") : T(" · 高收益", " · high yield")}</div>`;

    const sim = simulate(st.sp);
    const tsyAnn = st.tsy / 100;
    q("#cs-sim").innerHTML = [
      [T("平均年化回报", "Average annual return"), fmtPct(sim.mean, 2), sim.mean > tsyAnn ? "pos" : "neg"],
      [T("国债基准", "Treasury benchmark"), fmtPct(tsyAnn, 2), ""],
      [T("最差 5% 情形", "Worst 5% of runs"), fmtPct(sim.p5, 2), sim.p5 > tsyAnn ? "pos" : "neg"],
      [T("跑输国债的概率", "Chance of trailing Treasuries"), fmtPct(sim.lose, 0), sim.lose > 0.2 ? "neg" : "acc"],
      [T("每组平均违约只数", "Average defaults per 100 bonds"), fmtNum(sim.defaults, 1), ""],
    ].map(([k, v, c]) => `<div class="stat"><div class="k">${k}</div><div class="v ${c}">${v}</div></div>`).join("");

    const lines = [];
    lines.push(`${tex(String.raw`\text{${T("收益率", "Yield")}} = \text{${T("国债", "Treasury")}}\ ${fmtNum(st.tsy, 2)}\% + \text{${T("利差", "spread")}}\ ${Math.round(spEff)}\ \text{bp} = \mathbf{${pc(fmtPct(y, 2))}}`)}${T("；同一只 5% 票息 10 年期债，国债价格", "; the same 5% 10-year bond is worth")} ${fmtUsd(priceTsy, 2)}${T("，这家公司的只值", " as a Treasury but only")} <b>${fmtUsd(price, 2)}</b>${T("。", " from this company.")}`);
    lines.push(`${tex(String.raw`\text{${T("预期损失", "Expected loss")}} = \mathrm{PD} \times \mathrm{LGD} = ${fmtNum(st.pd, 2)}\% \times ${fmtNum(lgd * 100, 0)}\% = ${pc(fmtPct(el, 2))}`)}${T("；只要年违约率低于", "; as long as annual defaults stay below")} <b>${isFinite(be) ? fmtPct(be, 2) : "∞"}</b>${T("（", " (")}${tex(String.raw`\dfrac{\text{${T("利差", "spread")}}}{\mathrm{LGD}}`)}${T("），利差就够赔。", "), the spread covers the losses.")}`);
    if (prem < 0) lines.push(`<span class="bad">${T("利差低于预期损失：按这组假设，持有它平均会跑输国债——要么市场认为你的违约概率估高了，要么这只债券被高估了。", "The spread is below the expected loss: on these assumptions, holding it trails Treasuries on average. Either the market thinks your default estimate is too high, or the bond is overpriced.")}</span>`);
    if (st.crisis) lines.push(`<span class="bad">${T("危机：利差从", "Crisis: the spread goes from")} ${st.sp}bp ${T("走阔到", "to")} ${Math.round(spEff)}bp${T("，价格", ", and the price goes")} ${fmtUsd(priceCalm, 2)} → ${fmtUsd(price, 2)}${T("（", " (")}${fmtPct(price / priceCalm - 1, 1)}${T("）——一个违约都还没发生。利差久期约", "), before a single default. Spread duration is about")} ${fmtNum(mod, 1)}${T("。", ".")}</span>`);
    lines.push(`${T("模拟：平均跑赢国债", "Simulation: on average it beats Treasuries by")} ${fmtNum((sim.mean - tsyAnn) * 10000, 0)}bp${T("/年；但在最差 5% 的情形里，年化只有", " a year; but in the worst 5% of runs the annual return is only")} ${fmtPct(sim.p5, 2)}${T("。违约是一阵一阵来的，这就是风险溢价要补偿的东西。", ". Defaults come in waves, and that is what the risk premium pays for.")}`);
    lines.push(`<span class="warn">${T("参数为示意；真实利差以 FRED 上的 ICE 美银指数为准。本演示不构成投资建议。", "Parameters are illustrative; for real spreads see the ICE BofA indexes on FRED. Not investment advice.")}</span>`);
    q("#cs-log").innerHTML = lines.map((l) => `<div>${l}</div>`).join("");
  };

  root.querySelectorAll("#cs-grade button").forEach((b) => b.addEventListener("click", () => {
    st.g = +b.dataset.i; const G = grades[st.g];
    st.sp = G.sp; st.pd = G.pd; st.rec = G.rec; paint();
  }));
  for (const k of ["tsy", "sp", "pd", "rec"]) q("#cs-" + k).addEventListener("input", (e) => { st[k] = +e.target.value; paint(); });
  q("#cs-crisis").addEventListener("click", () => { st.crisis = !st.crisis; paint(); });
  q("#cs-reroll").addEventListener("click", () => { st.seed = clamp(st.seed + 1, 1, 1e9); paint(); });
  paint();
}
