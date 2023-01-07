using PeriodisationProgramApp.Domain.Entities;

namespace PeriodisationProgramApp.Domain.Interfaces
{
    public interface IExerciseRepository : IGenericRepository<Exercise>
    {
        IEnumerable<Exercise> GetDefaultExercises();
    }
}