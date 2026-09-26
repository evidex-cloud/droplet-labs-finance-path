// demos/_fin.js —— 共享金融计算引擎（折现、债券、久期、资本结构、DAT 指标）。
// 所有演示用同一套公式，保证全课数字前后一致。纯函数、无 DOM。以 _ 开头 = 不是课程演示。
// 约定：利率一律用小数（5% = 0.05）；金额单位由调用方决定（美元、百万美元均可）。
// 公式排版：tex(latex, display) 返回 KaTeX HTML；LaTeX 请写在 String.raw 模板里（反斜杠只写一个，${} 照常插值），见 AUTHORING.md §2.1。
export { tex } from "../math.js?v=4";

/* ---------- 格式化 ---------- */
export const fmtPct = (x, d = 2) => (isFinite(x) ? (x * 100).toFixed(d) + "%" : "–");
export const fmtNum = (x, d = 2) => (isFinite(x) ? Number(x).toLocaleString("en-US", { minimumFractionDigits: d, maximumFractionDigits: d }) : "–");
export const fmtUsd = (x, d = 0) => (isFinite(x) ? (x < 0 ? "-$" : "$") + Math.abs(x).toLocaleString("en-US", { minimumFractionDigits: d, maximumFractionDigits: d }) : "–");
// 大数缩写：1.2B / 350M / 12.5K
export const fmtBig = (x, d = 1) => {
  if (!isFinite(x)) return "–";
  const a = Math.abs(x), s = x < 0 ? "-" : "";
  if (a >= 1e12) return s + (a / 1e12).toFixed(d) + "T";
  if (a >= 1e9) return s + (a / 1e9).toFixed(d) + "B";
  if (a >= 1e6) return s + (a / 1e6).toFixed(d) + "M";
  if (a >= 1e3) return s + (a / 1e3).toFixed(d) + "K";
  return s + a.toFixed(d);
};
export const clamp = (x, lo, hi) => Math.min(hi, Math.max(lo, x));

/* ---------- 时间价值 ---------- */
export const fv = (pv, r, n, m = 1) => pv * Math.pow(1 + r / m, n * m);        // 终值（每年复利 m 次）
export const pv = (fvAmt, r, n, m = 1) => fvAmt / Math.pow(1 + r / m, n * m);  // 现值
export const rule72 = (r) => 72 / (r * 100);                                    // 翻倍年数（近似）
export const realRate = (nominal, infl) => (1 + nominal) / (1 + infl) - 1;       // 费雪：实际利率
// 一串现金流 [{t, cf}] 在折现率 r 下的现值
export const npv = (flows, r) => flows.reduce((s, { t, cf }) => s + cf / Math.pow(1 + r, t), 0);
// 永续年金 / 增长永续年金（戈登）
export const perpetuity = (cf, r) => cf / r;
export const gordon = (cf1, r, g) => (r > g ? cf1 / (r - g) : Infinity);

/* ---------- 债券 ---------- */
// 年付息 freq 次；face 面值；couponRate 票面利率；ytm 到期收益率；years 剩余年限
export function bondCashflows(face, couponRate, years, freq = 2) {
  const n = Math.round(years * freq), c = (face * couponRate) / freq, out = [];
  for (let k = 1; k <= n; k++) out.push({ t: k / freq, cf: c + (k === n ? face : 0) });
  return out;
}
export function bondPrice(face, couponRate, ytm, years, freq = 2) {
  const n = Math.round(years * freq), c = (face * couponRate) / freq, y = ytm / freq;
  if (Math.abs(y) < 1e-12) return c * n + face;
  return c * (1 - Math.pow(1 + y, -n)) / y + face * Math.pow(1 + y, -n);
}
// 麦考利久期、修正久期、凸性（年为单位）
export function bondRisk(face, couponRate, ytm, years, freq = 2) {
  const flows = bondCashflows(face, couponRate, years, freq), y = ytm / freq;
  const P = bondPrice(face, couponRate, ytm, years, freq);
  let mac = 0, conv = 0;
  flows.forEach(({ t, cf }) => {
    const k = t * freq, df = Math.pow(1 + y, -k);
    mac += t * cf * df;
    conv += cf * df * k * (k + 1);
  });
  mac /= P;
  const mod = mac / (1 + y);
  const convexity = conv / (P * Math.pow(1 + y, 2) * freq * freq);
  return { price: P, macaulay: mac, modified: mod, convexity, dv01: mod * P * 0.0001 };
}
// 用久期+凸性近似价格变化（dy 为小数，如 +0.01 = +100bp）
export const priceChangeApprox = (mod, convexity, dy) => -mod * dy + 0.5 * convexity * dy * dy;
// 由价格反解到期收益率（二分法）
export function bondYield(price, face, couponRate, years, freq = 2) {
  let lo = -0.05, hi = 1;
  for (let i = 0; i < 200; i++) {
    const mid = (lo + hi) / 2;
    if (bondPrice(face, couponRate, mid, years, freq) > price) lo = mid; else hi = mid;
  }
  return (lo + hi) / 2;
}

