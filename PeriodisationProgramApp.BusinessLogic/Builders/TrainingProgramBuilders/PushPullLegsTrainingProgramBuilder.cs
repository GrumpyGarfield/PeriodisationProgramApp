using PeriodisationProgramApp.BusinessLogic.Builders.Interfaces;
using PeriodisationProgramApp.BusinessLogic.Enums;
using PeriodisationProgramApp.BusinessLogic.Factories.Interfaces;
using PeriodisationProgramApp.Domain.Entities;
using PeriodisationProgramApp.Domain.Enums;
using PeriodisationProgramApp.Domain.Interfaces;

namespace PeriodisationProgramApp.BusinessLogic.Builders.TrainingProgramBuilders
{
    public class PushPullLegsTrainingProgramBuilder : BaseTrainingProgramBuilder
    {
        public PushPullLegsTrainingProgramBuilder(IUnitOfWork unitOfWork, ITrainingSessionFactory trainingSessionFactory) : base(unitOfWork, trainingSessionFactory) { }

        public override TrainingProgram GetProgram(int numberOfWeekSessions, int mesocycleLength, TrainingLevel trainingLevel)
        {
            var trainingProgram = new TrainingProgram();
            var pushTainingSessionBuilder = _trainingSessionFactory.GetInstance(TrainingSessionType.Push);
            var pullTainingSessionBuilder = _trainingSessionFactory.GetInstance(TrainingSessionType.Pull);
            var legsTainingSessionBuilder = _trainingSessionFactory.GetInstance(TrainingSessionType.Legs);

            var trainingSessionBuilders = new List<ITrainingSessionBuilder>()
            {
                pushTainingSessionBuilder,
                pullTainingSessionBuilder,
                legsTainingSessionBuilder
            };

            ConfigureTrainingSessionBuilders(trainingSessionBuilders);

            for (var i = 1; i <= 6; i++)
            {
                trainingProgram.Sessions.Add(pushTainingSessionBuilder.GetTrainingSession(i, DayOfWeek.Monday, true));
                trainingProgram.Sessions.Add(pullTainingSessionBuilder.GetTrainingSession(i, DayOfWeek.Tuesday, true));
                trainingProgram.Sessions.Add(legsTainingSessionBuilder.GetTrainingSession(i, DayOfWeek.Wednesday, true));
                trainingProgram.Sessions.Add(pushTainingSessionBuilder.GetTrainingSession(i, DayOfWeek.Thursday, false));
                trainingProgram.Sessions.Add(pullTainingSessionBuilder.GetTrainingSession(i, DayOfWeek.Friday, false));
                trainingProgram.Sessions.Add(legsTainingSessionBuilder.GetTrainingSession(i, DayOfWeek.Saturday, false));
            }

            return trainingProgram;
        }
    }
}
