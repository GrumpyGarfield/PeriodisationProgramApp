using Microsoft.AspNetCore.Mvc;
using PeriodisationProgramApp.DataAccess.QueryContext;
using PeriodisationProgramApp.Domain.Interfaces;
using PeriodisationProgramApp.WebApi.Extensions;
using PeriodisationProgramApp.BusinessLogic.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using PeriodisationProgramApp.WebApi.Dto;
using PeriodisationProgramApp.Domain.Entities;

namespace PeriodisationProgramApp.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MuscleGroupController : ControllerBase
    {
        private readonly ILogger<TrainingProgramController> _logger;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMuscleGroupService _muscleGroupService;
        private readonly IUserService _userService;

        public MuscleGroupController(ILogger<TrainingProgramController> logger, IUnitOfWork unitOfWork, IMuscleGroupService muscleGroupService, IUserService userService)
        {
            _logger = logger;
            _unitOfWork = unitOfWork;
            _muscleGroupService = muscleGroupService;
            _userService = userService;
        }

        [HttpGet]
        [Route("items")]
        public async Task<IActionResult> GetMuscleGroups(int offset, int limit)
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

            return Ok(await _muscleGroupService.GetMuscleGroups(context, uid));
        }

        [HttpGet]
        [Route("{muscleGroupId}")]
        public async Task<IActionResult> GetMuscleGroup(Guid muscleGroupId)
        {
            var uid = User.FindFirstValue("user_id");

            return Ok(await _muscleGroupService.GetMuscleGroup(muscleGroupId, uid));
        }

        [HttpPost]
        [Route("{muscleGroupId}/updateUserData")]
        public async Task<IActionResult> UpdateMuscleGroupUserData(Guid muscleGroupId, [FromBody]UpdateMuscleGroupUserDataDto updateMuscleGroupUserDataDto)
        {
            var uid = User.FindFirstValue("user_id");

            return Ok(await _muscleGroupService.UpdateMuscleGroupUserData(muscleGroupId, uid, new MuscleGroupUserDataDto() 
            { 
                MaintenanceVolume = updateMuscleGroupUserDataDto.MaintenanceVolume, 
                MinimumEffectiveVolume = updateMuscleGroupUserDataDto.MinimumEffectiveVolume,
                MaximumRecoverableVolume = updateMuscleGroupUserDataDto.MaximumRecoverableVolume
            }));
        }
    }
}
