# Re-import Maths Gold Questions with Diagrams

This guide will help you delete the existing gold questions and re-import them with diagrams properly stored.

## Step 1: Run the Database Migration

First, make sure the `diagram_metadata` column exists in the prompts table:

1. Apply the migration file: `supabase/migrations/20260204_add_diagram_metadata_to_prompts.sql`
2. If using Supabase CLI: `supabase migration up`
3. If using Supabase Dashboard: Run the SQL from the migration file in the SQL Editor

## Step 2: Delete Existing Gold Questions

### Option A: Using the Admin Page (Recommended)

1. Navigate to: `http://localhost:5173/admin/delete-gold-questions` (or your app URL)
2. Click "Delete All Gold Questions"
3. Confirm the deletion
4. Wait for the deletion to complete

### Option B: Using SQL Directly

If you prefer to use SQL directly, run this in your Supabase SQL Editor:

```sql
-- Delete all prompts with gold question IDs
DELETE FROM prompts
WHERE meta->>'goldQuestionId' IN (
  'F01', 'F02', 'F03', 'F04', 'F05', 'F06', 'F07', 'F08',
  'F09', 'F10', 'F11', 'F12', 'F13', 'F14', 'F15', 'F16',
  'F17', 'F18', 'F19', 'F20', 'F21', 'F22', 'F23', 'F24',
  'F25', 'F26', 'F27',
  'H01', 'H02', 'H03', 'H04', 'H05', 'H06', 'H07', 'H08',
  'H09', 'H10', 'H11', 'H12', 'H13', 'H14', 'H15', 'H16',
  'H17', 'H18', 'H19', 'H20', 'H21', 'H22', 'H23', 'H24',
  'H25', 'H26', 'H27', 'H28', 'H29', 'H30', 'H31', 'H32'
);
```

## Step 3: Re-import the Questions

1. Navigate to: `http://localhost:5173/admin/json-import` (or your app URL)
2. Select "Maths" as the subject
3. Optionally select a default paper (Paper 1, 2, or 3) if you want all questions assigned to a specific paper
4. Open `MATHS_GOLD_QUESTIONS.json` in your editor
5. Copy the entire contents of the JSON file
6. Paste it into the JSON import textarea
7. Click "Detect Questions" to preview
8. Review the preview - you should see 59 questions detected
9. Click "Import" to import all questions

## Step 4: Verify Diagrams

After importing, verify that diagrams are working:

1. Go to the Prompts page: `http://localhost:5173/admin/prompts`
2. Filter by tier (foundation or higher)
3. Find a question that should have a diagram (e.g., F15, F17, H19, H20)
4. Check that the prompt has `diagram_metadata` populated
5. Play a quiz containing one of these questions to verify the diagram displays

## Questions with Diagrams

The following questions should have diagrams:

- **F15**: Coordinate grid with point P
- **F17**: Coordinate grid
- **F26**: Bar chart
- **F27**: Scatter plot
- **H19**: Circle theorem (angle in semicircle)
- **H20**: Circle theorem (tangent-radius)
- **H28**: Histogram
- **H29**: Box plots

## Troubleshooting

### Diagrams still not showing

1. **Check database**: Verify that `diagram_metadata` column exists:
   ```sql
   SELECT column_name FROM information_schema.columns 
   WHERE table_name = 'prompts' AND column_name = 'diagram_metadata';
   ```

2. **Check prompt data**: Verify a prompt has diagram_metadata:
   ```sql
   SELECT id, question, diagram_metadata, meta->'diagram' as meta_diagram
   FROM prompts 
   WHERE meta->>'goldQuestionId' = 'F15'
   LIMIT 1;
   ```

3. **Check template IDs**: Some diagrams require template IDs to exist. Verify templates exist:
   - `math.graphs.axes_blank.v1`
   - `math.circle_theorems.angle_in_semicircle.v1`
   - `math.circle_theorems.tangent_radius.v1`

### Import errors

- If you get errors about missing units/topics, the import will create them automatically
- If you get errors about duplicate questions, make sure you deleted the old ones first
- Check the browser console for detailed error messages

## Next Steps

After successful re-import:

1. **Create Master Quizzes**: Use the Paper Quiz Builder to create master quizzes
2. **Test Questions**: Play through some quizzes to verify everything works
3. **Review Diagrams**: Check that all diagrams render correctly

## Support

If you encounter issues:
- Check the browser console for errors
- Verify the migration was applied successfully
- Ensure the JSON file is valid JSON
- Check that diagram templates exist for questions requiring them
