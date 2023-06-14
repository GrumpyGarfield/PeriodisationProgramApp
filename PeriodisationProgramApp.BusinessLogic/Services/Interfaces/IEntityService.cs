using PeriodisationProgramApp.BusinessLogic.Domain.Dto;
using PeriodisationProgramApp.DataAccess.QueryContext;
using PeriodisationProgramApp.Domain.Entities;
using PeriodisationProgramApp.Domain.Pagination;

namespace PeriodisationProgramApp.BusinessLogic.Services.Interfaces
{
    public interface IEntityService<Entity, EntityDto>
        where Entity : BaseEntity
        where EntityDto : BaseEntityDto

    {
        Task<PagedResult<EntityDto>> GetAll(PageableQueryContext context, Guid? userId);

        Task<PagedResult<EntityDto>> GetAll(PageableQueryContext context, string? firebaseId);

        Task<EntityDto> Get(Guid entityId, Guid? userId);

        Task<EntityDto> Get(Guid entityId, string? firebaseId);
    }
}

