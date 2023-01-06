using PeriodisationProgramApp.Configuration.Interfaces;
using PeriodisationProgramApp.Configuration.Models;

namespace PeriodisationProgramApp.WebApi
{
    internal class AppSettings : IAppSettings
    {
        public AppSettings(IConfiguration configuration)
        {
            DefaultDataSettings = new DefaultDataSettings();
            configuration.GetSection("DefaultDataSettings").Bind(DefaultDataSettings);
        }

        public IDefaultDataSettings DefaultDataSettings { get; }
    }
}
