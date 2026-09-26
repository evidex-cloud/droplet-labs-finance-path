// 交互演示：组合构建实验台——五类资产（股票、中期债、长期国债、黄金、比特币），
// 一键套用 60/40、风险平价、全天候（简化版）等配方，切换“相关性体制”，加杠杆与借款利率，
// 看组合波动率、夏普比率、各资产风险贡献，以及在 2022 式与 2008 式情景下的损益。
import { sharpe, fmtPct, clamp, tex } from "./_fin.js";

export default function mount(root, lang) {
  const en = lang === "en";
  const T = (zh, e) => (en ? e : zh);

  // 教学假设（不是预测）
  const A = [
    { k: "stk", n: T("股票", "Stocks"), mu: 0.08, sd: 0.16, c: "var(--orange)", s22: -0.18, s08: -0.37 },
    { k: "bnd", n: T("中期债券", "Intermediate bonds"), mu: 0.05, sd: 0.07, c: "var(--blue)", s22: -0.13, s08: 0.05 },
    { k: "lt", n: T("长期国债", "Long Treasuries"), mu: 0.055, sd: 0.13, c: "var(--green)", s22: -0.30, s08: 0.25 },
    { k: "gld", n: T("黄金", "Gold"), mu: 0.05, sd: 0.15, c: "var(--muted)", s22: 0.0, s08: 0.05 },
    { k: "btc", n: T("比特币", "Bitcoin"), mu: 0.15, sd: 0.60, c: "var(--btc)", s22: -0.64, s08: -0.50 },
  ];
  // 相关性矩阵（顺序同上）
  const REG = {
    base: [[1, .2, .1, 0, .3], [.2, 1, .9, .2, 0], [.1, .9, 1, .2, 0], [0, .2, .2, 1, .1], [.3, 0, 0, .1, 1]],
    dis: [[1, -.2, -.3, 0, .3], [-.2, 1, .9, .2, 0], [-.3, .9, 1, .2, 0], [0, .2, .2, 1, .1], [.3, 0, 0, .1, 1]],
    inf: [[1, .5, .5, .1, .6], [.5, 1, .95, .3, .3], [.5, .95, 1, .3, .3], [.1, .3, .3, 1, .2], [.6, .3, .3, .2, 1]],
  };
  const regLabel = {
    base: T("教学基准（股债 ρ = 0.2）", "Teaching baseline (stock–bond ρ = 0.2)"),
    dis: T("低通胀体制（股债 ρ = −0.2）", "Low-inflation regime (stock–bond ρ = −0.2)"),
    inf: T("高通胀体制（2022 式，股债 ρ = 0.5）", "High-inflation regime (2022-style, stock–bond ρ = 0.5)"),
  };

  const invVol = (idx) => { const w = [0, 0, 0, 0, 0]; let s = 0; idx.forEach((i) => { w[i] = 1 / A[i].sd; s += w[i]; }); return w.map((x) => Math.round((x / s) * 1000) / 10); };
  const presets = [
    { k: "s100", label: T("100% 股票", "100% stocks"), w: [100, 0, 0, 0, 0], lev: 1 },
    { k: "6040", label: "60/40", w: [60, 40, 0, 0, 0], lev: 1 },
    { k: "rp", label: T("风险平价（股/债）", "Risk parity (stocks/bonds)"), w: invVol([0, 1]), lev: 1 },
    { k: "rpl", label: `${T("风险平价", "Risk parity")} ${tex(String.raw`1.4\times`)} ${T("杠杆", "leverage")}`, w: invVol([0, 1]), lev: 1.4 },
    { k: "aw", label: T("全天候（大众简化版）", "All Weather (popular simplified)"), w: [30, 15, 40, 15, 0], lev: 1 },
    { k: "btc", label: T("60/40 + 3% 比特币", "60/40 + 3% Bitcoin"), w: [58.2, 38.8, 0, 0, 3], lev: 1 },
  ];

  const S = { w: [60, 40, 0, 0, 0], lev: 1, rb: 3, rf: 3, reg: "base", btcMu: 15 };

  root.innerHTML = `
    <div class="demo">
      <div class="demo-head">${T("🏗️ 组合构建实验台：分配的是风险，不是钱", "🏗️ Portfolio lab: you're allocating risk, not money")}</div>
      <div class="demo-block">
        <div class="demo-label">${T("一键配方", "Recipes")}</div>
        <div class="demo-btns" id="pc-presets">${presets.map((p) => `<button class="demo-btn" data-k="${p.k}">${p.label}</button>`).join("")}</div>
      </div>
      <div class="demo-block">
        <div class="demo-label">${T("相关性体制", "Correlation regime")}</div>
        <div class="demo-seg" id="pc-reg">${Object.keys(REG).map((k) => `<button data-v="${k}">${regLabel[k]}</button>`).join("")}</div>
      </div>
      <div class="demo-grid">
        ${A.map((a, i) => `<div class="demo-block"><label class="demo-label">${a.n} (σ ${fmtPct(a.sd, 0)}) ${T("原始权重", "raw weight")}${T("：", ": ")}<b id="pc-v-${i}"></b></label><input class="demo-slider" type="range" id="pc-s-${i}" min="0" max="100" step="0.5" /></div>`).join("")}
        <div class="demo-block"><label class="demo-label">${T("杠杆倍数", "Leverage")}${T("：", ": ")}<b id="pc-v-lev"></b>×</label><input class="demo-slider" type="range" id="pc-s-lev" min="1" max="2.5" step="0.05" /></div>
        <div class="demo-block"><label class="demo-label">${T("借款利率", "Borrowing rate")}${T("：", ": ")}<b id="pc-v-rb"></b>%</label><input class="demo-slider" type="range" id="pc-s-rb" min="0" max="10" step="0.25" /></div>
        <div class="demo-block"><label class="demo-label">${T("比特币预期收益（你的假设）", "Bitcoin expected return (your assumption)")}${T("：", ": ")}<b id="pc-v-btcMu"></b>%</label><input class="demo-slider" type="range" id="pc-s-btcMu" min="-20" max="60" step="1" /></div>
      </div>
      <div class="stat-row">
        <div class="stat"><div class="k">${T("预期收益（扣借款成本）", "Expected return (net of borrowing)")}</div><div class="v" id="pc-ret">–</div></div>
        <div class="stat"><div class="k">${T("组合波动率", "Portfolio volatility")}</div><div class="v acc" id="pc-vol">–</div></div>
        <div class="stat"><div class="k">${T("夏普比率（无风险 3%）", "Sharpe (3% risk-free)")}</div><div class="v" id="pc-sh">–</div></div>
        <div class="stat"><div class="k">${T("2022 式情景", "2022-style scenario")}</div><div class="v" id="pc-s22">–</div></div>
        <div class="stat"><div class="k">${T("2008 式情景", "2008-style scenario")}</div><div class="v" id="pc-s08">–</div></div>
      </div>
      <div class="demo-block">
        <div class="demo-label">${T("每类资产：资金权重（浅）vs 风险贡献（深）", "Each asset: dollar weight (light) vs risk contribution (dark)")}</div>
        <div id="pc-rc"></div>
      </div>
      <div class="demo-log" id="pc-log"></div>
      <p class="demo-meta">${T(
        "教学假设：股票 8%/16%，中期债 5%/7%，长期国债 5.5%/13%，黄金 5%/15%，比特币 σ 60%（收益由你设定）。情景损益为约数：2022 式——股 −18%、中期债 −13%、长债 −30%、黄金 0%、比特币 −64%；2008 式——股 −37%、中期债 +5%、长债 +25%、黄金 +5%，比特币当时不存在，按假设 −50% 计。不构成投资建议。",
        "Teaching assumptions: stocks 8%/16%, intermediate bonds 5%/7%, long Treasuries 5.5%/13%, gold 5%/15%, Bitcoin σ 60% (return is your call). Scenario P&L is approximate: 2022-style — stocks −18%, intermediate bonds −13%, long bonds −30%, gold 0%, Bitcoin −64%; 2008-style — stocks −37%, intermediate bonds +5%, long bonds +25%, gold +5%, and Bitcoin (which didn't exist yet) assumed at −50%. Not investment advice."
      )}</p>
      <p class="demo-tip">${T(
        `先点“60/40”：股票的深色条（风险贡献）远长于浅色条（资金权重）。再点“风险平价”，两条深色条变得一样长；点“${tex(String.raw`1.4\times`)} 杠杆”，波动率回到约 10.5%，然后把借款利率拉到 6%，看杠杆的好处怎么消失。最后切到“高通胀体制”，看 2022 式情景里哪些配方两条腿一起断——那一栏比波动率更诚实。`,
        `Click “60/40” first: the stocks' dark bar (risk contribution) dwarfs its light bar (dollar weight). Then “Risk parity”: the dark bars even out. Try “${tex(String.raw`1.4\times`)} leverage”: volatility returns to about 10.5% — now push the borrowing rate to 6% and watch the benefit evaporate. Finally switch to the high-inflation regime and look at the 2022-style column: it shows which recipes break on both legs at once, more honestly than volatility does.`
      )}</p>
    </div>`;

  const q = (s) => root.querySelector(s);

  function compute() {
    const raw = S.w, tot = raw.reduce((s, x) => s + x, 0) || 1;
    const w = raw.map((x) => x / tot);
    const mu = A.map((a, i) => (i === 4 ? S.btcMu / 100 : a.mu));
    const R = REG[S.reg];
    const cov = (i, j) => R[i][j] * A[i].sd * A[j].sd;
    let V = 0; const mc = [0, 0, 0, 0, 0];
    for (let i = 0; i < 5; i++) for (let j = 0; j < 5; j++) { V += w[i] * w[j] * cov(i, j); mc[i] += w[j] * cov(i, j); }
    const vol0 = Math.sqrt(Math.max(V, 0));
    const rc = w.map((wi, i) => (V > 1e-12 ? (wi * mc[i]) / V : 0));
    const ret0 = w.reduce((s, wi, i) => s + wi * mu[i], 0);
    const L = S.lev, rb = S.rb / 100;
    const ret = L * ret0 - (L - 1) * rb, vol = L * vol0;
    const sc = (key) => L * w.reduce((s, wi, i) => s + wi * A[i][key], 0) - (L - 1) * rb;
    return { w, rc, ret, vol, s22: sc("s22"), s08: sc("s08"), ret0, vol0 };
  }

  function paint() {
    A.forEach((a, i) => { q(`#pc-s-${i}`).value = S.w[i]; });
    ["lev", "rb", "btcMu"].forEach((k) => { q(`#pc-s-${k}`).value = S[k]; q(`#pc-v-${k}`).textContent = k === "lev" ? Number(S[k]).toFixed(2) : S[k]; });
    root.querySelectorAll("#pc-reg button").forEach((b) => b.classList.toggle("on", b.dataset.v === S.reg));
    const r = compute();
    A.forEach((a, i) => { q(`#pc-v-${i}`).textContent = S.w[i] + T(" → 实际 ", " → actual ") + fmtPct(r.w[i], 1); });
    q("#pc-ret").textContent = fmtPct(r.ret, 2);
    q("#pc-vol").textContent = fmtPct(r.vol, 2);
    const sh = sharpe(r.ret, S.rf / 100, r.vol);
    q("#pc-sh").textContent = isFinite(sh) ? sh.toFixed(2) : "–";
    const put = (id, v) => { const el = q(id); el.textContent = (v >= 0 ? "+" : "") + fmtPct(v, 1); el.className = "v " + (v >= 0 ? "pos" : "neg"); };
    put("#pc-s22", r.s22); put("#pc-s08", r.s08);

    q("#pc-rc").innerHTML = A.map((a, i) => r.w[i] > 0 || Math.abs(r.rc[i]) > 0.0005 ? `
      <div class="bar2"><span class="lab">${a.n} · ${T("资金", "$")}</span><div class="track"><div class="fill" style="width:${clamp(r.w[i] * 100, 0, 100)}%;background:${a.c};opacity:.4"></div></div><span class="val">${fmtPct(r.w[i], 1)}</span></div>
      <div class="bar2"><span class="lab">${a.n} · ${T("风险", "risk")}</span><div class="track"><div class="fill" style="width:${clamp(r.rc[i] * 100, 0, 100)}%;background:${a.c}"></div></div><span class="val">${fmtPct(r.rc[i], 1)}</span></div>` : "").join("");

    const lines = [];
    const top = r.rc.indexOf(Math.max(...r.rc));
    if (r.rc[top] > 0.7) lines.push(`<span class="warn">${T("风险高度集中：", "Risk is concentrated: ")}${A[top].n} ${T("贡献了", "contributes")} ${fmtPct(r.rc[top], 0)} ${T("的组合风险。", "of portfolio risk.")}</span>`);
    else lines.push(`<span class="ok">${T("风险来源较分散：最大的单一来源是", "Risk sources are fairly balanced: the largest single source is")} ${A[top].n} (${fmtPct(r.rc[top], 0)}).</span>`);
    if (S.lev > 1) {
      const gain = r.ret - r.ret0;
      lines.push(`${T("杠杆", "Leverage")} ${S.lev.toFixed(2)}× ${T("把收益从", "moves return from")} ${fmtPct(r.ret0, 2)} ${T("变成", "to")} ${fmtPct(r.ret, 2)} (${gain >= 0 ? "+" : ""}${fmtPct(gain, 2)})${T("，", ", ")}${T("波动率从", "volatility from")} ${fmtPct(r.vol0, 2)} ${T("变成", "to")} ${fmtPct(r.vol, 2)}${T("。", ".")}`
        + `<div>${tex(String.raw`\text{${T("杠杆后收益", "Levered return")}} = ${S.lev.toFixed(2)} \times ${(r.ret0 * 100).toFixed(2)}\% - ${(S.lev - 1).toFixed(2)} \times ${S.rb.toFixed(2)}\% = ${(r.ret * 100).toFixed(2)}\%`)}</div>`
        + (r.ret0 <= S.rb / 100 ?` <span class="bad">${T("借款利率已高于组合收益：加杠杆只会降低收益。", "The borrowing rate now exceeds the portfolio's return: leverage only lowers it.")}</span>` : ""));
    }
    if (r.s22 < -0.12) lines.push(`<span class="bad">${T("2022 式情景亏损", "2022-style scenario loss")} ${fmtPct(r.s22, 1)}${T("：", ": ")}${T("股债同跌时，靠“债券保护股票”的配方会两条腿一起断。", "when stocks and bonds fall together, recipes that rely on bonds protecting stocks break on both legs.")}</span>`);
    q("#pc-log").innerHTML = lines.map((l) => `<div>${l}</div>`).join("");
  }

  const clearActive = () => root.querySelectorAll("#pc-presets .demo-btn").forEach((b) => b.classList.remove("active"));
  A.forEach((a, i) => q(`#pc-s-${i}`).addEventListener("input", (ev) => { S.w[i] = +ev.target.value; clearActive(); paint(); }));
  ["lev", "rb", "btcMu"].forEach((k) => q(`#pc-s-${k}`).addEventListener("input", (ev) => { S[k] = +ev.target.value; clearActive(); paint(); }));
  root.querySelectorAll("#pc-reg button").forEach((b) => b.addEventListener("click", () => { S.reg = b.dataset.v; paint(); }));
  root.querySelectorAll("#pc-presets .demo-btn").forEach((b) => b.addEventListener("click", () => {
    const p = presets.find((x) => x.k === b.dataset.k); S.w = p.w.slice(); S.lev = p.lev; paint();
    clearActive(); b.classList.add("active");
  }));
  paint();
  q('#pc-presets .demo-btn[data-k="6040"]').classList.add("active");
}
