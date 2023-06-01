using PeriodisationProgramApp.BusinessLogic.Domain.Dto;
using PeriodisationProgramApp.DataAccess.QueryContext;
using PeriodisationProgramApp.Domain.Entities;
using PeriodisationProgramApp.Domain.Pagination;

namespace PeriodisationProgramApp.BusinessLogic.Services.Interfaces
{
    public interface IMuscleGroupService
    {
        Task<PagedResult<MuscleGroupDto>> GetMuscleGroups(PageableQueryContext context, Guid? userId);

        Task<PagedResult<MuscleGroupDto>> GetMuscleGroups(PageableQueryContext context, string? firebaseId);

        Task<MuscleGroupDto> GetMuscleGroup(Guid muscleGroupId, Guid? userId);

        Task<MuscleGroupDto> GetMuscleGroup(Guid muscleGroupId, string? firebaseId);

        Task<MuscleGroupDto> UpdateMuscleGroupUserData(Guid muscleGroupId, Guid userId, MuscleGroupUserDataDto muscleGroupUserDataDto);

        Task<MuscleGroupDto> UpdateMuscleGroupUserData(Guid muscleGroupId, string firebaseId, MuscleGroupUserDataDto muscleGroupUserDataDto);
    }
}
