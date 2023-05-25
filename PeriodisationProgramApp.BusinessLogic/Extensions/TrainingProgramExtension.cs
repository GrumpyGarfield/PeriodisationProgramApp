using AutoMapper;
using PeriodisationProgramApp.BusinessLogic.Domain;
using PeriodisationProgramApp.BusinessLogic.Domain.Dto;
using PeriodisationProgramApp.Domain.Entities;
using PeriodisationProgramApp.Domain.Enums;
using PeriodisationProgramApp.Domain.Extensions;
using PeriodisationProgramApp.Domain.Pagination;

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

        public static PagedResult<TrainingProgramDto> TranslateToDto(this PagedResult<TrainingProgram> trainingPrograms, IMapper mapper, Guid? userId)
        {
            return trainingPrograms.TranslateToDto<TrainingProgram, TrainingProgramDto, UserTrainingProgramLike, UserTrainingProgramRating>(mapper, userId);
        }

        public static TrainingProgramDto TranslateToDto(this TrainingProgram trainingProgram, IMapper mapper, Guid? userId)
        {
            return trainingProgram.TranslateToDto<TrainingProgram, TrainingProgramDto, UserTrainingProgramLike, UserTrainingProgramRating>(mapper, userId);
        }
    }
}
