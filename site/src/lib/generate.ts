import { Rng, hashSeed } from './rng.ts'
import { frac, problem } from './solve.ts'
import type { Level, Problem, Skill, Spec } from './types.ts'

const NAMES = ['Sam', 'Mia', 'Leo', 'Ava', 'Noah', 'Priya', 'Owen', 'Lila', 'Jules', 'Noor']
const SHAPES: { name: string; sides: number }[] = [
  { name: 'triangle', sides: 3 },
  { name: 'square', sides: 4 },
  { name: 'rectangle', sides: 4 },
  { name: 'pentagon', sides: 5 },
  { name: 'hexagon', sides: 6 },
]

function countFor(level: Level, spec: Spec): number {
  const wide = spec.kind === 'clock' || spec.kind === 'frac-bar' || spec.kind === 'frac-line' || spec.kind === 'angle' || spec.kind === 'coord'
  let n = wide ? (level === 'easy' ? 4 : level === 'medium' ? 6 : 8) : level === 'easy' ? 6 : level === 'medium' ? 9 : 12
  if (spec.kind === 'dots') n = Math.min(n, spec.max)
  if (spec.kind === 'sides') n = Math.min(n, 5)
  if (spec.kind === 'angle') n = Math.min(n, 7)
  if (spec.kind === 'make10') n = Math.min(n, 9)
  if ((spec.kind === 'add' || spec.kind === 'sub') && spec.within && spec.within <= 5) n = Math.min(n, 6)
  if (spec.kind === 'sub' && spec.within && spec.within <= 10) n = Math.min(n, 10)
  return n
}

function loosen(level: Level): number {
  return level === 'easy' ? 0 : level === 'medium' ? 1 : 2
}

export function makeProblems(spec: Spec, level: Level, seed: number): Problem[] {
  const rng = new Rng(seed)
  const n = countFor(level, spec)
  const out: Problem[] = []
  const seen = new Set<string>()
  let guard = 0
  while (out.length < n && guard < 400) {
    guard++
    const item = one(spec, level, rng)
    const key = JSON.stringify(item.display)
    if (seen.has(key)) continue
    seen.add(key)
    out.push(item)
  }
  if (out.length < 4) {
    throw new Error(`generator starved for ${spec.kind} ${level}: ${out.length}/${n}`)
  }
  return out
}

export function sheet(skill: Skill, level: Level, variant = 0): Problem[] {
  return makeProblems(skill.spec, level, hashSeed(`${skill.id}:${level}:${variant}`))
}

function one(spec: Spec, level: Level, rng: Rng): Problem {
  const hard = loosen(level)
  switch (spec.kind) {
    case 'add':
      return addProblem(spec, level, rng)
    case 'sub':
      return subProblem(spec, level, rng)
    case 'mul':
      return mulFact(spec, rng)
    case 'div':
      return divFact(spec, rng)
    case 'missing-factor':
      return missingFactor(spec, rng)
    case 'cmp':
      return compare(spec, level, rng)
    case 'round':
      return roundProblem(spec, level, rng)
    case 'clock':
      return clockProblem(spec, rng)
    case 'digit':
      return digitProblem(spec, rng)
    case 'expanded':
      return expanded(spec, level, rng)
    case 'teen':
      return teen(rng)
    case 'make10':
      return make10(rng)
    case 'even':
      return evenOdd(level, rng)
    case 'money':
      return money(level, rng)
    case 'elapsed':
      return elapsed(level, rng)
    case 'area':
      return area(level, rng)
    case 'peri':
      return peri(level, rng)
    case 'frac-bar':
      return fracBar(spec, rng)
    case 'frac-line':
      return fracLine(spec, rng)
    case 'frac-eq':
      return fracEq(rng)
    case 'frac-add':
      return fracAdd(level, rng)
    case 'frac-mul':
      return fracMul(rng)
    case 'frac-div':
      return fracDiv(rng)
    case 'factors':
      return factors(level, rng)
    case 'mul10':
      return mul10(level, rng)
    case 'volume':
      return volume(level, rng)
    case 'coord':
      return coord(rng)
    case 'ops':
      return ops(rng)
    case 'dec':
      return dec(spec, rng)
    case 'angle':
      return angle(rng)
    case 'dots':
      return dots(spec, level, rng)
    case 'sides':
      return sides(rng)
    case 'next':
      return nextNum(spec, rng)
    case 'skip':
      return skip(spec, rng)
    case 'tenmore':
      return tenMore(level, rng)
    case 'word':
      return word(spec, level, rng)
    case 'longmul':
      return longMul(spec, level, rng)
    case 'longdiv':
      return longDiv(spec, level, rng)
    case 'mul-tens':
      return mulTens(rng)
    default:
      throw new Error('unknown spec')
  }
}

