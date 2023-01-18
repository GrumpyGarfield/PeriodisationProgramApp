using PeriodisationProgramApp.BusinessLogic.Builders.Interfaces;
using PeriodisationProgramApp.Domain.Entities;
using PeriodisationProgramApp.Domain.Interfaces;
using PeriodisationProgramApp.Domain.Enums;
using PeriodisationProgramApp.Domain.Extensions;

namespace PeriodisationProgramApp.BusinessLogic.Builders.TrainingSessionBuilders
{
    public abstract class BaseTrainingSessionBuilder : ITrainingSessionBuilder
    {
        protected readonly IUnitOfWork _unitOfWork;
        protected int _maxWeeks;

        public BaseTrainingSessionBuilder(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public abstract void SetExercises(List<Exercise> exercises);

        public abstract TrainingSession GetTrainingSession(int week, DayOfWeek dayOfWeek, int repsInReserve);

        public void SetMaxWeeks(int maxWeeks)
        {
            _maxWeeks = maxWeeks;
        }
    }
}
