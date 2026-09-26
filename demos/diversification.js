// 交互演示：两资产分散沙盘——调两项资产的收益、波动率、相关性与权重，
// 实时看组合波动率、预期收益、夏普比率与各自的风险贡献；再用“N 只等权”面板看系统性风险的地板。
import { port2Vol, sharpe, fmtPct, clamp } from "./_fin.js";
import { lineChart, chartBlock } from "./_chart.js";

export default function mount(root, lang) {
  const en = lang === "en";
  const T = (zh, e) => (en ? e : zh);

  const S = { m1: 6.8, s1: 10.5, m2: 30, s2: 60, rho: 0.3, w2: 5, rf: 3, n: 10, rhoN: 0.3, sN: 20 };
  const presets = [
    { k: "btc", label: T("60/40 组合 + 一小口比特币", "60/40 portfolio + a Bitcoin slice"), v: { m1: 6.8, s1: 10.5, m2: 30, s2: 60, rho: 0.3, w2: 5 } },
    { k: "sb", label: T("股票 + 债券（ρ = 0.2）", "Stocks + bonds (ρ = 0.2)"), v: { m1: 8, s1: 16, m2: 5, s2: 7, rho: 0.2, w2: 40 } },
    { k: "sb22", label: T("股票 + 债券（2022 式 ρ = 0.6）", "Stocks + bonds (2022-style ρ = 0.6)"), v: { m1: 8, s1: 16, m2: 5, s2: 7, rho: 0.6, w2: 40 } },
    { k: "ui", label: T("雨伞 + 冰淇淋（ρ = −1）", "Umbrellas + ice cream (ρ = −1)"), v: { m1: 8, s1: 20, m2: 8, s2: 20, rho: -1, w2: 50 } },
  ];

  const sl = (id, label, min, max, step, unit) => `
    <div class="demo-block">
      <label class="demo-label">${label}${T("：", ": ")}<b id="dv-v-${id}"></b>${unit}</label>
      <input class="demo-slider" type="range" id="dv-s-${id}" min="${min}" max="${max}" step="${step}" />
    </div>`;

  root.innerHTML = `
    <div class="demo">
      <div class="demo-head">${T("🧺 分散沙盘：相关性怎么让风险“凭空消失”", "🧺 Diversification sandbox: how correlation makes risk disappear")}</div>
      <div class="demo-block">
        <div class="demo-label">${T("一键场景（均为教学假设，不是预测）", "Quick scenarios (teaching assumptions, not forecasts)")}</div>
        <div class="demo-btns" id="dv-presets">${presets.map((p) => `<button class="demo-btn" data-k="${p.k}">${p.label}</button>`).join("")}</div>
      </div>
      <div class="demo-grid">
        ${sl("m1", T("资产 A 预期收益", "Asset A expected return"), -5, 40, 0.1, "%")}
        ${sl("s1", T("资产 A 波动率", "Asset A volatility"), 1, 100, 0.5, "%")}
        ${sl("m2", T("资产 B 预期收益", "Asset B expected return"), -5, 40, 0.1, "%")}
        ${sl("s2", T("资产 B 波动率", "Asset B volatility"), 1, 100, 0.5, "%")}
        ${sl("rho", T("相关系数 ρ", "Correlation ρ"), -1, 1, 0.05, "")}
        ${sl("w2", T("资产 B 的权重", "Weight in asset B"), 0, 100, 1, "%")}
      </div>
      <div class="stat-row">
        <div class="stat"><div class="k">${T("组合预期收益", "Portfolio return")}</div><div class="v" id="dv-ret">–</div></div>
        <div class="stat"><div class="k">${T("组合波动率", "Portfolio volatility")}</div><div class="v acc" id="dv-vol">–</div></div>
        <div class="stat"><div class="k">${T("若 ρ = 1（无分散）", "If ρ = 1 (no diversification)")}</div><div class="v" id="dv-avg">–</div></div>
        <div class="stat"><div class="k">${T("免费午餐（少掉的波动）", "Free lunch (volatility removed)")}</div><div class="v pos" id="dv-lunch">–</div></div>
        <div class="stat"><div class="k">${T("夏普比率（无风险 3%）", "Sharpe (3% risk-free)")}</div><div class="v" id="dv-sh">–</div></div>
      </div>
      <div class="demo-block">
        <div class="demo-label">${T("资金权重 vs 风险贡献", "Dollar weight vs risk contribution")}</div>
        <div id="dv-rc"></div>
      </div>
      <div id="dv-chart"></div>
      <div class="demo-block">
        <div class="demo-label">${T("另一个面板：等权持有 N 只相同资产", "Second panel: equal-weight N identical assets")}</div>
        <div class="demo-grid-3">
          ${sl("n", T("持有只数 N", "Holdings N"), 1, 100, 1, "")}
          ${sl("rhoN", T("两两相关系数", "Pairwise correlation"), 0, 1, 0.05, "")}
          ${sl("sN", T("单只波动率", "Single-asset volatility"), 5, 80, 1, "%")}
        </div>
        <div id="dv-n"></div>
      </div>
      <div class="demo-log" id="dv-log"></div>
      <p class="demo-tip">${T(
        "先点“60/40 组合 + 一小口比特币”：5% 的权重只让组合波动率上升不到 1 个百分点，但风险贡献条比资金权重条长得多——这才是你真正押的分量。再把 ρ 拖到 0.8，看午餐怎么变小；点“雨伞 + 冰淇淋”，把权重拖到 50%，波动率归零而收益不变。最后在 N 面板里把 N 拉到 100：风险停在 σ×√ρ 的地板上，再多也分不掉。",
        "Start with “60/40 portfolio + a Bitcoin slice”: a 5% weight lifts portfolio volatility by less than one point, yet its risk-contribution bar is far longer than its dollar-weight bar — that's what you're really betting. Drag ρ up to 0.8 and watch the lunch shrink. Click “Umbrellas + ice cream” and set the weight to 50%: volatility hits zero while return stays put. Finally push N to 100 in the second panel: risk stalls at the σ×√ρ floor and no amount of extra holdings removes it."
      )}</p>
    </div>`;

  const q = (s) => root.querySelector(s);
  const keys = ["m1", "s1", "m2", "s2", "rho", "w2", "n", "rhoN", "sN"];

  function bar(label, pct, color, valText) {
    return `<div class="bar2"><span class="lab">${label}</span><div class="track"><div class="fill" style="width:${clamp(pct * 100, 0, 100)}%;background:${color}"></div></div><span class="val">${valText || fmtPct(pct, 1)}</span></div>`;
  }

  function paint() {
    keys.forEach((k) => { q(`#dv-s-${k}`).value = S[k]; q(`#dv-v-${k}`).textContent = k === "rho" || k === "rhoN" ? Number(S[k]).toFixed(2) : S[k]; });
    const s1 = S.s1 / 100, s2 = S.s2 / 100, m1 = S.m1 / 100, m2 = S.m2 / 100, w2 = S.w2 / 100, w1 = 1 - w2, rho = S.rho;
    // port2Vol(w, s1, s2, rho) —— w 为第一项资产（A）的权重
    const vol = port2Vol(w1, s1, s2, rho);
    const ret = w1 * m1 + w2 * m2;
    const avg = w1 * s1 + w2 * s2;
    q("#dv-ret").textContent = fmtPct(ret, 2);
    q("#dv-vol").textContent = fmtPct(vol, 2);
    q("#dv-avg").textContent = fmtPct(avg, 2);
    q("#dv-lunch").textContent = fmtPct(avg - vol, 2);
    const sh = sharpe(ret, S.rf / 100, vol);
    q("#dv-sh").textContent = isFinite(sh) ? sh.toFixed(2) : "∞";

    // 风险贡献：RC_i = w_i × Cov(i, P) / Var(P)
    const V = vol * vol;
    const rcA = V > 1e-12 ? (w1 * w1 * s1 * s1 + w1 * w2 * rho * s1 * s2) / V : NaN;
    const rcB = V > 1e-12 ? 1 - rcA : NaN;
    q("#dv-rc").innerHTML = V > 1e-12
      ? bar(T("A 的资金权重", "A dollar weight"), w1, "var(--blue)") + bar(T("A 的风险贡献", "A risk contribution"), rcA, "var(--blue)")
        + bar(T("B 的资金权重", "B dollar weight"), w2, "var(--btc)") + bar(T("B 的风险贡献", "B risk contribution"), rcB, "var(--btc)")
      : `<div class="demo-meta">${T("组合波动率为零：两者完全对冲，风险贡献无定义。", "Portfolio volatility is zero: the two assets hedge each other perfectly, so risk contribution is undefined.")}</div>`;

    const ch = lineChart({
      fns: [
        { f: (x) => port2Vol(1 - x / 100, s1, s2, rho) * 100, cls: "line" },
        { f: (x) => ((1 - x / 100) * s1 + (x / 100) * s2) * 100, cls: "line3" },
        { f: (x) => ((1 - x / 100) * m1 + (x / 100) * m2) * 100, cls: "line4" },
      ],
      lo: 0, hi: 100, xlabel: T("资产 B 的权重 %", "weight in asset B, %"), markerX: S.w2, markerLabel: T("当前", "now"), forceZero: true, uid: "dv",
    });
    q("#dv-chart").innerHTML = chartBlock(ch, [
      ["var(--orange)", T("组合波动率 %", "portfolio volatility %")],
      ["var(--red)", T("波动率加权平均（ρ = 1 时）%", "weighted-average volatility (ρ = 1) %")],
      ["var(--green)", T("组合预期收益 %", "portfolio expected return %")],
    ]);

    // 找最低波动率的权重
    let best = 0, bestV = Infinity;
    for (let i = 0; i <= 100; i++) { const v = port2Vol(1 - i / 100, s1, s2, rho); if (v < bestV) { bestV = v; best = i; } }

    // N 资产面板
    const sN = S.sN / 100, rN = S.rhoN;
    const volN = (n) => sN * Math.sqrt(rN + (1 - rN) / n);
    const floor = sN * Math.sqrt(rN);
    const ns = [1, 2, 5, 10, 30, S.n].filter((v, i, a) => a.indexOf(v) === i).sort((a, b) => a - b);
    q("#dv-n").innerHTML = ns.map((n) => bar(`N = ${n}`, volN(n) / sN, n === S.n ? "var(--orange)" : "var(--blue)", fmtPct(volN(n), 1))).join("")
      + `<div class="demo-meta">${T("地板（N → ∞）", "Floor (N → ∞)")}: σ×√ρ = ${fmtPct(floor, 1)} · ${T("已消除可分散风险的", "share of diversifiable risk removed")} ${fmtPct(sN > floor ? (sN - volN(S.n)) / (sN - floor) : 1, 0)}</div>`;

    const lines = [];
    lines.push(`${T("最低波动率组合：B 占", "Minimum-volatility mix: B at")} ${best}%${T("，波动率", ", volatility")} ${fmtPct(bestV, 2)}`);
    if (rho >= 0.99) lines.push(`<span class="warn">${T("ρ ≈ 1：组合波动率等于加权平均，分散毫无作用。", "ρ ≈ 1: portfolio volatility equals the weighted average; diversification does nothing.")}</span>`);
    else lines.push(`<span class="ok">${T("只要 ρ < 1，组合波动率就低于加权平均——少掉的", "Whenever ρ < 1, portfolio volatility is below the weighted average — the")} ${fmtPct(avg - vol, 2)} ${T("就是免费午餐。", "gap is the free lunch.")}</span>`);
    if (isFinite(rcB) && w2 > 0 && rcB > 1.8 * w2) lines.push(`<span class="bad">${T("B 的风险贡献是其资金权重的", "B's risk contribution is")} ${(rcB / w2).toFixed(1)} ${T("倍：小仓位，大风险分量。", "× its dollar weight: small position, big share of risk.")}</span>`);
    q("#dv-log").innerHTML = lines.map((l) => `<div>${l}</div>`).join("");
  }

  keys.forEach((k) => q(`#dv-s-${k}`).addEventListener("input", (ev) => {
    S[k] = +ev.target.value; paint();
    root.querySelectorAll("#dv-presets .demo-btn").forEach((b) => b.classList.remove("active"));
  }));
  root.querySelectorAll("#dv-presets .demo-btn").forEach((b) => b.addEventListener("click", () => {
    const pr = presets.find((x) => x.k === b.dataset.k); Object.assign(S, pr.v); paint();
    root.querySelectorAll("#dv-presets .demo-btn").forEach((x) => x.classList.toggle("active", x === b));
  }));
  paint();
  q('#dv-presets .demo-btn[data-k="btc"]').classList.add("active");
}
