// 交互演示：alpha 衰减与拥挤踩踏模拟器。一个策略的初始 alpha 被模仿者（数量随时间呈 S 形增长，AI 让曲线更陡）稀释：
// alpha(t) = alpha0 ÷ (1 + 模仿者数)；拥挤度越高，“同时出口”的踩踏冲击越频繁、越深。
// 比较三种投资者：先行者（一直持有）、跟风者（在扩散中点入场）、守纪律者（拥挤度超过阈值就降仓）。
// 用种子随机数保证可复现；统计走 _fin.js（rng / randn / mean / stdev / sharpe / maxDrawdown）。
import { rng, randn, mean, stdev, sharpe, maxDrawdown, fmtPct, fmtNum } from "./_fin.js";
import { lineChart, chartBlock } from "./_chart.js";

export default function mount(root, lang) {
  const en = lang === "en";
  const T = (zh, e) => (en ? e : zh);
  const YEARS = 10, M = YEARS * 12;
  const SPEEDS = { slow: 7, mid: 4, fast: 1.5 }; // 扩散中点（年）
  let speed = "mid", seed = 7;

  const sl = (id, zh, e, min, max, step, v) =>
    `<div><label class="demo-label">${T(zh, e)}${T("：", ": ")}<b id="aim-${id}-v"></b></label><input class="demo-slider" type="range" id="aim-${id}" min="${min}" max="${max}" step="${step}" value="${v}"></div>`;

  root.innerHTML = `
    <div class="demo">
      <div class="demo-head">${T("🎣 优势的半衰期：alpha 衰减与拥挤踩踏", "🎣 The half-life of an edge: alpha decay and crowded exits")}</div>
      <div class="demo-row"><span class="demo-label">${T("AI 让模仿扩散多快", "How fast AI spreads imitation")}${T("：", ": ")}</span>
        <div class="demo-seg" id="aim-speed">
          <button data-v="slow">${T("慢（论文时代，约 7 年）", "Slow (paper era, ~7 yrs)")}</button>
          <button data-v="mid">${T("中（约 4 年）", "Medium (~4 yrs)")}</button>
          <button data-v="fast">${T("快（AI 复现，约 1.5 年）", "Fast (AI replication, ~1.5 yrs)")}</button>
        </div>
      </div>
      <div class="demo-grid">
        ${sl("a0", "初始年化 alpha", "Initial annual alpha", 2, 12, 0.5, 6)}
        ${sl("vol", "策略年化波动", "Strategy annual volatility", 4, 20, 1, 10)}
        ${sl("nmax", "最终模仿者数量", "Eventual number of imitators", 2, 20, 1, 10)}
        ${sl("sev", "拥挤出口的冲击深度", "Depth of a crowded-exit shock", 0, 30, 1, 15)}
        ${sl("thr", "守纪律者的降仓阈值（拥挤度）", "Disciplined investor's de-risk threshold (crowding)", 20, 100, 5, 60)}
      </div>
      <div class="demo-btns" id="aim-seeds">
        <span class="demo-label">${T("随机路径", "Random path")}${T("：", ": ")}</span>
        <button class="demo-btn" data-s="7">#1</button><button class="demo-btn" data-s="21">#2</button><button class="demo-btn" data-s="99">#3</button><button class="demo-btn" data-s="2026">#4</button>
      </div>
      <div class="stat-row">
        <div class="stat"><div class="k">${T("alpha 半衰期", "Alpha half-life")}</div><div class="v acc" id="aim-half"></div></div>
        <div class="stat"><div class="k">${T("第 10 年的 alpha", "Alpha in year 10")}</div><div class="v" id="aim-a10"></div></div>
        <div class="stat"><div class="k">${T("踩踏次数（10 年）", "Crowded exits (10 yrs)")}</div><div class="v neg" id="aim-nshock"></div></div>
      </div>
      <div id="aim-chart"></div>
      <div class="cmp cmp-3" id="aim-cmp"></div>
      <div class="demo-log" id="aim-log" style="margin-top:12px"></div>
      <p class="demo-tip">${T(
        "把扩散速度从“慢”切到“快”：半衰期从几年缩到一年左右，<strong>跟风者入场时，利润已经被分光，只剩拥挤的风险</strong>。再把冲击深度拉高、换几条随机路径，看“守纪律者”在拥挤时降仓，是否用少一点的收益换来了小得多的回撤。",
        "Switch diffusion from “Slow” to “Fast”: the half-life shrinks from years to about one, and <strong>by the time the follower arrives, the profit has been shared away and only the crowding risk is left</strong>. Then raise the shock depth and try other random paths: does the disciplined investor, cutting exposure when crowded, trade a little return for a much smaller drawdown?"
      )}</p>
    </div>`;

  const $ = (s) => root.querySelector(s);
  const ids = ["a0", "vol", "nmax", "sev", "thr"];

  const paint = () => {
    const p = {};
    ids.forEach((id) => (p[id] = +$("#aim-" + id).value));
    $("#aim-a0-v").textContent = fmtPct(p.a0 / 100, 1);
    $("#aim-vol-v").textContent = fmtPct(p.vol / 100, 0);
    $("#aim-nmax-v").textContent = p.nmax;
    $("#aim-sev-v").textContent = "−" + fmtPct(p.sev / 100, 0);
    $("#aim-thr-v").textContent = fmtPct(p.thr / 100, 0);

    const mid = SPEEDS[speed], w = mid / 4;
    const N = (t) => p.nmax / (1 + Math.exp(-(t - mid) / w));
    const alpha = (t) => (p.a0 / 100) / (1 + N(t));
    const crowd = (t) => N(t) / p.nmax;
    const half = p.nmax > 1 ? Math.max(0, mid - w * Math.log(p.nmax - 1)) : Infinity;

    // 共同的市场冲击（三类投资者面对同一条路径）
    const R = rng(seed);
    const z = [], shock = [];
    let nShock = 0;
    for (let m = 0; m < M; m++) {
      const t = (m + 0.5) / 12;
      z.push(randn(R));
      const hit = R() < 0.01 + 0.05 * crowd(t);
      const s = hit ? -(p.sev / 100) * crowd(t) : 0;
      if (hit && s < -0.005) nShock++;
      shock.push(s);
    }
    const runStrategy = (posFn) => {
      const rets = [], wealth = [1];
      for (let m = 0; m < M; m++) {
        const t = (m + 0.5) / 12, pos = posFn(t);
        const r = pos * (alpha(t) / 12 + (p.vol / 100) / Math.sqrt(12) * z[m] + shock[m]);
        rets.push(r);
        wealth.push(wealth[wealth.length - 1] * (1 + r));
      }
      const ann = Math.pow(wealth[M], 1 / YEARS) - 1;
      const vol = stdev(rets) * Math.sqrt(12);
      return { rets, wealth, ann, vol, sh: sharpe(mean(rets) * 12, 0, vol), mdd: maxDrawdown(wealth) };
    };
    const pioneer = runStrategy(() => 1);
    const follower = runStrategy((t) => (t >= mid ? 1 : 0));
    const disc = runStrategy((t) => (crowd(t) * 100 >= p.thr ? 0.25 : 1));

    $("#aim-half").textContent = isFinite(half) ? fmtNum(half, 1) + T(" 年", " yrs") : "–";
    $("#aim-a10").textContent = fmtPct(alpha(YEARS), 2);
    $("#aim-nshock").textContent = nShock;

    const at = (arr) => (x) => arr[Math.min(M, Math.max(0, Math.round(x * 12)))];
    const res = lineChart({
      fns: [
        { f: at(pioneer.wealth), cls: "line" },
        { f: at(follower.wealth), cls: "line3" },
        { f: at(disc.wealth), cls: "line4" },
        { f: (x) => 1 + 3 * alpha(x), cls: "line2" },
      ],
      lo: 0, hi: YEARS, xlabel: T("年", "years"), markerX: mid, markerLabel: T("扩散中点", "diffusion midpoint"), uid: "aim",
    });
    $("#aim-chart").innerHTML = chartBlock(res, [
      ["var(--orange)", T("先行者（一直持有）", "Pioneer (holds throughout)")],
      ["var(--red)", T("跟风者（中点入场）", "Follower (enters at midpoint)")],
      ["var(--green)", T("守纪律者（拥挤时降仓）", "Disciplined (cuts when crowded)")],
      ["var(--blue)", T("当期 alpha（1 + 3×alpha，示意刻度）", "Current alpha (1 + 3×alpha, display scale)")],
    ]);

    const cell = (name, s, cls) => `<div class="cmp-cell ${cls}"><h5>${name}</h5>
      <div>${T("年化回报", "Annual return")}${T("：", ": ")}<b>${fmtPct(s.ann, 1)}</b></div>
      <div>${T("年化波动", "Volatility")}${T("：", ": ")}${fmtPct(s.vol, 1)}</div>
      <div>${T("夏普比率", "Sharpe ratio")}${T("：", ": ")}${fmtNum(s.sh, 2)}</div>
      <div>${T("最大回撤", "Max drawdown")}${T("：", ": ")}<b>${fmtPct(s.mdd, 1)}</b></div></div>`;
    $("#aim-cmp").innerHTML = cell(T("先行者", "Pioneer"), pioneer, "") + cell(T("跟风者", "Follower"), follower, "cold") + cell(T("守纪律者", "Disciplined"), disc, "hl");

    const L = [];
    L.push(`${T("alpha 从", "Alpha falls from")} ${fmtPct(p.a0 / 100, 1)} ${T("衰减到第 10 年的", "to")} ${fmtPct(alpha(YEARS), 2)}${T("（= 初始 ÷ (1 + ", " by year 10 (= initial ÷ (1 + ")}${fmtNum(N(YEARS), 1)}${T(" 个模仿者)）；半衰期约 ", " imitators)); half-life about ")}${fmtNum(half, 1)}${T(" 年。", " years.")}`);
    if (follower.ann < pioneer.ann) L.push(`<span class="bad">${T("跟风者的年化回报", "The follower's annual return")} ${fmtPct(follower.ann, 1)} ${T("低于先行者的", "trails the pioneer's")} ${fmtPct(pioneer.ann, 1)}${T("：入场时优势已被分光，却承担了全部拥挤风险。", ": it arrived after the edge was shared away, yet carried all the crowding risk.")}</span>`);
    if (disc.mdd > pioneer.mdd + 0.005) L.push(`<span class="ok">${T("守纪律者的最大回撤", "The disciplined investor's max drawdown")} ${fmtPct(disc.mdd, 1)} ${T("小于先行者的", "is smaller than the pioneer's")} ${fmtPct(pioneer.mdd, 1)}${T("——在拥挤时降仓，是一种“管住自己”的优势（阶段 11.5）。", " — cutting exposure when crowded is an edge of self-control (Stage 11.5).")}</span>`);
    else L.push(`${T("这条路径上降仓没有明显减少回撤——拥挤冲击是概率事件，换几条随机路径看看分布。", "On this path, de-risking didn't cut the drawdown much — crowded exits are probabilistic, so try other paths to see the distribution.")}`);
    $("#aim-log").innerHTML = L.map((l) => `<div>${l}</div>`).join("");
  };

  const setSpeed = (v) => {
    speed = v;
    root.querySelectorAll("#aim-speed button").forEach((b) => b.classList.toggle("on", b.dataset.v === v));
    paint();
  };
  const setSeed = (s) => {
    seed = s;
    root.querySelectorAll("#aim-seeds button").forEach((b) => b.classList.toggle("active", +b.dataset.s === s));
    paint();
  };
  root.querySelectorAll("#aim-speed button").forEach((b) => b.addEventListener("click", () => setSpeed(b.dataset.v)));
  root.querySelectorAll("#aim-seeds button").forEach((b) => b.addEventListener("click", () => setSeed(+b.dataset.s)));
  ids.forEach((id) => $("#aim-" + id).addEventListener("input", paint));
  root.querySelectorAll("#aim-seeds button").forEach((b) => b.classList.toggle("active", +b.dataset.s === seed));
  setSpeed("mid");
}
