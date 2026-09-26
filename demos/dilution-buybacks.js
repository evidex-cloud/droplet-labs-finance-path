// 交互演示：增发 / 回购沙盘——拖动价格倍数 m（对 DAT 即 mNAV）与规模，看每股价值是增是减；
// 切到“橙子公司”，用 issueAndBuy 计算每股比特币，并连续转动几圈飞轮。
import { issueAndBuy, btcPerShare, fmtPct, fmtNum, fmtUsd, clamp } from "./_fin.js";
import { lineChart, chartBlock } from "./_chart.js";

export default function mount(root, lang) {
  const en = lang === "en";
  const T = (zh, e) => (en ? e : zh);

  const st = { mode: "co", act: "issue", m: 1.5, n: 0.1, rounds: 5 };
  const CO = { V: 100, S: 10 };                     // 普通公司：价值 1 亿、1,000 万股（单位：百万）
  const OR = { btc: 10000, shares: 100e6, px: 100000 }; // 橙子公司

  root.innerHTML = `
    <div class="demo">
      <div class="demo-head">${T("✂️ 增发与回购：价格站在价值的哪一边？", "✂️ Issuance & buybacks: which side of value is the price on?")}</div>
      <div class="demo-block">
        <div class="demo-seg" id="db-mode">
          <button data-v="co" class="on">${T("普通公司", "Ordinary company")}</button>
          <button data-v="or">${T("橙子公司（DAT）", "Orange Corp (DAT)")}</button>
        </div>
        <div class="demo-seg" id="db-act" style="margin-left:8px">
          <button data-v="issue" class="on">${T("增发", "Issue")}</button>
          <button data-v="buy">${T("回购", "Buy back")}</button>
        </div>
      </div>
      <div class="demo-grid">
        <div class="demo-block">
          <label class="demo-label" id="db-mlab"></label>
          <input class="demo-slider" type="range" min="0.4" max="2.5" step="0.05" value="${st.m}" id="db-m" />
          <label class="demo-label">${T("规模（占现有股数）", "Size (share of existing count)")}${T("：", ": ")}<b id="db-nv"></b></label>
          <input class="demo-slider" type="range" min="0.01" max="0.3" step="0.01" value="${st.n}" id="db-n" />
          <div class="demo-meta" id="db-meta"></div>
        </div>
        <div class="demo-block">
          <div class="stat-row">
            <div class="stat"><div class="k" id="db-k0"></div><div class="v" id="db-v0">–</div></div>
            <div class="stat"><div class="k" id="db-k1"></div><div class="v acc" id="db-v1">–</div></div>
            <div class="stat"><div class="k">${T("每股变化", "Per-share change")}</div><div class="v" id="db-ch">–</div></div>
          </div>
          <div class="stat-row">
            <div class="stat"><div class="k">${T("你的持股比例（原 1%）", "Your ownership (was 1%)")}</div><div class="v" id="db-own">–</div></div>
            <div class="stat"><div class="k">${T("价格 / 每股价值", "Price / value per share")}</div><div class="v" id="db-mm">–</div></div>
          </div>
          <div class="demo-out" id="db-out"></div>
        </div>
      </div>
      <div class="demo-block">
        <div class="demo-label">${T("每股价值变化 vs 价格倍数 m（当前规模）", "Per-share change vs price multiple m (at the current size)")}</div>
        <div id="db-chart"></div>
      </div>
      <div class="demo-block" id="db-fly" style="display:none">
        <div class="demo-label">${T("飞轮：假设 mNAV 与比特币价格不变，连续执行", "Flywheel: assuming mNAV and the bitcoin price stay put, repeat")} <b id="db-rv">${st.rounds}</b> ${T("轮", "rounds")}</div>
        <input class="demo-slider" type="range" min="1" max="12" step="1" value="${st.rounds}" id="db-r" />
        <div class="stages" id="db-stages"></div>
      </div>
      <div class="demo-block"><div class="demo-log" id="db-log"></div></div>
      <p class="demo-tip">${T(
        "把价格倍数 m 从 1.5 拖到 0.8：增发从 +4.5% 变成 −1.8%，而持股比例的摊薄一模一样——摊薄比例不说明任何问题，价格对价值才说明问题。再切到“回购”，同样拖动 m：两条线在 m = 1 处交换符号。",
        "Drag the price multiple m from 1.5 to 0.8: issuance flips from +4.5% to −1.8%, while the drop in your ownership percentage is identical — dilution of percentage tells you nothing; price versus value tells you everything. Then switch to “Buy back” and drag m again: the two lines swap signs at m = 1."
      )}</p>
    </div>`;

  const q = (s) => root.querySelector(s);
  const yuan = (x, d = 2) => (en ? fmtUsd(x, d) : fmtNum(x, d) + " 元");
  const mil = (x, d = 1) => (en ? fmtUsd(x, d) + "M" : fmtNum(x * 100, 0) + " 万元");
  const milSh = (x) => (en ? fmtNum(x, 2) + "M shares" : fmtNum(x * 100, 0) + " 万股");
  const change = (m, n, act) => (act === "issue" ? (1 + n * m) / (1 + n) - 1 : (1 - n * m) / (1 - n) - 1);

  const paint = () => {
    const { m, n, act, mode } = st;
    q("#db-mlab").innerHTML = (mode === "or" ? T("股价对应的 mNAV（= m）", "mNAV implied by the share price (= m)") : T("价格倍数 m = 价格 ÷ 每股价值", "Price multiple m = price ÷ value per share")) + `${T("：", ": ")}<b>${fmtNum(m, 2)}×</b>`;
    q("#db-nv").textContent = fmtPct(n, 0);
    q("#db-mm").textContent = fmtNum(m, 2) + "×";
    const ownAfter = act === "issue" ? 0.01 / (1 + n) : 0.01 / (1 - n);
    q("#db-own").textContent = fmtPct(ownAfter, 3);
    let ch, lines = [];
    if (mode === "co") {
      const v0 = CO.V / CO.S, P = m * v0, N = n * CO.S;
      const V1 = act === "issue" ? CO.V + N * P : CO.V - N * P, S1 = act === "issue" ? CO.S + N : CO.S - N;
      const v1 = V1 / S1; ch = v1 / v0 - 1;
      q("#db-k0").textContent = T("每股价值（前）", "Value per share (before)");
      q("#db-k1").textContent = T("每股价值（后）", "Value per share (after)");
      q("#db-v0").textContent = yuan(v0); q("#db-v1").textContent = yuan(v1);
      q("#db-meta").textContent = T("公司价值 1 亿元、1,000 万股、每股价值 10 元。发行或回购价格 = m × 10 元。", "Company worth $100M, 10M shares, $10 of value per share. Issue or buyback price = m × $10.");
      q("#db-out").innerHTML = act === "issue"
        ? `${T("发行 ", "Issue ")}${milSh(N)} × ${yuan(P)} = ${mil(N * P)} → (${mil(CO.V, 0)} + ${mil(N * P)}) ÷ ${milSh(S1)} = <b>${yuan(v1)}</b>`
        : `${T("回购 ", "Buy back ")}${milSh(N)} × ${yuan(P)} = ${mil(N * P)} → (${mil(CO.V, 0)} − ${mil(N * P)}) ÷ ${milSh(S1)} = <b>${yuan(v1)}</b>`;
    } else {
      const navps = (OR.btc * OR.px) / OR.shares, P = m * navps, N = n * OR.shares;
      let r;
      if (act === "issue") r = issueAndBuy({ btc: OR.btc, shares: OR.shares, btcPrice: OR.px, px: P, newShares: N });
      else {
        const sold = (N * P) / OR.px, b1 = OR.btc - sold, s1 = OR.shares - N;
        r = { btc: b1, shares: s1, bps0: btcPerShare(OR.btc, OR.shares), bps1: btcPerShare(b1, s1), change: btcPerShare(b1, s1) / btcPerShare(OR.btc, OR.shares) - 1 };
      }
      ch = r.change;
      q("#db-k0").textContent = T("每股比特币（前）", "BTC per share (before)");
      q("#db-k1").textContent = T("每股比特币（后）", "BTC per share (after)");
      q("#db-v0").textContent = fmtNum(r.bps0 * 1e8, 0) + T(" 聪", " sats"); q("#db-v1").textContent = fmtNum(r.bps1 * 1e8, 0) + T(" 聪", " sats");
      q("#db-meta").textContent = T("10,000 BTC · 1 亿股 · 比特币 100,000 美元 → 每股净值 10 美元。股价 = mNAV × 10。", "10,000 BTC · 100M shares · bitcoin at $100,000 → NAV per share $10. Share price = mNAV × $10.");
      q("#db-out").innerHTML = act === "issue"
        ? `${T("以", "Issue")} ${fmtNum(N / 1e6, 1)}M ${T("股 × ", "shares × ")}${fmtUsd(P, 2)} = ${fmtUsd(N * P / 1e6, 1)}M → ${T("买入", "buys")} ${fmtNum(r.btc - OR.btc, 0)} BTC → ${fmtNum(r.btc, 0)} BTC ÷ ${fmtNum(r.shares / 1e6, 1)}M ${T("股", "shares")}`
        : `${T("卖出", "Sell")} ${fmtNum(OR.btc - r.btc, 0)} BTC = ${fmtUsd(N * P / 1e6, 1)}M → ${T("以", "buy back")} ${fmtUsd(P, 2)} ${T("回购", "for")} ${fmtNum(N / 1e6, 1)}M ${T("股", "shares")} → ${fmtNum(r.btc, 0)} BTC ÷ ${fmtNum(r.shares / 1e6, 1)}M`;
    }
    const chEl = q("#db-ch"); chEl.textContent = (ch >= 0 ? "+" : "") + fmtPct(ch, 2); chEl.className = "v " + (ch >= 0 ? "pos" : "neg");

    const res = lineChart({
      fns: [{ f: (x) => change(x, n, "issue") * 100, cls: "line" }, { f: (x) => change(x, n, "buy") * 100, cls: "line2" }],
      lo: 0.4, hi: 2.5, xlabel: "m", markerX: m, markerLabel: fmtNum(m, 2) + "×", uid: "db",
    });
    q("#db-chart").innerHTML = chartBlock(res, [["var(--orange)", T("增发（%）", "Issue (%)")], ["var(--blue)", T("回购（%）", "Buy back (%)")]]);

    // 飞轮
    const fly = q("#db-fly");
    fly.style.display = mode === "or" && act === "issue" ? "" : "none";
    if (mode === "or" && act === "issue") {
      let b = OR.btc, s = OR.shares; const base = b / s, rows = [];
      for (let i = 1; i <= st.rounds; i++) {
        const navps = (b * OR.px) / s;
        const r = issueAndBuy({ btc: b, shares: s, btcPrice: OR.px, px: m * navps, newShares: n * s });
        b = r.btc; s = r.shares; rows.push(r.bps1 / base - 1);
      }
      const mx = Math.max(...rows.map(Math.abs), 0.01);
      q("#db-stages").innerHTML = rows.map((c, i) => `<div class="stage-bar"><span class="lab">${T("第 ", "Round ")}${i + 1}${T(" 轮", "")}</span><div class="track"><div class="fill" style="width:${clamp((Math.abs(c) / mx) * 100, 0, 100)}%;${c < 0 ? "background:var(--red)" : "background:var(--btc)"}"></div></div><span class="val">${(c >= 0 ? "+" : "") + fmtPct(c, 1)}</span></div>`).join("");
      q("#db-rv").textContent = st.rounds;
      lines.push(`${T("连续 ", "After ")}${st.rounds}${T(" 轮后每股比特币累计 ", " rounds, cumulative BTC per share ")}<b class="${rows[rows.length - 1] >= 0 ? "ok" : "bad"}">${(rows[rows.length - 1] >= 0 ? "+" : "") + fmtPct(rows[rows.length - 1], 1)}</b>${T("——前提是溢价一直在。现实中 mNAV 会随市场情绪变化（阶段 16.7、18.3）。", " — provided the premium never goes away. In reality mNAV moves with market sentiment (Stages 16.7, 18.3).")}`);
    }

    if (Math.abs(m - 1) < 0.001) lines.unshift(`<span class="warn">${T("m = 1：按每股价值成交，不增值也不稀释。", "m = 1: trading at value per share — neither accretive nor dilutive.")}</span>`);
    else if (ch > 0) lines.unshift(`<span class="ok">${act === "issue" ? T("价格高于每股价值：新股东多付了钱，老股东每股价值上升（增值）。", "Price above value per share: newcomers overpay and existing owners gain per share (accretive).") : T("价格低于每股价值：卖出的人少拿了钱，留下来的人每股价值上升。", "Price below value per share: sellers receive less than their shares are worth, and those who stay gain per share.")}</span>`);
    else lines.unshift(`<span class="bad">${act === "issue" ? T("价格低于每股价值：贱卖股份，真正的稀释。", "Price below value per share: selling shares on the cheap — real dilution.") : T("价格高于每股价值：用留下股东的钱高价接盘。", "Price above value per share: overpaying with the remaining owners' money.")}</span>`);
    lines.push(`${T("无论价格高低，你的持股比例都从 1% 变成了 ", "Whatever the price, your ownership goes from 1% to ")}${fmtPct(ownAfter, 3)}${T("——比例本身说明不了好坏。", " — the percentage alone says nothing about good or bad.")}`);
    q("#db-log").innerHTML = lines.map((l) => `<div>${l}</div>`).join("");
  };

  const seg = (id, key) => root.querySelectorAll(`${id} button`).forEach((b) => b.addEventListener("click", () => {
    st[key] = b.dataset.v;
    root.querySelectorAll(`${id} button`).forEach((x) => x.classList.toggle("on", x === b));
    paint();
  }));
  seg("#db-mode", "mode"); seg("#db-act", "act");
  q("#db-m").addEventListener("input", (e) => { st.m = +e.target.value; paint(); });
  q("#db-n").addEventListener("input", (e) => { st.n = +e.target.value; paint(); });
  q("#db-r").addEventListener("input", (e) => { st.rounds = +e.target.value; paint(); });
  paint();
}
