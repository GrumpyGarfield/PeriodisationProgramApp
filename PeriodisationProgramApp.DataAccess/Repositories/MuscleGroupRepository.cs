using Microsoft.EntityFrameworkCore;
using PeriodisationProgramApp.DataAccess.Extensions;
using PeriodisationProgramApp.Domain.Entities;
using PeriodisationProgramApp.Domain.Enums;
using PeriodisationProgramApp.Domain.Interfaces;
using PeriodisationProgramApp.Domain.Pagination;

namespace PeriodisationProgramApp.DataAccess.Repositories
{
    public class MuscleGroupRepository : GenericRepository<MuscleGroup>, IMuscleGroupRepository
    {
        public MuscleGroupRepository(ApplicationContext context) : base(context)
        {
        }

        public async Task<PagedResult<MuscleGroup>> GetPaginatedResultAsync(IPageableQueryContext context, Guid? userId = null)
        {
            return await _context.MuscleGroups.IncludeAll(userId)
                                            .FilterBy(context.Filters)
                                            .SortBy(context.SortField, context.SortDirection)
                                            .GetPagedAsync(context.Offset, context.Limit);
        }

        public async Task<MuscleGroup> GetWithUsersDataAsync(Guid muscleGroupId)
        {
            return await _context.MuscleGroups.Include(m => m.MuscleGroupUsersData)
                                            .FirstAsync(m => m.Id == muscleGroupId);
        }

        public async Task<MuscleGroup> GetByIdAsync(Guid muscleGroupId, Guid? userId = null)
        {
            return await _context.MuscleGroups.IncludeAll(userId)
                                            .FirstAsync(m => m.Id == muscleGroupId);
        }

        public MuscleGroup GetMuscleGroupByType(MuscleGroupType type)
        {
            return _context.MuscleGroups.First(m => m.Type == type);
        }
    }
}
