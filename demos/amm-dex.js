// 交互演示：AMM 沙盘——
// ① 换币：在恒定乘积池（初始报价 3,000 USDC/ETH）里用 USDC 买 ETH，调池子深度、单子大小与手续费档位，看成交均价、价格冲击与交易后报价；
// ② 做 LP：存入 10 ETH + 30,000 USDC，拖动 ETH 价格倍数、手续费年化与持有天数，看 LP 价值 vs 单纯持有，以及无常损失曲线。
import { ammSwap, fmtPct, fmtNum, fmtUsd } from "./_fin.js";
import { lineChart, chartBlock } from "./_chart.js";

export default function mount(root, lang) {
  const en = lang === "en";
  const T = (zh, e) => (en ? e : zh);
  const C = T("：", ": ");
  const P0 = 3000;
  let mode = "swap";
  const sw = { depth: 1000, size: 300000, fee: 0.003 };
  const lp = { r: 2, apr: 0.2, days: 365 };
  const IL = (r) => (2 * Math.sqrt(r)) / (1 + r) - 1;

  root.innerHTML = `
    <div class="demo">
      <div class="demo-head">${T("🔁 AMM 沙盘：x·y=k 怎么报价，LP 怎么赚钱又怎么亏钱", "🔁 AMM sandbox: how x·y=k quotes, and how LPs earn and lose")}</div>
      <div class="demo-seg" id="am-mode">
        <button data-m="swap" class="on">${T("① 换币：滑点与价格冲击", "① Swap: slippage & price impact")}</button>
        <button data-m="lp">${T("② 做 LP：手续费 vs 无常损失", "② Be an LP: fees vs impermanent loss")}</button>
      </div>

      <div id="am-swap">
        <div class="demo-grid">
          <div class="demo-block">
            <label class="demo-label">${T("池子深度（池中 ETH；USDC 按 3,000 配对）", "Pool depth (ETH in pool; paired with USDC at 3,000)")}${C}<b id="am-dp-v"></b></label>
            <input class="demo-slider" id="am-dp" type="range" min="50" max="5000" step="50" value="${sw.depth}">
            <label class="demo-label">${T("你用多少 USDC 买 ETH", "USDC you spend buying ETH")}${C}<b id="am-sz-v"></b></label>
            <input class="demo-slider" id="am-sz" type="range" min="1000" max="1000000" step="1000" value="${sw.size}">
          </div>
          <div class="demo-block">
            <div class="demo-label">${T("手续费档位", "Fee tier")}</div>
            <div class="demo-seg" id="am-fee">
              <button data-f="0.0005">0.05%</button>
              <button data-f="0.003" class="on">0.3%</button>
              <button data-f="0.01">1%</button>
            </div>
            <div class="demo-meta" id="am-share"></div>
          </div>
        </div>
        <div class="stat-row">
          <div class="stat"><div class="k">${T("拿到的 ETH", "ETH received")}</div><div class="v" id="am-out">–</div></div>
          <div class="stat"><div class="k">${T("平均成交价", "Average fill price")}</div><div class="v acc" id="am-avg">–</div></div>
          <div class="stat"><div class="k">${T("总成本（相对 3,000）", "All-in cost (vs 3,000)")}</div><div class="v neg" id="am-cost">–</div></div>
          <div class="stat"><div class="k">${T("交易后池子报价", "Pool quote after trade")}</div><div class="v" id="am-post">–</div></div>
        </div>
        <div class="demo-block" id="am-chart1"></div>
      </div>

      <div id="am-lp" style="display:none">
        <div class="demo-grid">
          <div class="demo-block">
            <label class="demo-label">${T("ETH 价格变成原来的几倍", "ETH price as a multiple of the start")}${C}<b id="am-r-v"></b></label>
            <input class="demo-slider" id="am-r" type="range" min="0.1" max="5" step="0.05" value="${lp.r}">
            <label class="demo-label">${T("手续费年化（按存入价值）", "Annualized fee income (on deposit value)")}${C}<b id="am-apr-v"></b></label>
            <input class="demo-slider" id="am-apr" type="range" min="0" max="0.6" step="0.01" value="${lp.apr}">
          </div>
          <div class="demo-block">
            <label class="demo-label">${T("做 LP 的天数", "Days as an LP")}${C}<b id="am-d-v"></b></label>
            <input class="demo-slider" id="am-d" type="range" min="1" max="730" step="1" value="${lp.days}">
            <div class="demo-meta">${T("起点：存入 10 ETH + 30,000 USDC（ETH = 3,000，总值 60,000 美元），占池子 1%。", "Start: deposit 10 ETH + 30,000 USDC (ETH = 3,000, $60,000 total), 1% of the pool.")}</div>
          </div>
        </div>
        <div class="stat-row">
          <div class="stat"><div class="k">${T("LP 持仓（再平衡后）", "LP holdings (after rebalancing)")}</div><div class="v" id="am-hold">–</div></div>
          <div class="stat"><div class="k">${T("单纯持有的价值", "Value if you just held")}</div><div class="v" id="am-hodl">–</div></div>
          <div class="stat"><div class="k">${T("LP 价值（含手续费）", "LP value (incl. fees)")}</div><div class="v acc" id="am-lpv">–</div></div>
          <div class="stat"><div class="k">${T("LP 相对单纯持有", "LP vs just holding")}</div><div class="v" id="am-vs">–</div></div>
        </div>
        <div class="demo-block" id="am-chart2"></div>
        <div class="demo-log" id="am-log"></div>
      </div>

      <p class="demo-tip">${T(
        "换币时，看“总成本”几乎等于“单子占池子的比例 + 手续费”——把池子加深十倍，同一笔单的价格冲击就降到约十分之一（手续费不变）。做 LP 时，把价格拖到 0.5 倍或 2 倍再拖到 4 倍：无论涨跌，红线都往下弯，这就是卖出波动率；再看手续费要多高、时间要多长，绿线才能回到零以上。",
        "When swapping, notice that the all-in cost is almost exactly the order's share of the pool plus the fee: make the pool ten times deeper and the same order's price impact shrinks to about a tenth (the fee stays the same). As an LP, drag the price to 0.5× or 2×, then to 4×. Up or down, the red line bends below zero, which is what selling volatility looks like. Then see how high the fees and how long the holding period must be before the green line gets back above zero."
      )}</p>
    </div>`;

  const q = (s) => root.querySelector(s);

  const paintSwap = () => {
    const x = sw.depth, y = sw.depth * P0;
    q("#am-dp-v").textContent = fmtNum(x, 0) + " ETH + " + fmtUsd(y);
    q("#am-sz-v").textContent = fmtUsd(sw.size);
    q("#am-share").textContent = T("你的单子占池中 USDC 的 ", "Your order is ") + fmtPct(sw.size / y, 2) + T("", " of the pool's USDC");
    const r = ammSwap(y, x, sw.size, sw.fee);
    const avg = sw.size / r.out;
    const post = (y + sw.size) / r.newY;
    q("#am-out").textContent = fmtNum(r.out, 3) + " ETH";
    q("#am-avg").textContent = fmtUsd(avg, 0);
    q("#am-cost").textContent = "+" + fmtPct(avg / P0 - 1, 2);
    q("#am-post").textContent = fmtUsd(post, 0) + " (+" + fmtPct(post / P0 - 1, 1) + ")";

    const fee = sw.fee;
    const cost = (sharePct) => { const d = y * sharePct / 100; if (d <= 0) return fee * 100; const o = ammSwap(y, x, d, fee).out; return ((d / o) / P0 - 1) * 100; };
    const impact = (sharePct) => { const d = y * sharePct / 100; if (d <= 0) return 0; const o = ammSwap(y, x, d, 0); return ((y + d) / o.newY / P0 - 1) * 100; };
    const res = lineChart({
      fns: [{ f: cost, cls: "line" }, { f: impact, cls: "line3" }],
      lo: 0, hi: 30, xlabel: T("单子占池中 USDC 的比例（%）", "Order size as % of the pool's USDC"),
      markerX: Math.min(30, (sw.size / y) * 100), markerLabel: T("你的单子", "your order"), forceZero: true, uid: "am1",
    });
    q("#am-chart1").innerHTML = chartBlock(res, [["var(--orange)", T("平均成交价比报价贵多少（%，含手续费）", "Average fill above the quote (%, incl. fee)")], ["var(--red)", T("交易后报价上移多少（%）", "Post-trade quote move (%)")]]);
  };

  const paintLp = () => {
    const r = lp.r, V0 = 60000;
    q("#am-r-v").textContent = fmtNum(r, 2) + "x" + T("（ETH = ", " (ETH = ") + fmtUsd(P0 * r) + T("）", ")");
    q("#am-apr-v").textContent = fmtPct(lp.apr, 0);
    q("#am-d-v").textContent = lp.days + T(" 天", " days");
    // 恒定乘积池被套利者再平衡后：你的份额 = 1% × (√(k/p′), √(k·p′))
    const k = 1000 * 3000000, p1 = P0 * r;
    const ethH = 0.01 * Math.sqrt(k / p1), usdcH = 0.01 * Math.sqrt(k * p1);
    const lpNoFee = ethH * p1 + usdcH;
    const hodl = 10 * p1 + 30000;
    const fees = V0 * lp.apr * lp.days / 365;
    const lpv = lpNoFee + fees;
    q("#am-hold").textContent = fmtNum(ethH, 2) + " ETH + " + fmtUsd(usdcH);
    q("#am-hodl").textContent = fmtUsd(hodl);
    q("#am-lpv").textContent = fmtUsd(lpv);
    const vs = lpv / hodl - 1;
    q("#am-vs").textContent = (vs >= 0 ? "+" : "") + fmtPct(vs, 2);
    q("#am-vs").className = "v " + (vs >= 0 ? "pos" : "neg");

    const feePct = lp.apr * lp.days / 365;
    const res = lineChart({
      fns: [{ f: (x) => IL(x) * 100, cls: "line3" }, { f: (x) => (((2 * Math.sqrt(x) * 30000 + V0 * feePct) / (30000 * (x + 1))) - 1) * 100, cls: "line4" }],
      lo: 0.1, hi: 5, xlabel: T("ETH 价格倍数 r", "ETH price multiple r"), markerX: r, markerLabel: T("当前", "now"), forceZero: true, uid: "am2",
    });
    q("#am-chart2").innerHTML = chartBlock(res, [["var(--red)", T("无常损失（%，不含手续费）", "Impermanent loss (%, before fees)")], ["var(--green)", T("LP 相对单纯持有（%，含手续费）", "LP vs holding (%, incl. fees)")]]);

    const il = IL(r);
    const lines = [];
    lines.push(T("无常损失 = 2√r ÷ (1 + r) − 1 = ", "Impermanent loss = 2√r ÷ (1 + r) − 1 = ") + fmtPct(il, 2) + T("；手续费收入 ", "; fee income ") + fmtUsd(fees) + T("（相当于存入价值的 ", " (") + fmtPct(feePct, 1) + T("）。", " of the deposit)."));
    if (il < -0.001) {
      const need = -il * hodl / V0 / (lp.apr || 1e-9) * 365;
      lines.push(lp.apr > 0
        ? T("按这个手续费年化，大约需要 ", "At this fee rate you'd need roughly ") + fmtNum(need, 0) + T(" 天才能用手续费补回无常损失。", " days of fees to make up the impermanent loss.")
        : `<span class="bad">${T("没有手续费，LP 就是纯粹亏钱的“卖波动率”。", "With no fees, being an LP is pure losing short volatility.")}</span>`);
    }
    if (r < 1) lines.push(`<span class="warn">${T("注意：单纯持有本身也已亏损 ", "Note: just holding is itself down ")}${fmtPct(hodl / V0 - 1, 1)}${T("；无常损失是在这之上的额外损失。", "; impermanent loss comes on top of that.")}</span>`);
    q("#am-log").innerHTML = lines.map((l) => `<div>${l}</div>`).join("");
  };

  const paint = () => {
    q("#am-swap").style.display = mode === "swap" ? "" : "none";
    q("#am-lp").style.display = mode === "lp" ? "" : "none";
    if (mode === "swap") paintSwap(); else paintLp();
  };

  const seg = (id, fn) => q(id).addEventListener("click", (e) => {
    const b = e.target.closest("button"); if (!b) return;
    q(id).querySelectorAll("button").forEach((x) => x.classList.toggle("on", x === b));
    fn(b); paint();
  });
  seg("#am-mode", (b) => { mode = b.dataset.m; });
  seg("#am-fee", (b) => { sw.fee = +b.dataset.f; });
  q("#am-dp").addEventListener("input", (e) => { sw.depth = +e.target.value; paint(); });
  q("#am-sz").addEventListener("input", (e) => { sw.size = +e.target.value; paint(); });
  q("#am-r").addEventListener("input", (e) => { lp.r = +e.target.value; paint(); });
  q("#am-apr").addEventListener("input", (e) => { lp.apr = +e.target.value; paint(); });
  q("#am-d").addEventListener("input", (e) => { lp.days = +e.target.value; paint(); });
  paint();
}
