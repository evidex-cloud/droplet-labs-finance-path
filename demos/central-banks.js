// 交互演示：政策利率遥控器（示意模型）——设定政策利率、市场预期的未来路径与期限溢价，
// 看隔夜 → 3 个月 → 2 年 → 10 年 → 30 年 → 房贷利率怎么响应；并算出房贷月供与一张 30 年期国债的价格。
import { bondPrice, npv, fmtPct, fmtUsd, fmtNum } from "./_fin.js";
import { lineChart, chartBlock } from "./_chart.js";

export default function mount(root, lang) {
  const en = lang === "en";
  const T = (zh, e) => (en ? e : zh);

  const NEUTRAL = 0.035;        // 长期中性利率（示意）
  const MORT_SPREAD = 0.018;    // 房贷相对 10 年期国债的利差（示意）
  const LOAN = 400000;
  const BASE = { p: 0.04, path: "hold", tp: 0.01 };
  let st = { ...BASE };

  const SHIFT = { cut: -0.015, hold: 0, hike: 0.01 };
  // 预期的短期利率路径：未来 2 年按预期线性调整，之后以约 3 年的速度回归中性利率
  const shortPath = (t, s) => {
    const p2 = Math.max(0, s.p + SHIFT[s.path]);
    if (t <= 2) return s.p + (p2 - s.p) * (t / 2);
    return NEUTRAL + (p2 - NEUTRAL) * Math.exp(-(t - 2) / 3);
  };
  const tpOf = (n, tp) => tp * (1 - Math.exp(-n / 8)) / (1 - Math.exp(-10 / 8)); // 10 年期 = 设定值
  // n 年期收益率 ≈ 未来 n 年短期利率预期的平均 + 期限溢价
  const yieldOf = (n, s) => {
    if (n <= 1 / 365) return s.p;
    const K = 60; let sum = 0;
    for (let i = 0; i < K; i++) sum += shortPath(((i + 0.5) / K) * n, s);
    return sum / K + tpOf(n, s.tp);
  };
  // 房贷月供：用现值引擎求年金系数
  const payment = (rate) => {
    const flows = []; for (let k = 1; k <= 360; k++) flows.push({ t: k, cf: 1 });
    return LOAN / npv(flows, rate / 12);
  };
  const snapshot = (s) => {
    const y10 = yieldOf(10, s), y30 = yieldOf(30, s);
    return {
      on: s.p, mmf: Math.max(0, s.p - 0.001), b3m: yieldOf(0.25, s), y2: yieldOf(2, s), y10, y30,
      mort: y10 + MORT_SPREAD, pay: payment(y10 + MORT_SPREAD), bond30: bondPrice(100, 0.05, y30, 30),
    };
  };

  root.innerHTML = `
    <div class="demo">
      <div class="demo-head">${T("🎛️ 政策利率遥控器：美联储动一下，哪些利率跟着动？（示意模型）", "🎛️ The policy-rate remote: when the Fed moves, which rates follow? (illustrative model)")}</div>
      <div class="demo-grid">
        <div class="demo-block">
          <label class="demo-label">${T("政策利率（联邦基金利率）", "Policy rate (fed funds)")}${T("：", ": ")}<b id="cb-pv"></b></label>
          <input class="demo-slider" type="range" id="cb-p" min="0" max="8" step="0.25" value="4"/>
        </div>
        <div class="demo-block">
          <label class="demo-label">${T("期限溢价（通胀风险、赤字与供给担忧）", "Term premium (inflation risk, deficit & supply worries)")}${T("：", ": ")}<b id="cb-tv"></b></label>
          <input class="demo-slider" type="range" id="cb-t" min="-0.5" max="2" step="0.1" value="1"/>
        </div>
      </div>
      <div class="demo-block">
        <label class="demo-label">${T("市场预期未来两年的政策路径", "Market's expected policy path over the next two years")}</label>
        <div class="demo-seg" id="cb-path">
          <button data-p="cut">${T("将继续降息", "More cuts coming")}</button>
          <button data-p="hold">${T("按兵不动", "On hold")}</button>
          <button data-p="hike">${T("将加息", "Hikes coming")}</button>
        </div>
      </div>
      <div class="stages" id="cb-bars"></div>
      <div id="cb-chart"></div>
      <div class="stat-row">
        <div class="stat"><div class="k">${T("40 万美元 30 年房贷月供", "Monthly payment, $400k 30-yr mortgage")}</div><div class="v acc" id="cb-pay">–</div></div>
        <div class="stat"><div class="k">${T("5% 票息 30 年期国债价格", "Price of a 5%-coupon 30-yr Treasury")}</div><div class="v" id="cb-b30">–</div></div>
        <div class="stat"><div class="k">${T("货币基金收益", "Money-fund yield")}</div><div class="v" id="cb-mmf">–</div></div>
      </div>
      <div class="demo-btns">
        <button class="demo-btn" id="cb-scn1">${T("📖 情景：2024 年秋——降息但长端上升", "📖 Scenario: autumn 2024 — cuts, yet the long end rises")}</button>
        <button class="demo-btn" id="cb-reset">${T("⟲ 回到起点", "⟲ Back to baseline")}</button>
      </div>
      <div class="demo-log" id="cb-log"></div>
      <p class="demo-tip">${T(
        "先只拖“政策利率”：隔夜和货币基金几乎一对一跟着动，30 年期却动得很少——因为长端看的是未来多年的平均。再把“期限溢价”往右拉：政策利率不变，房贷月供和 30 年期国债价格照样大变。点“2024 年秋”情景，亲眼看到“美联储降息、房贷反而更贵”。模型为示意，不代表真实预测。",
        "First move only the policy rate: overnight rates and money funds follow almost one-for-one, while the 30-year barely moves — the long end averages many future years. Then push the term premium right: with the policy rate unchanged, the mortgage payment and the 30-year bond price still change a lot. Hit the “autumn 2024” scenario to watch “the Fed cuts, mortgages get dearer” happen. Illustrative model, not a forecast."
      )}</p>
    </div>`;

  const $ = (q) => root.querySelector(q);
  const base = snapshot(BASE);

  const paint = () => {
    const now = snapshot(st);
    $("#cb-pv").textContent = fmtPct(st.p, 2);
    $("#cb-tv").textContent = fmtPct(st.tp, 1);
    root.querySelectorAll("#cb-path button").forEach((b) => b.classList.toggle("on", b.dataset.p === st.path));
    const rows = [
      [T("隔夜利率", "Overnight"), now.on, base.on],
      [T("3 个月国债", "3-month bill"), now.b3m, base.b3m],
      [T("2 年期国债", "2-year"), now.y2, base.y2],
      [T("10 年期国债", "10-year"), now.y10, base.y10],
      [T("30 年期国债", "30-year"), now.y30, base.y30],
      [T("30 年房贷", "30-yr mortgage"), now.mort, base.mort],
    ];
    const maxR = 0.1;
    $("#cb-bars").innerHTML = rows.map(([lab, v, b]) => `<div class="stage-bar"><span class="lab">${lab}</span>
      <div class="track"><div class="fill" style="width:${Math.max(0, v) / maxR * 100}%"></div><div class="fill ghost" style="width:${Math.max(0, b) / maxR * 100}%"></div></div>
      <span class="val">${fmtPct(v, 2)}</span></div>`).join("");
    const res = lineChart({
      fns: [
        { f: (n) => yieldOf(n, BASE) * 100, cls: "line2" },
        { f: (n) => yieldOf(n, st) * 100, cls: "line" },
      ],
      lo: 0.25, hi: 30, samples: 60, xlabel: T("期限（年）→ 收益率（%）", "Maturity (years) → yield (%)"), uid: "cb", forceZero: true,
    });
    $("#cb-chart").innerHTML = chartBlock(res, [["var(--blue)", T("起点曲线（政策 4%、按兵不动、期限溢价 1%）", "Baseline curve (policy 4%, on hold, term premium 1%)")], ["var(--orange)", T("当前设定下的收益率曲线", "Yield curve under your settings")]]);
    const pay = $("#cb-pay"); pay.textContent = fmtUsd(now.pay); pay.className = "v " + (now.pay > base.pay + 1 ? "neg" : now.pay < base.pay - 1 ? "pos" : "acc");
    const b30 = $("#cb-b30"); b30.textContent = fmtNum(now.bond30, 1); b30.className = "v " + (now.bond30 < base.bond30 - 0.05 ? "neg" : now.bond30 > base.bond30 + 0.05 ? "pos" : "");
    $("#cb-mmf").textContent = fmtPct(now.mmf, 2);
    // 相对起点的传导比例
    const dP = now.on - base.on, lines = [];
    const bp = (x) => (x >= 0 ? "+" : "") + Math.round(x * 10000) + "bp";
    lines.push(`${T("相对起点：政策利率", "Versus baseline: policy rate")} <b>${bp(dP)}</b> → ${T("2 年期", "2-year")} <b>${bp(now.y2 - base.y2)}</b>${T("，", ", ")}${T("10 年期", "10-year")} <b>${bp(now.y10 - base.y10)}</b>${T("，", ", ")}${T("30 年期", "30-year")} <b>${bp(now.y30 - base.y30)}</b>${T("，", ", ")}${T("房贷月供", "mortgage payment")} <b>${(now.pay >= base.pay ? "+" : "") + fmtUsd(now.pay - base.pay)}</b>`);
    if (Math.abs(dP) > 0.0001) {
      const pass = (now.y30 - base.y30) / dP;
      lines.push(`<span class="${pass < 0 ? "bad" : "warn"}">${T("30 年期对政策利率的传导比例约", "Pass-through from the policy rate to the 30-year is about")} ${fmtNum(pass, 2)}${pass < 0 ? T("——方向相反！长端被期限溢价或预期拖走了。", " — the opposite direction! The long end was pulled by the term premium or expectations.") : T("：隔夜是 1.00，越长越弱。", ": overnight is 1.00, and it weakens with maturity.")}</span>`);
    }
    if (now.bond30 < 90) lines.push(`<span class="bad">${T("30 年期国债价格跌破 90：久期约 15 的长债，对长端利率极其敏感（阶段 4.4）。", "The 30-year bond is below 90: a long bond with duration around 15 is extremely sensitive to long yields (Stage 4.4).")}</span>`);
    $("#cb-log").innerHTML = lines.map((l) => `<div>${l}</div>`).join("");
  };

  const sync = () => { $("#cb-p").value = st.p * 100; $("#cb-t").value = st.tp * 100; paint(); };
  $("#cb-p").addEventListener("input", (e) => { st.p = +e.target.value / 100; paint(); });
  $("#cb-t").addEventListener("input", (e) => { st.tp = +e.target.value / 100; paint(); });
  root.querySelectorAll("#cb-path button").forEach((b) => b.addEventListener("click", () => { st.path = b.dataset.p; paint(); }));
  $("#cb-reset").addEventListener("click", () => { st = { ...BASE }; sync(); });
  $("#cb-scn1").addEventListener("click", () => { st = { p: 0.03, path: "hold", tp: 0.017 }; sync(); });
  sync();
}
