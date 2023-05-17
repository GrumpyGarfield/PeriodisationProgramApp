using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using PeriodisationProgramApp.DataAccess.QueryContext;
using PeriodisationProgramApp.Domain.Interfaces;
using PeriodisationProgramApp.Domain.Entities;
using PeriodisationProgramApp.WebApi.Extensions;
using Microsoft.AspNetCore.Http;
using PeriodisationProgramApp.BusinessLogic.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Net.Http.Headers;
using FirebaseAdmin.Auth;
using System.Security.Claims;
using PeriodisationProgramApp.WebApi.Dto;

namespace PeriodisationProgramApp.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TrainingProgramController : ControllerBase
    {
        private readonly ILogger<TrainingProgramController> _logger;
        private readonly IUnitOfWork _unitOfWork;
        private readonly ITrainingProgramService _trainingProgramService;
        private readonly IUserService _userService;

        public TrainingProgramController(ILogger<TrainingProgramController> logger, IUnitOfWork unitOfWork, ITrainingProgramService trainingProgramService, IUserService userService)
        {
            _logger = logger;
            _unitOfWork = unitOfWork;
            _trainingProgramService = trainingProgramService;
            _userService = userService;
        }

        [HttpGet]
        [Route("InsertTestPrograms")]
        public IActionResult InsertTestPrograms(int count = 1)
        {
            for (var i = 0; i < count; i++)
            {
                var guid = Guid.NewGuid();
                var rnd = new Random();

                _unitOfWork.TrainingPrograms.Add(new TrainingProgram()
                {
                    Name = $"TP {guid}",
                    Sessions = new List<TrainingSession>(),
                    UserId = Guid.Parse("01faeb35-159a-454e-bf45-7343fb9cf14c"),
                    IsPublic = true,
                    Likes = rnd.Next(1, 1000),
                    Rating = rnd.NextDouble() * 5,
                    Type = (Domain.Enums.TrainingProgramType)rnd.Next(0, 3),
                    TrainingLevel = (Domain.Enums.TrainingLevel)rnd.Next(0, 3)
                });
            }

            return Ok(_unitOfWork.Complete());
        }

        [HttpGet]
        [Route("GetTrainingPrograms")]
        public async Task<IActionResult> GetTrainingPrograms(int offset, int limit, bool isCreated = false, bool isLiked = false)
        {
            var uid = User.FindFirstValue("user_id");
            var filters = this.CreateFilters();
            var sortBy = this.GetSortField();
            var sortDir = this.GetSortDirection();

            var context = new PageableQueryContext()
            {
                Offset = offset,
                Limit = limit,
                SortField = sortBy,
                SortDirection = sortDir,
                Filters = filters
            };

            if (isCreated)
            {
                return Ok(await _trainingProgramService.GetUserCreatedTrainingPrograms(context, uid));
            }

            if (isLiked)
            {
                return Ok(await _trainingProgramService.GetUserLikedTrainingPrograms(context, uid));
            }

            return Ok(await _trainingProgramService.GetTrainingPrograms(context, uid));
        }

        [Authorize]
        [HttpPost]
        [Route("{trainingProgramId}/liked")]
        public async Task<IActionResult> Liked(Guid trainingProgramId, [FromBody]LikedRequestDto likedRequestDto)
        {
            var uid = User.FindFirstValue("user_id");

            if (likedRequestDto.isLiked)
            {
                return Ok(await _trainingProgramService.SetLike(trainingProgramId, uid));
            }
            else
            {
                return Ok(await _trainingProgramService.UnsetLike(trainingProgramId, uid));
            }
        }
    }
}
