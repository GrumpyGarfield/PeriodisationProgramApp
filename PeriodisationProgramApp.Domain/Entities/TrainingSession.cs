namespace PeriodisationProgramApp.Domain.Entities
{
    public class TrainingSession : Entity
    {
        public TrainingSession(int week, DayOfWeek dayOfWeek, int repsInReserve)
        {
            Week = week;
            DayOfWeek = dayOfWeek;
            RepsInReserve = repsInReserve;
        }

        public int Week { get; set; }

        public DayOfWeek DayOfWeek { get; set; }

        public int RepsInReserve { get; set; }

        public List<TrainingSessionExercise> Exercises { get; set; } = new();
    }
}
