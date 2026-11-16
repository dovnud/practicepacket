import type { Problem, Proof } from './types.ts'

export function gcd(a: number, b: number): number {
  let x = Math.abs(a)
  let y = Math.abs(b)
  while (y) {
    const t = y
    y = x % y
    x = t
  }
  return x || 1
}

export function frac(n: number, d: number): string {
  const g = gcd(n, d)
  return `${n / g}/${d / g}`
}

export function solve(proof: Proof): string {
  switch (proof.t) {
    case 'add':
      return String(proof.ns.reduce((s, n) => s + n, 0))
    case 'sub':
      return String(proof.a - proof.b)
    case 'mul':
      return String(proof.a * proof.b)
    case 'div':
      return String(proof.a / proof.b)
    case 'divrem': {
      const q = Math.floor(proof.a / proof.b)
      const r = proof.a % proof.b
      return r ? `${q} R${r}` : String(q)
    }
    case 'cmp':
      return proof.a === proof.b ? '=' : proof.a > proof.b ? '>' : '<'
    case 'round': {
      const p = proof.place
      return String(Math.round(proof.n / p) * p)
    }
    case 'clock':
      return `${proof.h}:${String(proof.m).padStart(2, '0')}`
    case 'digit':
      return String((Math.floor(proof.n / proof.place) % 10) * proof.place)
    case 'tens':
      return String(Math.floor(proof.n / 10))
    case 'expanded': {
      const n = proof.n
      const parts: string[] = []
      let place = 1
      let x = n
      const rev: string[] = []
      while (x > 0) {
        const d = x % 10
        if (d) rev.push(String(d * place))
        x = Math.floor(x / 10)
        place *= 10
      }
      return rev.reverse().join(' + ') || '0'
    }
    case 'teen':
      return `${Math.floor(proof.n / 10)} ten and ${proof.n % 10} ones`
    case 'missing':
      return String(proof.total - proof.known)
    case 'even':
      return proof.n % 2 === 0 ? 'even' : 'odd'
    case 'money':
      return String(proof.q * 25 + proof.d * 10 + proof.n * 5 + proof.p)
    case 'elapsed': {
      const total = proof.h * 60 + proof.m + proof.add
      const h = Math.floor(total / 60) % 12 || 12
      const m = total % 60
      return `${h}:${String(m).padStart(2, '0')}`
    }
    case 'area':
      return String(proof.w * proof.h)
    case 'peri':
      return String(2 * (proof.w + proof.h))
    case 'frac':
      return frac(proof.n, proof.d)
    case 'fracAdd':
      return frac(proof.n1 * proof.d2 + proof.n2 * proof.d1, proof.d1 * proof.d2)
    case 'fracMul':
      return frac(proof.n1 * proof.n2, proof.d1 * proof.d2)
    case 'fracDiv':
      return proof.kind === 'unit-by-whole'
        ? frac(1, proof.d * proof.w)
        : String(proof.w * proof.d)
    case 'factors': {
      const out: number[] = []
      for (let i = 1; i <= proof.n; i++) if (proof.n % i === 0) out.push(i)
      return out.join(', ')
    }
    case 'mul10':
      return String(proof.n * 10 ** proof.pow)
    case 'volume':
      return String(proof.l * proof.w * proof.h)
    case 'coord':
      return `(${proof.x}, ${proof.y})`
    case 'ops':
      return proof.form === 'a+b*c'
        ? String(proof.a + proof.b * proof.c)
        : String((proof.a + proof.b) * proof.c)
    case 'dec': {
      const scale = 100
      const a = Math.round(proof.a * scale)
      const b = Math.round(proof.b * scale)
      const raw =
        proof.op === 'add' ? a + b : proof.op === 'sub' ? a - b : Math.round(proof.a * proof.b * scale)
      const value = proof.op === 'mul' ? raw / scale : raw / scale
      return trimNum(value)
    }
    case 'angle':
      return proof.deg === 90 ? 'right' : proof.deg < 90 ? 'acute' : 'obtuse'
    case 'count':
      return String(proof.dots)
    case 'sides':
      return String(proof.n)
    case 'next':
      return String(proof.n + 1)
    case 'skip':
      return String(proof.value)
    case 'lit':
      return proof.value
    case 'fracSub': {
      const n = proof.n1 * proof.d2 - proof.n2 * proof.d1
      const d = proof.d1 * proof.d2
      return frac(n, d)
    }
    case 'fracCmp': {
      const left = proof.n1 * proof.d2
      const right = proof.n2 * proof.d1
      return left === right ? '=' : left > right ? '>' : '<'
    }
    case 'decDigit': {
      const thousandths = Math.round(proof.n * 1000)
      const place = Math.round(proof.place * 1000)
      const value = (Math.floor(thousandths / place) % 10) * proof.place
      return trimNum(value)
    }
    case 'roundDec': {
      const thousandths = Math.round(proof.n * 1000)
      const place = Math.round(proof.place * 1000)
      const rounded = Math.round(thousandths / place) * place
      return trimNum(rounded / 1000)
    }
    case 'decDiv':
      return trimNum(Math.round((proof.a / proof.b) * 1000) / 1000)
    case 'pow10dec': {
      const scale = 10 ** proof.pow
      return trimNum(proof.op === 'mul' ? proof.n * scale : proof.n / scale)
    }
  }
}

function trimNum(n: number): string {
  const s = n.toFixed(4).replace(/0+$/, '').replace(/\.$/, '')
  return s === '-0' ? '0' : s
}

export function problem(prompt: string, display: Problem['display'], proof: Proof): Problem {
  return { prompt, display, proof, answer: solve(proof) }
}
