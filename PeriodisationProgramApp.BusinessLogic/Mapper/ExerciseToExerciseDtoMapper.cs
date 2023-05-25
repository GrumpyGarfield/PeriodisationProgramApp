using AutoMapper;
using PeriodisationProgramApp.BusinessLogic.Domain.Dto;
using PeriodisationProgramApp.Domain.Entities;

namespace PeriodisationProgramApp.BusinessLogic.Mapper
{
    public class ExerciseToExerciseDtoMapper : Profile
    {
        public ExerciseToExerciseDtoMapper()
        {
            CreateMap<Exercise, ExerciseDto>()
                .ForMember(t => t.IsLiked, opt => opt.Ignore())
                .ForMember(t => t.IsRated, opt => opt.Ignore())
                .ForMember(t => t.UserRating, opt => opt.Ignore())
                .ForMember(t => t.ExerciseUserData, opt => opt.MapFrom(t => t.ExerciseUsersData.FirstOrDefault()));
        }
    }
}