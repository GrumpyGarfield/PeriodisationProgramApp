namespace PeriodisationProgramApp.Domain.Pagination
{
    public class PagedQuery<T> : PagedResultBase where T : class
    {
        public IQueryable<T>? Items { get; set; }
    }
}
