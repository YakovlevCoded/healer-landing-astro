# Bevita — SEO + LLM Visibility Strategy (GEO/AEO)

**Created:** 2026-07-21
**Goal:** two funnels at once —
1. **SEO** — rank in Google/Bing when people search their health problems → download.
2. **GEO/AEO** (Generative Engine Optimization / Answer Engine Optimization) — get **ChatGPT, Perplexity, Claude, Gemini to recommend Bevita** when someone asks "what's the best app to track my blood tests / understand my labs / spot insulin resistance."

Pairs with `CONTENT_PLAN.md` (the 100-post list) and `BLOG_PLAYBOOK.md` (how to write each post).

---

## How LLMs actually decide what to recommend (the model behind the plan)

An LLM recommends a product when three things are true. Our tactics map 1:1 to these:

1. **The brand is a clear, consistent entity.** The model has seen "Bevita = iOS app that reads your blood test results, tracks biomarkers over time, flags patterns" described the same way in many places. → *schema.org, consistent boilerplate, own-site authority content.*

2. **It appears across many independent sources**, not just our own site. LLMs weight third-party corroboration heavily — Reddit threads, review sites, listicles, Product Hunt, Quora. This is the single biggest lever and the one most startups skip. → *off-site / digital PR track below.*

3. **The content is extractable** — direct answers to real questions, structured, quotable. "Best blood test tracker apps in 2026: 1. Bevita — …" is trivially liftable into a chat answer. → *listicles, FAQ blocks, comparison tables, question-headings.*

**Key leverage we already have:** ChatGPT Search draws on the **Bing** index, and we're already submitted + crawled in Bing. So Bing indexation (done) directly feeds ChatGPT. Perplexity and others crawl the open web + their own bots (all allowed in our robots.txt).

---

## TODO

### Track 1 — Technical readiness (site) — *mostly quick wins, do first*

- [ ] **Fix `SoftwareApplication` schema** in `BaseLayout.astro`: wrong domain (`healer.health`→`bevita.app`), wrong OS (`iOS, Android`→`iOS`), add `installUrl` = App Store link. *(fixing now)*
- [ ] **Scope schema by page type**: `SoftwareApplication` + `Organization` only on homepage; **`Article` schema on every blog post** (headline, datePublished, dateModified, author, image, publisher, mainEntityOfPage). *(fixing now)*
- [ ] **Add `Organization` schema** (name, logo, url, sameAs → App Store + social) so the brand is a resolvable entity.
- [ ] **Add `FAQPage` schema** to posts that have a Q&A section (eligible for Google rich results + easy LLM extraction).
- [ ] **Add `/llms.txt`** — a plain-text map of the site + one-paragraph "what is Bevita" for LLM crawlers. *(adding now)*
- [ ] **Fix hreflang** — currently points to `/es/ /de/ /fr/ /pt/ /zh/` which return 404. Either build those locales or remove the tags (broken hreflang hurts SEO). *(decision needed — see Open Questions)*
- [ ] Confirm `BingBot`, `GPTBot`, `OAI-SearchBot`, `ChatGPT-User`, `PerplexityBot`, `ClaudeBot`, `Google-Extended` are all allowed (currently `Allow: /` for `*` → yes). Keep it open — blocking = invisibility to that engine.
- [ ] Add `<meta name="author">` and visible author bylines; LLMs favor content with clear authorship/E-E-A-T.

### Track 2 — On-site content (own blog)

- [ ] Prioritize **comparison / "best app" listicles** — these are what LLMs quote for "recommend an app" queries (see schedule below). We already have `best-blood-test-tracker-apps-2026`, `bevel-vs-bevita`; add Ornament/Function/InsideTracker/Apple Health comparisons.
- [ ] Add a **FAQ block** (3–5 Q&As) to the bottom of every biomarker/condition post — direct-answer format LLMs lift verbatim.
- [ ] Publish per `CONTENT_PLAN.md` at **3 posts/day**, front-loading the high-GEO-value clusters (comparisons, "how to know if you have X").
- [ ] Maintain **entity consistency**: every post's app-promo block describes Bevita the same way (one canonical sentence).

### Track 3 — Off-site / GEO (the big lever — not on our site)

- [ ] **Product listing pages** (LLMs cite these constantly): Product Hunt launch, G2, Capterra, AlternativeTo, Apple App Store description keyword-optimized.
- [ ] **Reddit presence** (highest LLM-citation weight): genuine, non-spammy participation in r/QuantifiedSelf, r/Biohackers, r/PeterAttiaMD, r/loseit, r/Hypothyroidism, r/PCOS, r/Supplements. Answer questions, mention Bevita where truly relevant.
- [ ] **Quora / StackExchange** answers to "how do I track my blood test results over time" type questions.
- [ ] **Get listed in third-party "best health apps" roundups** — outreach to health/tech bloggers and existing listicles.
- [ ] **Wikipedia-adjacent / data sources** — ensure consistent NAP (name/description) everywhere the brand appears.

