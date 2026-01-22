# Tier System - Complete Implementation Guide

## Overview

The Tier System allows students to filter GCSE revision content by difficulty level:
- **Higher Tier**: Advanced questions for students aiming for grades 7-9
- **Foundation Tier**: Core questions for students aiming for grades 1-5
- **All Tiers**: All questions (default, backwards compatible)

## Architecture

### Database Layer
- **Table**: `prompts`
- **Column**: `tier` (text NULL, values: 'higher' | 'foundation' | NULL)
- **Indexes**: 4 performance indexes on (subject_id, tier), (paper_id, tier), (topic_id, tier), (unit_id, tier)

### Type System
```typescript
type TierLevel = 'higher' | 'foundation' | null;
type TierFilter = 'all' | 'higher' | 'foundation';

interface Prompt {
  // ... existing fields
  tier?: TierLevel;  // NEW
}

interface Quiz {
  // ... existing fields
  tierFilter?: TierFilter;  // NEW
}
```

### Core Services

#### 1. tierNormalizer.ts
Handles parsing tier values from various formats:
```typescript
normalizeTier("Higher") → "higher"
normalizeTier("F") → "foundation"
normalizeTier(null) → null
getTierLabel("higher") → "Higher Tier"
getTierBadge("foundation") → "⬇️ F"
getTierColor("higher") → "#8b5cf6"
```

#### 2. tierFilterService.ts
Filters prompts by tier:
```typescript
filterPromptsByTier(prompts, 'higher') → filtered array
getTopicPromptsWithTierFilter(topicId, 'foundation') → Promise<Prompt[]>
getUnitPromptsWithTierFilter(unitId, 'higher') → Promise<Prompt[]>
getPromptsWithPaperAndTierFilter(subjectId, 1, 'higher') → Promise<Prompt[]>
countTopicPromptsByTier(topicId) → { all, higher, foundation }
```

#### 3. tierBulkAssignmentService.ts
Bulk tier assignment:
```typescript
assignTierToTopicPrompts(topicId, 'higher') → BulkAssignmentResult
assignTierToUnitPrompts(unitId, 'foundation') → BulkAssignmentResult
assignTierToPrompts(['id1', 'id2'], 'higher') → BulkAssignmentResult
getTopicTierDistribution(topicId) → { total, higher, foundation, unassigned }
```

#### 4. importUtils_tier.ts
Import support:
```typescript
extractTierFromRawRow(row) → TierLevel
applyDefaultTier(row, 'higher') → row with tier applied
validateTierInRow(row, rowNum) → error message or null
```

## Admin UI Integration

### PromptsPageWithTier
- **Tier Filter**: Dropdown to filter by All/Higher/Foundation
- **Per-Prompt Tier**: Selector in edit modal
- **Bulk Assignment**: Select prompts → Set Tier → Higher/Foundation/Clear
- **Tier Badge**: Visual indicator (⬆️ H, ⬇️ F, ◆ All)

### TopicsPageWithTier
- **Tier Distribution**: Shows counts (higher: 5, foundation: 3, unassigned: 2)
- **Bulk Actions**: "Set tier for all prompts in this topic"
- **Optional Toggle**: "Only apply to unassigned prompts"

### UnitsPageWithTier
- **Tier Distribution**: Same as topics
- **Bulk Actions**: Same as topics

### JsonImportPageWithTier
- **Default Tier Selector**: Optional dropdown (All/Unassigned/Higher/Foundation)
- **Tier Mapping**: Supports tier, level, isHigher, isFoundation fields
- **Validation Report**: Shows resolved tier for each row

### CsvImportPageWithTier
- **Default Tier Selector**: Optional dropdown
- **CSV Mapping**: Supports tier, level, isHigher, isFoundation columns
- **Validation Report**: Warnings for invalid tier values

## Main UI Integration

### SubjectDetailPageWithTier
- **Tier Filter**: Segmented control (All / Higher / Foundation)
- **Persistent**: Stored in localStorage per subject
- **Filtering**: Topics/units show only those with matching tier prompts
- **Quiz Runner**: Passes tier filter to quiz

### QuizPlayerPage
- **Tier-Aware**: Accepts tierFilter from URL params
- **Filtering**: Only includes prompts matching tier filter
- **Progress**: Tracks attempts with tier context

### ResultsPage
- **Tier-Aware Mastery**: Shows separate stats for higher/foundation
- **Heatmaps**: Tier-scoped by default
- **Fix-It Mode**: Only pulls incorrect prompts within selected tier

## Usage Examples

### Example 1: Import with Tier
```json
{
  "subject": "Mathematics",
  "unit": "Algebra",
  "topic": "Linear Equations",
  "question": "Solve: 2x + 5 = 13",
  "answers": ["4"],
  "tier": "foundation"
}
```

### Example 2: Filter by Tier
```typescript
// Get all foundation tier prompts for a topic
const prompts = await getTopicPromptsWithTierFilter(topicId, 'foundation');
```

