# Question Types System - Complete Guide

## Overview

This document describes the enhanced question type system for the GCSE Revision App. The system is **future-proof**, **extensible**, and **backwards-compatible** with existing questions.

## Architecture

### Core Principles

1. **Type-Specific Metadata**: All type-specific data is stored in `prompt.meta.questionData` as JSONB
2. **Registry Pattern**: New types can be added without database schema changes
3. **Backwards Compatible**: Existing short-answer questions continue to work
4. **Graceful Degradation**: Missing fields show warnings, not crashes

### Data Model

```typescript
// In Supabase prompts table:
{
  id: string;
  type: 'short' | 'mcq' | 'fill' | 'match' | 'label';
  question: string;
  answers: string[];  // Type-specific format
  meta: {
    questionData: {
      // Type-specific fields here
    };
    hint?: string;
    explanation?: string;
    // ... other metadata
  };
}
```

## Question Types

### 1. SHORT ANSWER (📝)

**Use Case**: Text input with flexible answer matching

**Database Structure**:
```json
{
  "type": "short",
  "question": "What is the capital of France?",
  "answers": ["Paris", "paris"],
  "meta": {
    "questionData": {
      "caseSensitive": false,
      "trim": true,
      "numericTolerance": 0.01
    }
  }
}
```

**Admin Form**:
- Question text input
- Multiple accepted answers (add/remove)
- Optional: case sensitivity, trim, numeric tolerance

**Quiz Player**:
- Text input field
- Enter key submits
- Flexible matching against accepted answers

**Import Format**:
```csv
subject,unit,topic,type,question,answers
Biology,Cell Biology,Photosynthesis,short,What is the main product of photosynthesis?,glucose,sugar
```

---

### 2. MULTIPLE CHOICE (⭕)

**Use Case**: Select from predefined options

**Database Structure**:
```json
{
  "type": "mcq",
  "question": "Which gas do plants absorb?",
  "answers": ["A"],
  "meta": {
    "questionData": {
      "choices": [
        { "key": "A", "text": "Carbon dioxide" },
        { "key": "B", "text": "Oxygen" },
        { "key": "C", "text": "Nitrogen" },
        { "key": "D", "text": "Hydrogen" }
      ],
      "multiSelect": false,
      "randomizeOrder": false
    }
  }
}
```

**Admin Form**:
- Question text input
- Add/edit choices (A, B, C, D, etc.)
- Select correct answer key
- Optional: multi-select, randomize order

**Quiz Player**:
- Radio buttons or clickable choice cards
- Visual feedback on selection
- Shows correct answer after submission

**Import Format**:
```csv
subject,unit,topic,type,question,choiceA,choiceB,choiceC,choiceD,correctChoice
Biology,Cell Biology,Photosynthesis,mcq,Which gas do plants absorb?,Carbon dioxide,Oxygen,Nitrogen,Hydrogen,A
```

Or structured JSON:
```json
{
  "type": "mcq",
  "question": "Which gas do plants absorb?",
  "choices": [
    { "key": "A", "text": "Carbon dioxide" },
    { "key": "B", "text": "Oxygen" },
    { "key": "C", "text": "Nitrogen" },
    { "key": "D", "text": "Hydrogen" }
  ],
  "correctChoice": "A"
}
```

---

### 3. FILL IN THE BLANKS (✏️)

**Use Case**: Complete sentences with missing words

**Database Structure**:
```json
{
  "type": "fill",
  "question": "Photosynthesis requires ______ and water to produce glucose.",
  "answers": ["carbon dioxide", "CO2"],
  "meta": {
    "questionData": {
      "blanks": 1,
      "acceptedSets": [
        ["carbon dioxide", "CO2", "carbon dioxide gas"]
      ],
      "caseSensitive": false,
      "trim": true
    }
  }
}
```

**Admin Form**:
- Question text input
- Number of blanks
- Accepted answers per blank (optional)
- Optional: case sensitivity, trim

**Quiz Player**:
- Multiple input fields (one per blank)
- Flexible matching against accepted answers

**Import Format**:
```csv
subject,unit,topic,type,question,blanksCount,acceptedAnswers
Biology,Cell Biology,Photosynthesis,fill,"Photosynthesis requires ______ and water.",1,"[[""carbon dioxide"",""CO2""]]"
```

---

### 4. MATCHING (🔗)

**Use Case**: Match items from two columns

**Database Structure**:
```json
{
  "type": "match",
  "question": "Match the organelle to its function",
  "answers": ["1A,2C,3B"],
  "meta": {
    "questionData": {
      "leftItems": [
        { "id": "1", "text": "Mitochondria" },
        { "id": "2", "text": "Chloroplast" },
        { "id": "3", "text": "Nucleus" }
      ],
      "rightItems": [
        { "id": "A", "text": "Controls cell activities" },
        { "id": "B", "text": "Produces energy" },
        { "id": "C", "text": "Photosynthesis" }
      ],
      "allowMultiple": false,
      "randomizeRight": true
    }
  }
}
```

