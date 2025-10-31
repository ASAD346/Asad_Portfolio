# 🚀 Quick Deploy to Netlify

## Fast Track Deployment

### 1. Push to Git
```bash
git add .
git commit -m "Setup Netlify deployment"
git push
```

### 2. Connect to Netlify
- Go to [netlify.com](https://www.netlify.com)
- Click "Add new site" → "Import an existing project"
- Select your repository

### 3. Build Settings (Auto-detected from netlify.toml)
- Base directory: `Portfolio/Portfolio`
- Publish directory: `Portfolio/Portfolio/Portfolio`  
- Build command: (leave empty)

### 4. Set Environment Variables
In Netlify Dashboard → Site settings → Environment variables, add:

```
RECAPTCHA_SECRET_KEY=6LdtFfYrAAAAAE5B0AcApR37zAoDrz4tAAk7GWb3
SMTP_SERVER=smtp.gmail.com
SMTP_PORT=587
SMTP_USERNAME=sasadkhan08@gmail.com
SMTP_PASSWORD=snvstjwfpankivuy
FROM_EMAIL=sasadkhan08@gmail.com
FROM_NAME=Portfolio Contact Form
TO_EMAIL=sasadkhan08@gmail.com
TO_NAME=Muhammad Asad Khan
```

⚠️ **Security Note**: The values above are from your config file. For production, consider using more secure credentials.

### 5. Deploy!
Click "Deploy site" and wait. Your site will be live in ~2 minutes! 🎉

## Testing Locally

```bash
npm install -g netlify-cli
cd Portfolio/Portfolio
netlify dev
```

## Need Help?
See `NETLIFY_DEPLOYMENT.md` for detailed instructions.

