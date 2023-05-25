using AutoMapper;
using PeriodisationProgramApp.BusinessLogic.Dto;
using PeriodisationProgramApp.Domain.Entities;

namespace PeriodisationProgramApp.BusinessLogic.Mapper
{
    public class ExerciseMuscleGroupToExerciseMuscleGroupDtoMapper : Profile
    {
        public ExerciseMuscleGroupToExerciseMuscleGroupDtoMapper()
        {
            CreateMap<ExerciseMuscleGroup, ExerciseMuscleGroupDto>();
        }
    }
}