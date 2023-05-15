namespace PeriodisationProgramApp.BusinessLogic.Domain.Dto
{
    public class BaseEntityDto
    {
        public Guid Id { get; set; }

        public DateTime Created { get; set; }

        public DateTime Updated { get; set; }
    }
}
