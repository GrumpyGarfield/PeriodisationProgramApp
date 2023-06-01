namespace PeriodisationProgramApp.WebApi.Dto
{
    public class UpdateMuscleGroupUserDataDto
    {
        public int MaintenanceVolume { get; set; }

        public int MinimumEffectiveVolume { get; set; }

        public int MaximumRecoverableVolume { get; set; }
    }
}
