"""Lesson QA: python tools/check.py <lesson-id> [<lesson-id> ...]  (run from the project root)
Checks zh + en lesson files and the demo: module imports, lengths, structure, quiz sanity, xrefs, figure, demo API.
Exit code 1 if any check fails."""
import io, json, os, re, subprocess, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.chdir(ROOT)

def node_import(path):
    r = subprocess.run(["node", "-e", "import('./%s').then(m=>{console.log(JSON.stringify(Object.keys(m.default||{})))}).catch(e=>{console.error(String(e));process.exit(2)})" % path.replace("\\", "/")],
                       capture_output=True, text=True, encoding="utf-8")
    return r.returncode == 0, (r.stdout + r.stderr).strip()

def node_eval_lesson(path):
    r = subprocess.run(["node", "-e", "import('./%s').then(m=>{const d=m.default;console.log(JSON.stringify({id:d.id,title:d.title,demo:d.demo,stage:d.stage,order:d.order,difficulty:d.difficulty,prereqs:d.prereqs,quiz:(d.quiz||[]).map(q=>({n:q.options.length,a:q.answer,hasExplain:!!q.explain})),miscon:(d.misconceptions||[]).length,further:(d.further||[]).length,lens:{oneLiner:(d.oneLiner||'').length,intuition:(d.intuition||'').length,mechanics:(d.mechanics||'').length,analogy:(d.analogy||'').length},figs:((d.mechanics||'').match(/<figure>/g)||[]).length,pm:((d.mechanics||'').match(/<table class=\"pm\"/g)||[]).length,subheads:((d.mechanics||'').match(/^### /gm)||[]).length,map:((d.intuition||'').match(/^- \\*\\*[①②③④⑤⑥]/gm)||[]).length,xrefs:((d.intuition+d.mechanics+d.analogy).match(/(阶段|Stage)\\s*(\\d+|∞)\\.\\d+/g)||[]).length,cssvars:((d.mechanics||'').match(/#[0-9a-fA-F]{3,6}\\b/g)||[]).length}))}).catch(e=>{console.error(String(e));process.exit(2)})" % path.replace("\\", "/")],
                       capture_output=True, text=True, encoding="utf-8")
    if r.returncode != 0:
        return None, (r.stdout + r.stderr).strip()
    return json.loads(r.stdout.strip().splitlines()[-1]), ""

def manifest_lookup(lid):
    s = io.open("content/manifest.js", encoding="utf-8").read()
    m = re.search(r'\{ id: "%s", title: "([^"]+)", titleEn: "([^"]+)", module: "([^"]+)"' % re.escape(lid), s)
    if not m: return None
    # stage number: find the nearest preceding "n: X"
    pre = s[:m.start()]
    sn = re.findall(r'n: ("∞"|\d+), tier: "(\w+)"', pre)[-1]
    stage_n, tier = (sn[0].strip('"'), sn[1])
    stage_block_start = pre.rfind("lessons: [")
    order = len(re.findall(r'\{ id: "', s[stage_block_start:m.start()])) + 1
    return {"title": m.group(1), "titleEn": m.group(2), "module": m.group(3), "stage": stage_n, "tier": tier, "order": order}

