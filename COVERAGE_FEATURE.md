# Content Coverage Feature

A comprehensive admin dashboard for tracking GCSE question type coverage across papers, units, and topics.

## Features

- **Paper Coverage Dashboard**: View coverage % for Paper 1, 2, and 3
- **Unit & Topic Breakdown**: Hierarchical view of coverage at each level
- **Question Type Tracking**: See which question types have sufficient prompts
- **Missing Content Detection**: Identify gaps in question type coverage
- **Configurable Thresholds**: Set minimum prompt requirements per level
- **Taxonomy Seeding**: One-click seeding of GCSE Maths structure

## Database Schema

### Tables

1. **subjects** - GCSE subjects (Maths, English, etc.)
   - id, name, code, created_at

2. **papers** - Papers per subject (Paper 1, 2, 3)
   - id, subject_id, paper_number, name, calculator_allowed_default, created_at

3. **units** - Units per subject (Number, Algebra, Geometry, etc.)
   - id, subject_id, paper_id, unit_name, sort_order, created_at

4. **topics** - Topics per unit (Integers, Fractions, etc.)
   - id, subject_id, unit_id, topic_name, sort_order, created_at

5. **question_types** - Question type templates with metadata
   - id, subject_id, paper_id, unit_id, topic_id, type_id, title
   - difficulty_min, difficulty_max, marks_min, marks_max
   - default_calculator_allowed, diagram_template_id, tags, created_at

6. **prompts** - Individual prompts linked to question types
   - id, question_type_id, content, meta, created_at

7. **coverage_settings** - Configurable thresholds per subject
   - id, subject_id, min_prompts_per_question_type, min_prompts_per_topic, min_prompts_per_unit

## API Routes

### GET /api/admin/coverage
Returns all subjects with basic info.

**Response:**
```json
{
  "success": true,
  "subjects": [
    { "id": 1, "name": "Maths", "code": "MATHS" }
  ]
}
```

### GET /api/admin/coverage/maths
Returns complete coverage data for Maths:
- All papers with coverage %
- Units and topics breakdown
- Question type status
- Missing content counts

**Response:**
```json
{
  "success": true,
  "subjectId": 1,
  "settings": {
    "minPromptsPerQuestionType": 10,
    "minPromptsPerTopic": 50,
    "minPromptsPerUnit": 200
  },
  "papers": [
    {
      "paperId": 1,
      "paperNumber": 1,
      "paperName": "Paper 1 (Non-Calculator)",
      "coveragePercent": 0,
      "promptsCount": 0,
      "missingTopicsCount": 13,
      "missingTypesCount": 46,
      "units": [...]
    }
  ]
}
```

### POST /api/admin/coverage/seed
Seeds the Maths taxonomy into the database.

**Response:**
```json
{
  "success": true,
  "message": "Maths taxonomy seeded successfully",
  "subjectId": 1
}
```

## Frontend Pages

### /admin/coverage
Main coverage dashboard showing all subjects.

### /admin/coverage/maths
Detailed Maths coverage view with:
- Paper coverage cards (Paper 1, 2, 3)
- Expandable unit/topic/question type hierarchy
- Coverage progress bars
- Missing content statistics

## Coverage Calculation

Coverage is measured at multiple levels:

### Question Type Level
- Status: OK if prompts >= minPromptsPerQuestionType (default: 10)
- Status: Warning if 0 < prompts < 10
- Status: Missing if prompts = 0

### Topic Level
- Coverage % = (populated question types / total question types) × 100
- Status based on coverage percentage

### Unit Level
- Coverage % = average of all topic coverage %

### Paper Level
- Coverage % = average of all unit coverage %
- Missing topics/types count

## Configuration

Default coverage settings (editable):
- `minPromptsPerQuestionType`: 10
- `minPromptsPerTopic`: 50
- `minPromptsPerUnit`: 200

Admin can override these thresholds.

## Maths Taxonomy Structure

### Units (4)
1. **Number** (4 topics, 12 question types)
   - Integers and Decimals
   - Fractions
   - Percentages
   - Powers and Roots

2. **Algebra** (3 topics, 9 question types)
   - Expressions and Equations
   - Sequences
   - Graphs

3. **Geometry** (3 topics, 14 question types)
   - Angles and Lines
   - Triangles and Circles
   - Area and Volume

4. **Statistics and Probability** (3 topics, 11 question types)
   - Data Handling
   - Averages and Spread
   - Probability

**Total: 46 question types across 13 topics**

## Integration with Prompts

Prompts are linked to question types via:
- `prompts.question_type_id` (FK to question_types.id)

This allows the coverage system to count available prompts for each question type.

## Performance

- SQL aggregation for fast coverage calculations
- Indexed queries on foreign keys
- Hierarchical data structure for efficient traversal

## Future Enhancements

- [ ] Coverage settings UI for admins
- [ ] Export coverage reports (PDF/CSV)
- [ ] Historical coverage tracking
- [ ] Alerts for low coverage areas
- [ ] Support for other subjects (English, Science, etc.)
- [ ] Prompt import/bulk operations
