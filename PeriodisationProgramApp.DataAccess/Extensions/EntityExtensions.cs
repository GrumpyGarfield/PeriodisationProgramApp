using Microsoft.EntityFrameworkCore;
using PeriodisationProgramApp.Common.Filtering;
using PeriodisationProgramApp.Common.Sorting;
using PeriodisationProgramApp.Domain.Entities;
using PeriodisationProgramApp.Domain.Interfaces;
using PeriodisationProgramApp.Domain.Pagination;

namespace PeriodisationProgramApp.DataAccess.Extensions
{
    public static class EntityExtensions
    {
        public static void MarkAsCreated<T>(this T entity) where T : BaseEntity
        {
            entity.Created = DateTime.UtcNow;
            entity.Updated = DateTime.UtcNow;
        }

        public static void MarkAsUpdated<T>(this T entity) where T : BaseEntity
        {
            entity.Updated = DateTime.UtcNow;
        }
    }
}
