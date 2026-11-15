# 9. What teachers actually keep

Date: 14 November 2026. There is no survey in this file. The list is what the incumbents charge for, what autocomplete asks for, and what fails on a noisy printable. Where a point is only practice, it is marked that way.

## Paid for, so it is not optional

K5’s membership page lists the things $23.95 a year removes the friction from: more worksheets, grade levels removed, preview, separate answer pages, download a set, Google Classroom, bookmarks, no ads. The answer key and the ad-free print are the product, not a bonus.

Super Teacher’s membership page says members get the full library and that hundreds of sheets stay free. The free sheet is the sample. The set is the sale.

Autocomplete, file 03, adds “pdf”, “free”, “with answers”, and a grade to almost every stem. “With answers” is a query, not a hunch.

## The print itself

Practice, from what survives on a classroom copier. Not a measured ranking factor.

- One skill on the page. A sheet that mixes regrouping and non-regrouping teaches the student to hunt for which kind it is. That is a different sheet, and autocomplete treats “with regrouping” as its own phrase. Ship both, as two URLs.
- Black ink on white. Color dies on a school copier and looks like an ad. Holiday art, if any, has to work in grayscale.
- One page for the student, one page for the key. K5 sells “separate answer pages.” Dad’s Worksheets blocks PDF indexing and still gives the teacher a file. The key should not sit under the problems on the same printed page, or the student sees it.
- Name and date line, a short direction, problem numbers, and nothing else in the margins. No social buttons, no “download our app”, no paragraph of SEO text on the PDF.
- Large digits, column alignment that survives 90% scaling, enough room to borrow. A grade 1 sheet with 40 problems is a different product from a grade 4 facts sprint. Autocomplete does ask for “100 problems” on multiplication facts. Offer that as a variant of the facts page, not as the default for grade 2 subtraction.
- Several variants of the same skill, same layout, different numbers, so a table group cannot copy. One canonical URL, links to variant PDFs. Do not index each variant.
- The key is generated from the same objects as the problems, then checked by a second function (addition of the difference, and so on). A wrong key is how a free site loses to Super Teacher. Say on the page that answers are checked by code. Teachers have seen chatbot keys that do not match.

## The HTML page, which is what Google and Pinterest see

- The H1 is the skill and the grade, in the words of the query: “2-digit subtraction with regrouping, grade 2.”
- A preview image of the actual sheet, with empty answer lines, not a mockup that is prettier than the PDF. Pinterest and Google image search both use that image. Alt text is the skill, not “worksheet1”.
- One worked example in HTML. The rest of the answers stay in the PDF (file 05).
- The standard code as a tag, with the attribution in file 08 if any official wording is quoted. Do not make the code the title. Teachers search the skill. The code is how a curriculum coach filters.
- A plain sentence on how to use it, including the common mistake. The clone pages already do this. It is useful and it is also what an AI Overview can absorb. Keep it short.
- Print CSS that hides navigation. Some teachers print the HTML and never open the PDF. If the HTML prints badly, the PDF does not save you.
- No account wall on the free sheet. Education.com’s free tier has a download limit, according to the secondary review in file 01. The limit is their business. It is also the gap.

## Differentiation, without a new brand

Three files from one problem generator, linked from one URL:

- support: fewer problems, or scaffolding (the tens already crossed out)
- on-level: the default
- extra: zeros in the tens, or a mixed page where not every problem regroups

Do not publish three URLs that differ by a paragraph. Autocomplete does not have “differentiated worksheet” as a stronger stem than the skill itself, in the lists pulled.

## Pinterest and sharing

Semrush’s channel modules for these sites put organic search and direct first. Similarweb’s Super Teacher social line, on the September 2026 page, names YouTube, then Pinterest, then Instagram, without a percentage in the capture. Pinterest is a real teacher behavior and a small measured channel in the data that was actually printed. Worth a pin of the preview image. Not worth a Pinterest-first content plan.

What gets pinned, as practice: a readable preview, a grade in the pin title, a vertical image, and a page that loads with the PDF in one click. What does not: a collage of five skills, a pastel border that turns to mud in grayscale, and a pin that lands on a signup wall.

## Ads versus the print

If the PDF is clean and the HTML is a billboard, teachers will say so, and they will leave. K5’s paid tier is “no ads.” The free page can carry ads and still win if the PDF does not. No ads inside the PDF. No interstitial between the click and the file. Journey and Raptive both say they want a reader experience that can hold ads (file 06). A worksheet page can do that in the HTML only.

## A rejection list for the test

Do not ship a topic if any of these is true:

- The key was not checked by code against the problems.
- Two variants share more than a trivial fraction of problems.
- The skill name on the H1 is broader than the problems (a “grade 2 subtraction” page that is only regrouping, or the reverse).
- The PDF is more than two pages, unless it is the 100-facts variant and is labeled as that.
- The only way to tell it from a clone page is the domain name.
