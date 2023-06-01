using PeriodisationProgramApp.Domain.Entities;
using PeriodisationProgramApp.Domain.Enums;

namespace PeriodisationProgramApp.Domain.Extensions
{
    public static class ExerciseExtensions
    {
        public static IEnumerable<Exercise> TargetExercises(this IEnumerable<Exercise> exercises, MuscleGroupType muscleGroupType)
        {
            return exercises.Where(e => e.HasTargetMuscleGroup(muscleGroupType));
        }

        public static double GetVolume(this Exercise exercise, MuscleGroupType muscleGroupType)
        {
            var exerciseMuscleGroup = exercise.ExerciseMuscleGroups.FirstOrDefault(e => e.MuscleGroup!.Type == muscleGroupType);

            return exerciseMuscleGroup!.MuscleGroupRole switch
            {
                MuscleGroupRole.Target => 1,
                MuscleGroupRole.MajorSynergist => (double) 2 / 3,
                MuscleGroupRole.MinorSynergist => (double) 1 / 3,
                _ => 0
            };
        }

        public static bool HasMuscleGroup(this Exercise exercise, MuscleGroupType muscleGroupType)
        {
            return exercise.ExerciseMuscleGroups.Where(m => m.MuscleGroup!.Type == muscleGroupType).Any();
        }

        public static bool HasTargetMuscleGroup(this Exercise exercise, MuscleGroupType muscleGroupType)
        {
            return exercise.ExerciseMuscleGroups.Where(m => m.MuscleGroup!.Type == muscleGroupType && m.MuscleGroupRole == MuscleGroupRole.Target).Any();
        }
    }
}
