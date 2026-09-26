<div align="center">

<img src="assets/app-icon-dark-512.png" width="84" alt="Droplet Labs" />

# Droplet Labs · 新金融之路 / New Finance Path

**A local-first, bilingual, interactive master course on the new era of finance — from zero to expert: today's economy, bonds and stocks, Bitcoin, DeFi and tokenization, and the digital asset treasury companies led by Strategy (MSTR) and Strive (ASST), with their complete metrics and toolkit.**

中文 · English · runs in any browser · no build step

</div>

---

## English

**New Finance Path** takes someone with zero background and walks them, one shallow-to-deep path, to the point of seeing the *whole picture* of finance in the new era: why a rising 30-year Treasury yield is worrying, how DeFi and tokenization are rebuilding the plumbing of finance, how MSTR and ASST amplify Bitcoin, and how to judge the preferred stock they issue with BTC ratings, coverage and seniority.

Four ideas run through every lesson and tie it into one story:
1. **The price of time** — every asset is future cash flows discounted at a rate anchored on Treasuries.
2. **Balance sheets & claims** — every instrument is a claim on someone's balance sheet; seniority decides who gets paid.
3. **Liquidity & trust** — finance runs on plumbing; crises are runs; blockchains, stablecoins and tokenization rebuild the plumbing.
4. **Risk & leverage** — risk is priced, leverage cuts both ways, volatility itself can be bought and sold.

### What's inside
- **7 tiers · 22 stages · 115 lessons**, each paired with an **in-browser interactive demo** that computes for real.
- **Beginner** — what finance does · money and banking · the price of time (compounding, discounting, the risk-free rate) · reading today's economy.
- **The TradFi toolkit** — bonds (price–yield, the yield curve, duration, *why a rising 30-year yield is worrying*, credit spreads) · stocks (statements, valuation, dilution, indexes) · the capital stack (preferreds, converts, coverage, bankruptcy) · derivatives and volatility · market plumbing.
- **Macro, crises & risk** — the Fed's toolkit, liquidity, fiscal dominance · 2008, March 2020, UK gilts, SVB, crypto crises · portfolios, risk metrics and position sizing.
- **New finance** — Bitcoin as a financial asset · DeFi (stablecoins, AMMs, lending, yield, risks) · tokenization (Treasuries, stocks, limits, convergence).
- **The focus: digital asset treasury companies** — what a DAT is, Strategy's story, the landscape · the metrics toolkit (BTC per share, mNAV, BTC Yield/Gain, amplification, BTC Rating & asset coverage, dividend coverage, the flywheel math) · the instruments (ATMs, converts, STRF/STRC/STRE/STRK/STRD, Strive's SATA, seniority, return of capital) · risk assessment (valuing BTC-backed preferreds, stress tests, mNAV compression, index risk, comparisons, the analyst's checklist).
- **Mastery** — finance in the AI era (r*, the capex boom and its financing, AI in markets, agent payments, scarcity) · the whole picture (connecting the dots, macro regimes, reading news like a pro, cheat sheet).
- **Stage ∞** — open questions, your path, and a capstone analysis from macro down to a capital stack.
- A fixed lesson template — **Intuition → Mechanics → Demo → Analogy → Misconceptions → Quiz → Further reading**.
- **Bilingual** 中文 / English (toggle in the UI). Progress lives only in your browser (`localStorage`). Filter lessons by goal (Beginner / Investor / Analyst / Builder).
- **Not investment advice.** The course teaches frameworks, mechanics and history.

### Run it
No build, no dependencies — a static site. You need a local server because lessons and demos load via dynamic `import`.

```bash
# Windows — double-click, or:
launch.bat

# Any OS:
python -m http.server 8789
```

Then open **http://localhost:8789/**.

### Project layout
| Path | What it is |
| --- | --- |
| `index.html`, `app.js`, `styles.css` | The shell + renderer (vanilla JS) |
| `content/manifest.js` | The course map — generated from `tools/curriculum.py` |
| `content/glossary.js` | Bilingual glossary that auto-links in every lesson |
| `content/lessons/stageX-*.js` | Chinese lesson content — one file per lesson |
| `content/lessons/en/` | English lesson content — same filenames |
| `demos/*.js` | One interactive demo per lesson; `_fin.js` (finance engine) and `_chart.js` (charts) are shared |
| `tools/check.py` | Lesson QA checker (`python tools/check.py` checks the whole course) |
| `AUTHORING.md` | The course blueprint and how to write a lesson/demo in this format |

---

## 中文

**新金融之路** 把新时代的金融世界拆成一条**从浅到深**的主线，让零基础的人也能一步步看到**整张图**：30 年期国债收益率上升为什么令人担忧、DeFi 与代币化在怎样重建金融管道、MSTR 与 ASST 如何放大比特币，以及怎样用 BTC 评级、资产覆盖与清偿顺序评估它们发行的优先股。

四个观念贯穿每一节：**时间的价格** · **资产负债表与索取权** · **流动性与信任** · **风险与杠杆**。

### 里面有什么
- **7 个层 · 22 个阶段 · 115 节课**，每节都配一个真算的**浏览器内交互演示**。
- **入门**：金融在做什么 · 货币与银行 · 时间的价格（复利、折现、无风险利率）· 读懂今天的经济。
- **传统金融工具箱**：债券（价格与收益率、收益率曲线、久期、*30 年期收益率上升为何令人担忧*、信用利差）· 股票 · 资本结构（优先股、可转债、覆盖率、破产）· 衍生品与波动率 · 市场管道。
- **宏观、危机与风险**：美联储工具箱、流动性、财政主导 · 2008、2020 年 3 月、英国国债、硅谷银行、加密危机 · 组合、风险指标与仓位。
- **新金融**：作为金融资产的比特币 · DeFi · 代币化。
- **焦点：数字资产财库公司（DAT）**：DAT 是什么、Strategy 的故事与行业全景 · 指标工具箱（每股比特币、mNAV、BTC Yield/Gain、放大倍数、BTC 评级与资产覆盖、股息覆盖、飞轮数学）· 工具逐个拆（ATM、可转债、STRF/STRC/STRE/STRK/STRD、Strive 的 SATA、清偿顺序、资本返还）· 风险评估（优先股估值、压力测试、mNAV 压缩、指数风险、横向比较、分析师清单）。
- **精通**：AI 时代的金融 · 全景图（连点成线、宏观体制、读新闻、速查表）。
- **阶段 ∞**：未解的问题、你的路径、毕业设计。
- **不构成投资建议**：只讲框架、机制与历史。

### 怎么运行
```bash
launch.bat
python -m http.server 8789
```
然后打开 **http://localhost:8789/**。

---

## License

**Proprietary — © 2026 Droplet Labs. All rights reserved.** See [LICENSE](LICENSE).

<div align="center"><sub>Developed by <b>Droplet Labs</b> · Internal Only</sub></div>
