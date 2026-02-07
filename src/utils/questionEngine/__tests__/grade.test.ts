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

  it('tableFill: full marks when all cells correct', () => {
    const q = baseQ({
      type: 'tableFill',
      marks: 2,
      answersAccepted: ['3,0,-1,0,3'],
      meta: {
        questionData: {
          rows: [
            { x: '-2', y: '3' },
            { x: '-1', y: '0' },
            { x: '0', y: '-1' },
            { x: '1', y: '0' },
            { x: '2', y: '3' },
          ],
        },
        diagram: undefined,
      },
    })
    const cells = [
      { x: '-2', y: '3' },
      { x: '-1', y: '0' },
      { x: '0', y: '-1' },
      { x: '1', y: '0' },
      { x: '2', y: '3' },
    ]
    const res = grade(q, { type: 'tableFill', cells })
    expect(res.isCorrect).toBe(true)
    expect(res.marksAwarded).toBe(2)
  })

  it('tableFill: partial marks when some cells correct', () => {
    const q = baseQ({
      type: 'tableFill',
      marks: 2,
      answersAccepted: ['10,15,5'],
      meta: {
        questionData: {
          rows: [
            { value: '1', frequency: '10' },
            { value: '2', frequency: '15' },
            { value: '3', frequency: '5' },
          ],
        },
        diagram: undefined,
      },
    })
    const cells = [
      { value: '1', frequency: '10' },
      { value: '2', frequency: '99' },
      { value: '3', frequency: '5' },
    ]
    const res = grade(q, { type: 'tableFill', cells })
    expect(res.isCorrect).toBe(false)
    expect(res.marksAwarded).toBeGreaterThanOrEqual(1)
    expect(res.marksAwarded).toBeLessThan(2)
  })

  it('tableFill: unable to grade when meta.questionData.rows missing', () => {
    const q = baseQ({
      type: 'tableFill',
      marks: 1,
      answersAccepted: [''],
      meta: { questionData: {}, diagram: undefined },
    })
    const res = grade(q, { type: 'tableFill', cells: [{ x: '1', y: '2' }] })
    expect(res.isCorrect).toBe(false)
    expect(res.marksAwarded).toBe(0)
    expect(res.feedback.summary).toContain('Unable to grade')
  })

  describe('short/proofShort with mark scheme (keywords and key numbers)', () => {
    it('awards partial marks for matching keywords', () => {
      const q = baseQ({
        type: 'proofShort',
        marks: 2,
        answersAccepted: [''],
        meta: {
          questionData: {
            markScheme: [
              { keywords: ['midpoint', 'average'], marks: 1 },
              { keywords: ['substitute', 'y=2x+1'], marks: 1 },
            ],
          },
          diagram: undefined,
        },
      })
      const res = grade(q, { type: 'short', text: 'The midpoint is (2,5). Substitute into y=2x+1.' })
      expect(res.marksAwarded).toBe(2)
      expect(res.isCorrect).toBe(true)
    })

    it('awards partial marks when only one criterion matches', () => {
      const q = baseQ({
        type: 'proofShort',
        marks: 2,
        answersAccepted: [''],
        meta: {
          questionData: {
            markScheme: [
              { keyNumbers: ['3/8'], marks: 1 },
              { keywords: ['tree', 'probability'], marks: 1 },
            ],
          },
          diagram: undefined,
        },
      })
      const res = grade(q, { type: 'short', text: 'So the probability is 3/8' })
      expect(res.marksAwarded).toBe(1)
      expect(res.isCorrect).toBe(false)
    })

    it('awards marks for key number 5/12 in answer', () => {
      const q = baseQ({
        type: 'proofShort',
        marks: 2,
        answersAccepted: [''],
        meta: {
          questionData: {
            markScheme: [
              { keyNumbers: ['5/12'], marks: 1 },
              { keywords: ['favourable', 'total'], marks: 1 },
            ],
          },
          diagram: undefined,
        },
      })
      const res = grade(q, { type: 'short', text: 'P = 5/12. Favourable outcomes over total.' })
      expect(res.marksAwarded).toBe(2)
      expect(res.isCorrect).toBe(true)
    })

    it('caps marks at maxMarks when scheme sum exceeds', () => {
      const q = baseQ({
        type: 'short',
        marks: 2,
        answersAccepted: [''],
        meta: {
          questionData: {
            markScheme: [
              { keywords: ['a'], marks: 1 },
              { keywords: ['b'], marks: 1 },
              { keywords: ['c'], marks: 1 },
            ],
          },
          diagram: undefined,
        },
      })
      const res = grade(q, { type: 'short', text: 'answer a b c' })
      expect(res.marksAwarded).toBe(2)
      expect(res.isCorrect).toBe(true)
    })
  })

  describe('graphPlot / geometryConstruct (coordinate grading)', () => {
    it('graphPlot: full marks when all expected points matched within tolerance', () => {
      const q = baseQ({
        type: 'graphPlot',
        marks: 2,
        answersAccepted: ['(0,0), (-2,4), (2,4)'],
        meta: {
          questionData: {
            expectedPoints: [{ x: 0, y: 0 }, { x: -2, y: 4 }, { x: 2, y: 4 }],
            coordinateTolerance: 0.6,
          },
          diagram: undefined,
        },
      })
      const res = grade(q, {
        type: 'graphPlot',
        value: { points: [{ x: 0, y: 0 }, { x: -2, y: 4 }, { x: 2, y: 4 }] },
      })
      expect(res.isCorrect).toBe(true)
      expect(res.marksAwarded).toBe(2)
    })

    it('graphPlot: partial marks when some points match', () => {
      const q = baseQ({
        type: 'graphPlot',
        marks: 3,
        answersAccepted: [''],
        meta: {
          questionData: {
            expectedPoints: [{ x: 0, y: 0 }, { x: 2, y: 4 }, { x: -2, y: 4 }],
            coordinateTolerance: 0.6,
          },
          diagram: undefined,
        },
      })
      const res = grade(q, {
        type: 'graphPlot',
        value: { points: [{ x: 0, y: 0 }, { x: 2, y: 4.2 }, { x: 5, y: 5 }] },
      })
      expect(res.isCorrect).toBe(false)
      expect(res.marksAwarded).toBeGreaterThanOrEqual(1)
      expect(res.marksAwarded).toBeLessThanOrEqual(2)
    })

    it('geometryConstruct: order matters, full marks when vertices match in order', () => {
      const q = baseQ({
        type: 'geometryConstruct',
        marks: 2,
        answersAccepted: [''],
        meta: {
          questionData: {
            expectedPoints: [{ x: 1, y: -2 }, { x: 1, y: -4 }, { x: 3, y: -2 }],
            coordinateTolerance: 0.6,
          },
          diagram: undefined,
        },
      })
      const res = grade(q, {
        type: 'geometryConstruct',
        value: { points: [{ x: 1, y: -2 }, { x: 1, y: -4 }, { x: 3, y: -2 }] },
      })
      expect(res.isCorrect).toBe(true)
      expect(res.marksAwarded).toBe(2)
    })

    it('graphPlot: unable to grade when expectedPoints missing, fallback to short', () => {
      const q = baseQ({
        type: 'graphPlot',
        marks: 1,
        answersAccepted: ['parabola through (0,0)'],
        meta: { questionData: {}, diagram: undefined },
      })
      const res = grade(q, {
        type: 'graphPlot',
        value: { points: [{ x: 0, y: 0 }] },
      })
      expect(res.marksAwarded).toBe(0)
      expect(res.feedback.summary).toContain('Incorrect')
    })
  })
})
