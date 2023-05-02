using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PeriodisationProgramApp.Domain.Entities;

namespace PeriodisationProgramApp.DataAccess.Configurations
{
    public class TrainingProgramConfiguration : EntityConfiguration<TrainingProgram>
    {
        public override void Configure(EntityTypeBuilder<TrainingProgram> builder)
        {
            base.Configure(builder);

            builder.Property(m => m.Name).IsRequired().HasMaxLength(100);
            builder.Property(m => m.Type).IsRequired();
            builder.Property(m => m.TrainingLevel).IsRequired();
        }
    }
}
