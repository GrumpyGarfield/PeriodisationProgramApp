using PeriodisationProgramApp.Domain.Entities;

namespace PeriodisationProgramApp.WebApi.Dto
{
    public class TrainingProgramDto
    {
        public string? Name { get; set; }

        public List<TrainingSessionDto> Sessions { get; set; } = new();
    }
}
