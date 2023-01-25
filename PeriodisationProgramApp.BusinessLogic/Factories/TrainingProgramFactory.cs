using PeriodisationProgramApp.BusinessLogic.Builders.Interfaces;
using PeriodisationProgramApp.BusinessLogic.Builders.TrainingProgramBuilders;
using PeriodisationProgramApp.BusinessLogic.Enums;
using PeriodisationProgramApp.BusinessLogic.Factories.Interfaces;

namespace PeriodisationProgramApp.BusinessLogic.Factories
{
    public class TrainingProgramFactory : ITrainingProgramFactory
    {
        private readonly IEnumerable<ITrainingProgramBuilder> _trainingProgramBuilders;

        public TrainingProgramFactory(IEnumerable<ITrainingProgramBuilder> trainingProgramBuilders)
        {
            _trainingProgramBuilders = trainingProgramBuilders;
        }

        public ITrainingProgramBuilder GetInstance(TrainingProgramType type)
        {
            return type switch
            {
                TrainingProgramType.PushPullLegs => GetBuilder(typeof(PushPullLegsTrainingProgramBuilder)),
                TrainingProgramType.UpperLower => GetBuilder(typeof(UpperLowerTrainingProgramBuilder)),
                TrainingProgramType.FullBody => GetBuilder(typeof(FullBodyTrainingProgramBuilder)),
                _ => throw new InvalidOperationException()
            }; ;
        }

        public ITrainingProgramBuilder GetBuilder(Type type)
        {
            return _trainingProgramBuilders.FirstOrDefault(x => x.GetType() == type)!;
        }
    }
}
