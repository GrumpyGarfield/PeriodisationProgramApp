namespace PeriodisationProgramApp.BusinessLogic.Domain.Dto
{
    public class CommunityEntityDto : BaseEntityDto
    {
        public bool IsPublic { get; set; }

        public int Likes { get; set; }

        public double Rating { get; set; }

        public int UserRating { get; set; }

        public UserDto? User { get; set; }

        public bool IsLiked { get; set; }

        public bool IsRated { get; set; }
    }
}
