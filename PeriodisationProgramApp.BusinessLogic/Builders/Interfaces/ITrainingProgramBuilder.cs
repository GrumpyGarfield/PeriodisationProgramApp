using PeriodisationProgramApp.Domain.Entities;
using PeriodisationProgramApp.Domain.Enums;

namespace PeriodisationProgramApp.BusinessLogic.Builders.Interfaces
{
    public interface ITrainingProgramBuilder
    {
        TrainingProgram GetProgram(int numberOfWeekSessions, int mesocycleLength, TrainingLevel trainingLevel);
    }
}
