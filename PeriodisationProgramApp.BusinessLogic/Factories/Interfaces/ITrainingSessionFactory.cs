using PeriodisationProgramApp.BusinessLogic.Builders.Interfaces;
using PeriodisationProgramApp.BusinessLogic.Enums;

namespace PeriodisationProgramApp.BusinessLogic.Factories.Interfaces
{
    public interface ITrainingSessionFactory
    {
        ITrainingSessionBuilder GetInstance(TrainingSessionType type);
    }
}