**Admin Form**:
- Question text input
- Left column items (add/remove)
- Right column items (add/remove)
- Optional: allow multiple matches, randomize right column

**Quiz Player**:
- Two-column layout
- Dropdown selector for each left item
- Visual connection indicators

**Import Format**:
```csv
subject,unit,topic,type,question,matchLeftJson,matchRightJson,matchPairs
Biology,Cell Biology,Organelles,match,Match organelles to functions,"[{""id"":""1"",""text"":""Mitochondria""},{""id"":""2"",""text"":""Chloroplast""}]","[{""id"":""A"",""text"":""Energy""},{""id"":""B"",""text"":""Photosynthesis""}]","1A,2B"
```

---

### 5. LABELING (🏷️)

**Use Case**: Label positions on a diagram

**Database Structure**:
```json
{
  "type": "label",
  "question": "Label the parts of the plant cell",
  "answers": ["{\"T1\":\"L1\",\"T2\":\"L2\",\"T3\":\"L3\"}"],
  "meta": {
    "questionData": {
      "labels": [
        { "id": "L1", "text": "Nucleus" },
        { "id": "L2", "text": "Mitochondria" },
        { "id": "L3", "text": "Cell Wall" }
      ],
      "targets": [
        { "id": "T1", "x": 50, "y": 30, "prompt": "Central organelle" },
        { "id": "T2", "x": 70, "y": 60, "prompt": "Energy producer" },
        { "id": "T3", "x": 20, "y": 50, "prompt": "Outer boundary" }
      ],
      "diagramId": "plant-cell-diagram",
      "dragAndDrop": true,
      "diagramMetadata": {
        "width": 400,
        "height": 300,
        "imageUrl": "https://..."
      }
    }
  }
}
```

**Admin Form**:
- Question text input
- Label bank editor (add/remove labels)
- Target positions editor (x, y coordinates 0-100)
- Diagram selector
- Optional: drag-and-drop vs dropdown

**Quiz Player**:
- Diagram display
- Drag-and-drop or dropdown interface
- Visual feedback on correct placement

**Import Format**:
```csv
subject,unit,topic,type,question,labelBankJson,labelTargetsJson,diagramId
Biology,Cell Biology,Plant Cell,label,Label the plant cell,"[{""id"":""L1"",""text"":""Nucleus""},{""id"":""L2"",""text"":""Mitochondria""}]","[{""id"":""T1"",""x"":50,""y"":30},{""id"":""T2"",""x"":70,""y"":60}]","plant-cell"
```

---

## Admin Interface

### Question Creator Form

The admin question creator provides a dynamic form that changes based on selected type:

1. **Type Selector** (dropdown)
   - Shows all registered question types
   - Changes form fields dynamically

2. **Base Fields** (all types)
   - Question text (required)
   - Hint (optional)
   - Explanation (optional)
   - Tier (higher/foundation/all)
   - Calculator allowed (checkbox)

3. **Type-Specific Fields**
   - SHORT: Answer list editor
   - MCQ: Choice editor + correct answer selector
   - FILL: Blanks count + accepted answers
   - MATCH: Left/right column editors
   - LABEL: Label bank + target position editors

4. **Live Preview**
   - Shows how question will appear to students
   - Updates as you type

### Example: Creating an MCQ

1. Select "Multiple Choice" from type dropdown
2. Enter question: "What is photosynthesis?"
3. Add choices:
   - A: Process where plants make food
   - B: Process where plants breathe
   - C: Process where plants grow
   - D: Process where plants sleep
4. Select correct answer: A
5. Add hint: "Think about what plants need to survive"
6. Add explanation: "Photosynthesis is the process..."
7. Click "Save Question"

---

## Import System

### Supported Formats

#### 1. CSV Import

**Basic Format** (backwards compatible):
```csv
subject,unit,topic,type,question,answers
Biology,Cell Biology,Photosynthesis,short,What is photosynthesis?,The process where plants make food
```

**Enhanced Format** (with type-specific fields):
```csv
subject,unit,topic,type,question,choiceA,choiceB,choiceC,choiceD,correctChoice,hint,explanation
Biology,Cell Biology,Photosynthesis,mcq,What is photosynthesis?,Process where plants make food,Process where plants breathe,Process where plants grow,Process where plants sleep,A,Think about food,Photosynthesis is...
```

#### 2. JSON Import

**Simple Format**:
```json
[
  {
    "subject": "Biology",
    "unit": "Cell Biology",
    "topic": "Photosynthesis",
    "type": "short",
    "question": "What is photosynthesis?",
    "answers": ["The process where plants make food"]
  }
]
```

