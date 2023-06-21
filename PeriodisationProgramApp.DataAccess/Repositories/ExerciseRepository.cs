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

                query = query.Where(e => e.ExerciseMuscleGroups.Where(m => m.MuscleGroupRole == MuscleGroupRole.Target && filterValues.Contains(m.MuscleGroup!.Type))
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
                        .Include(t => t.TargetMuscleGroup)
                        .Include(t => t.ExerciseMuscleGroups.OrderBy(g => g.MuscleGroupRole).ThenBy(g => g.MuscleGroup!.Type))
                            .ThenInclude(g => g.MuscleGroup)
                        .Include(t => t.ExerciseUsersData.Where(d => d.UserId.Equals(userId)));
        }

        public override async Task<Exercise> GetWithUsersDataAsync(Guid exerciseId)
        {
            return await _context.Exercises.Include(t => t.User)
                                            .Include(t => t.UserLikes)
                                            .Include(t => t.UserRatings)
                                            .Include(t => t.TargetMuscleGroup)
                                            .Include(t => t.ExerciseMuscleGroups.OrderBy(g => g.MuscleGroupRole).ThenBy(g => g.MuscleGroup!.Type))
                                                .ThenInclude(g => g.MuscleGroup)
                                            .Include(t => t.ExerciseUsersData)
                                            .FirstAsync(m => m.Id == exerciseId);
        }

        public override async Task<Exercise> GetByIdAsync(Guid exerciseId, Guid? userId = null)
        {
            return await IncludeAll(_context.Exercises, userId).FirstAsync(m => m.Id == exerciseId);
        }

        public IEnumerable<Exercise> GetRandomExercisesForMuscleGroup(MuscleGroupType muscleGroupType, int number)
        {
            return _context.Exercises.Include(e => e.ExerciseMuscleGroups)
                                        .ThenInclude(g => g.MuscleGroup)
                                     .Where(e => e.ExerciseMuscleGroups.Where(m => m.MuscleGroup!.Type == muscleGroupType && m.MuscleGroupRole == MuscleGroupRole.Target).Any())
                                     .OrderBy(r => EF.Functions.Random())
                                     .Take(number);
        }

        public IEnumerable<Exercise> GetRandomExercisesOfTypeForMuscleGroup(MuscleGroupType muscleGroupType, ExerciseType exerciseType, int number)
        {
            return _context.Exercises.Include(e => e.ExerciseMuscleGroups)
                                        .ThenInclude(g => g.MuscleGroup)
                                     .Where(e => e.TargetMuscleGroup!.Type == muscleGroupType && e.Type == exerciseType)
                                     .OrderBy(r => EF.Functions.Random())
                                     .Take(number);
        }
    }
}