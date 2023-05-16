using PeriodisationProgramApp.DataAccess.QueryContext;
using PeriodisationProgramApp.BusinessLogic.Domain.Dto;
using PeriodisationProgramApp.Domain.Pagination;

namespace PeriodisationProgramApp.BusinessLogic.Services.Interfaces
{
    public interface ITrainingProgramService
    {
        Task<PagedResult<TrainingProgramDto>> GetTrainingPrograms(PageableQueryContext context);

        Task<PagedResult<TrainingProgramDto>> GetUserCreatedTrainingPrograms(PageableQueryContext context, Guid userId);

        Task<PagedResult<TrainingProgramDto>> GetUserLikedTrainingPrograms(PageableQueryContext context, Guid userId);

        Task<PagedResult<TrainingProgramDto>> GetUserCreatedTrainingProgramsByFirebaseId(PageableQueryContext context, string firebaseId);

        Task<PagedResult<TrainingProgramDto>> GetUserLikedTrainingProgramsByFirebaseId(PageableQueryContext context, string firebaseId);
    }
}

