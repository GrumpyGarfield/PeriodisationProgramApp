using Microsoft.AspNetCore.Mvc;
using PeriodisationProgramApp.DataAccess.QueryContext;
using PeriodisationProgramApp.Domain.Interfaces;
using PeriodisationProgramApp.WebApi.Extensions;
using PeriodisationProgramApp.BusinessLogic.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using PeriodisationProgramApp.WebApi.Dto;
using PeriodisationProgramApp.Domain.Entities;
using PeriodisationProgramApp.BusinessLogic.Services;
using PeriodisationProgramApp.BusinessLogic.Dto;
using PeriodisationProgramApp.BusinessLogic.Domain.Dto;

namespace PeriodisationProgramApp.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExerciseController : ControllerBase
    {
        private readonly ILogger<TrainingProgramController> _logger;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IExerciseService _exerciseService;
        private readonly IUserService _userService;

        public ExerciseController(ILogger<TrainingProgramController> logger, IUnitOfWork unitOfWork, IExerciseService exerciseService, IUserService userService)
        {
            _logger = logger;
            _unitOfWork = unitOfWork;
            _exerciseService = exerciseService;
            _userService = userService;
        }

        [HttpGet]
        [Route("items")]
        public async Task<IActionResult> GetExercises(int offset, int limit, bool isCreated = false, bool isLiked = false)
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
                return Ok(await _exerciseService.GetUserCreatedExercises(context, uid));
            }

            if (isLiked)
            {
                return Ok(await _exerciseService.GetUserLikedExercises(context, uid));
            }

            return Ok(await _exerciseService.GetExercises(context, uid));
        }

        [Authorize]
        [HttpPost]
        [Route("{exerciseId}/like")]
        public async Task<IActionResult> Like(Guid exerciseId, [FromBody] LikeRequestDto likeRequestDto)
        {
            var uid = User.FindFirstValue("user_id");

            if (likeRequestDto.isLiked)
            {
                return Ok(await _exerciseService.SetLike(exerciseId, uid));
            }
            else
            {
                return Ok(await _exerciseService.UnsetLike(exerciseId, uid));
            }
        }

        [Authorize]
        [HttpPost]
        [Route("{exerciseId}/rate")]
        public async Task<IActionResult> Rate(Guid exerciseId, [FromBody] RateRequestDto rateRequestDto)
        {
            var uid = User.FindFirstValue("user_id");

            if (rateRequestDto.isRated)
            {
                if (rateRequestDto.Rating == null)
                {
                    return BadRequest("Rating can't be null");
                }

                return Ok(await _exerciseService.SetRating(exerciseId, uid, rateRequestDto.Rating.GetValueOrDefault()));
            }
            else
            {
                return Ok(await _exerciseService.UnsetRating(exerciseId, uid));
            }
        }

        [HttpGet]
        [Route("{exerciseId}")]
        public async Task<IActionResult> GetExercise(Guid exerciseId)
        {
            var uid = User.FindFirstValue("user_id");

            return Ok(await _exerciseService.GetExercise(exerciseId, uid));
        }

        [HttpPut]
        [Route("{exerciseId}")]
        public async Task<IActionResult> UpdateExercise(Guid exerciseId, [FromBody] UpdateExerciseDto updateExerciseDto)
        {
            var uid = User.FindFirstValue("user_id");

            return Ok(await _exerciseService.UpdateExercise(exerciseId, uid, updateExerciseDto));
        }

        [HttpPost]
        [Route("{exerciseId}/updateUserData")]
        public async Task<IActionResult> UpdateExerciseUserData(Guid exerciseId, [FromBody] UpdateExerciseUserDataDto updateExerciseUserDataDto)
        {
            var uid = User.FindFirstValue("user_id");

            return Ok(await _exerciseService.UpdateExerciseUserData(exerciseId, uid, new ExerciseUserDataDto()
            {
                RawStimulusMagnitude = updateExerciseUserDataDto.RawStimulusMagnitude,
                FatigueMagnitude = updateExerciseUserDataDto.FatigueMagnitude
            }));
        }
    }
}
