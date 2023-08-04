using AuthService.Models;

namespace AuthService.Services.IService;

public interface IJwtTokenGenerator
{
    string GenerateToken(ApplicationUser applicationUser, IEnumerable<string> roles);
}