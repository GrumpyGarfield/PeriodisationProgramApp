using PeriodisationProgramApp.Domain.Enums;

namespace PeriodisationProgramApp.BusinessLogic.Domain.Dto
{
    public class TrainingProgramDto : BaseEntityDto
    {

        public string? Name { get; set; }

        public string? Description { get; set; }

        public bool IsPublic { get; set; }

        public int Likes { get; set; }

        public double Rating { get; set; }

        public TrainingProgramType Type { get; set; }

        public TrainingLevel TrainingLevel { get; set; }

        public int NumberOfSessions { get; set; }

        public UserDto? User { get; set; }
    }
}
