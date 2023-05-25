using PeriodisationProgramApp.Domain.Entities;

namespace PeriodisationProgramApp.Domain.Interfaces
{
    public interface ITrainingProgramRepository : ICommunityEntityRepository<TrainingProgram, UserTrainingProgramLike, UserTrainingProgramRating>
    {
    }
}
