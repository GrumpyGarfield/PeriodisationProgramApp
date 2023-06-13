using PeriodisationProgramApp.DataAccess.Extensions;
using PeriodisationProgramApp.Domain.Entities;
using PeriodisationProgramApp.Domain.Interfaces;
using PeriodisationProgramApp.Domain.Pagination;

namespace PeriodisationProgramApp.DataAccess.Repositories
{
    public class GenericRepositoryWithUserData<T> : GenericRepository<T>, IGenericRepositoryWithUserData<T> where T : BaseEntity
    {
        public GenericRepositoryWithUserData(ApplicationContext context) : base(context)
        {
        }

        public PagedResult<T> GetPaginatedResult(IPageableQueryContext context, Guid? userId = null)
        {
            return _context.Set<T>().FilterBy(context.Filters).SortBy(context.SortField, context.SortDirection).GetPaged(context.Offset, context.Limit);
        }

        public async Task<PagedResult<T>> GetPaginatedResultAsync(IPageableQueryContext context, Guid? userId = null)
        {
            return await _context.Set<T>().FilterBy(context.Filters).SortBy(context.SortField, context.SortDirection).GetPagedAsync(context.Offset, context.Limit);
        }
    }
}
