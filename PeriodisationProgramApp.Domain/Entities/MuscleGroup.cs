using PeriodisationProgramApp.Domain.Enums;

namespace PeriodisationProgramApp.Domain.Entities
{
    public class MuscleGroup : BaseEntity
    {
        public MuscleGroupType Type { get; set; }

        public int MaintenanceVolume { get; set; }

        public int MinimumEffectiveVolume { get; set; }

        public int MaximumRecoverableVolume { get; set; }

        public int MaximumRecoverableVolumeMultiplicator { get; set; }

        public int AverageRecoveryTime { get; set; }

        public List<MuscleGroupUserData> MuscleGroupUsersData { get; set; } = new();

        public void Update(MuscleGroup other)
        {
            Type = other.Type;
            MaintenanceVolume = other.MaintenanceVolume;
            MinimumEffectiveVolume = other.MinimumEffectiveVolume;
            MaximumRecoverableVolume = other.MaximumRecoverableVolume;
            MaximumRecoverableVolumeMultiplicator = other.MaximumRecoverableVolumeMultiplicator;
            AverageRecoveryTime = other.AverageRecoveryTime;
        }
    }
}
