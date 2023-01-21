using PeriodisationProgramApp.Domain.Entities;

namespace PeriodisationProgramApp.Domain.Extensions
{
    public static class MuscleGroupExtensions
    {
        private delegate double Round(double a);

        public static int GetTrainingWeekSets(this MuscleGroup muscleGroup, int week, int mesocycleLength, int numberOfSessions = 2)
        {
            var trainingWeekSets = (int)Math.Round(muscleGroup.MinimumEffectiveVolume + (double)(muscleGroup.MaximumRecoverableVolume - muscleGroup.MinimumEffectiveVolume + muscleGroup.MaximumRecoverableVolumeMultiplicator * (numberOfSessions - 2)) * (week - 1) / (mesocycleLength - 1));
            
            return trainingWeekSets;
        }

        public static int GetTrainingSessionSets(this MuscleGroup muscleGroup, int week, int mesocycleLength, int numberOfSessions = 2, bool roundUp = true)
        {
            Round roundingMethod = roundUp ? Math.Ceiling : Math.Floor;

            var trainingWeekSets = GetTrainingWeekSets(muscleGroup, week, mesocycleLength);
            var trainingSessionSets = (int)roundingMethod(trainingWeekSets / numberOfSessions);

            return trainingSessionSets;
        }
    }
}
