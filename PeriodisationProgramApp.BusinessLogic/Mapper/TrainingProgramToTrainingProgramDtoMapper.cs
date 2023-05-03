using AutoMapper;
using PeriodisationProgramApp.BusinessLogic.Domain.Dto;
using PeriodisationProgramApp.Domain.Entities;

namespace PeriodisationProgramApp.BusinessLogic.Mapper
{
    public class TrainingProgramToTrainingProgramDtoMapper : Profile
    {
        public TrainingProgramToTrainingProgramDtoMapper() 
        {
            CreateMap<TrainingProgram, TrainingProgramDto>();
        }
    }
}
