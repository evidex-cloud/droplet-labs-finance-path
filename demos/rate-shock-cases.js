// 交互演示：利率冲击实验室——两种模式。
// ① 银行（硅谷银行式）：加息 → 债券按市值缩水（bondPrice）→ 储户挤兑 → 卖债把浮亏变实亏；可切换 BTFP（按面值借款）。
// ② 养老金 LDI：收益率跳升 → 杠杆对冲追缴现金 → 卖国债 → 市场冲击推高收益率 → 下一轮；可切换英格兰银行托底。
import { bondPrice, bondRisk, pv, fmtPct, fmtNum, clamp } from "./_fin.js";
import { lineChart, chartBlock } from "./_chart.js";

export default function mount(root, lang) {
  const en = lang === "en";
  const T = (zh, e) => (en ? e : zh);

  let mode = "bank";
  const B = { b: 55, y0: 1.5, T: 10, d: 2.5, e: 8, u: 90, r: 25, btfp: false };
  const L = { shock: 120, lev: 3.5, buf: 10, k: 1.5, boe: false };

  const sl = (id, label, min, max, step, unit) =>
    `<div><label class="demo-label">${label}${T("：", ": ")}<b id="rsc-v-${id}"></b>${unit}</label><input class="demo-slider" type="range" id="rsc-s-${id}" min="${min}" max="${max}" step="${step}"></div>`;

  root.innerHTML = `
    <div class="demo">
      <div class="demo-head">${T("📉 利率冲击实验室：账面亏损什么时候变成危机", "📉 Rate-shock lab: when does a paper loss become a crisis?")}</div>
      <div class="demo-row">
        <div class="demo-seg" id="rsc-mode">
          <button data-m="bank">${T("银行（硅谷银行式）", "Bank (SVB-style)")}</button>
          <button data-m="ldi">${T("养老金 LDI（2022 英国）", "Pension LDI (UK 2022)")}</button>
        </div>
      </div>
      <div id="rsc-bank">
        <div class="demo-grid">
          ${sl("d", T("利率上升", "Rate rise"), 0, 5, 0.25, T(" 个百分点", " pts"))}
          ${sl("T", T("债券期限", "Bond maturity"), 2, 30, 1, T(" 年", " yrs"))}
          ${sl("y0", T("买入时收益率（票息）", "Yield when bought (coupon)"), 0.5, 3, 0.25, "%")}
          ${sl("b", T("债券占资产", "Bonds as % of assets"), 20, 70, 5, "%")}
          ${sl("e", T("资本占资产", "Capital as % of assets"), 4, 12, 1, "%")}
          ${sl("u", T("未受保存款占比", "Uninsured share of deposits"), 0, 100, 5, "%")}
          ${sl("r", T("未受保储户挤兑比例", "Share of uninsured who run"), 0, 100, 5, "%")}
          <div><div class="demo-label">${T("美联储 BTFP（按面值借款）", "Fed BTFP (borrow at par)")}</div>
            <div class="demo-seg" id="rsc-btfp"><button data-v="0">${T("没有", "Off")}</button><button data-v="1">${T("有", "On")}</button></div></div>
        </div>
        <div class="stat-row">
          <div class="stat"><div class="k">${T("债券价格", "Bond price")}</div><div class="v" id="rsc-px">–</div></div>
          <div class="stat"><div class="k">${T("修正久期", "Modified duration")}</div><div class="v" id="rsc-dur">–</div></div>
          <div class="stat"><div class="k">${T("浮亏 / 资本", "Unrealized loss / capital")}</div><div class="v" id="rsc-ul">–</div></div>
          <div class="stat"><div class="k">${T("报表上的资本", "Reported capital")}</div><div class="v" id="rsc-rep">–</div></div>
          <div class="stat"><div class="k">${T("按市值的资本", "Capital at market value")}</div><div class="v" id="rsc-mtm">–</div></div>
        </div>
        <div id="rsc-chart"></div>
        <div class="demo-log" id="rsc-blog"></div>
      </div>
      <div id="rsc-ldi">
        <div class="demo-grid">
          ${sl("shock", T("初始冲击：30 年期收益率跳升", "Initial shock: 30-yr yield jump"), 25, 200, 5, " bp")}
          ${sl("lev", T("LDI 杠杆（国债敞口 ÷ 抵押品）", "LDI leverage (gilt exposure ÷ collateral)"), 1, 7, 0.5, "x")}
          ${sl("buf", T("养老金手边可调的现金", "Pension's ready cash"), 0, 30, 1, "")}
          ${sl("k", T("市场冲击：每卖 1 单位推高收益率", "Market impact per unit sold"), 0.2, 2.5, 0.1, " bp")}
          <div><div class="demo-label">${T("英格兰银行托底购买", "Bank of England backstop buying")}</div>
            <div class="demo-seg" id="rsc-boe"><button data-v="0">${T("没有", "Off")}</button><button data-v="1">${T("有", "On")}</button></div></div>
        </div>
        <div class="stat-row">
          <div class="stat"><div class="k">${T("累计收益率上升", "Total yield rise")}</div><div class="v neg" id="rsc-ty">–</div></div>
          <div class="stat"><div class="k">${T("被迫卖出的国债", "Gilts forced out")}</div><div class="v" id="rsc-sold">–</div></div>
          <div class="stat"><div class="k">${T("剩余对冲比例", "Hedge remaining")}</div><div class="v" id="rsc-hedge">–</div></div>
          <div class="stat"><div class="k">${T("资金充足率", "Funding ratio")}</div><div class="v pos" id="rsc-fr">–</div></div>
        </div>
        <div class="demo-label">${T("每一轮的收益率上升（bp）", "Yield rise in each round (bp)")}</div>
        <div class="stages" id="rsc-rounds"></div>
        <div class="demo-log" id="rsc-llog"></div>
        <div class="demo-meta">${T("示意模型：养老金负债 100（相当于 20 年期零息债），资产 = 成长资产 70 + LDI 抵押品 20 + 现金缓冲；国债敞口按 20 年期零息债定价，初始收益率 3.7%。", "Stylized model: pension liabilities of 100 (like a 20-year zero), assets = growth assets 70 + LDI collateral 20 + a cash buffer; gilt exposure priced as a 20-year zero, starting yield 3.7%.")}</div>
      </div>
      <p class="demo-tip">${T(
        "银行模式：默认参数下浮亏已超过资本，但报表上的资本仍是 8——然后把“挤兑比例”往上拉，看卖债如何把浮亏变成实亏；再打开 BTFP，同样的挤兑不再产生亏损。LDI 模式：看“资金充足率”其实在上升，危机却照样发生；把市场冲击调高、或把杠杆拉到 6 倍，螺旋会吃掉大半甚至全部对冲；打开英格兰银行托底，它很快就停了。",
        "Bank mode: with the defaults the unrealized loss already exceeds capital, yet reported capital is still 8 — now raise the run share and watch selling bonds turn paper losses into real ones; switch on the BTFP and the same run costs nothing. LDI mode: notice the funding ratio actually improves while the crisis still happens; raise market impact or push leverage to 6x and the spiral eats most or all of the hedge — switch on the Bank of England backstop and it stops quickly."
      )}</p>
    </div>`;

  const q = (s) => root.querySelector(s);
  const segOn = (sel, on) => root.querySelectorAll(sel + " button").forEach((b) => b.classList.toggle("on", (b.dataset.v === "1") === on));

  function paintBank() {
    const y0 = B.y0 / 100, dy = B.d / 100;
    const P1 = bondPrice(100, y0, y0 + dy, B.T), lossPct = 1 - P1 / 100;
    const dur = bondRisk(100, y0, y0, B.T).modified;
    const cash = 5, bonds = B.b, e = B.e, dep = 100 - e;
    const U = bonds * lossPct;
    const W = dep * (B.u / 100) * (B.r / 100);
    let need = Math.max(0, W - cash), realized = 0, borrowed = 0, faceSold = 0, unmet = 0;
    if (need > 0) {
      if (B.btfp) { borrowed = Math.min(bonds, need); unmet = need - borrowed; }
      else {
        faceSold = Math.min(bonds, need / (P1 / 100));
        const proceeds = faceSold * P1 / 100; realized = faceSold * lossPct; unmet = Math.max(0, need - proceeds);
      }
    }
    const reported = e - realized, mtm = e - U;
    q("#rsc-px").textContent = fmtNum(P1, 1);
    q("#rsc-dur").textContent = fmtNum(dur, 1);
    const ul = q("#rsc-ul"); ul.textContent = fmtNum(U, 1) + " / " + e; ul.className = "v " + (U > e ? "neg" : "");
    const rp = q("#rsc-rep"); rp.textContent = fmtNum(reported, 1); rp.className = "v " + (reported < 0 ? "neg" : "pos");
    const mv = q("#rsc-mtm"); mv.textContent = fmtNum(mtm, 1); mv.className = "v " + (mtm < 0 ? "neg" : "pos");

    const f = (Tm) => (x) => (1 - bondPrice(100, y0, y0 + x / 100, Tm) / 100) * 100;
    const ch = lineChart({ fns: [{ f: f(2), cls: "line4" }, { f: f(10), cls: "line" }, { f: f(30), cls: "line3" }], lo: 0, hi: 5, xlabel: T("利率上升（百分点）", "rate rise (points)"), markerX: B.d, markerLabel: T("当前", "now"), forceZero: true, uid: "rsc" });
    q("#rsc-chart").innerHTML = chartBlock(ch, [["var(--green)", T("2 年期价格跌幅 %", "2-yr price loss %")], ["var(--orange)", T("10 年期价格跌幅 %", "10-yr price loss %")], ["var(--red)", T("30 年期价格跌幅 %", "30-yr price loss %")]]);

    const lines = [];
    lines.push(T(`利率上升 ${B.d} 个百分点：${B.T} 年期、票息 ${B.y0}% 的债券从 100 跌到 ${fmtNum(P1, 1)}（跌 ${fmtPct(lossPct, 1)}），${bonds} 元债券浮亏 ${fmtNum(U, 1)}，资本只有 ${e}。`,
      `Rates up ${B.d} points: a ${B.T}-year bond with a ${B.y0}% coupon falls from 100 to ${fmtNum(P1, 1)} (−${fmtPct(lossPct, 1)}); $${bonds} of bonds carry an unrealized loss of ${fmtNum(U, 1)} against capital of ${e}.`));
    if (U > e) lines.push(`<span class="warn">${T("按市值计已经资不抵债——但如果债券在“持有至到期”账户里，报表上的资本仍然是满的。只要没人来取钱，银行可以“等到期”。", "At market value the bank is already insolvent — but with the bonds held to maturity, reported capital still looks intact. As long as nobody withdraws, the bank can “wait for maturity.”")}</span>`);
    if (W > 0) lines.push(T(`挤兑：${fmtNum(W, 1)} 的存款被取走（现金只有 ${cash}）。`, `The run: ${fmtNum(W, 1)} of deposits leave (cash on hand: ${cash}).`));
    if (borrowed > 0) lines.push(`<span class="ok">${T(`BTFP 按面值借给银行 ${fmtNum(borrowed, 1)}，不必卖债——浮亏没有被确认。`, `The BTFP lends ${fmtNum(borrowed, 1)} at par, so no bonds are sold — the loss is never realized.`)}</span>`);
    if (faceSold > 0) lines.push(`<span class="bad">${T(`被迫卖出面值 ${fmtNum(faceSold, 1)} 的债券，确认亏损 ${fmtNum(realized, 1)}，报表资本降到 ${fmtNum(reported, 1)}。`, `Forced to sell ${fmtNum(faceSold, 1)} face of bonds, realizing a loss of ${fmtNum(realized, 1)}; reported capital drops to ${fmtNum(reported, 1)}.`)}</span>`);
    if (unmet > 1e-6) lines.push(`<span class="bad">${T("债券卖光也不够付——银行无法兑付，只能被关闭。", "Even selling every bond is not enough — the bank cannot pay and is closed.")}</span>`);
    else if (reported < 0) lines.push(`<span class="bad">${T("已确认的亏损超过资本：银行资不抵债，被监管关闭（这就是 2023 年 3 月 10 日）。", "Realized losses exceed capital: the bank is insolvent and closed (that was March 10, 2023).")}</span>`);
    else if (W > 0) lines.push(`<span class="ok">${T("银行挺过了这一轮取款。", "The bank survives this round of withdrawals.")}</span>`);
    q("#rsc-blog").innerHTML = lines.map((l) => `<div>${l}</div>`).join("");
  }

  function paintLdi() {
    const D = 20, y0 = 0.037, C0 = 20, growth = 70;
    let C = C0, X = C0 * L.lev, buf = L.buf, y = y0, dy = L.shock / 10000, called = 0, sold = 0, blown = false;
    const rounds = [];
    for (let i = 0; i < 10 && dy > 0.00005; i++) {
      const ratio = pv(1, y + dy, D) / pv(1, y, D);
      const loss = X * (1 - ratio);
      C -= loss; y += dy;
      const req = X / L.lev;
      let s = 0;
      if (C < req) {
        const top = Math.min(buf, req - C); buf -= top; C += top; called += top;
        if (C <= 0) { s = X; X = 0; blown = true; C = 0; }
        else if (C < req) { s = X - L.lev * C; X -= s; }
      }
      sold += s;
      rounds.push({ i: i + 1, dy, loss, s });
      if (blown) break;
      dy = (L.k * s / 10000) * (L.boe ? 0.15 : 1);
    }
    const totalBp = (y - y0) * 10000;
    const liab = 100 * pv(1, y, D) / pv(1, y0, D);
    const assets = growth + C + buf;
    const fr0 = (growth + C0 + L.buf) / 100, fr1 = assets / liab;
    q("#rsc-ty").textContent = fmtNum(totalBp, 0) + " bp";
    q("#rsc-sold").textContent = fmtNum(sold, 1);
    const h = q("#rsc-hedge"); h.textContent = fmtPct(X / (C0 * L.lev), 0); h.className = "v " + (X / (C0 * L.lev) < 0.5 ? "neg" : "");
    const fr = q("#rsc-fr"); fr.textContent = fmtPct(fr0, 0) + " → " + fmtPct(fr1, 0); fr.className = "v " + (fr1 >= fr0 ? "pos" : "neg");
    const maxBp = Math.max(...rounds.map((r) => r.dy * 10000), 1);
    q("#rsc-rounds").innerHTML = rounds.map((r) => `
      <div class="stage-bar"><span class="lab">${T("第 " + r.i + " 轮", "Round " + r.i)}</span>
      <div class="track"><div class="fill" style="width:${clamp((r.dy * 10000) / maxBp * 100, 0, 100)}%;background:${r.i === 1 ? "var(--orange)" : "var(--red)"}"></div></div>
      <span class="val">+${fmtNum(r.dy * 10000, 0)}</span></div>`).join("");
    const lines = rounds.map((r) => T(
      `第 ${r.i} 轮：收益率 +${fmtNum(r.dy * 10000, 0)} bp → 对冲亏损 ${fmtNum(r.loss, 1)}${r.s > 0 ? `，被迫卖出国债 ${fmtNum(r.s, 1)}` : "，抵押品够用"}`,
      `Round ${r.i}: yield +${fmtNum(r.dy * 10000, 0)} bp → hedge loss ${fmtNum(r.loss, 1)}${r.s > 0 ? `, forced gilt sales ${fmtNum(r.s, 1)}` : ", collateral holds"}`));
    lines.push(`<span class="ok">${T(`负债现值从 100 降到 ${fmtNum(liab, 1)}：从偿付能力看，养老金变得更健康了。`, `Liabilities fall from 100 to ${fmtNum(liab, 1)} in present value: on solvency, the pension is healthier.`)}</span>`);
    if (blown) lines.push(`<span class="bad">${T("LDI 基金的抵押品被打光，对冲被整体平仓——养老金在最糟的时刻失去了保护，而它卖出的国债又推高了所有人的收益率。", "The LDI fund's collateral is wiped out and the whole hedge is closed — the pension loses its protection at the worst moment, and its forced sales push yields up for everyone.")}</span>`);
    else if (L.boe) lines.push(`<span class="ok">${T("央行承诺买入长期国债，被迫抛售不再推高收益率，螺旋很快熄火。", "With the central bank committed to buy long gilts, forced sales no longer move yields and the spiral dies out fast.")}</span>`);
    else if (sold > 0) lines.push(`<span class="warn">${T(`现金缓冲只有 ${L.buf}，不够的部分只能靠卖国债——每一轮抛售都成为下一轮冲击。`, `The cash buffer is only ${L.buf}; the rest has to come from selling gilts — each round of selling becomes the next shock.`)}</span>`);
    q("#rsc-llog").innerHTML = lines.map((l) => `<div>${l}</div>`).join("");
  }

  function sync() {
    Object.keys(B).forEach((k) => { const s = q(`#rsc-s-${k}`); if (s) { s.value = B[k]; q(`#rsc-v-${k}`).textContent = B[k]; } });
    Object.keys(L).forEach((k) => { const s = q(`#rsc-s-${k}`); if (s) { s.value = L[k]; q(`#rsc-v-${k}`).textContent = L[k]; } });
    segOn("#rsc-btfp", B.btfp); segOn("#rsc-boe", L.boe);
    root.querySelectorAll("#rsc-mode button").forEach((b) => b.classList.toggle("on", b.dataset.m === mode));
    q("#rsc-bank").style.display = mode === "bank" ? "" : "none";
    q("#rsc-ldi").style.display = mode === "ldi" ? "" : "none";
  }
  function paint() { sync(); if (mode === "bank") paintBank(); else paintLdi(); }

  Object.keys(B).forEach((k) => { const s = q(`#rsc-s-${k}`); if (s) s.addEventListener("input", (e) => { B[k] = +e.target.value; paint(); }); });
  Object.keys(L).forEach((k) => { const s = q(`#rsc-s-${k}`); if (s) s.addEventListener("input", (e) => { L[k] = +e.target.value; paint(); }); });
  root.querySelectorAll("#rsc-btfp button").forEach((b) => b.addEventListener("click", () => { B.btfp = b.dataset.v === "1"; paint(); }));
  root.querySelectorAll("#rsc-boe button").forEach((b) => b.addEventListener("click", () => { L.boe = b.dataset.v === "1"; paint(); }));
  root.querySelectorAll("#rsc-mode button").forEach((b) => b.addEventListener("click", () => { mode = b.dataset.m; paint(); }));
  paint();
}
