namespace PeriodisationProgramApp.Domain.Interfaces
{
    public interface IUnitOfWork : IDisposable
    {
        IUsersRepository Users { get; }

        IMuscleGroupsRepository MuscleGroups { get; }

        int Complete();
    }
}
