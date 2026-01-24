import { describe, it, expect } from 'vitest'
import { normalizeQuestion } from '../normalizeQuestion'

describe('normalizeQuestion()', () => {
  it('never throws and fills defaults', () => {
    const q = normalizeQuestion({ id: '1', subjectId: 's', type: 'short', question: '  Hello  ', answers: ['  A  '], meta: null })
    expect(q.question).toBe('Hello')
    expect(q.answersAccepted).toEqual(['A'])
    expect(q.marks).toBeGreaterThanOrEqual(1)
  })

  it('mcq: generates questionData choices from choiceA..', () => {
    const q = normalizeQuestion({
      id: '1',
      subjectId: 's',
      type: 'mcq',
      question: 'Q?',
      answers: ['A'],
      choiceA: 'first',
      choiceB: 'second',
    })
    expect(Array.isArray(q.meta.questionData.choices)).toBe(true)
    expect(q.meta.questionData.choices.length).toBe(2)
  })

  it('fill: infers blanks from ____ in question text', () => {
    const q = normalizeQuestion({
      id: '1',
      subjectId: 's',
      type: 'fill',
      question: 'CO2 is ____ gas and ____ is produced',
      answers: ['co2', 'oxygen'],
      meta: { questionData: {} },
    })
    expect(q.meta.questionData.blanks).toBe(2)
  })
})
