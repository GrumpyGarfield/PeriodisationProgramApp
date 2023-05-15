using AutoMapper;
using PeriodisationProgramApp.BusinessLogic.Domain.Dto;
using PeriodisationProgramApp.Domain.Entities;

namespace PeriodisationProgramApp.BusinessLogic.Mapper
{
    public class UserToUserDtopMapper : Profile
    {
        public UserToUserDtopMapper()
        {
            CreateMap<User, UserDto>();
        }
    }
}
