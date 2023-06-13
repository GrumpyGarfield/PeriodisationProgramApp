using PeriodisationProgramApp.Domain.Interfaces;

namespace PeriodisationProgramApp.Domain.Entities
{
    public class CommunityEntity<UserLike, UserRating> : BaseEntity, ICommunityEntity<UserLike, UserRating>
                                                                                         where UserLike : IUserLike
                                                                                         where UserRating : IUserRating
    {
        public Guid UserId { get; set; }

        public User? User { get; set; }

        public bool IsPublic { get; set; }

        public int Likes { get; set; }

        public int Rates { get; set; }

        public double Rating { get; set; }

        public List<UserLike> UserLikes { get; set; } = new();

        public List<UserRating> UserRatings { get; set; } = new();
    }
}
