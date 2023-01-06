using PeriodisationProgramApp.Domain.Entities;

namespace PeriodisationProgramApp.Configuration.Interfaces
{
    public interface IDefaultDataSettings
    {
        User? DefaultUser { get; set; }
    }
}
