import type { Problem } from './types.ts'

export function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
}

export function renderProblem(problem: Problem, index: number): string {
  const n = index + 1
  const body = renderDisplay(problem)
  return `<article class="problem"><span class="num">${n}.</span><div class="problem-body">${body}</div></article>`
}

export function renderSheet(problems: Problem[]): string {
  return problems.map(renderProblem).join('')
}

export function renderAnswers(problems: Problem[]): string {
  return `<ol class="key-list">${problems
    .map((p) => `<li>${escapeHtml(p.answer)}</li>`)
    .join('')}</ol>`
}

function renderDisplay(problem: Problem): string {
  const d = problem.display
  switch (d.kind) {
    case 'vertical':
      return `<p class="sr">${escapeHtml(problem.prompt)}</p><div class="vertical" aria-hidden="true"><div class="v-op">${d.op}</div><div class="v-nums"><div>${escapeHtml(d.a)}</div><div>${escapeHtml(d.b)}</div></div><div class="v-line"></div><div class="v-blank"></div></div>`
    case 'line':
      return `<p>${escapeHtml(d.text)}</p>`
    case 'compare':
      return `<p class="compare"><span>${escapeHtml(d.left)}</span><span class="blank" aria-label="comparison">_____</span><span>${escapeHtml(d.right)}</span></p>`
    case 'clock':
      return `<div class="clock-wrap">${clockSvg(d.hour, d.minute)}<p>Write the time.</p></div>`
    case 'fraction':
      return `<div class="frac-wrap">${d.caption.includes('number line') ? fractionLine(d.den, d.num) : fractionBar(d.den, d.num)}<p>${escapeHtml(problem.prompt)}</p></div>`
    case 'grid':
      return `<div class="grid-wrap">${gridSvg(d.cols, d.rows)}<p>${escapeHtml(problem.prompt)}</p></div>`
    case 'angle':
      return `<div class="angle-wrap">${angleSvg(d.deg)}<p>${escapeHtml(problem.prompt)}</p></div>`
    case 'dots':
      return `<div class="dots" aria-label="${d.n} dots">${'●'.repeat(d.n)}</div><p>${escapeHtml(d.caption)}</p>`
    case 'coord':
      return `<div>${coordSvg(d.x, d.y)}<p>${escapeHtml(problem.prompt)}</p></div>`
    case 'passage':
      return `<div class="passage-wrap"><p class="passage">${escapeHtml(d.text)}</p><p>${escapeHtml(d.question)}</p></div>`
    case 'trace':
      return `<div class="trace-wrap"><div class="trace-letter" data-script="${d.script}">${escapeHtml(d.letter)}</div><p class="trace-caption">${escapeHtml(problem.prompt)}</p></div>`
  }
}

function clockSvg(hour: number, minute: number): string {
  const cx = 50
  const cy = 50
  const mAngle = (minute / 60) * 360
  const hAngle = ((hour % 12) / 12) * 360 + (minute / 60) * 30
  const nums = Array.from({ length: 12 }, (_, i) => {
    const angle = ((i + 1) / 12) * Math.PI * 2 - Math.PI / 2
    const x = 50 + Math.cos(angle) * 38
    const y = 50 + Math.sin(angle) * 38
    return `<text x="${x.toFixed(1)}" y="${(y + 3).toFixed(1)}" text-anchor="middle" font-size="8" fill="#1c1915">${i + 1}</text>`
  }).join('')
  return `<svg class="clock" viewBox="0 0 100 100" role="img" aria-label="Clock showing ${hour}:${String(minute).padStart(2, '0')}"><circle cx="50" cy="50" r="46" fill="#fff" stroke="#1c1915" stroke-width="2"/>${nums}${hand(cx, cy, 26, hAngle, 2.4)}${hand(cx, cy, 36, mAngle, 1.4)}<circle cx="50" cy="50" r="2" fill="#1c1915"/></svg>`
}

