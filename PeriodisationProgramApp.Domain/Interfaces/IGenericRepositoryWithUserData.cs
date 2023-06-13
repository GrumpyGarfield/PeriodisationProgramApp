using PeriodisationProgramApp.Domain.Pagination;

namespace PeriodisationProgramApp.Domain.Interfaces
{
    public interface IGenericRepositoryWithUserData<T> : IGenericRepository<T> where T : class
    {
        T? GetById(Guid id, Guid? userId = null);

        Task<T?> GetByIdAsync(Guid id, Guid? userId = null);

        IEnumerable<T> GetAll(Guid? userId = null);

        Task<IEnumerable<T>> GetAllAsync(Guid? userId = null);

        PagedResult<T> GetPaginatedResult(IPageableQueryContext context, Guid? userId = null);

        Task<PagedResult<T>> GetPaginatedResultAsync(IPageableQueryContext context, Guid? userId = null);
    }
}