/* ---------- 资本结构瀑布 ---------- */
// layers: [{name, claim}]，按清偿顺序从最优先到最劣后；assetValue 为可分配资产价值。
// 返回每层 {name, claim, paid, recovery}；最后剩余的归普通股（equity）。
export function waterfall(assetValue, layers) {
  let left = Math.max(0, assetValue);
  const rows = layers.map(({ name, claim }) => {
    const paid = Math.min(left, claim); left -= paid;
    return { name, claim, paid, recovery: claim > 0 ? paid / claim : 1 };
  });
  return { rows, equity: left };
}
// 各层的“资产覆盖倍数”：资产 / （本层及以上所有层的累计债权）
export function coverageByLayer(assetValue, layers) {
  let cum = 0;
  return layers.map(({ name, claim }) => { cum += claim; return { name, cum, coverage: cum > 0 ? assetValue / cum : Infinity }; });
}

/* ---------- DAT（数字资产财库公司）指标 ---------- */
// 所有 DAT 公式的唯一出处；课文里的定义应与这里一致（公司官方口径可能略有差异，课文会注明）。
export const btcNav = (btc, btcPrice) => btc * btcPrice;                         // 比特币净值（按市价）
export const mnavBasic = (mktCap, btc, btcPrice) => mktCap / btcNav(btc, btcPrice); // 市值口径 mNAV
// 企业价值口径 mNAV（Strategy 采用的思路）：(市值 + 债务 + 优先股名义 − 现金) / 比特币净值
export const mnavEV = (mktCap, debt, pref, cash, btc, btcPrice) => (mktCap + debt + pref - cash) / btcNav(btc, btcPrice);
export const btcPerShare = (btc, shares) => btc / shares;
// BTC Yield：一段时期内“每股比特币”（通常按假设完全稀释股数）的百分比变化
export const btcYield = (btc0, sh0, btc1, sh1) => (btc1 / sh1) / (btc0 / sh0) - 1;
// BTC Gain：期初持币量 × BTC Yield（等价于“若不发股、多出来的比特币”）；BTC $ Gain = BTC Gain × 期末币价
export const btcGain = (btc0, yieldPct) => btc0 * yieldPct;
export const btcDollarGain = (btc0, yieldPct, btcPrice) => btc0 * yieldPct * btcPrice;
// 发股买币的增值判定：以 mNAV 发行新股、全部换成比特币，对每股比特币的影响
// 发行 newShares 股、价格 px，全部买币 → 返回新的每股比特币与变化率
export function issueAndBuy({ btc, shares, btcPrice, px, newShares }) {
  const newBtc = btc + (newShares * px) / btcPrice, newShs = shares + newShares;
  return { btc: newBtc, shares: newShs, bps0: btc / shares, bps1: newBtc / newShs, change: (newBtc / newShs) / (btc / shares) - 1 };
}
// 放大倍数（BTC 敞口 / 普通股净值）：普通股持有人对比特币涨跌的弹性近似
export const amplification = (btcValue, seniorClaims) => (btcValue > seniorClaims ? btcValue / (btcValue - seniorClaims) : Infinity);
// BTC 评级 / 资产覆盖：比特币净值 / 某层及以上累计债权（债务 + 优先股名义）
export const btcRating = (btcValue, cumulativeClaims) => (cumulativeClaims > 0 ? btcValue / cumulativeClaims : Infinity);
// 美元储备可覆盖的股息月数
export const monthsCovered = (reserve, annualObligations) => (annualObligations > 0 ? (reserve / annualObligations) * 12 : Infinity);

/* ---------- Strategy 官方口径（2026 起，见 _research/dat-facts.md §1.9、§4.2）---------- */
// 净储备 Net Reserve = BTC Reserve − 价外债务名义 − 优先股名义（不含价内可转优先股）+ 美元资产
export const netReserve = (btcReserve, otmDebt, prefNotional, usdAssets) => btcReserve - otmDebt - prefNotional + usdAssets;
// 2026 版 mNAV = 股价 ÷（净储备 ÷ 完全稀释股数）——只把价内的可转工具算进股数
export const mnavNetBps = (price, btcReserve, otmDebt, prefNotional, usdAssets, fullyDilutedShares) =>
  price / (netReserve(btcReserve, otmDebt, prefNotional, usdAssets) / fullyDilutedShares);
