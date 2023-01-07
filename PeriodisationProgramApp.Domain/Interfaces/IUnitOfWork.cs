namespace PeriodisationProgramApp.Domain.Interfaces
{
    public interface IUnitOfWork : IDisposable
    {
        IUsersRepository Users { get; }

        IMuscleGroupRepository MuscleGroups { get; }

        IExerciseRepository Exercises { get; }

        IExerciseMuscleGroupRepository ExerciseMuscleGroups { get; }

        int Complete();

        Task<int> CompleteAsync();
    }
}
