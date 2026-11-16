import { frac, gcd, problem } from './solve.ts'
import type { Level, Problem, Spec } from './types.ts'
import type { Rng } from './rng.ts'
import {
  BLENDS,
  CAP_ITEMS,
  CVC,
  DIGRAPHS,
  DOLCH_G1,
  DOLCH_G2,
  DOLCH_PREK,
  LONG,
  PASSAGES,
  POS_ITEMS,
  RHYME_SETS,
  SHORT,
  SYN,
  type Passage,
} from './ela-data.ts'

const NAMES = ['Sam', 'Mia', 'Leo', 'Ava', 'Noah', 'Priya', 'Owen', 'Lila', 'Jules', 'Noor']

export function extraProblem(spec: Spec, level: Level, rng: Rng): Problem | null {
  switch (spec.kind) {
    case 'ratio':
      return ratio(level, rng)
    case 'unit-rate':
      return unitRate(level, rng)
    case 'percent':
      return percent(level, rng)
    case 'frac-div-gen':
      return fracDivGen(level, rng)
    case 'int-line':
      return intLine(level, rng)
    case 'int-add':
      return intAdd(level, rng)
    case 'int-mul':
      return intMul(level, rng)
    case 'ops-int':
      return opsInt(level, rng)
    case 'eval-expr':
      return evalExpr(level, rng)
    case 'one-step':
      return oneStep(level, rng)
    case 'two-step-eq':
      return twoStepEq(level, rng)
    case 'ineq':
      return ineq(level, rng)
    case 'area-tri-trap':
      return areaTriTrap(level, rng)
    case 'prism':
      return prism(level, rng)
    case 'stats':
      return stats(level, rng)
    case 'sci-not':
      return sciNot(level, rng)
    case 'exponent':
      return exponent(level, rng)
    case 'pythag':
      return pythag(level, rng)
    case 'slope':
      return slope(level, rng)
    case 'linear':
      return linear(level, rng)
    case 'trace-letter':
      return traceLetter(spec, rng)
    case 'sight-words':
      return sightWords(spec, rng)
    case 'cvc':
      return cvc(rng)
    case 'rhyme':
      return rhyme(rng)
    case 'phonics':
      return phonics(spec, rng)
    case 'cap-punct':
      return capPunct(rng)
    case 'parts-of-speech':
      return partsOfSpeech(rng)
    case 'syn-ant':
      return synAnt(level, rng)
    default:
      return null
  }
}

export function comprehensionSheet(spec: Extract<Spec, { kind: 'comprehension' }>, level: Level, rng: Rng, n: number): Problem[] {
  const bank = [...PASSAGES[spec.band]]
  const out: Problem[] = []
  const used = new Set<string>()
  let guard = 0
  while (out.length < n && guard < 80) {
    guard++
    if (bank.length === 0) break
    const i = rng.int(0, bank.length - 1)
    const item = bank.splice(i, 1)[0]
    if (used.has(item.text)) continue
    used.add(item.text)
    out.push(passageProblem(item))
  }
  if (out.length < 4) {
    // reuse with leftover by wrapping the bank
    const extra = PASSAGES[spec.band].filter((p) => !used.has(p.text))
    for (const item of extra) {
      if (out.length >= n) break
      out.push(passageProblem(item))
    }
  }
  if (out.length < 4) throw new Error(`comprehension starved for band ${spec.band}: ${out.length}`)
  return out
}

function passageProblem(item: Passage): Problem {
  const text = `${item.text} ${item.question}`
  return problem(item.question, { kind: 'passage', text: item.text, question: item.question }, { t: 'lit', value: item.answer })
}

function ratio(level: Level, rng: Rng): Problem {
  const g0 = rng.int(2, level === 'easy' ? 5 : 8)
  let a = g0 * rng.int(1, level === 'hard' ? 9 : 6)
  let b = g0 * rng.int(1, level === 'hard' ? 9 : 6)
  if (a === b && rng.int(0, 2) !== 0) b = g0 * (rng.int(1, 6) + 1)
  const g = gcd(a, b)
  const text = `Simplify the ratio ${a}:${b}.`
  return problem(text, { kind: 'line', text }, { t: 'lit', value: `${a / g}:${b / g}` })
}

