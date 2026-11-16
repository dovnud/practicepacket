import { cpSync, copyFileSync, existsSync, mkdirSync, rmSync } from 'node:fs'
import { spawnSync } from 'node:child_process'
import { resolve } from 'node:path'

const site = resolve('.')

function run(command: string, args: string[], env: NodeJS.ProcessEnv) {
  const result = spawnSync(command, args, { cwd: site, env, stdio: 'inherit' })
  if (result.status !== 0) {
    throw new Error(`${command} ${args.join(' ')} failed with status ${result.status}`)
  }
}

for (const batch of [1, 2, 3, 4, 5, 6, 7]) {
  console.log(`\n===== auditing MAX_BATCH=${batch} =====`)
  const env = { ...process.env, MAX_BATCH: String(batch), PDF_BASE_URL: '/pdf/' }
  run('npm', ['run', 'build'], env)
  rmSync(resolve('pdf-out'), { recursive: true, force: true })
  rmSync(resolve('dist/pdf'), { recursive: true, force: true })
  run('npm', ['run', 'pdfs'], env)
  mkdirSync(resolve('dist/pdf'), { recursive: true })
  cpSync(resolve('pdf-out'), resolve('dist/pdf'), { recursive: true })
  const src = existsSync(resolve('dist/sitemap-0.xml')) ? resolve('dist/sitemap-0.xml') : resolve('dist/sitemap-index.xml')
  copyFileSync(src, resolve('dist/sitemap.xml'))
  run('npm', ['run', 'audit'], env)
}

console.log('\naudit-batches ok: MAX_BATCH 1-7')
