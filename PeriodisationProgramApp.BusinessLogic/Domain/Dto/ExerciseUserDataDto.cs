using PeriodisationProgramApp.BusinessLogic.Domain.Dto;

namespace PeriodisationProgramApp.BusinessLogic.Dto
{
    public class ExerciseUserDataDto : BaseEntityDto
    {
        public int RawStimulusMagnitude { get; set; }

        public int FatigueMagnitude { get; set; }

        public double StimulusToFatigueRatio { get; set; }
    }
}

