// 交互演示：BTC 评级阶梯——比特币价格滑块、美元资产是否与债务相抵、可选“新增更优先的优先股”；
// 每层给出 BTC 评级、BTC 地板价、可跌幅度，以及对数正态模型下的 BTC Risk 与 BTC Credit（ARR 与波动率可调）。
import { coverageByLayer, btcFloorPrice, btcRiskProb, btcCredit, fmtNum, fmtPct, fmtUsd, tex } from "./_fin.js";

// 把格式化好的数字放进 LaTeX：千分位写成 {,}，$ 与 % 转义
const texv = (s) => String(s).replace(/\$/g, "\\$").replace(/,/g, "{,}").replace(/%/g, "\\%");

export default function mount(root, lang) {
  const en = lang === "en";
  const T = (zh, e) => (en ? e : zh);

  const s = { px: 100000, arr: 10, vol: 40, newSenior: 0, net: false };
  const BTC = 10000, CASH = 30;

  root.innerHTML = `
    <div class="demo">
      <div class="demo-head">${T("🏗️ BTC 评级压力台：覆盖阶梯、地板价与 BTC Credit", "🏗️ BTC Rating stress bench: coverage ladder, floor prices and BTC Credit")}</div>
      <div class="demo-grid">
        <div><label class="demo-label">${T("比特币价格", "Bitcoin price")} <b id="br-v-px"></b></label>
        <input class="demo-slider" type="range" id="br-px" min="10000" max="200000" step="1000" value="${s.px}" /></div>
        <div><label class="demo-label">${T("新增“更优先”的优先股（排在 F 之前，百万美元）", "New preferred ranked ahead of F ($M)")} <b id="br-v-ns"></b></label>
        <input class="demo-slider" type="range" id="br-ns" min="0" max="400" step="10" value="0" /></div>
        <div><label class="demo-label">${T("假设 BTC 年化回报 ARR", "Assumed BTC ARR")} <b id="br-v-arr"></b></label>
        <input class="demo-slider" type="range" id="br-arr" min="-10" max="30" step="1" value="${s.arr}" /></div>
        <div><label class="demo-label">${T("假设比特币波动率", "Assumed bitcoin volatility")} <b id="br-v-vol"></b></label>
        <input class="demo-slider" type="range" id="br-vol" min="20" max="80" step="1" value="${s.vol}" /></div>
      </div>
      <div class="demo-block"><div class="demo-seg" id="br-seg">
        <button data-n="0" class="on">${T("不抵现金（本课口径）", "No cash netting (course basis)")}</button>
        <button data-n="1">${T("现金与债务相抵（Strategy 计算桥）", "Net cash against debt (Strategy bridge)")}</button>
      </div></div>
      <div class="stages" id="br-bars"></div>
      <div id="br-tab"></div>
      <div class="demo-log" id="br-log"></div>
      <p class="demo-tip">${T(
        "把比特币从 10 万拖到 3 万：F 层从 4.0 倍掉到 1.2 倍，D 层刚好碰到 1.0 倍地板。再回到 10 万，把 ARR 从 10% 调到 0%、波动率调到 60%：评级一点没变，BTC Credit 却翻了好几倍——倍数是事实，利差是假设。最后加 2 亿“更优先”的优先股：F 与 D 的评级立刻变薄。",
        "Drag bitcoin from $100k to $30k: the F layer drops from 4.0x to 1.2x and the D layer touches its 1.0x floor. Go back to $100k and move ARR from 10% to 0% and volatility to 60%: the ratings don't budge, but BTC Credit multiplies — the multiple is a fact, the spread is an assumption. Finally add $200M of preferred ranked ahead: F and D thin out at once."
      )}</p>
    </div>`;

  const q = (sel) => root.querySelector(sel);
  q("#br-px").addEventListener("input", (e) => { s.px = +e.target.value; paint(); });
  q("#br-ns").addEventListener("input", (e) => { s.newSenior = +e.target.value; paint(); });
  q("#br-arr").addEventListener("input", (e) => { s.arr = +e.target.value; paint(); });
  q("#br-vol").addEventListener("input", (e) => { s.vol = +e.target.value; paint(); });
  root.querySelectorAll("#br-seg button").forEach((b) => b.addEventListener("click", () => {
    s.net = b.dataset.n === "1";
    root.querySelectorAll("#br-seg button").forEach((o) => o.classList.toggle("on", o === b));
    paint();
  }));

  function paint() {
    q("#br-v-px").textContent = fmtUsd(s.px);
    q("#br-v-ns").textContent = fmtNum(s.newSenior, 0);
    q("#br-v-arr").textContent = s.arr + "%";
    q("#br-v-vol").textContent = s.vol + "%";

    const reserve = (BTC * s.px) / 1e6; // 百万美元
    const layers = [{ name: T("可转债", "Converts"), claim: s.net ? 150 - CASH : 150, dur: 5 }];
    if (s.newSenior > 0) layers.push({ name: T("新高级优先股", "New senior pref"), claim: s.newSenior, dur: 11 });
    layers.push({ name: "Orange-F", claim: 100, dur: 11 });
    layers.push({ name: "Orange-D", claim: 50, dur: 11 });
    const cov = coverageByLayer(reserve, layers);

    q("#br-bars").innerHTML = `<div class="demo-label">${T("按层累计 BTC 评级（满格 = 8 倍；红 < 1.5 倍）", "Cumulative BTC Rating by layer (full bar = 8x; red < 1.5x)")}</div>` + cov.map((c) => {
      const w = Math.min(100, (Math.min(c.coverage, 8) / 8) * 100);
      const col = c.coverage >= 3 ? "var(--green)" : c.coverage >= 1.5 ? "var(--orange)" : "var(--red)";
      return `<div class="stage-bar"><span class="lab">${c.name}</span><div class="track"><div class="fill" style="width:${w}%;background:${col}"></div></div><span class="val">${fmtNum(c.coverage, 2)}x</span></div>`;
    }).join("");

    const mu = s.arr / 100, sig = s.vol / 100;
    const rows = cov.map((c, i) => {
      const dur = layers[i].dur;
      const floor = btcFloorPrice(s.px, c.coverage);
      const risk = btcRiskProb(c.coverage, mu, sig, dur);
      const credit = btcCredit(risk, dur);
      return `<tr style="border-top:1px solid var(--line)"><td>${c.name}</td><td>${fmtNum(c.cum, 0)}</td><td><b>${fmtNum(c.coverage, 2)}x</b></td><td>${fmtUsd(floor)}</td><td>${fmtPct(Math.max(0, 1 - 1 / c.coverage), 0)}</td><td>${dur}${T(" 年", " yrs")}</td><td>${fmtPct(risk, 1)}</td><td>${fmtNum(credit * 10000, 0)} bp</td></tr>`;
    }).join("");
    q("#br-tab").innerHTML = `<table style="width:100%;border-collapse:collapse;font-size:13px;margin:8px 0"><tr><th>${T("层", "Layer")}</th><th>${T("累计索取权（百万美元）", "Cumulative claims ($M)")}</th><th>${T("BTC 评级", "BTC Rating")}</th><th>${T("地板价", "Floor price")}</th><th>${T("可跌", "Can fall")}</th><th>${T("久期", "Duration")}</th><th>BTC Risk</th><th>BTC Credit</th></tr>${rows}</table>`;

    // Orange-F 层的公式读数（BTC 评级 → 地板价 → BTC Credit）
    const fi = cov.findIndex((c) => c.name === "Orange-F");
    const fc = cov[fi], fDur = layers[fi].dur;
    const fRisk = btcRiskProb(fc.coverage, mu, sig, fDur);
    const fReadout = [
      tex(String.raw`\text{BTC Rating}_{\text{F}} = \frac{${texv(fmtNum(reserve, 0))}}{${texv(fmtNum(fc.cum, 0))}} = \mathbf{${texv(fmtNum(fc.coverage, 2))}}\times`),
      tex(String.raw`\text{${T("地板价", "Floor price")}} = \frac{${texv(fmtUsd(s.px))}}{${texv(fmtNum(fc.coverage, 2))}} = ${texv(fmtUsd(btcFloorPrice(s.px, fc.coverage)))}`),
      tex(String.raw`\text{BTC Credit} = \frac{-\ln(1 - ${texv(fmtPct(fRisk, 1))})}{${fDur}} \approx ${texv(fmtNum(btcCredit(fRisk, fDur) * 10000, 0))}\ \text{bp}`),
    ].join(T("；", "; "));
    const strf = btcRiskProb(6.2, 0.10, 0.45, 11.1);
    const strc = btcRiskProb(5.74, 0.10, 0.40, 8.1);
    const lines = [];
    lines.push(`${tex(String.raw`\text{${T("BTC 储备", "BTC Reserve")}} = 10{,}000 \times ${texv(fmtUsd(s.px))} = \mathbf{${texv(fmtUsd(reserve))}\text{M}}`)}${s.net ? T("；3,000 万现金先抵掉可转债（Strategy 的计算桥做法）", "; $30M of cash first offsets the converts (as in Strategy's bridge)") : ""}`);
    lines.push(`Orange-F${T("：", ": ")}${fReadout}`);
    lines.push(`${T("复算 Strategy：STRF（6.2 倍、11.1 年、ARR 10%、波动率 45%）→ BTC Credit ", "Reproducing Strategy: STRF (6.2x, 11.1 yrs, 10% ARR, 45% vol) → BTC Credit ")}<b>${fmtNum(btcCredit(strf, 11.1) * 10000, 0)} bp</b>${T("（公布 108）；STRC（5.74 倍、8.1 年、10%、40%）→ ", " (published 108); STRC (5.74x, 8.1 yrs, 10%, 40%) → ")}<b>${fmtNum(btcCredit(strc, 8.1) * 10000, 0)} bp</b>${T("（公布 59）", " (published 59)")}`);
    const worst = cov[cov.length - 1];
    lines.push(worst.coverage < 1
      ? `<span class="bad">${T("最劣后层覆盖已低于 1 倍：清算时它拿不全。但注意——优先股没有追保或强制清算权，什么也不会自动发生。", "The most junior layer is below 1x: in a wind-down it wouldn't be paid in full. Note, though, that preferreds have no margin-call or liquidation rights; nothing happens automatically.")}</span>`
      : `<span class="ok">${T("各层覆盖均 ≥ 1 倍。记住：倍数按屏幕价格计，没有扣除变现折价与未来的股息消耗。", "Every layer is covered ≥ 1x. Remember: multiples use screen prices, with no liquidation discount and no future dividend drain.")}</span>`);
    q("#br-log").innerHTML = lines.map((l) => `<div>${l}</div>`).join("");
  }

  paint();
}
