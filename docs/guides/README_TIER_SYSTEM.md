# Tier System Implementation - Complete Guide

## Quick Start

The Tier Separation System has been implemented with the following components:

### 1. Database Schema
- **Migration**: `supabase/migrations/20260121_add_tier_system.sql`
- **New columns**: 
  - `prompts.tier` (text, nullable) - stores 'higher', 'foundation', or NULL
  - `quizzes.tier_filter` (text) - stores 'all', 'higher', or 'foundation'
- **Indexes**: 4 performance indexes on tier columns

### 2. Core Services
All services are in `src/admin/`:

#### `tierNormalizer.ts`
Handles parsing tier values from various formats:
```typescript
normalizeTier("Higher") → "higher"
normalizeTier("F") → "foundation"
extractTierFromRow(row) → handles tier, isHigher, isFoundation, level fields
getTierLabel(tier) → "Higher Tier" | "Foundation Tier" | "All Tiers"
getTierColor(tier) → color hex for UI
getTierBadge(tier) → "⬆️ H" | "⬇️ F" | "◆ All"
```

#### `tierFilterService.ts`
Handles filtering prompts by tier:
```typescript
filterPromptsByTier(prompts, 'higher') → filtered array
getTopicPromptsWithTierFilter(topicId, 'foundation') → Promise<Prompt[]>
getUnitPromptsWithTierFilter(unitId, 'higher') → Promise<Prompt[]>
getPaperPromptsWithTierFilter(paperId, 'all') → Promise<Prompt[]>
getPromptsWithPaperAndTierFilter(subjectId, 1, 'higher') → Promise<Prompt[]>
countTopicPromptsByTier(topicId) → { all, higher, foundation }
countUnitPromptsByTier(unitId) → { all, higher, foundation }
```

#### `tierBulkAssignmentService.ts`
Handles bulk tier assignment:
```typescript
assignTierToTopicPrompts(topicId, 'higher', onlyNullTiers=false) → BulkAssignmentResult
assignTierToUnitPrompts(unitId, 'foundation') → BulkAssignmentResult
assignTierToPrompts(['id1', 'id2'], 'higher') → BulkAssignmentResult
clearTierForTopicPrompts(topicId) → BulkAssignmentResult
clearTierForUnitPrompts(unitId) → BulkAssignmentResult
getTopicTierDistribution(topicId) → { total, higher, foundation, unassigned }
getUnitTierDistribution(unitId) → { total, higher, foundation, unassigned }
```

#### `importUtils_tier.ts`
Extends import with tier support:
```typescript
extractTierFromRawRow(rawRow) → TierLevel
applyDefaultTier(row, 'higher') → row with tier applied
validateTierInRow(row, rowNum) → error message or null
```

### 3. Type Definitions
Updated in `src/types/index.ts`:
```typescript
export type TierLevel = 'higher' | 'foundation' | null;
export type TierFilter = 'all' | 'higher' | 'foundation';

// Prompt interface now includes:
tier?: TierLevel;

// Quiz interface now includes:
tierFilter?: TierFilter;
```

## Implementation Status

### ✅ Completed
- [x] Database migration with tier column and indexes
- [x] Type definitions (TierLevel, TierFilter)
- [x] Tier normalization utility (handles 5+ input formats)
- [x] Tier filter service (7 query functions)
- [x] Bulk assignment service (7 functions)
- [x] Import utilities with tier support
- [x] Test data and examples
- [x] Comprehensive documentation

### 🔄 Next Steps (Admin UI Integration)
- [ ] Update PromptsPage.tsx to add tier selector per prompt
- [ ] Add bulk tier action to PromptsPage
- [ ] Update TopicsPage.tsx to add bulk tier assignment
- [ ] Update UnitsPage.tsx to add bulk tier assignment
- [ ] Add tier filter dropdown to admin pages
- [ ] Update ImportPage.tsx to support tier fields
- [ ] Update JsonImportPage.tsx to support tier fields
- [ ] Update QuizPlayerPage.tsx to accept tier filter
- [ ] Add tier filter to user-facing subject sections

## Usage Examples

