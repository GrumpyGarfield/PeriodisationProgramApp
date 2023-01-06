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
            
            builder.Property(m => m.Name).IsRequired().HasMaxLength(100);
            builder.Property(m => m.MaintenanceVolume).IsRequired();
            builder.Property(m => m.MinimumEffectiveVolume).IsRequired();
            builder.Property(m => m.MaximumRecoverableVolume).IsRequired();
            builder.Property(m => m.MaximumRecoverableVolumeMultiplicator).IsRequired().HasDefaultValue(5);
            builder.Property(m => m.AverageRecoveryTime).IsRequired().HasDefaultValue(1);

            builder.ToTable(t => t.HasCheckConstraint("CK_MaintenanceVolume", "\"MaintenanceVolume\" > -1 AND \"MaintenanceVolume\" < 100"));
            builder.ToTable(t => t.HasCheckConstraint("CK_MinimumEffectiveVolume", "\"MinimumEffectiveVolume\" > -1 AND \"MinimumEffectiveVolume\" < 100"));
            builder.ToTable(t => t.HasCheckConstraint("CK_MaximumRecoverableVolume", "\"MaximumRecoverableVolume\" > -1 AND \"MaximumRecoverableVolume\" < 100"));
            builder.ToTable(t => t.HasCheckConstraint("CK_MaximumRecoverableVolumeMultiplicator", "\"MaximumRecoverableVolumeMultiplicator\" > -1 AND \"MaximumRecoverableVolumeMultiplicator\" < 100"));
            builder.ToTable(t => t.HasCheckConstraint("CK_AverageRecoveryTime", "\"AverageRecoveryTime\" > 0 AND \"AverageRecoveryTime\" < 10"));
        }
    }
}
