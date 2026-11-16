export type Level = 'easy' | 'medium' | 'hard'
export type GradeId = 'k' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8'
export type SubjectId = 'math' | 'reading' | 'writing' | 'science'

export type Proof =
  | { t: 'add'; ns: number[] }
  | { t: 'sub'; a: number; b: number }
  | { t: 'mul'; a: number; b: number }
  | { t: 'div'; a: number; b: number }
  | { t: 'divrem'; a: number; b: number }
  | { t: 'cmp'; a: number; b: number }
  | { t: 'round'; n: number; place: number }
  | { t: 'clock'; h: number; m: number }
  | { t: 'digit'; n: number; place: number }
  | { t: 'tens'; n: number }
  | { t: 'expanded'; n: number }
  | { t: 'teen'; n: number }
  | { t: 'missing'; total: number; known: number }
  | { t: 'even'; n: number }
  | { t: 'money'; q: number; d: number; n: number; p: number }
  | { t: 'elapsed'; h: number; m: number; add: number }
  | { t: 'area'; w: number; h: number }
  | { t: 'peri'; w: number; h: number }
  | { t: 'frac'; n: number; d: number }
  | { t: 'fracAdd'; n1: number; d1: number; n2: number; d2: number }
  | { t: 'fracMul'; n1: number; d1: number; n2: number; d2: number }
  | { t: 'fracDiv'; kind: 'unit-by-whole' | 'whole-by-unit'; n: number; d: number; w: number }
  | { t: 'factors'; n: number }
  | { t: 'mul10'; n: number; pow: number }
  | { t: 'volume'; l: number; w: number; h: number }
  | { t: 'coord'; x: number; y: number }
  | { t: 'ops'; form: 'a+b*c' | '(a+b)*c'; a: number; b: number; c: number }
  | { t: 'dec'; op: 'add' | 'sub' | 'mul'; a: number; b: number }
  | { t: 'angle'; deg: number }
  | { t: 'count'; dots: number }
  | { t: 'sides'; name: string; n: number }
  | { t: 'next'; n: number }
  | { t: 'skip'; value: number }
  | { t: 'lit'; value: string }
  | { t: 'fracSub'; n1: number; d1: number; n2: number; d2: number }
  | { t: 'fracCmp'; n1: number; d1: number; n2: number; d2: number }
  | { t: 'decDigit'; n: number; place: number }
  | { t: 'roundDec'; n: number; place: number }
  | { t: 'decDiv'; a: number; b: number }
  | { t: 'pow10dec'; n: number; pow: number; op: 'mul' | 'div' }
  | { t: 'fracDivF'; n1: number; d1: number; n2: number; d2: number }
  | { t: 'eq'; form: 'x+b=c' | 'x-b=c' | 'bx=c' | 'x/b=c' | 'ax+b=c' | 'ax+b=cx+d'; a: number; b: number; c: number; d?: number }
  | { t: 'ineq'; a: number; b: number; c: number; cmp: '>' | '<' }
  | { t: 'pythag'; a: number; b: number; find: 'c' | 'leg' }
  | { t: 'slope'; x1: number; y1: number; x2: number; y2: number }
  | { t: 'sciTo'; n: number }
  | { t: 'sciFrom'; coef: number; exp: number }
  | { t: 'exp'; base: number; pow: number }
  | { t: 'areaTri'; b: number; h: number }
  | { t: 'areaTrap'; b1: number; b2: number; h: number }
  | { t: 'prism'; base: number; h: number }
  | { t: 'mean'; ns: number[] }
  | { t: 'median'; ns: number[] }
  | { t: 'mode'; ns: number[] }
  | { t: 'pctOf'; p: number; n: number }
  | { t: 'evalLin'; m: number; x: number; b: number }

export type Display =
  | { kind: 'vertical'; op: '+' | '−' | '×' | '÷'; a: string; b: string }
  | { kind: 'line'; text: string }
  | { kind: 'compare'; left: string; right: string }
  | { kind: 'clock'; hour: number; minute: number }
  | { kind: 'fraction'; den: number; num: number; caption: string }
  | { kind: 'grid'; cols: number; rows: number; caption: string }
  | { kind: 'angle'; deg: number; caption: string }
  | { kind: 'dots'; n: number; caption: string }
  | { kind: 'coord'; x: number; y: number; caption: string }
  | { kind: 'passage'; text: string; question: string }
  | { kind: 'trace'; letter: string; script: 'print' | 'cursive' }

export type Problem = {
  prompt: string
  display: Display
  proof: Proof
  answer: string
}

