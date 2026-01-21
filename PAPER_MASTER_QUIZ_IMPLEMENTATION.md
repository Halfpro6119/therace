# Master Quiz per Paper - Complete Implementation

## Overview
This document describes the implementation of "Master Quiz per Paper" functionality for the Grade9 Sprint GCSE Revision App. Each paper (Paper 1/2/3) within a subject now has its own dedicated master quiz that contains only prompts assigned to that paper.

## Database Schema

### Extended quizzes Table
```sql
ALTER TABLE quizzes ADD COLUMN paper_id uuid REFERENCES papers(id) ON DELETE CASCADE;
ALTER TABLE quizzes ADD COLUMN quiz_type text NOT NULL DEFAULT 'subject_master' 
  CHECK (quiz_type IN ('subject_master', 'paper_master', 'unit', 'topic'));
ALTER TABLE quizzes ADD COLUMN is_active boolean NOT NULL DEFAULT true;
ALTER TABLE quizzes ADD COLUMN settings jsonb DEFAULT '{}';
```

### Quiz Types
- **subject_master**: All prompts for a subject (paper_id = NULL)
- **paper_master**: Only prompts for a specific paper (paper_id = paper.id)
- **unit**: Unit-specific quizzes (existing)
- **topic**: Topic-specific quizzes (existing)

### Indexes
- idx_quizzes_paper_id
- idx_quizzes_quiz_type
- idx_quizzes_subject_paper
- idx_quizzes_active

## Data Model

### Quiz Interface (Updated)
```typescript
export interface Quiz {
  id: string;
  subjectId: string;
  scopeType: QuizScopeType;
  topicId?: string;
  unitId?: string;
  paperId?: string;              // NEW: for paper master quizzes
  quizType?: QuizType;           // NEW: subject_master | paper_master | unit | topic
  title: string;
  description: string;
  timeLimitSec: number;
  grade9TargetSec: number;
  promptIds: string[];
  isActive?: boolean;            // NEW: enable/disable quizzes
  settings?: QuizSettings;       // NEW: configuration
}

export type QuizType = 'subject_master' | 'paper_master' | 'unit' | 'topic';

export interface QuizSettings {
  questionLimit?: number;
  difficultyRamp?: boolean;
  timeTarget?: number;
  [key: string]: any;
}
```

## Database Methods (10 New)

### Query Methods
```typescript
// Get all quizzes for a subject (including paper master quizzes)
getQuizzesForSubject(subjectId: string): Promise<Quiz[]>

// Get paper master quiz for a specific paper
getPaperMasterQuiz(paperId: string): Promise<Quiz | undefined>

// Get all paper master quizzes for a subject
getPaperMasterQuizzesForSubject(subjectId: string): Promise<Quiz[]>

// Get subject master quiz (all prompts for subject)
getSubjectMasterQuiz(subjectId: string): Promise<Quiz | undefined>

// Get prompts for a paper master quiz
getPromptsForPaperMasterQuiz(paperId: string): Promise<Prompt[]>

// Get prompts for subject master quiz (all prompts for subject)
getPromptsForSubjectMasterQuiz(subjectId: string): Promise<Prompt[]>
```

### Management Methods
```typescript
// Create or update a paper master quiz
upsertPaperMasterQuiz(
  subjectId: string,
  paperId: string,
  title: string,
  description: string,
  settings?: any
): Promise<Quiz>

// Sync paper master quizzes for a subject
// Creates/updates master quizzes for all papers in the subject
syncPaperMasterQuizzesForSubject(subjectId: string): Promise<number>

// Toggle paper master quiz active status
togglePaperMasterQuizActive(quizId: string, isActive: boolean): Promise<void>
```

## Admin Interface

### PaperMasterQuizzesPage
**Location**: `src/admin/PaperMasterQuizzesPage.tsx`

**Features**:
- View all paper master quizzes for a subject
- Create/sync paper master quizzes with one click
- Enable/disable individual paper master quizzes
- Edit quiz title and description
- View prompt count for each paper
- Show calculator allowed status

