// 交互演示：代币化的两个沙盘——
// ① 周末保证金缓冲：传统基金份额只能在工作日赎回、T+1 到账，所以要常备闲置现金；
//    代币化份额 24/7 可直接过户当抵押品，缓冲可以更小。计算每年的机会成本与 N 年累计差额（fv）。
// ② 资产光谱打分：哪些资产最适合代币化——好处 vs 摩擦。
import { fv, fmtUsd, fmtPct, fmtBig, fmtNum } from "./_fin.js";

export default function mount(root, lang) {
  const en = lang === "en";
  const T = (zh, e) => (en ? e : zh);

  const st = { size: 10e6, y: 0.0424, fee: 0.0015, bufOld: 0.2, bufNew: 0.05, years: 5, when: "fri" };
  let mode = "buf";
  let asset = "tbill";

  // 保证金追加发生的时点 → 传统管道要等多少小时才能把抵押品送到（示意模型：工作日 9:00 开门、赎回 T+1 到账）
  const WHEN = {
    fri: { lab: T("周五 18:00", "Friday 6 p.m."), oldH: 63 + 24, note: T("等到周一 9:00 提交赎回，周二现金到账", "wait until Monday 9 a.m. to redeem, cash lands Tuesday") },
    sat: { lab: T("周六 02:00", "Saturday 2 a.m."), oldH: 55 + 24, note: T("同样要等到周一开门，再加 T+1", "again wait for Monday's open, then T+1") },
    mon: { lab: T("周一 10:00", "Monday 10 a.m."), oldH: 24, note: T("当天提交赎回，次日到账", "redeem the same day, cash next day") },
    hol: { lab: T("长周末前的周五 18:00", "Friday 6 p.m. before a long weekend"), oldH: 87 + 24, note: T("多一个假日，管道多关一天", "one more holiday, one more day the pipes are shut") },
  };

  const ASSETS = {
    tbill: { name: T("国债货币基金", "Treasury money fund"), ben: [5, 5, 4, 3, 5], fric: [1, 1, 1] },
    credit: { name: T("私募信贷", "Private credit"), ben: [3, 3, 4, 5, 2], fric: [4, 3, 4] },
    stock: { name: T("上市股票", "Listed stock"), ben: [4, 4, 3, 3, 4], fric: [1, 4, 2] },
    re: { name: T("商业地产", "Commercial property"), ben: [2, 2, 3, 5, 2], fric: [5, 5, 5] },
    art: { name: T("艺术品", "Fine art"), ben: [2, 2, 2, 4, 1], fric: [5, 4, 5] },
  };
  const BEN = [T("即时结算", "Instant settlement"), T("24/7", "24/7"), T("可编程", "Programmability"), T("碎片化", "Fractions"), T("抵押品流动性", "Collateral mobility")];
  const FRIC = [T("估值不透明", "Opaque valuation"), T("法律转让复杂", "Legal complexity"), T("底层资产难变现", "Illiquid underlying")];

  root.innerHTML = `
    <div class="demo">
      <div class="demo-head">${T("🧾 代币化沙盘：换一本账，管道能省下什么", "🧾 Tokenization sandbox: what a new ledger saves you")}</div>
      <div class="demo-seg" id="tw-mode">
        <button data-m="buf" class="on">${T("① 周末保证金缓冲", "① The weekend margin buffer")}</button>
        <button data-m="spec">${T("② 资产光谱打分", "② Asset spectrum scorecard")}</button>
      </div>
      <div id="tw-buf">
        <div class="demo-grid">
          <div class="demo-block">
            <label class="demo-label">${T("资金规模", "Portfolio size")}${T("：", ": ")}<b id="tw-size-v"></b></label>
            <input class="demo-slider" id="tw-size" type="range" min="1000000" max="100000000" step="1000000" value="${st.size}">
            <label class="demo-label">${T("短期国债收益率（2026 年 9 月 3 个月期约 4.24%）", "Short-term T-bill yield (3-month about 4.24% in Sept 2026)")}${T("：", ": ")}<b id="tw-y-v"></b></label>
            <input class="demo-slider" id="tw-y" type="range" min="0" max="0.08" step="0.0005" value="${st.y}">
            <label class="demo-label">${T("基金年费率", "Fund annual fee")}${T("：", ": ")}<b id="tw-fee-v"></b></label>
            <input class="demo-slider" id="tw-fee" type="range" min="0" max="0.006" step="0.0005" value="${st.fee}">
          </div>
          <div class="demo-block">
            <label class="demo-label">${T("传统份额：需常备的闲置现金缓冲", "Traditional shares: idle cash buffer needed")}${T("：", ": ")}<b id="tw-bo-v"></b></label>
            <input class="demo-slider" id="tw-bo" type="range" min="0" max="0.4" step="0.01" value="${st.bufOld}">
            <label class="demo-label">${T("代币化份额：需常备的闲置现金缓冲", "Tokenized shares: idle cash buffer needed")}${T("：", ": ")}<b id="tw-bn-v"></b></label>
            <input class="demo-slider" id="tw-bn" type="range" min="0" max="0.4" step="0.01" value="${st.bufNew}">
            <label class="demo-label">${T("持有年数", "Years held")}${T("：", ": ")}<b id="tw-yr-v"></b></label>
            <input class="demo-slider" id="tw-yr" type="range" min="1" max="10" step="1" value="${st.years}">
          </div>
        </div>
        <div class="stat-row">
          <div class="stat"><div class="k">${T("传统：缓冲每年的机会成本", "Traditional: yearly cost of the buffer")}</div><div class="v neg" id="tw-c1">–</div></div>
          <div class="stat"><div class="k">${T("代币化：缓冲每年的机会成本", "Tokenized: yearly cost of the buffer")}</div><div class="v" id="tw-c2">–</div></div>
          <div class="stat"><div class="k">${T("每年省下", "Saved per year")}</div><div class="v pos" id="tw-sv">–</div></div>
          <div class="stat"><div class="k">${T("N 年后的累计差额（复利）", "Gap after N years (compounded)")}</div><div class="v acc" id="tw-cum">–</div></div>
        </div>
        <div class="demo-block">
          <div class="demo-label">${T("追加保证金的通知在什么时候到？", "When does the margin call arrive?")}</div>
          <div class="demo-seg" id="tw-when">
            ${Object.keys(WHEN).map((k) => `<button data-w="${k}" class="${k === st.when ? "on" : ""}">${WHEN[k].lab}</button>`).join("")}
          </div>
          <div class="stages" id="tw-time"></div>
        </div>
        <div class="demo-log" id="tw-log"></div>
      </div>
      <div id="tw-spec" style="display:none">
        <div class="demo-block">
          <div class="demo-seg" id="tw-asset">
            ${Object.keys(ASSETS).map((k) => `<button data-a="${k}" class="${k === asset ? "on" : ""}">${ASSETS[k].name}</button>`).join("")}
          </div>
        </div>
        <div class="cmp">
          <div class="cmp-cell hl"><h5>${T("好处（1–5 分）", "Benefits (1–5)")}</h5><div class="stages" id="tw-ben"></div></div>
          <div class="cmp-cell cold"><h5>${T("摩擦（1–5 分，越高越难）", "Frictions (1–5, higher = harder)")}</h5><div class="stages" id="tw-fric"></div></div>
        </div>
        <div class="stat-row">
          <div class="stat"><div class="k">${T("好处合计", "Benefit total")}</div><div class="v pos" id="tw-bt">–</div></div>
          <div class="stat"><div class="k">${T("摩擦合计 × 权重", "Friction total × weight")}</div><div class="v neg" id="tw-ft">–</div></div>
          <div class="stat"><div class="k">${T("代币化适合度", "Tokenization fit")}</div><div class="v acc" id="tw-net">–</div></div>
        </div>
        <div class="demo-log" id="tw-log2"></div>
      </div>
      <p class="demo-tip">${T(
        "看①的“每年省下”：代币化没有让国债多赚一分利息，省下的全是<strong>为了等管道开门而闲置的钱</strong>。把收益率拖到 0，好处几乎消失——这就是为什么代币化国债在高利率时代才真正起飞。再到②里对比国债基金和艺术品：摩擦（估值、法律、变现）才是决定哪些资产先上链的关键。",
        "In ①, watch “saved per year”: tokenization does not earn the Treasuries a cent more; the whole gain is <strong>money that used to sit idle waiting for the plumbing to open</strong>. Drag the yield to 0 and the benefit almost vanishes, which is why tokenized Treasuries took off in a high-rate era. Then compare a Treasury fund with fine art in ②: frictions (valuation, law, liquidity) decide which assets move on-chain first."
      )}</p>
    </div>`;

  const $ = (s) => root.querySelector(s);

  const paintBuf = () => {
    $("#tw-size-v").textContent = "$" + fmtBig(st.size, 0);
    $("#tw-y-v").textContent = fmtPct(st.y);
    $("#tw-fee-v").textContent = fmtPct(st.fee);
    $("#tw-bo-v").textContent = fmtPct(st.bufOld, 0) + T("（", " (") + fmtUsd(st.size * st.bufOld) + T("）", ")");
    $("#tw-bn-v").textContent = fmtPct(st.bufNew, 0) + T("（", " (") + fmtUsd(st.size * st.bufNew) + T("）", ")");
    $("#tw-yr-v").textContent = st.years;
    const net = Math.max(0, st.y - st.fee);
    const c1 = st.size * st.bufOld * net, c2 = st.size * st.bufNew * net;
    // N 年后：投资部分按 (收益率 − 费率) 复利，缓冲部分不生息
    const end1 = fv(st.size * (1 - st.bufOld), net, st.years) + st.size * st.bufOld;
    const end2 = fv(st.size * (1 - st.bufNew), net, st.years) + st.size * st.bufNew;
    $("#tw-c1").textContent = fmtUsd(c1);
    $("#tw-c2").textContent = fmtUsd(c2);
    $("#tw-sv").textContent = fmtUsd(c1 - c2);
    $("#tw-cum").textContent = fmtUsd(end2 - end1);

    const w = WHEN[st.when];
    const newH = 0.05; // 链上过户：约 3 分钟（示意）
    const maxH = 111;
    $("#tw-time").innerHTML = [
      [T("传统份额：抵押品到位需要", "Traditional shares: collateral arrives in"), w.oldH, "var(--blue)"],
      [T("代币化份额：抵押品到位需要", "Tokenized shares: collateral arrives in"), newH, "var(--orange)"],
    ].map(([lab, h, c]) => `<div class="stage-bar"><span class="lab">${lab}</span><div class="track"><div class="fill" style="width:${Math.max(1.5, (h / maxH) * 100)}%;background:${c}"></div></div><span class="val">${h < 1 ? T("约 3 分钟", "~3 min") : fmtNum(h, 0) + T(" 小时", " h")}</span></div>`).join("");

    const lines = [];
    lines.push(`${T("净收益率（收益率 − 费率）", "Net yield (yield − fee)")} = <b>${fmtPct(net)}</b>${T("。缓冲每少 1 个百分点，每年多赚", ". Each percentage point less buffer earns an extra")} <b>${fmtUsd(st.size * 0.01 * net)}</b>${T("。", " a year.")}`);
    lines.push(`${T("通知在", "Call arrives")} ${w.lab}${T("：传统管道", ": the traditional pipe must")} ${w.note}${T("，约", ", about")} <b>${fmtNum(w.oldH, 0)}</b> ${T("小时；这段时间里你只能靠闲置现金顶上——这正是要常备缓冲的原因。", "hours; in the meantime only idle cash can cover the call, which is exactly why the buffer exists.")}`);
    if (st.bufNew >= st.bufOld) lines.push(`<span class="warn">${T("你设的代币化缓冲不比传统小——那代币化在这里就没有省下任何东西。好处来自“能更快挪动”，前提是交易对手愿意接受代币作抵押。", "Your tokenized buffer is no smaller than the traditional one, so tokenization saves nothing here. The benefit comes from moving collateral faster, and only if the counterparty accepts the token.")}</span>`);
    else if (net < 0.005) lines.push(`<span class="warn">${T("净收益率接近 0：闲置现金几乎没有机会成本，代币化的这条好处也跟着消失。零利率年代，没人急着把国债搬上链。", "Net yield is near zero: idle cash costs almost nothing, so this benefit disappears too. In the zero-rate years nobody rushed to put Treasuries on-chain.")}</span>`);
    else lines.push(`<span class="ok">${T("持有", "Over")} ${st.years} ${T("年，代币化方案多出", "years the tokenized setup ends up")} <b>${fmtUsd(end2 - end1)}</b>${T("——资产完全相同，差别只在管道。", " ahead, with identical assets. The only difference is the plumbing.")}</span>`);
    $("#tw-log").innerHTML = lines.map((l) => `<div>${l}</div>`).join("");
  };

  const paintSpec = () => {
    const a = ASSETS[asset];
    const bar = (lab, v, c) => `<div class="stage-bar"><span class="lab">${lab}</span><div class="track"><div class="fill" style="width:${v * 20}%;background:${c}"></div></div><span class="val">${v}</span></div>`;
    $("#tw-ben").innerHTML = a.ben.map((v, i) => bar(BEN[i], v, "var(--orange)")).join("");
    $("#tw-fric").innerHTML = a.fric.map((v, i) => bar(FRIC[i], v, "var(--blue)")).join("");
    const bt = a.ben.reduce((s, x) => s + x, 0);
    const ft = a.fric.reduce((s, x) => s + x, 0) * 1.5; // 摩擦权重 1.5：一个摩擦就能卡死整个项目
    const netScore = Math.max(0, Math.min(100, ((bt - ft + 22.5) / 45) * 100));
    $("#tw-bt").textContent = bt + " / 25";
    $("#tw-ft").textContent = fmtNum(ft, 1);
    $("#tw-net").textContent = fmtNum(netScore, 0) + " / 100";
    const verdict = netScore >= 65
      ? `<span class="ok">${T("高适合度：标准化、估值透明、法律简单——这类资产已经在链上跑通（阶段 14.2）。", "High fit: standardized, transparent, legally simple. Assets like this already work on-chain (Stage 14.2).")}</span>`
      : netScore >= 45
        ? `<span class="warn">${T("中等：好处真实存在，但法律或估值摩擦让规模化很难。", "Medium: the benefits are real, but legal or valuation frictions make scale hard.")}</span>`
        : `<span class="bad">${T("低适合度：链上的“碎片化”再方便，也解决不了估值不透明和变现困难——代币可以秒转，楼卖不掉。", "Low fit: however convenient on-chain fractions are, they cannot fix opaque valuation or an illiquid asset. The token moves in seconds; the building still does not sell.")}</span>`;
    $("#tw-log2").innerHTML = `<div>${a.name}${T("：", ": ")}${verdict}</div><div>${T("打分为教学示意（摩擦权重 1.5），不是评级。", "Scores are illustrative for teaching (friction weight 1.5), not a rating.")}</div>`;
  };

  const bind = (id, key) => $(id).addEventListener("input", (e) => { st[key] = +e.target.value; paintBuf(); });
  bind("#tw-size", "size"); bind("#tw-y", "y"); bind("#tw-fee", "fee"); bind("#tw-bo", "bufOld"); bind("#tw-bn", "bufNew"); bind("#tw-yr", "years");
  root.querySelectorAll("#tw-when button").forEach((b) => b.addEventListener("click", () => {
    st.when = b.dataset.w;
    root.querySelectorAll("#tw-when button").forEach((x) => x.classList.toggle("on", x === b));
    paintBuf();
  }));
  root.querySelectorAll("#tw-asset button").forEach((b) => b.addEventListener("click", () => {
    asset = b.dataset.a;
    root.querySelectorAll("#tw-asset button").forEach((x) => x.classList.toggle("on", x === b));
    paintSpec();
  }));
  root.querySelectorAll("#tw-mode button").forEach((b) => b.addEventListener("click", () => {
    mode = b.dataset.m;
    root.querySelectorAll("#tw-mode button").forEach((x) => x.classList.toggle("on", x === b));
    $("#tw-buf").style.display = mode === "buf" ? "" : "none";
    $("#tw-spec").style.display = mode === "spec" ? "" : "none";
  }));
  paintBuf();
  paintSpec();
}
