namespace PeriodisationProgramApp.BusinessLogic.Domain.Dto
{
    public class ExerciseDto : BaseEntityDto
    {
        public string? Name { get; set; }

        public int RawStimulusMagnitude { get; set; }

        public int FatigueMagnitude { get; set; }

        public double StimulusToFatigueRatio { get; set; }
    }
}
