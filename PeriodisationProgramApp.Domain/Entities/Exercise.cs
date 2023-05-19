using PeriodisationProgramApp.Domain.Enums;

namespace PeriodisationProgramApp.Domain.Entities
{
    public class Exercise : Entity
    {
        public string? Name { get; set; }

        public ExerciseType Type { get; set; }

        public List<ExerciseMuscleGroup> ExerciseMuscleGroups { get; set; } = new();

        public int RawStimulusMagnitude { get; set; }

        public int FatigueMagnitude { get; set; }

        public double StimulusToFatigueRatio { get; set; }

        public Guid UserId { get; set; }

        public bool IsPublic { get; set; }

        public int Likes { get; set; }

        public int Rates { get; set; }

        public double Rating { get; set; }

        public List<UserExerciseLike> UserExerciseLikes { get; set; } = new();

        public List<UserExerciseRating> UserExerciseRatings { get; set; } = new();

        public void Update(Exercise other)
        {
            Name = other.Name;
            Type = other.Type;
            RawStimulusMagnitude = other.RawStimulusMagnitude;
            FatigueMagnitude = other.FatigueMagnitude;
            StimulusToFatigueRatio = other.StimulusToFatigueRatio;
            IsPublic = other.IsPublic;
        }
    }
}
