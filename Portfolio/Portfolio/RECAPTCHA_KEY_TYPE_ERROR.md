# ❌ reCAPTCHA "Invalid key type" Error - Fix

## Problem

You're getting: **"ERROR for site owner: Invalid key type"**

This happens when:
1. **reCAPTCHA keys type mismatch** (v2 vs v3)
2. **Site key and Secret key don't match** (from different key pairs)
3. **HTML using wrong reCAPTCHA version**

## Current Setup Analysis

### Your HTML Uses:
```html
<script src="https://www.google.com/recaptcha/api.js"></script>
<div class="g-recaptcha" data-sitekey="..."></div>
```

This is **reCAPTCHA v2 (Checkbox)** ✅

### Your Keys:
- Site Key: `6LdYr_4rAAAAAEMcW6BwGJK7kh67JgASYBEhVjBK`
- Secret Key: `6LdYr_4rAAAAADwqvmOYxLHEw6x0-Th57ohYVnpM`

These might be **reCAPTCHA v3** keys, which is why you're getting the error!

## Solution Options

### Option 1: Create New reCAPTCHA v2 Keys (Recommended)

1. Go to: https://www.google.com/recaptcha/admin
2. Click **"+"** to create a new site
3. **Label:** Portfolio Contact Form
4. **reCAPTCHA type:** Select **"reCAPTCHA v2"** → **"I'm not a robot" Checkbox**
5. **Domains:** Add:
   - `yoursite.netlify.app` (your Netlify domain)
   - `localhost`
   - `127.0.0.1`
6. Click **Submit**
7. **Copy the new Site Key and Secret Key**

### Option 2: Switch to reCAPTCHA v3 (If your keys are v3)

If your keys are actually v3, you need to change your HTML:

**Remove:**
```html
<script src="https://www.google.com/recaptcha/api.js"></script>
<div class="g-recaptcha" data-sitekey="..."></div>
```

**Add:**
```html
<script src="https://www.google.com/recaptcha/api.js?render=YOUR_SITE_KEY"></script>
```

And update JavaScript to use v3 API.

**But this is more complex - Option 1 is easier!**

## Recommended Fix: Create v2 Keys

### Step 1: Create New Keys

1. Visit: https://www.google.com/recaptcha/admin
2. Click **"+"** button (Create new site)
3. Fill in:
   - **Label:** Portfolio Contact Form
   - **reCAPTCHA type:** 
     - Select: **reCAPTCHA v2**
     - Then select: **"I'm not a robot" Checkbox**
   - **Domains:** 
     ```
     yoursite.netlify.app
     localhost
     127.0.0.1
     ```
4. Accept terms and click **Submit**

### Step 2: Get New Keys

After creating, you'll get:
- **Site Key** (public) - starts with `6L` usually
- **Secret Key** (private) - also starts with `6L`

### Step 3: Update Your Files

1. **Update contact.html:**
   ```html
   <div class="g-recaptcha" data-sitekey="YOUR_NEW_SITE_KEY"></div>
   ```

2. **Update Netlify Environment Variable:**
   - Go to Netlify Dashboard
   - Environment variables
   - Update `RECAPTCHA_SECRET_KEY` with new secret key

### Step 4: Delete Old Keys (Optional)

You can delete the old keys in reCAPTCHA admin if you're not using them.

## Quick Check: What Type Are Your Keys?

### reCAPTCHA v2 Keys:
- Usually start with: `6L...` (for checkbox)
- Work with: `<div class="g-recaptcha">`

### reCAPTCHA v3 Keys:
- Usually start with: `6L...` (but different format)
- Need: `?render=SITE_KEY` in script src
- Work differently (invisible, score-based)

## Verify Your Keys Match

**Important:** Site Key and Secret Key must be from the **same key pair**!

- ✅ Same key pair = Both from same reCAPTCHA site configuration
- ❌ Different pairs = Error!

## After Creating v2 Keys

1. Update `contact.html` with new site key
2. Update Netlify `RECAPTCHA_SECRET_KEY` with new secret key
3. Commit and push
4. Redeploy
5. Test contact form

---

**Most likely fix:** Create new reCAPTCHA v2 (checkbox) keys that match your HTML code!

