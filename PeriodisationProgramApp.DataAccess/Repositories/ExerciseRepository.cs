using Microsoft.EntityFrameworkCore;
using PeriodisationProgramApp.DataAccess.Extensions;
using PeriodisationProgramApp.Domain.Entities;
using PeriodisationProgramApp.Domain.Enums;
using PeriodisationProgramApp.Domain.Interfaces;
using PeriodisationProgramApp.Domain.Pagination;

namespace PeriodisationProgramApp.DataAccess.Repositories
{
    public class ExerciseRepository : CommunityEntityRepository<Exercise, UserExerciseLike, UserExerciseRating>, IExerciseRepository
    {
        public ExerciseRepository(ApplicationContext context) : base(context)
        {
        }

        protected override async Task<PagedResult<Exercise>> GetPagedAsync(IQueryable<Exercise> query, IPageableQueryContext context, Guid? userId = null)
        {
            var targetMuscleGroupFilter = context.Filters!.FirstOrDefault(f => f.Key == "targetMuscleGroup");

            if (!targetMuscleGroupFilter.Equals(default(KeyValuePair<string, string>)))
            {
                var filterValues = targetMuscleGroupFilter.Value.Split(',').Select(value => (MuscleGroupType)Enum.Parse(typeof(MuscleGroupType), value));

                query = query.Where(e => e.ExerciseMuscleGroups.Where(m => m.MuscleGroupRole == MuscleGroupRole.Target && filterValues.Contains(m.MuscleGroupType))
                                                                .Any());
            }

            return await IncludeAll(query, userId)
                        .SortAndFilter<Exercise, UserExerciseLike, UserExerciseRating>(context)
                        .GetPagedAsync(context.Offset, context.Limit);
        }

        protected override IQueryable<Exercise> IncludeAll(IQueryable<Exercise> query, Guid? userId = null)
        {
            return query.Include(t => t.User)
                        .Include(t => t.UserLikes)
                        .Include(t => t.UserRatings)
                        .Include(t => t.ExerciseMuscleGroups)
                        .Include(t => t.ExerciseUsersData.Where(d => d.UserId.Equals(userId)));
        }

        public IEnumerable<Exercise> GetRandomExercisesForMuscleGroup(MuscleGroupType muscleGroupType, int number)
        {
            return _context.Exercises.Include(e => e.ExerciseMuscleGroups)
                                     .Where(e => e.ExerciseMuscleGroups.Where(m => m.MuscleGroupType == muscleGroupType && m.MuscleGroupRole == MuscleGroupRole.Target).Any())
                                     .OrderBy(r => EF.Functions.Random())
                                     .Take(number);
        }

        public IEnumerable<Exercise> GetRandomExercisesOfTypeForMuscleGroup(MuscleGroupType muscleGroupType, ExerciseType exerciseType, int number)
        {
            return _context.Exercises.Include(e => e.ExerciseMuscleGroups)
                                     .Where(e => e.ExerciseMuscleGroups.Where(m => m.MuscleGroupType == muscleGroupType && m.MuscleGroupRole == MuscleGroupRole.Target).Any() && e.Type == exerciseType)
                                     .OrderBy(r => EF.Functions.Random())
                                     .Take(number);
        }
    }
}