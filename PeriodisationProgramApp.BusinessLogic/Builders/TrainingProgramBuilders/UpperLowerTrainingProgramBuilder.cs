using PeriodisationProgramApp.BusinessLogic.Builders.Interfaces;
using PeriodisationProgramApp.BusinessLogic.Enums;
using PeriodisationProgramApp.BusinessLogic.Factories.Interfaces;
using PeriodisationProgramApp.Domain.Entities;
using PeriodisationProgramApp.Domain.Enums;
using PeriodisationProgramApp.Domain.Interfaces;

namespace PeriodisationProgramApp.BusinessLogic.Builders.TrainingProgramBuilders
{
    public class UpperLowerTrainingProgramBuilder : BaseTrainingProgramBuilder
    {
        public UpperLowerTrainingProgramBuilder(IUnitOfWork unitOfWork, ITrainingSessionFactory trainingSessionFactory) : base(unitOfWork, trainingSessionFactory) { }

        public override TrainingProgram GetProgram(int numberOfWeekSessions, int mesocycleLength, TrainingLevel trainingLevel)
        {
            var trainingProgram = new TrainingProgram();
            var upperTainingSessionBuilder = _trainingSessionFactory.GetInstance(TrainingSessionType.Upper);
            var lowerTainingSessionBuilder = _trainingSessionFactory.GetInstance(TrainingSessionType.Lower);

            var trainingSessionBuilders = new List<ITrainingSessionBuilder>()
            {
                upperTainingSessionBuilder,
                lowerTainingSessionBuilder
            };

            ConfigureTrainingSessionBuilders(trainingSessionBuilders, numberOfWeekSessions / 2, mesocycleLength);

            var trainingDays = GetTrainingDays(numberOfWeekSessions);

            for (var i = 1; i <= mesocycleLength; i++)
            {
                for (var j = 0; j < trainingDays.Count; j+=2)
                {
                    trainingProgram.Sessions.Add(upperTainingSessionBuilder.GetTrainingSession(i, trainingDays[j], j % 2 == 0));
                    trainingProgram.Sessions.Add(lowerTainingSessionBuilder.GetTrainingSession(i, trainingDays[j + 1], j % 2 == 0));
                }
            }

            return trainingProgram;
        }
    }
}
