# Tier Separation System Implementation Guide

## Overview

This document describes the implementation of a **Tier Separation System** (Higher vs Foundation) for the GCSE revision app. The system allows questions/prompts to be segregated by difficulty tier, working exactly like the existing paper-number separation.

## Architecture

### Data Model

#### Database Schema Changes

**New Migration**: `20260121_add_tier_system.sql`

```sql
-- Add tier column to prompts table
ALTER TABLE prompts
ADD COLUMN IF NOT EXISTS tier text NULL
CHECK (tier IS NULL OR tier IN ('higher', 'foundation'));

-- Add tier_filter column to quizzes table
ALTER TABLE quizzes
ADD COLUMN IF NOT EXISTS tier_filter text DEFAULT 'all'
CHECK (tier_filter IN ('all', 'higher', 'foundation'));

-- Performance indexes
CREATE INDEX idx_prompts_subject_tier ON prompts(subject_id, tier);
CREATE INDEX idx_prompts_paper_tier ON prompts(paper_id, tier);
CREATE INDEX idx_prompts_topic_tier ON prompts(topic_id, tier);
CREATE INDEX idx_prompts_unit_tier ON prompts(unit_id, tier);
```

**Key Design Decisions**:
- `tier` is stored on **prompts**, NOT on papers (papers are orthogonal to tier)
- `tier` is **nullable** - NULL means "All tiers" (backwards compatible with existing prompts)
- Allowed values: `'higher'` | `'foundation'` | `NULL`
- Quizzes have optional `tier_filter` for runtime filtering

### Type Definitions

**New Types** in `src/types/index.ts`:

```typescript
export type TierLevel = 'higher' | 'foundation' | null;
export type TierFilter = 'all' | 'higher' | 'foundation';

// Updated Prompt interface
export interface Prompt {
  // ... existing fields ...
  tier?: TierLevel;  // NEW: tier assignment
}

// Updated Quiz interface
export interface Quiz {
  // ... existing fields ...
  tierFilter?: TierFilter;  // NEW: runtime tier filtering
}
```

## Core Services

### 1. Tier Normalization (`src/admin/tierNormalizer.ts`)

Handles parsing tier values from various input formats:

```typescript
// Supported input formats:
- tier: "higher" | "foundation" | "H" | "F" (case-insensitive)
- isHigher: true/false
- isFoundation: true/false
- level: "higher" | "foundation"

// Returns normalized value: "higher" | "foundation" | null
normalizeTier("Higher") → "higher"
normalizeTier("F") → "foundation"
normalizeTier("") → null
```

**Key Functions**:
- `normalizeTier(value)` - Normalize any tier value
- `extractTierFromRow(row)` - Extract tier from row with multiple field names
- `isValidTier(tier)` - Validate tier value
- `getTierLabel(tier)` - Human-readable label
- `getTierColor(tier)` - UI color for tier
- `getTierBadge(tier)` - UI badge text

### 2. Tier Filter Service (`src/admin/tierFilterService.ts`)

Handles filtering prompts by tier level:

```typescript
// Filter prompts by tier
filterPromptsByTier(prompts, 'higher') → only higher tier prompts
filterPromptsByTier(prompts, 'all') → all prompts (null + explicit)

// Get prompts with tier filtering
getTopicPromptsWithTierFilter(topicId, 'foundation')
getUnitPromptsWithTierFilter(unitId, 'higher')
getPaperPromptsWithTierFilter(paperId, 'all')

// Combined paper + tier filtering
getPromptsWithPaperAndTierFilter(subjectId, 1, 'higher')
// → Paper 1 + Higher tier only

// Count prompts by tier
countTopicPromptsByTier(topicId)
// → { all: 50, higher: 30, foundation: 20 }
```

### 3. Bulk Assignment Service (`src/admin/tierBulkAssignmentService.ts`)

Handles bulk tier assignment:

```typescript
// Assign tier to all prompts in a topic
assignTierToTopicPrompts(topicId, 'higher', onlyNullTiers=false)
// → { success: true, updatedCount: 25, errors: [] }

// Assign tier to all prompts in a unit
assignTierToUnitPrompts(unitId, 'foundation')

// Assign tier to multiple prompts by ID
assignTierToPrompts(['id1', 'id2', 'id3'], 'higher')

// Clear tier (set to null)
clearTierForTopicPrompts(topicId)
clearTierForUnitPrompts(unitId)

// Get tier distribution
getTopicTierDistribution(topicId)
// → { total: 50, higher: 30, foundation: 20, unassigned: 0 }
```

