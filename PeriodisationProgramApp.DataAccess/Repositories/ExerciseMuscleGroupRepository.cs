using Microsoft.EntityFrameworkCore;
using PeriodisationProgramApp.Configuration.Interfaces;
using PeriodisationProgramApp.Domain.Entities;
using PeriodisationProgramApp.Domain.Interfaces;

namespace PeriodisationProgramApp.DataAccess.Repositories
{
    public class ExerciseMuscleGroupRepository : GenericRepository<ExerciseMuscleGroup>, IExerciseMuscleGroupRepository
    {
        private readonly IDefaultDataSettings _defaultDataSettings;

        public ExerciseMuscleGroupRepository(ApplicationContext context, IDefaultDataSettings defaultDataSettings) : base(context)
        {
            _defaultDataSettings = defaultDataSettings;
        }
    }
}