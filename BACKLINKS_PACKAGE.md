# Пакет текстов под первые бэклинки

**Зачем это нужно.** Bing показывает `InLinks: 0` — на сайт не ссылается никто. Из-за этого оба
движка почти не краулят домен: 15 страниц `/tsh/` и 3 новых поста висят необнаруженными по
две недели. Нужно не сто ссылок, а **3–5 с часто обходимых страниц**, чтобы краулер вообще
начал приходить.

**Порядок важен.** Сначала Product Hunt и AlternativeTo — они дают и ссылку, и живой трафик.
Reddit после, потому что там нужен возраст аккаунта и карма, иначе снесут.

Факты про продукт, на которые опираются все тексты ниже:
- iOS-приложение, App Store: https://apps.apple.com/us/app/bevita-blood-test-labs/id6783030563
- Сайт: https://bevita.app
- Загружаешь PDF с анализами → значения извлекаются автоматически → строятся тренды по каждому
  маркеру → связывается с симптомами, которые ты логируешь
- Health Passport: PDF и шареная ссылка для врача
- Бесплатный тариф есть; Pro $9.99/мес или $89/год
- Сделано врачом
- Android нет

---

## 1. Product Hunt

Самый важный пункт: страница краулится постоянно, ссылка остаётся навсегда.

**Name:** `Bevita`

**Tagline** (до 60 символов):
```
Your blood test results, finally remembered
```

**Description** (до 260 символов):
```
Upload your lab PDFs and Bevita reads every value, charts each biomarker over time, and ties the numbers to symptoms you log. Built by a doctor for people whose results sit in a folder nobody ever compares. Free to start, iOS.
```

**Topics:** Health, iOS, Artificial Intelligence, Health & Fitness

**First comment** (пост от имени мейкера — это то, что читают):
```
Hi PH,

I'm a doctor, and the thing that kept bothering me in practice wasn't rare diagnoses. It was
how much information gets thrown away between appointments.

A patient hands over a lab report. It looks fine. Everything's inside the reference range, so
we move on. But the reference range describes the population that was sampled — including
people with undiagnosed problems — and it says nothing about where you were two years ago.
A ferritin of 25 is "normal". A ferritin that went 70 → 40 → 25 is a story. Nobody sees the
second one, because those three results live in three different PDFs.

Bevita is the fix I wanted to exist. You upload the reports you already have. It extracts every
value, keeps it with its date, charts the trend per marker, and reads markers against each
other rather than one at a time. You can log how you feel, and it lines symptoms up against
the numbers. When you next see a clinician, you hand over one Health Passport instead of a
folder.

It's iOS only right now, and free to start. I'd genuinely like to hear which markers you wish
someone would explain properly — that's what I keep building next.
```

---

## 2. AlternativeTo

Сильное попадание: у нас уже есть статьи «InsideTracker alternative», «Ornament alternative»,
«Function Health vs Bevita». Здесь мы буквально в тему, и это ссылка плюс тематическое совпадение.

Добавить как альтернативу к: **InsideTracker**, **Function Health**, **Ornament**, **Bevel**

**Description:**
```
Bevita is an iOS app that reads your existing blood test PDFs instead of selling you new panels.
It extracts every biomarker, keeps each result with its date, charts trends over time, and reads
markers against each other rather than in isolation. You can log symptoms and see them against
your numbers, and export a Health Passport PDF or shareable link for a clinician. Built by a
doctor. Free tier available.
```

**Features (галочки/теги):** Blood test tracking, Biomarker trends, Lab report import,
AI insights, PDF export, Symptom logging, iOS

---

## 3. IndieHackers — product page

**Name:** `Bevita`

**Tagline:**
```
A health record that remembers your lab results
```

**Description:**
```
Bevita turns the lab PDFs you already have into a health record you can actually read. Upload a
report, every value gets extracted and dated, and each biomarker becomes a trend instead of a
one-off number. It reads markers together — so a normal HbA1c next to a raised HOMA-IR gets
flagged as early insulin resistance rather than passing as fine — and ties results to symptoms
you log. Export a Health Passport for your doctor when you need it.

Built solo by a doctor. iOS, free to start.
```

---

## 4. Fazier

**Tagline:**
```
Upload your lab results, see what they've been doing
```

**Description:**
```
Most people's blood test results sit in a folder of PDFs nobody ever compares. Bevita reads them,
charts each biomarker over time, connects the numbers to symptoms you log, and gives you one
document to hand a clinician. Built by a doctor. iOS, free tier.
```

---

## 5. Reddit

⚠️ **Читать перед публикацией.** В этих сабреддитах прямая реклама удаляется, а аккаунт может
получить бан. Правила: аккаунту нужен возраст и немного кармы; пост должен быть полезен сам по
себе; **ссылку на приложение давать в комментарии, а не в теле поста**, и только если спросят.
Ссылку на статью в блоге давать можно, если она по делу.

### r/Hypothyroidism — пост

**Title:**
```
The "ultrasensitive" on your TSH report isn't a different test — here's what it actually means
```

