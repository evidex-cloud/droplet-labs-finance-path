// 交互演示：ETF 管道实验室——
// A. 套利阀门：设定比特币价格、份额市价的偏离与授权参与商的成本，看 AP 会创设还是赎回、一篮能赚多少、
//    信托因此买入或卖出多少比特币；切到“封闭式信托（老 GBTC）”模式，阀门消失，偏离无人抹平。
// B. 持有成本：同样 1 万美元、同样的比特币涨跌，比较自托管、交易所托管、现货 ETF、老式高费率信托 N 年后的结果。
import { fv, fmtUsd, fmtPct, fmtNum } from "./_fin.js";

export default function mount(root, lang) {
  const en = lang === "en";
  const T = (zh, e) => (en ? e : zh);
  const COLON = T("：", ": ");
  const BTC_PER_SHARE = 0.0005;
  const BASKET = 40000;

  const st = {
    mode: "etf", btc: 84000, dev: 0.007, apCost: 0.0015,
    years: 10, ret: 0.08, amt: 10000, exch: 0.01, trustFee: 0.015, entryPrem: 0.1, exitPrem: -0.2,
  };

  const slider = (id, label, min, max, step, val) => `
    <div class="demo-block">
      <label class="demo-label">${label}${COLON}<b id="${id}-v"></b></label>
      <input class="demo-slider" id="${id}" type="range" min="${min}" max="${max}" step="${step}" value="${val}">
    </div>`;

  root.innerHTML = `
    <div class="demo">
      <div class="demo-head">${T("🏦 ETF 管道实验室：套利阀门与持有成本", "🏦 ETF plumbing lab: the arbitrage valve and the cost of holding")}</div>
      <div class="demo-label">${T("A. 套利阀门", "A. The arbitrage valve")}</div>
      <div class="demo-row">
        <div class="demo-seg" id="be-mode">
          <button data-m="etf" class="on">${T("现货 ETF（可创设/赎回）", "Spot ETF (creation/redemption)")}</button>
          <button data-m="closed">${T("封闭式信托（老 GBTC）", "Closed-end trust (old GBTC)")}</button>
        </div>
      </div>
      <div class="demo-grid">
        ${slider("be-btc", T("比特币价格", "Bitcoin price"), 20000, 200000, 1000, st.btc)}
        ${slider("be-dev", T("份额市价相对净值的偏离", "Share price vs NAV"), -0.05, 0.05, 0.001, st.dev)}
        ${slider("be-ap", T("AP 一来一回的总成本", "AP round-trip cost"), 0, 0.01, 0.0005, st.apCost)}
      </div>
      <div class="stat-row">
        <div class="stat"><div class="k">${T("每份净值", "NAV per share")}</div><div class="v" id="be-nav">–</div></div>
        <div class="stat"><div class="k">${T("份额市价", "Share price")}</div><div class="v" id="be-mkt">–</div></div>
        <div class="stat"><div class="k">${T("AP 的动作", "AP action")}</div><div class="v acc" id="be-act">–</div></div>
        <div class="stat"><div class="k">${T("每篮（4 万份）净利", "Net profit per 40,000-share basket")}</div><div class="v" id="be-pnl">–</div></div>
      </div>
      <div class="demo-log" id="be-log"></div>
      <div class="demo-label" style="margin-top:14px">${T("B. 同样的比特币，不同的持有方式", "B. Same bitcoin, different wrappers")}</div>
      <div class="demo-grid">
        ${slider("be-years", T("持有年数", "Years held"), 1, 20, 1, st.years)}
        ${slider("be-ret", T("比特币年化涨跌（假设）", "Bitcoin annual return (assumed)"), -0.3, 0.4, 0.01, st.ret)}
        ${slider("be-exch", T("交易所每年出事的概率（示意）", "Annual chance the exchange fails (illustrative)"), 0, 0.05, 0.0025, st.exch)}
        ${slider("be-tfee", T("老式信托年费", "Old-style trust annual fee"), 0.005, 0.025, 0.0025, st.trustFee)}
        ${slider("be-ein", T("老式信托买入时的溢价", "Old trust premium when you buy"), -0.3, 0.5, 0.01, st.entryPrem)}
        ${slider("be-eout", T("老式信托卖出时的溢价/折价", "Old trust premium/discount when you sell"), -0.5, 0.3, 0.01, st.exitPrem)}
      </div>
      <div id="be-bars"></div>
      <div class="demo-log" id="be-log2"></div>
      <p class="demo-tip">${T(
        "A 部分：把偏离拖到 +0.7%，AP 创设并卖出；拖到 −0.7%，AP 买入并赎回——只要偏离大于成本，就一定有人抹平它。切到“封闭式信托”，同样的折价再也没人能套利，这就是 GBTC 在 2022 年一度折价近 50% 的原因。B 部分：先把交易所风险调到 0，比较费率：0.25% 与 1.5% 在 10 年后差多少；再把老式信托的买入溢价设为 +20%、卖出折价设为 −30%，看“结构”能比费率伤害你多得多。",
        "Part A: drag the gap to +0.7% and the AP creates and sells; to −0.7% and it buys and redeems — whenever the gap exceeds costs, someone closes it. Switch to “closed-end trust” and the same discount can no longer be arbitraged, which is why GBTC traded near a 50% discount in 2022. Part B: set exchange risk to 0 and compare fees — how far apart are 0.25% and 1.5% after 10 years? Then give the old trust a +20% premium on the way in and a −30% discount on the way out, and see how structure can hurt you far more than fees."
      )}</p>
    </div>`;

  const $ = (id) => root.querySelector("#" + id);

  function paintA() {
    const nav = BTC_PER_SHARE * st.btc;
    const mkt = nav * (1 + st.dev);
    $("be-btc-v").textContent = fmtUsd(st.btc);
    $("be-dev-v").textContent = (st.dev > 0 ? "+" : "") + fmtPct(st.dev, 1);
    $("be-ap-v").textContent = fmtPct(st.apCost, 2);
    $("be-nav").textContent = fmtUsd(nav, 2);
    $("be-mkt").textContent = fmtUsd(mkt, 2);
    const basketBtc = BASKET * BTC_PER_SHARE;
    const basketNav = basketBtc * st.btc;
    const lines = [];
    let act, pnl = 0;
    if (st.mode === "closed") {
      act = T("无法套利", "No arbitrage");
      lines.push(`<span class="bad">${T("封闭式信托没有赎回通道：份额折价时，没人能买入份额换回比特币，折价可以一直存在甚至扩大；溢价时也只能靠发起人偶尔增发。", "A closed-end trust has no redemption channel: when shares trade at a discount, nobody can buy them and swap them for bitcoin, so the discount can persist or widen; a premium can only be tapped when the sponsor occasionally issues more.")}</span>`);
      lines.push(`${T("你按市价", "At the market price of")} ${fmtUsd(mkt, 2)} ${T("买入，实际拿到的比特币价值是", "you get bitcoin worth")} ${fmtUsd(nav, 2)}${T("——差额", " — a gap of")} ${fmtPct(st.dev, 1)} ${T("完全由你承担。", "that is entirely yours to bear.")}`);
    } else if (Math.abs(st.dev) <= st.apCost) {
      act = T("按兵不动", "Stand pat");
      lines.push(`<span class="warn">${T("偏离没有超过 AP 的成本，套利无利可图，所以这么小的偏离可以存在——这就是 ETF 溢价/折价通常只有零点几个百分点的原因。", "The gap doesn't exceed the AP's costs, so arbitrage doesn't pay and a gap this small can persist — which is why ETF premiums and discounts are usually just a few tenths of a percent.")}</span>`);
    } else if (st.dev > 0) {
      act = T("创设并卖出", "Create & sell");
      pnl = basketNav * (st.dev - st.apCost);
      lines.push(`<span class="ok">${T("溢价：AP 交给信托约", "Premium: the AP delivers about")} ${fmtUsd(basketNav)} ${T("（现金或", "(cash or")} ${fmtNum(basketBtc, 0)} BTC${T("）换来 4 万份新份额，在交易所以", ") for 40,000 new shares and sells them on the exchange at")} ${fmtUsd(mkt, 2)}${T(" 卖出。", ".")}</span>`);
      lines.push(`${T("信托因此买入", "The trust therefore buys")} <b>${fmtNum(basketBtc, 0)} BTC</b>${T("——这就是新闻里的“资金净流入”。份额供给增加，溢价被压回净值。", " — this is the “net inflow” you read about. More shares push the premium back to NAV.")}`);
    } else {
      act = T("买入并赎回", "Buy & redeem");
      pnl = basketNav * (-st.dev - st.apCost);
      lines.push(`<span class="ok">${T("折价：AP 在交易所以", "Discount: the AP buys 40,000 shares on the exchange at")} ${fmtUsd(mkt, 2)}${T(" 买入 4 万份，交还信托，换回价值约", ", hands them to the trust and gets back about")} ${fmtUsd(basketNav)} ${T("的现金或比特币。", "in cash or bitcoin.")}</span>`);
      lines.push(`${T("信托因此卖出", "The trust therefore sells")} <b>${fmtNum(basketBtc, 0)} BTC</b>${T("——“资金净流出”。份额被注销，折价被抬回净值。", " — a “net outflow.” Shares are cancelled and the discount closes.")}`);
    }
    $("be-act").textContent = act;
    $("be-pnl").textContent = fmtUsd(pnl);
    $("be-pnl").className = "v " + (pnl > 0 ? "pos" : "");
    $("be-log").innerHTML = lines.map((l) => `<div>${l}</div>`).join("");
  }

  function paintB() {
    const n = st.years, r = st.ret, A = st.amt;
    $("be-years-v").textContent = n + T(" 年", " yrs");
    $("be-ret-v").textContent = fmtPct(r, 0);
    $("be-exch-v").textContent = fmtPct(st.exch, 2);
    $("be-tfee-v").textContent = fmtPct(st.trustFee, 2);
    $("be-ein-v").textContent = (st.entryPrem > 0 ? "+" : "") + fmtPct(st.entryPrem, 0);
    $("be-eout-v").textContent = (st.exitPrem > 0 ? "+" : "") + fmtPct(st.exitPrem, 0);
    const btcOnly = fv(A, r, n);
    // 自托管：一次性 150 美元硬件钱包，买卖各约 0.5% 价差
    const self = fv(A * (1 - 0.005) - 150, r, n) * (1 - 0.005);
    // 交易所托管：买卖各约 0.5% 价差，每年有 p 的概率全损（期望值）
    const exch = fv(A * (1 - 0.005), r, n) * (1 - 0.005) * Math.pow(1 - st.exch, n);
    // 现货 ETF：0.25% 年费，佣金与价差约 0.05%
    const etf = fv(A * (1 - 0.0005), r, n) * Math.pow(1 - 0.0025, n) * (1 - 0.0005);
    // 老式封闭式信托：年费 + 买入溢价 + 卖出折价
    const trust = fv(A / (1 + st.entryPrem), r, n) * Math.pow(1 - st.trustFee, n) * (1 + st.exitPrem);
    const rows = [
      [T("直接持有、零成本（基准）", "Direct, zero cost (benchmark)"), btcOnly, "var(--muted)"],
      [T("自托管（硬件钱包）", "Self-custody (hardware wallet)"), self, "var(--btc)"],
      [T("现货 ETF（0.25%/年）", "Spot ETF (0.25%/yr)"), etf, "var(--orange)"],
      [T("交易所托管（期望值）", "Exchange custody (expected value)"), exch, "var(--blue)"],
      [T("老式封闭式信托", "Old closed-end trust"), trust, "var(--red)"],
    ];
    const mx = Math.max(...rows.map((x) => x[1]), 1);
    $("be-bars").innerHTML = rows.map(([lab, v, c]) => `<div class="bar2"><span class="lab">${lab}</span><div class="track"><div class="fill" style="width:${Math.max(0.5, (Math.max(0, v) / mx) * 100).toFixed(1)}%;background:${c}"></div></div><span class="val">${fmtUsd(v)}</span></div>`).join("");
    const lines = [];
    lines.push(`${T("起始", "Start")} ${fmtUsd(A)}${T("，比特币每年", ", bitcoin at")} ${fmtPct(r, 0)}${T("、持有", " a year for")} ${n} ${T("年。ETF 相对零成本基准少了", "years. The ETF trails the zero-cost benchmark by")} <b>${fmtPct(1 - etf / btcOnly, 1)}</b>${T("，老式信托少了", "; the old trust trails by")} <b>${fmtPct(1 - trust / btcOnly, 1)}</b>${T("。", ".")}`);
    if (st.exch > 0) lines.push(en
      ? `With an annual failure chance of ${fmtPct(st.exch, 2)}, exchange custody has about a <b>${fmtPct(1 - Math.pow(1 - st.exch, n), 0)}</b> chance of at least one failure over ${n} years — the lesson Mt. Gox and FTX taught the market.`
      : `交易所托管按每年 ${fmtPct(st.exch, 2)} 出事的概率算，${n} 年里至少出一次事的概率约 <b>${fmtPct(1 - Math.pow(1 - st.exch, n), 0)}</b>——这是 Mt. Gox 与 FTX 教给市场的一课。`);
    lines.push(`<span class="warn">${T("这些费率与概率都是示意值，只用来比较结构，不构成投资建议。", "These fees and probabilities are illustrative, for comparing structures only — not investment advice.")}</span>`);
    $("be-log2").innerHTML = lines.map((l) => `<div>${l}</div>`).join("");
  }

  const bind = (id, key, fn) => $(id).addEventListener("input", (e) => { st[key] = +e.target.value; fn(); });
  bind("be-btc", "btc", paintA); bind("be-dev", "dev", paintA); bind("be-ap", "apCost", paintA);
  bind("be-years", "years", paintB); bind("be-ret", "ret", paintB); bind("be-exch", "exch", paintB);
  bind("be-tfee", "trustFee", paintB); bind("be-ein", "entryPrem", paintB); bind("be-eout", "exitPrem", paintB);
  root.querySelectorAll("#be-mode button").forEach((b) => b.addEventListener("click", () => {
    root.querySelectorAll("#be-mode button").forEach((x) => x.classList.remove("on"));
    b.classList.add("on"); st.mode = b.dataset.m; paintA();
  }));
  paintA(); paintB();
}
