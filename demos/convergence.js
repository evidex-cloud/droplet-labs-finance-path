// 交互演示：大汇合的两个沙盘——
// ① 存款搬家：D 美元从 A 银行存款换成稳定币。看 A 银行、发行人与整个银行体系的 T 形账户怎么变，
//    结论取决于稳定币储备里放多少银行存款、国库券的卖方是谁；并与“存款代币”方案对比。
// ② 选哪种链上美元：存款代币 / 稳定币 / 代币化货币基金 / 零售 CBDC 的收益与属性。
import { fv, fmtPct, fmtUsd, fmtNum } from "./_fin.js";

export default function mount(root, lang) {
  const en = lang === "en";
  const T = (zh, e) => (en ? e : zh);
  let mode = "move";
  // A 银行（十亿美元）：资产 = 准备金 150 + 证券 150 + 贷款 800；负债 = 存款 1000 + 权益 100
  const BANK = { res: 150, sec: 150, loans: 800, dep: 1000, eq: 100 };
  const m = { D: 60, sDep: 0.15, y: 0.0424, buf: 0.1, seller: "bank", rd: 0.02 };
  const q = { amt: 1e6, rd: 0.02, y: 0.0424, fee: 0.0015 };

  const SELLERS = {
    bank: T("另一家银行的客户", "Another bank's customer"),
    tsy: T("财政部新发行（进入财政部账户）", "New Treasury issuance (to the Treasury's account)"),
    rrp: T("货币基金（收到现金后存入美联储逆回购）", "A money fund (which parks the cash at the Fed's reverse repo)"),
  };

  root.innerHTML = `
    <div class="demo">
      <div class="demo-head">${T("🌊 大汇合沙盘：一美元搬家，整个管道怎么动", "🌊 Convergence sandbox: move a dollar, watch the plumbing")}</div>
      <div class="demo-seg" id="cv-mode">
        <button data-m="move" class="on">${T("① 存款搬进稳定币", "① Deposits move into stablecoins")}</button>
        <button data-m="pick">${T("② 选哪种链上美元", "② Which on-chain dollar?")}</button>
      </div>
      <div id="cv-move">
        <div class="demo-grid">
          <div class="demo-block">
            <label class="demo-label">${T("从 A 银行搬进稳定币的金额（十亿美元）", "Amount moved from Bank A into stablecoins ($ billions)")}${T("：", ": ")}<b id="cv-D-v"></b></label>
            <input class="demo-slider" id="cv-D" type="range" min="0" max="300" step="5" value="${m.D}">
            <label class="demo-label">${T("稳定币储备中放在银行存款的比例（其余买国库券）", "Share of stablecoin reserves kept as bank deposits (the rest buys T-bills)")}${T("：", ": ")}<b id="cv-s-v"></b></label>
            <input class="demo-slider" id="cv-s" type="range" min="0" max="1" step="0.05" value="${m.sDep}">
            <label class="demo-label">${T("A 银行的最低准备金缓冲（占存款）", "Bank A's minimum reserve buffer (share of deposits)")}${T("：", ": ")}<b id="cv-b-v"></b></label>
            <input class="demo-slider" id="cv-b" type="range" min="0.05" max="0.2" step="0.01" value="${m.buf}">
          </div>
          <div class="demo-block">
            <label class="demo-label">${T("国库券收益率", "T-bill yield")}${T("：", ": ")}<b id="cv-y-v"></b></label>
            <input class="demo-slider" id="cv-y" type="range" min="0" max="0.08" step="0.0005" value="${m.y}">
            <label class="demo-label">${T("银行给存款（或存款代币）付的利率", "Rate the bank pays on deposits (or deposit tokens)")}${T("：", ": ")}<b id="cv-rd-v"></b></label>
            <input class="demo-slider" id="cv-rd" type="range" min="0" max="0.06" step="0.0025" value="${m.rd}">
            <div class="demo-label">${T("国库券是从谁手里买的？", "Who sells the issuer its T-bills?")}</div>
            <div class="demo-seg" id="cv-sell">${Object.keys(SELLERS).map((k) => `<button data-s="${k}" class="${k === m.seller ? "on" : ""}">${SELLERS[k]}</button>`).join("")}</div>
          </div>
        </div>
        <div class="cmp-3" id="cv-ta"></div>
        <div class="stat-row">
          <div class="stat"><div class="k">${T("银行体系总存款变化", "Change in total bank deposits")}</div><div class="v" id="cv-sys">–</div></div>
          <div class="stat"><div class="k">${T("新增的国库券需求", "New demand for T-bills")}</div><div class="v acc" id="cv-tb">–</div></div>
          <div class="stat"><div class="k">${T("发行人每年利息收入", "Issuer's annual interest income")}</div><div class="v pos" id="cv-inc">–</div></div>
          <div class="stat"><div class="k">${T("持有人每年利息", "Holders' annual interest")}</div><div class="v neg" id="cv-hold">–</div></div>
        </div>
        <div class="demo-log" id="cv-log"></div>
      </div>
      <div id="cv-pick" style="display:none">
        <div class="demo-grid">
          <div class="demo-block">
            <label class="demo-label">${T("金额", "Amount")}${T("：", ": ")}<b id="cv-a-v"></b></label>
            <input class="demo-slider" id="cv-a" type="range" min="10000" max="100000000" step="10000" value="${q.amt}">
            <label class="demo-label">${T("存款 / 存款代币利率", "Deposit / deposit-token rate")}${T("：", ": ")}<b id="cv-qrd-v"></b></label>
            <input class="demo-slider" id="cv-qrd" type="range" min="0" max="0.06" step="0.0025" value="${q.rd}">
          </div>
          <div class="demo-block">
            <label class="demo-label">${T("国库券收益率", "T-bill yield")}${T("：", ": ")}<b id="cv-qy-v"></b></label>
            <input class="demo-slider" id="cv-qy" type="range" min="0" max="0.08" step="0.0005" value="${q.y}">
            <label class="demo-label">${T("代币化货币基金年费", "Tokenized money fund fee")}${T("：", ": ")}<b id="cv-qf-v"></b></label>
            <input class="demo-slider" id="cv-qf" type="range" min="0" max="0.01" step="0.0005" value="${q.fee}">
          </div>
        </div>
        <div class="stages" id="cv-bars"></div>
        <div id="cv-attr"></div>
      </div>
      <p class="demo-tip">${T(
        "①里切换“国库券卖方”：卖方是另一家银行的客户时，银行体系的存款只是换了个银行；是财政部新发行或美联储逆回购时，存款真的离开了银行体系。再把“储备中的银行存款比例”调高：稳定币越像把钱存回银行，对银行体系的冲击越小，但它自己的风险也越像银行（想想 2023 年的 USDC 与硅谷银行）。",
        "In ①, switch the T-bill seller: when it is another bank's customer, deposits just change banks; when it is new Treasury issuance or the Fed's reverse repo, deposits really leave the banking system. Then raise the share of reserves kept as bank deposits: the more a stablecoin parks its money back in banks, the smaller the hit to the banking system, but the more its own risk looks like a bank's (think USDC and Silicon Valley Bank in 2023)."
      )}</p>
    </div>`;

  const $ = (s) => root.querySelector(s);
  const b = (x) => (x >= 0 ? "" : "−") + "$" + fmtNum(Math.abs(x), 0) + T(" 十亿", "B");
  const row = (lab, v, cls) => `<div class="demo-meta">${lab}${T("：", ": ")}<b style="color:var(--${cls || "ink"})">${v}</b></div>`;

  const paintMove = () => {
    $("#cv-D-v").textContent = "$" + m.D + T(" 十亿", "B");
    $("#cv-s-v").textContent = fmtPct(m.sDep, 0);
    $("#cv-b-v").textContent = fmtPct(m.buf, 0);
    $("#cv-y-v").textContent = fmtPct(m.y);
    $("#cv-rd-v").textContent = fmtPct(m.rd, 2);
    const D = m.D, depBack = D * m.sDep, bills = D * (1 - m.sDep);
    const dep1 = BANK.dep - D, res1 = BANK.res - D;
    const need = dep1 * m.buf, short = Math.max(0, need - res1);
    const sellSec = Math.min(short, BANK.sec), cutLoans = Math.max(0, short - BANK.sec);
    // 银行体系：A 行 −D；发行人存回银行 +depBack；国库券卖方若是银行客户 +bills
    const sys = -D + depBack + (m.seller === "bank" ? bills : 0);
    const inc = bills * m.y + depBack * m.rd;
    $("#cv-ta").innerHTML = `
      <div class="cmp-cell cold"><h5>${T("A 银行", "Bank A")}</h5>
        ${row(T("存款", "Deposits"), b(BANK.dep) + " → " + b(dep1), "red")}
        ${row(T("准备金", "Reserves"), b(BANK.res) + " → " + b(res1), res1 < need ? "red" : "ink")}
        ${row(T("缓冲要求", "Buffer required"), b(need))}
        ${row(T("缺口：卖证券 / 收缩贷款", "Gap: sell securities / shrink loans"), b(sellSec) + " / " + b(cutLoans), cutLoans > 0 ? "red" : "ink")}
      </div>
      <div class="cmp-cell hl"><h5>${T("稳定币发行人", "Stablecoin issuer")}</h5>
        ${row(T("负债：稳定币", "Liability: stablecoins"), "+" + b(D))}
        ${row(T("资产：国库券", "Asset: T-bills"), "+" + b(bills), "green")}
        ${row(T("资产：银行存款", "Asset: bank deposits"), "+" + b(depBack), "green")}
        ${row(T("持有人利息", "Interest to holders"), "0")}
      </div>
      <div class="cmp-cell"><h5>${T("国库券卖方", "The T-bill seller")}</h5>
        <div class="demo-meta">${SELLERS[m.seller]}</div>
        ${row(T("收到的钱去了哪里", "Where the cash goes"), m.seller === "bank" ? T("另一家银行的存款", "Deposits at another bank") : m.seller === "tsy" ? T("财政部在美联储的账户", "The Treasury's account at the Fed") : T("美联储逆回购工具", "The Fed's reverse repo facility"), m.seller === "bank" ? "green" : "red")}
        ${row(T("对银行体系存款", "Effect on system deposits"), m.seller === "bank" ? "+" + b(bills) : b(0))}
      </div>`;
    $("#cv-sys").textContent = b(sys);
    $("#cv-sys").className = "v " + (sys < 0 ? "neg" : "");
    $("#cv-tb").textContent = "+" + b(bills);
    $("#cv-inc").textContent = "$" + fmtNum(inc, 2) + T(" 十亿", "B");
    $("#cv-hold").textContent = "$0";
    const lines = [];
    lines.push(`${T("A 银行失去", "Bank A loses")} ${b(D)} ${T("存款和同等准备金；", "of deposits and the same amount of reserves; ")}${short > 0 ? `<span class="bad">${T("准备金跌破缓冲，需要卖出证券", "reserves fall below the buffer, so it must sell securities of")} ${b(sellSec)}${cutLoans > 0 ? T("，还要收缩贷款 ", " and shrink loans by ") + b(cutLoans) : ""}${T("。", ".")}</span>` : `<span class="ok">${T("准备金仍在缓冲之上。", "reserves stay above the buffer.")}</span>`}`);
    lines.push(`${T("如果改用存款代币：存款留在 A 银行，银行每年付给持有人约", "With a deposit token instead, the money stays at Bank A and the bank pays holders about")} <b>$${fmtNum(D * m.rd, 2)}${T(" 十亿", "B")}</b>${T("；而稳定币方案下，发行人每年拿走约", " a year; with the stablecoin, the issuer keeps about")} <b>$${fmtNum(inc, 2)}${T(" 十亿", "B")}</b>${T("，持有人拿 0。这就是银行和稳定币争夺的那块“利差”。", " and holders get zero. That spread is what banks and stablecoins are fighting over.")}`);
    lines.push(m.seller === "bank"
      ? `<span class="ok">${T("国库券卖方是银行客户：钱只是在银行之间搬家，体系总存款变化 ", "The seller is a bank customer: money just moves between banks, and the system-wide change is ")}${b(sys)}${T("。受伤的是 A 银行，不是整个体系。", ". Bank A is hurt, not the system.")}</span>`
      : `<span class="warn">${T("钱流向了美联储的账户，体系总存款减少 ", "The money flows into an account at the Fed, so system-wide deposits fall by ")}${b(-sys)}${T("：这是“稳定币增加国债需求，但以银行存款为代价”最直接的版本。", ". This is the most direct version of \"stablecoins add Treasury demand at the expense of bank deposits.\"")}</span>`);
    $("#cv-log").innerHTML = lines.map((l) => `<div>${l}</div>`).join("");
  };

  const paintPick = () => {
    $("#cv-a-v").textContent = fmtUsd(q.amt);
    $("#cv-qrd-v").textContent = fmtPct(q.rd, 2);
    $("#cv-qy-v").textContent = fmtPct(q.y);
    $("#cv-qf-v").textContent = fmtPct(q.fee);
    const items = [
      { n: T("存款代币", "Deposit token"), r: q.rd, c: "var(--blue)", attrs: [1, 1, 1, 0, T("银行负债", "Bank liability")] },
      { n: T("稳定币", "Stablecoin"), r: 0, c: "var(--orange)", attrs: [1, 1, 0, 1, T("发行人负债", "Issuer liability")] },
      { n: T("代币化货币基金", "Tokenized money fund"), r: Math.max(0, q.y - q.fee), c: "var(--green)", attrs: [1, 1, 1, 0, T("证券", "Security")] },
      { n: T("美国零售 CBDC", "US retail CBDC"), r: NaN, c: "var(--muted)", attrs: [0, 0, 0, 0, T("2030 年底前被法律禁止", "Banned by law until end-2030")] },
    ];
    const incomes = items.map((it) => (isFinite(it.r) ? fv(q.amt, it.r, 1, 365) - q.amt : 0));
    const mx = Math.max(1, ...incomes);
    $("#cv-bars").innerHTML = `<div class="demo-label">${T("一年的利息（按日复利）", "One year of interest (daily compounding)")}</div>` + items.map((it, i) => `<div class="stage-bar"><span class="lab">${it.n}</span><div class="track"><div class="fill" style="width:${(incomes[i] / mx) * 100}%;background:${it.c}"></div></div><span class="val">${isFinite(it.r) ? fmtUsd(incomes[i]) : T("不存在", "n/a")}</span></div>`).join("");
    const AT = [T("24/7 转账", "24/7 transfers"), T("可编程", "Programmable"), T("付息", "Pays interest"), T("几乎人人可持有", "Almost anyone can hold")];
    $("#cv-attr").innerHTML = `<div class="cmp">${items.map((it) => `<div class="cmp-cell"><h5>${it.n}${T("（", " (")}${it.attrs[4]}${T("）", ")")}</h5>${AT.map((a, j) => `<span class="pill ${it.attrs[j] ? "ok" : "bad"}" style="margin:2px 4px 2px 0">${a}</span>`).join("")}</div>`).join("")}</div>
      <div class="demo-log"><div>${T("没有一种链上美元同时拥有全部优点：稳定币最通用但不付息；存款代币付息但属于某一家银行；代币化基金付国债利息但多数只对合格机构开放。", "No on-chain dollar has every advantage: stablecoins are the most universal but pay nothing; deposit tokens pay interest but belong to one bank; tokenized funds pay the T-bill yield but are mostly limited to qualified institutions.")}</div></div>`;
  };

  const bindM = (id, key) => $(id).addEventListener("input", (e) => { m[key] = +e.target.value; paintMove(); });
  bindM("#cv-D", "D"); bindM("#cv-s", "sDep"); bindM("#cv-b", "buf"); bindM("#cv-y", "y"); bindM("#cv-rd", "rd");
  const bindQ = (id, key) => $(id).addEventListener("input", (e) => { q[key] = +e.target.value; paintPick(); });
  bindQ("#cv-a", "amt"); bindQ("#cv-qrd", "rd"); bindQ("#cv-qy", "y"); bindQ("#cv-qf", "fee");
  root.querySelectorAll("#cv-sell button").forEach((bt) => bt.addEventListener("click", () => {
    m.seller = bt.dataset.s;
    root.querySelectorAll("#cv-sell button").forEach((x) => x.classList.toggle("on", x === bt));
    paintMove();
  }));
  root.querySelectorAll("#cv-mode button").forEach((bt) => bt.addEventListener("click", () => {
    mode = bt.dataset.m;
    root.querySelectorAll("#cv-mode button").forEach((x) => x.classList.toggle("on", x === bt));
    $("#cv-move").style.display = mode === "move" ? "" : "none";
    $("#cv-pick").style.display = mode === "pick" ? "" : "none";
  }));
  paintMove();
  paintPick();
}
