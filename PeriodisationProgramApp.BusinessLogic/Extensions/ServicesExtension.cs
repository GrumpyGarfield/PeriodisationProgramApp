using Microsoft.Extensions.DependencyInjection;
using PeriodisationProgramApp.BusinessLogic.Services;
using PeriodisationProgramApp.BusinessLogic.Services.Interfaces;

namespace PeriodisationProgramApp.BusinessLogic.Extensions
{
    public static class ServicesExtension
    {
        public static void AddBusinessLogicServices(this IServiceCollection services)
        {
            services
                .AddScoped<ITrainingProgramService, TrainingProgramService>()
                .AddScoped<IExerciseService, ExerciseService>()
                .AddScoped<IMuscleGroupService, MuscleGroupService>()
                .AddScoped<IUserService, UserService>();
        }
    }
}