function unitRate(level: Level, rng: Rng): Problem {
  const hours = rng.int(2, level === 'easy' ? 5 : 8)
  const rate = rng.int(15, level === 'hard' ? 80 : 40)
  const miles = hours * rate
  const name = rng.pick(NAMES)
  const text = `${name} travels ${miles} miles in ${hours} hours at a constant speed. What is the unit rate in miles per hour?`
  return problem(text, { kind: 'line', text }, { t: 'lit', value: String(rate) })
}

function percent(level: Level, rng: Rng): Problem {
  const p = rng.pick(level === 'easy' ? [10, 20, 25, 50] : [5, 10, 15, 20, 25, 40, 50, 75])
  const n = rng.pick(level === 'hard' ? [40, 60, 80, 120, 200] : [20, 40, 60, 80, 100])
  const text = `What is ${p}% of ${n}?`
  return problem(text, { kind: 'line', text }, { t: 'pctOf', p, n })
}

function fracDivGen(level: Level, rng: Rng): Problem {
  const n1 = rng.int(1, 5)
  const d1 = rng.int(n1 + 1, 9)
  const n2 = rng.int(1, 4)
  const d2 = rng.int(n2 + 1, 8)
  const text = level === 'easy' ? `${n1}/${d1} ÷ ${n2}` : `${n1}/${d1} ÷ ${n2}/${d2}`
  if (level === 'easy') {
    return problem(text, { kind: 'line', text }, { t: 'fracDivF', n1, d1, n2, d2: 1 })
  }
  return problem(text, { kind: 'line', text }, { t: 'fracDivF', n1, d1, n2, d2 })
}

function intLine(level: Level, rng: Rng): Problem {
  const start = rng.int(level === 'easy' ? -6 : -12, level === 'easy' ? 6 : 12)
  const steps = rng.int(1, level === 'hard' ? 8 : 5)
  const dir = rng.pick(['left', 'right'] as const)
  const text = `On a number line, what integer is ${steps} units to the ${dir} of ${start}?`
  const proof = dir === 'right' ? ({ t: 'add' as const, ns: [start, steps] }) : ({ t: 'sub' as const, a: start, b: steps })
  return problem(text, { kind: 'line', text }, proof)
}

function intAdd(level: Level, rng: Rng): Problem {
  const cap = level === 'easy' ? 8 : 15
  const a = rng.int(-cap, cap)
  const b = rng.int(-cap, cap)
  if (a === 0 || b === 0) return intAdd(level, rng)
  const op = rng.pick(['+', '−'] as const)
  const left = fmtInt(a)
  const right = fmtInt(b)
  const text = `${left} ${op} ${right}`
  const proof = op === '+' ? ({ t: 'add' as const, ns: [a, b] }) : ({ t: 'sub' as const, a, b })
  return problem(text, { kind: 'line', text }, proof)
}

function intMul(level: Level, rng: Rng): Problem {
  const cap = level === 'easy' ? 6 : 12
  let a = rng.int(-cap, cap)
  let b = rng.int(-cap, cap)
  if (a === 0 || b === 0) return intMul(level, rng)
  const op = rng.pick(['×', '÷'] as const)
  if (op === '÷') {
    const quot = rng.int(-cap, cap) || 2
    a = b * quot
    const text = `${fmtInt(a)} ÷ ${fmtInt(b)}`
    return problem(text, { kind: 'line', text }, { t: 'div', a, b })
  }
  const text = `${fmtInt(a)} × ${fmtInt(b)}`
  return problem(text, { kind: 'line', text }, { t: 'mul', a, b })
}

function fmtInt(n: number): string {
  return n < 0 ? `(${n})` : String(n)
}

function signNum(n: number): string {
  return n < 0 ? `− ${Math.abs(n)}` : `+ ${n}`
}

function coeff(n: number): string {
  if (n === 1) return ''
  if (n === -1) return '−'
  return String(n)
}

