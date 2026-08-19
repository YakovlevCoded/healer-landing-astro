# Bevita Blog Playbook — How to Write Every Post

**Goal:** rank for the problems people search ("why am I always tired", "what does high TSH mean", "insulin resistance symptoms") → teach them → convert to a Bevita iOS download. Every post is a funnel: **search intent → education → app is the answer → download.**

Read this before writing any blog post. The reference implementation is `src/content/blog/how-to-know-if-you-have-insulin-resistance.md`.

---

## The non-negotiable structure (every post, in order)

1. **Hook + the problem** (1–2 short paragraphs)
   - Open on the reader's felt problem or a counter-intuitive truth, not a dictionary definition.
   - Name *why it's missed / misunderstood* — this is the tension that keeps them reading.

2. **The surprise statistic** (the "подводка" / shareable stat)
   - One quotable number that makes them think *"wait, that could be me."* e.g. "8 in 10 people with prediabetes don't know they have it."
   - This is what earns links, featured snippets, and the "read on" decision. Put a version of it in the meta `description` too.
   - **Cite it.** Link the stat to an authoritative primary source (see the Scientific sourcing section below). An uncited number is weak; a number linked to the CDC is quotable by both Google and ChatGPT.

3. **Signs & symptoms** (scannable bullet list)
   - Real, specific, relatable. The reader should tick items off mentally.

4. **The numbers that matter** (the biomarkers)
   - Which blood markers reveal it, with reference ranges and what high/low means.
   - This is the SEO meat — it captures long-tail "what is X level" queries and positions Bevita as the tool that reads these.
   - Emphasize the insight that **single numbers lie; the story is in trends and relationships between markers** (this is Bevita's whole pitch).

5. **App promo block with a real Bevita iOS screenshot** (the "пример по Bevita")
   - Embed a screenshot from the app showing exactly the markers the post discusses: `![alt](/images/<slug>.jpg)`
   - Walk through what the app surfaces that a PDF lab report can't — reference the actual numbers on the screen (like the HOMA-IR 2.02 / HOMA-B 126.6% walkthrough in the reference post).
   - Connect it to the app's differentiator: tracks trends over time, ties labs to logged symptoms, flags patterns before they become a diagnosis.

6. **What to do** (practical, non-prescriptive)
   - 3–5 concrete steps. Always include "talk to a clinician" — we inform, we don't diagnose.

7. **CTA — always present** (the "чтобы везде был CTA")
   - Close with an explicit download push tied to the post's topic: *"Download Bevita, upload your labs, and see what your [ferritin/HbA1c/…] has actually been doing over time."*
   - The `BlogPost.astro` layout **auto-appends an App Store CTA box** after every post — but still write an in-body closing CTA. Two touchpoints, not one.
   - iOS only right now: App Store link is `https://apps.apple.com/us/app/bevita-blood-test-labs/id6783030563`. **No Google Play** (Android not shipped — Play buttons are commented out sitewide).

---

## Scientific sourcing (required — E-E-A-T + LLM trust)

Medical topics are **YMYL** ("Your Money or Your Life") — Google holds them to a higher bar, and LLMs preferentially cite content backed by real sources. Every post must be grounded in authoritative references.

**The rules:**
- **Never invent a statistic, study, or citation.** For a health app this is a hard line. If you're not certain of a figure, verify it with a web search against a primary source before publishing — don't approximate from memory.
- **Cite every hard number** (prevalence, percentages, thresholds, ranges) inline, linked to the source.
- **Prefer primary / authoritative sources**, roughly in this order:
  1. Government health bodies — CDC, NIH/NIDDK, WHO, NICE
  2. Peer-reviewed literature — PubMed, NCBI Bookshelf/StatPearls, major journals
  3. Major medical institutions & societies — Mayo Clinic, Cleveland Clinic, ADA, AHA, Endocrine Society
  - Avoid citing commercial/competitor blogs or content farms.
- **Add a `## References` section** at the end (before the app CTA) listing 3–6 numbered sources as links. External links auto-open in a new tab (configured via rehype-external-links).
- **Add the medical disclaimer** line: *"This article is for education and isn't medical advice. Discuss your results with a qualified clinician."*
- **Hedge appropriately** — "may", "can", "research suggests", "roughly" — and note when ranges vary by lab or guideline.
- Reference implementation with sourcing done right: `how-to-know-if-you-have-insulin-resistance.md`.

**Workflow:** before writing, run 1–3 web searches to confirm the key stats and grab source URLs (CDC/NIDDK/StatPearls etc.), then weave them in as inline links + a References block.

## SEO rules

- **One primary keyword per post**, targeting a *problem* people search (see `CONTENT_PLAN.md` for the keyword→slug map). Don't cannibalize — one strong post per intent, not two thin ones.
- **Title:** include the keyword naturally, front-loaded. Add a benefit/curiosity clause in parens if it helps CTR.
- **Description (meta):** 140–160 chars, includes the surprise stat + keyword. This is the SERP snippet — write it to earn the click.
- **Headings:** use `##`/`###` with natural-language questions people actually type ("What does low ferritin mean?"). Feeds featured snippets.
- **Internal links:** every post links to 2–3 sibling posts in the same cluster + its pillar. Builds topical authority and keeps readers on-site.
- **Length:** ~1000–1500 words. Long enough to be the best answer, not padded.
- **Freshness:** set an accurate `pubDate`; add `updatedDate` when revised.

## Frontmatter template

```yaml
---
title: "Primary Keyword Phrase (Benefit or Curiosity Clause)"
description: "Surprise stat + what the reader learns, in 140–160 chars with the keyword."
pubDate: YYYY-MM-DD
heroImage: "/images/<slug>.jpg"   # Bevita iOS screenshot relevant to the topic
tags: ["primary-topic", "blood-tests", "..."]
author: "Bevita Team"
---
```

## Assets

- Screenshots go in `public/images/<slug>.jpg`. Resize to ~900px wide (`sips -Z 900 in.jpg --out out.jpg`) to keep pages fast.
- Pick a screen that shows the exact markers the post is about — the screenshot IS the proof the app does what the post says.

## Voice (write like a human, not an AI)

- Plain, direct, confident. Short sentences. Second person ("you").
- **Avoid AI tells:** no "delve", "moreover", "in today's fast-paced world", no rule-of-three everywhere, no hollow "it's important to note". Vary sentence length. (See the `humanizer` skill if a draft feels robotic.)
- Evidence-based but not clinical-cold. We're the knowledgeable friend, not a textbook.
- Never over-claim medically. "May", "can", "research suggests" — and always defer final calls to a clinician.

## Publish workflow

1. Write the `.md` in `src/content/blog/`, add the screenshot to `public/images/`.
2. `npm run build` — new post auto-enters `sitemap-index.xml`. Confirm no build errors.
3. `netlify deploy --prod --dir=dist`.
4. Once GSC/Bing are wired: submit the URL (Bing via MCP; Google "Request Indexing" via browser MCP — API can't do it). Target 3 posts/day.

## CSS gotcha (learned the hard way)

Blog uses `class="article-body shell"` (two classes). Use **`padding-block`** (not the `padding` shorthand) on `.article-body`/`.blog-cta` in `BlogPost.astro`, or it wipes the horizontal `padding: 0 24px` from `.shell` and kills side margins on mobile.
