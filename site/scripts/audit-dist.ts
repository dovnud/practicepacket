import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs'
import { join, resolve } from 'node:path'
import assert from 'node:assert/strict'
import { LEVELS } from '../src/lib/types.ts'
import { maxBatch, pdfRel, publishedSkills, skillPath } from '../src/lib/skills.ts'

const dist = resolve('dist')
const files: string[] = []
function walk(dir: string) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name)
    if (statSync(full).isDirectory()) walk(full)
    else files.push(full)
  }
}
walk(dist)
const html = files.filter((f) => f.endsWith('.html'))
const titles = new Map<string, string>()
const descriptions = new Map<string, string>()
const hrefs = new Set<string>()

for (const file of html) {
  const text = readFileSync(file, 'utf8')
  const title = text.match(/<title>(.*?)<\/title>/)?.[1] || ''
  const desc = text.match(/<meta name="description" content="(.*?)"/)?.[1] || ''
  assert.ok(title, file)
  assert.ok(desc, file)
  assert.equal(titles.has(title), false, `duplicate title ${title}`)
  assert.equal(descriptions.has(desc), false, `duplicate description ${desc}`)
  titles.set(title, file)
  descriptions.set(desc, file)
  const emails = text.match(/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/g) || []
  for (const email of emails) assert.equal(email, 'contact@practicepacket.com', email)
  for (const match of text.matchAll(/href="(\/[^"]*)"/g)) hrefs.add(match[1])
}

const pages = new Set(html.map((file) => {
  const rel = file.slice(dist.length).replaceAll('\\', '/')
  if (rel.endsWith('/index.html')) return rel.slice(0, -'index.html'.length) || '/'
  return rel
}))

for (const href of hrefs) {
  const path = href.split('#')[0]
  if (!path.startsWith('/') || path.startsWith('/pdf/')) continue
  const rel = path.replace(/^\//, '')
  const asFile = join(dist, rel)
  const asDir = join(dist, rel, 'index.html')
  assert.ok(pages.has(path) || existsSync(asFile) || existsSync(asDir), `broken internal link ${path}`)
}

const published = publishedSkills()
const skillPages = new Set(published.map((s) => skillPath(s)))
for (const path of skillPages) {
  assert.ok(pages.has(path), `missing published skill page ${path}`)
}
for (const path of pages) {
  if (!path.startsWith('/grade-')) continue
  const parts = path.split('/').filter(Boolean)
  // skill pages are /grade-N/subject/topic/slug/
  if (parts.length === 4) {
    assert.ok(skillPages.has(path), `unreleased skill page in dist ${path}`)
  }
}

const sitemapPath = existsSync(join(dist, 'sitemap.xml'))
  ? join(dist, 'sitemap.xml')
  : join(dist, 'sitemap-0.xml')
assert.ok(existsSync(sitemapPath), 'missing sitemap.xml or sitemap-0.xml')
const xml = readFileSync(sitemapPath, 'utf8')
const sitemapUrls = [...xml.matchAll(/<loc>https:\/\/practicepacket\.com([^<]*)<\/loc>/g)].map((m) => m[1] || '/')
const sitemapPages = new Set(sitemapUrls.map((u) => (u === '' ? '/' : u)))
const expectedSitemap = new Set([...pages].filter((p) => p !== '/404.html' && p !== '/404'))
assert.deepEqual([...sitemapPages].sort(), [...expectedSitemap].sort(), 'sitemap does not match released pages')

const pdfOut = resolve('pdf-out')
for (const skill of published) {
  for (const level of LEVELS) {
    const rel = pdfRel(skill, level)
    const inDist = join(dist, 'pdf', rel)
    const inOut = join(pdfOut, rel)
    assert.ok(existsSync(inDist) || existsSync(inOut), `missing PDF for ${skill.id} ${level} (${rel})`)
  }
}

console.log(`audit ok: MAX_BATCH=${maxBatch()}, ${published.length} skills, ${html.length} html files, ${sitemapPages.size} sitemap urls, ${files.length} files in dist`)
