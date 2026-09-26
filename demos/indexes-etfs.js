// 交互演示：指数与 ETF 的管道——①同一篮子股票用四种加权方式编指数，看权重与“一只股票涨跌”对指数的影响；
// ②纳入效应计算器：被动资金需要买多少、相当于几天成交量；③ETF 套利：价格偏离净值时 AP 怎么做、赚多少。
import { fmtPct, fmtNum, fmtBig, clamp } from "./_fin.js";

export default function mount(root, lang) {
  const en = lang === "en";
  const T = (zh, e) => (en ? e : zh);

  const base = () => [
    { name: T("巨硬软件", "MegaSoft"), px: 420, sh: 7.4e9, fl: 0.99 },
    { name: T("芯片公司", "ChipCo"), px: 130, sh: 24e9, fl: 0.96 },
    { name: T("购物平台", "ShopCo"), px: 190, sh: 10.5e9, fl: 0.9 },
    { name: T("创始人控股公司", "FounderCo"), px: 600, sh: 2.5e9, fl: 0.6 },
    { name: T("大银行", "BankCo"), px: 250, sh: 2.8e9, fl: 0.99 },
    { name: T("比特币财库公司", "BTC Treasury Co"), px: 300, sh: 0.28e9, fl: 0.9 },
  ];
  let cos = base();
  const st = { w: "float", pick: 5, move: 0.1, passive: 0.2, cap: 80e9, adv: 4e9, etf: 100.3 };

  const methods = [
    ["price", T("价格加权", "Price-weighted")],
    ["cap", T("市值加权", "Cap-weighted")],
    ["float", T("自由流通市值", "Float-adjusted cap")],
    ["equal", T("等权", "Equal-weighted")],
  ];

  root.innerHTML = `
    <div class="demo">
      <div class="demo-head">${T("📊 指数与 ETF 的管道：规则怎样决定资金流向", "📊 The plumbing of indexes & ETFs: how rules direct money")}</div>
      <div class="demo-block">
        <div class="demo-label">${T("① 同一篮子六只股票，用哪种方式加权？", "① Six stocks, one basket — which weighting?")}</div>
        <div class="demo-seg" id="ie-w">${methods.map(([k, l]) => `<button data-v="${k}" class="${k === st.w ? "on" : ""}">${l}</button>`).join("")}</div>
        <div id="ie-bars" style="margin-top:10px"></div>
        <div class="demo-grid">
          <div>
            <label class="demo-label">${T("让这只股票涨跌", "Move this stock")}${T("：", ": ")}</label>
            <select id="ie-pick" class="demo-btn">${cos.map((c, i) => `<option value="${i}" ${i === st.pick ? "selected" : ""}>${c.name}</option>`).join("")}</select>
            <label class="demo-label">${T("涨跌幅", "Move")}${T("：", ": ")}<b id="ie-mv"></b></label>
            <input class="demo-slider" type="range" min="-0.3" max="0.3" step="0.01" value="${st.move}" id="ie-move" />
          </div>
          <div>
            <div class="demo-btns">
              <button class="demo-btn" id="ie-split">${T("创始人控股公司 4 拆 1", "FounderCo splits 4-for-1")}</button>
              <button class="demo-btn" id="ie-reset">${T("重置", "Reset")}</button>
            </div>
            <div class="demo-out" id="ie-impact"></div>
          </div>
        </div>
      </div>
      <div class="demo-grid">
        <div class="demo-block">
          <div class="demo-label">${T("② 纳入效应计算器", "② Inclusion-effect calculator")}</div>
          <label class="demo-label">${T("被动资金占指数自由流通市值", "Passive share of index float")}${T("：", ": ")}<b id="ie-pv"></b></label>
          <input class="demo-slider" type="range" min="0.05" max="0.5" step="0.01" value="${st.passive}" id="ie-passive" />
          <label class="demo-label">${T("新纳入公司的自由流通市值", "New member's free-float cap")}${T("：", ": ")}<b id="ie-cv"></b></label>
          <input class="demo-slider" type="range" min="10e9" max="500e9" step="5e9" value="${st.cap}" id="ie-cap" />
          <label class="demo-label">${T("它的日均成交额", "Its average daily trading value")}${T("：", ": ")}<b id="ie-av"></b></label>
          <input class="demo-slider" type="range" min="0.5e9" max="20e9" step="0.5e9" value="${st.adv}" id="ie-adv" />
          <div class="stat-row">
            <div class="stat"><div class="k">${T("被动资金需买入", "Passive buying needed")}</div><div class="v acc" id="ie-buy">–</div></div>
            <div class="stat"><div class="k">${T("相当于几天成交量", "Days of total volume")}</div><div class="v" id="ie-days">–</div></div>
          </div>
        </div>
        <div class="demo-block">
          <div class="demo-label">${T("③ ETF 套利：净值 100 美元，交易所价格是？", "③ ETF arbitrage: NAV is $100 — what is the market price?")}</div>
          <label class="demo-label">${T("ETF 价格", "ETF price")}${T("：", ": ")}<b id="ie-ev"></b></label>
          <input class="demo-slider" type="range" min="99" max="101" step="0.05" value="${st.etf}" id="ie-etf" />
          <div class="demo-meta">${T("假设一个创设单位 = 5 万份，AP 的往返交易成本约每份 0.05 美元。", "Assume one creation unit = 50,000 shares and AP round-trip costs of about $0.05 per share.")}</div>
          <div class="demo-out" id="ie-arb"></div>
        </div>
      </div>
      <div class="demo-block"><div class="demo-log" id="ie-log"></div></div>
      <p class="demo-tip">${T(
        "先在“价格加权”下点“4 拆 1”：公司价值一分没变，它在指数里的权重却掉到四分之一。再看“比特币财库公司”：在市值加权下它的权重很小，但纳入时被动资金要买的量，可能是它好几天的全部成交额——这就是指数规则对 DAT 为什么重要。",
        "Under “price-weighted,” click the 4-for-1 split: the company's value is unchanged, yet its index weight drops to a quarter. Then look at the BTC Treasury Co: its cap weight is tiny, but the passive buying on inclusion can equal several days of its entire trading volume — which is why index rules matter so much to DATs."
      )}</p>
    </div>`;

  const q = (s) => root.querySelector(s);
  const weights = (list, w) => {
    const raw = list.map((c) => (w === "price" ? c.px : w === "cap" ? c.px * c.sh : w === "float" ? c.px * c.sh * c.fl : 1));
    const tot = raw.reduce((a, b) => a + b, 0);
    return raw.map((x) => x / tot);
  };

  const paint = () => {
    const W = weights(cos, st.w);
    const mx = Math.max(...W);
    q("#ie-bars").innerHTML = cos.map((c, i) => `<div class="bar2"><span class="lab" style="width:120px">${c.name}</span><div class="track"><div class="fill" style="width:${clamp((W[i] / mx) * 100, 0, 100)}%;background:${i === 5 ? "var(--btc)" : "var(--orange)"}"></div></div><span class="val">${fmtPct(W[i], 1)}</span></div>
      <div class="demo-meta" style="margin:-6px 0 4px 130px">${T("股价", "price")} $${fmtNum(c.px, 0)} · ${T("市值", "cap")} $${fmtBig(c.px * c.sh)} · ${T("自由流通", "float")} ${fmtPct(c.fl, 0)}</div>`).join("");

    q("#ie-mv").textContent = (st.move >= 0 ? "+" : "") + fmtPct(st.move, 0);
    const impacts = methods.map(([k, l]) => [l, weights(cos, k)[st.pick] * st.move]);
    q("#ie-impact").innerHTML = `${cos[st.pick].name} ${(st.move >= 0 ? "+" : "") + fmtPct(st.move, 0)} → ${T("指数变动：", "index move:")}<br>` +
      impacts.map(([l, v]) => `${l}: <b>${(v >= 0 ? "+" : "") + fmtPct(v, 2)}</b>`).join("<br>");

    // 纳入效应
    q("#ie-pv").textContent = fmtPct(st.passive, 0);
    q("#ie-cv").textContent = "$" + fmtBig(st.cap);
    q("#ie-av").textContent = "$" + fmtBig(st.adv);
    const buy = st.cap * st.passive, days = buy / st.adv;
    q("#ie-buy").textContent = "$" + fmtBig(buy);
    const dEl = q("#ie-days"); dEl.textContent = fmtNum(days, 1); dEl.className = "v " + (days > 3 ? "neg" : "");

    // ETF 套利
    q("#ie-ev").textContent = "$" + fmtNum(st.etf, 2);
    const gap = st.etf - 100, cost = 0.05, unit = 50000;
    let arb;
    if (Math.abs(gap) <= cost) arb = `<span class="pill ok">${T("无套利空间", "No arbitrage")}</span> ${T("偏离小于交易成本，AP 不动手——价格就停在净值附近这个“带”里。", "The gap is smaller than trading costs, so APs do nothing — the price sits inside a narrow band around NAV.")}`;
    else if (gap > 0) arb = `<span class="pill ok">${T("创设", "Create")}</span> ${T("买入篮子（100 美元）→ 换新份额 → 以 ", "Buy the basket ($100) → swap for new shares → sell at ")}$${fmtNum(st.etf, 2)}${T(" 卖出。每个创设单位净赚约 ", ". Net profit per creation unit ≈ ")}<b>$${fmtNum((gap - cost) * unit, 0)}</b>${T("。持续卖出把价格压回净值。", ". The selling pushes the price back to NAV.")}`;
    else arb = `<span class="pill bad">${T("赎回", "Redeem")}</span> ${T("以 ", "Buy ETF shares at ")}$${fmtNum(st.etf, 2)}${T(" 买入份额 → 交回发行人换出价值 100 美元的篮子 → 卖掉篮子。每个单位净赚约 ", " → hand them to the issuer for a $100 basket → sell the basket. Net profit per unit ≈ ")}<b>$${fmtNum((-gap - cost) * unit, 0)}</b>${T("。持续买入把价格抬回净值。", ". The buying lifts the price back to NAV.")}`;
    q("#ie-arb").innerHTML = arb;

    const log = [];
    const f = cos[3];
    log.push(`${T("价格加权下，", "Under price weighting, ")}${f.name}${T(" 的权重是 ", " weighs ")}${fmtPct(weights(cos, "price")[3], 1)}${T("；按自由流通市值是 ", "; by float-adjusted cap it weighs ")}${fmtPct(weights(cos, "float")[3], 1)}${T("（它有 40% 股份被创始人锁定）。", " (40% of its shares are locked up by the founder).")}`);
    if (days > 3) log.push(`<span class="warn">${T("被动买盘超过 ", "Passive buying exceeds ")}${fmtNum(days, 1)}${T(" 天的全部成交量：纳入前后价格很可能被推高，指数调整日会出现巨量成交。", " days of total volume: the price is likely pushed up around inclusion, with huge volume on the rebalancing day.")}</span>`);
    else log.push(`<span class="ok">${T("被动买盘不到 3 天成交量：市场比较容易消化。", "Passive buying is under 3 days of volume: the market can absorb it fairly easily.")}</span>`);
    q("#ie-log").innerHTML = log.map((l) => `<div>${l}</div>`).join("");
  };

  root.querySelectorAll("#ie-w button").forEach((b) => b.addEventListener("click", () => {
    st.w = b.dataset.v; root.querySelectorAll("#ie-w button").forEach((x) => x.classList.toggle("on", x === b)); paint();
  }));
  q("#ie-pick").addEventListener("change", (e) => { st.pick = +e.target.value; paint(); });
  q("#ie-move").addEventListener("input", (e) => { st.move = +e.target.value; paint(); });
  q("#ie-passive").addEventListener("input", (e) => { st.passive = +e.target.value; paint(); });
  q("#ie-cap").addEventListener("input", (e) => { st.cap = +e.target.value; paint(); });
  q("#ie-adv").addEventListener("input", (e) => { st.adv = +e.target.value; paint(); });
  q("#ie-etf").addEventListener("input", (e) => { st.etf = +e.target.value; paint(); });
  q("#ie-split").addEventListener("click", () => { const f = cos[3]; f.px /= 4; f.sh *= 4; paint(); });
  q("#ie-reset").addEventListener("click", () => { cos = base(); paint(); });
  paint();
}
