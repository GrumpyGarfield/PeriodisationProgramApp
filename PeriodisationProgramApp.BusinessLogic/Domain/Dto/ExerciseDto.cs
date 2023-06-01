using PeriodisationProgramApp.BusinessLogic.Dto;
using PeriodisationProgramApp.Domain.Enums;

namespace PeriodisationProgramApp.BusinessLogic.Domain.Dto
{
    public class ExerciseDto : CommunityEntityDto
    {
        public string? Name { get; set; }

        public string? Description { get; set; }

        public string? YoutubeLink { get; set; }

        public ExerciseType Type { get; set; }

        public List<ExerciseMuscleGroupDto> ExerciseMuscleGroups { get; set; } = new();

        public int RawStimulusMagnitude { get; set; }

        public int FatigueMagnitude { get; set; }

        public double StimulusToFatigueRatio { get; set; }

        public ExerciseUserDataDto? ExerciseUserData { get; set; }
    }
}
