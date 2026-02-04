# Maths Gold Questions Import Guide

This guide explains how to import the hard-coded GCSE Maths mastery question set (59 questions: F01-F27 Foundation, H01-H32 Higher) into the application.

## Files

- **MATHS_GOLD_QUESTIONS.json** - Contains all 59 questions in JSON format, ready for import
- **MATHS_QUESTIONS_GOLD_LIST.md** - Original specification document with question details

## Import Method

### Option 1: Using the JSON Import Page (Recommended)

1. Navigate to the Admin section → JSON Import page
2. Select "Maths" as the subject
3. Optionally select a default paper (Paper 1, 2, or 3) if you want all questions assigned to a specific paper
4. Open `MATHS_GOLD_QUESTIONS.json` and copy its entire contents
5. Paste the JSON into the import textarea
6. Click "Detect Questions" to preview
7. Review the preview to ensure all questions are detected correctly
8. Click "Import" to import all questions

**Note:** The JSON uses unit/topic **names** (e.g., "Number", "Algebra", "Fractions"), not IDs. The import system will automatically resolve these names to create or find the corresponding units and topics in the database.

### Option 2: Programmatic Import (Advanced)

If you need to import programmatically, you can use the `importPrompt` function from `src/db/client.ts`:

```typescript
import { db } from './src/db/client';
import goldQuestions from './MATHS_GOLD_QUESTIONS.json';

for (const question of goldQuestions) {
  await db.importPrompt({
    subjectName: question.subject,
    examBoard: question.examBoard,
    unitName: question.unit,
    topicName: question.topic,
    type: question.type,
    question: question.question,
    answers: question.answers,
    hint: question.hint,
    explanation: question.explanation,
    tier: question.tier,
    calculatorAllowed: question.calculatorAllowed,
    meta: question.meta,
  });
}
```

## Question Structure

Each question in the JSON includes:

- **id**: Unique identifier (F01-F27 for Foundation, H01-H32 for Higher)
- **subject**: "Maths"
- **examBoard**: "Edexcel"
- **unit**: Unit name (e.g., "Number", "Algebra", "Geometry", "Statistics & Probability")
- **topic**: Topic name within the unit
- **type**: Question type (mostly "short" with appropriate metadata)
- **question**: The question text
- **answers**: Array of accepted answer strings
- **explanation**: Step-by-step solution
- **hint**: Helpful hint for students
- **tier**: "foundation" or "higher"
- **calculatorAllowed**: Boolean indicating if calculator is allowed
- **meta**: Metadata including:
  - `questionData.numericTolerance`: For numeric questions (e.g., 0.01, 0.1)
  - `goldQuestionId`: The original question ID (F01, H01, etc.)
- **diagram**: Optional diagram metadata (for questions requiring diagrams)

## Question Type Handling

The questions use various types that are normalized as follows:

- **numeric** → `type: "short"` with `meta.questionData.numericTolerance`
- **multiNumeric** → `type: "short"` with comma-separated answers (e.g., "45, 27")
- **expression** → `type: "short"` with multiple accepted answer formats
- **tableFill** → `type: "short"` (can be enhanced later with dedicated type)
- **graphPlot** → `type: "short"` (can be enhanced later)
- **graphRead** → `type: "short"` with diagram metadata
- **proofShort** → `type: "short"` with accepted proof text

## Taxonomy Mapping

Questions are mapped to the Maths taxonomy as follows:

### Foundation Questions (F01-F27)
- **Number & Arithmetic** (F01-F08) → Number unit
- **Algebra Basics** (F09-F14) → Algebra unit → Expressions and Equations topic
- **Graphs & Coordinates** (F15-F17) → Algebra unit → Graphs topic
- **Angles** (F18) → Geometry unit → Angles and Lines topic
- **Geometry & Measures** (F19-F23) → Geometry unit → Various topics
- **Probability & Statistics** (F24-F27) → Statistics & Probability unit → Various topics

### Higher Questions (H01-H32)
- **Algebra** (H01-H10) → Algebra unit → Various topics
- **Ratio, Proportion, Standard Form** (H11-H13) → Number unit
- **Graphs, Sequences, Functions** (H14-H18) → Algebra unit
- **Geometry & Trigonometry** (H19-H25) → Geometry unit → Various topics
- **Probability & Statistics** (H26-H29) → Statistics & Probability unit
- **Grade 9 Reasoning** (H30-H32) → Various units

## Calculator Flags

The following questions have `calculatorAllowed: true`:
- F23 (circumference calculation)
- H04 (quadratic formula)
- H23 (trigonometry)
- H24 (sine rule)
- H25 (cosine rule)
- H32 (compound interest)

All other questions default to `calculatorAllowed: false` (Paper 1 style).

## Diagram Requirements

Questions requiring diagrams include diagram metadata:
- **F15**: Coordinate grid with point P
- **F17**: Coordinate grid
- **F26**: Bar chart
- **F27**: Scatter plot
- **H19**: Circle theorem (angle in semicircle)
- **H20**: Circle theorem (tangent-radius)
- **H28**: Histogram
- **H29**: Box plots

## Verification

After import, verify the questions by:

1. Checking the Prompts page in Admin
2. Filtering by tier (foundation/higher)
3. Verifying calculator flags are set correctly
4. Checking that diagrams are associated where expected
5. Testing a few questions in the Quiz Player

## Troubleshooting

### Questions not importing
- Check that the JSON is valid (use a JSON validator)
- Ensure unit/topic names match the taxonomy exactly
- Check browser console for error messages

### Units/Topics not found
- The import system will create missing units/topics automatically
- Verify the names match the taxonomy in `src/config/taxonomy/maths.ts`

### Tier not showing
- Ensure the JSON import page has been updated to handle the `tier` field
- Check that `tier` values are exactly "foundation" or "higher" (lowercase)

### Diagrams not displaying
- Verify diagram template IDs exist in the system
- Check that diagram metadata is properly formatted in the JSON

## Next Steps

After importing:

1. **Create Master Quizzes**: Use the Paper Quiz Builder to create master quizzes for each paper/tier combination
2. **Test Questions**: Play through some quizzes to verify questions work correctly
3. **Review Answers**: Check that answer matching works for all question types
4. **Enhance Types**: Consider implementing dedicated handlers for multiNumeric, expression, tableFill, etc.

## Support

For issues or questions about the gold question set, refer to:
- `MATHS_QUESTIONS_GOLD_LIST.md` - Original specification
- `QUESTION_TYPES_GUIDE.md` - Question type system documentation
- `ADMIN_IMPORT_GUIDE.md` - General import guide