**Key Interactions**:
```
1. Select subject
2. Click "Create/Sync Paper Master Quizzes"
3. System creates/updates master quizzes for all papers
4. View all paper master quizzes in grid
5. Toggle active status
6. Edit quiz details
```

**UI Elements**:
- Subject selector dropdown
- Sync button with loading state
- Quiz cards showing:
  - Paper number and title
  - Prompt count
  - Calculator status badge
  - Active/inactive toggle
  - Edit button

## User Interface

### SubjectDetailPageEnhanced
**Location**: `src/pages/SubjectDetailPageEnhanced.tsx`

**Features**:
- New "Papers" tab alongside existing tabs (Topics, Units, Full GCSE, Heatmap)
- Shows all active paper master quizzes for the subject
- Paper badge on each quiz card
- Uses existing QuizTile component (no design changes)
- Seamless integration with existing UI

**Tab Display**:
```
Topics (N) | Units (N) | Papers (N) | Full GCSE (N) | Heatmap
```

**Paper Master Quiz Cards**:
- Display using existing QuizTile component
- Add "Paper X" badge in top-right corner
- Show prompt count
- Show calculator status
- Clickable to start quiz

## Quiz Filtering Logic

### Paper Master Quiz Prompts
```sql
SELECT prompts 
WHERE prompts.subject_id = quiz.subject_id 
  AND prompts.paper_id = quiz.paper_id
ORDER BY created_at
```

### Subject Master Quiz Prompts
```sql
SELECT prompts 
WHERE prompts.subject_id = quiz.subject_id
ORDER BY created_at
```

## Key Features

### 1. Deterministic Query-Based
- No quiz generation
- Master quizzes are persistent database entities
- Prompts are queried dynamically based on paper_id
- Automatically includes newly imported prompts

### 2. Multi-Subject Support
- Works with any number of subjects
- Each subject can have Paper 1/2/3 master quizzes
- Independent configuration per subject

### 3. Paper-Specific Configuration
- Each paper master quiz can have:
  - Custom title and description
  - Optional question limit
  - Optional difficulty ramp mode
  - Optional time target
  - Active/inactive status

### 4. Calculator Support
- Respects prompt.calculator_allowed override
- Falls back to papers.calculator_allowed_default
- Displayed as badge on quiz cards

### 5. Attempt Tracking
- Separate attempt history for each quiz
- Paper master quiz attempts tracked independently
- Mastery computed per quiz type
- Completion stats available per paper

### 6. No Design Changes
- Uses existing QuizTile component
- Adds new tab to existing subject page
- Maintains existing styling and layout
- Dark mode support maintained
- Responsive design preserved

## Import Integration

### Automatic Inclusion
When prompts are imported with paper_id assigned:
1. Prompt is stored with paper_id
2. Paper master quiz automatically includes it
3. No manual quiz updates needed
4. Query-based inclusion is automatic

### Example Flow
```
1. Import prompts with paper_id = Maths Paper 1
2. Prompts stored in database
3. Paper 1 Master Quiz query returns new prompts
4. User sees updated prompt count
5. Quiz includes new prompts on next play
```

## Usage Examples

### Admin: Create Paper Master Quizzes
```
1. Go to Paper Master Quizzes admin page
2. Select subject "Maths"
3. Click "Create/Sync Paper Master Quizzes"
4. System creates quizzes for Paper 1, 2, 3
5. View all paper master quizzes
6. Toggle active status as needed
```

### Admin: Configure Paper Master Quiz
```
1. View paper master quiz card
2. Click "Edit" button
3. Update title/description
4. Save changes
5. Changes reflected immediately
```

### User: Select Paper Master Quiz
```
1. Go to subject page (e.g., Maths)
2. Click "Papers" tab
3. See Paper 1, 2, 3 master quizzes
4. Click on Paper 1 Master Quiz
5. Start quiz with only Paper 1 prompts
6. Complete quiz
7. Mastery tracked for Paper 1 quiz
```

