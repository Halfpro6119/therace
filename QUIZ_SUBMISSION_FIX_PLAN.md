# Quiz Submission Flow - Debug & Fix Plan

## Current Architecture Analysis

### Components Involved:
1. **QuizPlayerPage.tsx** (950 lines)
   - Main quiz orchestrator
   - `handleSubmitAnswer()` at line 120
   - State: `isSubmitting`, `showFeedback`, `gradeResult`, etc.

2. **QuestionRenderer.tsx** (137 lines)
   - Normalizes questions to canonical format
   - `gradeFromRenderer()` function for grading
   - Renders question type components

3. **QuestionTypes.tsx** (287 lines)
   - Individual question type components (Short, MCQ, Fill, Match, Label)
   - Each has `onSubmit` prop but may not be wired correctly

4. **Question Engine** (`utils/questionEngine/`)
   - `normalizeQuestion()` - converts DB format to canonical
   - `grade()` - deterministic grading
   - `validate()` - validation

## Identified Issues

### Issue 1: Submit Handler Not Firing
- QuestionRenderer passes `onSubmit` prop to question components
- ShortQuestion has `onKeyDown` for Enter key
- But MCQ/Fill/Match/Label may not have submit button wired

### Issue 2: State Not Updating
- `handleSubmitAnswer()` sets multiple state variables
- But no explicit "Continue" button shown after feedback
- User may not know what to do next

### Issue 3: No Attempt Persistence
- `handleSubmitAnswer()` shows feedback but doesn't save attempt to Supabase
- Progress not recorded in database

### Issue 4: Navigation Logic Missing
- After submit, no automatic advance to next question
- No "Continue" button visible

## Fix Strategy

### Phase 1: Add Debug Logging (Temporary)
Add console.log at key points:
- onAnswerChange
- handleSubmitAnswer entry/exit
- gradeFromRenderer call
- State updates
- Navigation

### Phase 2: Fix Submit Button Wiring
- Ensure all question types have visible submit button
- Wire onClick to onSubmit prop
- Disable button when answer is empty

### Phase 3: Implement Attempt Persistence
- Save attempt to Supabase after grading
- Update mastery/streak
- Handle errors gracefully

### Phase 4: Add Continue Flow
- Show "Continue" button after feedback
- Auto-advance or wait for user click
- Handle quiz completion

### Phase 5: Test All Question Types
- Short: type + Enter
- MCQ: select + submit
- Fill: fill blanks + submit
- Match: match pairs + submit
- Label: label placements + submit

## Implementation Order

1. Add temporary console logs
2. Test locally to identify exact failure point
3. Fix submit button visibility/wiring
4. Implement attempt persistence
5. Add continue/next flow
6. Remove console logs
7. Commit to GitHub

