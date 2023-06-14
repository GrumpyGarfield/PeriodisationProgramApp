using PeriodisationProgramApp.BusinessLogic.Domain.Dto;
using PeriodisationProgramApp.Domain.Entities;

namespace PeriodisationProgramApp.BusinessLogic.Services.Interfaces
{
    public interface ITrainingProgramService : ICommunityEntityService<TrainingProgram, TrainingProgramDto, UserTrainingProgramLike, UserTrainingProgramRating>
    {
    }
}

