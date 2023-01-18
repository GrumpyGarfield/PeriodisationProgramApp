using PeriodisationProgramApp.Domain.Entities;

namespace PeriodisationProgramApp.BusinessLogic.Builders.Interfaces
{
    public interface ITrainingSessionBuilder
    {
        void SetExercises(List<Exercise> exercises);

        void SetMaxWeeks(int maxWeeks);

        TrainingSession GetTrainingSession(int week, DayOfWeek dayOfWeek, int repsInReserve);
    }
}
