// 交互演示：资本结构瀑布——拖动资产价值（或比特币价格），看“水位”从顶楼往下灌：
// 哪一层拿满、哪一层被切开、普通股剩多少；并对照每层的累计资产覆盖倍数。
import { waterfall, coverageByLayer, fmtPct, fmtNum, fmtUsd , enPunct } from "./_fin.js";

export default function mount(root, lang) {
  const en = lang === "en";
  const T = (zh, e) => (en ? e : zh);
  if (en) enPunct(root);

  // 两个预设：普通工业公司（枫叶制造）与全课玩具 DAT（橙子公司）。金额单位：百万美元
  const presets = {
    maple: {
      name: T("枫叶制造", "Maple Manufacturing"),
      layers: [
        { name: T("有担保贷款", "Secured loan"), claim: 30 },
        { name: T("高级无担保债", "Senior bonds"), claim: 25 },
        { name: T("次级票据", "Sub notes"), claim: 15 },
        { name: T("优先股", "Preferred"), claim: 10 },
      ],
      cash: 0,
      base: 100,
    },
    orange: {
      name: T("橙子公司", "Orange Corp"),
      layers: [
        { name: T("可转债", "Converts"), claim: 150 },
        { name: "Orange-F", claim: 100 },
        { name: "Orange-D", claim: 50 },
      ],
      cash: 30,
      btc: 10000,
      base: 100000,
    },
  };

  let mode = "maple";
  let x = { maple: 100, orange: 100000 };
  let cost = 0; // 处置/破产成本（占资产比例）

  root.innerHTML = `
    <div class="demo">
      <div class="demo-head">${T("🏢 资本结构瀑布：水从顶楼往下灌", "🏢 The capital-stack waterfall: pour value in from the top floor")}</div>
      <div class="demo-block">
        <div class="demo-seg" id="cs-seg">
          <button data-m="maple" class="on">${presets.maple.name}</button>
          <button data-m="orange">${presets.orange.name}</button>
        </div>
      </div>
      <div class="demo-grid">
        <div class="demo-block">
          <label class="demo-label" id="cs-xlab"></label>
          <input class="demo-slider" type="range" id="cs-x" />
        </div>
        <div class="demo-block">
          <label class="demo-label">${T("处置 / 破产成本（占资产）", "Liquidation / bankruptcy costs (% of assets)")}${T("：", ": ")}<b id="cs-costv">0%</b></label>
          <input class="demo-slider" type="range" id="cs-cost" min="0" max="20" step="1" value="0" />
        </div>
      </div>
      <div class="demo-block" id="cs-svg"></div>
      <div class="stat-row">
        <div class="stat"><div class="k">${T("可分配资产", "Distributable assets")}</div><div class="v" id="cs-a">–</div></div>
        <div class="stat"><div class="k">${T("普通股剩余", "Left for common")}</div><div class="v acc" id="cs-eq">–</div></div>
        <div class="stat"><div class="k">${T("资产变化 vs 基准", "Assets vs base")}</div><div class="v" id="cs-da">–</div></div>
        <div class="stat"><div class="k">${T("普通股变化 vs 基准", "Common vs base")}</div><div class="v" id="cs-de">–</div></div>
      </div>
      <div class="demo-block"><div class="demo-log" id="cs-log"></div></div>
      <p class="demo-tip">${T(
        "先把资产从基准往下拖 20%：看“资产变化”和“普通股变化”差了几倍——那就是杠杆。再继续往下拖，找出第一层开始被切开的位置：它正好是那一层的“累计线”。切到橙子公司，把比特币拖到约 27,000 美元，D 层恰好碰到水位线。",
        "First drag assets 20% below the base and compare “assets vs base” with “common vs base” — the gap is leverage. Keep dragging until the first floor gets cut: it happens exactly at that floor's cumulative line. Then switch to Orange Corp and drag bitcoin to about $27,000 — the D layer just touches the waterline."
      )}</p>
    </div>`;

  const q = (s) => root.querySelector(s);
  const slider = q("#cs-x");

  const setupSlider = () => {
    if (mode === "maple") { slider.min = 0; slider.max = 150; slider.step = 1; }
    else { slider.min = 5000; slider.max = 200000; slider.step = 1000; }
    slider.value = x[mode];
  };

  const assetsOf = (m, v) => {
    const p = presets[m];
    const gross = m === "maple" ? v : (p.btc * v) / 1e6 + p.cash;
    return gross * (1 - cost / 100);
  };

  const drawSvg = (p, rows, equity, assets) => {
    const W = 640, H = 300, top = 34, bot = 270, colX = 70, colW = 210;
    const claims = p.layers.reduce((s, l) => s + l.claim, 0);
    const maxV = mode === "maple" ? 150 : assetsOf("orange", 200000) / (1 - cost / 100);
    // 示意比例：每个固定索取权楼层至少 30px 高，便于阅读；剩余区（普通股）线性占用余下高度
    const lin = (bot - top) / Math.max(maxV, claims * 1.1);
    const hs = p.layers.map((l) => Math.max(30, l.claim * lin));
    const claimsH = hs.reduce((s, h) => s + h, 0);
    const edges = [0]; p.layers.forEach((l, i) => edges.push(edges[i] + l.claim));
    const yOf = (v) => {
      let y = top;
      for (let i = 0; i < p.layers.length; i++) {
        const c = p.layers[i].claim;
        if (v <= edges[i + 1]) return y + ((v - edges[i]) / c) * hs[i];
        y += hs[i];
      }
      const rest = bot - top - claimsH;
      return Math.min(bot, y + ((v - claims) / Math.max(1e-9, maxV - claims)) * rest);
    };
    const tones = ["var(--blue-soft)", "var(--orange-soft)", "var(--orange-soft)", "var(--orange-soft)"];
    const strokes = ["var(--blue)", "var(--orange)", "var(--orange-line)", "var(--orange-line)"];
    let y = top, g = "";
    rows.forEach((r, i) => {
      const h = hs[i];
      const hit = r.recovery < 1;
      g += `<rect x="${colX}" y="${y.toFixed(1)}" width="${colW}" height="${h.toFixed(1)}" fill="${tones[i] || "var(--orange-soft)"}" stroke="${hit ? "var(--red)" : strokes[i] || "var(--orange)"}" stroke-width="${hit ? 2 : 1}"/>`;
      const ly = y + h / 2 + 4;
      g += `<text x="${colX + colW + 14}" y="${ly.toFixed(1)}" font-size="12" font-weight="600" fill="var(--ink)">${r.name} ${fmtNum(r.claim, 0)}</text>`;
      g += `<text x="${colX + colW + 180}" y="${ly.toFixed(1)}" font-size="12" font-weight="700" fill="${r.recovery >= 1 ? "var(--green)" : r.recovery > 0 ? "var(--orange-ink)" : "var(--red)"}">${T("拿回", "paid")} ${fmtNum(r.paid, 0)} · ${fmtPct(r.recovery, 0)}</text>`;
      y += h;
    });
    // 普通股区域（剩余）
    g += `<rect x="${colX}" y="${y.toFixed(1)}" width="${colW}" height="${Math.max(bot - y, 0).toFixed(1)}" fill="none" stroke="var(--green)" stroke-dasharray="5 4"/>`;
    g += `<text x="${colX + colW + 14}" y="${(y + 18).toFixed(1)}" font-size="12" font-weight="600" fill="var(--ink)">${T("普通股（剩余）", "Common (residual)")}</text>`;
    g += `<text x="${colX + colW + 180}" y="${(y + 18).toFixed(1)}" font-size="12" font-weight="700" fill="${equity > 0 ? "var(--green)" : "var(--red)"}">${fmtNum(equity, 0)}</text>`;
    // 水位：从顶部往下灌到 assets
    const wy = yOf(Math.min(assets, maxV));
    g = `<rect x="${colX}" y="${top}" width="${colW}" height="${Math.max(0, wy - top).toFixed(1)}" fill="var(--blue)" opacity=".13"/>` + g;
    g += `<line x1="${colX - 20}" y1="${wy.toFixed(1)}" x2="${colX + colW + 6}" y2="${wy.toFixed(1)}" stroke="var(--blue)" stroke-width="2.5"/>`;
    g += `<text x="${colX - 24}" y="${(wy + 4).toFixed(1)}" text-anchor="end" font-size="11" font-weight="700" fill="var(--blue)">${T("水位", "level")}</text>`;
    g += `<text x="${colX - 24}" y="${(wy + 17).toFixed(1)}" text-anchor="end" font-size="10" fill="var(--muted)">${fmtNum(assets, 0)}</text>`;
    g += `<text x="${colX}" y="${top - 12}" font-size="11" fill="var(--muted)">${T("先拿钱 ↓（百万美元；固定索取权楼层为示意高度）", "paid first ↓ ($M; fixed-claim floors drawn at readable height)")}</text>`;
    return `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" font-family="Inter, system-ui, sans-serif" style="width:100%;height:auto">${g}</svg>`;
  };

  const paint = () => {
    const p = presets[mode];
    const v = x[mode];
    q("#cs-xlab").innerHTML = mode === "maple"
      ? `${T("资产价值（百万美元）", "Asset value ($M)")}${T("：", ": ")}<b>${fmtNum(v, 0)}</b> <span style="color:var(--muted)">${T("基准 100", "base 100")}</span>`
      : `${T("比特币价格", "Bitcoin price")}${T("：", ": ")}<b>${fmtUsd(v)}</b> <span style="color:var(--muted)">${T("基准 $100,000 · 另有现金 3,000 万", "base $100,000 · plus $30M cash")}</span>`;
    q("#cs-costv").textContent = cost + "%";

    const assets = assetsOf(mode, v);
    const { rows, equity } = waterfall(assets, p.layers);
    const baseAssets = mode === "maple" ? p.base : (p.btc * p.base) / 1e6 + p.cash; // 基准不扣成本
    const baseEq = waterfall(baseAssets, p.layers).equity;

    q("#cs-svg").innerHTML = drawSvg(p, rows, equity, assets);
    q("#cs-a").textContent = fmtNum(assets, 0);
    q("#cs-eq").textContent = fmtNum(equity, 0);
    const da = assets / baseAssets - 1, de = baseEq > 0 ? equity / baseEq - 1 : 0;
    const daEl = q("#cs-da"), deEl = q("#cs-de");
    daEl.textContent = (da >= 0 ? "+" : "") + fmtPct(da, 1);
    deEl.textContent = (de >= 0 ? "+" : "") + fmtPct(de, 1);
    daEl.className = "v " + (da >= 0 ? "pos" : "neg");
    deEl.className = "v " + (de >= 0 ? "pos" : "neg");

    // 覆盖倍数（用可分配资产）与首个受损层
    const cov = coverageByLayer(assets, p.layers);
    const lines = [];
    lines.push(`<b>${T("累计资产覆盖（可分配资产 ÷ 本层及以上累计索取权）", "Cumulative asset coverage (distributable assets ÷ claims at this floor and above)")}</b>`);
    cov.forEach((c) => {
      const cls = c.coverage >= 2 ? "ok" : c.coverage >= 1 ? "warn" : "bad";
      lines.push(`${c.name}：${T("累计", "cumulative")} ${fmtNum(c.cum, 0)} → <span class="${cls}">${fmtNum(c.coverage, 2)}x</span>`);
    });
    const firstHit = rows.find((r) => r.recovery < 1);
    if (!firstHit) {
      lines.push(`<span class="ok">${T("所有固定索取权都拿满，剩下的 ", "Every fixed claim is paid in full; the remaining ")}${fmtNum(equity, 0)}${T(" 全归普通股。", " all goes to the common.")}</span>`);
    } else {
      lines.push(`<span class="bad">${T("第一个被切开的楼层：", "First floor to be cut: ")}${firstHit.name}（${T("回收率", "recovery")} ${fmtPct(firstHit.recovery, 0)}）。${T("它下面的所有楼层与普通股都是 0。", "Every floor below it, and the common, gets zero.")}</span>`);
    }
    if (mode === "orange") {
      const claims = p.layers.reduce((s, l) => s + l.claim, 0);
      const bePrice = ((claims / (1 - cost / 100) - p.cash) * 1e6) / p.btc;
      lines.push(`<span class="warn">${T("在当前成本假设下，比特币跌破约 ", "Under the current cost assumption, bitcoin below about ")}${fmtUsd(bePrice)}${T(" 时 D 层开始亏本金；普通股每股净值 ≈ ", " starts to impair the D layer; common net value per share ≈ ")}${fmtUsd(equity / 100, 2)}${T("（1 亿股）。", " (100M shares).")}</span>`);
    }
    if (cost > 0) lines.push(`${T("处置成本吃掉了 ", "Costs ate ")}${fmtNum(assets / (1 - cost / 100) - assets, 1)}${T("——它先从最底层的剩余里扣，这就是破产本身会伤害所有人的原因（阶段 6.6）。", " — and it comes out of the bottom first, which is why bankruptcy itself hurts everyone (Stage 6.6).")}`);
    q("#cs-log").innerHTML = lines.map((l) => `<div>${l}</div>`).join("");
  };

  root.querySelectorAll("#cs-seg button").forEach((b) => b.addEventListener("click", () => {
    mode = b.dataset.m;
    root.querySelectorAll("#cs-seg button").forEach((o) => o.classList.toggle("on", o === b));
    setupSlider();
    paint();
  }));
  slider.addEventListener("input", () => { x[mode] = +slider.value; paint(); });
  q("#cs-cost").addEventListener("input", (e) => { cost = +e.target.value; paint(); });
  setupSlider();
  paint();
}
