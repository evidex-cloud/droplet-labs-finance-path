// 交互演示：证券化实验室——房贷池 → 分层 MBS → 用夹层再打包的 CDO。
// A. 拖房价跌幅，看每一层亏多少（瀑布公式 waterfall）；B. 调“各地房贷池的相关性”，蒙特卡洛看 MBS 的 AAA 与 CDO 的“AAA”各有多大概率亏钱。
import { waterfall, fmtPct, clamp, rng, randn, tex } from "./_fin.js";
import { lineChart, chartBlock } from "./_chart.js";

export default function mount(root, lang) {
  const en = lang === "en";
  const T = (zh, e) => (en ? e : zh);

  const S = { h: 10, lgd: 50, eq: 5, mz: 15, rho: 10, base: 4 };
  const POOLS = 40, SIMS = 2000;

  // 一个 100 面值的池子按 [高级, 夹层, 权益] 切分，返回各层亏损率
  const tranche = (lossPct) => {
    const sen = 100 - S.eq - S.mz;
    const w = waterfall(100 - clamp(lossPct, 0, 100), [
      { name: "sen", claim: sen }, { name: "mz", claim: S.mz }, { name: "eq", claim: S.eq },
    ]);
    return { sen: 1 - w.rows[0].recovery, mz: 1 - w.rows[1].recovery, eq: 1 - w.rows[2].recovery };
  };
  // 情景 A：房价跌幅 → 房贷池亏损（示意：违约率 ≈ 3% + 1.0 × 跌幅，乘以违约损失率）
  const poolLoss = (h) => clamp((S.lgd / 100) * (3 + 1.0 * h), 0, 100);
  const cdoOf = (mzLoss) => tranche(mzLoss * 100); // CDO 的资产池全是夹层：夹层亏多少，CDO 资产就亏多少

  root.innerHTML = `
    <div class="demo">
      <div class="demo-head">${T("🏭 证券化实验室：切一次是 AAA，再切一次还是 AAA 吗？", "🏭 Securitization lab: sliced once it's AAA — sliced twice, is it still AAA?")}</div>
      <div class="demo-block">
        <div class="demo-label"><b>${T("A · 情景：全国房价下跌", "A · Scenario: a nationwide house-price fall")}</b></div>
        <div class="demo-grid">
          <div><label class="demo-label">${T("房价从高点下跌", "House prices fall from peak")}${T("：", ": ")}<b id="c08-v-h"></b>%</label><input class="demo-slider" type="range" id="c08-s-h" min="0" max="40" step="1"></div>
          <div><label class="demo-label">${T("违约后的损失率（LGD）", "Loss given default (LGD)")}${T("：", ": ")}<b id="c08-v-lgd"></b>%</label><input class="demo-slider" type="range" id="c08-s-lgd" min="20" max="80" step="5"></div>
          <div><label class="demo-label">${T("权益层厚度", "Equity tranche thickness")}${T("：", ": ")}<b id="c08-v-eq"></b>%</label><input class="demo-slider" type="range" id="c08-s-eq" min="1" max="15" step="1"></div>
          <div><label class="demo-label">${T("夹层厚度", "Mezzanine thickness")}${T("：", ": ")}<b id="c08-v-mz"></b>%</label><input class="demo-slider" type="range" id="c08-s-mz" min="5" max="30" step="1"></div>
        </div>
        <div class="stat-row">
          <div class="stat"><div class="k">${T("房贷池亏损", "Mortgage pool loss")}</div><div class="v" id="c08-pool">–</div></div>
          <div class="stat"><div class="k">${T("MBS 的 AAA 亏损", "MBS AAA loss")}</div><div class="v" id="c08-msen">–</div></div>
          <div class="stat"><div class="k">${T("CDO 的“AAA”亏损", "CDO “AAA” loss")}</div><div class="v" id="c08-csen">–</div></div>
        </div>
        <div class="cmp">
          <div class="cmp-cell"><h5>${T("第一次分层：MBS", "First tranching: MBS")}</h5><div id="c08-mbs"></div></div>
          <div class="cmp-cell"><h5>${T("第二次分层：由夹层组成的 CDO", "Second tranching: CDO of mezzanine")}</h5><div id="c08-cdo"></div></div>
        </div>
        <div id="c08-chart"></div>
      </div>
      <div class="demo-block">
        <div class="demo-label"><b>${T("B · 评级模型：各地房贷池会不会一起出事？", "B · The rating model: do regional pools go bad together?")}</b></div>
        <div class="demo-grid">
          <div><label class="demo-label">${T("各地房贷池的相关性", "Correlation between regional pools")}${T("：", ": ")}<b id="c08-v-rho"></b>%</label><input class="demo-slider" type="range" id="c08-s-rho" min="0" max="100" step="5"></div>
          <div><label class="demo-label">${T("正常年景的平均池子亏损", "Average pool loss in a normal year")}${T("：", ": ")}<b id="c08-v-base"></b>%</label><input class="demo-slider" type="range" id="c08-s-base" min="1" max="8" step="0.5"></div>
        </div>
        <div class="stat-row">
          <div class="stat"><div class="k">${T("单个 MBS 的 AAA 亏钱概率", "P(a single MBS AAA takes a loss)")}</div><div class="v" id="c08-pm">–</div></div>
          <div class="stat"><div class="k">${T("CDO“AAA”亏钱概率", "P(CDO “AAA” takes a loss)")}</div><div class="v" id="c08-pc">–</div></div>
          <div class="stat"><div class="k">${T("CDO“AAA”平均亏损", "CDO “AAA” average loss")}</div><div class="v" id="c08-ac">–</div></div>
        </div>
        <div class="demo-log" id="c08-log"></div>
        <div class="demo-meta">${T(`每次模拟 2,000 个“年份”，每年 40 个地区房贷池；${tex(String.raw`\text{池子亏损} = \text{平均值} \times \text{对数正态冲击}`)}，冲击由“全国因子”与“地区因子”按相关性混合。示意模型，不是历史数据。`, `Each run simulates 2,000 “years” of 40 regional pools each; ${tex(String.raw`\text{pool loss} = \text{average} \times \text{lognormal shock}`)}, where the shock mixes a national factor and a regional factor by the correlation. A stylized model, not historical data.`)}</div>
      </div>
      <p class="demo-tip">${T(
        "先在 A 里把房价跌幅拖到 20%：MBS 的 AAA 纹丝不动，CDO 的“AAA”已经开始亏。再到 B，把相关性从 10% 拉到 80%：平均亏损一点没变，CDO“AAA”的亏钱概率却从几乎为零跳到明显不可忽视——评级模型押错的正是这一个参数。",
        "In A, drag the house-price fall to 20%: the MBS AAA doesn't budge while the CDO “AAA” is already losing. Then in B, raise correlation from 10% to 80%: the average loss is unchanged, yet the chance that the CDO “AAA” loses money jumps from almost nothing to something you can't ignore — the single parameter the rating models got wrong."
      )}</p>
    </div>`;

  const q = (s) => root.querySelector(s);
  const bars = (t, labels) => ["sen", "mz", "eq"].map((k, i) => `
    <div class="bar2"><span class="lab">${labels[i]}</span>
      <div class="track"><div class="fill" style="width:${(t[k] * 100).toFixed(1)}%;background:${t[k] > 0.999 ? "var(--red)" : t[k] > 0 ? "var(--orange)" : "var(--green)"}"></div></div>
      <span class="val">${fmtPct(t[k], 0)}</span></div>`).join("");

  function paintA() {
    const L = poolLoss(S.h), m = tranche(L), c = cdoOf(m.mz);
    q("#c08-pool").textContent = fmtPct(L / 100, 1);
    const ms = q("#c08-msen"); ms.textContent = fmtPct(m.sen, 1); ms.className = "v " + (m.sen > 0 ? "neg" : "pos");
    const cs = q("#c08-csen"); cs.textContent = fmtPct(c.sen, 1); cs.className = "v " + (c.sen > 0 ? "neg" : "pos");
    const sen = 100 - S.eq - S.mz;
    q("#c08-mbs").innerHTML = bars(m, [`AAA ${sen}%`, T("夹层 ", "Mezz ") + S.mz + "%", T("权益 ", "Equity ") + S.eq + "%"]);
    q("#c08-cdo").innerHTML = bars(c, [`“AAA” ${sen}%`, T("夹层 ", "Mezz ") + S.mz + "%", T("权益 ", "Equity ") + S.eq + "%"]);
    const ch = lineChart({
      fns: [
        { f: (h) => tranche(poolLoss(h)).sen * 100, cls: "line4" },
        { f: (h) => tranche(poolLoss(h)).mz * 100, cls: "line" },
        { f: (h) => cdoOf(tranche(poolLoss(h)).mz).sen * 100, cls: "line3" },
      ],
      lo: 0, hi: 40, xlabel: T("房价跌幅 %", "house-price fall %"), markerX: S.h, markerLabel: T("当前", "now"), forceZero: true, uid: "c08",
    });
    q("#c08-chart").innerHTML = chartBlock(ch, [["var(--green)", T("MBS 的 AAA 亏损 %", "MBS AAA loss %")], ["var(--orange)", T("MBS 夹层亏损 %", "MBS mezz loss %")], ["var(--red)", T("CDO“AAA”亏损 %", "CDO “AAA” loss %")]]);
  }

  function paintB() {
    const rand = rng(2008), sig = 0.8, r = S.rho / 100;
    let hitM = 0, hitC = 0, sumC = 0;
    for (let s = 0; s < SIMS; s++) {
      const Z = randn(rand);
      let mzSum = 0;
      for (let i = 0; i < POOLS; i++) {
        const X = Math.sqrt(r) * Z + Math.sqrt(1 - r) * randn(rand);
        const L = S.base * Math.exp(sig * X - 0.5 * sig * sig);
        const t = tranche(L);
        mzSum += t.mz; if (t.sen > 0) hitM++;
      }
      const c = cdoOf(mzSum / POOLS);
      if (c.sen > 0) hitC++;
      sumC += c.sen;
    }
    const pm = hitM / (SIMS * POOLS), pc = hitC / SIMS;
    q("#c08-pm").textContent = fmtPct(pm, 1);
    const pcv = q("#c08-pc"); pcv.textContent = fmtPct(pc, 1); pcv.className = "v " + (pc > 0.01 ? "neg" : "pos");
    q("#c08-ac").textContent = fmtPct(sumC / SIMS, 2);
    const lines = [
      T(`在 ${SIMS.toLocaleString()} 个模拟年份里，单个地区 MBS 的 AAA 亏钱的概率约 ${fmtPct(pm, 1)}（它只看自己池子，与相关性无关）；由 40 个夹层拼成的 CDO“AAA”亏钱的年份占 <b>${fmtPct(pc, 1)}</b>。`,
        `Across ${SIMS.toLocaleString()} simulated years, a single regional MBS AAA lost money about ${fmtPct(pm, 1)} of the time (it only depends on its own pool, not on correlation); the CDO “AAA” built from 40 mezzanine slices lost money in <b>${fmtPct(pc, 1)}</b> of the years.`),
      r <= 0.2
        ? `<span class="ok">${T("低相关的世界：各地的坏年景互相抵消，夹层的平均亏损很稳定，CDO 顶层看起来真的像 AAA——这正是当时评级模型的世界观。", "A low-correlation world: bad regions offset good ones, the average mezzanine loss is stable, and the CDO top slice really does look AAA — exactly the worldview of the rating models at the time.")}</span>`
        : r >= 0.6
          ? `<span class="bad">${T("高相关的世界：全国性冲击让所有夹层一起被打穿，CDO“AAA”在坏年份成片亏损——2007–2008 年发生的正是这种情况。", "A high-correlation world: a national shock breaches every mezzanine at once, and the CDO “AAA” takes losses in every bad year — which is what happened in 2007–08.")}</span>`
          : `<span class="warn">${T("中等相关：CDO“AAA”的风险已经明显高于它的标签。", "Moderate correlation: the CDO “AAA” is already clearly riskier than its label.")}</span>`,
      T("注意：拖动相关性时，平均池子亏损完全没变——变的只是“坏事会不会同时发生”。", "Notice: as you move the correlation, the average pool loss never changes — only whether bad outcomes happen at the same time."),
    ];
    q("#c08-log").innerHTML = lines.map((l) => `<div>${l}</div>`).join("");
  }

  function sync() {
    ["h", "lgd", "eq", "mz", "rho", "base"].forEach((k) => { q(`#c08-s-${k}`).value = S[k]; q(`#c08-v-${k}`).textContent = S[k]; });
  }
  ["h", "lgd", "eq", "mz"].forEach((k) => q(`#c08-s-${k}`).addEventListener("input", (e) => { S[k] = +e.target.value; sync(); paintA(); if (k === "eq" || k === "mz") paintB(); }));
  ["rho", "base"].forEach((k) => q(`#c08-s-${k}`).addEventListener("input", (e) => { S[k] = +e.target.value; sync(); paintB(); }));
  sync(); paintA(); paintB();
}