### 4. Import Utilities (`src/admin/importUtils_tier.ts`)

Extends import functionality with tier support:

```typescript
// Extract tier from raw row (handles multiple field names)
extractTierFromRawRow(rawRow) → TierLevel

// Apply default tier to row
applyDefaultTier(row, 'higher') → row with tier applied

// Validate tier in row
validateTierInRow(row, rowNum) → error message or null
```

## Admin UI Integration

### Prompts Tab

**Tier Selector** (per prompt):
- Dropdown: "All Tiers" | "Higher" | "Foundation"
- Saves to `prompts.tier`
- Shows current tier with badge (⬆️ H | ⬇️ F | ◆ All)

**Bulk Action**:
- "Set tier..." button
- Select tier: Higher / Foundation / Clear
- Applies to selected prompts

### Topics Tab

**Bulk Tier Assignment**:
- Action: "Assign tier to all prompts in this topic"
- Options: Higher / Foundation / Clear
- Optional toggle: "Only apply to prompts with tier null"
- Shows tier distribution: "30 Higher, 20 Foundation, 5 Unassigned"

### Units Tab

**Bulk Tier Assignment**:
- Same as Topics tab
- Applies to all prompts in the unit

### Filters

**Tier Filter Dropdown** (next to Paper filter):
- Options: "All Tiers" | "Higher" | "Foundation"
- Persists in localStorage per user
- Works alongside Paper filter

**Combined Filtering**:
```
Paper Filter: Paper 1
Tier Filter: Higher
→ Shows only Paper 1 + Higher tier prompts
```

## Import Enhancements

### CSV Import

**Supported Tier Fields**:
```csv
subject,unit,topic,question,answers,tier
Maths,Unit 1,Algebra,What is 2+2?,4,higher
Maths,Unit 1,Algebra,What is 1+1?,2,foundation
Maths,Unit 1,Algebra,What is 3+3?,6,H
Maths,Unit 1,Algebra,What is 4+4?,8,F
```

**Field Aliases**:
- `tier` - Primary field
- `isHigher` - Boolean (true → higher)
- `isFoundation` - Boolean (true → foundation)
- `level` - Alias for tier

### JSON Import

**Per-Item Tier Assignment**:
```json
{
  "prompts": [
    {
      "subject": "Maths",
      "unit": "Unit 1",
      "topic": "Algebra",
      "question": "What is 2+2?",
      "answers": ["4"],
      "tier": "higher"
    },
    {
      "subject": "Maths",
      "unit": "Unit 1",
      "topic": "Algebra",
      "question": "What is 1+1?",
      "answers": ["2"],
      "tier": "foundation"
    }
  ]
}
```

**Import-Level Default Tier**:
```json
{
  "defaultTier": "higher",
  "prompts": [
    {
      "subject": "Maths",
      "question": "What is 2+2?",
      "answers": ["4"]
      // tier not specified → uses defaultTier: "higher"
    }
  ]
}
```

**Normalization Rules**:
- Case-insensitive: "Higher", "HIGHER", "higher" all → "higher"
- Short form: "H" → "higher", "F" → "foundation"
- Invalid values: Warning logged, tier set to null
- Defensive parsing: Never calls toLowerCase() on undefined

## Runtime Filtering

### Subject-Level Tier Filter State

```typescript
// In context or localStorage
tierFilter: 'all' | 'higher' | 'foundation'

// Persisted per user
localStorage.setItem('tierFilter', 'higher')
```

### Query Rules

**Single Tier Filter**:
```sql
-- tierFilter = 'higher'
WHERE prompts.tier = 'higher'

-- tierFilter = 'foundation'
WHERE prompts.tier = 'foundation'

-- tierFilter = 'all'
WHERE (tier IS NULL OR tier IN ('higher', 'foundation'))
```

**Combined Paper + Tier Filter**:
```sql
-- Paper 1 + Higher tier
WHERE subject_id = ?
  AND paper_id = 1
  AND tier = 'higher'

-- Paper 2 + Foundation tier
WHERE subject_id = ?
  AND paper_id = 2
  AND tier = 'foundation'

-- All papers + Higher tier
WHERE subject_id = ?
  AND tier = 'higher'
```

## Quiz Segregation

### Topic Quizzes

