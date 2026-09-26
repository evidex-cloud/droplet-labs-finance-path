// 交互演示：DeFi 收益拆解器——
// 选一种产品（借贷存款、LP、质押、基差/合成美元、挖矿、代币化国债）与一种市场环境（牛市 / 平稳 / 熊市），
// 把标称年化拆成“真实来源 + 代币补贴 − 无常损失 − 预期损失 − 成本”，再与 3 个月期国库券（4.24%）比较，
// 并算出 1 万美元一年后的结果。
import { fv, fmtPct, fmtUsd } from "./_fin.js";

export default function mount(root, lang) {
  const en = lang === "en";
  const T = (zh, e) => (en ? e : zh);
  const C = T("：", ": ");
  const TBILL = 0.0424; // 2026 年 9 月 25 日 3 个月期国库券

  // 各产品在三种环境下的收益构成（示意数字，量级参照课文）
  const P = {
    lend: { name: T("借贷池存 USDC", "USDC in a lending pool"), pd: 0.01, lgd: 0.5,
      parts: (r) => [["real", T("借款人利息", "Borrower interest"), { bull: 0.09, calm: 0.05, bear: 0.025 }[r]], ["cost", T("Gas 与操作成本", "Gas & running costs"), -0.002]] },
    lp: { name: T("ETH/USDC 做 LP", "ETH/USDC liquidity provision"), pd: 0.01, lgd: 0.5, eth: true,
      parts: (r) => [["real", T("交易手续费", "Trading fees"), { bull: 0.14, calm: 0.08, bear: 0.06 }[r]], ["il", T("无常损失（价格 ×2 / ×1.1 / ×0.5）", "Impermanent loss (price ×2 / ×1.1 / ×0.5)"), { bull: -0.0572, calm: -0.0011, bear: -0.0572 }[r]], ["cost", T("Gas 与再平衡成本", "Gas & rebalancing"), -0.005]] },
    stake: { name: T("质押 ETH", "Staking ETH"), pd: 0.005, lgd: 0.3, eth: true,
      parts: () => [["real", T("质押奖励（新发 ETH + 交易费）", "Staking rewards (new ETH + fees)"), 0.03], ["cost", T("服务商佣金", "Operator commission"), -0.003]] },
    basis: { name: T("基差交易 / 合成美元", "Basis trade / synthetic dollar"), pd: 0.02, lgd: 0.4,
      parts: (r) => [["real", T("质押奖励", "Staking rewards"), 0.03], ["real", T("资金费率（空头收取）", "Funding (received by shorts)"), { bull: 0.15, calm: 0.06, bear: -0.04 }[r]], ["cost", T("交易与保证金成本", "Trading & margin costs"), -0.01]] },
    farm: { name: T("新协议挖矿池", "New protocol farm"), pd: 0.08, lgd: 0.8, eth: true,
      parts: (r) => [["real", T("交易手续费", "Trading fees"), 0.05], ["sub", T("代币补贴（名义 60%，按年末币价折算）", "Token emissions (60% nominal, at year-end token price)"), 0.6 * { bull: 1.1, calm: 0.5, bear: 0.15 }[r], 0.6], ["il", T("无常损失", "Impermanent loss"), { bull: -0.0572, calm: -0.02, bear: -0.134 }[r]], ["cost", T("Gas 与操作成本", "Gas & running costs"), -0.01]] },
    tbill: { name: T("代币化国债基金", "Tokenized Treasury fund"), pd: 0.001, lgd: 0.2,
      parts: () => [["real", T("国库券利息", "T-bill interest"), TBILL], ["cost", T("管理费", "Management fee"), -0.0015]] },
  };
  let prod = "lend", regime = "calm";
  let pd = P.lend.pd, lgd = P.lend.lgd;

  root.innerHTML = `
    <div class="demo">
      <div class="demo-head">${T("🔍 收益拆解器：这笔年化到底是谁付的", "🔍 Yield decomposer: who is really paying this APY")}</div>
      <div class="demo-block">
        <div class="demo-label">${T("产品", "Product")}</div>
        <div class="demo-seg" id="dy-prod">
          ${Object.keys(P).map((k) => `<button data-p="${k}" class="${k === prod ? "on" : ""}">${P[k].name}</button>`).join("")}
        </div>
        <div class="demo-label">${T("市场环境", "Market regime")}</div>
        <div class="demo-seg" id="dy-reg">
          <button data-r="bull">${T("牛市（杠杆需求旺）", "Bull (strong leverage demand)")}</button>
          <button data-r="calm" class="on">${T("平稳", "Calm")}</button>
          <button data-r="bear">${T("熊市（杠杆退潮）", "Bear (leverage unwinds)")}</button>
        </div>
      </div>
      <div class="demo-grid">
        <div class="demo-block">
          <label class="demo-label">${T("你估计的年度出事概率（被攻破、脱锚、跑路）", "Your estimated annual failure probability (exploit, depeg, rug)")}${C}<b id="dy-pd-v"></b></label>
          <input class="demo-slider" id="dy-pd" type="range" min="0" max="0.25" step="0.001" value="${pd}">
        </div>
        <div class="demo-block">
          <label class="demo-label">${T("出事时的损失比例", "Loss if it fails")}${C}<b id="dy-lgd-v"></b></label>
          <input class="demo-slider" id="dy-lgd" type="range" min="0" max="1" step="0.05" value="${lgd}">
        </div>
      </div>
      <div class="demo-block"><div class="stages" id="dy-bars"></div></div>
      <div class="stat-row">
        <div class="stat"><div class="k">${T("标称年化（看板上的数字）", "Headline APY (what the dashboard shows)")}</div><div class="v" id="dy-head">–</div></div>
        <div class="stat"><div class="k">${T("扣除预期损失后", "After expected loss")}</div><div class="v acc" id="dy-net">–</div></div>
        <div class="stat"><div class="k">${T("相对国库券 4.24%", "vs T-bill 4.24%")}</div><div class="v" id="dy-sp">–</div></div>
        <div class="stat"><div class="k">${T("1 万美元一年后（预期）", "$10,000 after a year (expected)")}</div><div class="v" id="dy-fv">–</div></div>
      </div>
      <div class="demo-log" id="dy-log"></div>
      <p class="demo-tip">${T(
        "先在“平稳”里看各产品，再切到“熊市”：借贷利息和资金费率跟着杠杆需求一起缩水，挖矿池的代币补贴几乎蒸发，基差交易甚至变成负收益——真实收益是牛市的产物。再把出事概率拉高一点，看看那几个百分点的“溢价”还剩多少。",
        "Look at each product in \"Calm,\" then switch to \"Bear\": lending interest and funding shrink along with leverage demand, the farm's token subsidy all but evaporates, and the basis trade even turns negative. Real yield is a creature of bull markets. Then nudge the failure probability up and see how much of that few-point \"premium\" survives."
      )}</p>
    </div>`;

  const q = (s) => root.querySelector(s);

  const paint = () => {
    q("#dy-pd").value = pd; q("#dy-lgd").value = lgd;
    q("#dy-pd-v").textContent = fmtPct(pd, 1);
    q("#dy-lgd-v").textContent = fmtPct(lgd, 0);
    const p = P[prod];
    const parts = p.parts(regime);
    const el = pd * lgd;
    const rows = [...parts, ["el", T("预期损失（概率 × 损失）", "Expected loss (probability × loss)"), -el]];
    const headline = parts.filter(([t]) => t === "real" || t === "sub").reduce((s, [, , v, nom]) => s + (nom ?? v), 0);
    const net = rows.reduce((s, [, , v]) => s + v, 0);
    const realSum = parts.filter(([t]) => t === "real").reduce((s, [, , v]) => s + v, 0);
    const sub = parts.filter(([t]) => t === "sub").reduce((s, [, , v]) => s + v, 0);
    const maxAbs = Math.max(0.1, ...rows.map(([, , v]) => Math.abs(v)));
    const color = { real: "var(--green)", sub: "var(--orange)", il: "var(--red)", cost: "var(--muted)", el: "var(--red)" };
    q("#dy-bars").innerHTML = rows.map(([t, lab, v]) => `<div class="stage-bar">
        <span class="lab">${lab}</span>
        <div class="track"><div class="fill" style="width:${(Math.abs(v) / maxAbs) * 100}%;background:${v < 0 && t === "real" ? "var(--red)" : color[t]}"></div></div>
        <span class="val" style="color:${v < 0 ? "var(--red)" : "var(--ink)"}">${(v >= 0 ? "+" : "") + fmtPct(v, 1)}</span></div>`).join("")
      + `<div class="stage-bar"><span class="lab"><b>${T("国库券基准", "T-bill benchmark")}</b></span><div class="track"><div class="fill ghost" style="width:${(TBILL / maxAbs) * 100}%"></div></div><span class="val">${fmtPct(TBILL, 2)}</span></div>`;

    q("#dy-head").textContent = fmtPct(headline, 1);
    q("#dy-net").textContent = fmtPct(net, 2);
    q("#dy-net").className = "v " + (net >= 0 ? "acc" : "neg");
    const sp = net - TBILL;
    q("#dy-sp").textContent = (sp >= 0 ? "+" : "") + fmtPct(sp, 2);
    q("#dy-sp").className = "v " + (sp >= 0 ? "pos" : "neg");
    q("#dy-fv").textContent = fmtUsd(fv(10000, net, 1));

    const lines = [];
    const subNom = parts.filter(([t]) => t === "sub").reduce((s, [, , , nom]) => s + (nom || 0), 0);
    if (subNom > 0) lines.push(`<span class="warn">${T("看板上的 ", "Of the ")}${fmtPct(headline, 0)}${T(" 里有 ", " on the dashboard, ")}${fmtPct(subNom, 0)}${T(" 是代币补贴；按年末币价折算只剩 ", " is token subsidy; at the year-end token price it is worth only ")}${fmtPct(sub, 1)}${T("。补贴来自稀释其他持币人，币价一跌就缩水。", ". Subsidies come from diluting other holders and shrink when the token falls.")}</span>`);
    if (realSum < 0) lines.push(`<span class="bad">${T("真实来源为负：熊市里资金费率转负，空头反过来要付钱给多头。", "The real source is negative: in a bear market funding flips and shorts must pay longs.")}</span>`);
    if (p.eth) lines.push(T("另外注意：这个产品让你持有 ETH 或挖矿代币的价格敞口，上表只算“收益”，没算本金本身的涨跌。", "Also note: this product leaves you exposed to the price of ETH or the farm token. The table counts only the yield, not the rise or fall of the principal itself."));
    lines.push(sp >= 0
      ? T("扣掉预期损失后仍比国库券多 ", "After expected loss it still beats T-bills by ") + fmtPct(sp, 2) + T("。这就是你为承担上面那些风险拿到的溢价——问问自己够不够。", ". That's your premium for carrying the risks above. Ask yourself whether it's enough.")
      : T("扣掉预期损失后还不如国库券：同样的美元放进代币化国债，收益更高、风险更低。", "After expected loss it trails T-bills: the same dollars earn more, with less risk, in a tokenized Treasury fund."));
    q("#dy-log").innerHTML = lines.map((l) => `<div>${l}</div>`).join("");
  };

  q("#dy-prod").addEventListener("click", (e) => {
    const b = e.target.closest("button"); if (!b || !P[b.dataset.p]) return;
    prod = b.dataset.p; pd = P[prod].pd; lgd = P[prod].lgd;
    q("#dy-prod").querySelectorAll("button").forEach((x) => x.classList.toggle("on", x === b));
    paint();
  });
  q("#dy-reg").addEventListener("click", (e) => {
    const b = e.target.closest("button"); if (!b || !["bull", "calm", "bear"].includes(b.dataset.r)) return;
    regime = b.dataset.r;
    q("#dy-reg").querySelectorAll("button").forEach((x) => x.classList.toggle("on", x === b));
    paint();
  });
  q("#dy-pd").addEventListener("input", (e) => { pd = +e.target.value; paint(); });
  q("#dy-lgd").addEventListener("input", (e) => { lgd = +e.target.value; paint(); });
  paint();
}
