namespace PeriodisationProgramApp.Domain.Entities
{
    public class UserTrainingProgramLike : Entity
    {
        public Guid UserId { get; set; }

        public Guid TrainingProgramId { get; set; }
    }
}

