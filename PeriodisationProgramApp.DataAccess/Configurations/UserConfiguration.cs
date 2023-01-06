using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PeriodisationProgramApp.Configuration.Interfaces;
using PeriodisationProgramApp.Domain.Entities;

namespace PeriodisationProgramApp.DataAccess.Configurations
{
    public class UserConfiguration : EntityConfiguration<User>
    {
        private readonly IDefaultDataSettings _defaultDataSettings;

        public UserConfiguration(IDefaultDataSettings defaultDataSettings) : base()
        {
            _defaultDataSettings = defaultDataSettings;
        }

        public override void Configure(EntityTypeBuilder<User> builder)
        {
            base.Configure(builder);

            builder.Property(u => u.Username).IsRequired().HasMaxLength(50);
            builder.Property(u => u.Email).IsRequired().HasMaxLength(100);
        }
    }
}
