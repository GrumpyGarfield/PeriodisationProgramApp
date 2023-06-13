using PeriodisationProgramApp.Domain.Interfaces;

namespace PeriodisationProgramApp.Domain.Entities
{
    public class UserTrainingProgramLike : BaseEntity, IUserLike
    {
        public Guid UserId { get; set; }

        public Guid TrainingProgramId { get; set; }
    }
}