**Enhanced Format** (with type-specific data):
```json
[
  {
    "subject": "Biology",
    "unit": "Cell Biology",
    "topic": "Photosynthesis",
    "type": "mcq",
    "question": "What is photosynthesis?",
    "choices": [
      { "key": "A", "text": "Process where plants make food" },
      { "key": "B", "text": "Process where plants breathe" },
      { "key": "C", "text": "Process where plants grow" },
      { "key": "D", "text": "Process where plants sleep" }
    ],
    "correctChoice": "A",
    "hint": "Think about food",
    "explanation": "Photosynthesis is..."
  }
]
```

### Import Features

- **Auto-Detection**: Automatically detects question type from available fields
- **Normalization**: Converts various formats to standard structure
- **Validation**: Warns about missing required fields
- **Fallback Handling**: Downgrades to short answer if type-specific fields are missing
- **Backwards Compatible**: Existing imports continue to work

### Import Warnings

The system shows warnings for:
- Missing question text
- MCQ with fewer than 2 choices
- Fill with 0 blanks
- Match with missing left/right items
- Label with missing labels/targets

Questions with warnings are still imported but flagged for review.

---

## Quiz Player

### Navigation

- **Previous Button**: Go to previous question (disabled on first question)
- **Skip Button**: Skip current question and move to next
- **Next Button**: Move to next question
- **Question Counter**: Shows current position (e.g., "Question 3 of 10")

### Type-Specific Rendering

Each question type renders appropriately:

- **SHORT**: Text input with Enter key submit
- **MCQ**: Radio buttons or choice cards
- **FILL**: Multiple input fields (one per blank)
- **MATCH**: Two-column layout with dropdowns
- **LABEL**: Diagram with drag-and-drop or dropdown interface

### Answer Validation

- Uses type-specific validators from registry
- Shows immediate feedback (correct/incorrect)
- Displays correct answer after submission
- Shows explanation if provided

---

## Registry System

### How It Works

The `QuestionTypeRegistry` is a singleton that manages all question types:

```typescript
import { questionRegistry, initializeQuestionRegistry } from '@/utils/questionRegistry';

// Initialize on app startup
initializeQuestionRegistry();

// Use in code
const handler = questionRegistry.getHandler('mcq');
const result = handler.validateAnswer(prompt, userAnswer);
```

### Adding a New Type

To add a new question type (e.g., "ordering"):

1. **Define Types** in `src/types/questionTypes.ts`:
```typescript
export interface OrderingQuestionData {
  items: { id: string; text: string }[];
  randomizeOrder?: boolean;
}
```

2. **Create Handler** in `src/utils/questionRegistry/handlers.ts`:
```typescript
export const orderingHandler: QuestionTypeHandler = {
  type: 'ordering',
  displayName: 'Ordering',
  description: 'Arrange items in correct order',
  icon: '🔢',
  
  validate: (data) => { /* ... */ },
  getRequiredFields: () => ['items'],
  getOptionalFields: () => ['randomizeOrder'],
  validateAnswer: (prompt, userAnswer) => { /* ... */ },
  normalize: (data) => { /* ... */ },
};
```

3. **Register Handler** in `src/utils/questionRegistry/index.ts`:
```typescript
export const allHandlers = [
  shortAnswerHandler,
  mcqHandler,
  fillHandler,
  matchHandler,
  labelHandler,
  orderingHandler,  // Add here
];
```

4. **Add UI Components**:
   - Admin form fields in `QuestionCreatorForm.tsx`
   - Quiz player renderer in `QuestionRenderer.tsx`

5. **Update Import** in `src/admin/importEnhancements.ts`:
   - Add extraction function
   - Add validation logic

**No database changes needed!** The new type is immediately available.

---

## Database Migration

### Existing Questions

All existing questions continue to work:
- `type` field defaults to 'short'
- `meta.questionData` is optional
- Missing fields are handled gracefully

### Adding `meta` Field

If your `prompts` table doesn't have a `meta` JSONB field, add it:

```sql
ALTER TABLE prompts ADD COLUMN meta JSONB DEFAULT '{}'::jsonb;
```

### Backwards Compatibility

- Old questions without `meta.questionData` work as short answers
- New questions store type-specific data in `meta.questionData`
- No data loss or migration required

---

## Best Practices

### For Question Creators

1. **Choose the Right Type**
   - SHORT: Open-ended answers
   - MCQ: Multiple choice exams
   - FILL: Sentence completion
   - MATCH: Relationships between items
   - LABEL: Diagram labeling

2. **Provide Context**
   - Always include hint for difficult questions
   - Provide explanation for learning
   - Use clear, concise language

3. **Test Before Publishing**
   - Use preview to check appearance
   - Test with sample answers
   - Verify all choices/items are correct

### For Developers

