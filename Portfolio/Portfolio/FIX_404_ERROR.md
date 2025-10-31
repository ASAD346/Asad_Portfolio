# 🔧 Fixing 404 "Page Not Found" Error

If you're seeing "Page not found" on your Netlify site, here's how to fix it:

## Quick Fix

The issue is with routing/redirects. Follow these steps:

### Step 1: Verify Publish Directory

In Netlify Dashboard → Site settings → Build & deploy:
- **Base directory**: `Portfolio/Portfolio`
- **Publish directory**: Should be **EMPTY** (uses `Portfolio` from netlify.toml)

This means Netlify publishes: `Portfolio/Portfolio/Portfolio/` folder contents.

### Step 2: Check File Structure

Your site files should be at:
```
Portfolio/Portfolio/Portfolio/
  ├── Pages/
  │   ├── index.html
  │   ├── contact.html
  │   └── ...
  ├── JavaScript/
  ├── Style/
  ├── Images/
  └── _redirects  ← This file must be here!
```

### Step 3: Verify _redirects File Location

The `_redirects` file MUST be in the publish directory root:
- ✅ Correct: `Portfolio/Portfolio/Portfolio/_redirects`
- ❌ Wrong: `Portfolio/Portfolio/_redirects`

### Step 4: Test URLs

After deploying, try these URLs:
- `https://yoursite.netlify.app/` → Should show index.html
- `https://yoursite.netlify.app/Pages/index.html` → Should work
- `https://yoursite.netlify.app/Pages/contact.html` → Should work

### Step 5: Redeploy

After making changes:
1. Commit and push to Git
2. Netlify will auto-deploy
3. Wait for deployment to complete
4. Clear browser cache and try again

## Common Issues

### Issue 1: Wrong Base Directory
❌ Base directory = `Portfolio`  
✅ Base directory = `Portfolio/Portfolio`

### Issue 2: _redirects File in Wrong Location
The `_redirects` file must be in the **publish directory root**, not in the base directory.

### Issue 3: Aggressive Redirects
If redirects are too aggressive, they might catch all requests. The updated `_redirects` file allows existing files to be served first.

## Alternative: Move index.html to Root

If you want simpler URLs, you could move `index.html` to the root of the publish directory. But the current setup with `/Pages/index.html` should work fine with the updated redirects.

## Still Getting 404?

1. **Check deploy logs** in Netlify - see if files are being published
2. **Check deploy summary** - verify which files were uploaded
3. **Try accessing** `/Pages/index.html` directly
4. **Check browser console** for any errors

---

**The most common fix:** Make sure the `_redirects` file is in `Portfolio/Portfolio/Portfolio/_redirects` and redeploy.

