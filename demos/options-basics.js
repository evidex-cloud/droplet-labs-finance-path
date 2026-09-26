// 交互演示：期权损益图搭建器——选一个经典组合或自己加腿，
// 用布莱克-斯科尔斯按当前波动率与剩余期限给每条腿定价，画出“到期损益”与“今天的理论盈亏”两条线，
// 自动找盈亏平衡点、最大盈亏，并拆出内在价值与时间价值。
import { fmtNum, fmtPct, clamp } from "./_fin.js";
import { lineChart, chartBlock } from "./_chart.js";

// 标准正态累积分布（Abramowitz–Stegun 近似）与布莱克-斯科尔斯（_fin.js 里没有期权公式，这里是本演示专用）
function normCdf(x) {
  const a1 = 0.254829592, a2 = -0.284496736, a3 = 1.421413741, a4 = -1.453152027, a5 = 1.061405429, p = 0.3275911;
  const s = x < 0 ? -1 : 1, z = Math.abs(x) / Math.SQRT2, t = 1 / (1 + p * z);
  const y = 1 - ((((a5 * t + a4) * t + a3) * t + a2) * t + a1) * t * Math.exp(-z * z);
  return 0.5 * (1 + s * y);
}
function bsOption(type, S, K, T, r, vol) {
  if (T <= 0 || vol <= 0) return Math.max(0, type === "call" ? S - K : K - S);
  const sq = vol * Math.sqrt(T);
  const d1 = (Math.log(S / K) + (r + vol * vol / 2) * T) / sq, d2 = d1 - sq;
  return type === "call" ? S * normCdf(d1) - K * Math.exp(-r * T) * normCdf(d2) : K * Math.exp(-r * T) * normCdf(-d2) - S * normCdf(-d1);
}

