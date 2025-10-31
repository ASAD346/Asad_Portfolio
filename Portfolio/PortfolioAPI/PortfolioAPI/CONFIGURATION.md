# API Configuration Guide

## 1. Update appsettings.json

Open `appsettings.json` and replace the placeholder values:

### reCAPTCHA Settings
```json
"ReCaptcha": {
  "SiteKey": "YOUR_SITE_KEY",      // Not used in backend, but kept for reference
  "SecretKey": "YOUR_SECRET_KEY"   // ⚠️ IMPORTANT: Add your reCAPTCHA Secret Key here
}
```

### Email Settings (Gmail Example)

#### Option 1: Using Gmail
```json
"EmailSettings": {
  "SmtpServer": "smtp.gmail.com",
  "SmtpPort": "587",
  "SmtpUsername": "your-email@gmail.com",        // Your Gmail address
  "SmtpPassword": "your-app-password",           // ⚠️ App Password (NOT your Gmail password)
  "FromEmail": "your-email@gmail.com",
  "FromName": "Portfolio Contact Form",
  "ToEmail": "sasadkhan08@gmail.com",            // Where you want to receive emails
  "ToName": "Your Name"
}
```

**To get Gmail App Password:**
1. Go to https://myaccount.google.com/security
2. Enable 2-Step Verification (if not already enabled)
3. Go to https://myaccount.google.com/apppasswords
4. Create an app password for "Mail"
5. Copy the 16-character password (no spaces)
6. Use this as `SmtpPassword`

#### Option 2: Using Outlook/Hotmail
```json
"EmailSettings": {
  "SmtpServer": "smtp-mail.outlook.com",
  "SmtpPort": "587",
  "SmtpUsername": "your-email@outlook.com",
  "SmtpPassword": "your-password",
  "FromEmail": "your-email@outlook.com",
  "FromName": "Portfolio Contact Form",
  "ToEmail": "sasadkhan08@gmail.com",
  "ToName": "Your Name"
}
```

## 2. Run the API

```powershell
cd "E:\VISUAL BASIC C#\UNIVERSITY\Portfolio\PortfolioAPI\PortfolioAPI"
dotnet run
```

You should see:
```
info: Microsoft.Hosting.Lifetime[14]
      Now listening on: http://localhost:5000
info: Microsoft.Hosting.Lifetime[14]
      Now listening on: https://localhost:5001
```

## 3. Test the API

### Test 1: Check if API is running
Open browser: http://localhost:5000/api/contact/test

Should return:
```json
{
  "message": "API is running!",
  "timestamp": "2025-10-25T..."
}
```

### Test 2: Test with Postman (Optional)
POST to: http://localhost:5000/api/contact

Body (JSON):
```json
{
  "name": "Test User",
  "email": "test@example.com",
  "subject": "Test Subject",
  "message": "Test message",
  "captcha": "5",
  "recaptchaResponse": "test-token"
}
```

## 4. Security Notes

⚠️ **IMPORTANT:**
- Never commit `appsettings.json` with real passwords to GitHub
- Use `appsettings.Development.json` for local development
- Use environment variables or Azure Key Vault for production

## 5. Troubleshooting

### "CORS error" in browser
- Check that your frontend URL is in the CORS policy in `Program.cs`
- Default allowed: `http://localhost:5500`, `http://127.0.0.1:5500`

### "Failed to send email"
- Check Gmail app password is correct
- Ensure 2-Step Verification is enabled for Gmail
- Try Outlook/Hotmail if Gmail doesn't work

### "reCAPTCHA verification failed"
- Ensure you've added the Secret Key to appsettings.json
- Check that the frontend is sending the reCAPTCHA token

### Port already in use
- Stop other apps using port 5000
- Or change the port in `Properties/launchSettings.json`

## 6. Next Steps

Once the API is running:
1. Keep this terminal open (API must be running)
2. Open your portfolio contact page in browser
3. Fill out and submit the form
4. Check your email!

## 7. For Production Deployment

When deploying to Azure/Railway:
1. Don't include passwords in appsettings.json
2. Use environment variables instead
3. Update CORS policy with your actual domain
4. Enable HTTPS only
