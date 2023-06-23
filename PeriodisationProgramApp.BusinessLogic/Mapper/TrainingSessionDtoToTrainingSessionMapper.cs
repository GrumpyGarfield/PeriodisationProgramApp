using AutoMapper;
using PeriodisationProgramApp.BusinessLogic.Dto;
using PeriodisationProgramApp.Domain.Entities;

namespace PeriodisationProgramApp.BusinessLogic.Mapper
{
    public class TrainingSessionDtoToTrainingSessionMapper : Profile
    {
        public TrainingSessionDtoToTrainingSessionMapper()
        {
            CreateMap<TrainingSessionDto, TrainingSession>();
        }
    }
}