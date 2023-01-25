using PeriodisationProgramApp.BusinessLogic.Builders.Interfaces;
using PeriodisationProgramApp.BusinessLogic.Builders.TrainingSessionBuilders;
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

            ConfigureTrainingSessionBuilders(trainingSessionBuilders, numberOfWeekSessions / 3, mesocycleLength);

            var trainingDays = GetTrainingDays(numberOfWeekSessions);

            for (var i = 1; i <= mesocycleLength; i++)
            {
                for (var j = 0; j < trainingDays.Count / 3; j++)
                {
                    trainingProgram.Sessions.Add(pushTainingSessionBuilder.GetTrainingSession(i, trainingDays[j * 2], j % 2 == 0));
                    trainingProgram.Sessions.Add(pullTainingSessionBuilder.GetTrainingSession(i, trainingDays[j * 2 + 1], j % 2 == 0));
                    trainingProgram.Sessions.Add(legsTainingSessionBuilder.GetTrainingSession(i, trainingDays[j * 2 + 2], j % 2 == 0));
                }
            }

            return trainingProgram;
        }
    }
}