**Body:**
```
This confuses a lot of people, including me for a while, so a short explainer.

If your lab prints "TSH, ultrasensitive" or "uTSH" or "TSH 3rd generation", that's describing the
machine, not your result. It's the same hormone measured on a more sensitive assay. The first
generation of TSH tests could only detect down to about 1.0 mIU/L — which is inside the normal
range, meaning they literally couldn't tell a healthy person from a hyperthyroid one. Modern
third-generation assays measure reliably down to roughly 0.01.

The part that matters: all that added sensitivity is spent BELOW the reference range. It exists to
tell a mildly suppressed TSH (say 0.2) apart from a fully suppressed one (0.005), which matters for
hyperthyroidism and for monitoring people on replacement.

So if your TSH is HIGH, the word "ultrasensitive" changes nothing about how to read it. A 7 is a 7.

Also worth knowing: reference ranges genuinely differ between labs, and the assays still aren't
perfectly harmonised between manufacturers. A jump from 3.2 to 3.9 across two different labs may
be the labs, not your thyroid.
```

Ссылка в комментарии, если уместно: https://bevita.app/blog/ultrasensitive-tsh/

### r/Thyroid — пост

**Title:**
```
Why a "normal" TSH and a rising TSH are completely different things
```

**Body:**
```
Something I wish someone had told me earlier.

The usual adult reference range for TSH is about 0.4–4.0 mIU/L. If you come in at 3.8, the report
says normal and the conversation ends. But that range describes the middle 95% of whoever the lab
sampled — a population that included people with undiagnosed thyroid disease. It tells you what's
common, not what's optimal for you.

What it definitely doesn't tell you is direction. A TSH of 3.8 that was 1.4 two years ago is a
trajectory. A TSH of 3.8 that's been flat for a decade is just your number. Same value, completely
different situation — and only one of them is worth following.

Practical takeaways:
- Ask for the actual number and the lab's own range, not "it's normal"
- Ask for free T4 alongside it if TSH is out of range
- If your TSH is in the upper reaches and you have symptoms or family history, TPO antibodies are
  the most informative next test — they can be positive years before TSH goes abnormal
- Keep your old results so you can compare. Same lab where possible, since labs differ
```

### r/Biohackers — пост

**Title:**
```
Fasting insulin ranges disagree wildly across sources, and there's a specific reason why
```

**Body:**
```
If you've looked up a fasting insulin result you've seen "normal up to 25", "optimal under 5", and
"over 10 is insulin resistance", all presented as fact. They can't all be right, and the reason
isn't sloppiness.

Insulin immunoassays were never standardised. Unlike glucose or HbA1c, which are traceable to
common reference methods, different manufacturers' insulin assays measure the same sample and
return meaningfully different answers — a comparison of 11 human insulin assays found disagreement
large enough to affect research conclusions. The ADA convened a workgroup specifically about it.

The consequence nobody mentions when quoting you a cutoff: because of that variability, the
specific insulin levels corresponding to specific degrees of insulin resistance have never been
formally defined.

So the practical rule is unglamorous but actually works: **use the same lab every time and compare
yourself to yourself.** 14 → 11 → 8 on one assay over a year is real information. 9 at one lab vs
13 at another tells you almost nothing.

HOMA-IR is a bit more robust than raw insulin because it pairs insulin with glucose from the same
sample, so it describes a relationship rather than an absolute — but it inherits the same assay
variability.
```

---

## 6. Hacker News — Show HN

Ссылка nofollow, но обход мгновенный, и это часто приводит краулера на домен в тот же день.

**Title:**
```
Show HN: Bevita – turn your lab test PDFs into biomarker trends
```

**Text:**
```
I'm a doctor. The problem I kept running into wasn't difficult diagnoses — it was that most of the
useful information in someone's bloodwork is thrown away between appointments.

A single lab report gets read against a reference range, which describes the population that was
sampled rather than you. What it can't show is direction. Ferritin of 25 reads as normal; ferritin
that went 70 → 40 → 25 is the actual finding. Those three numbers usually live in three separate
PDFs that nobody ever opens side by side.

Bevita extracts every value from the reports you already have, keeps them dated, charts each
biomarker over time, and reads markers against each other — a normal HbA1c next to a raised
HOMA-IR gets flagged as early insulin resistance instead of passing as fine. You can log symptoms
and see them against the numbers, and export one document for a clinician.

iOS only for now, free to start. Happy to answer questions about the extraction pipeline or how the
derived indices are computed.
```

---

## Порядок действий

1. **Product Hunt** — запуск. Максимальный эффект, поэтому первым
2. **AlternativeTo** — 4 листинга (InsideTracker, Function Health, Ornament, Bevel)
3. **IndieHackers** + **Fazier** — профиль и запуск, 15 минут вместе
4. **Show HN** — в будний день, утро по US
5. **Reddit** — по одному сабреддиту в день, не все сразу

После каждой публикации скажи мне — я проверю через Bing Webmaster, начал ли расти `InLinks`,
и когда он сдвинётся с нуля, сразу возобновляем выпуск страниц.
