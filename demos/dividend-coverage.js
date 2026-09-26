// 交互演示：股息覆盖与“发行冻结”情景——资本市场关门后，先用美元储备，再卖比特币付股息。
// 可调：储备、股息率、比特币价格路径（冻结期内线性变到目标价）、冻结年数、经营现金、是否暂停非累积 D 层。
import { monthsCovered, breakevenArr, btcRating, fmtNum, fmtPct, fmtUsd } from "./_fin.js";
import { lineChart, chartBlock } from "./_chart.js";

export default function mount(root, lang) {
  const en = lang === "en";
  const T = (zh, e) => (en ? e : zh);

  const s = { reserve: 30, rateF: 10, rateD: 10, endPx: 100000, years: 10, ops: 0, skipD: false };
  const BTC0 = 10000, PX0 = 100000, F = 100, D = 50, CONV = 150;

  const sl = [
    ["reserve", T("美元储备（百万美元）", "USD reserve ($M)"), 0, 120, 1],
    ["rateF", T("Orange-F 股息率（%，累积）", "Orange-F dividend rate (%, cumulative)"), 4, 16, 0.25],
    ["rateD", T("Orange-D 股息率（%，非累积）", "Orange-D dividend rate (%, non-cumulative)"), 4, 16, 0.25],
    ["endPx", T("冻结期末比特币价格（美元，线性变化）", "Bitcoin price at end of freeze ($, linear path)"), 20000, 250000, 1000],
    ["years", T("冻结年数", "Years of freeze"), 1, 15, 1],
    ["ops", T("经营业务每年可用现金（百万美元）", "Operating cash available per year ($M)"), 0, 15, 0.5],
  ];

  root.innerHTML = `
    <div class="demo">
      <div class="demo-head">${T("🧯 发行冻结模拟器：储备先付，然后卖币", "🧯 Issuance-freeze simulator: reserve first, then sell bitcoin")}</div>
      <div class="demo-grid" id="dc-ctrl"></div>
      <div class="demo-btns"><button class="demo-btn" id="dc-skip">${T("暂停 D 层股息：关", "Suspend D dividends: off")}</button></div>
      <div class="stat-row" id="dc-stats"></div>
      <div id="dc-chart"></div>
      <div class="demo-log" id="dc-log"></div>
      <p class="demo-tip">${T(
        "默认是橙子公司、币价不变：储备撑 24 个月，之后每年卖 150 枚比特币。把期末币价拖到 3 万美元：卖币速度翻几倍，F 层覆盖一路变薄。再打开“暂停 D 层股息”——非累积的 D 层跳过后不再欠，年度义务立刻降三分之一。最后把储备拖到 60：看储备月数翻倍，但记住这笔钱通常是靠卖普通股换来的。",
        "The default is Orange Corp at a constant price: the reserve lasts 24 months, then it sells 150 BTC a year. Drag the end price to $30,000: coin sales speed up several-fold and the F layer's coverage keeps thinning. Then turn on “Suspend D dividends” — the non-cumulative D layer is skipped with nothing owed, cutting annual obligations by a third. Finally push the reserve to 60: coverage months double, but remember that money usually comes from selling common stock."
      )}</p>
    </div>`;

  const q = (sel) => root.querySelector(sel);
  q("#dc-ctrl").innerHTML = sl.map(([k, lab, lo, hi, st]) => `
    <div><label class="demo-label">${lab} <b id="dc-v-${k}"></b></label>
    <input class="demo-slider" type="range" data-k="${k}" min="${lo}" max="${hi}" step="${st}" value="${s[k]}" /></div>`).join("");
  q("#dc-ctrl").querySelectorAll("[data-k]").forEach((el) => el.addEventListener("input", () => { s[el.dataset.k] = +el.value; paint(); }));
  q("#dc-skip").addEventListener("click", (e) => {
    s.skipD = !s.skipD;
    e.target.classList.toggle("active", s.skipD);
    e.target.textContent = s.skipD ? T("暂停 D 层股息：开", "Suspend D dividends: on") : T("暂停 D 层股息：关", "Suspend D dividends: off");
    paint();
  });

  function paint() {
    for (const [k] of sl) q("#dc-v-" + k).textContent = k === "endPx" ? fmtUsd(s[k]) : k.startsWith("rate") ? s[k].toFixed(2) + "%" : fmtNum(s[k], k === "ops" ? 1 : 0);

    const divF = (F * s.rateF) / 100, divD = s.skipD ? 0 : (D * s.rateD) / 100;
    const annual = divF + divD; // 可转债 0% 票息
    const net = Math.max(0, annual - s.ops);
    const reserve0NAV = (BTC0 * PX0) / 1e6;
    const mCov = monthsCovered(s.reserve, net);
    const be = breakevenArr(annual, reserve0NAV);

    // 按月模拟
    const M = s.years * 12;
    let cash = s.reserve, btc = BTC0, sold = 0, firstSaleMonth = null;
    const btcPath = [BTC0], cashPath = [s.reserve];
    for (let m = 1; m <= M; m++) {
      const px = PX0 + (s.endPx - PX0) * (m / M);
      let need = net / 12;
      const fromCash = Math.min(cash, need);
      cash -= fromCash; need -= fromCash;
      if (need > 1e-9) {
        const coins = (need * 1e6) / px;
        btc -= coins; sold += coins;
        if (firstSaleMonth === null) firstSaleMonth = m;
      }
      btcPath.push(btc); cashPath.push(cash);
    }
    const endNAV = (btc * s.endPx) / 1e6;
    const ratingF0 = btcRating(reserve0NAV, CONV + F), ratingF1 = btcRating(endNAV, CONV + F);
    const ratingD1 = btcRating(endNAV, CONV + F + D);
    const bpsChg = btc / BTC0 - 1;

    q("#dc-stats").innerHTML = [
      [T("年度义务", "Annual obligations"), fmtUsd(annual, 1) + "M", ""],
      [T("储备覆盖", "Reserve coverage"), isFinite(mCov) ? fmtNum(mCov, 1) + T(" 个月", " months") : "∞", mCov >= 12 ? "pos" : "neg"],
      ["BTC Breakeven ARR", fmtPct(be, 2), "acc"],
      [T("冻结期内卖出", "BTC sold in freeze"), fmtNum(sold, 0) + " BTC", sold > 0 ? "neg" : "pos"],
      [T("F 层评级：期初 → 期末", "F-layer rating: start → end"), fmtNum(ratingF0, 2) + " → " + fmtNum(ratingF1, 2) + "x", ratingF1 >= 2 ? "pos" : ratingF1 >= 1 ? "acc" : "neg"],
    ].map(([k, v, c]) => `<div class="stat"><div class="k">${k}</div><div class="v ${c}">${v}</div></div>`).join("");

    const res = lineChart({
      fns: [
        { f: (t) => btcPath[Math.max(0, Math.min(M, Math.round(t)))] / BTC0, cls: "line5" },
        { f: (t) => (s.reserve > 0 ? cashPath[Math.max(0, Math.min(M, Math.round(t)))] / s.reserve : 0), cls: "line4" },
      ],
      lo: 0, hi: M, samples: Math.min(M, 180), xlabel: T("月", "months"), forceZero: true, uid: "dcc",
    });
    q("#dc-chart").innerHTML = chartBlock(res, [["var(--btc)", T("持币（期初 = 1）", "Bitcoin held (start = 1)")], ["var(--green)", T("美元储备（期初 = 1）", "USD reserve (start = 1)")]]);

    const lines = [];
    lines.push(`${T("年度义务 = F ", "Annual obligations = F ")}${fmtNum(F, 0)} × ${s.rateF.toFixed(2)}% + D ${fmtNum(D, 0)} × ${s.skipD ? "0%" : s.rateD.toFixed(2) + "%"} = <b>${fmtNum(annual, 2)}</b>${T("（可转债 0% 票息）；扣除经营现金后需 ", " (converts pay 0%); net of operating cash, ")}${fmtNum(net, 2)}${T(" / 年。", " a year is needed.")}`);
    lines.push(`USD Duration = ${fmtNum(s.reserve, 0)} ÷ ${fmtNum(annual, 1)} = <b>${fmtNum(annual > 0 ? s.reserve / annual : Infinity, 2)}${T(" 年", " yrs")}</b>${T("；BTC Duration = ", "; BTC Duration = ")}${fmtNum(reserve0NAV, 0)} ÷ ${fmtNum(annual, 1)} = <b>${fmtNum(annual > 0 ? reserve0NAV / annual : Infinity, 1)}${T(" 年", " yrs")}</b>`);
    lines.push(firstSaleMonth
      ? `${T("第 ", "Coin sales begin in month ")}${firstSaleMonth}${T(" 个月开始卖币；冻结期内共卖 ", "; over the freeze it sells ")}<b>${fmtNum(sold, 0)} BTC</b>${T("，每股比特币变化 ", ", changing BTC per share by ")}<b>${fmtPct(bpsChg, 1)}</b>${T("（股数不变）。", " (share count unchanged).")}`
      : `<span class="ok">${T("整个冻结期都由储备与经营现金支付，一枚比特币没卖。", "The whole freeze is funded by the reserve and operating cash; not a coin is sold.")}</span>`);
    lines.push(`${T("期末：比特币净值 ", "End: bitcoin NAV ")}${fmtUsd(endNAV)}M${T("；F 层 ", "; F layer ")}${fmtNum(ratingF1, 2)}x${T("，D 层 ", ", D layer ")}${fmtNum(ratingD1, 2)}x ${ratingD1 < 1 ? `<span class="bad">${T("D 层覆盖已跌破 1 倍", "D-layer coverage has fallen below 1x")}</span>` : ""}`);
    if (s.skipD) lines.push(`<span class="warn">${T("D 层是非累积的：跳过的股息永久不补。若暂停的是累积优先股（如 F 层），欠款会挂账并加息。", "The D layer is non-cumulative: skipped dividends are never made up. Suspending a cumulative preferred (like F) would build arrears that step up.")}</span>`);
    q("#dc-log").innerHTML = lines.map((l) => `<div>${l}</div>`).join("");
  }

  paint();
}
