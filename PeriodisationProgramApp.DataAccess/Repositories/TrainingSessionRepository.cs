using Microsoft.EntityFrameworkCore;
using PeriodisationProgramApp.Configuration.Interfaces;
using PeriodisationProgramApp.Domain.Entities;
using PeriodisationProgramApp.Domain.Interfaces;

namespace PeriodisationProgramApp.DataAccess.Repositories
{
    public class TrainingSessionRepository : GenericRepository<TrainingSession>, ITrainingSessionRepository
    {
        public TrainingSessionRepository(ApplicationContext context) : base(context)
        {
        }
    }
}