// 交互演示：波动实验室——
// 上半部分：用可复现的随机路径模拟 4 年的每日价格（比特币式高波动 vs 股票式低波动，同样的平均收益），
// 算出已实现波动率、最大回撤、复利年化，并一次跑 300 条路径，看“波动拖累”与深度回撤的频率；
// 下半部分：把比特币放进一个传统组合，用 port2Vol 算组合波动，并算出比特币占总风险的比例。
import { stdev, maxDrawdown, rng, randn, port2Vol, fmtPct, fmtNum, tex } from "./_fin.js";
import { lineChart, chartBlock } from "./_chart.js";

const DAYS = 365 * 4;
const DT = 1 / 365;

// 按几何布朗运动生成每日价格；mu 为年化“算术”期望收益，vol 为年化波动率
function path(rand, mu, vol) {
  const px = [100], lr = [];
  let p = 100;
  for (let d = 1; d <= DAYS; d++) {
    const r = (mu - 0.5 * vol * vol) * DT + vol * Math.sqrt(DT) * randn(rand);
    p *= Math.exp(r); px.push(p); lr.push(r);
  }
  return { px, lr };
}

export default function mount(root, lang) {
  const en = lang === "en";
  const T = (zh, e) => (en ? e : zh);
  const COLON = T("：", ": ");
  const st = { vol: 0.55, mu: 0.15, seed: 7, w: 0.05, bvol: 0.55, tvol: 0.10, rho: 0.3 };

  const slider = (id, label, min, max, step, val) => `
    <div class="demo-block">
      <label class="demo-label">${label}${COLON}<b id="${id}-v"></b></label>
      <input class="demo-slider" id="${id}" type="range" min="${min}" max="${max}" step="${step}" value="${val}">
    </div>`;

  root.innerHTML = `
    <div class="demo">
      <div class="demo-head">${T("🎢 波动实验室：同样的平均收益，不同的颠簸", "🎢 Volatility lab: same average return, different bumps")}</div>
      <div class="demo-row">
        <span class="demo-label">${T("快速选择比特币的波动时代", "Quick-pick a bitcoin volatility era")}${COLON}</span>
        <div class="demo-seg" id="bvo-era">
          <button data-v="1.1">${T("早年 约 110%", "Early years ~110%")}</button>
          <button data-v="0.75">${T("2017–22 约 75%", "2017–22 ~75%")}</button>
          <button data-v="0.55" class="on">${T("近年 约 55%", "Recent ~55%")}</button>
          <button data-v="0.45">${T("更成熟 约 45%", "More mature ~45%")}</button>
        </div>
      </div>
      <div class="demo-grid">
        ${slider("bvo-vol", T("比特币式资产的年化波动", "Bitcoin-like asset: annualized volatility"), 0.15, 1.3, 0.05, st.vol)}
        ${slider("bvo-mu", T("两个资产共同的年化算术平均收益", "Shared annual arithmetic average return"), 0, 0.6, 0.01, st.mu)}
      </div>
      <div class="stat-row">
        <div class="stat"><div class="k">${T("已实现波动（这条路径）", "Realized vol (this path)")}</div><div class="v" id="bvo-rv">–</div></div>
        <div class="stat"><div class="k">${T("最大回撤", "Max drawdown")}</div><div class="v neg" id="bvo-mdd">–</div></div>
        <div class="stat"><div class="k">${T("4 年复利年化", "4-year compounded annual return")}</div><div class="v" id="bvo-cagr">–</div></div>
        <div class="stat"><div class="k">${T("理论波动拖累 ", "Theoretical drag ")}${tex(String.raw`\tfrac{\sigma^{2}}{2}`)}</div><div class="v acc" id="bvo-drag">–</div></div>
      </div>
      <div id="bvo-chart"></div>
      <div class="demo-btns">
        <button class="demo-btn" id="bvo-new">${T("换一条路径", "New path")}</button>
        <button class="demo-btn" id="bvo-mc">${T("一次跑 300 条路径", "Run 300 paths")}</button>
      </div>
      <div class="demo-log" id="bvo-mclog"></div>
      <div class="demo-label" style="margin-top:14px">${T("把比特币放进组合：按金额配置，按风险计算", "Put bitcoin in a portfolio: allocate by dollars, measure by risk")}</div>
      <div class="demo-grid">
        ${slider("bvo-w", T("比特币仓位", "Bitcoin weight"), 0, 0.3, 0.01, st.w)}
        ${slider("bvo-bvol", T("比特币波动", "Bitcoin volatility"), 0.2, 1.0, 0.05, st.bvol)}
        ${slider("bvo-tvol", T("传统组合波动", "Traditional portfolio volatility"), 0.05, 0.2, 0.01, st.tvol)}
        ${slider("bvo-rho", T("两者相关性", "Correlation between them"), -0.3, 0.9, 0.05, st.rho)}
      </div>
      <div class="stat-row">
        <div class="stat"><div class="k">${T("组合波动", "Portfolio volatility")}</div><div class="v" id="bvo-pv">–</div></div>
        <div class="stat"><div class="k">${T("比特币占资金", "Bitcoin share of capital")}</div><div class="v" id="bvo-cap">–</div></div>
        <div class="stat"><div class="k">${T("比特币占风险", "Bitcoin share of risk")}</div><div class="v acc" id="bvo-rc">–</div></div>
      </div>
      <div id="bvo-bars"></div>
      <p class="demo-tip">${T(
        `两个资产的平均收益被设成完全一样，只有波动不同。先点几次“换一条路径”：比特币式资产的终点有时远高、有时远低。再点“跑 300 条路径”：它的中位数结局明显不如低波动资产——这就是 ${tex(String.raw`\dfrac{\sigma^{2}}{2}`)} 的波动拖累；再看“回撤超过 50% 的路径比例”。最后在下半部分只放 5% 的比特币，看它占了多少风险；把相关性拖到 0.8（危机中常见），风险占比还会再跳一截。`,
        `Both assets are given exactly the same average return; only volatility differs. Click “New path” a few times: the bitcoin-like asset sometimes ends far higher and sometimes far lower. Then “Run 300 paths”: its median outcome is clearly worse than the low-vol asset's — that's the ${tex(String.raw`\dfrac{\sigma^{2}}{2}`)} volatility drag — and note the share of paths with a drawdown worse than 50%. Finally, in the lower half, hold just 5% bitcoin and see how much of the risk it carries; drag correlation up to 0.8 (common in a crisis) and its risk share jumps again.`
      )}</p>
    </div>`;

  const $ = (id) => root.querySelector("#" + id);
  const STOCK_VOL = 0.17;

  function paintPath() {
    $("bvo-vol-v").textContent = fmtPct(st.vol, 0);
    $("bvo-mu-v").textContent = fmtPct(st.mu, 0);
    const a = path(rng(st.seed), st.mu, st.vol);
    const b = path(rng(st.seed + 1000), st.mu, STOCK_VOL);
    const rv = stdev(a.lr) * Math.sqrt(365);
    const mdd = maxDrawdown(a.px);
    const cagr = Math.pow(a.px[DAYS] / 100, 1 / 4) - 1;
    $("bvo-rv").textContent = fmtPct(rv, 1);
    $("bvo-mdd").textContent = fmtPct(mdd, 1);
    $("bvo-cagr").textContent = fmtPct(cagr, 1);
    $("bvo-cagr").className = "v " + (cagr >= 0 ? "pos" : "neg");
    $("bvo-drag").textContent = "−" + fmtPct(st.vol * st.vol / 2, 1) + T("/年", "/yr");
    const pick = (arr) => (x) => arr[Math.max(0, Math.min(DAYS, Math.round(x * 365)))];
    const ch = lineChart({
      fns: [{ f: pick(a.px), cls: "line5" }, { f: pick(b.px), cls: "line2" }, { f: () => 100, cls: "line3" }],
      lo: 0, hi: 4, samples: 400, xlabel: T("年 · 起点为 100", "Years · starting at 100"), forceZero: true, uid: "bvo",
    });
    $("bvo-chart").innerHTML = chartBlock(ch, [
      ["var(--btc)", T("比特币式（高波动）", "Bitcoin-like (high vol)")],
      ["var(--blue)", T("股票式（波动 17%）", "Stock-like (17% vol)")],
      ["var(--red)", T("起点", "Start")],
    ]);
  }

  function runMC() {
    const N = 300, rand = rng(st.seed * 31 + 5);
    const endA = [], endB = [], mdds = [];
    for (let i = 0; i < N; i++) {
      const a = path(rand, st.mu, st.vol), b = path(rand, st.mu, STOCK_VOL);
      endA.push(a.px[DAYS]); endB.push(b.px[DAYS]); mdds.push(maxDrawdown(a.px));
    }
    const med = (arr) => { const s = [...arr].sort((x, y) => x - y); return s[Math.floor(s.length / 2)]; };
    const avg = (arr) => arr.reduce((s, x) => s + x, 0) / arr.length;
    const mA = med(endA), mB = med(endB);
    const deep = mdds.filter((d) => d < -0.5).length / N;
    const lossA = endA.filter((x) => x < 100).length / N;
    const lines = [];
    lines.push(`${T("平均终值：高波动", "Mean ending value: high-vol")} ${fmtNum(avg(endA), 0)} ${T("vs 低波动", "vs low-vol")} ${fmtNum(avg(endB), 0)} ${T("（两者理论期望相同）", "(same theoretical expectation)")}`);
    lines.push(`${T("中位数终值：高波动", "Median ending value: high-vol")} <b>${fmtNum(mA, 0)}</b> ${T("vs 低波动", "vs low-vol")} <b>${fmtNum(mB, 0)}</b> → ${T("中位数复利年化", "median compounded return")} ${fmtPct(Math.pow(mA / 100, 0.25) - 1, 1)} ${T("vs", "vs")} ${fmtPct(Math.pow(mB / 100, 0.25) - 1, 1)}`);
    lines.push(`<span class="${deep > 0.3 ? "bad" : "warn"}">${T("高波动资产在 4 年里出现超过 −50% 回撤的路径比例：", "Share of high-vol paths with a drawdown worse than −50% within 4 years: ")}${fmtPct(deep, 0)}${T("；4 年后仍亏损的比例：", "; share still losing money after 4 years: ")}${fmtPct(lossA, 0)}</span>`);
    $("bvo-mclog").innerHTML = lines.map((l) => `<div>${l}</div>`).join("");
  }

  function paintPort() {
    const { w, bvol, tvol, rho } = st;
    $("bvo-w-v").textContent = fmtPct(w, 0);
    $("bvo-bvol-v").textContent = fmtPct(bvol, 0);
    $("bvo-tvol-v").textContent = fmtPct(tvol, 0);
    $("bvo-rho-v").textContent = fmtNum(rho, 2);
    const sp = port2Vol(w, bvol, tvol, rho);
    const rc = sp > 0 ? (w * (w * bvol * bvol + (1 - w) * rho * bvol * tvol)) / (sp * sp) : 0;
    $("bvo-pv").textContent = fmtPct(sp, 2);
    $("bvo-cap").textContent = fmtPct(w, 0);
    $("bvo-rc").textContent = fmtPct(rc, 1);
    const bar = (lab, v, c) => `<div class="bar2"><span class="lab">${lab}</span><div class="track"><div class="fill" style="width:${Math.max(0, Math.min(100, v * 100)).toFixed(1)}%;background:${c}"></div></div><span class="val">${fmtPct(v, 1)}</span></div>`;
    $("bvo-bars").innerHTML = bar(T("资金占比", "Capital share"), w, "var(--orange)") + bar(T("风险占比", "Risk share"), rc, "var(--btc)");
  }

  const bindP = (id, key, fn) => $(id).addEventListener("input", (e) => { st[key] = +e.target.value; fn(); });
  bindP("bvo-vol", "vol", () => { $("bvo-mclog").innerHTML = ""; paintPath(); });
  bindP("bvo-mu", "mu", () => { $("bvo-mclog").innerHTML = ""; paintPath(); });
  ["w", "bvol", "tvol", "rho"].forEach((k) => bindP("bvo-" + k, k, paintPort));
  root.querySelectorAll("#bvo-era button").forEach((b) => b.addEventListener("click", () => {
    root.querySelectorAll("#bvo-era button").forEach((x) => x.classList.remove("on"));
    b.classList.add("on");
    st.vol = +b.dataset.v; $("bvo-vol").value = st.vol; $("bvo-mclog").innerHTML = ""; paintPath();
  }));
  $("bvo-new").addEventListener("click", () => { st.seed += 1; paintPath(); });
  $("bvo-mc").addEventListener("click", runMC);
  paintPath(); paintPort();
}
