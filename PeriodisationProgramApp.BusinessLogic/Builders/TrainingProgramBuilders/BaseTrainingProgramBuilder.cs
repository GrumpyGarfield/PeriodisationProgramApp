using PeriodisationProgramApp.BusinessLogic.Builders.Interfaces;
using PeriodisationProgramApp.BusinessLogic.Factories.Interfaces;
using PeriodisationProgramApp.Domain.Entities;
using PeriodisationProgramApp.Domain.Enums;
using PeriodisationProgramApp.Domain.Interfaces;

namespace PeriodisationProgramApp.BusinessLogic.Builders.TrainingProgramBuilders
{
    public abstract class BaseTrainingProgramBuilder : ITrainingProgramBuilder
    {
        protected readonly IUnitOfWork _unitOfWork;
        protected readonly ITrainingSessionFactory _trainingSessionFactory;
        protected List<DayOfWeek> _trainingDays;

        public BaseTrainingProgramBuilder(IUnitOfWork unitOfWork, ITrainingSessionFactory trainingSessionFactory)
        {
            _unitOfWork = unitOfWork;
            _trainingSessionFactory = trainingSessionFactory;
            _trainingDays = new List<DayOfWeek>() { DayOfWeek.Monday, DayOfWeek.Tuesday, DayOfWeek.Wednesday, DayOfWeek.Thursday, DayOfWeek.Friday, DayOfWeek.Saturday };
        }

        public abstract TrainingProgram GetProgram(int numberOfWeekSessions, int mesocycleLength, TrainingLevel trainingLevel);

        protected void ConfigureTrainingSessionBuilders(List<ITrainingSessionBuilder> trainingSessionBuilders, int numberOfWeekSessions, int mesocycleLength) 
        {
            foreach (var trainingSessionBuilder in trainingSessionBuilders)
            {
                trainingSessionBuilder.SetExercises();
                trainingSessionBuilder.SetMesocycleLength(mesocycleLength);
                trainingSessionBuilder.SetNumberOfWeekSessions(numberOfWeekSessions);
            }
        }

        protected List<DayOfWeek> GetTrainingDays(int numberOfWeekSessions)
        {
            if (numberOfWeekSessions == _trainingDays.Count)
            {
                return _trainingDays;
            }

            var restDaysNumber = _trainingDays.Count - numberOfWeekSessions;

            var restDayPeriod = (int)Math.Ceiling((double)_trainingDays.Count / restDaysNumber);
            var restDays = new List<DayOfWeek>();

            for (var i = 1; i <= restDaysNumber; i++)
            {
                restDays.Add(_trainingDays[i * restDayPeriod - 1]);
            }

            return _trainingDays.Except(restDays).ToList();
        }
    }
}
