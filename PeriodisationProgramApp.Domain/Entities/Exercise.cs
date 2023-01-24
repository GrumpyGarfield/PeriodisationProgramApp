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

        public void Update(Exercise other)
        {
            Name = other.Name;
            RawStimulusMagnitude = other.RawStimulusMagnitude;
            FatigueMagnitude = other.FatigueMagnitude;
            StimulusToFatigueRatio = other.StimulusToFatigueRatio;
            IsPublic = other.IsPublic;
        }
    }
}
