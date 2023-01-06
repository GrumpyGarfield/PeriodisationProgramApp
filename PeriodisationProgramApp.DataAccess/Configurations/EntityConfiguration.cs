using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using PeriodisationProgramApp.Domain.Entities;

namespace PeriodisationProgramApp.DataAccess.Configurations
{
    public class EntityConfiguration<TEntity> : IEntityTypeConfiguration<TEntity> where TEntity : Entity
    {
        public virtual void Configure(EntityTypeBuilder<TEntity> builder)
        {
            builder.Property(e => e.Created).HasDefaultValueSql("NOW()").ValueGeneratedOnAdd();
            builder.Property(e => e.Updated).HasDefaultValueSql("NOW()").ValueGeneratedOnAddOrUpdate();
            builder.HasQueryFilter(e => !e.IsDeleted);
        }
    }
}
