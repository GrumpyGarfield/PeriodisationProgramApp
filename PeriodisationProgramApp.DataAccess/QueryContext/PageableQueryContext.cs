using PeriodisationProgramApp.Common.Sorting;
using PeriodisationProgramApp.Domain.Interfaces;

namespace PeriodisationProgramApp.DataAccess.QueryContext
{
    public class PageableQueryContext : IPageableQueryContext
    {
        public int Offset { get; set; }

        public int Limit { get; set; }

        public SortDirection SortDirection { get; set; }

        public string? SortField { get; set; }

        public KeyValuePair<string, string>[]? Filters { get; set; }
    }
}
