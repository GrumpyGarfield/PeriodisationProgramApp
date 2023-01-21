using PeriodisationProgramApp.Domain.Entities;
using PeriodisationProgramApp.Domain.Enums;

namespace PeriodisationProgramApp.Domain.Extensions
{
    public static class TrainingSessionExerciseExtensions
    {
        public static double GetVolume(this IEnumerable<TrainingSessionExercise> trainingSessionExercises, MuscleGroupType muscleGroupType)
        {
            var muscleGroupExercises = trainingSessionExercises.Where(t => t.Exercise!.HasMuscleGroup(muscleGroupType));
            var volume = muscleGroupExercises.Select(m => m.Exercise!.GetVolume(muscleGroupType) * m.Sets).Sum();

            return volume;
        }

        public static int GetTargetVolume(this IEnumerable<TrainingSessionExercise> trainingSessionExercises, MuscleGroupType muscleGroupType)
        {
            var muscleGroupExercises = trainingSessionExercises.Where(t => t.Exercise!.HasTargetMuscleGroup(muscleGroupType));
            var volume = muscleGroupExercises.Select(m => m.Sets).Sum();

            return volume;
        }
    }
}
