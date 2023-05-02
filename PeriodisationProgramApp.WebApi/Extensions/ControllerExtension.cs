using Microsoft.AspNetCore.Mvc;
using PeriodisationProgramApp.Common.Sorting;
using System.Text.RegularExpressions;

namespace PeriodisationProgramApp.WebApi.Extensions
{
    public static class ControllerExtension
    {
        private static readonly Regex FilterParameterExpression = new Regex("^filter_(?<column>[a-zA-Z0-9\\._]+)$");
        private static readonly string SortFieldString = "sortBy";
        private static readonly string SortDirectionString = "sortDir";

        public static KeyValuePair<string, string>[]? CreateFilters(this ControllerBase controller)
        {
            return controller.Request
                .Query.ToDictionary(x => x.Key, x => x.Value)
                .Where(x => FilterParameterExpression.IsMatch(x.Key))
                .Select(x =>
                {
                    var m = FilterParameterExpression.Match(x.Key);
                    return new KeyValuePair<string, string>(m.Groups["column"].Value, x.Value!);
                })
                .ToArray();
        }

        public static string? GetSortField(this ControllerBase controller)
        {
            return controller.Request
                .Query.ToDictionary(x => x.Key, x => x.Value)
                .Where(x => x.Key == SortFieldString)
                .Select(x =>
                {
                    return x.Value;
                })
            .FirstOrDefault();
        }

        public static SortDirection GetSortDirection(this ControllerBase controller)
        {
            return controller.Request
                .Query.ToDictionary(x => x.Key, x => x.Value)
                .Where(x => x.Key == SortDirectionString)
            .Select(x =>
            {
                if (string.IsNullOrEmpty(x.Value))
                {
                    return SortDirection.Desc;
                }

                return (SortDirection)Enum.Parse(typeof(SortDirection), x.Value!);
                })
                .FirstOrDefault();
        }
    }
}
