using PeriodisationProgramApp.Domain.Entities;

namespace PeriodisationProgramApp.Domain.Interfaces
{
    public interface IUsersRepository : IGenericRepository<User>
    {
        Task<User?> GetDefaultUser();

        Task<User?> GetDefaultUserWithData();
    }
}