function addProblem(spec: Extract<Spec, { kind: 'add' }>, level: Level, rng: Rng): Problem {
  if (spec.within) {
    const cap = level === 'easy' ? Math.min(10, spec.within) : spec.within
    for (let i = 0; i < 40; i++) {
      const a = rng.int(level === 'hard' ? 2 : 1, level === 'easy' ? cap : Math.min(cap, 14))
      const bMax = Math.max(1, cap - a)
      const b = rng.int(1, bMax)
      const ones = (a % 10) + (b % 10) >= 10
      if (spec.regroup === 'yes' && !ones) continue
      if (spec.regroup === 'no' && ones) continue
      if (spec.regroup === 'mix' && level !== 'easy' && i < 20 && ones !== i % 2 === 0) continue
      return vertical('+', [a, b], `${a} + ${b}`)
    }
  }
  const [da, db] = spec.digits || [2, 2]
  for (let i = 0; i < 50; i++) {
    const a = rng.digits(level === 'easy' ? Math.max(1, da - 0) : da)
    const b = rng.digits(level === 'hard' ? db : Math.max(1, db))
    const ones = (a % 10) + (b % 10) >= 10
    if (spec.regroup === 'yes' && !ones) continue
    if (spec.regroup === 'no' && ones) continue
    return vertical('+', [a, b], `${a} + ${b}`)
  }
  return vertical('+', [18, 7], '18 + 7')
}

function subProblem(spec: Extract<Spec, { kind: 'sub' }>, level: Level, rng: Rng): Problem {
  const [da, db] = spec.digits
  if (spec.within) {
    const cap = level === 'easy' && spec.within > 10 ? Math.ceil(spec.within / 2) : spec.within
    const a = rng.int(2, cap)
    const b = rng.int(1, a - 1)
    return vertical('−', [a, b], `${a} − ${b}`)
  }
  if (spec.regroup === 'zero') {
    const a = rng.int(level === 'easy' ? 2 : 3, level === 'hard' ? 9 : 8) * 10
    const b = rng.int(1, a - 1)
    if (b % 10 === 0) return vertical('−', [a, b - 1], `${a} − ${b - 1}`)
    return vertical('−', [a, b], `${a} − ${b}`)
  }
  if (spec.regroup === 'across') {
    for (let i = 0; i < 40; i++) {
      const h = rng.int(2, 9)
      const ones = rng.int(0, 7)
      const bOnes = rng.int(ones + 1, 9)
      const bTens = rng.int(1, 9)
      const bH = rng.int(1, h - 1)
      const a = h * 100 + ones
      const b = bH * 100 + bTens * 10 + bOnes
      if (a > b) return vertical('−', [a, b], `${a} − ${b}`)
    }
  }
  if (spec.regroup === 'no') {
    const cols = da
    let a = 0
    let b = 0
    let place = 1
    for (let c = 0; c < cols; c++) {
      const bd = c === 0 ? rng.int(0, 7) : rng.int(0, 8)
      const ad = rng.int(Math.max(bd, c === cols - 1 ? 1 : 0), 9)
      a += ad * place
      b += bd * place
      place *= 10
    }
    if (a > b && b > 0) return vertical('−', [a, b], `${a} − ${b}`)
  }
  for (let i = 0; i < 50; i++) {
    const a = rng.digits(da)
    let b = rng.int(1, a - 1)
    if (String(b).length > db) b = rng.digits(db)
    if (b >= a) continue
    const borrow = a % 10 < b % 10
    if (spec.regroup === 'yes' && !borrow) continue
    if (spec.regroup === 'no' && borrow) continue
    return vertical('−', [a, b], `${a} − ${b}`)
  }
  return vertical('−', [42, 17], '42 − 17')
}

function vertical(op: '+' | '−' | '×' | '÷', nums: number[], prompt: string): Problem {
  const [a, b] = nums
  const proof =
    op === '+'
      ? ({ t: 'add', ns: [a, b] } as const)
      : op === '−'
        ? ({ t: 'sub', a, b } as const)
        : op === '×'
          ? ({ t: 'mul', a, b } as const)
          : ({ t: 'div', a, b } as const)
  return problem(prompt, { kind: 'vertical', op, a: String(a), b: String(b) }, proof)
}

