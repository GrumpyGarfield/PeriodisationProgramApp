using AutoMapper;
using PeriodisationProgramApp.BusinessLogic.Domain.Dto;
using PeriodisationProgramApp.Domain.Entities;

namespace PeriodisationProgramApp.BusinessLogic.Mapper
{
    public class CreateTrainingProgramDtoToTrainingProgramMapper : Profile
    {
        public CreateTrainingProgramDtoToTrainingProgramMapper()
        {
            CreateMap<CreateTrainingProgramDto, TrainingProgram>()
                .ForMember(t => t.Sessions, opt => opt.Ignore());
        }
    }
}
