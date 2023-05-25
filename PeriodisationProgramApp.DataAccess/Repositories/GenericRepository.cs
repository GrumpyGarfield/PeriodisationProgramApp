using Microsoft.EntityFrameworkCore;
using PeriodisationProgramApp.DataAccess.Extensions;
using PeriodisationProgramApp.Domain.Entities;
using PeriodisationProgramApp.Domain.Interfaces;
using PeriodisationProgramApp.Domain.Pagination;
using System.Linq.Expressions;

namespace PeriodisationProgramApp.DataAccess.Repositories
{
    public class GenericRepository<T> : IGenericRepository<T> where T : Entity
    {
        protected readonly ApplicationContext _context;

        public GenericRepository(ApplicationContext context)
        {
            _context = context;
        }

        public void Add(T entity)
        {
            entity.MarkAsCreated();
            _context.Set<T>().Add(entity);
        }

        public async Task AddAsync(T entity)
        {
            entity.MarkAsCreated();
            await _context.Set<T>().AddAsync(entity);
        }

        public void AddRange(IEnumerable<T> entities)
        {
            _context.Set<T>().AddRange(entities);
        }

        public async Task AddRangeAsync(IEnumerable<T> entities)
        {
            await _context.Set<T>().AddRangeAsync(entities);
        }

        public IEnumerable<T> Find(Expression<Func<T, bool>> expression)
        {
            return _context.Set<T>().Where(expression);
        }

        public IEnumerable<T> GetAll()
        {
            return _context.Set<T>().ToList();
        }

        public async Task<IEnumerable<T>> GetAllAsync()
        {
            return await _context.Set<T>().ToListAsync();
        }

        public T? GetById(Guid id)
        {
            return _context.Set<T>().Find(id);
        }

        public async Task<T?> GetByIdAsync(Guid id)
        {
            return await _context.Set<T>().FindAsync(id);
        }

        public void Update(T entity)
        {
            entity.MarkAsUpdated();
            _context.Set<T>().Update(entity);
        }

        public void Remove(T entity)
        {
            _context.Set<T>().Remove(entity);
        }

        public void RemoveRange(IEnumerable<T> entities)
        {
            _context.Set<T>().RemoveRange(entities);
        }

        public void MarkAsDeleted(T entity)
        {
            entity.IsDeleted = true;
            _context.Set<T>().Update(entity);
        }

        public PagedResult<T> GetPaginatedResult(IPageableQueryContext context)
        {
            return _context.Set<T>().FilterBy(context.Filters).SortBy(context.SortField, context.SortDirection).GetPaged(context.Offset, context.Limit);
        }

        public async Task<PagedResult<T>> GetPaginatedResultAsync(IPageableQueryContext context)
        {
            return await _context.Set<T>().FilterBy(context.Filters).SortBy(context.SortField, context.SortDirection).GetPagedAsync(context.Offset, context.Limit);
        }
    }
}
