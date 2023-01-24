using PeriodisationProgramApp.Domain.Enums;

namespace PeriodisationProgramApp.BusinessLogic.Domain
{
    public class MuscleGroupVolume
    {
        public MuscleGroupVolume(MuscleGroupType type, double volume) 
        {
            Type = type;
            Volume = volume;
        }

        public MuscleGroupType Type { get; set; }

        public double Volume { get; set; }
    }
}
