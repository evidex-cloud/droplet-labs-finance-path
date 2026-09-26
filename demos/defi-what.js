// 交互演示：原子交易沙盘——
// ① 货币乐高：在同一笔链上交易里“存入 ETH → 借出 USDC → 在 AMM 换回 ETH”，任一步不满足规则，整笔交易回滚；
//    同时对比同一件事在传统金融里要等多久才结算。
// ② 闪电贷套利：两个价格不同的 AMM 池，在一笔交易内借入、低买高卖、归还；赚不到钱就整笔作废。
import { ammSwap, fmtPct, fmtNum, fmtUsd, tex } from "./_fin.js";

export default function mount(root, lang) {
  const en = lang === "en";
  const T = (zh, e) => (en ? e : zh);
  const X = (s) => String(s).replace(/%/g, "\\%"); // 格式化好的百分数放进 LaTeX
  const C = T("：", ": ");
  const P = 3000; // 示意 ETH 价格（美元），仅用于演示
  const MAX_LTV = 0.8, LIQ_TH = 0.83;
  let mode = "lego";
  let when = "sat";
  const lego = { eth: 10, ltv: 0.5, depth: 1000, tol: 0.01 };
  const fl = { pB: 3150, size: 30000 };

  root.innerHTML = `
    <div class="demo">
      <div class="demo-head">${T("🧱 原子交易沙盘：一笔交易里拼起三块积木", "🧱 Atomic transaction sandbox: three bricks in one transaction")}</div>
      <div class="demo-seg" id="dw-mode">
        <button data-m="lego" class="on">${T("① 货币乐高：存入 → 借出 → 换币", "① Money Legos: deposit → borrow → swap")}</button>
        <button data-m="flash">${T("② 闪电贷套利", "② Flash-loan arbitrage")}</button>
      </div>

      <div id="dw-lego">
        <div class="demo-grid">
          <div class="demo-block">
            <label class="demo-label">${T("存入的 ETH（抵押品）", "ETH deposited (collateral)")}${C}<b id="dw-eth-v"></b></label>
            <input class="demo-slider" id="dw-eth" type="range" min="1" max="50" step="1" value="${lego.eth}">
            <label class="demo-label">${T("借款占抵押品价值的比例（LTV）", "Borrow as a share of collateral value (LTV)")}${C}<b id="dw-ltv-v"></b></label>
            <input class="demo-slider" id="dw-ltv" type="range" min="0.1" max="0.9" step="0.01" value="${lego.ltv}">
          </div>
          <div class="demo-block">
            <label class="demo-label">${T("AMM 池深度（池里的 ETH 数量）", "AMM pool depth (ETH in the pool)")}${C}<b id="dw-dp-v"></b></label>
            <input class="demo-slider" id="dw-dp" type="range" min="20" max="5000" step="10" value="${lego.depth}">
            <label class="demo-label">${T("你能接受的最大滑点", "Maximum slippage you accept")}${C}<b id="dw-tol-v"></b></label>
            <input class="demo-slider" id="dw-tol" type="range" min="0.004" max="0.05" step="0.001" value="${lego.tol}">
          </div>
        </div>
        <div class="demo-block">
          <div class="demo-label">${T("同一件事，如果发生在……", "If the same thing happened on…")}</div>
          <div class="demo-seg" id="dw-when">
            <button data-w="wk">${T("周二上午", "Tuesday morning")}</button>
            <button data-w="sat" class="on">${T("周六晚上 22 点", "Saturday, 10 p.m.")}</button>
          </div>
        </div>
        <div class="demo-block"><div class="demo-log" id="dw-steps"></div></div>
        <div class="stat-row">
          <div class="stat"><div class="k">${T("交易结果", "Transaction result")}</div><div class="v" id="dw-res">–</div></div>
          <div class="stat"><div class="k">${T("最终 ETH 敞口", "Final ETH exposure")}</div><div class="v acc" id="dw-exp">–</div></div>
          <div class="stat"><div class="k">${T("杠杆倍数", "Leverage")}</div><div class="v" id="dw-lev">–</div></div>
          <div class="stat"><div class="k">${T("健康因子（阶段 13.4）", "Health factor (Stage 13.4)")}</div><div class="v" id="dw-hf">–</div></div>
        </div>
        <div class="cmp">
          <div class="cmp-cell cold"><b>${T("传统金融", "Traditional finance")}</b><div id="dw-tf"></div></div>
          <div class="cmp-cell hl"><b>${T("链上（以太坊）", "On-chain (Ethereum)")}</b><div id="dw-df"></div></div>
        </div>
      </div>

      <div id="dw-flash" style="display:none">
        <div class="demo-grid">
          <div class="demo-block">
            <label class="demo-label">${T("池 B 的 ETH 价格（池 A 固定为 3,000 美元）", "ETH price in pool B (pool A fixed at $3,000)")}${C}<b id="dw-pb-v"></b></label>
            <input class="demo-slider" id="dw-pb" type="range" min="2980" max="3300" step="5" value="${fl.pB}">
          </div>
          <div class="demo-block">
            <label class="demo-label">${T("闪电贷金额（USDC）", "Flash-loan size (USDC)")}${C}<b id="dw-sz-v"></b></label>
            <input class="demo-slider" id="dw-sz" type="range" min="5000" max="1500000" step="5000" value="${fl.size}">
            <div class="demo-btns"><button class="demo-btn" id="dw-opt">${T("找出最赚钱的金额", "Find the most profitable size")}</button></div>
          </div>
        </div>
        <div class="demo-block"><div class="demo-log" id="dw-fsteps"></div></div>
        <div class="stat-row">
          <div class="stat"><div class="k">${T("借入", "Borrowed")}</div><div class="v" id="dw-fb">–</div></div>
          <div class="stat"><div class="k">${T("应还（含 0.05% 手续费）", "To repay (incl. 0.05% fee)")}</div><div class="v" id="dw-fr">–</div></div>
          <div class="stat"><div class="k">${T("净利润（扣 Gas 20 美元）", "Net profit (after $20 gas)")}</div><div class="v" id="dw-fp">–</div></div>
          <div class="stat"><div class="k">${T("交易结果", "Transaction result")}</div><div class="v" id="dw-fres">–</div></div>
        </div>
      </div>

      <p class="demo-tip">${T(
        "看“全有或全无”：把 LTV 拉过 80%，或把池子调浅、滑点容忍调低，三步里只要一步失败，整笔交易回滚——你的 ETH 原封不动，只损失一点 Gas。闪电贷里，价差太小或金额太大（滑点吃掉利润）时同样整笔作废：放贷方永远拿得回钱。这就是阶段 13.4 的清算和阶段 13.6 的攻击共用的那把钥匙。",
        "Watch the all-or-nothing rule: push LTV past 80%, or make the pool shallow and the slippage tolerance tight. If any one of the three steps fails, the whole transaction reverts. Your ETH is untouched and you lose only a little gas. In the flash loan, a price gap that is too small, or a size so large that slippage eats the profit, also voids the whole transaction, so the lender always gets repaid. That same key opens both the liquidations of Stage 13.4 and the attacks of Stage 13.6."
      )}</p>
    </div>`;

  const q = (s) => root.querySelector(s);
  const line = (ok, txt) => `<div class="${ok ? "ok" : "bad"}">${ok ? "✔" : "✘"} ${txt}</div>`;

  const paintLego = () => {
    q("#dw-eth-v").textContent = lego.eth + " ETH ≈ " + fmtUsd(lego.eth * P);
    q("#dw-ltv-v").textContent = fmtPct(lego.ltv, 0);
    q("#dw-dp-v").textContent = fmtNum(lego.depth, 0) + " ETH ≈ " + fmtUsd(lego.depth * P * 2) + T(" 总流动性", " total liquidity");
    q("#dw-tol-v").textContent = fmtPct(lego.tol, 1);

    const coll = lego.eth * P;
    const borrow = coll * lego.ltv;
    const steps = [];
    let ok = true;
    // 第 1 步：存入
    steps.push(line(true, T("第 1 步 存入 ", "Step 1 · deposit ") + lego.eth + T(" ETH 作为抵押，价值 ", " ETH as collateral, worth ") + fmtUsd(coll)));
    // 第 2 步：借出
    const s2 = lego.ltv <= MAX_LTV;
    steps.push(line(s2, T("第 2 步 借出 ", "Step 2 · borrow ") + fmtUsd(borrow) + " USDC" + T("（", " (") + tex(String.raw`\mathrm{LTV} = ${X(fmtPct(lego.ltv, 0))} ${s2 ? "\\le" : ">"} 80\%`) + (s2 ? T(" 上限）", " cap)") : T(" 上限：合约拒绝）", " cap: the contract refuses)"))));
    ok = ok && s2;
    // 第 3 步：在 AMM 用 USDC 买 ETH（池子：depth ETH / depth·P USDC）
    let out = 0, slip = 0, s3 = false;
    if (ok) {
      const r = ammSwap(lego.depth * P, lego.depth, borrow, 0.003);
      out = r.out;
      slip = 1 - out / (borrow / P);
      s3 = slip <= lego.tol;
      steps.push(line(s3, T("第 3 步 在 AMM 把 USDC 换成 ", "Step 3 · swap USDC on the AMM for ") + fmtNum(out, 3) + T(" ETH，", " ETH; ") + tex(String.raw`\text{${T("滑点", "slippage")}} + \text{${T("手续费", "fee")}} = ${X(fmtPct(slip, 2))} ${s3 ? "\\le" : ">"} \text{${T("容忍度", "tolerance")}}\ ${X(fmtPct(lego.tol, 1))}`)));
      ok = ok && s3;
    } else {
      steps.push(`<div class="warn">— ${T("第 3 步 未执行（前一步已失败）", "Step 3 · not executed (an earlier step failed)")}</div>`);
    }
    steps.push(ok
      ? `<div class="ok"><b>${T("整笔交易成功：三步在同一个区块里一起生效。", "Whole transaction succeeded: all three steps took effect in the same block.")}</b></div>`
      : `<div class="bad"><b>${T("整笔交易回滚：链上状态与交易前完全相同，你只付了 Gas。", "Whole transaction reverted: on-chain state is exactly as it was before; you only paid gas.")}</b></div>`);
    q("#dw-steps").innerHTML = steps.join("");

    const expo = ok ? lego.eth + out : lego.eth;
    q("#dw-res").textContent = ok ? T("成功", "Success") : T("已回滚", "Reverted");
    q("#dw-res").className = "v " + (ok ? "pos" : "neg");
    q("#dw-exp").textContent = fmtNum(expo, 2) + " ETH";
    q("#dw-lev").textContent = fmtNum(expo / lego.eth, 2) + "x";
    const hf = ok && borrow > 0 ? (coll * LIQ_TH) / borrow : Infinity;
    q("#dw-hf").textContent = isFinite(hf) ? fmtNum(hf, 2) : T("无债务", "no debt");
    q("#dw-hf").className = "v " + (!isFinite(hf) ? "" : hf < 1.2 ? "neg" : hf < 1.6 ? "acc" : "pos");

    const tf = when === "sat"
      ? T("周六股市关门、银行不放款。最早周一开盘卖出股票，T+1 结算后<b>周二</b>才拿到钱：约 <b>60+ 小时</b>，经过券商、交易所、清算所、托管行、银行 5 个中介。", "Stock market closed, banks not lending. The earliest option is selling at Monday's open, and with T+1 the cash arrives on <b>Tuesday</b>: roughly <b>60+ hours</b>, through 5 intermediaries (broker, exchange, clearinghouse, custodian, bank).")
      : T("今天卖出股票，T+1 结算后<b>明天</b>拿到钱：约 <b>24 小时</b>；若申请质押贷款，还要走审批流程。", "Sell stock today and with T+1 the cash arrives <b>tomorrow</b>: about <b>24 hours</b>. A securities-backed loan adds an approval process on top.");
    const df = T("约 <b>12 秒</b>进入区块，约 13 分钟达到最终确定；交易、清算、结算合一。", "Included in a block in about <b>12 seconds</b>, final in about 13 minutes; trade, clearing and settlement happen as one event.")
      + (ok ? "" : T(" 这次交易被回滚了：链上什么都没有改变。", " This time the transaction reverted, so nothing changed on-chain."));
    q("#dw-tf").innerHTML = tf;
    q("#dw-df").innerHTML = df;
  };

  // 闪电贷：池 A（1,000 ETH，价格 3,000）买入 ETH，池 B（1,000 ETH，价格 pB）卖出 ETH
  const flashRun = (size, pB) => {
    const a = ammSwap(1000 * 3000, 1000, size, 0.003);     // USDC → ETH（池 A）
    const b = ammSwap(1000, 1000 * pB, a.out, 0.003);      // ETH → USDC（池 B）
    const repay = size * 1.0005;
    const profit = b.out - repay - 20;
    return { ethOut: a.out, usdcBack: b.out, repay, profit };
  };

  const paintFlash = () => {
    q("#dw-pb-v").textContent = fmtUsd(fl.pB) + T("（价差 ", " (gap ") + fmtPct(fl.pB / 3000 - 1, 2) + T("）", ")");
    q("#dw-sz-v").textContent = fmtUsd(fl.size);
    const r = flashRun(fl.size, fl.pB);
    const ok = r.profit > 0;
    q("#dw-fsteps").innerHTML = [
      line(true, T("第 1 步 从借贷池闪电借入 ", "Step 1 · flash-borrow ") + fmtUsd(fl.size) + " USDC" + T("（无抵押）", " (no collateral)")),
      line(true, T("第 2 步 在池 A 用 USDC 买入 ", "Step 2 · buy ") + fmtNum(r.ethOut, 3) + T(" ETH（均价 ", " ETH in pool A (average price ") + fmtUsd(fl.size / r.ethOut, 0) + T("）", ")")),
      line(true, T("第 3 步 在池 B 卖出，换回 ", "Step 3 · sell in pool B for ") + fmtUsd(r.usdcBack) + " USDC"),
      line(ok, T("第 4 步 归还 ", "Step 4 · repay ") + fmtUsd(r.repay) + (ok ? T(" —— 还得上，交易生效", ": repaid, transaction stands") : T(" —— 还不上，整笔交易回滚", ": cannot repay, whole transaction reverts"))),
    ].join("");
    q("#dw-fb").textContent = fmtUsd(fl.size);
    q("#dw-fr").textContent = fmtUsd(r.repay);
    q("#dw-fp").textContent = ok ? fmtUsd(r.profit) : fmtUsd(0);
    q("#dw-fp").className = "v " + (ok ? "pos" : "");
    q("#dw-fres").textContent = ok ? T("成功", "Success") : T("已回滚", "Reverted");
    q("#dw-fres").className = "v " + (ok ? "pos" : "neg");
  };

  const paint = () => {
    q("#dw-lego").style.display = mode === "lego" ? "" : "none";
    q("#dw-flash").style.display = mode === "flash" ? "" : "none";
    if (mode === "lego") paintLego(); else paintFlash();
  };

  q("#dw-mode").addEventListener("click", (e) => {
    const b = e.target.closest("button"); if (!b) return;
    mode = b.dataset.m;
    q("#dw-mode").querySelectorAll("button").forEach((x) => x.classList.toggle("on", x === b));
    paint();
  });
  q("#dw-when").addEventListener("click", (e) => {
    const b = e.target.closest("button"); if (!b) return;
    when = b.dataset.w;
    q("#dw-when").querySelectorAll("button").forEach((x) => x.classList.toggle("on", x === b));
    paint();
  });
  [["#dw-eth", "eth"], ["#dw-ltv", "ltv"], ["#dw-dp", "depth"], ["#dw-tol", "tol"]].forEach(([id, k]) =>
    q(id).addEventListener("input", (e) => { lego[k] = +e.target.value; paint(); }));
  q("#dw-pb").addEventListener("input", (e) => { fl.pB = +e.target.value; paint(); });
  q("#dw-sz").addEventListener("input", (e) => { fl.size = +e.target.value; paint(); });
  q("#dw-opt").addEventListener("click", () => {
    let best = 5000, bestP = -Infinity;
    for (let s = 5000; s <= 1500000; s += 5000) { const p = flashRun(s, fl.pB).profit; if (p > bestP) { bestP = p; best = s; } }
    fl.size = best; q("#dw-sz").value = best; paint();
    if (bestP <= 0) q("#dw-fsteps").insertAdjacentHTML("beforeend", `<div class="warn">${T("任何金额都赚不到钱：价差小于两次手续费 + 闪电贷费 + Gas。", "No size is profitable: the gap is smaller than two swap fees + the flash fee + gas.")}</div>`);
  });
  paint();
}
