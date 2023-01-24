using Microsoft.EntityFrameworkCore;
using PeriodisationProgramApp.Configuration.Interfaces;
using PeriodisationProgramApp.Domain.Entities;
using PeriodisationProgramApp.Domain.Enums;
using PeriodisationProgramApp.Domain.Extensions;
using PeriodisationProgramApp.Domain.Interfaces;
using System.Linq.Expressions;

namespace PeriodisationProgramApp.DataAccess.Repositories
{
    public class ExerciseRepository : GenericRepository<Exercise>, IExerciseRepository
    {
        private readonly IDefaultDataSettings _defaultDataSettings;

        public ExerciseRepository(ApplicationContext context, IDefaultDataSettings defaultDataSettings) : base(context)
        {
            _defaultDataSettings = defaultDataSettings;
        }

        public IEnumerable<Exercise> GetDefaultExercises()
        {
            return _context.Exercises.Where(e => e.UserId == _defaultDataSettings.DefaultUser!.Id)
                                     .Include(e => e.ExerciseMuscleGroups)
                                        .ThenInclude(e => e.MuscleGroup);
        }

        public IEnumerable<Exercise> GetRandomExercisesForMuscleGroup(MuscleGroupType muscleGroupType, int number)
        {
            return _context.Exercises.Include(e => e.ExerciseMuscleGroups)
                                     .ThenInclude(e => e.MuscleGroup)
                                     .Where(e => e.ExerciseMuscleGroups.Where(m => m.MuscleGroup!.Type == muscleGroupType && m.MuscleGroupRole == MuscleGroupRole.Target).Any())
                                     .OrderBy(r => EF.Functions.Random())
                                     .Take(number);
        }

        public IEnumerable<Exercise> GetRandomExercisesOfTypeForMuscleGroup(MuscleGroupType muscleGroupType, ExerciseType exerciseType, int number)
        {
            return _context.Exercises.Include(e => e.ExerciseMuscleGroups)
                                     .ThenInclude(e => e.MuscleGroup)
                                     .Where(e => e.ExerciseMuscleGroups.Where(m => m.MuscleGroup!.Type == muscleGroupType && m.MuscleGroupRole == MuscleGroupRole.Target).Any() && e.Type == exerciseType)
                                     .OrderBy(r => EF.Functions.Random())
                                     .Take(number);
        }
    }
}