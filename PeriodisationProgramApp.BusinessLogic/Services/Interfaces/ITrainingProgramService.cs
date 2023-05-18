using PeriodisationProgramApp.DataAccess.QueryContext;
using PeriodisationProgramApp.BusinessLogic.Domain.Dto;
using PeriodisationProgramApp.Domain.Pagination;

namespace PeriodisationProgramApp.BusinessLogic.Services.Interfaces
{
    public interface ITrainingProgramService
    {
        Task<PagedResult<TrainingProgramDto>> GetTrainingPrograms(PageableQueryContext context, Guid? userId);

        Task<PagedResult<TrainingProgramDto>> GetTrainingPrograms(PageableQueryContext context, string? firebaseId);

        Task<PagedResult<TrainingProgramDto>> GetUserCreatedTrainingPrograms(PageableQueryContext context, Guid userId);

        Task<PagedResult<TrainingProgramDto>> GetUserCreatedTrainingPrograms(PageableQueryContext context, string firebaseId);

        Task<PagedResult<TrainingProgramDto>> GetUserLikedTrainingPrograms(PageableQueryContext context, Guid userId);

        Task<PagedResult<TrainingProgramDto>> GetUserLikedTrainingPrograms(PageableQueryContext context, string firebaseId);

        Task<TrainingProgramDto> SetLike(Guid trainingProgramId, Guid userId);

        Task<TrainingProgramDto> SetLike(Guid trainingProgramId, string firebaseId);

        Task<TrainingProgramDto> UnsetLike(Guid trainingProgramId, Guid userId);

        Task<TrainingProgramDto> UnsetLike(Guid trainingProgramId, string firebaseId);

        Task<TrainingProgramDto> SetRating(Guid trainingProgramId, Guid userId, int rating);

        Task<TrainingProgramDto> SetRating(Guid trainingProgramId, string firebaseId, int rating);

        Task<TrainingProgramDto> UnsetRating(Guid trainingProgramId, Guid userId);

        Task<TrainingProgramDto> UnsetRating(Guid trainingProgramId, string firebaseId);
    }
}

