using AutoMapper;
using PeriodisationProgramApp.Domain.Entities;
using PeriodisationProgramApp.WebApi.Dto;

namespace PeriodisationProgramApp.WebApi.Mapper
{
    public class TrainingSessionToTrainingSessionDtoMapper : Profile
    {
        public TrainingSessionToTrainingSessionDtoMapper()
        {
            CreateMap<TrainingSession, TrainingSessionDto>();
        }
    }
}