using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PeriodisationProgramApp.Domain.Entities;

namespace PeriodisationProgramApp.DataAccess.Configurations
{
    public class TrainingSessionConfiguration : EntityConfiguration<TrainingSession>
    {
        public override void Configure(EntityTypeBuilder<TrainingSession> builder)
        {
            base.Configure(builder);

            builder.ToTable(t => t.HasCheckConstraint("CK_Week", "\"Week\" > 0 AND \"Week\" < 100"));
            builder.ToTable(t => t.HasCheckConstraint("CK_RepsInReserve", "\"RepsInReserve\" > -1 AND \"RepsInReserve\" < 10"));
        }
    }
}
