namespace PeriodisationProgramApp.Domain.Interfaces
{
    public interface IUnitOfWork : IDisposable
    {
        IUserRepository Users { get; }

        IMuscleGroupRepository MuscleGroups { get; }

        IExerciseRepository Exercises { get; }

        IExerciseMuscleGroupRepository ExerciseMuscleGroups { get; }

        ITrainingProgramRepository TrainingPrograms { get; }

        ITrainingSessionRepository TrainingSessions { get; }

        ITrainingSessionExerciseRepository TrainingSessionExercises { get; }

        int Complete();

        Task<int> CompleteAsync();
    }
}
