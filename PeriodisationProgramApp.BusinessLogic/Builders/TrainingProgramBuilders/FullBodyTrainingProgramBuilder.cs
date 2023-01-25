using PeriodisationProgramApp.BusinessLogic.Builders.Interfaces;
using PeriodisationProgramApp.BusinessLogic.Builders.TrainingSessionBuilders;
using PeriodisationProgramApp.BusinessLogic.Enums;
using PeriodisationProgramApp.BusinessLogic.Factories.Interfaces;
using PeriodisationProgramApp.Domain.Entities;
using PeriodisationProgramApp.Domain.Enums;
using PeriodisationProgramApp.Domain.Interfaces;

namespace PeriodisationProgramApp.BusinessLogic.Builders.TrainingProgramBuilders
{
    public class FullBodyTrainingProgramBuilder : BaseTrainingProgramBuilder
    {
        public FullBodyTrainingProgramBuilder(IUnitOfWork unitOfWork, ITrainingSessionFactory trainingSessionFactory) : base(unitOfWork, trainingSessionFactory) { }

        public override TrainingProgram GetProgram(int numberOfWeekSessions, int mesocycleLength, TrainingLevel trainingLevel)
        {
            var trainingProgram = new TrainingProgram();
            var fullBodyTainingSessionBuilder = _trainingSessionFactory.GetInstance(TrainingSessionType.FullBody);

            var trainingSessionBuilders = new List<ITrainingSessionBuilder>()
            {
                fullBodyTainingSessionBuilder
            };

            ConfigureTrainingSessionBuilders(trainingSessionBuilders, numberOfWeekSessions, mesocycleLength);

            var trainingDays = GetTrainingDays(numberOfWeekSessions);

            for (var i = 1; i <= mesocycleLength; i++)
            {
                for (var j = 0; j < trainingDays.Count; j++)
                {
                    trainingProgram.Sessions.Add(fullBodyTainingSessionBuilder.GetTrainingSession(i, trainingDays[j], j % 2 == 0));
                }
            }

            return trainingProgram;
        }
    }
}
