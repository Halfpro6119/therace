# Paper Assignment Feature - Complete Implementation Guide

## Overview

The Paper Assignment feature enables full control over assigning imported questions to specific GCSE papers (Paper 1, 2, 3) during import and manual creation. This guide covers the complete implementation, usage, and testing.

## Features Implemented

### 1. Paper Resolution Logic
**File**: `src/admin/paperAssignmentUtils.ts`

Implements intelligent paper assignment with the following resolution order:

```
1. If item.paper_id provided → use it directly
2. Else if item.paper_number provided → lookup paper by (subject_id, paper_number)
3. Else if defaultPaperId selected in UI → use it
4. Else → paper_id remains NULL (question unassigned)
```

### 2. Import UI Enhancements
**File**: `src/admin/JsonImportPage.tsx`

#### Default Paper Selection
- Dropdown populated with papers for the chosen subject
- Optional - can leave blank for no default assignment
- Applied to all imported rows unless per-row overrides exist

#### Paper Assignment Preview
- Shows resolved paper for each question in preview table
- Color-coded: Green for assigned, Gray for unassigned
- Displays paper number and name

#### Import Summary Statistics
- Total questions imported
- Count assigned to each paper
- Count unassigned
- Warnings for invalid paper assignments
- Shows up to 5 warnings (with count of additional)

### 3. JSON/CSV Import Support

#### Per-Item Fields (Optional)
Add these fields to your JSON/CSV data:

```json
{
  "prompt": "Question text",
  "answersAccepted": ["answer1", "answer2"],
  "paper_id": "uuid-of-paper",  // Optional: direct paper ID
  "paper_number": 1,             // Optional: paper number (1/2/3)
  "unit": "Unit Name",           // Optional: unit assignment
  "topic": "Topic Name"          // Optional: topic assignment
}
```

#### Resolution Examples

**Example 1: Using paper_number**
```json
{
  "prompt": "What is 2+2?",
  "answersAccepted": ["4"],
  "paper_number": 1
}
```
→ Looks up Paper 1 for the subject and assigns it

**Example 2: Using paper_id**
```json
{
  "prompt": "What is photosynthesis?",
  "answersAccepted": ["Process of converting light to energy"],
  "paper_id": "550e8400-e29b-41d4-a716-446655440000"
}
```
→ Directly assigns the specified paper

**Example 3: Using default paper**
- Select "Paper 2" in import UI
- All questions without paper_id/paper_number get Paper 2

**Example 4: Mixed assignment**
```json
[
  { "prompt": "Q1", "answersAccepted": ["A1"], "paper_number": 1 },
  { "prompt": "Q2", "answersAccepted": ["A2"], "paper_number": 2 },
  { "prompt": "Q3", "answersAccepted": ["A3"] }  // Uses default if set
]
```

### 4. Database Integration

#### Prompts Table
- `paper_id` (uuid, nullable FK to papers.id)
- `calculator_allowed` (boolean, nullable override)

#### Paper Resolution at Runtime
```typescript
const effectiveCalculatorAllowed = 
  question.calculator_allowed ?? 
  paper?.calculator_allowed_default ?? 
  false;
```

### 5. Error Handling

#### Defensive Parsing
- Invalid paper_id → Warning, continues with paper_id = null
- Invalid paper_number → Warning, continues with paper_id = null
- Missing paper for paper_number → Warning, continues with paper_id = null
- **No crashes** - import always succeeds

#### Warning Display
- Shows in import summary
- Includes actionable error messages
- Truncated to 5 warnings with count of additional

## Usage Guide

### Step 1: Create Papers (Admin)
1. Navigate to `/admin/papers`
2. Select subject
3. Click "New Paper"
4. Fill in:
   - Paper Number (1, 2, or 3)
   - Paper Name (e.g., "Written Exam - Foundation Tier")
   - Calculator Allowed toggle
5. Click "Save Paper"

### Step 2: Import Questions with Paper Assignment
1. Navigate to `/admin/json-import`
2. Prepare JSON with `paper_number` or `paper_id` fields
3. Paste JSON data
4. Click "Detect Questions"
5. In preview step:
   - Select subject
   - **Select default paper (optional)**
   - Review paper assignments in table
   - Check import summary for statistics
6. Click "Import Valid" or "Import All"

### Step 3: Verify Paper Assignment
1. Navigate to `/admin/prompts`
2. Filter by subject
3. Filter by paper (optional)
4. Verify questions show correct paper assignment
5. Check calculator indicator (respects paper default)

## API Reference

### paperAssignmentUtils.ts

#### `resolvePaperAssignment(item, papers, subjectId, defaultPaperId)`
Resolves paper assignment for a single question.

