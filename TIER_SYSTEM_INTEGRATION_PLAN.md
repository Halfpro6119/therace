# Tier System Integration Plan - Complete Implementation

## Current Status
✅ Database: Migration complete with tier column and indexes
✅ Types: TierLevel and TierFilter types defined
✅ Core Services: tierNormalizer, tierFilterService, tierBulkAssignmentService implemented
✅ Import Support: CSV and JSON import utilities with tier support
✅ Partial UI: Some admin pages have tier support files created

## Remaining Work

### PART A: Admin UI Integration (CRITICAL)
1. **PromptsPage.tsx** - Integrate tier selector and bulk actions
2. **TopicsPage.tsx** - Add tier distribution display and bulk assignment
3. **UnitsPage.tsx** - Add tier distribution display and bulk assignment
4. **ImportPage.tsx** - Add default tier selector to CSV import
5. **JsonImportPage.tsx** - Add default tier selector to JSON import
6. **PaperMasterQuizzesPage.tsx** - Add tier filter to paper quiz builder

### PART B: Main UI Integration (CRITICAL)
1. **SubjectDetailPage.tsx** - Integrate tier filter (use WithTier version as reference)
2. **QuizPlayerPage.tsx** - Accept and apply tier filter in quiz runner
3. **ResultsPage.tsx** - Show tier-aware progress/mastery

### PART C: Quiz Runner Integration
1. Update quiz fetching to apply tier filter
2. Update progress tracking to store tier context
3. Update mastery calculations to be tier-aware

### PART D: Testing & Validation
1. Test import with tier values
2. Test admin tier assignment
3. Test main UI tier filtering
4. Test combined Paper + Tier filtering
5. Test progress tracking with tiers

## Implementation Order
1. Fix/complete admin pages (PromptsPage, TopicsPage, UnitsPage)
2. Integrate import tier support
3. Integrate main UI tier filter
4. Update quiz runner
5. Test all flows
6. Deploy and demonstrate

