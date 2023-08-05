using System.Security.Cryptography;
using AuthService.Data;
using AuthService.Models;
using AuthService.Services;
using AuthService.Services.IService;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDbContext<AppDbContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
});
builder.Services.Configure<JwtOptions>(builder.Configuration.GetSection("ApiSettings:JwtOptions"));
builder.Services.AddIdentity<ApplicationUser, IdentityRole>()
    .AddEntityFrameworkStores<AppDbContext>();

var CorsAllowedOrigins = builder.Configuration.GetValue<string>("ApiSettings:CORS:AllowedOrigins");
var CorsPolicyName = "AllowFrontend";
builder.Services.AddCors(options =>
{
    options.AddPolicy(CorsPolicyName,
        builder =>
        {
            builder.WithOrigins(CorsAllowedOrigins)
                .AllowAnyHeader()
                .AllowAnyMethod();
        });
});
builder.Services.AddControllers();

builder.Services.AddScoped<IAuthService, AuthService.Services.AuthService>();
builder.Services.AddScoped<IJwtTokenGenerator, JwtTokenGenerator>();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
// Main();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();
app.UseCors(CorsPolicyName);

app.MapControllers();

app.Run();

static void Main()
{
    string jwtSecretKey = GenerateJwtSecretKey();
    Console.WriteLine("Generated JWT Secret Key:");
    Console.WriteLine(jwtSecretKey);
}

static string GenerateJwtSecretKey()
{
    int keySizeInBytes = 32; // Adjust the key size as needed
    using (var randomNumberGenerator = new RNGCryptoServiceProvider())
    {
        byte[] keyBytes = new byte[keySizeInBytes];
        randomNumberGenerator.GetBytes(keyBytes);
        return Convert.ToBase64String(keyBytes);
    }
}