### Example 1: Filter prompts by tier
```typescript
import { filterPromptsByTier } from '@/admin/tierFilterService';

const allPrompts = [...]; // from database
const higherTierOnly = filterPromptsByTier(allPrompts, 'higher');
const foundationTierOnly = filterPromptsByTier(allPrompts, 'foundation');
const allTiers = filterPromptsByTier(allPrompts, 'all');
```

### Example 2: Get topic prompts with tier filter
```typescript
import { getTopicPromptsWithTierFilter } from '@/admin/tierFilterService';

const topicId = 'uuid-123';
const tierFilter = 'higher'; // or 'foundation' or 'all'

const prompts = await getTopicPromptsWithTierFilter(topicId, tierFilter);
// Returns only higher tier prompts from this topic
```

### Example 3: Bulk assign tier to topic
```typescript
import { assignTierToTopicPrompts } from '@/admin/tierBulkAssignmentService';

const topicId = 'uuid-123';
const result = await assignTierToTopicPrompts(topicId, 'higher');

if (result.success) {
  console.log(`Updated ${result.updatedCount} prompts`);
} else {
  console.error('Error:', result.errors);
}
```

### Example 4: Normalize tier from import
```typescript
import { normalizeTier, extractTierFromRow } from '@/admin/tierNormalizer';

// Direct normalization
const tier1 = normalizeTier("Higher"); // → "higher"
const tier2 = normalizeTier("F"); // → "foundation"
const tier3 = normalizeTier(""); // → null

// Extract from row with multiple field names
const row = { tier: "higher", isHigher: true, level: "foundation" };
const tier = extractTierFromRow(row); // → "higher" (checks in order)
```

### Example 5: Combined paper + tier filtering
```typescript
import { getPromptsWithPaperAndTierFilter } from '@/admin/tierFilterService';

const subjectId = 'uuid-123';
const paperFilter = 1; // Paper 1
const tierFilter = 'higher'; // Higher tier only

const prompts = await getPromptsWithPaperAndTierFilter(
  subjectId,
  paperFilter,
  tierFilter
);
// Returns only Paper 1 + Higher tier prompts
```

## Import Examples

### CSV Import with Tier
```csv
subject,examBoard,unit,topic,type,question,answers,tier
Maths,GCSE,Unit 1,Algebra,short,What is 2+2?,4,higher
Maths,GCSE,Unit 1,Algebra,short,What is 1+1?,2,foundation
Maths,GCSE,Unit 1,Algebra,short,What is 3+3?,6,H
Maths,GCSE,Unit 1,Algebra,short,What is 4+4?,8,F
```

### JSON Import with Per-Item Tier
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

### JSON Import with Default Tier
```json
{
  "defaultTier": "higher",
  "prompts": [
    {
      "subject": "Maths",
      "unit": "Unit 1",
      "topic": "Algebra",
      "question": "What is 2+2?",
      "answers": ["4"]
      // tier not specified → uses defaultTier: "higher"
    },
    {
      "subject": "Maths",
      "unit": "Unit 1",
      "topic": "Algebra",
      "question": "What is 1+1?",
      "answers": ["2"],
      "tier": "foundation"
      // tier specified → overrides defaultTier
    }
  ]
}
```

### JSON Import with Alternative Field Names
```json
{
  "prompts": [
    {
      "subject": "Maths",
      "unit": "Unit 1",
      "topic": "Algebra",
      "question": "Q1",
      "answers": ["A"],
      "isHigher": true
    },
    {
      "subject": "Maths",
      "unit": "Unit 1",
      "topic": "Algebra",
      "question": "Q2",
      "answers": ["B"],
      "isFoundation": true
    },
    {
      "subject": "Maths",
      "unit": "Unit 1",
      "topic": "Algebra",
      "question": "Q3",
      "answers": ["C"],
      "level": "higher"
    }
  ]
}
```

## Backwards Compatibility

### Existing Prompts
- Prompts without tier assignment (tier = NULL) are fully supported
- They appear in "All tiers" view
- They are included in all quiz types
- No breaking changes to existing functionality

