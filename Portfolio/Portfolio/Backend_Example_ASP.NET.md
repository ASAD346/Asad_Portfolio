# Simple ASP.NET Core Backend for Contact Form with reCAPTCHA

## Why You'd Build This
- Proper server-side reCAPTCHA verification
- Full control over email sending
- Better security than client-side only

## Quick Start (5 Steps)

### Step 1: Create ASP.NET Core Web API
```bash
dotnet new webapi -n PortfolioAPI
cd PortfolioAPI
```

### Step 2: Install Required Package
```bash
dotnet add package Newtonsoft.Json
```

### Step 3: Create Contact Model
Create `Models/ContactFormModel.cs`:
```csharp
namespace PortfolioAPI.Models
{
    public class ContactFormModel
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Subject { get; set; }
        public string ProjectType { get; set; }
        public string Budget { get; set; }
        public string Message { get; set; }
        public string Captcha { get; set; }
        public string RecaptchaResponse { get; set; }
    }
}
```

### Step 4: Create Contact Controller
Create `Controllers/ContactController.cs`:
```csharp
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using PortfolioAPI.Models;
using System.Net.Http;
using System.Threading.Tasks;

namespace PortfolioAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ContactController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly HttpClient _httpClient;

        public ContactController(IConfiguration configuration, HttpClient httpClient)
        {
            _configuration = configuration;
            _httpClient = httpClient;
        }

        [HttpPost]
        public async Task<IActionResult> Submit([FromBody] ContactFormModel model)
        {
            // Validate reCAPTCHA
            var secretKey = _configuration["ReCaptcha:SecretKey"];
            var recaptchaUrl = $"https://www.google.com/recaptcha/api/siteverify?secret={secretKey}&response={model.RecaptchaResponse}";

            var response = await _httpClient.GetAsync(recaptchaUrl);
            var jsonResponse = await response.Content.ReadAsStringAsync();
            dynamic result = JsonConvert.DeserializeObject(jsonResponse);

            if (result.success != "true")
            {
                return BadRequest(new { error = "reCAPTCHA verification failed" });
            }

            // TODO: Validate math CAPTCHA here if needed
            
            // TODO: Send email here (using SendGrid, MailKit, etc.)
            // For now, just return success
            
            return Ok(new { message = "Form submitted successfully!" });
        }
    }
}
```

### Step 5: Configure appsettings.json
```json
{
  "ReCaptcha": {
    "SiteKey": "YOUR_SITE_KEY_HERE",
    "SecretKey": "YOUR_SECRET_KEY_HERE"
  },
  "Logging": {
    "LogLevel": {
      "Default": "Information"
    }
  }
}
```

### Step 6: Enable CORS in Program.cs
Add before `var app = builder.Build();`:
```csharp
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowPortfolio",
        policy =>
        {
            policy.WithOrigins("http://localhost:5500", "https://yourdomain.com")
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});
```

Add after `var app = builder.Build();`:
```csharp
app.UseCors("AllowPortfolio");
```

### Step 7: Update Your JavaScript
Modify `JavaScript/script.js` form submission:
```javascript
// Instead of using EmailJS, send to your API
try {
    const formData = {
        name: contactForm.querySelector('#name').value,
        email: contactForm.querySelector('#email').value,
        phone: contactForm.querySelector('#phone').value,
        subject: contactForm.querySelector('#subject').value,
        projectType: contactForm.querySelector('#project-type').value,
        budget: contactForm.querySelector('#budget').value,
        message: contactForm.querySelector('#message').value,
        captcha: captchaInput.value,
        recaptchaResponse: grecaptcha.getResponse()
    };

    const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    });

    if (response.ok) {
        // Show success message
        formMessage.textContent = 'Thank you for your message! I will get back to you soon.';
        formMessage.className = 'form-message success';
        formMessage.style.display = 'block';
        contactForm.reset();
        generateCaptcha();
        grecaptcha.reset();
    } else {
        throw new Error('Submission failed');
    }
} catch (error) {
    formMessage.textContent = 'Oops! Something went wrong. Please try again.';
    formMessage.className = 'form-message error';
    formMessage.style.display = 'block';
}
```

## Running Locally

1. **Start the API**:
```bash
cd PortfolioAPI
dotnet run
```
Your API runs at: `http://localhost:5000`

2. **Open your portfolio**:
- Open `contact.html` in browser
- Form will now submit to your local API

3. **Test**:
- Fill form → Math CAPTCHA → reCAPTCHA → Submit
- Backend verifies reCAPTCHA with Google
- If valid, processes form

## Deploying (When Ready)

### Option A: Azure (Free Tier)
1. Create Azure account
2. Create App Service (Free F1 tier)
3. Deploy via Visual Studio or Azure CLI
4. Update JavaScript URL to Azure URL

### Option B: Railway/Render (Free)
1. Push code to GitHub
2. Connect Railway/Render to your repo
3. Auto-deploys on push
4. Get free URL: `yourapp.railway.app`

## Do You NEED This?

**NO** - for a portfolio, EmailJS + client-side validation is fine

**YES** - if you want:
- Better security
- Learn backend development
- Control over email delivery
- Professional setup

## Summary

| Setup | Security | Complexity | Cost | Best For |
|-------|----------|------------|------|----------|
| Current (EmailJS only) | ⭐⭐ | Very Easy | Free | Learning/Portfolio |
| Current + Dual CAPTCHA | ⭐⭐⭐ | Easy | Free | Most Portfolios |
| Backend + Verification | ⭐⭐⭐⭐⭐ | Medium | Free tier | Professional |

**My Recommendation**: 
- Start with what you have (it's good enough!)
- Learn backend later when you're comfortable
- Not urgent for a portfolio site