function opsInt(level: Level, rng: Rng): Problem {
  if (level === 'easy') {
    const a = rng.int(2, 8)
    const b = rng.int(2, 6)
    const c = rng.int(2, 5)
    const text = `${a} + ${b} × ${c}`
    return problem(text, { kind: 'line', text }, { t: 'ops', form: 'a+b*c', a, b, c })
  }
  if (level === 'medium') {
    const a = rng.int(2, 6)
    const b = rng.int(2, 5)
    const c = rng.int(2, 4)
    const text = `${a} × (${b} + ${c})`
    return problem(text, { kind: 'line', text }, { t: 'mul', a, b: b + c })
  }
  const base = rng.int(2, 4)
  const pow = 2
  const a = rng.int(2, 8)
  const text = `${a} + ${base}^${pow}`
  return problem(text, { kind: 'line', text }, { t: 'add', ns: [a, base ** pow] })
}

function evalExpr(level: Level, rng: Rng): Problem {
  const m = rng.int(2, level === 'hard' ? 9 : 6)
  const x = rng.int(-4, 8)
  let b = rng.int(-8, 9)
  if (b === 0) b = rng.pick([1, -2, 3, -4])
  const text = `Evaluate ${m}x ${b < 0 ? '−' : '+'} ${Math.abs(b)} when x = ${x}.`
  return problem(text, { kind: 'line', text }, { t: 'evalLin', m, x, b })
}

function oneStep(level: Level, rng: Rng): Problem {
  const form = rng.pick(['x+b=c', 'x-b=c', 'bx=c', 'x/b=c'] as const)
  const b = rng.int(2, level === 'hard' ? 12 : 9)
  const x = rng.int(level === 'easy' ? 1 : -6, 12)
  if (form === 'x+b=c') {
    const c = x + b
    const text = `Solve: x + ${b} = ${c}`
    return problem(text, { kind: 'line', text }, { t: 'eq', form, a: 1, b, c })
  }
  if (form === 'x-b=c') {
    const c = x - b
    const text = `Solve: x − ${b} = ${c}`
    return problem(text, { kind: 'line', text }, { t: 'eq', form, a: 1, b, c })
  }
  if (form === 'bx=c') {
    const c = b * x
    const text = `Solve: ${b}x = ${c}`
    return problem(text, { kind: 'line', text }, { t: 'eq', form, a: 1, b, c })
  }
  const c = x
  const text = `Solve: x ÷ ${b} = ${c}`
  return problem(text, { kind: 'line', text }, { t: 'eq', form, a: 1, b, c })
}

function twoStepEq(level: Level, rng: Rng): Problem {
  const a = rng.int(2, level === 'hard' ? 8 : 5)
  const x = rng.int(level === 'easy' ? 1 : -6, 9)
  const b = rng.int(1, 12)
  const c = a * x + b
  const text = `Solve: ${a}x + ${b} = ${c}`
  return problem(text, { kind: 'line', text }, { t: 'eq', form: 'ax+b=c', a, b, c })
}

function ineq(level: Level, rng: Rng): Problem {
  const a = rng.int(2, 6) // keep positive so the inequality direction does not flip
  const xBound = rng.int(level === 'easy' ? 1 : -4, 8)
  const b = rng.int(0, 10)
  const c = a * xBound + b
  const cmp = rng.pick(['>', '<'] as const)
  const text = `Solve: ${a}x + ${b} ${cmp} ${c}`
  return problem(text, { kind: 'line', text }, { t: 'ineq', a, b, c, cmp })
}

function areaTriTrap(level: Level, rng: Rng): Problem {
  if (level === 'easy' || rng.int(0, 1) === 0) {
    const b = rng.int(4, 16)
    const h = rng.int(2, 12)
    if ((b * h) % 2) return areaTriTrap(level, rng)
    const text = `A triangle has a base of ${b} units and a height of ${h} units. What is its area?`
    return problem(text, { kind: 'line', text }, { t: 'areaTri', b, h })
  }
  const b1 = rng.int(3, 12)
  const b2 = rng.int(3, 12)
  const h = rng.int(2, 10)
  if (((b1 + b2) * h) % 2) return areaTriTrap(level, rng)
  const text = `A trapezoid has bases ${b1} and ${b2} and height ${h}. What is its area?`
  return problem(text, { kind: 'line', text }, { t: 'areaTrap', b1, b2, h })
}

