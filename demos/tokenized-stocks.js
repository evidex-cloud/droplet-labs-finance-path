// 交互演示：代币化股票的两个沙盘——
// ① 周末缺口：周五收盘 100 美元，周末出新闻；代币在许可制 AMM 池子里 24/7 交易（ammSwap），
//    但做市商无法对冲、也不能换回普通股套利。看周末成交能把多少新闻“提前定价”，剩下多少缺口留到周一。
// ② 你买的到底是什么：原生代币化股份 / 托管包装代币 / 合成敞口，在不同事件下各自发生什么。
import { ammSwap, fmtUsd, fmtPct, fmtNum, fmtBig } from "./_fin.js";
import { lineChart, chartBlock } from "./_chart.js";

export default function mount(root, lang) {
  const en = lang === "en";
  const T = (zh, e) => (en ? e : zh);
  const P0 = 100;
  const g = { shock: -0.1, depth: 50e6, flow: -1e6, fee: 0.003 };
  let mode = "gap", kind = "native", ev = "div";

  const KINDS = {
    native: { name: T("原生代币化股份", "Native tokenized share"), rights: [1, 1, 1, 1, 1, 0] },
    wrapped: { name: T("托管包装代币", "Wrapped token"), rights: [0, 1, 0, 0.5, 1, 0] },
    synth: { name: T("合成敞口（永续合约）", "Synthetic (perpetual)"), rights: [0, 0.5, 0, 0, 1, 1] },
  };
  const RIGHTS = [T("投票权", "Voting rights"), T("分红", "Dividends"), T("对上市公司的直接索取权", "Direct claim on the listed company"), T("可换回普通股", "Convertible to the ordinary share"), T("24/7 交易", "24/7 trading"), T("杠杆与强平风险", "Leverage and liquidation risk")];
  const EVENTS = {
    div: T("公司派发每股 1 美元股息", "The company pays a $1 dividend per share"),
    fail: T("发币方 / 平台破产", "The token issuer / platform fails"),
    halt: T("底层股票因重大消息停牌", "The underlying stock is halted on major news"),
    vote: T("公司召开股东大会表决并购", "Shareholders vote on a merger"),
  };
  const OUT = {
    native: {
      div: ["ok", T("股息直接到你名下，和普通股东完全一样。", "The dividend comes straight to you, exactly as for any shareholder.")],
      fail: ["ok", T("你持有的是股份本身，登记在存管体系里；平台倒闭影响交易渠道，不影响你的所有权（前提是私钥安全）。", "You hold the share itself, recorded in the depository system. A venue failing hurts your trading channel, not your ownership (provided your keys are safe).")],
      halt: ["warn", T("代币同步暂停——这是 SEC 创新豁免的条件之一。24/7 市场也要服从链下的暂停键。", "The token halts too, one of the conditions of the SEC's innovation exemption. A 24/7 market still obeys an off-chain pause button.")],
      vote: ["ok", T("你有投票权。", "You get a vote.")],
    },
    wrapped: {
      div: ["warn", T("股息先付给托管人，再由发币方转付或再投资——取决于条款，可能有延迟和扣费。", "The dividend is paid to the custodian first, then passed on or reinvested by the token issuer, depending on the terms, possibly with delay and fees.")],
      fail: ["bad", T("你是发币方（或其 SPV）的债权人。股票是否与其自有资产隔离、托管是否足额，决定你能拿回多少——这就是“代币只是收据”。", "You are a creditor of the token issuer (or its SPV). Whether the shares are ring-fenced and fully held decides how much you recover. That is what \"a token is a receipt\" means.")],
      halt: ["warn", T("取决于发币方的规则：有的同步暂停，有的继续交易，价格可能与真实股票脱节。", "It depends on the issuer's rules: some halt, some keep trading, and the price can drift from the real stock.")],
      vote: ["bad", T("通常没有投票权，投票属于托管人。", "Usually no vote; the vote belongs to the custodian.")],
    },
    synth: {
      div: ["warn", T("没有真正的股息，只有合约层面的调整（资金费率或价格调整）。", "No real dividend, just an adjustment inside the contract (funding or price adjustment).")],
      fail: ["bad", T("你的保证金和盈利都在平台或合约里；平台出事，你是它的无担保对手方。", "Your margin and profits sit with the venue or contract; if it fails you are an unsecured counterparty.")],
      halt: ["bad", T("合约可能继续交易，但没有真实价格可参照，只能依赖预言机——最容易出现操纵与连环强平。", "The contract may keep trading with no real price to anchor it, relying on an oracle. This is where manipulation and liquidation cascades are most likely.")],
      vote: ["bad", T("没有。你从来不是股东。", "None. You were never a shareholder.")],
    },
  };

  root.innerHTML = `
    <div class="demo">
      <div class="demo-head">${T("📈 代币化股票沙盘：周末缺口与所有权", "📈 Tokenized stock sandbox: the weekend gap and ownership")}</div>
      <div class="demo-seg" id="ts-mode">
        <button data-m="gap" class="on">${T("① 周末缺口计算器", "① Weekend gap calculator")}</button>
        <button data-m="own">${T("② 你买的到底是什么", "② What did you actually buy?")}</button>
      </div>
      <div id="ts-gap">
        <div class="demo-grid">
          <div class="demo-block">
            <label class="demo-label">${T("周末新闻让公平价值变化", "Weekend news moves fair value by")}${T("：", ": ")}<b id="ts-sh-v"></b></label>
            <input class="demo-slider" id="ts-sh" type="range" min="-0.3" max="0.3" step="0.01" value="${g.shock}">
            <label class="demo-label">${T("周末池子深度（每边）", "Weekend pool depth (each side)")}${T("：", ": ")}<b id="ts-dp-v"></b></label>
            <input class="demo-slider" id="ts-dp" type="range" min="5000000" max="500000000" step="5000000" value="${g.depth}">
          </div>
          <div class="demo-block">
            <label class="demo-label">${T("周末净成交（负 = 净卖出，按周五价计）", "Weekend net flow (negative = net selling, at Friday's price)")}${T("：", ": ")}<b id="ts-fl-v"></b></label>
            <input class="demo-slider" id="ts-fl" type="range" min="-20000000" max="20000000" step="250000" value="${g.flow}">
            <div class="demo-btns"><button class="demo-btn" id="ts-full">${T("算出“完全定价新闻”需要的成交额", "Find the flow that fully prices the news")}</button></div>
          </div>
        </div>
        <div class="stat-row">
          <div class="stat"><div class="k">${T("周末公平价值", "Weekend fair value")}</div><div class="v" id="ts-fair">–</div></div>
          <div class="stat"><div class="k">${T("周末代币价格", "Weekend token price")}</div><div class="v acc" id="ts-wk">–</div></div>
          <div class="stat"><div class="k">${T("周末已定价的新闻比例", "Share of the news priced by the weekend")}</div><div class="v" id="ts-pct">–</div></div>
          <div class="stat"><div class="k">${T("留到周一开盘的缺口", "Gap left for Monday's open")}</div><div class="v neg" id="ts-gapv">–</div></div>
        </div>
        <div id="ts-chart"></div>
        <div class="demo-log" id="ts-log"></div>
      </div>
      <div id="ts-own" style="display:none">
        <div class="demo-block">
          <div class="demo-seg" id="ts-kind">${Object.keys(KINDS).map((k) => `<button data-k="${k}" class="${k === kind ? "on" : ""}">${KINDS[k].name}</button>`).join("")}</div>
        </div>
        <div class="demo-block" id="ts-rights"></div>
        <div class="demo-block">
          <div class="demo-label">${T("发生了一件事", "Something happens")}${T("：", ": ")}</div>
          <div class="demo-btns" id="ts-ev">${Object.keys(EVENTS).map((k) => `<button class="demo-btn ${k === ev ? "active" : ""}" data-e="${k}">${EVENTS[k]}</button>`).join("")}</div>
        </div>
        <div class="cmp-3" id="ts-cmp"></div>
      </div>
      <p class="demo-tip">${T(
        "①里保持新闻 −10%，把周末净卖出从 −100 万拖到 −300 万：价格一步步逼近 90，但在薄池子里，每一步都让卖家付出更大的滑点。再把池子深度拖大：深池子更难被推动，<strong>周末反而定价得更少</strong>，缺口更多留到周一。②里点“发币方破产”，对比三种结构——交易界面一样，结局完全不同。",
        "In ①, keep the news at −10% and drag weekend net selling from −$1M to −$3M: the price creeps toward $90, but in a thin pool each step costs sellers more slippage. Then enlarge the pool: a deep pool is harder to move, <strong>so less of the news gets priced over the weekend</strong> and more of the gap waits for Monday. In ②, click \"token issuer fails\" and compare the three structures: identical screens, completely different endings."
      )}</p>
    </div>`;

  const $ = (s) => root.querySelector(s);

  // 池子：x = 代币数，y = 美元；初始价格 P0
  const priceAfterFlow = (flowUsd) => {
    const x = g.depth / P0, y = g.depth;
    if (Math.abs(flowUsd) < 1) return { price: P0, exec: P0 };
    if (flowUsd < 0) {
      const tokens = -flowUsd / P0;
      const s = ammSwap(x, y, tokens, g.fee);
      return { price: s.priceAfter, exec: s.execPrice };
    }
    const s = ammSwap(y, x, flowUsd, g.fee); // 用美元买代币：priceAfter 为“每美元多少代币”
    return { price: 1 / s.priceAfter, exec: s.execPrice > 0 ? 1 / s.execPrice : P0 };
  };
  // 恒定乘积下把价格推到目标价需要的成交额（忽略手续费）：x' = sqrt(k / p')
  const flowToReach = (target) => {
    const x = g.depth / P0, y = g.depth, k = x * y;
    const x1 = Math.sqrt(k / target);
    return target < P0 ? -(x1 - x) * P0 : (k / x1 - y);
  };

  const paintGap = () => {
    const fair = P0 * (1 + g.shock);
    $("#ts-sh-v").textContent = (g.shock > 0 ? "+" : "") + fmtPct(g.shock, 0);
    $("#ts-dp-v").textContent = "$" + fmtBig(g.depth, 0);
    $("#ts-fl-v").textContent = (g.flow < 0 ? "−" : "+") + "$" + fmtBig(Math.abs(g.flow), 2);
    const { price, exec } = priceAfterFlow(g.flow);
    const moved = price - P0, want = fair - P0;
    const pct = Math.abs(want) < 1e-9 ? 1 : moved / want;
    const gapLeft = fair / price - 1;
    $("#ts-fair").textContent = fmtUsd(fair, 2);
    $("#ts-wk").textContent = fmtUsd(price, 2);
    $("#ts-pct").textContent = fmtPct(pct, 0);
    $("#ts-gapv").textContent = (gapLeft > 0 ? "+" : "") + fmtPct(gapLeft, 1);
    const lim = Math.max(Math.abs(flowToReach(fair)) * 2, Math.abs(g.flow) * 1.3, 2e6);
    const res = lineChart({
      fns: [
        { f: (m) => priceAfterFlow(m * 1e6).price, cls: "line" },
        { f: () => fair, cls: "line3" },
        { f: () => P0, cls: "line2" },
      ],
      lo: -lim / 1e6, hi: lim / 1e6, xlabel: T("周末净成交（百万美元；负 = 卖出）", "Weekend net flow ($ millions; negative = selling)"),
      markerX: g.flow / 1e6, markerLabel: T("当前", "now"), uid: "ts",
    });
    $("#ts-chart").innerHTML = chartBlock(res, [
      ["var(--orange)", T("周末代币价格", "Weekend token price")],
      ["var(--red)", T("新闻后的公平价值", "Fair value after the news")],
      ["var(--blue)", T("周五收盘价", "Friday close")],
    ]);
    const need = flowToReach(fair);
    const lines = [];
    lines.push(`${T("要把价格推到公平价值", "To push the price to fair value of")} ${fmtUsd(fair, 2)}${T("，需要周末净成交约", ", the weekend needs net flow of about")} <b>${need < 0 ? "−" : "+"}$${fmtBig(Math.abs(need), 2)}</b>${T("（池子深度的", " (")}${fmtPct(Math.abs(need) / g.depth, 1)}${T("）。", " of pool depth).")}`);
    if (Math.abs(g.flow) > 1) lines.push(`${T("周末交易者的平均成交价", "Weekend traders' average execution price")} ${fmtUsd(exec, 2)}${T("，相对周五收盘", " versus Friday's close, a move of")} ${fmtPct(exec / P0 - 1, 1)}${T("。", ".")}`);
    if (Math.sign(g.flow) !== Math.sign(g.shock) && Math.abs(g.flow) > 1 && Math.abs(g.shock) > 0.001) lines.push(`<span class="bad">${T("周末成交方向与新闻相反：价格被推离公平价值，周一的缺口反而更大——薄市场里少数订单也能制造错价。", "Weekend flow runs against the news: price is pushed away from fair value and Monday's gap gets bigger. In a thin market a few orders can create a mispricing.")}</span>`);
    else if (Math.abs(pct) >= 0.95) lines.push(`<span class="ok">${T("周末几乎完全定价了新闻，周一开盘不会有大缺口。这需要足够多愿意承担风险的周末交易者。", "The weekend almost fully priced the news, so Monday opens without a big gap. That takes enough risk-taking weekend traders.")}</span>`);
    else lines.push(`<span class="warn">${T("周末只定价了约", "The weekend priced only about")} ${fmtPct(Math.max(0, pct), 0)} ${T("的新闻；剩下约", "of the news; the remaining")} ${fmtPct(Math.abs(gapLeft), 1)} ${T("的缺口会在周一开盘一次性出现。", "gap will appear all at once at Monday's open.")}</span>`);
    $("#ts-log").innerHTML = lines.map((l) => `<div>${l}</div>`).join("");
  };

  const paintOwn = () => {
    const kd = KINDS[kind];
    $("#ts-rights").innerHTML = RIGHTS.map((r, i) => {
      const v = kd.rights[i];
      const isRisk = i === 5;
      const cls = isRisk ? (v ? "bad" : "ok") : (v === 1 ? "ok" : v > 0 ? "" : "bad");
      const txt = isRisk ? (v ? T("有", "Yes") : T("无", "No")) : (v === 1 ? T("有", "Yes") : v > 0 ? T("部分 / 视条款", "Partial / per terms") : T("无", "No"));
      return `<span class="pill ${cls}" style="margin:3px 6px 3px 0;${cls === "" ? "background:var(--orange-soft);color:var(--orange-ink)" : ""}">${r}${T("：", ": ")}${txt}</span>`;
    }).join("");
    $("#ts-cmp").innerHTML = Object.keys(KINDS).map((k) => {
      const [c, t] = OUT[k][ev];
      return `<div class="cmp-cell ${k === kind ? "hl" : ""}"><h5>${KINDS[k].name}</h5><div class="demo-log"><span class="${c}">${t}</span></div></div>`;
    }).join("");
  };

  const bind = (id, key) => $(id).addEventListener("input", (e) => { g[key] = +e.target.value; paintGap(); });
  bind("#ts-sh", "shock"); bind("#ts-dp", "depth"); bind("#ts-fl", "flow");
  $("#ts-full").addEventListener("click", () => {
    const need = flowToReach(P0 * (1 + g.shock));
    g.flow = Math.max(-20e6, Math.min(20e6, Math.round(need / 250000) * 250000));
    $("#ts-fl").value = g.flow;
    paintGap();
  });
  root.querySelectorAll("#ts-kind button").forEach((b) => b.addEventListener("click", () => {
    kind = b.dataset.k;
    root.querySelectorAll("#ts-kind button").forEach((x) => x.classList.toggle("on", x === b));
    paintOwn();
  }));
  root.querySelectorAll("#ts-ev button").forEach((b) => b.addEventListener("click", () => {
    ev = b.dataset.e;
    root.querySelectorAll("#ts-ev button").forEach((x) => x.classList.toggle("active", x === b));
    paintOwn();
  }));
  root.querySelectorAll("#ts-mode button").forEach((b) => b.addEventListener("click", () => {
    mode = b.dataset.m;
    root.querySelectorAll("#ts-mode button").forEach((x) => x.classList.toggle("on", x === b));
    $("#ts-gap").style.display = mode === "gap" ? "" : "none";
    $("#ts-own").style.display = mode === "own" ? "" : "none";
  }));
  paintGap();
  paintOwn();
}
