# TypeScript Errors Analysis & Fix Plan

## Summary
The revision app has **150+ TypeScript errors** that need to be fixed. Most are type mismatches and unused imports. The app **runs successfully** despite these errors, but they should be resolved for production quality.

## Error Categories

### 1. **Toast Context Type Errors** (Most Critical - ~40 errors)
**Issue**: Toast messages are being passed as strings, but the context expects `ToastType` enum values.

**Files Affected**:
- `src/admin/DiagramEditor.tsx`
- `src/admin/DiagramMetadataImporter.tsx`
- `src/admin/DiagramMetadataManager.tsx`
- `src/admin/DiagramTemplateEditor.tsx`
- `src/admin/DiagramsPage.tsx`
- And many more...

**Example Error**:
```typescript
// ❌ WRONG
showToast("Failed to load diagram");  // String passed

// ✅ CORRECT
showToast("error");  // Use enum value
```

**Fix**: Need to check `src/contexts/ToastContext.tsx` to see what `ToastType` values are available, then update all toast calls.

---

### 2. **Confirm Context Type Errors** (~10 errors)
**Issue**: `confirm()` is being called with a string, but it expects `ConfirmOptions` object.

**Files Affected**:
- `src/admin/DiagramEditor.tsx`
- `src/admin/DiagramsPage.tsx`
- `src/admin/JsonImportPageEnhanced.tsx`

**Example Error**:
```typescript
// ❌ WRONG
confirm("Are you sure?");  // String passed

// ✅ CORRECT
confirm({ title: "Confirm", message: "Are you sure?" });  // Object passed
```

**Fix**: Update all `confirm()` calls to pass proper `ConfirmOptions` object.

---

### 3. **Unused Imports** (~30 errors)
**Issue**: Imports that are declared but never used in the code.

**Examples**:
- `React` imported but not used (can be removed in modern React)
- `Download`, `Eye` icons imported but not used
- `Subject`, `Paper` types imported but not used

**Fix**: Remove unused imports or use them in the code.

---

### 4. **Missing Type Properties** (~20 errors)
**Issue**: Objects are missing required properties or have wrong property names.

**Examples**:
- `EditorState` uses `selectedElementIds` (plural) but code references `selectedElementId` (singular)
- `ValidationResult` missing `isValid` property
- `NormalizedQuestion` missing `unitId`, `topicId`, `type`, `explanation`, `meta` properties

**Files Affected**:
- `src/admin/DiagramEditor.tsx`
- `src/admin/JsonImportPageEnhanced.tsx`
- `src/admin/CsvImportPageWithTier.tsx`

**Fix**: Update type definitions or fix the code to use correct property names.

---

### 5. **Type Mismatch Errors** (~15 errors)
**Issue**: Passing wrong types to functions or components.

**Examples**:
- Passing `Subject | undefined` where `Subject | null` is expected
- Passing `string | null` where `string | undefined` is expected
- Component props don't match expected interface

**Files Affected**:
- `src/pages/ResultsPage.tsx`
- `src/pages/SubjectDetailPageWithTier.tsx`
- `src/pages/SubjectDetailPageEnhanced.tsx`
- `src/pages/QuizPlayerPage.enhanced.tsx`

**Fix**: Update type definitions or fix the code to match expected types.

---

### 6. **Function Signature Mismatches** (~10 errors)
**Issue**: Functions called with wrong number of arguments.

**Examples**:
- `showToast()` called with 2 arguments but expects 1
- `confirm()` called with 3 arguments but expects 1-2
- Component props don't match expected interface

**Files Affected**:
- `src/admin/ImportPage.tsx`
- `src/pages/QuizPlayerPage.enhanced.tsx`

**Fix**: Check function signatures and update calls accordingly.

---

## Priority Fix Order

### 🔴 **High Priority** (Blocks functionality)
1. Fix Toast context type errors - affects all admin pages
2. Fix Confirm context type errors - affects delete/confirmation flows
3. Fix EditorState property names - affects diagram editor

### 🟡 **Medium Priority** (Code quality)
4. Fix type mismatches in component props
5. Fix missing type properties in data structures
6. Fix function signature mismatches

### 🟢 **Low Priority** (Cleanup)
7. Remove unused imports
8. Remove unused variables

---

## Next Steps

1. **Check Context Definitions**:
   - Review `src/contexts/ToastContext.tsx` for `ToastType` enum
   - Review `src/contexts/ConfirmContext.tsx` for `ConfirmOptions` interface

2. **Fix Toast Errors** (40 errors):
   - Update all `showToast()` calls to use correct enum values
   - Pattern: `showToast("error")` instead of `showToast("Error message")`

3. **Fix Confirm Errors** (10 errors):
   - Update all `confirm()` calls to pass `ConfirmOptions` object
   - Pattern: `confirm({ title: "...", message: "..." })`

4. **Fix Type Definitions**:
   - Update `EditorState` to use consistent property names
   - Update `ValidationResult` and `NormalizedQuestion` types
   - Fix component prop interfaces

5. **Test & Validate**:
   - Run `npm run typecheck` to verify all errors are fixed
   - Test admin pages functionality
   - Test diagram editor
   - Test quiz player

---

## Files Needing Fixes (Priority Order)

### Critical (Toast/Confirm Context)
- [ ] `src/contexts/ToastContext.tsx` - Check type definitions
- [ ] `src/contexts/ConfirmContext.tsx` - Check type definitions
- [ ] `src/admin/DiagramEditor.tsx` - 10+ errors
- [ ] `src/admin/DiagramMetadataManager.tsx` - 10+ errors
- [ ] `src/admin/DiagramMetadataImporter.tsx` - 8+ errors
- [ ] `src/admin/DiagramTemplateEditor.tsx` - 8+ errors

### Important (Type Mismatches)
- [ ] `src/admin/CsvImportPageWithTier.tsx` - Missing type properties
- [ ] `src/admin/JsonImportPageEnhanced.tsx` - Missing type properties
- [ ] `src/pages/SubjectDetailPageWithTier.tsx` - Type mismatches
- [ ] `src/pages/ResultsPage.tsx` - Type mismatches

### Cleanup (Unused Imports)
- [ ] `src/admin/ContentOpsHome.tsx`
- [ ] `src/admin/CoveragePage.tsx`
- [ ] `src/pages/QuizPlayerPage.tsx`
- [ ] And 20+ other files

---

## Current Status

✅ **App is running successfully** - No runtime errors
✅ **Supabase connection configured** - Ready to use
✅ **Vite dev server fixed** - Allows external access
❌ **TypeScript compilation** - 150+ errors to fix
❌ **Production build** - Will fail until errors are fixed

