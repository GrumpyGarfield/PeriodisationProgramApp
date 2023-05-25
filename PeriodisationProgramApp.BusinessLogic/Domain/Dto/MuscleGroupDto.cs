using PeriodisationProgramApp.Domain.Entities;
using PeriodisationProgramApp.Domain.Enums;

namespace PeriodisationProgramApp.BusinessLogic.Domain.Dto
{
    public class MuscleGroupDto : BaseEntityDto
    {
        public MuscleGroupType Type { get; set; }

        public int MaintenanceVolume { get; set; }

        public int MinimumEffectiveVolume { get; set; }

        public int MaximumRecoverableVolume { get; set; }

        public int MaximumRecoverableVolumeMultiplicator { get; set; }

        public int AverageRecoveryTime { get; set; }

        public MuscleGroupUserDataDto? MuscleGroupUserData { get; set; }
    }
}
