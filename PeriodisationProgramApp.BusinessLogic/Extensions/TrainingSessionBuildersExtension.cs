using Microsoft.Extensions.DependencyInjection;
using PeriodisationProgramApp.BusinessLogic.Builders.Interfaces;
using PeriodisationProgramApp.BusinessLogic.Builders.TrainingSessionBuilders;

namespace PeriodisationProgramApp.BusinessLogic.Extensions
{
    public static class TrainingSessionBuildersExtension
    {
        public static void AddTrainingSessionBuilders(this IServiceCollection services)
        {
            services
                .AddScoped<ITrainingSessionBuilder, PushTrainingSessionBuilder>()
                .AddScoped<ITrainingSessionBuilder, PullTrainingSessionBuilder>()
                .AddScoped<ITrainingSessionBuilder, LegsTrainingSessionBuilder>()
                .AddScoped<ITrainingSessionBuilder, UpperTrainingSessionBuilder>()
                .AddScoped<ITrainingSessionBuilder, LowerTrainingSessionBuilder>();
        }
    }
}
