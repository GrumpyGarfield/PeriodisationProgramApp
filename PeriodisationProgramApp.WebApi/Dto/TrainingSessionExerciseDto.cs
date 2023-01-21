using PeriodisationProgramApp.Domain.Entities;

namespace PeriodisationProgramApp.WebApi.Dto
{
    public class TrainingSessionExerciseDto
    {
        public ExerciseDto? Exercise { get; set; }

        public int Sets { get; set; }
    }
}
