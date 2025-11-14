# 🚀 VERCEL FIX - 2 Minute Setup

## The Issue
Your Next.js app moved from root → `apps/web/` during monorepo setup.
Vercel is still looking at the root and can't find `.next/routes-manifest.json`.

## ✅ Solution (Choose One)

### Option A: Vercel Dashboard (Easiest - 2 minutes)

1. Go to: https://vercel.com/dashboard
2. Click on your **creatorhub-v2** project
3. Click **Settings** (top menu)
4. Scroll down to **Build & Development Settings**
5. Click **Edit** next to Root Directory
6. Type: `apps/web`
7. Click **Save**
8. Go to **Deployments** tab
9. Click **⋯** on the latest deployment → **Redeploy**

**That's it!** Your next deployment will work.

---

### Option B: Vercel CLI (If you prefer terminal)

Run these commands in your terminal:

```bash
cd /Users/vigeashgobal/Desktop/creatorhub-v2

# Install Vercel CLI if needed
npm i -g vercel

# Link to your project (if not already linked)
vercel link

# Set root directory
vercel --cwd apps/web --prod

# Or deploy with the correct settings
vercel --prod --cwd apps/web
```

---

## What Happens After

✅ Vercel finds `apps/web/.next/` instead of `.next/`  
✅ Routes manifest located correctly  
✅ Deployment succeeds  
✅ Your gamification system goes live!

---

## Verify It Worked

After redeploying, you should see:
```
✓ Build completed successfully
✓ Deployment ready
```

No more "routes-manifest.json couldn't be found" error!

