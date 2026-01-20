# Papers Feature Implementation

## Overview

The Papers feature enables full management of GCSE papers (Paper 1, 2, 3) per subject with:
- Admin paper management (create, edit, delete)
- Paper assignment to questions
- Calculator settings per paper
- Paper-based filtering in admin
- Paper-based quiz separation
- Import support with paper assignment

## Database Schema

### Papers Table
```sql
CREATE TABLE papers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  subject_id uuid REFERENCES subjects(id) ON DELETE CASCADE NOT NULL,
  paper_number int NOT NULL CHECK (paper_number IN (1, 2, 3)),
  name text NOT NULL,
  calculator_allowed_default boolean NOT NULL DEFAULT false,
  created_at timestamptz DEFAULT now(),
  UNIQUE(subject_id, paper_number)
);
```

### Prompts Table Extensions
```sql
ALTER TABLE prompts ADD COLUMN IF NOT EXISTS paper_id uuid REFERENCES papers(id) ON DELETE SET NULL;
ALTER TABLE prompts ADD COLUMN IF NOT EXISTS calculator_allowed boolean;
```

## Features Implemented

### 1. Papers Admin Page (`/admin/papers`)
- **Subject Selection**: Choose which subject to manage papers for
- **Paper List**: View all papers for selected subject with:
  - Paper number (1, 2, or 3)
  - Paper name
  - Calculator allowed default setting
  - Question count
  - Creation date
- **Create Paper**: Add new papers with:
  - Paper number (1/2/3, enforced unique per subject)
  - Custom name
  - Calculator allowed default toggle
- **Edit Paper**: Update paper name and calculator settings
- **Delete Paper**: Remove papers (questions remain but lose paper assignment)

### 2. Question/Prompt Management
- **Paper Assignment**: Assign questions to papers via inline selector
- **Calculator Settings**: 
  - Effective calculator = question.calculator_allowed ?? paper.calculator_allowed_default
  - Visual indicator showing effective setting
- **Paper Filtering**: Filter questions by paper in admin list

### 3. Import with Paper Assignment
- **Default Paper Selection**: Choose a paper to assign all imported questions to
- **Per-Item Override**: Support paper_number or paper_id in JSON data
- **Auto-Creation**: If paper_number specified but doesn't exist:
  - Paper 1: calculator_allowed_default = false
  - Paper 2/3: calculator_allowed_default = true
- **Defensive Parsing**: Null-safe handling of paper fields

### 4. Runtime Separation
- **Paper Quizzes**: When building a quiz for a specific paper, only questions with matching paper_id are included
- **Calculator Visibility**: Respects effective calculator setting at runtime
- **Fallback Behavior**: Questions without paper assignment default to calculator_allowed = false

## Database Service API

### Papers Service Methods

```typescript
// List all papers for a subject
db.listPapersBySubject(subjectId: string): Promise<Paper[]>

// Get paper by subject and number
db.getPaperByNumber(subjectId: string, paperNumber: number): Promise<Paper | undefined>

// Get paper by ID
db.getPaperById(paperId: string): Promise<Paper | undefined>

// Create or update paper
db.upsertPaper(
  subjectId: string,
  paperNumber: number,
  name: string,
  calculatorAllowedDefault: boolean
): Promise<Paper>

// Update paper
db.updatePaper(paperId: string, updates: Partial<Paper>): Promise<Paper>

// Delete paper
db.deletePaper(paperId: string): Promise<void>

// Get question count for paper
db.getQuestionCountForPaper(paperId: string): Promise<number>
```

## Type Definitions

### Paper Type
```typescript
export interface Paper {
  id: string;
  subjectId: string;
  paperNumber: 1 | 2 | 3;
  name: string;
  calculatorAllowedDefault: boolean;
  createdAt: string;
}
```

### Prompt Type Extensions
```typescript
export interface Prompt {
  // ... existing fields ...
  paperId?: string;                    // FK to papers table
  calculatorAllowed?: boolean;         // Optional override
  // ... rest of fields ...
}
```

## Admin Pages

### /admin/papers
Main papers management interface with:
- Subject selector
- Paper list with actions
- Create/edit form
- Delete confirmation

### /admin/prompts (Enhanced)
Updated to include:
- Paper filter dropdown
- Paper assignment inline editor
- Effective calculator indicator

### /admin/json-import (Enhanced)
Updated to include:
- Subject selector
- Paper assignment dropdown
- Paper_id added to import data

## Usage Examples

### Creating Papers for a Subject
1. Navigate to `/admin/papers`
2. Select subject from dropdown
3. Click "New Paper"
4. Fill in:
   - Paper Number (1, 2, or 3)
   - Paper Name (e.g., "Written Exam - Foundation Tier")
   - Calculator Allowed toggle
5. Click "Save Paper"

### Assigning Questions to Papers
1. Navigate to `/admin/prompts`
2. Select subject and optionally filter by paper
3. Click on the paper name in the "Paper" column
4. Select paper from dropdown
5. Paper assignment updates immediately

### Importing Questions with Paper Assignment
1. Navigate to `/admin/json-import`
2. Paste JSON data
3. Click "Detect Questions"
4. In preview step:
   - Select subject
   - Select paper to assign all imported questions to (optional)
5. Click "Import Valid" or "Import All"
6. All imported questions will have paper_id set

### Building Paper-Specific Quizzes
1. In quiz builder, select "Paper Quiz" scope
2. Select subject and paper
3. Only questions assigned to that paper will be included
4. Calculator visibility respects paper defaults

## Calculator Behavior

### Effective Calculator Allowed
```typescript
const effectiveCalculatorAllowed = 
  question.calculator_allowed ?? 
  paper?.calculator_allowed_default ?? 
  false;
```

### Visual Indicators
- Green badge: "Allowed" - calculator can be used
- Red badge: "Not Allowed" - calculator hidden

### Paper Defaults
- Paper 1: calculator_allowed_default = false (typical for non-calculator papers)
- Paper 2/3: calculator_allowed_default = true (typical for calculator papers)

## Migration & Backfill

The database schema already includes:
- `papers` table with proper constraints
- `prompts.paper_id` column (nullable, cascades on delete)
- `prompts.calculator_allowed` column (nullable, for overrides)

No migration needed - schema is ready to use.

## Testing Checklist

- [ ] Create subject "Maths"
- [ ] Create papers 1/2/3 with appropriate names
- [ ] Set Paper 1 calculator_allowed_default = false
- [ ] Set Paper 2/3 calculator_allowed_default = true
- [ ] Import JSON with default paper selection
- [ ] Verify all imported questions have paper_id set
- [ ] Filter questions by paper in admin
- [ ] Assign question to different paper
- [ ] Verify effective calculator setting updates
- [ ] Build paper-specific quiz
- [ ] Verify only correct paper's questions included
- [ ] Test calculator visibility in quiz player

## Files Modified

- `src/db/client.ts` - Added papers service methods
- `src/types/index.ts` - Added Paper type
- `src/admin/PapersPage.tsx` - New admin page
- `src/admin/PromptsPageEnhanced.tsx` - Enhanced with paper support
- `src/admin/JsonImportPage.tsx` - Enhanced with paper assignment
- `src/admin/AdminLayout.tsx` - Added papers nav item
- `src/App.tsx` - Added papers route

## Future Enhancements

- [ ] Bulk paper assignment
- [ ] Paper templates (auto-create papers with standard names)
- [ ] Paper statistics (questions per paper, coverage)
- [ ] Paper-based reporting
- [ ] Question distribution across papers
- [ ] Paper-specific time limits in quizzes
