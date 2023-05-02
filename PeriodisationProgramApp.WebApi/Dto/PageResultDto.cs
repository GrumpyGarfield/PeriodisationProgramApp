namespace PeriodisationProgramApp.WebApi.Dto
{
    public class PageResultDto<T>
    {
        public PageResultDto()
        {
            Items = new List<T>();
        }

        public int TotalItems { get; set; }

        public IEnumerable<T> Items { get; set; }
    }
}
