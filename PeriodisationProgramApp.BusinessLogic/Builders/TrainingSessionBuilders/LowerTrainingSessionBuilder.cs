using PeriodisationProgramApp.Domain.Interfaces;
using PeriodisationProgramApp.Domain.Enums;

namespace PeriodisationProgramApp.BusinessLogic.Builders.TrainingSessionBuilders
{
    public class LowerTrainingSessionBuilder : BaseTrainingSessionBuilder
    {
        public LowerTrainingSessionBuilder(IUnitOfWork unitOfWork) : base(unitOfWork)
        {
            _muscleGroupTypes = new List<MuscleGroupType>() { MuscleGroupType.Quads, MuscleGroupType.Hamstrings, MuscleGroupType.Calves };
        }
    }
}
