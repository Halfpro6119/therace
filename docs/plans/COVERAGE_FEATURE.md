# Content Coverage Feature - GCSE Revision App

## Overview

The Content Coverage feature provides admins with a comprehensive dashboard to track and manage content coverage across GCSE papers, units, topics, and question types. This ensures that all required content is properly represented in the question bank.

## Features

### 1. Coverage Dashboard (`/admin/coverage`)

The main admin interface displays:

- **Paper Coverage Cards**: Shows coverage percentage for Paper 1, 2, and 3
- **Summary Statistics**: Total question types, missing types, total prompts, topics
- **Hierarchical Breakdown**: Unit → Topic → Question Type structure with coverage metrics
- **Missing Content View**: Toggle to show only missing or under-populated question types
- **Seed Taxonomy Button**: One-click seeding of the Maths taxonomy

### 2. Coverage Metrics

#### Topic Coverage
- `requiredQuestionTypesCount`: Total question types defined for the topic
- `populatedQuestionTypesCount`: Types with ≥ minimum prompts
- `promptsCount`: Total prompts in the topic
- `coveragePercentage`: (populatedTypes / requiredTypes) × 100
- `status`: 'ok' (≥80%), 'warning' (50-80%), 'missing' (<50%)
- `missingTypes`: List of under-populated question types

#### Unit Coverage
- Aggregated from all topics in the unit
- `averageCoveragePercentage`: Average of all topic coverage percentages
- `topicsCoveredCount`: Topics with 'ok' status

#### Paper Coverage
- Aggregated from all units in the paper
- `averageCoveragePercentage`: Average of all unit coverage percentages
- `unitsCoveredCount`: Units with 'ok' status

### 3. Configurable Thresholds

Coverage settings are stored per subject and define minimum prompts required:

```typescript
interface CoverageSettings {
  minPromptsPerQuestionType: number;  // Default: 10
  minPromptsPerTopic: number;         // Default: 50
  minPromptsPerUnit: number;          // Default: 200
}
```

Admins can update these thresholds via the admin interface (future enhancement).

## Database Schema

### New Tables

#### `papers`
```sql
CREATE TABLE papers (
  id uuid PRIMARY KEY,
  subject_id uuid REFERENCES subjects(id),
  paper_number int (1|2|3),
  name text,
  calculator_allowed_default boolean,
  created_at timestamptz
);
```

#### `question_types`
```sql
CREATE TABLE question_types (
  id uuid PRIMARY KEY,
  subject_id uuid REFERENCES subjects(id),
  paper_id uuid REFERENCES papers(id),
  unit_id uuid REFERENCES units(id),
  topic_id uuid REFERENCES topics(id),
  type_id text UNIQUE,  -- e.g., "p1_geo_circle_semi_circle"
  title text,
  difficulty_min int,
  difficulty_max int,
  marks_min int,
  marks_max int,
  calculator_allowed boolean,
  diagram_template_id uuid,
  tags jsonb,
  created_at timestamptz
);
```

#### `coverage_settings`
```sql
CREATE TABLE coverage_settings (
  id uuid PRIMARY KEY,
  subject_id uuid REFERENCES subjects(id) UNIQUE,
  min_prompts_per_question_type int,
  min_prompts_per_topic int,
  min_prompts_per_unit int,
  created_at timestamptz,
  updated_at timestamptz
);
```

### Modified Tables

#### `prompts`
Added columns:
- `paper_id uuid REFERENCES papers(id)` - Optional, for paper-specific questions
- `question_type_id uuid REFERENCES question_types(id)` - Links prompt to question type

## Maths Taxonomy

The Maths taxonomy is defined in `src/config/taxonomy/maths.ts` and includes:

### Papers
- Paper 1: Non-Calculator (calculator_allowed_default = false)
- Paper 2: Calculator (calculator_allowed_default = true)
- Paper 3: Calculator (calculator_allowed_default = true)

### Units (4 total)
1. **Number** (5 topics)
   - Integers and Decimals
   - Fractions
   - Percentages
   - Powers and Roots
   - Standard Form

