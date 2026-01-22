# 🚀 TIER SYSTEM - DEPLOYMENT GUIDE

**Status**: Ready for Production Deployment
**Date**: January 22, 2026
**Repository**: https://github.com/Halfpro6119/therace/tree/feature/json-import-upgrade

---

## 📋 DEPLOYMENT CHECKLIST

### Phase 1: Database Migration ✅
- [x] Migration file created: `supabase/migrations/20260121_add_tier_system.sql`
- [ ] **TODO**: Run migration in Supabase

### Phase 2: Admin UI Integration ✅
- [x] All admin components created
- [ ] **TODO**: Update admin routing

### Phase 3: Quiz Integration ✅
- [x] QuizPlayerPageWithTier created
- [ ] **TODO**: Update quiz routing

### Phase 4: User-Facing Features ✅
- [x] SubjectDetailPageWithTier created
- [ ] **TODO**: Update user-facing routing

### Phase 5: Testing & Deployment
- [ ] **TODO**: Run acceptance tests
- [ ] **TODO**: Deploy to production

---

## 🔧 STEP 1: RUN DATABASE MIGRATION

### Option A: Via Supabase Dashboard (Recommended)

1. **Go to Supabase Dashboard**
   - URL: https://app.supabase.com
   - Project: therace
   - Sign in with your credentials

2. **Navigate to SQL Editor**
   - Click "SQL Editor" in left sidebar
   - Click "New Query"

3. **Paste Migration SQL**
   - Copy the entire migration from: `supabase/migrations/20260121_add_tier_system.sql`
   - Paste into the SQL editor

4. **Execute Migration**
   - Click "Run" button
   - Wait for success message
   - Verify: Check "Tables" section to see `tier` column in `prompts` table

### Option B: Via CLI

```bash
# Install Supabase CLI if not already installed
npm install -g supabase

# Login to Supabase
supabase login

# Link to your project
supabase link --project-ref hivklkobksraktxynacv

# Run migration
supabase db push

# Or manually run SQL file
psql -h db.hivklkobksraktxynacv.supabase.co \
     -U postgres \
     -d postgres \
     -f supabase/migrations/20260121_add_tier_system.sql
```

### Verification Checklist

After running migration, verify:

```sql
-- Check tier column exists in prompts
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'prompts' AND column_name = 'tier';

-- Check tier_filter column exists in quizzes
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'quizzes' AND column_name = 'tier_filter';

-- Check indexes exist
SELECT indexname FROM pg_indexes
WHERE tablename = 'prompts' AND indexname LIKE '%tier%';
```

Expected output:
- ✅ `prompts.tier` column exists (text, nullable)
- ✅ `quizzes.tier_filter` column exists (text, default 'all')
- ✅ 4 indexes created: `idx_prompts_subject_tier`, `idx_prompts_paper_tier`, `idx_prompts_topic_tier`, `idx_prompts_unit_tier`

---

## 🔧 STEP 2: UPDATE ADMIN ROUTING

### File: `src/admin/AdminLayout.tsx` or your admin router

**Before:**
```typescript
import { PromptsPage } from './PromptsPage';
import { TopicsPage } from './TopicsPage';
import { UnitsPage } from './UnitsPage';
import { ImportPage } from './ImportPage';
import { JsonImportPage } from './JsonImportPage';
```

**After:**
```typescript
import { PromptsPageWithTier } from './PromptsPageWithTier';
import { TopicsPageWithTier } from './TopicsPageWithTier';
import { UnitsPageWithTier } from './UnitsPageWithTier';
import { CsvImportPageWithTier } from './CsvImportPageWithTier';
import { JsonImportPageWithTier } from './JsonImportPageWithTier';
import { QuizPlayerPageWithTier } from './QuizPlayerPageWithTier';
```

### Update Route Mappings

**Before:**
```typescript
const routes = [
  { path: '/admin/prompts', component: PromptsPage },
  { path: '/admin/topics', component: TopicsPage },
  { path: '/admin/units', component: UnitsPage },
  { path: '/admin/import', component: ImportPage },
  { path: '/admin/import-json', component: JsonImportPage },
];
```

**After:**
```typescript
const routes = [
  { path: '/admin/prompts', component: PromptsPageWithTier },
  { path: '/admin/topics', component: TopicsPageWithTier },
  { path: '/admin/units', component: UnitsPageWithTier },
  { path: '/admin/import-csv', component: CsvImportPageWithTier },
  { path: '/admin/import-json', component: JsonImportPageWithTier },
  { path: '/admin/quiz-player', component: QuizPlayerPageWithTier },
];
```

---

## 🔧 STEP 3: UPDATE USER-FACING ROUTING

### File: `src/pages/SubjectDetailPage.tsx` or your user router

**Before:**
```typescript
import { SubjectDetailPage } from './SubjectDetailPage';

const routes = [
  { path: '/subject/:subjectId', component: SubjectDetailPage },
];
```

**After:**
```typescript
import { SubjectDetailPageWithTier } from './SubjectDetailPageWithTier';

const routes = [
  { path: '/subject/:subjectId', component: SubjectDetailPageWithTier },
];
```

---

## 🧪 STEP 4: RUN ACCEPTANCE TESTS

### Test 1: Import with Mixed Case Tier

**Steps:**
1. Open JsonImportPageWithTier
2. Paste JSON:
```json
{
  "prompts": [
    {
      "subject": "Maths",
      "unit": "Unit 1",
      "topic": "Algebra",
      "question": "What is 2+2?",
      "answers": ["4"],
      "tier": "Higher"
    }
  ]
}
```
3. Click "Import Prompts"

**Expected Result:**
- ✅ Prompt imported successfully
- ✅ Tier saved as "higher" (lowercase)
- ✅ Tier distribution shows: 1 Higher

