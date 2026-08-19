#!/usr/bin/env python3
"""Push every URL in the live sitemap to the Google Indexing API (non-browser).

Requires the bevita-seo service account (Owner of the Search Console property)
at ~/.bevita-gsc/service-account.json and the Web Search Indexing API enabled.

Usage:
    python3 scripts/google-index.py            # submit all sitemap URLs
    python3 scripts/google-index.py <url> ...   # submit specific URLs

Note: Google's Indexing API is officially for JobPosting/BroadcastEvent pages;
for general pages it acts as a crawl accelerator (not guaranteed). Daily quota
defaults to ~200 URLs. Pairs with Bing SubmitUrlBatch + sitemap resubmit.
"""
import json, base64, time, subprocess, urllib.request, urllib.parse, urllib.error, re, sys

KEY = "/Users/leonid.iakovlev/.bevita-gsc/service-account.json"
SITEMAP = "https://bevita.app/sitemap-0.xml"

def b64(x): return base64.urlsafe_b64encode(x).rstrip(b'=')

def get_token():
    d = json.load(open(KEY))
    now = int(time.time())
    si = b64(json.dumps({"alg": "RS256", "typ": "JWT"}).encode()) + b'.' + b64(json.dumps({
        "iss": d["client_email"],
        "scope": "https://www.googleapis.com/auth/indexing",
        "aud": "https://oauth2.googleapis.com/token",
        "iat": now, "exp": now + 3600,
    }).encode())
    open("/tmp/_gidx_key.pem", "w").write(d["private_key"])
    sig = b64(subprocess.run(["openssl", "dgst", "-sha256", "-sign", "/tmp/_gidx_key.pem"],
                             input=si, capture_output=True).stdout)
    jwt = (si + b'.' + sig).decode()
    subprocess.run(["rm", "-f", "/tmp/_gidx_key.pem"])
    return json.load(urllib.request.urlopen(
        "https://oauth2.googleapis.com/token",
        data=urllib.parse.urlencode({
            "grant_type": "urn:ietf:params:oauth:grant-type:jwt-bearer",
            "assertion": jwt,
        }).encode()))["access_token"]

def urls():
    if len(sys.argv) > 1:
        return sys.argv[1:]
    sm = urllib.request.urlopen(SITEMAP).read().decode()
    return re.findall(r'<loc>(https://bevita\.app/[^<]*)</loc>', sm)

def main():
    tok = get_token()
    ok = fail = 0
    for u in urls():
        body = json.dumps({"url": u, "type": "URL_UPDATED"}).encode()
        req = urllib.request.Request(
            "https://indexing.googleapis.com/v3/urlNotifications:publish",
            data=body,
            headers={"Authorization": "Bearer " + tok, "Content-Type": "application/json"},
            method="POST")
        try:
            urllib.request.urlopen(req); ok += 1; print("OK ", u)
        except urllib.error.HTTPError as e:
            fail += 1; print("ERR", e.code, u, e.read().decode()[:120])
        time.sleep(0.15)
    print(f"\n=== Google Indexing API submitted OK:{ok} FAIL:{fail} ===")

if __name__ == "__main__":
    main()
