# Fixing Netlify Build Error

If you're getting "Build script returned non-zero exit code: 2", follow these steps:

## Step 1: Check Netlify Build Settings

In your Netlify dashboard, go to **Site settings** → **Build & deploy** → **Build settings**:

**IMPORTANT:** Set these values:
- **Base directory**: `Portfolio/Portfolio`
- **Publish directory**: `Portfolio` (relative to base directory, so it becomes `Portfolio/Portfolio/Portfolio`)
- **Build command**: Leave EMPTY (don't put anything here)
- **Functions directory**: Leave empty OR set to `netlify/functions` (Netlify should auto-detect)

## Step 2: Verify Function Structure

Make sure these files exist:
```
Portfolio/Portfolio/netlify/functions/contact.js
Portfolio/Portfolio/netlify/functions/package.json
```

## Step 3: Test Function Package.json Locally

Run this to verify the package.json is valid:
```bash
cd Portfolio/Portfolio/netlify/functions
npm install
```

If this fails, there's an issue with the package.json.

## Step 4: Alternative - Move netlify.toml

If the base directory approach doesn't work, try moving `netlify.toml` to the repository root (one level up) and update paths accordingly.

## Step 5: Check Build Logs

In Netlify dashboard, click on the failed deploy and check the build logs. Look for:
- npm install errors
- Path errors
- Syntax errors in JavaScript files

## Quick Fix Option

If npm install is the issue, you can temporarily remove the nodemailer dependency and use a simpler approach. But first, try setting the base directory correctly in Netlify dashboard - that fixes 90% of these errors.

