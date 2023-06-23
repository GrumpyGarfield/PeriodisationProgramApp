using AutoMapper;
using PeriodisationProgramApp.BusinessLogic.Domain.Dto;
using PeriodisationProgramApp.BusinessLogic.Dto;
using PeriodisationProgramApp.Domain.Entities;

namespace PeriodisationProgramApp.BusinessLogic.Mapper
{
    public class UpdateTrainingProgramDtoToTrainingProgramMapper : Profile
    {
        public UpdateTrainingProgramDtoToTrainingProgramMapper()
        {
            CreateMap<UpdateTrainingProgramDto, TrainingProgram>()
                .ForMember(t => t.Sessions, opt => opt.MapFrom<TrainingSessionFromTrainingSessionDtoResolver<UpdateTrainingProgramDto, TrainingProgram>, List<TrainingSessionDto>>(t => t.Sessions));
        }
    }
}
