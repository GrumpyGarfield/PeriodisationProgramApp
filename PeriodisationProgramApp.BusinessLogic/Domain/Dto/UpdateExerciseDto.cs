using PeriodisationProgramApp.Domain.Enums;

namespace PeriodisationProgramApp.BusinessLogic.Domain.Dto
{
    public class UpdateExerciseDto
    {
        public string? Name { get; set; }

        public string? Description { get; set; }

        public string? YoutubeLink { get; set; }

        public ExerciseType Type { get; set; }

        public List<UpdateExerciseMuscleGroupDto> ExerciseMuscleGroups { get; set; } = new();

        public int RawStimulusMagnitude { get; set; }

        public int FatigueMagnitude { get; set; }
    }
}

