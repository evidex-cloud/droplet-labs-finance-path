"""Check every `further` URL in all lessons. Usage: python tools/check_links.py  -> prints non-2xx/3xx results."""
import glob, io, re, os, sys, concurrent.futures, urllib.request, ssl
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
urls = {}
for f in glob.glob(os.path.join(ROOT, "content/lessons/**/*.js"), recursive=True):
    s = io.open(f, encoding="utf-8").read()
    part = s[s.find("further"):] if "further" in s else ""
    for u in re.findall(r'url:\s*"(https?://[^"]+)"', part):
        urls.setdefault(u, set()).add(os.path.basename(f))
ctx = ssl.create_default_context()
def probe(u):
    req = urllib.request.Request(u, headers={"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/126 Safari/537.36", "Accept": "text/html,*/*"})
    try:
        with urllib.request.urlopen(req, timeout=20, context=ctx) as r: return u, r.status
    except urllib.error.HTTPError as e: return u, e.code
    except Exception as e: return u, type(e).__name__
with concurrent.futures.ThreadPoolExecutor(16) as ex:
    res = list(ex.map(probe, urls))
bad = [(u, c) for u, c in res if not (isinstance(c, int) and c < 400)]
for u, c in sorted(bad, key=lambda x: str(x[1])):
    print(c, u, "<-", ", ".join(sorted(urls[u]))[:120])
print("\n%d unique urls, %d not OK" % (len(urls), len(bad)))