2. **Algebra** (5 topics)
   - Expressions and Equations
   - Sequences
   - Inequalities
   - Graphs
   - Functions

3. **Geometry** (5 topics)
   - Angles and Lines
   - Triangles and Congruence
   - Circles
   - Transformations
   - Vectors

4. **Statistics & Probability** (3 topics)
   - Data Representation
   - Averages and Spread
   - Probability

### Question Types
Each topic has multiple question types (e.g., "num_int_add_sub", "alg_expr_simplify").
Total: ~80 question types across all topics.

## API Functions

### Database Client (`src/db/client.ts`)

```typescript
// Papers
db.getPapers(subjectId: string): Promise<Paper[]>
db.getPaper(paperId: string): Promise<Paper | undefined>
db.createPaper(paper: Omit<Paper, 'id'>): Promise<Paper>

// Question Types
db.getQuestionTypes(subjectId: string): Promise<QuestionType[]>
db.getQuestionTypesByTopic(topicId: string): Promise<QuestionType[]>
db.createQuestionType(qt: Omit<QuestionType, 'id'>): Promise<QuestionType>

// Coverage Settings
db.getCoverageSettings(subjectId: string): Promise<CoverageSettings | undefined>
db.createCoverageSettings(settings: Omit<CoverageSettings, 'id'>): Promise<CoverageSettings>
db.updateCoverageSettings(id: string, settings: Partial<CoverageSettings>): Promise<void>
```

### Coverage Computation (`src/utils/coverageComputation.ts`)

```typescript
// Compute coverage for a single topic
computeTopicCoverage(
  topic: Topic,
  unit: Unit,
  questionTypes: QuestionType[],
  prompts: Prompt[],
  settings: CoverageSettings
): TopicCoverage

// Compute coverage for a unit
computeUnitCoverage(
  unit: Unit,
  topics: Topic[],
  questionTypes: QuestionType[],
  prompts: Prompt[],
  settings: CoverageSettings
): UnitCoverage

// Compute coverage for a paper
computePaperCoverage(
  paper: Paper,
  units: Unit[],
  topics: Topic[],
  questionTypes: QuestionType[],
  prompts: Prompt[],
  settings: CoverageSettings
): PaperCoverage

// List all missing question types
listMissingQuestionTypes(
  papers: Paper[],
  units: Unit[],
  topics: Topic[],
  questionTypes: QuestionType[],
  prompts: Prompt[],
  settings: CoverageSettings
): MissingQuestionType[]

// Compute overall subject coverage
computeSubjectCoverageSummary(
  subjectId: string,
  subjectName: string,
  papers: Paper[],
  units: Unit[],
  topics: Topic[],
  questionTypes: QuestionType[],
  prompts: Prompt[],
  settings: CoverageSettings
): SubjectCoverageSummary

// Check if taxonomy is missing
isTaxonomyMissing(questionTypes: QuestionType[]): boolean
```

## Usage

### 1. Access Coverage Dashboard

Navigate to `/admin/coverage` in the admin panel.

### 2. Seed Maths Taxonomy

If no question types are defined:
1. Click "Seed Maths Taxonomy" button
2. The system will create:
   - 3 papers (Paper 1, 2, 3)
   - 4 units (Number, Algebra, Geometry, Statistics & Probability)
   - 17 topics
   - ~80 question types

### 3. View Coverage Metrics

The dashboard displays:
- **Progress Cards**: Coverage % for each paper
- **Summary Stats**: Total question types, missing types, prompts, topics
- **Missing Question Types Table**: Shows which types need more prompts
- **Detailed Breakdown**: Hierarchical view of units, topics, and question types

### 4. Identify Missing Content

Use the "Show Missing Only" toggle to filter and see:
- Which question types have fewer prompts than required
- How many prompts are needed to reach the minimum
- Which unit/topic each missing type belongs to

## Linking Prompts to Question Types

Prompts can be linked to question types in two ways:

### Option 1: Direct Foreign Key (Preferred)
```typescript
// When creating a prompt
const prompt = await db.createPrompt({
  // ... other fields
  question_type_id: questionTypeId,  // Direct FK
});
```

