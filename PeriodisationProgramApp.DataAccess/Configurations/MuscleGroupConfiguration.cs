using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PeriodisationProgramApp.Domain.Entities;

namespace PeriodisationProgramApp.DataAccess.Configurations
{
    public class MuscleGroupConfiguration : EntityConfiguration<MuscleGroup>
    {
        public override void Configure(EntityTypeBuilder<MuscleGroup> builder)
        {
            base.Configure(builder);
            
            builder.Property(m => m.Name).IsRequired().HasMaxLength(50);
            builder.Property(m => m.MaintenanceVolume).IsRequired();
            builder.Property(m => m.MinimumEffectiveVolume).IsRequired();
            builder.Property(m => m.MaximumRecoverableVolume).IsRequired();

            builder.ToTable(t => t.HasCheckConstraint("CK_MaintenanceVolume", "\"MaintenanceVolume\" > 0 AND \"MaintenanceVolume\" < 100"));
            builder.ToTable(t => t.HasCheckConstraint("CK_MinimumEffectiveVolume", "\"MinimumEffectiveVolume\" > 0 AND \"MinimumEffectiveVolume\" < 100"));
            builder.ToTable(t => t.HasCheckConstraint("CK_MaximumRecoverableVolume", "\"MaximumRecoverableVolume\" > 0 AND \"MaximumRecoverableVolume\" < 100"));
        }
    }
}
