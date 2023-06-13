namespace PeriodisationProgramApp.Domain.Entities
{
    public class ExerciseUserData : BaseEntity
    {
        public Guid UserId { get; set; }

        public Guid ExerciseId { get; set; }

        public int RawStimulusMagnitude { get; set; }

        public int FatigueMagnitude { get; set; }

        public double StimulusToFatigueRatio { get; set; }
    }
}
