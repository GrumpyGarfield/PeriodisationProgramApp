namespace PeriodisationProgramApp.BusinessLogic.Domain
{
    public class TrainingWeekVolume
    {
        public TrainingWeekVolume(int week) 
        {
            Week= week;
        }

        public int Week { get; set; }

        public List<MuscleGroupVolume> MuscleGroupVolumes = new();
    }
}
