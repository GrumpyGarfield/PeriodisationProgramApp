using PeriodisationProgramApp.Configuration.Interfaces;
using PeriodisationProgramApp.Domain.Entities;
using PeriodisationProgramApp.Domain.Interfaces;

namespace PeriodisationProgramApp.DataAccess.Repositories
{
    public class TrainingProgramRepository : GenericRepository<TrainingProgram>, ITrainingProgramRepository
    {
        private readonly IDefaultDataSettings _defaultDataSettings;

        public TrainingProgramRepository(ApplicationContext context, IDefaultDataSettings defaultDataSettings) : base(context)
        {
            _defaultDataSettings = defaultDataSettings;
        }

        public void SetLike(TrainingProgram program, bool isLiked)
        {
            
        }

        public void SetRating(TrainingProgram program, bool isRated, int rating)
        {

        }
    }
}