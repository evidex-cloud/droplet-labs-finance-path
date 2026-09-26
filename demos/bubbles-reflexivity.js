// 交互演示：反身性飞轮模拟器——以橙子公司为例，比特币走一条可复现的随机路径；
// 公司在 mNAV > 1 时发股买币（issueAndBuy），“叙事热度”由每股比特币增长与币价涨跌驱动，并反过来推动 mNAV。
// 把反身性强度调到 0 对照：同一条比特币路径，有无反身性，股价与每股比特币的轨迹差多少。
import { issueAndBuy, rng, randn, clamp, fmtPct, fmtNum } from "./_fin.js";
import { lineChart, chartBlock } from "./_chart.js";

export default function mount(root, lang) {
  const en = lang === "en";
  const T = (zh, e) => (en ? e : zh);

  const S = { mu: 30, vol: 60, kappa: 0.8, iss: 3, m0: 1.5, buyback: false, seed: 16 };
  const Q = 40;

  const sl = (id, label, min, max, step, unit) =>
    `<div><label class="demo-label">${label}${T("：", ": ")}<b id="brx-v-${id}"></b>${unit}</label><input class="demo-slider" type="range" id="brx-s-${id}" min="${min}" max="${max}" step="${step}"></div>`;

  root.innerHTML = `
    <div class="demo">
      <div class="demo-head">${T("🌀 反身性飞轮：mNAV 溢价如何自我强化、又如何反转", "🌀 The reflexive flywheel: how an mNAV premium feeds itself — and reverses")}</div>
      <div class="demo-grid">
        ${sl("mu", T("比特币年化漂移（趋势）", "Bitcoin annual drift (trend)"), -40, 80, 5, "%")}
        ${sl("vol", T("比特币年化波动率", "Bitcoin annual volatility"), 30, 100, 5, "%")}
        ${sl("kappa", T("反身性强度（叙事 → 溢价）", "Reflexivity strength (story → premium)"), 0, 1.5, 0.1, "")}
        ${sl("iss", T("mNAV > 1 时每季增发（占股本）", "Quarterly issuance when mNAV > 1 (% of shares)"), 0, 10, 1, "%")}
        ${sl("m0", T("起始 mNAV", "Starting mNAV"), 0.8, 3, 0.1, "")}
        <div><div class="demo-label">${T("mNAV < 0.95 时", "When mNAV < 0.95")}</div>
          <div class="demo-seg" id="brx-bb"><button data-v="0">${T("停止发行", "Stop issuing")}</button><button data-v="1">${T("卖币回购股票", "Sell BTC, buy back stock")}</button></div></div>
      </div>
      <div class="demo-row"><button class="demo-btn" id="brx-seed">${T("🎲 换一条比特币路径", "🎲 New bitcoin path")}</button><span class="demo-meta" id="brx-seedlab"></span></div>
      <div class="stat-row">
        <div class="stat"><div class="k">${T("每股比特币（10 年后）", "BTC per share (10 yrs)")}</div><div class="v" id="brx-bps">–</div></div>
        <div class="stat"><div class="k">${T("比特币价格", "Bitcoin price")}</div><div class="v" id="brx-btc">–</div></div>
        <div class="stat"><div class="k">${T("股价", "Share price")}</div><div class="v" id="brx-eq">–</div></div>
        <div class="stat"><div class="k">${T("mNAV 最高 / 最低", "mNAV high / low")}</div><div class="v acc" id="brx-mm">–</div></div>
        <div class="stat"><div class="k">${T("增发 / 回购的季度", "Quarters issuing / buying back")}</div><div class="v" id="brx-q">–</div></div>
      </div>
      <div id="brx-c1"></div>
      <div id="brx-c2"></div>
      <div class="demo-log" id="brx-log"></div>
      <div class="demo-meta">${T("示意模型：每季 mNAV = 上季 mNAV + 0.15 ×（1 − 上季 mNAV）+ 0.6 × 反身性强度 × 叙事热度；叙事热度是“4 × 每股比特币增长 + 币价涨跌”的指数平滑。起点为橙子公司：10,000 BTC、1 亿股。不是预测，也不构成投资建议。", "Stylized model: each quarter mNAV = last mNAV + 0.15 × (1 − last mNAV) + 0.6 × reflexivity × narrative heat; narrative heat is an exponential average of “4 × BTC-per-share growth + bitcoin's return.” Starts from Orange Corp: 10,000 BTC, 100 million shares. Not a forecast and not investment advice.")}</div>
      <p class="demo-tip">${T(
        "先把反身性强度拉到 0：mNAV 会慢慢回到 1，飞轮只靠起始溢价转几圈。再拉到 1.2 左右，比特币路径完全不变，但股价的涨跌被明显放大，mNAV 在上涨段冲高、在下跌段跌破 1——这就是“价格改变基本面”。最后打开“卖币回购”，看 mNAV 低于 1 时回购如何反过来提高每股比特币。",
        "First set reflexivity to 0: mNAV drifts back toward 1 and the flywheel only turns a few times on the starting premium. Then raise it to about 1.2: the bitcoin path is identical, yet the share price swings far more, mNAV spikes in the rallies and falls below 1 in the slumps — price changing fundamentals. Finally switch on “sell BTC, buy back stock” and see how buybacks below mNAV 1 raise BTC per share instead."
      )}</p>
    </div>`;

  const q = (s) => root.querySelector(s);

  function simulate(P) {
    const rand = rng((P.seed * 2654435761) >>> 0);
    for (let k = 0; k < 10; k++) rand();
    let btc = 10000, shares = 100e6, px = 100000, m = P.m0, N = 0;
    const bps0 = btc / shares, eq0 = m * btc * px / shares;
    const rows = [{ t: 0, m, bps: 1, btc: 1, eq: 1 }];
    let issued = 0, bought = 0, mHi = m, mLo = m, tHi = 0, firstBelow = -1;
    for (let t = 1; t <= Q; t++) {
      const r = (P.mu / 100 - 0.5 * (P.vol / 100) ** 2) * 0.25 + (P.vol / 100) * 0.5 * randn(rand);
      px *= Math.exp(r);
      let g = 0;
      const share = m * btc * px / shares;
      if (m > 1 && P.iss > 0) {
        const res = issueAndBuy({ btc, shares, btcPrice: px, px: share, newShares: shares * P.iss / 100 });
        g = res.change; btc = res.btc; shares = res.shares; issued++;
      } else if (m < 0.95 && P.buyback) {
        const res = issueAndBuy({ btc, shares, btcPrice: px, px: share, newShares: -shares * 0.03 });
        g = res.change; btc = res.btc; shares = res.shares; bought++;
      }
      N = 0.6 * N + 0.4 * (4 * g + r);
      m = clamp(m + 0.15 * (1 - m) + 0.6 * P.kappa * N, 0.35, 4);
      if (m > mHi) { mHi = m; tHi = t; }
      if (m < mLo) mLo = m;
      if (m < 1 && firstBelow < 0) firstBelow = t;
      rows.push({ t, m, bps: (btc / shares) / bps0, btc: px / 100000, eq: (m * btc * px / shares) / eq0 });
    }
    return { rows, issued, bought, mHi, mLo, tHi, firstBelow, btc, shares };
  }

  function paint() {
    ["mu", "vol", "kappa", "iss", "m0"].forEach((k) => { q(`#brx-s-${k}`).value = S[k]; q(`#brx-v-${k}`).textContent = S[k]; });
    root.querySelectorAll("#brx-bb button").forEach((b) => b.classList.toggle("on", (b.dataset.v === "1") === S.buyback));
    q("#brx-seedlab").textContent = T("路径编号 ", "Path #") + S.seed;
    const R = simulate(S), last = R.rows[R.rows.length - 1];
    const set = (id, v, good) => { const el = q(id); el.textContent = v; el.className = "v " + (good == null ? "" : good ? "pos" : "neg"); };
    set("#brx-bps", (last.bps >= 1 ? "+" : "") + fmtPct(last.bps - 1, 0), last.bps >= 1);
    set("#brx-btc", (last.btc >= 1 ? "+" : "") + fmtPct(last.btc - 1, 0), last.btc >= 1);
    set("#brx-eq", (last.eq >= 1 ? "+" : "") + fmtPct(last.eq - 1, 0), last.eq >= 1);
    q("#brx-mm").textContent = fmtNum(R.mHi, 2) + " / " + fmtNum(R.mLo, 2);
    q("#brx-q").textContent = R.issued + " / " + R.bought;

    const step = (key) => (x) => R.rows[Math.min(Q, Math.round(x))][key];
    const c1 = lineChart({ fns: [{ f: step("m"), cls: "line5" }, { f: step("bps"), cls: "line4" }, { f: () => 1, cls: "line2" }], lo: 0, hi: Q, xlabel: T("季度", "quarter"), uid: "brx1", samples: Q * 2 });
    q("#brx-c1").innerHTML = chartBlock(c1, [["var(--btc)", "mNAV"], ["var(--green)", T("每股比特币（起点 = 1）", "BTC per share (start = 1)")], ["var(--blue)", T("mNAV = 1 基准线", "mNAV = 1 reference")]]);
    const c2 = lineChart({ fns: [{ f: step("btc"), cls: "line2" }, { f: step("eq"), cls: "line" }], lo: 0, hi: Q, xlabel: T("季度", "quarter"), uid: "brx2", forceZero: true, samples: Q * 2 });
    q("#brx-c2").innerHTML = chartBlock(c2, [["var(--blue)", T("比特币价格（起点 = 1）", "Bitcoin price (start = 1)")], ["var(--orange)", T("股价（起点 = 1）", "Share price (start = 1)")]]);

    const lines = [];
    lines.push(T(`10 年后：比特币 ${fmtPct(last.btc - 1, 0)}，股价 ${fmtPct(last.eq - 1, 0)}，每股比特币 ${fmtPct(last.bps - 1, 0)}；公司持有 ${fmtNum(R.btc, 0)} BTC、${fmtNum(R.shares / 1e6, 0)} 百万股。`,
      `After 10 years: bitcoin ${fmtPct(last.btc - 1, 0)}, share price ${fmtPct(last.eq - 1, 0)}, BTC per share ${fmtPct(last.bps - 1, 0)}; the company holds ${fmtNum(R.btc, 0)} BTC and ${fmtNum(R.shares / 1e6, 0)} million shares.`));
    lines.push(T(`mNAV 在第 ${R.tHi} 季达到最高 ${fmtNum(R.mHi, 2)}。`, `mNAV peaked at ${fmtNum(R.mHi, 2)} in quarter ${R.tHi}.`));
    if (S.kappa === 0) lines.push(`<span class="warn">${T("没有反身性：溢价不会被故事推高，只会慢慢回到 1——发股买币的“增值”也随之消失。", "No reflexivity: the story never lifts the premium, which just drifts back to 1 — and the accretion from issuing disappears with it.")}</span>`);
    if (R.firstBelow > 0) lines.push(`<span class="bad">${T(`第 ${R.firstBelow} 季 mNAV 跌破 1：此后发股买币会稀释每股比特币，飞轮停转${S.buyback ? "；公司改为卖币回购，每股比特币在低 mNAV 时反而上升" : "（阶段 18.3 讨论此时的选项）"}。`, `mNAV fell below 1 in quarter ${R.firstBelow}: from then on issuing to buy bitcoin dilutes BTC per share and the flywheel stalls${S.buyback ? "; the company switches to selling bitcoin to buy back stock, which raises BTC per share at a low mNAV" : " (Stage 18.3 discusses the options at that point)"}.`)}</span>`);
    else lines.push(`<span class="ok">${T("在这条路径上，mNAV 始终没有跌破 1。换几条路径或降低比特币趋势试试。", "On this path mNAV never fell below 1. Try other paths or a weaker bitcoin trend.")}</span>`);
    const amp = Math.abs(last.btc - 1) > 0.01 ? (last.eq - 1) / (last.btc - 1) : NaN;
    if (isFinite(amp) && amp < 0) lines.push(T("股价与比特币朝相反方向走：溢价与每股比特币的变化压过了币价本身。", "The share price and bitcoin moved in opposite directions: changes in the premium and in BTC per share outweighed the coin price itself."));
    else if (isFinite(amp)) lines.push(T(`股价涨跌 ÷ 比特币涨跌 ≈ ${fmtNum(amp, 2)}：溢价的变化本身是一层额外的“杠杆”。`, `Share-price move ÷ bitcoin move ≈ ${fmtNum(amp, 2)}: changes in the premium act as an extra layer of “leverage.”`));
    q("#brx-log").innerHTML = lines.map((l) => `<div>${l}</div>`).join("");
  }

  ["mu", "vol", "kappa", "iss", "m0"].forEach((k) => q(`#brx-s-${k}`).addEventListener("input", (e) => { S[k] = +e.target.value; paint(); }));
  root.querySelectorAll("#brx-bb button").forEach((b) => b.addEventListener("click", () => { S.buyback = b.dataset.v === "1"; paint(); }));
  q("#brx-seed").addEventListener("click", () => { S.seed = (S.seed % 97) + 1; paint(); });
  paint();
}
