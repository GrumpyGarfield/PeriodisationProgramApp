using AutoMapper;
using PeriodisationProgramApp.Domain.Entities;

namespace PeriodisationProgramApp.BusinessLogic.Mapper
{
    public class MuscleGroupUserDataToMuscleGroupUserDataDtoMapper : Profile
    {
        public MuscleGroupUserDataToMuscleGroupUserDataDtoMapper()
        {
            CreateMap<MuscleGroupUserData, MuscleGroupUserDataDto>();
        }
    }
}
