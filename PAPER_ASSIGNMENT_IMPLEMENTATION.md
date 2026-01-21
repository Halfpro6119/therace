# Paper Assignment System - Complete Implementation

## Overview
This document describes the complete implementation of the Paper Assignment system for the Grade9 Sprint GCSE Revision App. The system allows administrators to assign questions/prompts to specific exam papers (Paper 1, 2, or 3) across multiple admin interfaces with full import support.

## Database Schema

### Existing Tables Enhanced
- **prompts** table: Added `paper_id` (UUID, nullable, FK to papers.id)
- **papers** table: Already exists with (subject_id, paper_number) unique constraint

### New Join Tables
- **unit_papers**: Links units to papers for bulk assignment helpers
  - unit_id (UUID, FK to units.id)
  - paper_id (UUID, FK to papers.id)
  - unique(unit_id, paper_id)

- **topic_papers**: Links topics to papers for bulk assignment helpers
  - topic_id (UUID, FK to topics.id)
  - paper_id (UUID, FK to papers.id)
  - unique(topic_id, paper_id)

### Indexes
- idx_prompts_paper_id
- idx_unit_papers_unit_id, idx_unit_papers_paper_id
- idx_topic_papers_topic_id, idx_topic_papers_paper_id

## Database Client Methods

### Paper Relationship Queries
```typescript
// Get all prompts assigned to a paper
getPromptsByPaper(paperId: string): Promise<Prompt[]>

// Get all units linked to a paper
getUnitsByPaper(paperId: string): Promise<Unit[]>

// Get all topics linked to a paper
getTopicsByPaper(paperId: string): Promise<Topic[]>

// Get papers linked to a unit
getPapersForUnit(unitId: string): Promise<Paper[]>

// Get papers linked to a topic
getPapersForTopic(topicId: string): Promise<Paper[]>
```

### Paper Relationship Management
```typescript
// Link/unlink relationships
linkUnitToPaper(unitId: string, paperId: string): Promise<void>
linkTopicToPaper(topicId: string, paperId: string): Promise<void>
unlinkUnitFromPaper(unitId: string, paperId: string): Promise<void>
unlinkTopicFromPaper(topicId: string, paperId: string): Promise<void>

// Bulk assignment
assignTopicPromptsToPaper(topicId: string, paperId: string, onlyUnassigned?: boolean): Promise<number>
assignUnitPromptsToPaper(unitId: string, paperId: string, onlyUnassigned?: boolean): Promise<number>
assignPromptsToPaper(promptIds: string[], paperId: string): Promise<number>
```

## Admin UI Components

### 1. PromptsPageEnhanced
**Location**: `src/admin/PromptsPageEnhanced.tsx`

**Features**:
- View all prompts with filters (subject, type, paper)
- Per-prompt paper assignment via dropdown
- Bulk select multiple prompts
- Bulk assign selected prompts to a paper
- Paper badge display on each prompt
- Full CRUD operations

**UI Elements**:
- Search bar for prompt text
- Filter dropdowns (Subject, Type, Paper)
- Checkbox selection for bulk operations
- Paper selector dropdown for each prompt
- Bulk action bar (appears when prompts selected)

**Key Interactions**:
```
1. Select prompts via checkboxes
2. Choose paper from dropdown
3. Click "Assign to Paper" button
4. Prompts updated in database
5. UI refreshes to show new assignments
```

### 2. TopicsPageEnhanced
**Location**: `src/admin/TopicsPageEnhanced.tsx`

**Features**:
- View all topics with descriptions
- See linked papers for each topic
- Bulk assign all prompts in a topic to a paper
- Link/unlink papers from topics
- Edit topic details

**UI Elements**:
- Search and filter by subject/unit
- Linked papers display with unlink buttons
- Paper selector + "Assign All" button
- Edit/delete topic buttons

**Key Interactions**:
```
1. Select paper from dropdown
2. Click "Assign All" button
3. All prompts in topic assigned to paper
4. Topic automatically linked to paper
5. Statistics show count of assigned prompts
```

### 3. UnitsPageEnhanced
**Location**: `src/admin/UnitsPageEnhanced.tsx`

**Features**:
- View all units with descriptions
- See linked papers for each unit
- Bulk assign all prompts in a unit to a paper
- Toggle "only unassigned" mode
- Link/unlink papers from units
- Edit unit details

