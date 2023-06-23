using AutoMapper;
using PeriodisationProgramApp.BusinessLogic.Dto;
using PeriodisationProgramApp.Domain.Entities;

namespace PeriodisationProgramApp.BusinessLogic.Mapper
{
    public class TrainingSessionExerciseDtoToTrainingSessionExerciseMapper : Profile
    {
        public TrainingSessionExerciseDtoToTrainingSessionExerciseMapper()
        {
            CreateMap<TrainingSessionExerciseDto, TrainingSessionExercise>()
                .ForMember(t => t.Exercise, opt => opt.MapFrom<ExerciseFromExerciseIdResolver<TrainingSessionExerciseDto, TrainingSessionExercise>, Guid>(t => t.Exercise!.Id));
        }
    }
}
