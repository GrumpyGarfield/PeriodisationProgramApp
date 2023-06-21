using Microsoft.EntityFrameworkCore;
using PeriodisationProgramApp.Domain.Entities;
using PeriodisationProgramApp.Domain.Interfaces;

namespace PeriodisationProgramApp.DataAccess.Repositories
{
    public class TrainingProgramRepository : CommunityEntityRepository<TrainingProgram, UserTrainingProgramLike, UserTrainingProgramRating>, ITrainingProgramRepository
    {
        public TrainingProgramRepository(ApplicationContext context) : base(context)
        {
        }

        protected override IQueryable<TrainingProgram> IncludeAll(IQueryable<TrainingProgram> query, Guid? userId = null)
        {
            return query.Include(t => t.User)
                        .Include(t => t.UserLikes)
                        .Include(t => t.UserRatings)
                        .Include(t => t.Sessions.OrderBy(s => s.Week).ThenBy(s => s.DayOfWeek))
                            .ThenInclude(s => s.Exercises)
                                .ThenInclude(e => e.Exercise)
                                    .ThenInclude(e => e!.TargetMuscleGroup)
                        .Include(t => t.Sessions.OrderBy(s => s.Week).ThenBy(s => s.DayOfWeek))
                            .ThenInclude(s => s.Exercises)
                                .ThenInclude(e => e.Exercise)
                                .ThenInclude(e => e!.ExerciseUsersData.Where(d => d.UserId.Equals(userId)));
        }

        public override async Task<TrainingProgram> GetWithUsersDataAsync(Guid trainingProgramId)
        {
            return await _context.TrainingPrograms.Include(t => t.User)
                                                    .Include(t => t.UserLikes)
                                                    .Include(t => t.UserRatings)
                                                    .Include(t => t.Sessions.OrderBy(s => s.Week).ThenBy(s => s.DayOfWeek))
                                                        .ThenInclude(s => s.Exercises)
                                                            .ThenInclude(e => e.Exercise)
                                                                .ThenInclude(e => e!.TargetMuscleGroup)
                                                    .FirstAsync(m => m.Id == trainingProgramId);
        }

        public override async Task<TrainingProgram> GetByIdAsync(Guid trainingProgramId, Guid? userId = null)
        {
            return await IncludeAll(_context.TrainingPrograms, userId).FirstAsync(m => m.Id == trainingProgramId);
        }
    }
}