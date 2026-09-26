// 交互演示：剩余索取权沙盘——拖动资产价值与负债，看债主与股东各拿多少；
// 切换到“橙子公司”，同一张收益图换成比特币资产与三层优先索取权。
import { waterfall, amplification, fmtPct, fmtNum, fmtUsd, clamp } from "./_fin.js";
import { lineChart, chartBlock } from "./_chart.js";

export default function mount(root, lang) {
  const en = lang === "en";
  const T = (zh, e) => (en ? e : zh);

  const st = { mode: "cafe", debt: 5, assets: 10, btcPx: 100000 };
  const ORANGE = { btc: 10000, shares: 100, basePx: 100000 }; // shares in millions
  const orangeLayers = [
    { name: T("可转债", "Convertible notes"), claim: 150 },
    { name: T("F 系列优先股（累积）", "Series F preferred (cumulative)"), claim: 100 },
    { name: T("D 系列优先股（非累积）", "Series D preferred (non-cumulative)"), claim: 50 },
  ];

  root.innerHTML = `
    <div class="demo">
      <div class="demo-head">${T("🧮 剩余索取权沙盘：付清所有人之后，股东拿到什么", "🧮 Residual-claim sandbox: what owners get after everyone else is paid")}</div>
      <div class="demo-block">
        <div class="demo-seg" id="ws-mode">
          <button data-m="cafe" class="on">${T("晨光咖啡（百万元）", "Morning Coffee ($M)")}</button>
          <button data-m="orange">${T("橙子公司（百万美元）", "Orange Corp ($M)")}</button>
        </div>
      </div>
      <div class="demo-grid">
        <div class="demo-block" id="ws-ctl"></div>
        <div class="demo-block">
          <div class="stat-row">
            <div class="stat"><div class="k">${T("资产价值", "Asset value")}</div><div class="v" id="ws-a">–</div></div>
            <div class="stat"><div class="k">${T("优先索取权合计", "Senior claims")}</div><div class="v" id="ws-d">–</div></div>
            <div class="stat"><div class="k">${T("股东剩余", "Equity residual")}</div><div class="v acc" id="ws-e">–</div></div>
          </div>
          <div class="stat-row">
            <div class="stat"><div class="k">${T("每股剩余价值", "Residual per share")}</div><div class="v" id="ws-ps">–</div></div>
            <div class="stat"><div class="k">${T("放大倍数", "Amplification")}</div><div class="v" id="ws-amp">–</div></div>
          </div>
          <div id="ws-bars"></div>
        </div>
      </div>
      <div class="demo-block">
        <div class="demo-label">${T("收益图：横轴 = 资产价值，紫线 = 优先索取人合计，蓝线 = 普通股", "Payoff chart: x = asset value, violet = senior claimants combined, blue = common stock")}</div>
        <div id="ws-chart"></div>
      </div>
      <div class="demo-block"><div class="demo-log" id="ws-log"></div></div>
      <p class="demo-tip">${T(
        "先在晨光咖啡里把负债拖到 8、再把资产从 10 拖到 12：资产涨 20%，股东涨 100%——杠杆越高，股票越像期权。再切到橙子公司，把比特币拖到 30,000 美元：净值恰好只够付清三层优先索取权，普通股的剩余归零。",
        "In Morning Coffee, drag debt to 8, then move assets from 10 to 12: assets +20%, equity +100% — the more leverage, the more a stock behaves like an option. Then switch to Orange Corp and drag bitcoin to $30,000: NAV just covers the three senior layers and the common's residual is gone."
      )}</p>
    </div>`;

  const ctl = root.querySelector("#ws-ctl");

  const drawControls = () => {
    if (st.mode === "cafe") {
      ctl.innerHTML = `
        <label class="demo-label">${T("负债（银行贷款，百万元）", "Debt (bank loan, $M)")}${T("：", ": ")}<b id="ws-dv">${st.debt}</b></label>
        <input class="demo-slider" type="range" min="0" max="9.5" step="0.5" value="${st.debt}" id="ws-debt" />
        <label class="demo-label">${T("资产最终价值（百万元，开店时 = 10）", "Final asset value ($M, 10 at start)")}${T("：", ": ")}<b id="ws-av">${st.assets}</b></label>
        <input class="demo-slider" type="range" min="0" max="20" step="0.25" value="${st.assets}" id="ws-assets" />
        <div class="demo-meta">${T("股数：100 万股。开店时资产 10、股东投入 = 10 − 负债。", "Shares: 1 million. At start: assets 10, owners' stake = 10 − debt.")}</div>`;
      ctl.querySelector("#ws-debt").addEventListener("input", (e) => { st.debt = +e.target.value; paint(); });
      ctl.querySelector("#ws-assets").addEventListener("input", (e) => { st.assets = +e.target.value; paint(); });
    } else {
      ctl.innerHTML = `
        <label class="demo-label">${T("比特币价格（美元）", "Bitcoin price (USD)")}${T("：", ": ")}<b id="ws-pv">${fmtUsd(st.btcPx)}</b></label>
        <input class="demo-slider" type="range" min="10000" max="250000" step="5000" value="${st.btcPx}" id="ws-px" />
        <div class="demo-meta">${T("持有 10,000 BTC · 普通股 1 亿股 · 可转债 1.5 亿 · F 优先股 1 亿 · D 优先股 0.5 亿（均为示意，见 AUTHORING 橙子公司）。", "Holds 10,000 BTC · 100M common shares · $150M converts · $100M Series F · $50M Series D (illustrative Orange Corp numbers).")}</div>`;
      ctl.querySelector("#ws-px").addEventListener("input", (e) => { st.btcPx = +e.target.value; paint(); });
    }
  };

  const model = () => {
    if (st.mode === "cafe") {
      const layers = [{ name: T("银行贷款", "Bank loan"), claim: st.debt }];
      return { V: st.assets, V0: 10, layers, shares: 1, unit: T("百万元", "$M"), perShareUnit: T("元", "$"), hi: 20 };
    }
    const V = (ORANGE.btc * st.btcPx) / 1e6, V0 = (ORANGE.btc * ORANGE.basePx) / 1e6;
    return { V, V0, layers: orangeLayers, shares: ORANGE.shares, unit: "$M", perShareUnit: "$", hi: 2500 };
  };

  const paint = () => {
    const m = model();
    if (st.mode === "cafe") {
      root.querySelector("#ws-dv").textContent = st.debt;
      root.querySelector("#ws-av").textContent = st.assets;
    } else {
      root.querySelector("#ws-pv").textContent = fmtUsd(st.btcPx);
    }
    const senior = m.layers.reduce((s, l) => s + l.claim, 0);
    const w = waterfall(m.V, m.layers), w0 = waterfall(m.V0, m.layers);
    const E = w.equity, E0 = w0.equity;
    const money = (x) => (st.mode === "cafe" ? fmtNum(x, 2) : fmtNum(x, 0));
    root.querySelector("#ws-a").textContent = money(m.V);
    root.querySelector("#ws-d").textContent = money(senior);
    root.querySelector("#ws-e").textContent = money(E);
    const ps = E / m.shares;
    root.querySelector("#ws-ps").textContent = st.mode === "cafe" ? T(fmtNum(ps, 2) + " 元", "$" + fmtNum(ps, 2)) : "$" + fmtNum(ps, 2);
    const amp = amplification(m.V, senior);
    root.querySelector("#ws-amp").textContent = isFinite(amp) ? fmtNum(amp, 2) + "x" : "∞";

    const maxBar = Math.max(m.V, senior + 1e-9);
    const rows = w.rows.map((r) => `<div class="bar2"><span class="lab">${r.name}</span><div class="track"><div class="fill" style="width:${clamp((r.paid / maxBar) * 100, 0, 100)}%;background:var(--blue)"></div></div><span class="val">${fmtPct(r.recovery, 0)}</span></div>`);
    rows.push(`<div class="bar2"><span class="lab">${T("普通股", "Common")}</span><div class="track"><div class="fill" style="width:${clamp((E / maxBar) * 100, 0, 100)}%;background:var(--orange)"></div></div><span class="val">${money(E)}</span></div>`);
    root.querySelector("#ws-bars").innerHTML = `<div class="demo-meta">${T("各层回收率（右侧百分比）", "Recovery by layer (percent on the right)")}</div>` + rows.join("");

    const res = lineChart({
      fns: [
        { f: (x) => Math.min(x, senior), cls: "line2" },
        { f: (x) => Math.max(x - senior, 0), cls: "line" },
      ],
      lo: 0, hi: m.hi, xlabel: T("资产价值", "Asset value") + " (" + m.unit + ")",
      markerX: m.V, markerLabel: T("当前", "now"), forceZero: true, uid: "ws",
    });
    root.querySelector("#ws-chart").innerHTML = chartBlock(res, [["var(--blue)", T("优先索取人（封顶）", "Senior claimants (capped)")], ["var(--orange)", T("普通股（剩余，下限为 0）", "Common (residual, floor at 0)")]]);

    const lines = [];
    const dA = m.V / m.V0 - 1;
    if (E0 > 0) {
      const dE = E / E0 - 1;
      lines.push(`${T("资产相对起点", "Assets vs start")} <b>${fmtPct(dA, 1)}</b> → ${T("股东剩余相对起点", "equity residual vs start")} <b class="${dE >= 0 ? "ok" : "bad"}">${fmtPct(dE, 1)}</b>${Math.abs(dA) > 1e-9 ? T("（约 ", " (about ") + fmtNum(dE / dA, 2) + T("×）", "×)") : ""}`);
    } else {
      lines.push(`<span class="warn">${T("起点时股东就没有剩余（负债 ≥ 资产），这已经不是一家正常的公司。", "At the start the owners have no residual (debt ≥ assets) — not a going concern.")}</span>`);
    }
    if (E <= 0) {
      const short = w.rows.filter((r) => r.recovery < 1).map((r) => r.name).join(T("、", ", "));
      lines.push(`<span class="bad">${T("剩余索取权归零。有限责任：股东最多亏光投入，不会倒欠。", "The residual claim is wiped out. Limited liability: owners lose their stake but owe nothing more.")}</span>${short ? " " + T("开始吃亏的层：", "Layers now taking losses: ") + short : ""}`);
    } else if (isFinite(amp) && amp > 3) {
      lines.push(`<span class="warn">${T("资产只比优先索取权多一点点：普通股像一份深度价外的看涨期权，资产每动 1%，它动约 ", "Assets barely exceed senior claims: common behaves like a deep out-of-the-money call; each 1% asset move moves it about ")}${fmtNum(amp, 1)}${T("%。", "%.")}</span>`);
    } else {
      lines.push(`<span class="ok">${T("缓冲充足：资产是优先索取权的 ", "Comfortable cushion: assets are ")}${senior > 0 ? fmtNum(m.V / senior, 2) + "x" : "∞"}${T("。", " senior claims.")}</span>`);
    }
    root.querySelector("#ws-log").innerHTML = lines.map((l) => `<div>${l}</div>`).join("");
  };

  root.querySelectorAll("#ws-mode button").forEach((b) => b.addEventListener("click", () => {
    st.mode = b.dataset.m;
    root.querySelectorAll("#ws-mode button").forEach((x) => x.classList.toggle("on", x === b));
    drawControls(); paint();
  }));
  drawControls();
  paint();
}
