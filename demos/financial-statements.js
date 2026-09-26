// 交互演示：迷你三表模型——改一个假设，利润表、现金流量表、资产负债表同时动，且永远平衡；
// 打开“持有比特币”，看公允价值收益怎样让利润暴涨而现金纹丝不动。
import { fmtNum, fmtPct, tex } from "./_fin.js";

export default function mount(root, lang) {
  const en = lang === "en";
  const T = (zh, e) => (en ? e : zh);
  const K = en ? 10 : 1; // 内部单位：万元；英文显示为 $ 千（×10）
  const unit = T("万元", "$K");
  const f = (x) => fmtNum(x * K, 0);
  const ft = (x) => f(x).replace(/,/g, "{,}"); // 公式里的千分位
  const eqTex = tex(String.raw`\text{${T("资产", "assets")}} = \text{${T("负债", "liabilities")}} + \text{${T("权益", "equity")}}`);

  const st = { rev: 1000, gm: 0.6, opex: 350, capex: 100, dwc: 30, div: 40, repay: 20, dat: false, btc0: 1000, chg: 0.1, issue: 0 };
  const DEP = 50, RATE = 0.08, TAX = 0.25;

  const sliders = [
    ["rev", T("营业收入", "Revenue"), 500, 2000, 50, (v) => f(v)],
    ["gm", T("毛利率", "Gross margin"), 0.3, 0.8, 0.01, (v) => fmtPct(v, 0)],
    ["opex", T("营业费用", "Operating expenses"), 200, 600, 10, (v) => f(v)],
    ["capex", T("资本开支（开新店）", "Capex (new stores)"), 0, 300, 10, (v) => f(v)],
    ["dwc", T("营运资本增加（应收+存货）", "Increase in working capital"), -50, 200, 10, (v) => f(v)],
    ["div", T("股息", "Dividends"), 0, 150, 10, (v) => f(v)],
    ["repay", T("偿还贷款", "Loan repayment"), 0, 150, 10, (v) => f(v)],
  ];
  const datSliders = [
    ["btc0", T("期初比特币持仓（按市价）", "Opening bitcoin holdings (at market)"), 0, 3000, 100, (v) => f(v)],
    ["chg", T("本期比特币价格变动", "Bitcoin price change this period"), -0.6, 0.6, 0.05, (v) => (v >= 0 ? "+" : "") + fmtPct(v, 0)],
    ["issue", T("发新股募资并全部买币", "Issue new shares, buy bitcoin with all of it"), 0, 1000, 50, (v) => f(v)],
  ];
  const sl = ([k, lab, lo, hi, step, fmt]) => `
    <label class="demo-label">${lab}${T("：", ": ")}<b id="fsd-v-${k}">${fmt(st[k])}</b></label>
    <input class="demo-slider" type="range" min="${lo}" max="${hi}" step="${step}" value="${st[k]}" data-k="${k}" />`;

  root.innerHTML = `
    <div class="demo">
      <div class="demo-head">${T("📒 迷你三表模型：晨光咖啡（单位：万元）", "📒 A miniature three-statement model: Morning Coffee (in $ thousands)")}</div>
      <div class="demo-grid">
        <div class="demo-block">${sliders.map(sl).join("")}</div>
        <div class="demo-block">
          <div class="demo-btns"><button class="demo-btn" id="fsd-dat">${T("🟠 打开“持有比特币”（DAT 模式）", "🟠 Turn on “holds bitcoin” (DAT mode)")}</button></div>
          <div id="fsd-datbox" style="display:none">${datSliders.map(sl).join("")}
            <div class="demo-meta">${T("为简化，公允价值收益不计税（现实中会计提递延所得税）。", "For simplicity, fair-value gains are untaxed here (in reality a deferred tax is booked).")}</div>
          </div>
          <div class="stat-row">
            <div class="stat"><div class="k">${T("净利润", "Net income")}</div><div class="v" id="fsd-ni">–</div></div>
            <div class="stat"><div class="k">${T("自由现金流", "Free cash flow")}</div><div class="v" id="fsd-fcf">–</div></div>
            <div class="stat"><div class="k">${T("现金净变化", "Net change in cash")}</div><div class="v" id="fsd-dc">–</div></div>
          </div>
          <div id="fsd-bal"></div>
        </div>
      </div>
      <div class="demo-grid-3" id="fsd-tables"></div>
      <div class="demo-block"><div class="demo-log" id="fsd-log"></div></div>
      <p class="demo-tip">${T(
        "试三件事：① 把“营运资本增加”拖到 200——利润不变，现金却大幅流出；② 把资本开支拖到 300——净利润不变，自由现金流变负；③ 打开 DAT 模式、币价 +40%——净利润暴涨，经营现金流一分不多。每一次，“",
        "Try three things: ① drag “increase in working capital” to 200 — profit does not move but cash pours out; ② push capex to 300 — net income is unchanged while free cash flow turns negative; ③ switch on DAT mode with bitcoin +40% — net income explodes while operating cash flow gains nothing. Every time, “"
      )}${eqTex}${T("”都保持平衡：这就是三张表之间那四根线。", "” stays balanced: those are the four threads between the statements.")}</p>
    </div>`;

  const row = (lab, v, strong, color) => `<tr><td style="padding:3px 6px;${strong ? "font-weight:700;" : ""}">${lab}</td><td style="padding:3px 6px;text-align:right;${strong ? "font-weight:700;" : ""}${color ? "color:" + color + ";" : ""}">${f(v)}</td></tr>`;
  const table = (title, rows) => `<div class="cmp-cell"><h5>${title}</h5><table style="width:100%;border-collapse:collapse;font-size:13px">${rows.join("")}</table></div>`;

  const paint = () => {
    const btc0 = st.dat ? st.btc0 : 0, chg = st.dat ? st.chg : 0, issue = st.dat ? st.issue : 0;
    // 利润表
    const gross = st.rev * st.gm, ebit = gross - st.opex - DEP, interest = 500 * RATE;
    const pretaxOp = ebit - interest, tax = Math.max(0, pretaxOp) * TAX, fvGain = btc0 * chg;
    const ni = pretaxOp - tax + fvGain;
    // 现金流量表
    const cfo = ni + DEP - fvGain - st.dwc, cfi = -st.capex - issue, cff = -st.repay - st.div + issue;
    const dCash = cfo + cfi + cff, fcf = cfo - st.capex;
    // 资产负债表（期初：现金 100、营运资本 100、设备 800、比特币 btc0；贷款 500、股本 400 + btc0、留存 100）
    const cash1 = 100 + dCash, wc1 = 100 + st.dwc, ppe1 = 800 + st.capex - DEP, btc1 = btc0 * (1 + chg) + issue;
    const debt1 = 500 - st.repay, paid1 = 400 + btc0 + issue, re1 = 100 + ni - st.div;
    const A = cash1 + wc1 + ppe1 + btc1, LE = debt1 + paid1 + re1;

    const neg = "var(--red)", pos = "var(--green)";
    const is = [
      row(T("营业收入", "Revenue"), st.rev), row(T("− 销售成本", "− COGS"), -(st.rev - gross)), row(T("= 毛利", "= Gross profit"), gross, true),
      row(T("− 营业费用", "− Opex"), -st.opex), row(T("− 折旧", "− Depreciation"), -DEP), row("= EBIT", ebit, true),
      row(T("− 利息（8%）", "− Interest (8%)"), -interest), row(T("− 所得税（25%）", "− Tax (25%)"), -tax),
    ];
    if (st.dat) is.push(row(T("+ 比特币公允价值变动", "+ Bitcoin fair-value change"), fvGain, false, fvGain >= 0 ? pos : neg));
    is.push(row(T("= 净利润", "= Net income"), ni, true, ni >= 0 ? pos : neg));
    const cf = [
      row(T("净利润", "Net income"), ni), row(T("+ 折旧", "+ Depreciation"), DEP),
    ];
    if (st.dat) cf.push(row(T("− 公允价值收益（非现金）", "− Fair-value gain (non-cash)"), -fvGain));
    cf.push(row(T("− 营运资本增加", "− Working-capital increase"), -st.dwc), row(T("= 经营现金流", "= Operating CF"), cfo, true),
      row(T("资本开支", "Capex"), -st.capex));
    if (st.dat) cf.push(row(T("买入比特币", "Bitcoin purchases"), -issue));
    cf.push(row(T("= 投资现金流", "= Investing CF"), cfi, true), row(T("还贷", "Loan repayment"), -st.repay), row(T("股息", "Dividends"), -st.div));
    if (st.dat) cf.push(row(T("发行新股", "New share issuance"), issue));
    cf.push(row(T("= 融资现金流", "= Financing CF"), cff, true), row(T("现金净变化", "Net change in cash"), dCash, true, dCash >= 0 ? pos : neg));
    const bs = [
      row(T("现金", "Cash"), cash1, false, cash1 < 0 ? neg : null), row(T("应收与存货", "Receivables & inventory"), wc1), row(T("设备与门店", "Equipment & stores"), ppe1),
    ];
    if (st.dat) bs.push(row(T("比特币（公允价值）", "Bitcoin (fair value)"), btc1));
    bs.push(row(T("资产合计", "Total assets"), A, true), row(T("银行贷款", "Bank loan"), debt1), row(T("股本", "Paid-in capital"), paid1),
      row(T("留存收益", "Retained earnings"), re1), row(T("负债 + 权益", "Liabilities + equity"), LE, true));

    root.querySelector("#fsd-tables").innerHTML =
      table(T("利润表（一年）", "Income statement (year)"), is) +
      table(T("现金流量表（一年）", "Cash flow statement (year)"), cf) +
      table(T("资产负债表（年末）", "Balance sheet (year-end)"), bs);

    const setV = (id, v) => { const el = root.querySelector(id); el.textContent = f(v) + " " + unit; el.className = "v " + (v >= 0 ? "pos" : "neg"); };
    setV("#fsd-ni", ni); setV("#fsd-fcf", fcf); setV("#fsd-dc", dCash);
    const ok = Math.abs(A - LE) < 1e-6;
    root.querySelector("#fsd-bal").innerHTML = `<div class="demo-meta">${tex(String.raw`\text{${T("资产", "Assets")}} = ${ft(A)} ${ok ? "=" : "\\ne"} ${ft(LE)} = \text{${T("负债", "liabilities")}} + \text{${T("权益", "equity")}}`)} <span class="pill ${ok ? "ok" : "bad"}">${ok ? T("平衡 ✓", "balanced ✓") : T("不平！", "unbalanced!")}</span></div>`;

    const lines = [];
    const gap = ni - dCash;
    const par = (x) => (x < 0 ? `(${ft(x)})` : ft(x));
    lines.push(tex(String.raw`\text{${T("净利润", "Net income")}} - \text{${T("现金净变化", "net change in cash")}} = ${ft(ni)} - ${par(dCash)} = ${ft(gap)}\ \text{${unit.replace("$", "\\$")}}`));
    if (st.dat && Math.abs(fvGain) > 0) {
      lines.push(`<span class="${fvGain >= 0 ? "warn" : "bad"}">${T("其中比特币公允价值变动贡献了 ", "Of which the bitcoin fair-value change contributes ")}${f(fvGain)}${T("：它进了利润表，没进银行账户。剔除后的经营利润是 ", ": it hit the income statement, not the bank account. Excluding it, operating profit is ")}${f(ni - fvGain)}${T("。", ".")}</span>`);
    }
    if (issue > 0) lines.push(`<span class="ok">${T("发股 ", "Issued ")}${f(issue)}${T(" 全部买币：融资流入、投资流出，现金不变，资产负债表两边同时变大——这就是 DAT 的现金流量表。", " and bought bitcoin with all of it: financing inflow, investing outflow, cash unchanged, both sides of the balance sheet bigger — a DAT's cash flow statement in miniature.")}</span>`);
    if (ni > 0 && cfo < 0) lines.push(`<span class="bad">${T("有利润、经营现金流却为负：检查应收款和存货——这是收入质量的警报。", "Profitable but negative operating cash flow: check receivables and inventory — a revenue-quality alarm.")}</span>`);
    if (fcf < 0) lines.push(`<span class="warn">${T("自由现金流为负：扩张的钱要靠现金储备或外部融资。", "Negative free cash flow: expansion must be funded from cash reserves or outside capital.")}</span>`);
    if (cash1 < 0) lines.push(`<span class="bad">${T("期末现金为负——现实中公司必须借钱或发股，否则付不出账单。", "Ending cash is negative — in reality the company must borrow or issue shares or it cannot pay its bills.")}</span>`);
    root.querySelector("#fsd-log").innerHTML = lines.map((l) => `<div>${l}</div>`).join("");
  };

  root.querySelectorAll("input[data-k]").forEach((el) => el.addEventListener("input", () => {
    const k = el.dataset.k; st[k] = +el.value;
    const def = [...sliders, ...datSliders].find((s) => s[0] === k);
    root.querySelector(`#fsd-v-${k}`).textContent = def[5](st[k]);
    paint();
  }));
  root.querySelector("#fsd-dat").addEventListener("click", (e) => {
    st.dat = !st.dat;
    e.currentTarget.classList.toggle("active", st.dat);
    root.querySelector("#fsd-datbox").style.display = st.dat ? "" : "none";
    paint();
  });
  paint();
}
