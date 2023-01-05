namespace PeriodisationProgramApp.Domain.Entities
{
    public class MuscleGroup : Entity
    {
        public string? Name { get; set; }

        public int MaintenanceVolume { get; set; }

        public int MinimumEffectiveVolume { get; set; }

        public int MaximumRecoverableVolume { get; set; }

        public Guid UserId { get; set; }
    }
}
