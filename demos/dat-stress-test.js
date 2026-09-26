// 交互演示：DAT 压力测试仪表盘——比特币冲击 × mNAV × 市场关门月数 × 回售日，逐月模拟 36 个月：
// 谁来付股息（增发 / 美元储备 / 卖币 / 跳过）、回售日要多少现金、卖掉多少比特币、各层覆盖还剩几倍。
// 预设：橙子公司（AUTHORING §0.2）与 Strategy（2026-09-20 前后数据，部分为派生值，见 _research/dat-facts.md §1.3–1.6）。
import { coverageByLayer, waterfall, monthsCovered, breakevenArr, btcNav, fmtPct, fmtNum, fmtUsd, fmtBig, tex } from "./_fin.js";
import { lineChart, chartBlock } from "./_chart.js";

// 把格式化好的数字放进 LaTeX：$ → \$，千分位 , → {,}，% → \%
const texv = (s) => String(s).replace(/\$/g, "\\$").replace(/,/g, "{,}").replace(/%/g, "\\%");
const texBig = (x) => String.raw`\$${fmtBig(x).replace(/([TBMK])$/, "\\text{$1}")}`;

export default function mount(root, lang) {
  const en = lang === "en";
  const T = (zh, e) => (en ? e : zh);

  const P = {
    orange: {
      btc: 10000, px: 100000, reserve: 30e6, cash: 0, oblig: 15e6, mandatory: 0, nonCum: 5e6,
      layers: [{ name: T("可转债", "Convertibles"), claim: 150e6 }, { name: "Orange-F", claim: 100e6 }, { name: "Orange-D", claim: 50e6 }],
      puts: [{ m: 24, a: 150e6 }], mnav: 1.5,
    },
    strategy: {
      btc: 846000, px: 84100, reserve: 5.04e9, cash: 1.05e9, oblig: 1.62e9, mandatory: 35e6, nonCum: 0.14e9,
      layers: [{ name: T("债务（可转债）", "Debt (converts)"), claim: 6.754e9 }, { name: "STRF", claim: 1.284e9 }, { name: "STRC", claim: 9.32e9 }, { name: "STRE/STRK/STRD", claim: 3.706e9 }],
      puts: [{ m: 12, a: 1.01e9 }, { m: 18, a: 2.0e9 }, { m: 21, a: 1.5e9 }, { m: 24, a: 1.40375e9 }, { m: 33, a: 0.8e9 }], mnav: 1.0,
    },
  };
  const H = 36;
  const st = { preset: "orange", shock: -50, shut: 24, mnav: 1.5, policy: "sell", itm: false, useCash: true };

  root.innerHTML = `
    <div class="demo">
      <div class="demo-head">${T("🧯 DAT 压力测试台：覆盖倍数 · 覆盖月数 · 回售墙", "🧯 DAT stress-test desk: coverage multiples · months of cover · the put wall")}</div>
      <div class="demo-block">
        <label class="demo-label">${T("公司", "Company")}</label>
        <div class="demo-seg" id="dst-preset">
          <button data-p="orange" class="on">${T("橙子公司（示意）", "Orange Corp (illustrative)")}</button>
          <button data-p="strategy">${T("Strategy（2026-09-20 前后，含派生值）", "Strategy (around 2026-09-20, incl. derived values)")}</button>
        </div>
      </div>
      <div class="demo-grid">
        <div class="demo-block">
          <label class="demo-label">${T("比特币价格冲击", "Bitcoin price shock")}${T("：", ": ")}<b id="dst-shock-v"></b></label>
          <input class="demo-slider" id="dst-shock" type="range" min="-90" max="50" step="5" value="-50" />
          <label class="demo-label">${T("资本市场关门（月）", "Capital markets shut (months)")}${T("：", ": ")}<b id="dst-shut-v"></b></label>
          <input class="demo-slider" id="dst-shut" type="range" min="0" max="36" step="1" value="24" />
          <label class="demo-label">${T("mNAV（开门时低于 1，增发即稀释，不用）","mNAV (below 1, issuing is dilutive and not used)")}${T("：", ": ")}<b id="dst-mnav-v"></b></label>
          <input class="demo-slider" id="dst-mnav" type="range" min="0.5" max="3" step="0.05" value="1.5" />
        </div>
        <div class="demo-block">
          <label class="demo-label">${T("储备用完后，股息怎么办？", "Once the reserve is gone, what about dividends?")}</label>
          <div class="demo-seg" id="dst-policy">
            <button data-v="sell" class="on">${T("卖比特币照付", "Sell bitcoin and pay")}</button>
            <button data-v="skip">${T("暂停股息（只付利息）", "Suspend dividends (pay interest only)")}</button>
          </div>
          <div class="demo-btns" style="margin-top:10px">
            <button class="demo-btn" id="dst-itm">${T("可转债价内（会转股，不要现金）", "Converts in the money (they convert, no cash)")}</button>
            <button class="demo-btn" id="dst-cash">${T("把 USD Cash 也算进储备", "Count USD Cash in the reserve")}</button>
          </div>
        </div>
      </div>
      <div class="stat-row" id="dst-stats"></div>
      <div class="demo-block"><div class="demo-label">${T("冲击后的覆盖阶梯与清算回收", "Coverage ladder and liquidation recovery after the shock")}</div><div class="stages" id="dst-ladder"></div></div>
      <div class="demo-block" id="dst-chart"></div>
      <div class="demo-block"><div class="demo-log" id="dst-log"></div></div>
      <p class="demo-tip">${T(
        "先用橙子公司：比特币 −80%、市场关门 24 个月，看第 24 个月的回售日一次吃掉多少比特币；再点“可转债价内”，悬崖消失——因为持有人选择转股。然后切到 Strategy：储备能撑三年左右，但第一个回售日在第 12 个月。压力测试的输出不是一个数字，而是一张时间表。",
        "Start with Orange Corp: bitcoin −80%, markets shut for 24 months, and watch how much bitcoin the month-24 put eats in one go. Then click “converts in the money” and the cliff vanishes, because holders choose to convert. Then switch to Strategy: the reserve lasts about three years, but the first put date is in month 12. A stress test's output is not a number; it is a timetable."
      )}</p>
    </div>`;

  const q = (s) => root.querySelector(s);

  const simulate = (c, px) => {
    let btc = c.btc, reserve = c.reserve + (st.useCash ? c.cash : 0), sold = 0, skipped = 0, arrears = 0, issued = 0, reserveOutAt = null;
    const btcPath = [btc], resPath = [reserve], events = [];
    let cur = 0;
    const pay = (amt) => { // 先用储备，再卖币；返回卖出的比特币
      const fromRes = Math.min(reserve, amt); reserve -= fromRes;
      const rest = amt - fromRes; let s = 0;
      if (rest > 0) { s = rest / px; btc -= s; sold += s; }
      if (reserve <= 1e-6 && reserveOutAt === null) reserveOutAt = cur;
      return s;
    };
    for (let m = 1; m <= H; m++) {
      cur = m;
      const open = m > st.shut && st.mnav >= 1;
      const due = c.oblig / 12;
      if (open) { issued += due; }
      else if (reserve >= due) { reserve -= due; }
      else {
        if (st.policy === "sell") pay(due);
        else {
          pay(c.mandatory / 12);
          const div = due - c.mandatory / 12;
          skipped += div; arrears += div * (1 - c.nonCum / (c.oblig - c.mandatory));
        }
      }
      c.puts.forEach((p) => {
        if (p.m !== m) return;
        if (st.itm) { events.push({ m, a: p.a, kind: "convert" }); return; }
        if (open) { events.push({ m, a: p.a, kind: "refi" }); return; }
        const s = pay(p.a);
        events.push({ m, a: p.a, kind: "cash", btc: s });
      });
      btcPath.push(btc); resPath.push(reserve);
    }
    return { btc, reserve, sold, skipped, arrears, issued, reserveOutAt, btcPath, resPath, events };
  };

  const paint = () => {
    const c = P[st.preset];
    const px = c.px * (1 + st.shock / 100);
    const nav0 = btcNav(c.btc, px);
    const cov = coverageByLayer(nav0, c.layers);
    const wf = waterfall(nav0, c.layers);
    const sim = simulate(c, px);
    const navEnd = btcNav(sim.btc, px);
    // 回售后剩余层（假设现金回售的债务已被清偿）
    const repaid = sim.events.filter((e) => e.kind === "cash" || e.kind === "refi").reduce((s, e) => s + e.a, 0);
    const layersEnd = c.layers.map((l, i) => (i === 0 ? { ...l, claim: Math.max(0, l.claim - repaid) } : l));
    const covEnd = coverageByLayer(navEnd, layersEnd);
    const juniorEnd = covEnd[covEnd.length - 1].coverage;
    const months = monthsCovered(c.reserve + (st.useCash ? c.cash : 0), c.oblig);

    q("#dst-shock-v").textContent = (st.shock > 0 ? "+" : "") + st.shock + "% → " + fmtUsd(px, 0);
    q("#dst-shut-v").textContent = st.shut + T(" 个月", " months");
    q("#dst-mnav-v").textContent = fmtNum(st.mnav, 2) + "x";
    q("#dst-itm").classList.toggle("active", st.itm);
    q("#dst-cash").classList.toggle("active", st.useCash);
    q("#dst-cash").style.display = c.cash > 0 ? "" : "none";

    q("#dst-stats").innerHTML = `
      <div class="stat"><div class="k">${T("BTC 储备（冲击后）", "BTC Reserve (after shock)")}</div><div class="v">${fmtBig(nav0)}</div></div>
      <div class="stat"><div class="k">${T("储备覆盖", "Reserve covers")}</div><div class="v">${fmtNum(months, 0)} ${T("个月", "months")}</div></div>
      <div class="stat"><div class="k">Breakeven ARR</div><div class="v acc">${fmtPct(breakevenArr(c.oblig, nav0), 2)}</div></div>
      <div class="stat"><div class="k">${T("36 个月内卖出", "Sold in 36 months")}</div><div class="v ${sim.sold > 0 ? "neg" : ""}">${fmtNum(sim.sold, 0)} BTC (${fmtPct(sim.sold / c.btc, 1)})</div></div>
      <div class="stat"><div class="k">${T("第 36 个月最劣后层覆盖", "Most junior layer, month 36")}</div><div class="v ${juniorEnd >= 1 ? "pos" : "neg"}">${isFinite(juniorEnd) ? fmtNum(juniorEnd, 2) + "x" : "–"}</div></div>`;

    const maxCov = Math.max(...cov.map((r) => Math.min(r.coverage, 12)), 1.5);
    q("#dst-ladder").innerHTML = cov.map((r, i) => {
      const w = Math.min(100, (Math.min(r.coverage, 12) / maxCov) * 100);
      const rec = wf.rows[i].recovery;
      return `<div class="stage-bar"><div class="lab">${r.name}</div><div class="track"><div class="fill" style="width:${w.toFixed(1)}%;background:${r.coverage >= 1 ? "var(--green)" : "var(--red)"}"></div></div><div class="val">${fmtNum(r.coverage, 2)}x · ${T("回收", "recovery")} ${fmtPct(rec, 0)}</div></div>`;
    }).join("") + `<div class="demo-meta">${T("清算后普通股剩余", "Left for common in liquidation")}${T("：", ": ")}${fmtBig(wf.equity)}</div>`;

    const res = lineChart({
      fns: [
        { f: (x) => (sim.btcPath[Math.round(x)] / c.btc) * 100, cls: "line5" },
        { f: (x) => (sim.resPath[Math.round(x)] / Math.max(1, c.reserve + (st.useCash ? c.cash : 0))) * 100, cls: "line2" },
      ],
      lo: 0, hi: H, samples: H, forceZero: true, xlabel: T("月份", "Month"), markerX: st.shut, markerLabel: T("市场重开", "reopen"), uid: "dst",
    });
    q("#dst-chart").innerHTML = `<div class="demo-label">${T("持仓与储备（期初 = 100）", "Holdings and reserve (start = 100)")}</div>` +
      chartBlock(res, [["var(--btc)", T("比特币持仓", "bitcoin holdings")], ["var(--blue)", T("美元储备", "USD reserve")]]);

    const L = [];
    const resTot = c.reserve + (st.useCash ? c.cash : 0);
    L.push(`${tex(String.raw`\text{${T("覆盖月数", "Months of coverage")}} = \dfrac{${texBig(resTot)}}{${texBig(c.oblig)}} \times 12 = ${texv(fmtNum(months, 0))}`)}${T("；", "; ")}${tex(String.raw`\text{Breakeven ARR} = \dfrac{${texBig(c.oblig)}}{${texBig(nav0)}} = ${texv(fmtPct(breakevenArr(c.oblig, nav0), 2))}`)}${T("。", ".")}`);
    if (sim.reserveOutAt) L.push(`<span class="warn">${T("第 " + sim.reserveOutAt + " 个月储备耗尽。", "Month " + sim.reserveOutAt + ": the reserve runs out.")}</span>`);
    else L.push(`<span class="ok">${T("36 个月内储备没有耗尽。", "The reserve lasts the full 36 months.")}</span>`);
    if (sim.issued > 0) L.push(`${T("市场开门且 mNAV ≥ 1 的月份，用增发支付了", "In months with open markets and mNAV ≥ 1, issuance paid")} ${fmtBig(sim.issued)}${T("（假设增发不稀释每股比特币）。", " (assumed not to dilute BTC per share).")}`);
    sim.events.forEach((e) => {
      if (e.kind === "convert") L.push(`${T("第", "Month")} ${e.m}${T(" 个月", "")}${T("：", ": ")}${fmtBig(e.a)} ${T("可转债转股——不要现金，但普通股被稀释。", "of converts convert: no cash, but the common is diluted.")}`);
      else if (e.kind === "refi") L.push(`${T("第", "Month")} ${e.m}${T(" 个月", "")}${T("：", ": ")}${fmtBig(e.a)} ${T("回售，市场开着，假设再融资成功。", "put back; markets are open, refinancing assumed to succeed.")}`);
      else L.push(`<span class="${e.btc > 0.2 * c.btc ? "bad" : e.btc > 0 ? "warn" : "ok"}">${T("第", "Month")} ${e.m}${T(" 个月", "")}${T("：", ": ")}${fmtBig(e.a)} ${T("回售要现金", "put for cash")}${e.btc > 0 ? `${T("，卖出", ", selling")}  ${fmtNum(e.btc, 0)} BTC ${T("（", "(")}${fmtPct(e.btc / c.btc, 1)}${T("）", ")")}` : T("，储备付清。", "; the reserve pays it.")}</span>`);
    });
    if (st.policy === "skip" && sim.skipped > 0) L.push(`<span class="warn">${T("暂停股息", "Dividends suspended")} ${fmtBig(sim.skipped)}${T("，其中累积型欠款", ", of which cumulative arrears")} ${fmtBig(sim.arrears)} ${T("必须在普通股拿钱前补清；非累积部分永久损失。", "must be cleared before the common gets anything; the non-cumulative part is lost for good.")}</span>`);
    if (st.mnav < 1 && st.shut < H) L.push(`<span class="warn">${T("mNAV < 1：即使市场开门，增发普通股付股息也是稀释，本模型改用储备与卖币。", "mNAV < 1: even with markets open, issuing common for dividends dilutes, so the model uses the reserve and bitcoin sales instead.")}</span>`);
    L.push(`${T("示意模型：不含比特币价格的路径变化、卖币对价格的冲击与股息率调整。仅讲机制，不构成投资建议。", "Illustrative model: it ignores the price path, the market impact of selling and changes in dividend rates. Mechanics only, not investment advice.")}`);
    q("#dst-log").innerHTML = L.map((l) => `<div>${l}</div>`).join("");
  };

  const bind = (id, key) => q(id).addEventListener("input", (e) => { st[key] = +e.target.value; paint(); });
  bind("#dst-shock", "shock"); bind("#dst-shut", "shut"); bind("#dst-mnav", "mnav");
  root.querySelectorAll("#dst-preset button").forEach((b) => b.addEventListener("click", () => {
    st.preset = b.dataset.p; st.mnav = P[st.preset].mnav; q("#dst-mnav").value = st.mnav;
    root.querySelectorAll("#dst-preset button").forEach((o) => o.classList.toggle("on", o === b));
    paint();
  }));
  root.querySelectorAll("#dst-policy button").forEach((b) => b.addEventListener("click", () => {
    st.policy = b.dataset.v;
    root.querySelectorAll("#dst-policy button").forEach((o) => o.classList.toggle("on", o === b));
    paint();
  }));
  q("#dst-itm").addEventListener("click", () => { st.itm = !st.itm; paint(); });
  q("#dst-cash").addEventListener("click", () => { st.useCash = !st.useCash; paint(); });
  paint();
}
