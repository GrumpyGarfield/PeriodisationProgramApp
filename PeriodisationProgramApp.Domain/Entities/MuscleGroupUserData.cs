namespace PeriodisationProgramApp.Domain.Entities
{
    public class MuscleGroupUserData : BaseEntity
    {
        public Guid UserId { get; set; }

        public Guid MuscleGroupId { get; set; }

        public int MaintenanceVolume { get; set; }

        public int MinimumEffectiveVolume { get; set; }

        public int MaximumRecoverableVolume { get; set; }
    }
}

