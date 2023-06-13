namespace PeriodisationProgramApp.Domain.Entities
{
    public class TrainingSessionExercise : BaseEntity
    {
        public TrainingSessionExercise() { }

        public TrainingSessionExercise(Exercise exercise, int sets = 0)
        {
            Exercise = exercise;
            Sets = sets;
        }

        public Guid TrainingSessionId { get; set; }

        public Exercise? Exercise { get; set; }

        public int Sets { get; set; }
    }
}
