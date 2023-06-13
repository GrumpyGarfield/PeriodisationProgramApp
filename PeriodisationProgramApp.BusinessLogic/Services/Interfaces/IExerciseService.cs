using PeriodisationProgramApp.DataAccess.QueryContext;
using PeriodisationProgramApp.BusinessLogic.Domain.Dto;
using PeriodisationProgramApp.Domain.Pagination;
using PeriodisationProgramApp.Domain.Entities;
using PeriodisationProgramApp.BusinessLogic.Dto;

namespace PeriodisationProgramApp.BusinessLogic.Services.Interfaces
{
    public interface IExerciseService
    {
        Task<PagedResult<ExerciseDto>> GetExercises(PageableQueryContext context, Guid? userId);

        Task<PagedResult<ExerciseDto>> GetExercises(PageableQueryContext context, string? firebaseId);

        Task<ExerciseDto> GetExercise(Guid exerciseId, Guid? userId);

        Task<ExerciseDto> GetExercise(Guid exerciseId, string? firebaseId);

        Task<ExerciseDto> UpdateExerciseUserData(Guid exerciseId, Guid userId, ExerciseUserDataDto exerciseUserDataDto);

        Task<ExerciseDto> UpdateExerciseUserData(Guid exerciseId, string firebaseId, ExerciseUserDataDto exerciseUserDataDto);
    }
}

