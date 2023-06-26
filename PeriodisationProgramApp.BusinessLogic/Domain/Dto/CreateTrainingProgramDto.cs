using PeriodisationProgramApp.Domain.Enums;

namespace PeriodisationProgramApp.BusinessLogic.Domain.Dto
{
    public class CreateTrainingProgramDto
    {
        public string? Name { get; set; }

        public string? Description { get; set; }

        public TrainingProgramType Type { get; set; }

        public TrainingLevel TrainingLevel { get; set; }

        public int NumberOfSessions { get; set; }

        public int MesocycleLength { get; set; }

        public bool IsPublic { get; set; }

        public bool UseCommunityCreatedExercises { get; set; }

        public bool UseMyExercises { get; set; }
    }
}

