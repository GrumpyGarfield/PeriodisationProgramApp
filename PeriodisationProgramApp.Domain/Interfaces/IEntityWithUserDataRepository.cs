using PeriodisationProgramApp.Domain.Entities;
using PeriodisationProgramApp.Domain.Pagination;

namespace PeriodisationProgramApp.Domain.Interfaces
{
    public interface IEntityWithUserDataRepository<T> : IGenericRepository<T> where T : BaseEntity
    {
        Task<PagedResult<T>> GetPaginatedResultAsync(IPageableQueryContext context, Guid? userId = null);

        Task<T> GetByIdAsync(Guid entityId, Guid? userId = null);

        Task<T> GetWithUsersDataAsync(Guid entityId);
    }
}
