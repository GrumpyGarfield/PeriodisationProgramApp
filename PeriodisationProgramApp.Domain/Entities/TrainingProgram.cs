namespace PeriodisationProgramApp.Domain.Entities
{
    public class TrainingProgram : Entity
    {
        public string? Name { get; set; }

        public List<TrainingSession> Sessions { get; set; } = new();

        public Guid UserId { get; set; }

        public bool IsPublic { get; set; }
    }
}
