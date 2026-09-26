// 交互演示：稳定币储备与挤兑沙盘——
// 设定一家发行 100 亿美元稳定币的发行人的储备结构（现金 / ≤93 天国库券 / 10 年期国债 / 高风险资产）与储备率，
// 再施加利率冲击、托管银行倒闭（部分现金冻结）、高风险资产折价，看一场挤兑里“先跑的人”和“后走的人”各拿到多少。
import { bondPrice, waterfall, fmtPct, fmtNum, fmtUsd, fmtBig } from "./_fin.js";

export default function mount(root, lang) {
  const en = lang === "en";
  const T = (zh, e) => (en ? e : zh);
  const C = T("：", ": ");
  const SUPPLY = 10e9, BILL_Y = 0.0424, LONG_Y = 0.04, RISKY_Y = 0.08;
  const presets = {
    genius: { cash: 15, bills: 85, long: 0, risky: 0, ratio: 1.0 },
    chaser: { cash: 10, bills: 30, long: 20, risky: 40, ratio: 1.0 },
    svb: { cash: 10, bills: 20, long: 70, risky: 0, ratio: 1.0 },
    algo: { cash: 5, bills: 0, long: 0, risky: 95, ratio: 0.35 },
  };
  const st = { ...presets.genius, shock: 100, frozen: 0, haircut: 30, run: 40 };

  const sl = (id, label, min, max, step, val) => `
    <label class="demo-label">${label}${C}<b id="sc-${id}-v"></b></label>
    <input class="demo-slider" id="sc-${id}" type="range" min="${min}" max="${max}" step="${step}" value="${val}">`;

  root.innerHTML = `
    <div class="demo">
      <div class="demo-head">${T("🏦 稳定币储备与挤兑沙盘（发行量 100 亿美元）", "🏦 Stablecoin reserves & run sandbox ($10B outstanding)")}</div>
      <div class="demo-block">
        <div class="demo-label">${T("选一种储备结构（也可以在下面手动调）", "Pick a reserve design (or tune it by hand below)")}</div>
        <div class="demo-seg" id="sc-pre">
          <button data-p="genius" class="on">${T("GENIUS 合规型", "GENIUS-compliant")}</button>
          <button data-p="chaser">${T("追逐收益型", "Yield-chaser")}</button>
          <button data-p="svb">${T("长债错配型（SVB 式）", "Long-bond mismatch (SVB-style)")}</button>
          <button data-p="algo">${T("储备不足型（Terra 式）", "Under-reserved (Terra-style)")}</button>
        </div>
      </div>
      <div class="demo-grid">
        <div class="demo-block">
          <div class="demo-label"><b>${T("储备结构（权重，自动归一）", "Reserve mix (weights, auto-normalized)")}</b></div>
          ${sl("cash", T("现金与银行存款", "Cash & bank deposits"), 0, 100, 1, st.cash)}
          ${sl("bills", T("≤93 天国库券 / 回购", "T-bills ≤93 days / repo"), 0, 100, 1, st.bills)}
          ${sl("long", T("10 年期国债", "10-year Treasuries"), 0, 100, 1, st.long)}
          ${sl("risky", T("高风险资产（商业票据、加密资产等）", "Risky assets (commercial paper, crypto, etc.)"), 0, 100, 1, st.risky)}
          ${sl("ratio", T("储备总额 ÷ 发行量", "Total reserves ÷ coins outstanding"), 0.1, 1.1, 0.01, st.ratio)}
        </div>
        <div class="demo-block">
          <div class="demo-label"><b>${T("压力情景", "Stress scenario")}</b></div>
          ${sl("shock", T("利率冲击（基点）", "Rate shock (basis points)"), 0, 400, 25, st.shock)}
          ${sl("frozen", T("托管银行倒闭：被冻结的现金比例", "Custodian bank fails: share of cash frozen"), 0, 100, 1, st.frozen)}
          ${sl("haircut", T("高风险资产的甩卖折价", "Fire-sale haircut on risky assets"), 0, 90, 1, st.haircut)}
          ${sl("run", T("挤兑规模：抢先赎回的比例", "Run size: share of coins redeemed early"), 5, 100, 1, st.run)}
        </div>
      </div>
      <div class="demo-block"><div class="demo-meta">${T("实心 = 压力后可立即变现的价值；虚线框 = 压力前的价值；满格 = 100 亿美元发行量", "Solid = value realizable now after stress; dashed outline = value before stress; full width = the $10B of coins outstanding")}</div><div class="stages" id="sc-bars"></div></div>
      <div class="stat-row">
        <div class="stat"><div class="k">${T("可立即变现的储备 ÷ 发行量", "Reserves available now ÷ coins")}</div><div class="v" id="sc-cov">–</div></div>
        <div class="stat"><div class="k">${T("先跑的人每枚拿到", "Early redeemers get per coin")}</div><div class="v" id="sc-early">–</div></div>
        <div class="stat"><div class="k">${T("后走的人每枚剩下", "Late holders are left with per coin")}</div><div class="v" id="sc-late">–</div></div>
        <div class="stat"><div class="k">${T("发行人年利息收入（平时）", "Issuer's annual interest (normal times)")}</div><div class="v acc" id="sc-inc">–</div></div>
      </div>
      <div class="demo-block">
        <span class="pill" id="sc-pill"></span>
        <div class="demo-log" id="sc-log"></div>
      </div>
      <p class="demo-tip">${T(
        "看“先跑的人”与“后走的人”之间的差距——那就是挤兑的动力。GENIUS 合规型即使加 400 个基点的冲击，后走的人也几乎拿满 1 美元，所以没人需要抢跑；换成长债错配型，同样的利率冲击就能让最后一批人损失一成以上；储备不足型则无论怎么调，都是先到先得的抢椅子游戏。",
        "Watch the gap between early redeemers and late holders: that gap is what powers a run. With the GENIUS-compliant mix, even a 400 bp shock leaves late holders with almost a full $1, so nobody needs to run. Switch to the long-bond mismatch and the same shock costs the last group more than 10%. The under-reserved design is a game of musical chairs however you tune it."
      )}</p>
    </div>`;

  const q = (s) => root.querySelector(s);
  const keys = ["cash", "bills", "long", "risky", "ratio", "shock", "frozen", "haircut", "run"];

  const paint = () => {
    keys.forEach((k) => { q("#sc-" + k).value = st[k]; });
    const wsum = st.cash + st.bills + st.long + st.risky || 1;
    const w = { cash: st.cash / wsum, bills: st.bills / wsum, long: st.long / wsum, risky: st.risky / wsum };
    const R = SUPPLY * st.ratio;
    ["cash", "bills", "long", "risky"].forEach((k) => { q(`#sc-${k}-v`).textContent = fmtPct(w[k], 0) + " ≈ " + fmtUsd(R * w[k] / 1e9, 2) + T(" 十亿", "B"); });
    q("#sc-ratio-v").textContent = fmtPct(st.ratio, 0);
    q("#sc-shock-v").textContent = "+" + st.shock + " bp";
    q("#sc-frozen-v").textContent = fmtPct(st.frozen / 100, 0);
    q("#sc-haircut-v").textContent = fmtPct(st.haircut / 100, 0);
    q("#sc-run-v").textContent = fmtPct(st.run / 100, 0);

    const s = st.shock / 10000;
    const billPx = bondPrice(100, 0, BILL_Y + s, 0.25, 4) / bondPrice(100, 0, BILL_Y, 0.25, 4);
    const longPx = bondPrice(100, LONG_Y, LONG_Y + s, 10) / 100;
    const parts = [
      { k: "cash", lab: T("现金（可用部分）", "Cash (usable part)"), before: R * w.cash, after: R * w.cash * (1 - st.frozen / 100) },
      { k: "bills", lab: T("短期国库券", "Short T-bills"), before: R * w.bills, after: R * w.bills * billPx },
      { k: "long", lab: T("10 年期国债", "10-year Treasuries"), before: R * w.long, after: R * w.long * longPx },
      { k: "risky", lab: T("高风险资产", "Risky assets"), before: R * w.risky, after: R * w.risky * (1 - st.haircut / 100) },
    ];
    const avail = parts.reduce((a, p) => a + p.after, 0);
    const frozenAmt = R * w.cash * (st.frozen / 100);
    q("#sc-bars").innerHTML = parts.map((p) => `<div class="stage-bar">
        <span class="lab">${p.lab}</span>
        <div class="track"><div class="fill" style="width:${(p.after / SUPPLY) * 100}%"></div><div class="fill ghost" style="width:${(p.before / SUPPLY) * 100}%"></div></div>
        <span class="val">${fmtBig(p.after)}</span></div>`).join("")
      + `<div class="stage-bar"><span class="lab"><b>${T("合计可变现 vs 发行量", "Total realizable vs coins")}</b></span><div class="track"><div class="fill" style="width:${Math.min(100, (avail / SUPPLY) * 100)}%;background:${avail >= SUPPLY * 0.995 ? "var(--green)" : "var(--red)"}"></div></div><span class="val">${fmtBig(avail)}</span></div>`;

    const early = SUPPLY * st.run / 100, late = SUPPLY - early;
    const wf = waterfall(avail, [{ name: "early", claim: early }, { name: "late", claim: late }]);
    const eRec = wf.rows[0].recovery, lRec = late > 0 ? wf.rows[1].recovery : 1;
    const cov = avail / SUPPLY;
    q("#sc-cov").textContent = fmtPct(cov, 1);
    q("#sc-cov").className = "v " + (cov >= 0.995 ? "pos" : "neg");
    q("#sc-early").textContent = fmtUsd(eRec, 3);
    q("#sc-late").textContent = late > 0 ? fmtUsd(lRec, 3) : T("（没有人留下）", "(nobody left)");
    q("#sc-late").className = "v " + (lRec >= 0.995 ? "pos" : "neg");
    const inc = R * (w.bills * BILL_Y + w.long * LONG_Y + w.risky * RISKY_Y);
    q("#sc-inc").textContent = fmtUsd(inc / 1e6, 0) + T(" 百万", "M");

    const compliant = w.long < 0.001 && w.risky < 0.001 && st.ratio >= 1;
    const pill = q("#sc-pill");
    pill.className = "pill " + (compliant ? "ok" : "bad");
    pill.textContent = compliant ? T("符合《GENIUS 法案》储备规则", "Meets GENIUS Act reserve rules") : T("不符合《GENIUS 法案》储备规则", "Fails GENIUS Act reserve rules");

    const lines = [];
    lines.push(T("利率冲击后：短期国库券每 1 美元值 ", "After the rate shock, each $1 of short bills is worth ") + fmtUsd(billPx, 4) + T("，10 年期国债每 1 美元值 ", "; each $1 of 10-year notes is worth ") + fmtUsd(longPx, 3) + T("。久期越长，冲击越大（阶段 4.4）。", ". The longer the duration, the bigger the hit (Stage 4.4)."));
    if (frozenAmt > 0) lines.push(`<span class="warn">${T("被冻结在倒闭银行里的现金 ", "Cash frozen at the failed bank: ")}${fmtBig(frozenAmt)}${T("：也许日后能拿回，但挤兑发生在今天——这正是 USDC 在 2023 年 3 月的处境。", ". It may come back later, but the run is happening today, exactly USDC's position in March 2023.")}</span>`);
    const gap = eRec - lRec;
    if (gap > 0.005) lines.push(`<span class="bad">${T("先跑比后走每枚多拿 ", "Running early beats staying by ")}${fmtUsd(gap, 3)}${T("。只要存在这个差距，理性的持有人都会抢着赎回——怀疑会自我实现（阶段 10.1）。", " per coin. As long as that gap exists, every rational holder races to redeem, and doubt fulfils itself (Stage 10.1).")}</span>`);
    else lines.push(`<span class="ok">${T("先跑与后走几乎没有差别：没有抢跑的理由，挤兑难以启动。这就是短期、足额、透明储备的意义。", "Early and late holders fare almost the same, so there is no reason to run and a run struggles to start. That is the point of short, full, transparent reserves.")}</span>`);
    lines.push(T("平时的利息收入 ", "In normal times the issuer earns ") + fmtUsd(inc / 1e6, 0) + T(" 百万美元/年全部归发行人，持有人拿 0。追逐收益型赚得更多，但它把风险留给了最后一批持有人。", "M a year, all of it kept by the issuer while holders get zero. The yield-chaser earns more, but it leaves the risk with the last holders in line."));
    q("#sc-log").innerHTML = lines.map((l) => `<div>${l}</div>`).join("");
  };

  q("#sc-pre").addEventListener("click", (e) => {
    const b = e.target.closest("button"); if (!b) return;
    Object.assign(st, presets[b.dataset.p]);
    q("#sc-pre").querySelectorAll("button").forEach((x) => x.classList.toggle("on", x === b));
    paint();
  });
  keys.forEach((k) => q("#sc-" + k).addEventListener("input", (e) => { st[k] = +e.target.value; paint(); }));
  paint();
}
