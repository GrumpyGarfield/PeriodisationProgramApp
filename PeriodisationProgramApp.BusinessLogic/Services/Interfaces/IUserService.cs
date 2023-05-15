using PeriodisationProgramApp.Domain.Entities;

namespace PeriodisationProgramApp.BusinessLogic.Services.Interfaces
{
    public interface IUserService
    {
        Task AddUser(User user);
    }
}

