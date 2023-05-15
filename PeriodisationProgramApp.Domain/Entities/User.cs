namespace PeriodisationProgramApp.Domain.Entities
{
    public class User : Entity, IEquatable<User>
    {
        public string? FirebaseId { get; set; }

        public string? Username { get; set; }

        public string? Email { get; set; }

        public List<TrainingProgram> TrainingPrograms { get; set; } = new();

        public List<Exercise> Exercises { get; set; } = new();

        public List<MuscleGroup> MuscleGroups { get; set; } = new();

        public List<UserTrainingProgramLike> UserTrainingProgramLikes { get; set; } = new();

        public List<UserTrainingProgramRating> UserTrainingProgramRatings { get; set; } = new();

        public bool Equals(User? other)
        {
            if (other == null) { return false; }

            if (Username != other.Username) return false;

            if (Email != other.Email) return false;

            return true;
        }

        public void Update(User other)
        {
            Username = other.Username;
            Email = other.Email;
        }
    }
}
