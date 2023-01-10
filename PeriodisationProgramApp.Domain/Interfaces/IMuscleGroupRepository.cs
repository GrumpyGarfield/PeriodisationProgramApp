using PeriodisationProgramApp.Domain.Entities;
using PeriodisationProgramApp.Domain.Enums;

namespace PeriodisationProgramApp.Domain.Interfaces
{
    public interface IMuscleGroupRepository : IGenericRepository<MuscleGroup>
    {
        IEnumerable<MuscleGroup> GetDefaultMuscleGroups();

        MuscleGroup GetMuscleGroupByType(MuscleGroupType type);
    }
}
