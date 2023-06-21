using AutoMapper;
using PeriodisationProgramApp.BusinessLogic.Domain.Dto;
using PeriodisationProgramApp.Domain.Entities;

namespace PeriodisationProgramApp.BusinessLogic.Mapper
{
    public class CreateExerciseMuscleGroupDtoToExerciseMuscleGroupMapper : Profile
    {

        public CreateExerciseMuscleGroupDtoToExerciseMuscleGroupMapper()
        {
            CreateMap<CreateExerciseMuscleGroupDto, ExerciseMuscleGroup>()
                .ForMember(t => t.MuscleGroup, opt => opt.MapFrom<MuscleGroupFromMuscleGroupIdResolver<CreateExerciseMuscleGroupDto, ExerciseMuscleGroup>, Guid>(t => t.MuscleGroupId));
        }
    }
}