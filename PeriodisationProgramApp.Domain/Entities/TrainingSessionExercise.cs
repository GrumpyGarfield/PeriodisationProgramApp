namespace PeriodisationProgramApp.Domain.Entities
{
    public class TrainingSessionExercise : Entity
    {
        public Guid TrainingSessionId { get; set; }

        public Exercise? Exercise { get; set; }

        public int Sets { get; set; }
    }
}
