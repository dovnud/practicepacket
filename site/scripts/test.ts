import assert from 'node:assert/strict'
import { test } from 'node:test'
import { sheet } from '../src/lib/generate.ts'
import { solve } from '../src/lib/solve.ts'
import { SKILLS, formatGradeRange, skillPath } from '../src/lib/skills.ts'
import { LEVELS } from '../src/lib/types.ts'

const BATCH1 = [
  'g1-add-20',
  'g1-sub-20',
  'g1-compare',
  'g1-place',
  'g2-add-regroup',
  'g2-sub-regroup',
  'g2-sub-zero',
  'g2-place-hundreds',
  'g2-time-quarter',
  'g3-mul-05',
  'g3-mul-610',
  'g3-div-05',
  'g3-div-610',
  'g3-frac-shape',
  'g3-frac-line',
  'g3-add-3',
  'g3-sub-3',
]

test('batch 1 is the 16 priority skills plus the quarter-hour control', () => {
  const ids = SKILLS.filter((s) => s.batch === 1).map((s) => s.id).sort()
  assert.deepEqual(ids, [...BATCH1].sort())
})

test('every skill has a unique path, title, and description', () => {
  const paths = new Set<string>()
  const titles = new Set<string>()
  const descriptions = new Set<string>()
  for (const skill of SKILLS) {
    const path = skillPath(skill)
    assert.equal(paths.has(path), false, path)
    assert.equal(titles.has(skill.title), false, skill.title)
    assert.equal(descriptions.has(skill.description), false, skill.description)
    paths.add(path)
    titles.add(skill.title)
    descriptions.add(skill.description)
    assert.ok(skill.explanation.length > 40, skill.id)
    assert.ok(skill.example.steps.length >= 2, skill.id)
    assert.ok(skill.standard.code.includes('.'), skill.id)
  }
})

test('related skills exist and grades K-5 math are present', () => {
  const ids = new Set(SKILLS.map((s) => s.id))
  for (const skill of SKILLS) {
    for (const id of skill.related) assert.ok(ids.has(id), id)
  }
  for (const grade of ['k', '1', '2', '3', '4', '5']) {
    assert.ok(SKILLS.some((s) => s.grade === grade && s.subject === 'math'), grade)
  }
  assert.equal(SKILLS.some((s) => s.subject !== 'math'), false)
})

test('answer keys match the problems for every skill and level', () => {
  for (const skill of SKILLS) {
    for (const level of LEVELS) {
      for (const variant of [0, 1]) {
        const problems = sheet(skill, level, variant)
        assert.ok(problems.length >= 4, `${skill.id} ${level}`)
        for (const problem of problems) {
          assert.equal(problem.answer, solve(problem.proof), `${skill.id} ${level} ${problem.prompt}`)
          assert.equal(problem.answer.length > 0, true)
        }
      }
    }
  }
})

test('grade range copy follows the released grades', () => {
  assert.equal(formatGradeRange(['1', '2', '3']), 'grades 1 through 3')
  assert.equal(formatGradeRange(['k']), 'kindergarten')
  assert.equal(formatGradeRange(['k', '1', '2', '3', '4', '5']), 'kindergarten through grade 5')
  assert.equal(formatGradeRange(['4', '5']), 'grades 4 through 5')
  assert.equal(formatGradeRange(['1', '3']), 'grade 1 and grade 3')
  assert.equal(formatGradeRange(['1']), 'grade 1')
})

test('no personal email addresses in skill copy', () => {
  const blob = JSON.stringify(SKILLS)
  const emails = blob.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi) || []
  assert.deepEqual(emails, [])
})
