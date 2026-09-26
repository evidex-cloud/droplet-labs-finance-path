// 交互演示：AI 代理的付款沙盘。
// A. 付款金额 vs 三种管道的手续费（刷卡“固定费 + 百分比”、链上稳定币按笔费、月度汇总后一次刷卡），以及“费率低于 5%”的最小付款；
// B. 代理一个月的调用量与总费用；C. 控制层：单笔上限、每日预算、白名单、频率熔断 vs 三种事故（失控循环、伪造报价、提示注入）；
// D. 浮存金：代理钱包里的稳定币余额为发行方带来的国债利息（示意）。费率均为示意。计算走 _fin.js 的格式化与 clamp。
import { fmtUsd, fmtPct, fmtBig, fmtNum, clamp, tex } from "./_fin.js";

const texv = (s) => String(s).replace(/\$/g, "\\$").replace(/,/g, "{,}").replace(/%/g, "\\%").replace(/([KMBT])$/, "\\text{$1}");

export default function mount(root, lang) {
  const en = lang === "en";
  const T = (zh, e) => (en ? e : zh);
  const CARD_FIX = 0.30, CARD_PCT = 0.029; // 示意卡费率
  const TBILL = 0.0424; // 3 个月国库券，2026-09-25
  const STABLE_SUPPLY = 312e9; // 稳定币总量，2026-09-26
  const logMap = (v, lo, hi) => Math.pow(10, lo + (hi - lo) * v / 100);
  let incident = "none";

  const sl = (id, zh, e, v) =>
    `<div><label class="demo-label">${T(zh, e)}${T("：", ": ")}<b id="agp-${id}-v"></b></label><input class="demo-slider" type="range" id="agp-${id}" min="0" max="100" step="1" value="${v}"></div>`;
  const chk = (id, zh, e, on) => `<label class="demo-label" style="margin-right:14px"><input type="checkbox" id="agp-${id}" ${on ? "checked" : ""}> ${T(zh, e)}</label>`;

  root.innerHTML = `
    <div class="demo">
      <div class="demo-head">${T("🤖 会付款的代理：手续费、预算与护栏", "🤖 An agent that pays: fees, budgets and guardrails")}</div>
      <div class="demo-block">
        <div class="demo-label">${T("A. 一笔付款走哪条管道划算", "A. Which rail makes sense for one payment")}</div>
        <div class="demo-grid">
          ${sl("p", "单笔付款金额", "Payment size", 40)}
          ${sl("f", "链上稳定币每笔费用（示意）", "On-chain stablecoin fee per transfer (illustrative)", 35)}
        </div>
        <div id="agp-bars" style="margin-top:8px"></div>
      </div>
      <div class="demo-block">
        <div class="demo-label">${T("B. 代理一个月的工作量", "B. The agent's month of work")}</div>
        <div class="demo-grid">
          ${sl("n", "每天付费调用次数", "Paid calls per day", 50)}
          ${sl("hold", "钱包常备几天的开销", "Days of spending kept in the wallet", 20)}
        </div>
        <div class="stat-row">
          <div class="stat"><div class="k">${T("每月支出", "Monthly spend")}</div><div class="v" id="agp-spend"></div></div>
          <div class="stat"><div class="k">${T("逐笔刷卡的月手续费", "Card fees, per payment")}</div><div class="v neg" id="agp-fcard"></div></div>
          <div class="stat"><div class="k">${T("链上稳定币月手续费", "Stablecoin fees")}</div><div class="v pos" id="agp-fst"></div></div>
          <div class="stat"><div class="k">${T("月底汇总一次刷卡", "Monthly batched card bill")}</div><div class="v" id="agp-fbat"></div></div>
        </div>
      </div>
      <div class="demo-block">
        <div class="demo-label">${T("C. 控制层：出事那天会亏多少", "C. The control layer: how much is lost on a bad day")}</div>
        <div class="demo-seg" id="agp-inc">
          <button data-v="none">${T("正常的一天", "Normal day")}</button>
          <button data-v="loop">${T("失控循环（调用暴增 20 倍）", "Runaway loop (calls jump 20-fold)")}</button>
          <button data-v="spoof">${T("伪造报价（价格抬高 100 倍）", "Spoofed quote (price inflated 100-fold)")}</button>
          <button data-v="inject">${T("提示注入（转走 500 美元）", "Prompt injection (send $500)")}</button>
        </div>
        <div class="demo-grid" style="margin-top:10px">
          ${sl("cap", "单笔上限", "Per-payment cap", 55)}
          ${sl("bud", "每日预算（相对正常日开销的倍数）", "Daily budget (multiple of a normal day)", 30)}
        </div>
        <div style="margin-top:6px">${chk("allow", "收款方白名单", "Payee allowlist", true)}${chk("cb", "频率熔断（超过正常 3 倍即暂停）", "Frequency circuit breaker (pause above 3 times normal)", true)}</div>
        <div class="stat-row">
          <div class="stat"><div class="k">${T("正常日开销", "Normal daily spend")}</div><div class="v" id="agp-day"></div></div>
          <div class="stat"><div class="k">${T("无护栏的额外损失", "Extra loss, no guardrails")}</div><div class="v neg" id="agp-lossraw"></div></div>
          <div class="stat"><div class="k">${T("有护栏的额外损失", "Extra loss, with guardrails")}</div><div class="v" id="agp-loss"></div></div>
        </div>
      </div>
      <div class="demo-log" id="agp-log" style="margin-top:12px"></div>
      <p class="demo-tip">${T(
        "把单笔金额从 50 美元往下拖到几美分：刷卡费率从 3.5% 冲到几百甚至几千个百分点，这就是微支付几十年起不来的原因。再切换 C 里的三种事故，逐个关掉白名单、熔断、降低预算——<strong>链上付款不可逆，真正保护你的是事前写好的规则</strong>。",
        "Drag the payment from $50 down to a few cents: the card fee rate shoots from 3.5% to hundreds or thousands of percent — why micropayments stalled for decades. Then switch between the three incidents in C and turn off the allowlist, the circuit breaker, or lower the budget one at a time — <strong>on-chain payments are irreversible, so what protects you is the rules written in advance</strong>."
      )}</p>
    </div>`;

  const $ = (s) => root.querySelector(s);
  const money = (x) => (x < 1 ? "$" + fmtNum(x, x < 0.01 ? 4 : 3) : x < 1e5 ? fmtUsd(x, x < 100 ? 2 : 0) : "$" + fmtBig(x, 2));

  const paint = () => {
    const p = logMap(+$("#agp-p").value, -3, 2); // $0.001–$100
    const f = logMap(+$("#agp-f").value, -3.5, -1); // ~$0.0003–$0.10
    const n = Math.round(logMap(+$("#agp-n").value, 1, 5)); // 10–100,000/day
    const hold = Math.max(1, Math.round(+$("#agp-hold").value / 100 * 30));
    const cap = logMap(+$("#agp-cap").value, -2, 3); // $0.01–$1,000
    const budMult = 1 + +$("#agp-bud").value / 100 * 9; // 1x–10x
    const allow = $("#agp-allow").checked, cb = $("#agp-cb").checked;

    $("#agp-p-v").textContent = money(p);
    $("#agp-f-v").textContent = money(f);
    $("#agp-n-v").textContent = fmtNum(n, 0);
    $("#agp-hold-v").textContent = hold + T(" 天", " days");
    $("#agp-cap-v").textContent = money(cap);
    $("#agp-bud-v").textContent = fmtNum(budMult, 1) + "×";

    // A. 单笔费率
    const monthCalls = n * 30, spend = monthCalls * p;
    const cardFee = CARD_FIX + CARD_PCT * p;
    const batFee = (CARD_FIX + CARD_PCT * spend) / monthCalls;
    const rows = [
      [T("逐笔刷卡", "Card, per payment"), cardFee / p, "var(--red)"],
      [T("链上稳定币", "On-chain stablecoin"), f / p, "var(--green)"],
      [T("月底汇总刷卡", "Monthly batched card"), batFee / p, "var(--blue)"],
    ];
    $("#agp-bars").innerHTML = rows.map(([lab, r, col]) =>
      `<div class="stage-bar"><span class="lab">${lab}</span><div class="track"><div class="fill" style="width:${clamp(r * 100, 0.5, 100)}%;background:${col}"></div></div><span class="val" style="width:120px">${T("费率 ", "fee ")}${r >= 10 ? fmtNum(r * 100, 0) + "%" : fmtPct(r, r < 0.01 ? 3 : 1)}</span></div>`).join("");

    // B. 月度
    $("#agp-spend").textContent = money(spend);
    $("#agp-fcard").textContent = money(monthCalls * cardFee);
    $("#agp-fst").textContent = money(monthCalls * f);
    $("#agp-fbat").textContent = money(CARD_FIX + CARD_PCT * spend);

    // C. 事故
    const day = n * p, budget = day * budMult, room = Math.max(0, budget - day);
    let raw = 0, guarded = 0, note = "";
    if (incident === "loop") {
      raw = 19 * day;
      let g = raw;
      if (cb) g = Math.min(g, 19 * day / 24); // 一小时内被熔断
      g = Math.min(g, room);
      guarded = g;
      note = cb ? T("熔断在约 1 小时内发现调用频率异常并暂停。", "The breaker spots the abnormal call rate within about an hour and pauses.") : T("没有熔断，循环跑满一整天，只能靠每日预算兜底。", "No breaker: the loop runs all day, and only the daily budget limits it.");
    } else if (incident === "spoof") {
      raw = 99 * day;
      if (100 * p > cap) { guarded = 0; note = T("每笔报价 ", "Each quote of ") + money(100 * p) + T(" 超过单笔上限，全部被拒绝——代价是这些调用失败了。", " exceeds the per-payment cap, so all are refused — at the cost of those calls failing."); }
      else { guarded = Math.min(raw, room); note = T("抬高后的价格仍低于单笔上限，只能靠每日预算兜底；白名单挡不住“合法收款方乱报价”。", "The inflated price is still under the per-payment cap, so only the budget limits it; an allowlist can't stop a legitimate payee from overcharging."); }
    } else if (incident === "inject") {
      raw = 500;
      if (allow) { guarded = 0; note = T("陌生地址不在白名单上，转账被拒绝。", "The unknown address isn't on the allowlist, so the transfer is refused."); }
      else if (500 > cap) { guarded = 0; note = T("500 美元超过单笔上限，被拒绝。", "$500 exceeds the per-payment cap, so it is refused."); }
      else { guarded = Math.min(500, room); note = T("没有白名单、单笔上限又太高：只剩每日预算这最后一道闸。", "No allowlist and a high per-payment cap: only the daily budget is left as a last gate."); }
    } else {
      note = T("正常的一天：选择一种事故看看护栏的作用。", "A normal day: pick an incident to see what the guardrails do.");
    }
    $("#agp-day").textContent = money(day);
    $("#agp-lossraw").textContent = money(raw);
    const lossEl = $("#agp-loss");
    lossEl.textContent = money(guarded);
    lossEl.classList.toggle("pos", guarded < raw * 0.05 || raw === 0);
    lossEl.classList.toggle("neg", raw > 0 && guarded >= raw * 0.05);

    // D. 浮存金与日志
    const balance = day * hold;
    const L = [];
    const minCard = CARD_FIX / (0.05 - CARD_PCT), minSt = f / 0.05;
    const M = (x) => texv(money(x));
    L.push(`${T("这一笔：", "This payment: ")}${tex(String.raw`\text{${T("刷卡费", "card fee")}} = \$0.30 + 2.9\% \times ${M(p)} \approx ${M(cardFee)}`)}${T("，费率", "; fee rate")} ${tex(String.raw`\dfrac{${M(cardFee)}}{${M(p)}} \approx \mathbf{${texv(cardFee / p >= 10 ? fmtNum(cardFee / p * 100, 0) + "%" : fmtPct(cardFee / p, 1))}}`)}${T("。", ".")}`);
    L.push(`${T("要让费率低于 5%：刷卡至少", "For fees under 5%: a card payment must be at least")} ${tex(String.raw`\dfrac{\$0.30}{5\% - 2.9\%} \approx \mathbf{${M(minCard)}}`)}${T("，链上稳定币至少", ", a stablecoin transfer at least")} ${tex(String.raw`\dfrac{${M(f)}}{5\%} \approx \mathbf{${M(minSt)}}`)}${T("。", ".")}`);
    if (cardFee / p > 1) L.push(`<span class="bad">${T("逐笔刷卡的手续费超过了付款本身——这就是互联网只剩订阅和广告两种收费方式的原因。", "The per-payment card fee exceeds the payment itself — why the internet ended up with only subscriptions and ads.")}</span>`);
    L.push(`${T("月底汇总一次刷卡能把费率压到", "Batching into one monthly card charge cuts the fee to")} ${tex(String.raw`\dfrac{\$0.30 + 2.9\% \times ${M(spend)}}{${M(spend)}} \approx ${texv(fmtPct(batFee / p, 2))}`)}${T("，但卖方要先信任买方一个月（赊账），而且需要一个账户关系——这正是 x402 想省掉的东西。", ", but the seller has to extend a month of credit and needs an account relationship — exactly what x402 aims to remove.")}`);
    L.push(`${T("代理钱包常备", "The wallet keeps")} ${money(balance)} ${T("（", " (")}${hold}${T(" 天开销）。这笔稳定币背后的国债利息每年约", " days of spending). The T-bill interest behind it is about")} ${tex(String.raw`${M(balance)} \times 4.24\% \approx ${M(balance * TBILL)}`)}${T("，归发行方而非代理主人（GENIUS 法案禁止付息）。放大到全部约 3,120 亿美元稳定币：每年约", " a year — for the issuer, not the agent's owner (the GENIUS Act bars paying interest). Scaled to all ~$312B of stablecoins: about")} ${tex(String.raw`\$${texv(fmtBig(STABLE_SUPPLY, 0))} \times 4.24\% \approx \mathbf{\$${texv(fmtBig(STABLE_SUPPLY * TBILL, 1))}}`)}${T("（示意）。", " a year (illustrative).")}`);
    if (incident !== "none") L.push(`<span class="${guarded < raw * 0.05 ? "ok" : "warn"}">${note}</span>`);
    $("#agp-log").innerHTML = L.map((l) => `<div>${l}</div>`).join("");
  };

  const setInc = (v) => {
    incident = v;
    root.querySelectorAll("#agp-inc button").forEach((b) => b.classList.toggle("on", b.dataset.v === v));
    paint();
  };
  root.querySelectorAll("#agp-inc button").forEach((b) => b.addEventListener("click", () => setInc(b.dataset.v)));
  ["p", "f", "n", "hold", "cap", "bud"].forEach((id) => $("#agp-" + id).addEventListener("input", paint));
  ["allow", "cb"].forEach((id) => $("#agp-" + id).addEventListener("change", paint));
  setInc("none");
}
