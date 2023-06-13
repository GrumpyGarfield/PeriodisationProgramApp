namespace PeriodisationProgramApp.Domain.Interfaces
{
    public interface IUserLike : IBaseEntity
    {
        Guid UserId { get; set; }
    }
}