### Track 4 — Measurement

- [ ] Weekly: GSC (via MCP) — impressions, positions, indexed pages; Bing WMT — crawl/index status.
- [ ] Monthly: prompt-test the LLMs directly — ask ChatGPT/Perplexity/Claude "best app to track blood test results" and log whether/where Bevita appears. This is the actual GEO KPI.
- [ ] Track App Store referrals from web (PostHog is wired — see project memory).

---

## Publishing schedule — first 2 weeks (GEO-prioritized)

Reorders `CONTENT_PLAN.md` to front-load posts LLMs cite most (comparisons, high-intent "best/vs", strong problem-solvers). 3/day.

| Day | Post 1 (comparison/high-intent) | Post 2 (problem/symptom) | Post 3 (biomarker) |
|---|---|---|---|
| 1 (done/next) | *(insulin-resistance flagship — live)* | Tired All the Time? 6 Blood Markers | HbA1c Explained |
| 2 | Apple Health vs a Dedicated Lab Tracker | Brain Fog: What Your Labs Miss | Fasting Insulin: The Test Doctors Skip |
| 3 | Ornament Health Review & Alternatives | Unexplained Weight Gain: Metabolic Panel | Cholesterol Numbers Explained |
| 4 | Function Health vs Bevita | Sugar Cravings & Your Blood | Vitamin D Deficiency Guide |
| 5 | InsideTracker Alternatives Compared | Hair Loss & Your Blood Work | TSH Explained |
| 6 | Best Apps to Track HbA1c/Blood Sugar | Afternoon Energy Crashes | Triglyceride-to-HDL Ratio |
| 7 | Free vs Paid Health Tracking Apps | Cold Hands & Feet: Iron/Thyroid | CRP: Inflammation Marker |
| 8 | Best Apps to Track Cholesterol | Restless Legs: The Iron Link | Vitamin B12 Deficiency |
| 9 | The Best Way to Track Bloodwork 2026 | Skin Signs of Insulin Resistance | Full Iron Panel |
| 10 | How to Read Blood Test Results *(live — internal-link hub)* | Irregular Periods: Hormone/Insulin | ApoB Explained |
| 11 | Prediabetes: Catching It Early | Joint Pain: Inflammation Markers | Liver Enzymes ALT/AST |
| 12 | Metabolic Syndrome: 5-Marker Diagnosis | Poor Sleep & Hormones | eGFR & Creatinine |
| 13 | Fatty Liver (NAFLD) in Your Labs | Frequent Colds: Immune Markers | Cortisol Explained |
| 14 | Reversing Prediabetes | Anxiety, Thyroid & Cortisol | Homocysteine Explained |

After day 14, continue through the remaining `CONTENT_PLAN.md` clusters (audiences, remaining biomarkers/conditions).

**Per-post GEO checklist:** primary keyword in title/H1/description • one surprise stat • Bevita iOS screenshot • FAQ block (3–5 Q&As) • Article+FAQPage schema • 2–3 internal links • canonical app-description sentence • closing download CTA.

---

## Long-tail topic clusters (data-driven, added 29.07)

Once a hub post starts ranking for a long tail, spin off **narrow spoke posts** targeting the specific low-competition queries GSC shows it surfacing for. Young domain ranks faster on narrow terms; spokes + hub interlink to reinforce the cluster. Pull targets from `search_analytics` with `queryFilter`.

**Thyroid cluster (first one built):**
- Hub: `high-tsh-thyroid-explained` (links down to all spokes)
- Spokes: `high-tsh-high-t4` (targets "high tsh high t4" etc), `high-tsh-causes` ("cause of high tsh"), `high-tsh-symptoms` ("high tsh symptoms"). Also `free-t3-t4-explained`, `thyroid-antibodies-tpo`.
- Next candidates from GSC: "tsh over 100 / extremely high tsh", "hyperthyroidism vs tsh confusion".

Replicate for other hubs as they gain long-tail impressions (ferritin, HbA1c, cholesterol).

## Open questions for Leonid

1. **hreflang / localization** — build ES/DE/FR/PT/ZH versions, or remove the broken hreflang tags for now? (They currently point to 404s.)
2. **Off-site (Track 3)** — do you want me to draft the Product Hunt launch copy, App Store description, and Reddit/Quora answer templates? This is the highest-leverage GEO work but needs your accounts to actually post.
3. **Pricing in schema** — current schema says $9.99; confirm the real price so structured data matches the store.
