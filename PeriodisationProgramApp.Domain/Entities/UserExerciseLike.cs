using PeriodisationProgramApp.Domain.Interfaces;

namespace PeriodisationProgramApp.Domain.Entities
{
    public class UserExerciseLike : Entity, IUserLike
    {
        public Guid UserId { get; set; }

        public Guid ExerciseId { get; set; }
    }
}

