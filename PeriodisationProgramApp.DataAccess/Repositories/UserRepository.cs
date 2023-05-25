using Microsoft.EntityFrameworkCore;
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

        public async Task<User?> GetDefaultUser()
        {
            return await _context.Users.FindAsync(_defaultDataSettings.DefaultUser!.Id);
        }

        public async Task<User?> GetDefaultUserWithData()
        {
            return await _context.Users.Include(u => u.MuscleGroups)
                                 .Include(u => u.Exercises)
                                    .ThenInclude(e => e.ExerciseMuscleGroups)
                                 .FirstOrDefaultAsync(u => u.Id == _defaultDataSettings.DefaultUser!.Id);
        }

        public async Task<User?> GetUserByFirebaseId(string firebaseId)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.FirebaseId == firebaseId);
        }
    }
}