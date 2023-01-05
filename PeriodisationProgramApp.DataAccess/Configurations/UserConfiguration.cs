using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PeriodisationProgramApp.Domain.Entities;

namespace PeriodisationProgramApp.DataAccess.Configurations
{
    public class UserConfiguration : EntityConfiguration<User>
    {
        public override void Configure(EntityTypeBuilder<User> builder)
        {
            base.Configure(builder);

            var patientZero = new User
            {
                Id = Guid.Parse("a83cc106-c6b1-44c3-a3c1-12d9a05f03a0"),
                Username = "patientZero",
                Email = "pprcut47@yandex.ru"
            };

            builder.HasData(patientZero);
            builder.Property(u => u.Username).IsRequired().HasMaxLength(50);
            builder.Property(u => u.Email).IsRequired().HasMaxLength(100);
        }
    }
}
