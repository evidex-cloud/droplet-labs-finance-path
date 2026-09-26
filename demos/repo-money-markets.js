// 交互演示：回购抵押折扣计算器——
// 选抵押品（2/10/30 年期国债、公司债、股票），调抵押品规模、折扣、回购利率与期限，
// 算出能借多少、要多少本金、杠杆、一夜利息与年化套息；再施加利率冲击/股价下跌与折扣上调，
// 看追加保证金是否超过本金；最后看同一份抵押品被再抵押几次能撑起多少信用。
import { bondPrice, bondRisk, fmtUsd, fmtBig, fmtPct, fmtNum, clamp } from "./_fin.js";

export default function mount(root, lang) {
  const en = lang === "en";
  const T = (zh, e) => (en ? e : zh);

  // 收益率取自 2026-09-25 美国国债曲线（2 年 4.81%、10 年 5.17%、30 年 5.49%）；公司债与股票为示意
  const COLL = {
    t2: { name: T("2 年期国债", "2-year Treasury"), bond: true, cpn: 0.0481, yrs: 2, h: 0.01 },
    t10: { name: T("10 年期国债", "10-year Treasury"), bond: true, cpn: 0.0517, yrs: 10, h: 0.02 },
    t30: { name: T("30 年期国债", "30-year Treasury"), bond: true, cpn: 0.0549, yrs: 30, h: 0.03 },
    ig: { name: T("10 年期投资级公司债", "10-year IG corporate bond"), bond: true, cpn: 0.062, yrs: 10, h: 0.05 },
    eq: { name: T("大盘股票", "Large-cap stocks"), bond: false, yld: 0.015, h: 0.15 },
  };
  const st = { key: "t10", size: 100e6, h: 0.02, rate: 0.039, days: 1, dy: 10, drop: 0.05, h2: 0.05, reuse: 3 };

  root.innerHTML = `
    <div class="demo">
      <div class="demo-head">${T("🏧 回购当铺：抵押折扣、杠杆与追加保证金", "🏧 The repo pawnshop: haircuts, leverage and margin calls")}</div>
      <div class="demo-btns" id="rp-coll">
        ${Object.entries(COLL).map(([k, c]) => `<button data-k="${k}" class="demo-btn${k === st.key ? " active" : ""}">${c.name}</button>`).join("")}
      </div>
      <div class="demo-grid">
        <div class="demo-block">
          <label class="demo-label">${T("抵押品市值：", "Collateral value: ")}<b id="rp-size-v"></b></label>
          <input class="demo-slider" id="rp-size" type="range" min="1000000" max="1000000000" step="1000000" value="${st.size}">
          <label class="demo-label">${T("抵押折扣：", "Haircut: ")}<b id="rp-h-v"></b></label>
          <input class="demo-slider" id="rp-h" type="range" min="0.005" max="0.5" step="0.005" value="${st.h}">
        </div>
        <div class="demo-block">
          <label class="demo-label">${T("回购利率（年化，实际天数/360）：", "Repo rate (annual, actual/360): ")}<b id="rp-r-v"></b></label>
          <input class="demo-slider" id="rp-r" type="range" min="0" max="0.1" step="0.0005" value="${st.rate}">
          <label class="demo-label">${T("期限（天）：", "Term (days): ")}<b id="rp-d-v"></b></label>
          <input class="demo-slider" id="rp-d" type="range" min="1" max="90" step="1" value="${st.days}">
        </div>
      </div>
      <div class="stat-row">
        <div class="stat"><div class="k">${T("借到的现金", "Cash borrowed")}</div><div class="v" id="rp-cash">–</div></div>
        <div class="stat"><div class="k">${T("需要的本金", "Own capital needed")}</div><div class="v" id="rp-eq">–</div></div>
        <div class="stat"><div class="k">${T("杠杆", "Leverage")}</div><div class="v acc" id="rp-lev">–</div></div>
        <div class="stat"><div class="k">${T("本期利息", "Interest for the term")}</div><div class="v" id="rp-int">–</div></div>
        <div class="stat"><div class="k">${T("年化套息 / 本金回报", "Annual carry / return on capital")}</div><div class="v" id="rp-carry">–</div></div>
      </div>
      <div class="demo-block">
        <div class="demo-label">${T("压力测试：出钱方每天按市值重估抵押品", "Stress test: the lender marks the collateral to market every day")}</div>
        <div class="demo-grid">
          <div>
            <div id="rp-dy-wrap">
              <label class="demo-label">${T("收益率上升（基点）：", "Yield rise (bp): ")}<b id="rp-dy-v"></b></label>
              <input class="demo-slider" id="rp-dy" type="range" min="0" max="200" step="5" value="${st.dy}">
            </div>
            <div id="rp-dp-wrap" style="display:none">
              <label class="demo-label">${T("股价下跌：", "Stock price drop: ")}<b id="rp-dp-v"></b></label>
              <input class="demo-slider" id="rp-dp" type="range" min="0" max="0.5" step="0.01" value="${st.drop}">
            </div>
          </div>
          <div>
            <label class="demo-label">${T("出钱方把折扣上调到：", "Lender raises the haircut to: ")}<b id="rp-h2-v"></b></label>
            <input class="demo-slider" id="rp-h2" type="range" min="0.005" max="0.6" step="0.005" value="${st.h2}">
          </div>
        </div>
        <div class="stat-row">
          <div class="stat"><div class="k">${T("抵押品价格变化", "Collateral price change")}</div><div class="v neg" id="rp-pc">–</div></div>
          <div class="stat"><div class="k">${T("因价格下跌追加", "Call from price drop")}</div><div class="v" id="rp-c1">–</div></div>
          <div class="stat"><div class="k">${T("再加上折扣上调", "Plus the haircut hike")}</div><div class="v" id="rp-c2">–</div></div>
          <div class="stat"><div class="k">${T("追加总额 ÷ 本金", "Total call ÷ capital")}</div><div class="v" id="rp-ratio">–</div></div>
        </div>
      </div>
      <div class="demo-block">
        <label class="demo-label">${T("再抵押：同一份抵押品被连续使用几次：", "Rehypothecation: times the same collateral is reused: ")}<b id="rp-re-v"></b></label>
        <input class="demo-slider" id="rp-re" type="range" min="1" max="6" step="1" value="${st.reuse}">
        <div class="stages" id="rp-chain"></div>
      </div>
      <div class="demo-log" id="rp-log"></div>
      <p class="demo-tip">${T(
        "先选“10 年期国债”、折扣 2%：本金回报看起来很诱人。然后只把收益率上升拖到 10–20 个基点，或者把折扣上调到 5%——价格几乎没动，追加保证金却可能超过全部本金。这就是阶段 7.4 的基差交易与 2008 年回购挤兑的共同机制。再换成“30 年期国债”：同样的利率冲击，久期更长，追加更多。",
        "Start with the 10-year Treasury at a 2% haircut: the return on capital looks irresistible. Then nudge the yield rise to just 10–20 bp, or raise the haircut to 5% — the price barely moves, yet the margin call can exceed all your capital. That's the shared mechanism of Stage 7.4's basis trade and the 2008 run on repo. Now switch to the 30-year Treasury: same rate shock, longer duration, bigger call."
      )}</p>
    </div>`;

  const $ = (id) => root.querySelector("#" + id);

  function paint() {
    const c = COLL[st.key];
    $("rp-size-v").textContent = "$" + fmtBig(st.size, 0);
    $("rp-h-v").textContent = fmtPct(st.h, 1);
    $("rp-r-v").textContent = fmtPct(st.rate, 2);
    $("rp-d-v").textContent = st.days;
    $("rp-dy-v").textContent = "+" + st.dy;
    $("rp-dp-v").textContent = "−" + fmtPct(st.drop, 0);
    $("rp-h2-v").textContent = fmtPct(st.h2, 1);
    $("rp-re-v").textContent = st.reuse;
    $("rp-dy-wrap").style.display = c.bond ? "" : "none";
    $("rp-dp-wrap").style.display = c.bond ? "none" : "";

    const cash = st.size * (1 - st.h), eq = st.size * st.h;
    const interest = cash * st.rate * st.days / 360;
    const incomeYld = c.bond ? c.cpn : c.yld;
    const carry = st.size * incomeYld - cash * st.rate;
    $("rp-cash").textContent = fmtUsd(cash, 0);
    $("rp-eq").textContent = fmtUsd(eq, 0);
    $("rp-lev").textContent = fmtNum(1 / st.h, 1) + "×";
    $("rp-int").textContent = fmtUsd(interest, 0);
    const roe = carry / eq;
    const cEl = $("rp-carry");
    cEl.textContent = fmtUsd(carry, 0) + " / " + fmtPct(roe, 0);
    cEl.className = "v " + (carry >= 0 ? "pos" : "neg");

    // 压力：债券按新收益率重新定价（票息 = 原收益率，即按面值起步）；股票直接按跌幅
    let pc;
    if (c.bond) pc = bondPrice(100, c.cpn, c.cpn + st.dy / 10000, c.yrs) / 100 - 1;
    else pc = -st.drop;
    const V1 = st.size * (1 + pc);
    const call1 = Math.max(0, cash - V1 * (1 - st.h));
    const h2 = Math.max(st.h2, st.h);
    const call2 = Math.max(0, cash - V1 * (1 - h2)) - call1;
    const total = call1 + call2;
    $("rp-pc").textContent = fmtPct(pc, 2);
    $("rp-c1").textContent = fmtUsd(call1, 0);
    $("rp-c2").textContent = fmtUsd(call2, 0);
    const ratio = total / eq, rEl = $("rp-ratio");
    rEl.textContent = fmtPct(ratio, 0);
    rEl.className = "v " + (ratio >= 1 ? "neg" : ratio >= 0.5 ? "acc" : "pos");

    // 再抵押链：每一环在上一环的基础上再借出 (1 − 折扣)
    let base = st.size, cum = 0;
    const links = [];
    for (let k = 1; k <= st.reuse; k++) { const lent = base * (1 - st.h); cum += lent; links.push({ k, lent, cum }); base = lent; }
    const maxCum = links[links.length - 1].cum;
    $("rp-chain").innerHTML = links.map((l) => `<div class="stage-bar"><span class="lab">${T("第 " + l.k + " 次使用", "Use #" + l.k)}</span><div class="track"><div class="fill" style="width:${(l.cum / maxCum) * 100}%"></div></div><span class="val">$${fmtBig(l.cum, 1)}</span></div>`).join("");

    const lines = [];
    if (c.bond) {
      const risk = bondRisk(100, c.cpn, c.cpn, c.yrs);
      lines.push(`${c.name}${T("：收益率 ", ": yield ")}${fmtPct(c.cpn, 2)}${T("（2026 年 9 月水平或示意），修正久期约 ", " (September 2026 level or illustrative), modified duration about ")}<b>${fmtNum(risk.modified, 1)}</b>${T("；收益率每升 1 个基点，这笔仓位亏约 ", "; each 1 bp rise in yield costs this position about ")}${fmtUsd(risk.dv01 / 100 * st.size, 0)}${T("。", ".")}`);
    } else {
      lines.push(`${c.name}${T("：股票波动大，出钱方通常要求 15% 以上的折扣，所以杠杆天然低得多。", ": stocks are volatile, so lenders usually demand haircuts of 15% or more, which keeps leverage naturally much lower.")}`);
    }
    lines.push(`${T("套息：抵押品每年收入 ", "Carry: the collateral earns ")}${fmtUsd(st.size * incomeYld, 0)}${T("，回购利息每年约 ", " a year and repo interest runs about ")}${fmtUsd(cash * st.rate, 0)}${T("，净 ", ", a net ")}${fmtUsd(carry, 0)}${T("，折合本金年化 ", ", or ")}${fmtPct(roe, 0)}${T("。", " a year on capital.")}`);
    if (total >= eq) lines.push(`<span class="bad">${T("追加保证金 ", "The margin call of ")}${fmtUsd(total, 0)}${T(" 超过了全部本金 ", " exceeds all the capital of ")}${fmtUsd(eq, 0)}${T("：拿不出钱，只能卖掉抵押品——当所有人同时这样做，价格进一步下跌，这就是回购挤兑与去杠杆螺旋。", ": with no cash to post, the borrower must sell the collateral — and when everyone does so at once, prices fall further. That's the run on repo and the deleveraging spiral.")}</span>`);
    else if (total > 0) lines.push(`<span class="warn">${T("需要追加 ", "A call of ")}${fmtUsd(total, 0)}${T("，占本金的 ", " eats ")}${fmtPct(ratio, 0)}${T("。能撑住，但安全垫已经变薄。", " of the capital. Survivable, but the cushion is getting thin.")}</span>`);
    else lines.push(`<span class="ok">${T("没有追加保证金：当前冲击被折扣吸收了。", "No margin call: the haircut absorbs the current shock.")}</span>`);
    lines.push(`${T("再抵押：", "Rehypothecation: ")}$${fmtBig(st.size, 0)}${T(" 的抵押品被连续使用 ", " of collateral reused ")}${st.reuse}${T(" 次，撑起约 ", " times supports about ")}<b>$${fmtBig(maxCum, 1)}</b>${T(" 的融资（", " of financing (")}${fmtNum(maxCum / st.size, 2)}${T(" 倍）。链条上任何一环要求收回抵押品，压力就会沿链传递。", "x). If any link demands its collateral back, the pressure travels down the chain.")}`);
    $("rp-log").innerHTML = lines.map((l) => `<div>${l}</div>`).join("");
  }

  root.querySelectorAll("#rp-coll button").forEach((b) => b.addEventListener("click", () => {
    st.key = b.dataset.k;
    st.h = COLL[st.key].h;
    $("rp-h").value = st.h;
    st.h2 = clamp(Math.max(st.h2, st.h), 0.005, 0.6);
    $("rp-h2").value = st.h2;
    root.querySelectorAll("#rp-coll button").forEach((x) => x.classList.toggle("active", x === b));
    paint();
  }));
  const bind = (id, key) => $(id).addEventListener("input", (e) => { st[key] = +e.target.value; paint(); });
  bind("rp-size", "size"); bind("rp-h", "h"); bind("rp-r", "rate"); bind("rp-d", "days");
  bind("rp-dy", "dy"); bind("rp-dp", "drop"); bind("rp-h2", "h2"); bind("rp-re", "reuse");
  paint();
}
