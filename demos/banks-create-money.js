// 交互演示：T 型账户模拟器——青橙银行（百万美元）。放贷、付款到别家银行、还贷、存现、加息、坏账、挤兑，
// 实时看资产 = 负债 + 权益、货币总量怎么变、资本率与流动性怎么变，以及期限错配在挤兑时怎么把浮亏变成实亏。
import { bondPrice, fmtNum, fmtPct, clamp, tex } from "./_fin.js";

export default function mount(root, lang) {
  const en = lang === "en";
  const T = (zh, e) => (en ? e : zh);

  const START = { R: 10, L: 60, Bface: 30, D: 90, CB: 0 };
  const COUPON = 0.03, BOND_YRS = 10; // 银行买入时：10 年期、票息 3%、按面值买入
  let s = { ...START }, y = 0.03, runPct = 30, log = [], failed = false;

  const bondPx = () => bondPrice(100, COUPON, y, BOND_YRS) / 100; // 每 1 面值的市价
  const Bmv = () => s.Bface * bondPx();
  const assets = () => s.R + s.L + Bmv();
  const equity = () => assets() - s.D - s.CB;

  root.innerHTML = `
    <div class="demo">
      <div class="demo-head">${T("🏦 T 型账户模拟器：亲手经营“青橙银行”（单位：百万美元）", "🏦 T-account simulator: run “Green Orange Bank” yourself ($ millions)")}</div>
      <div class="demo-block">
        <div class="demo-btns">
          <button class="demo-btn" data-a="loan">${T("➕ 发放贷款 10", "➕ Make a loan of 10")}</button>
          <button class="demo-btn" data-a="pay">${T("➡️ 借款人付款到别家银行 10", "➡️ Borrower pays 10 to another bank")}</button>
          <button class="demo-btn" data-a="repay">${T("↩️ 客户还贷 10", "↩️ Customer repays 10")}</button>
          <button class="demo-btn" data-a="cash">${T("💵 客户存入现金 5", "💵 Customer deposits 5 in cash")}</button>
          <button class="demo-btn" data-a="bad">${T("⚠️ 5% 贷款变坏账", "⚠️ 5% of loans go bad")}</button>
          <button class="demo-btn" data-a="reset">${T("⟲ 重置", "⟲ Reset")}</button>
        </div>
      </div>
      <div class="cmp" id="bcm-t"></div>
      <div class="stat-row">
        <div class="stat"><div class="k">${T("新创造的存款（货币）", "Deposits created (money)")}</div><div class="v acc" id="bcm-m">0</div></div>
        <div class="stat"><div class="k">${T("资本率（权益/资产）", "Capital ratio (equity/assets)")}</div><div class="v" id="bcm-cap">–</div></div>
        <div class="stat"><div class="k">${T("准备金/存款", "Reserves/deposits")}</div><div class="v" id="bcm-liq">–</div></div>
        <div class="stat"><div class="k">${T("状态", "Status")}</div><div class="v" id="bcm-st" style="font-size:14px">–</div></div>
      </div>
      <div class="demo-grid" style="margin-top:14px">
        <div class="demo-block">
          <label class="demo-label">${T("市场利率（银行持有的是票息 3% 的 10 年期债券）", "Market rate (the bank holds 10-year bonds with a 3% coupon)")}${T("：", ": ")}<b id="bcm-yv">3.0%</b></label>
          <input class="demo-slider" type="range" id="bcm-y" min="0" max="8" step="0.25" value="3"/>
          <div class="demo-meta" id="bcm-bond"></div>
        </div>
        <div class="demo-block">
          <label class="demo-label">${T("挤兑规模：储户同时取走存款的比例", "Run size: share of deposits withdrawn at once")}${T("：", ": ")}<b id="bcm-rv">30%</b></label>
          <input class="demo-slider" type="range" id="bcm-r" min="5" max="80" step="5" value="30"/>
          <div class="demo-btns"><button class="demo-btn" data-a="run">${T("🏃 发生挤兑！", "🏃 Start a run!")}</button></div>
        </div>
      </div>
      <div class="demo-log" id="bcm-log"></div>
      <p class="demo-tip">${T(
        "先点“发放贷款”：贷款和存款<strong>同时</strong>增加，货币凭空多了 10——这就是银行造钱。再点“付款到别家银行”，看准备金被拖走、不够时只能向央行借。最后把利率拉到 6% 再点“挤兑”：银行被迫卖掉跌价的债券，浮亏变实亏——这就是 2023 年硅谷银行的剧本。",
        "Click “make a loan” first: loans and deposits rise <strong>together</strong> and 10 of new money appears from nowhere — that is bank money creation. Then “pay another bank” and watch reserves drain until the bank must borrow from the central bank. Finally drag the rate to 6% and start a run: the bank is forced to sell its underwater bonds and paper losses turn real — the 2023 SVB script."
      )}</p>
    </div>`;

  const $ = (q) => root.querySelector(q);
  const push = (cls, msg) => { log.unshift(`<span class="${cls}">${msg}</span>`); log = log.slice(0, 6); };

  const row = (lab, v, max, color) => `<div class="stage-bar"><span class="lab">${lab}</span><div class="track"><div class="fill" style="width:${clamp((Math.max(0, v) / max) * 100, 0, 100)}%;background:${color}"></div></div><span class="val">${fmtNum(v, 1)}</span></div>`;

  const paint = () => {
    const A = assets(), E = equity(), max = Math.max(A, s.D + s.CB + Math.max(E, 0), 1);
    $("#bcm-t").innerHTML = `
      <div class="cmp-cell"><h5>${T("资产", "Assets")} · ${fmtNum(A, 1)}</h5>
        ${row(T("准备金", "Reserves"), s.R, max, "var(--green)")}
        ${row(T("贷款", "Loans"), s.L, max, "var(--orange)")}
        ${row(T("债券（市价）", "Bonds (market)"), Bmv(), max, "var(--orange-line)")}
      </div>
      <div class="cmp-cell"><h5>${T("负债 + 权益", "Liabilities + equity")} · ${fmtNum(s.D + s.CB + E, 1)}</h5>
        ${row(T("存款", "Deposits"), s.D, max, "var(--blue)")}
        ${row(T("央行借款", "Central-bank loan"), s.CB, max, "var(--muted)")}
        ${row(T("股东权益", "Equity"), E, max, E > 0 ? "var(--green)" : "var(--red)")}
      </div>`;
    const m = s.D - START.D;
    $("#bcm-m").textContent = (m >= 0 ? "+" : "") + fmtNum(m, 1);
    const cap = A > 0 ? E / A : 0;
    const capEl = $("#bcm-cap"); capEl.textContent = fmtPct(cap, 1); capEl.className = "v " + (cap < 0 ? "neg" : cap < 0.07 ? "acc" : "pos");
    $("#bcm-liq").textContent = s.D > 0 ? fmtPct(s.R / s.D, 1) : "–";
    const st = $("#bcm-st");
    if (failed || E <= 0) st.innerHTML = `<span class="pill bad">${T("资不抵债", "Insolvent")}</span>`;
    else if (s.CB > 0) st.innerHTML = `<span class="pill bad">${T("靠央行输血", "On central-bank support")}</span>`;
    else if (cap < 0.07) st.innerHTML = `<span class="pill bad">${T("资本不足", "Undercapitalized")}</span>`;
    else st.innerHTML = `<span class="pill ok">${T("健康", "Healthy")}</span>`;
    const px = bondPx();
    $("#bcm-yv").textContent = fmtPct(y, 2);
    $("#bcm-bond").innerHTML = `${T("每 100 面值债券市价", "Price per 100 of face")}: <b>${fmtNum(px * 100, 1)}</b> · ${T("浮动盈亏", "Unrealized gain/loss")}: <b style="color:${px < 1 ? "var(--red)" : "var(--green)"}">${fmtNum(s.Bface * (px - 1), 1)}</b>`;
    $("#bcm-rv").textContent = runPct + "%";
    $("#bcm-log").innerHTML = log.length ? log.map((l) => `<div>${l}</div>`).join("") : `<div>${T("点上面的按钮开始经营。", "Click a button above to start. ")}${tex(String.raw`\text{${T("资产", "Assets")}} = \text{${T("负债", "liabilities")}} + \text{${T("权益", "equity")}}`)}${T("，这条等式永远成立。", ", always.")}</div>`;
  };

  const act = (a) => {
    if (a === "reset") { s = { ...START }; y = 0.03; $("#bcm-y").value = 3; log = []; failed = false; paint(); return; }
    if (failed) { push("bad", T("银行已被监管接管。点“重置”重新开始。", "The bank has been taken over by regulators. Click “reset” to start over.")); paint(); return; }
    if (a === "loan") {
      const capAfter = equity() / (assets() + 10);
      s.L += 10; s.D += 10;
      push(capAfter < 0.07 ? "warn" : "ok", T(`贷款 +10、存款 +10：新钱诞生。`, `Loans +10, deposits +10: new money is born.`) + (capAfter < 0.07 ? T(" 但资本率已低于 7%，现实中监管会要求先补充资本。", " But the capital ratio is now below 7%; in reality regulators would demand more capital first.") : ""));
    } else if (a === "pay") {
      if (s.D < 10) { push("warn", T("存款不足 10。", "Deposits are below 10.")); paint(); return; }
      s.D -= 10; s.R -= 10;
      if (s.R < 0) { s.CB += -s.R; push("warn", T(`准备金不够，向央行借入 ${fmtNum(-s.R, 1)}（最后贷款人，阶段 1.3）。`, `Not enough reserves — borrowed ${fmtNum(-s.R, 1)} from the central bank (lender of last resort, Stage 1.3).`)); s.R = 0; }
      else push("ok", T("存款 −10、准备金 −10：钱搬去了别家银行，整个体系的存款总量不变。", "Deposits −10, reserves −10: the money moved to another bank; system-wide deposits are unchanged."));
    } else if (a === "repay") {
      if (s.L < 10 || s.D < 10) { push("warn", T("没有足够的贷款或存款可偿还。", "Not enough loans or deposits to repay.")); paint(); return; }
      s.L -= 10; s.D -= 10;
      push("ok", T("贷款 −10、存款 −10：还贷时钱被“销毁”了。", "Loans −10, deposits −10: repaying a loan destroys money."));
    } else if (a === "cash") {
      s.R += 5; s.D += 5;
      push("ok", T("准备金 +5、存款 +5：现金换成了银行的负债。", "Reserves +5, deposits +5: cash swapped for a bank liability."));
    } else if (a === "bad") {
      const loss = s.L * 0.05; s.L -= loss;
      push("bad", T(`坏账 ${fmtNum(loss, 1)}，全部由股东权益吸收——存款人一分不少，直到权益耗尽。`, `Loan losses of ${fmtNum(loss, 1)}, absorbed entirely by equity — depositors lose nothing until equity is gone.`));
    } else if (a === "run") {
      let need = s.D * runPct / 100; const W = need; s.D -= W;
      const fromR = Math.min(s.R, need); s.R -= fromR; need -= fromR;
      let realized = 0, fromB = 0, fromL = 0;
      if (need > 0 && s.Bface > 0) {
        const px = bondPx() * 0.98; // 急售再折 2%
        const faceSold = Math.min(s.Bface, need / px);
        fromB = faceSold * px; s.Bface -= faceSold; need -= fromB;
        realized += faceSold * (1 - px);
      }
      if (need > 0 && s.L > 0) {
        const bookSold = Math.min(s.L, need / 0.75); // 贷款只能 75 折卖出
        fromL = bookSold * 0.75; s.L -= bookSold; need -= fromL;
        realized += bookSold * 0.25;
      }
      push("warn", T(`储户取走 ${fmtNum(W, 1)}：准备金付 ${fmtNum(fromR, 1)}，卖债券得 ${fmtNum(fromB, 1)}，贱卖贷款得 ${fmtNum(fromL, 1)}；已实现亏损 ${fmtNum(realized, 1)}。`, `Depositors withdraw ${fmtNum(W, 1)}: reserves pay ${fmtNum(fromR, 1)}, bond sales raise ${fmtNum(fromB, 1)}, loan fire-sales raise ${fmtNum(fromL, 1)}; realized losses ${fmtNum(realized, 1)}.`));
      if (need > 0.001 || equity() <= 0) {
        failed = true; if (need > 0) s.CB += need;
        push("bad", T("权益耗尽或资产卖光仍付不出——银行倒闭，由存款保险接手。注意：若利率没涨，同样的挤兑可能挺得过去。", "Equity is gone or the assets ran out — the bank fails and deposit insurance takes over. Note: with rates unchanged, the same run might have been survivable."));
      } else if (realized > 0) {
        push("warn", T("挺过来了，但期限错配让浮亏变成了实亏，资本被削薄。", "It survived, but maturity mismatch turned paper losses into real ones and thinned the capital."));
      }
    }
    paint();
  };

  root.querySelectorAll("[data-a]").forEach((b) => b.addEventListener("click", () => act(b.dataset.a)));
  $("#bcm-y").addEventListener("input", (e) => { y = +e.target.value / 100; paint(); });
  $("#bcm-r").addEventListener("input", (e) => { runPct = +e.target.value; paint(); });
  paint();
}
