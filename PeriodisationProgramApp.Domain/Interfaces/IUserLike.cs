namespace PeriodisationProgramApp.Domain.Interfaces
{
    public interface IUserLike : IEntity
    {
        Guid UserId { get; set; }
    }
}