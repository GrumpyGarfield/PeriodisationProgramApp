namespace PeriodisationProgramApp.Domain.Entities
{
    public class UserTrainingProgramRating : Entity
    {
        public UserTrainingProgramRating() { }

        public UserTrainingProgramRating(TrainingProgram trainingProgram, int rating)
        {
            TrainingProgram = trainingProgram;
            Rating = rating;
        }

        public Guid UserId { get; set; }

        public TrainingProgram? TrainingProgram { get; set; }

        public int Rating { get; set; }
    }
}

