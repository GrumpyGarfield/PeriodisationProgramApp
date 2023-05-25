using AutoMapper;
using PeriodisationProgramApp.BusinessLogic.Domain.Dto;
using PeriodisationProgramApp.Domain.Entities;
using PeriodisationProgramApp.Domain.Interfaces;
using PeriodisationProgramApp.Domain.Pagination;

namespace PeriodisationProgramApp.BusinessLogic.Extensions
{
    public static class CommunityEntityExtension
    {
        public static PagedResult<T2> TranslateToDto<T1, T2, UserLike, UserRating>(this PagedResult<T1> communityEntity, IMapper mapper, Guid? userId)
            where T1 : CommunityEntity<UserLike, UserRating>
            where T2: CommunityEntityDto
            where UserLike: IUserLike
            where UserRating : IUserRating
        {
            var result = communityEntity.Translate<T1, T2>(mapper);

            if (userId != null)
            {
                for (var i = 0; i < communityEntity.Items.Count; i++)
                {
                    if (communityEntity.Items[i].UserLikes.Any(l => l.UserId == userId))
                    {
                        result.Items[i].IsLiked = true;
                    }

                    if (communityEntity.Items[i].UserRatings.Any(l => l.UserId == userId))
                    {
                        result.Items[i].IsRated = true;
                        result.Items[i].UserRating = communityEntity.Items[i].UserRatings.First(l => l.UserId == userId).Rating;
                    }
                }
            }

            return result;
        }

        public static T2 TranslateToDto<T1, T2, UserLike, UserRating>(this T1 communityEntity, IMapper mapper, Guid? userId)
            where T1 : CommunityEntity<UserLike, UserRating>
            where T2 : CommunityEntityDto
            where UserLike : IUserLike
            where UserRating : IUserRating
        {
            var result = communityEntity.Translate<T1, T2>(mapper);

            if (userId != null)
            {
                if (communityEntity.UserLikes.Any(l => l.UserId == userId))
                {
                    result.IsLiked = true;
                }

                if (communityEntity.UserRatings.Any(l => l.UserId == userId))
                {
                    result.IsRated = true;
                }
            }

            return result;
        }
    }
}

