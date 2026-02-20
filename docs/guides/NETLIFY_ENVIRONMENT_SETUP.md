# Netlify Environment Variables Setup Guide

## Problem

Your Netlify deployment is using a **different Supabase URL** than your local development:

- **Local (working)**: `https://hivklkobksraktxynacv.supabase.co`
- **Netlify (broken)**: `https://cucktqjuqrhgivquijul.supabase.co`

This causes the error: `net::ERR_NAME_NOT_RESOLVED` when trying to fetch from the wrong Supabase project.

## Root Cause

The `.env.local` file only works for **local development**. When Netlify builds and deploys your app, it uses **environment variables configured in the Netlify dashboard**, not `.env.local`.

The Netlify dashboard currently has environment variables pointing to the old/wrong Supabase project.

## Solution: Update Netlify Environment Variables

### Step 1: Access Netlify Dashboard

1. Go to [https://app.netlify.com](https://app.netlify.com)
2. Log in to your account
3. Select your site (therace or revision-app)

### Step 2: Navigate to Environment Variables

1. Click on **Site settings** (or **Project configuration**)
2. Go to **Build & deploy** → **Environment**
3. Click on **Environment variables** section

### Step 3: Add/Update Variables

You need to set these two variables:

**Variable 1: VITE_SUPABASE_URL**
- **Key**: `VITE_SUPABASE_URL`
- **Value**: `https://hivklkobksraktxynacv.supabase.co`
- **Deploy contexts**: Select all (Production, Deploy Previews, Branch deploys)

**Variable 2: VITE_SUPABASE_ANON_KEY**
- **Key**: `VITE_SUPABASE_ANON_KEY`
- **Value**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhpdmtsa29ia3NyYWt0eHluYWN2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg3Mjg3ODgsImV4cCI6MjA4NDMwNDc4OH0.uE-sYNcGsQO7mzOcj8N2Uidx2f5GCKkLtNjU3krpTt0`
- **Deploy contexts**: Select all
- **Mark as secret**: Yes (to prevent exposure in logs)

### Step 4: Delete Old Variables (if they exist)

If you see any of these old variables in the Netlify dashboard, **delete them**:
- `VITE_SUPABASE_URL` pointing to `cucktqjuqrhgivquijul.supabase.co`
- `VITE_SUPABASE_ANON_KEY` pointing to the old project

### Step 5: Trigger a New Deploy

After updating the environment variables:

1. Go to **Deploys** tab
2. Click **Trigger deploy** → **Deploy site**
3. Wait for the build to complete
4. Check the deployed site for the error

### Step 6: Verify the Fix

After the new deploy completes:

1. Open your Netlify site in browser
2. Open DevTools (F12)
3. Go to **Console** tab
4. Check for the error message
5. Should now see requests to: `https://hivklkobksraktxynacv.supabase.co/rest/v1/...`
6. Status should be **200 OK** (not ERR_NAME_NOT_RESOLVED)

## Why This Happens

**Local Development** (`.env.local`):
```
VITE_SUPABASE_URL=https://hivklkobksraktxynacv.supabase.co
```
✅ Works because `.env.local` is read by Vite dev server

**Netlify Deployment** (Netlify Dashboard):
```
VITE_SUPABASE_URL=https://cucktqjuqrhgivquijul.supabase.co  ❌ OLD/WRONG
```
❌ Doesn't work because Netlify uses dashboard variables, not `.env.local`

## Important Notes

1. **`.env.local` is NOT deployed**: This file is in `.gitignore` and never sent to Netlify
2. **Netlify uses dashboard variables**: All environment variables must be set in the Netlify dashboard
3. **VITE_ prefix is important**: Variables must start with `VITE_` to be accessible in client-side code
4. **Redeploy required**: After changing environment variables, you must trigger a new deploy
5. **Different projects per environment**: You can set different Supabase projects for Production vs Preview deploys

## Troubleshooting

**Still seeing old URL after deploy?**
- Clear browser cache (Ctrl+Shift+Delete)
- Hard refresh (Ctrl+Shift+R)
- Check Netlify build logs for environment variable values

**Can't find Environment Variables section?**
- Make sure you're in **Site settings** (not Team settings)
- Look for **Build & deploy** → **Environment**
- If still missing, try accessing via: `https://app.netlify.com/sites/[SITE-NAME]/settings/deploys#environment`

**Build still failing?**
- Check Netlify build logs for errors
- Verify the exact Supabase URL and key are correct
- Make sure there are no extra spaces or quotes in the values

## Next Steps

1. ✅ Update environment variables in Netlify dashboard
2. ✅ Trigger a new deploy
3. ✅ Verify the fix in browser console
4. ✅ Test all app functionality

## Reference

- Netlify Docs: https://docs.netlify.com/build/environment-variables/get-started/
- Your Supabase URL: `https://hivklkobksraktxynacv.supabase.co`
- Your Netlify Site: Check your site URL in Netlify dashboard
