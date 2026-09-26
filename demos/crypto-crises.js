// 交互演示：加密危机实验室——两种模式。
// ① Terra 螺旋：UST 赎回 → 增发 LUNA → 市场接不住 → LUNA 跌 → “支撑”缩水 → UST 进一步脱锚；可开关 8 万 BTC 储备护盘（护盘本身会砸比特币价格）。
// ② 交易所挤兑（FTX 式）：客户存款 100，资产 = 可用币 + 自家代币 + 借给关联方的不流动资产；逐日提币，看哪天暂停提币、剩下的人能拿回多少。
import { fmtPct, fmtNum, fmtUsd, clamp } from "./_fin.js";
import { lineChart, chartBlock } from "./_chart.js";

export default function mount(root, lang) {
  const en = lang === "en";
  const T = (zh, e) => (en ? e : zh);

  let mode = "terra";
  const TR = { panic: 10, depth: 5, reserve: true };
  const EX = { liq: 15, tok: 35, crash: 90, rec: 30, wave: 20, oneToOne: false };

  const sl = (id, label, min, max, step, unit) =>
    `<div><label class="demo-label">${label}${T("：", ": ")}<b id="ccx-v-${id}"></b>${unit}</label><input class="demo-slider" type="range" id="ccx-s-${id}" min="${min}" max="${max}" step="${step}"></div>`;

  root.innerHTML = `
    <div class="demo">
      <div class="demo-head">${T("💥 加密危机实验室：死亡螺旋与交易所挤兑", "💥 Crypto-crisis lab: death spirals and exchange runs")}</div>
      <div class="demo-row">
        <div class="demo-seg" id="ccx-mode">
          <button data-m="terra">${T("Terra/Luna 螺旋", "Terra/Luna spiral")}</button>
          <button data-m="ex">${T("交易所挤兑（FTX 式）", "Exchange run (FTX-style)")}</button>
        </div>
      </div>
      <div id="ccx-terra">
        <div class="demo-grid">
          ${sl("panic", T("每轮基础赎回（占 UST 流通量）", "Base redemptions per round (% of UST)"), 2, 25, 1, "%")}
          ${sl("depth", T("市场能接住的 LUNA 抛压（深度）", "Market depth for LUNA selling"), 2, 30, 1, T(" 十亿美元", " $bn"))}
          <div><div class="demo-label">${T("用约 8 万 BTC 储备护盘", "Defend the peg with ~80,000 BTC")}</div>
            <div class="demo-seg" id="ccx-res"><button data-v="0">${T("不护盘", "No defense")}</button><button data-v="1">${T("护盘", "Defend")}</button></div></div>
        </div>
        <div class="stat-row">
          <div class="stat"><div class="k">${T("UST 价格", "UST price")}</div><div class="v" id="ccx-u">–</div></div>
          <div class="stat"><div class="k">${T("LUNA 价格", "LUNA price")}</div><div class="v" id="ccx-p">–</div></div>
          <div class="stat"><div class="k">${T("LUNA 供应量", "LUNA supply")}</div><div class="v" id="ccx-L">–</div></div>
          <div class="stat"><div class="k">${T("剩余 BTC 储备", "BTC reserve left")}</div><div class="v" id="ccx-r">–</div></div>
          <div class="stat"><div class="k">${T("比特币价格（受抛压）", "Bitcoin price (after selling)")}</div><div class="v" id="ccx-b">–</div></div>
        </div>
        <div id="ccx-chart"></div>
        <div class="demo-log" id="ccx-tlog"></div>
        <div class="demo-meta">${T("示意模型：起点 UST 180 亿美元、LUNA 3.5 亿枚 × 80 美元、储备 8 万 BTC × 3.5 万美元。UST 价格 = min(1, (LUNA 市值 + 储备) ÷ UST 流通量 ÷ 1.5)；脱锚越深，赎回越多；新增 LUNA 与原有持有人的恐慌抛售按“市场深度”压低价格；每轮链上赎回上限约 5 亿美元；储备只在脱锚后才出手；每卖出 10 亿美元 BTC，币价约跌 2%。", "Stylized model: starts with $18bn of UST, 350m LUNA at $80, and 80,000 BTC at $35,000 in reserve. UST price = min(1, (LUNA market cap + reserve) ÷ UST supply ÷ 1.5); the deeper the depeg, the more redemptions; selling of new LUNA and panic selling by existing holders push its price down according to market depth; on-chain redemptions are capped at about $0.5bn per round; the reserve only steps in once the peg breaks; every $1bn of BTC sold knocks about 2% off bitcoin.")}</div>
      </div>
      <div id="ccx-ex">
        <div class="demo-grid">
          ${sl("liq", T("资产中可随时兑付的币", "Assets in coins payable on demand"), 5, 100, 5, "%")}
          ${sl("tok", T("资产中的自家代币", "Assets in the house token"), 0, 60, 5, "%")}
          ${sl("crash", T("挤兑时自家代币跌幅", "House-token crash during the run"), 0, 100, 5, "%")}
          ${sl("rec", T("关联方贷款/风投的急售回收率", "Fire-sale recovery on affiliate loans / venture bets"), 0, 100, 5, "%")}
          ${sl("wave", T("每天提币（占剩余存款）", "Daily withdrawals (% of remaining deposits)"), 5, 60, 5, "%")}
          <div><div class="demo-label">${T("1:1 隔离托管（客户资产不被挪用）", "1:1 segregated custody (no misuse of customer assets)")}</div>
            <div class="demo-seg" id="ccx-11"><button data-v="0">${T("否", "No")}</button><button data-v="1">${T("是", "Yes")}</button></div></div>
        </div>
        <div class="cmp">
          <div class="cmp-cell"><h5>${T("资产构成（客户存款 = 100）", "Asset mix (customer deposits = 100)")}</h5><div id="ccx-mix"></div></div>
          <div class="cmp-cell"><h5>${T("结局", "Outcome")}</h5><div class="stat-row">
            <div class="stat"><div class="k">${T("暂停提币", "Withdrawals halted")}</div><div class="v" id="ccx-halt">–</div></div>
            <div class="stat"><div class="k">${T("足额取走", "Paid in full")}</div><div class="v pos" id="ccx-paid">–</div></div>
            <div class="stat"><div class="k">${T("剩余客户回收率", "Recovery for the rest")}</div><div class="v" id="ccx-rec">–</div></div>
          </div></div>
        </div>
        <div class="demo-log" id="ccx-elog"></div>
      </div>
      <p class="demo-tip">${T(
        "Terra：先看“护盘”——8 万 BTC 只能拖慢几轮，还把比特币本身砸低；再把市场深度调小，看 LUNA 供应量怎样在几轮之内爆炸。交易所：默认参数下，第 1 天提币就把可用的币掏空；把“1:1 隔离托管”打开，同样的挤兑下每个人都拿回全部——挤兑可怕的不是提币，而是资产被挪走了。",
        "Terra: start with “Defend” — 80,000 BTC only buys a few rounds and drags bitcoin itself down; then shrink market depth and watch LUNA's supply explode within a few rounds. Exchange: with the defaults, day-one withdrawals already drain the usable coins; switch on 1:1 segregated custody and the same run pays everyone in full — what makes a run deadly is not withdrawals but assets that were moved elsewhere."
      )}</p>
    </div>`;

  const q = (s) => root.querySelector(s);
  const segOn = (sel, on) => root.querySelectorAll(sel + " button").forEach((b) => b.classList.toggle("on", (b.dataset.v === "1") === on));

  function simTerra() {
    let S = 18, p = 80, L = 0.35, resBtc = TR.reserve ? 80000 : 0, btcPx = 35000;
    const rows = [{ t: 0, u: 1, p, L, S, res: resBtc, btc: btcPx }];
    let u = 1;
    for (let t = 1; t <= 15 && S > 0.05; t++) {
      const rho = TR.panic / 100 + 0.5 * (1 - u);
      const exitDemand = Math.min(S, rho * S);
      let D = 0;
      const resUsd = resBtc * btcPx / 1e9;
      if (resUsd > 0.001 && u < 0.995) {
        D = Math.min(resUsd, 0.5 * exitDemand);
        resBtc -= D * 1e9 / btcPx; btcPx *= (1 - 0.02 * D); S -= D;
      }
      const Reff = Math.min(0.5, exitDemand - D); // 链上铸造–销毁每轮有容量上限（约 5 亿美元），排不上队的人只能在二级市场折价卖
      const holderSell = (0.02 + 0.6 * (1 - u)) * p * L; // 原有 LUNA 持有人也在脱锚时恐慌抛售
      if (Reff > 0) { L += Reff / p; S -= Reff; }
      p *= Math.exp(-(Math.max(0, Reff) + holderSell) / TR.depth);
      const MC = p * L;
      const B = (MC + resBtc * btcPx / 1e9) / Math.max(S, 1e-9);
      u = clamp(B / 1.5, 0, 1);
      rows.push({ t, u, p, L, S, res: resBtc, btc: btcPx });
    }
    return rows;
  }

  function paintTerra() {
    const rows = simTerra(), last = rows[rows.length - 1];
    const set = (id, v, cls) => { const el = q(id); el.textContent = v; el.className = "v " + (cls || ""); };
    set("#ccx-u", "$" + fmtNum(last.u, 2), last.u < 0.98 ? "neg" : "pos");
    set("#ccx-p", last.p >= 1 ? "$" + fmtNum(last.p, 2) : "$" + last.p.toPrecision(2), last.p < 40 ? "neg" : "");
    set("#ccx-L", last.L >= 1 ? fmtNum(last.L, 1) + T(" 十亿枚", "bn") : fmtNum(last.L * 1000, 0) + T(" 百万枚", "m"), last.L > 1 ? "neg" : "");
    set("#ccx-r", fmtNum(Math.max(0, last.res), 0) + " BTC", last.res < 1000 && TR.reserve ? "neg" : "");
    set("#ccx-b", fmtUsd(last.btc), last.btc < 34000 ? "neg" : "");
    const n = rows.length - 1;
    const st = (key, scale) => (x) => scale(rows[Math.min(n, Math.round(x))][key]);
    const ch = lineChart({ fns: [{ f: st("u", (v) => v), cls: "line2" }, { f: st("p", (v) => v / 80), cls: "line3" }, { f: st("btc", (v) => v / 35000), cls: "line5" }], lo: 0, hi: Math.max(1, n), xlabel: T("轮", "round"), forceZero: true, uid: "ccx", samples: Math.max(1, n) * 4 });
    q("#ccx-chart").innerHTML = chartBlock(ch, [["var(--blue)", T("UST 价格（美元）", "UST price ($)")], ["var(--red)", T("LUNA 价格（起点 = 1）", "LUNA price (start = 1)")], ["var(--btc)", T("比特币价格（起点 = 1）", "Bitcoin price (start = 1)")]]);
    const lines = [];
    const firstDepeg = rows.find((r) => r.u < 0.98);
    const resOut = rows.find((r) => TR.reserve && r.res < 1);
    if (firstDepeg) lines.push(`<span class="bad">${T(`第 ${firstDepeg.t} 轮 UST 跌破 0.98 美元：LUNA 市值加储备已不足以让市场相信“1 UST = 1 美元”。`, `Round ${firstDepeg.t}: UST falls below $0.98 — LUNA's market cap plus the reserve no longer convinces the market that 1 UST = $1.`)}</span>`);
    else lines.push(`<span class="ok">${T("在这组参数下 UST 守住了锚定：赎回被 LUNA 的市场深度吸收。", "With these settings UST holds its peg: the market is deep enough to absorb the LUNA.")}</span>`);
    if (resOut) lines.push(T(`第 ${resOut.t} 轮储备比特币耗尽；护盘期间比特币价格被压到 ${fmtUsd(resOut.btc)}。`, `The bitcoin reserve runs out in round ${resOut.t}; the defense pushed bitcoin down to ${fmtUsd(resOut.btc)}.`));
    lines.push(T(`LUNA 供应量从 3.5 亿枚变为 ${fmtNum(last.L * 1000, 0)} 百万枚（${fmtNum(last.L / 0.35, 1)} 倍），价格从 80 美元变为 ${last.p >= 0.01 ? "$" + fmtNum(last.p, 2) : "不足 1 美分"}。`,
      `LUNA supply went from 350m to ${fmtNum(last.L * 1000, 0)}m tokens (${fmtNum(last.L / 0.35, 1)}x), and its price from $80 to ${last.p >= 0.01 ? "$" + fmtNum(last.p, 2) : "under a cent"}.`));
    lines.push(T("关键：UST 的“支撑”是 LUNA，而 LUNA 的价值又取决于人们是否相信 UST——用自己担保自己。", "The key: UST's “backing” was LUNA, and LUNA's value depended on whether people believed in UST — a promise guaranteeing itself."));
    q("#ccx-tlog").innerHTML = lines.map((l) => `<div>${l}</div>`).join("");
  }

  function paintEx() {
    let liq = EX.oneToOne ? 100 : EX.liq, tok = EX.oneToOne ? 0 : Math.min(EX.tok, 100 - liq);
    const ill = Math.max(0, 100 - liq - tok);
    q("#ccx-mix").innerHTML = [[T("可用的币", "Usable coins"), liq, "var(--green)"], [T("自家代币", "House token"), tok, "var(--btc)"], [T("关联方贷款/风投", "Affiliate loans / venture"), ill, "var(--muted)"]].map(([l, v, c]) => `
      <div class="bar2"><span class="lab">${l}</span><div class="track"><div class="fill" style="width:${v}%;background:${c}"></div></div><span class="val">${fmtNum(v, 0)}</span></div>`).join("");
    let D = 100, cash = liq, tokVal = tok, illVal = ill, paid = 0, halt = 0;
    const logs = [];
    for (let day = 1; day <= 10; day++) {
      if (day === 2 && tokVal > 0) { const v = tokVal * (1 - EX.crash / 100); logs.push(T(`第 2 天：抛售自家代币，只换回 ${fmtNum(v, 1)}（跌 ${EX.crash}%）。`, `Day 2: dumping the house token raises only ${fmtNum(v, 1)} (down ${EX.crash}%).`)); cash += v; tokVal = 0; }
      if (day === 3 && illVal > 0) { const v = illVal * EX.rec / 100; logs.push(T(`第 3 天：急售关联方贷款与风投，只收回 ${fmtNum(v, 1)}。`, `Day 3: fire-selling affiliate loans and venture stakes recovers only ${fmtNum(v, 1)}.`)); cash += v; illVal = 0; }
      const req = D * EX.wave / 100;
      if (req <= cash + 1e-9) { cash -= req; D -= req; paid += req; logs.push(T(`第 ${day} 天：提走 ${fmtNum(req, 1)}，全部兑付。`, `Day ${day}: ${fmtNum(req, 1)} withdrawn and paid in full.`)); }
      else { paid += cash; D -= cash; logs.push(`<span class="bad">${T(`第 ${day} 天：要求提走 ${fmtNum(req, 1)}，只剩 ${fmtNum(cash, 1)} 可付——暂停提币。`, `Day ${day}: ${fmtNum(req, 1)} requested, only ${fmtNum(cash, 1)} available — withdrawals halted.`)}</span>`); cash = 0; halt = day; break; }
    }
    // 破产后：剩余资产按回收价值分给剩余客户
    const leftover = cash + tokVal * (1 - EX.crash / 100) + illVal * EX.rec / 100;
    const recov = D > 1e-9 ? Math.min(1, leftover / D) : 1;
    const hv = q("#ccx-halt"); hv.textContent = halt ? T(`第 ${halt} 天`, `Day ${halt}`) : T("没有", "Never"); hv.className = "v " + (halt ? "neg" : "pos");
    q("#ccx-paid").textContent = fmtNum(paid, 1) + " / 100";
    const rv = q("#ccx-rec"); rv.textContent = halt ? fmtPct(recov, 0) : "—"; rv.className = "v " + (halt && recov < 1 ? "neg" : "pos");
    if (halt) logs.push(T(`进入破产：剩余客户存款 ${fmtNum(D, 1)}，可分配资产约 ${fmtNum(leftover, 1)}，回收率约 ${fmtPct(recov, 0)}。先提的人足额拿走，损失全部落在后面的人身上——阶段 10.1 的“先到先得”。`,
      `Bankruptcy: ${fmtNum(D, 1)} of customer claims remain against about ${fmtNum(leftover, 1)} of assets, a recovery of about ${fmtPct(recov, 0)}. Early withdrawers were paid in full; the whole loss lands on those behind them — Stage 10.1's first come, first served.`));
    else logs.push(`<span class="ok">${T("挤兑没能打垮它：每一笔提币都有真实、可立即动用的资产对应。", "The run could not break it: every withdrawal was matched by real, immediately available assets.")}</span>`);
    q("#ccx-elog").innerHTML = logs.map((l) => `<div>${l}</div>`).join("");
  }

  function sync() {
    Object.keys(TR).forEach((k) => { const s = q(`#ccx-s-${k}`); if (s) { s.value = TR[k]; q(`#ccx-v-${k}`).textContent = TR[k]; } });
    Object.keys(EX).forEach((k) => { const s = q(`#ccx-s-${k}`); if (s) { s.value = EX[k]; q(`#ccx-v-${k}`).textContent = EX[k]; } });
    segOn("#ccx-res", TR.reserve); segOn("#ccx-11", EX.oneToOne);
    root.querySelectorAll("#ccx-mode button").forEach((b) => b.classList.toggle("on", b.dataset.m === mode));
    q("#ccx-terra").style.display = mode === "terra" ? "" : "none";
    q("#ccx-ex").style.display = mode === "ex" ? "" : "none";
  }
  function paint() { sync(); if (mode === "terra") paintTerra(); else paintEx(); }

  Object.keys(TR).forEach((k) => { const s = q(`#ccx-s-${k}`); if (s) s.addEventListener("input", (e) => { TR[k] = +e.target.value; paint(); }); });
  Object.keys(EX).forEach((k) => { const s = q(`#ccx-s-${k}`); if (s) s.addEventListener("input", (e) => { EX[k] = +e.target.value; paint(); }); });
  root.querySelectorAll("#ccx-res button").forEach((b) => b.addEventListener("click", () => { TR.reserve = b.dataset.v === "1"; paint(); }));
  root.querySelectorAll("#ccx-11 button").forEach((b) => b.addEventListener("click", () => { EX.oneToOne = b.dataset.v === "1"; paint(); }));
  root.querySelectorAll("#ccx-mode button").forEach((b) => b.addEventListener("click", () => { mode = b.dataset.m; paint(); }));
  paint();
}
