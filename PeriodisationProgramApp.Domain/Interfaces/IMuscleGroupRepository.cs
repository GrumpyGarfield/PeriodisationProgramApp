using PeriodisationProgramApp.Domain.Entities;
using PeriodisationProgramApp.Domain.Enums;
using PeriodisationProgramApp.Domain.Pagination;

namespace PeriodisationProgramApp.Domain.Interfaces
{
    public interface IMuscleGroupRepository : IGenericRepository<MuscleGroup>
    {
        Task<PagedResult<MuscleGroup>> GetPaginatedResultAsync(IPageableQueryContext context, Guid? userId = null);

        Task<MuscleGroup> GetWithUsersDataAsync(Guid muscleGroupId);

        Task<MuscleGroup> GetByIdAsync(Guid muscleGroupId, Guid? userId = null);

        MuscleGroup GetMuscleGroupByType(MuscleGroupType type);
    }
}
