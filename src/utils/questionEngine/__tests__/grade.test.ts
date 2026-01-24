import { describe, it, expect } from 'vitest'
import { grade } from '../grade'
import type { NormalizedQuestion } from '../types'

function baseQ(overrides: Partial<NormalizedQuestion>): NormalizedQuestion {
  return {
    id: 'q1',
    subject_id: 's1',
    type: 'short',
    question: 'What is 2+2?',
    answersAccepted: ['4'],
    marks: 2,
    explanation: '',
    hint: '',
    calculatorAllowed: null,
    drawingRecommended: false,
    meta: { questionData: {}, diagram: undefined },
    ...overrides,
  }
}

describe('grade()', () => {
  it('short: full marks on exact match (case-insensitive)', () => {
    const q = baseQ({ type: 'short', answersAccepted: ['Paris'], marks: 3 })
    const res = grade(q, { type: 'short', text: 'paris' })
    expect(res.isCorrect).toBe(true)
    expect(res.marksAwarded).toBe(3)
  })

  it('mcq: correct key awards marks', () => {
    const q = baseQ({
      type: 'mcq',
      answersAccepted: ['B'],
      marks: 1,
      meta: { questionData: { choices: [{ key: 'A', text: 'x' }, { key: 'B', text: 'y' }] }, diagram: undefined },
    })
    const res = grade(q, { type: 'mcq', selectedKey: 'B' })
    expect(res.isCorrect).toBe(true)
    expect(res.marksAwarded).toBe(1)
  })

  it('fill: partial marks', () => {
    const q = baseQ({
      type: 'fill',
      marks: 2,
      answersAccepted: ['co2', 'oxygen'],
      meta: { questionData: { blanks: 2, acceptedPerBlank: [['co2'], ['oxygen']] }, diagram: undefined },
    })
    const res = grade(q, { type: 'fill', blanks: ['co2', ''] })
    expect(res.isCorrect).toBe(false)
    expect(res.marksAwarded).toBeGreaterThanOrEqual(0)
    expect(res.marksAwarded).toBeLessThanOrEqual(2)
  })

  it('match: order independent & partial', () => {
    const q = baseQ({
      type: 'match',
      marks: 4,
      answersAccepted: ['1A,2B,3C,4D'],
      meta: { questionData: { leftItems: [{ id: '1', text: 'a' }, { id: '2', text: 'b' }], rightItems: [{ id: 'A', text: 'x' }, { id: 'B', text: 'y' }] }, diagram: undefined },
    })
    const res = grade(q, { type: 'match', mapping: { '2': 'B', '1': 'A' } })
    expect(res.marksAwarded).toBeGreaterThanOrEqual(1)
  })

  it('label: per-target partial', () => {
    const q = baseQ({
      type: 'label',
      marks: 3,
      answersAccepted: [''],
      meta: {
        diagram: { mode: 'template' },
        questionData: {
          labelBank: [{ id: 'L1', text: 'A' }, { id: 'L2', text: 'B' }],
          targets: [{ id: 'T1', prompt: 'p1', correctLabelId: 'L1' }, { id: 'T2', prompt: 'p2', correctLabelId: 'L2' }, { id: 'T3', prompt: 'p3', correctLabelId: 'L2' }],
        },
      },
    })

    const res = grade(q, { type: 'label', placements: { T1: 'L1', T2: 'WRONG', T3: '' } })
    expect(res.isCorrect).toBe(false)
    expect(res.marksAwarded).toBeGreaterThanOrEqual(0)
    expect(res.marksAwarded).toBeLessThanOrEqual(3)
  })
})
