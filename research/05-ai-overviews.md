# 5. AI Overviews and printable queries

Date: 14 November 2026.

## What was observed

One pass on 14 November 2026, Google results with `hl=en`, `gl=us`, and personalization off (`pws=0`). One screen, one day, one location. Not a panel.

An AI Overview was present on all 10 queries. On every one it explained the skill (what regrouping is, what a CVC word is, which topics grade 2 math covers). It did not generate a worksheet, and it did not embed a download or a worksheet link. No featured snippet was present on any of the 10. A printable or PDF was in the organic top five on every query.

People Also Ask, on the same screens, was the teaching question sitting beside the file query: “How to teach telling time to the quarter hour?”, “What is regrouping in subtraction?”, “How to memorize multiplication facts?”. Those are the queries an Overview can finish. The worksheet query still produced a list of printable pages under the Overview.

Ads were present on all 10. Education.com was the advertiser every time. IXL appeared on regrouping subtraction, “free printable math worksheets”, and multiplication facts. ABCmouse appeared on CVC words and kindergarten. Mathseeds appeared on “grade 2 math worksheets printable”.

| Query | First organic result | Also in the top 5 |
| --- | --- | --- |
| telling time to the quarter hour worksheet grade 2 | k5learning.com | education.com, mathworksheets4kids.com, math-salamanders.com, superteacherworksheets.com |
| regrouping subtraction worksheets | math-drills.com | education.com, k5learning.com, worksheetfun.com, mathworksheets4kids.com |
| 2 digit addition with regrouping worksheets | math-drills.com | k5learning.com, commoncoresheets.com, superteacherworksheets.com, education.com |
| grade 2 math worksheets printable | k5learning.com | math-salamanders.com, education.com, worksheetfun.com, commoncoresheets.com |
| free printable math worksheets | math-drills.com | k5learning.com, commoncoresheets.com, education.com, math-aids.com |
| common core math worksheets grade 3 | commoncoresheets.com | k5learning.com, education.com, math-salamanders.com, superteacherworksheets.com |
| cvc words worksheets | education.com | k5learning.com, worksheetfun.com, superteacherworksheets.com, teacherspayteachers.com |
| science worksheets grade 4 | education.com | k5learning.com, teacherspayteachers.com, havefunteaching.com, superteacherworksheets.com |
| multiplication facts worksheets | math-drills.com | superteacherworksheets.com, k5learning.com, commoncoresheets.com, math-aids.com |
| printable worksheets for kindergarten | education.com | k5learning.com, worksheetfun.com, kidzone.ws, superteacherworksheets.com |

The clone domains in file 02 (endlessmathsheets.com, mathprintable.com, and the others) were not in these top fives. They were returned by a different search tool. They are real pages. They were not page 1 of Google on this pass.

## What general studies say

These are not worksheet studies. They are the closest dated evidence found.

1. Observational panel. Abstract of arXiv:2608.04831, “Investigating Click Behaviors On Google Search Result Pages That Produce an AI Overview”. The abstract says: about 18% of Google searches in a one-month panel of 900 US adults produced an AI Overview; clicks on sources cited inside the Overview happened in about 1% of visits that had an Overview; a result link was clicked on 15% of searches without an Overview and 8% of searches with one; longer queries, queries that start with a question word, and queries with both a noun and a verb were more likely to show an Overview. The abstract says the design is observational, not a causal experiment. Query mix matters: worksheet queries are often noun phrases (“grade 2 math worksheets pdf”), which the abstract’s own pattern would make less likely to trigger an Overview than “how do you teach quarter hours”.

2. Field experiment, as stated in a PDF abstract dated 17 June 2026, Saharsh Agarwal and Ananya Sen, hosted at `https://stackcyber.com/files/google-ai-overview-click-reduction.pdf`. The abstract says that, conditional on an Overview appearing, outbound organic clicks fell 39.8% and zero-click searches rose 34.5%, with no change in sponsored clicks. Institutional affiliation was not verified beyond the abstract. Use it as a cited abstract, not as a settled industry constant.

3. Search Engine Land, on the France rollout (22 July, year in the article’s account): consultant examples of large click losses, and the article’s own caveat that the examples are not all sites and that timing does not prove the cause. Not US, not worksheets. Direction only.

No study found here splits “printable worksheet” or “filetype:pdf” queries from the rest. A worksheet-specific click-loss number: not found.

## Where an Overview hurts, and where a file still matters

Mechanism, not a measurement:

- “What is regrouping” or “how to teach time to the quarter hour” can be satisfied by a paragraph. An Overview can end the visit. Those pages should exist only as a short teaching note under the worksheet, not as the thing the site ranks on.
- “grade 2 quarter hour worksheet pdf” is a request for a file with several problems and a key. An Overview can explain the skill and still fail the job. The user cannot hand a paragraph to a class. That is the moat, if the result still shows links.
- The clone pages already put a worked example and the answers in the HTML. An Overview can lift that block and remove the reason to click. Putting the full answer key only in the PDF, and keeping a single worked example in the HTML, gives the Overview less to steal and still gives the teacher the file. K5 already holds full keys back for members. A free site can put one example on the page and the rest of the key in the PDF.
- Download itself is not a moat if the HTML includes every problem, because the user, or the Overview, can copy them. The PDF has to be the clean print, and the HTML has to be enough to judge the sheet.

## What this does to the moat

On this pass the Overview did not replace the file. The organic list under it was still the printable. That is the useful half of the moat, observed once, not measured as a click-through rate. The studies above say that when an Overview is present, outbound clicks fall. These 10 queries had Overviews. A lower click rate on an otherwise winnable query is the remaining risk, and it was not measured here.

The pages that rank are the incumbents, including on the two narrow queries the test cares about. “Weak SERP” is the wrong description of this sample. A new URL has to pass K5, Math-Drills, Education.com, Super Teacher, and Common Core Sheets, not a set of unlinked clones.

Log the same 10 queries again when the test pages exist. Record whether the Overview still stops at an explanation. If it starts embedding a worksheet or a generated problem set, the file moat is weaker than it was on 14 November 2026.
