// 交互演示：美联储 T 型账户——从 2026 年 9 月的资产负债表出发，点 QE / QT / 准备金管理购买 / 财政部收支 / 取现 / 紧急贷款，
// 看资产与负债两边怎么同时变、准备金离“充足底线”还有多远、从市场拿走了多少久期，以及地板系统下美联储自己的利息收支。
import { bondRisk, fmtNum, fmtPct, clamp, tex } from "./_fin.js";

export default function mount(root, lang) {
  const en = lang === "en";
  const T = (zh, e) => (en ? e : zh);

  // 单位：十亿美元。国债、MBS、准备金为 H.4.1（2026-09-23 这一周）约数；现金/TGA/逆回购的拆分为示意。
  const START = { tsy: 4560, mbs: 1910, loans: 280, res: 2930, cur: 2400, tga: 850, rrp: 50, oth: 520 };
  const GDP = 32500; // 名义 GDP 年化约 32.5 万亿美元（2026 年二季度）
  let s = { ...START }, dur10 = 0, log = [];
  let size = 250, lower = 0.0375, pYield = 0.025, thr = 2700;

  // 久期：用共享引擎算 10 年期附息国债与 3 个月国库券的修正久期，换算成“10 年期等价”
  const D10 = bondRisk(100, 0.045, 0.05, 10).modified;
  const Dbill = bondRisk(100, 0, 0.042, 0.25, 4).modified;

  const tr = (b) => T(fmtNum(b / 1000, 2) + " 万亿", "$" + fmtNum(b / 1000, 2) + "T");
  const bn = (b) => T(fmtNum(b * 10, 0) + " 亿美元", "$" + fmtNum(b, 0) + "B");

  root.innerHTML = `
    <div class="demo">
      <div class="demo-head">${T("🏛️ 美联储的 T 型账户：亲手做 QE、QT 与准备金管理（单位：美元）", "🏛️ The Fed's T-account: run QE, QT and reserve management yourself")}</div>
      <div class="demo-block">
        <label class="demo-label">${T("每次操作的规模", "Size of each operation")}${T("：", ": ")}<b id="ft-szv"></b></label>
        <input class="demo-slider" type="range" id="ft-sz" min="50" max="1000" step="50" value="250"/>
        <div class="demo-btns">
          <button class="demo-btn" data-a="qe">${T("🟧 QE：买入长期国债", "🟧 QE: buy long Treasuries")}</button>
          <button class="demo-btn" data-a="qt">${T("🟦 QT：到期不续", "🟦 QT: let bonds run off")}</button>
          <button class="demo-btn" data-a="rmp">${T("🧴 准备金管理：买国库券", "🧴 Reserve management: buy bills")}</button>
          <button class="demo-btn" data-a="tgaUp">${T("🏦 财政部发债攒现金", "🏦 Treasury builds its cash pile")}</button>
          <button class="demo-btn" data-a="tgaDown">${T("💸 财政部花钱", "💸 Treasury spends")}</button>
          <button class="demo-btn" data-a="cash">${T("💵 公众多取现金", "💵 Public withdraws cash")}</button>
          <button class="demo-btn" data-a="lend">${T("🚑 危机紧急贷款", "🚑 Emergency lending in a crisis")}</button>
        </div>
        <div class="demo-btns">
          <button class="demo-btn" data-a="p2020">${T("📖 情景：2020 年 QE（约 3 万亿美元）", "📖 Scenario: 2020 QE (about $3T)")}</button>
          <button class="demo-btn" data-a="p2022">${T("📖 情景：2022–25 年 QT（约 2.4 万亿美元）", "📖 Scenario: 2022–25 QT (about $2.4T)")}</button>
          <button class="demo-btn" data-a="reset">${T("⟲ 回到 2026 年 9 月", "⟲ Back to September 2026")}</button>
        </div>
      </div>
      <div class="cmp" id="ft-t"></div>
      <div class="stat-row">
        <div class="stat"><div class="k">${T("总资产", "Total assets")}</div><div class="v acc" id="ft-a">–</div></div>
        <div class="stat"><div class="k">${T("银行准备金 / GDP", "Bank reserves / GDP")}</div><div class="v" id="ft-rg">–</div></div>
        <div class="stat"><div class="k">${T("从市场拿走的久期（10 年期等价）", "Duration removed from market (10-yr equivalents)")}</div><div class="v" id="ft-d">–</div></div>
        <div class="stat"><div class="k">${T("示意", "Illustrative ")}${tex(String.raw`\text{${T("回购利率", "repo rate")}} - \mathrm{IORB}`)}</div><div class="v" id="ft-rp">–</div></div>
      </div>
      <div class="demo-grid" style="margin-top:14px">
        <div class="demo-block">
          <label class="demo-label">${T("目标区间下沿（", "Bottom of target range (")}${tex(String.raw`\mathrm{IORB} = \text{${T("下沿", "bottom")}} + 0.15\%`)}${T("，", ", ")}${tex(String.raw`\mathrm{ON\ RRP} = \text{${T("下沿", "bottom")}}`)}${T("）", ")")}${T("：", ": ")}<b id="ft-lv"></b></label>
          <input class="demo-slider" type="range" id="ft-l" min="0" max="6" step="0.25" value="3.75"/>
          <label class="demo-label">${T("美联储持仓的平均收益率（示意）", "Average yield on the Fed's securities (illustrative)")}${T("：", ": ")}<b id="ft-yv"></b></label>
          <input class="demo-slider" type="range" id="ft-y" min="1" max="5" step="0.1" value="2.5"/>
          <div class="demo-meta" id="ft-pl"></div>
        </div>
        <div class="demo-block">
          <label class="demo-label">${T("银行需要的最低“充足”准备金（示意，没人事先知道）", "Minimum “ample” reserves banks need (illustrative — nobody knows it in advance)")}${T("：", ": ")}<b id="ft-thv"></b></label>
          <input class="demo-slider" type="range" id="ft-th" min="1500" max="3500" step="50" value="2700"/>
          <div class="demo-meta" id="ft-thm"></div>
        </div>
      </div>
      <div class="demo-log" id="ft-log"></div>
      <p class="demo-tip">${T(
        "先点一次“QE”再点一次“准备金管理”：两次都让资产负债表变大同样多，但“拿走的久期”差了几十倍——扩表不等于 QE。再点“2022–25 年 QT”：先被抽干的是 ON RRP，之后才轮到银行准备金；把“充足底线”往上拖，看回购利率怎么突然跳起来（2019 年 9 月的剧本）。最后把目标区间拉到 5.5% 以上：地板系统下加息不改变准备金数量，却会让美联储自己的利息收支变成亏损。",
        "Click “QE” once and “reserve management” once: both grow the balance sheet by the same amount, yet the duration removed differs by a factor of dozens — expansion is not QE. Then run the “2022–25 QT” scenario: ON RRP drains first, bank reserves only after; drag the “ample” floor up and watch the repo rate jump (the September 2019 script). Finally drag the target range above 5.5%: under the floor system a hike leaves the quantity of reserves unchanged but can push the Fed's own interest income into a loss."
      )}</p>
    </div>`;

  const $ = (q) => root.querySelector(q);
  const push = (cls, msg) => { log.unshift(`<span class="${cls}">${msg}</span>`); log = log.slice(0, 7); };
  const row = (lab, v, max, color) => `<div class="stage-bar"><span class="lab">${lab}</span><div class="track"><div class="fill" style="width:${clamp((Math.max(0, v) / max) * 100, 0, 100)}%;background:${color}"></div></div><span class="val">${tr(v)}</span></div>`;

  // 示意的准备金需求曲线：准备金高于底线时回购略低于 IORB；低于底线后急剧上升
  const repoSpreadBp = () => {
    const gap = Math.max(0, thr / Math.max(s.res, 1) - 1);
    return Math.min(800, -6 + 900 * gap);
  };
  // 从 ON RRP 先扣、再扣准备金：谁来买财政部的新债
  const drain = (amt) => {
    const fromR = Math.min(s.rrp, amt);
    s.rrp -= fromR; s.res -= amt - fromR;
    return fromR;
  };

  const act = (a, amt = size) => {
    if (a === "reset") { s = { ...START }; dur10 = 0; log = []; return; }
    if (a === "qe") {
      s.tsy += amt; s.res += amt; dur10 += amt;
      push("ok", T(`QE ${bn(amt)}：资产端国债 +、负债端准备金 +，两边一起变大；市场少了约 ${bn(amt)} 的 10 年期等价久期，期限溢价承压下降。`, `QE of ${bn(amt)}: Treasuries up on the asset side, reserves up on the liability side; the market holds about ${bn(amt)} fewer 10-year equivalents of duration, pressing the term premium down.`));
    } else if (a === "rmp") {
      const d = amt * Dbill / D10;
      s.tsy += amt; s.res += amt; dur10 += d;
      push("ok", T(`准备金管理 ${bn(amt)}：资产负债表同样变大，但买的是 3 个月国库券，只拿走约 ${bn(d)} 的 10 年期等价久期。`, `Reserve management of ${bn(amt)}: the balance sheet grows just as much, but these are 3-month bills, removing only about ${bn(d)} of 10-year-equivalent duration.`));
    } else if (a === "qt") {
      const x = Math.min(amt, s.tsy);
      s.tsy -= x; dur10 -= x;
      const fromR = drain(x);
      push(fromR > 0 ? "warn" : "bad", T(`QT ${bn(x)}：国债到期不续，资产 −。新债的买家先动用 ON RRP 里的钱（${bn(fromR)}），其余 ${bn(x - fromR)} 直接扣银行准备金。`, `QT of ${bn(x)}: maturing Treasuries not replaced, assets down. Buyers of the new debt first tap cash parked in ON RRP (${bn(fromR)}); the remaining ${bn(x - fromR)} comes straight out of bank reserves.`));
    } else if (a === "tgaUp") {
      s.tga += amt; const fromR = drain(amt);
      push("warn", T(`财政部把 ${bn(amt)} 存进 TGA：资产不变，负债端此消彼长——ON RRP −${bn(fromR)}，准备金 −${bn(amt - fromR)}。`, `The Treasury puts ${bn(amt)} into the TGA: assets unchanged, liabilities shuffle — ON RRP −${bn(fromR)}, reserves −${bn(amt - fromR)}.`));
    } else if (a === "tgaDown") {
      const x = Math.min(amt, s.tga); s.tga -= x; s.res += x;
      push("ok", T(`财政部花掉 ${bn(x)}：TGA −，钱流回商业银行，准备金 +。`, `The Treasury spends ${bn(x)}: TGA down, money flows back into banks, reserves up.`));
    } else if (a === "cash") {
      s.cur += amt; s.res -= amt;
      push("warn", T(`公众多取 ${bn(amt)} 现金：银行向美联储兑换纸币，现金 +、准备金 −。`, `The public withdraws ${bn(amt)} in cash: banks swap reserves for notes, currency up, reserves down.`));
    } else if (a === "lend") {
      s.loans += amt; s.res += amt;
      push("ok", T(`紧急贷款 ${bn(amt)}：最后贷款人凭抵押品放款，贷款 +、准备金 +（阶段 1.3 的白芝浩原则）。`, `Emergency lending of ${bn(amt)}: the lender of last resort lends against collateral, loans up, reserves up (Bagehot's rule from Stage 1.3).`));
    }
  };

  const paint = () => {
    const A = s.tsy + s.mbs + s.loans;
    const L = s.res + s.cur + s.tga + s.rrp + s.oth;
    const max = Math.max(s.tsy, s.mbs, s.res, s.cur, 3000);
    $("#ft-t").innerHTML = `
      <div class="cmp-cell"><h5>${T("资产", "Assets")} · ${tr(A)}</h5>
        ${row(T("美国国债", "Treasuries"), s.tsy, max, "var(--orange)")}
        ${row(T("MBS", "MBS"), s.mbs, max, "var(--orange-line)")}
        ${row(T("贷款及其他", "Loans & other"), s.loans, max, "var(--muted)")}
      </div>
      <div class="cmp-cell"><h5>${T("负债与资本", "Liabilities & capital")} · ${tr(L)}</h5>
        ${row(T("银行准备金", "Bank reserves"), s.res, max, s.res < thr ? "var(--red)" : "var(--blue)")}
        ${row(T("流通中现金（示意）", "Currency (illustrative)"), s.cur, max, "var(--green)")}
        ${row(T("财政部 TGA（示意）", "Treasury TGA (illustrative)"), s.tga, max, "var(--orange-line)")}
        ${row(T("ON RRP（示意）", "ON RRP (illustrative)"), s.rrp, max, "var(--btc)")}
        ${row(T("其他与资本", "Other & capital"), s.oth, max, "var(--muted)")}
      </div>`;
    $("#ft-szv").textContent = bn(size);
    $("#ft-a").textContent = tr(A);
    const rg = $("#ft-rg"); rg.textContent = fmtPct(s.res / GDP, 1); rg.className = "v " + (s.res < thr ? "neg" : "");
    $("#ft-d").textContent = (dur10 >= 0 ? "+" : "−") + bn(Math.abs(dur10));
    const sp = repoSpreadBp();
    const rp = $("#ft-rp"); rp.textContent = (sp >= 0 ? "+" : "") + Math.round(sp) + " bp"; rp.className = "v " + (sp > 20 ? "neg" : sp > 0 ? "acc" : "pos");
    // 价格侧：地板系统下的利息收支
    const iorb = lower + 0.0015, rrpRate = lower, dw = lower + 0.0025;
    const income = (s.tsy + s.mbs) * pYield + s.loans * dw;
    const expense = s.res * iorb + s.rrp * rrpRate;
    const net = income - expense;
    $("#ft-lv").textContent = fmtPct(lower, 2) + T("（IORB ", " (IORB ") + fmtPct(iorb, 2) + T("）", ")");
    $("#ft-yv").textContent = fmtPct(pYield, 1);
    const U = (b) => (b < 0 ? "-" : "") + T(fmtNum(Math.abs(b) * 10, 0).replace(/,/g, "{,}") + String.raw`\ \text{亿美元}`, String.raw`\$` + fmtNum(Math.abs(b), 0).replace(/,/g, "{,}") + String.raw`\text{B}`);
    $("#ft-pl").innerHTML = `${T("一年利息收入约", "Annual interest income about")} <b>${bn(income)}</b>${T("，", ", ")}${T("付给准备金与逆回购约", "paid on reserves and ON RRP about")} <b>${bn(expense)}</b>${T("：", ": ")}<span style="color:${net < 0 ? "var(--red)" : "var(--green)"}">${tex(String.raw`\text{${T("净额", "net")}} = ${U(income)} - ${U(expense)} = ${net < 0 ? "" : "+"}${U(net)}`)}</span>${net < 0 ? T("（亏损记为“递延资产”，以后用盈利抵补）", " (losses booked as a “deferred asset,” offset by future earnings)") : ""}`;
    $("#ft-thv").textContent = tr(thr);
    $("#ft-thm").innerHTML = s.res >= thr
      ? `<span class="pill ok">${T("准备金充足", "Reserves ample")}</span> ${T("高出底线", "Above the floor by")} ${tr(s.res - thr)}`
      : `<span class="pill bad">${T("准备金偏紧", "Reserves tight")}</span> ${T("低于底线", "Below the floor by")} ${tr(thr - s.res)}${T("——回购利率开始跳升", " — repo rates start to jump")}`;
    const lines = log.slice();
    if (Math.abs(A - L) > 0.5) lines.unshift(`<span class="bad">${T("账不平！", "The books don't balance!")}</span>`);
    if (s.rrp <= 0.5 && s.res < thr) lines.unshift(`<span class="bad">${T("ON RRP 缓冲已抽干，准备金跌破底线：这就是美联储 2025 年 12 月 1 日停止 QT 的原因。", "The ON RRP cushion is gone and reserves are below the floor: exactly why the Fed ended QT on December 1, 2025.")}</span>`);
    $("#ft-log").innerHTML = lines.length ? lines.map((l) => `<div>${l}</div>`).join("") : `<div>${T("起点：2026 年 9 月 23 日这一周的资产负债表（约数）。点上面的按钮，每一步 ", "Starting point: the balance sheet in the week of September 23, 2026 (rounded). Click a button above; ")}${tex(String.raw`\text{${T("资产", "assets")}} = \text{${T("负债", "liabilities")}} + \text{${T("资本", "capital")}}`)}${T(" 都成立。", " holds at every step.")}</div>`;
  };

  root.querySelectorAll("[data-a]").forEach((b) => b.addEventListener("click", () => {
    const a = b.dataset.a;
    if (a === "p2020") { act("reset"); act("qe", 2600); act("lend", 400); push("warn", T("示意 2020 年：约 3 万亿美元的购债与紧急贷款，准备金暴增。", "A stylized 2020: about $3T of purchases and emergency loans, and reserves balloon.")); }
    else if (a === "p2022") { act("reset"); s.tsy += 2400; s.rrp = 2200; s.res += 250; act("qt", 2400); push("warn", T("示意 2022–25 年：从 ON RRP 超过 2 万亿美元的起点开始缩表 2.4 万亿美元。", "A stylized 2022–25: $2.4T of runoff starting from over $2T parked in ON RRP.")); }
    else act(a);
    paint();
  }));
  $("#ft-sz").addEventListener("input", (e) => { size = +e.target.value; paint(); });
  $("#ft-l").addEventListener("input", (e) => { lower = +e.target.value / 100; paint(); });
  $("#ft-y").addEventListener("input", (e) => { pYield = +e.target.value / 100; paint(); });
  $("#ft-th").addEventListener("input", (e) => { thr = +e.target.value; paint(); });
  paint();
}
