using PeriodisationProgramApp.Domain.Entities;
using PeriodisationProgramApp.Domain.Enums;
using PeriodisationProgramApp.Domain.Pagination;

namespace PeriodisationProgramApp.Domain.Interfaces
{
    public interface ITrainingProgramRepository : IGenericRepository<TrainingProgram>
    {
        Task<PagedResult<TrainingProgram>> GetUserCreatedTrainingPrograms(IPageableQueryContext context, Guid userId);

        Task<PagedResult<TrainingProgram>> GetUserLikedTrainingPrograms(IPageableQueryContext context, Guid userId);

        Task<TrainingProgram> SetLike(Guid trainingProgramId, Guid userId);

        Task<TrainingProgram> UnsetLike(Guid trainingProgramId, Guid userId);
    }
}
