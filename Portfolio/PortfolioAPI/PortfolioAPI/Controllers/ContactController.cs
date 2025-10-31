using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using PortfolioAPI.Models;
using PortfolioAPI.Services;

namespace PortfolioAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ContactController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IEmailService _emailService;
        private readonly HttpClient _httpClient;

        public ContactController(
            IConfiguration configuration, 
            IEmailService emailService,
            IHttpClientFactory httpClientFactory)
        {
            _configuration = configuration;
            _emailService = emailService;
            _httpClient = httpClientFactory.CreateClient();
        }

        [HttpGet("test")]
        public IActionResult Test()
        {
            return Ok(new { message = "API is running!", timestamp = DateTime.UtcNow });
        }

        [HttpPost]
        public async Task<IActionResult> Submit([FromBody] ContactFormModel model)
        {
            try
            {
                // Validate model
                if (string.IsNullOrEmpty(model.Name) || 
                    string.IsNullOrEmpty(model.Email) || 
                    string.IsNullOrEmpty(model.Subject) || 
                    string.IsNullOrEmpty(model.Message))
                {
                    return BadRequest(new { error = "Please fill in all required fields." });
                }

                // Validate reCAPTCHA
                var secretKey = _configuration["ReCaptcha:SecretKey"];
                var recaptchaUrl = $"https://www.google.com/recaptcha/api/siteverify?secret={secretKey}&response={model.RecaptchaResponse}";

                var response = await _httpClient.GetAsync(recaptchaUrl);
                var jsonResponse = await response.Content.ReadAsStringAsync();
                var recaptchaResult = JsonConvert.DeserializeObject<RecaptchaResponse>(jsonResponse);

                if (recaptchaResult == null || !recaptchaResult.Success)
                {
                    return BadRequest(new { error = "reCAPTCHA verification failed. Please try again." });
                }

                // Send email
                await _emailService.SendContactEmailAsync(model);

                return Ok(new { message = "Thank you for your message! I will get back to you soon." });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = "An error occurred while processing your request.", details = ex.Message });
            }
        }
    }
}