---

### Test 2: CSV Import with Tier Column

**Steps:**
1. Open CsvImportPageWithTier
2. Paste CSV:
```csv
subject,examBoard,unit,topic,type,question,answers,tier
Maths,GCSE,Unit 1,Algebra,short,What is 2+2?,4,higher
Maths,GCSE,Unit 1,Algebra,short,What is 1+1?,2,foundation
```
3. Click "Import Prompts"

**Expected Result:**
- ✅ 2 prompts imported
- ✅ Tier distribution: 1 Higher, 1 Foundation

---

### Test 3: Single Prompt Tier Update

**Steps:**
1. Open PromptsPageWithTier
2. Click Edit on any prompt
3. Select tier: "Higher Tier"
4. Click "Save Changes"

**Expected Result:**
- ✅ Prompt updated in database
- ✅ Tier badge appears on prompt list

---

### Test 4: Bulk Topic Assignment

**Steps:**
1. Open TopicsPageWithTier
2. Click "Set Tier" on a topic
3. Select "Higher Tier"
4. Click confirm

**Expected Result:**
- ✅ All prompts in topic updated
- ✅ Tier distribution updated
- ✅ Success message shown

---

### Test 5: Tier Filtering

**Steps:**
1. Open PromptsPageWithTier
2. Select tier filter: "Higher Tier"
3. Verify list updates

**Expected Result:**
- ✅ Only higher tier prompts shown
- ✅ Count updates correctly

---

### Test 6: Combined Paper + Tier Filter

**Steps:**
1. Open QuizPlayerPageWithTier
2. Select quiz type: "Paper"
3. Select paper: "Paper 1"
4. Select tier: "Foundation Tier"
5. Click "Start Quiz"

**Expected Result:**
- ✅ Quiz loads with only Paper 1 + Foundation prompts
- ✅ Tier badges visible on questions

---

### Test 7: Backwards Compatibility

**Steps:**
1. Open PromptsPageWithTier
2. Select tier filter: "All Tiers"
3. Verify old prompts (tier=NULL) appear

**Expected Result:**
- ✅ Prompts without tier assignment still visible
- ✅ No errors in console
- ✅ Quiz runs with mixed tier prompts

---

## 🚀 STEP 5: DEPLOY TO PRODUCTION

### Option A: Merge to Main Branch

```bash
# Switch to main branch
git checkout main

# Pull latest changes
git pull origin main

# Merge feature branch
git merge feature/json-import-upgrade

# Push to main
git push origin main

# Deploy (depends on your CI/CD setup)
# If using Vercel: automatic deployment on push
# If using other platform: follow your deployment process
```

### Option B: Create Pull Request

1. Go to GitHub: https://github.com/Halfpro6119/therace
2. Click "Pull requests"
3. Click "New pull request"
4. Base: `main`, Compare: `feature/json-import-upgrade`
5. Create pull request
6. Review changes
7. Merge when ready

### Post-Deployment Verification

After deployment, verify:

1. **Admin Pages Load**
   - PromptsPageWithTier loads without errors
   - TopicsPageWithTier loads without errors
   - UnitsPageWithTier loads without errors
   - Import pages load without errors

2. **Database Connected**
   - Tier column accessible
   - Tier filter works
   - Bulk assignment works

3. **User-Facing Features**
   - SubjectDetailPageWithTier loads
   - Tier filter visible
   - Tier badges display correctly

4. **No Console Errors**
   - Open browser DevTools (F12)
   - Check Console tab
   - Verify no errors or warnings

---

## 📊 DEPLOYMENT SUMMARY

| Step | Status | Time |
|------|--------|------|
| 1. Database Migration | ⏳ TODO | 5 min |
| 2. Admin Routing | ⏳ TODO | 10 min |
| 3. User Routing | ⏳ TODO | 5 min |
| 4. Acceptance Tests | ⏳ TODO | 20 min |
| 5. Production Deploy | ⏳ TODO | 10 min |
| **TOTAL** | **⏳ TODO** | **~50 min** |

---

## 🆘 TROUBLESHOOTING

### Migration Fails

**Error**: "Column already exists"
- **Solution**: Column may already exist from previous attempt. Check with:
  ```sql
  SELECT column_name FROM information_schema.columns 
  WHERE table_name = 'prompts' AND column_name = 'tier';
  ```

**Error**: "Permission denied"
- **Solution**: Ensure you're using correct Supabase credentials with admin access

### Components Don't Load

**Error**: "Module not found: PromptsPageWithTier"
- **Solution**: Verify file exists at `src/admin/PromptsPageWithTier.tsx`
- **Solution**: Check import path is correct

**Error**: "Cannot read property 'tier' of undefined"
- **Solution**: Ensure database migration ran successfully
- **Solution**: Check tier column exists in prompts table

### Tests Fail

**Error**: "Tier not saved"
- **Solution**: Verify database migration completed
- **Solution**: Check browser console for errors
- **Solution**: Verify Supabase connection string is correct

---

## 📞 SUPPORT

All code is documented in:
- `TIER_SYSTEM_IMPLEMENTATION.md` - Architecture details
- `README_TIER_SYSTEM.md` - Quick reference
- `TIER_SYSTEM_FINAL_DELIVERY.md` - Complete delivery info

---

## ✅ DEPLOYMENT COMPLETE

Once all steps are complete:

1. ✅ Database migration applied
2. ✅ Admin routing updated
3. ✅ User routing updated
4. ✅ All 7 acceptance tests passed
5. ✅ Code deployed to production

**Status**: Ready for production use

---

**Deployed**: [Date]
**Deployed By**: [Your Name]
**Version**: 1.0.0

