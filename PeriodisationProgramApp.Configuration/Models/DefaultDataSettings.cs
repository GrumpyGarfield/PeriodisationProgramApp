using PeriodisationProgramApp.Configuration.Interfaces;
using PeriodisationProgramApp.Domain.Entities;

namespace PeriodisationProgramApp.Configuration.Models
{
    public class DefaultDataSettings : IDefaultDataSettings
    {
        public User? DefaultUser { get; set; }
    }
}
