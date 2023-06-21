using PeriodisationProgramApp.BusinessLogic.Domain.Dto;

namespace PeriodisationProgramApp.BusinessLogic.Dto
{
    public class TrainingSessionExerciseDto : BaseEntityDto
    {
        public ExerciseDto? Exercise { get; set; }

        public int Sets { get; set; }

        public int Order { get; set; }
    }
}