function mulFact(spec: Extract<Spec, { kind: 'mul' }>, rng: Rng): Problem {
  const a = spec.mode === 'to' ? rng.int(0, spec.hi) : rng.int(spec.lo, spec.hi)
  const b = spec.mode === 'to' ? rng.int(0, spec.hi) : rng.int(0, 10)
  const left = spec.mode === 'from' ? rng.pick([a, b]) : a
  const right = left === a && spec.mode === 'from' ? b : spec.mode === 'from' ? a : b
  return vertical('×', [left, right], `${left} × ${right}`)
}

function divFact(spec: Extract<Spec, { kind: 'div' }>, rng: Rng): Problem {
  const divisor = spec.mode === 'to' ? rng.int(1, spec.hi) : rng.int(spec.lo, spec.hi)
  const quotient = spec.mode === 'to' ? rng.int(0, spec.hi) : rng.int(1, 10)
  const dividend = divisor * quotient
  return vertical('÷', [dividend, divisor], `${dividend} ÷ ${divisor}`)
}

function missingFactor(spec: Extract<Spec, { kind: 'missing-factor' }>, rng: Rng): Problem {
  const a = rng.int(spec.lo, spec.hi)
  const b = rng.int(1, spec.hi)
  const product = a * b
  const proof = { t: 'missing' as const, total: product, known: a }
  return problem(`${a} × ___ = ${product}`, { kind: 'line', text: `${a} × ___ = ${product}` }, proof)
}

function compare(spec: Extract<Spec, { kind: 'cmp' }>, level: Level, rng: Rng): Problem {
  const max = level === 'easy' ? Math.min(20, spec.max) : spec.max
  let a = rng.int(0, max)
  let b = rng.int(0, max)
  if (level !== 'hard' && rng.int(0, 4) === 0) b = a
  return problem(`${a} ___ ${b}`, { kind: 'compare', left: String(a), right: String(b) }, { t: 'cmp', a, b })
}

function roundProblem(spec: Extract<Spec, { kind: 'round' }>, level: Level, rng: Rng): Problem {
  const digits = level === 'easy' ? Math.max(2, spec.digits - 1) : spec.digits
  const n = rng.digits(digits)
  const place = spec.place
  return problem(
    `Round ${n} to the nearest ${place}.`,
    { kind: 'line', text: `Round ${n} to the nearest ${place}.` },
    { t: 'round', n, place },
  )
}

function clockProblem(spec: Extract<Spec, { kind: 'clock' }>, rng: Rng): Problem {
  const h = rng.int(1, 12)
  const m = rng.pick(spec.minutes)
  return problem('Write the time.', { kind: 'clock', hour: h, minute: m }, { t: 'clock', h, m })
}

function digitProblem(spec: Extract<Spec, { kind: 'digit' }>, rng: Rng): Problem {
  const n = rng.digits(spec.digits)
  const place = rng.pick(spec.places)
  const placeName = place === 1 ? 'ones' : place === 10 ? 'tens' : place === 100 ? 'hundreds' : place === 1000 ? 'thousands' : 'ten-thousands'
  return problem(
    `What is the value of the ${placeName} digit in ${n}?`,
    { kind: 'line', text: `Value of the ${placeName} digit in ${n}` },
    { t: 'digit', n, place },
  )
}

function expanded(spec: Extract<Spec, { kind: 'expanded' }>, level: Level, rng: Rng): Problem {
  const n = rng.digits(level === 'easy' ? Math.max(2, spec.digits - 1) : spec.digits)
  return problem(`Write ${n} in expanded form.`, { kind: 'line', text: `${n} =` }, { t: 'expanded', n })
}

function teen(rng: Rng): Problem {
  const n = rng.int(11, 19)
  return problem(`How many tens and ones are in ${n}?`, { kind: 'line', text: n + '' }, { t: 'teen', n })
}

function make10(rng: Rng): Problem {
  const known = rng.int(1, 9)
  return problem(`${known} + ___ = 10`, { kind: 'line', text: `${known} + ___ = 10` }, { t: 'missing', total: 10, known })
}

function evenOdd(level: Level, rng: Rng): Problem {
  const n = rng.int(0, level === 'easy' ? 20 : level === 'medium' ? 50 : 99)
  return problem(`Is ${n} even or odd?`, { kind: 'line', text: String(n) }, { t: 'even', n })
}

