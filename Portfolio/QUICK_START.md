# Portfolio Contact Form - Quick Start Guide

## 🎉 What You Built

You now have a **professional contact form system** with:
- ✅ Math CAPTCHA (client-side bot protection)
- ✅ Google reCAPTCHA (advanced bot protection)
- ✅ ASP.NET Core backend API
- ✅ Server-side reCAPTCHA verification
- ✅ Email sending via SMTP
- ✅ Full security and control

## 📋 Setup Checklist

### 1. Configure API Settings (5 minutes)

Open: `PortfolioAPI\PortfolioAPI\appsettings.json`

**Replace these values:**

```json
{
  "ReCaptcha": {
    "SecretKey": "YOUR_RECAPTCHA_SECRET_KEY"  // ⚠️ Add your Secret Key
  },
  "EmailSettings": {
    "SmtpUsername": "your-email@gmail.com",   // ⚠️ Your email
    "SmtpPassword": "your-app-password",      // ⚠️ Gmail App Password
    "FromEmail": "your-email@gmail.com",
    "ToEmail": "sasadkhan08@gmail.com"        // Where you receive emails
  }
}
```

**Get Gmail App Password:**
1. Go to: https://myaccount.google.com/apppasswords
2. Enable 2-Step Verification if needed
3. Create app password for "Mail"
4. Copy the 16-character password
5. Use as `SmtpPassword`

### 2. Start the API (Terminal 1)

```powershell
cd "E:\VISUAL BASIC C#\UNIVERSITY\Portfolio\PortfolioAPI\PortfolioAPI"
dotnet run
```

**You should see:**
```
Now listening on: http://localhost:5000
Now listening on: https://localhost:5001
```

⚠️ **Keep this terminal open!** The API must run continuously.

### 3. Test API (Quick Check)

Open browser: http://localhost:5000/api/contact/test

Should show:
```json
{
  "message": "API is running!",
  "timestamp": "2025-10-25T..."
}
```

### 4. Open Your Portfolio (Terminal 2 or Browser)

**Option A: Using Live Server (VS Code)**
1. Install "Live Server" extension in VS Code
2. Right-click `Portfolio\Pages\contact.html`
3. Click "Open with Live Server"
4. Opens at: `http://localhost:5500`

**Option B: Direct File**
- Open `Portfolio\Pages\contact.html` in browser
- May have CORS issues - use Live Server instead

### 5. Test the Contact Form

1. Fill out the form
2. Solve the math CAPTCHA
3. Check the reCAPTCHA checkbox
4. Click "Send Message"
5. Check your email! 📧

## 🔧 Troubleshooting

### "API is not running" error
```powershell
# Make sure API is running:
cd "E:\VISUAL BASIC C#\UNIVERSITY\Portfolio\PortfolioAPI\PortfolioAPI"
dotnet run
```

### "CORS error" in browser console
- Make sure you're accessing via `http://localhost:5500` (Live Server)
- If using different port, update `Program.cs` CORS policy

### "Failed to send email"
- Check Gmail app password is correct
- Ensure 2-Step Verification is enabled
- Try replacing Gmail SMTP with Outlook:
  ```json
  "SmtpServer": "smtp-mail.outlook.com",
  "SmtpUsername": "your-email@outlook.com",
  "SmtpPassword": "your-outlook-password"
  ```

### "reCAPTCHA verification failed"
- Ensure Secret Key is in `appsettings.json`
- Ensure Site Key is in `contact.html`
- Check you checked the reCAPTCHA box

### Form submits but no email
- Check spam folder
- Verify `ToEmail` in appsettings.json is correct
- Check API terminal for error messages

## 📁 File Structure

```
Portfolio/
├── Portfolio/
│   ├── Pages/
│   │   └── contact.html          ← Frontend form
│   ├── JavaScript/
│   │   └── script.js              ← Updated to use API
│   └── Style/
│       └── styles.css             ← CAPTCHA styles
└── PortfolioAPI/
    └── PortfolioAPI/
        ├── Controllers/
        │   └── ContactController.cs   ← API endpoint
        ├── Models/                     ← Data models
        ├── Services/                   ← Email service
        ├── Program.cs                  ← Configuration
        └── appsettings.json            ← ⚠️ Your settings
```

## 🚀 What's Next?

### For Local Development:
You're all set! Keep the API running when testing your portfolio.

### For Production (When Publishing):

1. **Update CORS** in `Program.cs`:
   ```csharp
   policy.WithOrigins("https://yourdomain.com")
   ```

2. **Deploy API** to:
   - Azure App Service (free tier)
   - Railway.app (free)
   - Render.com (free)

3. **Update Frontend** API URL in `script.js`:
   ```javascript
   const response = await fetch('https://your-api.azurewebsites.net/api/contact', {
   ```

4. **Security:**
   - Use environment variables for passwords
   - Don't commit appsettings.json with passwords to GitHub
   - Enable HTTPS only

## 💡 Tips

- **Development:** Keep two terminals open (one for API, one for commands)
- **Testing:** Use browser dev tools (F12) to see any errors
- **Emails:** Check spam folder if you don't receive emails
- **Logs:** Watch the API terminal for errors during form submission

## 📚 Additional Resources

- `PortfolioAPI\PortfolioAPI\CONFIGURATION.md` - Detailed API configuration
- `Portfolio\RECAPTCHA_SETUP.md` - reCAPTCHA setup guide
- `Portfolio\Backend_Example_ASP.NET.md` - Backend architecture guide

---

## ✅ Quick Test Checklist

- [ ] API running at http://localhost:5000
- [ ] Test endpoint returns JSON
- [ ] Portfolio opens at http://localhost:5500
- [ ] Math CAPTCHA shows a problem
- [ ] reCAPTCHA checkbox appears
- [ ] Form submits successfully
- [ ] Email received in inbox

**Congrats! You have a production-ready contact form!** 🎊
