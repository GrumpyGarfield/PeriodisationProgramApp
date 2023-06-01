using PeriodisationProgramApp.Domain.Entities;
using PeriodisationProgramApp.Domain.Enums;

namespace PeriodisationProgramApp.Domain.Interfaces
{
    public interface IExerciseRepository : ICommunityEntityRepository<Exercise, UserExerciseLike, UserExerciseRating>
    {
        Task<Exercise> GetWithUsersDataAsync(Guid exerciseId);

        Task<Exercise> GetByIdAsync(Guid exerciseId, Guid? userId = null);

        IEnumerable<Exercise> GetRandomExercisesForMuscleGroup(MuscleGroupType muscleGroupType, int number);

        IEnumerable<Exercise> GetRandomExercisesOfTypeForMuscleGroup(MuscleGroupType muscleGroupType, ExerciseType exerciseType, int number);
    }
}