### Option 2: Meta Field Mapping (Fallback)
```typescript
// When creating a prompt
const prompt = await db.createPrompt({
  // ... other fields
  meta: {
    questionTypeId: questionTypeId,  // String reference
    typeId: 'num_int_add_sub',       // Type ID string
  },
});
```

The coverage computation checks both:
```typescript
const count = prompts.filter(p => 
  p.meta?.questionTypeId === qt.id || 
  p.meta?.typeId === qt.typeId
).length;
```

## Performance Considerations

### Caching
Coverage computations are performed on-demand and cached in component state. For large datasets, consider:
- Memoizing computation results
- Implementing server-side caching
- Using SQL aggregations for large-scale reports

### Indexes
The migration creates indexes on:
- `papers(subject_id)`
- `question_types(subject_id, paper_id, unit_id, topic_id)`
- `prompts(question_type_id, paper_id)`
- `coverage_settings(subject_id)`

### SQL Aggregation (Future)
For better performance with large datasets, implement SQL-based coverage queries:
```sql
SELECT 
  qt.topic_id,
  COUNT(DISTINCT qt.id) as required_types,
  COUNT(DISTINCT CASE WHEN p.id IS NOT NULL THEN qt.id END) as populated_types,
  COUNT(p.id) as prompt_count
FROM question_types qt
LEFT JOIN prompts p ON (
  p.question_type_id = qt.id OR 
  p.meta->>'typeId' = qt.type_id
)
WHERE qt.subject_id = $1
GROUP BY qt.topic_id;
```

## Future Enhancements

1. **Settings UI**: Allow admins to edit coverage thresholds
2. **Bulk Actions**: Create placeholder question types for missing content
3. **Import/Export**: Export coverage reports as CSV/PDF
4. **Alerts**: Notify admins when coverage drops below threshold
5. **Multi-Subject**: Extend to support Biology, History, etc.
6. **Analytics**: Track coverage trends over time
7. **Auto-Suggestions**: Recommend which prompts to create based on gaps

## Troubleshooting

### Taxonomy Missing Warning
**Problem**: "Taxonomy Missing" warning appears on coverage page
**Solution**: Click "Seed Maths Taxonomy" button to load the default structure

### No Coverage Data
**Problem**: Coverage percentages show 0%
**Solution**: 
1. Ensure question types are created (seed taxonomy)
2. Ensure prompts are linked to question types via `question_type_id` or `meta.typeId`
3. Check that prompts have `subjectId` matching the subject

### Incorrect Coverage Calculations
**Problem**: Coverage percentages don't match expected values
**Solution**:
1. Verify coverage settings thresholds are correct
2. Check that prompts are properly linked to question types
3. Ensure all units/topics are properly associated with papers

## Files Modified/Created

### New Files
- `supabase/migrations/20260118120000_create_coverage_schema.sql` - Database schema
- `src/types/coverage.ts` - TypeScript types
- `src/config/taxonomy/maths.ts` - Maths taxonomy definition
- `src/utils/coverageComputation.ts` - Coverage computation logic
- `src/admin/CoveragePage.tsx` - Coverage dashboard component

### Modified Files
- `src/db/client.ts` - Added coverage-related database functions
- `src/App.tsx` - Added `/admin/coverage` route
- `src/admin/AdminDashboard.tsx` - Added "Content Coverage" quick action

## Testing

To test the coverage feature:

1. Navigate to `/admin/coverage`
2. Click "Seed Maths Taxonomy" to load test data
3. Verify that:
   - 3 papers are created
   - 4 units are created
   - 17 topics are created
   - ~80 question types are created
4. Check that coverage percentages are calculated correctly
5. Verify missing question types are listed

## Support

For issues or questions about the coverage feature, refer to:
- Coverage computation logic: `src/utils/coverageComputation.ts`
- Database schema: `supabase/migrations/20260118120000_create_coverage_schema.sql`
- Component implementation: `src/admin/CoveragePage.tsx`
