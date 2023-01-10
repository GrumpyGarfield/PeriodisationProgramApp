using PeriodisationProgramApp.Domain.Entities;
using PeriodisationProgramApp.Domain.Enums;

namespace PeriodisationProgramApp.Domain.Interfaces
{
    public interface IExerciseRepository : IGenericRepository<Exercise>
    {
        IEnumerable<Exercise> GetDefaultExercises();

        IEnumerable<Exercise> GetRandomExercisesOfType(MuscleGroupType type, int number);
    }
}