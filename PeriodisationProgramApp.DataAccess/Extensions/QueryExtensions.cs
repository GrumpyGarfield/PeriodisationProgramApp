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
                                         int offset, int limit) where T : class
        {
            var result = new PagedResult<T>();
            result.Offset = offset;
            result.Limit = limit;
            result.TotalItems = query.Count();
            result.Items = query.Skip(offset).Take(limit).ToList();

            return result;
        }

        public static async Task<PagedResult<T>> GetPagedAsync<T>(this IQueryable<T> query,
                                         int offset, int limit) where T : class
        {
            var result = new PagedResult<T>();
            result.Offset = offset;
            result.Limit = limit;
            result.TotalItems = await query.CountAsync();
            result.Items = await query.Skip(offset).Take(limit).ToListAsync();

            return result;
        }
    }
}
