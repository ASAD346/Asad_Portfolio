namespace PortfolioAPI.Models
{
    public class ContactFormModel
    {
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string? Phone { get; set; }
        public string Subject { get; set; } = string.Empty;
        public string? ProjectType { get; set; }
        public string? Budget { get; set; }
        public string Message { get; set; } = string.Empty;
        public string Captcha { get; set; } = string.Empty;
        public string RecaptchaResponse { get; set; } = string.Empty;
    }
}
