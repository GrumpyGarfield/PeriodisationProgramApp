using PeriodisationProgramApp.Domain.Entities;
using PeriodisationProgramApp.Domain.Enums;

namespace PeriodisationProgramApp.Domain.Interfaces
{
    public interface IMuscleGroupRepository : IEntityWithUserDataRepository<MuscleGroup>
    {
        MuscleGroup GetMuscleGroupByType(MuscleGroupType type);
    }
}
