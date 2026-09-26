// 交互演示：银行挤兑模拟器——调现金、资本、急卖折价、谣言强度、存款保险与最后贷款人，
// 逐日看储户排队、急卖亏损吃掉资本、恐慌自我强化；同一家健康银行在“小谣言”与“大谣言”下走向两个不同结局。
import { fmtPct, fmtUsd, clamp, rng, tex } from "./_fin.js";
import { lineChart, chartBlock } from "./_chart.js";

export default function mount(root, lang) {
  const en = lang === "en";
  const T = (zh, e) => (en ? e : zh);

  const S = { c: 10, e: 10, p: 67, r: 5, ins: 0, lolr: false };
  const N = 200, MAXDAY = 12;

  const presets = [
    { k: "small", label: T("健康银行 + 小谣言", "Healthy bank + small rumor"), v: { c: 10, e: 10, p: 67, r: 5, ins: 0, lolr: false } },
    { k: "big", label: T("同一家银行 + 大谣言", "Same bank + big rumor"), v: { c: 10, e: 10, p: 67, r: 20, ins: 0, lolr: false } },
    { k: "lolr", label: T("大谣言 + 最后贷款人", "Big rumor + lender of last resort"), v: { c: 10, e: 10, p: 67, r: 20, ins: 0, lolr: true } },
    { k: "ins", label: T("大谣言 + 70% 存款受保", "Big rumor + 70% insured"), v: { c: 10, e: 10, p: 67, r: 20, ins: 70, lolr: false } },
    { k: "svb", label: T("硅谷银行式：九成未受保、债券浮亏", "SVB-style: ~90% uninsured, bonds under water"), v: { c: 7, e: 8, p: 85, r: 25, ins: 10, lolr: false } },
  ];

  const slider = (id, label, min, max, step, unit) => `
    <div class="demo-block">
      <label class="demo-label">${label}${T("：", ": ")}<b id="aoc-v-${id}"></b>${unit}</label>
      <input class="demo-slider" type="range" id="aoc-s-${id}" min="${min}" max="${max}" step="${step}" />
    </div>`;

  root.innerHTML = `
    <div class="demo">
      <div class="demo-head">${T("🏦 银行挤兑模拟器：恐慌怎么把一家健康银行推倒", "🏦 Bank-run simulator: how panic knocks over a healthy bank")}</div>
      <div class="demo-block">
        <div class="demo-label">${T("一键场景", "Quick scenarios")}</div>
        <div class="demo-btns" id="aoc-presets">${presets.map((p) => `<button class="demo-btn" data-k="${p.k}">${p.label}</button>`).join("")}</div>
      </div>
      <div class="demo-grid">
        ${slider("c", T("现金占资产", "Cash as % of assets"), 2, 40, 1, "%")}
        ${slider("e", T("资本占资产（杠杆的倒数）", "Capital as % of assets (1 / leverage)"), 2, 20, 1, "%")}
        ${slider("p", T("急卖时贷款能卖出账面的", "Fire-sale price, % of book"), 40, 100, 1, "%")}
        ${slider("r", T("第 1 天谣言：恐慌门槛", "Day-1 rumor: panic level"), 0, 50, 1, "%")}
        ${slider("ins", T("受存款保险保护的储户", "Depositors covered by insurance"), 0, 100, 5, "%")}
        <div class="demo-block">
          <div class="demo-label">${T("最后贷款人（央行按账面 90% 借现金，不必急卖）", "Lender of last resort (central bank lends 90% of book — no fire sale)")}</div>
          <div class="demo-seg" id="aoc-lolr"><button data-v="0">${T("关闭", "Off")}</button><button data-v="1">${T("开启", "On")}</button></div>
        </div>
      </div>
      <div class="stat-row">
        <div class="stat"><div class="k">${T("结局", "Outcome")}</div><div class="v" id="aoc-out">–</div></div>
        <div class="stat"><div class="k">${T("被取走的存款", "Deposits withdrawn")}</div><div class="v" id="aoc-w">–</div></div>
        <div class="stat"><div class="k">${T("急卖亏损", "Fire-sale losses")}</div><div class="v neg" id="aoc-loss">–</div></div>
        <div class="stat"><div class="k">${T("剩余资本", "Capital left")}</div><div class="v" id="aoc-eq">–</div></div>
        <div class="stat"><div class="k">${T("理论临界取款", "Theoretical run threshold")}</div><div class="v acc" id="aoc-th">–</div></div>
      </div>
      <div class="demo-block">
        <div class="demo-label">${T("逐日累计取款（占期初存款）", "Cumulative withdrawals by day (% of starting deposits)")}</div>
        <div class="stages" id="aoc-days"></div>
      </div>
      <div id="aoc-chart"></div>
      <div class="demo-log" id="aoc-log"></div>
      <p class="demo-tip">${T(
        "先点“健康银行 + 小谣言”，再点“同一家银行 + 大谣言”：银行的资产一模一样，结局却从“平息”变成“资不抵债”——这就是戴蒙德–迪布维格的两个均衡。然后打开最后贷款人，或把受保比例拉到 70%，看循环在哪一步被打断；再把急卖价拉到 100%，你会发现没有火售折价，挤兑就只是一次取款。",
        "Click “Healthy bank + small rumor,” then “Same bank + big rumor”: identical assets, but the ending flips from “calm” to “insolvent” — Diamond–Dybvig's two equilibria. Then switch on the lender of last resort, or raise insured depositors to 70%, and watch where the loop breaks. Finally set the fire-sale price to 100%: without a fire-sale discount, a run is just a lot of withdrawals."
      )}</p>
    </div>`;

  const q = (s) => root.querySelector(s);

  function simulate(P) {
    const A = 1000, E0 = A * P.e / 100, D0 = A - E0;
    let cash = A * P.c / 100, loans = A - cash, lolr = 0, D = D0, loss = 0;
    const p = P.p / 100, dep = D0 / N, rand = rng(11);
    const ppl = Array.from({ length: N }, () => ({ th: 0.02 + 0.98 * rand(), ins: rand() * 100 < P.ins, gone: false }));
    const days = [{ t: 0, w: 0, eq: 1, n: 0 }];
    let fear = P.r / 100, outcome = "calm", logs = [];
    for (let t = 1; t <= MAXDAY; t++) {
      const run = ppl.filter((x) => !x.gone && !x.ins && x.th < fear);
      if (!run.length) { outcome = "calm"; break; }
      let need = run.length * dep, paid = 0;
      const fromCash = Math.min(cash, need); cash -= fromCash; need -= fromCash; paid += fromCash;
      let borrowed = 0, sold = 0, dayLoss = 0;
      if (need > 1e-9 && P.lolr) {
        const cap = loans * 0.9 - lolr;
        borrowed = Math.max(0, Math.min(cap, need)); lolr += borrowed; need -= borrowed; paid += borrowed;
      } else if (need > 1e-9) {
        const book = Math.min(loans, need / p);
        const proceeds = book * p; sold = book; dayLoss = book - proceeds;
        loans -= book; loss += dayLoss; need -= proceeds; paid += proceeds;
      }
      D -= paid;
      run.forEach((x) => (x.gone = true));
      const equity = cash + loans - lolr - D;
      const w = (D0 - D) / D0;
      days.push({ t, w, eq: equity / E0, n: run.length });
      logs.push({ t, n: run.length, fromCash, borrowed, sold, dayLoss, equity });
      if (need > 1e-6) { outcome = "illiquid"; break; }
      if (equity < 0) { outcome = "insolvent"; break; }
      fear = Math.max(fear, w + 0.8 * Math.max(0, 1 - equity / E0));
      if (t === MAXDAY) outcome = "calm";
    }
    const last = days[days.length - 1];
    const Cc = A * P.c / 100;
    const thr = p < 1 ? (Cc + E0 * p / (1 - p)) / D0 : Infinity;
    return { days, outcome, loss, eq: last.eq, w: last.w, thr, logs, E0 };
  }

  function paint() {
    ["c", "e", "p", "r", "ins"].forEach((k) => { q(`#aoc-s-${k}`).value = S[k]; q(`#aoc-v-${k}`).textContent = S[k]; });
    root.querySelectorAll("#aoc-lolr button").forEach((b) => b.classList.toggle("on", (b.dataset.v === "1") === S.lolr));
    const R = simulate(S);
    const outTxt = { calm: T("挤兑平息", "Run dies out"), insolvent: T("资不抵债", "Insolvent"), illiquid: T("无法兑付", "Can't pay out") }[R.outcome];
    const ov = q("#aoc-out"); ov.textContent = outTxt; ov.className = "v " + (R.outcome === "calm" ? "pos" : "neg");
    q("#aoc-w").textContent = fmtPct(R.w, 0);
    q("#aoc-loss").textContent = fmtUsd(R.loss) + "k";
    const ev = q("#aoc-eq"); ev.textContent = fmtPct(R.eq, 0); ev.className = "v " + (R.eq >= 0.5 ? "pos" : "neg");
    q("#aoc-th").textContent = isFinite(R.thr) ? (R.thr >= 1 ? T("无（>100%）", "none (>100%)") : fmtPct(R.thr, 0)) : T("无", "none");

    q("#aoc-days").innerHTML = R.days.slice(1).map((d) => `
      <div class="stage-bar"><span class="lab">${T("第 " + d.t + " 天", "Day " + d.t)}</span>
      <div class="track"><div class="fill" style="width:${clamp(d.w * 100, 0, 100)}%;background:${d.eq < 0 ? "var(--red)" : "var(--orange)"}"></div></div>
      <span class="val">${fmtPct(d.w, 0)}</span></div>`).join("") || `<div class="demo-meta">${T("没有人排队。", "Nobody is in line.")}</div>`;

    const arrW = R.days.map((d) => d.w * 100), arrE = R.days.map((d) => d.eq * 100);
    const hi = Math.max(1, R.days.length - 1);
    const step = (arr) => (x) => arr[Math.min(arr.length - 1, Math.floor(x + 1e-9))];
    const ch = lineChart({ fns: [{ f: step(arrW), cls: "line3" }, { f: step(arrE), cls: "line4" }], lo: 0, hi, xlabel: T("天", "day"), forceZero: true, uid: "aoc" });
    q("#aoc-chart").innerHTML = chartBlock(ch, [["var(--red)", T("累计取款 %", "cumulative withdrawals %")], ["var(--green)", T("剩余资本（期初 = 100）", "capital left (start = 100)")]]);

    const lines = R.logs.map((l) => {
      const parts = [`${T("第", "Day")} ${l.t}${T(" 天", "")}: ${l.n} ${T("人排队", "people queue")}`];
      if (l.fromCash > 0) parts.push(`${T("现金付", "cash pays")} ${fmtUsd(l.fromCash)}k`);
      if (l.borrowed > 0) parts.push(`<span class="ok">${T("央行借来", "borrowed from central bank")} ${fmtUsd(l.borrowed)}k</span>`);
      if (l.sold > 0) parts.push(`<span class="bad">${T("急卖账面", "fire-sold book")} ${fmtUsd(l.sold)}k，${T("亏", "loss")} ${fmtUsd(l.dayLoss)}k</span>`);
      parts.push(`${T("资本余", "capital")} ${fmtUsd(l.equity)}k`);
      return parts.join(" · ");
    });
    const end = {
      calm: `<span class="ok">${T("没有新的储户加入排队，恐慌停在原地——好均衡。", "No new depositors join the line and the panic stalls — the good equilibrium.")}</span>`,
      insolvent: `<span class="bad">${T("急卖亏损吃光资本，银行资不抵债，被监管关闭——坏均衡。注意：最初的谣言并不需要是真的。", "Fire-sale losses have eaten all the capital; the bank is insolvent and closed — the bad equilibrium. Note the original rumor never had to be true.")}</span>`,
      illiquid: `<span class="bad">${T("能变现的东西都用完了，后面排队的人拿不到钱。", "Everything that could be turned into cash is gone; the back of the line gets nothing.")}</span>`,
    }[R.outcome];
    const thrTex = tex(String.raw`W^{*} = C + E \times \frac{p}{1 - p}`);
    const thrLine = isFinite(R.thr) && R.thr < 1
      ? T(`公式 ${thrTex}：取款超过存款的 ${fmtPct(R.thr, 0)}，光是急卖亏损就会让资本归零。`, `Formula ${thrTex}: withdrawals above ${fmtPct(R.thr, 0)} of deposits wipe out capital through fire-sale losses alone.`)
      : T("急卖没有折价（或资本极厚）时，理论上不存在“仅因火售而资不抵债”的临界点。", "With no fire-sale discount (or very thick capital) there is no threshold at which fire sales alone cause insolvency.");
    q("#aoc-log").innerHTML = [...lines, end, thrLine].map((l) => `<div>${l}</div>`).join("") || `<div>${end}</div>`;
    root.querySelectorAll("#aoc-presets .demo-btn").forEach((b) => b.classList.remove("active"));
  }

  ["c", "e", "p", "r", "ins"].forEach((k) => q(`#aoc-s-${k}`).addEventListener("input", (ev) => { S[k] = +ev.target.value; paint(); }));
  root.querySelectorAll("#aoc-lolr button").forEach((b) => b.addEventListener("click", () => { S.lolr = b.dataset.v === "1"; paint(); }));
  root.querySelectorAll("#aoc-presets .demo-btn").forEach((b) => b.addEventListener("click", () => {
    const pr = presets.find((x) => x.k === b.dataset.k); Object.assign(S, pr.v); paint(); b.classList.add("active");
  }));
  paint();
}
