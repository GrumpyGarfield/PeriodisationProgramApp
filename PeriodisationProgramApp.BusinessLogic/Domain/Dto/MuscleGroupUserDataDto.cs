using PeriodisationProgramApp.BusinessLogic.Domain.Dto;

namespace PeriodisationProgramApp.Domain.Entities
{
    public class MuscleGroupUserDataDto : BaseEntityDto
    {
        public int MaintenanceVolume { get; set; }

        public int MinimumEffectiveVolume { get; set; }

        public int MaximumRecoverableVolume { get; set; }
    }
}


