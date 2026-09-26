export default {
  id: "rate-shock-cases",
  stage: 10,
  order: 3,
  title: "Rate-Shock Trilogy: March 2020, the 2022 UK Gilt Crisis & SVB 2023",
  difficulty: "systems",
  prereqs: ["duration-convexity", "long-bond-30y", "swaps-hedging"],

  oneLiner:
    "The enemy in 2008 was **credit risk** — borrowers who couldn't pay. In the three crises of 2020–2023 the enemy was **interest-rate risk**, and it struck the very assets considered safest: US Treasuries, UK gilts, agency mortgage bonds. In March 2020 the deepest government bond market on earth seized up in a scramble for cash; in September 2022 UK 30-year gilt yields jumped more than a full percentage point in days and set off a pension-fund collateral spiral; in March 2023 Silicon Valley Bank was run to death in two days over losses on long bonds. All three share one formula: **duration × leverage × a moment when you need cash = crisis.**",

  intuition: `
Stage 4.4 showed that the longer a bond, the more sensitive it is to rates. The standard 30-year Treasury at about 5% has a modified duration of about 15.5 — a one-point rise in yield knocks roughly 14% off its price. That sounds like a mere “paper number”: hold to maturity and you still get your face value back.

The catch is that **holding to maturity is a luxury.** It requires that you never need to sell the bond for cash along the way. Once there is leverage behind you, or liabilities that can be withdrawn on demand, or hedging contracts that demand margin every day, the paper loss will at some point be forced into a real one. All three cases in this lesson are about the same combination: **a safe asset + a big move in rates + a sudden need for cash.**

**March 2020: even Treasuries wouldn't sell.** COVID made the whole world want cash at once. Foreign central banks, mutual funds and hedge funds all sold US Treasuries — including hedge funds running highly levered “basis trades” (Stage 7.4). In a crisis Treasuries are supposed to rally and yields to fall; yet between March 9 and March 18 the 10-year yield *rose* from about 0.5% to about 1.2%. The safest, deepest market briefly couldn't find enough buyers. The Fed bought more than $1 trillion of Treasuries within weeks to restore order.

**September 2022: a UK pension hedge became a bomb.** Britain's defined-benefit pension funds widely use liability-driven investment (LDI): levered positions in gilts and interest-rate swaps designed to match pensions they must pay decades from now. On September 23 a new government announced an unfunded package of tax cuts, the “mini-budget,” and 30-year gilt yields shot from about 3.7% to above 5% within days. Here is the twist: higher yields actually *shrank* the present value of the pensions' liabilities — their solvency improved. But the levered hedges demanded **cash collateral immediately.** Funds that couldn't find the cash sold gilts, which pushed yields higher still — a spiral. On September 28 the Bank of England announced temporary purchases of long-dated gilts, which broke it.

**March 2023: Silicon Valley Bank, a bank sunk by duration.** The 2020–21 tech funding boom roughly tripled SVB's deposits in a couple of years. It put much of that money into long Treasuries and agency mortgage bonds yielding just 1–2%. Then the Fed took rates from near zero to above 4.5% in little more than a year, and those bonds fell hard in market value. By the end of 2022 the unrealized loss in its held-to-maturity book alone was about $15 billion, roughly equal to all its shareholders' equity (about $16 billion). On March 8 it announced it had sold bonds at a loss and needed to raise capital. On March 9 depositors — mostly tech startups who all knew each other and held far more than the insured limit — asked for about $42 billion in a single day. On March 10 the bank was closed.

This lesson rests on **Idea ①, the price of time (interest rates)** — when rates move, every asset is repriced, Treasuries included — and **Idea ③, liquidity and trust (the plumbing)** — a falling price is not fatal on its own; needing cash at the wrong moment is. All three cases map onto the skeleton of Stage 10.1: leverage + maturity mismatch + some form of opacity (dealer balance-sheet constraints in 2020, the scale of LDI leverage in 2022, accounting that hid the losses in 2023). They also connect directly to the rising 30-year yield of Stage 4.5 and to Stage 18.1 on how rising long-term yields hit perpetual preferred stock.

**In this lesson we break it into five pieces:**

- **① The common enemy: duration × leverage × the moment you need cash**
- **② March 2020: when the safest market breaks**
- **③ September 2022: the UK pension LDI spiral**
- **④ March 2023: Silicon Valley Bank, sunk by duration**
- **⑤ Lessons from all three, and the DAT angle**
`,

  mechanics: `
### ① The common enemy: duration × leverage × the moment you need cash

First, a refresher on the Stage 4.4 toolkit. Modified duration D says that a yield change Δy moves the price by roughly −D × Δy. Three benchmarks computed exactly with the course engine:

<table>
<tr><th>Bond</th><th>Yield change</th><th>Price change</th><th>Modified duration (approx.)</th></tr>
<tr><td>10-year, 1.5% coupon (bought at par)</td><td>1.5% → 4.0%</td><td>100 → about 79.6 (−20%)</td><td>about 9.3</td></tr>
<tr><td>Standard 30-year, 5% coupon</td><td>5% → 6%</td><td>100 → about 86.2 (−14%)</td><td>about 15.5</td></tr>
<tr><td>30-year low-coupon gilt (1.25% coupon)</td><td>3.7% → 5.0%</td><td>about 55.8 → about 42.0 (−25%)</td><td>about 22.5</td></tr>
</table>

Duration only tells you the paper loss. To become a crisis, it must be multiplied by two more factors:

$$
Crisis intensity ≈ duration × rate move × leverage × share you are forced to sell
$$

- **Leverage** turns a price loss into a capital loss. For a bank with 8% capital and half its assets in 10-year bonds, a 2.5-point rise in yields costs about 20% on the bonds — roughly 10% of total assets, more than all its capital.
- **Forced selling** turns a paper loss into a real one. If you never have to sell, an unrealized loss is just interest you could have earned but didn't; once you are forced to sell, the loss is booked and capital shrinks immediately.

Three mechanisms force the sale, and they line up neatly with the three cases: **funding that matures or gets a bigger haircut (repo and the basis trade in 2020), margin calls on derivatives (LDI in 2022), and depositors withdrawing (SVB in 2023).**

### ② March 2020: when the safest market breaks

The US Treasury market is the foundation of global finance — the risk-free rate of Stage 2.4 is anchored there — and it trades hundreds of billions of dollars a day. Yet in mid-March 2020 it malfunctioned in a way almost nobody had seen:

- **Everyone wanted cash at once.** Foreign official institutions sold Treasuries for dollars, mutual funds sold them to meet redemptions, money funds faced outflows, companies drew down their credit lines. **At such a moment Treasuries are not a haven; they are the easiest thing to sell** — so they get sold first.
- **The basis trade unwound.** Hedge funds had been buying cash Treasuries and selling Treasury futures to collect the small gap between them, financing the bonds in repo at leverage that often ran to dozens of times (Stage 7.4). As the cash–futures spread swung wildly and repo got more expensive, these positions were closed in a rush, dumping yet more cash bonds on the market.
- **Dealers couldn't absorb it.** Big dealer banks are supposed to be buyers of last resort, but post-2008 capital rules such as the supplementary leverage ratio (SLR) limited their balance-sheet room, and holding Treasuries consumed capital.

The result: the 10-year yield rose from about 0.5% on March 9 to about 1.2% on March 18, and bid–ask spreads on older (off-the-run) bonds blew out. The Fed responded by becoming market maker of last resort. On March 15 it cut rates to 0–0.25% and announced $500 billion of Treasury and $200 billion of mortgage-bond purchases; on March 23 it switched to buying **“in the amounts needed,”** with no cap. It added repo operations, a FIMA repo facility for foreign central banks, and a temporary exclusion of Treasuries and reserves from the SLR. Within weeks it had bought more than $1 trillion of Treasuries.

**The new-era angle:** in the same days bitcoin fell by roughly half on March 12–13, and on Ethereum MakerDAO's liquidation auctions, clogged by network congestion, cleared some collateral at *zero* bids, leaving millions of dollars of bad debt. **On-chain margin calls fail in a liquidity drought just as off-chain ones do** (Stage 13.4, Stage 13.6).

### ③ September 2022: the UK pension LDI spiral

A UK defined-benefit pension owes payments decades into the future, so its liabilities have very long duration. To make assets rise and fall with liabilities, funds use **LDI (liability-driven investment)**: through repo and interest-rate swaps they get several pounds of long-gilt exposure for each pound of cash. When yields fall, liabilities rise in value and the hedge rises too — a perfect match. The price: **when yields rise, the hedge loses money and must be topped up with cash collateral immediately.**

<figure><svg viewBox="0 0 640 250" xmlns="http://www.w3.org/2000/svg" font-family="Inter, system-ui, sans-serif"><defs><marker id="rsc-ar-en" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="var(--muted)"/></marker></defs><text x="320" y="20" text-anchor="middle" font-size="13" font-weight="700" fill="var(--ink)">The LDI spiral, September 2022</text><rect x="20" y="40" width="140" height="56" rx="8" fill="var(--red-soft)" stroke="var(--red)"/><text x="90" y="63" text-anchor="middle" font-size="12" font-weight="600" fill="var(--ink)">Mini-budget (9/23)</text><text x="90" y="80" text-anchor="middle" font-size="10" fill="var(--muted)">Unfunded tax cuts</text><rect x="245" y="40" width="150" height="56" rx="8" fill="var(--surface-2)" stroke="var(--line)"/><text x="320" y="63" text-anchor="middle" font-size="12" font-weight="600" fill="var(--ink)">30-yr yield spikes</text><text x="320" y="80" text-anchor="middle" font-size="10" fill="var(--muted)">~3.7% → above 5%</text><rect x="475" y="40" width="150" height="56" rx="8" fill="var(--surface-2)" stroke="var(--line)"/><text x="550" y="63" text-anchor="middle" font-size="12" font-weight="600" fill="var(--ink)">Levered hedge loses</text><text x="550" y="80" text-anchor="middle" font-size="10" fill="var(--muted)">Cash collateral called</text><rect x="475" y="160" width="150" height="56" rx="8" fill="var(--surface-2)" stroke="var(--line)"/><text x="550" y="183" text-anchor="middle" font-size="12" font-weight="600" fill="var(--ink)">Not enough cash</text><text x="550" y="200" text-anchor="middle" font-size="10" fill="var(--muted)">Sell long gilts</text><rect x="245" y="160" width="150" height="56" rx="8" fill="var(--surface-2)" stroke="var(--line)"/><text x="320" y="183" text-anchor="middle" font-size="12" font-weight="600" fill="var(--ink)">Selling hits prices</text><text x="320" y="200" text-anchor="middle" font-size="10" fill="var(--muted)">Yields rise again</text><rect x="20" y="160" width="140" height="56" rx="8" fill="var(--green-soft)" stroke="var(--green)"/><text x="90" y="183" text-anchor="middle" font-size="12" font-weight="600" fill="var(--ink)">Bank of England (9/28)</text><text x="90" y="200" text-anchor="middle" font-size="10" fill="var(--muted)">Temporary gilt buying</text><line x1="162" y1="68" x2="241" y2="68" stroke="var(--muted)" stroke-width="1.6" marker-end="url(#rsc-ar-en)"/><line x1="397" y1="68" x2="471" y2="68" stroke="var(--muted)" stroke-width="1.6" marker-end="url(#rsc-ar-en)"/><line x1="550" y1="98" x2="550" y2="156" stroke="var(--muted)" stroke-width="1.6" marker-end="url(#rsc-ar-en)"/><line x1="473" y1="188" x2="399" y2="188" stroke="var(--muted)" stroke-width="1.6" marker-end="url(#rsc-ar-en)"/><line x1="320" y1="158" x2="320" y2="100" stroke="var(--red)" stroke-width="1.8" marker-end="url(#rsc-ar-en)"/><text x="330" y="134" font-size="10.5" font-weight="700" fill="var(--red)">Spiral</text><line x1="162" y1="188" x2="241" y2="188" stroke="var(--green)" stroke-width="2" stroke-dasharray="5 3" marker-end="url(#rsc-ar-en)"/><text x="200" y="178" text-anchor="middle" font-size="10" fill="var(--green)">Breaks it</text><text x="320" y="240" text-anchor="middle" font-size="10.5" fill="var(--muted)">The paradox: higher yields shrank pension liabilities and improved solvency — the crisis was all about finding cash</text></svg><figcaption>LDI's risk was not solvency but liquidity: the hedge was economically right, yet it demanded cash at the worst possible moment.</figcaption></figure>

The timeline:

- **September 23:** Chancellor Kwasi Kwarteng announced the “mini-budget,” including about £45 billion of tax cuts with no offsetting funding. Sterling and gilts plunged together.
- **September 26–27:** the 30-year gilt yield rose by more than a percentage point in a few trading days. Industry practice had sized many LDI funds' collateral buffers to withstand roughly a 1 to 1.5 point rise; the buffers were breached, funds issued urgent cash calls to their pension clients, and those who couldn't pay had positions cut by selling gilts.
- **September 28:** the Bank of England announced temporary purchases of long-dated gilts over 13 working days (up to £5 billion a day) and postponed its planned sales of gilts. It actually bought about £19.3 billion — **far below the ceiling; the promise to buy was itself enough to steady the market.**
- **October:** Kwarteng was dismissed and Liz Truss announced her resignation as prime minister on October 20; the new government reversed most of the tax cuts.

The deep lesson of this case: **a hedge that is economically correct can be lethal in liquidity terms.** The pensions were not insolvent; their cash was simply locked in the wrong place at the wrong time.

### ④ March 2023: Silicon Valley Bank, sunk by duration

<figure><svg viewBox="0 0 640 270" xmlns="http://www.w3.org/2000/svg" font-family="Inter, system-ui, sans-serif"><text x="320" y="20" text-anchor="middle" font-size="13" font-weight="700" fill="var(--ink)">An SVB-style bank before and after a 2.5-point rate rise (per $100 of assets)</text><text x="150" y="44" text-anchor="middle" font-size="11" font-weight="600" fill="var(--muted)">Before hikes (book)</text><rect x="60" y="54" width="85" height="10" fill="var(--green-soft)" stroke="var(--green)"/><text x="102" y="62" text-anchor="middle" font-size="8.5" fill="var(--ink)">Cash 5</text><rect x="60" y="64" width="85" height="80" fill="var(--surface-2)" stroke="var(--line)"/><text x="102" y="108" text-anchor="middle" font-size="11" fill="var(--ink)">Loans 40</text><rect x="60" y="144" width="85" height="110" fill="var(--blue-soft)" stroke="var(--blue)"/><text x="102" y="196" text-anchor="middle" font-size="11" fill="var(--ink)">10-yr bonds 55</text><text x="102" y="211" text-anchor="middle" font-size="9.5" fill="var(--muted)">Yield 1.5%</text><rect x="155" y="54" width="85" height="184" fill="var(--red-soft)" stroke="var(--red)"/><text x="197" y="140" text-anchor="middle" font-size="11" fill="var(--ink)">Deposits 92</text><text x="197" y="156" text-anchor="middle" font-size="9.5" fill="var(--muted)">~90% uninsured</text><rect x="155" y="238" width="85" height="16" fill="var(--orange-soft)" stroke="var(--orange)"/><text x="197" y="250" text-anchor="middle" font-size="9.5" fill="var(--ink)">Capital 8</text><text x="470" y="44" text-anchor="middle" font-size="11" font-weight="600" fill="var(--muted)">After hikes (market value)</text><rect x="380" y="54" width="85" height="10" fill="var(--green-soft)" stroke="var(--green)"/><text x="422" y="62" text-anchor="middle" font-size="8.5" fill="var(--ink)">Cash 5</text><rect x="380" y="64" width="85" height="80" fill="var(--surface-2)" stroke="var(--line)"/><text x="422" y="108" text-anchor="middle" font-size="11" fill="var(--ink)">Loans 40</text><rect x="380" y="144" width="85" height="88" fill="var(--blue-soft)" stroke="var(--blue)"/><text x="422" y="186" text-anchor="middle" font-size="11" fill="var(--ink)">Bonds ~43.8</text><text x="422" y="201" text-anchor="middle" font-size="9.5" fill="var(--red)">Down ~20%</text><rect x="380" y="232" width="85" height="22" fill="none" stroke="var(--red)" stroke-dasharray="3 3"/><text x="422" y="247" text-anchor="middle" font-size="9" fill="var(--red)">Unrealized loss ~11.2</text><rect x="475" y="54" width="85" height="184" fill="var(--red-soft)" stroke="var(--red)"/><text x="517" y="140" text-anchor="middle" font-size="11" fill="var(--ink)">Deposits 92</text><text x="517" y="156" text-anchor="middle" font-size="9.5" fill="var(--muted)">Not a cent less</text><rect x="475" y="238" width="85" height="16" fill="none" stroke="var(--red)" stroke-width="2"/><text x="517" y="250" text-anchor="middle" font-size="9.5" font-weight="700" fill="var(--red)">Capital ~ −3.2</text><line x1="262" y1="150" x2="358" y2="150" stroke="var(--muted)" stroke-width="1.6"/><text x="310" y="140" text-anchor="middle" font-size="10" fill="var(--muted)">Rates +2.5 points</text><text x="310" y="168" text-anchor="middle" font-size="10" fill="var(--muted)">Liabilities fixed, assets shrink</text></svg><figcaption>Computed with the course engine: a 10-year bond with a 1.5% coupon is worth about 79.6 when yields reach 4%. The $55 of bonds lose about $11.2, more than the $8 of capital — but held to maturity, none of it shows on the balance sheet.</figcaption></figure>

SVB is the seesaw from Stage 4.2 turned into a bank:

- **Deposits boomed and went into long bonds.** From the end of 2019 to the end of 2021 its deposits grew from about $62 billion to about $189 billion. Loan demand couldn't keep up, so it bought long Treasuries and agency mortgage bonds yielding roughly 1.5–2%.
- **Accounting hid the losses.** Most of the bonds sat in the **held-to-maturity (HTM)** book at amortized cost — however far market prices fell, the balance sheet didn't show it. Losses on the available-for-sale (AFS) book did flow into “other comprehensive income,” but under the rules of the time a bank of SVB's size could opt to exclude them from regulatory capital. At the end of 2022 the HTM unrealized loss was about $15 billion, comparable to shareholders' equity of about $16 billion.
- **The liabilities were built to run.** Depositors were concentrated among tech startups and venture funds, roughly nine-tenths of deposits exceeded the $250,000 insurance limit, and the depositors knew each other and shared the same group chats.
- **The trigger: selling bonds to plug the hole.** On March 8 the bank announced it had sold about $21 billion of AFS bonds at a loss of about $1.8 billion and planned to raise $2.25 billion of capital. What the market heard was: “the losses are real, and there isn't enough capital.” On March 9 the stock fell about 60% and depositors asked to withdraw about $42 billion in one day. On March 10 California regulators closed the bank and the FDIC took over — according to the regulators' own review, about $100 billion more in withdrawal requests were lined up for that day.

The response again came from the Stage 10.1 toolkit. On March 12 regulators invoked the “systemic risk exception” to protect **all** deposits at SVB and at Signature Bank, closed the same weekend, including amounts above the insured limit. The Fed launched the **Bank Term Funding Program (BTFP),** letting banks borrow for up to a year against Treasuries and agency debt **valued at par** — removing the “sell bonds at a loss” step entirely. Contagion didn't stop at once, though: Credit Suisse was taken over by UBS on March 19 (with about CHF 16 billion of AT1 bonds written down to zero), and First Republic was seized and sold to JPMorgan Chase on May 1.

**The new-era angle:** the issuer of the USDC stablecoin had about $3.3 billion of reserves at SVB, and when that news broke USDC briefly traded down to about 87 cents (Stage 10.1, Stage 13.2). The same week Silvergate, a bank serving the crypto industry, announced it would wind down voluntarily, and Signature was closed — **the crypto industry's fiat on-ramps narrowed within days.**

### ⑤ Lessons from all three, and the DAT angle

Line the three cases up:

<table>
<tr><th></th><th>March 2020</th><th>September 2022 (UK)</th><th>March 2023 (SVB)</th></tr>
<tr><td>The “safe” asset</td><td>US Treasuries</td><td>Long UK gilts</td><td>Treasuries and agency mortgage bonds</td></tr>
<tr><td>The shock</td><td>Global dash for cash in a pandemic</td><td>A fiscal shock lifts long yields</td><td>About 4.5 points of hikes in just over a year</td></tr>
<tr><td>Who had to sell</td><td>Basis traders, foreign official holders, funds</td><td>LDI funds and pensions</td><td>SVB (under a deposit run)</td></tr>
<tr><td>Why they had to</td><td>Repo funding, redemptions</td><td>Collateral calls on derivatives and repo</td><td>A run on uninsured deposits</td></tr>
<tr><td>Who stepped in</td><td>The Fed: uncapped Treasury buying</td><td>Bank of England: temporary long-gilt buying</td><td>The Fed's BTFP plus full deposit protection</td></tr>
</table>

Three shared lessons:

1. **“No credit risk” is not “no risk.”** Treasuries don't default, but their prices are highly sensitive to rates; as Stage 2.4 put it, what the “risk-free rate” hides is exactly duration risk.
2. **Liquidity risk often travels disguised as rate risk.** In none of the three cases was an institution truly unable to pay in the hold-to-maturity sense; all of them fell at the words “must sell now.”
3. **Central banks have moved from lender of last resort to buyer of last resort.** That raises a long-run question: if markets believe the central bank will always step into the long end, is the pricing of long-term rate risk distorted? That is part of the fiscal-dominance debate in Stage 9.4.

**What this means for DATs.** Each lesson carries straight into the analysis of Stages 15–18:

- **A perpetual preferred is the longest-duration security there is.** Per Stage 4.4, a perpetual's duration is roughly 1 divided by its yield: a perpetual preferred yielding 10% has duration of about 10, and if the market's required yield rises from 10% to 12%, its price falls by about 1 − 10/12 ≈ 17%. **Rising long Treasury yields push perpetual preferred prices down directly** (Stage 18.1). That is the thread between “the 30-year yield breaks 5%” and “a bitcoin-backed preferred yielding about 10%,” which Stage 20.1 ties together in full.
- **Engineering the duration away.** STRC, covered in Stage 17.4, uses a monthly-adjusted variable dividend rate aimed at keeping its price near $100 — in effect the opposite of what SVB did: **don't leave the rate risk with the holder.**
- **No forced-sale structure.** A DAT's liabilities include no demand deposits and no margin that is called as market values move — a design response to the lessons of LDI and SVB (part ⑤ of Stage 10.1). A stress test still has to ask where dividends come from and how long the company can last if capital markets shut (Stage 18.2).
`,

  demo: "rate-shock-cases",

  analogy: `
Imagine you lock in 1.5% a year with a **ten-year certificate of deposit.** For you it's a sound contract: leave it for ten years and every dollar of principal and interest comes back.

A year later the bank starts offering new customers 4%. Your CD hasn't gotten worse — hold it for ten years and you still get your principal and interest. But if you want to sell it to someone **today,** who will pay full price for a certificate that pays only 1.5%? The buyer offers something like eighty cents on the dollar, because they could simply open a new account at 4%. **Between “hold to maturity” and “sell today” sits the discount created by the rise in rates.**

As long as nobody forces you to sell now, that discount is just a number on paper. The three cases are three different ways of being forced to sell now:

- **March 2020:** the person who lent you the money to buy the CD (a repo lender) suddenly wants it back, so you sell — on the very day everyone else is selling too.
- **September 2022:** you've signed a “rate hedge” contract under which every rise in rates requires you to post cash up front; rates jump overnight, you can't find the cash, and you have to dump your CDs at fire-sale prices.
- **March 2023 (SVB):** the friends who left their money with you (depositors) all say at once, “I need it back — now.”

**The CD itself never went bad; what went bad was “you must sell now.”** That is the whole secret of how rate risk turns into a liquidity crisis.
`,

  misconceptions: [
    "**“Treasuries can't default, so holding them can't hurt you.”** — Treasuries carry no credit risk but plenty of rate risk: a low-coupon 10-year falls about 20% when yields rise 2.5 points, and a low-coupon 30-year gilt about 25% when yields rise 1.3 points. For a levered institution that may have to sell at any moment, that is lethal — SVB was holding precisely the “safest” assets.",
    "**“The UK pension crisis shows the pensions were nearly bankrupt.”** — Quite the opposite: higher yields cut the present value of pension liabilities, and many schemes' funding ratios actually improved. The crisis was purely about liquidity: levered hedges demanded immediate cash collateral that wasn't at hand. It is the textbook case of solvency fine, liquidity broken.",
    "**“Unrealized losses on held-to-maturity bonds are an accounting game and don't matter.”** — If you never have to sell, you can indeed wait for maturity. But the loss is economically real (you've locked in a below-market yield), and once the liabilities run, the bonds must be sold and the paper loss becomes a real one. SVB's losses were disclosed in the footnotes — once the market read them seriously, the run began.",
    "**“Treasury yields rose in March 2020 because investors stopped trusting the US government.”** — The selling came from a need for cash, not fear of default: foreign official holders, funds and levered traders were liquidating the easiest thing to sell, and dealers constrained by capital rules couldn't absorb it. The market recovered quickly once the Fed bought on a massive scale — a plumbing problem, not a credit problem.",
    "**“Rising rates only affect bonds; they have nothing to do with bitcoin or DATs.”** — Interest rates are the discount rate for every asset (Idea ①). Rising long yields push down perpetual preferred prices (duration ≈ 1/yield), raise the cost of new DAT preferred issuance, and often come with tighter liquidity for risk assets; in March 2023 the USDC stablecoin even briefly lost its peg because of the banking crisis.",
  ],

  quiz: [
    {
      q: "A 10-year bond with a 1.5% coupon, bought at par, sees market yields rise to 4%. Using duration (about 9.3) and an exact calculation, roughly how much does its price fall?",
      options: [
        "About 2.5%, because yields rose only 2.5 points",
        "About 20% — the exact price is about 79.6",
        "About 50%",
        "Nothing, because it still repays face value at maturity",
      ],
      answer: 1,
      explain: "Approximation: −9.3 × 2.5% ≈ −23%; exact (including convexity): about −20%, a price near 79.6. It does repay par at maturity, but **if you are forced to sell before then,** you sell at 79.6 — exactly SVB's position.",
    },
    {
      q: "What was the essence of the UK LDI crisis in September 2022?",
      options: [
        "The pension funds were deeply insolvent",
        "The UK government defaulted on its gilts",
        "Soaring yields forced levered hedges to post cash collateral immediately; selling gilts to raise it drove yields higher — a liquidity spiral",
        "The pensions had put their money into crypto",
      ],
      answer: 2,
      explain: "Higher yields actually shrank pension liabilities. The problem was **collateral calls on levered hedges**: short of cash, funds sold gilts, which pushed yields up further. The Bank of England's temporary long-gilt purchases broke the spiral.",
    },
    {
      q: "Which of these was **not** one of SVB's key vulnerabilities in March 2023?",
      options: [
        "Large deposits invested in low-yielding long bonds that fell sharply as rates rose",
        "About nine-tenths of deposits above the insured limit, from a concentrated and tightly connected client base",
        "Held-to-maturity accounting that kept the losses off the face of the balance sheet",
        "Heavy lending to subprime mortgage borrowers",
      ],
      answer: 3,
      explain: "SVB's problem was **not credit risk**: its bonds were mostly Treasuries and agency mortgage bonds that would almost certainly never default. It fell to rate risk + flighty liabilities + losses hidden by accounting — a sharp contrast with 2008.",
    },
    {
      q: "What was the crucial design feature of the Fed's Bank Term Funding Program (BTFP) in March 2023?",
      options: [
        "It accepted Treasuries and similar collateral at par rather than market value, so banks didn't have to sell at a loss",
        "It bought every bank's stock outright",
        "It cut interest rates to zero",
        "It guaranteed all cryptocurrencies",
      ],
      answer: 0,
      explain: "Lending at par removes the “fire sale” step from the Stage 10.1 loop — a bold twist on Bagehot's rule (lending against normal value rather than market price), and one that sparked a debate about moral hazard.",
    },
    {
      q: "A perpetual preferred yields 10%. If the market's required yield rises to 12% (dividend unchanged), roughly how does its price change?",
      options: [
        "About +20%",
        "About −2%",
        "No change, because a perpetual preferred never matures",
        "About −17%, because a perpetual's price ≈ dividend / yield",
      ],
      answer: 3,
      explain: "The price goes from dividend/10% to dividend/12%, a ratio of 10/12 ≈ 0.83 — about a 17% drop. **A perpetual's duration is roughly 1/yield,** so rising long rates hit it directly (Stage 18.1).",
    },
  ],

  further: [
    { label: "Federal Reserve: Review of the Supervision and Regulation of Silicon Valley Bank (the Barr report, April 2023)", url: "https://www.federalreserve.gov/publications/review-of-the-federal-reserves-supervision-and-regulation-of-silicon-valley-bank.htm" },
    { label: "Bank of England: announcement of the temporary gilt market operation, September 28, 2022", url: "https://www.bankofengland.co.uk/news/2022/september/bank-of-england-announces-gilt-market-operation" },
    { label: "Financial Stability Board: Holistic Review of the March 2020 Market Turmoil (November 2020)", url: "https://www.fsb.org/2020/11/holistic-review-of-the-march-market-turmoil/" },
    { label: "New York Fed, Liberty Street Economics: research on Treasury market functioning", url: "https://libertystreeteconomics.newyorkfed.org/" },
    { label: "Options Path (sister course): volatility, hedging and margin", url: "https://evidex-cloud.github.io/droplet-labs-options-path/" },
  ],
};