**UI Elements**:
- Search and filter by subject
- Linked papers display with unlink buttons
- Paper selector + "Assign" button
- "Only assign unassigned prompts" checkbox
- Edit/delete unit buttons

**Key Interactions**:
```
1. Select paper from dropdown
2. Optionally check "only unassigned" toggle
3. Click "Assign" button
4. Prompts assigned to paper (filtered if toggle on)
5. Unit automatically linked to paper
```

### 4. PapersPageEnhanced
**Location**: `src/admin/PapersPageEnhanced.tsx`

**Features**:
- View all papers for a subject
- See prompt count for each paper
- Expandable details showing:
  - Linked units
  - Linked topics
  - Sample prompts
- Edit paper details
- Delete papers
- Unlink units/topics

**UI Elements**:
- Subject selector
- Paper cards with gradient headers
- Stats display (prompts, linked items)
- Expandable details section
- Edit/delete buttons

**Key Interactions**:
```
1. Select subject
2. View paper cards
3. Click "Show Details" to expand
4. See linked units/topics
5. Click unlink buttons to remove relationships
6. Edit paper name/calculator settings
```

### 5. JsonImportPageEnhanced
**Location**: `src/admin/JsonImportPageEnhanced.tsx`

**Features**:
- Import questions from JSON
- Select subject and optional default paper
- Preview all questions before import
- Show paper assignment resolution
- Display import statistics
- Support paper_id and paper_number fields
- Crash-proof with detailed error reporting

**Import Flow**:
```
Step 1: Input
  - Select subject
  - Optionally select default paper
  - Paste JSON

Step 2: Preview
  - Show detected questions
  - Display paper assignments
  - Show statistics (assigned/unassigned/warnings)
  - List any warnings

Step 3: Import
  - Confirm import
  - Process all questions
  - Resolve paper assignments
  - Store in database

Step 4: Complete
  - Show results (imported/skipped/errors)
  - Display paper distribution
  - Show any warnings
  - Option to import more
```

**Paper Resolution Logic**:
```typescript
For each imported prompt:
1. If item.paper_id is valid UUID → use it
2. Else if item.paper_number is 1/2/3 → lookup by (subject_id, paper_number)
3. Else if defaultPaperId selected → use it
4. Else → paper_id remains NULL

If paper_id not found:
  - Warning added to report
  - paper_id set to NULL
  - Import continues (no crash)
```

**JSON Format Support**:
```json
{
  "questions": [
    {
      "prompt": "What is...",
      "answers": ["answer1", "answer2"],
      "paper_id": "uuid-here",
      "paper_number": 1,
      "unitId": "uuid",
      "topicId": "uuid",
      "type": "mcq"
    }
  ]
}
```

## Key Features

### 1. Multi-Level Assignment
- **Prompt Level**: Direct paper_id assignment
- **Topic Level**: Bulk assign all prompts in topic
- **Unit Level**: Bulk assign all prompts in unit
- **Import Level**: Assign during import with defaults

### 2. Backwards Compatibility
- Prompts without paper_id still work
- Existing queries unaffected
- Optional paper_id field
- No breaking changes to existing data

### 3. Relationship Management
- Unit/Topic can link to multiple papers
- Each prompt has single paper_id
- Automatic linking when bulk assigning
- Manual link/unlink controls

### 4. Import Safety
- No crashes on invalid data
- Clear warning messages
- Row-by-row error reporting
- Statistics on assignment success
- Detailed import report

### 5. UI Consistency
- Uses existing component patterns
- Maintains design system
- Dark mode support
- Responsive layouts
- Accessible controls

## Usage Examples

### Example 1: Assign Single Prompt to Paper
```
1. Go to Prompts tab
2. Find prompt in list
3. Click dropdown in "Assign to Paper" section
4. Select "Paper 1: Foundation"
5. Paper assignment saved immediately
```

### Example 2: Bulk Assign Topic to Paper
```
1. Go to Topics tab
2. Find topic in list
3. Select paper from dropdown
4. Click "Assign All" button
5. All prompts in topic assigned to paper
6. Topic linked to paper
7. See count of assigned prompts
```

### Example 3: Import with Paper Assignment
```
1. Go to JSON Import tab
2. Select subject "Maths"
3. Select default paper "Paper 1: Foundation"
4. Paste JSON with questions
5. Click "Detect & Preview"
6. Review paper assignments in preview
7. Click "Import All"
8. See results with paper distribution
```

