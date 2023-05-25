namespace PeriodisationProgramApp.Domain.Interfaces
{
    public interface IUserRating : IEntity
    {
        Guid UserId { get; set; }

        int Rating { get; set; }
    }
}