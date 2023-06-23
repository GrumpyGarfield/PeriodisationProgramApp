using PeriodisationProgramApp.Domain.Entities;
using PeriodisationProgramApp.Domain.Interfaces;

namespace PeriodisationProgramApp.DataAccess.Repositories
{
    public class TrainingSessionExerciseRepository : GenericRepository<TrainingSessionExercise>, ITrainingSessionExerciseRepository
    {
        public TrainingSessionExerciseRepository(ApplicationContext context) : base(context)
        {
        }
    }
}
