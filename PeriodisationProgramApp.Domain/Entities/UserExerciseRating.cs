namespace PeriodisationProgramApp.Domain.Entities
{
    public class UserExerciseRating : Entity
    {

        public Guid UserId { get; set; }

        public Guid ExerciseId { get; set; }

        public int Rating { get; set; }
    }
}

