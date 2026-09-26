// 交互演示：“现在拿 100，还是以后拿 X？”——用二分法问答找出你的无差异点，反推你的个人折现率；
// 换不同的等待期（一周/一月/一年/五年）比较年化后的折现率，看见“双曲贴现”；
// 下半部分把必要回报率拆成不耐心 + 通胀 + 违约风险三层，用 _fin.js 的 pv/fv 看它怎么改变未来钱的现值。
import { pv, fv, fmtPct, fmtUsd, fmtNum, fmtBig } from "./_fin.js";

export default function mount(root, lang) {
  const en = lang === "en";
  const T = (zh, e) => (en ? e : zh);

  const DELAYS = {
    week: { yrs: 1 / 52, hi: 130, name: T("1 周后", "in 1 week") },
    month: { yrs: 1 / 12, hi: 150, name: T("1 个月后", "in 1 month") },
    year: { yrs: 1, hi: 200, name: T("1 年后", "in 1 year") },
    five: { yrs: 5, hi: 500, name: T("5 年后", "in 5 years") },
  };
  const ROUNDS = 7;
  let dk = "year", lo = 100, hi = DELAYS.year.hi, round = 0;
  const results = {};

  const annual = (x, yrs) => Math.pow(x / 100, 1 / yrs) - 1;
  const pctBig = (r) => (r > 10 ? fmtBig(r * 100, 0) + "%" : fmtPct(r, 1));
  const midX = () => Math.round(((lo + hi) / 2) * 2) / 2;

  root.innerHTML = `
    <div class="demo">
      <div class="demo-head">${T("⏳ 你给时间开价多少？找出你的个人折现率", "⏳ What price do you put on time? Find your personal discount rate")}</div>
      <div class="demo-block">
        <label class="demo-label">${T("等待期", "How long you would wait")}</label>
        <div class="demo-seg" id="tv-delay">
          ${Object.keys(DELAYS).map((k) => `<button data-k="${k}" class="${k === dk ? "on" : ""}">${DELAYS[k].name}</button>`).join("")}
        </div>
      </div>
      <div class="scn">
        <div class="scn-q" id="tv-q"></div>
        <div class="demo-btns">
          <button class="demo-btn" id="tv-now"></button>
          <button class="demo-btn" id="tv-later"></button>
          <button class="demo-btn" id="tv-reset">${T("重新开始", "Start over")}</button>
        </div>
        <div class="demo-bar"><span id="tv-prog"></span></div>
        <div class="scn-meta" id="tv-meta"></div>
      </div>
      <div class="demo-block">
        <div class="stat-row">
          <div class="stat"><div class="k">${T("你的无差异点", "Your indifference point")}</div><div class="v acc" id="tv-x">–</div></div>
          <div class="stat"><div class="k">${T("这段时间的回报", "Return for the wait")}</div><div class="v" id="tv-per">–</div></div>
          <div class="stat"><div class="k">${T("折合年化折现率", "Annualized discount rate")}</div><div class="v" id="tv-ann">–</div></div>
        </div>
        <div class="demo-log" id="tv-log"></div>
      </div>

      <div class="demo-block">
        <div class="demo-head" style="margin-top:8px">${T("🧱 把“等一年要多少补偿”拆成三层", "🧱 Build the compensation for waiting a year, layer by layer")}</div>
        <div class="demo-grid-3">
          <div><label class="demo-label">${T("不耐心（纯时间偏好）", "Impatience (pure time preference)")}${T("：", ": ")}<b id="tv-a-v"></b></label><input class="demo-slider" type="range" id="tv-a" min="0" max="8" step="0.5" value="2"></div>
          <div><label class="demo-label">${T("预期通胀", "Expected inflation")}${T("：", ": ")}<b id="tv-i-v"></b></label><input class="demo-slider" type="range" id="tv-i" min="0" max="12" step="0.5" value="3"></div>
          <div><label class="demo-label">${T("对方违约概率 / 年", "Chance the borrower defaults / yr")}${T("：", ": ")}<b id="tv-p-v"></b></label><input class="demo-slider" type="range" id="tv-p" min="0" max="20" step="0.5" value="1"></div>
        </div>
        <div class="stages" id="tv-stack"></div>
        <div class="stat-row">
          <div class="stat"><div class="k">${T("必要年回报率", "Required annual return")}</div><div class="v acc" id="tv-r">–</div></div>
          <div class="stat"><div class="k">${T("10 年后 $1,000 的现值", "PV of $1,000 in 10 yrs")}</div><div class="v" id="tv-pv10">–</div></div>
          <div class="stat"><div class="k">${T("30 年后 $1,000 的现值", "PV of $1,000 in 30 yrs")}</div><div class="v" id="tv-pv30">–</div></div>
          <div class="stat"><div class="k">${T("今天 $100，10 年后", "$100 today, in 10 yrs")}</div><div class="v" id="tv-fv10">–</div></div>
        </div>
      </div>
      <p class="demo-tip">${T(
        "先在“1 周后”和“1 年后”各做一遍问答，再看年化折现率：大多数人对眼前一周要的补偿，折成年化会高得离谱——这就是双曲贴现。下半部分把违约概率拉高，看远期现金流的现值怎么被压扁：<strong>风险越大、期限越长，未来的钱今天越不值钱</strong>。",
        "Run the quiz once for “in 1 week” and once for “in 1 year,” then compare the annualized rates: most people demand so much for waiting one week that it annualizes to an absurd number — that is hyperbolic discounting. In the lower panel, push the default chance up and watch distant cash flows get crushed: <strong>the riskier and further away the money, the less it is worth today</strong>."
      )}</p>
    </div>`;

  const $ = (s) => root.querySelector(s);

  const paintQuiz = () => {
    const d = DELAYS[dk], done = round >= ROUNDS || hi - lo < 1;
    $("#tv-prog").style.width = `${Math.min(100, (round / ROUNDS) * 100)}%`;
    if (!done) {
      const x = midX();
      $("#tv-q").innerHTML = T(
        `第 ${round + 1}/${ROUNDS} 题：现在拿 <b>$100</b>，还是${d.name}拿 <b>${fmtUsd(x, x % 1 ? 2 : 0)}</b>？`,
        `Round ${round + 1}/${ROUNDS}: take <b>$100</b> now, or <b>${fmtUsd(x, x % 1 ? 2 : 0)}</b> ${d.name}?`
      );
      $("#tv-now").textContent = T("现在拿 $100", "$100 now");
      $("#tv-later").textContent = T(`等着拿 ${fmtUsd(x, x % 1 ? 2 : 0)}`, `Wait for ${fmtUsd(x, x % 1 ? 2 : 0)}`);
      $("#tv-now").disabled = false; $("#tv-later").disabled = false;
      $("#tv-meta").textContent = T(`你的无差异点在 ${fmtUsd(lo)} 到 ${fmtUsd(hi)} 之间。`, `Your indifference point lies between ${fmtUsd(lo)} and ${fmtUsd(hi)}.`);
    } else {
      const x = (lo + hi) / 2;
      results[dk] = x;
      $("#tv-q").innerHTML = T(`完成！对“${d.name}”，你的无差异点约为 <b>${fmtUsd(x, 1)}</b>。换一个等待期再试试。`, `Done! For waiting ${d.name.replace("in ", "")}, your indifference point is about <b>${fmtUsd(x, 1)}</b>. Try another waiting period.`);
      $("#tv-now").disabled = true; $("#tv-later").disabled = true;
      $("#tv-meta").textContent = "";
    }
    const x = done ? (lo + hi) / 2 : null;
    $("#tv-x").textContent = x ? fmtUsd(x, 1) : "…";
    $("#tv-per").textContent = x ? fmtPct(x / 100 - 1, 1) : "…";
    $("#tv-ann").textContent = x ? pctBig(annual(x, d.yrs)) : "…";
    paintLog();
  };

  const paintLog = () => {
    const keys = Object.keys(DELAYS).filter((k) => results[k] != null);
    const lines = [];
    if (!keys.length) {
      lines.push(`<span class="warn">${T("回答几道题，结果会记录在这里。", "Answer a few rounds and your results will appear here.")}</span>`);
    } else {
      keys.forEach((k) => {
        const r = annual(results[k], DELAYS[k].yrs);
        lines.push(`${DELAYS[k].name}${T("：", ": ")}${fmtUsd(results[k], 1)} → ${T("年化", "annualized")} <b>${pctBig(r)}</b>`);
      });
      if (results.year != null) {
        const r = annual(results.year, 1);
        const bench = [
          [0.04, T("约等于把钱放进短期国债的回报（示意 4%）", "roughly what a short-term Treasury pays (illustrative 4%)")],
          [0.2, T("接近信用卡的年利率（约 20%）", "close to a typical credit-card APR (about 20%)")],
          [3.9, T("到了发薪日贷款的量级（约 390%）", "payday-loan territory (about 390%)")],
        ];
        const hit = bench.filter(([b]) => r >= b * 0.8).pop();
        lines.push(hit ? `${T("你的一年期折现率", "Your one-year rate is")} ${fmtPct(r, 1)}${T("：", " — ")}${hit[1]}` : `${T("你的一年期折现率只有", "Your one-year rate is only")} ${fmtPct(r, 1)}${T("——你是个很有耐心的人，把钱借给你很便宜。", " — a patient saver; money lent to you would be cheap.")}`);
      }
      const shortK = ["week", "month"].find((k) => results[k] != null);
      const longK = ["five", "year"].find((k) => results[k] != null);
      if (shortK && longK) {
        const rs = annual(results[shortK], DELAYS[shortK].yrs), rl = annual(results[longK], DELAYS[longK].yrs);
        lines.push(rs > rl * 1.5
          ? `<span class="bad">${T("双曲贴现：你对短期等待要求的年化补偿是长期的", "Hyperbolic discounting: your annualized rate for the short wait is")} ${rs / Math.max(rl, 1e-6) > 1000 ? T("上千", "over 1,000") : fmtNum(rs / Math.max(rl, 1e-6), 1)}${T(" 倍。同样一段时间，放在眼前就显得“贵”得多。", "× your long-wait rate. The same stretch of time feels far more expensive when it is right in front of you.")}</span>`
          : `<span class="ok">${T("你的短期和长期折现率大致一致——时间上很“一致”，这在实验里并不常见。", "Your short- and long-horizon rates are roughly consistent — unusual in experiments.")}</span>`);
      }
    }
    $("#tv-log").innerHTML = lines.map((l) => `<div>${l}</div>`).join("");
  };

  const resetQuiz = () => { lo = 100; hi = DELAYS[dk].hi; round = 0; paintQuiz(); };

  $("#tv-now").addEventListener("click", () => { lo = midX(); round++; paintQuiz(); });
  $("#tv-later").addEventListener("click", () => { hi = midX(); round++; paintQuiz(); });
  $("#tv-reset").addEventListener("click", resetQuiz);
  root.querySelectorAll("#tv-delay button").forEach((b) => b.addEventListener("click", () => {
    dk = b.dataset.k;
    root.querySelectorAll("#tv-delay button").forEach((x) => x.classList.toggle("on", x === b));
    resetQuiz();
  }));

  const paintStack = () => {
    const a = +$("#tv-a").value / 100, i = +$("#tv-i").value / 100, p = +$("#tv-p").value / 100;
    $("#tv-a-v").textContent = fmtPct(a, 1); $("#tv-i-v").textContent = fmtPct(i, 1); $("#tv-p-v").textContent = fmtPct(p, 1);
    const r = ((1 + a) * (1 + i)) / (1 - p) - 1;
    const rA = a, rI = (1 + a) * (1 + i) - 1 - a, rP = r - (1 + a) * (1 + i) + 1;
    const maxR = 0.45;
    const bar = (lab, v, col) => `<div class="stage-bar"><span class="lab">${lab}</span><div class="track"><div class="fill" style="width:${Math.min(100, (v / maxR) * 100)}%;background:${col}"></div></div><span class="val">${fmtPct(v, 2)}</span></div>`;
    $("#tv-stack").innerHTML =
      bar(T("不耐心", "Impatience"), rA, "var(--orange)") +
      bar(T("通胀补偿", "Inflation"), rI, "var(--blue)") +
      bar(T("风险补偿", "Default risk"), rP, "var(--red)") +
      bar(T("合计（相乘）", "Total (multiplied)"), r, "var(--ink)");
    $("#tv-r").textContent = fmtPct(r, 2);
    $("#tv-pv10").textContent = fmtUsd(pv(1000, r, 10), 0);
    $("#tv-pv30").textContent = fmtUsd(pv(1000, r, 30), 0);
    $("#tv-fv10").textContent = fmtUsd(fv(100, r, 10), 0);
  };
  ["#tv-a", "#tv-i", "#tv-p"].forEach((s) => $(s).addEventListener("input", paintStack));

  paintQuiz();
  paintStack();
}
