using PeriodisationProgramApp.Configuration.Interfaces;
using PeriodisationProgramApp.Domain.Entities;
using PeriodisationProgramApp.Domain.Enums;
using PeriodisationProgramApp.Domain.Interfaces;

namespace PeriodisationProgramApp.DataAccess.Repositories
{
    public class MuscleGroupRepository : GenericRepository<MuscleGroup>, IMuscleGroupRepository
    {
        private readonly IDefaultDataSettings _defaultDataSettings;

        public MuscleGroupRepository(ApplicationContext context, IDefaultDataSettings defaultDataSettings) : base(context)
        {
            _defaultDataSettings = defaultDataSettings; 
        }

        public IEnumerable<MuscleGroup> GetDefaultMuscleGroups() 
        {
            return _context.MuscleGroups.Where(m => m.UserId == _defaultDataSettings.DefaultUser!.Id);
        }

        public MuscleGroup GetMuscleGroupByType(MuscleGroupType type)
        {
            return _context.MuscleGroups.First(m => m.Type == type);
        }
    }
}
