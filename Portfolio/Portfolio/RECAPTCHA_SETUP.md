# Google reCAPTCHA Setup Instructions

## Step 1: Get reCAPTCHA Keys

1. Go to [Google reCAPTCHA Admin Console](https://www.google.com/recaptcha/admin)
2. Sign in with your Google account
3. Click on the **+** button to register a new site
4. Fill in the form:
   - **Label**: Your Portfolio Contact Form (or any name you prefer)
   - **reCAPTCHA type**: Select **reCAPTCHA v2** → **"I'm not a robot" Checkbox**
   - **Domains**: Add your domain(s):
     - For local testing: `localhost`
     - For production: `yourdomain.com` (without http/https)
   - Accept the reCAPTCHA Terms of Service
5. Click **Submit**
6. You'll receive two keys:
   - **Site Key** (public key - used in HTML)
   - **Secret Key** (private key - used for server-side verification)

## Step 2: Add Site Key to Your HTML

1. Open `Pages/contact.html`
2. Find this line (around line 179):
   ```html
   <div class="g-recaptcha" data-sitekey="YOUR_RECAPTCHA_SITE_KEY"></div>
   ```
3. Replace `YOUR_RECAPTCHA_SITE_KEY` with your actual **Site Key**
   ```html
   <div class="g-recaptcha" data-sitekey="6LcXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"></div>
   ```

## Step 3: Server-Side Verification (Important!)

**Note**: The current implementation only validates reCAPTCHA on the client-side. For production, you MUST verify the reCAPTCHA response on your server.

### Why Server-Side Verification is Needed
Client-side validation can be bypassed. Always verify the reCAPTCHA token on your backend.

### How to Implement Server-Side Verification

When the form is submitted, send the `g-recaptcha-response` to your backend:

#### Example with Node.js/Express:
```javascript
const axios = require('axios');

app.post('/submit-form', async (req, res) => {
    const recaptchaResponse = req.body['g-recaptcha-response'];
    const secretKey = 'YOUR_SECRET_KEY';
    
    try {
        const verification = await axios.post(
            `https://www.google.com/recaptcha/api/siteverify`,
            null,
            {
                params: {
                    secret: secretKey,
                    response: recaptchaResponse
                }
            }
        );
        
        if (verification.data.success) {
            // reCAPTCHA verified - process the form
            // Your form processing logic here
            res.json({ success: true });
        } else {
            res.status(400).json({ error: 'reCAPTCHA verification failed' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});
```

#### Example with ASP.NET Core:
```csharp
public async Task<IActionResult> SubmitForm([FromForm] ContactFormModel model, [FromForm(Name = "g-recaptcha-response")] string recaptchaResponse)
{
    var secretKey = "YOUR_SECRET_KEY";
    var client = new HttpClient();
    
    var response = await client.GetAsync(
        $"https://www.google.com/recaptcha/api/siteverify?secret={secretKey}&response={recaptchaResponse}"
    );
    
    var jsonResponse = await response.Content.ReadAsStringAsync();
    dynamic result = JsonConvert.DeserializeObject(jsonResponse);
    
    if (result.success == "true")
    {
        // reCAPTCHA verified - process the form
        // Your form processing logic here
        return Ok(new { success = true });
    }
    
    return BadRequest(new { error = "reCAPTCHA verification failed" });
}
```

## Step 4: Update EmailJS Integration (if using)

Modify the form submission in `JavaScript/script.js` to include the reCAPTCHA response:

```javascript
// Get the reCAPTCHA response token
const recaptchaResponse = grecaptcha.getResponse();

// Add it to your form data or send it to your backend
const formData = new FormData(contactForm);
formData.append('g-recaptcha-response', recaptchaResponse);

// Then verify on your backend before sending email
```

## Current Implementation

Your contact form now has **dual protection**:
1. **Math CAPTCHA**: Simple client-side math problem to deter basic bots
2. **Google reCAPTCHA**: Advanced bot detection with Google's AI

Both must be completed for the form to submit.

## Testing

### Local Testing:
1. Add `localhost` to your reCAPTCHA domains
2. Test on `http://localhost` or `http://127.0.0.1`

### Production:
1. Add your actual domain to reCAPTCHA domains
2. Deploy and test

## Troubleshooting

### reCAPTCHA not showing:
- Check if the script is loaded: `<script src="https://www.google.com/recaptcha/api.js" async defer></script>`
- Check browser console for errors
- Verify your site key is correct

### "Invalid site key" error:
- Make sure you're using the **Site Key** (not Secret Key) in HTML
- Verify the domain is added to your reCAPTCHA admin console

### reCAPTCHA shows but doesn't validate:
- Ensure you've added server-side verification
- Check that EmailJS or your backend is properly handling the token

## Security Best Practices

1. ✅ Always verify reCAPTCHA on the server-side
2. ✅ Keep your Secret Key secure (never expose it in client-side code)
3. ✅ Use HTTPS in production
4. ✅ Implement rate limiting on your backend
5. ✅ Validate all form inputs on the server-side

## Resources

- [reCAPTCHA Documentation](https://developers.google.com/recaptcha/docs/display)
- [reCAPTCHA Admin Console](https://www.google.com/recaptcha/admin)
- [Server-Side Verification Guide](https://developers.google.com/recaptcha/docs/verify)
