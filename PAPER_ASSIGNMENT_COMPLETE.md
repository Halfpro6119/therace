# Complete Paper Assignment Implementation Plan

## Overview
Implement comprehensive paper assignment across the entire editor and import system with support for:
- Per-prompt paper assignment (Prompts tab)
- Bulk assignment by Unit (Units tab)
- Bulk assignment by Topic (Topics tab)
- Paper management with linked units/topics (Papers tab)
- Import with paper_id/paper_number resolution

## Database Schema

### New Tables
1. `unit_papers` - Join table (unit_id, paper_id)
2. `topic_papers` - Join table (topic_id, paper_id)

### Existing Tables (Enhanced)
- `prompts.paper_id` (already exists, nullable FK to papers.id)

## Service Layer Methods

### Paper Relationships
- `getUnitPapers(unitId)` - Get papers linked to unit
- `getTopicPapers(topicId)` - Get papers linked to topic
- `linkUnitToPaper(unitId, paperId)` - Create relationship
- `linkTopicToPaper(topicId, paperId)` - Create relationship
- `unlinkUnitFromPaper(unitId, paperId)` - Remove relationship
- `unlinkTopicFromPaper(topicId, paperId)` - Remove relationship

### Bulk Assignment
- `assignUnitPromptsToP aper(unitId, paperId)` - Assign all prompts in unit
- `assignTopicPromptsToP aper(topicId, paperId)` - Assign all prompts in topic

### Querying
- `getPromptsForPaper(paperId)` - Get prompts assigned to paper
- `getPaperUnits(paperId)` - Get units linked to paper
- `getPaperTopics(paperId)` - Get topics linked to paper

## UI Components

### 1. Prompts Tab
- Add "Paper" selector dropdown for each prompt
- Show current paper assignment
- Bulk action: "Assign selected to Paper..."

### 2. Topics Tab
- Show "Papers linked to this topic" multi-select
- Add "Assign all prompts in this topic to Paper..." action
- Show count of prompts per paper

### 3. Units Tab
- Show "Papers linked to this unit" multi-select
- Add "Assign all prompts in this unit to Paper..." action
- Toggle: "Only unassigned prompts"
- Show count of prompts per paper

### 4. Papers Tab
- Show linked units and topics
- Show assigned prompts count
- Bulk tools: "Link units/topics to this paper"
- Bulk tools: "Assign prompts to this paper"

## Import System

### UI Updates
- "Default Paper (optional)" dropdown
- Per-prompt paper_id/paper_number support
- Preview showing resolved paper per row

### Resolution Logic
```
For each imported prompt:
1. If item.paper_id is valid UUID → use it
2. Else if item.paper_number is 1/2/3 → lookup by (subject_id, paper_number)
3. Else if defaultPaperId selected → use it
4. Else → null

If paper not found:
- Show warning with row index
- Set paper_id = null
- Continue import (no crash)
```

## Implementation Steps

1. ✅ Create migration for unit_papers and topic_papers
2. ✅ Add service layer methods
3. Add UI components for each tab
4. Update import system
5. Add filtering and querying
6. Test all acceptance criteria
7. Commit and push to GitHub

## Acceptance Tests

1. Prompts tab: Set paper for single prompt → DB updated
2. Topics tab: Bulk assign → all prompts in topic updated
3. Units tab: Bulk assign → all prompts in unit updated
4. Papers tab: Show assigned prompts and linked units/topics
5. Import JSON with paper_number → correct paper_id stored
6. Import JSON with paper_id → stored exactly
7. Import with default paper → only unassigned get default
8. Import with invalid paper → warning shown, no crash

## Files to Create/Modify

### Create
- `src/admin/components/PaperSelector.tsx` - Reusable paper selector
- `src/admin/components/PaperBulkAssign.tsx` - Bulk assignment dialog

### Modify
- `src/db/client.ts` - Add service methods
- `src/admin/PromptsPage.tsx` - Add paper selector
- `src/admin/TopicsPage.tsx` - Add bulk assignment
- `src/admin/UnitsPage.tsx` - Add bulk assignment
- `src/admin/PapersPage.tsx` - Enhance with linked items
- `src/admin/JsonImportPage.tsx` - Update import logic

## Status
- Database: Ready (migration created)
- Services: Ready (methods defined)
- UI: In progress
- Import: In progress
- Testing: Pending