### Example 4: View Paper Details
```
1. Go to Papers tab
2. Select subject
3. View paper cards
4. Click "Show Details" on a paper
5. See linked units and topics
6. See sample prompts assigned
7. Unlink units/topics if needed
```

## Testing Checklist

### Prompts Tab
- [ ] Per-prompt paper selector works
- [ ] Paper assignment saves to database
- [ ] Bulk select multiple prompts
- [ ] Bulk assign to paper works
- [ ] Paper badges display correctly
- [ ] Filter by paper works
- [ ] Unassigned prompts show correctly

### Topics Tab
- [ ] View all topics
- [ ] See linked papers
- [ ] Bulk assign all prompts to paper
- [ ] Topic automatically linked to paper
- [ ] Statistics show correct count
- [ ] Unlink paper from topic works
- [ ] Edit topic details works

### Units Tab
- [ ] View all units
- [ ] See linked papers
- [ ] Bulk assign all prompts to paper
- [ ] "Only unassigned" toggle works
- [ ] Unit automatically linked to paper
- [ ] Statistics show correct count
- [ ] Unlink paper from unit works

### Papers Tab
- [ ] View all papers for subject
- [ ] See prompt count
- [ ] Expand to see details
- [ ] See linked units/topics
- [ ] See sample prompts
- [ ] Unlink units/topics works
- [ ] Edit paper details works

### Import
- [ ] Select subject
- [ ] Select default paper
- [ ] Paste JSON
- [ ] Preview shows correct assignments
- [ ] Statistics accurate
- [ ] Import completes successfully
- [ ] Paper assignments saved
- [ ] Warnings shown for invalid data
- [ ] No crashes on bad data

## Database Queries

### Get all prompts for a paper
```sql
SELECT * FROM prompts WHERE paper_id = $1 ORDER BY created_at;
```

### Get paper distribution
```sql
SELECT paper_id, COUNT(*) as count FROM prompts 
WHERE subject_id = $1 GROUP BY paper_id;
```

### Get units linked to paper
```sql
SELECT u.* FROM units u
JOIN unit_papers up ON u.id = up.unit_id
WHERE up.paper_id = $1;
```

### Get topics linked to paper
```sql
SELECT t.* FROM topics t
JOIN topic_papers tp ON t.id = tp.topic_id
WHERE tp.paper_id = $1;
```

## Performance Considerations

### Indexes
- paper_id on prompts table for fast filtering
- unit_id, paper_id on unit_papers for joins
- topic_id, paper_id on topic_papers for joins

### Query Optimization
- Use IN clauses for bulk operations
- Batch updates where possible
- Avoid N+1 queries in UI

### Caching
- Load papers once per subject selection
- Cache unit/topic relationships
- Refresh on explicit user action

## Error Handling

### Import Errors
- Invalid paper_id: Warning + set to NULL
- Invalid paper_number: Warning + set to NULL
- Missing required fields: Skip row + error
- Database errors: Show error message + continue

### UI Errors
- Network errors: Show toast notification
- Validation errors: Show inline messages
- Database errors: Show error toast

## Future Enhancements

1. **Bulk Paper Creation**: Create papers 1/2/3 for subject
2. **Paper Templates**: Save/load paper configurations
3. **Coverage Reports**: Show coverage by paper
4. **Paper Comparison**: Compare question distribution
5. **Export**: Export questions by paper
6. **Scheduling**: Schedule paper assignments
7. **Versioning**: Track paper assignment history

## Files Modified/Created

### New Files
- `src/admin/PromptsPageEnhanced.tsx` (450 lines)
- `src/admin/TopicsPageEnhanced.tsx` (350 lines)
- `src/admin/UnitsPageEnhanced.tsx` (380 lines)
- `src/admin/PapersPageEnhanced.tsx` (400 lines)
- `src/admin/JsonImportPageEnhanced.tsx` (550 lines)

### Modified Files
- `src/db/client.ts` (+250 lines for paper relationship methods)

### Database Migrations
- `supabase/migrations/20260121_add_paper_relationships.sql` (existing)

## Deployment Notes

1. Ensure database migrations are applied
2. Deploy code changes
3. Test paper assignment in staging
4. Verify import functionality
5. Monitor for errors in production

## Support

For issues or questions:
1. Check error messages in browser console
2. Review import warnings
3. Verify database migrations applied
4. Check Supabase logs
5. Review this documentation

---

**Implementation Date**: January 21, 2026
**Status**: Complete and Ready for Testing
**Branch**: feature/json-import-upgrade
