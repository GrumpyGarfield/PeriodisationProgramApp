using AutoMapper;
using PeriodisationProgramApp.Domain.Entities;
using PeriodisationProgramApp.WebApi.Dto;

namespace PeriodisationProgramApp.WebApi.Mapper
{
    public class ExerciseToExerciseDtoMapper : Profile
    {
        public ExerciseToExerciseDtoMapper()
        {
            CreateMap<Exercise, ExerciseDto>();
        }
    }
}