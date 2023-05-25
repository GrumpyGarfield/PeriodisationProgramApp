using PeriodisationProgramApp.Domain.Entities;
using PeriodisationProgramApp.Domain.Enums;
using System.Linq.Expressions;

namespace PeriodisationProgramApp.Domain.Interfaces
{
    public interface IExerciseRepository : ICommunityEntityRepository<Exercise, UserExerciseLike, UserExerciseRating>
    {
        IEnumerable<Exercise> GetRandomExercisesForMuscleGroup(MuscleGroupType muscleGroupType, int number);

        IEnumerable<Exercise> GetRandomExercisesOfTypeForMuscleGroup(MuscleGroupType muscleGroupType, ExerciseType exerciseType, int number);
    }
}