function money(level: Level, rng: Rng): Problem {
  const q = level === 'easy' ? 0 : rng.int(0, 3)
  const d = rng.int(0, level === 'easy' ? 3 : 5)
  const n = level === 'hard' ? rng.int(0, 3) : rng.int(0, 1)
  const p = rng.int(0, 4)
  if (q + d + n + p === 0) return money(level, rng)
  const bits = [
    q ? `${q} quarter${q > 1 ? 's' : ''}` : '',
    d ? `${d} dime${d > 1 ? 's' : ''}` : '',
    n ? `${n} nickel${n > 1 ? 's' : ''}` : '',
    p ? `${p} penn${p > 1 ? 'ies' : 'y'}` : '',
  ].filter(Boolean)
  const text = `How many cents? ${bits.join(', ')}.`
  return problem(text, { kind: 'line', text }, { t: 'money', q, d, n, p })
}

function elapsed(level: Level, rng: Rng): Problem {
  const h = rng.int(1, 12)
  const m = level === 'easy' ? rng.pick([0, 15, 30]) : rng.int(0, 11) * 5
  const add = level === 'easy' ? rng.pick([10, 15, 30]) : rng.int(1, 11) * 5
  const text = `It is ${h}:${String(m).padStart(2, '0')}. What time will it be in ${add} minutes?`
  return problem(text, { kind: 'line', text }, { t: 'elapsed', h, m, add })
}

function area(level: Level, rng: Rng): Problem {
  const w = rng.int(2, level === 'easy' ? 4 : 8)
  const h = rng.int(2, level === 'easy' ? 3 : 6)
  return problem(
    `A rectangle is ${w} units by ${h} units. What is the area in square units?`,
    { kind: 'grid', cols: w, rows: h, caption: 'Count the square units.' },
    { t: 'area', w, h },
  )
}

function peri(level: Level, rng: Rng): Problem {
  const w = rng.int(2, level === 'easy' ? 6 : 12)
  const h = rng.int(2, level === 'easy' ? 6 : 12)
  const text = `A rectangle is ${w} units long and ${h} units wide. What is the perimeter?`
  return problem(text, { kind: 'line', text }, { t: 'peri', w, h })
}

function fracBar(spec: Extract<Spec, { kind: 'frac-bar' }>, rng: Rng): Problem {
  const d = rng.pick(spec.denoms)
  const n = rng.int(1, d - 1)
  return problem(
    'What fraction of the bar is shaded?',
    { kind: 'fraction', den: d, num: n, caption: 'Shaded part of the bar' },
    { t: 'frac', n, d },
  )
}

function fracLine(spec: Extract<Spec, { kind: 'frac-line' }>, rng: Rng): Problem {
  const d = rng.pick(spec.denoms)
  const n = rng.int(1, d - 1)
  return problem(
    'What fraction is marked on the number line from 0 to 1?',
    { kind: 'fraction', den: d, num: n, caption: 'Point on a number line' },
    { t: 'frac', n, d },
  )
}

function fracEq(rng: Rng): Problem {
  const n = rng.int(1, 4)
  const d = n + rng.int(1, 4)
  const k = rng.int(2, 4)
  const text = `${n}/${d} = ${n * k}/___`
  return problem(text, { kind: 'line', text }, { t: 'missing', total: d * k, known: 0 })
}

function fracAdd(level: Level, rng: Rng): Problem {
  if (level === 'hard') {
    const pairs = [
      [1, 2, 1, 4],
      [1, 3, 1, 6],
      [1, 2, 1, 3],
      [1, 4, 1, 2],
    ] as const
    const [n1, d1, n2, d2] = rng.pick(pairs)
    const text = `${n1}/${d1} + ${n2}/${d2}`
    return problem(text, { kind: 'line', text }, { t: 'fracAdd', n1, d1, n2, d2 })
  }
  const d = rng.pick([2, 3, 4, 6, 8])
  let n1 = rng.int(1, d - 2)
  let n2 = rng.int(1, d - n1)
  const text = `${n1}/${d} + ${n2}/${d}`
  return problem(text, { kind: 'line', text }, { t: 'fracAdd', n1, d1: d, n2, d2: d })
}

function fracMul(rng: Rng): Problem {
  const n1 = rng.int(1, 3)
  const d1 = rng.int(n1 + 1, 5)
  const n2 = rng.int(1, 3)
  const d2 = rng.int(n2 + 1, 5)
  const text = `${n1}/${d1} × ${n2}/${d2}`
  return problem(text, { kind: 'line', text }, { t: 'fracMul', n1, d1, n2, d2 })
}

