using PeriodisationProgramApp.Domain.Interfaces;
using PeriodisationProgramApp.Domain.Enums;

namespace PeriodisationProgramApp.BusinessLogic.Builders.TrainingSessionBuilders
{
    public class LegsTrainingSessionBuilder : BaseTrainingSessionBuilder
    {
        public LegsTrainingSessionBuilder(IUnitOfWork unitOfWork) : base(unitOfWork)
        {
            _muscleGroupTypes = new List<MuscleGroupType>() { MuscleGroupType.Quads, MuscleGroupType.Hamstrings, MuscleGroupType.Calves };
        }
    }
}
