# 🔐 reCAPTCHA Domain Setup for Netlify

## Domains to Add When Creating reCAPTCHA Keys

### Step 1: Go to Google reCAPTCHA Admin
Visit: https://www.google.com/recaptcha/admin

### Step 2: Create or Edit Your Site

When creating/editing reCAPTCHA keys, in the **"Domains"** field, add:

#### For Netlify Deployment:

1. **Your Netlify Domain** (Required):
   ```
   yoursite.netlify.app
   ```
   Replace `yoursite` with your actual Netlify site name.
   
   **Example:** If your site is `https://myportfolio.netlify.app`, add:
   ```
   myportfolio.netlify.app
   ```

2. **localhost** (For Local Development - Recommended):
   ```
   localhost
   127.0.0.1
   ```
   This allows you to test the form locally during development.

3. **Custom Domain** (If you have one):
   ```
   yourcustomdomain.com
   www.yourcustomdomain.com
   ```
   Add this if you've set up a custom domain in Netlify.

### Complete Example:

If your Netlify site is `https://myportfolio.netlify.app`:

**Domains field should contain:**
```
myportfolio.netlify.app
localhost
127.0.0.1
```

**Or if you have a custom domain:**
```
myportfolio.netlify.app
yourname.com
www.yourname.com
localhost
127.0.0.1
```

## Important Notes

### ✅ DO Add:
- Your Netlify domain (`.netlify.app`)
- localhost (for testing)
- Custom domains (if applicable)

### ❌ DON'T Add:
- `http://` or `https://` prefixes (just the domain)
- Port numbers (like `localhost:3000`)
- Paths (like `yoursite.netlify.app/Pages/contact.html`)

### Format:
- One domain per line, OR
- Comma-separated on same line

## How to Find Your Netlify Domain

1. Go to **Netlify Dashboard**
2. Click on your site
3. Your domain is shown at the top, like:
   ```
   https://your-site-name.netlify.app
   ```
4. Use just: `your-site-name.netlify.app` (without `https://`)

## After Adding Domains

1. **Save** the reCAPTCHA configuration
2. Copy the **Site Key** and **Secret Key**
3. **Site Key** goes in your HTML (already in `contact.html`)
4. **Secret Key** goes in Netlify Environment Variables as `RECAPTCHA_SECRET_KEY`

## Current Setup

Based on your `contact.html`, you're using:
- Site Key: `6LdtFfYrAAAAAOhlcDmlJCwz7wtmw6yLBn3bZhk7`

Make sure this Site Key's domains include:
- Your Netlify domain
- localhost (for testing)

## Verification

To verify it's working:
1. Add domains in reCAPTCHA admin
2. Deploy to Netlify
3. Visit your contact page
4. reCAPTCHA widget should appear ✅
5. Submit form - should work ✅

---

**Quick Reference:**
- **Netlify Domain:** `[your-site-name].netlify.app`
- **Local Development:** `localhost`, `127.0.0.1`
- **Custom Domain:** (if you have one set up in Netlify)

