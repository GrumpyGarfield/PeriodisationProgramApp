using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PeriodisationProgramApp.Domain.Entities;

namespace PeriodisationProgramApp.DataAccess.Configurations
{
    public class TrainingSessionExerciseConfiguration : EntityConfiguration<TrainingSessionExercise>
    {
        public override void Configure(EntityTypeBuilder<TrainingSessionExercise> builder)
        {
            base.Configure(builder);

            builder.ToTable(t => t.HasCheckConstraint("CK_Sets", "\"Sets\" > 0 AND \"Sets\" < 100"));
        }
    }
}
