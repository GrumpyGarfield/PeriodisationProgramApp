using PeriodisationProgramApp.Domain.Enums;

namespace PeriodisationProgramApp.BusinessLogic.Domain.Dto
{
    public class UpdateExerciseMuscleGroupDto
    {
        public Guid MuscleGroupId { get; set; }

        public MuscleGroupRole MuscleGroupRole { get; set; }
    }
}
