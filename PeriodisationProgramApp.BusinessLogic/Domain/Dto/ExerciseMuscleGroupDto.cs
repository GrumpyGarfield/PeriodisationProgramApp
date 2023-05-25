using PeriodisationProgramApp.BusinessLogic.Domain.Dto;
using PeriodisationProgramApp.Domain.Enums;

namespace PeriodisationProgramApp.BusinessLogic.Dto
{
    public class ExerciseMuscleGroupDto : BaseEntityDto
    {
        public MuscleGroupType MuscleGroupType { get; set; }

        public MuscleGroupRole MuscleGroupRole { get; set; }
    }
}

