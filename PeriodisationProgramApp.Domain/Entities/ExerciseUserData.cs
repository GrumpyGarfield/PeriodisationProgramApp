namespace PeriodisationProgramApp.Domain.Entities
{
    public class ExerciseUserData : Entity
    {
        public Guid UserId { get; set; }

        public Guid ExerciseId { get; set; }

        public int RawStimulusMagnitude { get; set; }

        public int FatigueMagnitude { get; set; }

        public double StimulusToFatigueRatio { get; set; }
    }
}
