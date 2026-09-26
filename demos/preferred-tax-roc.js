// 交互演示：ROC 成本基础追踪器（美国个人投资者、应税账户、联邦税率示意；不是税务建议）。
// 每年分配 = 名义 100 × 股息率；其中“资本返还”比例冲减成本基础，冲减到 0 之后的部分当年按资本利得计税；
// 其余为股息（按普通收入或合格股息税率）。卖出时：卖价 − 调整后成本基础 = 资本利得。
// 与“全部按股息计税”对比：税款总额、税款现值（npv）、税后总收益、成本基础路径。
import { npv, fmtPct, fmtNum, fmtUsd, tex } from "./_fin.js";
import { lineChart, chartBlock } from "./_chart.js";

const texv = (s) => String(s).replace(/\$/g, "\\$").replace(/,/g, "{,}").replace(/%/g, "\\%");

export default function mount(root, lang) {
  const en = lang === "en";
  const T = (zh, e) => (en ? e : zh);

  const st = { buy: 100, rate: 10, roc: 100, years: 5, sell: 100, ord: 32, ltcg: 15, divType: "ord", disc: 5 };

  root.innerHTML = `
    <div class="demo">
      <div class="demo-head">${T("🧾 资本返还（ROC）成本基础追踪器", "🧾 Return-of-capital (ROC) cost-basis tracker")}</div>
      <div class="demo-grid">
        <div class="demo-block">
          <label class="demo-label">${T("买入价（名义 100）", "Purchase price (stated 100)")}${T("：", ": ")}<b id="rc-buy-v"></b></label>
          <input class="demo-slider" id="rc-buy" type="range" min="60" max="110" step="1" value="${st.buy}" />
          <label class="demo-label">${T("股息率（按名义 100）", "Dividend rate (on stated 100)")}${T("：", ": ")}<b id="rc-rate-v"></b></label>
          <input class="demo-slider" id="rc-rate" type="range" min="8" max="13" step="0.25" value="${st.rate}" />
          <label class="demo-label">${T("每笔分配中资本返还的比例", "Share of each distribution that is ROC")}${T("：", ": ")}<b id="rc-roc-v"></b></label>
          <input class="demo-slider" id="rc-roc" type="range" min="0" max="100" step="5" value="${st.roc}" />
        </div>
        <div class="demo-block">
          <label class="demo-label">${T("持有年数", "Years held")}${T("：", ": ")}<b id="rc-yrs-v"></b></label>
          <input class="demo-slider" id="rc-yrs" type="range" min="1" max="20" step="1" value="${st.years}" />
          <label class="demo-label">${T("卖出价", "Sale price")}${T("：", ": ")}<b id="rc-sell-v"></b></label>
          <input class="demo-slider" id="rc-sell" type="range" min="50" max="120" step="1" value="${st.sell}" />
          <label class="demo-label">${T("普通收入边际税率", "Ordinary-income marginal rate")}${T("：", ": ")}<b id="rc-ord-v"></b></label>
          <input class="demo-slider" id="rc-ord" type="range" min="10" max="37" step="1" value="${st.ord}" />
        </div>
      </div>
      <div class="demo-grid">
        <div class="demo-block">
          <label class="demo-label">${T("长期资本利得税率", "Long-term capital gains rate")}</label>
          <div class="demo-seg" id="rc-lt">${[0, 15, 20].map((v) => `<button data-v="${v}" class="${v === st.ltcg ? "on" : ""}">${v}%</button>`).join("")}</div>
        </div>
        <div class="demo-block">
          <label class="demo-label">${T("非 ROC 部分（股息）怎么计税", "How the non-ROC (dividend) part is taxed")}</label>
          <div class="demo-seg" id="rc-dt">
            <button data-d="ord" class="on">${T("普通收入", "Ordinary income")}</button>
            <button data-d="qual">${T("合格股息", "Qualified dividend")}</button>
          </div>
        </div>
      </div>
      <div class="stat-row" id="rc-stats"></div>
      <div class="cmp" id="rc-cmp"></div>
      <div class="demo-block" id="rc-chart"></div>
      <div class="demo-block"><div class="demo-log" id="rc-log"></div></div>
      <p class="demo-tip">${T(
        "把持有年数拖到 12 年：成本基础在第 10 年触到 0，之后每年的“资本返还”当年就按资本利得计税。再把普通收入税率拖到 37%、切换股息计税方式：ROC 的优势来自“递延 + 税率转换”，边际税率越高越明显。这是示意计算，不是税务建议；真实处理以 1099-DIV 与专业意见为准。",
        "Drag years held to 12: basis hits 0 in year 10, and after that each year's “return of capital” is taxed as a capital gain when received. Then drag the ordinary rate to 37% and switch the dividend treatment: ROC's edge comes from deferral plus rate conversion, and grows with your marginal rate. This is an illustration, not tax advice; the 1099-DIV and professional advice govern."
      )}</p>
    </div>`;

  const q = (s) => root.querySelector(s);

  // 模拟：rocShare 为 0–1；返回逐年税款现金流与成本基础路径
  const simulate = (rocShare) => {
    const D = st.rate, divRate = (st.divType === "qual" ? st.ltcg : st.ord) / 100, lt = st.ltcg / 100;
    let basis = st.buy, zeroYear = null;
    const basisPath = [basis], taxFlows = [], cumTax = [0];
    let totalTax = 0;
    for (let t = 1; t <= st.years; t++) {
      const rocPart = D * rocShare, divPart = D - rocPart;
      const cut = Math.min(basis, rocPart), excess = rocPart - cut;
      basis -= cut;
      if (basis <= 1e-9 && zeroYear === null && rocPart > 0) zeroYear = t;
      let tax = divPart * divRate + excess * (t > 1 ? lt : st.ord / 100); // 持有不足一年的利得按短期（普通）税率
      if (t === st.years) tax += (st.sell - basis) * (st.years > 1 ? lt : st.ord / 100); // 卖出（亏损时为负，示意）
      taxFlows.push({ t, cf: tax }); totalTax += tax; cumTax.push(totalTax); basisPath.push(basis);
    }
    const pvTax = npv(taxFlows, st.disc / 100);
    const cashIn = D * st.years + st.sell - st.buy;
    return { basisPath, cumTax, totalTax, pvTax, zeroYear, basisEnd: basis, gain: st.sell - basis, afterTax: cashIn - totalTax, cashIn };
  };

  const paint = () => {
    q("#rc-buy-v").textContent = fmtUsd(st.buy, 0);
    q("#rc-rate-v").textContent = fmtPct(st.rate / 100, 2);
    q("#rc-roc-v").textContent = st.roc + "%";
    q("#rc-yrs-v").textContent = st.years;
    q("#rc-sell-v").textContent = fmtUsd(st.sell, 0);
    q("#rc-ord-v").textContent = st.ord + "%";

    const R = simulate(st.roc / 100), Dv = simulate(0);
    q("#rc-stats").innerHTML = `
      <div class="stat"><div class="k">${T("卖出时成本基础", "Basis at sale")}</div><div class="v">${fmtUsd(R.basisEnd, 2)}</div></div>
      <div class="stat"><div class="k">${T("卖出时资本利得", "Capital gain at sale")}</div><div class="v ${R.gain >= 0 ? "" : "neg"}">${fmtUsd(R.gain, 2)}</div></div>
      <div class="stat"><div class="k">${T("成本基础归零的年份", "Year basis hits 0")}</div><div class="v acc">${R.zeroYear ? T("第 ", "year ") + R.zeroYear + T(" 年", "") : T("未归零", "not reached")}</div></div>
      <div class="stat"><div class="k">${T("税前现金收益（每股）", "Pre-tax cash gain (per share)")}</div><div class="v">${fmtUsd(R.cashIn, 2)}</div></div>`;

    const cell = (title, s, hl) => `<div class="cmp-cell ${hl ? "hl" : "cold"}"><h5>${title}</h5>
      <div class="stat-row" style="margin-top:0">
        <div class="stat"><div class="k">${T("税款合计", "Total tax")}</div><div class="v">${fmtUsd(s.totalTax, 2)}</div></div>
        <div class="stat"><div class="k">${T("税款现值", "PV of tax")} (${st.disc}%)</div><div class="v">${fmtUsd(s.pvTax, 2)}</div></div>
        <div class="stat"><div class="k">${T("税后现金收益", "After-tax cash gain")}</div><div class="v pos">${fmtUsd(s.afterTax, 2)}</div></div>
      </div></div>`;
    q("#rc-cmp").innerHTML = cell(T("按你设定的 ROC 比例", "At your ROC share") + ` (${st.roc}%)`, R, true) +
      cell(T("全部按股息计税（ROC 0%）", "All taxed as dividends (ROC 0%)"), Dv, false);

    const at = (arr) => (x) => arr[Math.max(0, Math.min(st.years, Math.round(x)))];
    const c = lineChart({ fns: [{ f: at(R.basisPath), cls: "line" }, { f: at(R.cumTax), cls: "line5" }, { f: at(Dv.cumTax), cls: "line2" }], lo: 0, hi: st.years, xlabel: T("持有年数", "years held"), forceZero: true, uid: "rc" });
    q("#rc-chart").innerHTML = `<div class="demo-label">${T("成本基础与累计税款（美元 / 股）", "Cost basis and cumulative tax ($ per share)")}</div>` +
      chartBlock(c, [["var(--orange)", T("成本基础", "Cost basis")], ["var(--btc)", T("累计税款：ROC", "Cumulative tax: ROC")], ["var(--blue)", T("累计税款：全部股息", "Cumulative tax: all dividends")]]);

    const lines = [];
    const rocPerYr = (st.rate * st.roc) / 100;
    lines.push(tex(String.raw`\text{${T("成本基础", "cost basis")}} = \max\!\left(${texv(fmtNum(st.buy, 0))} - ${st.years} \times ${texv(fmtNum(rocPerYr, 2))},\ 0\right) = ${texv(fmtNum(R.basisEnd, 2))}`));
    lines.push(tex(String.raw`\text{${T("卖出时资本利得", "capital gain at sale")}} = ${texv(fmtNum(st.sell, 0))} - ${texv(fmtNum(R.basisEnd, 2))} = ${texv(fmtNum(R.gain, 2))}`));
    const saved = Dv.pvTax - R.pvTax;
    if (st.roc === 0) lines.push(`${T("ROC 比例为 0：两栏相同，每年的分配都在当年计税。", "ROC share is 0: both columns match, and every distribution is taxed in the year received.")}`);
    else lines.push(`<span class="${saved > 0 ? "ok" : "warn"}">${T("按税款现值计，ROC 比全部股息", "In present-value terms, ROC")} ${saved >= 0 ? T("少交", "saves") : T("多交", "costs")} ${fmtUsd(Math.abs(saved), 2)} ${T("每股。", "per share versus all dividends.")}</span>`);
    lines.push(`${T("税款合计：ROC", "Total tax: ROC")} ${fmtUsd(R.totalTax, 2)} ${T("vs 全部股息", "vs all dividends")} ${fmtUsd(Dv.totalTax, 2)}${T("——差额一部分来自税率转换，一部分被卖出时更大的资本利得抵消；递延的价值体现在现值里。", ": part of the difference is rate conversion, part is offset by the bigger capital gain at sale; the value of deferral shows up in present value.")}`);
    if (R.zeroYear && R.zeroYear < st.years) lines.push(`<span class="warn">${T("成本基础在第", "Basis reached 0 in year")} ${R.zeroYear} ${T("年归零：此后的“资本返还”当年就按资本利得计税——递延到此为止。", "; after that, each “return of capital” is taxed as a capital gain when received, so the deferral ends there.")}</span>`);
    if (st.sell < R.basisEnd) lines.push(`${T("卖价低于调整后成本基础：卖出产生资本损失（示意中按长期利得税率抵减，真实规则有额度限制）。", "Sale price below adjusted basis: the sale produces a capital loss (offset here at the long-term rate for illustration; real rules have limits).")}`);
    if (st.years === 1) lines.push(`${T("只持有 1 年：资本利得按短期（普通收入）税率计，ROC 的税率转换优势消失。", "Held for only a year: gains are short-term, taxed at ordinary rates, so ROC's rate-conversion edge disappears.")}`);
    lines.push(`${T("这只是按美国联邦规则的示意计算，不含州税、净投资收入税等；不是税务建议。", "An illustration under US federal rules only, excluding state taxes, the net investment income tax and more; not tax advice.")}`);
    q("#rc-log").innerHTML = lines.map((l) => `<div>${l}</div>`).join("");
  };

  const bind = (id, key) => q(id).addEventListener("input", (e) => { st[key] = +e.target.value; paint(); });
  bind("#rc-buy", "buy"); bind("#rc-rate", "rate"); bind("#rc-roc", "roc"); bind("#rc-yrs", "years"); bind("#rc-sell", "sell"); bind("#rc-ord", "ord");
  root.querySelectorAll("#rc-lt button").forEach((b) => b.addEventListener("click", () => {
    st.ltcg = +b.dataset.v; root.querySelectorAll("#rc-lt button").forEach((o) => o.classList.toggle("on", o === b)); paint();
  }));
  root.querySelectorAll("#rc-dt button").forEach((b) => b.addEventListener("click", () => {
    st.divType = b.dataset.d; root.querySelectorAll("#rc-dt button").forEach((o) => o.classList.toggle("on", o === b)); paint();
  }));
  paint();
}
