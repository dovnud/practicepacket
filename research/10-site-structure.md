# 10. Site structure, URLs, and Cloudflare

Date: 14 November 2026. Planning only. No site was generated.

## URL shape

Use the skill as the path, not the standard code and not a flat slug.

```
/grade-2/
/grade-2/math/
/grade-2/math/subtraction/
/grade-2/math/subtraction/2-digit-regrouping/
```

The last URL is the worksheet. The others are hubs: a short intro, links to the skills, and no PDF of their own. Hubs are how a visitor, and a crawler, move from “grade 2 math” to the one skill. A flat `/2-digit-regrouping-worksheets/` ranks the same phrase and throws away the grade and subject hubs. Incumbent sitemaps (file 01) are large piles of detail URLs. The hubs are the part a new site can do more carefully than a 57,000-URL dump.

Rules:

- One indexable URL per skill per grade. Variants are query strings or subpaths that canonicalize back: `?variant=3` or `/v/3` with a canonical link to the skill URL.
- The slug is the language of the query. “2-digit-regrouping”, not “2nbtb5”. Codes go on the page.
- US spelling in the slug. A separate UK spelling is a later decision, not a second site.
- Seasonal packs live off to the side: `/seasons/christmas/grade-2/math/`. Do not mix holiday art into the evergreen URL or the evergreen page stops matching in January.
- Grade index pages list skills. They do not list 40 PDF files.

## HTML and PDF

Dad’s Worksheets disallows `*.pdf` in robots.txt. That is the right default. Google should land on the HTML page, where the title, the worked example, the internal links, and the ads are. The PDF is a file the page links to.

Each skill page contains:

- H1, grade, subject, one-sentence direction
- one preview image of the sheet
- one worked example
- a button for the student PDF and a button for the key
- links to the support and extra variants, canonicalized
- links to the previous and next skill in the same grade
- the standard code, and the copyright notice only if official wording is quoted (file 08)
- noindex on thank-you or download-count URLs, if those exist

The PDF is produced from the same problem records as the key. Store both in R2. The HTML page embeds a same-origin URL such as `/files/grade-2/math/subtraction/2-digit-regrouping.pdf` that a Worker or a Pages Function redirects or proxies to the bucket, or the public bucket is on `files.<domain>` with a custom domain. Cloudflare’s R2 docs say the `r2.dev` hostname is for testing and is rate-limited. Do not use it in production.

Set `Content-Disposition` so the file downloads with a readable name, and `Cache-Control` long, because a published variant must not change under a teacher’s saved link. New numbers mean a new variant id, not a silent replace.

## Astro on Cloudflare Pages

Cloudflare Pages limits, docs last updated 5 September 2026:

| Limit | Free | Paid |
| --- | --- | --- |
| Files per site | 20,000 | 100,000, after setting `PAGES_WRANGLER_MAJOR_VERSION=4` |
| File size | 25 MiB | 25 MiB |
| Build time | 20 minutes, then the build times out | same |
| Builds | 1 at a time, 500 per month | Pro: 5 concurrent, 5,000 per month |

A worksheet PDF is far under 25 MiB. The file count is the constraint. Phase 1 (about 50 HTML pages, a few images, no PDFs in the deploy) is nowhere near 20,000. Phase 3, if every variant PDF is committed into `dist/`, blows the free cap and can blow the paid cap. Keep PDFs and preview PNGs in R2. The Pages project ships HTML, CSS, and a small script.

Astro implications, as engineering choices rather than measured benchmarks:

- Static output. No adapter beyond what Pages needs for a few Functions (the file redirect, the contact form). A contact form posts to `contact@<domain>` through a Worker or a form service. No personal name on the site.
- Generate pages from a content collection of skills, plus a JSON file of problems per variant. Do not hand-author 200 pages.
- The build must stay under 20 minutes. Precompute PDFs outside the Pages build, upload to R2, and let Astro only emit HTML. Generating PDFs inside the Pages build will hit the timeout once the library grows.
- `noindex` thin hubs that have fewer than a handful of children. A hub with real links can be indexed.
- Sitemap from the skill collection only. Do not list PDF URLs, matching Dad’s pattern.
- Canonical host, HTTPS, one trailing-slash style, decided once.

Ads come later. Empty ad slots in phase 1 add layout shift and no money. Leave a single, documented place in the layout so a script can be added without rewriting templates. ads.txt is a static file at the root when a network exists. Until then, do not publish a fake ads.txt.

## What not to build into the URL

- Accounts, in phase 1. The incumbents use accounts to paywall keys. The test needs indexable free files.
- A generator with infinite query-string URLs. Math-Aids and Education.com have generators and also have a small set of generator URLs in the sitemap (21 on Education.com). Infinite indexable combinations are a scaled-content pattern. If a generator is added later, canonicalize every output to the skill page or noindex it.
- State-specific URLs (`/texas/grade-2/...`) until the license question in file 08 is settled. One national skill page can list several codes.
