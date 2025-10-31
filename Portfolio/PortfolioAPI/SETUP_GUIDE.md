# Portfolio Backend API - Setup Guide

## Prerequisites
✅ .NET 8.0 SDK installed (download from https://dotnet.microsoft.com/download)
✅ Visual Studio Code or Visual Studio (optional but recommended)

## Step 1: Install .NET SDK

1. Download .NET 8.0 SDK from https://dotnet.microsoft.com/download
2. Run the installer
3. **Restart your terminal/PowerShell**
4. Verify installation:
   ```powershell
   dotnet --version
   ```
   Should show: `8.0.x` or similar

## Step 2: Create the Web API Project

Open PowerShell in the `PortfolioAPI` folder and run:

```powershell
cd "E:\VISUAL BASIC C#\UNIVERSITY\Portfolio\PortfolioAPI"
dotnet new webapi -n PortfolioAPI
cd PortfolioAPI
```

This creates a new ASP.NET Core Web API project.

## Step 3: Install Required Packages

```powershell
dotnet add package Newtonsoft.Json
dotnet add package MailKit
dotnet add package MimeKit
```

These packages are for:
- JSON handling
- Sending emails via SMTP

## Step 4: Project Structure

After running the commands, your structure will look like:
```
PortfolioAPI/
├── PortfolioAPI/
│   ├── Controllers/
│   ├── Models/
│   ├── Services/
│   ├── Program.cs
│   ├── appsettings.json
│   └── PortfolioAPI.csproj
```

## Step 5: Files to Create

I'll create these files for you:
1. `Models/ContactFormModel.cs` - Form data structure
2. `Models/RecaptchaResponse.cs` - reCAPTCHA response structure
3. `Services/IEmailService.cs` - Email service interface
4. `Services/EmailService.cs` - Email implementation
5. `Controllers/ContactController.cs` - API endpoint
6. Update `Program.cs` - Configuration
7. Update `appsettings.json` - Settings

## Step 6: Configuration

You'll need to add your keys to `appsettings.json`:
- reCAPTCHA Secret Key
- Email SMTP settings (Gmail, Outlook, etc.)

## Step 7: Run the API

```powershell
dotnet run
```

Your API will run at: `http://localhost:5000` or `https://localhost:5001`

## Step 8: Test

Use Postman or your browser to test:
- GET: `http://localhost:5000/api/contact/test`
- POST: `http://localhost:5000/api/contact` (with form data)

## Next Steps

Once the API is running:
1. Update your frontend JavaScript to call this API
2. Test the contact form
3. Deploy to Azure/Railway when ready

---

## Quick Start Commands Summary

```powershell
# 1. Navigate to folder
cd "E:\VISUAL BASIC C#\UNIVERSITY\Portfolio\PortfolioAPI"

# 2. Create project
dotnet new webapi -n PortfolioAPI
cd PortfolioAPI

# 3. Install packages
dotnet add package Newtonsoft.Json
dotnet add package MailKit
dotnet add package MimeKit

# 4. Run (after I create all files)
dotnet run
```

## Troubleshooting

**"dotnet not recognized"**
- .NET SDK not installed or terminal not restarted
- Solution: Install SDK, restart terminal

**Port already in use**
- Another app is using port 5000
- Solution: Stop other apps or change port in `launchSettings.json`

**CORS errors in browser**
- Frontend can't connect to API
- Solution: Check CORS configuration in `Program.cs`

---

Ready? Let me know when you've installed .NET SDK and I'll create all the necessary files!
