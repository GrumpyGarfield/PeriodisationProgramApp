using PeriodisationProgramApp.Configuration.Interfaces;
using PeriodisationProgramApp.DataAccess.Repositories;
using PeriodisationProgramApp.Domain.Interfaces;

namespace PeriodisationProgramApp.DataAccess.UnitsOfWork
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly ApplicationContext _context;
        private readonly IDefaultDataSettings _defaultDataSettings;

        public UnitOfWork(ApplicationContext context, IDefaultDataSettings defaultDataSettings)
        {
            _context = context;
            _defaultDataSettings = defaultDataSettings;

            Users = new UserRepository(_context, _defaultDataSettings);
            MuscleGroups = new MuscleGroupsRepository(_context, _defaultDataSettings);
        }

        public IUsersRepository Users { get; private set; } 

        public IMuscleGroupsRepository MuscleGroups { get; private set; }

        public int Complete()
        {
            return _context.SaveChanges();
        }
        public void Dispose()
        {
            _context.Dispose();
        }
    }
}
