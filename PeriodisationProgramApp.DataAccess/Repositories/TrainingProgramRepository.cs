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
        public TrainingProgramRepository(ApplicationContext context) : base(context)
        {
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
            var trainingProgram = await _context.TrainingPrograms.IncludeUserInfo()
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
            var trainingProgram = await _context.TrainingPrograms.IncludeUserInfo()
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

        public async Task<TrainingProgram> SetRating(Guid trainingProgramId, Guid userId, int rating)
        {
            var trainingProgram = await _context.TrainingPrograms.IncludeUserInfo()
                                                                    .FirstOrDefaultAsync(t => t.Id == trainingProgramId);

            if (trainingProgram == null)
            {
                throw new Exception($"Training program with id {trainingProgramId} not found");
            }

            var currentRating = trainingProgram.UserTrainingProgramRatings.FirstOrDefault(u => u.UserId == userId);

            if (currentRating == null)
            {
                trainingProgram.UserTrainingProgramRatings.Add(new UserTrainingProgramRating() { UserId = userId, Rating = rating });
                trainingProgram.Rating = (trainingProgram.Rating * trainingProgram.Rates + rating) / (trainingProgram.Rates + 1);
                trainingProgram.Rates++;
            }
            else
            {                
                trainingProgram.Rating = (trainingProgram.Rating * trainingProgram.Rates - currentRating.Rating + rating) / trainingProgram.Rates;
                currentRating.Rating = rating;
            }
            
            _context.Update(trainingProgram);

            return trainingProgram;
        }

        public async Task<TrainingProgram> UnsetRating(Guid trainingProgramId, Guid userId)
        {
            var trainingProgram = await _context.TrainingPrograms.IncludeUserInfo()
                                                                    .FirstOrDefaultAsync(t => t.Id == trainingProgramId);

            if (trainingProgram == null)
            {
                throw new Exception($"Training program with id {trainingProgramId} not found");
            }

            var rating = trainingProgram.UserTrainingProgramRatings.FirstOrDefault(l => l.UserId == userId);

            if (rating == null)
            {
                return trainingProgram;
            }

            trainingProgram.UserTrainingProgramRatings.Remove(rating);
            trainingProgram.Rating = trainingProgram.Rates > 1 ? ((trainingProgram.Rating * trainingProgram.Rates - rating.Rating) / (trainingProgram.Rates - 1)) : 0;
            trainingProgram.Rates--;
            _context.Update(trainingProgram);

            return trainingProgram;
        }
    }
}