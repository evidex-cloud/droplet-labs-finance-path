// 交互演示：Strategy 优先股家族浏览器——选一只系列，看它的条款卡、在资本结构里的位置、
// 在不同比特币价格下的 BTC 评级与地板价（可切换“Strategy 口径：先用美元资产抵债”与“不抵减”），
// 次级优先股的内部顺序（未经核实）可切换“同级”或“简报顺序 STRE→STRK→STRD”；再用价格滑块算当前收益率。
// 数据：2026-08-23 投资者简报（FWP）；次级系列名义为近似值，合计与 149.66 亿美元一致。
import { btcRating, btcFloorPrice, fmtPct, fmtNum, fmtUsd } from "./_fin.js";

export default function mount(root, lang) {
  const en = lang === "en";
  const T = (zh, e) => (en ? e : zh);

  const BTC = 840447, P0 = 77004, DEBT = 6.714, USD = 6.69; // 十亿美元（Strategy 桥接表口径）
  const S = {
    STRF: { n: 1.284, rate: 0.10, rank: 1, cum: true, freq: T("季度", "Quarterly"), cur: "$", conv: T("无", "None"), board: T("有", "Yes"), extra: T("漏付股息按“股息率 + 1 个百分点”复利，逐期递增，最高 18%", "Missed dividends compound at rate + 1 point, stepping up each period, capped at 18%") },
    STRC: { n: 9.972, rate: 0.12, rank: 2, cum: true, freq: T("每月两次（2026-06-30 起）", "Semi-monthly (from 2026-06-30)"), cur: "$", conv: T("无", "None"), board: T("无", "No"), extra: T("利率每月可调；2026-07-01 起 12.00%；公司可随时以 101 美元赎回", "Rate adjustable monthly; 12.00% since 2026-07-01; callable any time at $101") },
    STRE: { n: 0.90, rate: 0.10, rank: 3, cum: true, freq: T("季度", "Quarterly"), cur: "€", conv: T("无", "None"), board: T("无", "No"), extra: T("欧元计价、名义 100 欧元、卢森堡上市；名义约 7.75 亿欧元", "Euro-denominated, €100 stated amount, Luxembourg listing; about €775M notional") },
    STRK: { n: 1.40, rate: 0.08, rank: 4, cum: true, freq: T("季度", "Quarterly"), cur: "$", conv: T("每股转 0.1 股 MSTR（隐含 1,000 美元/股）", "0.1 MSTR share per share (implied $1,000/share)"), board: T("有", "Yes"), extra: T("股息可用现金、MSTR 股票或组合支付", "Dividends payable in cash, MSTR stock or a mix") },
    STRD: { n: 1.41, rate: 0.10, rank: 5, cum: false, freq: T("季度", "Quarterly"), cur: "$", conv: T("无", "None"), board: T("无", "No"), extra: T("非累积：未宣派的股息永久失去", "Non-cumulative: undeclared dividends are lost for good") },
  };
  const ORDER = ["STRF", "STRC", "STRE", "STRK", "STRD"];
  const st = { pick: "STRC", method: "net", junior: "pari", btcP: P0, px: 100, mstr: 120 };

  root.innerHTML = `
    <div class="demo">
      <div class="demo-head">${T("🛫 Strategy 优先股家族：选一只，看它坐在哪一层", "🛫 Strategy's preferred family: pick one and see which floor it sits on")}</div>
      <div class="demo-block">
        <label class="demo-label">${T("选择系列", "Choose a series")}</label>
        <div class="demo-seg" id="sp-pick">${ORDER.map((k) => `<button data-k="${k}" class="${k === st.pick ? "on" : ""}">${k}</button>`).join("")}</div>
      </div>
      <div class="demo-grid">
        <div class="demo-block">
          <label class="demo-label">${T("BTC 评级口径", "BTC Rating method")}</label>
          <div class="demo-seg" id="sp-method">
            <button data-m="net" class="on">${T("Strategy 口径（美元资产先抵债）", "Strategy's (USD assets net debt)")}</button>
            <button data-m="gross">${T("不抵减（更保守）", "Gross (more conservative)")}</button>
          </div>
        </div>
        <div class="demo-block">
          <label class="demo-label">${T("次级优先股内部顺序（未经核实）", "Order among junior preferreds (unverified)")}</label>
          <div class="demo-seg" id="sp-jr">
            <button data-j="pari" class="on">${T("三只视为同级", "Treat all three as equal")}</button>
            <button data-j="deck">${T("按简报顺序 STRE→STRK→STRD", "Deck order STRE→STRK→STRD")}</button>
          </div>
        </div>
      </div>
      <div class="demo-grid">
        <div class="demo-block">
          <label class="demo-label">${T("比特币价格", "Bitcoin price")}${T("：", ": ")}<b id="sp-btc-v"></b></label>
          <input class="demo-slider" id="sp-btc" type="range" min="8000" max="150000" step="1000" value="${Math.round(P0 / 1000) * 1000}" />
          <div class="demo-btns"><button class="demo-btn" id="sp-reset">${T("回到 2026-08-23（77,004 美元）", "Back to 2026-08-23 ($77,004)")}</button></div>
        </div>
        <div class="demo-block">
          <label class="demo-label">${T("该优先股的市场价格（名义 100）", "Market price of this preferred (stated 100)")}${T("：", ": ")}<b id="sp-px-v"></b></label>
          <input class="demo-slider" id="sp-px" type="range" min="50" max="115" step="0.5" value="${st.px}" />
          <label class="demo-label">${T("MSTR 股价（只影响 STRK 的转股价值）", "MSTR price (affects only STRK's conversion value)")}${T("：", ": ")}<b id="sp-mstr-v"></b></label>
          <input class="demo-slider" id="sp-mstr" type="range" min="50" max="1500" step="10" value="${st.mstr}" />
        </div>
      </div>
      <div class="cmp" id="sp-card"></div>
      <div class="demo-block"><div class="demo-label">${T("各层 BTC 评级（条形长度按 10 倍封顶）", "BTC Rating by layer (bars capped at 10x)")}</div><div class="stages" id="sp-stack"></div></div>
      <div class="stat-row" id="sp-stats"></div>
      <div class="demo-block"><div class="demo-log" id="sp-log"></div></div>
      <p class="demo-tip">${T(
        "选 STRC，把比特币拖到 13,000 美元附近：按 Strategy 口径，它的评级跌到 1 倍左右——这就是公司公布的约 13,400 美元“地板价”。再切到“不抵减”：地板价跳到 2 万美元以上。最后选 STRD，在两种次级顺序之间切换：未经核实的那一行字，会改变它的地板价。",
        "Pick STRC and drag bitcoin to around $13,000: on Strategy's method its rating falls to about 1x, the roughly $13,400 “floor price” the company published. Switch to “gross” and the floor jumps above $20,000. Finally pick STRD and flip between the two junior orderings: that one unverified line of text moves its floor price."
      )}</p>
    </div>`;

  const q = (s) => root.querySelector(s);

  // 各层累计债权（十亿美元），按清偿顺序
  const layers = () => {
    const out = [{ k: "DEBT", label: T("债务", "Debt"), cum: DEBT }];
    let c = DEBT + S.STRF.n; out.push({ k: "STRF", label: "STRF", cum: c });
    c += S.STRC.n; out.push({ k: "STRC", label: "STRC", cum: c });
    if (st.junior === "pari") {
      const all = c + S.STRE.n + S.STRK.n + S.STRD.n;
      ["STRE", "STRK", "STRD"].forEach((k) => out.push({ k, label: k, cum: all }));
    } else {
      ["STRE", "STRK", "STRD"].forEach((k) => { c += S[k].n; out.push({ k, label: k, cum: c }); });
    }
    return out;
  };

  const paint = () => {
    const reserve = BTC * st.btcP / 1e9;
    const offset = st.method === "net" ? USD : 0;
    q("#sp-btc-v").textContent = fmtUsd(st.btcP, 0);
    q("#sp-px-v").textContent = (S[st.pick].cur === "€" ? "€" : "$") + fmtNum(st.px, 2);
    q("#sp-mstr-v").textContent = fmtUsd(st.mstr, 0);

    const L = layers().map((l) => {
      const denom = l.cum - offset;
      const rating = denom > 0 ? btcRating(reserve, denom) : Infinity;
      const floor = denom > 0 ? denom * 1e9 / BTC : 0;
      return { ...l, rating, floor };
    });
    const sel = L.find((l) => l.k === st.pick), s = S[st.pick];
    const fmtR = (r) => (!isFinite(r) || r > 100 ? T("> 100 倍", "> 100x") : fmtNum(r, 2) + "x");

    q("#sp-stack").innerHTML = L.map((l) => {
      const w = Math.min(10, isFinite(l.rating) ? l.rating : 10) / 10 * 100;
      const hot = l.k === st.pick;
      const color = !isFinite(l.rating) || l.rating >= 2 ? "var(--green)" : l.rating >= 1 ? "var(--btc)" : "var(--red)";
      return `<div class="stage-bar"><span class="lab" style="${hot ? "color:var(--orange-ink);font-weight:700" : ""}">${l.label}</span><div class="track"><div class="fill" style="width:${w}%;background:${color};${hot ? "outline:2px solid var(--orange-ink);outline-offset:-2px" : ""}"></div></div><span class="val">${fmtR(l.rating)}</span></div>`;
    }).join("") + `<div class="stage-bar"><span class="lab">${T("普通股", "Common")}</span><div class="track"><div class="fill ghost" style="width:100%"></div></div><span class="val">${T("剩余", "residual")}</span></div>`;

    const annualDiv = 100 * s.rate;
    const cy = annualDiv / st.px;
    const perPay = st.pick === "STRC" ? annualDiv / 24 : annualDiv / 4;
    const obligM = s.n * s.rate * 1000;
    q("#sp-card").innerHTML = `
      <div class="cmp-cell hl"><h5>${st.pick} · ${T("条款卡", "term card")}</h5>
        <div class="demo-meta">${T("股息率", "Dividend rate")} <b>${fmtPct(s.rate, 2)}</b> · ${s.cum ? T("累积", "cumulative") : `<span style="color:var(--red)">${T("非累积", "non-cumulative")}</span>`} · ${s.freq}</div>
        <div class="demo-meta">${T("转换", "Conversion")}${T("：", ": ")}${s.conv} · ${T("漏付时选董事权", "Board seats if missed")}${T("：", ": ")}${s.board}</div>
        <div class="demo-meta">${s.extra}</div>
      </div>
      <div class="cmp-cell cold"><h5>${T("规模与位置", "Size and position")}</h5>
        <div class="demo-meta">${T("在外名义（近似）", "Notional outstanding (approx.)")}${T("：", ": ")}<b>${fmtUsd(s.n * 1000, 0)}M</b></div>
        <div class="demo-meta">${T("年度股息约", "Annual dividends about")} ${fmtUsd(obligM, 0)}M${T("（占全部利息与股息约 17.03 亿美元的", " (")}${fmtPct(obligM / 1703, 1)}${T("）", " of about $1.703B total)")}</div>
        <div class="demo-meta">${T("清偿顺序第", "Rank among preferreds")} ${s.rank} ${T("位（优先股中）", "")}${s.rank >= 3 ? T("；与另外两只次级优先股的相对顺序未经核实", "; order relative to the other two juniors unverified") : ""}</div>
      </div>`;

    const convVal = 0.1 * st.mstr;
    q("#sp-stats").innerHTML = `
      <div class="stat"><div class="k">${T("BTC 评级", "BTC Rating")}</div><div class="v ${sel.rating >= 2 ? "pos" : sel.rating >= 1 ? "acc" : "neg"}">${fmtR(sel.rating)}</div></div>
      <div class="stat"><div class="k">${T("BTC 地板价（评级 = 1 倍）", "BTC floor price (rating = 1x)")}</div><div class="v">${isFinite(sel.rating) ? fmtUsd(btcFloorPrice(st.btcP, sel.rating), 0) : "$0"}</div></div>
      <div class="stat"><div class="k">${T("当前收益率", "Current yield")}</div><div class="v acc">${fmtPct(cy, 2)}</div></div>
      <div class="stat"><div class="k">${T("每次派息 / 股", "Per payment / share")}</div><div class="v">${S[st.pick].cur === "€" ? "€" : "$"}${fmtNum(perPay, 4)}</div></div>
      ${st.pick === "STRK" ? `<div class="stat"><div class="k">${T("转股价值（0.1 × MSTR）", "Conversion value (0.1 × MSTR)")}</div><div class="v">${fmtUsd(convVal, 2)}</div></div>` : ""}`;

    const lines = [];
    lines.push(`${T("BTC 储备", "BTC Reserve")} = 840,447 × ${fmtUsd(st.btcP, 0)} ≈ <b>${fmtUsd(reserve, 1)}B</b>${T("；", "; ")}${st.pick} ${T("的分母 = 本层 + 所有更优先层", "denominator = this layer + every senior layer")} ${fmtUsd(sel.cum, 2)}B${st.method === "net" ? T(" − 美元资产 66.9 亿", " − $6.69B of USD assets") : ""}${T("。", ".")}`);
    if (sel.rating < 1) lines.push(`<span class="bad">${T("评级低于 1 倍：若此刻按比特币价值清算，这一层拿不满名义金额。", "Rating below 1x: if liquidated at today's bitcoin value, this layer would not be paid its full notional.")}</span>`);
    else if (sel.rating < 2) lines.push(`<span class="warn">${T("评级在 1–2 倍之间：覆盖变薄，比特币再跌", "Rating between 1x and 2x: coverage is thin; another")} ${fmtPct(1 - 1 / sel.rating, 0)} ${T("就会跌破 1 倍。", "fall in bitcoin takes it below 1x.")}</span>`);
    else lines.push(`<span class="ok">${T("覆盖充足：比特币要再跌", "Well covered: bitcoin would need to fall another")} ${fmtPct(1 - 1 / sel.rating, 0)} ${T("这一层的评级才会跌到 1 倍。", "before this layer's rating hits 1x.")}</span>`);
    if (st.pick === "STRD") lines.push(`<span class="warn">${T("STRD 非累积：评级再高，也不保证每期股息；它只衡量清算时的资产覆盖。", "STRD is non-cumulative: however high its rating, no dividend is guaranteed; the rating measures only asset coverage in a liquidation.")}</span>`);
    if (st.pick === "STRC" && st.px < 99) lines.push(`${T("STRC 低于 99 美元：按 2025 年 10 月的框架会倾向加息；按 2026-06-29 的新政策，公司更多用低于面值的回购，而不“仅因低于面值”加息（阶段 17.4）。", "STRC below $99: the October 2025 framework leaned toward raising the rate; under the June 29, 2026 policy the company relies more on buybacks below par and won't raise the rate solely because STRC trades below its stated amount (Stage 17.4).")}`);
    if (st.pick === "STRC" && st.px > 101) lines.push(`<span class="warn">${T("高于 101 美元：公司可随时按 101 美元赎回，价格很难持续站在这之上（负凸性）。", "Above $101: the company can redeem at $101 at any time, so the price struggles to stay above it (negative convexity).")}</span>`);
    if (st.pick === "STRK") lines.push(`${T("转股价值", "Conversion value")} ${fmtUsd(convVal, 2)} ${T("vs 市价", "vs price")} ${fmtUsd(st.px, 2)}${T("：", ": ")}${convVal < st.px * 0.5 ? T("期权深度价外，STRK 主要像一只 8% 的累积优先股。", "the option is deep out of the money; STRK trades mainly like an 8% cumulative preferred.") : T("期权开始有分量，STRK 的价格会越来越跟着 MSTR 走。", "the option now matters, and STRK's price will increasingly track MSTR.")}`);
    q("#sp-log").innerHTML = lines.map((l) => `<div>${l}</div>`).join("");
  };

  const seg = (id, key, attr) => root.querySelectorAll(`${id} button`).forEach((b) => b.addEventListener("click", () => {
    st[key] = b.dataset[attr];
    root.querySelectorAll(`${id} button`).forEach((o) => o.classList.toggle("on", o === b));
    paint();
  }));
  seg("#sp-pick", "pick", "k"); seg("#sp-method", "method", "m"); seg("#sp-jr", "junior", "j");
  q("#sp-btc").addEventListener("input", (e) => { st.btcP = +e.target.value; paint(); });
  q("#sp-px").addEventListener("input", (e) => { st.px = +e.target.value; paint(); });
  q("#sp-mstr").addEventListener("input", (e) => { st.mstr = +e.target.value; paint(); });
  q("#sp-reset").addEventListener("click", () => { st.btcP = P0; q("#sp-btc").value = Math.round(P0 / 1000) * 1000; paint(); });
  paint();
}
