using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using PeriodisationProgramApp.BusinessLogic.Factories.Interfaces;
using PeriodisationProgramApp.Domain.Entities;
using PeriodisationProgramApp.Domain.Interfaces;
using FirebaseAdmin.Auth;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace PeriodisationProgramApp.WebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class UserController : ControllerBase
    {
        private readonly ILogger<UserController> _logger;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public UserController(ILogger<UserController> logger, IUnitOfWork unitOfWork, IMapper mapper)
        {
            _logger = logger;
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        [HttpGet(Name = "AddUser")]
        public async Task<IActionResult> AddUserAsync(string username, string email, string password)
        {
            var args = new UserRecordArgs()
            {
                Email = email,
                EmailVerified = true,
                Password = password,
                DisplayName = username,
                PhotoUrl = "https://s5o.ru/storage/simple/ru/ugc/50/59/29/95/ruueab4b8ab2d.113.150x300.jpg",
                Disabled = false
            };

            var userRecord = await FirebaseAuth.DefaultInstance.CreateUserAsync(args);

            return Ok(userRecord);
        }

        [Authorize]
        [HttpGet(Name = "AddThisUser")]
        public async Task<IActionResult> AddThisUser()
        {
            var uid = User.FindFirstValue("user_id");
            var firebaseUser = await FirebaseAuth.DefaultInstance.GetUserAsync(uid);

            await _unitOfWork.Users.AddAsync(new User()
            {
                Id = Guid.NewGuid(),
                FirebaseId = uid,
                Email = firebaseUser.Email,
                Username = firebaseUser.DisplayName
            });

            await _unitOfWork.CompleteAsync();

            return Ok(true);
        }
    }
}