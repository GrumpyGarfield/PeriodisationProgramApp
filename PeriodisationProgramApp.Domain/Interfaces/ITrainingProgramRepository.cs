using PeriodisationProgramApp.Domain.Entities;
using PeriodisationProgramApp.Domain.Enums;

namespace PeriodisationProgramApp.Domain.Interfaces
{
    public interface ITrainingProgramRepository : IGenericRepository<TrainingProgram>
    {
        void SetLike(TrainingProgram trainingProgram, bool isLiked);

        void SetRating(TrainingProgram trainingProgram, bool isRated, int rating);
    }
}
