# Grade9 Sprint - Student Revision Platform

A modern, interactive student revision platform built with React, Vite, TypeScript, and Supabase.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- Supabase account (optional, for backend features)

### Installation

```bash
# Clone the repository
git clone https://github.com/Halfpro6119/therace.git
cd revision-app

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local

# Add your Supabase credentials to .env.local
# VITE_SUPABASE_URL=your_url
# VITE_SUPABASE_ANON_KEY=your_key

# Start development server
npm run dev
```

Server runs on: `http://localhost:5173`

## 📋 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Custom UI components
│   └── ...
├── contexts/           # React Context (Toast, Confirm)
│   ├── ToastContext.tsx
│   └── ConfirmContext.tsx
├── admin/              # Admin dashboard pages
│   ├── DiagramEditor.tsx
│   ├── DiagramsPage.tsx
│   └── ...
├── pages/              # User-facing pages
│   ├── HomePage.tsx
│   ├── QuizPlayerPage.tsx
│   └── ...
├── lib/                # Utilities and helpers
├── App.tsx             # Main app component
└── main.tsx            # Entry point
```

## 🎯 Features

### For Students
- **Daily Challenge**: Quick practice questions to build consistency
- **Sprint to Grade 9**: Focused learning paths for exam preparation
- **Streak Tracking**: Maintain learning consistency with streak counter
- **Grade 9 Readiness**: Track overall mastery across all subjects
- **Subject-Based Learning**: Organized by subject and exam board
- **Quiz Player**: Interactive quiz interface with instant feedback
- **Progress Tracking**: Visual progress indicators and mastery levels

### For Admins
- **Content Management**: Create and manage quiz questions
- **Diagram Editor**: Visual content creation and editing
- **Metadata Management**: Organize content with tags and categories
- **Import Tools**: Bulk import questions from CSV/JSON
- **Analytics Dashboard**: Track student progress and engagement

## 🔧 Configuration

### Environment Variables

Create `.env.local` from `.env.example` and set:

| Variable | Description |
|----------|-------------|
| `VITE_SUPABASE_URL` | Supabase project URL (e.g. `https://your-ref.supabase.co`) |
| `VITE_SUPABASE_ANON_KEY` | Supabase anonymous (public) API key |

See `.env.example` for a template. Do not commit real keys.

## 📚 Context API Reference

### Toast Context

Display notifications to users:

```typescript
import { useToast } from '@/contexts/ToastContext';

function MyComponent() {
  const { success, error, info } = useToast();
  
  success("Operation completed!");
  error("Something went wrong");
  info("Here's some information");
}
```

**Available Methods**:
- `success(message: string)` - Green success notification
- `error(message: string)` - Red error notification
- `info(message: string)` - Blue info notification

### Confirm Context

Show confirmation dialogs:

```typescript
import { useConfirm } from '@/contexts/ConfirmContext';

function MyComponent() {
  const { confirm } = useConfirm();
  
  const handleDelete = async () => {
    const confirmed = await confirm({
      title: "Delete Item",
      message: "Are you sure you want to delete this?",
      confirmLabel: "Delete",
      cancelLabel: "Cancel",
      destructive: true
    });
    
    if (confirmed) {
      // Perform delete operation
    }
  };
}
```

**ConfirmOptions**:
- `title: string` - Dialog title
- `message: string` - Dialog message
- `confirmLabel?: string` - Confirm button text (default: "Confirm")
- `cancelLabel?: string` - Cancel button text (default: "Cancel")
- `destructive?: boolean` - Red button if true (default: false)

## 🏗️ Architecture

### Component Organization

Components are organized by type:
- **UI Components**: Basic building blocks (Button, Card, Input, etc.)
- **Layout Components**: Page structure (Header, Sidebar, Footer)
- **Section Components**: Feature sections (Hero, Features, Pricing)
- **Feature Components**: Complex feature-specific components

### State Management

- **Local State**: React `useState` for component-level state
- **Context API**: Toast and Confirm contexts for global notifications
- **Supabase**: Backend data persistence and authentication

### Styling

- **Tailwind CSS**: Utility-first CSS framework
- **Custom Components**: shadcn/ui-inspired custom components
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints

## 🔌 API Integration

### Supabase

The app uses Supabase for:
- User authentication
- Database (PostgreSQL)
- Real-time updates
- File storage

### API Routes

Backend functionality is handled through:
- Supabase client library
- Custom API utilities in `lib/`

## 🧪 Testing

### Type Checking

```bash
npm run typecheck
```

TypeScript strict mode is enabled; the app typechecks successfully.

### Development Server

```bash
npm run dev
```

Hot module replacement enabled for fast development.

### Build

```bash
npm run build
```

Creates optimized production build.

## 📊 Data Flow (Quiz → Submit → Persistence)

- **Load quiz**: `QuizPlayerPage` calls `db.getQuiz(quizId)` and, for paper/subject master quizzes, `db.getPromptsForPaperMasterQuiz` / `db.getPromptsForSubjectMasterQuiz` to load prompts.
- **Per-question submit**: User submits an answer → `submitAnswer()` in `src/utils/submitAnswerPipeline.ts` runs: validate response, grade via `gradeFromRenderer`, update prompt-level mastery in localStorage, return result. **No per-question rows are written to Supabase** (the DB `attempts` table is quiz-level only).
- **Quiz completion**: When the quiz ends, `QuizPlayerPage.endQuiz()` builds one `Attempt` (correct/missed prompt IDs, time, accuracy) and saves it with `storage.saveAttempt(attempt)` (localStorage). Results are viewed at `/results/:attemptId`.
- **Sounds**: Toggle is persisted in localStorage (`grade9_sounds_enabled`) and restored on load.

See `src/utils/submitAnswerPipeline.ts` and `src/utils/storage.ts` for implementation details.

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Other Platforms

The app can be deployed to any platform that supports Node.js:
- Netlify
- AWS Amplify
- Railway
- Render
- Heroku

## 📚 Documentation

- **Page variants**: See `src/PAGE_VARIANTS.md` for canonical pages in use.
- **Development Status**: See `DEVELOPMENT_STATUS.md` (if present).
- **Supabase Docs**: https://supabase.com/docs
- **React Docs**: https://react.dev
- **Vite Docs**: https://vitejs.dev
- **TypeScript Docs**: https://www.typescriptlang.org/docs

## 🤝 Contributing

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Commit changes: `git commit -am 'Add feature'`
3. Push to branch: `git push origin feature/your-feature`
4. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see LICENSE file for details.

## 📞 Support

For issues or questions:
1. Check the documentation files (README, DEVELOPMENT_STATUS.md)
2. Review the error messages in the console (F12)
3. Check the GitHub repository for recent changes
4. Consult the documentation links above

## 🎓 About

Grade9 Sprint is a student revision platform designed to help students prepare for their Grade 9 exams through:
- Daily challenges for consistent practice
- Focused learning sprints
- Progress tracking and mastery indicators
- Subject-specific content organization
- Interactive quiz interface

---

**Last Updated**: February 2026
**Status**: Active development; typecheck passing
**Dev Server**: Running on port 5173
**Public URL**: https://revision-app-4.lindy.site
