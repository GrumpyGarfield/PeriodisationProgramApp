using PeriodisationProgramApp.BusinessLogic.Builders.Interfaces;
using PeriodisationProgramApp.BusinessLogic.Builders.TrainingSessionBuilders;
using PeriodisationProgramApp.BusinessLogic.Enums;
using PeriodisationProgramApp.BusinessLogic.Factories.Interfaces;

namespace PeriodisationProgramApp.BusinessLogic.Factories
{
    public class TrainingSessionFactory : ITrainingSessionFactory
    {
        private readonly IEnumerable<ITrainingSessionBuilder> _trainingSessionBuilders;

        public TrainingSessionFactory(IEnumerable<ITrainingSessionBuilder> trainingSessionBuilders)
        {
            _trainingSessionBuilders = trainingSessionBuilders;
        }

        public ITrainingSessionBuilder GetInstance(TrainingSessionType type)
        {
            return type switch
            {
                TrainingSessionType.Push => GetBuilder(typeof(PushTrainingSessionBuilder)),
                TrainingSessionType.Pull => GetBuilder(typeof(PullTrainingSessionBuilder)),
                TrainingSessionType.Legs => GetBuilder(typeof(LegsTrainingSessionBuilder)),
                _ => throw new InvalidOperationException()
            }; ;
        }

        public ITrainingSessionBuilder GetBuilder(Type type)
        {
            return _trainingSessionBuilders.FirstOrDefault(x => x.GetType() == type)!;
        }
    }
}
