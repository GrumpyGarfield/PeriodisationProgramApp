using PeriodisationProgramApp.BusinessLogic.Domain.Dto;

namespace PeriodisationProgramApp.BusinessLogic.Dto
{
    public class TrainingSessionExerciseDto
    {
        public ExerciseDto? Exercise { get; set; }

        public int Sets { get; set; }
    }
}
