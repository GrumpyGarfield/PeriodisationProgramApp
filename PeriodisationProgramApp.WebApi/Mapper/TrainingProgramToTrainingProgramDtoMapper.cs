using AutoMapper;
using PeriodisationProgramApp.Domain.Entities;
using PeriodisationProgramApp.WebApi.Dto;

namespace PeriodisationProgramApp.WebApi.Mapper
{
    public class TrainingProgramToTrainingProgramDtoMapper : Profile
    {
        public TrainingProgramToTrainingProgramDtoMapper() 
        {
            CreateMap<TrainingProgram, TrainingProgramDto>();
        }
    }
}
