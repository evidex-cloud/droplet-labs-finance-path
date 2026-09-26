// 交互演示：代币化的边界——
// ① 信任链乘法：五个环节各自的年出事概率 p 与出事时的损失比例 LGD，
//    整条链不出事的概率 = Π(1−p)，年预期损失 = 1 − Π(1 − p·LGD)；与“代币化带来的额外收益”对比。
// ② 流动性幻觉：能转让 ≠ 能卖出——白名单缩小了池子，现在卖（ammSwap 的滑点）vs 排队等赎回（时间成本 + 闸门风险，pv 折现）。
import { ammSwap, pv, fmtPct, fmtUsd, fmtBig, fmtNum, tex } from "./_fin.js";

// 把格式化好的数字（$、千分位逗号、%）变成 LaTeX 安全的写法
const texv = (s) => String(s).replace(/\$/g, "\\$").replace(/,/g, "{,}").replace(/%/g, "\\%");
const texBig = (x, d) => "\\$" + fmtBig(x, d).replace(/([KMBT])$/, "\\text{$1}");

export default function mount(root, lang) {
  const en = lang === "en";
  const T = (zh, e) => (en ? e : zh);
  let mode = "chain";

  const LINKS = [
    { k: "legal", name: T("法律外壳", "Legal wrapper") },
    { k: "cust", name: T("托管人", "Custodian") },
    { k: "oracle", name: T("预言机 / 估值", "Oracle / valuation") },
    { k: "code", name: T("智能合约", "Smart contract") },
    { k: "bridge", name: T("跨链桥", "Bridge") },
  ];
  // 预设（教学示意，不代表任何真实产品）：p = 年出事概率，l = 出事时损失比例
  const PRESETS = {
    tbill: { name: T("代币化国债基金（原生、单链）", "Tokenized T-bill fund (native, one chain)"), p: [0.002, 0.002, 0.003, 0.005, 0], l: [0.3, 0.2, 0.05, 0.5, 0], ben: 0.006 },
    wrapped: { name: T("跨链的包装股票代币", "Bridged wrapped stock token"), p: [0.01, 0.01, 0.01, 0.01, 0.02], l: [0.5, 0.5, 0.1, 0.6, 0.9], ben: 0.01 },
    credit: { name: T("代币化私募信贷", "Tokenized private credit"), p: [0.01, 0.005, 0.05, 0.01, 0], l: [0.4, 0.4, 0.2, 0.5, 0], ben: 0.01 },
  };
  let preset = "tbill";
  const st = { p: [...PRESETS.tbill.p], l: [...PRESETS.tbill.l], ben: PRESETS.tbill.ben };
  const liq = { size: 2e6, depth: 40e6, allow: 0.3, days: 30, r: 0.06, gate: 0.1, gateLoss: 0.15 };

  root.innerHTML = `
    <div class="demo">
      <div class="demo-head">${T("🔗 代币化的边界：信任链与流动性幻觉", "🔗 The limits of tokenization: trust chains and the liquidity illusion")}</div>
      <div class="demo-seg" id="tl-mode">
        <button data-m="chain" class="on">${T("① 信任链乘法", "① Trust-chain multiplication")}</button>
        <button data-m="liq">${T("② 能转让 ≠ 能卖出", "② Transferable ≠ sellable")}</button>
      </div>
      <div id="tl-chain">
        <div class="demo-block">
          <div class="demo-label">${T("选一个示意产品（数字为教学假设）", "Pick an illustrative product (numbers are teaching assumptions)")}</div>
          <div class="demo-seg" id="tl-pre">${Object.keys(PRESETS).map((k) => `<button data-p="${k}" class="${k === preset ? "on" : ""}">${PRESETS[k].name}</button>`).join("")}</div>
        </div>
        <div class="demo-grid" id="tl-sliders"></div>
        <div class="demo-block">
          <label class="demo-label">${T("代币化带来的额外年收益（24/7 抵押品、更快结算等）", "Extra annual return from tokenization (24/7 collateral, faster settlement, etc.)")}${T("：", ": ")}<b id="tl-ben-v"></b></label>
          <input class="demo-slider" id="tl-ben" type="range" min="0" max="0.03" step="0.0005" value="${st.ben}">
        </div>
        <div class="stat-row">
          <div class="stat"><div class="k">${T("整条链一年不出事的概率", "Chance the whole chain survives a year")}</div><div class="v" id="tl-surv">–</div></div>
          <div class="stat"><div class="k">${T("年预期损失", "Annual expected loss")}</div><div class="v neg" id="tl-el">–</div></div>
          <div class="stat"><div class="k">${T("最弱的一环", "Weakest link")}</div><div class="v acc" id="tl-weak">–</div></div>
          <div class="stat"><div class="k">${tex(String.raw`\text{${T("额外收益", "Extra return")}} - \text{${T("预期损失", "expected loss")}}`)}</div><div class="v" id="tl-net">–</div></div>
        </div>
        <div class="stages" id="tl-bars"></div>
        <div class="demo-log" id="tl-log"></div>
      </div>
      <div id="tl-liq" style="display:none">
        <div class="demo-grid">
          <div class="demo-block">
            <label class="demo-label">${T("你想卖出的金额（按净值）", "Amount you want to sell (at NAV)")}${T("：", ": ")}<b id="tl-sz-v"></b></label>
            <input class="demo-slider" id="tl-sz" type="range" min="100000" max="50000000" step="100000" value="${liq.size}">
            <label class="demo-label">${T("二级市场总深度（每边，不考虑白名单）", "Total secondary depth (each side, ignoring the allowlist)")}${T("：", ": ")}<b id="tl-dp-v"></b></label>
            <input class="demo-slider" id="tl-dp" type="range" min="1000000" max="500000000" step="1000000" value="${liq.depth}">
            <label class="demo-label">${T("其中通过白名单、有资格接手的比例", "Share of that depth held by allowlisted buyers")}${T("：", ": ")}<b id="tl-al-v"></b></label>
            <input class="demo-slider" id="tl-al" type="range" min="0.02" max="1" step="0.01" value="${liq.allow}">
          </div>
          <div class="demo-block">
            <label class="demo-label">${T("按净值赎回要排队的天数", "Days to wait for redemption at NAV")}${T("：", ": ")}<b id="tl-dy-v"></b></label>
            <input class="demo-slider" id="tl-dy" type="range" min="1" max="365" step="1" value="${liq.days}">
            <label class="demo-label">${T("你的机会成本（年化）", "Your opportunity cost (annual)")}${T("：", ": ")}<b id="tl-r-v"></b></label>
            <input class="demo-slider" id="tl-r" type="range" min="0" max="0.3" step="0.005" value="${liq.r}">
            <label class="demo-label">${T("等待期间触发赎回闸门的概率", "Chance a redemption gate is triggered while you wait")}${T("：", ": ")}<b id="tl-g-v"></b></label>
            <input class="demo-slider" id="tl-g" type="range" min="0" max="0.6" step="0.01" value="${liq.gate}">
          </div>
        </div>
        <div class="cmp">
          <div class="cmp-cell cold"><h5>${T("现在卖进池子", "Sell into the pool now")}</h5><div id="tl-now"></div></div>
          <div class="cmp-cell hl"><h5>${T("排队等按净值赎回", "Queue for redemption at NAV")}</h5><div id="tl-wait"></div></div>
        </div>
        <div class="demo-log" id="tl-log2"></div>
      </div>
      <p class="demo-tip">${T(
        "①里先看“代币化国债基金”，再切到“跨链的包装股票代币”：多了一座桥、多了一层发币方，预期损失可能一下子吃掉代币化带来的全部好处——<strong>最弱的一环决定上限</strong>。②里把白名单比例从 30% 拖到 5%：代币照样 24/7 可转让，但能接手的钱少了，现在卖的折价会迅速变深。",
        "In ①, start with the tokenized T-bill fund, then switch to the bridged wrapped stock token: one more bridge and one more issuer can make the expected loss swallow every benefit of tokenization. <strong>The weakest link sets the ceiling.</strong> In ②, drag the allowlisted share from 30% to 5%: the token is still transferable 24/7, but the money able to buy it shrinks and the discount for selling now deepens fast."
      )}</p>
    </div>`;

  const $ = (s) => root.querySelector(s);

  const buildSliders = () => {
    $("#tl-sliders").innerHTML = LINKS.map((ln, i) => `
      <div class="demo-block">
        <label class="demo-label">${ln.name}${T("：年出事概率", ": annual failure chance")} <b id="tl-p${i}-v"></b></label>
        <input class="demo-slider" data-i="${i}" data-f="p" type="range" min="0" max="0.1" step="0.001" value="${st.p[i]}">
        <label class="demo-label">${T("出事时损失比例", "Share lost if it fails")} <b id="tl-l${i}-v"></b></label>
        <input class="demo-slider" data-i="${i}" data-f="l" type="range" min="0" max="1" step="0.05" value="${st.l[i]}">
      </div>`).join("");
    root.querySelectorAll("#tl-sliders input").forEach((sl) => sl.addEventListener("input", () => {
      st[sl.dataset.f][+sl.dataset.i] = +sl.value;
      paintChain();
    }));
  };

  const paintChain = () => {
    LINKS.forEach((_, i) => {
      $(`#tl-p${i}-v`).textContent = fmtPct(st.p[i], 1);
      $(`#tl-l${i}-v`).textContent = fmtPct(st.l[i], 0);
    });
    $("#tl-ben-v").textContent = fmtPct(st.ben, 2);
    const surv = st.p.reduce((s, p) => s * (1 - p), 1);
    const keep = st.p.reduce((s, p, i) => s * (1 - p * st.l[i]), 1);
    const el = 1 - keep;
    const contrib = st.p.map((p, i) => p * st.l[i]);
    const wi = contrib.indexOf(Math.max(...contrib));
    const net = st.ben - el;
    $("#tl-surv").textContent = fmtPct(surv, 2);
    $("#tl-el").textContent = fmtPct(el, 2);
    $("#tl-weak").textContent = Math.max(...contrib) > 0 ? LINKS[wi].name : "–";
    $("#tl-net").textContent = (net >= 0 ? "+" : "") + fmtPct(net, 2);
    $("#tl-net").className = "v " + (net >= 0 ? "pos" : "neg");
    const maxC = Math.max(0.001, ...contrib);
    $("#tl-bars").innerHTML = LINKS.map((ln, i) => `<div class="stage-bar"><span class="lab" style="${i === wi && contrib[i] > 0 ? "color:var(--red);font-weight:700" : ""}">${ln.name}</span><div class="track"><div class="fill" style="width:${(contrib[i] / maxC) * 100}%;background:${i === wi ? "var(--red)" : "var(--orange)"}"></div></div><span class="val">${fmtPct(contrib[i], 2)}</span></div>`).join("");
    const lines = [];
    lines.push(`${T("单看各环，最高的出事概率只有", "Taken one by one, the highest failure chance is only")} ${fmtPct(Math.max(...st.p), 1)}${T("；连乘之后，整条链一年内至少出一次事的概率是", "; multiplied together, the chance of at least one failure in a year is")} ${tex(String.raw`1 - \prod_{i=1}^{5} (1 - p_{i}) = 1 - ${st.p.map((p) => `(1 - ${texv(fmtPct(p, 1))})`).join(" ")} = \mathbf{${texv(fmtPct(1 - surv, 1))}}`)}${T("。", ".")}`);
    lines.push(`${tex(String.raw`\text{${T("年预期损失", "Annual expected loss")}} = 1 - \prod_{i=1}^{5} (1 - p_{i}\,L_{i}) = \mathbf{${texv(fmtPct(el, 2))}}`)}${T("（", " (")}${tex("p_{i}")} ${T("为出事概率，", "is the failure chance, ")}${tex("L_{i}")} ${T("为出事时的损失比例）。", "the share lost if it fails).")}`);
    lines.push(net >= 0
      ? `<span class="ok">${T("代币化带来的额外收益高于预期损失：这条管道“值得”。", "The extra return from tokenization exceeds the expected loss: this pipe is worth it.")}</span>`
      : `<span class="bad">${T("预期损失超过了代币化带来的额外收益：你在用更多的风险换同样的资产。先加固最弱的一环（", "The expected loss exceeds the extra return from tokenization: you are taking more risk for the same asset. Strengthen the weakest link first (")}${LINKS[wi].name}${T("）。", ").")}</span>`);
    $("#tl-log").innerHTML = lines.map((l) => `<div>${l}</div>`).join("");
  };

  const paintLiq = () => {
    $("#tl-sz-v").textContent = "$" + fmtBig(liq.size, 1);
    $("#tl-dp-v").textContent = "$" + fmtBig(liq.depth, 0);
    $("#tl-al-v").textContent = fmtPct(liq.allow, 0);
    $("#tl-dy-v").textContent = liq.days + T(" 天", " days");
    $("#tl-r-v").textContent = fmtPct(liq.r, 1);
    $("#tl-g-v").textContent = fmtPct(liq.gate, 0);
    const eff = liq.depth * liq.allow; // 有资格接手的深度
    const s = ammSwap(eff, eff, liq.size, 0.003);
    const now = s.out;
    const wait = pv(liq.size * (1 - liq.gate * liq.gateLoss), liq.r, liq.days / 365, 365);
    $("#tl-now").innerHTML = `
      <div class="demo-meta">${T("有资格接手的深度", "Depth that is allowed to buy")}${T("：", ": ")}$${fmtBig(eff, 1)}</div>
      <div class="demo-meta">${T("平均成交价（净值为 1.00）", "Average price (NAV is 1.00)")}${T("：", ": ")}<b>${fmtNum(s.execPrice, 3)}</b></div>
      <div class="stat"><div class="k">${T("今天到手", "Cash today")}</div><div class="v">${fmtUsd(now)}</div></div>`;
    $("#tl-wait").innerHTML = `
      <div class="demo-meta">${T("闸门触发时的额外损失（假设）", "Extra loss if a gate is triggered (assumed)")}${T("：", ": ")}${fmtPct(liq.gateLoss, 0)}</div>
      <div class="demo-meta">${T("按你的机会成本折现到今天", "Discounted to today at your opportunity cost")}${T("：", ": ")}${tex(String.raw`\dfrac{${texBig(liq.size, 1)} \times (1 - ${texv(fmtPct(liq.gate, 0))} \times ${texv(fmtPct(liq.gateLoss, 0))})}{\left(1 + \frac{${texv(fmtPct(liq.r, 1))}}{365}\right)^{${liq.days}}}`)}</div>
      <div class="stat"><div class="k">${T("折现后的预期价值", "Expected value, discounted")}</div><div class="v">${fmtUsd(wait)}</div></div>`;
    const lines = [];
    lines.push(`${T("代币 24/7 可转让，但你卖出的", "The token is transferable 24/7, yet selling")} $${fmtBig(liq.size, 1)} ${T("相当于有效深度的", "equals")} <b>${fmtPct(liq.size / eff, 0)}</b>${T("，现在卖的折价约", " of effective depth, so selling now costs a discount of about")} <b>${fmtPct(1 - s.execPrice, 1)}</b>${T("。", ".")}`);
    lines.push(now >= wait
      ? `<span class="warn">${T("现在卖更划算——但这只说明等待太贵或闸门风险太高，不说明代币“流动性好”。", "Selling now wins, but only because waiting is too costly or the gate risk too high, not because the token is liquid.")}</span>`
      : `<span class="ok">${T("排队等赎回更划算：真正的流动性来自发行人按净值兑付，而不是链上的可转让性。", "Queuing for redemption wins: the real liquidity comes from the issuer paying out at NAV, not from on-chain transferability.")}</span>`);
    if (liq.allow < 0.1) lines.push(`<span class="bad">${T("白名单把能接手的资金压到了不到一成：这就是“能转让 ≠ 能卖出”。", "The allowlist has cut the money able to buy to under a tenth. That is what transferable ≠ sellable means.")}</span>`);
    $("#tl-log2").innerHTML = lines.map((l) => `<div>${l}</div>`).join("");
  };

  buildSliders();
  root.querySelectorAll("#tl-pre button").forEach((b) => b.addEventListener("click", () => {
    preset = b.dataset.p;
    const pr = PRESETS[preset];
    st.p = [...pr.p]; st.l = [...pr.l]; st.ben = pr.ben;
    $("#tl-ben").value = st.ben;
    root.querySelectorAll("#tl-pre button").forEach((x) => x.classList.toggle("on", x === b));
    buildSliders();
    paintChain();
  }));
  $("#tl-ben").addEventListener("input", (e) => { st.ben = +e.target.value; paintChain(); });
  const bindL = (id, key) => $(id).addEventListener("input", (e) => { liq[key] = +e.target.value; paintLiq(); });
  bindL("#tl-sz", "size"); bindL("#tl-dp", "depth"); bindL("#tl-al", "allow"); bindL("#tl-dy", "days"); bindL("#tl-r", "r"); bindL("#tl-g", "gate");
  root.querySelectorAll("#tl-mode button").forEach((b) => b.addEventListener("click", () => {
    mode = b.dataset.m;
    root.querySelectorAll("#tl-mode button").forEach((x) => x.classList.toggle("on", x === b));
    $("#tl-chain").style.display = mode === "chain" ? "" : "none";
    $("#tl-liq").style.display = mode === "liq" ? "" : "none";
  }));
  paintChain();
  paintLiq();
}
