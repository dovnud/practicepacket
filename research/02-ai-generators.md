# 2. AI worksheet generators, 2025–26

Date of research: 14 November 2026.

## What the traffic data says

On Semrush’s October 2026 pages, AI-platform referrals are a rounding error next to search and direct:

| Site | Largest AI source shown | Share of total |
| --- | --- | --- |
| K5 Learning | ChatGPT, 2K in the six-month absolute module; share last month 0.085% | Under 0.2% combined for the named bots |
| Super Teacher | ChatGPT 0.165% | Under 0.3% |
| Math-Drills | ChatGPT 0.065% | Under 0.2% |
| Education.com | ChatGPT 0.044%. chalkie.ai appears at 0.014% | Under 0.2% |
| Teachers Pay Teachers | ChatGPT 0.221%, and 35K in the six-month module | Under 0.4% named |
| Superstar Worksheets | ChatGPT 0.066% | Under 0.2% |
| Twinkl | ChatGPT 0.13% | Under 0.2% |

Source: the Semrush overview pages cited in file 01, last updated 11 November 2026. These are Semrush’s AI-referral estimates, not server logs. They say teachers and parents are not yet arriving from ChatGPT in volume. They do not say teachers are not using AI instead of searching.

K5’s module also lists magicschool.ai as a referrer (439 in the six-month absolute module, 0.017% share). MagicSchool is already sending a little traffic, which means some teachers generate a lesson there and still click out. That is a small leak, not a collapse.

## The tools

Product pages and roundups fetched or returned in search on 14 November 2026. Prices below are from those pages, not from a checkout.

| Tool | What the page says it does | Price found | Threat |
| --- | --- | --- | --- |
| MagicSchool worksheet generator, magicschool.ai/tools/worksheet-generator | Turns a topic, text, or objective into an editable worksheet. Grade, reading level, question types, length. | A 2026 teacher roundup (tpd.edu.au) says there is a free tier and school plans “around USD $99 per teacher per year”. The vendor page fetched did not state the price. Mark the $99 as secondary. | High for a teacher who wants one custom sheet tonight. Low for a parent who wants a known printable. |
| Brisk Teaching printables, briskteaching.com | Chrome-side tool. Seven formats: Frayer, KWL, Venn, Q&A, worksheet, mind map, newsletter. The printables page says the generator is free. A roundup lists Educator Pro at $14.99. | Free for the printables generator, as stated on Brisk’s page. $14.99 is secondary. | High inside Google Docs. The output is a doc, not a catalog Google can rank. |
| Diffit | Roundups call it the strongest differentiated exporter to Google, Microsoft, or print. | A free version is described. A public price was not confirmed here. | High for reading passages and leveled texts. Less central for arithmetic drills. |
| Canva worksheet maker, canva.com/create/worksheets | Templates and a PDF-print export. Magic Write fills copy. Canva for Education is free for eligible K-12 teachers (stated in the roundups, not re-checked on Canva’s eligibility page). | Free for eligible teachers, secondary. | High for looks. Weak on answer keys and on one-skill scope unless the teacher edits. |
| ChatGPT, Claude, Gemini | Not a worksheet product. Teachers paste a standard and ask for 12 problems. | Consumer subscriptions, not re-checked. | High for a one-off. Weak at a consistent one-page layout, a second variant with the same difficulty, and a key that is guaranteed to match. |
| Chalkie | Named as an AI referrer to Education.com (0.014%). Roundups describe printables bundled with slides, with a free cap of about 5 resources a week. | Secondary. | A new catalog, not just a generator. |
| Education.com’s own generator | 21 URLs in `sitemap-worksheet-generator.xml`. | Inside the membership. | The incumbent already ships this. |
| Kids Academy | FAQ calls the product “AI-powered” and lists voiced, auto-scored worksheets inside a $19.99/month app. | Verified on their FAQ extract. | App practice, not a printable SERP. |

Roundup used for the comparison table, not as a traffic source: theaileaderboard.org, “Best AI Worksheet Generators for Teachers in 2026”. Treat its ranking as opinion.

## The clone sites, which matter more than the chatbots

Web search on 14 November 2026 for the two narrow queries in the brief did not return K5, Math-Drills, or Super Teacher in the first results. It returned new domains built on the same template the plan describes: grade, Common Core code, worked example, answer key, PDF, no login.

For “telling time to the quarter hour worksheet grade 2”:

- endlessmathsheets.com
- mathprintable.com
- printandfridge.com
- mathdrillpages.com
- pencilgo.com

For “regrouping subtraction worksheets”:

- math-pages.com
- mathpracticeonline.com
- brighterly.com (an established tutoring brand, not a clone)
- animalmath.com
- mathminute.com

This search tool is not Google. Order is not a rank. The finding is that the pages exist and are indexed somewhere in the open web. Several of them read as if one template produced them: a worked example, a “common mistake”, a standard code, and a generated answer key. That is the 2025–26 clone wave. It is already aimed at the exact long-tail, not at the head term “math worksheets”.

Brighterly is the exception. Its page is a tutoring company’s content marketing (byline and an October 22, 2026 update on the captured page), with a few PDFs. That is an affiliate/lead competitor, not a worksheet library.

## How serious the threat is

Three different jobs:

1. “Make me a sheet for my class tomorrow, with these names and this reading level.” MagicSchool, Brisk, Diffit, and ChatGPT do this better than any static library. A new site should not try to win that job in phase 1. There is no moat.

2. “Free printable, grade 2, quarter hour, with the answers, one page.” A parent, and many teachers, still want a file they can open and print. Autocomplete (file 03) is full of “pdf”, “free”, “with answers”. Chatbots are bad at handing over a stable PDF with a matching key. That job is still a search job. The clone sites are the competitors for it, not ChatGPT.

3. “A set I trust, ten variants, same layout, keys checked.” Incumbents win this on brand (Super Teacher, K5). A new site can win it only if the problems are checked by code and the pages are not thin duplicates. Journey’s rules (file 06) treat “excessive use of AI” as a disqualifier. A library that is obviously machine-written prose around machine-written problems can fail both Google’s scaled-content systems and the ad networks. Arithmetic generated from a tested template is easier to defend than AI-written reading passages.

## What to do about it

- Do not add an “AI worksheet generator” as the product. Education.com already has one, and the chat tools are free to the teacher.
- Do generate the problems with code, and check every answer with code. Say that on the page in plain language. That is the opposite of an unchecked chatbot sheet.
- Keep one indexable URL per skill. The clones are already publishing many near-copies. More copies will not outrank them.
- Watch Search Console for the clone domains if the test is run. If they hold the top 10 and have no referring domains, the SERP may still be movable. If they have links and history, the long-tail is not cheap.
