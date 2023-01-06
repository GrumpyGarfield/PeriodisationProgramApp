using PeriodisationProgramApp.Configuration.Interfaces;

namespace PeriodisationProgramApp.WebApi
{
    internal interface IAppSettings
    {
        IDefaultDataSettings DefaultDataSettings { get; }
    }
}