### Migration Path
1. Deploy tier column (nullable, default NULL)
2. Add admin UI for tier assignment
3. Add import support for tier
4. Add user-facing tier filtering
5. Optionally migrate existing prompts to explicit tiers

## Testing

### Test Data
See `TIER_SYSTEM_TEST_DATA.json` for:
- 7 acceptance test cases
- 3 JSON import examples
- 3 CSV import examples
- 4 quiz segregation examples

### Running Tests
```bash
# Test tier normalization
import { normalizeTier } from '@/admin/tierNormalizer';
console.assert(normalizeTier("Higher") === "higher");
console.assert(normalizeTier("F") === "foundation");
console.assert(normalizeTier("") === null);

# Test tier filtering
import { filterPromptsByTier } from '@/admin/tierFilterService';
const filtered = filterPromptsByTier(prompts, 'higher');
console.assert(filtered.every(p => p.tier === 'higher'));
```

## File Structure

```
src/
├── admin/
│   ├── tierNormalizer.ts              # Tier parsing & normalization
│   ├── tierFilterService.ts           # Filtering by tier
│   ├── tierBulkAssignmentService.ts   # Bulk tier assignment
│   ├── importUtils_tier.ts            # Import tier support
│   └── [existing admin files]
├── types/
│   └── index.ts                       # Updated with TierLevel, TierFilter
└── [existing files]

supabase/
└── migrations/
    └── 20260121_add_tier_system.sql   # Database schema changes

docs/
├── TIER_SYSTEM_IMPLEMENTATION.md      # Detailed implementation guide
├── README_TIER_SYSTEM.md              # This file
└── TIER_SYSTEM_TEST_DATA.json         # Test data and examples
```

## Key Design Decisions

1. **Tier on Prompts, Not Papers**: Tier is stored on prompts because it's orthogonal to paper number. A single paper can have both higher and foundation tier questions.

2. **Nullable Tier**: tier = NULL means "All tiers" (backwards compatible). Existing prompts without tier assignment continue to work.

3. **Multiple Input Formats**: Import supports tier, isHigher, isFoundation, level fields to accommodate different data sources.

4. **Case-Insensitive Normalization**: "Higher", "HIGHER", "higher" all normalize to "higher".

5. **Short Form Support**: "H" → "higher", "F" → "foundation" for compact CSV/JSON.

6. **Defensive Parsing**: Never calls toLowerCase() on undefined. Invalid values log warning and default to null.

7. **Combined Filtering**: Paper + Tier filters work together. Can query "Paper 1 + Higher tier" in a single operation.

8. **Performance Indexes**: 4 composite indexes on (subject_id, tier), (paper_id, tier), (topic_id, tier), (unit_id, tier) for fast queries.

## Next Steps for Integration

### 1. Admin UI - Prompts Tab
- Add tier selector dropdown per prompt
- Show tier badge (⬆️ H | ⬇️ F | ◆ All)
- Add bulk action "Set tier..."

### 2. Admin UI - Topics Tab
- Add action "Assign tier to all prompts in this topic"
- Show tier distribution: "30 Higher, 20 Foundation, 5 Unassigned"
- Optional toggle: "Only apply to prompts with tier null"

### 3. Admin UI - Units Tab
- Same as Topics tab

### 4. Admin UI - Filters
- Add tier filter dropdown next to paper filter
- Options: "All Tiers" | "Higher" | "Foundation"
- Persist in localStorage

### 5. Import Pages
- CSV: Add tier column support
- JSON: Add tier field support
- Add "Default tier" dropdown option

### 6. Quiz Runner
- Accept tierFilter parameter
- Filter prompts by tier before quiz starts
- Show tier selection for paper master quizzes

### 7. User-Facing Sections
- Add tier filter to Topic/Unit/GCSE/Paper sections
- Show tier distribution in section headers
- Filter quiz options by tier

## Support & Documentation

- **Implementation Guide**: See `TIER_SYSTEM_IMPLEMENTATION.md`
- **Test Data**: See `TIER_SYSTEM_TEST_DATA.json`
- **API Reference**: See docstrings in service files
- **Type Definitions**: See `src/types/index.ts`

## Questions?

Refer to the implementation guide or test data for specific examples and use cases.

