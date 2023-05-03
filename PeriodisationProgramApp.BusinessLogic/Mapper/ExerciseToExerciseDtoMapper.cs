using AutoMapper;
using PeriodisationProgramApp.BusinessLogic.Domain.Dto;
using PeriodisationProgramApp.Domain.Entities;

namespace PeriodisationProgramApp.BusinessLogic.Mapper
{
    public class ExerciseToExerciseDtoMapper : Profile
    {
        public ExerciseToExerciseDtoMapper()
        {
            CreateMap<Exercise, ExerciseDto>();
        }
    }
}