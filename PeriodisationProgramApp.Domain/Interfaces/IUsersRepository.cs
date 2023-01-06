using PeriodisationProgramApp.Domain.Entities;

namespace PeriodisationProgramApp.Domain.Interfaces
{
    public interface IUsersRepository : IGenericRepository<User>
    {
        User GetDefaultUser();
    }
}
