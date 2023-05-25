using AutoMapper;
using PeriodisationProgramApp.BusinessLogic.Domain.Dto;
using PeriodisationProgramApp.Domain.Entities;

namespace PeriodisationProgramApp.BusinessLogic.Mapper
{
    public class MuscleGroupToMuscleGroupDtoMapper : Profile
    {
        public MuscleGroupToMuscleGroupDtoMapper()
        {
            CreateMap<MuscleGroup, MuscleGroupDto>()
                .ForMember(t => t.MuscleGroupUserData, opt => opt.MapFrom(t => t.MuscleGroupUsersData.FirstOrDefault()));
        }
    }
}
