// 交互演示：规则风险三件套——
// ① 被动资金卖压估算（市值 × 被动持股比例 → 卖出天数、平方根冲击、对 mNAV 的影响）；
// ② MSCI“非经营公司”筛选模拟（按 2026 年 8 月咨询框架的事实表转述；结果截至 2026-09-26 未定）；
// ③ 标普 500 盈利测试：公允价值会计下，季末币价如何决定“四季合计为正且最近一季为正”。
import { fmtPct, fmtNum, fmtBig, clamp } from "./_fin.js";

export default function mount(root, lang) {
  const en = lang === "en";
  const T = (zh, e) => (en ? e : zh);

  const st = {
    tab: "flow",
    cap: 1.5, pas: 8, adv: 75, part: 20, vol: 4, mnav: 1.5,
    op: 40, ratios: [true, true, true, true, false], member: true, years: 1,
    btc: 10000, prices: [100000, 110000, 90000, 80000, 95000], opInc: -2,
  };

  root.innerHTML = `
    <div class="demo">
      <div class="demo-head">${T("🏛️ 规则风险台：被动卖压 · MSCI 筛选 · 标普盈利测试", "🏛️ Rule-risk desk: passive selling · the MSCI screen · the S&P profitability test")}</div>
      <div class="demo-seg" id="isr-tabs">
        <button data-t="flow" class="on">${T("① 被动资金卖压", "① Passive selling")}</button>
        <button data-t="msci">${T("② MSCI 筛选（示意）", "② MSCI screen (illustrative)")}</button>
        <button data-t="sp">${T("③ 标普盈利测试", "③ S&P profitability test")}</button>
      </div>
      <div id="isr-body"></div>
      <p class="demo-tip">${T(
        "在 ① 里把“被动持股比例”从 8% 拖到 15%，再把参与率拖到 100%（全挤在生效日），看冲击怎样吃掉 mNAV；在 ③ 里只动最后一个季末的比特币价格，看同一家公司怎样在“符合”与“不符合”标普盈利测试之间来回跳。规则风险的特点就是：公司什么都没做，结论却变了。",
        "In ①, drag passive ownership from 8% to 15%, then participation to 100% (everything on the effective date), and watch impact eat into mNAV. In ③, move only the last quarter-end bitcoin price and watch the same company flip between passing and failing the S&P profitability test. That is what rule risk looks like: the company did nothing, yet the verdict changed."
      )}</p>
    </div>`;

  const q = (s) => root.querySelector(s);
  const sl = (id, label, min, max, step, val) =>
    `<label class="demo-label">${label}${T("：", ": ")}<b id="isr-${id}-v"></b></label><input class="demo-slider" id="isr-${id}" type="range" min="${min}" max="${max}" step="${step}" value="${val}" />`;

  const renderFlow = () => {
    q("#isr-body").innerHTML = `
      <div class="demo-block">
        <div class="demo-btns">
          <button class="demo-btn" data-pre="orange">${T("橙子公司", "Orange Corp")}</button>
          <button class="demo-btn" data-pre="big">${T("大型 DAT（示意数字）", "Large DAT (illustrative numbers)")}</button>
        </div>
      </div>
      <div class="demo-grid">
        <div class="demo-block">
          ${sl("cap", T("市值（十亿美元）", "Market cap ($ billions)"), 0.2, 100, 0.1, st.cap)}
          ${sl("pas", T("跟踪该指数的被动持股比例", "Share held by passive trackers of the index"), 1, 25, 0.5, st.pas)}
          ${sl("mnav", T("剔除前 mNAV", "mNAV before deletion"), 0.5, 3, 0.05, st.mnav)}
        </div>
        <div class="demo-block">
          ${sl("adv", T("日均成交额（百万美元）", "Average daily volume ($ millions)"), 10, 5000, 5, st.adv)}
          ${sl("part", T("每天卖出占成交额比例", "Selling as a share of daily volume"), 5, 100, 5, st.part)}
          ${sl("vol", T("日波动率", "Daily volatility"), 1, 10, 0.5, st.vol)}
        </div>
      </div>
      <div class="stat-row" id="isr-stats"></div>
      <div class="demo-block"><div class="demo-log" id="isr-log"></div></div>`;
    const bind = (k) => q("#isr-" + k).addEventListener("input", (e) => { st[k] = +e.target.value; paintFlow(); });
    ["cap", "pas", "adv", "part", "vol", "mnav"].forEach(bind);
    root.querySelectorAll("[data-pre]").forEach((b) => b.addEventListener("click", () => {
      Object.assign(st, b.dataset.pre === "orange" ? { cap: 1.5, pas: 8, adv: 75, part: 20, vol: 4, mnav: 1.5 } : { cap: 50, pas: 5, adv: 2000, part: 20, vol: 5, mnav: 1.0 });
      renderFlow();
    }));
    paintFlow();
  };

  const paintFlow = () => {
    const sell = st.cap * 1e9 * st.pas / 100, adv = st.adv * 1e6, part = st.part / 100, vol = st.vol / 100;
    const days = Math.ceil(sell / (adv * part));
    const impactSpread = vol * Math.sqrt(part);            // 每天按参与率卖时的冲击
    const impactOneDay = vol * Math.sqrt(sell / adv);      // 全挤在一天
    const impact = clamp(days <= 1 ? impactOneDay : impactSpread, 0, 0.9);
    const mnavAfter = st.mnav * (1 - impact);
    q("#isr-cap-v").textContent = "$" + fmtNum(st.cap, 1) + "B";
    q("#isr-pas-v").textContent = fmtNum(st.pas, 1) + "%";
    q("#isr-adv-v").textContent = "$" + fmtNum(st.adv, 0) + "M";
    q("#isr-part-v").textContent = st.part + "%";
    q("#isr-vol-v").textContent = fmtNum(st.vol, 1) + "%";
    q("#isr-mnav-v").textContent = fmtNum(st.mnav, 2) + "x";
    q("#isr-stats").innerHTML = `
      <div class="stat"><div class="k">${T("被动卖出", "Passive selling")}</div><div class="v">${fmtBig(sell)}</div></div>
      <div class="stat"><div class="k">${T("相当于日均成交", "In days of volume")}</div><div class="v">${fmtNum(sell / adv, 1)}</div></div>
      <div class="stat"><div class="k">${T("卖完所需交易日", "Trading days to finish")}</div><div class="v">${days}</div></div>
      <div class="stat"><div class="k">${T("估算冲击", "Estimated impact")}</div><div class="v neg">${fmtPct(impact, 1)}</div></div>
      <div class="stat"><div class="k">${T("剔除后 mNAV", "mNAV after deletion")}</div><div class="v ${mnavAfter >= 1 ? "" : "neg"}">${fmtNum(mnavAfter, 2)}x</div></div>`;
    const L = [];
    L.push(`${T("全挤在生效日一天卖完的冲击约", "Impact if it all trades on the effective date: about")} ${fmtPct(clamp(impactOneDay, 0, 0.9), 1)}${T("；分", "; spread over")} ${days} ${T("天卖、每天冲击约", "days, about")} ${fmtPct(impactSpread, 1)}${T("（平方根律，示意系数 1）。", " a day (square-root law, illustrative coefficient of 1).")}`);
    if (st.mnav >= 1 && mnavAfter < 1) L.push(`<span class="bad">${T("卖压把 mNAV 推到 1 以下：增发从增值变成稀释，飞轮停转（阶段 18.3）。", "The selling pushes mNAV below 1: issuance flips from accretive to dilutive and the flywheel stops.")}</span>`);
    else if (mnavAfter < 1) L.push(`<span class="warn">${T("mNAV 本来就低于 1，卖压让折价更深，卖币回购的诱惑更大。", "mNAV was already below 1; the selling deepens the discount and strengthens the pull toward selling bitcoin to buy back stock.")}</span>`);
    else L.push(`<span class="ok">${T("mNAV 仍在 1 以上，飞轮还有燃料，但少了一截。", "mNAV stays above 1; the flywheel still has fuel, just less of it.")}</span>`);
    L.push(`${T("注意：主动投资者会在公告后抢跑，冲击常常在生效日之前就体现。“大型 DAT”预设的数字是示意，不是任何公司的真实数据。", "Note: active investors front-run after the announcement, so impact often shows up before the effective date. The “large DAT” preset uses illustrative numbers, not any company's real data.")}`);
    q("#isr-log").innerHTML = L.map((l) => `<div>${l}</div>`).join("");
  };

  const renderMsci = () => {
    q("#isr-body").innerHTML = `
      <div class="demo-grid">
        <div class="demo-block">
          ${sl("op", T("经营性资产占总资产比例", "Operating assets as a share of total assets"), 0, 100, 1, st.op)}
          <label class="demo-label">${T("是否已是指数成分股", "Already an index constituent?")}</label>
          <div class="demo-seg" id="isr-member">
            <button data-v="1" class="${st.member ? "on" : ""}">${T("是", "Yes")}</button>
            <button data-v="0" class="${st.member ? "" : "on"}">${T("否（新纳入）", "No (new addition)")}</button>
          </div>
          <label class="demo-label">${T("已连续不达标年数", "Consecutive years failing")}</label>
          <div class="demo-seg" id="isr-years">${[0, 1, 2].map((y) => `<button data-v="${y}" class="${st.years === y ? "on" : ""}">${y}</button>`).join("")}</div>
        </div>
        <div class="demo-block">
          <label class="demo-label">${T("触发了哪些比率（5 个比率的具体定义见 MSCI 咨询文件）", "Which ratios are tripped (see MSCI's consultation for the five definitions)")}</label>
          <div class="demo-btns" id="isr-ratios">${st.ratios.map((r, i) => `<button class="demo-btn${r ? " active" : ""}" data-i="${i}">${T("比率 ", "Ratio ")}${i + 1}</button>`).join("")}</div>
        </div>
      </div>
      <div class="demo-block"><div class="demo-log" id="isr-log"></div></div>`;
    q("#isr-op").addEventListener("input", (e) => { st.op = +e.target.value; paintMsci(); });
    root.querySelectorAll("#isr-member button").forEach((b) => b.addEventListener("click", () => { st.member = b.dataset.v === "1"; renderMsci(); }));
    root.querySelectorAll("#isr-years button").forEach((b) => b.addEventListener("click", () => { st.years = +b.dataset.v; renderMsci(); }));
    root.querySelectorAll("#isr-ratios button").forEach((b) => b.addEventListener("click", () => { st.ratios[+b.dataset.i] = !st.ratios[+b.dataset.i]; renderMsci(); }));
    paintMsci();
  };

  const paintMsci = () => {
    q("#isr-op-v").textContent = st.op + "%";
    const failCore = st.op <= 50;
    const tripped = st.ratios.filter(Boolean).length;
    const flagged = failCore && tripped >= 4;
    const L = [];
    L.push(`${T("核心筛选（经营性资产 > 50%）", "Core screen (operating assets > 50%)")}${T("：", ": ")}<b>${failCore ? T("不通过", "fail") : T("通过", "pass")}</b> · ${T("触发比率", "ratios tripped")} <b>${tripped}/5</b>`);
    if (!flagged) L.push(`<span class="ok">${T("不满足剔除条件（需要核心筛选不通过且至少 4 个比率触发）。", "Not flagged for exclusion (that requires failing the core screen and tripping at least 4 ratios).")}</span>`);
    else if (!st.member) L.push(`<span class="bad">${T("被判定为“非经营公司”：作为新公司不具备纳入资格。", "Classed as a “non-operating company”: ineligible as a new addition.")}</span>`);
    else if (st.years + 1 >= 2) L.push(`<span class="bad">${T("现有成分股连续第二年不达标：按咨询框架将被移出，被动资金需要卖出。", "An existing constituent failing for a second consecutive year: under the consultation framework it would be removed, and passive funds would have to sell.")}</span>`);
    else L.push(`<span class="warn">${T("现有成分股第一年不达标：按框架暂不移出，但下一年再不达标就会被移出。", "An existing constituent failing for the first year: not removed yet under the framework, but a second failing year would remove it.")}</span>`);
    L.push(`${T("框架来自事实表对 MSCI 2026 年 8 月咨询文件的转述，未逐行复核；结果预计 2026-10-16 前公布，截至 2026-09-26 未定。以 MSCI 官方公告为准。", "The framework is our fact sheet's reading of MSCI's August 2026 consultation, not re-checked line by line; the verdict is due by 2026-10-16 and was pending as of 2026-09-26. Rely on MSCI's official announcement.")}`);
    q("#isr-log").innerHTML = L.map((l) => `<div>${l}</div>`).join("");
  };

  const renderSp = () => {
    const qn = [T("上季末", "Prior quarter-end"), "Q1", "Q2", "Q3", "Q4"];
    q("#isr-body").innerHTML = `
      <div class="demo-grid">
        <div class="demo-block">
          ${st.prices.map((p, i) => sl("p" + i, qn[i] + T(" 比特币价格", " bitcoin price"), 30000, 200000, 1000, p)).join("")}
        </div>
        <div class="demo-block">
          ${sl("btc", T("持有比特币", "Bitcoin held"), 1000, 50000, 500, st.btc)}
          ${sl("opInc", T("每季经营与其他损益（百万美元）", "Operating and other income per quarter ($ millions)"), -50, 50, 1, st.opInc)}
          <div id="isr-bars" style="margin-top:10px"></div>
        </div>
      </div>
      <div class="demo-block"><div class="demo-log" id="isr-log"></div></div>`;
    st.prices.forEach((_, i) => q("#isr-p" + i).addEventListener("input", (e) => { st.prices[i] = +e.target.value; paintSp(); }));
    q("#isr-btc").addEventListener("input", (e) => { st.btc = +e.target.value; paintSp(); });
    q("#isr-opInc").addEventListener("input", (e) => { st.opInc = +e.target.value; paintSp(); });
    paintSp();
  };

  const paintSp = () => {
    st.prices.forEach((p, i) => { q("#isr-p" + i + "-v").textContent = "$" + fmtNum(p, 0); });
    q("#isr-btc-v").textContent = fmtNum(st.btc, 0) + " BTC";
    q("#isr-opInc-v").textContent = "$" + st.opInc + "M";
    const ni = [1, 2, 3, 4].map((i) => st.btc * (st.prices[i] - st.prices[i - 1]) + st.opInc * 1e6);
    const sum = ni.reduce((a, b) => a + b, 0), latest = ni[3];
    const pass = sum > 0 && latest > 0;
    const maxAbs = Math.max(...ni.map(Math.abs), 1);
    q("#isr-bars").innerHTML = ni.map((v, i) => `<div class="bar2"><div class="lab">Q${i + 1}</div><div class="track"><div class="fill" style="width:${(Math.abs(v) / maxAbs * 100).toFixed(1)}%;background:${v >= 0 ? "var(--green)" : "var(--red)"}"></div></div><div class="val">${v >= 0 ? "+" : ""}${fmtBig(v)}</div></div>`).join("");
    const L = [];
    L.push(`${T("四季合计净利润", "Four-quarter net income")}${T("：", ": ")}<b>${sum >= 0 ? "+" : ""}${fmtBig(sum)}</b> · ${T("最近一季", "latest quarter")}${T("：", ": ")}<b>${latest >= 0 ? "+" : ""}${fmtBig(latest)}</b>`);
    L.push(pass
      ? `<span class="ok">${T("满足标普 500 的 GAAP 盈利门槛（纳入仍需委员会裁量）。", "Meets the S&P 500 GAAP profitability hurdle (inclusion still needs committee approval).")}</span>`
      : `<span class="bad">${T("不满足盈利门槛：需要四季合计为正且最近一季为正。", "Fails the profitability hurdle: it needs a positive four-quarter sum and a positive latest quarter.")}</span>`);
    L.push(`${T("公允价值会计下，每季利润 ≈ 持币量 × 季内币价变化 + 经营损益。Strategy 2026 年第一、二季度净亏损约 125.4 亿与 82.2 亿美元。示意计算，忽略税与其他项目。", "Under fair-value accounting, quarterly profit ≈ bitcoin held × the quarter's price change + operating results. Strategy lost about $12.54B and $8.22B in Q1 and Q2 2026. Illustrative; taxes and other items ignored.")}`);
    q("#isr-log").innerHTML = L.map((l) => `<div>${l}</div>`).join("");
  };

  const render = () => {
    root.querySelectorAll("#isr-tabs button").forEach((o) => o.classList.toggle("on", o.dataset.t === st.tab));
    if (st.tab === "flow") renderFlow(); else if (st.tab === "msci") renderMsci(); else renderSp();
  };
  root.querySelectorAll("#isr-tabs button").forEach((b) => b.addEventListener("click", () => { st.tab = b.dataset.t; render(); }));
  render();
}
