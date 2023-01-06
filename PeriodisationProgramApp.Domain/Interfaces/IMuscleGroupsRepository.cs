using PeriodisationProgramApp.Domain.Entities;

namespace PeriodisationProgramApp.Domain.Interfaces
{
    public interface IMuscleGroupsRepository : IGenericRepository<MuscleGroup>
    {
        IEnumerable<MuscleGroup> GetDefaultMuscleGroups();
    }
}
