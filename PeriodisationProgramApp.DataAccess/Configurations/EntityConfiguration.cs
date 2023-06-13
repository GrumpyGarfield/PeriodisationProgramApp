using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using PeriodisationProgramApp.Domain.Entities;

namespace PeriodisationProgramApp.DataAccess.Configurations
{
    public class EntityConfiguration<TEntity> : IEntityTypeConfiguration<TEntity> where TEntity : BaseEntity
    {
        public virtual void Configure(EntityTypeBuilder<TEntity> builder)
        {
            builder.Property(e => e.Created).HasDefaultValueSql("NOW()");
            builder.Property(e => e.Updated).HasDefaultValueSql("NOW()");
            builder.HasQueryFilter(e => !e.IsDeleted);
        }
    }
}
