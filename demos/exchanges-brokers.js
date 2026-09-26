// 交互演示：迷你订单簿——调价差、深度、平静/恐慌，下一张市价单或限价单，
// 看它“吃掉”几档、成交均价、执行成本（基点）；同样的钱在一个 AMM 池子里会成交在什么价；
// 小单还会显示“订单流付费”的三方分账（示意）。
import { ammSwap, fmtNum, fmtUsd, fmtBig, clamp } from "./_fin.js";

export default function mount(root, lang) {
  const en = lang === "en";
  const T = (zh, e) => (en ? e : zh);
  const MID = 100, LEVELS = 15;
  const st = { side: "buy", type: "market", size: 1000, spreadC: 4, depth: 300, stress: false, limitTicks: 3, pool: 20e6 };

  root.innerHTML = `
    <div class="demo">
      <div class="demo-head">${T("📒 迷你订单簿：你的市价单会吃掉几档？", "📒 Mini order book: how many levels will your market order eat?")}</div>
      <div class="demo-row">
        <div class="demo-seg" id="ob-side">
          <button data-v="buy" class="on">${T("买入", "Buy")}</button>
          <button data-v="sell">${T("卖出", "Sell")}</button>
        </div>
        <div class="demo-seg" id="ob-type">
          <button data-v="market" class="on">${T("市价单", "Market order")}</button>
          <button data-v="limit">${T("限价单", "Limit order")}</button>
        </div>
        <div class="demo-seg" id="ob-mood">
          <button data-v="calm" class="on">${T("平静市场", "Calm market")}</button>
          <button data-v="stress">${T("恐慌市场", "Panicked market")}</button>
        </div>
      </div>
      <div class="demo-grid">
        <div class="demo-block">
          <label class="demo-label">${T("订单数量（股）：", "Order size (shares): ")}<b id="ob-size-v"></b></label>
          <input class="demo-slider" id="ob-size" type="range" min="100" max="30000" step="100" value="${st.size}">
          <label class="demo-label">${T("做市商报出的价差（美分）：", "Market makers' quoted spread (cents): ")}<b id="ob-sp-v"></b></label>
          <input class="demo-slider" id="ob-sp" type="range" min="1" max="20" step="1" value="${st.spreadC}">
        </div>
        <div class="demo-block">
          <label class="demo-label">${T("最优价位上的挂单量（深度，股）：", "Size resting at the best level (depth, shares): ")}<b id="ob-dp-v"></b></label>
          <input class="demo-slider" id="ob-dp" type="range" min="100" max="5000" step="100" value="${st.depth}">
          <div id="ob-limit-wrap" style="display:none">
            <label class="demo-label">${T("限价（离中间价几档）：", "Limit price (levels from the midpoint): ")}<b id="ob-lim-v"></b></label>
            <input class="demo-slider" id="ob-lim" type="range" min="0" max="14" step="1" value="${st.limitTicks}">
          </div>
          <label class="demo-label">${T("对照：AMM 池子总规模：", "Comparison: AMM pool size: ")}<b id="ob-pool-v"></b></label>
          <input class="demo-slider" id="ob-pool" type="range" min="1000000" max="200000000" step="1000000" value="${st.pool}">
        </div>
      </div>
      <div class="demo-grid">
        <div class="demo-block"><div class="demo-label">${T("卖单（ask）", "Asks")}</div><div id="ob-asks"></div></div>
        <div class="demo-block"><div class="demo-label">${T("买单（bid）", "Bids")}</div><div id="ob-bids"></div></div>
      </div>
      <div class="stat-row">
        <div class="stat"><div class="k">${T("成交数量", "Filled")}</div><div class="v" id="ob-filled">–</div></div>
        <div class="stat"><div class="k">${T("成交均价", "Average price")}</div><div class="v" id="ob-avg">–</div></div>
        <div class="stat"><div class="k">${T("执行成本", "Execution cost")}</div><div class="v neg" id="ob-bp">–</div></div>
        <div class="stat"><div class="k">${T("吃掉的档位", "Levels consumed")}</div><div class="v acc" id="ob-lv">–</div></div>
        <div class="stat"><div class="k">${T("同样订单在 AMM", "Same order on an AMM")}</div><div class="v" id="ob-amm">–</div></div>
      </div>
      <div class="demo-log" id="ob-log"></div>
      <p class="demo-tip">${T(
        "先用 1,000 股的市价单在“平静市场”里试一次，再切到“恐慌市场”：同一张单子，做市商把价差拉宽、挂单缩水，成本可能翻好几倍——这就是“流动性是顺境之友”。再把订单拖到 2 万股以上，看它怎样一路打穿订单簿；最后把 AMM 池子调小，体会为什么阶段 13.3 说池子的深度决定滑点。",
        "Try a 1,000-share market order in the calm market, then switch to the panicked market: the same order meets wider spreads and thinner quotes, and its cost can multiply — liquidity is a fair-weather friend. Then drag the order past 20,000 shares and watch it punch through the book; finally shrink the AMM pool to see why Stage 13.3 says pool depth sets slippage."
      )}</p>
    </div>`;

  const $ = (id) => root.querySelector("#" + id);

  function book() {
    const half = (st.spreadC / 100) / 2 * (st.stress ? 4 : 1);
    const step = st.stress ? 0.03 : 0.01;
    const d0 = st.stress ? Math.max(25, st.depth / 4) : st.depth;
    const asks = [], bids = [];
    for (let i = 0; i < LEVELS; i++) {
      const sz = Math.round(d0 * (1 + 0.4 * i));
      asks.push({ px: MID + half + i * step, size: sz });
      bids.push({ px: MID - half - i * step, size: sz });
    }
    return { asks, bids, half };
  }

  function execute(levels) {
    const limitPx = st.type === "limit" ? levels[clamp(st.limitTicks, 0, LEVELS - 1)].px : null;
    let left = st.size, cost = 0, filled = 0, touched = 0;
    const takes = levels.map((l) => {
      if (left <= 0) return 0;
      if (limitPx != null && (st.side === "buy" ? l.px > limitPx + 1e-9 : l.px < limitPx - 1e-9)) return 0;
      const t = Math.min(left, l.size);
      left -= t; cost += t * l.px; filled += t; touched++;
      return t;
    });
    return { takes, filled, cost, rest: left, avg: filled ? cost / filled : NaN, limitPx, touched };
  }

  function ladder(levels, takes, isAsk) {
    const maxS = Math.max(...levels.map((l) => l.size));
    const rows = levels.slice(0, 8).map((l, i) => {
      const w = (l.size / maxS) * 100, tw = (takes[i] / maxS) * 100;
      const col = isAsk ? "var(--red)" : "var(--green)", soft = isAsk ? "var(--red-soft)" : "var(--green-soft)";
      return `<div class="bar2"><span class="lab">${l.px.toFixed(2)}</span><div class="track"><div style="position:relative;height:100%;width:${w}%;background:${soft};border-radius:6px"><div class="fill" style="position:absolute;left:0;top:0;width:${w ? (tw / w) * 100 : 0}%;background:${col}"></div></div></div><span class="val">${fmtNum(l.size, 0)}</span></div>`;
    });
    return (isAsk ? rows.reverse() : rows).join("");
  }

  function paint() {
    $("ob-size-v").textContent = fmtNum(st.size, 0);
    $("ob-sp-v").textContent = st.spreadC + T(" 美分", "¢");
    $("ob-dp-v").textContent = fmtNum(st.depth, 0);
    $("ob-pool-v").textContent = "$" + fmtBig(st.pool, 0);
    $("ob-limit-wrap").style.display = st.type === "limit" ? "" : "none";

    const b = book();
    const side = st.side === "buy" ? b.asks : b.bids;
    $("ob-lim-v").textContent = side[st.limitTicks].px.toFixed(2);
    const r = execute(side);
    const zero = new Array(LEVELS).fill(0);
    $("ob-asks").innerHTML = ladder(b.asks, st.side === "buy" ? r.takes : zero, true);
    $("ob-bids").innerHTML = ladder(b.bids, st.side === "sell" ? r.takes : zero, false);

    const sign = st.side === "buy" ? 1 : -1;
    const bp = r.filled ? sign * (r.avg - MID) / MID * 1e4 : NaN;
    $("ob-filled").textContent = fmtNum(r.filled, 0);
    $("ob-avg").textContent = r.filled ? r.avg.toFixed(3) : "–";
    $("ob-bp").textContent = r.filled ? fmtNum(bp, 1) + T(" 基点", " bp") : "–";
    $("ob-lv").textContent = r.touched;

    // AMM 对照：池子一半是美元、一半是股票代币，初始价格 = 中间价；手续费 0.3%
    const usdR = st.pool / 2, tokR = st.pool / 2 / MID;
    let ammAvg = NaN;
    if (r.filled) {
      if (st.side === "buy") { const s = ammSwap(usdR, tokR, r.cost); ammAvg = r.cost / s.out; }
      else { const s = ammSwap(tokR, usdR, r.filled); ammAvg = s.out / r.filled; }
    }
    const ammBp = sign * (ammAvg - MID) / MID * 1e4;
    $("ob-amm").textContent = isFinite(ammAvg) ? ammAvg.toFixed(3) + " (" + fmtNum(ammBp, 1) + T(" 基点", " bp") + ")" : "–";

    const lines = [];
    const newBest = side.find((l, i) => r.takes[i] < l.size);
    lines.push(`${T("中间价 ", "Midpoint ")}${MID.toFixed(2)}${T("，报出的价差 ", "; quoted spread ")}${(b.half * 2).toFixed(2)}${T(" 美元（", " (")}${fmtNum(b.half * 2 / MID * 1e4, 1)}${T(" 个基点）。", " bp).")}${st.stress ? ` <span class="warn">${T("恐慌中：做市商把价差放大 4 倍、每档挂单缩到四分之一、档位间距拉宽。", "Panic: market makers quadruple the spread, cut each level's size to a quarter and space the levels wider.")}</span>` : ""}`);
    if (r.filled) {
      const extra = sign * (r.cost - r.filled * MID);
      lines.push(`${T("你比按中间价成交多付（或少收）了 ", "Versus trading at the midpoint you paid (or gave up) ")}<b>${fmtUsd(extra, 0)}</b>${T("：其中半个价差 ", ": half-spread ")}${fmtUsd(r.filled * b.half, 0)}${T("，价格冲击 ", ", price impact ")}${fmtUsd(extra - r.filled * b.half, 0)}${T("。", ".")}`);
    }
    if (newBest) lines.push(`${T("成交后，对面的最优价从 ", "After the trade, the best opposite price moved from ")}${side[0].px.toFixed(2)}${T(" 移到 ", " to ")}${newBest.px.toFixed(2)}${T("——下一个人要付更差的价格，直到做市商补单。", " — the next trader gets a worse price until market makers refill the book.")}`);
    if (r.rest > 0 && st.type === "market") lines.push(`<span class="bad">${T("簿子上的 15 档被吃光了，还有 ", "All 15 levels were eaten and ")}${fmtNum(r.rest, 0)}${T(" 股没有成交——这就是阶段 7.5 的清算瀑布里“簿子被打穿”的样子。", " shares are still unfilled — this is what \"punching through the book\" looks like in Stage 7.5's liquidation cascades.")}</span>`);
    if (r.rest > 0 && st.type === "limit") lines.push(`<span class="warn">${T("限价单保护了你：超过限价 ", "Your limit protected you: nothing traded beyond ")}${r.limitPx.toFixed(2)}${T(" 的部分不成交，剩下 ", "; the remaining ")}${fmtNum(r.rest, 0)}${T(" 股挂在簿子上等待——你从“索取流动性”变成了“提供流动性”。", " shares rest on the book and wait — you switched from taking liquidity to providing it.")}</span>`);
    if (isFinite(ammAvg)) {
      const better = ammBp < bp;
      lines.push(`${T("同样规模的订单在 ", "The same order in a ")}$${fmtBig(st.pool, 0)}${T(" 的 AMM 池里：均价 ", " AMM pool: average ")}${ammAvg.toFixed(3)}${T("（含 0.3% 手续费）→ ", " (incl. 0.3% fee) → ")}<span class="${better ? "ok" : "warn"}">${better ? T("比订单簿便宜", "cheaper than the order book") : T("比订单簿贵", "costlier than the order book")}</span>${T("。池子越大，滑点越小（阶段 13.3）。", ". The bigger the pool, the smaller the slippage (Stage 13.3).")}`);
    }
    // 订单流付费的三方分账（示意）：只对不超过最优档挂单量的小单
    if (st.type === "market" && st.size <= side[0].size) {
      const improve = 0.25 * b.half, capture = b.half - improve, pfof = 0.2 * capture;
      lines.push(`<span class="ok">${T("若这张小单被路由给批发做市商（示意）：", "If this small order were routed to a wholesaler (illustrative): ")}</span>${T("你得到价格改善 ", "you get price improvement of ")}${fmtUsd(improve * st.size, 2)}${T("，券商收到订单流付费 ", ", the broker collects PFOF of ")}${fmtUsd(pfof * st.size, 2)}${T("，做市商留下 ", ", the market maker keeps ")}${fmtUsd((capture - pfof) * st.size, 2)}${T("。“零佣金”的成本就藏在这里。", ". That's where the cost of \"zero commission\" hides.")}`);
    }
    $("ob-log").innerHTML = lines.map((l) => `<div>${l}</div>`).join("");
  }

  const seg = (id, fn) => root.querySelectorAll(`#${id} button`).forEach((btn) => btn.addEventListener("click", () => {
    root.querySelectorAll(`#${id} button`).forEach((x) => x.classList.toggle("on", x === btn));
    fn(btn.dataset.v); paint();
  }));
  seg("ob-side", (v) => (st.side = v));
  seg("ob-type", (v) => (st.type = v));
  seg("ob-mood", (v) => (st.stress = v === "stress"));
  const bind = (id, key) => $(id).addEventListener("input", (e) => { st[key] = +e.target.value; paint(); });
  bind("ob-size", "size"); bind("ob-sp", "spreadC"); bind("ob-dp", "depth"); bind("ob-lim", "limitTicks"); bind("ob-pool", "pool");
  paint();
}
