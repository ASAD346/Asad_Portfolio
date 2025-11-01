# Netlify Deployment Guide

This guide will help you deploy your portfolio to Netlify.

## 📋 Prerequisites

1. A Netlify account (free account works fine)
2. Your portfolio code in a Git repository (GitHub, GitLab, or Bitbucket)

## 🚀 Deployment Steps

### Step 1: Push Your Code to GitHub/GitLab/Bitbucket

If you haven't already, push your code to a Git repository:

```bash
git add .
git commit -m "Prepare for Netlify deployment"
git push origin main
```

### Step 2: Connect to Netlify

1. Go to [Netlify](https://www.netlify.com/) and sign in
2. Click "Add new site" → "Import an existing project"
3. Connect your Git provider (GitHub, GitLab, or Bitbucket)
4. Select your portfolio repository

### Step 3: Configure Build Settings

In Netlify, set the following build settings:

- **Base directory**: `Portfolio/Portfolio`
- **Publish directory**: `Portfolio/Portfolio/Portfolio`
- **Build command**: Leave empty (no build step needed for static site)
- **Functions directory**: `Portfolio/Portfolio/netlify/functions` (or leave empty if Netlify auto-detects)

Alternatively, Netlify will automatically detect the `netlify.toml` file and use those settings.

### Step 4: Set Environment Variables

Go to **Site settings** → **Environment variables** and add the following:

**Required Variables:**
```
RECAPTCHA_SECRET_KEY=your_recaptcha_secret_key_here
SMTP_SERVER=smtp.gmail.com
SMTP_PORT=587
SMTP_USERNAME=your_email@gmail.com
SMTP_PASSWORD=your_app_password_here
FROM_EMAIL=your_email@gmail.com
FROM_NAME=Portfolio Contact Form
TO_EMAIL=your_email@gmail.com
TO_NAME=Your Name
```

**Important Notes:**
- For Gmail, you'll need to use an [App Password](https://support.google.com/accounts/answer/185833) instead of your regular password
- For the reCAPTCHA secret key, get it from [Google reCAPTCHA Admin](https://www.google.com/recaptcha/admin)

### Step 5: Deploy

1. Click "Deploy site"
2. Wait for the deployment to complete
3. Your site will be live at `https://your-site-name.netlify.app`

## 🔧 Function Dependencies

The Netlify Function requires `nodemailer`. Netlify will automatically install dependencies from `netlify/functions/package.json` during deployment.

If you need to test the function locally, navigate to the functions directory and install dependencies:

```bash
cd Portfolio/Portfolio/netlify/functions
npm install
```

## 🧪 Testing Locally

To test your site locally before deploying:

1. Install Netlify CLI:
   ```bash
   npm install -g netlify-cli
   ```

2. Navigate to your project directory:
   ```bash
   cd Portfolio/Portfolio
   ```

3. Start the local development server:
   ```bash
   netlify dev
   ```

   This will:
   - Serve your static site
   - Run your Netlify Functions locally
   - Allow you to test the contact form

## 📝 Post-Deployment Checklist

- [ ] Test the contact form submission
- [ ] Verify all pages load correctly
- [ ] Check that images and assets load properly
- [ ] Test on mobile devices
- [ ] Verify reCAPTCHA is working
- [ ] Check email delivery (submit a test form)
- [ ] Set up a custom domain (optional)

## 🔒 Security Notes

1. **Never commit sensitive data** like API keys or passwords to Git
2. Always use environment variables for secrets
3. Your reCAPTCHA site key (in HTML) is public - that's fine
4. Your reCAPTCHA secret key should be in environment variables only

## 🐛 Troubleshooting

### Contact Form Not Working

1. Check that all environment variables are set correctly
2. Verify reCAPTCHA secret key matches your site key
3. Check Netlify Function logs: **Site settings** → **Functions** → **View logs**
4. Ensure SMTP credentials are correct (especially Gmail App Password)

### Functions Not Deploying

1. Verify `netlify/functions/package.json` exists
2. Check that `nodemailer` is listed as a dependency
3. Review build logs for errors

### Pages Not Loading

1. Check the `_redirects` file in your publish directory
2. Verify file paths in HTML (they should be relative)
3. Ensure `netlify.toml` has correct publish directory

## 📚 Additional Resources

- [Netlify Documentation](https://docs.netlify.com/)
- [Netlify Functions Guide](https://docs.netlify.com/functions/overview/)
- [Environment Variables in Netlify](https://docs.netlify.com/environment-variables/overview/)

## 🎉 Success!

Once deployed, your portfolio will be live and accessible to the world! Share your site URL with potential employers and clients.


