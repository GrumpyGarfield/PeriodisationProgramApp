using AutoMapper;
using PeriodisationProgramApp.BusinessLogic.Dto;
using PeriodisationProgramApp.Domain.Entities;

namespace PeriodisationProgramApp.BusinessLogic.Mapper
{
    public class TrainingSessionToTrainingSessionDtoMapper : Profile
    {
        public TrainingSessionToTrainingSessionDtoMapper()
        {
            CreateMap<TrainingSession, TrainingSessionDto>();
        }
    }
}