**Parameters:**
- `item` (any): Question data with optional paper_id/paper_number
- `papers` (Paper[]): Available papers for the subject
- `subjectId` (string): Subject ID
- `defaultPaperId` (string | null): Default paper from UI

**Returns:**
```typescript
{
  paperId: string | null,
  paperNumber: number | null,
  paperName: string | null,
  warning: string | null
}
```

#### `calculatePaperStats(results, papers)`
Calculates import statistics.

**Returns:**
```typescript
{
  totalImported: number,
  assignedToPaper: number,
  unassigned: number,
  warnings: string[],
  byPaper: Record<number, number>  // paper_number -> count
}
```

#### `formatPaperAssignment(result)`
Formats paper assignment for display.

**Returns:** `"Paper 1: Written Exam"` or `"Unassigned"`

#### `getPaperLabel(paperId, papers)`
Gets paper label for display in lists.

**Returns:** `"Paper 1"` or `"Unassigned"`

## Testing

### Test Case 1: Import with paper_number
**File**: `PAPER_ASSIGNMENT_TEST.json`

```bash
1. Navigate to /admin/json-import
2. Paste test JSON
3. Click "Detect Questions"
4. Verify:
   - 2 questions assigned to Paper 1
   - 2 questions assigned to Paper 2
   - 2 questions assigned to Paper 3
5. Click "Import Valid"
6. Check database: all questions have correct paper_id
```

**Expected Result**: ✅ All questions assigned to correct papers

### Test Case 2: Default Paper Selection
```bash
1. Navigate to /admin/json-import
2. Paste JSON without paper_number fields
3. Select "Paper 2" as default
4. Click "Detect Questions"
5. Verify: All questions show "Paper 2" in preview
6. Import and verify database
```

**Expected Result**: ✅ All questions assigned to Paper 2

### Test Case 3: Invalid Paper Handling
```bash
1. Paste JSON with invalid paper_id
2. Click "Detect Questions"
3. Verify: Warning shown in summary
4. Import and verify: paper_id = null for invalid entries
```

**Expected Result**: ✅ Warning shown, import succeeds, paper_id = null

### Test Case 4: Mixed Assignment
```bash
1. Paste JSON with:
   - Some questions with paper_number
   - Some without
2. Select Paper 3 as default
3. Click "Detect Questions"
4. Verify:
   - Questions with paper_number use their value
   - Questions without use default (Paper 3)
5. Import and verify distribution
```

**Expected Result**: ✅ Correct distribution across papers

## Database Queries

### Get questions by paper
```sql
SELECT * FROM prompts 
WHERE paper_id = 'paper-uuid'
ORDER BY created_at DESC;
```

### Get paper statistics
```sql
SELECT 
  p.paper_number,
  p.name,
  COUNT(pr.id) as question_count
FROM papers p
LEFT JOIN prompts pr ON p.id = pr.paper_id
WHERE p.subject_id = 'subject-uuid'
GROUP BY p.id, p.paper_number, p.name
ORDER BY p.paper_number;
```

### Get unassigned questions
```sql
SELECT * FROM prompts 
WHERE paper_id IS NULL
AND subject_id = 'subject-uuid'
ORDER BY created_at DESC;
```

## Backward Compatibility

✅ **No Breaking Changes**
- Existing imports without paper fields work unchanged
- paper_id is nullable - questions can exist without assignment
- All existing functionality preserved
- Optional feature - can be ignored if not needed

## Files Modified

| File | Changes |
|------|---------|
| `src/admin/paperAssignmentUtils.ts` | New utility module |
| `src/admin/JsonImportPage.tsx` | Enhanced with paper assignment UI |
| `src/db/client.ts` | Already includes paper_id mapping |
| `src/types/index.ts` | Already includes Paper type |

## Performance Considerations

- Paper lookup is O(n) where n = papers per subject (typically 3)
- No additional database queries during import
- Paper stats calculated in-memory
- Minimal performance impact

## Future Enhancements

- [ ] Bulk paper reassignment for existing questions
- [ ] Paper-based quiz generation
- [ ] Paper statistics dashboard
- [ ] Auto-create missing papers (currently manual)
- [ ] Paper-specific time limits
- [ ] Paper-based reporting

## Support

For issues or questions:
1. Check import summary for warnings
2. Verify paper exists in `/admin/papers`
3. Check database for paper_id values
4. Review test cases above

## Changelog

### v1.0 (Current)
- ✅ Paper assignment during import
- ✅ Default paper selection
- ✅ Per-item paper_id/paper_number support
- ✅ Import summary statistics
- ✅ Defensive error handling
- ✅ No breaking changes
