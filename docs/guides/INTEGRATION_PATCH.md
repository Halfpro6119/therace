# QuizPlayerPage Integration Patch

## Overview

This patch shows how to integrate the new question type system into the existing QuizPlayerPage.

## Changes Required

### 1. Add Imports

Add these imports at the top of `src/pages/QuizPlayerPage.tsx`:

```typescript
import { QuestionRenderer } from '../components/QuestionRenderer';
import { QuizNavigation } from '../components/QuizNavigation';
import { questionRegistry } from '../utils/questionRegistry';
import { QuestionAnswer } from '../types/questionTypes';
```

### 2. Add State Variables

Add these state variables after existing state declarations:

```typescript
// Navigation state
const [currentPromptIndex, setCurrentPromptIndex] = useState(0);
const [answeredPrompts, setAnsweredPrompts] = useState<Set<string>>(new Set());

// Answer state
const [currentInput, setCurrentInput] = useState<any>('');
const [showFeedback, setShowFeedback] = useState(false);
const [feedbackMessage, setFeedbackMessage] = useState('');
const [isCorrect, setIsCorrect] = useState(false);
const [explanation, setExplanation] = useState('');
```

### 3. Add Navigation Functions

Add these functions before the render method:

```typescript
/**
 * Skip to next question without answering
 */
const handleSkip = () => {
  if (currentPromptIndex < quizPrompts.length - 1) {
    setCurrentPromptIndex(currentPromptIndex + 1);
    setCurrentInput('');
    setShowFeedback(false);
    setFeedbackMessage('');
  }
};

/**
 * Go to previous question
 */
const handlePrevious = () => {
  if (currentPromptIndex > 0) {
    setCurrentPromptIndex(currentPromptIndex - 1);
    setCurrentInput('');
    setShowFeedback(false);
    setFeedbackMessage('');
  }
};

/**
 * Go to next question
 */
const handleNext = () => {
  if (currentPromptIndex < quizPrompts.length - 1) {
    setCurrentPromptIndex(currentPromptIndex + 1);
    setCurrentInput('');
    setShowFeedback(false);
    setFeedbackMessage('');
  } else {
    // Last question - end quiz
    endQuiz();
  }
};
```

### 4. Add Answer Validation Function

```typescript
/**
 * Submit and validate answer using registry system
 */
const handleSubmitAnswer = async () => {
  if (!currentPrompt || isSubmitting) return;

  setIsSubmitting(true);

  try {
    // Get handler for this question type
    const handler = questionRegistry.getHandler(currentPrompt.type as any);
    if (!handler) {
      console.error(`No handler for type: ${currentPrompt.type}`);
      setFeedbackMessage('Error: Unknown question type');
      setShowFeedback(true);
      setIsSubmitting(false);
      return;
    }

    // Create answer object
    const userAnswer: QuestionAnswer = {
      type: currentPrompt.type as any,
      value: currentInput,
    };

    // Validate answer
    const result = handler.validateAnswer(currentPrompt, userAnswer);

    // Update feedback
    setIsCorrect(result.isCorrect);
    setFeedbackMessage(result.feedback || '');
    setExplanation(currentPrompt.explanation || '');
    setShowFeedback(true);

    // Mark as answered
    setAnsweredPrompts(prev => new Set([...prev, currentPrompt.id]));

    // Update mastery tracking
    if (result.isCorrect) {
      solvedPrompts.add(currentPrompt.id);
      setCombo(combo + 1);
      setShowXPPopup(true);
      setShowCheckmark(true);
      soundSystem.playCorrect();
    } else {
      missedPrompts.add(currentPrompt.id);
      setCombo(0);
      soundSystem.playWrong();
    }
  } catch (error) {
    console.error('Error validating answer:', error);
    setFeedbackMessage('Error validating answer');
    setShowFeedback(true);
  } finally {
    setIsSubmitting(false);
  }
};
```

### 5. Update Render Method

Replace the question rendering section with:

```typescript
{currentPrompt && (
  <div className="space-y-6">
    {/* Question Text */}
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        {currentPrompt.question}
      </h2>
      {currentPrompt.hint && !showHint && (
        <button
          onClick={() => setShowHint(true)}
          className="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center gap-2"
        >
          <Lightbulb size={16} /> Show Hint
        </button>
      )}
      {showHint && currentPrompt.hint && (
        <div className="mt-3 p-3 bg-yellow-50 border-l-4 border-yellow-400 text-yellow-800">
          <p className="font-semibold">Hint:</p>
          <p>{currentPrompt.hint}</p>
        </div>
      )}
    </div>

    {/* Question Renderer - Handles all types */}
    <QuestionRenderer
      prompt={currentPrompt}
      currentInput={currentInput}
      onInputChange={setCurrentInput}
      onSubmit={handleSubmitAnswer}
      isSubmitting={isSubmitting}
      showFeedback={showFeedback}
      feedbackMessage={feedbackMessage}
      isCorrect={isCorrect}
      explanation={explanation}
    />

    {/* Navigation */}
    <QuizNavigation
      currentIndex={currentPromptIndex}
      totalQuestions={quizPrompts.length}
      onPrevious={handlePrevious}
      onSkip={handleSkip}
      onNext={handleNext}
      onSubmit={handleSubmitAnswer}
      isSubmitting={isSubmitting}
      canGoBack={currentPromptIndex > 0}
      hasAnswered={answeredPrompts.has(currentPrompt.id)}
      showSubmitButton={!showFeedback}
    />
  </div>
)}
```

### 6. Initialize Registry in App.tsx

In `src/App.tsx`, add this import and initialization:

```typescript
import { initializeQuestionRegistry } from '@/utils/questionRegistry';

// In your App component, call this once on startup:
useEffect(() => {
  initializeQuestionRegistry();
}, []);
```

## Testing Checklist

After integration, test the following:

- [ ] SHORT questions show mark scheme comparison
- [ ] MCQ questions show choice buttons with visual feedback
- [ ] FILL questions auto-fill on correct answer
- [ ] MATCH questions show dropdown selectors
- [ ] LABEL questions show target assignments
- [ ] Skip button moves to next question
- [ ] Previous button goes back
- [ ] Question counter updates correctly
- [ ] Feedback displays correctly
- [ ] Explanation shows after submit
- [ ] Next button enabled after answer
- [ ] Existing questions still work (backwards compatible)
- [ ] Combo counter updates on correct answers
- [ ] XP popup shows on correct answers
- [ ] Sound effects play correctly

## Troubleshooting

**Question not rendering**:
- Check `prompt.type` is one of: short, mcq, fill, match, label
- Verify `meta.questionData` has required fields
- Check browser console for errors

**Answer validation failing**:
- Ensure handler is registered: `questionRegistry.isRegistered(type)`
- Check `meta.questionData` structure matches type schema
- Verify `answers` array is populated

**Navigation not working**:
- Check `currentPromptIndex` state is updating
- Verify `quizPrompts` array is populated
- Check button click handlers are connected

## Reference Implementation

See `src/pages/QuizPlayerPage.enhanced.tsx` for a complete reference implementation showing all the integration points.

