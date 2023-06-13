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
        Task<PagedResult<EntityDto>> GetEntities(PageableQueryContext context, Guid? userId);

        Task<PagedResult<EntityDto>> GetEntities(PageableQueryContext context, string? firebaseId);

        Task<EntityDto> GetEntity(Guid entityId, Guid? userId);

        Task<EntityDto> GetEntity(Guid entityId, string? firebaseId);
    }
}

