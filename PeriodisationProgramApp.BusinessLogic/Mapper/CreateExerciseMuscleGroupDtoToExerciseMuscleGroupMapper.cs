using AutoMapper;
using PeriodisationProgramApp.BusinessLogic.Domain.Dto;
using PeriodisationProgramApp.BusinessLogic.Dto;
using PeriodisationProgramApp.DataAccess.UnitsOfWork;
using PeriodisationProgramApp.Domain.Entities;
using PeriodisationProgramApp.Domain.Interfaces;

namespace PeriodisationProgramApp.BusinessLogic.Mapper
{
    public class CreateExerciseMuscleGroupDtoToExerciseMuscleGroupMapper : Profile
    {

        public CreateExerciseMuscleGroupDtoToExerciseMuscleGroupMapper()
        {
            CreateMap<CreateExerciseMuscleGroupDto, ExerciseMuscleGroup>()
                .ForMember(t => t.MuscleGroup, opt => opt.MapFrom<MuscleGroupFromMuscleGroupIdResolver, Guid>(t => t.MuscleGroupId));
        }
    }
}