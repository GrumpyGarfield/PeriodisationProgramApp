using AutoMapper;
using PeriodisationProgramApp.BusinessLogic.Dto;
using PeriodisationProgramApp.Domain.Entities;

namespace PeriodisationProgramApp.BusinessLogic.Mapper
{
    public class TrainingSessionExerciseToTrainingSessionExerciseDtoMapper : Profile
    {
        public TrainingSessionExerciseToTrainingSessionExerciseDtoMapper()
        {
            CreateMap<TrainingSessionExercise, TrainingSessionExerciseDto>();
        }
    }
}