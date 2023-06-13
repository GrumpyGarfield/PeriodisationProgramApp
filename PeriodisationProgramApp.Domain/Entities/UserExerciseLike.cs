using PeriodisationProgramApp.Domain.Interfaces;

namespace PeriodisationProgramApp.Domain.Entities
{
    public class UserExerciseLike : BaseEntity, IUserLike
    {
        public Guid UserId { get; set; }

        public Guid ExerciseId { get; set; }
    }
}

