using PeriodisationProgramApp.Common.Sorting;

namespace PeriodisationProgramApp.Domain.Interfaces
{
    public interface IPageableQueryContext
    {
        int Offset { get; set; }

        int Limit { get; set; }

        SortDirection SortDirection { get; set; }

        string? SortField { get; set; }

        KeyValuePair<string, string>[]? Filters { get; set; }
    }
}
