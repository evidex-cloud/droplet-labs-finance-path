// 交互演示：通胀体制沙盘（示意模型）——设定期初的通胀预期与利率、这一年的通胀意外与增长意外、央行的反应方式，
// 用共享引擎算出现金、10 年期国债、股票（戈登模型）、60/40 的实际回报，并给出黄金与比特币的示意反应；看股债相关性何时翻转。
import { bondPrice, gordon, realRate, fmtPct, fmtNum, clamp, tex } from "./_fin.js";

export default function mount(root, lang) {
  const en = lang === "en";
  const T = (zh, e) => (en ? e : zh);

  const BASE = { pe: 2.5, ps: 3, gs: 0, resp: "neutral", y0: 5.2, c0: 3.9 };
  let st = { ...BASE };
  // 央行反应：短端对通胀意外的反应系数 k（泰勒原则要求 > 1）；长期通胀预期跟着意外漂移的比例 e；鸽派时的额外期限溢价
  const RESP = {
    dove: { k: 0.5, e: 0.6, tp: 0.25 },
    neutral: { k: 1.0, e: 0.15, tp: 0 },
    hawk: { k: 1.5, e: 0.05, tp: -0.1 },
  };

  const model = (s) => {
    const R = RESP[s.resp];
    const pi = (s.pe + s.ps) / 100;                                    // 实际通胀
    const dS = R.k * s.ps + 0.5 * s.gs;                                // 政策利率变化（百分点）
    const dY = 0.45 * s.ps + 0.3 * s.gs + R.tp * Math.max(s.ps, 0);    // 10 年期收益率变化（百分点）
    const cash = Math.max(0, s.c0 + dS / 2) / 100;                     // 一年里现金的平均收益
    const y0 = s.y0 / 100, y1 = Math.max(-0.01, y0 + dY / 100);
    const bond = bondPrice(100, y0, y1, 10) / 100 - 1 + y0;             // 10 年期国债：价格变化 + 票息
    const infl = pi * 100;
    const dRealS = dS - s.ps;                                          // 实际短端利率变化（百分点）
    const dReal10 = dY - R.e * s.ps;                                    // 实际长端利率变化（百分点）
    // 股票：戈登模型里 (r − g) 的变化 = 实际长端利率变化 + 风险溢价变化（高通胀、衰退担忧都会抬高它）；一年内只部分重定价
    const erp = 0.15 * Math.max(infl - 4, 0) + 0.7 * Math.max(-s.gs, 0);
    const x = Math.max(-0.035, (dReal10 + erp) / 100);
    const ratio = Math.pow(gordon(1, 0.08 + x, 0.04) / gordon(1, 0.08, 0.04), 0.7);
    const eg = 0.05 + 0.02 * s.gs + 0.006 * s.ps;                       // 名义盈利增长
    const stock = (1 + eg) * ratio - 1 + 0.015;
    const p6040 = 0.6 * stock + 0.4 * bond;
    const realLvl = s.c0 + dS - infl;                                  // 年末实际政策利率水平（百分点）：高实际利率是不生息资产的机会成本
    const goldReal = (-8 * (0.5 * dRealS + 0.5 * dReal10) - 1.5 * (realLvl - 1) + (s.gs <= -3 ? 5 : 0)) / 100;
    const btcReal = Math.max(-0.9, (-15 * dRealS - 20 * dReal10 - 3 * (realLvl - 1) + 5 * s.gs) / 100);
    return {
      pi, dS, dY, cashR: realRate(cash, pi), bondR: realRate(bond, pi), stockR: realRate(stock, pi), p6040R: realRate(p6040, pi),
      goldReal, btcReal, realPolicy: (s.c0 + dS) / 100 - pi,
    };
  };

  root.innerHTML = `
    <div class="demo">
      <div class="demo-head">${T("🌡️ 通胀体制沙盘：同样的通胀，不同的央行，资产的命运为何天差地别？（示意模型）", "🌡️ Inflation-regime sandbox: same inflation, different central bank — why do assets fare so differently? (illustrative model)")}</div>
      <div class="demo-grid">
        <div class="demo-block">
          <label class="demo-label">${T("期初的通胀预期", "Expected inflation at the start")}${T("：", ": ")}<b id="ir-pev"></b></label>
          <input class="demo-slider" type="range" id="ir-pe" min="0" max="12" step="0.5" value="2.5"/>
          <label class="demo-label">${T("这一年的通胀意外（实际减预期）", "This year's inflation surprise (actual minus expected)")}${T("：", ": ")}<b id="ir-psv"></b></label>
          <input class="demo-slider" type="range" id="ir-ps" min="-4" max="8" step="0.5" value="3"/>
          <label class="demo-label">${T("这一年的增长意外", "This year's growth surprise")}${T("：", ": ")}<b id="ir-gsv"></b></label>
          <input class="demo-slider" type="range" id="ir-gs" min="-5" max="3" step="0.5" value="0"/>
        </div>
        <div class="demo-block">
          <label class="demo-label">${T("期初 10 年期国债收益率", "10-year Treasury yield at the start")}${T("：", ": ")}<b id="ir-y0v"></b></label>
          <input class="demo-slider" type="range" id="ir-y0" min="0.5" max="15" step="0.1" value="5.2"/>
          <label class="demo-label">${T("期初政策利率（现金收益）", "Policy rate at the start (cash yield)")}${T("：", ": ")}<b id="ir-c0v"></b></label>
          <input class="demo-slider" type="range" id="ir-c0" min="0" max="18" step="0.1" value="3.9"/>
          <label class="demo-label">${T("央行怎么回应通胀意外", "How the central bank responds to the surprise")}</label>
          <div class="demo-seg" id="ir-r">
            <button data-v="dove">${T("放任（鸽派）", "Tolerate (dovish)")}</button>
            <button data-v="neutral">${T("跟随", "Follow")}</button>
            <button data-v="hawk">${T("强硬（泰勒原则）", "Tough (Taylor principle)")}</button>
          </div>
        </div>
      </div>
      <div class="stat-row">
        <div class="stat"><div class="k">${T("实际通胀", "Actual inflation")}</div><div class="v acc" id="ir-pi">–</div></div>
        <div class="stat"><div class="k">${T("政策利率 / 10 年期变化", "Policy rate / 10-year change")}</div><div class="v" id="ir-ch">–</div></div>
        <div class="stat"><div class="k">${T("年末实际政策利率", "Real policy rate at year-end")}</div><div class="v" id="ir-rp">–</div></div>
      </div>
      <div class="demo-label" style="margin-top:12px">${T("这一年的实际回报（扣除通胀）", "Real returns for the year (after inflation)")}</div>
      <div class="stages" id="ir-bars"></div>
      <div class="demo-btns">
        <button class="demo-btn" data-p="p74">${T("📖 1974：石油冲击 + 放任", "📖 1974: oil shock + tolerance")}</button>
        <button class="demo-btn" data-p="p81">${T("📖 1981：沃尔克的高实际利率", "📖 1981: Volcker's high real rates")}</button>
        <button class="demo-btn" data-p="p95">${T("📖 1995：大缓和", "📖 1995: Great Moderation")}</button>
        <button class="demo-btn" data-p="p08">${T("📖 2008：通缩式衰退", "📖 2008: deflationary bust")}</button>
        <button class="demo-btn" data-p="p22">${T("📖 2022：通胀归来", "📖 2022: inflation returns")}</button>
        <button class="demo-btn" data-p="p26">${T("📖 2026：石油冲击 + 加息", "📖 2026: oil shock + hike")}</button>
        <button class="demo-btn" data-p="reset">${T("⟲ 重置", "⟲ Reset")}</button>
      </div>
      <div class="demo-log" id="ir-log"></div>
      <p class="demo-tip">${T(
        "保持“通胀意外 +3%”不动，只在“放任 / 跟随 / 强硬”之间切换：现金的实际回报从负变正，黄金与比特币（示意）的方向整个翻过来——对冲的是“被容忍的通胀”，而不是通胀本身。再点“2022”：股票和债券同时大跌，60/40 的保险失灵；点“2008”：增长意外主导时，债券又变回股票的保险。情景按期初利率与典型冲击示意设定，不是当年的真实回报，也不是预测。",
        "Hold the inflation surprise at +3% and just switch between tolerate / follow / tough: cash's real return flips from negative to positive, and the (illustrative) gold and Bitcoin responses reverse entirely — they hedge inflation that is tolerated, not inflation as such. Then hit “2022”: stocks and bonds drop together and 60/40's insurance fails; hit “2008”: when a growth surprise dominates, bonds become stocks' insurance again. Scenarios are stylized from starting rates and typical shocks — not that year's actual returns, and not a forecast."
      )}</p>
    </div>`;

  const $ = (q) => root.querySelector(q);
  const sg = (x, d = 1) => (x >= 0 ? "+" : "") + fmtNum(x, d);

  const paint = () => {
    const M = model(st);
    $("#ir-pev").textContent = fmtNum(st.pe, 1) + "%";
    $("#ir-psv").textContent = sg(st.ps) + T(" 个百分点", " pts");
    $("#ir-gsv").textContent = sg(st.gs) + T(" 个百分点", " pts");
    $("#ir-y0v").textContent = fmtNum(st.y0, 1) + "%";
    $("#ir-c0v").textContent = fmtNum(st.c0, 1) + "%";
    root.querySelectorAll("#ir-r button").forEach((b) => b.classList.toggle("on", b.dataset.v === st.resp));
    $("#ir-pi").textContent = fmtPct(M.pi, 1);
    $("#ir-ch").textContent = sg(M.dS, 2) + " / " + sg(M.dY, 2) + T(" 个百分点", " pts");
    const rp = $("#ir-rp"); rp.textContent = fmtPct(M.realPolicy, 1); rp.className = "v " + (M.realPolicy < 0 ? "neg" : "pos");

    const rows = [
      [T("现金", "Cash"), M.cashR],
      [T("10 年期国债", "10-year Treasury"), M.bondR],
      [T("股票", "Stocks"), M.stockR],
      [T("60/40 组合", "60/40 portfolio"), M.p6040R],
      [T("黄金（示意）", "Gold (illustrative)"), M.goldReal],
      [T("比特币（示意）", "Bitcoin (illustrative)"), M.btcReal],
    ];
    const mx = Math.max(0.1, ...rows.map(([, v]) => Math.abs(v)));
    $("#ir-bars").innerHTML = rows.map(([lab, v]) => `<div class="stage-bar"><span class="lab">${lab}</span>
      <div class="track"><div class="fill" style="width:${clamp(Math.abs(v) / mx * 100, 0, 100)}%;background:${v < 0 ? "var(--red)" : "var(--green)"}"></div></div>
      <span class="val" style="color:${v < 0 ? "var(--red)" : "var(--green)"}">${(v >= 0 ? "+" : "") + fmtPct(v, 1)}</span></div>`).join("");

    const lines = [];
    const q = st.gs >= 0 ? (st.ps <= 0 ? T("通缩式繁荣（增长↑ 通胀↓）", "Goldilocks (growth up, inflation down)") : T("过热 / 再通胀（增长↑ 通胀↑）", "Overheating / reflation (growth up, inflation up)"))
      : (st.ps > 0 ? T("滞胀（增长↓ 通胀↑）", "Stagflation (growth down, inflation up)") : T("通缩式衰退（增长↓ 通胀↓）", "Deflationary bust (growth down, inflation down)"));
    lines.push(`${T("这一年落在：", "This year lands in: ")}<b>${q}</b>`);
    const P = (x, d = 1) => (x < 0 ? "-" : "") + fmtNum(Math.abs(x), d) + String.raw`\%`;
    const iEnd = st.c0 + M.dS;
    lines.push(`${T("通胀与年末实际政策利率：", "Inflation and the real policy rate at year-end: ")}${tex(String.raw`\pi = \pi^{e} + \text{${T("意外", "surprise")}} = ${P(st.pe)} ${st.ps < 0 ? "-" : "+"} ${P(Math.abs(st.ps))} = ${P(M.pi * 100)}`)}${T("；", "; ")}${tex(String.raw`r_{\text{${T("实际", "real")}}} = i - \pi = ${P(iEnd, 2)} - ${P(M.pi * 100)} = ${P(M.realPolicy * 100, 2)}`)}`);
    const infDom = Math.abs(st.ps) > Math.abs(st.gs);
    const sameDir = (M.stockR - M.cashR) * (M.bondR - M.cashR) > 0;
    if (infDom && sameDir) lines.push(`<span class="bad">${T("以通胀意外为主：股票与债券同向变动（股债正相关），债券没能对冲股票。", "The inflation surprise dominates: stocks and bonds move the same way (positive correlation), and bonds fail to hedge stocks.")}</span>`);
    else if (!sameDir) lines.push(`<span class="ok">${T("股票与债券反向变动：债券正在给股票当保险——这是锚定体制或增长冲击主导时的特征。", "Stocks and bonds move in opposite directions: bonds are insuring stocks — the signature of an anchored regime or a growth-led shock.")}</span>`);
    if (M.realPolicy < 0 && st.ps > 0) lines.push(`<span class="warn">${T("年末实际政策利率为负：央行实际上在放松，硬资产（示意）受益，长期预期容易松动——1970 年代的剧本。", "The real policy rate ends negative: the central bank is effectively easing, hard assets (illustrative) benefit, and long-run expectations can come loose — the 1970s script.")}</span>`);
    if (M.realPolicy > 0.02 && st.ps > 0) lines.push(`<span class="warn">${T("实际政策利率明显为正：现金成为赢家，不生息的黄金与比特币（示意）承压——强硬央行的体制。", "The real policy rate is clearly positive: cash wins, non-yielding gold and Bitcoin (illustrative) come under pressure — a tough central bank's regime.")}</span>`);
    lines.push(`${T("60/40 的实际回报：", "60/40 real return: ")}${tex(String.raw`r_{60/40} = 0.6 \times r_{\text{${T("股票", "stocks")}}} + 0.4 \times r_{\text{${T("国债", "Treasuries")}}} = 0.6 \times (${P(M.stockR * 100)}) + 0.4 \times (${P(M.bondR * 100)}) \approx ${P(M.p6040R * 100)}`)}`);
    $("#ir-log").innerHTML = lines.map((l) => `<div>${l}</div>`).join("");
  };

  const sync = () => { $("#ir-pe").value = st.pe; $("#ir-ps").value = st.ps; $("#ir-gs").value = st.gs; $("#ir-y0").value = st.y0; $("#ir-c0").value = st.c0; paint(); };
  [["#ir-pe", "pe"], ["#ir-ps", "ps"], ["#ir-gs", "gs"], ["#ir-y0", "y0"], ["#ir-c0", "c0"]].forEach(([id, k]) =>
    $(id).addEventListener("input", (e) => { st[k] = +e.target.value; paint(); }));
  root.querySelectorAll("#ir-r button").forEach((b) => b.addEventListener("click", () => { st.resp = b.dataset.v; paint(); }));
  root.querySelectorAll("[data-p]").forEach((b) => b.addEventListener("click", () => {
    const p = b.dataset.p;
    if (p === "reset") st = { ...BASE };
    if (p === "p74") st = { pe: 5, ps: 6, gs: -3, resp: "dove", y0: 7, c0: 8 };
    if (p === "p81") st = { pe: 10, ps: 0, gs: -2, resp: "hawk", y0: 12.5, c0: 18 };
    if (p === "p95") st = { pe: 2.8, ps: -0.5, gs: 1, resp: "neutral", y0: 7.8, c0: 5.5 };
    if (p === "p08") st = { pe: 2.5, ps: -3, gs: -4, resp: "dove", y0: 4, c0: 2 };
    if (p === "p22") st = { pe: 2.5, ps: 5.5, gs: -1, resp: "neutral", y0: 1.5, c0: 0.1 };
    if (p === "p26") st = { pe: 2.5, ps: 1.5, gs: 0, resp: "hawk", y0: 4.2, c0: 3.6 };
    sync();
  }));
  sync();
}
