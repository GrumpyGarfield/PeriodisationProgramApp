using AutoMapper;
using PeriodisationProgramApp.BusinessLogic.Domain.Dto;
using PeriodisationProgramApp.Domain.Entities;
using PeriodisationProgramApp.Domain.Enums;

namespace PeriodisationProgramApp.BusinessLogic.Mapper
{
    public class CreateExerciseDtoToExerciseMapper : Profile
    {
        public CreateExerciseDtoToExerciseMapper()
        {
            CreateMap<CreateExerciseDto, Exercise>()
                .ForMember(t => t.StimulusToFatigueRatio, opt => opt.MapFrom(t => (double)(t.RawStimulusMagnitude + 1) / (t.FatigueMagnitude + 1)))
                .ForMember(t => t.TargetMuscleGroup, opt => opt.MapFrom<MuscleGroupFromMuscleGroupIdResolver<CreateExerciseDto, Exercise>, Guid>(t => t.ExerciseMuscleGroups.First(g => g.MuscleGroupRole == MuscleGroupRole.Target).MuscleGroupId));
        }
    }
}