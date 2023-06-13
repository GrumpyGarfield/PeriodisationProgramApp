namespace PeriodisationProgramApp.Domain.Interfaces
{
    public interface IBaseEntity
    {
        DateTime Created { get; set; }
        Guid Id { get; set; }
        bool IsDeleted { get; set; }
        DateTime Updated { get; set; }
    }
}