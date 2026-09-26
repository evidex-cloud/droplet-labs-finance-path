export default {
  id: "cheat-sheet",
  stage: 20,
  order: 4,
  title: "附录：公式、指标与术语速查表",
  difficulty: "mastery",
  prereqs: ["connect-the-dots", "btc-rating", "mnav"],

  oneLiner:
    "全课所有公式、指标与关键数字，收在一页。每个公式都与共享引擎 `_fin.js` 的写法**逐字一致**，并标出它最早出现在哪一节：时间价值（现值、复利、费雪、永续、戈登）、债券（价格、到期收益率、久期、凸性、DV01）、风险与组合（夏普、凯利、组合波动、最大回撤）、以及 DAT 焦点层的全部指标——**四种 mNAV、每股比特币、BTC Yield/Gain/$ Gain、Strategy 的 Amplification 与 Strive 的 Amplification Ratio、BTC 评级、地板价、BTC Risk 与 BTC Credit、Breakeven ARR、覆盖月数**。配一个可搜索、可现场计算的演示。**口径永远比数字重要**：同一家公司，换一个定义就能得出不同的结论。",

  intuition: `
这一节是全课的“工具箱清单”。前面 19 个阶段里，每个公式都是在一个故事里出场的：1,000 美元的 5% 十年期债券、30 年期国债的久期 15.5、橙子公司的 10,000 枚比特币。故事帮你理解，但到了真正要用的时候——读一份 8-K、看一条新闻、做阶段 20.3 五问法的第①问和第⑤问——你需要的是**一张随手可查的表**。

为什么不直接背公式？因为本课最常见的错误不是算错，而是**用错口径**。举三个例子：

- **mNAV**：橙子公司按市值口径是 **1.50 倍**，按稀释市值口径 **1.59 倍**，按 Strategy 2025 年的企业价值口径 **1.77 倍**，按 Strategy 2026 年的“股价 ÷ 每股净比特币”口径 **2.05 倍**。四个数都对，但如果你拿一家公司的 1.50 去和另一家的 2.05 比较，结论就全错了（阶段 16.2）。
- **放大倍数**：简单口径 10 ÷ (10 − 3) ≈ **1.43 倍**（不计现金）；Strategy 官方 Amplification = BTC Reserve ÷ Net Reserve = 10 ÷ 7.3 ≈ **1.37 倍**；Strive 的 “Amplification Ratio” 则是完全不同的东西 =（债务 + 优先股）÷ 比特币 = **30%**（阶段 16.4、阶段 17.5）。
- **每股比特币**：按 1 亿普通股是 **10,000 聪**；按 Strategy 的“假设稀释股数”（不管价内价外，可转债都算转股，1.06 亿股）约 **9,434 聪**（阶段 16.1）。

所以这张速查表的每一行都写清三件事：**公式是什么、它在引擎里叫什么、它最容易被误用在哪里**。表里的示意数字全部来自全课统一的例子，可以用演示里的小计算器当场复算；标了日期的真实数字来自本课的事实表（截至 2026 年 9 月），它们会很快过时，请以 strategy.com、treasury.gov 等官方实时数据为准。

这一节同时覆盖**四个观念**：时间价值的公式是观念①，资本结构与 DAT 指标是观念②，覆盖与储备是观念③的“现金管道”，风险、杠杆与波动的公式是观念④。**本节只汇总机制与计算方法，不构成投资建议。**

用法建议：第一次读，把每一组公式对照它的“出处”回看一遍，确认你能讲出它的直觉；之后把演示当计算器用——搜索框里输入 mNAV、rating、久期、凯利，都能找到对应的卡片。

**这一节，我们拆成六块：**

- **① 时间的价格：复利、现值、费雪与永续**
- **② 债券与信用：价格、收益率、久期与利差**
- **③ 资本结构、风险与组合：瀑布、夏普、凯利与期权**
- **④ DAT 指标（上）：比特币净值、四种 mNAV、每股比特币与 BTC Yield**
- **⑤ DAT 指标（下）：放大倍数、BTC 评级、BTC Credit 与覆盖**
- **⑥ 关键数字与口径陷阱：一页记住全课的锚**
`,

  mechanics: `
### ① 时间的价格：复利、现值、费雪与永续

<table class="pm">
<tr><th>名称</th><th>公式</th><th>引擎函数</th><th>标准例子</th><th>出处</th></tr>
<tr><td>终值（复利）</td><td>FV = PV × (1 + r/m)^(n·m)</td><td>fv(pv, r, n, m)</td><td>1,000 美元、5%、10 年、年复利 → 1,628.89</td><td>阶段 2.2</td></tr>
<tr><td>现值</td><td>PV = FV ÷ (1 + r/m)^(n·m)</td><td>pv(fv, r, n, m)</td><td>10 年后 1,000 美元，按 5% → 613.91</td><td>阶段 2.3</td></tr>
<tr><td>72 法则</td><td>翻倍年数 ≈ 72 ÷ (r × 100)</td><td>rule72(r)</td><td>5% → 约 14.4 年</td><td>阶段 2.2</td></tr>
<tr><td>费雪方程（实际利率）</td><td>实际 = (1 + 名义) ÷ (1 + 通胀) − 1</td><td>realRate(nominal, infl)</td><td>5.17% 名义、3.4% 通胀 → 约 1.71%</td><td>阶段 2.5</td></tr>
<tr><td>净现值</td><td>NPV = Σ CF_t ÷ (1 + r)^t</td><td>npv(flows, r)</td><td>一串现金流，按同一折现率加总</td><td>阶段 2.3</td></tr>
<tr><td>永续年金</td><td>P = CF ÷ r</td><td>perpetuity(cf, r)</td><td>每年 10 美元、10% → 100</td><td>阶段 2.3、阶段 18.1</td></tr>
<tr><td>增长永续（戈登）</td><td>P = CF₁ ÷ (r − g)，仅当 r &gt; g</td><td>gordon(cf1, r, g)</td><td>5 美元、8%、3% → 100</td><td>阶段 2.3、阶段 5.3</td></tr>
</table>

**要点**：这一组全是观念①。所有资产 = 未来现金流按某个利率折现；那个利率的锚是无风险国债收益率（阶段 2.4）。实际利率决定了黄金与比特币这类不生息资产的机会成本（阶段 20.2）。**利率一律用小数**（5% = 0.05），这是引擎的约定。

### ② 债券与信用：价格、收益率、久期与利差

$$ 债券价格 P = Σ [c ÷ (1 + y/f)^k] + 面值 ÷ (1 + y/f)^n    （c = 面值 × 票息 ÷ f，n = 年数 × f）
麦考利久期 = Σ t × PV(CF_t) ÷ P
修正久期 = 麦考利久期 ÷ (1 + y/f)
DV01 = 修正久期 × P × 0.0001
价格变化 ≈ −修正久期 × Δy + ½ × 凸性 × Δy²

<table class="pm">
<tr><th>名称</th><th>引擎函数</th><th>标准例子</th><th>出处</th></tr>
<tr><td>债券价格</td><td>bondPrice(face, couponRate, ytm, years, freq=2)</td><td>1,000 美元、5%、10 年，收益率 6% → 925.61</td><td>阶段 4.2</td></tr>
<tr><td>到期收益率（YTM，反解）</td><td>bondYield(price, face, couponRate, years, freq)</td><td>同一债券卖 950 → 约 5.66%</td><td>阶段 4.2</td></tr>
<tr><td>久期、凸性、DV01</td><td>bondRisk(face, couponRate, ytm, years, freq)</td><td>10 年期平价（收益率 5%）时修正久期约 7.79、收益率 6% 时约 7.67；30 年期 5% 修正久期约 15.45、凸性约 352</td><td>阶段 4.4</td></tr>
<tr><td>久期 + 凸性近似</td><td>priceChangeApprox(mod, convexity, dy)</td><td>30 年期 +1 个百分点 → 约 −13.7%（精确值：100 → 86.2）</td><td>阶段 4.4、阶段 4.5</td></tr>
<tr><td>永续的久期</td><td>修正久期 ≈ 1 ÷ y</td><td>10% 永续 → 约 10；收益率 +0.85 个百分点 → 100 → 92.2</td><td>阶段 4.4、阶段 18.1</td></tr>
<tr><td>信用利差</td><td>公司债收益率 = 国债收益率 + 利差</td><td>利差补偿违约、流动性、劣后与复杂性</td><td>阶段 4.6</td></tr>
<tr><td>预期损失</td><td>EL = PD × LGD</td><td>违约概率 2%、违约损失率 60% → 1.2%</td><td>阶段 4.6</td></tr>
</table>

**要点**：价格与收益率反向；期限越长、票息越低，久期越大。**高股息反而降低永续的久期**：10% 永续（久期约 10）比 5% 的 30 年期国债（约 15.5）“短”。注意引擎的 bondPrice 默认**半年付息**（freq = 2）。

### ③ 资本结构、风险与组合：瀑布、夏普、凯利与期权

<table class="pm">
<tr><th>名称</th><th>公式</th><th>引擎函数</th><th>出处</th></tr>
<tr><td>清偿瀑布</td><td>按清偿顺序逐层支付：本层实得 = min(剩余资产, 本层债权)，剩下的归普通股</td><td>waterfall(assetValue, layers)</td><td>阶段 6.1、阶段 17.6</td></tr>
<tr><td>分层资产覆盖</td><td>覆盖 = 资产 ÷ 本层及以上累计债权</td><td>coverageByLayer(assetValue, layers)</td><td>阶段 6.5、阶段 16.5</td></tr>
<tr><td>波动率（样本标准差）</td><td>σ = √[Σ(x − x̄)² ÷ (n − 1)]</td><td>stdev(a)</td><td>阶段 11.3</td></tr>
<tr><td>两资产组合波动</td><td>σ_p = √(w²σ₁² + (1−w)²σ₂² + 2w(1−w)ρσ₁σ₂)</td><td>port2Vol(w, s1, s2, rho)</td><td>阶段 11.1</td></tr>
<tr><td>夏普比率</td><td>(回报 − 无风险利率) ÷ 波动率</td><td>sharpe(ret, rf, vol)</td><td>阶段 11.3</td></tr>
<tr><td>凯利比例</td><td>f* = (b × p − (1 − p)) ÷ b</td><td>kelly(p, b)</td><td>阶段 11.4</td></tr>
<tr><td>最大回撤</td><td>min(价值 ÷ 此前峰值 − 1)</td><td>maxDrawdown(series)</td><td>阶段 11.3</td></tr>
<tr><td>布莱克-斯科尔斯</td><td>C = S·N(d₁) − K·e^(−rT)·N(d₂)；P 由平价关系得出</td><td>bsCall / bsPut(S, K, T, r, sigma)</td><td>阶段 7.2、阶段 7.3</td></tr>
<tr><td>恒定乘积做市</td><td>x · y = k；扣手续费后卖入 dx 得到 y − k ÷ (x + dx·(1 − fee))</td><td>ammSwap(x, y, dx, fee)</td><td>阶段 13.3</td></tr>
</table>

**要点**：分散化的威力来自相关性 ρ；股债相关性一翻正，60/40 的波动就上升（阶段 20.2）。凯利告诉你“押多少”，但对波动极大的资产，实践中常用它的一个分数（阶段 11.4）——**杠杆放大的不只是收益，还有波动拖累**。

### ④ DAT 指标（上）：比特币净值、四种 mNAV、每股比特币与 BTC Yield

橙子公司基准：10,000 BTC × 100,000 美元；普通股 1 亿股 × 15 美元；可转债 1.5 亿（价外，转股价 25 美元，假设转股 +600 万股）；优先股 Orange-F 1 亿 + Orange-D 5,000 万；美元储备 3,000 万。

$$ 比特币净值 BTC NAV = 持币量 × 币价
净储备 Net Reserve = BTC Reserve − 价外债务名义 − 优先股名义（不含价内可转优先股）+ 美元资产
每股比特币 = 持币量 ÷ 股数（1 BTC = 1 亿聪）

<table class="pm">
<tr><th>指标</th><th>公式</th><th>引擎函数</th><th>橙子公司</th></tr>
<tr><td>BTC NAV</td><td>持币 × 币价</td><td>btcNav(btc, btcPrice)</td><td>10 亿美元</td></tr>
<tr><td>mNAV · 市值口径</td><td>市值 ÷ BTC NAV</td><td>mnavBasic(mktCap, btc, btcPrice)</td><td><b>1.50</b></td></tr>
<tr><td>mNAV · 稀释市值口径</td><td>股价 × 稀释股数 ÷ BTC NAV</td><td>mnavDiluted(price, dilutedShares, btcReserve)</td><td><b>1.59</b>（1.06 亿股）</td></tr>
<tr><td>mNAV · 企业价值口径（Strategy 2025）</td><td>(市值 + 债务 + 优先股名义 − 现金) ÷ BTC NAV</td><td>mnavEV(mktCap, debt, pref, cash, btc, btcPrice)</td><td><b>1.77</b></td></tr>
<tr><td>mNAV · 股价 ÷ 每股净比特币（Strategy 2026）</td><td>股价 ÷ (Net Reserve ÷ 完全稀释股数)，只计价内工具</td><td>mnavNetBps(price, btcReserve, otmDebt, prefNotional, usdAssets, fullyDilutedShares)</td><td><b>2.05</b>（净储备 7.3 亿，每股 7.30 美元）</td></tr>
<tr><td>每股比特币</td><td>持币 ÷ 股数</td><td>btcPerShare(btc, shares)</td><td>10,000 聪（1 亿股）；约 9,434 聪（假设稀释 1.06 亿股）</td></tr>
<tr><td>BTC Yield</td><td>(期末持币 ÷ 期末股数) ÷ (期初持币 ÷ 期初股数) − 1</td><td>btcYield(btc0, sh0, btc1, sh1)</td><td>增发买币后 +4.5%</td></tr>
<tr><td>BTC Gain</td><td>期初持币 × BTC Yield</td><td>btcGain(btc0, yieldPct)</td><td>10,000 × 4.545% ≈ 455 BTC</td></tr>
<tr><td>BTC $ Gain</td><td>BTC Gain × 币价</td><td>btcDollarGain(btc0, yieldPct, btcPrice)</td><td>约 4,545 万美元</td></tr>
<tr><td>发股买币</td><td>新每股比特币 = (持币 + 新股 × 发行价 ÷ 币价) ÷ (股数 + 新股)</td><td>issueAndBuy({btc, shares, btcPrice, px, newShares})</td><td>15 美元增发 1,000 万股 → 11,500 BTC ÷ 1.1 亿股，+4.5%</td></tr>
</table>

**口径陷阱**：Strategy 的 BTC Yield 用“假设稀释股数”（所有可转工具都算转股，不论价内价外）；2026 年 mNAV 用“完全稀释股数”（只算价内工具）——**两个“稀释”不是一回事**（阶段 16.1、阶段 16.3）。Strive 不叫 mNAV，而是报告 “Common Equity Accretion Premium” = 市值 ÷ 比特币价值 − 1（最低记为 0%），约等于市值口径 mNAV 减 1。真实锚点：Strategy 按 2026 年定义在 2026 年 8 月 21 日约 **1.01 倍**。**BTC Yield 不是债券意义上的“收益率”**——Strategy 自己也这样声明；用优先股或债务融资买币时，它会忽略新增的优先索取权。

### ⑤ DAT 指标（下）：放大倍数、BTC 评级、BTC Credit 与覆盖

<table class="pm">
<tr><th>指标</th><th>公式</th><th>引擎函数</th><th>橙子公司</th></tr>
<tr><td>放大倍数 · 简单口径</td><td>BTC 价值 ÷ (BTC 价值 − 优先索取权)，不计现金</td><td>amplification(btcValue, seniorClaims)</td><td>10 ÷ 7 ≈ <b>1.43 倍</b></td></tr>
<tr><td>Amplification · Strategy 官方</td><td>BTC Reserve ÷ Net Reserve</td><td>amplificationStrategy(btcReserve, otmDebt, prefNotional, usdAssets)</td><td>10 ÷ 7.3 ≈ <b>1.37 倍</b></td></tr>
<tr><td>Amplification Ratio · Strive</td><td>(债务 + 优先股名义) ÷ BTC 价值（百分比）</td><td>striveAmpRatio(debt, prefNotional, btcReserve)</td><td>3 ÷ 10 = <b>30%</b></td></tr>
<tr><td>BTC 评级（资产覆盖）</td><td>BTC Reserve ÷ (本工具名义 + 所有更优先工具)</td><td>btcRating(btcValue, cumulativeClaims)</td><td>可转债 6.7 倍 · F 4.0 倍 · D 3.3 倍</td></tr>
<tr><td>BTC 地板价</td><td>币价 ÷ BTC 评级（评级恰为 1.0 倍时的币价）</td><td>btcFloorPrice(btcPrice, rating)</td><td>F 25,000 美元 · D 约 30,000 美元</td></tr>
<tr><td>BTC Risk</td><td>对数正态模型下，久期末评级 &lt; 1 的概率：N(z)，z = [ln(1/评级) − (μ − σ²/2)T] ÷ (σ√T)</td><td>btcRiskProb(rating, mu, sigma, T)</td><td>F：μ = ln1.10、σ = 40%、T = 10 → 约 11.2%</td></tr>
<tr><td>BTC Credit</td><td>−ln(1 − BTC Risk) ÷ 久期</td><td>btcCredit(btcRisk, duration)</td><td>F 约 119 个基点；例：Risk 10%、久期 10 年 → 约 105 个基点</td></tr>
<tr><td>BTC Breakeven ARR</td><td>年度利息与股息 ÷ BTC Reserve</td><td>breakevenArr(annualObligations, btcReserve)</td><td>1,500 万 ÷ 10 亿 = <b>1.5%</b></td></tr>
<tr><td>覆盖月数</td><td>美元储备 ÷ 年度义务 × 12</td><td>monthsCovered(reserve, annualObligations)</td><td>3,000 万 ÷ 1,500 万 × 12 = <b>24 个月</b></td></tr>
</table>

<figure><svg viewBox="0 0 640 260" xmlns="http://www.w3.org/2000/svg" font-family="Inter, system-ui, sans-serif"><text x="320" y="20" text-anchor="middle" font-size="13" font-weight="700" fill="var(--ink)">橙子公司：一张表读出全部 DAT 指标</text><rect x="40" y="40" width="200" height="200" fill="var(--btc-soft)" stroke="var(--btc)"/><text x="140" y="130" text-anchor="middle" font-size="13" font-weight="700" fill="var(--ink)">10,000 BTC</text><text x="140" y="148" text-anchor="middle" font-size="11" fill="var(--muted)">BTC Reserve 10 亿</text><text x="140" y="166" text-anchor="middle" font-size="11" fill="var(--muted)">+ 美元储备 0.3 亿</text><rect x="280" y="40" width="200" height="30" fill="var(--blue-soft)" stroke="var(--blue)"/><text x="380" y="60" text-anchor="middle" font-size="11" fill="var(--ink)">可转债 1.5 亿 · 6.7x</text><rect x="280" y="70" width="200" height="20" fill="var(--orange-soft)" stroke="var(--orange)"/><text x="380" y="84" text-anchor="middle" font-size="10.5" fill="var(--ink)">F 1 亿 · 4.0x · 地板 2.5 万</text><rect x="280" y="90" width="200" height="10" fill="var(--orange-soft)" stroke="var(--orange)"/><rect x="280" y="100" width="200" height="140" fill="var(--green-soft)" stroke="var(--green)"/><text x="380" y="160" text-anchor="middle" font-size="12" font-weight="700" fill="var(--ink)">普通股的净储备 7.3 亿</text><text x="380" y="178" text-anchor="middle" font-size="10.5" fill="var(--muted)">Amplification ≈ 1.37x</text><text x="380" y="194" text-anchor="middle" font-size="10.5" fill="var(--muted)">mNAV 1.50 / 1.59 / 1.77 / 2.05</text><line x1="240" y1="140" x2="278" y2="140" stroke="var(--ink)" stroke-dasharray="4 3"/><text x="490" y="60" font-size="10" fill="var(--muted)">年度股息 0.15 亿</text><text x="490" y="74" font-size="10" fill="var(--muted)">覆盖 24 个月</text><text x="490" y="99" font-size="10" fill="var(--muted)">← D 0.5 亿 · 3.3x</text><text x="490" y="113" font-size="10" fill="var(--muted)">D 地板约 3 万</text><text x="490" y="132" font-size="10" fill="var(--muted)">Breakeven 1.5%</text><text x="490" y="148" font-size="10" fill="var(--muted)">Strive 口径 30%</text></svg><figcaption>左边是资产（比特币与美元储备），右边按清偿顺序从上到下排列索取权；每个 DAT 指标都是这张表上两块面积的比值。</figcaption></figure>

真实锚点（Strategy，均为公司披露，数字每周在变）：2026 年 8 月 23 日 Amplification 约 **1.30 倍**、STRC 的 BTC 评级约 **5.7 倍**、地板价约 **13,400 美元**、BTC Credit 约 **59 个基点**、Breakeven ARR 约 **2.63%**；Strive 的 Amplification Ratio 约 **50.4%**（2026 年 9 月 18 日）。**BTC 评级不是信用评级机构的评级**，Strategy 自己也这样声明；S&P 给 Strategy 的发行人评级是 “B-”（阶段 16.5、阶段 18.1）。

### ⑥ 关键数字与口径陷阱：一页记住全课的锚

**全课标准例子**

<table class="pm">
<tr><th>例子</th><th>数字</th><th>用在</th></tr>
<tr><td>标准债券</td><td>面值 1,000 美元、票息 5%、10 年；收益率 6% 时约 925.6；平价时修正久期约 7.8</td><td>阶段 4.1–4.4</td></tr>
<tr><td>30 年期国债</td><td>约 5% 收益率、修正久期约 15.5；收益率 +1 个百分点 → 100 → 86.2（约 −14%）</td><td>阶段 4.5、阶段 20.1</td></tr>
<tr><td>橙子公司</td><td>10,000 BTC、币价 10 万、1 亿股 × 15 美元、可转债 1.5 亿、F 1 亿、D 0.5 亿、储备 0.3 亿、年股息 0.15 亿</td><td>阶段 15–18、阶段 20</td></tr>
<tr><td>飞轮</td><td>15 美元增发 1,000 万股 → 买 1,500 BTC → 每股比特币 +4.5%</td><td>阶段 16.7</td></tr>
</table>

**截至 2026 年 9 月的现实锚点**（宏观与 DAT 事实表；请以官方实时数据为准）：30 年期国债约 5.49%、10 年期约 5.17%（9 月 25 日）；联邦基金利率 3.75%–4.00%（9 月 16 日加息）；美国联邦总债务约 40.07 万亿美元（9 月 24 日）；8 月 CPI 约 3.4%；比特币约 8.4 万美元（9 月 25 日），2025 年 10 月高点约 12.6 万；稳定币约 3,120 亿美元；Strategy 持有 846,000 BTC（9 月 20 日），美元储备约 50.4 亿美元；STRC 股息率 12.00%；SATA 13.00%。

**十个口径陷阱**

1. mNAV 有四种口径，Strategy 在 2026 年改了定义——**提到 mNAV 必须说明口径**。
2. “稀释”分两种：假设稀释（全部转股，用于 BTC Yield）与完全稀释（只算价内，用于 2026 年 mNAV）。
3. 放大倍数三种：简单 1.43、Strategy 1.37（计入现金）、Strive 的 30% 是比例不是倍数。
4. BTC Yield 不是利息，也不扣除新增的优先索取权。
5. BTC 评级按层**累计**：D 层的分母包括可转债与 F 层。
6. 地板价不随币价变化——它等于累计索取权 ÷ 持币量。
7. 永续的久期不是无穷大，而是约 1 ÷ 收益率。
8. 浮动利率优先股的“短久期”依赖管理层主动调息。
9. 覆盖月数只看美元储备；Strategy 的 “USD Duration” 用的是美元资产（储备 + 现金）。
10. 引擎里利率都是小数，债券默认半年付息；公司口径可能与引擎略有不同，课文会注明。

下一步是阶段 ∞.1 的开放问题，以及阶段 ∞.3 的综合练习：从宏观体制到利率、比特币、挑一家 DAT、算指标、看资本结构、做压力测试——这张表里的每一行都会用上。
`,

  demo: "cheat-sheet",

  analogy: `
这张速查表像**飞行员的检查单**。

飞行员当然懂空气动力学，每一个开关背后的原理都学过好几遍。可每次起飞前，他们仍然一项一项念检查单：襟翼、配平、燃油、仪表。原因不是记不住，而是**在压力之下，人最容易漏掉自己“早就懂”的东西**。

读 DAT 的财报、看一条“mNAV 跌破 1”的新闻、算一张优先股的收益率，都是这种时刻。你懂 mNAV，但会不会忘了问“是哪种口径”？你懂 BTC 评级，但会不会忘了它是**累计**的？你懂永续，但会不会脱口而出“永续久期无穷大”？

检查单还有第二个作用：**让不同的人说同一种语言**。当副驾驶说“襟翼 15”，机长知道那是什么意思。当你说“按 Strategy 2026 年定义 mNAV 1.01 倍”，另一个读过这门课的人就能准确复算——而不是和你争论一个其实口径不同的数字。

所以别把这一节当作“背诵材料”。把它当成起飞前的那张卡：每次要下判断时，拿出来，一项一项对一遍。
`,

  misconceptions: [
    "**“mNAV 只有一个标准算法。”** —— 至少四种：市值、稀释市值、企业价值（Strategy 2025）、股价 ÷ 每股净比特币（Strategy 2026）。橙子公司分别是 1.50、1.59、1.77、2.05。第三方网站还各有自己的口径。",
    "**“Strive 的 Amplification Ratio 30% 就是 0.3 倍放大。”** —— 它是（债务 + 优先股）÷ 比特币价值的比例，和 Strategy 的 Amplification（BTC Reserve ÷ Net Reserve，大于 1 的倍数）是两个公式，不能直接比较。",
    "**“BTC 评级 4 倍，意味着比特币跌 75% 以内都没事。”** —— 4 倍只说明币价跌到 25,000 美元时覆盖恰好为 1 倍；在那之前覆盖已经大幅下降，利差会扩大、价格会下跌，公司也可能暂停付息（对非累积优先股尤其关键）。",
    "**“BTC Yield 为正，说明股东赚到了钱。”** —— 它只衡量每股比特币的变化，不是现金收益；用优先股或债务融资买币时，它忽略了新增的、排在普通股前面的索取权。",
    "**“公式背熟了就不会出错。”** —— 最常见的错误不是算错，而是口径用错、单位用错（百分数 vs 小数、年付 vs 半年付）。每次计算前先确认定义与单位。",
  ],

  quiz: [
    {
      q: "橙子公司按 Strategy 2026 年定义（股价 ÷ 每股净比特币）的 mNAV 是多少？",
      options: ["1.50", "1.77", "2.05", "1.59"],
      answer: 2,
      explain: "**净储备 = 10 − 1.5（价外可转债）− 1.5（优先股）+ 0.3（美元资产）= 7.3 亿美元**；完全稀释股数只算价内工具 = 1 亿股，每股净比特币 7.30 美元；15 ÷ 7.30 ≈ 2.05。",
    },
    {
      q: "下列哪一项正确描述了 BTC Credit？",
      options: [
        "BTC Credit = −ln(1 − BTC Risk) ÷ 久期，是弥补“评级跌破 1”概率所需的信用利差",
        "BTC Credit = 年度股息 ÷ BTC Reserve",
        "BTC Credit = BTC Reserve ÷ Net Reserve",
        "BTC Credit = 币价 ÷ BTC 评级",
      ],
      answer: 0,
      explain: "**BTC Credit 把概率换成利差**。选项 B 是 Breakeven ARR，C 是 Strategy 的 Amplification，D 是地板价。",
    },
    {
      q: "一张 10% 的永续优先股，要求收益率从 10% 升到 10.85%，用永续公式算价格大约是？",
      options: ["约 86.2", "约 100", "约 108.5", "约 92.2"],
      answer: 3,
      explain: "**永续价格 = 股息 ÷ 要求收益率** = 10 ÷ 0.1085 ≈ 92.2。修正久期约 1 ÷ y ≈ 10。86.2 是 30 年期 5% 国债在收益率 +1 个百分点后的价格。",
    },
    {
      q: "橙子公司 Orange-D（非累积，排在可转债和 Orange-F 之后）的 BTC 评级为什么是 3.3 倍而不是 20 倍？",
      options: [
        "因为非累积优先股要打折",
        "因为 BTC 评级按层累计：分母 = 可转债 1.5 亿 + F 1 亿 + D 0.5 亿 = 3 亿",
        "因为要扣掉美元储备",
        "因为用的是完全稀释股数",
      ],
      answer: 1,
      explain: "**BTC 评级 = BTC Reserve ÷（本工具 + 所有更优先工具）**：10 亿 ÷ 3 亿 ≈ 3.3 倍。只用 D 自己的 0.5 亿算出的 20 倍忽略了排在它前面的人。",
    },
    {
      q: "橙子公司美元储备 3,000 万、年度股息 1,500 万、BTC Reserve 10 亿。覆盖月数与 Breakeven ARR 分别是？",
      options: ["24 个月；1.5%", "12 个月；3.0%", "24 个月；15%", "2 个月；1.5%"],
      answer: 0,
      explain: "**覆盖月数 = 储备 ÷ 年度义务 × 12** = 24 个月；**Breakeven ARR = 年度义务 ÷ BTC Reserve** = 1.5%，即比特币每年涨 1.5% 就“覆盖”了股息。",
    },
  ],

  further: [
    { label: "Strategy 2026 年 8 月投资者简报（SEC FWP，含 mNAV、Amplification、BTC Rating、BTC Credit 等官方定义）", url: "https://www.sec.gov/Archives/edgar/data/1050446/000119312526363557/d431748dfwp.htm" },
    { label: "Strive 财库仪表盘（Amplification Ratio 等口径）", url: "https://strive.com/treasury" },
    { label: "bitcointreasuries.net：各公司 mNAV（基本 / 稀释 / 企业价值口径）", url: "https://bitcointreasuries.net/" },
    { label: "FRED：利率、通胀与宏观数据", url: "https://fred.stlouisfed.org/" },
    { label: "期权之路（姊妹课程）：布莱克-斯科尔斯与波动率", url: "https://evidex-cloud.github.io/droplet-labs-options-path/" },
  ],
};
