using AutoMapper;
using PeriodisationProgramApp.Domain.Entities;
using PeriodisationProgramApp.WebApi.Dto;

namespace PeriodisationProgramApp.WebApi.Mapper
{
    public class TrainingSessionExerciseToTrainingSessionExerciseDtoMapper : Profile
    {
        public TrainingSessionExerciseToTrainingSessionExerciseDtoMapper()
        {
            CreateMap<TrainingSessionExercise, TrainingSessionExerciseDto>();
        }
    }
}