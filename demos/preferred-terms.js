// 交互演示：股息跳过模拟器——点选哪些季度公司暂停优先股股息，
// 对比 Orange-F（累积、可复利）与 Orange-D（非累积）：拿到多少、欠多少、永久失去多少、
// 股息阻断如何把 D 层一起“卡住”，以及按折现率计算的现值损失。
import { npv, fmtNum, fmtPct , enPunct } from "./_fin.js";

export default function mount(root, lang) {
  const en = lang === "en";
  const T = (zh, e) => (en ? e : zh);
  if (en) enPunct(root);

  const N = 12;
  const F_Q = 2.5, D_Q = 1.25; // 每季应付（百万美元）：F 1 亿 × 10% ÷ 4；D 5,000 万 × 10% ÷ 4
  let skip = new Set([3, 4, 5, 6]);
  let compound = true, catchUp = "all", disc = 10;

  root.innerHTML = `
    <div class="demo">
      <div class="demo-head">${T("⏸️ 股息跳过模拟器：累积 vs 非累积", "⏸️ Dividend-skip simulator: cumulative vs non-cumulative")}</div>
      <div class="demo-block">
        <label class="demo-label">${T("点选公司暂停优先股股息的季度（高亮 = 暂停）", "Click the quarters in which the company suspends preferred dividends (highlighted = suspended)")}</label>
        <div class="demo-btns" id="pt-qs"></div>
        <div class="demo-btns" id="pt-presets">
          <button class="demo-btn" data-p="none">${T("全部照付", "Pay every quarter")}</button>
          <button class="demo-btn" data-p="q3q6">${T("暂停 Q3–Q6", "Suspend Q3–Q6")}</button>
          <button class="demo-btn" data-p="q3q8">${T("暂停 Q3–Q8（6 季）", "Suspend Q3–Q8 (6 quarters)")}</button>
          <button class="demo-btn" data-p="q5on">${T("Q5 起一直暂停", "Suspend from Q5 on")}</button>
        </div>
      </div>
      <div class="demo-grid">
        <div class="demo-block">
          <label class="demo-label">${T("恢复付息时，F 层拖欠怎么处理？", "When payments resume, what happens to F's arrears?")}</label>
          <div class="demo-seg" id="pt-cu">
            <button data-c="all" class="on">${T("一次补清", "Catch up at once")}</button>
            <button data-c="cur">${T("只付当期，欠款挂着", "Pay current only, leave arrears")}</button>
          </div>
        </div>
        <div class="demo-block">
          <label class="demo-label">${T("F 层拖欠是否按股息率复利？", "Do F's arrears compound at the dividend rate?")}</label>
          <div class="demo-seg" id="pt-cp">
            <button data-v="1" class="on">${T("复利", "Compound")}</button>
            <button data-v="0">${T("不复利", "Simple")}</button>
          </div>
        </div>
      </div>
      <div class="demo-block">
        <label class="demo-label">${T("投资者折现率（算现值用）", "Investor discount rate (for present values)")}${T("：", ": ")}<b id="pt-dv"></b></label>
        <input class="demo-slider" type="range" id="pt-d" min="5" max="20" step="0.5" value="${disc}" />
      </div>
      <div class="demo-block" id="pt-svg"></div>
      <div class="cmp" id="pt-cmp"></div>
      <div class="demo-block"><div class="demo-log" id="pt-log"></div></div>
      <p class="demo-tip">${T(
        "选“暂停 Q3–Q6”，再把恢复方式切到“只付当期，欠款挂着”：看 D 层——它明明是非累积、当期也有钱付，却因为 F 层的拖欠被股息阻断一直卡住。条款是互相咬合的齿轮。",
        "Pick “Suspend Q3–Q6,” then switch the resumption mode to “pay current only, leave arrears.” Watch the D layer: it is non-cumulative and the cash for the current quarter exists, yet the dividend stopper keeps it frozen because F is still in arrears. The terms are meshing gears."
      )}</p>
    </div>`;

  const q = (s) => root.querySelector(s);

  const simulate = () => {
    let arrears = 0, lostD = 0, blockedQ = 0, arrearsQ = 0;
    const rows = [];
    for (let k = 1; k <= N; k++) {
      if (compound) arrears *= 1 + 0.10 / 4;
      let fPaid = 0, dPaid = 0, dStatus;
      if (skip.has(k)) {
        arrears += F_Q;
        lostD += D_Q;
        dStatus = "skip";
      } else {
        fPaid = F_Q;
        if (catchUp === "all") { fPaid += arrears; arrears = 0; }
        if (arrears > 1e-9) { lostD += D_Q; dStatus = "blocked"; blockedQ++; }
        else { dPaid = D_Q; dStatus = "paid"; }
      }
      if (arrears > 1e-9) arrearsQ++;
      rows.push({ k, fPaid, dPaid, arrears, dStatus });
    }
    return { rows, arrears, lostD, blockedQ, arrearsQ };
  };

  const drawSvg = (rows) => {
    const W = 640, H = 230, x0 = 60, step = (W - x0 - 20) / N, bw = step * 0.55;
    const maxF = Math.max(F_Q * 2, ...rows.map((r) => r.fPaid), ...rows.map((r) => r.arrears));
    const fBase = 110, fH = 80, dBase = 205, dH = 40;
    let g = `<text x="10" y="30" font-size="11" font-weight="700" fill="var(--orange-ink)">Orange-F</text><text x="10" y="44" font-size="10" fill="var(--muted)">${T("累积", "cumul.")}</text>`;
    g += `<text x="10" y="170" font-size="11" font-weight="700" fill="var(--blue)">Orange-D</text><text x="10" y="184" font-size="10" fill="var(--muted)">${T("非累积", "non-cum.")}</text>`;
    g += `<line x1="${x0}" y1="${fBase}" x2="${W - 10}" y2="${fBase}" stroke="var(--line)"/><line x1="${x0}" y1="${dBase}" x2="${W - 10}" y2="${dBase}" stroke="var(--line)"/>`;
    let arrPts = [];
    rows.forEach((r, i) => {
      const cx = x0 + step * i + step / 2, bx = cx - bw / 2;
      const fh = (r.fPaid / maxF) * fH;
      if (r.fPaid > 0) g += `<rect x="${bx.toFixed(1)}" y="${(fBase - fh).toFixed(1)}" width="${bw.toFixed(1)}" height="${fh.toFixed(1)}" fill="var(--orange)"/>`;
      else g += `<rect x="${bx.toFixed(1)}" y="${(fBase - (F_Q / maxF) * fH).toFixed(1)}" width="${bw.toFixed(1)}" height="${((F_Q / maxF) * fH).toFixed(1)}" fill="none" stroke="var(--red)" stroke-dasharray="3 2"/>`;
      if (r.fPaid > F_Q + 1e-9) g += `<text x="${cx.toFixed(1)}" y="${(fBase - fh - 4).toFixed(1)}" text-anchor="middle" font-size="9" fill="var(--orange-ink)">${fmtNum(r.fPaid, 1)}</text>`;
      arrPts.push(`${cx.toFixed(1)},${(fBase - (r.arrears / maxF) * fH).toFixed(1)}`);
      const dh = dH;
      if (r.dStatus === "paid") g += `<rect x="${bx.toFixed(1)}" y="${dBase - dh}" width="${bw.toFixed(1)}" height="${dh}" fill="var(--blue)"/>`;
      else g += `<rect x="${bx.toFixed(1)}" y="${dBase - dh}" width="${bw.toFixed(1)}" height="${dh}" fill="${r.dStatus === "blocked" ? "var(--red-soft)" : "none"}" stroke="var(--red)" stroke-dasharray="3 2"/>`;
      if (r.dStatus === "blocked") g += `<text x="${cx.toFixed(1)}" y="${dBase - dh / 2 + 3}" text-anchor="middle" font-size="9" font-weight="700" fill="var(--red)">${T("阻断", "stop")}</text>`;
      g += `<text x="${cx.toFixed(1)}" y="${dBase + 14}" text-anchor="middle" font-size="10" fill="var(--muted)">Q${r.k}</text>`;
    });
    g += `<polyline points="${arrPts.join(" ")}" fill="none" stroke="var(--red)" stroke-width="2"/>`;
    g += `<text x="${W - 12}" y="16" text-anchor="end" font-size="10" fill="var(--red)">${T("红线 = F 层拖欠余额", "red line = F arrears balance")}</text>`;
    g += `<text x="${W - 12}" y="${dBase - dH - 6}" text-anchor="end" font-size="10" fill="var(--muted)">${T("单位：百万美元", "figures in $M")}</text>`;
    return `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" font-family="Inter, system-ui, sans-serif" style="width:100%;height:auto">${g}</svg>`;
  };

  const paint = () => {
    q("#pt-qs").innerHTML = Array.from({ length: N }, (_, i) => i + 1)
      .map((k) => `<button class="demo-btn${skip.has(k) ? " active" : ""}" data-q="${k}" style="padding:6px 10px;${skip.has(k) ? "background:var(--red-soft);border-color:var(--red);color:var(--red)" : ""}">Q${k}</button>`).join("");
    q("#pt-qs").querySelectorAll("button").forEach((b) => b.addEventListener("click", () => {
      const k = +b.dataset.q; skip.has(k) ? skip.delete(k) : skip.add(k); paint();
    }));
    q("#pt-dv").textContent = disc.toFixed(1) + "%";

    const s = simulate();
    const r = disc / 100;
    const fFlows = s.rows.map((x) => ({ t: x.k / 4, cf: x.fPaid }));
    const dFlows = s.rows.map((x) => ({ t: x.k / 4, cf: x.dPaid }));
    const fPromised = npv(s.rows.map((x) => ({ t: x.k / 4, cf: F_Q })), r);
    const dPromised = npv(s.rows.map((x) => ({ t: x.k / 4, cf: D_Q })), r);
    const fPV = npv(fFlows, r), dPV = npv(dFlows, r);
    // 期末仍挂着的拖欠：仍是 F 层的索取权（若最终补清）；按期末折现
    const fClaimPV = s.arrears / Math.pow(1 + r, N / 4);
    const fCash = s.rows.reduce((a, x) => a + x.fPaid, 0), dCash = s.rows.reduce((a, x) => a + x.dPaid, 0);

    q("#pt-svg").innerHTML = drawSvg(s.rows);
    q("#pt-cmp").innerHTML = `
      <div class="cmp-cell hl"><h5>Orange-F · ${T("累积", "cumulative")}</h5>
        <div class="stat-row" style="margin-top:0">
          <div class="stat"><div class="k">${T("12 季收到现金", "Cash in 12 qtrs")}</div><div class="v">${fmtNum(fCash, 2)}</div></div>
          <div class="stat"><div class="k">${T("期末仍欠", "Still owed")}</div><div class="v ${s.arrears > 0 ? "neg" : "pos"}">${fmtNum(s.arrears, 2)}</div></div>
        </div>
        <div class="demo-meta">${T("收到现金的现值", "PV of cash received")} ${fmtNum(fPV, 2)} / ${T("承诺现值", "promised PV")} ${fmtNum(fPromised, 2)}（${fmtPct(fPV / fPromised, 1)}）${s.arrears > 0 ? `；${T("若期末补清，再加欠款现值", "plus PV of arrears if cleared at the end")} ${fmtNum(fClaimPV, 2)}` : ""}</div>
      </div>
      <div class="cmp-cell cold"><h5>Orange-D · ${T("非累积", "non-cumulative")}</h5>
        <div class="stat-row" style="margin-top:0">
          <div class="stat"><div class="k">${T("12 季收到现金", "Cash in 12 qtrs")}</div><div class="v">${fmtNum(dCash, 2)}</div></div>
          <div class="stat"><div class="k">${T("永久失去", "Lost for good")}</div><div class="v ${s.lostD > 0 ? "neg" : "pos"}">${fmtNum(s.lostD, 2)}</div></div>
        </div>
        <div class="demo-meta">${T("收到现金的现值", "PV of cash received")} ${fmtNum(dPV, 2)} / ${T("承诺现值", "promised PV")} ${fmtNum(dPromised, 2)}（${fmtPct(dPV / dPromised, 1)}）${s.blockedQ ? `；${T("其中", "of which")} ${s.blockedQ} ${T("季是被 F 层拖欠阻断的", "quarters were blocked by F's arrears")}` : ""}</div>
      </div>`;

    const lines = [];
    if (!skip.size) lines.push(`<span class="ok">${T("全部照付：两层都拿到承诺的每一笔，条款差别此刻看不见——它们只在坏日子里显形。", "Everything paid: both layers receive every promised payment. The difference in terms is invisible now — it only shows on bad days.")}</span>`);
    else {
      lines.push(`${T("暂停了", "Suspended")} ${skip.size} ${T("个季度。F 层每季应付 2.5、D 层 1.25（百万美元）。", "quarters. F is owed 2.5 and D 1.25 per quarter ($M).")}`);
      if (s.blockedQ) lines.push(`<span class="bad">${T("股息阻断在起作用：公司恢复付 F 层当期股息后，只要 F 层还有拖欠，D 层与普通股就一分钱都不能拿，也不能回购。", "The dividend stopper is biting: after F's current dividend resumes, as long as F has arrears, the D layer and the common can't be paid a cent or bought back.")}</span>`);
      if (s.arrearsQ >= 6) lines.push(`<span class="warn">${T("F 层拖欠已持续", "F has been in arrears for")} ${s.arrearsQ} ${T("个季度——按常见条款设计，此时优先股持有人可选举董事（直到欠款补清）。", "quarters — under a common design, preferred holders can now elect directors until the arrears are cleared.")}</span>`);
      if (compound && s.arrears > 0) {
        compound = false; const simple = simulate(); compound = true;
        lines.push(`${T("复利让欠款越滚越大：期末拖欠 ", "Compounding keeps the debt growing: end arrears ")}${fmtNum(s.arrears, 2)}${T("，不复利则为 ", " versus ")}${fmtNum(simple.arrears, 2)}${T("。", " without compounding.")}`);
      }
      lines.push(`${T("按承诺现值计，F 层拿回了 ", "Measured against promised PV, F recovered ")}${fmtPct((fPV + fClaimPV) / fPromised, 1)}${T("（含期末欠款的索取权），D 层只拿回了 ", " (counting the claim on end-arrears); D recovered only ")}${fmtPct(dPV / dPromised, 1)}${T("。这就是非累积层要求更高收益率的原因。", ". That is why a non-cumulative layer demands a higher yield.")}`);
    }
    q("#pt-log").innerHTML = lines.map((l) => `<div>${l}</div>`).join("");
  };

  const presets = {
    none: [], q3q6: [3, 4, 5, 6], q3q8: [3, 4, 5, 6, 7, 8], q5on: [5, 6, 7, 8, 9, 10, 11, 12],
  };
  root.querySelectorAll("#pt-presets button").forEach((b) => b.addEventListener("click", () => { skip = new Set(presets[b.dataset.p]); paint(); }));
  root.querySelectorAll("#pt-cu button").forEach((b) => b.addEventListener("click", () => {
    catchUp = b.dataset.c;
    root.querySelectorAll("#pt-cu button").forEach((o) => o.classList.toggle("on", o === b));
    paint();
  }));
  root.querySelectorAll("#pt-cp button").forEach((b) => b.addEventListener("click", () => {
    compound = b.dataset.v === "1";
    root.querySelectorAll("#pt-cp button").forEach((o) => o.classList.toggle("on", o === b));
    paint();
  }));
  q("#pt-d").addEventListener("input", (e) => { disc = +e.target.value; paint(); });
  paint();
}
