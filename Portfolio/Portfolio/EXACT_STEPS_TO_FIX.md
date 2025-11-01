# 🎯 EXACT STEPS TO FIX 404 ERROR

Follow these steps **EXACTLY** in order:

## Step 1: Verify Netlify Dashboard Settings ⚙️

1. Go to **Netlify Dashboard**
2. Click on your site
3. Go to **Site settings** (gear icon)
4. Click **Build & deploy** in left sidebar
5. Click **Build settings** → **Edit settings**

Set these **EXACT** values:
```
Base directory:     Portfolio/Portfolio
Build command:      [COMPLETELY EMPTY - DELETE ANY TEXT]
Publish directory:  [COMPLETELY EMPTY - DELETE ANY TEXT]
Functions directory: [COMPLETELY EMPTY - DELETE ANY TEXT]
```

6. Click **Save**

## Step 2: Commit and Push Changes 📤

Run these commands in your terminal:
```bash
cd e:\Github_Repo\Portfolio
git add .
git commit -m "Fix 404 - simplified redirects"
git push
```

## Step 3: Wait for Netlify Auto-Deploy ⏳

1. Go to **Deploys** tab in Netlify
2. Wait for deployment to complete (green checkmark)
3. Click on the latest deploy
4. Check deploy log - it should say "Publishing directory..."

## Step 4: Clear Cache and Test 🧪

1. Open your site URL in **incognito/private browser window**
2. Try: `https://yoursite.netlify.app/`
3. Try: `https://yoursite.netlify.app/Pages/index.html`

## Step 5: Verify Files Are Published 📁

In Netlify deploy page:
1. Look for **"Published files"** or **"Browse files"**
2. Click to see what files Netlify published
3. You should see:
   - ✅ `Pages/index.html`
   - ✅ `Pages/contact.html`
   - ✅ `Style/styles.css`
   - ✅ `JavaScript/script.js`
   - ✅ `_redirects`

## If Still Getting 404:

### Check 1: Base Directory
- Go back to Step 1
- Make ABSOLUTELY SURE base directory is `Portfolio/Portfolio` (not just `Portfolio`)

### Check 2: Published Files
- If files don't appear in "Published files", the publish directory is wrong
- Go to Step 1 and ensure Publish directory is EMPTY

### Check 3: Deploy Logs
- Look at deploy log for errors
- Check if it says "Publishing directory: Portfolio/Portfolio/Portfolio"

### Check 4: Test Direct File Access
Try these URLs directly:
- `https://yoursite.netlify.app/Pages/index.html`
- `https://yoursite.netlify.app/Style/styles.css`

If these work but `/` doesn't → Redirect issue  
If these also 404 → Files not being published

## Quick Test Script

You can also test with curl (if you have it):
```bash
curl -I https://yoursite.netlify.app/
curl -I https://yoursite.netlify.app/Pages/index.html
```

Look for:
- `HTTP/2 200` = Working ✅
- `HTTP/2 404` = Still broken ❌

---

## What I Fixed Just Now:

✅ Simplified redirects in `netlify.toml`  
✅ Simplified `_redirects` file  
✅ Removed conflicting/duplicate files  
✅ Made configuration as simple as possible  

**The configuration is now correct. The issue is most likely in Netlify dashboard settings (Step 1).**

If you've completed all steps and it's still not working, please share:
1. Screenshot of your Netlify Build settings
2. What you see in "Published files"
3. The exact error you get when visiting your site



