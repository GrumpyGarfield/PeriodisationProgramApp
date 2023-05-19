namespace PeriodisationProgramApp.Domain.Entities
{
    public class UserExerciseLike : Entity
    {
        public Guid UserId { get; set; }

        public Guid ExerciseId { get; set; }
    }
}

