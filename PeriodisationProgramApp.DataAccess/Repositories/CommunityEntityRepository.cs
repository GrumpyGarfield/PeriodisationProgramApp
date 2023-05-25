using Microsoft.EntityFrameworkCore;
using PeriodisationProgramApp.DataAccess.Extensions;
using PeriodisationProgramApp.Domain.Entities;
using PeriodisationProgramApp.Domain.Interfaces;
using PeriodisationProgramApp.Domain.Pagination;

namespace PeriodisationProgramApp.DataAccess.Repositories
{
    public abstract class CommunityEntityRepository<T, UserLike, UserRating> : GenericRepository<T>, ICommunityEntityRepository<T, UserLike, UserRating>
        where T : CommunityEntity<UserLike, UserRating>
        where UserLike : IUserLike
        where UserRating: IUserRating
    {
        public CommunityEntityRepository(ApplicationContext context) : base(context)
        {
        }

        protected virtual async Task<PagedResult<T>> GetPagedAsync(IQueryable<T> query, IPageableQueryContext context, Guid? userId = null)
        {
            return await IncludeAll(query, userId)
                        .SortAndFilter<T, UserLike, UserRating>(context)
                        .GetPagedAsync(context.Offset, context.Limit);
        }

        protected virtual IQueryable<T> IncludeAll(IQueryable<T> query, Guid? userId = null)
        {
            return query.Include(t => t.User)
                        .Include(t => t.UserLikes)
                        .Include(t => t.UserRatings);
        }

        public async Task<PagedResult<T>> GetPaginatedResultAsync(IPageableQueryContext context, Guid? userId = null)
        {
            var query = _context.Set<T>();
            return await GetPagedAsync(query, context, userId);
        }

        public async Task<PagedResult<T>> GetUserCreated(IPageableQueryContext context, Guid userId)
        {
            var query = _context.Set<T>().Where(t => t.UserId == userId);
            return await GetPagedAsync(query, context);
        }

        public async Task<PagedResult<T>> GetUserLiked(IPageableQueryContext context, Guid userId)
        {
            var query = _context.Set<T>().Where(t => t.UserLikes.Any(u => u.UserId == userId));
            return await GetPagedAsync(query, context);
        }

        public async Task<T> SetLike(Guid id, Guid userId)
        {
            var query = _context.Set<T>();
            var communityEntity = await IncludeAll(query).FirstOrDefaultAsync(t => t.Id == id);

            if (communityEntity == null)
            {
                throw new Exception($"Entity of type {typeof(T).FullName} with id {id} not found");
            }

            var userLike = (UserLike)Activator.CreateInstance(typeof(UserLike), new object[] {})!;
            userLike.UserId = userId;

            communityEntity.UserLikes.Add(userLike);
            communityEntity.Likes++;
            _context.Update(communityEntity);

            return communityEntity;
        }

        public async Task<T> UnsetLike(Guid id, Guid userId)
        {
            var query = _context.Set<T>();
            var communityEntity = await IncludeAll(query).FirstOrDefaultAsync(t => t.Id == id);

            if (communityEntity == null)
            {
                throw new Exception($"Entity of type {typeof(T).FullName} with id {id} not found");
            }

            var userLike = communityEntity.UserLikes.FirstOrDefault(l => l.UserId == userId);

            if (userLike == null)
            {
                return communityEntity;
            }

            communityEntity.UserLikes.Remove(userLike);
            communityEntity.Likes--;
            _context.Update(communityEntity);

            return communityEntity;
        }

        public async Task<T> SetRating(Guid id, Guid userId, int rating)
        {
            var query = _context.Set<T>();
            var communityEntity = await IncludeAll(query).FirstOrDefaultAsync(t => t.Id == id);

            if (communityEntity == null)
            {
                throw new Exception($"Entity of type {typeof(T).FullName} with id {id} not found");
            }

            var currentRating = communityEntity.UserRatings.FirstOrDefault(u => u.UserId == userId);

            if (currentRating == null)
            {
                var userRating = (UserRating)Activator.CreateInstance(typeof(UserRating), new object[] {})!;
                userRating.UserId = userId;
                userRating.Rating = rating;

                communityEntity.UserRatings.Add(userRating);
                communityEntity.Rating = (communityEntity.Rating * communityEntity.Rates + rating) / (communityEntity.Rates + 1);
                communityEntity.Rates++;
            }
            else
            {
                communityEntity.Rating = (communityEntity.Rating * communityEntity.Rates - currentRating.Rating + rating) / communityEntity.Rates;
                currentRating.Rating = rating;
            }

            _context.Update(communityEntity);

            return communityEntity;
        }

        public async Task<T> UnsetRating(Guid id, Guid userId)
        {
            var query = _context.Set<T>();
            var communityEntity = await IncludeAll(query).FirstOrDefaultAsync(t => t.Id == id);

            if (communityEntity == null)
            {
                throw new Exception($"Entity of type {typeof(T).FullName} with id {id} not found");
            }

            var userRating = communityEntity.UserRatings.FirstOrDefault(l => l.UserId == userId);

            if (userRating == null)
            {
                return communityEntity;
            }

            communityEntity.UserRatings.Remove(userRating);
            communityEntity.Rating = communityEntity.Rates > 1 ? ((communityEntity.Rating * communityEntity.Rates - userRating.Rating) / (communityEntity.Rates - 1)) : 0;
            communityEntity.Rates--;
            _context.Update(communityEntity);

            return communityEntity;
        }
    }
}