export default function mount(root, lang) {
  const en = lang === "en";
  const T = (zh, e) => (en ? e : zh);
  const S0 = 100, R = 0.04;

  const presets = {
    lc: { zh: "买看涨", en: "Long call", legs: [["call", 1, 100]] },
    lp: { zh: "买看跌", en: "Long put", legs: [["put", 1, 100]] },
    sc: { zh: "卖看涨", en: "Short call", legs: [["call", -1, 100]] },
    sp: { zh: "卖看跌", en: "Short put", legs: [["put", -1, 100]] },
    pp: { zh: "保护性看跌", en: "Protective put", legs: [["stock", 1, 0], ["put", 1, 90]] },
    cc: { zh: "备兑看涨", en: "Covered call", legs: [["stock", 1, 0], ["call", -1, 110]] },
    st: { zh: "跨式（买波动）", en: "Straddle (long vol)", legs: [["call", 1, 100], ["put", 1, 100]] },
    co: { zh: "领口", en: "Collar", legs: [["stock", 1, 0], ["put", 1, 90], ["call", -1, 115]] },
  };
  let legs = presets.lc.legs.map((l) => [...l]);
  let vol = 0.3, days = 365, active = "lc";

  root.innerHTML = `
    <div class="demo">
      <div class="demo-head">${T("🏒 损益图搭建器：把期权搭成你想要的风险形状", "🏒 Payoff builder: shape risk any way you like with options")}</div>
      <div class="demo-btns" id="ob-presets">
        ${Object.entries(presets).map(([k, p]) => `<button class="demo-btn${k === active ? " active" : ""}" data-p="${k}">${en ? p.en : p.zh}</button>`).join("")}
      </div>
      <div class="demo-grid">
        <div class="demo-block">
          <label class="demo-label">${T("波动率 σ（年化）", "Volatility σ (annualized)")}${en ? ": " : "："}<b id="ob-vol-v"></b></label>
          <input class="demo-slider" id="ob-vol" type="range" min="0.05" max="1.5" step="0.05" value="${vol}">
        </div>
        <div class="demo-block">
          <label class="demo-label">${T("距离到期（天）", "Days to expiry")}${en ? ": " : "："}<b id="ob-days-v"></b></label>
          <input class="demo-slider" id="ob-days" type="range" min="1" max="730" step="1" value="${days}">
        </div>
      </div>
      <div class="demo-block" id="ob-legs"></div>
      <div class="demo-btns">
        <button class="demo-btn" data-add="call,1">+ ${T("买看涨", "Buy call")}</button>
        <button class="demo-btn" data-add="put,1">+ ${T("买看跌", "Buy put")}</button>
        <button class="demo-btn" data-add="call,-1">+ ${T("卖看涨", "Sell call")}</button>
        <button class="demo-btn" data-add="put,-1">+ ${T("卖看跌", "Sell put")}</button>
        <button class="demo-btn" data-add="stock,1">+ ${T("买 1 股", "Buy 1 share")}</button>
      </div>
      <div class="stat-row">
        <div class="stat"><div class="k">${T("净权利金（付出为负）", "Net premium (paid = negative)")}</div><div class="v acc" id="ob-prem">–</div></div>
        <div class="stat"><div class="k">${T("到期最大收益*", "Max gain at expiry*")}</div><div class="v pos" id="ob-max">–</div></div>
        <div class="stat"><div class="k">${T("到期最大亏损*", "Max loss at expiry*")}</div><div class="v neg" id="ob-min">–</div></div>
        <div class="stat"><div class="k">${T("盈亏平衡点", "Breakeven(s)")}</div><div class="v" id="ob-be">–</div></div>
      </div>
      <div class="demo-block" id="ob-chart"></div>
      <div class="demo-log" id="ob-log"></div>
      <p class="demo-meta">${T("标的现价 100，无风险利率 4%，价格为布莱克-斯科尔斯理论值（欧式、无股息）。*最大盈亏在标的 0–250 区间内估算；标“无上限”表示价格越高越多。", "Underlying at 100, risk-free rate 4%, prices are Black–Scholes theoretical values (European, no dividends). *Max gain/loss is scanned over prices 0–250; “unlimited” means it keeps growing with the price.")}</p>
      <p class="demo-tip">${T(
        "先选“跨式”，把波动率从 30% 拖到 90%：两份期权都变贵，你要的“大波动”门槛随之抬高——这就是“波动率是一种价格”。再选“卖看涨”，看到期损益线怎么向右下方无限延伸；最后把到期天数拖到 1，看虚线（今天的理论价值）怎么一点点贴到实线（到期损益）上：那一段差距就是时间价值。",
        "Pick “Straddle” and drag volatility from 30% to 90%: both options get pricier and the move you need to break even grows — volatility has a price. Then pick “Short call” and watch the loss run off to the right without limit. Finally drag days to expiry down to 1 and watch the dashed line (today's theoretical value) collapse onto the solid line (payoff at expiry): the gap between them is time value."
      )}</p>
    </div>`;

  const $ = (id) => root.querySelector("#" + id);
  const legName = (type, q) => {
    if (type === "stock") return T("股票多头", "Long stock");
    const side = q > 0 ? T("买入", "Long") : T("卖出", "Short");
    return side + " " + (type === "call" ? T("看涨", "call") : T("看跌", "put"));
  };
  const premOf = (type, K, Ty) => (type === "stock" ? S0 : bsOption(type, S0, K, Ty, R, vol));
  // 某条腿在价格 S、剩余期限 t 时的盈亏（相对开仓成本）
  const legPnl = (leg, S, t, Ty) => {
    const [type, q, K] = leg;
    const cost = premOf(type, K, Ty);
    const val = type === "stock" ? S : bsOption(type, S, K, t, R, vol);
    return q * (val - cost);
  };

  function renderLegs() {
    $("ob-legs").innerHTML = legs.length
      ? legs.map((l, i) => `
        <div class="demo-row" style="border-bottom:1px solid var(--line);padding-bottom:6px">
          <span style="min-width:110px;font-weight:600;color:${l[1] > 0 ? "var(--green)" : "var(--red)"}">${legName(l[0], l[1])}</span>
          ${l[0] === "stock" ? `<span class="demo-meta" style="flex:1">${T("成本 100", "cost 100")}</span>` :
          `<span style="flex:1;display:flex;align-items:center;gap:8px">K = <b data-kv="${i}">${l[2]}</b><input class="demo-slider" data-k="${i}" type="range" min="50" max="160" step="5" value="${l[2]}" style="flex:1"></span>`}
          <button class="demo-btn" data-del="${i}" style="padding:4px 10px">✕</button>
        </div>`).join("")
      : `<div class="demo-meta">${T("还没有任何头寸——用下面的按钮加一条腿。", "No positions yet — add a leg with the buttons below.")}</div>`;
    root.querySelectorAll("[data-k]").forEach((sl) => sl.addEventListener("input", () => {
      const i = +sl.dataset.k; legs[i][2] = +sl.value;
      root.querySelector(`[data-kv="${i}"]`).textContent = sl.value;
      setActive(null); paint();
    }));
    root.querySelectorAll("[data-del]").forEach((b) => b.addEventListener("click", () => {
      legs.splice(+b.dataset.del, 1); setActive(null); renderLegs(); paint();
    }));
  }

  function setActive(k) {
    active = k;
    root.querySelectorAll("#ob-presets button").forEach((b) => b.classList.toggle("active", b.dataset.p === k));
  }

  function paint() {
    const Ty = days / 365;
    $("ob-vol-v").textContent = fmtPct(vol, 0);
    $("ob-days-v").textContent = days;
    const expiry = (S) => legs.reduce((s, l) => s + legPnl(l, S, 0, Ty), 0);
    const today = (S) => legs.reduce((s, l) => s + legPnl(l, S, Ty, Ty), 0);
    const netPrem = legs.reduce((s, l) => s - l[1] * premOf(l[0], l[2], Ty), 0);
    $("ob-prem").textContent = fmtNum(netPrem, 2);

    // 扫描 0–250 找最大盈亏与盈亏平衡点
    let mx = -Infinity, mn = Infinity, prev = null, bes = [];
    for (let S = 0.01; S <= 250; S += 0.25) {
      const v = expiry(S);
      mx = Math.max(mx, v); mn = Math.min(mn, v);
      if (prev !== null && Math.sign(v) !== Math.sign(prev.v) && Math.abs(v - prev.v) > 1e-9) {
        bes.push(prev.S + (0 - prev.v) * (S - prev.S) / (v - prev.v));
      }
      prev = { S, v };
    }
    const slopeHi = expiry(250) - expiry(240), slopeLo = expiry(10) - expiry(0.01);
    $("ob-max").textContent = legs.length ? (slopeHi > 0.5 ? T("无上限", "unlimited") : fmtNum(mx, 2)) : "–";
    $("ob-min").textContent = legs.length ? (slopeHi < -0.5 ? T("无上限", "unlimited") : fmtNum(mn, 2)) : "–";
    $("ob-be").textContent = bes.length ? bes.slice(0, 3).map((b) => fmtNum(b, 1)).join(" / ") : "–";

    const res = lineChart({
      fns: [{ f: expiry, cls: "line" }, { f: today, cls: "line2" }],
      lo: 40, hi: 170, xlabel: T("标的价格 →", "Underlying price →"), markerX: S0, markerLabel: T("现价 100", "spot 100"), forceZero: true, uid: "ob",
    });
    $("ob-chart").innerHTML = chartBlock(res, [
      ["var(--orange)", T("到期损益", "Payoff at expiry")],
      ["var(--blue)", T(`今天的理论盈亏（还剩 ${days} 天）`, `Theoretical P&L today (${days} days left)`)],
    ]);

    const lines = legs.filter((l) => l[0] !== "stock").map((l) => {
      const p = premOf(l[0], l[2], Ty);
      const intr = Math.max(0, l[0] === "call" ? S0 - l[2] : l[2] - S0);
      const m = intr > 0 ? T("价内", "ITM") : Math.abs(S0 - l[2]) < 2.5 ? T("平价", "ATM") : T("价外", "OTM");
      return `${legName(l[0], l[1])} K=${l[2]}${T("（" + m + "）：价格", " (" + m + "): price")} <b>${fmtNum(p, 2)}</b> = ${T("内在价值", "intrinsic")} ${fmtNum(intr, 2)} + ${T("时间价值", "time value")} <b>${fmtNum(p - intr, 2)}</b>`;
    });
    if (slopeHi < -0.5) lines.push(`<span class="bad">${T("警告：价格越涨你亏得越多，而且没有上限——这是裸卖看涨的风险。", "Warning: the higher the price, the more you lose, with no limit — the risk of a naked short call.")}</span>`);
    if (slopeLo > 0.5 && mn < 0) lines.push(`<span class="warn">${T("标的跌向 0 时亏损最大——卖看跌就是替别人承担暴跌风险。", "Your worst case is the underlying going to zero — selling puts means insuring someone else against a crash.")}</span>`);
    if (legs.length && Math.abs(slopeHi) < 0.5 && Math.abs(slopeLo) < 0.5 && mx > 0 && mn < 0) lines.push(`<span class="ok">${T("两端都是平的：盈亏都被封顶，你买到的是一个“区间”。", "Both ends are flat: gains and losses are capped — you have bought a band.")}</span>`);
    $("ob-log").innerHTML = (lines.length ? lines : [T("股票本身没有时间价值——损益就是一条直线。", "A share has no time value — its payoff is a straight line.")]).map((l) => `<div>${l}</div>`).join("");
  }

  root.querySelectorAll("#ob-presets button").forEach((b) => b.addEventListener("click", () => {
    legs = presets[b.dataset.p].legs.map((l) => [...l]);
    setActive(b.dataset.p); renderLegs(); paint();
  }));
  root.querySelectorAll("[data-add]").forEach((b) => b.addEventListener("click", () => {
    if (legs.length >= 5) return;
    const [type, q] = b.dataset.add.split(",");
    legs.push([type, +q, type === "stock" ? 0 : 100]);
    setActive(null); renderLegs(); paint();
  }));
  $("ob-vol").addEventListener("input", (e) => { vol = clamp(+e.target.value, 0.05, 1.5); paint(); });
  $("ob-days").addEventListener("input", (e) => { days = +e.target.value; paint(); });
  renderLegs();
  paint();
}
