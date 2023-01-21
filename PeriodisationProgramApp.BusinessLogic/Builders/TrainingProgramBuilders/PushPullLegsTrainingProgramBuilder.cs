using PeriodisationProgramApp.BusinessLogic.Enums;
using PeriodisationProgramApp.BusinessLogic.Factories.Interfaces;
using PeriodisationProgramApp.Domain.Entities;
using PeriodisationProgramApp.Domain.Interfaces;

namespace PeriodisationProgramApp.BusinessLogic.Builders.TrainingProgramBuilders
{
    public class PushPullLegsTrainingProgramBuilder : BaseTrainingProgramBuilder
    {
        public PushPullLegsTrainingProgramBuilder(IUnitOfWork unitOfWork, ITrainingSessionFactory trainingSessionFactory) : base(unitOfWork, trainingSessionFactory) { }

        public override TrainingProgram GetProgram()
        {
            var trainingProgram = new TrainingProgram();
            var trainingSessionBuilder = _trainingSessionFactory.GetInstance(TrainingSessionType.Push);

            trainingSessionBuilder.SetExercises(_exercises);
            trainingSessionBuilder.SetMesocycleLength(6);
            trainingSessionBuilder.SetNumberOfWeekSessions(2);
            var trainingSession = trainingSessionBuilder.GetTrainingSession(1, DayOfWeek.Monday, 3, true);

            trainingProgram.Sessions.Add(trainingSession);

            return trainingProgram;
        }
    }
}
