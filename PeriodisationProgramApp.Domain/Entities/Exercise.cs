using PeriodisationProgramApp.Domain.Enums;

namespace PeriodisationProgramApp.Domain.Entities
{
    public class Exercise : CommunityEntity<UserExerciseLike, UserExerciseRating>
    {
        public string? Name { get; set; }

        public ExerciseType Type { get; set; }

        public List<ExerciseMuscleGroup> ExerciseMuscleGroups { get; set; } = new();

        public int RawStimulusMagnitude { get; set; }

        public int FatigueMagnitude { get; set; }

        public double StimulusToFatigueRatio { get; set; }

        public List<ExerciseUserData> ExerciseUsersData { get; set; } = new();

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
