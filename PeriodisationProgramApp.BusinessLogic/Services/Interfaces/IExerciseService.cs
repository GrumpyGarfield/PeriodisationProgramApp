using PeriodisationProgramApp.BusinessLogic.Domain.Dto;
using PeriodisationProgramApp.Domain.Entities;
using PeriodisationProgramApp.BusinessLogic.Dto;

namespace PeriodisationProgramApp.BusinessLogic.Services.Interfaces
{
    public interface IExerciseService : ICommunityEntityService<Exercise, ExerciseDto, UserExerciseLike, UserExerciseRating>
    {
        Task<ExerciseDto> UpdateExerciseUserData(Guid exerciseId, Guid userId, ExerciseUserDataDto exerciseUserDataDto);

        Task<ExerciseDto> UpdateExerciseUserData(Guid exerciseId, string firebaseId, ExerciseUserDataDto exerciseUserDataDto);
    }
}

