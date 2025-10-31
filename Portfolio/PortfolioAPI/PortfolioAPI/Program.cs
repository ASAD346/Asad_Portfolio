using PortfolioAPI.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddControllers();
builder.Services.AddHttpClient();
builder.Services.AddScoped<IEmailService, EmailService>();

// Add CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowPortfolio",
        policy =>
        {
            policy.SetIsOriginAllowed(origin =>
            {
                // Allow any localhost origin for development
                if (string.IsNullOrWhiteSpace(origin)) return false;
                var uri = new Uri(origin);
                return uri.Host == "localhost" || uri.Host == "127.0.0.1";
            })
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials();
        });
});

// Add Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowPortfolio");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
