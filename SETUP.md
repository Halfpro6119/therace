# Setup Guide - Content Coverage Feature

## Prerequisites

- Node.js 18+
- PostgreSQL 12+
- npm or bun

## Installation

1. **Install dependencies**:
```bash
npm install
```

2. **Create database**:
```bash
createdb -h localhost revision_app
```

3. **Set environment variables**:
```bash
cp .env.example .env.local
# Edit .env.local with your database credentials
```

4. **Initialize database schema**:
```bash
npm run init-db
```

5. **Start development server**:
```bash
npm run dev
```

6. **Access the app**:
- Main page: http://localhost:3000
- Coverage dashboard: http://localhost:3000/admin/coverage
- Maths coverage: http://localhost:3000/admin/coverage/maths

## Seeding Data

### Seed Maths Taxonomy

Option 1: Via API
```bash
curl -X POST http://localhost:3000/api/admin/coverage/seed
```

Option 2: Via UI
1. Go to http://localhost:3000/admin/coverage
2. Click "Seed Maths Taxonomy" button

This will create:
- Maths subject
- Papers 1, 2, 3
- 4 units (Number, Algebra, Geometry, Statistics/Probability)
- 13 topics
- 46 question types

## Adding Sample Prompts

To see coverage in action, add prompts to the database:

```sql
INSERT INTO prompts (question_type_id, content, meta)
SELECT id, 'Sample prompt for ' || title, '{"difficulty": 3}'
FROM question_types
LIMIT 10;
```

## Database Schema

The following tables are created:
- `subjects` - GCSE subjects
- `papers` - Papers per subject
- `units` - Units per subject
- `topics` - Topics per unit
- `question_types` - Question type templates
- `prompts` - Individual prompts
- `coverage_settings` - Coverage thresholds

## API Endpoints

### Coverage Data
- `GET /api/admin/coverage` - All subjects
- `GET /api/admin/coverage/maths` - Maths coverage details

### Taxonomy Management
- `POST /api/admin/coverage/seed` - Seed Maths taxonomy

## Troubleshooting

### Database Connection Error
- Ensure PostgreSQL is running
- Check PGHOST, PGPORT, PGUSER, PGPASSWORD in .env.local
- Verify database exists: `psql -l`

### Schema Not Created
- Run: `npm run init-db`
- Check for SQL errors in console

### No Data Showing
- Seed taxonomy: `curl -X POST http://localhost:3000/api/admin/coverage/seed`
- Add sample prompts to see coverage percentages

## Development

### File Structure
```
app/
  admin/coverage/
    page.tsx              # Main dashboard
    maths/
      page.tsx            # Maths coverage view
  api/admin/coverage/
    route.ts              # Get subjects
    maths/route.ts        # Get Maths coverage
    seed/route.ts         # Seed taxonomy

lib/
  db.ts                   # Database connection
  coverage.ts             # Coverage calculations
  schema.sql              # Database schema
  taxonomy/
    maths.ts              # Maths taxonomy data
```

### Key Functions
- `computePaperCoverage()` - Calculate paper coverage %
- `computeUnitCoverage()` - Calculate unit coverage %
- `computeTopicCoverage()` - Calculate topic coverage %
- `listMissingQuestionTypes()` - Find gaps in coverage

## Next Steps

1. Add more subjects (English, Science, etc.)
2. Implement coverage settings UI
3. Add prompt import/bulk operations
4. Create coverage reports (PDF/CSV)
5. Add historical tracking
