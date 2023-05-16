namespace PeriodisationProgramApp.Domain.Entities
{
    public class UserTrainingProgramRating : Entity
    {

        public Guid UserId { get; set; }

        public Guid TrainingProgramId { get; set; }

        public int Rating { get; set; }
    }
}

