// 交互演示：破产回收瀑布——选择重整（持续经营价值）或清算（打折变卖），
// 加上管理费用与“偏离绝对优先”的礼物，看每一层的回收率、支点证券在哪一层；
// 橙子公司模式：以美元计的索取权 vs 以比特币计的资产。
import { waterfall, fmtNum, fmtPct, fmtUsd , enPunct } from "./_fin.js";

export default function mount(root, lang) {
  const en = lang === "en";
  const T = (zh, e) => (en ? e : zh);
  if (en) enPunct(root);

  let co = "maple", path = "ch11";
  const s = { gc: 50, liqDisc: 30, admin: 3, gift: 0, px: 15000, fire: 0 };

  // 历史平均回收率大致区间（量级示意）
  const hist = { secured: [60, 80], senior: [35, 50], sub: [20, 35], pref: [0, 10] };

  root.innerHTML = `
    <div class="demo">
      <div class="demo-head">${T("⚓ 破产回收瀑布：谁上救生艇", "⚓ Bankruptcy recovery waterfall: who gets a lifeboat seat")}</div>
      <div class="demo-row">
        <div class="demo-seg" id="br-co">
          <button data-c="maple" class="on">${T("枫叶制造", "Maple Manufacturing")}</button>
          <button data-c="orange">${T("橙子公司", "Orange Corp")}</button>
        </div>
        <div class="demo-seg" id="br-path">
          <button data-p="ch11" class="on">${T("第 11 章重整", "Chapter 11")}</button>
          <button data-p="ch7">${T("第 7 章清算", "Chapter 7")}</button>
        </div>
      </div>
      <div id="br-ctrl" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:10px"></div>
      <div class="stat-row" id="br-stats"></div>
      <div class="stages" id="br-bars"></div>
      <div class="demo-log" id="br-log"></div>
      <p class="demo-tip">${T(
        "在枫叶制造里来回切换“重整 / 清算”：高级债的回收率从约 68% 掉到约 8%——差额就是“活企业”的价值。再把“礼物”拖到 10%：老股东凭空拿到一点，钱来自支点那一层。切到橙子公司，拖比特币价格：没有估值之争，每一层拿多少只看币价。",
        "In Maple, toggle between Chapter 11 and Chapter 7: the senior bonds' recovery drops from about 68% to about 8% — the difference is the value of a living business. Then drag the “gift” to 10%: old shareholders get something out of nothing, paid for by the fulcrum class. Switch to Orange Corp and drag the bitcoin price: no valuation fight, each floor's recovery depends only on the price."
      )}</p>
    </div>`;

  const q = (sel) => root.querySelector(sel);

  const ctrlDefs = () => co === "maple"
    ? [
        ["gc", T("持续经营价值（百万美元）", "Going-concern value ($M)"), 10, 120, 1],
        ...(path === "ch7" ? [["liqDisc", T("清算折价（相对持续经营价值，%）", "Liquidation discount vs going concern (%)")  , 0, 70, 1]] : []),
        ["admin", T("管理费用（百万美元）", "Administrative costs ($M)"), 0, 10, 0.5],
        ["gift", T("“礼物”：支点层让给老股东的比例（%）", "“Gift”: share of the fulcrum's recovery given to old equity (%)"), 0, 20, 1],
      ]
    : [
        ["px", T("比特币价格（美元）", "Bitcoin price ($)"), 3000, 60000, 500],
        ["fire", T("抛售冲击折价（%）", "Fire-sale discount (%)"), 0, 25, 1],
        ["admin", T("管理费用（百万美元）", "Administrative costs ($M)"), 0, 30, 1],
        ["gift", T("“礼物”：支点层让给老股东的比例（%）", "“Gift”: share of the fulcrum's recovery given to old equity (%)"), 0, 20, 1],
      ];

  const fmtCtrl = (k, v) => (k === "px" ? fmtUsd(v) : ["liqDisc", "gift", "fire"].includes(k) ? v + "%" : fmtNum(v, 0));

  const buildCtrl = () => {
    q("#br-ctrl").innerHTML = ctrlDefs().map(([k, lab, lo, hi, step]) => `
      <div class="demo-block" style="margin:6px 0">
        <label class="demo-label">${lab}${T("：", ": ")}<b id="br-v-${k}">${fmtCtrl(k, s[k])}</b></label>
        <input class="demo-slider" type="range" data-k="${k}" min="${lo}" max="${hi}" step="${step}" value="${s[k]}" />
      </div>`).join("");
    q("#br-ctrl").querySelectorAll("[data-k]").forEach((el) => {
      // 读数标签在建控件时就绑定到同一个块里：切换公司 / 路径会重建控件，旧滑块已脱离页面，不能再去全局查它的 id
      const out = el.closest(".demo-block").querySelector("b");
      el.addEventListener("input", () => {
        if (!el.isConnected) return;
        s[el.dataset.k] = +el.value; out.textContent = fmtCtrl(el.dataset.k, s[el.dataset.k]); paint();
      });
    });
    q("#br-path").style.display = co === "maple" ? "" : "none";
  };

  // 计算：返回每层 {name, claim, paid, recovery, key}
  const run = (pathOverride) => {
    const p = pathOverride || path;
    let value, layers;
    if (co === "maple") {
      value = p === "ch11" ? s.gc : s.gc * (1 - s.liqDisc / 100);
      const adminAmt = s.admin;
      layers = [
        { name: T("担保贷款", "Secured loan"), claim: 30, key: "secured" },
        { name: T("管理费用", "Admin costs"), claim: adminAmt, key: "admin" },
        { name: T("高级债券", "Senior bonds"), claim: 25, key: "senior" },
        { name: T("次级票据", "Sub notes"), claim: 15, key: "sub" },
        { name: T("优先股", "Preferred"), claim: 10, key: "pref" },
      ];
    } else {
      value = ((10000 * s.px) / 1e6) * (1 - s.fire / 100) + 30;
      const adminAmt = s.admin;
      layers = [
        { name: T("管理费用", "Admin costs"), claim: adminAmt, key: "admin" },
        { name: T("可转债", "Converts"), claim: 150, key: "senior" },
        { name: "Orange-F", claim: 100, key: "pref" },
        { name: "Orange-D", claim: 50, key: "pref" },
      ];
    }
    const w = waterfall(value, layers);
    const rows = w.rows.map((r, i) => ({ ...r, key: layers[i].key }));
    // 支点：第一个没拿满、且拿到了一点的层（跳过管理费用）；若无，则为第一个 0 回收的层之前一层
    let fulcrum = rows.findIndex((r) => r.key !== "admin" && r.recovery < 1 && r.paid > 0);
    if (fulcrum < 0) fulcrum = rows.findIndex((r) => r.key !== "admin" && r.recovery < 1) - 1;
    let equity = w.equity, giftAmt = 0;
    if (s.gift > 0 && equity <= 1e-9 && fulcrum >= 0 && rows[fulcrum].key !== "admin") {
      giftAmt = rows[fulcrum].paid * s.gift / 100;
      rows[fulcrum] = { ...rows[fulcrum], paid: rows[fulcrum].paid - giftAmt, recovery: (rows[fulcrum].paid - giftAmt) / rows[fulcrum].claim };
      equity = giftAmt;
    }
    return { value, rows, equity, fulcrum, giftAmt };
  };

  const paint = () => {
    const r = run();
    const f = r.fulcrum >= 0 ? r.rows[r.fulcrum] : null;
    const stats = [
      [T("可分配价值", "Distributable value"), fmtNum(r.value, 1), "acc"],
      [T("支点证券", "Fulcrum security"), f ? f.name : T("无（全部拿满）", "none (all paid)"), ""],
      [T("老股东拿到", "Old equity gets"), fmtNum(r.equity, 1), r.equity > 0 ? "pos" : "neg"],
    ];
    if (co === "maple") {
      const other = run(path === "ch11" ? "ch7" : "ch11");
      const sn = r.rows.find((x) => x.key === "senior"), snO = other.rows.find((x) => x.key === "senior");
      stats.push([path === "ch11" ? T("高级债：若改清算", "Senior bonds if liquidated") : T("高级债：若改重整", "Senior bonds if reorganized"), fmtPct(snO.recovery, 0) + " vs " + fmtPct(sn.recovery, 0), ""]);
    }
    q("#br-stats").innerHTML = stats.map(([k, v, c]) => `<div class="stat"><div class="k">${k}</div><div class="v ${c}" style="font-size:16px">${v}</div></div>`).join("");

    q("#br-bars").innerHTML = r.rows.map((x, i) => {
      const col = x.recovery >= 0.999 ? "var(--green)" : x.recovery > 0 ? "var(--orange)" : "var(--red)";
      const tag = i === r.fulcrum ? ` ⟵ ${T("支点", "fulcrum")}` : "";
      return `<div class="stage-bar"><span class="lab">${x.name}</span><div class="track"><div class="fill" style="width:${Math.max(0, x.recovery * 100)}%;background:${col}"></div></div><span class="val" style="width:150px">${fmtNum(x.paid, 1)} / ${fmtNum(x.claim, 1)} · ${fmtPct(x.recovery, 0)}${tag}</span></div>`;
    }).join("") + `<div class="stage-bar"><span class="lab">${T("普通股", "Common")}</span><div class="track"><div class="fill" style="width:${Math.min(100, r.equity / Math.max(1, r.value) * 100)}%;background:var(--blue)"></div></div><span class="val" style="width:150px">${fmtNum(r.equity, 1)}</span></div>`;

    const lines = [];
    if (co === "maple") {
      lines.push(path === "ch11"
        ? `${T("重整：公司作为活企业值 ", "Chapter 11: the living business is worth ")}${fmtNum(s.gc, 0)}${T("；支点层的回收以", "; the fulcrum class is paid in")}<b>${T("新公司股权", " new equity")}</b>${T("的形式拿到，老股东被清零（除非有“礼物”）。", ", and old shareholders are wiped out (unless gifted).")}`
        : `${T("清算：资产按 ", "Chapter 7: assets fetch ")}${fmtNum(r.value, 1)}${T(" 变卖（折价 ", " in a sale (a ")}${s.liqDisc}%${T("），全部是现金。", " discount), all in cash.")}`);
      r.rows.forEach((x) => {
        const h = hist[x.key];
        if (!h || x.key === "admin") return;
        const rec = x.recovery * 100;
        const cls = rec > 0 && rec >= h[0] ? "ok" : rec > 0 ? "warn" : "bad";
        lines.push(`${x.name}：<span class="${cls}">${fmtPct(x.recovery, 0)}</span> · ${T("历史大致区间", "historical rough range")} ${h[0]}%–${h[1]}%`);
      });
    } else {
      lines.push(`${T("索取权以美元计，资产以比特币计：比特币 ", "Claims in dollars, assets in bitcoin: at ")}${fmtUsd(s.px)}${T(" 时可分配 ", ", distributable value is ")}<b>${fmtNum(r.value, 1)}</b>${T("（百万美元，含 3,000 万现金）。", " ($M, incl. $30M cash).")}`);
      const needConv = (150 + s.admin - 30) * 1e6 / 10000 / (1 - s.fire / 100);
      const needD = (300 + s.admin - 30) * 1e6 / 10000 / (1 - s.fire / 100);
      lines.push(`${T("比特币高于约 ", "Bitcoin above about ")}<b>${fmtUsd(Math.max(0, needD))}</b>${T(" → 三层全部拿满；低于约 ", " → all three layers paid in full; below about ")}<b>${fmtUsd(Math.max(0, needConv))}</b>${T(" → 连可转债都开始受损。", " → even the converts are impaired.")}`);
      lines.push(`<span class="warn">${T("几乎没有“活企业溢价”与估值之争：第 11 章要保护的东西在这里很少。真正的分歧是卖多快——抛售冲击滑块就是它的代价。", "Almost no going-concern premium and no valuation fight: little for Chapter 11 to protect. The real disagreement is how fast to sell — the fire-sale slider is its cost.")}</span>`);
      lines.push(`${T("而在走到这一步之前很久，优先股持有人就会先经历股息暂停与价格跌破面值（阶段 6.3、阶段 18.2）。", "Long before this point, preferred holders would first live through suspended dividends and prices below par (Stage 6.3, Stage 18.2).")}`);
    }
    if (r.giftAmt > 0) lines.push(`<span class="warn">${T("“礼物”：支点层让出 ", "“Gift”: the fulcrum class gives up ")}${fmtNum(r.giftAmt, 2)}${T(" 给本该归零的老股东——这就是现实里对绝对优先原则的偏离。", " to old shareholders who should get nothing — a real-world deviation from absolute priority.")}</span>`);
    q("#br-log").innerHTML = lines.map((l) => `<div>${l}</div>`).join("");
  };

  root.querySelectorAll("#br-co button").forEach((b) => b.addEventListener("click", () => {
    co = b.dataset.c;
    s.admin = co === "maple" ? 3 : 0;
    root.querySelectorAll("#br-co button").forEach((o) => o.classList.toggle("on", o === b));
    buildCtrl(); paint();
  }));
  root.querySelectorAll("#br-path button").forEach((b) => b.addEventListener("click", () => {
    path = b.dataset.p;
    root.querySelectorAll("#br-path button").forEach((o) => o.classList.toggle("on", o === b));
    buildCtrl(); paint();
  }));
  buildCtrl();
  paint();
}
