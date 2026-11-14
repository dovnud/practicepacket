# 24. Scaled-content risk

Sources fetched 14 November 2026.

Google’s spam policies, last updated 2026-08-28 UTC (`developers.google.com/search/docs/essentials/spam-policies`):

> Scaled content abuse is when many pages are generated for the primary purpose of manipulating search rankings and not helping users. This abusive practice is typically focused on creating large amounts of unoriginal content that provides little to no value to users, no matter how it's created.

Examples named on that page include using generative AI to make many pages without adding value, scraping and lightly rewriting, stitching pages together, and making many pages that exist to hold keywords. The March 5, 2024 Search Central post says this replaced the older “automatically generated” framing so the rule covers automation, humans, or both. It also says AI used to manipulate rankings is spam, and AI used to make something people want is not, by itself, spam.

The helpful-content page (`developers.google.com/search/docs/fundamentals/creating-helpful-content`) warns against lots of content on many topics in the hope some of it ranks, extensive automation across many topics, and changing dates to look fresh when the content did not change. It says Google does not have a preferred word count. The generative-AI page says model output can be wrong and must be checked, including titles and alt text.

A worksheet site sits on the line. Fifty skill pages with original, checked problems are what Math-Drills and K5 already are. Five thousand pages that swap the numbers and spin the same paragraph are the example in the policy.

## Safeguards that match the policy, not a slogan

- One indexable URL per skill. Variants, including “new numbers”, stay on that URL or are canonicalized to it. File 10 already says this. The policy’s “many pages” problem is the URL count, not the PDF count.
- The problems are original and checked by a second function. A wrong key is a quality failure and also the “little value” case.
- The instructional text is written for that skill: the direction, one worked example, one mistake students make. It is not a paragraph with the skill name swapped in. Fifty of those is a few days of writing. Five hundred spun ones are the risk.
- Do not publish a page because the query exists. The 50 topics in file 26 are the list. A new topic needs the same worked example, not a template fill.
- Do not change the date when only the footer changed. Math-Drills prints a real revision date (2023-02-10 on the leaf we opened). Copy that honesty.
- Pace: publish the 50, then stop. The helpful-content page flags adding a lot of pages mainly to seem fresh. A second batch waits on Search Console, which is already the kill line in file 12.
- Say on the page, in one sentence, that the problems are generated and the answers are checked by code. The generative-AI page asks for that kind of disclosure when generation is automatic. Arithmetic from a constraint file is not a language model, and the sentence should not pretend it is.
- No second domain to “hide the scaled nature”, which the policy names directly.
- Journey’s separate rule, file 06, still stands: excessive AI use can disqualify the site from that ad network even if Google does not act.
