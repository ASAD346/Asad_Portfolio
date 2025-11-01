# 🚀 Final Netlify Setup for ASAD346/Asad_Portfolio

Based on your GitHub repo: `github.com/ASAD346/Asad_Portfolio`

## 📋 Repository Structure

Your repository structure should be:
```
Asad_Portfolio/
├── Portfolio/
│   ├── Portfolio/          ← This is your publish directory
│   │   ├── Pages/
│   │   ├── Style/
│   │   ├── JavaScript/
│   │   ├── Images/
│   │   └── _redirects       ← Must be here!
│   ├── netlify/
│   │   └── functions/
│   │       ├── contact.js
│   │       └── package.json
│   └── netlify.toml         ← Must be here!
```

## ⚙️ Netlify Dashboard Configuration

### Step 1: Connect Repository
1. Go to [Netlify Dashboard](https://app.netlify.com)
2. Add new site → Import an existing project
3. Connect to GitHub
4. Select repository: `ASAD346/Asad_Portfolio`

### Step 2: Build Settings
Once connected, set these **EXACT** values:

```
Repository:        ASAD346/Asad_Portfolio
Base directory:    Portfolio/Portfolio
Build command:     [EMPTY - LEAVE BLANK]
Publish directory: [EMPTY - LEAVE BLANK]
Branch to deploy:  main (or master)
```

**IMPORTANT:** 
- Base directory must be `Portfolio/Portfolio`
- Publish directory must be EMPTY (it will use `publish = "Portfolio"` from netlify.toml)

## 📁 File Locations

### Critical Files That Must Exist:

1. **netlify.toml** 
   - Location: `Portfolio/Portfolio/netlify.toml`
   - This configures the build

2. **_redirects**
   - Location: `Portfolio/Portfolio/Portfolio/_redirects`
   - This handles URL routing

3. **Functions**
   - Location: `Portfolio/Portfolio/netlify/functions/contact.js`
   - Location: `Portfolio/Portfolio/netlify/functions/package.json`

## 🔧 Environment Variables

Go to **Site settings** → **Environment variables** and add:

```
RECAPTCHA_SECRET_KEY=your_secret_key_here
SMTP_SERVER=smtp.gmail.com
SMTP_PORT=587
SMTP_USERNAME=your_email@gmail.com
SMTP_PASSWORD=your_app_password
FROM_EMAIL=your_email@gmail.com
FROM_NAME=Portfolio Contact Form
TO_EMAIL=your_email@gmail.com
TO_NAME=Muhammad Asad Khan
```

## ✅ Verification Checklist

After deploying, verify:

- [ ] Base directory = `Portfolio/Portfolio`
- [ ] Publish directory = EMPTY
- [ ] Build command = EMPTY
- [ ] Files published: Check "Published files" shows Pages/, Style/, JavaScript/, etc.
- [ ] `https://yoursite.netlify.app/` works
- [ ] `https://yoursite.netlify.app/Pages/index.html` works
- [ ] Contact form submits (after env vars are set)

## 🐛 Troubleshooting

### If you get 404:
1. Check base directory is `Portfolio/Portfolio` (not `Portfolio`)
2. Check publish directory is EMPTY
3. Verify `_redirects` file is in `Portfolio/Portfolio/Portfolio/_redirects`
4. Check deploy logs for "Publishing directory..."

### If build fails:
1. Check `netlify/functions/package.json` exists
2. Verify nodemailer is listed in dependencies
3. Check build logs for npm errors

### If contact form doesn't work:
1. Verify all environment variables are set
2. Check function logs in Netlify dashboard
3. Test function endpoint: `/.netlify/functions/contact`

## 📝 Quick Reference

**Repository URL:** `https://github.com/ASAD346/Asad_Portfolio`  
**Base Directory:** `Portfolio/Portfolio`  
**Publish Directory:** `Portfolio` (from netlify.toml, relative to base)  
**Functions Directory:** `netlify/functions` (auto-detected)

## 🎯 What Happens When You Deploy

1. Netlify clones your repo
2. Sets base directory to `Portfolio/Portfolio`
3. Reads `netlify.toml` for config
4. Installs function dependencies (nodemailer)
5. Publishes `Portfolio/Portfolio/Portfolio/` folder
6. Sets up redirects from `_redirects` file
7. Site goes live! 🎉

---

**Your configuration is ready! Just make sure the Netlify dashboard settings match above.**



