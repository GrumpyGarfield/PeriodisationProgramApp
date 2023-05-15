using Microsoft.EntityFrameworkCore;
using PeriodisationProgramApp.Configuration.Interfaces;
using PeriodisationProgramApp.DataAccess.Extensions;
using PeriodisationProgramApp.Domain.Entities;
using PeriodisationProgramApp.Domain.Interfaces;
using PeriodisationProgramApp.Domain.Pagination;

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

        public new async Task<PagedResult<TrainingProgram>> GetPaginatedResultAsync(IPageableQueryContext context)
        {
            return await _context.TrainingPrograms.Include(t => t.User).FilterBy(context.Filters).SortBy(context.SortField, context.SortDirection).GetPagedAsync(context.Offset, context.Limit);
        }
    }
}