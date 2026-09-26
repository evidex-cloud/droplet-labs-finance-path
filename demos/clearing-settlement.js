// 交互演示：两个沙盘——
// ① 交割窗口里的风险：选 T+3/T+2/T+1/T+0，调交易金额与波动率，
//    用解析公式和 2,000 次蒙特卡洛模拟“卖方在交割前违约”时的重置成本；
// ② 轧差的魔法：5 家券商一天随机交易 N 笔，比较逐笔（毛额）、清算所轧差（净额）与链上原子结算需要预备的现金。
import { rng, randn, mean, fmtPct, fmtUsd, fmtBig, fmtNum, tex } from "./_fin.js";

// 把 fmtUsd / fmtPct 的输出转成 LaTeX：$ → \$，千位逗号 → {,}，% → \%
const texv = (s) => String(s).replace(/\$/g, "\\$").replace(/,/g, "{,}").replace(/%/g, "\\%");

export default function mount(root, lang) {
  const en = lang === "en";
  const T = (zh, e) => (en ? e : zh);
  const Z99 = 2.326;
  let mode = "risk";
  const risk = { days: 1, value: 100000, vol: 0.3, seed: 3 };
  const net = { trades: 200, avg: 2e6, seed: 7 };
  const FIRMS = ["A", "B", "C", "D", "E"];

  root.innerHTML = `
    <div class="demo">
      <div class="demo-head">${T("🏦 清算与结算沙盘：窗口风险与轧差", "🏦 Clearing & settlement sandbox: window risk and netting")}</div>
      <div class="demo-seg" id="cs-mode">
        <button data-m="risk" class="on">${T("① 交割窗口的风险", "① Risk in the settlement window")}</button>
        <button data-m="net">${T("② 轧差 vs 原子结算", "② Netting vs atomic settlement")}</button>
      </div>
      <div id="cs-risk">
        <div class="demo-block">
          <div class="demo-seg" id="cs-cycle">
            <button data-d="3">T+3</button><button data-d="2">T+2</button><button data-d="1" class="on">T+1</button><button data-d="0">${T("T+0 原子结算", "T+0 atomic")}</button>
          </div>
        </div>
        <div class="demo-grid">
          <div class="demo-block">
            <label class="demo-label">${T("交易金额：", "Trade value: ")}<b id="cs-val-v"></b></label>
            <input class="demo-slider" id="cs-val" type="range" min="10000" max="10000000" step="10000" value="${risk.value}">
          </div>
          <div class="demo-block">
            <label class="demo-label">${T("标的年化波动率（股票约 20–40%，比特币约 50–80%）：", "Annual volatility of the asset (stocks ~20–40%, bitcoin ~50–80%): ")}<b id="cs-vol-v"></b></label>
            <input class="demo-slider" id="cs-vol" type="range" min="0.05" max="1.2" step="0.05" value="${risk.vol}">
          </div>
        </div>
        <div class="stat-row">
          <div class="stat"><div class="k">${T("99% 重置成本（公式）", "99% replacement cost (formula)")}</div><div class="v neg" id="cs-an">–</div></div>
          <div class="stat"><div class="k">${T("99% 重置成本（模拟）", "99% replacement cost (simulated)")}</div><div class="v" id="cs-mc">–</div></div>
          <div class="stat"><div class="k">${T("违约时平均损失", "Average loss on default")}</div><div class="v" id="cs-avg">–</div></div>
          <div class="stat"><div class="k">${T("清算所大致要收的保证金", "Rough CCP initial margin")}</div><div class="v acc" id="cs-im">–</div></div>
        </div>
        <div class="demo-block"><div class="demo-label">${T("同样的交易，不同结算周期下的 99% 重置成本", "Same trade, 99% replacement cost under each settlement cycle")}</div><div class="stages" id="cs-bars"></div></div>
        <div class="demo-btns"><button class="demo-btn" id="cs-re">${T("重新模拟 2,000 次违约", "Re-simulate 2,000 defaults")}</button></div>
        <div class="demo-log" id="cs-log1"></div>
      </div>
      <div id="cs-net" style="display:none">
        <div class="demo-grid">
          <div class="demo-block">
            <label class="demo-label">${T("一天的交易笔数：", "Trades in a day: ")}<b id="cs-n-v"></b></label>
            <input class="demo-slider" id="cs-n" type="range" min="3" max="2000" step="1" value="${net.trades}">
          </div>
          <div class="demo-block">
            <label class="demo-label">${T("平均每笔金额：", "Average trade size: ")}<b id="cs-s-v"></b></label>
            <input class="demo-slider" id="cs-s" type="range" min="100000" max="20000000" step="100000" value="${net.avg}">
            <div class="demo-btns"><button class="demo-btn" id="cs-day">${T("换一天的交易", "Another trading day")}</button></div>
          </div>
        </div>
        <div class="stat-row">
          <div class="stat"><div class="k">${T("逐笔结算的现金（毛额）", "Cash if settled trade by trade (gross)")}</div><div class="v neg" id="cs-g">–</div></div>
          <div class="stat"><div class="k">${T("轧差后实际流动（净额）", "Cash that moves after netting")}</div><div class="v pos" id="cs-nt">–</div></div>
          <div class="stat"><div class="k">${T("轧差节省", "Saved by netting")}</div><div class="v acc" id="cs-sv">–</div></div>
          <div class="stat"><div class="k">${T("原子结算需预先注资", "Prefunding needed for atomic settlement")}</div><div class="v" id="cs-pf">–</div></div>
        </div>
        <div class="demo-block" id="cs-firms"></div>
        <div class="demo-log" id="cs-log2"></div>
      </div>
      <p class="demo-tip">${T(
        "在①里依次点 T+3、T+2、T+1：重置成本按天数的平方根下降，不是按天数线性下降；再把波动率拖到比特币的水平，看同样一天的窗口风险大了多少。在②里把交易笔数从 3 笔拖到 2,000 笔：交易越多，轧差节省的比例越高——而原子结算要求的预先注资却和毛额一起膨胀。这就是 T+0 的真正代价。",
        "In ①, click T+3, T+2, T+1 in turn: replacement cost falls with the square root of the days, not in proportion to them; then drag volatility up to bitcoin's level and see how much riskier the same one-day window becomes. In ②, drag the trade count from 3 to 2,000: the more trades, the bigger the share netting saves — while the prefunding atomic settlement demands swells along with the gross. That is the real cost of T+0."
      )}</p>
    </div>`;

  const $ = (id) => root.querySelector("#" + id);
  const cost99 = (v, vol, d) => v * Z99 * vol / Math.sqrt(252) * Math.sqrt(d);

  function paintRisk() {
    $("cs-val-v").textContent = fmtUsd(risk.value, 0);
    $("cs-vol-v").textContent = fmtPct(risk.vol, 0);
    const d = risk.days;
    const an = cost99(risk.value, risk.vol, d);
    // 蒙特卡洛：卖方在交割日违约；只有价格上涨时买方才需多付钱重新买入
    const rand = rng(risk.seed), losses = [];
    for (let i = 0; i < 2000; i++) {
      const r = risk.vol / Math.sqrt(252) * Math.sqrt(d) * randn(rand);
      losses.push(Math.max(0, risk.value * (Math.exp(r) - 1)));
    }
    losses.sort((a, b) => a - b);
    const q99 = d === 0 ? 0 : losses[Math.floor(0.99 * losses.length)];
    $("cs-an").textContent = fmtUsd(an, 0);
    $("cs-mc").textContent = fmtUsd(q99, 0);
    $("cs-avg").textContent = fmtUsd(d === 0 ? 0 : mean(losses), 0);
    $("cs-im").textContent = d === 0 ? T("不需要", "None") : fmtUsd(an, 0);

    const max = cost99(risk.value, risk.vol, 3) || 1;
    $("cs-bars").innerHTML = [3, 2, 1, 0].map((k) => {
      const c = cost99(risk.value, risk.vol, k);
      return `<div class="stage-bar"><span class="lab">${k === 0 ? T("T+0 原子", "T+0 atomic") : "T+" + k}</span><div class="track"><div class="fill" style="width:${(c / max) * 100}%;${k === d ? "" : "opacity:.4"}"></div></div><span class="val">${fmtUsd(c, 0)}</span></div>`;
    }).join("");

    const lines = [];
    if (d === 0) {
      lines.push(`<span class="ok">${T("原子结算：钱和证券在同一笔链上交易里同时交付，没有交割窗口，重置成本与本金风险都是 0，也不需要清算所的保证金。", "Atomic settlement: cash and securities move in the same on-chain transaction, so there is no window; replacement-cost and principal risk are both zero, and no clearing-house margin is needed.")}</span>`);
      lines.push(`<span class="warn">${T("代价在②里：每笔都要预先全额注资，没有轧差。", "The cost is in ②: every trade must be prefunded in full, with no netting.")}</span>`);
    } else {
      const cut = 1 - cost99(1, 1, 1) / cost99(1, 1, 2);
      lines.push(`${T("公式：", "Formula: ")}${tex(String.raw`\text{${T("金额", "value")}} \times 2.33 \times \dfrac{\text{${T("波动率", "vol")}}}{\sqrt{252}} \times \sqrt{${d}} = ${texv(fmtUsd(risk.value, 0))} \times 2.33 \times \dfrac{${texv(fmtPct(risk.vol, 0))}}{\sqrt{252}} \times \sqrt{${d}} \approx \mathbf{${texv(fmtUsd(an, 0))}}`)}${T("（占交易额 ", " (")}${fmtPct(an / risk.value, 2)}${T("）。模拟只计算价格上涨的情形，所以结果略有不同。", " of the trade). The simulation only counts moves where the price rises, so it differs slightly.")}`);
      lines.push(`${T("从 T+2 缩到 T+1，这项风险下降 ", "Going from T+2 to T+1 cuts this risk by ")}<b>${fmtPct(cut, 0)}</b>${T("——窗口减半，风险只降约三成，因为价格波动按时间的平方根增长。", " — halving the window only cuts the risk by about a third, because price moves grow with the square root of time.")}`);
      if (risk.vol >= 0.5) lines.push(`<span class="warn">${T("这是比特币级别的波动：同样一天的窗口，风险是 20% 波动率股票的 ", "This is bitcoin-level volatility: the same one-day window carries ")}${fmtNum(risk.vol / 0.2, 1)}${T(" 倍——这就是为什么加密衍生品的保证金要求高得多（阶段 7.5）。", "x the risk of a 20%-vol stock — which is why crypto derivatives demand far more margin (Stage 7.5).")}</span>`);
    }
    $("cs-log1").innerHTML = lines.map((l) => `<div>${l}</div>`).join("");
  }

  function paintNet() {
    $("cs-n-v").textContent = fmtNum(net.trades, 0);
    $("cs-s-v").textContent = "$" + fmtBig(net.avg, 1);
    const rand = rng(net.seed);
    const buys = FIRMS.map(() => 0), sells = FIRMS.map(() => 0);
    let gross = 0;
    for (let i = 0; i < net.trades; i++) {
      const b = Math.floor(rand() * FIRMS.length);
      let s = Math.floor(rand() * (FIRMS.length - 1)); if (s >= b) s++;
      const v = net.avg * Math.exp(0.8 * randn(rand) - 0.32);
      buys[b] += v; sells[s] += v; gross += v;
    }
    const netPos = FIRMS.map((_, i) => sells[i] - buys[i]); // 正 = 净收款
    const netMove = netPos.filter((x) => x > 0).reduce((s, x) => s + x, 0);
    const prefund = buys.reduce((s, x) => s + x, 0);
    $("cs-g").textContent = "$" + fmtBig(gross, 1);
    $("cs-nt").textContent = "$" + fmtBig(netMove, 1);
    $("cs-sv").textContent = fmtPct(1 - netMove / gross, 1);
    $("cs-pf").textContent = "$" + fmtBig(prefund, 1);

    const max = Math.max(...buys, ...netPos.map(Math.abs), 1);
    $("cs-firms").innerHTML = `<div class="demo-label">${T("每家券商：原子结算要预备的买入现金（浅色）vs 轧差后真正要付的净额（深色）", "Each broker: cash to prefund for its buys under atomic settlement (light) vs the net it actually pays after netting (dark)")}</div>` +
      FIRMS.map((f, i) => {
        const pay = Math.max(0, -netPos[i]);
        return `<div class="bar2"><span class="lab">${T("券商 ", "Broker ")}${f}</span><div class="track"><div style="position:relative;height:100%;width:${(buys[i] / max) * 100}%;background:var(--orange-soft);border-radius:6px"><div class="fill" style="position:absolute;left:0;top:0;width:${buys[i] ? (pay / buys[i]) * 100 : 0}%;background:var(--orange)"></div></div></div><span class="val">${netPos[i] >= 0 ? T("净收 ", "gets ") : T("净付 ", "pays ")}$${fmtBig(Math.abs(netPos[i]), 1)}</span></div>`;
      }).join("");

    const lines = [];
    lines.push(`${T("逐笔结算要搬动 ", "Settling trade by trade moves ")}$${fmtBig(gross, 1)}${T("；清算所轧差后只需搬动 ", "; after the clearing house nets, only ")}<b>$${fmtBig(netMove, 1)}</b>${T("，每家只对清算所付或收一个净额。", " moves, each broker paying or receiving one net amount from the clearing house.")}`);
    lines.push(`<span class="warn">${T("原子结算没有轧差也没有信用：各家要事先把全部买入资金 ", "Atomic settlement has no netting and no credit: brokers must place all ")}$${fmtBig(prefund, 1)}${T(" 放到链上，是净额的 ", " of buying cash on-chain in advance — ")}${fmtNum(prefund / Math.max(netMove, 1), 1)}${T(" 倍。", "x the net.")}</span>`);
    if (net.trades <= 5) lines.push(`${T("交易很少时，轧差能省的不多——它的威力来自大量交易相互抵消。", "With very few trades, netting saves little — its power comes from many trades offsetting each other.")}`);
    $("cs-log2").innerHTML = lines.map((l) => `<div>${l}</div>`).join("");
  }

  const paint = () => (mode === "risk" ? paintRisk() : paintNet());
  root.querySelectorAll("#cs-mode button").forEach((b) => b.addEventListener("click", () => {
    mode = b.dataset.m;
    root.querySelectorAll("#cs-mode button").forEach((x) => x.classList.toggle("on", x === b));
    $("cs-risk").style.display = mode === "risk" ? "" : "none";
    $("cs-net").style.display = mode === "net" ? "" : "none";
    paint();
  }));
  root.querySelectorAll("#cs-cycle button").forEach((b) => b.addEventListener("click", () => {
    risk.days = +b.dataset.d;
    root.querySelectorAll("#cs-cycle button").forEach((x) => x.classList.toggle("on", x === b));
    paintRisk();
  }));
  $("cs-val").addEventListener("input", (e) => { risk.value = +e.target.value; paintRisk(); });
  $("cs-vol").addEventListener("input", (e) => { risk.vol = +e.target.value; paintRisk(); });
  $("cs-re").addEventListener("click", () => { risk.seed += 1; paintRisk(); });
  $("cs-n").addEventListener("input", (e) => { net.trades = +e.target.value; paintNet(); });
  $("cs-s").addEventListener("input", (e) => { net.avg = +e.target.value; paintNet(); });
  $("cs-day").addEventListener("click", () => { net.seed += 1; paintNet(); });
  paint();
}
