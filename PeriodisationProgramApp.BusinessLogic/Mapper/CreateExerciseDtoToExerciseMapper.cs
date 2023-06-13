using AutoMapper;
using PeriodisationProgramApp.BusinessLogic.Domain.Dto;
using PeriodisationProgramApp.Domain.Entities;

namespace PeriodisationProgramApp.BusinessLogic.Mapper
{
    public class CreateExerciseDtoToExerciseMapper : Profile
    {
        public CreateExerciseDtoToExerciseMapper()
        {
            CreateMap<CreateExerciseDto, Exercise>()
                .ForMember(t => t.StimulusToFatigueRatio, opt => opt.MapFrom(t => (double)(t.RawStimulusMagnitude + 1) / (t.FatigueMagnitude + 1)));
        }
    }
}