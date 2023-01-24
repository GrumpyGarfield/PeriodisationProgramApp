using PeriodisationProgramApp.BusinessLogic.Domain;
using PeriodisationProgramApp.Domain.Entities;
using PeriodisationProgramApp.Domain.Enums;
using PeriodisationProgramApp.Domain.Extensions;

namespace PeriodisationProgramApp.BusinessLogic.Extensions
{
    public static class TrainingProgramExtension
    {
        public static List<TrainingWeekVolume> GetVolume(this TrainingProgram trainingProgram)
        {
            var trainingWeekVolumes = new List<TrainingWeekVolume>();
            var mesocycleLength = trainingProgram.Sessions.Select(s => s.Week).Max();

            for (var i = 1; i <= mesocycleLength; i++)
            {
                var trainingWeekVolume = new TrainingWeekVolume(i);
                var exercises = trainingProgram.Sessions.Where(s => s.Week == i).SelectMany(s => s.Exercises);

                foreach (MuscleGroupType muscleGroupType in (MuscleGroupType[])Enum.GetValues(typeof(MuscleGroupType)))
                {
                    var volume = exercises.GetVolume(muscleGroupType);
                    trainingWeekVolume.MuscleGroupVolumes.Add(new MuscleGroupVolume(muscleGroupType, volume));
                }

                trainingWeekVolumes.Add(trainingWeekVolume);
            }

            return trainingWeekVolumes;
        }
    }
}
