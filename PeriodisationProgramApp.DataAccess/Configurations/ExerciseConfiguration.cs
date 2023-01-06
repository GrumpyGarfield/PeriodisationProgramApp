using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PeriodisationProgramApp.Domain.Entities;

namespace PeriodisationProgramApp.DataAccess.Configurations
{
    public class ExerciseConfiguration : EntityConfiguration<Exercise>
    {
        public override void Configure(EntityTypeBuilder<Exercise> builder)
        {
            base.Configure(builder);
            
            builder.Property(m => m.Name).IsRequired().HasMaxLength(100);
            builder.Property(m => m.RawStimulusMagnitude).IsRequired();
            builder.Property(m => m.FatigueMagnitude).IsRequired();
            builder.Property(m => m.StimulusToFatigueRatio).IsRequired()
                .HasPrecision(38, 1)
                .HasComputedColumnSql("cast(\"RawStimulusMagnitude\" + 1 as decimal) / (\"FatigueMagnitude\" + 1)", true);

            builder.ToTable(t => t.HasCheckConstraint("CK_RawStimulusMagnitude", "\"RawStimulusMagnitude\" > -1 AND \"RawStimulusMagnitude\" < 10"));
            builder.ToTable(t => t.HasCheckConstraint("CK_FatigueMagnitude", "\"FatigueMagnitude\" > -1 AND \"FatigueMagnitude\" < 10"));
        }
    }
}