1. **Extend Carefully**
   - Follow the registry pattern
   - Maintain backwards compatibility
   - Add comprehensive validation

2. **Test Thoroughly**
   - Test import/export for new types
   - Test quiz player rendering
   - Test answer validation

3. **Document Changes**
   - Update this guide
   - Add code comments
   - Document new import formats

---

## Troubleshooting

### Question Not Showing Correct Type

**Issue**: Question shows as short answer instead of MCQ

**Solution**:
1. Check `prompt.type` field is set correctly
2. Verify `meta.questionData` has required fields
3. Check browser console for warnings

### Import Failing

**Issue**: Import shows warnings or skips questions

**Solution**:
1. Check CSV/JSON format matches examples
2. Verify required fields are present
3. Check for JSON parsing errors in console
4. Review import warnings for specific issues

### Quiz Player Not Rendering

**Issue**: Question appears blank or with error

**Solution**:
1. Check question type is registered
2. Verify `meta.questionData` structure
3. Check browser console for errors
4. Ensure all required fields are present

---

## API Reference

### Question Registry

```typescript
// Get handler for type
const handler = questionRegistry.getHandler('mcq');

// Validate question data
const result = questionRegistry.validate('mcq', questionData);

// Validate user answer
const validation = questionRegistry.validateAnswer(prompt, userAnswer);

// Get all registered types
const types = questionRegistry.getAllTypes();

// Check if type is registered
const isRegistered = questionRegistry.isRegistered('mcq');
```

### Import Utilities

```typescript
import {
  detectQuestionType,
  extractMCQChoices,
  extractFillData,
  extractMatchData,
  extractLabelData,
  normalizeImportRow,
  validateImportRow,
} from '@/admin/importEnhancements';

// Detect type from import row
const type = detectQuestionType(row);

// Extract type-specific data
const choices = extractMCQChoices(row);
const fillData = extractFillData(row);

// Normalize entire row
const normalized = normalizeImportRow(row);

// Validate row
const warnings = validateImportRow(row, 'mcq');
```

---

## Examples

### Example 1: Creating an MCQ Question

**Admin Form**:
1. Type: Multiple Choice
2. Question: "What is the chemical formula for water?"
3. Choices:
   - A: H₂O
   - B: CO₂
   - C: O₂
   - D: H₂O₂
4. Correct: A
5. Hint: "Think about hydrogen and oxygen"
6. Explanation: "Water is composed of 2 hydrogen atoms and 1 oxygen atom"

**Stored in Database**:
```json
{
  "type": "mcq",
  "question": "What is the chemical formula for water?",
  "answers": ["A"],
  "meta": {
    "questionData": {
      "choices": [
        { "key": "A", "text": "H₂O" },
        { "key": "B", "text": "CO₂" },
        { "key": "C", "text": "O₂" },
        { "key": "D", "text": "H₂O₂" }
      ]
    },
    "hint": "Think about hydrogen and oxygen",
    "explanation": "Water is composed of 2 hydrogen atoms and 1 oxygen atom"
  }
}
```

### Example 2: Importing Fill Questions

**CSV Format**:
```csv
subject,unit,topic,type,question,blanksCount,answers
Chemistry,Atomic Structure,Bonding,fill,"A ______ bond is formed when electrons are shared between atoms.",1,"covalent"
Chemistry,Atomic Structure,Bonding,fill,"An ______ bond is formed when electrons are transferred from one atom to another.",1,"ionic"
```

**Result**: Two fill-in-the-blanks questions with 1 blank each

### Example 3: Importing Match Questions

**JSON Format**:
```json
[
  {
    "subject": "Biology",
    "unit": "Ecology",
    "topic": "Food Chains",
    "type": "match",
    "question": "Match the organism to its role in the food chain",
    "matchLeftJson": "[{\"id\":\"1\",\"text\":\"Grass\"},{\"id\":\"2\",\"text\":\"Rabbit\"},{\"id\":\"3\",\"text\":\"Fox\"}]",
    "matchRightJson": "[{\"id\":\"A\",\"text\":\"Producer\"},{\"id\":\"B\",\"text\":\"Primary Consumer\"},{\"id\":\"C\",\"text\":\"Secondary Consumer\"}]",
    "matchPairs": "1A,2B,3C"
  }
]
```

---

## Summary

The enhanced question type system provides:

✅ **5 Question Types**: Short, MCQ, Fill, Match, Label
✅ **Future-Proof**: Add new types without database changes
✅ **Backwards Compatible**: Existing questions continue to work
✅ **Easy Admin UI**: Dynamic forms for each type
✅ **Flexible Import**: CSV and JSON with auto-detection
✅ **Type-Safe**: Full TypeScript support
✅ **Extensible**: Registry pattern for custom types

For questions or issues, refer to the code comments and type definitions.
