// 交互演示：DAT 分析师清单——输入任何一家 DAT 的数字（或用预设：橙子公司 / Strategy 2026-08-21/23 简报 / Strive 2026-09-18），
// 引擎（_fin.js）算出每股比特币、两种 mNAV、两种放大、各层 BTC 评级与地板价、BTC Risk/Credit、覆盖月数、Breakeven ARR、回售缺口，
// 十个问题逐题亮灯（阈值是本课的经验规则，不是行业标准），并生成一页可复制的分析摘要草稿。
import { btcNav, mnavBasic, mnavNetBps, amplificationStrategy, striveAmpRatio, coverageByLayer, btcFloorPrice, btcRiskProb, btcCredit, monthsCovered, breakevenArr, fmtPct, fmtNum, fmtUsd, fmtBig, tex } from "./_fin.js";

// 把格式化好的数字放进 LaTeX：$ → \$，千分位 , → {,}，% → \%
const texv = (s) => String(s).replace(/\$/g, "\\$").replace(/,/g, "{,}").replace(/%/g, "\\%");
const texBig = (x) => (x < 0 ? "-" : "") + String.raw`\$${fmtBig(Math.abs(x)).replace(/([TBMK])$/, "\\text{$1}")}`;

export default function mount(root, lang) {
  const en = lang === "en";
  const T = (zh, e) => (en ? e : zh);

  const PRESETS = {
    orange: {
      name: T("橙子公司（示意）", "Orange Corp (illustrative)"), asof: T("示意", "illustrative"),
      btc: 10000, px: 100000, basicSh: 100, fdSh: 100, price: 15, debt: 150, prefS: 100, prefJ: 50, usd: 30, reserve: 30, oblig: 15, put24: 150, bpsChg: 4.5, y30: 5.49, btcDD: 20,
      secured: false, netUsd: false, dual: false, key: false, controller: false, pending: false, open: true, rising: true,
    },
    strategy: {
      name: "Strategy", asof: T("2026-08-21/23 简报（FWP）；回售为 24 个月内", "2026-08-21/23 briefing (FWP); puts within 24 months"),
      btc: 840447, px: 77004, basicSh: 415.9, fdSh: 419.9, price: 119.25, debt: 6754, prefS: 11256, prefJ: 3710, usd: 6690, reserve: 5100, oblig: 1703, put24: 4510, bpsChg: 4.5, y30: 5.49, btcDD: 39,
      secured: false, netUsd: true, dual: true, key: true, controller: false, pending: true, open: true, rising: true,
    },
    strive: {
      name: "Strive", asof: T("持仓 2026-09-18，价格 2026-09-25", "holdings 2026-09-18, prices 2026-09-25"),
      btc: 26355, px: 84080, basicSh: 97.0, fdSh: 100.14, price: 29.44, debt: 0, prefS: 1118, prefJ: 0, usd: 229.6, reserve: 229.6, oblig: 145.39, put24: 0, bpsChg: 54.5, y30: 5.49, btcDD: 33,
      secured: false, netUsd: false, dual: false, key: false, controller: false, pending: false, open: true, rising: true,
    },
  };
  const st = { ...PRESETS.orange };

  const NUM = [
    ["btc", T("持有比特币（枚）", "Bitcoin held (coins)")],
    ["px", T("比特币价格（美元）", "Bitcoin price ($)")],
    ["price", T("股价（美元）", "Share price ($)")],
    ["basicSh", T("基本股数（百万）", "Basic shares (millions)")],
    ["fdSh", T("完全稀释股数（百万，只算价内）", "Fully diluted shares (millions, in-the-money only)")],
    ["debt", T("债务名义额（百万美元）", "Debt notional ($ millions)")],
    ["prefS", T("高级优先股（百万美元）", "Senior preferred ($ millions)")],
    ["prefJ", T("次级优先股（百万美元）", "Junior preferred ($ millions)")],
    ["usd", T("美元资产合计（百万美元）", "Total USD assets ($ millions)")],
    ["reserve", T("专用美元储备（百万美元）", "Dedicated USD reserve ($ millions)")],
    ["oblig", T("年度利息与股息（百万美元）", "Annual interest and dividends ($ millions)")],
    ["put24", T("24 个月内可回售的价外债务（百万美元）", "Out-of-the-money debt puttable within 24 months ($ millions)")],
    ["bpsChg", T("每股比特币近期变化（%）", "Recent change in bitcoin per share (%)")],
    ["y30", T("30 年期国债收益率（%）", "30-year Treasury yield (%)")],
    ["btcDD", T("比特币距历史高点跌幅（%）", "Bitcoin's fall from its all-time high (%)")],
  ];
  const FLAGS = [
    ["secured", T("有以比特币质押的借款", "Bitcoin-secured borrowing")],
    ["netUsd", T("用美元资产抵减债务（Strategy 算法）", "Net USD assets against debt (Strategy method)")],
    ["dual", T("双重股权 / 超级投票权", "Dual-class / super-voting shares")],
    ["key", T("关键人物风险高", "High key-person risk")],
    ["controller", T("有控股股东", "Controlling shareholder")],
    ["pending", T("有待决的指数 / 税务 / 监管决定", "Pending index / tax / regulatory decision")],
    ["open", T("资本市场对它开放", "Capital markets open to it")],
    ["rising", T("长端收益率在上升", "Long yields rising")],
  ];

  const inp = "width:100%;padding:6px 8px;border:1px solid var(--line);border-radius:6px;background:var(--surface-2);color:var(--ink);font:inherit";
  root.innerHTML = `
    <div class="demo">
      <div class="demo-head">${T("✅ DAT 分析师清单：十个问题，一页结论", "✅ The DAT analyst's checklist: ten questions, one page")}</div>
      <div class="demo-block">
        <label class="demo-label">${T("预设（也可以直接改下面任何一个数字，分析任何一家 DAT）", "Preset (or edit any number below to analyze any DAT)")}</label>
        <div class="demo-seg" id="chk-preset">
          <button data-p="orange" class="on">${T("橙子公司", "Orange Corp")}</button>
          <button data-p="strategy">Strategy</button>
          <button data-p="strive">Strive</button>
        </div>
        <div class="demo-meta" id="chk-asof"></div>
      </div>
      <div class="demo-grid-3" id="chk-inputs">${NUM.map(([k, l]) => `<div class="demo-block"><label class="demo-label">${l}</label><input id="chk-${k}" type="number" step="any" style="${inp}" /></div>`).join("")}</div>
      <div class="demo-block"><div class="demo-btns" id="chk-flags">${FLAGS.map(([k, l]) => `<button class="demo-btn" data-f="${k}">${l}</button>`).join("")}</div></div>
      <div class="stat-row" id="chk-stats"></div>
      <div class="demo-block"><div class="demo-label">${T("十个问题", "Ten questions")}</div><div class="demo-log" id="chk-log"></div></div>
      <div class="demo-block">
        <div class="demo-label">${T("一页摘要草稿（可复制，再补上你自己的判断）", "One-page summary draft (copy it, then add your own judgment)")}</div>
        <textarea id="chk-report" readonly style="${inp};height:280px;font-family:ui-monospace,Menlo,Consolas,monospace;font-size:12px;line-height:1.5"></textarea>
        <div class="demo-btns" style="margin-top:8px"><button class="demo-btn" id="chk-copy">${T("复制摘要", "Copy summary")}</button></div>
      </div>
      <p class="demo-tip">${T(
        "先点 Strategy：注意第 3 问（2026 口径 mNAV 约 1.01）与第 7 问（24 个月内约 45 亿美元回售）亮黄灯；再点 Strive：没有回售墙，但第 5 问的覆盖更薄。然后关掉“资本市场开放”，看第 8 问怎样随储备月数变色。灯号用的是本课的经验阈值，不是评级，也不是买卖建议——它的价值在于让你不漏掉任何一问。",
        "Click Strategy first: question 3 (2026-definition mNAV about 1.01) and question 7 (about $4.5B of puts within 24 months) turn amber. Click Strive: no put wall, but thinner coverage on question 5. Then switch off “capital markets open” and watch question 8 change color with the reserve's months. The lights use this lesson's rules of thumb; they are not a rating and not a recommendation. Their value is that you don't skip a question."
      )}</p>
    </div>`;

  const q = (s) => root.querySelector(s);

  const sync = () => {
    NUM.forEach(([k]) => { q("#chk-" + k).value = st[k]; });
    root.querySelectorAll("#chk-flags button").forEach((b) => b.classList.toggle("active", !!st[b.dataset.f]));
    q("#chk-asof").textContent = T("数据日期", "Data as of") + T("：", ": ") + st.asof;
  };

  const light = (c) => (c === "g" ? T("🟢 绿", "🟢 green") : c === "y" ? T("🟡 黄", "🟡 amber") : T("🔴 红", "🔴 red"));
  const cls = (c) => (c === "g" ? "ok" : c === "y" ? "warn" : "bad");

  const paint = () => {
    const M = 1e6;
    const nav = btcNav(st.btc, st.px);
    const debt = st.debt * M, prefS = st.prefS * M, prefJ = st.prefJ * M, usd = st.usd * M, pref = prefS + prefJ;
    const sats = (st.btc / (st.fdSh * M)) * 1e8;
    const mB = mnavBasic(st.price * st.basicSh * M, st.btc, st.px);
    const m26 = mnavNetBps(st.price, nav, debt, pref, usd, st.fdSh * M);
    const ampS = amplificationStrategy(nav, debt, pref, usd);
    const ampV = striveAmpRatio(debt, pref, nav);
    const debtEff = st.netUsd ? Math.max(0, debt - usd) : debt;
    const layers = [{ name: st.netUsd ? T("净债务（扣美元资产）", "Net debt (after USD assets)") : T("债务", "Debt"), claim: debtEff }, { name: T("高级优先股", "Senior preferred"), claim: prefS }, { name: T("次级优先股", "Junior preferred"), claim: prefJ }].filter((l) => l.claim > 0);
    const cov = coverageByLayer(nav, layers);
    const jr = cov.length ? cov[cov.length - 1] : { name: "–", coverage: Infinity };
    const floor = isFinite(jr.coverage) ? btcFloorPrice(st.px, jr.coverage) : 0;
    const risk = isFinite(jr.coverage) ? btcRiskProb(jr.coverage, 0.10, 0.40, 10) : 0;
    const credit = risk > 0 ? btcCredit(risk, 10) : 0;
    const months = st.oblig > 0 ? monthsCovered(st.reserve * M, st.oblig * M) : Infinity;
    const be = breakevenArr(st.oblig * M, nav);
    const putBtcShare = st.put24 * M / st.px / st.btc;
    const putGap = Math.max(0, st.put24 * M - usd) / nav;

    q("#chk-stats").innerHTML = `
      <div class="stat"><div class="k">${T("BTC 储备", "BTC Reserve")}</div><div class="v">${fmtBig(nav)}</div></div>
      <div class="stat"><div class="k">${T("每股聪数（完全稀释）", "Sats per share (fully diluted)")}</div><div class="v">${fmtNum(sats, 0)}</div></div>
      <div class="stat"><div class="k">${T("mNAV 市值 / 2026 净口径", "mNAV basic / 2026 net")}</div><div class="v acc">${fmtNum(mB, 2)} / ${isFinite(m26) && m26 > 0 ? fmtNum(m26, 2) : "–"}</div></div>
      <div class="stat"><div class="k">${T("最劣后层覆盖", "Most junior coverage")}</div><div class="v">${isFinite(jr.coverage) ? fmtNum(jr.coverage, 2) + "x" : T("无优先层", "no senior layers")}</div></div>
      <div class="stat"><div class="k">${T("储备月数 / Breakeven ARR", "Reserve months / Breakeven ARR")}</div><div class="v">${isFinite(months) ? fmtNum(months, 0) : "∞"} / ${fmtPct(be, 2)}</div></div>`;

    const Q = [];
    // 1
    Q.push([st.secured ? "r" : "g", T("1. 持有什么、放在哪里", "1. What it holds, and where"),
      `${fmtNum(st.btc, 0)} BTC ${T("（占 2,100 万枚的", "(")}${fmtPct(st.btc / 21e6, 3)}${T("）", " of the 21M cap)")}${T("；", "; ")}${st.secured ? T("有比特币质押借款——唯一可能被追加保证金的环节", "bitcoin-secured borrowing: the one link that can face a margin call") : T("无比特币质押", "no bitcoin pledged")}`]);
    // 2
    Q.push([st.bpsChg > 0 ? "g" : st.bpsChg > -5 ? "y" : "r", T("2. 每股比特币的趋势", "2. Trend in bitcoin per share"),
      `${st.bpsChg > 0 ? "+" : ""}${fmtNum(st.bpsChg, 1)}%${T("；追问来源：溢价增发、优先股，还是卖币与非买币增发", "; ask where it came from: premium issuance, preferreds, or coin sales and non-bitcoin issuance")}`]);
    // 3
    Q.push([m26 >= 1.2 ? "g" : m26 >= 0.95 ? "y" : "r", T("3. mNAV 与口径", "3. mNAV and its definition"),
      `${T("市值口径", "basic")} ${fmtNum(mB, 2)}x · ${T("2026 净口径", "2026 net")} ${isFinite(m26) && m26 > 0 ? fmtNum(m26, 2) + "x" : T("净储备为负", "negative net reserve")}${T("（净口径接近 1，即增发不再增值）", " (net near 1 means issuance is no longer accretive)")}`]);
    // 4
    const a4 = !isFinite(ampS) || ampS <= 0 ? "r" : ampS <= 1.5 ? "g" : ampS <= 2.5 ? "y" : "r";
    Q.push([a4, T("4. 杠杆（两种公式）", "4. Leverage (two formulas)"),
      `${T("Strategy 式", "Strategy-style")} ${isFinite(ampS) && ampS > 0 ? fmtNum(ampS, 2) + "x" : T("净储备 ≤ 0", "net reserve ≤ 0")} · ${T("Strive 式", "Strive-style")} ${fmtPct(ampV, 1)}`]);
    // 5
    const c5 = !isFinite(jr.coverage) || jr.coverage * 0.5 >= 1 ? "g" : jr.coverage >= 1.5 ? "y" : "r";
    Q.push([c5, T("5. 各层覆盖", "5. Coverage by layer"),
      cov.map((r) => `${r.name} ${fmtNum(r.coverage, 2)}x`).join(" · ") + (isFinite(jr.coverage) ? `${T("；最劣后层地板价", "; most junior floor price")} ${fmtUsd(floor, 0)}${T("，BTC Credit 约", ", BTC Credit about")} ${fmtNum(credit * 1e4, 0)} bp${T("（40% 波动、10% ARR、10 年）", " (40% vol, 10% ARR, 10 years)")}${st.netUsd ? T("；已用美元资产抵减债务", "; USD assets netted against debt") : ""}` : "")]);
    // 6
    Q.push([months >= 24 ? "g" : months >= 12 ? "y" : "r", T("6. 义务与储备", "6. Obligations and reserve"),
      `${T("年度", "annual")} ${fmtBig(st.oblig * M)} · ${T("储备", "reserve")} ${isFinite(months) ? fmtNum(months, 0) : "∞"} ${T("个月", "months")} · Breakeven ARR ${fmtPct(be, 2)}`]);
    // 7
    Q.push([putGap <= 0.05 ? (st.put24 > 0 ? "y" : "g") : putGap <= 0.2 ? "y" : "r", T("7. 工具、顺序与到期", "7. Instruments, seniority, maturities"),
      st.put24 > 0 ? `${T("24 个月内可回售", "puttable within 24 months")} ${fmtBig(st.put24 * M)}${T("，相当于持仓的", ", equal to")} ${fmtPct(putBtcShare, 1)}${T("；扣除美元资产后的缺口占 BTC 储备的", " of holdings; the gap after USD assets is")} ${fmtPct(putGap, 1)}${T("", " of the BTC Reserve")}` : T("24 个月内没有回售或到期", "no puts or maturities within 24 months")]);
    // 8
    const c8 = st.open ? (m26 > 1 ? "g" : "y") : (months >= 12 ? "y" : "r");
    Q.push([c8, T("8. 融资渠道", "8. Access to funding"),
      `${st.open ? T("市场开放", "markets open") : T("市场关闭", "markets shut")} · ${T("净口径 mNAV", "net mNAV")} ${isFinite(m26) && m26 > 0 ? fmtNum(m26, 2) + "x" : "–"}${!st.open ? T("；只能靠储备与卖币", "; only the reserve and coin sales remain") : ""}`]);
    // 9
    const f9 = [st.dual, st.key, st.controller, st.pending].filter(Boolean).length;
    Q.push([f9 <= 1 ? "g" : f9 === 2 ? "y" : "r", T("9. 治理与规则", "9. Governance and rules"),
      `${f9} ${T("项标记", "flags")}${T("：", ": ")}${[st.dual && T("双重股权", "dual-class"), st.key && T("关键人物", "key person"), st.controller && T("控股股东", "controlling holder"), st.pending && T("待决规则", "pending rule")].filter(Boolean).join(T("、", ", ")) || T("无", "none")}`]);
    // 10
    const h10 = [st.y30 >= 5, st.rising, st.btcDD >= 30].filter(Boolean).length;
    Q.push([h10 === 0 ? "g" : h10 < 3 ? "y" : "r", T("10. 宏观环境", "10. Macro environment"),
      `${T("30 年期", "30-year")} ${fmtNum(st.y30, 2)}%${st.rising ? T("（上升中）", " (rising)") : ""} · ${T("比特币距高点", "bitcoin below its high by")} ${fmtNum(st.btcDD, 0)}% · ${h10} ${T("项逆风", "headwinds")}`]);

    // 公式读数（只显示在页面上，不进入纯文本摘要）
    const netRes = nav - debt - pref + usd;
    const F = [
      `${tex(String.raw`\text{${T("净储备", "Net Reserve")}} = ${texBig(nav)} - ${texBig(debt)} - ${texBig(pref)} + ${texBig(usd)} = ${texBig(netRes)}`)}`,
      netRes > 0 ? `${tex(String.raw`\mathrm{mNAV}_{2026} = \dfrac{\text{${T("股价", "share price")}}}{\text{${T("净储备", "Net Reserve")}} \div \text{${T("完全稀释股数", "fully diluted shares")}}} = \dfrac{${texv(fmtUsd(st.price, 2))}}{${texv(fmtUsd(netRes / (st.fdSh * M), 2))}} = ${texv(fmtNum(m26, 2))}\times`)}` : "",
      st.oblig > 0 ? `${tex(String.raw`\text{${T("覆盖月数", "Months of coverage")}} = \dfrac{${texBig(st.reserve * M)}}{${texBig(st.oblig * M)}} \times 12 = ${texv(fmtNum(months, 0))}`)}${T("；", "; ")}${tex(String.raw`\text{Breakeven ARR} = \dfrac{${texBig(st.oblig * M)}}{${texBig(nav)}} = ${texv(fmtPct(be, 2))}`)}` : "",
    ].filter(Boolean);
    q("#chk-log").innerHTML = Q.map(([c, t, d]) => `<div><span class="${cls(c)}">${light(c)}</span> <b>${t}</b>${T("：", ": ")}${d}</div>`).join("") + F.map((f) => `<div>${f}</div>`).join("");

    const reds = Q.filter((x) => x[0] === "r").map((x) => x[1]);
    const greens = Q.filter((x) => x[0] === "g").map((x) => x[1]);
    const rep = [
      `${T("DAT 分析摘要（草稿）", "DAT analysis summary (draft)")} · ${st.name} · ${T("数据日期", "data as of")}${T("：", ": ")}${st.asof}`,
      `${T("一句话画像", "Profile")}${T("：", ": ")}${T("持有", "holds")} ${fmtNum(st.btc, 0)} BTC${T("（BTC 储备", " (BTC Reserve ")}${fmtBig(nav)}${T("）", ")")}${T("，债务", ", debt ")}${fmtBig(debt)}${T("，优先股", ", preferred ")}${fmtBig(pref)}${T("，30 年期国债", ", 30-year Treasury at ")}${fmtNum(st.y30, 2)}%${T("。", ".")}`,
      "",
      ...Q.map(([c, t, d]) => `[${c === "g" ? "G" : c === "y" ? "A" : "R"}] ${t}${T("：", ": ")}${d.replace(/<[^>]+>/g, "")}`),
      "",
      `${T("相对坚实", "Relatively solid")}${T("：", ": ")}${greens.join(T("；", "; ")) || "–"}`,
      `${T("需要关注", "Needs attention")}${T("：", ": ")}${reds.join(T("；", "; ")) || "–"}`,
      `${T("要盯的数字与日期", "Numbers and dates to watch")}${T("：", ": ")}${T("每周持仓与储备、优先股价格、下一个回售日、下一个指数 / 税务决定日", "weekly holdings and reserve, preferred prices, the next put date, the next index or tax decision date")}`,
      `${T("最强支持论证（请补充）", "Strongest supporting arguments (add yours)")}${T("：", ": ")}1. 2. 3.`,
      `${T("最强批评论证（请先写）", "Strongest critical arguments (write these first)")}${T("：", ": ")}1. 2. 3.`,
      "",
      T("灯号为课程经验阈值，不是评级。本摘要只讲机制与分析框架，不构成投资建议。", "Lights use the course's rules of thumb and are not a rating. This summary covers mechanisms and analytical frameworks only; it is not investment advice."),
    ];
    q("#chk-report").value = rep.join("\n");
  };

  NUM.forEach(([k]) => q("#chk-" + k).addEventListener("input", (e) => { const v = parseFloat(e.target.value); if (isFinite(v)) { st[k] = v; paint(); } }));
  root.querySelectorAll("#chk-flags button").forEach((b) => b.addEventListener("click", () => { st[b.dataset.f] = !st[b.dataset.f]; b.classList.toggle("active", st[b.dataset.f]); paint(); }));
  root.querySelectorAll("#chk-preset button").forEach((b) => b.addEventListener("click", () => {
    Object.assign(st, PRESETS[b.dataset.p]);
    root.querySelectorAll("#chk-preset button").forEach((o) => o.classList.toggle("on", o === b));
    sync(); paint();
  }));
  q("#chk-copy").addEventListener("click", () => {
    const ta = q("#chk-report");
    ta.select();
    try { navigator.clipboard.writeText(ta.value).catch(() => {}); } catch (e) { /* 已选中文本，可手动复制 */ }
    q("#chk-copy").textContent = T("已复制", "Copied");
    setTimeout(() => { q("#chk-copy").textContent = T("复制摘要", "Copy summary"); }, 1500);
  });
  sync();
  paint();
}
