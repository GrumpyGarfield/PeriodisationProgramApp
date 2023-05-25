using PeriodisationProgramApp.Domain.Enums;

namespace PeriodisationProgramApp.Domain.Entities
{
    public class TrainingProgram : CommunityEntity<UserTrainingProgramLike, UserTrainingProgramRating>
    {
        public string? Name { get; set; }

        public string? Description { get; set; }

        public List<TrainingSession> Sessions { get; set; } = new();

        public TrainingProgramType Type { get; set; }

        public TrainingLevel TrainingLevel { get; set; }

        public int NumberOfSessions { get; set; }
    }
}