function fracDiv(rng: Rng): Problem {
  if (rng.int(0, 1) === 0) {
    const d = rng.pick([2, 3, 4])
    const w = rng.int(2, 4)
    const text = `1/${d} ÷ ${w}`
    return problem(text, { kind: 'line', text }, { t: 'fracDiv', kind: 'unit-by-whole', n: 1, d, w })
  }
  const d = rng.pick([2, 3, 4])
  const w = rng.int(2, 5)
  const text = `${w} ÷ 1/${d}`
  return problem(text, { kind: 'line', text }, { t: 'fracDiv', kind: 'whole-by-unit', n: 1, d, w })
}

function factors(level: Level, rng: Rng): Problem {
  const choices = level === 'easy' ? [6, 8, 9, 10, 12, 14, 15, 16] : level === 'medium' ? [12, 16, 18, 20, 24, 28, 30] : [18, 20, 24, 28, 30, 32, 36, 40, 42, 48]
  const n = rng.pick(choices)
  return problem(`List all the factors of ${n}.`, { kind: 'line', text: `Factors of ${n}` }, { t: 'factors', n })
}

function mul10(level: Level, rng: Rng): Problem {
  const n = rng.int(1, 9)
  const pow = level === 'easy' ? 1 : level === 'medium' ? rng.int(1, 2) : rng.int(2, 3)
  const text = `${n} × ${10 ** pow}`
  return problem(text, { kind: 'line', text }, { t: 'mul10', n, pow })
}

function volume(level: Level, rng: Rng): Problem {
  const l = rng.int(2, level === 'easy' ? 3 : 6)
  const w = rng.int(2, level === 'easy' ? 3 : 5)
  const h = rng.int(2, level === 'easy' ? 3 : 4)
  const text = `A box is ${l} by ${w} by ${h} units. What is the volume in cubic units?`
  return problem(text, { kind: 'line', text }, { t: 'volume', l, w, h })
}

function coord(rng: Rng): Problem {
  const x = rng.int(0, 5)
  const y = rng.int(0, 5)
  return problem(
    'What are the coordinates of the point?',
    { kind: 'coord', x, y, caption: 'First quadrant' },
    { t: 'coord', x, y },
  )
}

function ops(rng: Rng): Problem {
  const form = rng.pick(['a+b*c', '(a+b)*c'] as const)
  const a = rng.int(1, 8)
  const b = rng.int(1, 6)
  const c = rng.int(2, 5)
  const text = form === 'a+b*c' ? `${a} + ${b} × ${c}` : `(${a} + ${b}) × ${c}`
  return problem(text, { kind: 'line', text }, { t: 'ops', form, a, b, c })
}

function dec(spec: Extract<Spec, { kind: 'dec' }>, rng: Rng): Problem {
  const a = rng.int(1, 9) / (spec.op === 'mul' ? 10 : 10)
  const b = rng.int(1, spec.op === 'sub' ? Math.floor(a * 10) : 9) / 10
  const left = trim(a)
  const right = trim(b)
  const op = spec.op === 'add' ? '+' : spec.op === 'sub' ? '−' : '×'
  const text = `${left} ${op} ${right}`
  return problem(text, { kind: 'line', text }, { t: 'dec', op: spec.op, a: Number(left), b: Number(right) })
}

function trim(n: number): string {
  return n.toFixed(1).replace(/\.0$/, '.0')
}

function angle(rng: Rng): Problem {
  const deg = rng.pick([30, 45, 60, 90, 120, 135, 150])
  return problem(
    'Is this angle acute, right, or obtuse?',
    { kind: 'angle', deg, caption: 'Classify the angle.' },
    { t: 'angle', deg },
  )
}

function dots(spec: Extract<Spec, { kind: 'dots' }>, level: Level, rng: Rng): Problem {
  const max = level === 'easy' ? Math.min(6, spec.max) : spec.max
  const n = rng.int(1, max)
  return problem('How many dots?', { kind: 'dots', n, caption: 'Count the dots.' }, { t: 'count', dots: n })
}

function sides(rng: Rng): Problem {
  const shape = rng.pick(SHAPES)
  return problem(
    `How many sides does a ${shape.name} have?`,
    { kind: 'line', text: shape.name },
    { t: 'sides', name: shape.name, n: shape.sides },
  )
}

