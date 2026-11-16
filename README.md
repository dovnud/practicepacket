# Practice Packet

Free printable worksheets. The grade range and subject wording in the published copy, meta descriptions, and schema are taken from the skills released at the current `MAX_BATCH` (for example, grades 1 through 3 and math-only wording when `MAX_BATCH=1`). Research notes are in `research/`. The site is in `site/`.

## Build

```bash
cd site
npm install
npm test
npm run build
npm run pdfs
npm run audit
# optional: build and audit every MAX_BATCH from 1 to 7
npm run audit:batches
```

`MAX_BATCH` defaults to 3 and controls which publish wave is rendered (1 through 7). Batches 1 through 5 stay the same when the cap is raised. Batch 6 adds grades 6–8 math. Batch 7 adds reading and writing skills under `/grade-N/reading/...`, and Reading appears in subject navigation only when that wave is released. The live site is released separately and is not advanced by adding later batches. `PDF_BASE_URL` defaults to `/pdf/` and is the prefix for worksheet downloads. HTML goes to `site/dist` for Cloudflare Pages. PDFs go to `site/pdf-out` and are meant for R2, not for the Pages upload.

`npm run dev` serves the site on port 4329. PDF links 404 until the files are hosted at `PDF_BASE_URL`.
