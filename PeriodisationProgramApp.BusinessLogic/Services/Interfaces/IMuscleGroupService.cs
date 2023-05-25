using PeriodisationProgramApp.BusinessLogic.Domain.Dto;
using PeriodisationProgramApp.DataAccess.QueryContext;
using PeriodisationProgramApp.Domain.Pagination;

namespace PeriodisationProgramApp.BusinessLogic.Services.Interfaces
{
    public interface IMuscleGroupService
    {
        Task<PagedResult<MuscleGroupDto>> GetMuscleGroups(PageableQueryContext context, Guid? userId);

        Task<PagedResult<MuscleGroupDto>> GetMuscleGroups(PageableQueryContext context, string? firebaseId);
    }
}
