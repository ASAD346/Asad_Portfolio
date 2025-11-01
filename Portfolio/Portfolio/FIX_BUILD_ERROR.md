# 🔧 Fixing "Build script returned non-zero exit code: 2"

This error usually means Netlify's build process failed. Here's how to fix it:

## ✅ Solution 1: Set Base Directory (Most Common Fix)

In your Netlify dashboard:

1. Go to **Site settings** → **Build & deploy** → **Build settings**
2. Click **Edit settings**
3. Set **Base directory** to: `Portfolio/Portfolio`
4. Leave **Build command** EMPTY (blank)
5. Leave **Publish directory** EMPTY (it will use the one from netlify.toml)
6. Leave **Functions directory** EMPTY (auto-detects from netlify.toml)

**Then redeploy** - this should fix it!

## ✅ Solution 2: Check Function Dependencies

The function needs `nodemailer`. Verify:
- `netlify/functions/package.json` exists
- It contains `"nodemailer": "^6.9.7"`

Netlify will automatically install this during deployment.

## ✅ Solution 3: Verify File Structure

Make sure your repo structure looks like this:
```
Portfolio/
  └── Portfolio/
      ├── netlify.toml
      ├── Portfolio/
      │   ├── Pages/
      │   ├── JavaScript/
      │   └── ...
      └── netlify/
          └── functions/
              ├── contact.js
              └── package.json
```

## ✅ Solution 4: Check Build Logs

1. In Netlify dashboard, click on the failed deployment
2. Scroll to see the actual error message
3. Common errors:
   - "npm install failed" → Check package.json syntax
   - "Cannot find module" → Dependencies not installed
   - "Path not found" → Base directory wrong

## ✅ Solution 5: Alternative - Simpler Config

If still failing, try this in netlify.toml (simpler version):

```toml
[build]
  publish = "Portfolio"

[functions]
  directory = "netlify/functions"
```

And set Base directory in Netlify dashboard to `Portfolio/Portfolio`.

## 🎯 Most Likely Fix

**90% of the time**, this error is fixed by setting the **Base directory** to `Portfolio/Portfolio` in Netlify dashboard and leaving Build command empty.

Try Solution 1 first!



