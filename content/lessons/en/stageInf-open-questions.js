export default {
  id: "open-questions",
  stage: "∞",
  order: 1,
  title: "Open Questions: Will Bitcoin Become the Reserve Asset of Digital Credit?",
  difficulty: "infinity",
  prereqs: ["connect-the-dots", "macro-regimes", "dat-checklist"],

  oneLiner:
    "After a hundred-odd lessons you own a full toolkit, yet the most important questions in the new finance **still have no answer**. Can bitcoin-backed credit become a genuine asset class? Will DAT mNAV premiums last? Will tokenized collateral reach the core plumbing? Are stablecoins helping banks or hollowing them out? Will AI push interest rates up or down? This lesson doesn't hand you verdicts. It breaks each question into **the strongest case on each side plus the signposts you can watch**, so you can judge for yourself with the tools you already have, and update as evidence arrives.",

  intuition: `
The last step in learning a field is not memorizing its answers. It is knowing **which questions are still open**, and how to handle them.

Physics students finish Newtonian mechanics and are told that nobody knows what dark matter is. Medical students finish anatomy and learn that the causes of Alzheimer's are still debated. Finance is no different. Most of the previous twenty stages taught **mechanisms that have already been tested**: bond prices move opposite to yields (Stage 4.2), seniority decides who gets paid first (Stage 6.1), issuing stock at a premium raises bitcoin per share (Stage 16.7), runs come from maturity mismatch (Stage 10.1). That is bedrock. Tomorrow's headlines won't change it.

But once Stage 20.1 joined the three headlines into a single line, the **end** of that line was left open. In September 2026 the 30-year Treasury yielded about 5.5%. Bitcoin sat near $84,000, roughly a third below its all-time high of about $126,000 in October 2025. Strategy's "Digital Credit" preferreds had around $14 billion or more of notional outstanding. Those are facts. What they **turn into** is a question on which smart, careful people with identical data reach opposite conclusions.

This lesson picks the five most important open questions. For each one we do the same four things:

1. **State the question precisely.** What exactly is in dispute? A claim that data can test, or a slogan?
2. **The strongest case for.** Not the loudest argument; the hardest one to refute.
3. **The strongest case against.** Same standard.
4. **Signposts.** Over the next year or two, which **observable data** would move you one way or the other?

The last point matters most. A good analyst does not say "I believe" or "I don't believe" about an open question. They say: **"Right now I think this is 60% likely. If I see X, I'll move to 75%. If I see Y, I'll drop to 35%."** That is the antidote to narrative bias from Stage 11.5: write down what evidence would change your mind *before* you look at the evidence.

Here is a number to make this concrete. Strategy computes a "BTC Credit" spread for STRC (the Stage 16.5 metric), and on August 23, 2026 it came to about 0.59 percentage points. In plain words, its lognormal model says bitcoin collateral needs only about 0.6% of annual risk compensation for this security. Yet STRC was paying a 12% dividend while the 10-year Treasury yielded about 5.2%, so the market was actually demanding a spread of roughly **7 percentage points**, more than ten times the model. **That tenfold gap is itself an open question.** Is the model missing risk, or has the market not yet accepted a new asset class? Serious people hold each view, and they imply very different futures.

The lesson rests on **all four ideas**. Bitcoin credit is a question about Idea ② (claims and seniority) and Idea ④ (pricing risk). DAT premiums are an Idea ④ reflexivity question. Tokenized collateral and stablecoins are Idea ③ (the plumbing and trust). AI and rates take us back to Idea ① (the price of time). It gathers up the whole course, and it sets up Stage ∞.2 (what role you can play in all this) and Stage ∞.3 (writing a complete analysis yourself). **This lesson covers mechanisms and analytical frameworks only. It is not investment advice and it forecasts no prices.**

**This lesson breaks into five parts:**

- **① Will bitcoin-backed credit become an asset class?**
- **② Will DAT mNAV premiums persist?**
- **③ Will tokenized collateral enter the core plumbing?**
- **④ Stablecoins and banks: substitute, complement, or absorbed?**
- **⑤ Will AI push interest rates up or down?**
`,

  mechanics: `
<figure><svg viewBox="0 0 640 330" xmlns="http://www.w3.org/2000/svg" font-family="Inter, system-ui, sans-serif"><text x="320" y="22" text-anchor="middle" font-size="13" font-weight="700" fill="var(--ink)">Five open questions: the two ends and the signposts to watch</text><text x="150" y="44" text-anchor="middle" font-size="11" fill="var(--red)" font-weight="600">"No / bearish" end</text><text x="490" y="44" text-anchor="middle" font-size="11" fill="var(--green)" font-weight="600">"Yes / bullish" end</text><g font-size="11"><rect x="20" y="56" width="600" height="46" rx="8" fill="var(--btc-soft)" stroke="var(--line)"/><text x="30" y="74" font-weight="700" fill="var(--ink)">① BTC credit an asset class?</text><text x="30" y="92" fill="var(--muted)">Watch: spreads, ratings, more issuers, paying through a bear market</text><line x1="330" y1="79" x2="600" y2="79" stroke="var(--line)" stroke-width="4" stroke-linecap="round"/><circle cx="440" cy="79" r="6" fill="var(--btc)"/><rect x="20" y="110" width="600" height="46" rx="8" fill="var(--orange-soft)" stroke="var(--line)"/><text x="30" y="128" font-weight="700" fill="var(--ink)">② DAT premiums persist?</text><text x="30" y="146" fill="var(--muted)">Watch: through-cycle mNAV, BTC-per-share growth, index rulings</text><line x1="330" y1="133" x2="600" y2="133" stroke="var(--line)" stroke-width="4" stroke-linecap="round"/><circle cx="400" cy="133" r="6" fill="var(--orange)"/><rect x="20" y="164" width="600" height="46" rx="8" fill="var(--blue-soft)" stroke="var(--line)"/><text x="30" y="182" font-weight="700" fill="var(--ink)">③ Tokenized collateral in the core?</text><text x="30" y="200" fill="var(--muted)">Watch: clearinghouse acceptance, DTCC pilot size, share of bills</text><line x1="330" y1="187" x2="600" y2="187" stroke="var(--line)" stroke-width="4" stroke-linecap="round"/><circle cx="465" cy="187" r="6" fill="var(--blue)"/><rect x="20" y="218" width="600" height="46" rx="8" fill="var(--green-soft)" stroke="var(--line)"/><text x="30" y="236" font-weight="700" fill="var(--ink)">④ Stablecoins replace banks?</text><text x="30" y="254" fill="var(--muted)">Watch: deposit flows, yield rules, deposit tokens, payment share</text><line x1="330" y1="241" x2="600" y2="241" stroke="var(--line)" stroke-width="4" stroke-linecap="round"/><circle cx="420" cy="241" r="6" fill="var(--green)"/><rect x="20" y="272" width="600" height="46" rx="8" fill="var(--red-soft)" stroke="var(--line)"/><text x="30" y="290" font-weight="700" fill="var(--ink)">⑤ AI pushes rates up?</text><text x="30" y="308" fill="var(--muted)">Watch: productivity, term premium, capex funding, inflation</text><line x1="330" y1="295" x2="600" y2="295" stroke="var(--line)" stroke-width="4" stroke-linecap="round"/><circle cx="470" cy="295" r="6" fill="var(--red)"/></g><text x="335" y="324" font-size="10" fill="var(--muted)">Dot positions only signal "still contested", not a verdict</text></svg><figcaption>Each question is a spectrum with serious people at both ends. Your job is not to pick a team but to know which data would push the dot which way.</figcaption></figure>

### ① Will bitcoin-backed credit become an asset class?

**The question.** Strategy calls its family of preferreds (Stage 17.3) "Digital Credit", and Strive's SATA (Stage 17.5) follows the same path. The shared structure: a company holds a large bitcoin position and issues **perpetual preferreds with fixed or floating dividends**, backed (not in the legal sense of pledged collateral) by bitcoin's excess coverage. The question is whether this grows into a **stand-alone asset class** the way high-yield bonds, mortgage-backed securities or munis did: with its own investor base, rating methods, indexes and pricing conventions.

It is already sizable. As of August 23, 2026, Strategy's preferreds totaled about $15 billion of notional, roughly $10 billion of it STRC; after September buybacks the total was about $14.3 billion (a derived figure). Annual interest plus dividends ran about $1.7 billion. Strive's SATA stood at about $1.1 billion on September 18 with a 13% dividend rate.

**The strongest case for:**
- **The coverage is real and can be checked every day.** On August 23, 2026 STRC's BTC Rating was about 5.7x on Strategy's method (Stage 16.5), meaning bitcoin would have to fall to roughly $13,400 before that layer was just barely underwater. Traditional high-yield credit rarely offers that transparency; you cannot see what a steel mill is worth minute by minute.
- **It has already survived one bear market.** Bitcoin fell about 54% between October 2025 and July 2026, and Strategy says its preferred dividends were paid in full and on time throughout, while it built a USD Reserve of about $5 billion (as of September 20). Asset classes usually earn their reputation in their first big bear market.
- **The model says the risk is small; the market's compensation is large.** The calculation below is the bulls' core evidence. The market's spread dwarfs what the model needs, which suggests **early buyers are collecting a "new asset class premium"** that should shrink as the product becomes familiar; supporters like to compare it with the young high-yield bond market of the 1980s.

BTC Risk comes from a lognormal model with inputs \\(\\text{BTC Rating} = 5.7\\times\\), expected return \\(\\mu = 10\\%\\) a year, volatility \\(\\sigma = 40\\%\\) and a duration of 8.1 years:

$$
\\text{BTC Risk} \\approx 4.7\\%
\\text{BTC Credit} = \\frac{-\\ln\\left(1 - 4.7\\%\\right)}{8.1} \\approx 0.60\\%
\\text{actual market spread} \\approx 12\\%\\ \\text{(STRC dividend rate)} - 5.2\\%\\ \\text{(10-year Treasury)} \\approx 6.8\\%
$$

Strategy reported a BTC Credit of 59bp for STRC.

**The strongest case against:**
- **The model's assumptions are exactly where the risk lives.** A lognormal model treats bitcoin's moves as smooth randomness, but bitcoin has had several 70% to 80% drawdowns (Stage 11.3). Raise volatility from 40% to 60% and the chance that the same 4x rating falls below 1x within about eight years jumps from roughly 9% to roughly 33%; the required spread goes from about 1.1% to about 5%. **The required spread is extremely sensitive to assumptions**, and that alone vindicates some market caution.
- **Coverage can be diluted.** A perpetual preferred never matures, and the issuer can keep issuing equal or more senior securities. A preferred covered 5.7x today could be covered 4x tomorrow after new issuance. Traditional bonds restrict this with covenants; these preferreds largely don't.
- **Bad things happen together.** When bitcoin falls hard is exactly when the stock tends to drop below 1x mNAV, the ATM stops working, and the preferreds trade below par (Stage 18.2). In July 2026 Strategy bought back STRC at an average of about $86.50, well below the $100 stated amount, and from late May it began selling bitcoin to fund dividends, its first sale since 2022. **Bulls say "they kept paying"; bears say "they paid by selling the collateral."** Both are true.
- **Concentration.** Digital Credit is, for now, mostly **one issuer**. An asset class needs dozens of issuers, a spread of default experience and rating-agency methods. As of this writing we found only S&P's B− issuer rating on Strategy (October 27, 2025) and no separate agency ratings on these preferreds.

**Signposts:** (1) whether spreads narrow **without** a bitcoin rally doing the work; (2) whether a rating agency publishes a formal method for bitcoin-backed preferreds; (3) whether more independent issuers appear, and whether one of them **fails with its preferred holders made whole** (a real test of Stage 17.6 seniority); (4) in the next deep bitcoin drop, whether the USD Reserve is enough or bitcoin has to be sold.

### ② Will DAT mNAV premiums persist?

**The question.** Stage 16.2 showed that mNAV above 1 means the market pays more than a dollar for each dollar of bitcoin the company holds. Stage 16.7 showed that only above 1x does issuing common to buy bitcoin **raise** bitcoin per share. The premium is the fuel for the entire DAT flywheel. So is it **structural value** (the company can do something others can't) or **cyclical sentiment** (it appears in bull markets and vanishes in bear markets)?

**Turning the premium into time.** Suppose a DAT can use premium issuance to grow bitcoin per share by \\(g\\) each year. How many years does it take to "earn back" an mNAV multiple of \\(m\\) that you pay today?

$$
\\text{years to earn back the premium} \\approx \\frac{\\ln(m)}{\\ln(1 + g)}
\\text{Orange Corp: }\\ m = 1.5,\\ g = 10\\% \\Rightarrow \\frac{\\ln(1.5)}{\\ln(1.1)} \\approx 4.3\\ \\text{years}
m = 2.0,\\ g = 20\\% \\Rightarrow \\frac{\\ln(2.0)}{\\ln(1.2)} \\approx 3.8\\ \\text{years}
$$

That turns an abstract argument into two numbers people can actually argue about: **how high the premium \\(m\\) is, and how long growth in bitcoin per share, \\(g\\), can last.** Note the reflexive loop (Stage 10.4): \\(g\\) depends on \\(m\\) (a bigger premium makes issuance more accretive), while \\(m\\) depends on what the market expects \\(g\\) to be.

**The strongest case for:**
- **Volatility is a real, saleable asset.** A DAT can sell bitcoin's volatility to convertible-arbitrage funds (Stage 17.2) and sell yield to preferred buyers (Stage 17.3). An ETF can't generate those cash flows, so DAT common deserves to trade richer than an ETF.
- **Access value.** Many mandates forbid holding bitcoin directly but allow stocks, preferreds and bonds (Stage 15.3).
- **The credit franchise is a moat.** If question ①'s Digital Credit really becomes an asset class, its largest issuer looks like a bank with a unique funding channel, and the premium is the price of that franchise.

**The strongest case against:**
- **Arbitrage gets competed away.** More than 200 new treasury companies launched in 2025. By September 2026, DWF Ventures counted **16 of the 20 largest DATs trading below 1x mNAV**; Metaplanet was about 0.58x on a basic measure and XXI about 0.68x. Any money machine that everyone can copy sees its premium flattened.
- **The closed-end fund precedent.** Vehicles that hold a basket of assets and can't be redeemed at NAV on demand have historically traded at **discounts** more often than premiums. The Grayscale Bitcoin Trust (GBTC) sat at a deep discount through much of 2022, which only closed when it converted to an ETF in 2024.
- **Premiums reverse themselves.** In October 2025 Strategy was still publishing guidance to issue "actively" when mNAV exceeded 4x. By August 21, 2026 its mNAV on its new 2026 definition was about 1.01x (Stage 18.3). The same flywheel that is a growth engine when it spins becomes a defensive structure, propped up by bitcoin sales and buybacks, when it stops.
- **Index risk.** In August 2026 MSCI opened a consultation on "non-operating companies" whose simulated deletions included Strategy, with results due on or before October 16, 2026 (Stage 18.4). Passive money is one source of the premium, and a rule change could cut it off.

**Signposts:** the median mNAV across **a full bitcoin cycle**, not the bull-market peak; whether growth in bitcoin per share comes from common issuance (genuinely accretive) or preferred issuance (which adds more senior claims, the Stage 16.3 caveat); MSCI's final ruling; and whether the surviving DATs consolidate into a handful. **Always name the definition when you quote an mNAV.** The same Orange Corp reads 1.50, 1.59, 1.77 or 2.05 depending on which of the four you use.

### ③ Will tokenized collateral enter the core plumbing?

**The question.** Stage 8.3 showed that the lifeblood of the financial system is **collateral**: repo, derivatives margin and clearinghouses all depend on Treasuries and other high-quality assets moving between institutions. Stage 14.2 covered tokenized Treasury funds such as BlackRock's BUIDL. Will tokenized assets move from being "a Treasury substitute inside crypto" to being **collateral that mainstream institutions actually use with each other**?

**Scale:** according to rwa.xyz (as quoted in the press), tokenized US Treasuries reached about $15 to $16 billion by mid-2026, up about 2.5x in a year. The US Treasury bill market alone is about $7.25 trillion, so the tokenized slice is about **0.2%**.

**The strongest case for:**
- **The core pipes are being formally connected.** SEC staff issued a no-action letter on December 11, 2025 for a DTCC tokenization pilot covering Russell 1000 stocks, major ETFs and Treasuries; limited live trades began July 15, 2026, with a broader launch targeted for October 2026. Nasdaq's rule to trade tokenized securities was approved on March 19, 2026, and on September 17, 2026 the SEC issued a five-year "innovation exemption". This is not crypto firms talking to themselves; it is **core US market infrastructure** moving.
- **Collateral mobility is worth real money.** If collateral can move atomically, 24/7, in seconds (Stage 8.2), institutions no longer need to park extra idle collateral to bridge weekends and settlement gaps. Binance has accepted BUIDL as off-exchange collateral for institutions since November 2025.
- **Compounding growth.** If tokenized Treasuries keep growing 2.5x a year, they would reach 10% of the bill market in about four years; even at 50% a year it takes about nine.

**The strongest case against:**
- **The old pipes work pretty well.** US stocks already settle T+1 (May 2024), and the Treasury repo market handles enormous daily volume. Tokenization solves a problem that is largely solved already, and switching costs are high.
- **A token is not the asset** (Stage 14.4). What exactly do you own in law? Who gets paid first in a bankruptcy? If the on-chain record and the off-chain register disagree, which wins? Until a real crisis tests those answers, big institutions will not stake their core margin on them.
- **The growth numbers are soft.** Part of the spring 2026 jump may reflect a tracker reclassifying products, and a 0.2% starting point shows how far it is from crypto-native use to mainstream use.

**Signposts:** whether major clearinghouses accept tokenized Treasuries as **margin**; the real size of the DTCC pilot after October 2026; whether banks use tokenized deposits for intraday repo with each other; and whether tokenized Treasuries keep growing during a bitcoin bear market (if they do, demand isn't just crypto speculation). One step further: could DAT preferreds one day trade on-chain and serve as DeFi collateral (Stage 14.3)? That is where the Digital Credit question and the new-plumbing question meet.

### ④ Stablecoins and banks: substitute, complement, or absorbed?

**The question.** Stage 1.2 showed that banks create deposits when they lend; Stage 13.2 showed that regulated stablecoins are backed 1:1 by Treasury bills and cash. As of September 26, 2026 total stablecoin supply was about $312 billion (DefiLlama), with USDT about $184 billion and USDC about $75 billion. If households and firms keep more and more money in stablecoins, do banks get hollowed out?

**The key mechanism (Stage 14.5):** when you swap $100 of bank deposits for a stablecoin, the issuer uses that $100 to buy Treasury bills. The bank loses $100 of deposits, and **with it $100 of funding it could have lent out**, while bills gain a buyer. That is why the Kansas City Fed argues that stablecoins raise Treasury demand **only by reducing demand for other assets, such as bank deposits**. It is a reshuffle, not new money from nowhere.

**The strongest case for "substitute":**
- Payments that are cheaper, faster, cross-border and always on; the dollar gains a new global distribution channel (Stage 3.4).
- AI agents need programmable money (Stage 19.4). The x402 protocol handled about 75.4 million transactions in the 30 days to September 26, 2026, although only about $24 million in value. Standard Chartered argued in February 2026 that stablecoins could head toward $2 trillion.

**The strongest case for "complement" or "absorbed":**
- **The GENIUS Act (signed July 18, 2025) bars issuers from paying interest to holders.** Money that pays nothing struggles to pull in savings. It behaves more like digital cash than like a replacement for deposits.
- Banks can issue their own **deposit tokens** (JPMorgan and others are reportedly piloting them), putting the new technology on the old balance sheet.
- Growth has slowed. Total supply peaked around $321 billion on May 17, 2026 and then eased; the new law did not automatically trigger a boom. Final GENIUS rules also missed their July 18, 2026 statutory deadline, with the OCC targeting November 2026.

**A third view**, the one this course considers most worth taking seriously, is **layered coexistence**. Go back to the hierarchy of money in Stage 1.1: central-bank reserves at the top, bank deposits next, stablecoins and money funds below. Every layer is changing, but the hierarchy itself may not. The real question is **which layer's share is shifting, and whose balance sheet carries the risk as it shifts.**

**Signposts:** whether stablecoin growth holds up during a bitcoin bear market; whether rules allow disguised yield through any channel; actual usage of big-bank deposit tokens; and how Treasury's bill-heavy issuance (bills were about 22.8% of marketable debt at the end of August 2026) interacts with stablecoin reserve demand.

### ⑤ Will AI push interest rates up or down?

**The question.** Stage 19.1 introduced the neutral rate, r*: the real rate at which the economy neither overheats nor stalls. Stage 19.5 covered the deflationary force of cheap intelligence. The two pull in opposite directions, and their net effect sets Idea ①, the price of time, for the next decade.

**The case for higher rates:**
- **An investment boom.** Alphabet, Amazon, Meta and Microsoft together are guiding to about $720 to $745 billion of capex in 2026, roughly 75% more than in 2025. More and more of it is borrowed: record long-dated corporate bonds, special-purpose vehicles and private credit (Stage 19.2). More borrowers mean a higher price of money.
- **Competing with governments for long-term funding.** In the global long-bond selloff of September 2026, record long-dated corporate issuance for AI data centers was one of the pressures the press cited. The 30-year Treasury yielded about 5.49% on September 25, 2026, and the New York Fed's ACM model put the 10-year term premium at about +0.73% (September 24).
- **Productivity really is faster.** US nonfarm productivity grew about 2.1% a year from late 2019 to mid-2026, versus about 1.5% in 2007 to 2019. Higher growth potential usually means a higher r*.

**The case for lower rates:**
- **Cheap intelligence is deflationary.** If AI sharply lowers the cost of services, price pressure eases, and over time central banks can hold rates lower.
- **Concentrated profits and excess saving.** If AI's gains flow mainly to capital rather than labor, high-saving households and firms receive more income, and a saving glut pushes rates down. That is a classic explanation for the low rates of the 2010s.
- **The productivity data can't yet be credited to AI.** New business formation, post-pandemic reallocation, immigration and labor-mix effects explain part of it, and markets priced an AI boom **before** the data clearly showed one.

**Why this question feeds all the others:** interest rates anchor every asset (Stage 2.4). A perpetual preferred paying $10 a year is worth $100 when investors require 10%; if long rates rise and they require 12%, it is worth about $83.30 (the perpetuity math of Stage 18.1). The standard 30-year 5% bond is worth about $92.80 at a 5.49% yield and about $80.40 one point higher (modified duration about 15.5, Stage 4.4). So the single answer **"AI means higher rates"** would simultaneously cut the price of bitcoin credit, raise DATs' cost of capital, and make the spread between Digital Credit and Treasuries harder to sustain.

<table><tr><th>Question</th><th>Main idea</th><th>Strongest yes</th><th>Strongest no</th><th>First data to watch</th></tr><tr><td>① BTC credit</td><td>② ④</td><td>Transparent coverage; paid through a bear market</td><td>Fragile model assumptions; coverage can be diluted</td><td>Spreads without a bull market</td></tr><tr><td>② DAT premiums</td><td>④</td><td>Ability to sell volatility and yield</td><td>Competition; the closed-end fund precedent</td><td>Through-cycle median mNAV</td></tr><tr><td>③ Tokenized collateral</td><td>③</td><td>DTCC, Nasdaq and the SEC are moving</td><td>Old pipes are good enough; law untested</td><td>Clearinghouse acceptance</td></tr><tr><td>④ Stablecoins vs banks</td><td>② ③</td><td>Payments and AI agents</td><td>No yield allowed; deposit tokens</td><td>Where deposits go</td></tr><tr><td>⑤ AI and rates</td><td>①</td><td>Investment demand and long-bond supply</td><td>Deflation and excess saving</td><td>Productivity and term premium</td></tr></table>

The five questions are not independent. Question ⑤ sets the discount rate, which shapes question ②'s premium and question ①'s spread. Questions ③ and ④ decide the future plumbing, and the plumbing decides whether new credit like question ①'s can be held by many more investors. **Join them into one picture and you have the continuation of Stage 20.1's line into the future.** The next lesson (Stage ∞.2) asks what role you could play in that picture; Stage ∞.3 has you put these questions into a full analytical report of your own.
`,

  demo: "open-questions",

  analogy: `
Think of the five questions as the **seasonal calls a weather forecaster has to make**: will this winter be unusually cold? Will the rainy season come early or late?

A poor forecaster says "I think it'll be cold" and waits to be proved right or wrong. A good one says: "The models currently give a 60% chance of a colder-than-normal winter. If the Arctic Oscillation turns negative in October, I'll raise that to 75%; if sea temperatures stay high, I'll cut it to 40%." They don't pretend to know the future, but they **state their reasoning and exactly what would change their mind**.

In this picture:
- The mechanisms of the first twenty stages are **atmospheric physics**. The relationships among pressure, temperature and humidity don't change with today's news.
- The five questions in this lesson are **seasonal forecasts**. The physics is settled, but starting conditions and interactions leave the outcome genuinely uncertain.
- The signposts under each question are **the weather stations to watch**: spreads, median mNAV, clearinghouse decisions, deposit flows, the term premium.

The two most dangerous people are the one who reads a single station and announces "it will definitely be a warm winter," and the one who ignores the weather because forecasts are uncertain. Be the third kind: **leave the house with a probability, carry an umbrella, and keep watching the sky as you walk.**
`,

  misconceptions: [
    "**\"The model says bitcoin credit needs only a 0.6% spread, so a 12% preferred is free money.\"** The required spread is extremely sensitive to volatility, drawdown shape and the assumption that bad things happen together. For the same 4x rating, raising volatility from 40% to 60% lifts the required spread from about 1.1% to about 5%. The gap between model and market is itself the open question, not a free lunch.",
    "**\"An mNAV premium proves the market values the DAT, so it will always be there.\"** The premium is both the flywheel's fuel and a product of reflexivity. In September 2026, 16 of the 20 largest DATs traded below 1x, and closed-end vehicles have historically traded at discounts more often than premiums. Whether a premium lasts depends on the company doing what an ETF cannot, which is exactly what the data must test.",
    "**\"Tokenization will soon replace today's clearing and settlement system.\"** As of mid-2026, tokenized Treasuries were about 0.2% of the bill market. DTCC and Nasdaq are moving, but core institutions will stake key margin on tokens only after legal ownership, bankruptcy treatment and interoperability survive a real crisis. The accurate phrase is \"being connected\", not \"about to replace\".",
    "**\"Stablecoin growth is a brand-new Treasury buyer that costs nobody anything.\"** The money issuers use to buy bills comes from assets users sold, often bank deposits. That is the Kansas City Fed's point: stablecoins add Treasury demand only by reducing demand for other assets. Fewer deposits can also mean less bank lending capacity.",
    "**\"Admitting a question is open means having no view.\"** The opposite. Good analysts give open questions a probability and write down in advance what data would change it. Having no view is irresponsible; a view with no signposts is a bet. A probability with signposts is the way of thinking this course wants to leave you with.",
  ],

  quiz: [
    {
      q: "Strategy reports a BTC Credit (model-required spread) of about 59bp for STRC, while STRC pays about 12% and the 10-year Treasury yields about 5.2%. Which reading best matches this lesson's approach?",
      options: [
        "The market is plainly wrong; STRC's true risk is worth only 0.6%",
        "The model is plainly wrong; bitcoin credit can never become an asset class",
        "The gap is an open question: either the model misses tail and correlation risk, or the market is charging a new-asset-class premium, and signposts such as spreads, ratings and bear-market performance will test which",
        "Spreads have nothing to do with Treasury yields, so there is nothing to compare",
      ],
      answer: 2,
      explain: "The lesson doesn't pick a side for you. The **tenfold gap** has two serious explanations that imply different futures. Your job is to write down which signposts (spreads narrowing without a rally, a rating method, more issuers, paying through a bear market) would move you which way.",
    },
    {
      q: "A DAT trades at an mNAV of 2.0 and can grow bitcoin per share 20% a year through premium issuance. Using \\(\\dfrac{\\ln(m)}{\\ln(1+g)}\\), roughly how many years does it take to earn back the premium?",
      options: ["About 1 year", "About 3.8 years", "About 10 years", "Never"],
      answer: 1,
      explain: "\\(\\dfrac{\\ln(2)}{\\ln(1.2)} \\approx \\dfrac{0.693}{0.182} \\approx\\) **3.8 years**. Note that \\(g\\) itself depends on the premium: the closer mNAV gets to 1, the less accretive issuance becomes and the lower \\(g\\) falls. That's the reflexive loop.",
    },
    {
      q: "What is the Kansas City Fed's core argument about stablecoins and Treasury demand?",
      options: [
        "Stablecoins raise Treasury demand only by reducing demand for other assets, such as bank deposits",
        "Stablecoins will double Treasury demand at no cost to anyone",
        "Stablecoins have nothing to do with the Treasury market",
        "Stablecoins buy only long-term Treasuries",
      ],
      answer: 0,
      explain: "Money doesn't appear from nowhere. A user swaps **bank deposits** for a stablecoin and the issuer buys bills. Treasuries gain a buyer and a bank loses a deposit: that is whose balance sheet changes in the new plumbing of Stage 14.5.",
    },
    {
      q: "If AI pushes long rates higher and the required yield on a $100, 10%-dividend perpetual preferred rises from 10% to 12%, what is its approximate price using the perpetuity formula?",
      options: ["About $120", "About $100", "About $90.90", "About $83.30"],
      answer: 3,
      explain: "\\(\\text{perpetuity price} = \\dfrac{\\text{annual dividend}}{\\text{required yield}} = \\dfrac{10}{0.12} \\approx\\) **$83.30**. That is how the AI-and-rates question flows through to the price of bitcoin credit (Stage 18.1).",
    },
    {
      q: "Which of these is a signpost this lesson lists for tokenized collateral?",
      options: [
        "Whether a particular token's price doubles",
        "Whether major clearinghouses accept tokenized Treasuries as margin",
        "How much social-media buzz there is",
        "Bitcoin miners' revenue",
      ],
      answer: 1,
      explain: "The mark of tokenized collateral entering the **core plumbing** is core institutions (clearinghouses, DTCC, interbank repo) actually using it as margin, not price or hype. As of mid-2026 it was only about 0.2% of the bill market.",
    },
  ],

  further: [
    { label: "Strategy investor site and credit dashboard (official source for BTC Rating, BTC Credit and mNAV definitions)", url: "https://www.strategy.com" },
    { label: "MSCI: Consultation on Eligibility of Non-Operating Companies (August 2026)", url: "https://www.msci.com/downloads/documents/indexes/consultations/equity/Consultation%20on%20Eligibility%20of%20Non-Operating%20Companies%20for%20the%20%20MSCI%20Global%20Investable%20Market%20Indexes.pdf" },
    { label: "Kansas City Fed: Stablecoins could increase Treasury demand, but only by reducing demand for other assets", url: "https://www.kansascityfed.org/research/economic-bulletin/stablecoins-could-increase-treasury-demand-but-only-by-reducing-demand-for-other-assets/" },
    { label: "GENIUS Act full text (S.1582, Congress.gov)", url: "https://www.congress.gov/bill/119th-congress/senate-bill/1582/text" },
    { label: "New York Fed: ACM term premium data", url: "https://www.newyorkfed.org/research/data_indicators/term-premia-tabs" },
  ],
};
