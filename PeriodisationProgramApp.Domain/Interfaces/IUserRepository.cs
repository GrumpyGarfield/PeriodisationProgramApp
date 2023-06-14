using PeriodisationProgramApp.Domain.Entities;

namespace PeriodisationProgramApp.Domain.Interfaces
{
    public interface IUserRepository : IGenericRepository<User>
    {
        Task<User?> GetDefaultUser();

        Task<User?> GetDefaultUserWithData();

        Task<User?> GetUserByFirebaseId(string firebaseId);
    }
}
