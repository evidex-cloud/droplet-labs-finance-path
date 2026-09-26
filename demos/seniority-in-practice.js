// 交互演示：清偿顺序实战——拖动比特币跌幅，把 Strategy 的真实楼层（2026 年 9 月快照，推算）
// 或橙子公司逐层清算：waterfall 给出每层回收，btcRating 给出覆盖倍数，btcFloorPrice 给出地板价；
// 可切换是否计入美元资产、次级优先股的内部顺序（未经核实）；再模拟“暂停优先股股息 N 个月”的拖欠与永久损失。
import { waterfall, btcRating, btcFloorPrice, fmtPct, fmtNum, fmtUsd, fmtBig, tex } from "./_fin.js";

// 金额写进公式：$21.32B → \$21.32\text{B}
const texBig = (x) => "\\$" + fmtBig(x, 2).replace(/([A-Z])$/, "\\text{$1}");

export default function mount(root, lang) {
  const en = lang === "en";
  const T = (zh, e) => (en ? e : zh);

  const CO = {
    mstr: {
      name: T("Strategy（2026-09 快照，推算）", "Strategy (Sep 2026 snapshot, derived)"), btc: 846000, p0: 84000, usd: 6.09e9,
      senior: [
        { name: T("债务", "Debt"), claim: 6.754e9, rate: 0, cum: true, kind: "debt" },
        { name: "STRF", claim: 1.284e9, rate: 0.10, cum: true, kind: "pen", freq: 4 },
        { name: "STRC", claim: 9.32e9, rate: 0.12, cum: true, kind: "rate", freq: 24 },
      ],
      junior: [
        { name: "STRE", claim: 0.90e9, rate: 0.10, cum: true, kind: "pen", freq: 4 },
        { name: "STRK", claim: 1.40e9, rate: 0.08, cum: true, kind: "rate", freq: 4 },
        { name: "STRD", claim: 1.40e9, rate: 0.10, cum: false, kind: "lost", freq: 4 },
      ],
    },
    orange: {
      name: T("橙子公司（示意）", "Orange Corp (illustrative)"), btc: 10000, p0: 100000, usd: 30e6,
      senior: [
        { name: T("可转债", "Converts"), claim: 150e6, rate: 0, cum: true, kind: "debt" },
        { name: "Orange-F", claim: 100e6, rate: 0.10, cum: true, kind: "rate", freq: 4 },
      ],
      junior: [{ name: "Orange-D", claim: 50e6, rate: 0.10, cum: false, kind: "lost", freq: 4 }],
    },
  };
  const st = { co: "mstr", dd: 70, usd: false, jr: "pari", months: 0 };

  root.innerHTML = `
    <div class="demo">
      <div class="demo-head">${T("🌊 清偿顺序实战：水位一降，哪一层先断水？", "🌊 Seniority in practice: when the water drops, which floor runs dry first?")}</div>
      <div class="demo-grid">
        <div class="demo-block">
          <label class="demo-label">${T("公司", "Company")}</label>
          <div class="demo-seg" id="sn-co">
            <button data-c="mstr" class="on">Strategy</button>
            <button data-c="orange">${T("橙子公司", "Orange Corp")}</button>
          </div>
          <label class="demo-label" style="margin-top:8px">${T("美元资产 / 现金", "USD assets / cash")}</label>
          <div class="demo-seg" id="sn-usd">
            <button data-u="0" class="on">${T("不计（保守）", "Excluded (conservative)")}</button>
            <button data-u="1">${T("计入", "Included")}</button>
          </div>
        </div>
        <div class="demo-block">
          <label class="demo-label">${T("次级优先股内部顺序（未经核实）", "Order among junior preferreds (unverified)")}</label>
          <div class="demo-seg" id="sn-jr">
            <button data-j="pari" class="on">${T("同级、按比例", "Equal, pro rata")}</button>
            <button data-j="deck">${T("简报顺序 STRE→STRK→STRD", "Deck order STRE→STRK→STRD")}</button>
          </div>
          <label class="demo-label" style="margin-top:8px">${T("暂停全部优先股股息的月数", "Months of suspended preferred dividends")}${T("：", ": ")}<b id="sn-m-v"></b></label>
          <input class="demo-slider" id="sn-m" type="range" min="0" max="24" step="1" value="0" />
        </div>
      </div>
      <div class="demo-block">
        <label class="demo-label">${T("比特币从快照价下跌", "Bitcoin drop from the snapshot price")}${T("：", ": ")}<b id="sn-dd-v"></b></label>
        <input class="demo-slider" id="sn-dd" type="range" min="0" max="95" step="1" value="${st.dd}" />
        <div class="demo-btns">${[0, 30, 50, 70, 85].map((v) => `<button class="demo-btn" data-dd="${v}">−${v}%</button>`).join("")}</div>
      </div>
      <div class="stat-row" id="sn-stats"></div>
      <div class="demo-block"><div class="demo-label">${T("每层：条形为清算回收率；右侧为 BTC 评级 · 地板价", "Each floor: the bar is liquidation recovery; on the right, BTC Rating · floor price")}</div><div class="stages" id="sn-stack"></div></div>
      <div class="demo-block" id="sn-div"></div>
      <div class="demo-block"><div class="demo-log" id="sn-log"></div></div>
      <p class="demo-tip">${T(
        "按 −30%、−50%、−70%、−85% 依次点：看红色从哪一层开始出现——总是从最下面往上爬。在 −70% 时切换“计入美元资产”，再切换次级优先股的顺序：同一个跌幅，谁吃亏取决于口径和一行未经核实的条款。最后把“暂停股息”拖到 12 个月：STRD 的损失是永久的，累积层的拖欠则变成挡在普通股前面的新索取权。",
        "Click −30%, −50%, −70%, −85% in turn and watch where the red first appears: it always climbs from the bottom. At −70%, toggle “USD assets included,” then switch the junior ordering: for the same drop, who loses depends on the method and on one unverified line of terms. Finally drag “suspended dividends” to 12 months: STRD's loss is permanent, while the cumulative layers' arrears become new claims standing ahead of the common."
      )}</p>
    </div>`;

  const q = (s) => root.querySelector(s);

  // 暂停 N 个月的拖欠（累积）或永久损失（非累积）：STRF/STRE 罚息按“股息率 + 1 个百分点/期、上限 18%”复利（按季度近似）
  const arrearsOf = (l, months) => {
    if (months <= 0 || l.kind === "debt") return 0;
    if (l.kind === "lost") return l.claim * l.rate * months / 12;
    const periods = Math.floor(months * l.freq / 12);
    let a = 0;
    for (let k = 1; k <= periods; k++) {
      const r = l.kind === "pen" ? Math.min(l.rate + 0.01 * k, 0.18) : l.rate;
      a = a * (1 + r / l.freq) + l.claim * l.rate / l.freq;
    }
    return a;
  };

  const paint = () => {
    const c = CO[st.co];
    q("#sn-dd-v").textContent = "−" + st.dd + "%";
    q("#sn-m-v").textContent = st.months;
    q("#sn-jr").parentElement.style.opacity = st.co === "mstr" ? "1" : "0.45";
    const price = c.p0 * (1 - st.dd / 100), btcV = c.btc * price;
    const usd = st.usd ? c.usd : 0;
    const assets = btcV + usd, assets0 = c.btc * c.p0 + usd;
    // 楼层：次级同级时合并为一层
    const pari = st.co === "mstr" && st.jr === "pari";
    const layers = pari ? [...c.senior, { name: T("次级优先（合并）", "Juniors (combined)"), claim: c.junior.reduce((a, l) => a + l.claim, 0), group: true }] : [...c.senior, ...c.junior];
    const wf = waterfall(assets, layers), wf0 = waterfall(assets0, layers);
    let cum = 0;
    const rows = wf.rows.map((r, i) => {
      cum += layers[i].claim;
      const denom = cum - usd;
      const rating = denom > 0 ? btcRating(btcV, denom) : Infinity;
      const floor = denom > 0 ? btcFloorPrice(c.p0, btcRating(c.btc * c.p0, denom)) : 0;
      return { ...r, rating, floor, group: layers[i].group };
    });

    q("#sn-stack").innerHTML = rows.map((r) => {
      const col = r.recovery >= 0.999 ? (r.rating >= 1.5 ? "var(--green)" : "var(--btc)") : "var(--red)";
      const rt = isFinite(r.rating) && r.rating < 100 ? fmtNum(r.rating, 2) + "x" : T("> 100x", "> 100x");
      return `<div class="stage-bar"><span class="lab">${r.name}</span><div class="track"><div class="fill" style="width:${(r.recovery * 100).toFixed(1)}%;background:${col}"></div></div><span class="val" style="width:150px">${fmtPct(r.recovery, 0)} · ${rt} · ${fmtUsd(r.floor, 0)}</span></div>`;
    }).join("") + `<div class="stage-bar"><span class="lab">${T("普通股", "Common")}</span><div class="track"><div class="fill ghost" style="width:${assets0 > 0 ? Math.min(100, (wf.equity / assets0) * 100).toFixed(1) : 0}%"></div></div><span class="val" style="width:150px">${fmtBig(wf.equity)}</span></div>`;

    const eqChg = wf0.equity > 0 ? wf.equity / wf0.equity - 1 : NaN;
    const firstHit = rows.find((r) => r.recovery < 0.999); // 损失已爬到的最优先一层
    q("#sn-stats").innerHTML = `
      <div class="stat"><div class="k">${T("比特币价格", "Bitcoin price")}</div><div class="v">${fmtUsd(price, 0)}</div></div>
      <div class="stat"><div class="k">${T("可分配价值", "Distributable value")}</div><div class="v">${fmtBig(assets)}</div></div>
      <div class="stat"><div class="k">${T("普通股剩余变化", "Change in common residual")}</div><div class="v neg">${isFinite(eqChg) ? fmtPct(eqChg, 1) : "–"}</div></div>
      <div class="stat"><div class="k">${T("普通股放大（跌幅比）", "Common vs bitcoin (drop ratio)")}</div><div class="v acc">${st.dd > 0 && isFinite(eqChg) ? fmtNum(-eqChg / (st.dd / 100), 2) + "x" : "–"}</div></div>`;

    // 股息暂停面板
    const prefs = [...c.senior, ...c.junior].filter((l) => l.kind !== "debt");
    if (st.months > 0) {
      const items = prefs.map((l) => ({ l, a: arrearsOf(l, st.months) }));
      const cumA = items.filter((x) => x.l.cum).reduce((s, x) => s + x.a, 0), lost = items.filter((x) => !x.l.cum).reduce((s, x) => s + x.a, 0);
      q("#sn-div").innerHTML = `<div class="demo-label">${T("暂停", "Suspended for")} ${st.months} ${T("个月", "months")}</div>
        <div class="cmp"><div class="cmp-cell hl"><h5>${T("累积层：拖欠（成为新的优先索取权）", "Cumulative floors: arrears (a new senior claim)")}</h5>
        ${items.filter((x) => x.l.cum).map((x) => `<div class="demo-meta">${x.l.name}${T("：", ": ")}${fmtBig(x.a)}</div>`).join("")}<div class="demo-meta"><b>${T("合计", "Total")} ${fmtBig(cumA)}</b></div></div>
        <div class="cmp-cell cold"><h5>${T("非累积层：永久失去", "Non-cumulative floor: lost for good")}</h5>
        ${items.filter((x) => !x.l.cum).map((x) => `<div class="demo-meta">${x.l.name}${T("：", ": ")}<span style="color:var(--red)">${fmtBig(x.a)}</span></div>`).join("")}<div class="demo-meta">${T("股息阻断：拖欠未清前，普通股不得分配或回购", "Dividend stoppers: no common distributions or buybacks until arrears are cleared")}</div></div></div>`;
      if (st.co === "mstr") q("#sn-div").innerHTML += `<div class="demo-meta">${T("STRF/STRE 按“股息率 + 1 个百分点、逐期递增、上限 18%”近似；STRK 的罚息细节未经核实，按股息率计。", "STRF/STRE approximated at rate + 1 point, stepping up each period, capped at 18%; STRK's penalty details are unverified, so it accrues at its rate.")}</div>`;
    } else q("#sn-div").innerHTML = `<div class="demo-meta">${T("把“暂停股息的月数”拖到大于 0，看累积与非累积的差别。", "Drag “months of suspended dividends” above 0 to see the cumulative / non-cumulative difference.")}</div>`;

    const lines = [];
    if (!firstHit) lines.push(`<span class="ok">${T("所有固定索取权都被全额覆盖：这一跌幅的损失全部由普通股承担（剩余", "Every fixed claim is fully covered: the whole loss at this drop falls on the common (residual")} ${fmtBig(wf.equity)}${T("）。", ").")}</span>`);
    else lines.push(`<span class="bad">${T("损失已经从底部爬到", "The loss has climbed from the bottom up to")} <b>${firstHit.name}</b>${T("（回收", " (recovery")} ${fmtPct(firstHit.recovery, 0)}${T("）；它下面的所有层与普通股都已归零。", "); every floor below it, and the common, is at zero.")}</span>`);
    const thin = rows.filter((r) => r.recovery >= 0.999 && r.rating < 1.25);
    const last = rows[rows.length - 1], lastCum = layers.reduce((a, l) => a + l.claim, 0);
    const lastR = !isFinite(last.rating) || last.rating >= 100 ? String.raw`> 100\times` : String.raw`\approx ${fmtNum(last.rating, 2)}\times`;
    lines.push(`${last.name}${T("：", ": ")}${tex(String.raw`\text{${T("BTC 评级", "BTC Rating")}} = \dfrac{\text{${T("比特币价值", "bitcoin value")}}}{\text{${T("累计索取权", "cumulative claims")}}${usd ? String.raw` - \text{${T("美元资产", "USD assets")}}` : ""}} = \dfrac{${texBig(btcV)}}{${texBig(lastCum)}${usd ? " - " + texBig(usd) : ""}} ${lastR}`)}`);
    if (thin.length) lines.push(`<span class="warn">${T("站在边缘", "On the edge")} (${tex(String.raw`\text{${T("覆盖", "coverage")}} < 1.25\times`)})${T("：", ": ")}${thin.map((r) => r.name).join(T("、", ", "))}</span>`);
    if (st.co === "mstr" && !st.usd) lines.push(`${T("提示：Strategy 自己的 BTC 评级会先用约 60.9 亿美元的美元资产抵减债务——切到“计入”看差别。", "Note: Strategy's own BTC Rating nets about $6.09B of USD assets against debt first; switch to “Included” to see the difference.")}`);
    if (st.co === "mstr" && st.jr === "deck") lines.push(`<span class="warn">${T("STRE→STRK→STRD 的顺序来自公司简报的计算方式，一手条款未明文确认。", "The STRE→STRK→STRD order comes from the calculation order in a company deck; primary terms don't state it explicitly.")}</span>`);
    lines.push(`${T("这是“此刻一次性清算”的机械计算，不是预测；真实世界里损失先以 mNAV 压缩、卖币付息、优先股跌破面值与股息暂停的形式出现。", "This is a mechanical \"liquidate everything right now\" calculation, not a forecast; in the real world losses first appear as mNAV compression, bitcoin sold for dividends, preferreds below par and dividend suspensions.")}`);
    q("#sn-log").innerHTML = lines.map((l) => `<div>${l}</div>`).join("");
  };

  const seg = (id, fn) => root.querySelectorAll(`${id} button`).forEach((b) => b.addEventListener("click", () => {
    fn(b); root.querySelectorAll(`${id} button`).forEach((o) => o.classList.toggle("on", o === b)); paint();
  }));
  seg("#sn-co", (b) => { st.co = b.dataset.c; });
  seg("#sn-usd", (b) => { st.usd = b.dataset.u === "1"; });
  seg("#sn-jr", (b) => { st.jr = b.dataset.j; });
  q("#sn-dd").addEventListener("input", (e) => { st.dd = +e.target.value; paint(); });
  q("#sn-m").addEventListener("input", (e) => { st.months = +e.target.value; paint(); });
  root.querySelectorAll("[data-dd]").forEach((b) => b.addEventListener("click", () => { st.dd = +b.dataset.dd; q("#sn-dd").value = st.dd; paint(); }));
  paint();
}
