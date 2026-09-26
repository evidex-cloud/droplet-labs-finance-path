// 交互演示：四种“拥有比特币”的方式，一年期情景对比——直接持币、现货 ETF、DAT 普通股（橙子公司，2026 口径 mNAV）、
// DAT 优先股（Orange-F，10% 累积，按要求收益率定价、按清偿顺序封底）。
import { netReserve, btcRating, perpetuity, waterfall, fmtPct, fmtUsd, fmtNum } from "./_fin.js";
import { lineChart, chartBlock } from "./_chart.js";

export default function mount(root, lang) {
  const en = lang === "en";
  const T = (zh, e) => (en ? e : zh);

  // 橙子公司（百万美元）
  const BTC_NAV0 = 1000, CONV = 150, PREF = 150, CASH0 = 30, DIV = 15, SH = 100, CONV_SH = 6, CONV_PX = 25, PX0 = 2.05 * 7.3; // 期初股价按 mNAV 2.05 × 每股净比特币 7.30（≈ 15 美元）
  const st = { r: 0, fee: 0.25, m1: 2.05, yReq: 10, amt: 10000 };

  root.innerHTML = `
    <div class="demo">
      <div class="demo-head">${T("⚖️ 四种拥有比特币的方式：一年后各剩多少", "⚖️ Four ways to own bitcoin: what's left after one year")}</div>
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:10px">
        <div class="demo-block"><label class="demo-label">${T("比特币一年回报：", "Bitcoin 1-year return: ")}<b id="dv-v-r"></b></label><input class="demo-slider" type="range" id="dv-r" min="-90" max="200" step="1" value="${st.r}" /></div>
        <div class="demo-block"><label class="demo-label">${T("ETF 年费：", "ETF annual fee: ")}<b id="dv-v-fee"></b></label><input class="demo-slider" type="range" id="dv-fee" min="0" max="1.5" step="0.05" value="${st.fee}" /></div>
        <div class="demo-block"><label class="demo-label">${T("期末 mNAV（2026 口径，期初 2.05）：", "Ending mNAV (2026 definition, starts at 2.05): ")}<b id="dv-v-m1"></b></label><input class="demo-slider" type="range" id="dv-m1" min="0.3" max="3" step="0.05" value="${st.m1}" /></div>
        <div class="demo-block"><label class="demo-label">${T("期末优先股要求收益率（期初 10%）：", "Ending preferred required yield (starts at 10%): ")}<b id="dv-v-y"></b></label><input class="demo-slider" type="range" id="dv-y" min="6" max="25" step="0.25" value="${st.yReq}" /></div>
      </div>
      <div class="demo-block">
        <div class="demo-btns" id="dv-scn">
          <button class="demo-btn" data-s="bull">${T("牛市：+50%，溢价略扩", "Bull: +50%, premium widens a bit")}</button>
          <button class="demo-btn" data-s="flat">${T("横盘：0%", "Flat: 0%")}</button>
          <button class="demo-btn" data-s="bear">${T("熊市：−50%，溢价消失，信用利差扩大", "Bear: −50%, premium gone, spreads widen")}</button>
          <button class="demo-btn" data-s="crash">${T("崩盘：−80%", "Crash: −80%")}</button>
          <button class="demo-btn" data-s="rates">${T("比特币不动、利率大涨", "Bitcoin flat, rates surge")}</button>
        </div>
      </div>
      <div class="demo-block" id="dv-bars"></div>
      <div id="dv-chart"></div>
      <div class="demo-log" id="dv-log"></div>
      <p class="demo-tip">${T(
        "先点“熊市”：同样是比特币 −50%，ETF 亏一半，普通股亏得更多（放大 + 溢价消失），优先股却可能只小亏甚至不亏。再点“比特币不动、利率大涨”：比特币和 ETF 纹丝不动，永续优先股却跌了——这就是小林第一条新闻打到第三条新闻的方式。",
        "Click “Bear” first: with bitcoin down 50%, the ETF loses half, the common loses more (amplification plus a vanishing premium), and the preferred may lose little or nothing. Then click “Bitcoin flat, rates surge”: bitcoin and the ETF don't move, yet the perpetual preferred falls — this is how Lin's first headline hits the third."
      )}</p>
    </div>`;

  const q = (s) => root.querySelector(s);

  const outcomes = (r, fee, m1, yReq) => {
    const nav1 = BTC_NAV0 * (1 + r);
    const cash1 = CASH0 - DIV; // 一年股息从现金支付
    // 普通股：Strategy 2026 口径，价外可转债扣除；若期末股价 ≥ 转股价则按价内处理
    let nr = netReserve(nav1, CONV, PREF, cash1), px1 = m1 * nr / SH, itm = false;
    if (px1 >= CONV_PX) { nr = netReserve(nav1, 0, PREF, cash1); px1 = m1 * nr / (SH + CONV_SH); itm = true; }
    const common = px1 > 0 ? px1 / PX0 - 1 : -1;
    // 优先股 Orange-F：按要求收益率的永续定价，但不高于按清偿顺序可回收的金额
    const wf = waterfall(nav1 + cash1, [{ name: "conv", claim: CONV }, { name: "F", claim: 100 }, { name: "D", claim: 50 }]);
    const recF = wf.rows[1].recovery;
    const rating = btcRating(nav1, CONV + 100);
    const perpPx = perpetuity(10, yReq / 100);
    const prefPx = Math.min(perpPx, recF * 100);
    const pref = (prefPx + 10) / 100 - 1;
    return { direct: r, etf: (1 + r) * (1 - fee / 100) - 1, common, pref, rating, prefPx, perpPx, recF, nav1, nr, itm };
  };

  const paint = () => {
    const r = st.r / 100;
    q("#dv-v-r").textContent = (st.r >= 0 ? "+" : "") + st.r + "%";
    q("#dv-v-fee").textContent = fmtNum(st.fee, 2) + "%";
    q("#dv-v-m1").textContent = fmtNum(st.m1, 2) + "x";
    q("#dv-v-y").textContent = fmtNum(st.yReq, 2) + "%";
    const o = outcomes(r, st.fee, st.m1, st.yReq);
    const rows = [
      [T("直接持币", "Hold directly"), o.direct, "var(--blue)"],
      [T("现货 ETF", "Spot ETF"), o.etf, "var(--blue)"],
      [T("DAT 普通股（橙子公司）", "DAT common (Orange Corp)"), o.common, "var(--btc)"],
      [T("DAT 优先股（Orange-F）", "DAT preferred (Orange-F)"), o.pref, "var(--green)"],
    ];
    const maxAbs = Math.max(1, ...rows.map((x) => Math.abs(x[1])));
    q("#dv-bars").innerHTML = `<div class="demo-label">${T("投入 ", "Invest ")}${fmtUsd(st.amt)}${T("，一年后：", ", one year later: ")}</div>` + rows.map(([lab, ret, col]) => {
      const w = (Math.abs(ret) / maxAbs) * 50;
      const left = ret >= 0 ? 50 : 50 - w;
      return `<div class="bar2"><span class="lab">${lab}</span><div class="track" style="position:relative"><div style="position:absolute;left:50%;top:0;bottom:0;width:1px;background:var(--line)"></div><div class="fill" style="position:absolute;left:${left}%;width:${w}%;background:${ret >= 0 ? col : "var(--red)"}"></div></div><span class="val">${(ret >= 0 ? "+" : "") + fmtPct(ret, 1)} → ${fmtUsd(st.amt * (1 + ret))}</span></div>`;
    }).join("");

    const ch = lineChart({
      fns: [
        { f: (x) => outcomes(x / 100, st.fee, st.m1, st.yReq).etf * 100, cls: "line2" },
        { f: (x) => outcomes(x / 100, st.fee, st.m1, st.yReq).common * 100, cls: "line5" },
        { f: (x) => outcomes(x / 100, st.fee, st.m1, st.yReq).pref * 100, cls: "line4" },
      ],
      lo: -90, hi: 200, xlabel: T("比特币一年回报（%）", "Bitcoin 1-year return (%)"), markerX: st.r, markerLabel: st.r + "%", forceZero: true, uid: "dve",
    });
    q("#dv-chart").innerHTML = chartBlock(ch, [["var(--blue)", T("直接持币 ≈ ETF（%）", "Direct ≈ ETF (%)")], ["var(--btc)", T("DAT 普通股（%）", "DAT common (%)")], ["var(--green)", T("DAT 优先股（%）", "DAT preferred (%)")]]);

    const lines = [];
    lines.push(`${T("比特币净值 ", "Bitcoin NAV ")}${fmtUsd(o.nav1)}M${T("；普通股净储备 ", "; common's net reserve ")}${fmtUsd(o.nr)}M${o.itm ? T("（可转债已价内，按转股处理）", " (converts now in the money, treated as shares)") : ""}${T("；期末 mNAV ", "; ending mNAV ")}${fmtNum(st.m1, 2)}x → ${T("普通股 ", "common ")}<b>${o.common <= -1 ? T("≈ 归零", "≈ wiped out") : (o.common >= 0 ? "+" : "") + fmtPct(o.common, 1)}</b>`);
    lines.push(`Orange-F${T("：BTC 评级 ", ": BTC Rating ")}<b>${fmtNum(o.rating, 2)}x</b>${T("；按 ", "; priced at a ")}${fmtNum(st.yReq, 2)}%${T(" 要求收益率的永续价格 ", " required yield as a perpetuity: ")}${fmtUsd(o.perpPx, 2)}${o.recF < 1 ? `<span class="bad">${T("，但按清偿顺序只能回收 ", ", but seniority caps recovery at ")}${fmtPct(o.recF, 0)}${T("——垫子塌了", " — the cushion has collapsed")}</span>` : ""}${T("；加上 10 美元股息。", "; plus the $10 dividend.")}`);
    if (Math.abs(o.common - o.direct) > 0.001) lines.push(`${T("普通股与比特币的差距 ", "Gap between common and bitcoin: ")}<b>${(o.common - o.direct >= 0 ? "+" : "") + fmtPct(o.common - o.direct, 1)}</b>${T("：来自放大、股息拖累与 mNAV 变化（期初 2.05 → 期末 ", ": from amplification, dividend drag and the change in mNAV (2.05 → ")}${fmtNum(st.m1, 2)}${T("）。", ").")}`);
    lines.push(`<span class="demo-meta">${T("示意模型：ETF 只扣年费；普通股按 Strategy 2026 口径；优先股按永续定价并以清偿回收封顶；不含税。不构成投资或税务建议。", "Illustrative model: the ETF only deducts its fee; common uses Strategy's 2026 definition; the preferred is priced as a perpetuity and capped by recovery in seniority; no taxes. Not investment or tax advice.")}</span>`);
    q("#dv-log").innerHTML = lines.map((l) => `<div>${l}</div>`).join("");
  };

  const bind = (id, key) => q(id).addEventListener("input", (e) => { st[key] = +e.target.value; paint(); });
  bind("#dv-r", "r"); bind("#dv-fee", "fee"); bind("#dv-m1", "m1"); bind("#dv-y", "yReq");
  const SCN = { bull: [50, 2.3, 9.5], flat: [0, 2.05, 10], bear: [-50, 1.0, 13], crash: [-80, 0.6, 20], rates: [0, 2.05, 12.5] };
  root.querySelectorAll("#dv-scn button").forEach((b) => b.addEventListener("click", () => {
    const [r, m1, y] = SCN[b.dataset.s];
    st.r = r; st.m1 = m1; st.yReq = y;
    q("#dv-r").value = r; q("#dv-m1").value = m1; q("#dv-y").value = y;
    root.querySelectorAll("#dv-scn button").forEach((o) => o.classList.toggle("active", o === b));
    paint();
  }));
  paint();
}
