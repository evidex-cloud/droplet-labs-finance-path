// 交互演示：链上借贷沙盘——
// ① 健康因子与清算：设定抵押 ETH、借款、清算阈值、清算奖励与平仓比例，拖动 ETH 价格看健康因子与区间；
//    按“在此价格执行清算”逐轮模拟清算人还债、拿走打折抵押品，直到恢复健康或出现坏账。
// ② 利率曲线：设定拐点与两段斜率，拖动利用率看借款/存款利率，并与 3 个月期国库券收益率对比。
import { btcRating, fmtPct, fmtNum, fmtUsd } from "./_fin.js";
import { lineChart, chartBlock } from "./_chart.js";

export default function mount(root, lang) {
  const en = lang === "en";
  const T = (zh, e) => (en ? e : zh);
  const C = T("：", ": ");
  const TBILL = 0.0424; // 3 个月期国库券收益率，2026 年 9 月 25 日（美国财政部）
  let mode = "hf";
  const hf = { qty: 3, debt: 5000, lt: 0.83, bonus: 0.05, cf: 0.5, px: 3000 };
  const rc = { kink: 0.9, s1: 0.04, s2: 0.6, rf: 0.1, u: 0.8 };

  const sl = (id, label, min, max, step, val) => `
    <label class="demo-label">${label}${C}<b id="${id}-v"></b></label>
    <input class="demo-slider" id="${id}" type="range" min="${min}" max="${max}" step="${step}" value="${val}">`;

  root.innerHTML = `
    <div class="demo">
      <div class="demo-head">${T("🏧 链上借贷沙盘：健康因子、清算与利率曲线", "🏧 On-chain lending sandbox: health factor, liquidation and the rate curve")}</div>
      <div class="demo-seg" id="dl-mode">
        <button data-m="hf" class="on">${T("① 健康因子与清算", "① Health factor & liquidation")}</button>
        <button data-m="rate">${T("② 利用率与利率曲线", "② Utilization & the rate curve")}</button>
      </div>

      <div id="dl-hf">
        <div class="demo-grid">
          <div class="demo-block">
            ${sl("dl-qty", T("抵押的 ETH 数量", "ETH posted as collateral"), 1, 20, 0.5, hf.qty)}
            ${sl("dl-debt", T("借出的 USDC", "USDC borrowed"), 500, 40000, 100, hf.debt)}
            ${sl("dl-px", T("ETH 价格", "ETH price"), 300, 4500, 10, hf.px)}
          </div>
          <div class="demo-block">
            ${sl("dl-lt", T("清算阈值", "Liquidation threshold"), 0.6, 0.93, 0.01, hf.lt)}
            ${sl("dl-bonus", T("清算奖励（清算人的折扣）", "Liquidation bonus (liquidator's discount)"), 0.02, 0.15, 0.005, hf.bonus)}
            <div class="demo-label">${T("平仓比例（一次最多还多少债）", "Close factor (max debt repaid per liquidation)")}</div>
            <div class="demo-seg" id="dl-cf"><button data-c="0.5" class="on">50%</button><button data-c="1">100%</button></div>
            <div class="demo-btns"><button class="demo-btn" id="dl-liq">${T("在此价格执行清算", "Run liquidation at this price")}</button><button class="demo-btn" id="dl-reset">${T("重置为小吴的贷款", "Reset to Casey's loan")}</button></div>
          </div>
        </div>
        <div class="stat-row">
          <div class="stat"><div class="k">${T("健康因子", "Health factor")}</div><div class="v" id="dl-hfv">–</div></div>
          <div class="stat"><div class="k">${T("清算价格", "Liquidation price")}</div><div class="v neg" id="dl-lp">–</div></div>
          <div class="stat"><div class="k">${T("抵押覆盖倍数（抵押品 ÷ 债务）", "Collateral coverage (collateral ÷ debt)")}</div><div class="v acc" id="dl-cov">–</div></div>
          <div class="stat"><div class="k">${T("所处区间", "Zone")}</div><div class="v" id="dl-zone">–</div></div>
        </div>
        <div class="demo-block" id="dl-chart1"></div>
        <div class="demo-log" id="dl-log"></div>
      </div>

      <div id="dl-rate" style="display:none">
        <div class="demo-grid">
          <div class="demo-block">
            ${sl("dl-u", T("利用率 U（已借出 ÷ 存款）", "Utilization U (borrowed ÷ deposits)"), 0, 1, 0.005, rc.u)}
            ${sl("dl-kink", T("拐点利用率", "Kink utilization"), 0.6, 0.95, 0.01, rc.kink)}
            ${sl("dl-rf", T("储备金率（协议留存）", "Reserve factor (protocol's cut)"), 0, 0.3, 0.01, rc.rf)}
          </div>
          <div class="demo-block">
            ${sl("dl-s1", T("拐点前斜率（到拐点时的借款利率）", "Slope before the kink (borrow rate at the kink)"), 0.01, 0.1, 0.005, rc.s1)}
            ${sl("dl-s2", T("拐点后斜率（从拐点到 100% 再加多少）", "Slope after the kink (added from kink to 100%)"), 0.2, 3, 0.05, rc.s2)}
          </div>
        </div>
        <div class="stat-row">
          <div class="stat"><div class="k">${T("借款利率", "Borrow rate")}</div><div class="v neg" id="dl-br">–</div></div>
          <div class="stat"><div class="k">${T("存款利率", "Supply rate")}</div><div class="v pos" id="dl-sr">–</div></div>
          <div class="stat"><div class="k">${T("相对 3 个月国库券（4.24%）", "vs 3-month T-bill (4.24%)")}</div><div class="v" id="dl-sp">–</div></div>
          <div class="stat"><div class="k">${T("每 100 美元存款此刻可取出", "Withdrawable now per $100 deposited")}</div><div class="v" id="dl-wd">–</div></div>
        </div>
        <div class="demo-block" id="dl-chart2"></div>
        <div class="demo-log" id="dl-rlog"></div>
      </div>

      <p class="demo-tip">${T(
        "先把 ETH 价格慢慢往下拖，看健康因子穿过 1 的那一刻；再按“执行清算”，看清算人每一轮还多少、拿走多少，你被罚了多少。然后把价格一下拖到坏账区再清算：抵押品已经不够还债，窟窿落到存款人身上。利率页里，把利用率推过拐点，看利率怎么突然变陡——那是协议在自动阻止一场挤兑。",
        "Drag the ETH price down slowly and watch the health factor cross 1. Press \"Run liquidation\" to see how much the liquidator repays and seizes each round, and what penalty you pay. Then jump the price straight into the bad-debt zone and liquidate: the collateral can no longer cover the debt, and the hole lands on depositors. On the rate tab, push utilization past the kink and watch the rate suddenly steepen. That's the protocol automatically heading off a run."
      )}</p>
    </div>`;

  const q = (s) => root.querySelector(s);
  const HF = (qty, px, lt, debt) => (debt > 0 ? (qty * px * lt) / debt : Infinity);
  let liqLog = "";

  const paintHf = () => {
    q("#dl-qty-v").textContent = fmtNum(hf.qty, 1) + " ETH";
    q("#dl-debt-v").textContent = fmtUsd(hf.debt);
    q("#dl-px-v").textContent = fmtUsd(hf.px);
    q("#dl-lt-v").textContent = fmtPct(hf.lt, 0);
    q("#dl-bonus-v").textContent = fmtPct(hf.bonus, 1);
    const coll = hf.qty * hf.px;
    const h = HF(hf.qty, hf.px, hf.lt, hf.debt);
    const lp = hf.debt / (hf.qty * hf.lt);
    const badPx = hf.debt * (1 + hf.bonus) / hf.qty;
    q("#dl-hfv").textContent = isFinite(h) ? fmtNum(h, 3) : "∞";
    q("#dl-hfv").className = "v " + (h >= 1.25 ? "pos" : h >= 1 ? "acc" : "neg");
    q("#dl-lp").textContent = fmtUsd(lp) + T("（", " (") + fmtPct(lp / hf.px - 1, 1) + T("）", ")");
    q("#dl-cov").textContent = fmtNum(btcRating(coll, hf.debt), 2) + "x";
    const zone = h >= 1.25 ? T("安全", "Safe") : h >= 1 ? T("警戒", "Warning") : hf.px >= badPx ? T("可被清算", "Liquidatable") : T("坏账区", "Bad debt");
    q("#dl-zone").textContent = zone;
    q("#dl-zone").className = "v " + (h >= 1.25 ? "pos" : h >= 1 ? "acc" : "neg");
    const maxLtvWarn = hf.qty > 0 && !liqLog && hf.debt > coll * 0.8 ? `<div class="warn">${T("按 80% 的最高借款比例，以当前价格开这么大的仓会被合约拒绝；这里假设仓位是在更高价格时开的。", "At an 80% max LTV the contract would refuse to open a loan this large at today's price; assume it was opened when ETH was higher.")}</div>` : "";

    const res = lineChart({
      fns: [{ f: (p) => Math.min(4, HF(hf.qty, p, hf.lt, hf.debt)), cls: "line" }, { f: () => 1, cls: "line3" }],
      lo: 300, hi: 4500, xlabel: T("ETH 价格（美元）", "ETH price (USD)"), markerX: hf.px, markerLabel: T("当前", "now"), forceZero: true, uid: "dl1",
    });
    q("#dl-chart1").innerHTML = chartBlock(res, [["var(--orange)", T("健康因子（上限截在 4）", "Health factor (capped at 4)")], ["var(--red)", T("清算线 HF = 1", "Liquidation line HF = 1")]]);
    q("#dl-log").innerHTML = maxLtvWarn + (liqLog || `<div>${T("清算价 ", "Liquidation price ")}${fmtUsd(lp)}${T("；低于约 ", "; below about ")}${fmtUsd(badPx)}${T(" 时，抵押品连“债务 + 清算奖励”都不够，清算人无利可图。", " the collateral can't cover debt plus the liquidation bonus, so liquidating no longer pays.")}</div>`);
  };

  const runLiq = () => {
    let qty = hf.qty, debt = hf.debt, px = hf.px, rounds = [], penalty = 0, bad = 0;
    for (let i = 0; i < 12; i++) {
      const h = HF(qty, px, hf.lt, debt);
      if (!(h < 1) || debt <= 0.01) break;
      let repay = debt * hf.cf;
      let seizeVal = repay * (1 + hf.bonus);
      if (seizeVal > qty * px) { seizeVal = qty * px; repay = seizeVal / (1 + hf.bonus); }
      qty -= seizeVal / px; debt -= repay; penalty += seizeVal - repay;
      rounds.push(`<div class="bad">${T("第 ", "Round ")}${i + 1}${T(" 轮：清算人还 ", ": liquidator repays ")}${fmtUsd(repay)}${T("，拿走 ", ", seizes ")}${fmtNum(seizeVal / px, 3)} ETH${T("（价值 ", " (worth ")}${fmtUsd(seizeVal)}${T("）→ 剩 ", ") → left: ")}${fmtNum(qty, 3)} ETH${T("、债务 ", ", debt ")}${fmtUsd(debt)}${T("，HF ", ", HF ")}${isFinite(HF(qty, px, hf.lt, debt)) ? fmtNum(HF(qty, px, hf.lt, debt), 3) : "∞"}</div>`);
      if (qty <= 1e-9) { bad = debt; break; }
    }
    if (!rounds.length) { liqLog = `<div class="ok">${T("健康因子 ≥ 1：没有人能清算这笔贷款。", "Health factor ≥ 1: nobody can liquidate this loan.")}</div>`; paint(); return; }
    rounds.push(`<div class="warn">${T("你付出的清算罚金合计 ", "Total liquidation penalty you paid: ")}${fmtUsd(penalty)}${T("，并在 ", ", and you were forced to sell at ")}${fmtUsd(px)}${T(" 的低位被迫卖币。", " near the lows.")}</div>`);
    if (bad > 0.01) rounds.push(`<div class="bad"><b>${T("坏账 ", "Bad debt: ")}${fmtUsd(bad)}</b>${T("——抵押品已被拿光，剩下的债务没人还，由协议金库、安全模块或存款人承担。", ". The collateral is gone and nobody repays the rest; the protocol treasury, a safety module or depositors absorb it.")}</div>`);
    liqLog = rounds.join("");
    hf.qty = qty; hf.debt = Math.max(0, Math.round(debt));
    q("#dl-qty").value = hf.qty; q("#dl-debt").value = hf.debt;
    paint();
  };

  const rate = (u) => (u <= rc.kink ? rc.s1 * u / rc.kink : rc.s1 + rc.s2 * (u - rc.kink) / (1 - rc.kink));
  const supply = (u) => rate(u) * u * (1 - rc.rf);

  const paintRate = () => {
    q("#dl-u-v").textContent = fmtPct(rc.u, 1);
    q("#dl-kink-v").textContent = fmtPct(rc.kink, 0);
    q("#dl-rf-v").textContent = fmtPct(rc.rf, 0);
    q("#dl-s1-v").textContent = fmtPct(rc.s1, 1);
    q("#dl-s2-v").textContent = "+" + fmtPct(rc.s2, 0);
    const b = rate(rc.u), s = supply(rc.u);
    q("#dl-br").textContent = fmtPct(b, 2);
    q("#dl-sr").textContent = fmtPct(s, 2);
    const sp = s - TBILL;
    q("#dl-sp").textContent = (sp >= 0 ? "+" : "") + fmtNum(sp * 10000, 0) + " bp";
    q("#dl-sp").className = "v " + (sp >= 0 ? "pos" : "neg");
    q("#dl-wd").textContent = fmtUsd(100 * (1 - rc.u), 1);
    const res = lineChart({
      fns: [{ f: (u) => rate(u / 100) * 100, cls: "line3" }, { f: (u) => supply(u / 100) * 100, cls: "line4" }, { f: () => TBILL * 100, cls: "line2" }],
      lo: 0, hi: 100, xlabel: T("利用率（%）", "Utilization (%)"), markerX: rc.u * 100, markerLabel: T("当前", "now"), forceZero: true, uid: "dl2",
    });
    q("#dl-chart2").innerHTML = chartBlock(res, [["var(--red)", T("借款利率（%）", "Borrow rate (%)")], ["var(--green)", T("存款利率（%）", "Supply rate (%)")], ["var(--blue)", T("3 个月国库券（%）", "3-month T-bill (%)")]]);
    const lines = [];
    if (rc.u > rc.kink) lines.push(`<span class="warn">${T("已越过拐点：利率陡升，协议在用高利率吸引存款、逼借款人还钱，防止池子被借空。", "Past the kink: rates spike as the protocol uses high rates to pull in deposits and push borrowers to repay, so the pool isn't drained.")}</span>`);
    if (rc.u >= 0.995) lines.push(`<span class="bad">${T("利用率接近 100%：存款人此刻几乎取不出钱——这就是链上版的挤兑。", "Utilization near 100%: depositors can barely withdraw right now. This is the on-chain version of a run.")}</span>`);
    lines.push(sp >= 0
      ? T("存款利率高于国库券：多出的部分是你为承担清算失灵、合约与脱锚风险拿到的风险溢价（阶段 13.5）。", "The supply rate beats T-bills: the extra is your premium for bearing liquidation-failure, contract and depeg risk (Stage 13.5).")
      : T("存款利率低于国库券：同样的美元放进代币化国债（阶段 14.2）反而收益更高、风险更低——资金会倾向流出。", "The supply rate is below T-bills: the same dollars earn more with less risk in tokenized Treasuries (Stage 14.2), so money tends to leave."));
    q("#dl-rlog").innerHTML = lines.map((l) => `<div>${l}</div>`).join("");
  };

  const paint = () => {
    q("#dl-hf").style.display = mode === "hf" ? "" : "none";
    q("#dl-rate").style.display = mode === "rate" ? "" : "none";
    if (mode === "hf") paintHf(); else paintRate();
  };

  q("#dl-mode").addEventListener("click", (e) => {
    const b = e.target.closest("button"); if (!b) return;
    mode = b.dataset.m;
    q("#dl-mode").querySelectorAll("button").forEach((x) => x.classList.toggle("on", x === b));
    paint();
  });
  q("#dl-cf").addEventListener("click", (e) => {
    const b = e.target.closest("button"); if (!b) return;
    hf.cf = +b.dataset.c;
    q("#dl-cf").querySelectorAll("button").forEach((x) => x.classList.toggle("on", x === b));
    liqLog = ""; paint();
  });
  [["#dl-qty", "qty"], ["#dl-debt", "debt"], ["#dl-px", "px"], ["#dl-lt", "lt"], ["#dl-bonus", "bonus"]].forEach(([id, k]) =>
    q(id).addEventListener("input", (e) => { hf[k] = +e.target.value; liqLog = ""; paint(); }));
  [["#dl-u", "u"], ["#dl-kink", "kink"], ["#dl-rf", "rf"], ["#dl-s1", "s1"], ["#dl-s2", "s2"]].forEach(([id, k]) =>
    q(id).addEventListener("input", (e) => { rc[k] = +e.target.value; paint(); }));
  q("#dl-liq").addEventListener("click", runLiq);
  q("#dl-reset").addEventListener("click", () => {
    Object.assign(hf, { qty: 3, debt: 5000, px: 3000 }); liqLog = "";
    q("#dl-qty").value = 3; q("#dl-debt").value = 5000; q("#dl-px").value = 3000;
    paint();
  });
  paint();
}
