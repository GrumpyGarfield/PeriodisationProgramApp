using PeriodisationProgramApp.Domain.Entities;

namespace PeriodisationProgramApp.BusinessLogic.Builders.Interfaces
{
    public interface ITrainingSessionBuilder
    {
        TrainingSession GetTrainingSession(List<Exercise> exercises);
    }
}
