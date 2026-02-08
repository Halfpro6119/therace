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

  it('short: interval with different variable letter accepted (e.g. x vs m)', () => {
    const q = baseQ({
      type: 'short',
      answersAccepted: ['3.445≤m<3.455'],
      marks: 1,
    })
    const res = grade(q, { type: 'short', text: '3.445 ≤ x < 3.455' })
    expect(res.isCorrect).toBe(true)
    expect(res.marksAwarded).toBe(1)
  })

  it('short: product of factors order-independent (e.g. prime factors 2²×3²×5)', () => {
    const q = baseQ({
      type: 'short',
      answersAccepted: ['2²×3²×5'],
      marks: 1,
    })
    expect(grade(q, { type: 'short', text: '2²x5x3²' }).isCorrect).toBe(true)
    expect(grade(q, { type: 'short', text: '2^2 x 3^2 x 5' }).isCorrect).toBe(true)
    expect(grade(q, { type: 'short', text: '2²×3²×5' }).isCorrect).toBe(true)
    expect(grade(q, { type: 'short', text: '2²×5×3²' }).isCorrect).toBe(true)
    expect(grade(q, { type: 'short', text: '2²×3²×7' }).isCorrect).toBe(false)
  })

  it('short/expression: product of algebraic factors order-independent (e.g. factorise (x+4)(x+5))', () => {
    const q = baseQ({
      type: 'short',
      answersAccepted: ['(x+4)(x+5)'],
      marks: 1,
    })
    expect(grade(q, { type: 'short', text: '(x+5)(x+4)' }).isCorrect).toBe(true)
    expect(grade(q, { type: 'short', text: '(x+4)(x+5)' }).isCorrect).toBe(true)
    expect(grade(q, { type: 'short', text: '(x+4)*(x+5)' }).isCorrect).toBe(true)
    expect(grade(q, { type: 'short', text: '(x+3)(x+5)' }).isCorrect).toBe(false)
  })

  it('short/expression: algebra-type answers accept optional variable= prefix (e.g. make r the subject, solve for x)', () => {
    const q = baseQ({
      type: 'expression',
      question: 'Make r the subject: V = (4/3)πr³',
      answersAccepted: ['∛(3V/(4π))'],
      marks: 1,
    })
    expect(grade(q, { type: 'short', text: 'r=∛(3V/(4π))' }).isCorrect).toBe(true)
    expect(grade(q, { type: 'short', text: '∛(3V/(4π))' }).isCorrect).toBe(true)
    expect(grade(q, { type: 'short', text: 'r = ∛(3V/(4π))' }).isCorrect).toBe(true)
    const solveForX = baseQ({
      type: 'expression',
      question: 'Make x the subject: y = 5x − 7',
      answersAccepted: ['(y+7)/5'],
      marks: 1,
    })
    expect(grade(solveForX, { type: 'short', text: 'x=(y+7)/5' }).isCorrect).toBe(true)
    expect(grade(solveForX, { type: 'short', text: '(y+7)/5' }).isCorrect).toBe(true)
    expect(grade(solveForX, { type: 'short', text: 'x = (y+7)/5' }).isCorrect).toBe(true)
  })

  it('short/expression: accepts answer without variable= when correct answer is stored with it', () => {
    const q = baseQ({
      type: 'short',
      question: 'State the axis of symmetry of y = x² – 6x + 1',
      answersAccepted: ['x=3'],
      marks: 1,
    })
    expect(grade(q, { type: 'short', text: '3' }).isCorrect).toBe(true)
    expect(grade(q, { type: 'short', text: 'x=3' }).isCorrect).toBe(true)
  })

  describe('short: units-based grading (transformation/describe)', () => {
    it('awards full marks when user includes same key units (number + direction) as model answer', () => {
      const q = baseQ({
        type: 'short',
        question: 'Describe the transformation from y = x² to y = (x − 3)²',
        answersAccepted: ['translation 3 right'],
        marks: 1,
      })
      expect(grade(q, { type: 'short', text: '3 spaces right' }).isCorrect).toBe(true)
      expect(grade(q, { type: 'short', text: '3 spaces right' }).marksAwarded).toBe(1)
    })

    it('accepts "translation 3 right" and "3 right" and "3 spaces right" as correct', () => {
      const q = baseQ({
        type: 'short',
        answersAccepted: ['translation 3 right'],
        marks: 1,
      })
      expect(grade(q, { type: 'short', text: 'translation 3 right' }).isCorrect).toBe(true)
      expect(grade(q, { type: 'short', text: '3 right' }).isCorrect).toBe(true)
      expect(grade(q, { type: 'short', text: '3 spaces right' }).isCorrect).toBe(true)
      expect(grade(q, { type: 'short', text: 'move 3 right' }).isCorrect).toBe(true)
    })

    it('rejects when number or direction is wrong', () => {
      const q = baseQ({
        type: 'short',
        answersAccepted: ['translation 3 right'],
        marks: 1,
      })
      expect(grade(q, { type: 'short', text: '2 right' }).isCorrect).toBe(false)
      expect(grade(q, { type: 'short', text: '3 left' }).isCorrect).toBe(false)
      expect(grade(q, { type: 'short', text: 'right' }).isCorrect).toBe(false)
      expect(grade(q, { type: 'short', text: '3' }).isCorrect).toBe(false)
    })

    it('accepts multiple numbers and directions (e.g. translation 2 right, 3 up)', () => {
      const q = baseQ({
        type: 'short',
        answersAccepted: ['reflection in x-axis, translation 2 right, 3 up'],
        marks: 1,
      })
      expect(grade(q, { type: 'short', text: 'reflection, 2 right 3 up' }).isCorrect).toBe(true)
      expect(grade(q, { type: 'short', text: '2 right, 3 up' }).isCorrect).toBe(true)
      expect(grade(q, { type: 'short', text: '2 right and 3 up' }).isCorrect).toBe(true)
    })
  })

  describe('short: general key-units for describe/explain (all short answers)', () => {
    it('awards full marks when user includes all content words and numbers from accepted', () => {
      const q = baseQ({
        type: 'short',
        question: 'Describe the correlation',
        answersAccepted: ['positive correlation'],
        marks: 1,
      })
      expect(grade(q, { type: 'short', text: 'positive correlation' }).isCorrect).toBe(true)
      expect(grade(q, { type: 'short', text: 'It shows positive correlation' }).isCorrect).toBe(true)
      expect(grade(q, { type: 'short', text: 'the correlation is positive' }).isCorrect).toBe(true)
    })

    it('rejects when a key content word is missing', () => {
      const q = baseQ({
        type: 'short',
        answersAccepted: ['positive correlation'],
        marks: 1,
      })
      expect(grade(q, { type: 'short', text: 'positive' }).isCorrect).toBe(false)
      expect(grade(q, { type: 'short', text: 'correlation' }).isCorrect).toBe(false)
    })

    it('works with multiple accepted answers (user can match any via key units)', () => {
      const q = baseQ({
        type: 'short',
        question: 'Describe correlation',
        answersAccepted: ['positive', 'positive correlation', 'negative', 'negative correlation'],
        marks: 1,
      })
      expect(grade(q, { type: 'short', text: 'positive' }).isCorrect).toBe(true)
      expect(grade(q, { type: 'short', text: 'it has positive correlation' }).isCorrect).toBe(true)
      expect(grade(q, { type: 'short', text: 'negative correlation' }).isCorrect).toBe(true)
    })

    it('describe/explain with numbers: requires numbers and content words', () => {
      const q = baseQ({
        type: 'short',
        question: 'Describe the asymptotes of y = 1/x',
        answersAccepted: ['x=0, y=0'],
        marks: 1,
      })
      expect(grade(q, { type: 'short', text: 'x=0, y=0' }).isCorrect).toBe(true)
      expect(grade(q, { type: 'short', text: 'asymptotes at x=0 and y=0' }).isCorrect).toBe(true)
    })

    it('exact match still works and key-units does not break single-word answers', () => {
      const q = baseQ({ type: 'short', answersAccepted: ['Paris'], marks: 1 })
      expect(grade(q, { type: 'short', text: 'Paris' }).isCorrect).toBe(true)
      expect(grade(q, { type: 'short', text: 'paris' }).isCorrect).toBe(true)
    })
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

  it('fill: standard form accepts * as × (math notation normalized)', () => {
    const q = baseQ({
      type: 'fill',
      marks: 1,
      answersAccepted: ['3.6×10^-4'],
      meta: { questionData: { blanks: 1, acceptedPerBlank: [['3.6×10^-4']] }, diagram: undefined },
    })
    expect(grade(q, { type: 'fill', blanks: ['3.6*10^-4'] }).isCorrect).toBe(true)
    expect(grade(q, { type: 'fill', blanks: ['3.6×10^-4'] }).isCorrect).toBe(true)
  })

  it('short: standard form accepts * as × (math notation normalized)', () => {
    const q = baseQ({
      type: 'short',
      answersAccepted: ['3.6×10^-4'],
      marks: 1,
    })
    expect(grade(q, { type: 'short', text: '3.6*10^-4' }).isCorrect).toBe(true)
    expect(grade(q, { type: 'short', text: '3.6×10^-4' }).isCorrect).toBe(true)
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

  it('multiNumeric: order-independent matching, partial marks for one correct answer', () => {
    const q = baseQ({
      type: 'multiNumeric',
      marks: 2,
      answersAccepted: ['-2,-3'],
      meta: {
        questionData: {
          fields: [
            { label: 'Answer 1', answer: -2, tolerance: 0 },
            { label: 'Answer 2', answer: -3, tolerance: 0 },
          ],
        },
        diagram: undefined,
      },
    })
    // User enters -3 in Answer 1, leaves Answer 2 empty — should get 1 partial mark
    const res = grade(q, { type: 'multiNumeric', values: ['-3', ''] })
    expect(res.isCorrect).toBe(false)
    expect(res.marksAwarded).toBe(1)
    expect(res.feedback.correctAnswer).toContain('-2')
    expect(res.feedback.correctAnswer).toContain('-3')
  })

  it('numeric: accepts x= prefix for algebra-type (e.g. Solve 4x − 7 = 21)', () => {
    const q = baseQ({
      type: 'numeric',
      question: 'Solve 4x - 7 = 21',
      answersAccepted: ['7'],
      marks: 1,
      meta: { questionData: { numericTolerance: 0.3 }, diagram: undefined },
    })
    expect(grade(q, { type: 'numeric', text: 'x=7' }).isCorrect).toBe(true)
    expect(grade(q, { type: 'numeric', text: '7' }).isCorrect).toBe(true)
    expect(grade(q, { type: 'numeric', text: 'x = 7' }).isCorrect).toBe(true)
  })

  it('numeric: accepts answer without x= when correct answer is stored as x= (e.g. axis of symmetry)', () => {
    const q = baseQ({
      type: 'numeric',
      question: 'State the axis of symmetry of y = x² – 6x + 1',
      answersAccepted: ['x=3'],
      marks: 1,
      meta: { questionData: { numericTolerance: 0.3 }, diagram: undefined },
    })
    expect(grade(q, { type: 'numeric', text: '3' }).isCorrect).toBe(true)
    expect(grade(q, { type: 'numeric', text: 'x=3' }).isCorrect).toBe(true)
  })

  it('multiNumeric: accepts x= prefix in each field (e.g. Solve 2x² − 8 = 0)', () => {
    const q = baseQ({
      type: 'multiNumeric',
      marks: 2,
      answersAccepted: ['2,-2'],
      meta: {
        questionData: {
          fields: [
            { label: 'Answer 1', answer: 2, tolerance: 0 },
            { label: 'Answer 2', answer: -2, tolerance: 0 },
          ],
        },
        diagram: undefined,
      },
    })
    const res = grade(q, { type: 'multiNumeric', values: ['x=2', 'x=-2'] })
    expect(res.isCorrect).toBe(true)
    expect(res.marksAwarded).toBe(2)
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
    // 4 of 6 cells correct (value/frequency for row 2 wrong) → 1 mark; 5/6 would round to 2
    const cells = [
      { value: '1', frequency: '10' },
      { value: '2', frequency: '99' },
      { value: '3', frequency: '99' },
    ]
    const res = grade(q, { type: 'tableFill', cells })
    expect(res.isCorrect).toBe(false)
    expect(res.marksAwarded).toBe(1)
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
      // Match only keyNumbers (3/8), not keywords (tree/probability)
      const res = grade(q, { type: 'short', text: 'The answer is 3/8' })
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
