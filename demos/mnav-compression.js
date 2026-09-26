// 交互演示：mNAV 压缩实验室——橙子公司在不同 mNAV 下做五种动作（增发买币、卖币回购普通股、发优先股买币、
// 折价回购优先股、卖币补储备），看每股比特币、各层 BTC 评级、净储备口径 mNAV、放大倍数、股息与覆盖月数怎么变，
// 并用一条曲线显示“同一动作在各个 mNAV 下的每股比特币变化”。计算全部走 _fin.js。
import { issueAndBuy, coverageByLayer, netReserve, mnavNetBps, amplificationStrategy, monthsCovered, breakevenArr, fmtPct, fmtNum, fmtBig, tex } from "./_fin.js";
import { lineChart, chartBlock } from "./_chart.js";

// 把格式化好的数字放进 LaTeX：$ → \$，千分位 , → {,}，% → \%
const texv = (s) => String(s).replace(/\$/g, "\\$").replace(/,/g, "{,}").replace(/%/g, "\\%");
const texBig = (x) => String.raw`\$${fmtBig(x).replace(/([TBMK])$/, "\\text{$1}")}`;

export default function mount(root, lang) {
  const en = lang === "en";
  const T = (zh, e) => (en ? e : zh);

  // 橙子公司基准（AUTHORING §0.2）；可转债假设价外（按债务计入净储备）
  const BASE = { btc: 10000, sh: 100e6, conv: 150e6, F: 100e6, D: 50e6, cash: 30e6, oblig: 15e6 };
  const BTCP = 100000;
  const st = { mnav: 0.8, act: "buyback", amt: 80, prefPx: 85 };

  const ACTS = [
    ["issue", T("增发普通股买币", "Issue common, buy bitcoin")],
    ["buyback", T("卖币回购普通股", "Sell bitcoin, buy back common")],
    ["pref", T("发新优先股买币（10%，排在最后）", "Issue new preferred, buy bitcoin (10%, most junior)")],
    ["prefbb", T("卖币折价回购 Orange-F", "Sell bitcoin, buy back Orange-F below par")],
    ["reserve", T("卖币补美元储备", "Sell bitcoin to top up the USD reserve")],
  ];

  root.innerHTML = `
    <div class="demo">
      <div class="demo-head">${T("🔄 mNAV 压缩实验室：飞轮倒转时，每个动作让谁得、让谁失", "🔄 mNAV compression lab: when the flywheel reverses, who gains and who loses from each move")}</div>
      <div class="demo-grid">
        <div class="demo-block">
          <label class="demo-label">${T(`mNAV（市值口径；${tex(String.raw`\text{股价} = \mathrm{mNAV} \times 10\ \text{美元}`)}）`, `mNAV (basic; ${tex(String.raw`\text{share price} = \mathrm{mNAV} \times \$10`)})`)}${T("：", ": ")}<b id="mnc-mnav-v"></b></label>
          <input class="demo-slider" id="mnc-mnav" type="range" min="0.4" max="2.5" step="0.05" value="0.8" />
          <label class="demo-label">${T("动作规模（百万美元）", "Size of the move ($ millions)")}${T("：", ": ")}<b id="mnc-amt-v"></b></label>
          <input class="demo-slider" id="mnc-amt" type="range" min="10" max="300" step="5" value="80" />
          <label class="demo-label">${T("Orange-F 市价（折价回购时用）", "Orange-F market price (for the buyback)")}${T("：", ": ")}<b id="mnc-pp-v"></b></label>
          <input class="demo-slider" id="mnc-pp" type="range" min="50" max="105" step="1" value="85" />
        </div>
        <div class="demo-block">
          <label class="demo-label">${T("动作", "Action")}</label>
          <div class="demo-btns" id="mnc-acts">${ACTS.map(([k, l]) => `<button class="demo-btn${k === st.act ? " active" : ""}" data-a="${k}">${l}</button>`).join("")}</div>
        </div>
      </div>
      <div class="cmp" id="mnc-cmp"></div>
      <div class="demo-block" id="mnc-chart"></div>
      <div class="demo-block"><div class="demo-log" id="mnc-log"></div></div>
      <p class="demo-tip">${T(
        "把 mNAV 放在 0.8：“卖币回购普通股”让每股比特币上升，但看右边 Orange-F 的 BTC 评级在下降；切到“折价回购 Orange-F”，所有层的覆盖都变厚。再把 mNAV 拖到 1.5，看两种动作的好坏整个翻过来——分水岭就是 1。",
        "Set mNAV to 0.8: “sell bitcoin, buy back common” raises bitcoin per share, but watch Orange-F's BTC Rating fall. Switch to “buy back Orange-F below par” and every layer's coverage thickens. Then drag mNAV to 1.5 and see the good and bad moves swap places entirely; the watershed is 1."
      )}</p>
    </div>`;

  const q = (s) => root.querySelector(s);

  // 执行一次动作，返回新的资产负债表
  const apply = (mnav, act, A) => {
    const px = mnav * (BASE.btc * BTCP) / BASE.sh;
    const b = { ...BASE, px };
    if (act === "issue") {
      const r = issueAndBuy({ btc: b.btc, shares: b.sh, btcPrice: BTCP, px, newShares: A / px });
      b.btc = r.btc; b.sh = r.shares;
    } else if (act === "buyback") {
      const A2 = Math.min(A, b.sh * px * 0.9);
      b.btc -= A2 / BTCP; b.sh -= A2 / px;
    } else if (act === "pref") {
      b.btc += A / BTCP; b.P2 = A; b.oblig += 0.10 * A;
    } else if (act === "prefbb") {
      const retired = Math.min(b.F, A / (st.prefPx / 100));
      const spent = retired * st.prefPx / 100;
      b.btc -= spent / BTCP; b.F -= retired; b.oblig -= 0.10 * retired; b.spent = spent;
    } else if (act === "reserve") {
      b.btc -= A / BTCP; b.cash += A;
    }
    return b;
  };

  const metrics = (b) => {
    const nav = b.btc * BTCP;
    const layers = [{ name: T("可转债", "Convertibles"), claim: b.conv }, { name: "Orange-F", claim: b.F }, { name: "Orange-D", claim: b.D }];
    if (b.P2) layers.push({ name: T("新优先股", "New preferred"), claim: b.P2 });
    const pref = b.F + b.D + (b.P2 || 0);
    return {
      sats: (b.btc / b.sh) * 1e8,
      cov: coverageByLayer(nav, layers),
      net: netReserve(nav, b.conv, pref, b.cash),
      mnav26: mnavNetBps(b.px, nav, b.conv, pref, b.cash, b.sh),
      amp: amplificationStrategy(nav, b.conv, pref, b.cash),
      months: monthsCovered(b.cash, b.oblig),
      be: breakevenArr(b.oblig, nav),
      oblig: b.oblig,
    };
  };

  const cell = (title, m, cls, m0) => {
    const d = m0 ? m.sats / m0.sats - 1 : 0;
    const covRows = m.cov.map((r, i) => {
      const before = m0 && m0.cov[i] ? m0.cov[i].coverage : null;
      const arrow = before == null ? "" : r.coverage > before + 1e-9 ? " ▲" : r.coverage < before - 1e-9 ? " ▼" : "";
      return `<div>${r.name}${T("：", ": ")}<b>${fmtNum(r.coverage, 2)}x</b>${arrow}</div>`;
    }).join("");
    return `<div class="cmp-cell ${cls}"><h5>${title}</h5>
      <div class="stat-row" style="margin-top:0">
        <div class="stat"><div class="k">${T("每股聪数", "Sats per share")}</div><div class="v ${m0 ? (d >= 0 ? "pos" : "neg") : ""}">${fmtNum(m.sats, 0)}${m0 ? ` (${d >= 0 ? "+" : ""}${fmtPct(d, 2)})` : ""}</div></div>
        <div class="stat"><div class="k">${T("2026 口径 mNAV", "2026-style mNAV")}</div><div class="v">${fmtNum(m.mnav26, 2)}x</div></div>
        <div class="stat"><div class="k">${T("放大倍数", "Amplification")}</div><div class="v">${fmtNum(m.amp, 2)}x</div></div>
      </div>
      <div class="demo-meta">${T("BTC 评级", "BTC Rating")}${T("：", ": ")}</div>${covRows}
      <div class="demo-meta">${T("年度股息", "Annual dividends")} ${fmtBig(m.oblig)} · ${T("储备覆盖", "reserve covers")} ${fmtNum(m.months, 0)} ${T("个月", "months")} · Breakeven ARR ${fmtPct(m.be, 2)} · ${T("净储备", "net reserve")} ${fmtBig(m.net)}</div>
    </div>`;
  };

  const paint = () => {
    const A = st.amt * 1e6;
    const b0 = { ...BASE, px: st.mnav * 10 };
    const m0 = metrics(b0);
    const b1 = apply(st.mnav, st.act, A);
    const m1 = metrics(b1);

    q("#mnc-mnav-v").textContent = fmtNum(st.mnav, 2) + "x · $" + fmtNum(st.mnav * 10, 2);
    q("#mnc-amt-v").textContent = "$" + st.amt + "M";
    q("#mnc-pp-v").textContent = "$" + st.prefPx;
    root.querySelectorAll("#mnc-acts button").forEach((o) => o.classList.toggle("active", o.dataset.a === st.act));

    q("#mnc-cmp").innerHTML = cell(T("之前", "Before"), m0, "cold", null) + cell(T("之后", "After"), m1, "hl", m0);

    const res = lineChart({
      fns: [
        { f: (m) => (metrics(apply(m, st.act, A)).sats / metrics({ ...BASE, px: m * 10 }).sats - 1) * 100, cls: "line5" },
        { f: () => 0, cls: "line3" },
      ],
      lo: 0.4, hi: 2.5, xlabel: T("mNAV（倍）", "mNAV (x)"), markerX: st.mnav, markerLabel: T("当前", "now"), uid: "mnc",
    });
    q("#mnc-chart").innerHTML = `<div class="demo-label">${T("这个动作在各个 mNAV 下对每股比特币的影响（%）", "Effect of this move on bitcoin per share at each mNAV (%)")}</div>` +
      chartBlock(res, [["var(--btc)", T("每股比特币变化", "change in BTC per share")], ["var(--red)", T("零线", "zero line")]]);

    const d = m1.sats / m0.sats - 1;
    const fBefore = m0.cov[1].coverage, fAfter = m1.cov[1].coverage;
    const L = [];
    L.push(`<span class="${d >= 0 ? "ok" : "bad"}">${T("普通股：每股比特币", "Common: bitcoin per share")} ${d >= 0 ? "+" : ""}${fmtPct(d, 2)}</span>`);
    L.push(`<span class="${fAfter >= fBefore - 1e-9 ? "ok" : "bad"}">${T("Orange-F 持有人：BTC 评级", "Orange-F holders: BTC Rating")} ${fmtNum(fBefore, 2)}x → ${fmtNum(fAfter, 2)}x</span>`);
    L.push(`${tex(String.raw`\dfrac{\mathrm{BPS}_{\text{${T("后", "after")}}}}{\mathrm{BPS}_{\text{${T("前", "before")}}}} - 1 = \dfrac{${texv(fmtNum(m1.sats, 0))}}{${texv(fmtNum(m0.sats, 0))}} - 1 = ${d >= 0 ? "+" : ""}${texv(fmtPct(d, 2))}`)}${T("（单位：每股聪数）；", " (sats per share); ")}${tex(String.raw`\text{${T("Orange-F 的 BTC 评级", "Orange-F's BTC Rating")}} = \dfrac{${texBig(b1.btc * BTCP)}}{${texBig(b1.conv)} + ${texBig(b1.F)}} = ${texv(fmtNum(fAfter, 2))}\times`)}${T("。", ".")}`);
    if (st.act === "buyback" && st.mnav < 1) L.push(`${T("折价时卖币回购：普通股把折价“吃”进来，代价是每一层的安全垫变薄——这就是 mNAV 压缩时的核心利益冲突。", "Buying back at a discount: the common captures the discount, and every layer's cushion thins as the price. That is the central conflict of interest when mNAV compresses.")}`);
    if (st.act === "issue" && st.mnav < 1) L.push(`<span class="warn">${T("mNAV < 1 时增发买币是稀释：飞轮在倒转。覆盖倒是变厚了——优先股持有人喜欢这个动作。", "Issuing below 1x dilutes; the flywheel is running backwards. Coverage does thicken, so preferred holders like this move.")}</span>`);
    if (st.act === "pref") L.push(`<span class="warn">${T("每股比特币上升（BTC Yield 为正），但普通股之上多了一层每年 10% 的索取权；只有比特币长期涨幅高于资金成本才真正增值（阶段 16.3）。", "Bitcoin per share rises (positive BTC Yield), but a new 10%-a-year claim now sits above the common. It only truly adds value if bitcoin outgrows that cost over time.")}</span>`);
    if (st.act === "prefbb") L.push(`${T("花", "Spending")} ${fmtBig(b1.spent || 0)} ${T("消灭", "retires")} ${fmtBig((b1.spent || 0) / (st.prefPx / 100))} ${T("面值的 Orange-F：", "of Orange-F notional: ")}${st.prefPx < 100 ? T("低于面值回购，所有剩余层都受益。", "bought below par, so every remaining layer benefits.") : T("高于面值回购，净储备反而减少。", "bought above par, so net reserve actually falls.")}`);
    if (st.act === "reserve") L.push(`${T("卖币换美元：每股比特币必然下降，换来的是股息覆盖月数——Strategy 2026 年的“比特币货币化计划”就包含这一用途。", "Selling for dollars always lowers bitcoin per share; what it buys is months of dividend coverage. Strategy's 2026 BTC Monetization Program includes exactly this use.")}`);
    L.push(`${T("示意计算，股价假设不因动作而变；仅讲机制，不构成投资建议。", "Illustrative: the share price is assumed not to react. Mechanics only, not investment advice.")}`);
    q("#mnc-log").innerHTML = L.map((l) => `<div>${l}</div>`).join("");
  };

  q("#mnc-mnav").addEventListener("input", (e) => { st.mnav = +e.target.value; paint(); });
  q("#mnc-amt").addEventListener("input", (e) => { st.amt = +e.target.value; paint(); });
  q("#mnc-pp").addEventListener("input", (e) => { st.prefPx = +e.target.value; paint(); });
  root.querySelectorAll("#mnc-acts button").forEach((b) => b.addEventListener("click", () => { st.act = b.dataset.a; paint(); }));
  paint();
}
