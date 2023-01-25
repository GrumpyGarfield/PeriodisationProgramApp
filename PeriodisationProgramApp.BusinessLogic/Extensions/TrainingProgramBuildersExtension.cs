using Microsoft.Extensions.DependencyInjection;
using PeriodisationProgramApp.BusinessLogic.Builders.Interfaces;
using PeriodisationProgramApp.BusinessLogic.Builders.TrainingProgramBuilders;

namespace PeriodisationProgramApp.BusinessLogic.Extensions
{
    public static class TrainingProgramBuildersExtension
    {
        public static void AddTrainingProgramBuilders(this IServiceCollection services)
        {
            services
                .AddScoped<ITrainingProgramBuilder, PushPullLegsTrainingProgramBuilder>()
                .AddScoped<ITrainingProgramBuilder, UpperLowerTrainingProgramBuilder>();
        }
    }
}
