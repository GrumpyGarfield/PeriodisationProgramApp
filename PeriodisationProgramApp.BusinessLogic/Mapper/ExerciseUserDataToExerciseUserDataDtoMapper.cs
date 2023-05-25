using AutoMapper;
using PeriodisationProgramApp.BusinessLogic.Dto;
using PeriodisationProgramApp.Domain.Entities;

namespace PeriodisationProgramApp.BusinessLogic.Mapper
{
    public class ExerciseUserDataToExerciseUserDataDtoMapper : Profile
    {
        public ExerciseUserDataToExerciseUserDataDtoMapper()
        {
            CreateMap<ExerciseUserData, ExerciseUserDataDto>();
        }
    }
}
