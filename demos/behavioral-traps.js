// 交互演示：行为陷阱实验室——(1) 损失厌恶测试：调赌局与损失厌恶系数，看“理性的期望”与“感受的价值”何时分道扬镳；
// (2) 四个“你”走同一条价格路径：买入持有、纪律再平衡、FOMO 追涨 + 恐慌割肉、FOMO + 杠杆（会被强平），
// 比较终值、最大回撤与交易次数。价格路径可复现、可重抽。
import { rng, randn, maxDrawdown, fmtPct, fmtNum, tex } from "./_fin.js";
import { lineChart, chartBlock } from "./_chart.js";

export default function mount(root, lang) {
  const en = lang === "en";
  const T = (zh, e) => (en ? e : zh);
  const D = 365;

  const S = { win: 150, lam: 2.25, mu: 30, sig: 65, yrs: 6, fomo: 40, panic: 25, lev: 3, seed: 5 };

  const sl = (id, label, min, max, step, unit) => `
    <div class="demo-block">
      <label class="demo-label">${label}${T("：", ": ")}<b id="bt-v-${id}"></b>${unit}</label>
      <input class="demo-slider" type="range" id="bt-s-${id}" min="${min}" max="${max}" step="${step}" />
    </div>`;

  root.innerHTML = `
    <div class="demo">
      <div class="demo-head">${T("🧠 行为陷阱实验室：同一条路，四个不同的你", "🧠 Behavioral-traps lab: one road, four different yous")}</div>
      <div class="demo-block">
        <div class="demo-label">${T("第一部分 · 损失厌恶测试：五五开，赢 X 元或输 100 元", "Part 1 · Loss-aversion test: 50/50 to win $X or lose $100")}</div>
        <div class="demo-grid">
          ${sl("win", T("赢时得到", "Win amount"), 50, 400, 5, "")}
          ${sl("lam", `${T("损失厌恶系数", "Loss-aversion coefficient")} ${tex(String.raw`\lambda`)}`, 1, 3.5, 0.05, "")}
        </div>
        <div class="stat-row">
          <div class="stat"><div class="k">${T("期望值", "Expected value")}</div><div class="v" id="bt-ev">–</div></div>
          <div class="stat"><div class="k">${T("前景理论下“感受的价值”", "Prospect-theory felt value")}</div><div class="v" id="bt-pv">–</div></div>
          <div class="stat"><div class="k">${T("感受上刚好值得的赢额", "Win amount that just feels worth it")}</div><div class="v acc" id="bt-be">–</div></div>
          <div class="stat"><div class="k">${T("你会……", "You would…")}</div><div class="v" id="bt-dec">–</div></div>
        </div>
        <div class="demo-meta" id="bt-form"></div>
      </div>
      <div class="demo-block">
        <div class="demo-label">${T("第二部分 · 四个“你”走同一条比特币式价格路径（参数为教学假设，不是预测）", "Part 2 · Four yous on the same Bitcoin-like price path (teaching assumptions, not forecasts)")}</div>
        <div class="demo-grid">
          ${sl("mu", T("价格年化漂移", "Price drift per year"), -20, 60, 1, "%")}
          ${sl("sig", T("价格年化波动率", "Price volatility per year"), 20, 100, 1, "%")}
          ${sl("fomo", T("FOMO 触发：60 天涨幅超过", "FOMO trigger: 60-day gain above"), 10, 150, 5, "%")}
          ${sl("panic", T("恐慌触发：从持仓高点回撤超过", "Panic trigger: drawdown from holding peak above"), 5, 60, 1, "%")}
          ${sl("lev", T("杠杆型 FOMO 的杠杆倍数", "Leverage of the levered FOMO trader"), 1.5, 10, 0.5, "×")}
          ${sl("yrs", T("年数", "Years"), 2, 12, 1, "")}
        </div>
        <div class="demo-btns"><button class="demo-btn" id="bt-seed">${T("🎲 换一条价格路径", "🎲 Draw another price path")}</button><span class="demo-meta" id="bt-seedlab"></span></div>
        <div class="cmp" id="bt-cmp"></div>
        <div id="bt-chart"></div>
      </div>
      <div class="demo-log" id="bt-log"></div>
      <p class="demo-tip">${T(
        `第一部分：把 ${tex(String.raw`\lambda`)} 设成 1（完全理性），任何正期望的赌局都值得；设成 2.25，赢额要到约 250 元你才“感觉”值得（${tex(String.raw`\lambda`)} 与曲线弯曲共同作用）。第二部分：多换几条路径，比较“FOMO + 恐慌”和“买入持有”——追涨杀跌常常在高点进、低点出，还要付更多交易成本；再看杠杆型，它的方向判断和 FOMO 型一模一样，却经常在第一次深回调里被强平出局。`,
        `Part 1: set ${tex(String.raw`\lambda`)} to 1 (perfectly rational) and any positive-EV bet is worth taking; at 2.25 the win has to reach about $250 before it “feels” worth it (${tex(String.raw`\lambda`)} and the curve's bend together). Part 2: draw several paths and compare “FOMO + panic” with “buy and hold” — chasing and dumping tends to buy high, sell low and pay more in costs. Then look at the levered trader: its calls are identical to the FOMO trader's, yet it is often liquidated out in the first deep pullback.`
      )}</p>
    </div>`;

  const q = (s) => root.querySelector(s);
  const keys = ["win", "lam", "mu", "sig", "fomo", "panic", "lev", "yrs"];
  const A = 0.88;

  function lossTest() {
    const X = S.win, lam = S.lam;
    const ev = 0.5 * X - 0.5 * 100;
    const pv = 0.5 * Math.pow(X, A) - 0.5 * lam * Math.pow(100, A);
    const be = 100 * Math.pow(lam, 1 / A);
    const e1 = q("#bt-ev"); e1.textContent = (ev >= 0 ? "+" : "") + fmtNum(ev, 1); e1.className = "v " + (ev >= 0 ? "pos" : "neg");
    const e2 = q("#bt-pv"); e2.textContent = (pv >= 0 ? "+" : "") + fmtNum(pv, 1); e2.className = "v " + (pv >= 0 ? "pos" : "neg");
    q("#bt-be").textContent = fmtNum(be, 0);
    const d = q("#bt-dec"); d.textContent = pv >= 0 ? T("接受", "Accept") : T("拒绝", "Refuse"); d.className = "v " + (pv >= 0 ? "pos" : "neg");
    const sg = (v) => (v >= 0 ? "+" : "") + v.toFixed(1);
    q("#bt-form").innerHTML = [
      tex(String.raw`\text{${T("期望值", "EV")}} = 0.5 \times ${X} - 0.5 \times 100 = ${sg(ev)}`),
      tex(String.raw`\text{${T("感受的价值", "felt value")}} = 0.5 \times ${X}^{0.88} - 0.5 \times ${lam.toFixed(2)} \times 100^{0.88} = ${sg(pv)}`),
      tex(String.raw`\text{${T("刚好值得的赢额", "break-even win")}} = 100 \times ${lam.toFixed(2)}^{1/0.88} \approx ${be.toFixed(0)}`),
    ].join("<br>");
    return { ev, pv };
  }

  function path() {
    const rand = rng(S.seed * 7907 + 101);
    const n = S.yrs * D, mu = S.mu / 100, sg = S.sig / 100, px = [1];
    for (let t = 0; t < n; t++) px.push(px[t] * Math.exp((mu - 0.5 * sg * sg) / D + (sg / Math.sqrt(D)) * randn(rand)));
    return px;
  }

  function run(px) {
    const n = px.length - 1, rfD = 0.03 / D, cost = 0.005;
    const out = { hold: [1], disc: [1], fomo: [1], lev: [1] };
    // 买入持有
    for (let t = 1; t <= n; t++) out.hold.push(px[t] / px[0]);
    // 纪律型：50/50，季度再平衡
    let risk = 0.5, cash = 0.5, discTr = 0;
    for (let t = 1; t <= n; t++) {
      risk *= px[t] / px[t - 1]; cash *= 1 + rfD;
      if (t % 91 === 0) { const tot = risk + cash, moved = Math.abs(risk - tot / 2); risk = tot / 2 - moved * cost / 2; cash = tot / 2 - moved * cost / 2; discTr++; }
      out.disc.push(risk + cash);
    }
    // FOMO + 恐慌（L = 1）与 FOMO + 杠杆（L = S.lev，维持保证金 25%）
    const trader = (L) => {
      let eq = 1, inPos = false, entryEq = 0, pos = 0, debt = 0, peakPx = 0, trades = 0, liq = 0, lastExit = -9999;
      const series = [1];
      for (let t = 1; t <= n; t++) {
        if (inPos) {
          pos *= px[t] / px[t - 1]; debt *= 1 + rfD * (L > 1 ? 1 : 0);
          eq = pos - debt; peakPx = Math.max(peakPx, px[t]);
          if (L > 1 && eq / pos < 0.25) {        // 强制平仓：按 2% 滑点卖出
            eq = Math.max(0, pos * 0.98 - debt); inPos = false; pos = 0; debt = 0; trades++; liq++; lastExit = t;
          } else if (px[t] / peakPx - 1 < -S.panic / 100) {   // 恐慌割肉
            eq = pos * (1 - cost) - debt; inPos = false; pos = 0; debt = 0; trades++; lastExit = t;
          }
        } else {
          eq *= 1 + rfD;
          const back = t >= 60 ? px[t] / px[t - 60] - 1 : 0;
          if (eq > 0.001 && back > S.fomo / 100 && t - lastExit > 5) {  // FOMO 追涨
            const e0 = eq * (1 - cost); pos = e0 * L; debt = e0 * (L - 1); eq = e0; inPos = true; peakPx = px[t]; trades++; entryEq = eq;
          }
        }
        series.push(Math.max(eq, 0));
      }
      return { series, trades, liq };
    };
    const f1 = trader(1), f2 = trader(S.lev);
    out.fomo = f1.series; out.lev = f2.series;
    return { out, discTr, fomoTr: f1.trades, levTr: f2.trades, liq: f2.liq };
  }

  function paint() {
    keys.forEach((k) => { q(`#bt-s-${k}`).value = S[k]; q(`#bt-v-${k}`).textContent = k === "lam" ? Number(S[k]).toFixed(2) : S[k]; });
    q("#bt-seedlab").textContent = T("路径编号 ", "Path #") + S.seed;
    const lt = lossTest();
    const px = path();
    const r = run(px);
    const names = {
      hold: T("买入持有", "Buy and hold"),
      disc: T("纪律型：50% 仓位 + 季度再平衡", "Disciplined: 50% + quarterly rebalance"),
      fomo: T("FOMO 追涨 + 恐慌割肉", "FOMO chase + panic sell"),
      lev: T("FOMO + 杠杆", "FOMO + leverage") + ` ${S.lev}×`,
    };
    const trades = { hold: 1, disc: r.discTr, fomo: r.fomoTr, lev: r.levTr };
    const stats = {};
    Object.keys(r.out).forEach((k) => {
      const s = r.out[k], end = s[s.length - 1];
      stats[k] = { end, cagr: end > 0 ? Math.pow(end, 1 / S.yrs) - 1 : -1, mdd: maxDrawdown(s.map((x) => Math.max(x, 1e-9))) };
    });
    const best = Object.keys(stats).reduce((a, b) => (stats[a].end >= stats[b].end ? a : b));
    q("#bt-cmp").className = "cmp";
    q("#bt-cmp").style.gridTemplateColumns = "repeat(auto-fit, minmax(150px, 1fr))";
    q("#bt-cmp").innerHTML = Object.keys(stats).map((k) => `
      <div class="cmp-cell${k === best ? " hl" : ""}${stats[k].end < 0.05 ? " cold" : ""}">
        <b>${names[k]}</b>
        <div>${T("终值", "Final")}: <b>${fmtNum(stats[k].end, 2)}×</b></div>
        <div>${T("年化", "CAGR")}: ${fmtPct(stats[k].cagr, 1)}</div>
        <div>${T("最大回撤", "Max DD")}: ${fmtPct(stats[k].mdd, 0)}</div>
        <div>${T("交易次数", "Trades")}: ${trades[k]}${k === "lev" && r.liq ? ` · <span style="color:var(--red)">${T("强平", "liquidated")} ${r.liq}</span>` : ""}</div>
      </div>`).join("");

    const lg = (arr) => (x) => Math.log10(Math.max(arr[Math.min(arr.length - 1, Math.round(x * D))], 1e-3));
    const ch = lineChart({
      fns: [{ f: lg(r.out.hold), cls: "line5" }, { f: lg(r.out.disc), cls: "line4" }, { f: lg(r.out.fomo), cls: "line2" }, { f: lg(r.out.lev), cls: "line3" }],
      lo: 0, hi: S.yrs, samples: 400, xlabel: T("年", "years"), forceZero: true, uid: "bt",
    });
    q("#bt-chart").innerHTML = chartBlock(ch, [
      ["var(--btc)", names.hold], ["var(--green)", names.disc], ["var(--blue)", names.fomo], ["var(--red)", names.lev],
    ]) + `<div class="demo-meta">${T("纵轴为财富的", "Vertical axis is")} ${tex(String.raw`\log_{10}`)}${T("（0 是起点，1 是 10 倍，−1 是只剩十分之一）。每笔交易成本 0.5%，现金年息 3%，杠杆维持保证金 25%。不构成投资建议。", " of wealth (0 is the start, 1 is ten times, −1 is one-tenth left). Each trade costs 0.5%, cash earns 3% a year, leverage has a 25% maintenance margin. Not investment advice.")}</div>`;

    const lines = [];
    if (lt.ev > 0 && lt.pv < 0) lines.push(`<span class="warn">${T("期望为正，但损失厌恶让这个赌局“感觉”不值得——这就是前景理论。", "Positive expected value, yet loss aversion makes the bet feel not worth it — that's prospect theory.")}</span>`);
    if (stats.fomo.end < stats.hold.end) lines.push(`${T("本路径上，FOMO + 恐慌型比买入持有少了", "On this path, FOMO + panic ended")} ${fmtPct(1 - stats.fomo.end / Math.max(stats.hold.end, 1e-9), 0)}${T("——追涨杀跌与交易成本的代价。", " below buy-and-hold — the cost of chasing, dumping and trading.")}`);
    else lines.push(`${T("本路径上，FOMO 型跑赢了买入持有——趋势很强时追涨也会奏效。多换几条路径，看它有多依赖运气。", "On this path the FOMO trader beat buy-and-hold — chasing can work in a strong trend. Draw more paths and see how much it depends on luck.")}`);
    if (r.liq > 0) lines.push(`<span class="bad">${T("杠杆型被强平", "The levered trader was liquidated")} ${r.liq} ${T("次：方向判断和 FOMO 型完全相同，但它失去了等待的权利。", "time(s): identical calls to the FOMO trader, but it lost the right to wait.")}</span>`);
    lines.push(`${T("纪律型的最大回撤", "The disciplined portfolio's max drawdown")} ${fmtPct(stats.disc.mdd, 0)} ${T("对比买入持有", "versus buy-and-hold's")} ${fmtPct(stats.hold.mdd, 0)}${T("：小仓位 + 再平衡让你更可能拿得住。", ": a smaller position plus rebalancing makes it easier to hold on.")}`);
    q("#bt-log").innerHTML = lines.map((x) => `<div>${x}</div>`).join("");
  }

  keys.forEach((k) => q(`#bt-s-${k}`).addEventListener("input", (ev) => { S[k] = +ev.target.value; paint(); }));
  q("#bt-seed").addEventListener("click", () => { S.seed += 1; paint(); });
  paint();
}
