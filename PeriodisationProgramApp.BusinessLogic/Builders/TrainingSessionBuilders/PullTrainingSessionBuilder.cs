using PeriodisationProgramApp.Domain.Interfaces;
using PeriodisationProgramApp.Domain.Enums;

namespace PeriodisationProgramApp.BusinessLogic.Builders.TrainingSessionBuilders
{
    public class PullTrainingSessionBuilder : BaseTrainingSessionBuilder
    {
        public PullTrainingSessionBuilder(IUnitOfWork unitOfWork) : base(unitOfWork)
        {
            _muscleGroupTypes = new List<MuscleGroupType>() { MuscleGroupType.Back, MuscleGroupType.RearDelts, MuscleGroupType.Biceps };
        }
    }
}
