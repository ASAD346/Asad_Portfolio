using Newtonsoft.Json;

namespace PortfolioAPI.Models
{
    public class RecaptchaResponse
    {
        [JsonProperty("success")]
        public bool Success { get; set; }

        [JsonProperty("challenge_ts")]
        public string? ChallengeTs { get; set; }

        [JsonProperty("hostname")]
        public string? Hostname { get; set; }

        [JsonProperty("error-codes")]
        public List<string>? ErrorCodes { get; set; }
    }
}
