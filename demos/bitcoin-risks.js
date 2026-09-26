// 交互演示：安全预算计算器——
// 选一个年份（决定区块补贴）、设一个币价路径（2026 年 9 月约 8.4 万美元起的年化涨跌）和每块平均手续费，
// 算出全网年安全预算（美元）、占市值比例、手续费占矿工收入的比例，
// 以及一个粗略的“追上 6 个区块所需的算力成本”代理指标；再算出：要维持 2026 年的美元预算，每块需要多少手续费。
import { fv, fmtUsd, fmtPct, fmtNum, fmtBig, tex } from "./_fin.js";
import { lineChart, chartBlock } from "./_chart.js";
// 把格式化好的数字放进 LaTeX：$ → \$，千分位 → {,}，% → \%，末尾的 K/M/B/T 单位 → \text{…}
const texv = (s) => String(s).replace(/\$/g, "\\$").replace(/,/g, "{,}").replace(/%/g, "\\%").replace(/([KMBT])$/, "\\text{$1}");

const BLOCKS_PER_YEAR = 52560;
const BASE_YEAR = 2026.73, BASE_PX = 84000;
// 与 bitcoin-supply 演示一致的简化：2024-04 起每 4 年一次减半
const subsidyAtYear = (y) => (y < 2012.91 ? 50 : y < 2016.52 ? 25 : y < 2020.36 ? 12.5 : y < 2024.30 ? 6.25 : 3.125 / Math.pow(2, Math.floor((y - 2024.30) / 4)));
function supplyAtYear(y) {
  // 按时代近似：2024 年减半时 19,687,500，之后每年 52,560 × 当期补贴
  if (y <= 2024.30) return 19687500;
  let s = 19687500, t = 2024.30;
  while (t < y) {
    const next = Math.min(y, 2024.30 + 4 * (Math.floor((t - 2024.30) / 4) + 1));
    s += (next - t) * BLOCKS_PER_YEAR * subsidyAtYear(t + 1e-6);
    t = next;
  }
  return s;
}

