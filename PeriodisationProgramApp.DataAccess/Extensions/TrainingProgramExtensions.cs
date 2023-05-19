﻿using Microsoft.EntityFrameworkCore;
using PeriodisationProgramApp.Domain.Entities;
using PeriodisationProgramApp.Domain.Interfaces;

namespace PeriodisationProgramApp.DataAccess.Extensions
{
    public static class TrainingProgramExtensions
    {
        public static IQueryable<TrainingProgram> GetAllWithContext(this IQueryable<TrainingProgram> query,
                                         IPageableQueryContext context)
        {
            return query.IncludeUserInfo()
                        .FilterBy(context.Filters)
                        .SortBy(context.SortField, context.SortDirection);
        }

        public static IQueryable<TrainingProgram> IncludeUserInfo(this IQueryable<TrainingProgram> query)
        {
            return query.Include(t => t.User)
                        .Include(t => t.UserTrainingProgramLikes)
                        .Include(t => t.UserTrainingProgramRatings);
        }
    }
}