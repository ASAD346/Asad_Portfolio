using MailKit.Net.Smtp;
using MailKit.Security;
using MimeKit;
using PortfolioAPI.Models;

namespace PortfolioAPI.Services
{
    public class EmailService : IEmailService
    {
        private readonly IConfiguration _configuration;

        public EmailService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task SendContactEmailAsync(ContactFormModel model)
        {
            var emailSettings = _configuration.GetSection("EmailSettings");
            
            var message = new MimeMessage();
            message.From.Add(new MailboxAddress(
                emailSettings["FromName"], 
                emailSettings["FromEmail"]
            ));
            message.To.Add(new MailboxAddress(
                emailSettings["ToName"], 
                emailSettings["ToEmail"]
            ));
            message.Subject = $"Portfolio Contact: {model.Subject}";

            var bodyBuilder = new BodyBuilder
            {
                HtmlBody = $@"
                    <h2>New Contact Form Submission</h2>
                    <p><strong>Name:</strong> {model.Name}</p>
                    <p><strong>Email:</strong> {model.Email}</p>
                    <p><strong>Phone:</strong> {model.Phone ?? "N/A"}</p>
                    <p><strong>Subject:</strong> {model.Subject}</p>
                    <p><strong>Project Type:</strong> {model.ProjectType ?? "N/A"}</p>
                    <p><strong>Budget:</strong> {model.Budget ?? "N/A"}</p>
                    <hr>
                    <p><strong>Message:</strong></p>
                    <p>{model.Message}</p>
                "
            };

            message.Body = bodyBuilder.ToMessageBody();

            using var client = new SmtpClient();
            try
            {
                await client.ConnectAsync(
                    emailSettings["SmtpServer"],
                    int.Parse(emailSettings["SmtpPort"] ?? "587"),
                    SecureSocketOptions.StartTls
                );

                await client.AuthenticateAsync(
                    emailSettings["SmtpUsername"],
                    emailSettings["SmtpPassword"]
                );

                await client.SendAsync(message);
                await client.DisconnectAsync(true);
            }
            catch (Exception ex)
            {
                // Log the exception (you can add logging here)
                throw new Exception($"Failed to send email: {ex.Message}");
            }
        }
    }
}
