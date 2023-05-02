using PeriodisationProgramApp.Common.Sorting;

namespace PeriodisationProgramApp.Domain.Interfaces
{
    public interface IPageableQueryContext
    {
        int Page { get; set; }

        int PageSize { get; set; }

        SortDirection SortDirection { get; set; }

        string? SortField { get; set; }

        KeyValuePair<string, string>[]? Filters { get; set; }
    }
}
