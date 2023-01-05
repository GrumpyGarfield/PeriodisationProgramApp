namespace PeriodisationProgramApp.Domain.Entities
{
    public class User : Entity
    {
        public string? Username { get; set; }

        public string? Email { get; set; }

        public string? Hash { get; set; }

        public string? Salt { get; set; }

        public List<TrainingProgram> TrainingPrograms { get; set; } = new();

        public List<Exercise> Exercises { get; set; } = new();

        public List<MuscleGroup> MuscleGroups { get; set; } = new();
    }
}
