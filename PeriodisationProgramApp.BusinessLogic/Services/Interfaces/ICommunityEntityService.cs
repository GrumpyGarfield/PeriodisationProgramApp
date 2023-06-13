using PeriodisationProgramApp.BusinessLogic.Domain.Dto;
using PeriodisationProgramApp.DataAccess.QueryContext;
using PeriodisationProgramApp.Domain.Entities;
using PeriodisationProgramApp.Domain.Interfaces;
using PeriodisationProgramApp.Domain.Pagination;

namespace PeriodisationProgramApp.BusinessLogic.Services.Interfaces
{
    public interface ICommunityEntityService<Entity, EntityDto, UserLike, UserRating>
        where Entity : CommunityEntity<UserLike, UserRating>
            where EntityDto : CommunityEntityDto
        where UserLike : IUserLike
        where UserRating : IUserRating

    {
        Task<EntityDto> Create<CreateEntityDto>(Guid userId, CreateEntityDto createDto)
            where CreateEntityDto : class;

        Task<EntityDto> Create<CreateEntityDto>(string firebaseId, CreateEntityDto createDto)
            where CreateEntityDto : class;

        Task<EntityDto> Update<UpdateEntityDto>(Guid entityId, Guid userId, UpdateEntityDto createDto)
            where UpdateEntityDto : class;

        Task<EntityDto> Update<UpdateEntityDto>(Guid entityId, string firebaseId, UpdateEntityDto createDto)
            where UpdateEntityDto : class;

        Task<bool> Delete(Guid entityId, Guid userId);

        Task<bool> Delete(Guid entityId, string firebaseId);

        Task<EntityDto> Clone(Guid exerciseId, Guid userId);

        Task<EntityDto> Clone(Guid exerciseId, string firebaseId);

        Task<EntityDto> SetLike(Guid entityId, Guid userId);

        Task<EntityDto> SetLike(Guid entityId, string firebaseId);

        Task<EntityDto> UnsetLike(Guid entityId, Guid userId);

        Task<EntityDto> UnsetLike(Guid entityId, string firebaseId);

        Task<EntityDto> SetRating(Guid entityId, Guid userId, int rating);

        Task<EntityDto> SetRating(Guid entityId, string firebaseId, int rating);

        Task<EntityDto> UnsetRating(Guid entityId, Guid userId);

        Task<EntityDto> UnsetRating(Guid entityId, string firebaseId);

        Task<PagedResult<EntityDto>> GetUserCreated(PageableQueryContext context, Guid userId);

        Task<PagedResult<EntityDto>> GetUserCreated(PageableQueryContext context, string firebaseId);

        Task<PagedResult<EntityDto>> GetUserLiked(PageableQueryContext context, Guid userId);

        Task<PagedResult<EntityDto>> GetUserLiked(PageableQueryContext context, string firebaseId);
    }
}

