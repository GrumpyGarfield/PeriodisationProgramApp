using PeriodisationProgramApp.Domain.Entities;
using PeriodisationProgramApp.Domain.Pagination;

namespace PeriodisationProgramApp.Domain.Interfaces
{
    public interface ICommunityEntityRepository<T, UserLike, UserRating> : IEntityWithUserDataRepository<T>
        where T : CommunityEntity<UserLike, UserRating>
        where UserLike : IUserLike
        where UserRating : IUserRating
    {
        Task<PagedResult<T>> GetUserCreated(IPageableQueryContext context, Guid userId);

        Task<PagedResult<T>> GetUserLiked(IPageableQueryContext context, Guid userId);

        Task<T> SetLike(Guid id, Guid userId);

        Task<T> UnsetLike(Guid id, Guid userId);

        Task<T> SetRating(Guid id, Guid userId, int rating);

        Task<T> UnsetRating(Guid id, Guid userId);
    }
}
