using PeriodisationProgramApp.Domain.Enums;

namespace PeriodisationProgramApp.Domain.Entities
{
    public class TrainingProgram : Entity
    {
        public string? Name { get; set; }

        public string? Description { get; set; }

        public List<TrainingSession> Sessions { get; set; } = new();

        public Guid UserId { get; set; }

        public User? User { get; set; }

        public bool IsPublic { get; set; }

        public int Likes { get; set; }

        public int Rates { get; set; }

        public double Rating { get; set; }

        public TrainingProgramType Type { get; set; }

        public TrainingLevel TrainingLevel { get; set; }

        public int NumberOfSessions { get; set; }

        public List<UserTrainingProgramLike> UserTrainingProgramLikes { get; set; } = new();

        public List<UserTrainingProgramRating> UserTrainingProgramRatings { get; set; } = new();
    }
}
