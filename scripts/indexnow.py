#!/usr/bin/env python3
"""Push URLs to IndexNow (Bing, Yandex, Seznam, Naver share one endpoint).

Why this exists: Google's Indexing API returns 200 for general content pages but does
NOT act on them (officially JobPosting/BroadcastEvent only) — we pushed 76 URLs on
2026-08-04 and every one stayed "URL is unknown to Google". IndexNow is the protocol
that actually works for Bing/Yandex, and it's the only push channel we have that does.

Setup already done: the key file lives at public/<KEY>.txt and must be reachable at
https://bevita.app/<KEY>.txt for submissions to be accepted.

Usage:
    python3 scripts/indexnow.py                 # submit every URL in the live sitemap
    python3 scripts/indexnow.py <url> ...       # submit specific URLs
"""
import json
import sys
import re
import urllib.request
import urllib.error

KEY = "8d9084c33d266474775e1c63566b7de5"
HOST = "bevita.app"
SITEMAP = f"https://{HOST}/sitemap-0.xml"
ENDPOINT = "https://api.indexnow.org/indexnow"


def sitemap_urls():
    xml = urllib.request.urlopen(SITEMAP, timeout=30).read().decode()
    return re.findall(r"<loc>(.*?)</loc>", xml)


def verify_key():
    """IndexNow rejects the batch if the key file isn't publicly readable."""
    try:
        got = urllib.request.urlopen(f"https://{HOST}/{KEY}.txt", timeout=20).read().decode().strip()
    except urllib.error.HTTPError as e:
        return False, f"key file returned HTTP {e.code} — deploy it before submitting"
    return (got == KEY), f"key file contains {got!r}, expected {KEY!r}"


def submit(urls):
    payload = json.dumps({
        "host": HOST,
        "key": KEY,
        "keyLocation": f"https://{HOST}/{KEY}.txt",
        "urlList": urls,
    }).encode()
    req = urllib.request.Request(
        ENDPOINT, data=payload, headers={"Content-Type": "application/json; charset=utf-8"}
    )
    try:
        r = urllib.request.urlopen(req, timeout=60)
        return r.status, r.read().decode()[:200]
    except urllib.error.HTTPError as e:
        return e.code, e.read().decode()[:200]


def main():
    ok, msg = verify_key()
    if not ok:
        print(f"ABORT: {msg}")
        sys.exit(1)
    print(f"key verified at https://{HOST}/{KEY}.txt")

    urls = sys.argv[1:] or sitemap_urls()
    # IndexNow accepts up to 10 000 per request; we're nowhere near that.
    print(f"submitting {len(urls)} urls")
    status, body = submit(urls)
    # 200 = accepted, 202 = accepted, key validation pending.
    verdict = "OK" if status in (200, 202) else "FAILED"
    print(f"{verdict}  HTTP {status}  {body}")
    sys.exit(0 if status in (200, 202) else 1)


if __name__ == "__main__":
    main()