export type Spec =
  | { kind: 'add'; within?: number; digits?: [number, number]; regroup: 'no' | 'yes' | 'mix' }
  | { kind: 'sub'; digits: [number, number]; regroup: 'no' | 'yes' | 'mix' | 'zero' | 'across'; within?: number }
  | { kind: 'mul'; lo: number; hi: number; mode: 'to' | 'from' }
  | { kind: 'div'; lo: number; hi: number; mode: 'to' | 'from' }
  | { kind: 'missing-factor'; lo: number; hi: number }
  | { kind: 'cmp'; max: number }
  | { kind: 'round'; place: number; digits: number }
  | { kind: 'clock'; minutes: number[] }
  | { kind: 'digit'; places: number[]; digits: number }
  | { kind: 'expanded'; digits: number }
  | { kind: 'teen' }
  | { kind: 'make10' }
  | { kind: 'even' }
  | { kind: 'money' }
  | { kind: 'elapsed' }
  | { kind: 'area' }
  | { kind: 'peri' }
  | { kind: 'frac-bar'; denoms: number[] }
  | { kind: 'frac-line'; denoms: number[] }
  | { kind: 'frac-eq' }
  | { kind: 'frac-add' }
  | { kind: 'frac-mul' }
  | { kind: 'frac-div' }
  | { kind: 'factors' }
  | { kind: 'mul10' }
  | { kind: 'volume' }
  | { kind: 'coord' }
  | { kind: 'ops' }
  | { kind: 'dec'; op: 'add' | 'sub' | 'mul'; places?: 1 | 2 | 3 }
  | { kind: 'angle' }
  | { kind: 'dots'; max: number }
  | { kind: 'sides' }
  | { kind: 'next'; max: number }
  | { kind: 'skip'; steps: number[] }
  | { kind: 'tenmore' }
  | { kind: 'word'; op: 'add' | 'sub' | 'mul' | 'div'; max: number }
  | { kind: 'longmul'; by: 1 | 2 }
  | { kind: 'longdiv'; remainders: boolean; divisorDigits?: 1 | 2 }
  | { kind: 'mul-tens' }
  | { kind: 'missing-seq'; max: number }
  | { kind: 'shape-name' }
  | { kind: 'more-less' }
  | { kind: 'missing-addend'; max: number }
  | { kind: 'measure'; max: number; unit: 'inches' | 'units' }
  | { kind: 'numline'; max: number }
  | { kind: 'graph' }
  | { kind: 'two-step' }
  | { kind: 'frac-sub'; unlike?: boolean }
  | { kind: 'frac-mul-whole' }
  | { kind: 'frac-cmp' }
  | { kind: 'dec-digit'; places: number[] }
  | { kind: 'dec-cmp'; places: 1 | 2 | 3 }
  | { kind: 'multiples' }
  | { kind: 'prime' }
  | { kind: 'round-dec'; place: number }
  | { kind: 'dec-div' }
  | { kind: 'pow10-dec' }
  | { kind: 'ratio' }
  | { kind: 'unit-rate' }
  | { kind: 'percent' }
  | { kind: 'frac-div-gen' }
  | { kind: 'int-line' }
  | { kind: 'int-add' }
  | { kind: 'int-mul' }
  | { kind: 'ops-int' }
  | { kind: 'eval-expr' }
  | { kind: 'one-step' }
  | { kind: 'two-step-eq' }
  | { kind: 'ineq' }
  | { kind: 'area-tri-trap' }
  | { kind: 'prism' }
  | { kind: 'stats' }
  | { kind: 'sci-not' }
  | { kind: 'exponent' }
  | { kind: 'pythag' }
  | { kind: 'slope' }
  | { kind: 'linear' }
  | { kind: 'trace-letter'; script: 'print' | 'cursive' }
  | { kind: 'sight-words'; list: 'prek' | 'g1' | 'g2' }
  | { kind: 'cvc' }
  | { kind: 'rhyme' }
  | { kind: 'phonics'; pattern: 'short' | 'long' | 'digraph' | 'blend' }
  | { kind: 'cap-punct' }
  | { kind: 'parts-of-speech' }
  | { kind: 'syn-ant' }
  | { kind: 'comprehension'; band: '1' | '2' | '3' | '4' | '5' }

export type Skill = {
  id: string
  batch: 1 | 2 | 3 | 4 | 5 | 6 | 7
  grade: GradeId
  subject: SubjectId
  topic: string
  topicLabel: string
  slug: string
  title: string
  description: string
  explanation: string
  direction: string
  example: { story: string; steps: string[]; answer: string }
  standard: { code: string; summary: string }
  spec: Spec
  related: string[]
}

export const LEVELS: Level[] = ['easy', 'medium', 'hard']

export const GRADE_LABEL: Record<GradeId, string> = {
  k: 'Kindergarten',
  '1': 'Grade 1',
  '2': 'Grade 2',
  '3': 'Grade 3',
  '4': 'Grade 4',
  '5': 'Grade 5',
  '6': 'Grade 6',
  '7': 'Grade 7',
  '8': 'Grade 8',
}

export const GRADE_TONE: Record<string, string> = {
  k: 'var(--gk)',
  '1': 'var(--g1)',
  '2': 'var(--g2)',
  '3': 'var(--g3)',
  '4': 'var(--g4)',
  '5': 'var(--g5)',
  '6': 'var(--g6)',
  '7': 'var(--g7)',
  '8': 'var(--g8)',
}

export const SUBJECT_LABEL: Record<SubjectId, string> = {
  math: 'Math',
  reading: 'Reading',
  writing: 'Writing',
  science: 'Science',
}
