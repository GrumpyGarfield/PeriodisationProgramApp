using System.Linq.Expressions;

namespace PeriodisationProgramApp.Domain.Interfaces
{
    public interface IGenericRepository<T> where T : class
    {
        T? GetById(int id);

        Task<T?> GetByIdAsync(int id);

        IEnumerable<T> GetAll();

        Task<IEnumerable<T>> GetAllAsync();

        IEnumerable<T> Find(Expression<Func<T, bool>> expression);

        void Add(T entity);

        Task AddAsync(T entity);   
        
        void AddRange(IEnumerable<T> entities);

        Task AddRangeAsync(IEnumerable<T> entities);

        void Update(T entity);

        void Remove(T entity);

        void RemoveRange(IEnumerable<T> entities);

        void MarkAsDeleted(T entity);
    }
}
