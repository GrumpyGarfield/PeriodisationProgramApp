using PeriodisationProgramApp.Domain.Entities;

namespace PeriodisationProgramApp.Domain.Interfaces
{
    public interface ICommunityEntity<UserLike, UserRating>: IEntity 
                                                            where UserLike : IUserLike
                                                            where UserRating : IUserRating
    {
        Guid UserId { get; set; }

        User? User { get; set; }

        bool IsPublic { get; set; }

        int Likes { get; set; }

        int Rates { get; set; }

        double Rating { get; set; }

        List<UserLike> UserLikes { get; set; }

        List<UserRating> UserRatings { get; set; }
    }
}