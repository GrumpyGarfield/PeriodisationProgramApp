using PeriodisationProgramApp.Domain.Entities;
using PeriodisationProgramApp.Domain.Enums;
using System.Linq.Expressions;

namespace PeriodisationProgramApp.Domain.Interfaces
{
    public interface IExerciseRepository : IGenericRepository<Exercise>
    {
        IEnumerable<Exercise> GetDefaultExercises();

        IEnumerable<Exercise> GetRandomExercisesForMuscleGroup(MuscleGroupType muscleGroupType, int number);

        IEnumerable<Exercise> GetRandomExercisesOfTypeForMuscleGroup(MuscleGroupType muscleGroupType, ExerciseType exerciseType, int number);
    }
}