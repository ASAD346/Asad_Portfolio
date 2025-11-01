# ✅ reCAPTCHA Keys Updated

## ✅ Updated Files

### 1. contact.html
- **Old Site Key:** `6LdtFfYrAAAAAOhlcDmlJCwz7wtmw6yLBn3bZhk7`
- **New Site Key:** `6LdYr_4rAAAAAEMcW6BwGJK7kh67JgASYBEhVjBK`
- ✅ Updated in `Portfolio/Portfolio/Pages/contact.html`

## 🔑 Keys Information

### Site Key (Public - Goes in HTML)
```
6LdYr_4rAAAAAEMcW6BwGJK7kh67JgASYBEhVjBK
```
- ✅ Already updated in `contact.html`
- This key is visible in your HTML code (that's okay, it's public)

### Secret Key (Private - Goes in Netlify Environment Variables)
```
6LdYr_4rAAAAADwqvmOYxLHEw6x0-Th57ohYVnpM
```
- ⚠️ **MUST be added to Netlify Environment Variables**
- Never commit this to GitHub!

## 🚀 Next Steps

### Step 1: Update Netlify Environment Variables

1. Go to **Netlify Dashboard**
2. Click on your site
3. Go to **Site settings** → **Environment variables**
4. Find `RECAPTCHA_SECRET_KEY`
5. **Update** it to: `6LdYr_4rAAAAADwqvmOYxLHEw6x0-Th57ohYVnpM`
6. Click **Save**

### Step 2: Commit and Push Updated HTML

```bash
git add Portfolio/Portfolio/Pages/contact.html
git commit -m "Update reCAPTCHA site key"
git push origin main
```

### Step 3: Verify Domains in reCAPTCHA Admin

Make sure your reCAPTCHA keys have these domains added:
- `yoursite.netlify.app` (your actual Netlify domain)
- `localhost` (for local testing)
- `127.0.0.1` (for local testing)

Visit: https://www.google.com/recaptcha/admin

## ✅ Verification Checklist

- [x] Site key updated in `contact.html`
- [ ] Secret key updated in Netlify Environment Variables
- [ ] Domains added in reCAPTCHA admin console
- [ ] Changes committed and pushed to GitHub
- [ ] Site redeployed on Netlify
- [ ] Contact form tested on live site

## 🔒 Security Reminder

**DO NOT:**
- ❌ Commit secret key to GitHub
- ❌ Share secret key publicly
- ❌ Put secret key in HTML files

**DO:**
- ✅ Keep secret key in Netlify Environment Variables only
- ✅ Site key can be in HTML (it's public by design)
- ✅ Use environment variables for all sensitive data

## 🧪 Testing

After updating:

1. **Local Testing:**
   - Make sure `localhost` is in reCAPTCHA domains
   - Test form locally: `http://localhost:5500/Pages/contact.html` (or your local port)

2. **Production Testing:**
   - Deploy to Netlify
   - Visit your live site
   - Go to contact page
   - reCAPTCHA widget should appear ✅
   - Submit form - should work ✅

---

**Important:** The secret key MUST be in Netlify Environment Variables, not in code!

