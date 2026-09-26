// 交互演示：四观念眼镜——选一条新闻，看观念①②③④各亮几分、由哪些阶段解开；
// 每条新闻配一个“冲击”滑块，用共享引擎真算：债券价格、永续优先股、国债利息、橙子公司覆盖倍数与飞轮等。
import { bondPrice, perpetuity, btcRating, amplification, issueAndBuy, fmtPct, fmtUsd, fmtNum, fmtBig, clamp, tex } from "./_fin.js";

export default function mount(root, lang) {
  const en = lang === "en";
  const T = (zh, e) => (en ? e : zh);

  const IDEAS = [
    { n: "①", name: T("时间的价格", "The price of time"), color: "var(--orange)" },
    { n: "②", name: T("资产负债表与索取权", "Balance sheets & claims"), color: "var(--blue)" },
    { n: "③", name: T("流动性与信任", "Liquidity & trust"), color: "var(--green)" },
    { n: "④", name: T("风险与杠杆", "Risk & leverage"), color: "var(--btc)" },
  ];

  // 橙子公司（AUTHORING §0.2）
  const OC = { btc: 10000, shares: 1e8, claims: 300e6, fLayer: 250e6 };

  const H = [
    {
      k: "y30", lin: true,
      t: T("30 年期美国国债收益率升破 5%", "The 30-year US Treasury yield breaks above 5%"),
      w: [3, 2, 0, 2],
      why: [
        T("长期“时间的价格”的锚动了，所有资产都要重新折现。", "The anchor for the long-term price of time moved, so every asset gets re-discounted."),
        T("政府是最大的借款者：利率越高，利息支出越大、赤字越大。", "The government is the biggest borrower: higher rates mean bigger interest bills and deficits."),
        "",
        T("长债久期约 15.5：持有者承担巨大的价格风险。", "Long bonds have a duration near 15.5: holders carry big price risk."),
      ],
      st: T("阶段 2.4 · 阶段 4.5 · 阶段 9.4 · 阶段 20.1", "Stage 2.4 · Stage 4.5 · Stage 9.4 · Stage 20.1"),
      shock: { label: T("收益率再上升（基点）", "Further rise in yield (basis points)"), min: 0, max: 200, step: 5, val: 50 },
      calc: (v) => {
        const dy = v / 10000, p = bondPrice(100, 0.05, 0.05 + dy, 30), pf = perpetuity(10, 0.1 + dy);
        return {
          stats: [[T("30 年期 5% 票息国债价格（面值 100）", "30-year 5% Treasury price (per 100)"), fmtNum(p, 1), p < 100 ? "neg" : ""],
                  [T("价格变化", "Price change"), fmtPct(p / 100 - 1, 1), p < 100 ? "neg" : ""],
                  [T("股息 10 美元的永续优先股（原要求回报 10%）", "Perpetual preferred paying $10 (was priced at 10%)"), fmtUsd(pf, 2), pf < 100 ? "neg" : ""]],
          note: T("同样的现金流，只因为时间的价格变了，价格就跌。期限越长（永续最长）跌得越多。", "Same cash flows; the price drops only because the price of time changed. The longer the life (perpetual is longest), the bigger the fall."),
        };
      },
    },
    {
      k: "tok", lin: true,
      t: T("贝莱德的代币化基金、稳定币与 DeFi 正在改写金融管道", "BlackRock's tokenized fund, stablecoins and DeFi are rewiring the plumbing of finance"),
      w: [1, 2, 3, 1],
      why: [
        T("稳定币储备放在短期国债里，发行商赚的是时间的价格。", "Stablecoin reserves sit in T-bills, so issuers earn the price of time."),
        T("稳定币和代币化基金份额都是某个发行人的负债/索取权。", "Stablecoins and tokenized fund shares are claims on some issuer."),
        T("核心是重建结算与抵押品管道：7×24、几分钟、原子化。", "The core is rebuilding settlement and collateral plumbing: 24/7, minutes, atomic."),
        T("新管道有新风险：合约漏洞、脱锚。", "New pipes bring new risks: contract bugs, depegs."),
      ],
      st: T("阶段 8.2 · 阶段 13.2 · 阶段 14.2 · 阶段 14.5", "Stage 8.2 · Stage 13.2 · Stage 14.2 · Stage 14.5"),
      shock: { label: T("短期国债收益率", "T-bill yield"), min: 0, max: 6, step: 0.25, val: 4.25, pct: true },
      calc: (v) => {
        const supply = 310e9, inc = supply * (v / 100);
        return {
          stats: [[T("稳定币总量（截至 2026 年 9 月，约）", "Stablecoin supply (Sept 2026, approx.)"), fmtBig(supply, 0), ""],
                  [T("储备每年利息收入（示意）", "Yearly interest on reserves (illustrative)"), fmtBig(inc, 1), "acc"],
                  [T("付给持币人的利息", "Interest paid to holders"), T("0（《GENIUS 法案》禁止）", "0 (barred by the GENIUS Act)"), ""]],
          note: T("持币人拿不到利息，储备利息归发行商——这就是为什么时间的价格（①）也决定了新管道（③）的商业模式。", "Holders get no interest; the reserve income goes to the issuer — which is why the price of time (①) shapes the business model of the new plumbing (③)."),
        };
      },
    },
    {
      k: "pref", lin: true,
      t: T("Strategy 发行收益率约 10% 的比特币支撑优先股", "Strategy issues a bitcoin-backed preferred stock yielding about 10%"),
      w: [2, 3, 1, 3],
      why: [
        T("10% 必须和 5% 以上的国债比：多出来的是在补偿什么？", "That 10% has to beat Treasuries above 5%: what is the extra paying for?"),
        T("优先股是资本结构里的一层，排在债之后、普通股之前。", "A preferred is one layer of the capital stack: behind debt, ahead of common."),
        T("股息靠增发、美元储备等来源支付，依赖资本市场是否畅通。", "Dividends are funded by issuance, a USD reserve and so on — they depend on open capital markets."),
        T("比特币的波动决定这层索取权有多安全，普通股被放大。", "Bitcoin's swings decide how safe this claim is; the common stock is amplified."),
      ],
      st: T("阶段 6.2 · 阶段 16.5 · 阶段 17.3 · 阶段 18.1", "Stage 6.2 · Stage 16.5 · Stage 17.3 · Stage 18.1"),
      shock: { label: T("比特币从 10 万美元下跌", "Bitcoin falls from $100,000 by"), min: 0, max: 90, step: 1, val: 54, pct: true },
      calc: (v) => {
        const nav = OC.btc * 100000 * (1 - v / 100);
        const rF = btcRating(nav, OC.fLayer), rD = btcRating(nav, OC.claims), amp = amplification(nav, OC.claims);
        return {
          stats: [[T("橙子公司比特币净值", "Orange Corp BTC NAV"), fmtBig(nav, 2), ""],
                  [T("到 F 层的覆盖倍数", "Coverage through the F layer"), fmtNum(rF, 2) + "x", rF < 1.5 ? "neg" : "pos"],
                  [T("到 D 层的覆盖倍数", "Coverage through the D layer"), fmtNum(rD, 2) + "x", rD < 1.5 ? "neg" : "pos"],
                  [T("普通股放大倍数", "Common-stock amplification"), isFinite(amp) ? fmtNum(amp, 2) + "x" : T("普通股已归零", "common wiped out"), "acc"]],
          note: T("这是全课的玩具公司，不是 Strategy 的真实数据。本课只讲机制，不构成投资建议。", "This is the course's toy company, not Strategy's actual numbers. Mechanisms only — not investment advice."),
        };
      },
    },
    {
      k: "fed", lin: false,
      t: T("美联储 2023 年以来首次加息", "The Fed hikes for the first time since 2023"),
      w: [3, 1, 2, 1],
      why: [
        T("短端“时间的价格”被直接上调。", "The short end of the price of time is raised directly."),
        T("浮动利率借款人的负债成本上升。", "Floating-rate borrowers' funding costs go up."),
        T("政策利率是货币市场与回购管道的基准。", "The policy rate anchors money markets and repo plumbing."),
        T("加杠杆的成本变高。", "Leverage gets more expensive."),
      ],
      st: T("阶段 1.3 · 阶段 9.1 · 阶段 9.2", "Stage 1.3 · Stage 9.1 · Stage 9.2"),
      shock: { label: T("收益率上升（基点）", "Rise in yields (basis points)"), min: 0, max: 200, step: 5, val: 25 },
      calc: (v) => {
        const dy = v / 10000, p2 = bondPrice(1000, 0.048, 0.048 + dy, 2), p30 = bondPrice(1000, 0.055, 0.055 + dy, 30);
        return {
          stats: [[T("2 年期债券价格变化", "2-year bond price change"), fmtPct(p2 / 1000 - 1, 2), "neg"],
                  [T("30 年期债券价格变化", "30-year bond price change"), fmtPct(p30 / 1000 - 1, 2), "neg"]],
          note: T("同样的利率上升，30 年期债券的跌幅是 2 年期的七八倍——这就是久期（阶段 4.4）。2026 年 9 月 16 日美联储加息 25 个基点至 3.75%–4.00%。", "The same rise hits the 30-year bond seven or eight times harder than the 2-year — that's duration (Stage 4.4). On September 16, 2026 the Fed hiked 25 basis points to 3.75%–4.00%."),
        };
      },
    },
    {
      k: "debt", lin: false,
      t: T("美国联邦债务突破 40 万亿美元", "US federal debt passes $40 trillion"),
      w: [3, 3, 1, 1],
      why: [
        T("债务越大，利率每升一点，利息账单就多一大块。", "The bigger the debt, the more each rate rise adds to the interest bill."),
        T("国债是政府的负债，也是全世界储蓄者的资产。", "Treasuries are the government's liability and the world's savings asset."),
        T("国债是全球金融管道里最重要的抵押品。", "Treasuries are the most important collateral in global plumbing."),
        T("利息—赤字—更多发债，可能形成循环。", "Interest → deficits → more issuance can become a loop."),
      ],
      st: T("阶段 3.3 · 阶段 4.5 · 阶段 9.4", "Stage 3.3 · Stage 4.5 · Stage 9.4"),
      shock: { label: T("公众持有债务的平均利率", "Average interest rate on debt held by the public"), min: 1, max: 7, step: 0.25, val: 3.25, pct: true },
      calc: (v) => {
        const held = 32.36e12, cost = held * (v / 100);
        return {
          stats: [[T("公众持有的联邦债务（2026-09-24）", "Federal debt held by the public (2026-09-24)"), fmtBig(held, 2), ""],
                  [T("每年利息（按所选平均利率，示意）", "Yearly interest at the chosen average rate (illustrative)"), fmtBig(cost, 2), "neg"],
                  [T("平均利率每升 1 个百分点，每年多付", "Extra per year for each +1 point"), fmtBig(held * 0.01, 2), "neg"]],
          note: T("截至 2026 年，美国每年净利息约 1 万亿美元量级，已超过国防开支。旧债到期后按新利率滚动，平均利率会慢慢向市场利率靠拢。", "By 2026 US net interest was on the order of $1 trillion a year, more than defense. As old debt matures and rolls at new rates, the average rate drifts toward market rates."),
        };
      },
    },
    {
      k: "svb", lin: false,
      t: T("一家银行因债券浮亏遭遇挤兑（硅谷银行式）", "A bank suffers a run after bond losses (SVB-style)"),
      w: [2, 3, 3, 2],
      why: [
        T("低利率时买的长债，在利率上升后大幅贬值。", "Long bonds bought at low rates lose value when rates rise."),
        T("资产缩水，负债却是随时可取的存款。", "Assets shrink while liabilities are on-demand deposits."),
        T("信任断裂：一天内要求取走约 420 亿美元。", "Trust snaps: about $42 billion asked for in a single day."),
        T("银行本身高杠杆，资本很薄。", "Banks run on high leverage and thin capital."),
      ],
      st: T("阶段 1.2 · 阶段 10.1 · 阶段 10.3", "Stage 1.2 · Stage 10.1 · Stage 10.3"),
      shock: { label: T("利率上升（百分点）", "Rise in rates (percentage points)"), min: 0, max: 5, step: 0.25, val: 3, pct: true },
      calc: (v) => {
        const p = bondPrice(1000, 0.015, 0.015 + v / 100, 10), lossPct = 1 - p / 1000;
        const bondShare = 0.5, equity = 0.08, hit = bondShare * lossPct;
        return {
          stats: [[T("1.5% 票息 10 年期债券价格", "Price of a 1.5%-coupon 10-year bond"), fmtUsd(p, 1), "neg"],
                  [T("债券占资产一半时，资产损失", "Asset loss if bonds are half the balance sheet"), fmtPct(hit, 1), "neg"],
                  [T("资本（资产的 8%）剩余", "Capital left (started at 8% of assets)"), fmtPct(Math.max(0, equity - hit) / equity, 0), hit >= equity ? "neg" : "acc"]],
          note: hit >= equity
            ? T("浮亏已超过全部资本：一旦储户同时取钱、被迫卖债，账面亏损就变成真实亏损。", "Paper losses now exceed all the capital: once depositors run and bonds must be sold, the losses become real.")
            : T("资本还没被吃光，但被吃掉了一大块——储户一旦起疑，挤兑就会让浮亏变成实亏。", "Capital survives but takes a big hit — if depositors start to doubt, a run turns paper losses into real ones."),
        };
      },
    },
    {
      k: "mnav", lin: false,
      t: T("一家比特币财库公司的股价跌破持币价值（", "A bitcoin treasury company's stock falls below the value of its bitcoin (") + tex(String.raw`\mathrm{mNAV} < 1`) + T("）", ")"),
      w: [1, 3, 2, 3],
      why: [
        T("资金成本上升，市场对未来的折现更狠。", "Funding costs rise; markets discount the future harder."),
        T("每股比特币是资产负债表的核心记分牌。", "BTC per share is the balance sheet's core scoreboard."),
        T("增发通道收窄，股息资金来源受考验。", "The issuance window narrows; dividend funding gets tested."),
        T("反身性：飞轮倒转。", "Reflexivity: the flywheel runs in reverse."),
      ],
      st: T("阶段 10.4 · 阶段 16.2 · 阶段 16.7 · 阶段 18.3", "Stage 10.4 · Stage 16.2 · Stage 16.7 · Stage 18.3"),
      shock: { label: T("市值口径 mNAV（", "Basic mNAV (") + tex(T(String.raw`\text{股价} \div \text{每股比特币净值}`, String.raw`\text{share price} \div \text{BTC NAV per share}`)) + T("）", ")"), min: 0.5, max: 2.5, step: 0.05, val: 1.5, x: true },
      calc: (v) => {
        const px = 10 * v, r = issueAndBuy({ btc: OC.btc, shares: OC.shares, btcPrice: 100000, px, newShares: 1e7 });
        return {
          stats: [[T("股价（每股比特币净值 10 美元）", "Share price (BTC NAV per share $10)"), fmtUsd(px, 2), ""],
                  [T("增发 1,000 万股全部买币后，每股比特币变化", "Change in BTC per share after issuing 10M shares to buy BTC"), (r.change >= 0 ? "+" : "") + fmtPct(r.change, 2), r.change >= 0 ? "pos" : "neg"],
                  [T("新的每股聪数", "New sats per share"), fmtNum(r.bps1 * 1e8, 0), ""]],
          note: r.change >= 0
            ? T("mNAV 高于 1：增发买币提高每股比特币——飞轮在正转。", "mNAV above 1: issuing to buy bitcoin raises BTC per share — the flywheel spins forward. At ") + tex(String.raw`\mathrm{mNAV} = 1.5`) + T(" 时约 +4.5%。", " it's about +4.5%.")
            : T("mNAV 低于 1：增发买币反而稀释每股比特币——飞轮倒转，公司要考虑回购、暂停或其他工具（阶段 18.3）。", "mNAV below 1: issuing to buy bitcoin dilutes BTC per share — the flywheel reverses, and the company must weigh buybacks, pausing or other tools (Stage 18.3)."),
        };
      },
    },
  ];

  let cur = "y30";
  const vals = {}; H.forEach((h) => { vals[h.k] = h.shock.val; });

  root.innerHTML = `
    <div class="demo">
      <div class="demo-head">${T("👓 四观念眼镜：选一条新闻，看哪几个观念亮起来", "👓 The four-idea glasses: pick a headline and see which ideas light up")}</div>
      <div class="demo-block">
        <label class="demo-label">${T("① 选一条新闻（★ = 小林的三条新闻）", "① Pick a headline (★ = Lin's three headlines)")}</label>
        <div class="demo-btns" id="fi-pick">${H.map((h) => `<button class="demo-btn" data-h="${h.k}">${h.lin ? "★ " : ""}${h.t}</button>`).join("")}</div>
      </div>
      <div class="demo-block">
        <label class="demo-label">${T("② 四个观念各亮几分（0–3）", "② How brightly each idea lights up (0–3)")}</label>
        <div id="fi-ideas"></div>
        <div class="demo-meta" id="fi-st"></div>
      </div>
      <div class="demo-block">
        <label class="demo-label" id="fi-sl-lab">–</label>
        <input class="demo-slider" type="range" id="fi-sl"/>
        <div class="stat-row" id="fi-stats"></div>
        <div class="demo-log" id="fi-log"></div>
      </div>
      <p class="demo-tip">${T(
        "先点三条 ★ 新闻：第一条几乎全落在①，第二条落在③，第三条落在②④——但每条都至少牵动两个观念。再拖动下面的“冲击”滑块：同样加息 100 个基点，30 年期债券跌得远比 2 年期多；比特币跌 54%，橙子公司 D 层覆盖从 3.3 倍降到约 1.5 倍；mNAV 跌破 1，飞轮就倒转。<strong>读任何新闻，先问“它动了哪几个观念”。</strong>",
        "Start with the three ★ headlines: the first sits almost entirely on ①, the second on ③, the third on ② and ④ — yet each tugs at least two ideas. Then drag the shock slider: the same 100-basis-point rise hurts a 30-year bond far more than a 2-year; a 54% bitcoin drop takes Orange Corp's D-layer coverage from 3.3x to about 1.5x; push mNAV below 1 and the flywheel reverses. <strong>For any headline, first ask which ideas it moves.</strong>"
      )}</p>
    </div>`;

  const $ = (s) => root.querySelector(s);

  const fmtShock = (h, v) => (h.shock.x ? fmtNum(v, 2) + "x" : h.shock.pct ? fmtNum(v, 2) + "%" : fmtNum(v, 0) + T(" 个基点", " bp"));

  const paintIdeas = () => {
    const h = H.find((x) => x.k === cur);
    root.querySelectorAll("#fi-pick button").forEach((b) => b.classList.toggle("active", b.dataset.h === cur));
    $("#fi-ideas").innerHTML = IDEAS.map((idea, i) => {
      const w = h.w[i];
      return `<div class="bar2" style="${w === 0 ? "opacity:.45" : ""}">
        <span class="lab"><b style="color:${idea.color}">${idea.n}</b> ${idea.name}</span>
        <div class="track"><div class="fill" style="width:${(w / 3) * 100}%;background:${idea.color}"></div></div>
        <span class="val">${"●".repeat(w)}${"○".repeat(3 - w)}</span></div>
        ${w > 0 && h.why[i] ? `<div class="demo-meta" style="margin:-2px 0 8px 0">${h.why[i]}</div>` : ""}`;
    }).join("");
    $("#fi-st").innerHTML = T("哪些阶段会解开它", "Stages that unpack it") + T("：", ": ") + "<b>" + h.st + "</b>";
    const sl = $("#fi-sl");
    sl.min = h.shock.min; sl.max = h.shock.max; sl.step = h.shock.step; sl.value = vals[cur];
  };

  const paintCalc = () => {
    const h = H.find((x) => x.k === cur), v = +vals[cur];
    $("#fi-sl-lab").innerHTML = T("③ 冲击滑块", "③ Shock slider") + T("：", ": ") + h.shock.label + T("：", ": ") + "<b>" + fmtShock(h, v) + "</b>";
    const r = h.calc(v);
    $("#fi-stats").innerHTML = r.stats.map(([k, val, cls]) => `<div class="stat"><div class="k">${k}</div><div class="v ${cls}">${val}</div></div>`).join("");
    const lit = h.w.map((w, i) => (w >= 2 ? IDEAS[i].n : "")).join("");
    $("#fi-log").innerHTML = `<div>${r.note}</div><div class="${lit.length > 1 ? "ok" : "warn"}">${T("这条新闻主要点亮", "This headline mainly lights up")}${T("：", ": ")}<b>${lit}</b>${T("——至少两个观念同时在场。", " — at least two ideas at once.")}</div>`;
  };

  root.querySelectorAll("#fi-pick button").forEach((b) => b.addEventListener("click", () => { cur = b.dataset.h; paintIdeas(); paintCalc(); }));
  $("#fi-sl").addEventListener("input", (e) => { vals[cur] = +e.target.value; paintCalc(); });

  paintIdeas();
  paintCalc();
}
