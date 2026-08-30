# bevita-landing

Маркетинговый сайт и SEO-машина Bevita. Живёт на **https://bevita.app** (Netlify, site `0ffe4760-8090-41ea-8f41-36c7cfe08fe7`).

_Обновлено: 2026-08-30._

## Стек

Astro 6 + Vue 3 (островки) + `@astrojs/netlify` (SSR-адаптер) + `@astrojs/sitemap`.
i18n: `en` (дефолт, без префикса) и `es`. Маскот — капибара на Lottie (`public/capybara.json`, спека в `../.agent/docs/kapi-mascot-spec.md`).

```bash
npm run dev      # локально
npm run build    # сборка в dist/ (Netlify делает то же самое)
```

## Что на сайте (83 URL в сайтмапе)

| Слой | Кол-во | Где лежит | Зачем |
|---|---|---|---|
| Блог | 52 | `src/content/blog/` (EN, 51) + `src/content/blog-es/` (ES, 3) | информационные запросы → установка |
| TSH-хаб | 16 | `src/pages/tsh/index.astro` + `[value].astro`, данные в `src/data/tsh-levels.ts` | программатик-слой: страница под каждое значение TSH |
| Калькуляторы | 7 | `src/pages/tools/*` + `src/layouts/ToolPage.astro` | ferritin, HbA1c→глюкоза, HOMA-IR, мг/дл↔ммоль/л, non-HDL, триглицериды/HDL |
| Лендинг + легал | 4 | `src/pages/index.astro`, `medical`, `privacy`, `terms` | конверсия и требования Apple |
| ES-локаль | 4 | `src/pages/es/` | первая нативная локаль |

`public/llms.txt` — описание сайта для LLM-краулеров (GEO/AEO-слой, см. `GEO_STRATEGY.md`).

## Индексация

`scripts/indexnow.py` — пинг IndexNow (Bing/Yandex). `scripts/google-index.py` — Google Indexing API.
Запускать после выкатки новой пачки страниц.

## Доки

| Док | Что внутри |
|---|---|
| `CONTENT_PLAN.md` | план на 100 постов (создан 21.07). **Сделано ~51.** |
| `GEO_STRATEGY.md` | двойная воронка: классическое SEO + видимость в LLM-ответах |
| `BLOG_PLAYBOOK.md` | формат поста, структура, правила перелинковки |
| `KEYWORD_RESEARCH.md` | семантика |
| `BACKLINKS_PACKAGE.md` | план по ссылкам |
| `../_docs/growth/TOKPORTAL-SEO-PLAYBOOK.md` | разбор конкурента, откуда взята идея программатик-слоёв `/tsh/*` и `/tools/*` |

## Гочи

- `package.json` всё ещё называется `healer-landing-new` — историческое имя, на деплой не влияет.
- Астро-конфиг жёстко задаёт `site: 'https://bevita.app'` — от него считаются canonical и сайтмап. Менять домен только тут.
- В `CONTENT_PLAN.md` в шапке остался старый домен `healer.health` — актуальный `bevita.app`.