### User: Compare Papers
```
1. Go to subject page
2. View all paper master quizzes
3. See prompt count for each paper
4. See calculator status for each paper
5. Choose which paper to practice
```

## Testing Checklist

### Admin Features
- [ ] Create/sync paper master quizzes for subject
- [ ] Paper 1/2/3 master quizzes created
- [ ] Prompt count shows correctly
- [ ] Calculator status displays correctly
- [ ] Toggle active/inactive works
- [ ] Edit quiz title/description works
- [ ] Changes persist in database

### User Features
- [ ] Papers tab appears on subject page
- [ ] Paper master quizzes display as cards
- [ ] Paper badge shows on each card
- [ ] Clicking quiz opens quiz player
- [ ] Only paper prompts included in quiz
- [ ] Attempt history tracked separately
- [ ] Mastery computed per paper quiz

### Data Integrity
- [ ] Paper 1 quiz contains only Paper 1 prompts
- [ ] Paper 2 quiz contains only Paper 2 prompts
- [ ] Paper 3 quiz contains only Paper 3 prompts
- [ ] Subject master quiz contains all prompts
- [ ] New imported prompts auto-included
- [ ] Deleted prompts auto-excluded
- [ ] Paper_id changes reflected immediately

### UI/UX
- [ ] No design changes to public site
- [ ] Existing styling maintained
- [ ] Dark mode works correctly
- [ ] Responsive on mobile/tablet/desktop
- [ ] Paper badge clearly visible
- [ ] Quiz cards consistent with existing tiles
- [ ] Tab navigation works smoothly

## Files Created/Modified

### New Files (2 files, ~600 lines)
1. `src/admin/PaperMasterQuizzesPage.tsx` (350 lines)
2. `src/pages/SubjectDetailPageEnhanced.tsx` (250 lines)

### Modified Files (2 files, +150 lines)
1. `src/types/index.ts` - Added QuizType, QuizSettings, updated Quiz interface
2. `src/db/client.ts` - Added 10 new paper master quiz methods

### Database Migrations (1 file)
1. `supabase/migrations/20260121_add_paper_master_quizzes.sql`

## Backwards Compatibility

✅ Existing quizzes continue to work
✅ Existing quiz types (unit, topic) unaffected
✅ Subject master quizzes still available
✅ No breaking changes to API
✅ Optional paper_id field
✅ Default quiz_type = 'subject_master'
✅ Existing attempt history preserved

## Performance Considerations

### Indexes
- paper_id on quizzes for fast lookup
- quiz_type for filtering
- subject_id + paper_id for combined queries
- is_active for filtering active quizzes

### Query Optimization
- Use indexes for paper_id lookups
- Batch load paper master quizzes
- Cache paper list per subject
- Lazy load prompt counts

### Caching Strategy
- Cache papers per subject
- Cache paper master quizzes per subject
- Refresh on explicit user action
- Invalidate on prompt changes

## Future Enhancements

1. **Bulk Operations**
   - Bulk enable/disable paper master quizzes
   - Bulk edit settings
   - Bulk delete

2. **Advanced Settings**
   - Question randomization
   - Difficulty progression
   - Time limits per paper
   - Custom scoring rules

3. **Analytics**
   - Paper-specific performance metrics
   - Comparison across papers
   - Trend analysis per paper
   - Difficulty analysis

4. **Scheduling**
   - Schedule paper master quizzes
   - Timed releases
   - Seasonal variations

5. **Integration**
   - Export paper master quiz results
   - Import external paper data
   - Sync with exam board data

## Deployment Notes

1. Apply database migration
2. Deploy code changes
3. Test paper master quiz creation
4. Verify prompt filtering
5. Monitor attempt tracking
6. Gather user feedback

## Support

For issues or questions:
1. Check browser console for errors
2. Verify database migration applied
3. Check Supabase logs
4. Review this documentation
5. Check GitHub issues

---

**Implementation Date**: January 21, 2026
**Status**: Complete and Ready for Testing
**Branch**: feature/json-import-upgrade
**Commit**: 05ad4a7a

