using PeriodisationProgramApp.BusinessLogic.Builders.Interfaces;
using PeriodisationProgramApp.Domain.Enums;

namespace PeriodisationProgramApp.BusinessLogic.Factories.Interfaces
{
    public interface ITrainingProgramFactory
    {
        ITrainingProgramBuilder GetInstance(TrainingProgramType type);
    }
}
