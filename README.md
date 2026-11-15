# Practice Packet

Free printable math worksheets for kindergarten through grade 5. Research notes are in `research/`. The site is in `site/`.

## Build

```bash
cd site
npm install
npm test
npm run build
npm run pdfs
npm run audit
```

`MAX_BATCH` defaults to 3 and controls which publish wave is rendered (1, 2, or 3). `PDF_BASE_URL` defaults to `/pdf/` and is the prefix for worksheet downloads. HTML goes to `site/dist` for Cloudflare Pages. PDFs go to `site/pdf-out` and are meant for R2, not for the Pages upload.

`npm run dev` serves the site on port 4329. PDF links 404 until the files are hosted at `PDF_BASE_URL`.
