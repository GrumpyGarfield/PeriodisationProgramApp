using PeriodisationProgramApp.Common.Sorting;
using PeriodisationProgramApp.Domain.Interfaces;

namespace PeriodisationProgramApp.DataAccess.QueryContext
{
    public class PageableQueryContext : IPageableQueryContext
    {
        public int Page { get; set; }

        public int PageSize { get; set; }

        public SortDirection SortDirection { get; set; }

        public string? SortField { get; set; }

        public KeyValuePair<string, string>[]? Filters { get; set; }
    }
}
