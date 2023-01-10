using PeriodisationProgramApp.Domain.Entities;
using PeriodisationProgramApp.Domain.Enums;

namespace PeriodisationProgramApp.Domain.Extensions
{
    public static class EntityExtensions
    {
        public static IEnumerable<Exercise> TargetExercises(this IEnumerable<Exercise> exercises, MuscleGroupType muscleGroupType)
        {
            return exercises.Where(e => e.ExerciseMuscleGroups.Where(m => m.MuscleGroup!.Type == muscleGroupType && m.MuscleGroupRole == MuscleGroupRole.Target).Any());
        }
    }
}
