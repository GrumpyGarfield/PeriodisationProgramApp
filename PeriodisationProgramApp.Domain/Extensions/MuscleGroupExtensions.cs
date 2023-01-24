using PeriodisationProgramApp.Domain.Entities;
using PeriodisationProgramApp.Domain.Enums;

namespace PeriodisationProgramApp.Domain.Extensions
{
    public static class MuscleGroupExtensions
    {
        private delegate double Round(double a);

        public static int GetTrainingWeekSets(this MuscleGroup muscleGroup, int week, int mesocycleLength, int numberOfSessions = 2, TrainingLevel trainingLevel = TrainingLevel.Intermediate)
        {
            var maximumRecoverableVolume = (muscleGroup.MaximumRecoverableVolume + muscleGroup.MaximumRecoverableVolumeMultiplicator * (numberOfSessions - 2)) * GetTrainingLevelModificator(trainingLevel);
            var trainingWeekSets = (int)Math.Round(muscleGroup.MinimumEffectiveVolume + (double)(maximumRecoverableVolume - muscleGroup.MinimumEffectiveVolume) * (week - 1) / (mesocycleLength - 1));

            return trainingWeekSets;
        }

        public static int GetTrainingSessionSets(this MuscleGroup muscleGroup, int week, int mesocycleLength, int numberOfSessions = 2, bool roundUp = true, TrainingLevel trainingLevel = TrainingLevel.Intermediate)
        {
            Round roundingMethod = roundUp ? Math.Ceiling : Math.Floor;

            var trainingWeekSets = GetTrainingWeekSets(muscleGroup, week, mesocycleLength, numberOfSessions, trainingLevel);
            var trainingSessionSets = (int)roundingMethod(trainingWeekSets / numberOfSessions);

            return trainingSessionSets;
        }

        private static double GetTrainingLevelModificator(TrainingLevel trainingLevel)
        {
            return trainingLevel switch
            {
                TrainingLevel.Beginner => 0.6,
                TrainingLevel.Intermediate => 0.8,
                TrainingLevel.Advanced => 1,
                _ => 0.8
            };
        }
    }
}
