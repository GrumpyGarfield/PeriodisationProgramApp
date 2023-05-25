using PeriodisationProgramApp.DataAccess.Extensions;
using PeriodisationProgramApp.Domain.Entities;
using PeriodisationProgramApp.Domain.Enums;
using PeriodisationProgramApp.Domain.Interfaces;
using PeriodisationProgramApp.Domain.Pagination;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace PeriodisationProgramApp.DataAccess.Repositories
{
    public class MuscleGroupRepository : GenericRepository<MuscleGroup>, IMuscleGroupRepository
    {
        public MuscleGroupRepository(ApplicationContext context) : base(context)
        {
        }

        public async Task<PagedResult<MuscleGroup>> GetPaginatedResultAsync(IPageableQueryContext context, Guid? userId = null)
        {
            return await _context.MuscleGroups.IncludeAll()
                                            .FilterBy(context.Filters)
                                            .SortBy(context.SortField, context.SortDirection)
                                            .GetPagedAsync(context.Offset, context.Limit);
        }

        public MuscleGroup GetMuscleGroupByType(MuscleGroupType type)
        {
            return _context.MuscleGroups.First(m => m.Type == type);
        }
    }
}
