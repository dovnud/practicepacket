# 12. The 200-sheet test

Date: 14 November 2026. This is the cheap test named in the brief: about 200 grade 1–3 math sheets. It is a search test. It is not a revenue test and not a 90-day business.

## What “200” means

200 PDFs. About 50 indexable URLs. Four files per URL: on-level A, on-level B, support, extra. All four canonicalize to the skill URL. Shipping 200 indexable near-duplicates is the clone pattern in file 02, and it makes the result unreadable: a failure might be duplication, not demand.

## The 50 skills

Curriculum logic plus the autocomplete stems in file 03. Volumes for these exact phrases: not found. Do not drop a skill because a tool has no number, and do not add a skill because a competitor has a page.

Grade 1 (16)

1. Addition within 10
2. Addition within 20
3. Subtraction within 10
4. Subtraction within 20
5. Mixed addition and subtraction within 20
6. Addition word problems within 20
7. Subtraction word problems within 20
8. Greater than, less than, equal to, within 100
9. Place value, tens and ones
10. Ten more and ten less
11. Counting to 120, missing numbers on a chart
12. Telling time to the hour
13. Telling time to the half hour
14. Comparing lengths, indirect
15. Shapes, distinguishing defining attributes
16. Data, up to three categories

Grade 2 (18)

1. 2-digit addition, no regrouping
2. 2-digit addition with regrouping
3. 2-digit subtraction, no regrouping
4. 2-digit subtraction with regrouping
5. 2-digit subtraction across a zero
6. Addition and subtraction within 100, mixed, so the student must notice which problems regroup
7. Word problems within 100
8. Place value, hundreds, tens, ones
9. Skip count by 5s, 10s, and 100s
10. Even and odd
11. Arrays, up to 5 by 5, as a picture of addition
12. Telling time to the quarter hour
13. Telling time to five minutes
14. Money, coins to one dollar
15. Number line within 100
16. Measurement, inches on a ruler
17. Graphs, picture and bar
18. Mentally add or subtract 10 or 100

Grade 3 (16)

1. Multiplication facts, 0–5
2. Multiplication facts, 6–10, and a 100-problem variant attached to this URL rather than a new one
3. Division facts, 0–5
4. Division facts, 6–10
5. Missing-factor problems
6. Word problems, multiplication and division within 100
7. Rounding to the nearest 10
8. Rounding to the nearest 100
9. 3-digit addition with regrouping
10. 3-digit subtraction with regrouping
11. 3-digit subtraction across zeros
12. Fractions as parts of a shape
13. Fractions on a number line
14. Equivalent fractions, simple (halves and fourths, thirds and sixths)
15. Elapsed time within the hour
16. Area by counting unit squares

That is 50. Holiday sheets are not in the 200. A Christmas set in November would make the 90-day numbers partly seasonal (file 04).

## How to generate them

One program, two outputs, same input.

- A skill file holds constraints: grade, operation, digit bounds, whether every problem must regroup, whether zero is allowed, how many problems, the direction line, the standard code.
- A generator draws problems inside the constraints and rejects any that break them. For subtraction, the top number is always at least the bottom number. For “must regroup”, the ones digit really is smaller. For “across a zero”, there is a zero to borrow across. Duplicates inside a sheet are rejected.
- The answer key is not typed. It is the same records, rendered on page 2, or as a second PDF. A checker recomputes the operation and fails the build on a mismatch.
- Render with a print stylesheet or a PDF library to US Letter. Black only. Name and date. No logo larger than a wordmark. Page 1 is the student page.
- A person looks at one printed sheet per skill, not at all 200. The check is layout: alignment, room to borrow, clock faces that are circles, fractions that are equal parts. The code check covers arithmetic. The human check covers whether a teacher would photocopy it.
- Preview PNG is a render of page 1, cropped the same way every time, for the HTML page and for a later pin.
- Upload PDFs and PNGs to R2. Astro writes the 50 pages and the hubs from the skill files. See file 10.
- Do not run the prose on the page through a chatbot and publish it unedited. A wrong teaching note is worse than a short one. The generator’s job is the problems.

Stack for the generator: whatever already fits a small script. Python with a PDF library, or HTML-to-PDF from the same Astro partial that previews the sheet. The second is fewer layout bugs, because the preview and the PDF cannot drift. Pick one and keep the problem JSON independent of the renderer.

## Success and failure

Clock starts when most of the 50 URLs are indexed in Search Console, not on the day the code is written. Indexing itself can take weeks. The read is about 90 days after that.

Keep:

- The property is verified in Search Console and the sitemap contains the skill URLs and not the PDFs.
- Across the 50, total impressions are at least 500 in that 90 days. This bar is a decision rule, not an industry benchmark. It is there so “a handful of impressions” cannot be called a win.
- At least five queries reach an average position of 20 or better, and they are the skill queries, not the brand.
- Spot-check ten of those queries for an AI Overview (file 05) and write down yes or no.
- Print five sheets on a normal printer. If the author would not hand them to a child, the test has not started, regardless of rankings.

Stop, and do not add phase 2:

- Under 500 impressions after 90 days indexed, or
- Search Console shows a manual action or a scaled-content style warning, or
- Impressions exist but the average position is worse than 40 on every skill query. That is indexed and invisible.

Do not use revenue, affiliate clicks, or Pinterest as the decision. At this size, ads will not be approved for a premium network (file 06), and AdSense income on a few hundred visits is noise.

## What the test cannot tell you

It cannot tell you the RPM. It cannot tell you whether Christmas packs work. It cannot tell you whether reading would work. It can tell you whether Google will show a new domain’s narrow math pages at all, in a SERP that already contains the clone sites. That is the only question worth 200 sheets.
