using AuthService.Dto;
using AuthService.Services.IService;
using Microsoft.AspNetCore.Mvc;

namespace AuthService.Controllers;

[Route("api/auth")]
[ApiController]
public class AuthController : Controller
{
    private readonly IAuthService _authService;
    protected ResponseDto _responseDto;

    public AuthController(IAuthService authService)
    {
        _authService = authService;
        _responseDto = new();
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegistrationRequestDto model)
    {
        var errorMessage = await _authService.Register(model);
        if (!string.IsNullOrEmpty(errorMessage))
        {
            _responseDto.IsSuccess = false;
            _responseDto.Message = errorMessage;
            return BadRequest(_responseDto);
        }

        return Ok(_responseDto);
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequestDto model)
    {
        var loginResponse = await _authService.Login(model);
        if (loginResponse.User == null)
        {
            _responseDto.IsSuccess = false;
            _responseDto.Message = "Username or password is incorrect";
            return BadRequest(_responseDto);
        }

        return Ok(loginResponse);
    }
}