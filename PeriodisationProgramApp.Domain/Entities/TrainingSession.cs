namespace PeriodisationProgramApp.Domain.Entities
{
    public class TrainingSession : Entity
    {
        public int Week { get; set; }

        public DayOfWeek DayOfWeek { get; set; }

        public int RepsInReserve { get; set; }

        public List<TrainingSessionExercise> Exercises { get; set; } = new();
    }
}
