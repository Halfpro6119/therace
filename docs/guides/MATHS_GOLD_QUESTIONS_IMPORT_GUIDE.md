# Maths Gold Questions Import Guide

This guide explains how to import the complete GCSE Maths mastery question set (59 questions: F01-F27 Foundation, H01-H32 Higher) with full marks, time estimates, and diagram metadata.

## Files

- **MATHS_GOLD_QUESTIONS_COMPLETE.json** - Complete JSON file with all 59 questions, marks, time estimates, and diagram metadata
- **MATHS_QUESTIONS_GOLD_LIST.md** - Original specification document with question details

## Import Method

### Option 1: Using the JSON Import Page (Recommended)

1. Navigate to the Admin section → JSON Import page (`/admin/json-import`)
2. Select "Maths" as the subject
3. Optionally select a default paper (Paper 1, 2, or 3) if you want all questions assigned to a specific paper
4. Open `MATHS_GOLD_QUESTIONS_COMPLETE.json` and copy its entire contents
5. Paste the JSON into the import textarea
6. Click "Detect Questions" to preview
7. Review the preview to ensure all questions are detected correctly:
   - Check that all 59 questions are detected
   - Verify marks and time estimates are shown
   - Check diagram metadata is present for questions that need diagrams
8. Click "Import" to import all questions

**Note:** The JSON uses unit/topic **names** (e.g., "Number", "Algebra", "Fractions"), not IDs. The import system will automatically resolve these names to create or find the corresponding units and topics in the database.

### Option 2: Programmatic Import (Advanced)

If you need to import programmatically, you can use the `importPrompt` function from `src/db/client.ts`:

```typescript
import { db } from './src/db/client';
import goldQuestions from './MATHS_GOLD_QUESTIONS_COMPLETE.json';

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
    marks: question.marks,
    timeAllowanceSec: question.timeAllowanceSec,
    meta: question.meta,
    diagram_metadata: question.diagram_metadata,
  });
}
```

## Question Structure

Each question in the JSON includes:

- **id**: Unique identifier (F01-F27 for Foundation, H01-H32 for Higher)
- **subject**: "Maths"
- **examBoard**: "Edexcel"
- **unit**: Unit name from taxonomy (Number, Algebra, Geometry, Statistics & Probability)
- **topic**: Topic name from taxonomy
- **type**: Question type (mostly "short" - numeric/expression types normalize to short)
- **question**: The question prompt text
- **answers**: Array of accepted answer strings
- **marks**: Number of marks (1-5)
- **timeAllowanceSec**: Recommended time in seconds (30-180)
- **hint**: Helpful hint for students
- **explanation**: Full solution/explanation
- **tier**: "foundation" or "higher"
- **calculatorAllowed**: Boolean (true for F23, H04, H23, H24, H25, H32)
- **meta.questionData**: Type-specific data (e.g., numericTolerance for numeric questions)
- **meta.goldQuestionId**: Reference to the original ID (F01-H32)
- **diagram_metadata**: Complete diagram specification (for questions with diagrams)

## Diagram Metadata

Questions with diagrams include a `diagram_metadata` field with:

- **mode**: "auto" (generated from template)
- **templateId**: Template ID (e.g., "math.graphs.coordinate_point.v1")
- **params**: Template parameters (labels, values, visibility settings)
- **placement**: "inline" (diagram appears inline with question)

**Note:** Some diagram templates may not exist yet (see MATHS_DIAGRAM_SPECIFICATIONS.md). Questions will import successfully, but diagrams won't render until templates are created.

## Question Type Mapping

The gold list uses maths-specific types that normalize to standard types:

- **numeric** → `type: "short"` with `meta.questionData.numericTolerance`
- **multiNumeric** → `type: "short"` (for now, until multiNumeric UI exists)
- **expression** → `type: "short"` with multiple accepted answers
- **tableFill** → `type: "short"` (for now)
- **graphPlot** → `type: "short"` (asks for equation instead of plotting)
- **graphRead** → `type: "short"` with diagram
- **proofShort** → `type: "short"` with long accepted answer

## Marks and Time Summary

### Foundation (27 questions)
- **Total marks**: 60 marks
- **Total time**: ~1,800 seconds (30 minutes)
- **Average**: ~2.2 marks per question, ~67 seconds per question

### Higher (32 questions)
- **Total marks**: 110 marks
- **Total time**: ~2,400 seconds (40 minutes)
- **Average**: ~3.4 marks per question, ~75 seconds per question

### Combined
- **Total questions**: 59
- **Total marks**: 170 marks
- **Total time**: ~4,200 seconds (70 minutes)

## Verification After Import

After importing, verify:

1. **Count**: Check that all 59 questions were imported
2. **Marks**: Verify marks are set correctly (1-5)
3. **Time**: Check timeAllowanceSec values
4. **Diagrams**: Verify diagram_metadata is stored for questions that need diagrams
5. **Tier**: Confirm foundation/higher tier assignment
6. **Calculator**: Verify calculatorAllowed flag for F23, H04, H23, H24, H25, H32
7. **Answers**: Test a few questions to ensure answers are accepted correctly

## Troubleshooting

### Questions not importing
- Check JSON syntax is valid (use a JSON validator)
- Ensure all required fields are present (subject, unit, topic, question, answers)
- Check unit/topic names match the taxonomy exactly

### Diagrams not rendering
- Verify diagram templates exist in the registry
- Check template IDs match exactly (case-sensitive)
- See MATHS_DIAGRAM_SPECIFICATIONS.md for template requirements

### Answers not matching
- Check numeric tolerance settings for numeric questions
- Verify multiple accepted answers are included for expression questions
- Test with various formats (spaces, commas, etc.)

## Next Steps

1. **Create missing diagram templates** (see MATHS_DIAGRAM_SPECIFICATIONS.md)
2. **Test questions** in quiz player to ensure rendering and grading work correctly
3. **Add to quizzes** - Create quizzes using these gold questions
4. **Monitor usage** - Track which questions students struggle with

## Updating Questions

To update questions:

1. Edit `MATHS_GOLD_QUESTIONS_COMPLETE.json`
2. Re-import (existing questions with same `id` will be updated, or delete and re-import)
3. Or use the admin interface to edit individual questions

**Note:** The `id` field (F01-H32) is used as a stable reference. If you change it, the system will treat it as a new question.
