# Vercel Deployment Setup for Monorepo

## Issue
The build completes successfully but Vercel can't find the Next.js routes manifest because this is a Turbo monorepo with the app in `apps/web`.

## Solution

### Configure Vercel Project Settings:

1. Go to your Vercel project settings
2. Navigate to **Settings** → **General** → **Build & Development Settings**
3. Set the following:
   - **Framework Preset**: Next.js
   - **Root Directory**: `apps/web`
   - **Build Command**: `cd ../.. && pnpm turbo build --filter=web` (or leave default if using turbo)
   - **Output Directory**: `.next` (default)
   - **Install Command**: `pnpm install` (or leave default)

### Alternative: Use Vercel CLI

If you prefer to configure via CLI:

```bash
# In your project root
vercel link

# Then redeploy
vercel --prod
```

### Environment Variables

Make sure to add these environment variables in Vercel project settings if needed:
- `APIFY_API_KEY`
- `APIFY_USER_ID`
- `OPENAI_API_KEY`

Or add them to `turbo.json` under `globalEnv` if they're needed during build.

## Verification

After setting the Root Directory to `apps/web`, redeploy and the build should complete successfully.

