# ⚙️ Netlify Build Settings - Exact Configuration

## Critical Settings in Netlify Dashboard

When you get "Build script returned non-zero exit code: 2", it's almost always due to incorrect build settings.

### Step-by-Step Configuration

1. **Go to Netlify Dashboard**
   - Navigate to your site
   - Click **Site settings**

2. **Go to Build & Deploy**
   - Click **Build & deploy** in the left sidebar
   - Click **Build settings** section
   - Click **Edit settings** button

3. **Set These Values EXACTLY:**

   ```
   Base directory:     Portfolio/Portfolio
   
   Build command:      [LEAVE COMPLETELY EMPTY - DELETE ANY TEXT]
   
   Publish directory:  [LEAVE EMPTY - Will use "Portfolio" from netlify.toml]
   
   Functions directory: [LEAVE EMPTY - Will auto-detect "netlify/functions"]
   ```

4. **Save and Redeploy**
   - Click **Save**
   - Go to **Deploys** tab
   - Click **Trigger deploy** → **Deploy site**

## Visual Guide

```
┌─────────────────────────────────────────┐
│ Build settings                         │
├─────────────────────────────────────────┤
│ Base directory:                         │
│ [Portfolio/Portfolio          ]         │
│                                         │
│ Build command:                          │
│ [                                    ]  │  ← MUST BE EMPTY
│                                         │
│ Publish directory:                      │
│ [                                    ]  │  ← LEAVE EMPTY
│                                         │
│ Functions directory:                    │
│ [                                    ]  │  ← LEAVE EMPTY
└─────────────────────────────────────────┘
```

## Why This Works

- **Base directory** tells Netlify where your project root is
- **Build command** empty = no build step needed (static site)
- **Publish directory** comes from `netlify.toml` (`publish = "Portfolio"`)
- **Functions directory** auto-detects from `netlify.toml`

## Common Mistakes

❌ **WRONG:** Base directory = `Portfolio` (missing nested folder)
❌ **WRONG:** Build command = `npm install` or any other command
❌ **WRONG:** Publish directory = `Portfolio/Portfolio/Portfolio` (should be empty, uses netlify.toml)

✅ **CORRECT:** Base directory = `Portfolio/Portfolio`, everything else empty

## After Setting Correctly

After you set these correctly:
1. The build should succeed
2. Functions will automatically install dependencies
3. Your site will deploy successfully

## Still Not Working?

If it still fails after this:
1. Check the build logs (click on failed deploy)
2. Look for the actual error message
3. Share the error and I can help further

---

**Remember:** The base directory is the key! Set it to `Portfolio/Portfolio` and leave everything else empty.

