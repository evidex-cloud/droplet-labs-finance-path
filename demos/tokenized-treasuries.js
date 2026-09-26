// 交互演示：代币化国债的三个沙盘——
// ① 停泊资金：稳定币（持有人收益 0，利息归发行人）vs 代币化国债基金（国债收益 − 费用，按日复利 fv）；
// ② 生息抵押品：保证金放稳定币 vs 放代币化国债（折扣 haircut、容量、利率冲击对净值的影响 bondRisk/priceChangeApprox）；
// ③ 周末挤兑：份额 24/7 可卖、国库券周一才能卖——超出即时赎回额度的部分只能卖进二级池子（ammSwap），看折价多深。
import { fv, bondRisk, priceChangeApprox, ammSwap, fmtUsd, fmtPct, fmtBig, fmtNum } from "./_fin.js";
import { lineChart, chartBlock } from "./_chart.js";

export default function mount(root, lang) {
  const en = lang === "en";
  const T = (zh, e) => (en ? e : zh);
  let mode = "park";
  const p = { amt: 10e6, y: 0.0424, fee: 0.0015, days: 365 };
  const c = { cap: 50e6, margin: 20e6, hc: 0.02, shock: 100 };
  const r = { aum: 2e9, exit: 0.08, facility: 120e6, depth: 600e6 };

  root.innerHTML = `
    <div class="demo">
      <div class="demo-head">${T("🏛️ 代币化国债沙盘：生息、抵押、挤兑", "🏛️ Tokenized Treasury sandbox: yield, collateral, runs")}</div>
      <div class="demo-seg" id="tt-mode">
        <button data-m="park" class="on">${T("① 链上停泊资金", "① Parking cash on-chain")}</button>
        <button data-m="coll">${T("② 会生息的抵押品", "② Collateral that earns")}</button>
        <button data-m="run">${T("③ 周末挤兑", "③ A weekend rush")}</button>
      </div>

      <div id="tt-park">
        <div class="demo-grid">
          <div class="demo-block">
            <label class="demo-label">${T("金额", "Amount")}${T("：", ": ")}<b id="tt-amt-v"></b></label>
            <input class="demo-slider" id="tt-amt" type="range" min="100000" max="100000000" step="100000" value="${p.amt}">
            <label class="demo-label">${T("短期国债收益率", "Short-term T-bill yield")}${T("：", ": ")}<b id="tt-y-v"></b></label>
            <input class="demo-slider" id="tt-y" type="range" min="0" max="0.08" step="0.0005" value="${p.y}">
          </div>
          <div class="demo-block">
            <label class="demo-label">${T("基金年费率", "Fund annual fee")}${T("：", ": ")}<b id="tt-fee-v"></b></label>
            <input class="demo-slider" id="tt-fee" type="range" min="0" max="0.01" step="0.0005" value="${p.fee}">
            <label class="demo-label">${T("持有天数", "Days held")}${T("：", ": ")}<b id="tt-d-v"></b></label>
            <input class="demo-slider" id="tt-d" type="range" min="30" max="1095" step="5" value="${p.days}">
          </div>
        </div>
        <div class="stat-row">
          <div class="stat"><div class="k">${T("代币化国债基金：累计利息", "Tokenized fund: interest earned")}</div><div class="v pos" id="tt-i1">–</div></div>
          <div class="stat"><div class="k">${T("稳定币：你拿到的利息", "Stablecoin: interest you earn")}</div><div class="v neg" id="tt-i0">–</div></div>
          <div class="stat"><div class="k">${T("稳定币发行人用你的钱赚到的（约）", "What the issuer earns on your coins (approx.)")}</div><div class="v acc" id="tt-iss">–</div></div>
        </div>
        <div id="tt-chart"></div>
        <div class="demo-log" id="tt-log1"></div>
      </div>

      <div id="tt-coll" style="display:none">
        <div class="demo-grid">
          <div class="demo-block">
            <label class="demo-label">${T("总资金", "Total capital")}${T("：", ": ")}<b id="tt-cap-v"></b></label>
            <input class="demo-slider" id="tt-cap" type="range" min="5000000" max="200000000" step="1000000" value="${c.cap}">
            <label class="demo-label">${T("交易所要求的保证金", "Margin required by the exchange")}${T("：", ": ")}<b id="tt-m-v"></b></label>
            <input class="demo-slider" id="tt-m" type="range" min="1000000" max="200000000" step="1000000" value="${c.margin}">
          </div>
          <div class="demo-block">
            <label class="demo-label">${T("交易所对代币化国债的折扣（haircut）", "Exchange haircut on tokenized Treasuries")}${T("：", ": ")}<b id="tt-hc-v"></b></label>
            <input class="demo-slider" id="tt-hc" type="range" min="0" max="0.2" step="0.005" value="${c.hc}">
            <label class="demo-label">${T("利率突然上升（基点）", "Sudden rise in yields (bp)")}${T("：", ": ")}<b id="tt-sh-v"></b></label>
            <input class="demo-slider" id="tt-sh" type="range" min="0" max="500" step="25" value="${c.shock}">
          </div>
        </div>
        <div class="cmp">
          <div class="cmp-cell cold"><h5>${T("保证金放稳定币", "Post stablecoins as margin")}</h5><div id="tt-a"></div></div>
          <div class="cmp-cell hl"><h5>${T("保证金放代币化国债", "Post tokenized Treasuries")}</h5><div id="tt-b"></div></div>
        </div>
        <div class="demo-log" id="tt-log2"></div>
      </div>

      <div id="tt-run" style="display:none">
        <div class="demo-grid">
          <div class="demo-block">
            <label class="demo-label">${T("基金规模", "Fund size")}${T("：", ": ")}<b id="tt-aum-v"></b></label>
            <input class="demo-slider" id="tt-aum" type="range" min="200000000" max="5000000000" step="100000000" value="${r.aum}">
            <label class="demo-label">${T("周末想离场的份额比例", "Share of holders who want out this weekend")}${T("：", ": ")}<b id="tt-ex-v"></b></label>
            <input class="demo-slider" id="tt-ex" type="range" min="0" max="0.6" step="0.01" value="${r.exit}">
          </div>
          <div class="demo-block">
            <label class="demo-label">${T("周末即时赎回额度（第三方稳定币通道）", "Weekend instant-redemption capacity (third-party stablecoin facility)")}${T("：", ": ")}<b id="tt-fac-v"></b></label>
            <input class="demo-slider" id="tt-fac" type="range" min="0" max="1000000000" step="10000000" value="${r.facility}">
            <label class="demo-label">${T("二级市场池子深度（每边）", "Secondary pool depth (each side)")}${T("：", ": ")}<b id="tt-dep-v"></b></label>
            <input class="demo-slider" id="tt-dep" type="range" min="10000000" max="2000000000" step="10000000" value="${r.depth}">
          </div>
        </div>
        <div class="stat-row">
          <div class="stat"><div class="k">${T("想离场的金额", "Wanting out")}</div><div class="v" id="tt-want">–</div></div>
          <div class="stat"><div class="k">${T("按净值即时兑付", "Paid at NAV instantly")}</div><div class="v pos" id="tt-paid">–</div></div>
          <div class="stat"><div class="k">${T("只能卖进池子", "Forced into the pool")}</div><div class="v neg" id="tt-pool">–</div></div>
          <div class="stat"><div class="k">${T("池子里的平均成交价（净值 = 1.00）", "Average pool price (NAV = 1.00)")}</div><div class="v acc" id="tt-px">–</div></div>
        </div>
        <div class="demo-log" id="tt-log3"></div>
      </div>

      <p class="demo-tip">${T(
        "①里把收益率拖到 0 看看：代币化国债的全部吸引力都来自“时间的价格”。②里注意差额恰好约等于“保证金 × 净收益率”——抵押品不再是死钱。③里把即时赎回额度调小、离场比例调大：资产一分没少，代币却可能在周末打折，这就是流动性错配。",
        "In ①, drag the yield to 0: all of a tokenized Treasury's appeal comes from the price of time. In ②, notice the gap is roughly margin × net yield, so collateral stops being dead money. In ③, shrink the instant-redemption capacity and raise the exit share: not a dollar of assets is lost, yet the token can trade at a discount over the weekend. That is the liquidity mismatch."
      )}</p>
    </div>`;

  const $ = (s) => root.querySelector(s);

  const paintPark = () => {
    const net = Math.max(0, p.y - p.fee), t = p.days / 365;
    $("#tt-amt-v").textContent = fmtUsd(p.amt);
    $("#tt-y-v").textContent = fmtPct(p.y);
    $("#tt-fee-v").textContent = fmtPct(p.fee);
    $("#tt-d-v").textContent = p.days;
    const i1 = fv(p.amt, net, t, 365) - p.amt;
    const iss = fv(p.amt, p.y, t, 365) - p.amt;
    $("#tt-i1").textContent = fmtUsd(i1);
    $("#tt-i0").textContent = fmtUsd(0);
    $("#tt-iss").textContent = fmtUsd(iss);
    const res = lineChart({
      fns: [
        { f: (d) => (fv(p.amt, net, d / 365, 365) - p.amt) / 1e3, cls: "line" },
        { f: () => 0, cls: "line3" },
        { f: (d) => (fv(p.amt, p.y, d / 365, 365) - p.amt) / 1e3, cls: "line2" },
      ],
      lo: 0, hi: p.days, xlabel: T("持有天数（纵轴：千美元）", "Days held (y-axis: $ thousands)"), forceZero: true, uid: "tt",
    });
    $("#tt-chart").innerHTML = chartBlock(res, [
      ["var(--orange)", T("代币化国债基金（扣费后）", "Tokenized fund (after fees)")],
      ["var(--red)", T("稳定币持有人", "Stablecoin holder")],
      ["var(--blue)", T("发行人从你的币上赚到的", "Issuer's earnings on your coins")],
    ]);
    const lines = [
      `${T("每天的净利息约", "Net interest per day is about")} <b>${fmtUsd((p.amt * net) / 365)}</b>${T("；一年后差距约", "; after a year the gap is about")} <b>${fmtUsd(fv(p.amt, net, 1, 365) - p.amt)}</b>${T("。", ".")}`,
      `${T("费率吃掉的部分：", "Fees take: ")}<b>${fmtUsd(iss - i1)}</b>${T("（这段时间内）。", " over this period.")}`,
    ];
    if (p.y < 0.005) lines.push(`<span class="warn">${T("利率接近零：代币化与否几乎没有差别——这就是 2020–2021 年没人急着把国债搬上链的原因。", "Near-zero rates: tokenizing makes almost no difference, which is why nobody rushed to put Treasuries on-chain in 2020–21.")}</span>`);
    $("#tt-log1").innerHTML = lines.map((l) => `<div>${l}</div>`).join("");
  };

  const paintColl = () => {
    const net = Math.max(0, p.y - p.fee);
    $("#tt-cap-v").textContent = fmtUsd(c.cap);
    $("#tt-m-v").textContent = fmtUsd(c.margin);
    $("#tt-hc-v").textContent = fmtPct(c.hc, 1);
    $("#tt-sh-v").textContent = "+" + c.shock + " bp";
    const tokensNeeded = c.margin / (1 - c.hc);
    const capacity = c.cap * (1 - c.hc);
    const fitsA = c.margin <= c.cap, fitsB = tokensNeeded <= c.cap;
    const incA = fitsA ? (c.cap - c.margin) * net : NaN;
    const incB = fitsB ? c.cap * net : NaN;
    // 3 个月期国库券的利率风险（季度计息的 0.25 年零息债）
    const risk = bondRisk(100, 0, p.y, 0.25, 4);
    const dP = priceChangeApprox(risk.modified, risk.convexity, c.shock / 10000);
    $("#tt-a").innerHTML = `
      <div class="demo-meta">${T("放入", "Posted")}${T("：", ": ")}<b>${fmtUsd(c.margin)}</b> ${T("稳定币", "of stablecoins")}</div>
      <div class="demo-meta">${T("生息部分", "Earning part")}${T("：", ": ")}${fitsA ? fmtUsd(c.cap - c.margin) : "–"}</div>
      <div class="stat"><div class="k">${T("每年利息", "Interest per year")}</div><div class="v">${fitsA ? fmtUsd(incA) : T("资金不够", "Not enough capital")}</div></div>`;
    $("#tt-b").innerHTML = `
      <div class="demo-meta">${T("需放入代币", "Tokens to post")}${T("：", ": ")}<b>${fmtUsd(tokensNeeded)}</b>${T("（保证金 ÷ (1 − 折扣)）", " (margin ÷ (1 − haircut))")}</div>
      <div class="demo-meta">${T("最大可支持保证金", "Maximum margin supported")}${T("：", ": ")}${fmtUsd(capacity)}</div>
      <div class="stat"><div class="k">${T("每年利息（保证金本身也生息）", "Interest per year (margin keeps earning)")}</div><div class="v pos">${fitsB ? fmtUsd(incB) : T("资金不够", "Not enough capital")}</div></div>`;
    const lines = [];
    if (fitsA && fitsB) lines.push(`${T("差额", "Difference")} = <b>${fmtUsd(incB - incA)}</b> ${T("/年 ≈ 保证金", "/yr ≈ margin")} ${fmtUsd(c.margin)} × ${T("净收益率", "net yield")} ${fmtPct(net)}${T("。", ".")}`);
    else lines.push(`<span class="bad">${T("资金不足以覆盖所需的保证金（或折扣后的代币）。折扣越大，同样的资金能支持的保证金越少。", "Capital cannot cover the margin (or the haircut-adjusted tokens). The bigger the haircut, the less margin the same capital can support.")}</span>`);
    lines.push(`${T("利率冲击", "Rate shock")} +${c.shock} bp ${T("→ 3 个月期国库券价格变化约", "→ 3-month bill price change of about")} <b>${fmtPct(dP, 3)}</b>${T("（修正久期", " (modified duration ")}${fmtNum(risk.modified, 3)}${T("）。", ").")}`);
    lines.push(Math.abs(dP) < c.hc
      ? `<span class="ok">${T("价格变动小于折扣：交易所留的缓冲足以吸收这次利率冲击。", "The price move is smaller than the haircut: the exchange's cushion absorbs this rate shock.")}</span>`
      : `<span class="warn">${T("价格变动超过了折扣：接受方会要求补充抵押品。现实中折扣还要覆盖赎回时间和合约风险。", "The price move exceeds the haircut, so the exchange would ask for more collateral. Real haircuts also cover redemption time and contract risk.")}</span>`);
    $("#tt-log2").innerHTML = lines.map((l) => `<div>${l}</div>`).join("");
  };

  const paintRun = () => {
    $("#tt-aum-v").textContent = "$" + fmtBig(r.aum);
    $("#tt-ex-v").textContent = fmtPct(r.exit, 0);
    $("#tt-fac-v").textContent = "$" + fmtBig(r.facility);
    $("#tt-dep-v").textContent = "$" + fmtBig(r.depth);
    const want = r.aum * r.exit;
    const paid = Math.min(want, r.facility);
    const rest = want - paid;
    // 池子：x = 代币（按净值 1 美元计），y = 稳定币；卖入 rest 枚代币
    let px = 1, out = 0;
    if (rest > 0) { const s = ammSwap(r.depth, r.depth, rest, 0.0005); out = s.out; px = s.execPrice; }
    $("#tt-want").textContent = "$" + fmtBig(want);
    $("#tt-paid").textContent = "$" + fmtBig(paid);
    $("#tt-pool").textContent = "$" + fmtBig(rest);
    $("#tt-px").textContent = fmtNum(px, 3);
    const loss = rest - out;
    const lines = [];
    if (rest <= 0) lines.push(`<span class="ok">${T("即时赎回额度够用：所有人按净值离场，周一基金再从容卖出国库券补回额度。", "The instant-redemption capacity is enough: everyone leaves at NAV, and on Monday the fund sells T-bills to refill it.")}</span>`);
    else {
      lines.push(`${T("超出额度的", "The")} ${"$" + fmtBig(rest)} ${T("只能在周末卖进池子，平均每 1 美元净值只换到", "beyond capacity must be sold into the pool over the weekend, fetching on average")} <b>${fmtNum(px, 3)}</b>${T(" 美元，折价损失约", " per $1 of NAV, a discount loss of about")} <b>${"$" + fmtBig(loss)}</b>${T("。", ".")}`);
      lines.push(`<span class="demo-meta">${T("池子按恒定乘积 x·y=k 计算（阶段 13.3），会夸大折价；专为稳定资产设计的池子曲线更平，但额度一旦耗尽，结论相同。", "The pool uses constant-product x·y=k pricing (Stage 13.3), which exaggerates the discount; pools designed for stable assets have flatter curves, but once their depth is used up the conclusion is the same.")}</span>`);
      lines.push(`<span class="${px < 0.97 ? "bad" : "warn"}">${T("基金的资产一分没少——周一卖出国库券后，净值仍是 1.00。损失全部落在“等不及周一”的人身上，买便宜货的套利者赚走了这部分。", "The fund lost nothing. After Monday's T-bill sales NAV is still 1.00. The whole loss falls on those who could not wait for Monday, and the arbitrageurs who bought cheap collect it.")}</span>`);
    }
    $("#tt-log3").innerHTML = lines.map((l) => `<div>${l}</div>`).join("");
  };

  const bind = (id, obj, key, fn) => $(id).addEventListener("input", (e) => { obj[key] = +e.target.value; fn(); });
  bind("#tt-amt", p, "amt", paintPark); bind("#tt-y", p, "y", () => { paintPark(); paintColl(); }); bind("#tt-fee", p, "fee", () => { paintPark(); paintColl(); }); bind("#tt-d", p, "days", paintPark);
  bind("#tt-cap", c, "cap", paintColl); bind("#tt-m", c, "margin", paintColl); bind("#tt-hc", c, "hc", paintColl); bind("#tt-sh", c, "shock", paintColl);
  bind("#tt-aum", r, "aum", paintRun); bind("#tt-ex", r, "exit", paintRun); bind("#tt-fac", r, "facility", paintRun); bind("#tt-dep", r, "depth", paintRun);
  root.querySelectorAll("#tt-mode button").forEach((b) => b.addEventListener("click", () => {
    mode = b.dataset.m;
    root.querySelectorAll("#tt-mode button").forEach((x) => x.classList.toggle("on", x === b));
    $("#tt-park").style.display = mode === "park" ? "" : "none";
    $("#tt-coll").style.display = mode === "coll" ? "" : "none";
    $("#tt-run").style.display = mode === "run" ? "" : "none";
  }));
  paintPark(); paintColl(); paintRun();
}