### Example 3: Bulk Assign Tier
```typescript
// Set all prompts in a unit to higher tier
const result = await assignTierToUnitPrompts(unitId, 'higher');
console.log(`Updated ${result.updatedCount} prompts`);
```

### Example 4: Combined Filtering
```typescript
// Get Paper 1 Higher Tier prompts
const prompts = await getPromptsWithPaperAndTierFilter(
  subjectId,
  1,  // Paper 1
  'higher'
);
```

## Backwards Compatibility

- **Existing Prompts**: Prompts without tier (NULL) are treated as "All Tiers"
- **Default Behavior**: When no tier filter is applied, all prompts are shown
- **No Breaking Changes**: Existing quizzes and imports continue to work

## Testing Checklist

- [ ] Import JSON with tier values (Higher/Foundation/H/F)
- [ ] Import with invalid tier → warning, tier null, import succeeds
- [ ] Admin can set tier per prompt
- [ ] Admin can bulk set tier in topic/unit
- [ ] Main UI tier filter changes topic/unit lists
- [ ] Quiz runs with tier filter applied
- [ ] Combined Paper=1 + Tier=Higher returns correct prompts
- [ ] Unassigned prompts appear under All tiers only
- [ ] Progress/mastery reflects tier filter
- [ ] Fix-it mode respects tier filter

## File Structure

```
src/
  admin/
    tierNormalizer.ts              # Tier parsing and normalization
    tierFilterService.ts           # Tier filtering queries
    tierBulkAssignmentService.ts   # Bulk tier operations
    importUtils_tier.ts            # Import tier support
    PromptsPageWithTier.tsx        # Admin prompts with tier
    TopicsPageWithTier.tsx         # Admin topics with tier
    UnitsPageWithTier.tsx          # Admin units with tier
    JsonImportPageWithTier.tsx     # JSON import with tier
    CsvImportPageWithTier.tsx      # CSV import with tier
    QuizPlayerPageWithTier.tsx     # Quiz runner with tier
  pages/
    SubjectDetailPageWithTier.tsx  # Main UI with tier filter
  types/
    index.ts                       # TierLevel, TierFilter types
supabase/
  migrations/
    20260121_add_tier_system.sql   # Database migration
```

## API Reference

### tierNormalizer.ts
- `normalizeTier(value: any): TierLevel`
- `extractTierFromRow(row: any): TierLevel`
- `isValidTier(tier: any): boolean`
- `getTierLabel(tier: TierLevel): string`
- `getTierColor(tier: TierLevel): string`
- `getTierBadge(tier: TierLevel): string`

### tierFilterService.ts
- `filterPromptsByTier(prompts: any[], tierFilter: TierFilter): any[]`
- `getTopicPromptsWithTierFilter(topicId: string, tierFilter: TierFilter): Promise<any[]>`
- `getUnitPromptsWithTierFilter(unitId: string, tierFilter: TierFilter): Promise<any[]>`
- `getPaperPromptsWithTierFilter(paperId: string, tierFilter: TierFilter): Promise<any[]>`
- `getSubjectPromptsWithTierFilter(subjectId: string, tierFilter: TierFilter): Promise<any[]>`
- `getPromptsWithPaperAndTierFilter(subjectId: string, paperFilter: 'all'|1|2|3, tierFilter: TierFilter): Promise<any[]>`
- `countTopicPromptsByTier(topicId: string): Promise<{all, higher, foundation}>`
- `countUnitPromptsByTier(unitId: string): Promise<{all, higher, foundation}>`

### tierBulkAssignmentService.ts
- `assignTierToTopicPrompts(topicId: string, tier: TierLevel, onlyNullTiers?: boolean): Promise<BulkAssignmentResult>`
- `assignTierToUnitPrompts(unitId: string, tier: TierLevel, onlyNullTiers?: boolean): Promise<BulkAssignmentResult>`
- `assignTierToPrompts(promptIds: string[], tier: TierLevel): Promise<BulkAssignmentResult>`
- `clearTierForTopicPrompts(topicId: string): Promise<BulkAssignmentResult>`
- `clearTierForUnitPrompts(unitId: string): Promise<BulkAssignmentResult>`
- `getTopicTierDistribution(topicId: string): Promise<{total, higher, foundation, unassigned}>`
- `getUnitTierDistribution(unitId: string): Promise<{total, higher, foundation, unassigned}>`

## Troubleshooting

### Issue: Tier filter not working
**Solution**: Ensure tierFilter is passed to quiz runner and filter service functions

### Issue: Import fails with tier values
**Solution**: Check that tier values are 'higher', 'foundation', or null (case-insensitive)

### Issue: Bulk assignment doesn't update all prompts
**Solution**: Verify that prompts have correct unit_id/topic_id in database

### Issue: Unassigned prompts not showing
**Solution**: Ensure tierFilter='all' includes NULL values in query

## Future Enhancements

- [ ] User preference storage for tier filter per subject
- [ ] Tier-based difficulty progression
- [ ] Tier-aware recommendations
- [ ] Analytics on tier performance
- [ ] Tier-based learning paths