function prism(level: Level, rng: Rng): Problem {
  if (level !== 'hard' && rng.int(0, 1) === 0) {
    const l = rng.int(2, 10)
    const w = rng.int(2, 8)
    const h = rng.int(2, 8)
    const text = `A rectangular prism is ${l} by ${w} by ${h} units. What is its volume?`
    return problem(text, { kind: 'line', text }, { t: 'prism', base: l * w, h })
  }
  const b = rng.int(4, 12)
  const triH = rng.int(2, 10)
  if ((b * triH) % 2) return prism(level, rng)
  const h = rng.int(3, 10)
  const base = (b * triH) / 2
  const text = `A triangular prism has a triangular base of ${b} by ${triH} units and a length of ${h} units. What is its volume?`
  return problem(text, { kind: 'line', text }, { t: 'prism', base, h })
}

function stats(level: Level, rng: Rng): Problem {
  const kind = rng.pick(['mean', 'median', 'mode'] as const)
  const len = level === 'easy' ? 5 : 6
  const ns: number[] = []
  for (let i = 0; i < len; i++) ns.push(rng.int(1, 12))
  if (kind === 'mode') {
    const v = rng.int(1, 12)
    const rest = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].filter((n) => n !== v)
    const unique: number[] = []
    while (unique.length < len - 2) {
      unique.push(rest[unique.length % rest.length] + (unique.length >= rest.length ? 1 : 0))
    }
    // unique values plus a repeated mode
    const body = rest.slice(0, len - 2)
    ns.length = 0
    ns.push(v, v, ...body)
  }
  if (kind === 'mean') {
    const target = rng.int(4, 10)
    for (let i = 0; i < len - 1; i++) ns[i] = rng.int(1, 12)
    const sum = ns.slice(0, len - 1).reduce((s, n) => s + n, 0)
    ns[len - 1] = target * len - sum
    if (ns[len - 1] < 0 || ns[len - 1] > 30) return stats(level, rng)
  }
  const list = ns.join(', ')
  if (kind === 'mean') {
    const text = `Find the mean of ${list}.`
    return problem(text, { kind: 'line', text }, { t: 'mean', ns: [...ns] })
  }
  if (kind === 'median') {
    const text = `Find the median of ${list}.`
    return problem(text, { kind: 'line', text }, { t: 'median', ns: [...ns] })
  }
  const text = `Find the mode of ${list}.`
  return problem(text, { kind: 'line', text }, { t: 'mode', ns: [...ns] })
}

function sciNot(level: Level, rng: Rng): Problem {
  if (rng.int(0, 1) === 0) {
    const coef = rng.int(11, 99) / 10
    const exp = rng.int(2, level === 'hard' ? 6 : 4)
    const n = Number((coef * 10 ** exp).toFixed(0))
    // only use values that convert cleanly
    const text = `Write ${n} in scientific notation.`
    return problem(text, { kind: 'line', text }, { t: 'sciTo', n })
  }
  const digits = rng.int(11, 99)
  const coef = digits / 10
  const exp = rng.int(2, 5)
  const shown = `${trimPlain(coef)} × 10^${exp}`
  const text = `Write ${shown} as a whole number.`
  return problem(text, { kind: 'line', text }, { t: 'sciFrom', coef, exp })
}

function trimPlain(n: number): string {
  return n.toFixed(1).replace(/\.0$/, '')
}

function exponent(level: Level, rng: Rng): Problem {
  if (level === 'hard' && rng.int(0, 1) === 0) {
    const base = -rng.int(2, 4)
    const pow = rng.pick([2, 3])
    const text = `(${base})^${pow}`
    return problem(text, { kind: 'line', text }, { t: 'exp', base, pow })
  }
  const base = rng.int(2, level === 'easy' ? 6 : 9)
  const pow = rng.int(2, level === 'easy' ? 3 : 4)
  if (base ** pow > 10000) return exponent(level, rng)
  const text = `${base}^${pow}`
  return problem(text, { kind: 'line', text }, { t: 'exp', base, pow })
}

