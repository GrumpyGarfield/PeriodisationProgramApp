using Microsoft.Extensions.DependencyInjection;
using PeriodisationProgramApp.DataAccess.Repositories;
using PeriodisationProgramApp.Domain.Interfaces;

namespace PeriodisationProgramApp.DataAccess.Extensions
{
    public static class RepositoryExtensions
    {
        public static void AddRepositories(this IServiceCollection services)
        {
            services
                .AddTransient<ITrainingProgramRepository, TrainingProgramRepository>()
                .AddTransient<IExerciseRepository, ExerciseRepository>()
                .AddTransient<IMuscleGroupRepository, MuscleGroupRepository>()
                .AddTransient<IUserRepository, UserRepository>();
        }
    }
}
