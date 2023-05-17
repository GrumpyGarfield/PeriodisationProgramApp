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

        public new async Task<PagedResult<TrainingProgram>> GetPaginatedResultAsync(IPageableQueryContext context)
        {
            return await _context.TrainingPrograms.GetAllWithContext(context)
                                                    .GetPagedAsync(context.Offset, context.Limit);
        }

        public async Task<PagedResult<TrainingProgram>> GetUserCreatedTrainingPrograms(IPageableQueryContext context, Guid userId)
        {
            return await _context.TrainingPrograms.GetAllWithContext(context)
                                                    .Where(t => t.UserId == userId)
                                                    .GetPagedAsync(context.Offset, context.Limit);
        }

        public async Task<PagedResult<TrainingProgram>> GetUserLikedTrainingPrograms(IPageableQueryContext context, Guid userId)
        {
            return await _context.TrainingPrograms.GetAllWithContext(context)
                                                    .Where(t => t.UserTrainingProgramLikes.Any(u => u.UserId == userId))
                                                    .GetPagedAsync(context.Offset, context.Limit);
        }

        public async Task<TrainingProgram> SetLike(Guid trainingProgramId, Guid userId)
        {
            var trainingProgram = await _context.TrainingPrograms.Include(t => t.UserTrainingProgramLikes)
                                                                    .FirstOrDefaultAsync(t => t.Id == trainingProgramId);

            if (trainingProgram == null)
            {
                throw new Exception($"Training program with id {trainingProgramId} not found");
            }

            trainingProgram.UserTrainingProgramLikes.Add(new UserTrainingProgramLike() { UserId= userId });
            trainingProgram.Likes++;
            _context.Update(trainingProgram);

            return trainingProgram;
        }

        public async Task<TrainingProgram> UnsetLike(Guid trainingProgramId, Guid userId)
        {
            var trainingProgram = await _context.TrainingPrograms.Include(t => t.UserTrainingProgramLikes)
                                                                    .FirstOrDefaultAsync(t => t.Id == trainingProgramId);

            if (trainingProgram == null)
            {
                throw new Exception($"Training program with id {trainingProgramId} not found");
            }

            var like = trainingProgram.UserTrainingProgramLikes.FirstOrDefault(l => l.UserId == userId);

            if (like == null)
            {
                return trainingProgram;
            }

            trainingProgram.UserTrainingProgramLikes.Remove(like);
            trainingProgram.Likes--;
            _context.Update(trainingProgram);

            return trainingProgram;
        }
    }
}