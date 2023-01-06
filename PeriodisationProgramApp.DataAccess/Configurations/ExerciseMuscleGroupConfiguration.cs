using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PeriodisationProgramApp.Domain.Entities;

namespace PeriodisationProgramApp.DataAccess.Configurations
{
    public class ExerciseMuscleGroupConfiguration : EntityConfiguration<ExerciseMuscleGroup>
    {
        public override void Configure(EntityTypeBuilder<ExerciseMuscleGroup> builder)
        {
            base.Configure(builder);
        }
    }
}
