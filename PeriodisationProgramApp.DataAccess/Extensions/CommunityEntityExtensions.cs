using Microsoft.EntityFrameworkCore;
using PeriodisationProgramApp.Domain.Entities;
using PeriodisationProgramApp.Domain.Interfaces;

namespace PeriodisationProgramApp.DataAccess.Extensions
{
    public static class CommunityEntityExtensions
    {
        public static IQueryable<T> SortAndFilter<T, UserLike, UserRating>(this IQueryable<T> query,
                                         IPageableQueryContext context)
            where T : CommunityEntity<UserLike, UserRating>
            where UserLike : IUserLike
            where UserRating : IUserRating
        {
            return query.FilterBy(context.Filters)
                        .SortBy(context.SortField, context.SortDirection);
        }
    }
}