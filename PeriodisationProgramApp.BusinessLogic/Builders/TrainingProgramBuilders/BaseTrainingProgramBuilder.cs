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

        public BaseTrainingProgramBuilder(IUnitOfWork unitOfWork, ITrainingSessionFactory trainingSessionFactory)
        {
            _unitOfWork = unitOfWork;
            _trainingSessionFactory = trainingSessionFactory;
        }

        public abstract TrainingProgram GetProgram(int numberOfWeekSessions, int mesocycleLength, TrainingLevel trainingLevel);

        protected void ConfigureTrainingSessionBuilders(List<ITrainingSessionBuilder> trainingSessionBuilders) 
        {
            foreach (var trainingSessionBuilder in trainingSessionBuilders)
            {
                trainingSessionBuilder.SetExercises();
                trainingSessionBuilder.SetMesocycleLength(6);
                trainingSessionBuilder.SetNumberOfWeekSessions(2);
            }
        }
    }
}
