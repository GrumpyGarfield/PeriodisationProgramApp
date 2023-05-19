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
            var result = trainingPrograms.Translate<TrainingProgram, TrainingProgramDto>(mapper);

            if (userId != null)
            {
                for (var i = 0; i < trainingPrograms.Items.Count; i++)
                {
                    if (trainingPrograms.Items[i].UserTrainingProgramLikes.Any(l => l.UserId == userId))
                    {
                        result.Items[i].IsLiked = true;
                    }

                    if (trainingPrograms.Items[i].UserTrainingProgramRatings.Any(l => l.UserId == userId))
                    {
                        result.Items[i].IsRated = true;
                        result.Items[i].UserRating = trainingPrograms.Items[i].UserTrainingProgramRatings.First(l => l.UserId == userId).Rating;
                    }
                }
            }

            return result;
        }

        public static TrainingProgramDto TranslateToDto(this TrainingProgram trainingProgram, IMapper mapper, Guid? userId)
        {
            var result = trainingProgram.Translate<TrainingProgram, TrainingProgramDto>(mapper);

            if (userId != null)
            {
                if (trainingProgram.UserTrainingProgramLikes.Any(l => l.UserId == userId))
                {
                    result.IsLiked = true;
                }

                if (trainingProgram.UserTrainingProgramRatings.Any(l => l.UserId == userId))
                {
                    result.IsRated = true;
                }
            }

            return result;
        }
    }
}
