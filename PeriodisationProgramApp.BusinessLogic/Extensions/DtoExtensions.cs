using AutoMapper;
using PeriodisationProgramApp.Domain.Pagination;

namespace PeriodisationProgramApp.BusinessLogic.Extensions
{
    public static class DtoExtension
    {
        public static PagedResult<T2> Translate<T1, T2>(this PagedResult<T1> result, IMapper mapper) 
            where T1 : class
            where T2 : class
        {
            return new PagedResult<T2>
            {
                TotalItems = result.TotalItems,
                Offset = result.Offset,
                Limit = result.Limit,
                Items = result.Items.Select(item => mapper.Map<T2>(item)).ToList()
            };
        }

        public static T2 Translate<T1, T2>(this T1 result, IMapper mapper)
            where T1 : class
            where T2 : class
        {
            return mapper.Map<T2>(result);
        }

        public static T2 Translate<T1, T2>(this T1 result, T2 destination, IMapper mapper)
            where T1 : class
            where T2 : class
        {
            return mapper.Map(result, destination);
        }
    }
}