function hand(cx: number, cy: number, len: number, deg: number, width: number): string {
  const a = ((deg - 90) * Math.PI) / 180
  const x = cx + len * Math.cos(a)
  const y = cy + len * Math.sin(a)
  return `<line x1="${cx}" y1="${cy}" x2="${x.toFixed(2)}" y2="${y.toFixed(2)}" stroke="#1c1915" stroke-width="${width}" stroke-linecap="round"/>`
}

function fractionBar(den: number, num: number): string {
  const w = 160
  const cell = w / den
  const rects = Array.from({ length: den }, (_, i) => {
    const fill = i < num ? '#1f3a5f' : '#fff'
    return `<rect x="${(i * cell).toFixed(2)}" y="0" width="${cell.toFixed(2)}" height="28" fill="${fill}" stroke="#1c1915"/>`
  }).join('')
  return `<svg class="frac" viewBox="0 0 160 28" role="img" aria-label="${num} of ${den} parts shaded">${rects}</svg>`
}

function fractionLine(den: number, num: number): string {
  const x0 = 12
  const x1 = 188
  const span = x1 - x0
  const ticks = Array.from({ length: den + 1 }, (_, i) => {
    const x = x0 + (span * i) / den
    return `<line x1="${x}" y1="16" x2="${x}" y2="28" stroke="#1c1915"/>`
  }).join('')
  const px = x0 + (span * num) / den
  return `<svg class="frac-line" viewBox="0 0 200 40" role="img" aria-label="Number line marked at ${num}/${den}"><line x1="${x0}" y1="22" x2="${x1}" y2="22" stroke="#1c1915"/>${ticks}<circle cx="${px}" cy="22" r="4" fill="#1f3a5f"/><text x="${x0}" y="12" font-size="8">0</text><text x="${x1 - 6}" y="12" font-size="8">1</text></svg>`
}

function gridSvg(cols: number, rows: number): string {
  const s = 16
  const cells = []
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      cells.push(`<rect x="${x * s}" y="${y * s}" width="${s}" height="${s}" fill="#fff" stroke="#1c1915"/>`)
    }
  }
  return `<svg class="grid" viewBox="0 0 ${cols * s} ${rows * s}" role="img" aria-label="${cols} by ${rows} grid">${cells.join('')}</svg>`
}

function angleSvg(deg: number): string {
  const rad = (deg * Math.PI) / 180
  const x = 20 + 70 * Math.cos(rad)
  const y = 70 - 70 * Math.sin(rad)
  return `<svg class="angle" viewBox="0 0 100 80" role="img" aria-label="${deg} degree angle"><line x1="20" y1="70" x2="90" y2="70" stroke="#1c1915" stroke-width="2"/><line x1="20" y1="70" x2="${x.toFixed(1)}" y2="${y.toFixed(1)}" stroke="#1c1915" stroke-width="2"/></svg>`
}

function coordSvg(x: number, y: number): string {
  const s = 18
  const lines = []
  for (let i = 0; i <= 5; i++) {
    lines.push(`<line x1="${i * s + 16}" y1="8" x2="${i * s + 16}" y2="${5 * s + 8}" stroke="#d9d3c7"/>`)
    lines.push(`<line x1="16" y1="${i * s + 8}" x2="${5 * s + 16}" y2="${i * s + 8}" stroke="#d9d3c7"/>`)
  }
  const px = 16 + x * s
  const py = 8 + (5 - y) * s
  return `<svg class="coord" viewBox="0 0 120 110" role="img" aria-label="Point at ${x}, ${y}">${lines.join('')}<line x1="16" y1="8" x2="16" y2="${5 * s + 8}" stroke="#1c1915"/><line x1="16" y1="${5 * s + 8}" x2="${5 * s + 16}" y2="${5 * s + 8}" stroke="#1c1915"/><circle cx="${px}" cy="${py}" r="4" fill="#1f3a5f"/></svg>`
}
