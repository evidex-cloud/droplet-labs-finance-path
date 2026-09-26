export default {
  id: "stablecoins",
  stage: 13,
  order: 2,
  title: "Stablecoins: Dollars on the Blockchain & the GENIUS Act",
  difficulty: "newfin",
  prereqs: ["defi-what", "what-is-money", "dollar-system"],

  oneLiner:
    "A stablecoin is a \"$1 IOU\" written on a blockchain. You hand the issuer a dollar, it gives you one token and promises to redeem it 1:1 at any time. Underneath, it is a **\"narrow bank\" that holds only short-term Treasuries and cash**: the issuer earns the Treasury interest, and the holder gets a dollar that moves 24/7 and can be programmed. As of September 2026 stablecoins total about $312 billion and have become significant buyers of US Treasury bills. This lesson covers the balance sheets of the three kinds of stablecoin, why they depeg and suffer runs, what the GENIUS Act of 2025 actually requires, and why stablecoins have become **a new distribution channel for the dollar**.",

  intuition: `
DeFi has an awkward birth defect. Bitcoin and ether can move 5–10% in a day, but when people borrow, keep accounts, pay wages or trade, they need something whose **price doesn't move**. Nobody wants to pay a mortgage in "money" that might be worth 10% less tomorrow.

Enter the **stablecoin**: a token designed to be worth exactly one dollar, always. The most common design is almost disarmingly simple.

Riley wires $1,000 to an issuer (say, Circle), and the issuer "mints" 1,000 USDC to Riley on-chain. The issuer uses the $1,000 to buy short-term US Treasury bills. Riley can send those 1,000 USDC to anyone with a wallet anywhere in the world, any hour of the day, arriving in seconds for well under a dollar in fees. One day Riley wants dollars back, returns the 1,000 USDC, and the issuer "burns" the tokens and wires back $1,000.

That's the entire mechanism. Now look at it through **Idea ② Balance sheets & claims**. **Every stablecoin is a liability of its issuer**, just as your bank deposit is a liability of your bank (Stage 1.1, Stage 1.2). On the asset side sit cash and short-term Treasuries. So a stablecoin issuer is essentially a **"narrow bank"**. It takes "deposits" but makes no loans and holds only the safest, shortest assets.

How does the issuer make money? The answer is elegant: **holders earn zero, the issuer earns the Treasury yield.** On September 25, 2026, the 3-month Treasury bill yielded about 4.24%. Stablecoins in circulation totaled about $312 billion (DefiLlama, September 26, 2026). As a rough calculation, if all those reserves earned about 4%, the industry would collect something on the order of $12–13 billion of interest a year. It's a superb business, and it explains why **stablecoin issuers have become big buyers of short-term US government debt**: each new dollar of stablecoins adds demand for T-bills (recall how Treasury financing is structured in Stage 3.3 and the money markets of Stage 8.3).

This lesson also rests on **Idea ③ Liquidity & trust**. A stablecoin is worth a dollar for exactly one reason: **holders believe they can get a dollar back at any time.** That is the bank-run story of Stage 10.1. Once someone doubts the reserves, the first to redeem get a dollar and the last may get nothing, so everyone races to be first. Terra's UST went to zero within days in May 2022 (Stage 10.5). USDC briefly fell to about $0.87 in March 2023 because part of its reserves sat at Silicon Valley Bank. Both were versions of the same story.

That is why, on July 18, 2025, the United States signed its first federal crypto law, the **GENIUS Act**. Its core is a set of rules on what reserves must be, how often they're disclosed, and who gets paid first if things go wrong. The law formally pulls stablecoins into the dollar system: **stablecoins are becoming a new distribution channel for the dollar.** Through them, someone with no US bank account can hold "digital dollars" backed by US Treasuries (Stage 3.4 covered the dollar system's other channels).

**In this lesson we break it into five parts:**

- **① Three kinds of stablecoin: fiat-reserved, crypto-collateralized, algorithmic**
- **② The issuer's balance sheet: why issuers became big T-bill buyers**
- **③ Depegs and runs: Terra 2022 and USDC 2023**
- **④ The GENIUS Act, clause by clause**
- **⑤ A new distribution channel for the dollar: opportunities, disputes and open questions**
`,

  mechanics: `
### ① Three kinds of stablecoin: fiat-reserved, crypto-collateralized, algorithmic

There are three completely different ways to achieve "stable," and their risks are completely different too:

<table>
<tr><th></th><th>Fiat-reserved</th><th>Crypto over-collateralized</th><th>Algorithmic / synthetic</th></tr>
<tr><td>Examples</td><td>USDT (Tether), USDC (Circle)</td><td>DAI / USDS (Maker, renamed Sky in 2024)</td><td>UST (Terra, collapsed); USDe (Ethena, a synthetic dollar)</td></tr>
<tr><td>What backs it</td><td>Off-chain cash, T-bills, repo</td><td>Crypto locked on-chain, worth more than the coins issued</td><td>An arbitrage link to another token (UST); a hedged portfolio (USDe)</td></tr>
<tr><td>Who guarantees 1:1</td><td>A centralized issuer's redemption promise</td><td>Excess collateral plus automatic liquidation (Stage 13.4)</td><td>Market arbitrage and a model</td></tr>
<tr><td>Main risks</td><td>Reserve quality, custodian banks, freezes, regulation</td><td>Collateral crashes, failed liquidations, oracles</td><td>Death spirals when confidence breaks; hedges failing</td></tr>
<tr><td>Can it be frozen?</td><td>Yes (the issuer can freeze addresses)</td><td>Mostly no (but indirectly relies on USDC and the like)</td><td>Depends on design</td></tr>
</table>

**Fiat-reserved coins** dominate. As of September 26, 2026, USDT stood at about $184 billion (about 59% of all stablecoins) and USDC at about $75 billion. Together they are more than four-fifths of the market. Their trust chain runs like this: on-chain token → issuing company → that company's accounts at banks and custodians → the Treasuries and cash in those accounts. **Only the transfers are "decentralized"; the reserves are entirely centralized.**

**Crypto over-collateralized coins** are typified by DAI. You lock $150 of ETH and can mint up to about $100 of DAI. If ETH falls too far, your collateral is auctioned off automatically to repay the debt. DAI doesn't depend on any single company's bank account, but it has two soft spots. The first is that liquidation machinery can fail in a crash like March 12, 2020, when some collateral was auctioned off for bids near zero. The second is that, to hold its peg, DAI later absorbed large amounts of USDC and tokenized Treasuries as backing. **More and more of the "decentralized dollar" is backed by Treasuries as well.**

**Algorithmic coins** try to hold $1 without full reserves. Terra's UST is the famous case. One UST could always be swapped for $1 worth of the LUNA token, and vice versa, and arbitrageurs were supposed to pull the price back to $1. The mechanism works in calm markets. When everyone wants out, it turns into a death spiral: **print LUNA to redeem UST → LUNA crashes → nobody trusts UST**. **Synthetic dollars** such as Ethena's USDe take another route. They hold spot ETH and short the same amount of ETH in perpetual futures, so price moves cancel out, and the yield comes from staking and funding rates (Stage 13.5). That isn't an algorithmic stablecoin, but it relies on exchanges and funding rates and isn't riskless. During the October 10, 2025 liquidation wave, USDe traded as low as about $0.65 on a single exchange, Binance, while other venues were far less affected.

### ② The issuer's balance sheet: why issuers became big T-bill buyers

Draw a compliant fiat-reserved issuer as a balance sheet:

<figure><svg viewBox="0 0 640 290" xmlns="http://www.w3.org/2000/svg" font-family="Inter, system-ui, sans-serif"><text x="320" y="22" text-anchor="middle" font-size="13" font-weight="700" fill="var(--ink)">A stablecoin issuer's balance sheet (illustrative: $10B issued)</text><text x="170" y="48" text-anchor="middle" font-size="12" font-weight="700" fill="var(--green)">Assets (reserves)</text><text x="470" y="48" text-anchor="middle" font-size="12" font-weight="700" fill="var(--red)">Liabilities & equity</text><rect x="70" y="58" width="200" height="40" fill="var(--green-soft)" stroke="var(--green)"/><text x="170" y="76" text-anchor="middle" font-size="11" fill="var(--ink)">Cash and bank deposits</text><text x="170" y="91" text-anchor="middle" font-size="10" fill="var(--muted)">about $1.5B · daily redemptions</text><rect x="70" y="98" width="200" height="120" fill="var(--green-soft)" stroke="var(--green)"/><text x="170" y="146" text-anchor="middle" font-size="11" fill="var(--ink)">T-bills maturing in ≤93 days,</text><text x="170" y="162" text-anchor="middle" font-size="11" fill="var(--ink)">overnight repo, gov't money funds</text><text x="170" y="180" text-anchor="middle" font-size="10" fill="var(--muted)">about $8.5B · earns about 4%</text><rect x="70" y="218" width="200" height="12" fill="var(--surface-2)" stroke="var(--green)" stroke-dasharray="3 2"/><text x="170" y="245" text-anchor="middle" font-size="10" fill="var(--muted)">(the firm's own capital held separately)</text><rect x="370" y="58" width="200" height="160" fill="var(--red-soft)" stroke="var(--red)"/><text x="470" y="126" text-anchor="middle" font-size="11" fill="var(--ink)">10B stablecoins outstanding</text><text x="470" y="144" text-anchor="middle" font-size="10" fill="var(--muted)">each = a claim redeemable for $1</text><text x="470" y="162" text-anchor="middle" font-size="10" fill="var(--muted)">interest to holders: 0 (barred by law)</text><rect x="370" y="218" width="200" height="12" fill="var(--orange-soft)" stroke="var(--orange)"/><text x="470" y="245" text-anchor="middle" font-size="10" fill="var(--muted)">Issuer equity (profits accumulate here)</text><line x1="290" y1="140" x2="350" y2="140" stroke="var(--orange)" stroke-width="2"/><polygon points="350,135 360,140 350,145" fill="var(--orange)"/><text x="320" y="130" text-anchor="middle" font-size="10" fill="var(--orange-ink)">spread</text><text x="320" y="275" text-anchor="middle" font-size="11" font-weight="600" fill="var(--orange-ink)">Business model = T-bill interest (~4%) − holder interest (0) − costs: a "narrow bank" that buys only bills</text></svg><figcaption>The liability side is holders' 1:1 redemption right; the asset side is restricted to cash and very short Treasuries. Higher rates mean fatter profits for the issuer; at zero rates, the business is worth only what distribution and payments are worth.</figcaption></figure>

A few direct consequences:

- **Issuer profits are extremely rate-sensitive.** On $10 billion of reserves, a 4% bill yield brings in $400 million a year. At 1% it's $100 million. **A stablecoin is a rate business**, an unexpected appearance of Idea ① in the new financial system.
- **Stablecoin growth means new demand for short-term Treasuries.** Reserves must sit in very short bills and similar assets, so every extra $10 billion of stablecoins brings roughly $10 billion of extra bill demand. The US Treasury leans ever more on bills to fund deficits (the bills-versus-bonds debate of Stage 3.3 and Stage 4.5), so this is a welcome new buyer.
- **Its place in the money hierarchy.** Go back to the pyramid of Stage 1.1: central-bank reserves > bank deposits > money funds and stablecoins. Stablecoin holders have no deposit insurance and no direct access to central-bank reserves. Their safety depends entirely on **the quality and accessibility of the reserve assets**.

### ③ Depegs and runs: Terra 2022 and USDC 2023

**Terra/UST (May 2022) was a run with no real reserves.** Demand for UST came largely from the roughly 20% deposit yield paid by the Anchor protocol, a yield with no real source behind it (Stage 13.5: "if you can't find the source of the yield, you are the yield"). As big money started leaving, UST slid to 0.98, then 0.90, then 0.60. Every UST redeemed meant minting new LUNA, and within days LUNA's supply ballooned from hundreds of millions of tokens to trillions while its price went to nearly zero. More than $40 billion of market value evaporated, and the collapse triggered a chain of failures including Celsius and Three Arrows Capital (Stage 10.5). **An algorithmic stablecoin is stable in normal times and least stable exactly when stability matters.**

**USDC (March 2023) had full reserves in the wrong place.** Silicon Valley Bank was shut on March 10, 2023, and Circle then disclosed that about $3.3 billion of its reserves, roughly 8%, was held there. Over that weekend USDC traded as low as about $0.87 on secondary markets. On March 12, regulators announced that all SVB depositors would be protected, and USDC snapped back to $1. There are two lessons. First, **100% reserves are not the same as 100% available right now.** Second, **stablecoins and the banking system are wired together.** A bank failure can travel through a stablecoin into DeFi: DAI, which was then backed heavily by USDC, depegged too.

The two episodes match the two classic causes of a run: **not enough assets** (Terra) and **enough assets that can't be reached in time** (USDC). They are the two cases of the Diamond–Dybvig model in Stage 10.1. **As long as redemption is first come, first served, any doubt about reserves becomes self-fulfilling.** This lesson's demo lets you set the reserve mix, add a rate shock or a bank failure, and see what the early and late redeemers each get.

### ④ The GENIUS Act, clause by clause

The GENIUS Act (S.1582) passed the Senate 68–30 on June 17, 2025, and the House 308–122 on July 17, 2025, and was **signed into law on July 18, 2025**. It covers "payment stablecoins," and its core provisions read naturally as balance-sheet rules:

<table>
<tr><th>Provision</th><th>What it says</th><th>Which risk it targets</th></tr>
<tr><td>Reserves</td><td>1:1 backing, limited to cash, insured deposits, T-bills with ≤93 days to maturity, overnight repo and government money-market funds</td><td>Asset quality and maturity mismatch (rules out Terra-style and "long bond" reserves)</td></tr>
<tr><td>Disclosure</td><td>Monthly public reserve reports</td><td>Opacity</td></tr>
<tr><td>No yield</td><td>Issuers may not pay interest or yield to holders</td><td>Competition with bank deposits; yield-chasing</td></tr>
<tr><td>Supervisor</td><td>A federal regime, or a "substantially similar" state regime; the state route is only open up to $10B outstanding</td><td>Regulatory arbitrage</td></tr>
<tr><td>Insolvency</td><td>Holders have first priority on reserves if the issuer fails</td><td>Seniority (Stage 6.1)</td></tr>
<tr><td>Enforcement</td><td>Issuers must be technically able to freeze and burn tokens; Bank Secrecy Act anti-money-laundering rules apply</td><td>Illicit finance</td></tr>
<tr><td>Effective date</td><td>The earlier of 18 months after enactment (January 18, 2027) or 120 days after final regulations</td><td>—</td></tr>
</table>

As of September 2026 the law is still being implemented. The Office of the Comptroller of the Currency (OCC) proposed rules on February 25, 2026, the FDIC proposed its rules on April 7, and the Treasury proposed a rule on state regimes in April. The statutory July 18, 2026 deadline for final rules was missed, and the OCC is reportedly aiming to finish in November 2026.

In this course's language, the law does three things. **It locks reserves into the shortest, highest-quality assets, which removes Idea ①'s duration risk. It puts holders first in line in insolvency (Idea ②). And it brings issuers under bank-style supervision and AML rules, so the trust of Idea ③ is backed by law.** The costs: stablecoins **cannot pay interest**, and DeFi's "permissionless" ideal is diluted by the freeze function in the biggest coins.

### ⑤ A new distribution channel for the dollar: opportunities, disputes and open questions

Why would the US government legislate for stablecoins? One big reason: **stablecoins carry the dollar to places the US banking system doesn't reach.** Ordinary people in Argentina, Turkey or Nigeria can hold USDT in a phone wallet to escape a depreciating local currency. Cross-border merchants can settle on a Sunday. And the reserves behind those dollars end up in US Treasuries, so **every stablecoin held abroad adds a bit of demand for US government debt** (Stage 3.4 showed how the dollar system runs on global demand for Treasuries).

The disputes are just as sharp:

- **Deposit flight from banks.** If people swap deposits for stablecoins, banks have less funding to lend. Part of the reason the law bans issuers from paying interest is to stop stablecoins competing head-on with deposits. Reportedly, whether trading platforms can pay holders "rewards" that work like interest is still a live fight between banks and the crypto industry, and one of the sticking points in market-structure negotiations.
- **Dollarization in emerging markets.** For an Argentine saver it is a safe haven. For Argentina's central bank it is a way monetary policy stops working.
- **The "singleness" of money.** The Bank for International Settlements (BIS) and others point out that different stablecoins trade at slightly different prices in secondary markets, unlike bank deposits, which always swap 1:1. They add that anonymous transfers on public chains make full AML compliance hard.
- **The CBDC road not taken.** The US chose "private stablecoins plus regulation." In July 2026 a ban on the Fed issuing a retail central bank digital currency (CBDC) through the end of 2030 became law as part of a housing bill.

**Growth has also slowed.** Supply rose from about $205 billion at the start of 2025 to above $300 billion for the first time in October 2025 and peaked at about $321 billion on May 17, 2026. As crypto fell through 2026 it slipped back to about $312 billion by late September. **A law on the books doesn't automatically bring a boom in use.**

Tie it together. Stablecoins are DeFi's dollar leg (Stage 13.1). They are the main unit of account in DEX pools and lending markets (Stage 13.3, Stage 13.4). Their reserve yield is the floor for DeFi's "risk-free rate" (Stage 13.5). Their depegs are among DeFi's biggest systemic risks (Stage 13.6). Further on, Stage 14.5 looks at how bank-issued "deposit tokens" compete with stablecoins, and Stage 19.4 explains why payments between AI agents may run on stablecoins first.
`,

  demo: "stablecoins",

  analogy: `
Think of a stablecoin issuer as a **coat-check counter, except what it checks is dollars**.

You hand over $1 and the counter gives you a **claim ticket**. Tickets are freely transferable: pass one to anyone and they can collect $1 at the counter. Because a ticket travels better than cash (24 hours a day, worldwide, in seconds), people simply start using tickets as money.

The counter's own arithmetic: checked money shouldn't sit idle, so it buys **Treasury bills maturing within three months** and collects the interest. The people holding tickets earn nothing, because what they wanted was convenience, not yield.

When does the counter get into trouble?

- The counter quietly puts some of the money into **long-dated bonds or risky assets**. Rates rise, assets fall, and there isn't enough to honor every ticket. (That's a blend of SVB and Terra.)
- The money is all there, but **it's deposited at a bank that suddenly shuts** and can't be reached over the weekend (USDC in 2023).
- The counter never had real money, only a promise to "print a different voucher for you if the tickets fall short" (Terra).

Once someone has doubts, ticket holders **queue up to cash out first**. The early ones get $1; the late ones might get a few cents. What the GENIUS Act does is require the counter to **hold only bills and cash**, **publish its books every month**, and **put ticket holders first if the counter goes bust**. That can't guarantee the counter never fails. It does push what the last person in line receives much closer to $1, and that is the whole trick to stopping a run: **once even the last person is sure of getting $1, nobody needs to run.**
`,

  misconceptions: [
    "**\"Stablecoins are decentralized dollars.\"** The two largest, USDT and USDC, are issued by centralized companies, their reserves sit in banks and Treasuries, and the issuers can freeze addresses. Only the transfers are decentralized. The trust underneath is entirely centralized, and now explicitly regulated by law.",
    "**\"1:1 reserves mean perfect safety.\"** Reserve quality and accessibility matter just as much. In 2023 USDC was fully reserved, yet about $3.3 billion was stuck at the failed SVB and the price fell to about $0.87. The GENIUS Act's limit to cash, insured deposits and T-bills of 93 days or less exists precisely to remove duration and access risk.",
    "**\"Holding stablecoins earns you Treasury interest.\"** The Treasury interest goes to the issuer; holders earn zero, and the GENIUS Act explicitly bans issuers from paying interest. The \"stablecoin yield\" you see in DeFi comes from lending your coins to someone else or depositing them in another protocol, which carries different risks (Stage 13.5).",
    "**\"UST's collapse shows every stablecoin will go to zero.\"** UST was an algorithmic coin with no full external reserves, and its collapse was the natural result of that design flaw. Coins with full, short, transparent reserves face a different set of risks (custody, freezes, regulation) that you can assess line by line on the balance sheet. Don't lump them together.",
    "**\"Stablecoins have nothing to do with US Treasuries.\"** The opposite is true. Compliant stablecoin reserves are mostly very short T-bills. Each $10 billion of stablecoin growth adds roughly the same amount of bill demand, so issuers are now significant buyers in the T-bill market, and the level of rates directly drives their profits.",
  ],

  quiz: [
    {
      q: "A compliant issuer has $10 billion of stablecoins outstanding, with all reserves in T-bills yielding about 4%. Roughly how much interest does it earn per year, and how much do holders receive?",
      options: [
        "The issuer earns about $400 million; holders receive zero",
        "The issuer earns zero; holders collectively receive about $400 million",
        "About $200 million each",
        "The issuer earns about $4 billion; holders receive zero",
      ],
      answer: 0,
      explain: "$10 billion × 4% = **$400 million**, all to the issuer; the GENIUS Act bars paying holders interest. That's the narrow-bank spread business, and it shows how rate-sensitive issuer profits are.",
    },
    {
      q: "Which of these is **not** an allowed reserve asset under the GENIUS Act?",
      options: [
        "A US Treasury bill with 60 days to maturity",
        "A 10-year US Treasury note",
        "Overnight repo",
        "A government money-market fund",
      ],
      answer: 1,
      explain: "The law allows cash, insured deposits, T-bills with **93 days or less** to maturity, overnight repo, government money funds and similar. A 10-year note has far too much duration: when rates rise it shows SVB-style unrealized losses (Stage 4.4, Stage 10.3).",
    },
    {
      q: "What directly caused USDC to trade briefly at about $0.87 in March 2023?",
      options: [
        "USDC is an algorithmic stablecoin and its mechanism failed",
        "Circle was hacked",
        "About $3.3 billion of reserves sat at the shuttered Silicon Valley Bank, and the market feared it was lost",
        "The Federal Reserve banned stablecoins",
      ],
      answer: 2,
      explain: "The reserves were complete, but **part of them couldn't be reached**. When regulators announced on March 12 that all depositors would be protected, USDC returned to $1. It was a run on liquidity, not on solvency.",
    },
    {
      q: "Why is Terra's UST collapse in May 2022 described as a \"death spiral\"?",
      options: [
        "The US government froze its reserves",
        "Its reserves were all long-term Treasuries",
        "The Ethereum network went down",
        "Each UST redeemed required minting $1 of new LUNA, so more redemptions crushed LUNA, which destroyed trust in UST and triggered still more redemptions",
      ],
      answer: 3,
      explain: "**A reflexive loop with no outside reserves.** UST was \"backed\" by LUNA, and LUNA's value depended on confidence in UST. Once the run began, minting only sped up the collapse (the reflexivity of Stage 10.4).",
    },
    {
      q: "Under the GENIUS Act, where do holders stand if a stablecoin issuer goes bankrupt?",
      options: [
        "Behind all creditors, alongside common shareholders",
        "First in line, with priority over the reserves",
        "Pro rata with the issuer's other unsecured creditors",
        "They have no claim at all",
      ],
      answer: 1,
      explain: "The law gives holders **first priority** in insolvency. In the capital-stack language of Stage 6.1, the reserves are ring-fenced for holders and they stand at the very front of the line.",
    },
  ],

  further: [
    { label: "GENIUS Act full text (S.1582, Congress.gov)", url: "https://www.congress.gov/bill/119th-congress/senate-bill/1582/text" },
    { label: "White House fact sheet on the signing of the GENIUS Act (July 18, 2025)", url: "https://www.whitehouse.gov/fact-sheets/2025/07/fact-sheet-president-donald-j-trump-signs-genius-act-into-law/" },
    { label: "OCC Bulletin 2026-3: proposed rules implementing the GENIUS Act", url: "https://www.occ.gov/news-issuances/bulletins/2026/bulletin-2026-3.html" },
    { label: "BIS Annual Economic Report 2025, Chapter III: The next-generation monetary and financial system (stablecoins and singleness, elasticity, integrity)", url: "https://www.bis.org/publ/arpdf/ar2025e3.htm" },
    { label: "DefiLlama: live stablecoin supply by coin", url: "https://defillama.com/stablecoins" },
  ],
};