```typescript
// Quiz runner accepts both filters
getTopicQuizPrompts(topicId, paperFilter, tierFilter)

// Example: Topic quiz for Paper 1 + Higher tier
const prompts = await getPromptsWithPaperAndTierFilter(
  subjectId,
  1,  // Paper 1
  'higher'  // Higher tier only
)
```

### Unit Quizzes

```typescript
// Same as topic quizzes
getUnitQuizPrompts(unitId, paperFilter, tierFilter)
```

### Paper Master Quizzes

```typescript
// Paper is fixed, tier is variable
// Options:
// - Paper 1 (All tiers)
// - Paper 1 (Higher only)
// - Paper 1 (Foundation only)

// Implementation: Show tier selector before quiz starts
const prompts = await getPaperPromptsWithTierFilter(
  paperId,
  tierFilter  // User selects: 'all' | 'higher' | 'foundation'
)
```

### Full Subject Quiz

```typescript
// Always available as "All tiers"
// Optionally "This tier only" if tierFilter is active

// If tierFilter = 'higher':
// - "All tiers" button → runs with all prompts
// - "Higher only" button → runs with higher tier only

// Implementation:
const prompts = await getSubjectPromptsWithTierFilter(
  subjectId,
  tierFilter
)
```

## Backwards Compatibility

### Existing Prompts

**Prompts without tier assignment** (tier = NULL):
- Appear in "All tiers" view
- Included in all quiz types
- Can be assigned tier later via admin UI or bulk action
- No breaking changes to existing functionality

### Migration Path

1. **Phase 1**: Deploy tier column (nullable, default NULL)
2. **Phase 2**: Add admin UI for tier assignment
3. **Phase 3**: Add import support for tier
4. **Phase 4**: Add user-facing tier filtering
5. **Phase 5**: Optionally migrate existing prompts to explicit tiers

## Acceptance Tests

### Test 1: Import with Mixed Case Tier
```
Input: tier="Higher"
Expected: prompts.tier saved as "higher"
```

### Test 2: CSV Import with Tier Column
```
CSV: subject,unit,topic,question,answers,tier
     Maths,Unit 1,Algebra,2+2?,4,higher
Expected: Prompt created with tier='higher'
```

### Test 3: Single Prompt Tier Update
```
Action: Change prompt tier from null to 'foundation'
Expected: Database updated, UI reflects change
```

### Test 4: Bulk Topic Assignment
```
Action: "Assign Higher to all prompts in Topic X"
Expected: All 25 prompts in topic updated to tier='higher'
```

### Test 5: Tier Filtering
```
Action: Select Tier=Higher in filter
Expected: Only higher tier prompts shown in lists
```

### Test 6: Combined Paper + Tier Filter
```
Action: Paper=1, Tier=Foundation
Expected: Only Paper 1 + Foundation prompts shown
```

### Test 7: Backwards Compatibility
```
Action: Run quiz with mixed tier prompts (some null, some 'higher')
Expected: All prompts included, no errors
```

## File Structure

```
src/admin/
├── tierNormalizer.ts              # Tier parsing & normalization
├── tierFilterService.ts           # Filtering by tier
├── tierBulkAssignmentService.ts   # Bulk tier assignment
├── importUtils_tier.ts            # Import tier support
└── [existing admin files]

src/types/
└── index.ts                       # Updated with TierLevel, TierFilter

supabase/migrations/
└── 20260121_add_tier_system.sql   # Database schema changes
```

## Implementation Checklist

- [x] Database migration (tier column + indexes)
- [x] Type definitions (TierLevel, TierFilter)
- [x] Tier normalization utility
- [x] Tier filter service
- [x] Bulk assignment service
- [x] Import utilities with tier support
- [ ] Admin UI: Prompts tab tier selector
- [ ] Admin UI: Topics tab bulk assignment
- [ ] Admin UI: Units tab bulk assignment
- [ ] Admin UI: Tier filter dropdown
- [ ] Import page: CSV tier support
- [ ] Import page: JSON tier support
- [ ] Import page: Default tier option
- [ ] Quiz runner: Tier filtering integration
- [ ] User-facing: Tier filter in subject sections
- [ ] Testing: All acceptance tests pass
- [ ] Documentation: User guide for tier system

## Next Steps

1. **Deploy migration** to Supabase
2. **Update admin pages** to add tier UI controls
3. **Update import pages** to support tier fields
4. **Update quiz runner** to accept tier filter
5. **Add user-facing tier filter** to subject sections
6. **Test all acceptance criteria**
7. **Deploy to production**

