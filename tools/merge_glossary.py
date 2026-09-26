# -*- coding: utf-8 -*-
"""Merge content/glossary-proposals/*.json into content/glossary.js (dedupe by canonical names; stage order wins).
Usage: python tools/merge_glossary.py"""
import glob, io, json, os, re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PROP = os.path.join(ROOT, "content", "glossary-proposals")

def stage_key(p):
    m = re.search(r"stage(\d+|Inf)\.json$", p)
    return 999 if m.group(1) == "Inf" else int(m.group(1))

# 太泛的中文/英文词会在全文乱开花，直接丢掉
TOO_GENERIC_ZH = {"价格", "市场", "利率", "收益", "风险", "资产", "货币", "银行", "股票", "债券", "杠杆", "价值", "通胀", "比特币"}
# 有歧义的别名：回购 同时指“股票回购”与“回购协议”；basis 会误中 cost basis；价差 太泛
AMBIGUOUS = {"回购", "价差", "basis", "spread", "spreads", "premium", "coverage", "rating", "yield curve inversion"}
TOO_GENERIC_EN = {"price", "market", "rate", "yield", "risk", "asset", "money", "bank", "stock", "bond", "leverage", "value", "bitcoin", "Bitcoin", "inflation"}

def main():
    seen_zh, seen_en, out, skipped = set(), set(), [], 0
    for p in sorted(glob.glob(os.path.join(PROP, "*.json")), key=stage_key):
        try:
            items = json.load(io.open(p, encoding="utf-8"))
        except Exception as e:
            print("BAD JSON", p, e); continue
        for it in items:
            try:
                zn = [n for n in it["zh"]["n"] if n and n not in TOO_GENERIC_ZH and n not in AMBIGUOUS and len(n) >= 2]
                en = [n for n in it["en"]["n"] if n and n not in TOO_GENERIC_EN and n not in AMBIGUOUS and len(n) >= 3]
                zd, ed = it["zh"]["d"].strip(), it["en"]["d"].strip()
            except Exception:
                skipped += 1; continue
            if not zn or not en or not zd or not ed:
                skipped += 1; continue
            if zn[0] in seen_zh or en[0].lower() in seen_en:
                skipped += 1; continue
            # 别名若已被别的条目占用就去掉，避免同一个词匹配两张卡
            zn = [n for n in zn if n not in seen_zh]
            en = [n for n in en if n.lower() not in seen_en]
            seen_zh.update(zn); seen_en.update(n.lower() for n in en)
            out.append({"zh": {"n": zn, "d": zd}, "en": {"n": en, "d": ed}, "_src": os.path.basename(p)})
    lines = ["// 知识小卡片 —— 双语术语表。课程正文里出现这些关键概念时，渲染器会自动给它加一条虚线下划线，hover / 聚焦弹出释义卡。",
             "// 每个条目：{ zh:{n:[匹配词…], d:释义 }, en:{…} }；n[0] 为卡片标题，其余为别名。ASCII 词按词边界大小写精确匹配，中文按子串匹配。",
             "// 由 tools/merge_glossary.py 从 content/glossary-proposals/*.json 合并生成；改完 bump glossary.js?v 与 app.js?v。",
             "", "export const GLOSSARY = ["]
    src = None
    for e in out:
        if e["_src"] != src:
            src = e["_src"]; lines.append("  // —— %s ——" % src.replace(".json", ""))
        lines.append("  { zh:%s,\n    en:%s }," % (json.dumps(e["zh"], ensure_ascii=False), json.dumps(e["en"], ensure_ascii=False)))
    lines.append("];\n")
    io.open(os.path.join(ROOT, "content", "glossary.js"), "w", encoding="utf-8").write("\n".join(lines))
    print("terms:", len(out), "skipped:", skipped)

if __name__ == "__main__":
    main()
