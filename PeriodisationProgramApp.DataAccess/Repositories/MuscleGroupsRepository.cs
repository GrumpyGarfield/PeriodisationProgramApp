using PeriodisationProgramApp.Configuration.Interfaces;
using PeriodisationProgramApp.Domain.Entities;
using PeriodisationProgramApp.Domain.Interfaces;

namespace PeriodisationProgramApp.DataAccess.Repositories
{
    public class MuscleGroupsRepository : GenericRepository<MuscleGroup>, IMuscleGroupsRepository
    {
        private readonly IDefaultDataSettings _defaultDataSettings;

        public MuscleGroupsRepository(ApplicationContext context, IDefaultDataSettings defaultDataSettings) : base(context)
        {
            _defaultDataSettings = defaultDataSettings; 
        }

        public IEnumerable<MuscleGroup> GetDefaultMuscleGroups() 
        {
            return _context.MuscleGroups.Where(m => m.UserId == _defaultDataSettings.DefaultUser!.Id);
        }
    }
}
