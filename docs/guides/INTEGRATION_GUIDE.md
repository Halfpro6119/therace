# Quiz Player Integration Guide - Complete Implementation

## Overview

This guide explains how to integrate the new question type system with skip/previous navigation into the existing QuizPlayerPage.

## What Needs to Be Added

### 1. Import New Components

Add these imports to `src/pages/QuizPlayerPage.tsx`:

```typescript
import { QuestionRenderer } from '../components/QuestionRenderer';
import { QuizNavigation } from '../components/QuizNavigation';
import { questionRegistry } from '../utils/questionRegistry';
import { QuestionAnswer } from '../types/questionTypes';
```

### 2. Initialize Registry

In your app startup (App.tsx or main.tsx), add:

```typescript
import { initializeQuestionRegistry } from '@/utils/questionRegistry';

// Call once on app startup
initializeQuestionRegistry();
```

### 3. Update State Management

Add these state variables to QuizPlayerPage:

```typescript
// Navigation state
const [currentPromptIndex, setCurrentPromptIndex] = useState(0);
const [answeredPrompts, setAnsweredPrompts] = useState<Set<string>>(new Set());

// Answer state
const [currentInput, setCurrentInput] = useState<any>('');
const [showFeedback, setShowFeedback] = useState(false);
const [feedbackMessage, setFeedbackMessage] = useState('');
const [isCorrect, setIsCorrect] = useState(false);
```

### 4. Implement Navigation Functions

```typescript
// Skip to next question
const handleSkip = () => {
  if (currentPromptIndex < quizPrompts.length - 1) {
    setCurrentPromptIndex(currentPromptIndex + 1);
    setCurrentInput('');
    setShowFeedback(false);
  }
};

// Go to previous question
const handlePrevious = () => {
  if (currentPromptIndex > 0) {
    setCurrentPromptIndex(currentPromptIndex - 1);
    setCurrentInput('');
    setShowFeedback(false);
  }
};

// Go to next question
const handleNext = () => {
  if (currentPromptIndex < quizPrompts.length - 1) {
    setCurrentPromptIndex(currentPromptIndex + 1);
    setCurrentInput('');
    setShowFeedback(false);
  }
};
```

### 5. Implement Answer Validation

```typescript
const handleSubmitAnswer = async () => {
  const currentPrompt = quizPrompts[currentPromptIndex];
  
  // Use registry to validate answer
  const handler = questionRegistry.getHandler(currentPrompt.type as any);
  if (!handler) {
    console.error(`No handler for type: ${currentPrompt.type}`);
    return;
  }

  // Create answer object based on type
  const userAnswer: QuestionAnswer = {
    type: currentPrompt.type as any,
    value: currentInput,
  };

  // Validate answer
  const result = handler.validateAnswer(currentPrompt, userAnswer);
  
  setIsCorrect(result.isCorrect);
  setFeedbackMessage(result.feedback || '');
  setShowFeedback(true);

  // Mark as answered
  setAnsweredPrompts(prev => new Set([...prev, currentPrompt.id]));

  // Update mastery/streak if correct
  if (result.isCorrect) {
    // Update your mastery tracking here
    solvedPrompts.add(currentPrompt.id);
  } else {
    missedPrompts.add(currentPrompt.id);
  }
};
```

### 6. Update Render Method

Replace the question rendering section with:

```typescript
{currentPrompt && (
  <div className="space-y-6">
    {/* Question Text */}
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        {currentPrompt.question}
      </h2>
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
      explanation={currentPrompt.explanation}
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

## Question Type Features

### SHORT ANSWER (📝)
- **Input**: Text area for longer answers
- **Features**:
  - Mark scheme comparison (expandable)
  - Case sensitivity options
  - Numeric tolerance support
  - Explanation display
- **Auto-fill**: N/A

### MCQ (⭕)
- **Input**: Choice buttons with visual selection
- **Features**:
  - Visual feedback (green for correct, red for wrong)
  - Radio button style selection
  - Explanation display
  - Multiple choice support
- **Auto-fill**: N/A

### FILL (✏️)
- **Input**: Multiple text inputs (one per blank)
- **Features**:
  - Auto-fill on correct answer (shows ✓ Correct)
  - Per-blank validation
  - Case insensitive matching
  - Explanation display
- **Auto-fill**: ✅ YES - Automatically marks blanks as correct

### MATCH (🔗)
- **Input**: Dropdown selectors for each left item
- **Features**:
  - Left/right column layout
  - Dropdown for each left item
  - Visual preview of selected right item
  - Explanation display
- **Auto-fill**: N/A

### LABEL (🏷️)
- **Input**: Dropdown selectors for each target
- **Features**:
  - Diagram placeholder
  - Target-to-label assignment
  - Explanation display
  - Drag-and-drop ready (future enhancement)
- **Auto-fill**: N/A

## Data Flow

```
User Input
    ↓
QuestionRenderer (type-specific UI)
    ↓
handleSubmitAnswer()
    ↓
questionRegistry.getHandler(type)
    ↓
handler.validateAnswer(prompt, userAnswer)
    ↓
ValidationResult { isCorrect, feedback, explanation }
    ↓
Update UI with feedback
    ↓
Mark as answered
    ↓
Enable Next button
```

## Example: Creating an MCQ Question

In your admin panel, create a question with:

```json
{
  "type": "mcq",
  "question": "What is photosynthesis?",
  "answers": ["A"],
  "meta": {
    "questionData": {
      "choices": [
        { "key": "A", "text": "Process where plants make food" },
        { "key": "B", "text": "Process where plants breathe" },
        { "key": "C", "text": "Process where plants grow" },
        { "key": "D", "text": "Process where plants sleep" }
      ]
    },
    "explanation": "Photosynthesis is the process where plants convert sunlight into chemical energy..."
  }
}
```

When student selects choice A and submits:
1. QuestionRenderer shows choice buttons
2. Student clicks "A"
3. Student clicks "Submit Answer"
4. Handler validates: "A" matches answers[0]
5. Shows "✓ Correct!" feedback
6. Shows explanation
7. Enables "Next" button

## Example: Creating a FILL Question

```json
{
  "type": "fill",
  "question": "Photosynthesis requires ______ and water to produce glucose.",
  "answers": ["carbon dioxide"],
  "meta": {
    "questionData": {
      "blanks": 1,
      "acceptedSets": [
        ["carbon dioxide", "CO2", "carbon dioxide gas"]
      ],
      "caseSensitive": false,
      "trim": true
    },
    "explanation": "Plants need carbon dioxide from the air..."
  }
}
```

When student types "CO2":
1. QuestionRenderer shows text input
2. Student types "CO2"
3. Input automatically validates against acceptedSets
4. Shows "✓ Correct" next to blank
5. Auto-fills the blank
6. Enables "Next" button

## Testing Checklist

- [ ] SHORT questions show mark scheme
- [ ] MCQ questions show choice buttons
- [ ] FILL questions auto-fill on correct answer
- [ ] MATCH questions show dropdown selectors
- [ ] LABEL questions show target assignments
- [ ] Skip button moves to next question
- [ ] Previous button goes back
- [ ] Question counter updates
- [ ] Feedback displays correctly
- [ ] Explanation shows after submit
- [ ] Next button enabled after answer

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

## Next Steps

1. Copy the integration code into QuizPlayerPage
2. Test with existing short-answer questions
3. Create test MCQ questions
4. Create test FILL questions
5. Test skip/previous navigation
6. Deploy to production

