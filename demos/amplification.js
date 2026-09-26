// 交互演示：放大倍数——(1) 一次比特币变动对净储备的放大，以及放大倍数本身怎么变；
// (2) 路径模拟：固定索取权（不调仓）vs 每月调仓维持初始放大倍数，看波动率拖累与股息拖累。
import { amplificationStrategy, amplification, striveAmpRatio, netReserve, rng, randn, fmtNum, fmtPct, fmtUsd, tex } from "./_fin.js";
import { lineChart, chartBlock } from "./_chart.js";

// 把格式化好的数字放进 LaTeX：千分位写成 {,}，$ 与 % 转义
const texv = (s) => String(s).replace(/\$/g, "\\$").replace(/,/g, "{,}").replace(/%/g, "\\%");

export default function mount(root, lang) {
  const en = lang === "en";
  const T = (zh, e) => (en ? e : zh);

  // 单位：百万美元；比特币价值 1,000 对应币价 10 万美元、10,000 BTC
  const STRUCT = {
    orange: { v: 1000, debt: 150, pref: 150, cash: 30, div: 15, zh: "橙子公司（可转债 + 优先股）", en: "Orange Corp (converts + preferred)" },
    strive: { v: 1000, debt: 0, pref: 504, cash: 126, div: 65.5, zh: "Strive 式（只用优先股，50.4%）", en: "Strive-like (preferred only, 50.4%)" },
    none: { v: 1000, debt: 0, pref: 0, cash: 0, div: 0, zh: "无杠杆", en: "Unlevered" },
  };
  let key = "orange";
  const s = { move: -50, vol: 45, seed: 7, divs: true };

  root.innerHTML = `
    <div class="demo">
      <div class="demo-head">${T("🔊 放大倍数实验室：一次冲击 + 一条路径", "🔊 Amplification lab: one shock + one path")}</div>
      <div class="demo-block"><div class="demo-seg" id="am-seg">${Object.keys(STRUCT).map((k) => `<button data-k="${k}" class="${k === key ? "on" : ""}">${en ? STRUCT[k].en : STRUCT[k].zh}</button>`).join("")}</div></div>
      <div class="demo-block">
        <label class="demo-label">${T("比特币一次性变动", "One-off bitcoin move")} <b id="am-v-move"></b></label>
        <input class="demo-slider" type="range" id="am-move" min="-80" max="200" step="1" value="${s.move}" />
      </div>
      <div class="stat-row" id="am-stats"></div>
      <div class="demo-log" id="am-log"></div>
      <div class="demo-block">
        <div class="demo-label">${T("路径模拟（4 年、按月、年化预期回报 10%）", "Path simulation (4 years, monthly, 10% expected annual return)")}</div>
        <div class="demo-grid">
          <div><label class="demo-label">${T("比特币年化波动率", "Bitcoin annual volatility")} <b id="am-v-vol"></b></label>
          <input class="demo-slider" type="range" id="am-vol" min="10" max="90" step="1" value="${s.vol}" /></div>
          <div class="demo-btns">
            <button class="demo-btn" id="am-seed">${T("换一条路径", "New path")}</button>
            <button class="demo-btn active" id="am-divs">${T("计入股息：开", "Dividends: on")}</button>
          </div>
        </div>
        <div id="am-chart"></div>
        <div class="demo-out" id="am-path"></div>
      </div>
      <p class="demo-tip">${T(
        "把一次性变动拖到 −50%：橙子公司的净储备跌 68.5%，放大倍数从 1.37 升到约 2.17——杠杆在最糟的时候最高。切到 Strive 式结构，同样的冲击伤得更重。然后在路径模拟里把波动率拉到 80%、多换几条路径：不调仓的固定索取权（橙色）通常跑赢每月调仓的恒定杠杆（红色）——拖累来自“高买低卖”，不是来自杠杆本身。",
        "Drag the one-off move to −50%: Orange Corp's Net Reserve falls 68.5% and amplification rises from 1.37 to about 2.17 — leverage peaks at the worst moment. Switch to the Strive-like structure and the same shock hurts more. Then push volatility to 80% in the path simulation and try several paths: fixed claims without rebalancing (orange) usually beat monthly rebalancing to constant leverage (red) — the drag comes from buying high and selling low, not from leverage itself."
      )}</p>
    </div>`;

  const q = (sel) => root.querySelector(sel);
  root.querySelectorAll("#am-seg button").forEach((b) => b.addEventListener("click", () => {
    key = b.dataset.k;
    root.querySelectorAll("#am-seg button").forEach((o) => o.classList.toggle("on", o === b));
    paint();
  }));
  q("#am-move").addEventListener("input", (e) => { s.move = +e.target.value; paint(); });
  q("#am-vol").addEventListener("input", (e) => { s.vol = +e.target.value; paint(); });
  q("#am-seed").addEventListener("click", () => { s.seed += 1; paint(); });
  q("#am-divs").addEventListener("click", (e) => {
    s.divs = !s.divs;
    e.target.classList.toggle("active", s.divs);
    e.target.textContent = s.divs ? T("计入股息：开", "Dividends: on") : T("计入股息：关", "Dividends: off");
    paint();
  });

  function paint() {
    const st = STRUCT[key];
    q("#am-v-move").textContent = (s.move > 0 ? "+" : "") + s.move + "%";
    q("#am-v-vol").textContent = s.vol + "%";

    const claims = st.debt + st.pref;
    const n0 = netReserve(st.v, st.debt, st.pref, st.cash);
    const a0 = amplificationStrategy(st.v, st.debt, st.pref, st.cash);
    const aSimple = amplification(st.v, claims);
    const ratio = striveAmpRatio(st.debt, st.pref, st.v);
    const v1 = st.v * (1 + s.move / 100);
    const n1 = netReserve(v1, st.debt, st.pref, st.cash);
    const a1 = n1 > 0 ? amplificationStrategy(v1, st.debt, st.pref, st.cash) : Infinity;
    const netChg = n1 / n0 - 1;

    q("#am-stats").innerHTML = [
      [T("Strategy 口径（期初）", "Strategy basis (start)"), fmtNum(a0, 2) + "x", "acc"],
      [T("简单口径（不计现金）", "Simple (no cash)"), isFinite(aSimple) ? fmtNum(aSimple, 2) + "x" : "∞", ""],
      [T("Strive 式比率", "Strive-style ratio"), fmtPct(ratio, 1), ""],
      [T("净储备变动", "Change in Net Reserve"), n1 > 0 ? fmtPct(netChg, 1) : T("归零", "wiped out"), netChg >= 0 ? "pos" : "neg"],
      [T("变动后放大倍数", "Amplification after"), n1 > 0 ? fmtNum(a1, 2) + "x" : "∞", a1 > a0 ? "neg" : "pos"],
    ].map(([k, v, c]) => `<div class="stat"><div class="k">${k}</div><div class="v ${c}">${v}</div></div>`).join("");

    const floorMove = st.v > 0 ? (claims - st.cash) / st.v - 1 : -1;
    const lines = [];
    lines.push(`${tex(String.raw`\text{${T("净储备", "Net Reserve")}} = ${texv(fmtNum(st.v, 0))} - ${texv(fmtNum(claims, 0))} + ${texv(fmtNum(st.cash, 0))} = \mathbf{${texv(fmtNum(n0, 0))}}`)} → ${tex(String.raw`${texv(fmtNum(v1, 0))} - ${texv(fmtNum(claims, 0))} + ${texv(fmtNum(st.cash, 0))} = \mathbf{${texv(fmtNum(n1, 0))}}`)}${T("（百万美元）", " ($M)")}`);
    const mv = s.move < 0 ? `(${s.move}\\%)` : `${s.move}\\%`;
    lines.push(`${T("检验：", "Check: ")}${tex(String.raw`${texv(fmtNum(a0, 3))} \times ${mv} = ${texv(fmtPct((a0 * s.move) / 100, 1))}`)}${T("，与净储备变动一致——对单次变动，放大是线性的；但变动后的放大倍数已经变成 ", ", matching the change in Net Reserve — for a single move amplification is linear; but afterwards it has become ")}${n1 > 0 ? fmtNum(a1, 2) + "x" : "∞"}${T("。", ".")}`);
    if (claims > 0) lines.push(`${T("比特币跌 ", "If bitcoin falls ")}<b>${fmtPct(-floorMove, 1)}</b>${T("，净储备归零（普通股的“地板”）。", ", Net Reserve hits zero (the common's floor).")}`);
    q("#am-log").innerHTML = lines.map((l) => `<div>${l}</div>`).join("");

    // 路径模拟：48 个月
    const N = 48, dt = 1 / 12, sig = s.vol / 100, mu = 0.10;
    const rand = rng(1000 + s.seed);
    const btc = [1], netA = [n0], netB = [n0];
    let V = st.v, nb = n0;
    const monthlyDiv = s.divs ? st.div / 12 : 0;
    let cashA = st.cash;
    for (let i = 1; i <= N; i++) {
      const r = Math.exp((mu - 0.5 * sig * sig) * dt + sig * Math.sqrt(dt) * randn(rand)) - 1;
      V *= 1 + r;
      cashA -= monthlyDiv; // 固定索取权：股息从现金/卖币中付出（以净值扣减表示）
      netA.push(V - claims + cashA);
      nb = nb * (1 + a0 * r) - monthlyDiv; // 恒定杠杆：每月调仓回 a0
      netB.push(nb);
      btc.push(V / st.v);
    }
    const idx = (arr) => (t) => arr[Math.max(0, Math.min(N, Math.round(t)))] / n0;
    const res = lineChart({
      fns: [
        { f: (t) => btc[Math.max(0, Math.min(N, Math.round(t)))], cls: "line2" },
        { f: idx(netA), cls: "line5" },
        { f: idx(netB), cls: "line3" },
      ],
      lo: 0, hi: N, samples: N, xlabel: T("月", "months"), forceZero: true, uid: "amc",
    });
    q("#am-chart").innerHTML = chartBlock(res, [["var(--blue)", T("比特币（以起点为 1）", "Bitcoin (indexed to 1 at start)")], ["var(--btc)", T("固定索取权的净储备", "Net Reserve, fixed claims")], ["var(--red)", T("每月调仓的恒定杠杆", "Constant leverage, rebalanced monthly")]]);
    const drag = 0.5 * a0 * (a0 - 1) * sig * sig;
    const fa = netA[N] / n0, fb = netB[N] / n0;
    q("#am-path").innerHTML = `${T("4 年后：比特币 ", "After 4 years: bitcoin ")}${fmtNum(btc[N], 2)}x${T("；固定索取权 ", "; fixed claims ")}<b>${fmtNum(fa, 2)}x</b>${T("；恒定杠杆 ", "; constant leverage ")}<b>${fmtNum(fb, 2)}x</b>${T("。理论上的调仓拖累 ",". Theoretical rebalancing drag ")}${tex(String.raw`\approx \tfrac{1}{2} \times L \times (L - 1) \times \sigma^{2} = \tfrac{1}{2} \times ${texv(fmtNum(a0, 2))} \times ${texv(fmtNum(a0 - 1, 2))} \times ${texv(fmtNum(sig, 2))}^{2} = ${texv(fmtPct(drag, 1))}`)}${T(" 每年", " a year")}${s.divs && st.div > 0 ? T("；股息另占净储备约 ", "; dividends take another ") + fmtPct(st.div / n0, 1) + T(" 每年", " of Net Reserve a year") : ""}${T("。", ".")}`;
  }

  paint();
}
