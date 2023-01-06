using Microsoft.Extensions.Configuration;
using PeriodisationProgramApp.Configuration.Interfaces;
using PeriodisationProgramApp.Domain.Entities;
using PeriodisationProgramApp.Domain.Interfaces;

namespace PeriodisationProgramApp.DataAccess.Repositories
{
    public class UserRepository : GenericRepository<User>, IUsersRepository
    {
        private readonly IDefaultDataSettings _defaultDataSettings;

        public UserRepository(ApplicationContext context, IDefaultDataSettings defaultDataSettings) : base(context)
        {
            _defaultDataSettings = defaultDataSettings;
        }

        public User GetDefaultUser()
        {
            return _context.Users.Find(_defaultDataSettings.DefaultUser!.Id)!;
        }
    }
}