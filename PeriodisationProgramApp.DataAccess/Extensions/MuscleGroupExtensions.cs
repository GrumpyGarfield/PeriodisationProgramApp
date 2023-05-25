using Microsoft.EntityFrameworkCore;
using PeriodisationProgramApp.Domain.Entities;

namespace PeriodisationProgramApp.DataAccess.Extensions
{
    public static class MuscleGroupExtensions
    {
        public static IQueryable<MuscleGroup> IncludeAll(this IQueryable<MuscleGroup> query, Guid? userId = null)
        {
            return query.Include(m => m.MuscleGroupUsersData.Where(d => d.UserId.Equals(userId)));
        }
    }
}