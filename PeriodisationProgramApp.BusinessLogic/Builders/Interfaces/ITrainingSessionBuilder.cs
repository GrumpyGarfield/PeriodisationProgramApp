using PeriodisationProgramApp.Domain.Entities;
using PeriodisationProgramApp.Domain.Enums;

namespace PeriodisationProgramApp.BusinessLogic.Builders.Interfaces
{
    public interface ITrainingSessionBuilder
    {
        void SetExercises();

        void SetMesocycleLength(int maxWeeks);

        void SetNumberOfWeekSessions(int numberOfWeekSessions);

        void SetTrainingLevel(TrainingLevel trainingLevel);

        TrainingSession GetTrainingSession(int week, DayOfWeek dayOfWeek, bool roundUp);
    }
}
