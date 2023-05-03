using PeriodisationProgramApp.DataAccess.QueryContext;
using PeriodisationProgramApp.BusinessLogic.Domain.Dto;
using PeriodisationProgramApp.Domain.Pagination;

namespace PeriodisationProgramApp.BusinessLogic.Services.Interfaces
{
    public interface ITrainingProgramService
    {
        Task<PagedResult<TrainingProgramDto>> GetTrainingPrograms(PageableQueryContext context);
    }
}

