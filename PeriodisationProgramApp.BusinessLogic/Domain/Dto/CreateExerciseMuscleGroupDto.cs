using PeriodisationProgramApp.Domain.Enums;

namespace PeriodisationProgramApp.BusinessLogic.Domain.Dto
{
    public class CreateExerciseMuscleGroupDto
    {
        public Guid MuscleGroupId { get; set; }

        public MuscleGroupRole MuscleGroupRole { get; set; }
    }
}
