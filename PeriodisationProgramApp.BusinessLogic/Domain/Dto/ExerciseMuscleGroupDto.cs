using PeriodisationProgramApp.BusinessLogic.Domain.Dto;
using PeriodisationProgramApp.Domain.Enums;

namespace PeriodisationProgramApp.BusinessLogic.Dto
{
    public class ExerciseMuscleGroupDto : BaseEntityDto
    {
        public MuscleGroupDto? MuscleGroup { get; set; }

        public MuscleGroupRole MuscleGroupRole { get; set; }
    }
}

