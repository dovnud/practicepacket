import { createWriteStream, mkdirSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { finished } from 'node:stream/promises'
import PDFDocument from 'pdfkit'
import { sheet } from '../src/lib/generate.ts'
import { pdfRel, publishedSkills } from '../src/lib/skills.ts'
import { LEVELS, type Problem } from '../src/lib/types.ts'

const root = resolve('pdf-out')

for (const skill of publishedSkills()) {
  for (const level of LEVELS) {
    const problems = sheet(skill, level, 0)
    const file = resolve(root, pdfRel(skill, level))
    mkdirSync(dirname(file), { recursive: true })
    await writePdf(file, `${skill.title} (${level})`, skill.direction, problems)
  }
}

console.log(`wrote ${publishedSkills().length * LEVELS.length} pdfs to ${root}`)

async function writePdf(file: string, title: string, direction: string, problems: Problem[]) {
  const doc = new PDFDocument({ size: 'LETTER', margin: 48 })
  const stream = createWriteStream(file)
  doc.pipe(stream)
  drawPage(doc, title, direction, problems, false)
  doc.addPage()
  drawPage(doc, `${title} answer key`, 'Answers match the worksheet.', problems, true)
  doc.end()
  await finished(stream)
}

function drawMark(doc: PDFKit.PDFDocument, x: number, y: number) {
  doc.save()
  doc.lineWidth(1.2).roundedRect(x, y, 16, 18, 3).stroke()
  doc.moveTo(x + 3, y + 6).lineTo(x + 13, y + 6).stroke()
  doc.moveTo(x + 3, y + 10).lineTo(x + 13, y + 10).stroke()
  doc.moveTo(x + 3, y + 14).lineTo(x + 9, y + 14).stroke()
  doc.restore()
}

function drawPage(doc: PDFKit.PDFDocument, title: string, direction: string, problems: Problem[], key: boolean) {
  drawMark(doc, 48, 36)
  doc.font('Helvetica-Bold').fontSize(11).fillColor('#111').text('Practice Packet', 70, 36, { lineBreak: false })
  doc.font('Helvetica').fontSize(8).fillColor('#333').text('practicepacket.com', 70, 50, { lineBreak: false })
  doc.moveTo(48, 64).lineTo(564, 64).strokeColor('#111').lineWidth(0.6).stroke()
  doc.fillColor('#111')
  doc.font('Helvetica-Bold').fontSize(16).text(title, 48, 74, { width: 516 })
  doc.moveDown(0.3)
  doc.font('Helvetica').fontSize(11).text(direction)
  if (!key) {
    doc.moveDown(0.4)
    doc.text('Name ___________________________    Date ______________')
  }
  doc.moveDown(0.6)
  const long = problems.some((p) => p.display.kind === 'passage' || p.display.kind === 'trace' || (p.display.kind === 'line' && p.display.text.length > 90))
  if (long) {
    problems.forEach((problem, index) => {
      if (doc.y > 700) doc.addPage()
      const y = doc.y
      doc.font('Helvetica').fontSize(12).text(`${index + 1}.`, 48, y, { lineBreak: false })
      if (key) {
        doc.font('Helvetica-Bold').text(problem.answer, 70, y, { width: 494 })
        doc.moveDown(0.8)
        return
      }
      drawProblem(doc, problem, 70, y, 494)
      doc.moveDown(1)
    })
    return
  }
  const startY = doc.y
  const colW = 250
  problems.forEach((problem, index) => {
    const col = index % 2
    const row = Math.floor(index / 2)
    const x = 48 + col * colW
    const y = startY + row * 78
    if (y > 700) return
    doc.font('Helvetica').fontSize(12).text(`${index + 1}.`, x, y, { lineBreak: false })
    if (key) {
      doc.font('Helvetica-Bold').text(problem.answer, x + 22, y, { width: colW - 30 })
      return
    }
    drawProblem(doc, problem, x + 22, y, colW - 30)
  })
}

function drawProblem(doc: PDFKit.PDFDocument, problem: Problem, x: number, y: number, width: number) {
  const d = problem.display
  doc.font('Helvetica').fontSize(12)
  if (d.kind === 'vertical') {
    doc.text(d.a, x, y, { width: 70, align: 'right' })
    doc.text(`${d.op} ${d.b}`, x, y + 14, { width: 70, align: 'right' })
    doc.moveTo(x + 10, y + 32).lineTo(x + 80, y + 32).stroke()
    return
  }
  if (d.kind === 'clock') {
    drawClock(doc, x + 28, y + 28, 22, d.hour, d.minute)
    return
  }
  if (d.kind === 'fraction') {
    drawBar(doc, x, y + 4, d.den, d.num)
    doc.fontSize(9).text(problem.prompt, x, y + 28, { width })
    return
  }
  if (d.kind === 'grid') {
    drawGrid(doc, x, y, d.cols, d.rows)
    return
  }
  if (d.kind === 'angle') {
    drawAngle(doc, x + 8, y + 36, d.deg)
    return
  }
  if (d.kind === 'dots') {
    doc.text('●'.repeat(d.n), x, y, { width })
    return
  }
  if (d.kind === 'coord') {
    doc.text(`Point: right ${d.x}, up ${d.y}. Write the pair.`, x, y, { width })
    return
  }
  if (d.kind === 'compare') {
    doc.text(`${d.left}    _____    ${d.right}`, x, y, { width })
    return
  }
  if (d.kind === 'passage') {
    doc.fontSize(11).text(d.text, x, y, { width })
    doc.moveDown(0.35)
    doc.fontSize(12).text(d.question, { width })
    return
  }
  if (d.kind === 'trace') {
    doc.fontSize(d.script === 'cursive' ? 28 : 32).text(d.letter, x, y)
    doc.fontSize(10).text(problem.prompt, x, y + 36, { width })
    doc.moveTo(x, y + 58).lineTo(x + 180, y + 58).stroke()
    return
  }
  doc.text(d.kind === 'line' ? d.text : problem.prompt, x, y, { width })
}

function drawClock(doc: PDFKit.PDFDocument, cx: number, cy: number, r: number, hour: number, minute: number) {
  doc.circle(cx, cy, r).stroke()
  const hand = (len: number, deg: number) => {
    const a = ((deg - 90) * Math.PI) / 180
    doc.moveTo(cx, cy).lineTo(cx + len * Math.cos(a), cy + len * Math.sin(a)).stroke()
  }
  hand(r * 0.55, ((hour % 12) / 12) * 360 + (minute / 60) * 30)
  hand(r * 0.8, (minute / 60) * 360)
}

function drawBar(doc: PDFKit.PDFDocument, x: number, y: number, den: number, num: number) {
  const w = 90 / den
  for (let i = 0; i < den; i++) {
    doc.rect(x + i * w, y, w, 14)
    if (i < num) doc.fillAndStroke('#111111', '#111111')
    else doc.stroke()
  }
}

function drawGrid(doc: PDFKit.PDFDocument, x: number, y: number, cols: number, rows: number) {
  const s = 10
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) doc.rect(x + c * s, y + r * s, s, s).stroke()
  }
}

function drawAngle(doc: PDFKit.PDFDocument, x: number, y: number, deg: number) {
  const rad = (deg * Math.PI) / 180
  doc.moveTo(x, y).lineTo(x + 40, y).stroke()
  doc.moveTo(x, y).lineTo(x + 40 * Math.cos(rad), y - 40 * Math.sin(rad)).stroke()
}
