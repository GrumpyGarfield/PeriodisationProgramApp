namespace PeriodisationProgramApp.Domain.Entities
{
    public class UserTrainingProgramLike : Entity
    {
        public UserTrainingProgramLike() { }

        public UserTrainingProgramLike(TrainingProgram trainingProgram)
        {
            TrainingProgram = trainingProgram;
        }

        public Guid UserId { get; set; }

        public TrainingProgram? TrainingProgram { get; set; }
    }
}

