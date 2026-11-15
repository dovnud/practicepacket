# 21. Page teardowns

Fetched 14 November 2026. Word counts are an estimate: visible text after scripts and tags are removed, including the site navigation. They are not a hand count of the article only. HTML bytes are the size of the response, capped at the download. PageSpeed Insights was requested for six of these URLs and returned HTTP 429, so there are no lab Core Web Vitals scores. Visual ad counts were not measured. “Ads” means an ad script was in the HTML.

Rank source: the 14 November 2026 Google pass (United States, personalization off) where the result title matches. Other rows are the incumbent’s topic page, and the rank was not rechecked.

## Confirmed number-one results

| Query | URL | HTML | Words | What the page is |
| --- | --- | --- | --- | --- |
| telling time to the quarter hour worksheet grade 2 | k5learning.com `.../telling-time-quarter-hours` | 100 KB | ~680 | A skill page. At least six numbered worksheets in the HTML, and the public extract also shows a “5 More” control. Seven `.pdf` links. 19 images. |
| regrouping subtraction worksheets | math-drills.com/subtraction.php | 144 KB | ~4,900 | A catalog. Hundreds of links. The page’s own counter says the 2-digit, 49-question, some-regrouping sheet had 3,077 views that week. |
| 2 digit addition with regrouping worksheets | Title on Google was “2-Digit Plus 2-Digit Addition with Regrouping”. The section page is math-drills.com/addition.php | 162 KB | ~5,800 | Same catalog pattern. That sheet’s on-page counter: 2,309 views that week, 25 questions. The exact leaf URL was not confirmed. |
| grade 2 math worksheets printable | k5learning.com `.../second-grade-2` | 97 KB | ~630 | A grade menu. Topics as links. No worksheet PDFs on the hub itself. |
| free printable math worksheets | math-drills.com/ | 68 KB | ~740 | The homepage. AdSense. Two “answer key” mentions. |
| common core math worksheets grade 3 | commoncoresheets.com/sort-by-grade/ccss/3 | 74 KB | ~1,160 | A standards index. 53 images. The page says every worksheet is a free PDF with an answer key. Playwire scripts. |
| multiplication facts worksheets | math-drills.com/multiplication.php | 199 KB | ~7,300 | The longest catalog measured. 575 links. 14 images. |

## Incumbent topic pages, rank not rechecked

| Page | HTML | Words | Notes |
| --- | --- | --- | --- |
| K5 grade 2 addition | 107 KB | ~1,200 | Article + BreadcrumbList schema. Member and preview language. No “answer key” in the HTML. |
| K5 grade 2 place value and rounding | 100 KB | ~830 | Same K5 template. |
| K5 grade 1 comparing numbers | 99 KB | ~740 | Same template. |
| K5 grade 1 addition | 105 KB | ~930 | Same template. 23 images. |
| K5 grade 1 telling time | 101 KB | ~730 | Same template. |
| K5 grade 2 counting money | 103 KB | ~800 | Same template. 30 images. |
| K5 grade 3 hub | 98 KB | ~700 | Topic menu, not sheets. |
| Math-Drills 2-digit subtraction leaf, 49 questions | 77 KB | ~700 | Four PDF links. One “answer key”. No schema. The page text says created or last revised on 2023-02-10, and 3,067 views that week. |
| Common Core Sheets “subtracting with regrouping” | 55 KB | ~470 | Short leaf. Playwire. A preview. The words “answer key” were not in this leaf’s text. |
| Math Salamanders second-grade hub | 149 KB | ~3,500 | 91 images. AdSense and Google Publisher Tag. No answer-key string. No schema. The word “member” is present. |
| Education.com grade 2 math resources | 230 KB | ~2,500 | 128 images. Product and Offer schema. No ad script in the first HTML. Final URL was `/resources/grade-2/worksheets/math/`. |

Worksheetfun and Math Worksheets 4 Kids returned HTTP 403. Not measured.

## What is actually weak

K5’s own FAQ, fetched the same day, says most worksheets are free with no login, and that grades 1–5 usually have the answer key on page 2 of the PDF. Membership is $23.95 a year and is what removes ads, separates the question sheet from the answer sheet, turns on previews, and enables Google Classroom sharing. So “no answer key” is the wrong attack. The attack is: the key is trapped on page 2, the preview is paid, and the HTML is a list of files under an ad script.

Math-Drills is the opposite. No login. The leaf we opened is a real sheet with a key, and it is three years old (2023-02-10). The pages that rank for broad subtraction and addition are catalogs of hundreds of links. A teacher still has to pick a row. There is no schema. AdSense and Funding Choices are in the HTML.

Common Core Sheets tells the truth on the grade page (PDF plus key) and then serves Playwire. The leaf we opened is thin: about 470 words.

Education.com’s grade page is heavy (230 KB, 128 images) and marked up as a product. Phase 1 already noted a download limit on the free plan, from a secondary review, not from this fetch.

Nobody in this set is slow in the sense of a multi-megabyte HTML file. They are all under 230 KB of HTML. Beating them on “our page is lighter” is a small edge, not a strategy, until a lab score exists. The edge that shows up in the HTML is friction and focus: a preview you can see, a key that is not behind a membership, one skill instead of a catalog, and more than one level without a second hunt.
