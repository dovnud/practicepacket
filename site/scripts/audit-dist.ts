import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs'
import { join, resolve } from 'node:path'
import assert from 'node:assert/strict'

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

console.log(`audit ok: ${html.length} html files, ${files.length} files in dist`)
