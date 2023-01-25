using PeriodisationProgramApp.Domain.Interfaces;
using PeriodisationProgramApp.Domain.Enums;

namespace PeriodisationProgramApp.BusinessLogic.Builders.TrainingSessionBuilders
{
    public class FullBodyTrainingSessionBuilder : BaseTrainingSessionBuilder
    {
        public FullBodyTrainingSessionBuilder(IUnitOfWork unitOfWork) : base(unitOfWork) 
        {
            _muscleGroupTypes = new List<MuscleGroupType>() { MuscleGroupType.Chest, MuscleGroupType.Back, MuscleGroupType.FrontDelts, MuscleGroupType.RearDelts, MuscleGroupType.SideDelts, MuscleGroupType.Biceps, MuscleGroupType.Triceps, MuscleGroupType.Quads, MuscleGroupType.Hamstrings, MuscleGroupType.Calves };
        }
    }
}
