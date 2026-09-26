// 交互演示：美元环游世界 + 美元荒压力测试。
// 上半部分：一位美国消费者付出 100 美元买进口商品，选择这 100 美元在海外的去向（国债 / 欧洲美元 / 稳定币 / 换成本币），
// 逐步看“谁的资产负债表上多了一张什么索取权”，以及最后如何回流到美国。
// 下半部分：一家境外银行用短期美元存款支撑长期美元资产（10 年期、票息 5% 的美国国债，按 _fin.js bondPrice 定价），
// 恐慌时存款被提走、收益率跳升；比较“在市场上抛售国债”与“通过本国央行的互换额度借美元”两种应对的损失。数字均为示意。
import { bondPrice, fmtPct, fmtNum, fmtUsd, tex } from "./_fin.js";

export default function mount(root, lang) {
  const en = lang === "en";
  const T = (zh, e) => (en ? e : zh);
  const C = T("：", ": ");

  const PATHS = {
    ust: {
      n: T("存进储备：买美国国债", "Park it in reserves: buy Treasuries"),
      steps: [
        [T("日本出口商", "Japanese exporter"), T("收到 100 美元货款，卖给本国银行换日元。", "receives the $100 and sells it to its bank for yen."), T("出口商：+日元存款", "Exporter: +yen deposit")],
        [T("日本的银行 / 央行", "Japanese bank / central bank"), T("手上多了 100 美元，买入美国国库券。", "now holds $100 and buys US Treasury bills."), T("日本：+100 美元美国国债", "Japan: +$100 of US Treasuries")],
        [T("美国财政部", "US Treasury"), T("用这 100 美元为赤字融资（阶段 3.3）。", "uses the $100 to finance the deficit (Stage 3.3)."), T("财政部：+100 美元国债负债", "Treasury: +$100 of debt liabilities")],
      ],
      end: T("美元回流美国，变成外国对美国政府的索取权。", "The dollar returns to the US as a foreign claim on the US government. ") + tex(String.raw`\text{${T("贸易逆差", "Trade deficit")}} = \text{${T("资本流入", "capital inflow")}}`) + T("。", "."),
    },
    euro: {
      n: T("留在海外：欧洲美元存款", "Keep it offshore: a eurodollar deposit"),
      steps: [
        [T("德国出口商", "German exporter"), T("把 100 美元存进伦敦一家银行的美元账户。", "deposits the $100 in a dollar account at a London bank."), T("出口商：+100 美元境外存款", "Exporter: +$100 offshore deposit")],
        [T("伦敦的银行", "London bank"), T("把这 100 美元贷给一家巴西企业，期限 3 年。", "lends the $100 to a Brazilian company for 3 years."), T("银行：+100 美元贷款 / +100 美元短期存款负债", "Bank: +$100 loan / +$100 short-term deposit liability")],
        [T("巴西企业", "Brazilian company"), T("用美元付给美国的设备供应商。", "pays a US equipment supplier in dollars."), T("巴西企业：+100 美元债务（收入却是雷亚尔）", "Company: +$100 dollar debt (but revenue in reais)")],
      ],
      end: T("美元在境外被“再创造”了一遍，但伦敦的银行存在期限错配，而且不能直接找美联储借钱——危机时就是美元荒的源头。", "The dollar gets re-lent offshore, but the London bank has a maturity mismatch and can't borrow from the Fed directly — the seed of a dollar shortage in a crisis."),
    },
    stable: {
      n: T("上链：换成美元稳定币", "Go on-chain: swap into a dollar stablecoin"),
      steps: [
        [T("阿根廷的一家小商户", "A small Argentine merchant"), T("收到 100 美元后换成 100 枚美元稳定币，存进手机钱包。", "swaps the $100 for 100 dollar stablecoins in a phone wallet."), T("商户：+100 枚稳定币（对发行方的索取权）", "Merchant: +100 stablecoins (a claim on the issuer)")],
        [T("稳定币发行方", "Stablecoin issuer"), T("收到 100 美元，按储备规则买入短期美国国库券。", "receives $100 and, under reserve rules, buys short US T-bills."), T("发行方：+100 美元国库券 / +100 美元代币负债", "Issuer: +$100 T-bills / +$100 token liabilities")],
        [T("商户", "Merchant"), T("7×24 小时把稳定币转给海外供应商，几秒到账。", "sends the stablecoins to an overseas supplier 24/7, settled in seconds."), T("供应商：+100 枚稳定币", "Supplier: +100 stablecoins")],
      ],
      end: T("美元通过区块链流到街头，储备又回到美国国库券——稳定币既扩展了美元，也成了国库券的买家（阶段 13.2）。", "The dollar reaches the street via blockchain while its reserves flow back into US T-bills — stablecoins both extend the dollar and buy Treasury bills (Stage 13.2)."),
    },
    fx: {
      n: T("换回本币：卖出美元", "Convert home: sell the dollars"),
      steps: [
        [T("韩国出口商", "Korean exporter"), T("在外汇市场把 100 美元卖掉换韩元。", "sells the $100 for won in the FX market."), T("出口商：+韩元", "Exporter: +won")],
        [T("外汇市场的买方", "The buyer in the FX market"), T("某位投资者用韩元买下这 100 美元——美元并没有消失，只是换了主人。", "an investor buys the $100 with won — the dollars don't vanish, they change owners."), T("买方：+100 美元", "Buyer: +$100")],
        [T("这位买方", "That buyer"), T("最终仍要持有美元资产：存款、国债、股票，或花在美国商品上。", "must still hold a dollar asset — a deposit, Treasuries, stocks — or spend it on US goods."), T("某人：+100 美元的美国资产", "Someone: +$100 of US assets")],
      ],
      end: T("卖美元的压力会让美元走弱，但只要美国有经常账户逆差，总会有人最终持有这些美元索取权——价格（汇率）调整到有人愿意为止。", "Selling pressure weakens the dollar, but as long as the US runs a current account deficit, someone must end up holding those dollar claims — the price (exchange rate) adjusts until someone will."),
    },
  };
  let path = "ust", step = 0, swap = true;

  root.innerHTML = `
    <div class="demo">
      <div class="demo-head">${T("🌍 跟着一美元环游世界，再做一次美元荒压力测试", "🌍 Follow a dollar around the world, then stress-test a dollar shortage")}</div>
      <div class="demo-label">${T("第一部分 · 一位美国消费者花 100 美元买了进口商品。这 100 美元去哪了？", "Part 1 · A US consumer spends $100 on imported goods. Where does the $100 go?")}</div>
      <div class="demo-btns" id="dsy-paths">
        ${Object.entries(PATHS).map(([k, p]) => `<button class="demo-btn ${k === path ? "active" : ""}" data-k="${k}">${p.n}</button>`).join("")}
      </div>
      <div class="tl" id="dsy-tl"></div>
      <div class="demo-btns"><button class="demo-btn" id="dsy-next">${T("下一步 →", "Next step →")}</button><button class="demo-btn" id="dsy-reset">${T("重来", "Restart")}</button></div>
      <div class="demo-log" id="dsy-end"></div>

      <div class="demo-label" style="margin-top:18px">${T("第二部分 · 境外银行的美元荒压力测试（示意）", "Part 2 · Dollar-shortage stress test for an offshore bank (illustrative)")}</div>
      <div class="demo-meta">${T("资产：100 亿美元的 10 年期、票息 5% 美国国债（按 5% 收益率定价，平价）。负债：90 亿美元短期美元存款 + 10 亿美元股本。", "Assets: $10B of 10-year, 5%-coupon US Treasuries (priced at a 5% yield, i.e. par). Liabilities: $9B of short-term dollar deposits + $1B of equity.")}</div>
      <div class="demo-grid">
        <div><label class="demo-label">${T("恐慌中被提走的美元存款比例", "Share of dollar deposits withdrawn in the panic")}${C}<b id="dsy-w-v"></b></label><input class="demo-slider" type="range" id="dsy-w" min="0" max="80" step="5" value="40"></div>
        <div><label class="demo-label">${T("抛售时 10 年期收益率跳升", "Jump in the 10-year yield during the fire sale")}${C}<b id="dsy-j-v"></b></label><input class="demo-slider" type="range" id="dsy-j" min="0" max="200" step="10" value="80"></div>
      </div>
      <div class="demo-block">
        <label class="demo-label">${T("本国央行能否通过美联储互换额度提供美元？", "Can the home central bank supply dollars via a Fed swap line?")}</label>
        <div class="demo-seg" id="dsy-swap">
          <button data-s="1" class="on">${T("能：借美元，不必抛售", "Yes: borrow dollars, no fire sale")}</button>
          <button data-s="0">${T("不能：只能在市场上卖国债", "No: must sell Treasuries in the market")}</button>
        </div>
      </div>
      <div class="cmp" id="dsy-cmp"></div>
      <div class="demo-log" id="dsy-log"></div>
      <p class="demo-tip">${T(
        "第一部分里把四条路径都走一遍：<strong>无论美元走哪条路，最后总有人在资产负债表上持有一张对美国的索取权</strong>——这就是 " + tex(String.raw`\text{${T("贸易逆差", "trade deficit")}} = \text{${T("资本流入", "capital inflow")}}`) + "。第二部分先把提款比例拉到 60%、收益率跳升拉到 150 个基点，切换互换额度的“能 / 不能”：同一家银行，有没有最后贷款人，结局天差地别。",
        "In Part 1, walk all four paths: <strong>whichever way the dollar goes, someone ends up holding a claim on the US on their balance sheet</strong> — that's " + tex(String.raw`\text{${T("贸易逆差", "trade deficit")}} = \text{${T("资本流入", "capital inflow")}}`) + ". In Part 2, set withdrawals to 60% and the yield jump to 150 bp, then toggle the swap line: same bank, and whether a lender of last resort exists makes all the difference."
      )}</p>
    </div>`;

  const $ = (s) => root.querySelector(s);

  const paintPath = () => {
    const p = PATHS[path];
    $("#dsy-tl").innerHTML = p.steps.map(([who, what, bs], i) => `
      <div class="tl-item" style="${i > step ? "opacity:.3" : ""}">
        <div class="when">${T("第 ", "Step ")}${i + 1}${T(" 步", "")} · ${who}</div>
        <div>${what}</div>
        <div class="demo-meta">${T("资产负债表", "Balance sheet")}${C}<b>${bs}</b></div>
      </div>`).join("");
    $("#dsy-end").innerHTML = step >= p.steps.length - 1 ? `<div class="ok">${p.end}</div>` : `<div>${T("点击“下一步”继续跟踪这 100 美元。", "Click \"Next step\" to keep following the $100.")}</div>`;
  };

  const paintStress = () => {
    const w = +$("#dsy-w").value / 100, j = +$("#dsy-j").value / 10000;
    $("#dsy-w-v").textContent = fmtPct(w, 0);
    $("#dsy-j-v").textContent = fmtNum(j * 10000, 0) + " bp";
    const assetsFace = 10e9, deposits = 9e9, equity0 = 1e9;
    const need = deposits * w;                                   // 需要付出的美元
    const px = bondPrice(100, 0.05, 0.05 + j, 10) / 100;          // 抛售时每 1 美元面值的价格
    // 情形 A：没有互换额度，按压力价格卖国债
    const faceSold = Math.min(assetsFace, need / px);
    const lossA = faceSold * (1 - px);
    const markLossRest = (assetsFace - faceSold) * (1 - px);      // 剩余持仓的账面损失
    const equityA = equity0 - lossA - markLossRest;
    // 情形 B：互换额度借美元（示意：3 个月，年化成本 = 5% + 0.25% 溢价），不抛售，价格之后恢复
    const swapCost = need * 0.0525 * 0.25;
    const equityB = equity0 - swapCost;

    const cell = (title, cls, rows) => `<div class="cmp-cell ${cls}"><h5>${title}</h5>${rows.map(([k, v]) => `<div class="demo-meta">${k}${C}<b>${v}</b></div>`).join("")}</div>`;
    $("#dsy-cmp").innerHTML =
      cell(T("A：在市场上抛售国债", "A: sell Treasuries into the market"), swap ? "cold" : "hl", [
        [T("需要的美元", "Dollars needed"), fmtUsd(need / 1e9, 2) + "B"],
        [T("抛售价格（每 100 面值）", "Fire-sale price (per 100 face)"), fmtNum(px * 100, 2)],
        [T("已实现损失", "Realized loss"), fmtUsd(lossA / 1e9, 2) + "B"],
        [T("剩余持仓账面损失", "Mark-to-market loss on the rest"), fmtUsd(markLossRest / 1e9, 2) + "B"],
        [T("剩余股本", "Equity left"), fmtUsd(equityA / 1e9, 2) + "B"],
      ]) +
      cell(T("B：通过互换额度借美元", "B: borrow dollars via the swap line"), swap ? "hl" : "cold", [
        [T("需要的美元", "Dollars needed"), fmtUsd(need / 1e9, 2) + "B"],
        [T("3 个月借款成本（示意 5.25%）", "3-month borrowing cost (illustrative 5.25%)"), fmtUsd(swapCost / 1e9, 3) + "B"],
        [T("被迫抛售", "Forced sales"), T("无", "None")],
        [T("剩余股本", "Equity left"), fmtUsd(equityB / 1e9, 2) + "B"],
      ]);

    const lines = [];
    if (!swap) {
      if (equityA <= 0) lines.push(`<span class="bad">${T("股本被打穿：银行资不抵债。它的抛售又会压低国债价格，传染给其他持有者——这就是 2020 年 3 月美联储必须出手的原因（阶段 10.3）。", "Equity wiped out: the bank is insolvent. Its fire sale pushes Treasury prices down further and spreads to other holders — why the Fed had to step in in March 2020 (Stage 10.3).")}</span>`);
      else lines.push(`<span class="warn">${T("银行活下来了，但股本损失", "The bank survives, but loses")} ${fmtPct(1 - equityA / equity0, 0)}${T("；它的抛售还在给整个市场加压。", " of its equity, and its selling adds pressure on the whole market.")}</span>`);
    } else {
      lines.push(`<span class="ok">${T("有最后贷款人：银行只付一点利息，不必贱卖国债，市场价格也不会被它进一步打压。这就是互换额度与 FIMA 回购的意义（观念③）。", "With a lender of last resort, the bank pays a bit of interest, avoids dumping Treasuries, and doesn't push prices down further. That's the point of swap lines and the FIMA repo facility (Idea ③).")}</span>`);
    }
    lines.push(`${T("收益率上升", "A yield rise of")} ${fmtNum(j * 10000, 0)} bp ${T("让 10 年期国债价格下跌", "cuts the 10-year Treasury's price by")} ${fmtPct(1 - px, 1)}${T("——期限越长，抛售的代价越大（阶段 4.4）。", " — the longer the maturity, the costlier a fire sale (Stage 4.4).")}`);
    $("#dsy-log").innerHTML = lines.map((l) => `<div>${l}</div>`).join("");
  };

  root.querySelectorAll("#dsy-paths button").forEach((b) => b.addEventListener("click", () => {
    path = b.dataset.k; step = 0;
    root.querySelectorAll("#dsy-paths button").forEach((x) => x.classList.toggle("active", x === b));
    paintPath();
  }));
  $("#dsy-next").addEventListener("click", () => { step = Math.min(PATHS[path].steps.length - 1, step + 1); paintPath(); });
  $("#dsy-reset").addEventListener("click", () => { step = 0; paintPath(); });
  root.querySelectorAll("#dsy-swap button").forEach((b) => b.addEventListener("click", () => {
    swap = b.dataset.s === "1";
    root.querySelectorAll("#dsy-swap button").forEach((x) => x.classList.toggle("on", x === b));
    paintStress();
  }));
  ["#dsy-w", "#dsy-j"].forEach((id) => $(id).addEventListener("input", paintStress));
  paintPath();
  paintStress();
}
