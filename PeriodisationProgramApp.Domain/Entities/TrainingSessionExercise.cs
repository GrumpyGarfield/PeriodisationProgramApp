namespace PeriodisationProgramApp.Domain.Entities
{
    public class TrainingSessionExercise : BaseEntity
    {
        public Guid TrainingSessionId { get; set; }

        public Exercise? Exercise { get; set; }

        public int Sets { get; set; }

        public int Order { get; set; }
    }
}
