using Microsoft.EntityFrameworkCore;
using PeriodisationProgramApp.Configuration.Interfaces;
using PeriodisationProgramApp.Domain.Entities;
using PeriodisationProgramApp.Domain.Interfaces;

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
    }
}