namespace PeriodisationProgramApp.Domain.Pagination
{
    public abstract class PagedResultBase
    {
        public int Offset { get; set; }

        public int Limit { get; set; }

        public int TotalItems { get; set; }
    }
}
