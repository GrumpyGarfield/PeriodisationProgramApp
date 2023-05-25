using PeriodisationProgramApp.Domain.Enums;

namespace PeriodisationProgramApp.BusinessLogic.Domain.Dto
{
    public class TrainingProgramDto : CommunityEntityDto
    {
        public string? Name { get; set; }

        public string? Description { get; set; }

        public TrainingProgramType Type { get; set; }

        public TrainingLevel TrainingLevel { get; set; }

        public int NumberOfSessions { get; set; }
    }
}