function pythag(level: Level, rng: Rng): Problem {
  const triples = [
    [3, 4, 5],
    [5, 12, 13],
    [6, 8, 10],
    [7, 24, 25],
    [8, 15, 17],
    [9, 12, 15],
    [9, 40, 41],
    [12, 16, 20],
    [12, 35, 37],
    [15, 20, 25],
    [15, 36, 39],
    [18, 24, 30],
    [20, 21, 29],
  ]
  const pool = level === 'easy' ? triples.slice(0, 8) : triples
  const [a, b, c] = rng.pick(pool)
  if (level === 'hard' && rng.int(0, 1) === 0) {
    const text = `A right triangle has hypotenuse ${c} and one leg ${a}. What is the other leg?`
    return problem(text, { kind: 'line', text }, { t: 'pythag', a: c, b: a, find: 'leg' })
  }
  const text = `A right triangle has legs ${a} and ${b}. What is the length of the hypotenuse?`
  return problem(text, { kind: 'line', text }, { t: 'pythag', a, b, find: 'c' })
}

function slope(level: Level, rng: Rng): Problem {
  const x1 = rng.int(-4, 6)
  const y1 = rng.int(-4, 6)
  const dx = rng.int(1, 6) * rng.pick([1, -1])
  const dy = rng.int(level === 'easy' ? 0 : -6, 6)
  const x2 = x1 + dx
  const y2 = y1 + dy
  const text = `A line passes through (${x1}, ${y1}) and (${x2}, ${y2}). What is its slope?`
  return problem(text, { kind: 'line', text }, { t: 'slope', x1, y1, x2, y2 })
}

function linear(level: Level, rng: Rng): Problem {
  const a = rng.int(2, 6)
  let c = rng.int(1, 5)
  if (c === a) c += 1
  const x = rng.int(level === 'easy' ? 1 : -5, 8)
  const b = rng.int(-8, 10)
  const d = a * x + b - c * x
  const text = `Solve: ${coeff(a)}x ${signNum(b)} = ${coeff(c)}x ${signNum(d)}`
  return problem(text, { kind: 'line', text }, { t: 'eq', form: 'ax+b=cx+d', a, b, c, d })
}

function traceLetter(spec: Extract<Spec, { kind: 'trace-letter' }>, rng: Rng): Problem {
  const letters = 'abcdefghijklmnopqrstuvwxyz'.split('')
  const letter = rng.pick(letters)
  const shown = rng.int(0, 1) === 0 ? letter.toUpperCase() : letter
  const text = spec.script === 'cursive'
    ? `Write the cursive form of ${shown} on the line.`
    : `Trace the letter ${shown}.`
  return problem(text, { kind: 'trace', letter: shown, script: spec.script }, { t: 'lit', value: shown })
}

function sightList(list: 'prek' | 'g1' | 'g2'): string[] {
  return list === 'prek' ? DOLCH_PREK : list === 'g1' ? DOLCH_G1 : DOLCH_G2
}

function sightWords(spec: Extract<Spec, { kind: 'sight-words' }>, rng: Rng): Problem {
  const words = sightList(spec.list).filter((w) => w.toLowerCase() !== 'a' && w !== 'I')
  const word = rng.pick(words)
  const foilBank = CVC.filter((w) => !words.map((x) => x.toLowerCase()).includes(w))
  const foil = rng.pick(foilBank)
  const mode = rng.pick(['which', 'missing'] as const)
  if (mode === 'which') {
    const left = rng.int(0, 1) === 0
    const a = left ? word : foil
    const b = left ? foil : word
    const text = `Which word is a sight word: ${a} or ${b}?`
    return problem(text, { kind: 'line', text }, { t: 'lit', value: word })
  }
  const letters = word.split('')
  for (let i = letters.length - 1; i > 0; i--) {
    const j = rng.int(0, i)
    ;[letters[i], letters[j]] = [letters[j], letters[i]]
  }
  const text2 = `Unscramble the sight word: ${letters.join(' ')}.`
  return problem(text2, { kind: 'line', text: text2 }, { t: 'lit', value: word })
}

