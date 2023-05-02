using Microsoft.EntityFrameworkCore;
using PeriodisationProgramApp.Common.Filtering;
using PeriodisationProgramApp.Common.Sorting;
using PeriodisationProgramApp.Domain.Pagination;

namespace PeriodisationProgramApp.DataAccess.Extensions
{
    public static class QueryExtensions
    {
        public static IQueryable<T> SortBy<T>(this IQueryable<T> query,
                                         string? sortField, SortDirection sortDirection = SortDirection.Desc) where T : class
        {
            if (string.IsNullOrEmpty(sortField))
            {
                sortField = "Created";
            }

            if (sortDirection == SortDirection.Asc)
            {
                return query.OrderBy(p => EF.Property<object>(p, sortField));
            }
            else
            {
                return query.OrderByDescending(p => EF.Property<object>(p, sortField));
            }
        }

        public static IQueryable<T> FilterBy<T>(this IQueryable<T> query,
                                         KeyValuePair<string, string>[]? filters) where T : class
        {
            var filter = FilterBuilder.Build<T>(filters);

            if (filter != null)
            {
                return query.Where(filter);
            }

            return query;
        }

        public static PagedResult<T> GetPaged<T>(this IQueryable<T> query,
                                         int page, int pageSize) where T : class
        {
            var result = new PagedResult<T>();
            result.CurrentPage = page;
            result.PageSize = pageSize;
            result.RowCount = query.Count();

            var pageCount = (double)result.RowCount / pageSize;
            result.PageCount = (int)Math.Ceiling(pageCount);

            var skip = (page - 1) * pageSize;
            result.Results = query.Skip(skip).Take(pageSize).ToList();

            return result;
        }

        public static async Task<PagedResult<T>> GetPagedAsync<T>(this IQueryable<T> query,
                                         int page, int pageSize) where T : class
        {
            var result = new PagedResult<T>();
            result.CurrentPage = page;
            result.PageSize = pageSize;
            result.RowCount = await query.CountAsync();

            var pageCount = (double)result.RowCount / pageSize;
            result.PageCount = (int)Math.Ceiling(pageCount);

            var skip = (page - 1) * pageSize;
            result.Results = await query.Skip(skip).Take(pageSize).ToListAsync();

            return result;
        }
    }
}
