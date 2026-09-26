export default {
  id: "defi-lending",
  stage: 13,
  order: 4,
  title: "On-Chain Lending: Over-Collateralization, Health Factors & Automatic Liquidation",
  difficulty: "newfin",
  prereqs: ["defi-what", "stablecoins", "margin-liquidation"],

  oneLiner:
    "An on-chain lending protocol such as Aave doesn't know who you are, so it trusts exactly one thing: **collateral**. You must lock up assets worth more than you borrow. A number called the **health factor** measures, in real time, whether the collateral is still enough. The moment it drops below 1, anyone may repay part of your debt and take some of your collateral at a discount. That is **automatic liquidation**. No loan officer sets the interest rate; it falls out of the pool's **utilization** along a pre-set curve. This lesson takes the machine apart: why it is both \"safer\" and more fragile than a bank, and why it sits at the opposite extreme from a DAT's \"no margin call\" structure.",

  intuition: `
In Stage 13.1, Casey locked up 3 ETH on a Saturday night (worth $9,000 at $3,000 each) and borrowed 5,000 USDC. Let's put that loan under the microscope.

When a bank lends, its first question is **will this person repay?** It looks at income, credit history, collateral and employment. An on-chain lending protocol sees none of that. It doesn't know who Casey is and can't sue Casey. The only thing it controls is **the collateral locked in the contract**. So its entire risk policy boils down to one sentence: **make sure that, at every moment, selling the collateral would cover the debt.**

To do that, it draws three lines (the parameters below are illustrative, in the same range as Aave's usual settings for ETH):

- **Maximum loan-to-value (LTV) of 80%.** $9,000 of ETH can borrow at most $7,200. Casey borrowed only $5,000, an LTV of about 56%.
- **A liquidation threshold of 83%.** \\(\\text{Collateral value} \\times 83\\%\\) is the "safety line."
- **The health factor** \\(= \\dfrac{\\text{collateral value} \\times \\text{liquidation threshold}}{\\text{debt}} = \\dfrac{9{,}000 \\times 0.83}{5{,}000} \\approx \\mathbf{1.49}\\).

Above 1, all is well. **Below 1, the position can be liquidated.** How far must ETH fall to push Casey's health factor to 1? \\(\\dfrac{5{,}000}{3 \\times 0.83} \\approx \\mathbf{\\$2{,}008}\\), a drop of about 33%.

What happens at that moment? No bank manager calls, and nobody gives you three days to top up. **Anyone** can act, usually a bot that watches health factors across the whole network, called a **liquidator**. It repays half of Casey's debt (2,500 USDC) and takes the matching ETH at a 5% discount, ETH worth $2,625. Casey's debt is halved, a slice of the collateral is gone, and Casey has paid a $125 "liquidation penalty" for the privilege. It all happens in one transaction, any hour of any day.

This lesson rests on **Idea ② Balance sheets & claims**: on-chain lending is a public balance sheet revalued continuously at the collateral's market price. It also rests on **Idea ④ Risk & leverage**: liquidation is the fully automated version of the "margin call plus forced sale" from Stage 7.5, and when many liquidations cluster at the same price you get a liquidation cascade.

By the end you'll see that this makes a perfect contrast with the course's focus, DATs. A DAT uses bitcoin to "support" convertibles and preferreds, and its cushion is measured by the **BTC Rating (asset coverage)** of Stage 16.5. On-chain lending measures its cushion with the **health factor**. The formulas are nearly identical. What differs is **what happens when the line is crossed**. A DeFi loan is liquidated within seconds. A DAT's preferreds and convertibles have **no price-triggered forced sale** (Stage 17.6). Both borrow against crypto, and **whether there's a margin call decides the shape of the risk**.

**In this lesson we break it into five parts:**

- **① Over-collateralization: why on-chain loans need more collateral than they lend**
- **② LTV, liquidation thresholds and the health factor**
- **③ Automatic liquidation: liquidators, bonuses and close factors**
- **④ The rate curve: utilization sets the interest rate**
- **⑤ When liquidation fails: bad debt, cascades, and the DAT contrast**
`,

  mechanics: `
### ① Over-collateralization: why on-chain loans need more collateral than they lend

A traditional loan is protected by three things: **the borrower's willingness and ability to repay** (credit), **collateral**, and **legal recourse**. On-chain, only the middle one survives. So:

- Loans **must be over-collateralized**. To borrow $100 you post $125–200 of assets, depending on how volatile and liquid the collateral is.
- **Collateral must be priceable and sellable on-chain**: ETH, tokenized bitcoin (such as WBTC), major stablecoins, liquid-staking tokens, some tokenized Treasuries. A house won't do, because a contract can't take it to a court auction.
- **The lender's risk isn't credit risk. It's the risk that collateral gaps below the debt before it can be liquidated**, known as gap risk.

So why would anyone lock up $9,000 to borrow $5,000? It looks like a bad deal. There are three real reasons:

1. **Not wanting to sell.** Casey is bullish on ETH. Selling would give up the upside and might trigger tax. Borrowing covers the emergency and keeps the exposure. It's the same logic as wealthy people borrowing against their stock portfolios instead of selling, and it's where DATs like Strategy start from when they "borrow rather than sell the coins" (Stage 15.3).
2. **Leverage.** Borrow USDC, buy more ETH, deposit it, borrow again, and so on. The theoretical \\(\\text{maximum leverage} = \\dfrac{1}{1 - \\mathrm{LTV}}\\), about 5x at an 80% LTV. The Stage 13.1 demo does exactly this "lever up in one transaction."
3. **Shorting or carry.** Borrow ETH and sell it, and you are short. Borrow stablecoins to chase a higher yield elsewhere, and you have a carry trade (Stage 13.5).

On-chain lending's main users, then, **are not people short of money but people with assets who want to keep or amplify their exposure**. That's why its size rises and falls with crypto prices. On September 26, 2026, the largest lending protocol, Aave, had about $19 billion locked and about $13 billion of loans outstanding. At its peak on October 7, 2025, it had about $45.8 billion locked (DefiLlama).

### ② LTV, liquidation thresholds and the health factor

Three parameters, each with a job:

<table>
<tr><th>Parameter</th><th>Illustrative value (ETH collateral)</th><th>What it governs</th></tr>
<tr><td>Maximum LTV</td><td>80%</td><td>How much you can borrow at the outset, so you don't start at the cliff edge</td></tr>
<tr><td>Liquidation threshold</td><td>83%</td><td>Drives the health factor; the gap between it and max LTV is the buffer</td></tr>
<tr><td>Liquidation bonus</td><td>5%</td><td>The discount at which liquidators buy the collateral, i.e., their profit</td></tr>
<tr><td>Close factor</td><td>50%</td><td>The largest share of the debt one liquidation may repay</td></tr>
</table>

$$
\\text{Health factor}\\ \\mathrm{HF} = \\frac{\\sum (\\text{collateral value} \\times \\text{liquidation threshold})}{\\text{debt value}}
\\text{Liquidation price} = \\frac{\\text{debt}}{\\text{collateral quantity} \\times \\text{liquidation threshold}}
$$

Casey's numbers: \\(\\mathrm{HF} = \\dfrac{9{,}000 \\times 0.83}{5{,}000} \\approx 1.49\\), and the liquidation price is about $2,008. Slide the ETH price down from 3,000 and you get a risk ruler:

<figure><svg viewBox="0 0 640 290" xmlns="http://www.w3.org/2000/svg" font-family="Inter, system-ui, sans-serif"><text x="320" y="22" text-anchor="middle" font-size="13" font-weight="700" fill="var(--ink)">Casey's loan: 3 ETH collateral, 5,000 USDC borrowed; four ETH price zones</text><rect x="60" y="50" width="130" height="150" fill="var(--green-soft)" stroke="var(--green)"/><rect x="190" y="50" width="130" height="150" fill="var(--orange-soft)" stroke="var(--orange)"/><rect x="320" y="50" width="130" height="150" fill="var(--red-soft)" stroke="var(--red)"/><rect x="450" y="50" width="130" height="150" fill="var(--surface-2)" stroke="var(--red)" stroke-width="2" stroke-dasharray="5 3"/><text x="125" y="75" text-anchor="middle" font-size="12" font-weight="700" fill="var(--green)">Safe</text><text x="125" y="98" text-anchor="middle" font-size="11" fill="var(--ink)">ETH ≥ about 2,510</text><text x="125" y="118" text-anchor="middle" font-size="11" fill="var(--ink)">HF ≥ 1.25</text><text x="125" y="150" text-anchor="middle" font-size="10" fill="var(--muted)">HF ≈ 1.49 at 3,000</text><text x="255" y="75" text-anchor="middle" font-size="12" font-weight="700" fill="var(--orange-ink)">Warning</text><text x="255" y="98" text-anchor="middle" font-size="11" fill="var(--ink)">2,008 – 2,510</text><text x="255" y="118" text-anchor="middle" font-size="11" fill="var(--ink)">1 ≤ HF &lt; 1.25</text><text x="255" y="150" text-anchor="middle" font-size="10" fill="var(--muted)">time to add collateral</text><text x="255" y="165" text-anchor="middle" font-size="10" fill="var(--muted)">or repay</text><text x="385" y="75" text-anchor="middle" font-size="12" font-weight="700" fill="var(--red)">Liquidatable</text><text x="385" y="98" text-anchor="middle" font-size="11" fill="var(--ink)">1,750 – 2,008</text><text x="385" y="118" text-anchor="middle" font-size="11" fill="var(--ink)">HF &lt; 1</text><text x="385" y="150" text-anchor="middle" font-size="10" fill="var(--muted)">liquidator repays half,</text><text x="385" y="165" text-anchor="middle" font-size="10" fill="var(--muted)">takes 1.05x in ETH</text><text x="515" y="75" text-anchor="middle" font-size="12" font-weight="700" fill="var(--red)">Bad debt</text><text x="515" y="98" text-anchor="middle" font-size="11" fill="var(--ink)">ETH &lt; about 1,750</text><text x="515" y="118" text-anchor="middle" font-size="11" fill="var(--ink)">collateral &lt; debt × 1.05</text><text x="515" y="150" text-anchor="middle" font-size="10" fill="var(--muted)">liquidating no longer pays;</text><text x="515" y="165" text-anchor="middle" font-size="10" fill="var(--muted)">losses land on depositors</text><line x1="60" y1="225" x2="580" y2="225" stroke="var(--ink)" stroke-width="1.5"/><polygon points="580,220 590,225 580,230" fill="var(--ink)"/><text x="320" y="245" text-anchor="middle" font-size="11" fill="var(--muted)">ETH price falling → (3,000 → 2,510 → 2,008 → 1,750 → …)</text><text x="320" y="275" text-anchor="middle" font-size="11" font-weight="600" fill="var(--orange-ink)">The design goal: the price must linger in the liquidatable zone long enough for liquidators to act before bad debt</text></svg><figcaption>The health factor is a ruler that slides with the price. Whether liquidation protects depositors depends on how fast the price crosses the red zone and whether liquidators act in time.</figcaption></figure>

In the language of Stage 6.5, **the health factor is an asset-coverage ratio discounted by the liquidation threshold.** Casey's \\(\\dfrac{\\text{collateral}}{\\text{debt}} = \\dfrac{9{,}000}{5{,}000} = 1.8\\times\\), and after the 83% haircut it's \\(1.8 \\times 0.83 \\approx 1.49\\). It belongs to the same family as the BTC Rating of Stage 16.5, since both are \\(\\dfrac{\\text{assets}}{\\text{claims}}\\). The difference is that DeFi uses **live prices** and has an **automatically executed trigger**.

### ③ Automatic liquidation: liquidators, bonuses and close factors

ETH falls to $2,000. The collateral is worth $6,000 and \\(\\mathrm{HF} = \\dfrac{6{,}000 \\times 0.83}{5{,}000} \\approx 0.996\\), below 1. Liquidation begins:

1. A liquidation bot spots \\(\\mathrm{HF} < 1\\) and sends a transaction that repays 50% of Casey's debt: \\(50\\% \\times 5{,}000 = \\mathbf{2{,}500}\\ \\text{USDC}\\).
2. The contract hands the liquidator ETH worth \\(2{,}500 \\times 1.05 = \\mathbf{\\$2{,}625}\\) (about 1.31 ETH).
3. The liquidator usually sells the ETH on a DEX in the same transaction, locking in about $125 of profit before gas and slippage. Many liquidators even borrow the 2,500 USDC with a **flash loan**, liquidating with zero capital of their own (Stage 13.1).

Afterwards Casey has about 1.69 ETH (about $3,375) against $2,500 of debt, and \\(\\mathrm{HF} \\approx 1.12\\), back above the line. **Casey wasn't wiped out, but paid a $125 penalty and was forced to sell about 1.31 ETH near the lows.**

Why let *anyone* liquidate? Because the protocol has no employees. It uses **profit** to hire a crowd of competing strangers, making sure someone always acts before bad debt appears. It's a textbook DeFi design, replacing an institution with an incentive. The costs:

- Liquidators selling collateral **push the price down**, which tips the next batch of loans below HF 1. That is the liquidation cascade of Stage 7.5, and since every position and liquidation price is public on-chain, **everyone can see where the cascade triggers sit**.
- During the roughly $19 billion leveraged wipeout of October 10–11, 2025 (mostly perpetual futures on centralized exchanges), on-chain lenders also went through heavy liquidations. Liquidation bots paid enormous gas fees to win each liquidation, and ordinary users trying to add collateral struggled to get their transactions into blocks at all.

### ④ The rate curve: utilization sets the interest rate

A bank's lending rate comes from its credit committee and the central bank's policy rate. An on-chain pool's rate is set automatically by one variable: **utilization \\(U = \\dfrac{\\text{amount borrowed}}{\\text{total deposits}}\\)**.

Take an illustrative USDC pool with parameters in the range of major protocols. The kink is at 90% utilization. Below the kink, the borrow rate rises linearly from 0 to 4%. Above it, each extra percentage point of utilization adds 6 percentage points to the borrow rate, up to 64%.

$$
U \\le 90\\%:\\quad \\text{borrow rate} = 4\\% \\times \\frac{U}{90\\%}
U > 90\\%:\\quad \\text{borrow rate} = 4\\% + 60\\% \\times \\frac{U - 90\\%}{10\\%}
\\text{Supply rate} = \\text{borrow rate} \\times U \\times (1 - \\text{reserve factor})
$$

<table>
<tr><th>Utilization U</th><th>Borrow rate</th><th>Supply rate (10% reserve factor)</th><th>What the system is saying</th></tr>
<tr><td>50%</td><td>≈ 2.2%</td><td>≈ 1.0%</td><td>Plenty of cash, few borrowers: cheap</td></tr>
<tr><td>90% (kink)</td><td>4.0%</td><td>≈ 3.2%</td><td>The target operating zone</td></tr>
<tr><td>95%</td><td>34%</td><td>≈ 29%</td><td>Alarm: deposit now, repay now</td></tr>
<tr><td>100%</td><td>64%</td><td>≈ 58%</td><td>The pool is lent out; depositors can't withdraw for now</td></tr>
</table>

Why so steep past the kink? Because **100% utilization is the on-chain version of a bank run.** All the depositors' money has been lent out, and anyone wanting to withdraw has to wait. The steep curve stands in, automatically, for a lender of last resort. Sky-high supply rates pull in fresh deposits, sky-high borrow rates push borrowers to repay, and utilization comes back down. This is the maturity-mismatch problem of Stage 1.2. **DeFi deposits can be withdrawn any time, while loans have no fixed maturity, and this curve is what keeps the pool liquid.**

Compare traditional money markets. There's a loose arbitrage between on-chain USDC supply rates and US Treasury bill yields (about 4.24% for 3-month bills on September 25, 2026). If on-chain stablecoin rates sit far below Treasuries for long, money drifts to tokenized Treasuries (Stage 14.2). If they sit far above, someone is paying a premium for on-chain leverage (Stage 13.5).

### ⑤ When liquidation fails: bad debt, cascades, and the DAT contrast

Over-collateralization plus automatic liquidation works well most of the time. It fails in these situations:

- **Gaps.** The price falls straight from the safe zone into the bad-debt zone within a few blocks, too fast for liquidators. On March 12, 2020 ("Black Thursday") ETH crashed in a single day, Ethereum congested and oracle updates lagged. Some MakerDAO collateral was auctioned for bids near zero, leaving the protocol a shortfall of several million dollars.
- **Collateral that isn't what it seems.** If the protocol accepts collateral that is stolen or price-manipulated, liquidation protects no one. After KelpDAO's bridge was breached on April 18–19, 2026, the attacker posted rsETH obtained out of thin air to Aave and borrowed real assets against it. That reportedly left Aave with $123–230 million of bad debt and set off about $13 billion of outflows from DeFi within two days (Stage 13.6).
- **Thin liquidity.** If the collateral's on-chain market is too shallow, liquidators can't sell, or selling crushes the price further (the slippage of Stage 13.3). That's why protocols set different LTVs, thresholds and borrowing caps for each asset. **Risk parameters are themselves a form of credit analysis.**

Who pays for bad debt? It depends on the protocol. First the protocol treasury, then a dedicated insurance or safety module (people who stake the protocol's token take the first loss), and finally depositors pro rata. **Depositors think they're earning a "risk-free" stablecoin rate. In fact they sit at the very bottom of this collateral tower, holding its tail risk.**

Finally, set it next to the course's focus:

<table>
<tr><th></th><th>DeFi collateralized lending</th><th>A DAT's convertibles and preferreds (Stage 17)</th></tr>
<tr><td>Cushion metric</td><td>Health factor (\\(\\dfrac{\\text{assets} \\times \\text{threshold}}{\\text{debt}}\\))</td><td>BTC Rating / asset coverage (\\(\\dfrac{\\text{BTC NAV}}{\\text{cumulative claims}}\\), Stage 16.5)</td></tr>
<tr><td>When the line is crossed</td><td>Forced liquidation: automatic, within seconds</td><td>No price-triggered forced sale; creditors wait for maturity or dividends</td></tr>
<tr><td>Shape of the main risk</td><td>Cascading and path-dependent: one sharp drop can knock you out</td><td>Slow-burning: refinancing, dilution, dividend coverage (Stage 16.6, Stage 18.2)</td></tr>
<tr><td>Who bears the tail</td><td>Borrowers (liquidated) + depositors (bad debt)</td><td>Common equity first, then up the stack by seniority (Stage 17.6)</td></tr>
</table>

**Both borrow against crypto, and whether a price-triggered liquidation exists decides whether the risk erupts within an hour or tests the structure over a year or two.** That's why Stage 7.5 says DATs "deliberately choose structures without margin calls," and why DAT analysis reads the coverage ratio of Stage 16.5 alongside the months of dividend coverage of Stage 16.6.
`,

  demo: "defi-lending",

  analogy: `
On-chain lending is a **fully automated pawnshop** with a glass counter and a crowd of eager **buyers** waiting outside the door.

You hand over a gold watch (ETH), and the pawnshop lends you cash worth about 60% of its appraised value. The shop checks the gold price every minute. As gold falls, your safety margin shrinks. The moment it crosses the red line, the shop doesn't phone you to top up. It shouts out the door: "Half of this watch goes to whoever repays half the owner's debt, at 5% off!" The buyers rush in, the fastest one gets the watch, sells it on, and pockets the 5%.

The good news for you: the shop doesn't take the whole watch in one go. The bad news: you were forced to sell half your watch near the bottom, and you gave away 5% on top.

Where's the shop's own risk? In **gold falling too fast**. Before any buyer can react, the watch is already worth less than the loan, nobody will take it even at a discount, and the hole has to be filled by the people who deposited money in the shop to earn interest.

Now picture a different kind of "pawnshop." A company keeps the gold watch in a safe and sells investors "watch-backed bonds" that pay interest every year and repay principal in ten years. **However far gold falls in the meantime, nobody forces it to sell the watch.** It won't blow up within an hour. But if gold stays low for years and nobody will buy its new bonds, it slowly has to face the question of where the interest will come from. The first pawnshop is DeFi lending. The second is the DAT capital structure of Stage 17.
`,

  misconceptions: [
    "**\"Over-collateralized loans are riskless.\"** Over-collateralization swaps credit risk for gap risk, oracle risk and the risk of the collateral itself. A sharp drop straight through the liquidation zone, or accepted collateral that turns out to be stolen or manipulated, leaves bad debt that ultimately lands on depositors.",
    "**\"If my health factor drops below 1, all my collateral is seized.\"** A single liquidation usually repays only part of the debt (e.g., 50%), and the liquidator takes collateral worth that amount plus a small bonus (e.g., 5%). You lose the bonus and are forced to sell at a low price. You don't lose everything, unless the price keeps falling and triggers round after round.",
    "**\"The protocol team sets on-chain interest rates.\"** Rates come automatically from utilization along a pre-written curve. The team (or a governance vote) can change the curve's parameters, but day-to-day moves come entirely from supply and demand.",
    "**\"Depositing stablecoins in a lending pool earns the risk-free rate.\"** Your money is lent to borrowers who post crypto collateral. If liquidations fail, depositors eat the bad debt, and at 100% utilization you can't withdraw for a while. It's a risky rate, and you should compare its premium with Treasury yields over the same period (Stage 13.5).",
    "**\"DeFi loans and DAT bonds both borrow against crypto, so the risk is the same.\"** The trigger is the crucial difference. DeFi loans are liquidated automatically and instantly when prices cross a threshold. DAT convertibles and preferreds carry no price-triggered forced sale of coins. The first risk is an instant cascade; the second is slow refinancing and dilution pressure.",
  ],

  quiz: [
    {
      q: "Casey posts 3 ETH (at $3,000 each) to borrow 5,000 USDC, with an 83% liquidation threshold. At roughly what ETH price does the health factor hit 1?",
      options: [
        "About $1,667",
        "About $2,500",
        "About $2,400",
        "About $2,008",
      ],
      answer: 3,
      explain: "\\(\\text{Liquidation price} = \\dfrac{\\text{debt}}{\\text{quantity} \\times \\text{threshold}} = \\dfrac{5{,}000}{3 \\times 0.83} \\approx \\mathbf{\\$2{,}008}\\), a fall of about 33%. $1,667 is where collateral merely equals the debt, deep inside the bad-debt zone.",
    },
    {
      q: "ETH falls to $2,000 and Casey is liquidated with a 50% close factor and a 5% bonus. What does the liquidator get?",
      options: [
        "All 3 of Casey's ETH",
        "It repays 2,500 USDC for Casey and receives ETH worth $2,625",
        "It repays 5,000 USDC for Casey and receives ETH worth $5,250",
        "The protocol pays the liquidator a 125 USDC fee and the ETH stays put",
      ],
      answer: 1,
      explain: "It repays \\(50\\% \\times 5{,}000 = 2{,}500\\) and receives \\(2{,}500 \\times 1.05 = \\mathbf{\\$2{,}625}\\) of ETH (about 1.31 ETH). Afterwards Casey's HF recovers to about 1.12.",
    },
    {
      q: "A USDC pool's utilization jumps from 85% to 98%, and the borrow rate leaps from about 4% to well over 30%. What is this steep curve mainly for?",
      options: [
        "Generating more revenue for the protocol team",
        "Punishing borrowers",
        "Keeping the pool from being drained: high supply rates attract new money and high borrow rates push repayment, so depositors can withdraw",
        "Following Fed rate hikes",
      ],
      answer: 2,
      explain: "**100% utilization is an on-chain run**: depositors can't get their money out. The steep curve past the kink is an automatic liquidity-repair mechanism, standing in for the banking system's lender of last resort.",
    },
    {
      q: "Which of these is **most likely** to leave an over-collateralized lending protocol with bad debt?",
      options: [
        "The price gaps from the safe zone straight through the liquidation zone within a few blocks, before liquidators can act",
        "Borrowers repay on time",
        "Utilization holds steady at 50%",
        "ETH rises slowly",
      ],
      answer: 0,
      explain: "Liquidation needs time and liquidity. **Gaps plus congestion plus lagging oracles** can drop collateral below the debt before anyone liquidates. March 12, 2020 is the classic case.",
    },
    {
      q: "Comparing DeFi collateralized lending with a DAT's preferred stock, what is the most fundamental difference?",
      options: [
        "DeFi uses bitcoin as collateral and DATs don't",
        "DeFi loans carry no interest while preferreds pay dividends",
        "DeFi loans always have a thicker cushion",
        "DeFi loans are liquidated automatically and instantly when prices cross a threshold; DAT preferreds have no price-triggered forced sale, so their risk shows up as slow refinancing and dividend-coverage pressure",
      ],
      answer: 3,
      explain: "Both cushions can be measured as \\(\\dfrac{\\text{assets}}{\\text{claims}}\\) (the health factor vs the BTC Rating of Stage 16.5), but **whether there's a price-triggered liquidation** decides whether the risk is an instant cascade or a slow test (Stage 17.6, Stage 18.2).",
    },
  ],

  further: [
    { label: "Aave documentation: health factor, liquidations and risk parameters", url: "https://aave.com/docs" },
    { label: "Compound documentation: interest-rate model and liquidation", url: "https://docs.compound.xyz/" },
    { label: "BIS Quarterly Review (December 2021): DeFi risks and the decentralisation illusion", url: "https://www.bis.org/publ/qtrpdf/r_qt2112b.htm" },
    { label: "DefiLlama: Aave TVL, loans and history", url: "https://defillama.com/protocol/aave" },
  ],
};
