using PortfolioAPI.Models;

namespace PortfolioAPI.Services
{
    public interface IEmailService
    {
        Task SendContactEmailAsync(ContactFormModel model);
    }
}
