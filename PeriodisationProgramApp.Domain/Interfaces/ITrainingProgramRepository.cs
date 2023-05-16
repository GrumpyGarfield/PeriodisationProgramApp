using PeriodisationProgramApp.Domain.Entities;
using PeriodisationProgramApp.Domain.Enums;
using PeriodisationProgramApp.Domain.Pagination;

namespace PeriodisationProgramApp.Domain.Interfaces
{
    public interface ITrainingProgramRepository : IGenericRepository<TrainingProgram>
    {
        void SetLike(TrainingProgram trainingProgram, bool isLiked);

        void SetRating(TrainingProgram trainingProgram, bool isRated, int rating);

        Task<PagedResult<TrainingProgram>> GetUserCreatedTrainingPrograms(IPageableQueryContext context, Guid userId);

        Task<PagedResult<TrainingProgram>> GetUserLikedTrainingPrograms(IPageableQueryContext context, Guid userId);
    }
}
