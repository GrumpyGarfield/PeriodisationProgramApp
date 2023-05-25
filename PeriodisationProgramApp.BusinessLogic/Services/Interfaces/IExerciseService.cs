using PeriodisationProgramApp.DataAccess.QueryContext;
using PeriodisationProgramApp.BusinessLogic.Domain.Dto;
using PeriodisationProgramApp.Domain.Pagination;

namespace PeriodisationProgramApp.BusinessLogic.Services.Interfaces
{
    public interface IExerciseService
    {
        Task<PagedResult<ExerciseDto>> GetExercises(PageableQueryContext context, Guid? userId);

        Task<PagedResult<ExerciseDto>> GetExercises(PageableQueryContext context, string? firebaseId);

        Task<PagedResult<ExerciseDto>> GetUserCreatedExercises(PageableQueryContext context, Guid userId);

        Task<PagedResult<ExerciseDto>> GetUserCreatedExercises(PageableQueryContext context, string firebaseId);

        Task<PagedResult<ExerciseDto>> GetUserLikedExercises(PageableQueryContext context, Guid userId);

        Task<PagedResult<ExerciseDto>> GetUserLikedExercises(PageableQueryContext context, string firebaseId);

        Task<ExerciseDto> SetLike(Guid exerciseId, Guid userId);

        Task<ExerciseDto> SetLike(Guid exerciseId, string firebaseId);

        Task<ExerciseDto> UnsetLike(Guid exerciseId, Guid userId);

        Task<ExerciseDto> UnsetLike(Guid exerciseId, string firebaseId);

        Task<ExerciseDto> SetRating(Guid exerciseId, Guid userId, int rating);

        Task<ExerciseDto> SetRating(Guid exerciseId, string firebaseId, int rating);

        Task<ExerciseDto> UnsetRating(Guid exerciseId, Guid userId);

        Task<ExerciseDto> UnsetRating(Guid exerciseId, string firebaseId);
    }
}

