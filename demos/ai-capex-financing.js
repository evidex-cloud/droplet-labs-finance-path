// 交互演示：AI 数据中心融资沙盘（Hyperion 式 SPV，示意）。
// 输入：项目成本、芯片占比与寿命、建筑寿命、融资结构（公司债 / 私募信贷 / 股权）、利率、租期与到期残值、残值担保。
// 计算：加权资本成本（WACC）、按年金法的年度资本回收额、直线折旧、覆盖资本成本所需年收入；
// 租约到期不续租时，用 waterfall / coverageByLayer 算各层回收率。计算走 _fin.js。
import { npv, waterfall, coverageByLayer, fmtPct, fmtNum, clamp, tex } from "./_fin.js";

const texv = (s) => String(s).replace(/\$/g, "\\$").replace(/,/g, "{,}").replace(/%/g, "\\%");

export default function mount(root, lang) {
  const en = lang === "en";
  const T = (zh, e) => (en ? e : zh);

  const PRESETS = {
    hyperion: { cost: 27, chip: 50, chipLife: 5, shellLife: 20, bond: 70, pc: 10, tsy: 5.2, spr: 1.2, pcr: 9.5, eqr: 12, opex: 40, lease: 4, resid: 45, guar: 20, name: T("Hyperion 式 SPV（示意）", "Hyperion-style SPV (illustrative)") },
    selfFund: { cost: 27, chip: 50, chipLife: 5, shellLife: 20, bond: 20, pc: 0, tsy: 5.2, spr: 1.0, pcr: 9.5, eqr: 11, opex: 40, lease: 20, resid: 45, guar: 0, name: T("主要用自有资金（2023 年式）", "Mostly self-funded (2023-style)") },
    levered: { cost: 27, chip: 60, chipLife: 4, shellLife: 20, bond: 50, pc: 40, tsy: 5.2, spr: 1.8, pcr: 11, eqr: 15, opex: 40, lease: 4, resid: 30, guar: 0, name: T("高杠杆：私募信贷重仓", "High leverage: heavy private credit") },
  };

  const sl = (id, zh, e, min, max, step) =>
    `<div><label class="demo-label">${T(zh, e)}${T("：", ": ")}<b id="acf-${id}-v"></b></label><input class="demo-slider" type="range" id="acf-${id}" min="${min}" max="${max}" step="${step}"></div>`;

  root.innerHTML = `
    <div class="demo">
      <div class="demo-head">${T("🏗️ AI 数据中心融资沙盘：谁出钱、要多少收入、谁最后兜底", "🏗️ AI data-center financing sandbox: who funds it, what revenue it needs, who is left holding the bag")}</div>
      <div class="demo-btns" id="acf-presets">
        ${Object.keys(PRESETS).map((k) => `<button class="demo-btn" data-k="${k}">${PRESETS[k].name}</button>`).join("")}
      </div>
      <div class="demo-block">
        <div class="demo-label">${T("① 资产：多少是很快过时的芯片，多少是耐用的建筑与电力", "① The asset: how much is fast-aging chips, how much durable shell and power")}</div>
        <div class="demo-grid">
          ${sl("cost", "项目成本（十亿美元）", "Project cost ($B)", 5, 60, 1)}
          ${sl("chip", "芯片与服务器占比", "Chips & servers share", 0, 80, 5)}
          ${sl("chipLife", "芯片使用年限", "Chip useful life", 2, 8, 1)}
          ${sl("shellLife", "建筑与电力年限", "Shell & power life", 10, 30, 1)}
        </div>
      </div>
      <div class="demo-block">
        <div class="demo-label">${T("② 融资结构与成本（股权是剩余部分）", "② Funding mix and cost (equity is the rest)")}</div>
        <div class="demo-grid">
          ${sl("bond", "公司债 / SPV 债券占比", "Corporate / SPV bonds share", 0, 90, 5)}
          ${sl("pc", "私募信贷占比", "Private credit share", 0, 60, 5)}
          ${sl("tsy", "国债收益率", "Treasury yield", 3, 7, 0.1)}
          ${sl("spr", "投资级利差", "Investment-grade spread", 0.5, 3, 0.1)}
          ${sl("pcr", "私募信贷利率", "Private credit rate", 7, 14, 0.5)}
          ${sl("eqr", "股权要求回报", "Equity required return", 8, 20, 0.5)}
          ${sl("opex", "运营成本占收入比", "Operating cost as % of revenue", 10, 70, 5)}
        </div>
        <div class="demo-row" style="margin-top:8px"><span class="demo-label">${T("利率冲击", "Rate shock")}${T("：", ": ")}</span>
          <div class="demo-seg" id="acf-shock"><button data-v="0">${T("无", "None")}</button><button data-v="1">+100bp</button><button data-v="2">+200bp</button></div>
        </div>
      </div>
      <div class="stat-row">
        <div class="stat"><div class="k">${T("加权资本成本 WACC", "Weighted cost of capital")}</div><div class="v" id="acf-wacc"></div></div>
        <div class="stat"><div class="k">${T("年度资本回收额", "Annual capital charge")}</div><div class="v acc" id="acf-charge"></div></div>
        <div class="stat"><div class="k">${T("年折旧（直线法）", "Annual depreciation")}</div><div class="v" id="acf-dep"></div></div>
        <div class="stat"><div class="k">${T("所需年收入", "Revenue needed per year")}</div><div class="v" id="acf-rev"></div></div>
      </div>
      <div class="demo-block">
        <div class="demo-label">${T("③ 压力情景：租约到期、租户不续租，数据中心按残值处置", "③ Stress: the lease ends, the tenant leaves, the data center is sold at residual value")}</div>
        <div class="demo-grid">
          ${sl("lease", "初始租期（年）", "Initial lease (years)", 2, 20, 1)}
          ${sl("resid", "到期残值（占成本）", "Residual value at lease end (% of cost)", 5, 100, 5)}
          ${sl("guar", "租户残值担保（占成本）", "Tenant residual guarantee (% of cost)", 0, 50, 5)}
        </div>
        <div id="acf-bars" style="margin-top:10px"></div>
      </div>
      <div class="demo-log" id="acf-log" style="margin-top:12px"></div>
      <p class="demo-tip">${T(
        "先看“Hyperion 式”：把芯片年限从 5 年拖到 3 年，所需收入立刻跳升——<strong>折旧年限是 AI 利润表里最关键的假设</strong>。再点 +200bp，看利率上升怎样抬高每年的资本回收额（阶段 19.1）。最后把残值调低、担保调到 0：债券持有人和私募信贷谁先受损，就是阶段 6.1 资本结构的答案。",
        "Start with “Hyperion-style”: shorten chip life from 5 to 3 years and the revenue needed jumps — <strong>the depreciation life is the key assumption in an AI income statement</strong>. Then click +200bp and watch higher rates raise the annual capital charge (Stage 19.1). Finally lower the residual value and set the guarantee to 0: which of the bondholders and private credit lenders is hit first is the capital-stack answer of Stage 6.1."
      )}</p>
    </div>`;

  const $ = (s) => root.querySelector(s);
  const ids = ["cost", "chip", "chipLife", "shellLife", "bond", "pc", "tsy", "spr", "pcr", "eqr", "opex", "lease", "resid", "guar"];
  let shock = 0;
  const annuityFactor = (r, n) => npv(Array.from({ length: n }, (_, i) => ({ t: i + 1, cf: 1 })), r);
  const B = (x) => "$" + fmtNum(x, 1) + T(" 十亿", "B");
  const Bt = (x) => texv("$" + fmtNum(x, 1)) + T(String.raw`\ \text{十亿}`, String.raw`\text{B}`); // LaTeX 版
  const P = (x, d) => texv(fmtPct(x, d));

  const paint = () => {
    const p = {};
    ids.forEach((id) => (p[id] = +$("#acf-" + id).value));
    // 股权占比 = 剩余；若债务合计超过 100% 则压缩私募信贷
    if (p.bond + p.pc > 95) { p.pc = Math.max(0, 95 - p.bond); $("#acf-pc").value = p.pc; }
    const wB = p.bond / 100, wP = p.pc / 100, wE = 1 - wB - wP;
    const pct = (id, v, d) => ($("#acf-" + id + "-v").textContent = v);
    pct("cost", "$" + p.cost + T(" 十亿", "B")); pct("chip", p.chip + "%"); pct("chipLife", p.chipLife + T(" 年", " yrs")); pct("shellLife", p.shellLife + T(" 年", " yrs"));
    pct("bond", p.bond + "%"); pct("pc", p.pc + "%" + T("（股权 ", " (equity ") + fmtPct(wE, 0) + T("）", ")"));
    pct("tsy", fmtPct(p.tsy / 100, 1)); pct("spr", fmtPct(p.spr / 100, 1)); pct("pcr", fmtPct(p.pcr / 100, 1)); pct("eqr", fmtPct(p.eqr / 100, 1)); pct("opex", p.opex + "%");
    pct("lease", p.lease + T(" 年", " yrs")); pct("resid", p.resid + "%"); pct("guar", p.guar + "%");

    const bump = shock / 100;
    const rB = (p.tsy + p.spr) / 100 + bump, rP = p.pcr / 100 + bump, rE = p.eqr / 100 + bump * 0.5;
    const wacc = wB * rB + wP * rP + wE * rE;
    const chipCost = p.cost * p.chip / 100, shellCost = p.cost - chipCost;
    const charge = chipCost / annuityFactor(wacc, p.chipLife) + shellCost / annuityFactor(wacc, p.shellLife);
    const dep = chipCost / p.chipLife + shellCost / p.shellLife;
    const rev = charge / (1 - p.opex / 100);
    const interest = p.cost * (wB * rB + wP * rP);

    $("#acf-wacc").textContent = fmtPct(wacc, 2);
    $("#acf-charge").textContent = B(charge);
    $("#acf-dep").textContent = B(dep);
    $("#acf-rev").textContent = B(rev);

    // 压力：租约到期不续租；债务按到期一次还本（示意），资产按残值处置 + 残值担保
    const bondClaim = p.cost * wB, pcClaim = p.cost * wP;
    const asset = p.cost * p.resid / 100;
    const shortfall = Math.max(0, bondClaim + pcClaim - asset);
    const guarPaid = Math.min(p.cost * p.guar / 100, shortfall);
    const layers = [{ name: T("SPV / 公司债", "SPV / corporate bonds"), claim: bondClaim }, { name: T("私募信贷", "Private credit"), claim: pcClaim }];
    const wf = waterfall(asset + guarPaid, layers);
    const cov = coverageByLayer(asset, layers);
    const col = (r) => (r >= 0.999 ? "var(--green)" : r >= 0.6 ? "var(--btc)" : "var(--red)");
    const bar = (lab, paid, claim, rec, extra) =>
      `<div class="stage-bar"><span class="lab">${lab}</span><div class="track"><div class="fill" style="width:${clamp(rec * 100, 0, 100)}%;background:${col(rec)}"></div></div><span class="val" style="width:170px">${fmtNum(paid, 1)} / ${fmtNum(claim, 1)} · ${fmtPct(rec, 0)}${extra || ""}</span></div>`;
    const eqClaim = p.cost * wE;
    $("#acf-bars").innerHTML =
      wf.rows.map((r, i) => bar(r.name, r.paid, r.claim, r.recovery, T(" · 覆盖 ", " · cover ") + (isFinite(cov[i].coverage) ? fmtNum(cov[i].coverage, 2) + "x" : "–"))).join("") +
      bar(T("股权（发起人）", "Equity (sponsors)"), wf.equity, eqClaim, eqClaim > 0 ? Math.min(1, wf.equity / eqClaim) : 1, "");

    const L = [];
    L.push(`${tex(String.raw`\mathrm{WACC} = ${P(wB, 0)} \times ${P(rB, 2)} + ${P(wP, 0)} \times ${P(rP, 2)} + ${P(wE, 0)} \times ${P(rE, 2)} = \mathbf{${P(wacc, 2)}}`)}${T("；首年利息约 ", "; first-year interest about ")}${B(interest)}${T("。", ".")}`);
    L.push(`${tex(String.raw`\text{${T("所需年收入", "Revenue needed")}} = \dfrac{\text{${T("年度资本回收额", "annual capital charge")}}}{1 - \text{${T("运营成本占比", "operating-cost share")}}} = \dfrac{${Bt(charge)}}{1 - ${p.opex}\%} \approx \mathbf{${Bt(rev)}}`)}${T("。", ".")}`);
    const longer = chipCost / annuityFactor(wacc, p.chipLife + 2) + shellCost / annuityFactor(wacc, p.shellLife);
    L.push(`${T("把芯片年限从", "Stretching chip life from")} ${p.chipLife} ${T("年延长到", "to")} ${p.chipLife + 2} ${T("年，账面上每年资本回收额从", "years cuts the annual capital charge on paper from")} ${B(charge)} ${T("降到", "to")} ${B(longer)}${T("——但如果芯片真的", " — but if the chips really are obsolete in")} ${p.chipLife} ${T("年就过时，这只是把成本推后。", "years, this only pushes cost into the future.")}`);
    if (shock > 0) L.push(`<span class="warn">${T("利率冲击 +", "Rate shock +")}${shock}00bp${T("：债务成本整体上移，所需年收入随之上升。AI 抬高长期利率，也抬高了 AI 自己的融资成本。", ": every layer of debt costs more, so the revenue needed rises. AI lifts long-term rates, and that raises AI's own cost of funding.")}</span>`);
    if (p.lease < p.shellLife) L.push(`${T("期限错配：", "Maturity mismatch: ")}${p.lease}${T(" 年租约 vs ", "-year lease vs ")}${p.chipLife}${T(" 年芯片 vs ", "-year chips vs ")}${p.shellLife}${T(" 年建筑——租约到期后，债权人依赖的是残值和担保。", "-year shell — once the lease ends, creditors depend on residual value and the guarantee.")}`);
    const bondRec = wf.rows[0].recovery, pcRec = wf.rows[1].recovery;
    if (bondRec < 0.999) L.push(`<span class="bad">${T("连最优先的债券都无法全额回收（", "Even the senior bonds are not repaid in full (")}${fmtPct(bondRec, 0)}${T("）——私募信贷和股权已经归零。", ") — private credit and equity are already wiped out.")}</span>`);
    else if (pcRec < 0.999) L.push(`<span class="bad">${T("债券全额回收，但私募信贷只回收", "Bonds are repaid in full, but private credit recovers only")} ${fmtPct(pcRec, 0)}${T("，股权归零：劣后层先吸收损失（阶段 6.6）。", " and equity is wiped out: junior layers absorb losses first (Stage 6.6).")}</span>`);
    else L.push(`<span class="ok">${T("两层债务都全额回收，股权剩余", "Both debt layers are repaid in full; equity keeps")} ${B(wf.equity)}${T("。", ".")}</span>`);
    if (guarPaid > 0) L.push(`${T("租户按残值担保支付了", "The tenant paid")} ${B(guarPaid)} ${T("——风险在表外，却最终回到了租户身上。", "under its residual-value guarantee — the risk sat off balance sheet but came back to the tenant.")}`);
    $("#acf-log").innerHTML = L.map((l) => `<div>${l}</div>`).join("");
  };

  const setShock = (v) => {
    shock = v;
    root.querySelectorAll("#acf-shock button").forEach((b) => b.classList.toggle("on", +b.dataset.v === v));
    paint();
  };
  const load = (key) => {
    const p = PRESETS[key];
    ids.forEach((id) => ($("#acf-" + id).value = p[id]));
    root.querySelectorAll("#acf-presets button").forEach((b) => b.classList.toggle("active", b.dataset.k === key));
    setShock(0);
  };
  root.querySelectorAll("#acf-presets button").forEach((b) => b.addEventListener("click", () => load(b.dataset.k)));
  root.querySelectorAll("#acf-shock button").forEach((b) => b.addEventListener("click", () => setShock(+b.dataset.v)));
  ids.forEach((id) => $("#acf-" + id).addEventListener("input", () => {
    root.querySelectorAll("#acf-presets button").forEach((b) => b.classList.remove("active"));
    paint();
  }));
  load("hyperion");
}
