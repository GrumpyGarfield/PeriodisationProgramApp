using PeriodisationProgramApp.Domain.Interfaces;

namespace PeriodisationProgramApp.Domain.Entities
{
    public class UserExerciseRating : Entity, IUserRating
    {

        public Guid UserId { get; set; }

        public Guid ExerciseId { get; set; }

        public int Rating { get; set; }
    }
}

