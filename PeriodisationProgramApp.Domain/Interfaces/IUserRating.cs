namespace PeriodisationProgramApp.Domain.Interfaces
{
    public interface IUserRating : IBaseEntity
    {
        Guid UserId { get; set; }

        int Rating { get; set; }
    }
}