// 2025 版（企业价值口径）即上面的 mnavEV；市值口径即 mnavBasic；稀释市值口径 = 股价 × 稀释股数 ÷ BTC NAV
export const mnavDiluted = (price, dilutedShares, btcReserve) => (price * dilutedShares) / btcReserve;
// Strategy 的放大倍数 Amplification = BTC Reserve ÷ Net Reserve
export const amplificationStrategy = (btcReserve, otmDebt, prefNotional, usdAssets) => btcReserve / netReserve(btcReserve, otmDebt, prefNotional, usdAssets);
// Strive 的 “Amplification Ratio” 是另一个公式：(债务 + 优先股名义) ÷ BTC 价值（百分比）
export const striveAmpRatio = (debt, prefNotional, btcReserve) => (debt + prefNotional) / btcReserve;
// BTC 地板价：该工具 BTC Rating 恰好 = 1.0x 时的比特币价格
export const btcFloorPrice = (btcPrice, rating) => btcPrice / rating;
// BTC Credit（弥补 BTC Risk 所需的信用利差）= −ln(1 − BTC Risk) ÷ 久期
export const btcCredit = (btcRisk, duration) => -Math.log(1 - btcRisk) / duration;
// BTC Breakeven ARR = 年度利息与股息 ÷ BTC Reserve（比特币每年需涨多少才“覆盖”这些义务）
export const breakevenArr = (annualObligations, btcReserve) => annualObligations / btcReserve;
// 对数正态模型下，久期 T 年末 BTC Rating 低于 1 的概率（BTC Risk 的思路）：mu=年化预期回报(连续)，sigma=年化波动
export function btcRiskProb(rating, mu, sigma, T) {
  const z = (Math.log(1 / rating) - (mu - 0.5 * sigma * sigma) * T) / (sigma * Math.sqrt(T));
  return normCdf(z);
}

/* ---------- 期权（布莱克-斯科尔斯）---------- */
export function normCdf(x) { // Abramowitz–Stegun 7.1.26
  const t = 1 / (1 + 0.2316419 * Math.abs(x));
  const d = 0.3989423 * Math.exp(-x * x / 2);
  const p = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
  return x > 0 ? 1 - p : p;
}
// S 标的价、K 行权价、T 年、r 无风险利率、sigma 波动率
export function bsCall(S, K, T, r, sigma) {
  if (T <= 0 || sigma <= 0) return Math.max(0, S - K * Math.exp(-r * T));
  const d1 = (Math.log(S / K) + (r + 0.5 * sigma * sigma) * T) / (sigma * Math.sqrt(T)), d2 = d1 - sigma * Math.sqrt(T);
  return S * normCdf(d1) - K * Math.exp(-r * T) * normCdf(d2);
}
export const bsPut = (S, K, T, r, sigma) => bsCall(S, K, T, r, sigma) - S + K * Math.exp(-r * T);

/* ---------- 组合与风险 ---------- */
export const mean = (a) => a.reduce((s, x) => s + x, 0) / a.length;
export const stdev = (a) => { const m = mean(a); return Math.sqrt(a.reduce((s, x) => s + (x - m) ** 2, 0) / (a.length - 1)); };
// 两资产组合波动率
export const port2Vol = (w, s1, s2, rho) => Math.sqrt(w * w * s1 * s1 + (1 - w) ** 2 * s2 * s2 + 2 * w * (1 - w) * rho * s1 * s2);
export const sharpe = (ret, rf, vol) => (vol > 0 ? (ret - rf) / vol : Infinity);
// 凯利：胜率 p、赔率 b（赢时每 1 元赚 b 元）
export const kelly = (p, b) => (b * p - (1 - p)) / b;
// 最大回撤
export function maxDrawdown(series) {
  let peak = -Infinity, mdd = 0;
  for (const v of series) { peak = Math.max(peak, v); mdd = Math.min(mdd, v / peak - 1); }
  return mdd;
}
// 可复现的伪随机数（演示里做模拟用，保证每次刷新结果一样）
export function rng(seed = 42) {
  let s = seed >>> 0;
  return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
}
export function randn(rand) { let u = 0, v = 0; while (u === 0) u = rand(); while (v === 0) v = rand(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v); }

/* ---------- AMM（恒定乘积）---------- */
// 池子 x（代币 A）与 y（代币 B），x·y=k；卖入 dx 个 A（扣手续费 fee）得到多少 B
export function ammSwap(x, y, dx, fee = 0.003) {
  const dxEff = dx * (1 - fee), k = x * y, newX = x + dxEff, newY = k / newX;
  return { out: y - newY, newX: x + dx, newY, priceBefore: y / x, priceAfter: newY / (x + dx), execPrice: (y - newY) / dx };
}

/* ---------- 英文模式下的全角标点兜底 ---------- */
// 在 en 模式下把 root 内文本节点里残留的中文全角标点换成英文标点（演示里拼接字符串时漏掉 T() 的兜底）。
const PUNCT = { "：": ": ", "；": "; ", "（": " (", "）": ")", "。": ". ", "，": ", ", "、": ", ", "！": "! ", "？": "? " };
const PUNCT_RE = /[：；（）。，、！？]/g;
export function enPunct(root) {
  const fix = (node) => {
    const w = document.createTreeWalker(node, NodeFilter.SHOW_TEXT);
    let n; while ((n = w.nextNode())) {
      if (PUNCT_RE.test(n.nodeValue)) { PUNCT_RE.lastIndex = 0; n.nodeValue = n.nodeValue.replace(PUNCT_RE, (c) => PUNCT[c]).replace(/ {2,}/g, " ").replace(/\( /g, "("); }
      PUNCT_RE.lastIndex = 0;
    }
  };
  fix(root);
  new MutationObserver(() => fix(root)).observe(root, { childList: true, subtree: true, characterData: true });
}
