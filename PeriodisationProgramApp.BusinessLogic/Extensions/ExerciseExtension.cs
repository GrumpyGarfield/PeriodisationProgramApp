using AutoMapper;
using PeriodisationProgramApp.BusinessLogic.Domain;
using PeriodisationProgramApp.BusinessLogic.Domain.Dto;
using PeriodisationProgramApp.Domain.Entities;
using PeriodisationProgramApp.Domain.Enums;
using PeriodisationProgramApp.Domain.Extensions;
using PeriodisationProgramApp.Domain.Pagination;

namespace PeriodisationProgramApp.BusinessLogic.Extensions
{
    public static class ExerciseExtension
    {

        public static PagedResult<ExerciseDto> TranslateToDto(this PagedResult<Exercise> exercises, IMapper mapper, Guid? userId)
        {
            return exercises.TranslateToDto<Exercise, ExerciseDto, UserExerciseLike, UserExerciseRating>(mapper, userId);
        }

        public static ExerciseDto TranslateToDto(this Exercise exercise, IMapper mapper, Guid? userId)
        {
            return exercise.TranslateToDto<Exercise, ExerciseDto, UserExerciseLike, UserExerciseRating>(mapper, userId);
        }
    }
}