function cvc(rng: Rng): Problem {
  const word = rng.pick(CVC)
  const mode = rng.pick(['vowel', 'first', 'unscramble'] as const)
  if (mode === 'vowel') {
    const text = `What vowel is in the middle of the CVC word ${word}?`
    return problem(text, { kind: 'line', text }, { t: 'lit', value: word[1] })
  }
  if (mode === 'first') {
    const text = `What is the first letter of the CVC word ${word}?`
    return problem(text, { kind: 'line', text }, { t: 'lit', value: word[0] })
  }
  const letters = word.split('')
  const text = `Unscramble the CVC word: ${letters[2]} ${letters[0]} ${letters[1]}.`
  return problem(text, { kind: 'line', text }, { t: 'lit', value: word })
}

function rhyme(rng: Rng): Problem {
  const item = rng.pick(RHYME_SETS)
  const opts = rng.int(0, 1) === 0 ? [item.rhyme, item.foil] : [item.foil, item.rhyme]
  const text = `Which word rhymes with ${item.word}: ${opts[0]} or ${opts[1]}?`
  return problem(text, { kind: 'line', text }, { t: 'lit', value: item.rhyme })
}

function phonics(spec: Extract<Spec, { kind: 'phonics' }>, rng: Rng): Problem {
  if (spec.pattern === 'short') {
    const vowel = rng.pick(['a', 'e', 'i', 'o', 'u'] as const)
    const word = rng.pick(SHORT[vowel])
    const foil = vowel === 'a' ? 'e' : vowel === 'e' ? 'i' : vowel === 'i' ? 'o' : vowel === 'o' ? 'u' : 'a'
    const text = `Which short vowel is in the word “${word}”: ${vowel} or ${foil}?`
    return problem(text, { kind: 'line', text }, { t: 'lit', value: vowel })
  }
  if (spec.pattern === 'long') {
    const vowel = rng.pick(['a', 'e', 'i', 'o', 'u'] as const)
    const word = rng.pick(LONG[vowel])
    const foil = vowel === 'a' ? 'e' : 'a'
    const text = `Which long vowel is in the word “${word}”: ${vowel} or ${foil}?`
    return problem(text, { kind: 'line', text }, { t: 'lit', value: vowel })
  }
  if (spec.pattern === 'digraph') {
    const item = rng.pick(DIGRAPHS)
    const word = rng.pick(item.words)
    const foil = rng.pick(DIGRAPHS.filter((d) => d.letters !== item.letters)).letters
    const text = `Which digraph is in the word “${word}”: ${item.letters} or ${foil}?`
    return problem(text, { kind: 'line', text }, { t: 'lit', value: item.letters })
  }
  const item = rng.pick(BLENDS)
  const word = rng.pick(item.words)
  const foil = rng.pick(BLENDS.filter((d) => d.letters !== item.letters)).letters
  const text = `Which beginning blend is in the word “${word}”: ${item.letters} or ${foil}?`
  return problem(text, { kind: 'line', text }, { t: 'lit', value: item.letters })
}

function capPunct(rng: Rng): Problem {
  const item = rng.pick(CAP_ITEMS)
  const text = `Rewrite this sentence with correct capitalization and punctuation: ${item.raw}`
  return problem(text, { kind: 'line', text }, { t: 'lit', value: item.fixed })
}

function partsOfSpeech(rng: Rng): Problem {
  const item = rng.pick(POS_ITEMS)
  const text = `In the sentence “${item.sentence}” is the word “${item.word}” a noun, a verb, or an adjective?`
  return problem(text, { kind: 'line', text }, { t: 'lit', value: item.pos })
}

function synAnt(level: Level, rng: Rng): Problem {
  const item = rng.pick(SYN)
  if (level === 'easy' || rng.int(0, 1) === 0) {
    const text = `Which word is a synonym of “${item.word}”: ${item.syn} or ${item.ant}?`
    return problem(text, { kind: 'line', text }, { t: 'lit', value: item.syn })
  }
  const text = `Which word is an antonym of “${item.word}”: ${item.syn} or ${item.ant}?`
  return problem(text, { kind: 'line', text }, { t: 'lit', value: item.ant })
}
