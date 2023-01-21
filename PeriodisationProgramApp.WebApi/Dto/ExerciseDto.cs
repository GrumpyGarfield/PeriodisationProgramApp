namespace PeriodisationProgramApp.WebApi.Dto
{
    public class ExerciseDto
    {
        public string? Name { get; set; }

        public int RawStimulusMagnitude { get; set; }

        public int FatigueMagnitude { get; set; }

        public double StimulusToFatigueRatio { get; set; }
    }
}
