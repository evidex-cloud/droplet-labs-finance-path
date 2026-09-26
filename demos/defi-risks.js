// 交互演示：DeFi 风险打分表——
// 为一个仓位的每一层（合约、预言机、治理/管理员、跨链桥、稳定币锚、可组合层数）选择情形，
// 各层示意年失败概率相乘得到存活率；乘以出事时的损失率得到预期损失；
// 与标称收益、3 个月期国库券（4.24%）比较，判断溢价是否足以补偿风险。
import { fmtPct, tex } from "./_fin.js";

export default function mount(root, lang) {
  const en = lang === "en";
  const T = (zh, e) => (en ? e : zh);
  const X = (s) => String(s).replace(/%/g, "\\%"); // 格式化好的百分数放进 LaTeX
  const C = T("：", ": ");
  const TBILL = 0.0424;

  const layers = [
    { k: "code", name: T("合约", "Contract"), opts: [
      [T("新代码、未经实战", "New, untested code"), 0.08], [T("审计过、上线不到 1 年", "Audited, live < 1 year"), 0.03], [T("大规模锁仓下运行多年", "Years live with large sums locked"), 0.01]] },
    { k: "oracle", name: T("预言机", "Oracle"), opts: [
      [T("单个 DEX 即时价格", "Single DEX spot price"), 0.06], [T("时间加权价（TWAP）", "Time-weighted (TWAP)"), 0.02], [T("多源聚合 + 熔断", "Multi-source + circuit breaker"), 0.005]] },
    { k: "gov", name: T("治理 / 管理员", "Governance / admin"), opts: [
      [T("单一私钥可升级", "Single key can upgrade"), 0.05], [T("多签、无时间锁", "Multisig, no timelock"), 0.02], [T("多签 + 投票 + 时间锁", "Multisig + vote + timelock"), 0.007], [T("不可升级", "Immutable"), 0.003]] },
    { k: "bridge", name: T("跨链桥", "Bridge"), opts: [
      [T("不依赖桥（原生资产）", "No bridge (native asset)"), 0], [T("依赖一个桥", "Depends on one bridge"), 0.03], [T("依赖两个桥", "Depends on two bridges"), 0.06]] },
    { k: "peg", name: T("稳定币 / 锚", "Stablecoin / peg"), opts: [
      [T("法币足额短期储备", "Full, short fiat reserves"), 0.005], [T("加密超额抵押", "Crypto over-collateralized"), 0.01], [T("合成美元（基差）", "Synthetic dollar (basis)"), 0.02], [T("算法 / 链下黑箱", "Algorithmic / off-chain black box"), 0.1]] },
  ];
  const presets = {
    blue: { code: 2, oracle: 2, gov: 2, bridge: 0, peg: 0, extra: 0, lgd: 0.3, yld: 0.055 },
    loop: { code: 1, oracle: 1, gov: 1, bridge: 1, peg: 1, extra: 3, lgd: 0.5, yld: 0.12 },
    farm: { code: 0, oracle: 0, gov: 0, bridge: 1, peg: 3, extra: 1, lgd: 0.8, yld: 0.45 },
  };
  const st = { ...presets.blue };

  root.innerHTML = `
    <div class="demo">
      <div class="demo-head">${T("🧮 DeFi 风险打分表：存活率是每一层的乘积", "🧮 DeFi risk scorecard: survival is the product of every layer")}</div>
      <div class="demo-block">
        <div class="demo-label">${T("从一个典型仓位开始", "Start from a typical position")}</div>
        <div class="demo-seg" id="dr-pre">
          <button data-p="blue" class="on">${T("老牌借贷池存 USDC", "USDC in a blue-chip lender")}</button>
          <button data-p="loop">${T("再质押凭证循环杠杆", "Restaking-receipt leverage loop")}</button>
          <button data-p="farm">${T("新链新协议挖矿", "New farm on a new chain")}</button>
        </div>
      </div>
      <div class="demo-block">
        ${layers.map((L) => `<div class="demo-label">${L.name}</div><div class="demo-seg" data-layer="${L.k}">${L.opts.map((o, i) => `<button data-i="${i}">${o[0]}</button>`).join("")}</div>`).join("")}
      </div>
      <div class="demo-grid">
        <div class="demo-block">
          <label class="demo-label">${T("额外的可组合层数（每层约 +1%）", "Extra layers of composability (about +1% each)")}${C}<b id="dr-ex-v"></b></label>
          <input class="demo-slider" id="dr-ex" type="range" min="0" max="6" step="1" value="${st.extra}">
          <label class="demo-label">${T("出事时的损失比例", "Loss if something fails")}${C}<b id="dr-lgd-v"></b></label>
          <input class="demo-slider" id="dr-lgd" type="range" min="0.1" max="1" step="0.05" value="${st.lgd}">
        </div>
        <div class="demo-block">
          <label class="demo-label">${T("产品的标称年化收益", "The product's headline yield")}${C}<b id="dr-y-v"></b></label>
          <input class="demo-slider" id="dr-y" type="range" min="0.02" max="0.6" step="0.005" value="${st.yld}">
        </div>
      </div>
      <div class="demo-block"><div class="stages" id="dr-bars"></div></div>
      <div class="stat-row">
        <div class="stat"><div class="k">${T("一年存活率", "One-year survival")}</div><div class="v" id="dr-surv">–</div></div>
        <div class="stat"><div class="k">${T("预期损失", "Expected loss")}</div><div class="v neg" id="dr-el">–</div></div>
        <div class="stat"><div class="k">${T("风险调整后收益", "Risk-adjusted yield")}</div><div class="v acc" id="dr-net">–</div></div>
        <div class="stat"><div class="k">${T("相对国库券 4.24%", "vs T-bill 4.24%")}</div><div class="v" id="dr-sp">–</div></div>
      </div>
      <div class="demo-block"><span class="pill" id="dr-pill"></span><div class="demo-log" id="dr-log"></div></div>
      <p class="demo-tip">${T(
        "先看老牌借贷池：每层都很小，存活率仍有九成七以上。再切到“再质押凭证循环杠杆”：多了一个桥和几层积木，看似更高的收益，扣掉预期损失后优势大幅缩水。最后只改一层——比如把“依赖一个桥”换成“不依赖桥”——看存活率跳多少：风险由整条链上每一环共同决定。",
        "Start with the blue-chip lender: every layer is small, and survival is still above 97%. Switch to the restaking-receipt loop: an extra bridge and a few more bricks, and the higher headline yield loses most of its edge once expected loss comes off. Finally change just one layer, say from \"depends on one bridge\" to \"no bridge,\" and see how far survival jumps. Risk is set by every link in the chain together."
      )}</p>
    </div>`;

  const q = (s) => root.querySelector(s);

  const paint = () => {
    layers.forEach((L) => root.querySelectorAll(`[data-layer="${L.k}"] button`).forEach((b) => b.classList.toggle("on", +b.dataset.i === st[L.k])));
    q("#dr-ex").value = st.extra; q("#dr-lgd").value = st.lgd; q("#dr-y").value = st.yld;
    q("#dr-ex-v").textContent = String(st.extra);
    q("#dr-lgd-v").textContent = fmtPct(st.lgd, 0);
    q("#dr-y-v").textContent = fmtPct(st.yld, 1);

    const probs = layers.map((L) => [L.name, L.opts[st[L.k]][1]]);
    for (let i = 0; i < st.extra; i++) probs.push([T("额外积木 ", "Extra brick ") + (i + 1), 0.01]);
    const surv = probs.reduce((s, [, p]) => s * (1 - p), 1);
    const fail = 1 - surv;
    const el = fail * st.lgd;
    const net = st.yld - el;
    const sp = net - TBILL;
    const maxP = Math.max(0.05, ...probs.map(([, p]) => p));
    q("#dr-bars").innerHTML = probs.map(([n, p]) => `<div class="stage-bar"><span class="lab">${n}</span>
        <div class="track"><div class="fill" style="width:${(p / maxP) * 100}%;background:${p >= 0.05 ? "var(--red)" : p >= 0.02 ? "var(--orange)" : "var(--green)"}"></div></div>
        <span class="val">${fmtPct(p, 1)}</span></div>`).join("");
    q("#dr-surv").textContent = fmtPct(surv, 1);
    q("#dr-surv").className = "v " + (surv >= 0.95 ? "pos" : surv >= 0.9 ? "acc" : "neg");
    q("#dr-el").textContent = "−" + fmtPct(el, 2);
    q("#dr-net").textContent = fmtPct(net, 2);
    q("#dr-sp").textContent = (sp >= 0 ? "+" : "") + fmtPct(sp, 2);
    q("#dr-sp").className = "v " + (sp >= 0.01 ? "pos" : "neg");
    const pill = q("#dr-pill");
    pill.className = "pill " + (sp >= 0.01 ? "ok" : "bad");
    pill.textContent = sp >= 0.02 ? T("溢价较充分（前提是你的概率估计靠谱）", "Premium looks ample (if your probability estimates hold)")
      : sp >= 0.01 ? T("溢价单薄：只剩 1–2 个百分点补偿尾部风险", "Thin premium: only 1–2 points to pay for tail risk")
      : T("不划算：风险调整后不如国库券", "Not worth it: below T-bills after risk adjustment");

    const worst = probs.slice().sort((a, b) => b[1] - a[1])[0];
    const lines = [];
    lines.push(`${T("一年内出事的概率约 ", "Chance of an incident within a year: about ")}${tex(String.raw`1 - \prod_{i} (1 - p_{i}) = ${X(fmtPct(fail, 1))}`)}${T("（1 减去各层存活率之积）；", " (1 minus the product of each layer's survival); ")}${tex(String.raw`\text{${T("预期损失", "expected loss")}} = ${X(fmtPct(fail, 1))} \times ${X(fmtPct(st.lgd, 0))} = ${X(fmtPct(el, 2))}`)}${T("。", ".")}`);
    lines.push(T("最弱的一环是「", "The weakest link is \"") + worst[0] + T("」，年失败概率 ", "\", with annual failure odds of ") + fmtPct(worst[1], 1) + T("。先改善它，效果最大。", ". Fixing it first has the biggest payoff."));
    const RP = T("风险溢价", "risk premium");
    lines.push(`${tex(String.raw`\text{${T("要求收益", "Required yield")}} \ge ${X(fmtPct(TBILL, 2))} + ${X(fmtPct(el, 2))} + \text{${RP}} = ${X(fmtPct(TBILL + el, 2))} + \text{${RP}}`)}${T("（依次是国库券、预期损失和你想要的溢价）。", " (the T-bill, expected loss, and whatever premium you demand).")}`);
    q("#dr-log").innerHTML = lines.map((l) => `<div>${l}</div>`).join("");
  };

  q("#dr-pre").addEventListener("click", (e) => {
    const b = e.target.closest("button"); if (!b || !presets[b.dataset.p]) return;
    Object.assign(st, presets[b.dataset.p]);
    q("#dr-pre").querySelectorAll("button").forEach((x) => x.classList.toggle("on", x === b));
    paint();
  });
  layers.forEach((L) => {
    const seg = root.querySelector(`[data-layer="${L.k}"]`);
    seg.addEventListener("click", (e) => {
      const b = e.target.closest("button"); if (!b) return;
      const i = +b.dataset.i;
      if (!(i >= 0 && i < L.opts.length)) return;
      st[L.k] = i; paint();
    });
  });
  q("#dr-ex").addEventListener("input", (e) => { st.extra = +e.target.value; paint(); });
  q("#dr-lgd").addEventListener("input", (e) => { st.lgd = +e.target.value; paint(); });
  q("#dr-y").addEventListener("input", (e) => { st.yld = +e.target.value; paint(); });
  paint();
}
