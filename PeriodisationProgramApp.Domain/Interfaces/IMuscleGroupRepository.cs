using PeriodisationProgramApp.Domain.Entities;

namespace PeriodisationProgramApp.Domain.Interfaces
{
    public interface IMuscleGroupRepository : IGenericRepository<MuscleGroup>
    {
        IEnumerable<MuscleGroup> GetDefaultMuscleGroups();
    }
}
