# 25. Technical efficiency

Date: 14 November 2026. PageSpeed Insights returned HTTP 429 for every URL we sent, so no competitor performance score is claimed. HTML weights below are the fetches in file 21.

## What the incumbents already weigh

K5 skill pages are about 97–107 KB of HTML, with Google Publisher Tag in the document. Math-Drills hubs are 144–199 KB. The Education.com grade page was 230 KB with 128 images. A new page that ships 100 KB of HTML plus a hero image is in the same range, not ahead, before ads.

## Architecture

Astro static pages on Cloudflare Pages. PDFs and preview images in R2, on a real hostname, not `r2.dev` (file 10). The Pages file caps are unchanged: 20,000 free, 100,000 paid, 25 MiB per file, docs updated 5 September 2026.

Two files, one source of problems:

- The default PDF and its key are built in CI, checked, and uploaded to R2. That is what the preview image shows. A teacher with JavaScript off, and a crawler, see the same sheet.
- A “new numbers” button runs the same generator in the browser and prints from the page. It does not write a new URL and it does not replace the stored PDF. The stored file is the one a shared link must keep returning.

Client-side only would make the preview and the key depend on JavaScript, and the shared link would not be stable. Prebuilt only would give up the generator teachers already ask for (file 22). Both, with one indexable URL, is the split.

## Weight targets

These are design limits, marked ESTIMATED, chosen to stay near the lighter K5 pages and to keep the preview as the likely LCP element. They are not scores.

- HTML document under 80 KB before any ad script.
- One preview image, width and height set, WebP, under 80 KB. It is the LCP candidate. Do not lazy-load it.
- No second font file. A system stack.
- The PDF is not downloaded until the click.
- No tag manager in the test.

## Ads later, without wrecking the page

Mediavine’s help page “Our Commitment to Site Speed” says they lazy-load ads, that the first screen is where LCP is measured, and that deferring first-screen ads is the lever they offer. Their in-content page says the Coalition for Better Ads cap is 30% ads to 70% content by height, and their own mobile recommendation on that page is 28–30% frequency with at least two paragraphs between ads. A 700-word skill page has little height. It will not hold a recipe-page ad stack. Plan on one reserved slot below the preview and the buttons, with a fixed min-height so the button does not jump. No adhesion over the print button.

Raptive’s Core Web Vitals page, fetched the same day, says a good CLS is 0.1 or lower and a good INP is 200 ms or less, and that most LCP problems they see are images and server time, not their ad code. Their CLS article says to turn on “Reduce CLS from ads” and not to defer the ad script. Those are instructions for a site that has already been accepted. Phase 1 has no ads, which is also how the test stays fast.

Do not design the template around Mediavine’s paragraph rules. A worksheet page is not a post. Forcing it to 1,500 words to fit more ads is the helpful-content warning about writing to a word count (file 24), and it makes the page worse for the teacher.
