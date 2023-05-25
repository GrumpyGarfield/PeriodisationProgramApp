using PeriodisationProgramApp.Domain.Entities;
using PeriodisationProgramApp.Domain.Interfaces;

namespace PeriodisationProgramApp.DataAccess.Repositories
{
    public class TrainingProgramRepository : CommunityEntityRepository<TrainingProgram, UserTrainingProgramLike, UserTrainingProgramRating>, ITrainingProgramRepository
    {
        public TrainingProgramRepository(ApplicationContext context) : base(context)
        {
        }
    }
}