def check(lid):
    probs = []
    info = manifest_lookup(lid)
    if not info:
        return ["%s: not in manifest" % lid]
    zh = info["module"].replace("./", "")
    en = zh.replace("content/lessons/", "content/lessons/en/")
    for lang, path, min_prose, title_key in (("zh", zh, 6000, "title"), ("en", en, 9000, "titleEn")):
        if not os.path.exists(path):
            probs.append("%s [%s]: missing file %s" % (lid, lang, path)); continue
        raw = io.open(path, encoding="utf-8").read()
        d, err = node_eval_lesson(path)
        if d is None:
            probs.append("%s [%s]: import failed: %s" % (lid, lang, err[:300])); continue
        if d["id"] != lid: probs.append("%s [%s]: id mismatch (%s)" % (lid, lang, d["id"]))
        if d["title"] != info[title_key]: probs.append("%s [%s]: title differs from manifest:\n    lesson:   %s\n    manifest: %s" % (lid, lang, d["title"], info[title_key]))
        if str(d["stage"]) != info["stage"] and not (info["stage"] == "∞" and d["stage"] in ("∞", "Inf", "inf", 20)): probs.append("%s [%s]: stage %s != manifest %s" % (lid, lang, d["stage"], info["stage"]))
        if d["order"] != info["order"]: probs.append("%s [%s]: order %s != manifest position %s" % (lid, lang, d["order"], info["order"]))
        if d["difficulty"] != info["tier"]: probs.append("%s [%s]: difficulty '%s' should be tier id '%s'" % (lid, lang, d["difficulty"], info["tier"]))
        prose = d["lens"]["intuition"] + d["lens"]["mechanics"] + d["lens"]["analogy"]
        if prose < min_prose: probs.append("%s [%s]: prose too short: %d chars (min %d) %s" % (lid, lang, prose, min_prose, d["lens"]))
        if d["lens"]["oneLiner"] < 80: probs.append("%s [%s]: oneLiner too short" % (lid, lang))
        if d["figs"] < 1: probs.append("%s [%s]: no <figure> SVG in mechanics" % (lid, lang))
        if d["cssvars"] > 0: probs.append("%s [%s]: hard-coded hex colors in mechanics (%d) — use CSS variables" % (lid, lang, d["cssvars"]))
        if not (4 <= d["subheads"] <= 6): probs.append("%s [%s]: mechanics has %d ### subheads (need 4–6)" % (lid, lang, d["subheads"]))
        if d["map"] != d["subheads"]: probs.append("%s [%s]: intuition map has %d ①② items but mechanics has %d subheads" % (lid, lang, d["map"], d["subheads"]))
        if d["xrefs"] < 3: probs.append("%s [%s]: only %d cross-references (need ≥3 '阶段 X.Y' / 'Stage X.Y')" % (lid, lang, d["xrefs"]))
        if not (4 <= d["miscon"] <= 6): probs.append("%s [%s]: %d misconceptions (need 4–5)" % (lid, lang, d["miscon"]))
        if not (4 <= len(d["quiz"]) <= 6): probs.append("%s [%s]: %d quiz questions (need 4–5)" % (lid, lang, len(d["quiz"])))
        for i, q in enumerate(d["quiz"]):
            if q["n"] != 4: probs.append("%s [%s]: quiz %d has %d options (need 4)" % (lid, lang, i + 1, q["n"]))
            if not (isinstance(q["a"], int) and 0 <= q["a"] < q["n"]): probs.append("%s [%s]: quiz %d answer index invalid" % (lid, lang, i + 1))
            if not q["hasExplain"]: probs.append("%s [%s]: quiz %d lacks explain" % (lid, lang, i + 1))
        answers = [q["a"] for q in d["quiz"]]
        if len(set(answers)) < 3: probs.append("%s [%s]: quiz answers not shuffled enough %s" % (lid, lang, answers))
        if not (3 <= d["further"] <= 6): probs.append("%s [%s]: %d further links (need 3–5)" % (lid, lang, d["further"]))
        if lang == "en":
            if re.search(r"[一-鿿]", re.sub(r"further:.*", "", raw, flags=re.S)): probs.append("%s [en]: Chinese characters found in English lesson body" % lid)
            if "阶段 " in raw: probs.append("%s [en]: uses '阶段 X.Y' — must be 'Stage X.Y'" % lid)
        else:
            if re.search(r"Stage\s+\d+\.\d+", raw): probs.append("%s [zh]: uses 'Stage X.Y' — must be '阶段 X.Y'" % lid)
        demo = d["demo"]
        if not demo: probs.append("%s [%s]: no demo" % (lid, lang))
        else:
            dp = "demos/%s.js" % demo
            if not os.path.exists(dp): probs.append("%s: demo file missing: %s" % (lid, dp))
            elif lang == "zh":
                ds = io.open(dp, encoding="utf-8").read()
                ok, out = node_import(dp)
                if not ok: probs.append("%s: demo import failed: %s" % (lid, out[:300]))
                if "export default function mount" not in ds and "export default (root, lang)" not in ds: probs.append("%s: demo must 'export default function mount(root, lang)'" % lid)
                if "demo-tip" not in ds: probs.append("%s: demo lacks .demo-tip" % lid)
                if 'lang === "en"' not in ds and "lang==='en'" not in ds and 'lang == "en"' not in ds: probs.append("%s: demo not bilingual (no lang === \"en\")" % lid)
                if re.search(r"#[0-9a-fA-F]{6}\b", ds): probs.append("%s: demo has hard-coded hex colors — use CSS variables" % lid)
    return probs

if __name__ == "__main__":
    ids = sys.argv[1:]
    if not ids:
        s = io.open("content/manifest.js", encoding="utf-8").read()
        ids = re.findall(r'\{ id: "([^"]+)", title:', s)
    bad = 0
    for lid in ids:
        p = check(lid)
        if p:
            bad += 1
            print("FAIL", lid); [print("   -", x) for x in p]
        else:
            print("OK  ", lid)
    print("\n%d checked, %d failing" % (len(ids), bad))
    sys.exit(1 if bad else 0)
