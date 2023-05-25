using PeriodisationProgramApp.Domain.Interfaces;

namespace PeriodisationProgramApp.Domain.Entities
{
    public class UserTrainingProgramLike : Entity, IUserLike
    {
        public Guid UserId { get; set; }

        public Guid TrainingProgramId { get; set; }
    }
}

