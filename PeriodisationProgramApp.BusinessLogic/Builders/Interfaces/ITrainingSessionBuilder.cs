using PeriodisationProgramApp.Domain.Entities;

namespace PeriodisationProgramApp.BusinessLogic.Builders.Interfaces
{
    public interface ITrainingSessionBuilder
    {
        void SetExercises(List<Exercise> exercises);

        void SetMesocycleLength(int maxWeeks);

        void SetNumberOfWeekSessions(int numberOfWeekSessions);

        TrainingSession GetTrainingSession(int week, DayOfWeek dayOfWeek, int repsInReserve, bool roundUp);
    }
}