export default function mount(root, lang) {
  const en = lang === "en";
  const T = (zh, e) => (en ? e : zh);
  const COLON = T("：", ": ");
  const st = { year: 2026.73, growth: 0.0, fee: 0.05 };

  const slider = (id, label, min, max, step, val) => `
    <div class="demo-block">
      <label class="demo-label">${label}${COLON}<b id="${id}-v"></b></label>
      <input class="demo-slider" id="${id}" type="range" min="${min}" max="${max}" step="${step}" value="${val}">
    </div>`;

  root.innerHTML = `
    <div class="demo">
      <div class="demo-head">${T("🛡️ 安全预算计算器：减半之后，谁来付账本的保安费？", "🛡️ Security-budget calculator: after the halvings, who pays for the guards?")}</div>
      <div class="demo-grid-3">
        ${slider("br-year", T("年份", "Year"), 2025, 2044, 0.25, st.year)}
        ${slider("br-growth", T("比特币价格年化涨跌（自 2026 年 9 月约 8.4 万美元起）", "Bitcoin annual price change (from about $84k in Sep 2026)"), -0.2, 0.4, 0.01, st.growth)}
        ${slider("br-fee", T("每个区块的平均手续费（BTC）", "Average fees per block (BTC)"), 0, 3, 0.01, st.fee)}
      </div>
      <div class="stat-row">
        <div class="stat"><div class="k">${T("当年区块补贴", "Block subsidy that year")}</div><div class="v" id="br-sub">–</div></div>
        <div class="stat"><div class="k">${T("假设币价", "Assumed price")}</div><div class="v" id="br-px">–</div></div>
        <div class="stat"><div class="k">${T("年安全预算", "Annual security budget")}</div><div class="v acc" id="br-bud">–</div></div>
        <div class="stat"><div class="k">${T(tex(String.raw`\text{预算} \div \text{总市值}`), tex(String.raw`\text{budget} \div \text{market value}`))}</div><div class="v" id="br-pct">–</div></div>
      </div>
      <div class="stat-row">
        <div class="stat"><div class="k">${T("手续费占矿工收入", "Fees as share of miner revenue")}</div><div class="v" id="br-feeshare">–</div></div>
        <div class="stat"><div class="k">${T("6 个区块的矿工收入（粗略攻击成本代理）", "Miner revenue for 6 blocks (rough attack-cost proxy)")}</div><div class="v" id="br-att">–</div></div>
        <div class="stat"><div class="k">${T("维持 2026 年美元预算所需手续费/块", "Fees per block to keep the 2026 dollar budget")}</div><div class="v" id="br-need">–</div></div>
      </div>
      <div id="br-chart"></div>
      <div class="demo-log" id="br-log"></div>
      <p class="demo-tip">${T(
        `先只拖年份：在币价不变、手续费很低时，每过一次减半，年安全预算就腰斩，${tex(String.raw`\text{预算} \div \text{市值}`)} 也跟着腰斩——注意这个比例几乎不随币价变化。再把币价年化涨幅调到 +19% 左右（约每 4 年翻一番）：美元预算大致保住了，但占市值的比例照样下降。最后拖手续费：看看要把比例拉回 2026 年的水平，每个区块需要多少 BTC 的手续费——这就是“手续费市场必须接班”的含义。`,
        `Start by moving only the year: with a flat price and low fees, every halving cuts the annual security budget in half, and ${tex(String.raw`\text{budget} \div \text{market value}`)} halves too — notice that this ratio barely responds to the price. Now set annual price growth to about +19% (roughly doubling every four years): the dollar budget roughly holds, but the share of market value still falls. Finally drag the fee slider and see how many BTC of fees per block it takes to restore the 2026 ratio — that is what “the fee market has to take over” means.`
      )}</p>
    </div>`;

  const $ = (id) => root.querySelector("#" + id);
  const yearLabel = (y) => { const yr = Math.floor(y), m = Math.min(12, Math.floor((y - yr) * 12) + 1); return en ? `${yr}-${String(m).padStart(2, "0")}` : `${yr} 年 ${m} 月`; };
  const pxAt = (y) => fv(BASE_PX, st.growth, Math.max(0, y - BASE_YEAR));
  const budgetAt = (y, fee) => (subsidyAtYear(y) + fee) * BLOCKS_PER_YEAR * pxAt(y);
  const ratioAt = (y, fee) => budgetAt(y, fee) / (supplyAtYear(y) * pxAt(y));

  function paint() {
    const y = st.year, sub = subsidyAtYear(y), px = pxAt(y);
    const bud = budgetAt(y, st.fee);
    const cap = supplyAtYear(y) * px;
    const base = (subsidyAtYear(BASE_YEAR) + 0.05) * BLOCKS_PER_YEAR * BASE_PX; // 2026 年 9 月基准（每块约 0.05 BTC 手续费的示意）
    const needFee = Math.max(0, base / (BLOCKS_PER_YEAR * px) - sub);
    $("br-year-v").textContent = yearLabel(y);
    $("br-growth-v").textContent = (st.growth > 0 ? "+" : "") + fmtPct(st.growth, 0);
    $("br-fee-v").textContent = fmtNum(st.fee, 2) + " BTC";
    $("br-sub").textContent = fmtNum(sub, sub < 1 ? 4 : 3) + " BTC";
    $("br-px").textContent = fmtUsd(px);
    $("br-bud").textContent = "$" + fmtBig(bud, 1) + T("/年", "/yr");
    $("br-pct").textContent = fmtPct(bud / cap, 2);
    $("br-feeshare").textContent = fmtPct(st.fee / (sub + st.fee), 1);
    $("br-att").textContent = fmtUsd((sub + st.fee) * px * 6);
    $("br-need").textContent = fmtNum(needFee, 2) + " BTC";

    // 占市值比例随年份：仅补贴 vs 补贴 + 你设的手续费（x 轴改写为整年份）
    const ch = lineChart({
      fns: [
        { f: (x) => ratioAt(x, 0) * 100, cls: "line5" },
        { f: (x) => ratioAt(x, st.fee) * 100, cls: "line4" },
      ],
      lo: 2026, hi: 2044, xlabel: T("年份 · 纵轴：年安全预算占市值（%）", "Year · y-axis: annual security budget as % of market value"),
      markerX: y, markerLabel: yearLabel(y), forceZero: true, uid: "br",
    });
    let i = 0;
    ch.svg = ch.svg.replace(/(<text class="lbl-axis" x="[0-9.]+" y="263" text-anchor="middle">)[^<]*(<\/text>)/g, (m, a, b) => a + (2026 + 3 * i++) + b);
    $("br-chart").innerHTML = chartBlock(ch, [["var(--btc)", T("只有补贴", "Subsidy only")], ["var(--green)", T("补贴 + 你设的手续费", "Subsidy + your fee level")]]);

    const lines = [];
    lines.push(tex(String.raw`\text{${T("年安全预算", "Annual security budget")}} = (${fmtNum(sub, 4)} + ${fmtNum(st.fee, 2)})\ \text{BTC} \times 52{,}560 \times ${texv(fmtUsd(px))} \approx \mathbf{${texv("$" + fmtBig(bud, 1))}}`) + `${T("，约为总市值的", ", about")} <b>${fmtPct(bud / cap, 2)}</b>${T("。", " of total market value.")}`);
    lines.push(`${T("“6 个区块的矿工收入”只是一个非常粗略的代理：它假设攻击者的成本约等于诚实矿工同期的收入，忽略了购买专用矿机的巨额资本开支——实际攻击要难得多。", "“Miner revenue for 6 blocks” is only a very rough proxy: it assumes an attacker's cost roughly equals honest miners' revenue over the same period and ignores the huge capital cost of acquiring specialized machines — a real attack would be much harder.")}`);
    if (needFee > 1) lines.push(`<span class="bad">${T("要维持 2026 年 9 月的美元预算，每个区块需要约", "To keep the September 2026 dollar budget, each block would need about")} ${fmtNum(needFee, 2)} ${T("BTC 的手续费——远高于大多数平静时期的实际水平。", "BTC in fees — far above actual levels in most quiet periods.")}</span>`);
    else if (needFee > 0) lines.push(`<span class="warn">${T("维持 2026 年的美元预算需要每块约", "Keeping the 2026 dollar budget needs about")} ${fmtNum(needFee, 2)} ${T("BTC 手续费：币价上涨替补贴承担了一部分。", "BTC of fees per block: price growth is covering part of the subsidy's decline.")}</span>`);
    else lines.push(`<span class="ok">${T("在这个币价路径下，美元预算不低于 2026 年水平——但注意占市值的比例仍在下降。", "On this price path the dollar budget stays at or above 2026 levels — but note its share of market value still falls.")}</span>`);
    $("br-log").innerHTML = lines.map((l) => `<div>${l}</div>`).join("");
  }

  const bind = (id, key) => $(id).addEventListener("input", (e) => { st[key] = +e.target.value; paint(); });
  bind("br-year", "year"); bind("br-growth", "growth"); bind("br-fee", "fee");
  paint();
}
