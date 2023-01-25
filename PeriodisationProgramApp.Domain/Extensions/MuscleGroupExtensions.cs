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

        public static int GetTrainingSessionSets(this MuscleGroup muscleGroup, int week, int mesocycleLength, int numberOfSessions = 2, bool isEven = true, TrainingLevel trainingLevel = TrainingLevel.Intermediate)
        {
            var roundingMethod = GetRoundingMethod(isEven);

            var trainingWeekSets = GetTrainingWeekSets(muscleGroup, week, mesocycleLength, numberOfSessions, trainingLevel);
            var trainingSessionSets = (int)roundingMethod(trainingWeekSets / numberOfSessions);

            //Maximum adaptive volume of any muscle group per session is generally no lower than 4 sets
            //So we combining lower every two volume sessions to a single session
            //Could lead to slightly more volume, but not to extreme extend
            if (trainingSessionSets < 3)
            {
                var oppositeRoundingMethod = GetRoundingMethod(!isEven);
                var nextTrainingSessionSets = (int)oppositeRoundingMethod(trainingWeekSets / numberOfSessions);
                trainingSessionSets = isEven ? trainingSessionSets + nextTrainingSessionSets : 0;
            }

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

        private static Round GetRoundingMethod(bool isEven)
        {
            return isEven ? Math.Ceiling : Math.Floor;
        }
    }
}