function nextNum(spec: Extract<Spec, { kind: 'next' }>, rng: Rng): Problem {
  const n = rng.int(0, spec.max - 1)
  return problem(`What number comes just after ${n}?`, { kind: 'line', text: String(n) }, { t: 'next', n })
}

function skip(spec: Extract<Spec, { kind: 'skip' }>, rng: Rng): Problem {
  const step = rng.pick(spec.steps)
  const start = step * rng.int(1, 4)
  const index = rng.int(3, 5)
  const value = start + step * index
  const shown = [0, 1, 2, 3, 4].map((i) => (i === index ? '__' : String(start + step * i))).join(', ')
  return problem(`Fill the blank: ${shown}`, { kind: 'line', text: shown }, { t: 'skip', value })
}

function tenMore(level: Level, rng: Rng): Problem {
  const n = rng.int(level === 'easy' ? 10 : 20, level === 'hard' ? 800 : 90)
  const jump = level === 'hard' && rng.int(0, 1) ? 100 : 10
  const op = rng.int(0, 1) ? 'more' : 'less'
  if (op === 'less' && n <= jump) return tenMore(level, rng)
  const text = op === 'more' ? `${jump} more than ${n}` : `${jump} less than ${n}`
  const proof = op === 'more' ? { t: 'add' as const, ns: [n, jump] } : { t: 'sub' as const, a: n, b: jump }
  return problem(text, { kind: 'line', text }, proof)
}

function word(spec: Extract<Spec, { kind: 'word' }>, level: Level, rng: Rng): Problem {
  const cap = level === 'easy' ? Math.min(10, spec.max) : spec.max
  const name = rng.pick(NAMES)
  const other = rng.pick(NAMES.filter((n) => n !== name))
  if (spec.op === 'add') {
    const a = rng.int(1, Math.max(2, cap - 1))
    const b = rng.int(1, Math.max(1, cap - a))
    const text = `${name} has ${a} stickers. ${other} gives ${name} ${b} more. How many stickers now?`
    return problem(text, { kind: 'line', text }, { t: 'add', ns: [a, b] })
  }
  if (spec.op === 'sub') {
    const a = rng.int(3, cap)
    const b = rng.int(1, a - 1)
    const text = `${name} has ${a} grapes and eats ${b}. How many are left?`
    return problem(text, { kind: 'line', text }, { t: 'sub', a, b })
  }
  if (spec.op === 'mul') {
    const groups = rng.int(2, 6)
    const each = rng.int(2, 8)
    const text = `There are ${groups} bags with ${each} apples in each bag. How many apples?`
    return problem(text, { kind: 'line', text }, { t: 'mul', a: groups, b: each })
  }
  const each = rng.int(2, 6)
  const groups = rng.int(2, 6)
  const total = each * groups
  const text = `${total} stickers are shared equally by ${groups} friends. How many does each friend get?`
  return problem(text, { kind: 'line', text }, { t: 'div', a: total, b: groups })
}

function longMul(spec: Extract<Spec, { kind: 'longmul' }>, level: Level, rng: Rng): Problem {
  if (spec.by === 1 || level === 'easy') {
    const a = rng.int(level === 'easy' ? 12 : 20, level === 'hard' ? 80 : 40)
    const b = rng.int(2, 9)
    return vertical('×', [a, b], `${a} × ${b}`)
  }
  const a = rng.int(12, level === 'hard' ? 40 : 25)
  const b = rng.int(12, 25)
  return vertical('×', [a, b], `${a} × ${b}`)
}

function longDiv(spec: Extract<Spec, { kind: 'longdiv' }>, level: Level, rng: Rng): Problem {
  const divisor = rng.int(2, level === 'easy' ? 5 : 9)
  const quotient = rng.int(3, level === 'easy' ? 9 : 20)
  const rem = spec.remainders && level !== 'easy' ? rng.int(1, divisor - 1) : 0
  const dividend = divisor * quotient + rem
  if (rem === 0) return vertical('÷', [dividend, divisor], `${dividend} ÷ ${divisor}`)
  const text = `${dividend} ÷ ${divisor}. Write the quotient and the remainder.`
  return problem(text, { kind: 'line', text }, { t: 'divrem', a: dividend, b: divisor })
}

function mulTens(rng: Rng): Problem {
  const a = rng.int(2, 9)
  const b = rng.int(1, 9) * 10
  return vertical('×', [a, b], `${a} × ${b}`)
}

export function fracUnused(n: number, d: number): string {
  return frac(n, d)
}
