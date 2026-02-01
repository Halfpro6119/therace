# Port Configuration Guide

## Current Setup

The Grade9 Sprint Revision App is configured to run on **port 5173** (Vite default).

### Public URLs

**Working URL**: https://revision-app-4.lindy.site
- ✅ This is the correct URL to access the app
- ✅ Dev server is running on port 5173
- ✅ All features working properly

**Non-Working URL**: https://revision-app-6.lindy.site
- ❌ This URL points to port 5177 (which is not running)
- ❌ Will show "Closed Port Error"
- ❌ Do NOT use this URL

## Why This Happens

Vite automatically assigns ports starting from 5173. If port 5173 is in use, it tries 5174, 5175, 5176, 5177, etc.

The public URL generation creates a new URL for each port, so multiple URLs may be generated.

## Solution

**Always use**: https://revision-app-4.lindy.site

This is the stable URL that points to port 5173 where the dev server is running.

## Vite Configuration

File: `vite.config.ts`

```typescript
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: false,  // Allow fallback to other ports if 5173 is busy
    allowedHosts: [
      '.lindy.site',
      '.e2b.app',
      'localhost',
      '127.0.0.1',
      '5173-i83lf3zh3pn7jc82av36f.e2b.app'
    ],
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'lucide-react'],
  },
});
```

## How to Access the App

1. **Via Website Button**: Click the website button in Lindy Computer
2. **Via Direct URL**: Navigate to https://revision-app-4.lindy.site
3. **Via Terminal**: Run `npm run dev` and visit http://localhost:5173

## Troubleshooting

If you get a "Closed Port Error":
1. Check that the dev server is running: `ps aux | grep vite`
2. Verify the correct URL is being used: https://revision-app-4.lindy.site
3. Restart the dev server if needed: `npm run dev`

## Status

✅ App is running and accessible on https://revision-app-4.lindy.site
✅ All features working properly
✅ Supabase integration verified
✅ Ready for development
