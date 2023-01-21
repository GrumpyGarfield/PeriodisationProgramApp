using PeriodisationProgramApp.Domain.Entities;
using PeriodisationProgramApp.Domain.Interfaces;
using PeriodisationProgramApp.Domain.Enums;

namespace PeriodisationProgramApp.BusinessLogic.Builders.TrainingSessionBuilders
{
    public class PushTrainingSessionBuilder : BaseTrainingSessionBuilder
    {
        public PushTrainingSessionBuilder(IUnitOfWork unitOfWork) : base(unitOfWork) 
        {
            _muscleGroupTypes = new List<MuscleGroupType>() { MuscleGroupType.Chest, MuscleGroupType.FrontDelts, MuscleGroupType.SideDelts, MuscleGroupType.Triceps };
        }
    }
}
