using AutoMapper;
using PeriodisationProgramApp.BusinessLogic.Domain.Dto;
using PeriodisationProgramApp.BusinessLogic.Extensions;
using PeriodisationProgramApp.BusinessLogic.Services.Interfaces;
using PeriodisationProgramApp.DataAccess;
using PeriodisationProgramApp.DataAccess.QueryContext;
using PeriodisationProgramApp.Domain.Entities;
using PeriodisationProgramApp.Domain.Interfaces;
using PeriodisationProgramApp.Domain.Pagination;

namespace PeriodisationProgramApp.BusinessLogic.Services
{
    public class EntityService<Entity, EntityDto> : IEntityService<Entity, EntityDto>
        where Entity : BaseEntity
        where EntityDto : BaseEntityDto
    {
        protected readonly ApplicationContext _context;
        protected readonly IEntityWithUserDataRepository<Entity> _repository;
        protected readonly IUserRepository _usersRepository;
        protected readonly IMapper _mapper;

        public EntityService(ApplicationContext context, IEntityWithUserDataRepository<Entity> repository, IUserRepository usersRepository, IMapper mapper)
        {
            _context = context;
            _repository = repository;
            _usersRepository = usersRepository;
            _mapper = mapper;
        }

        public async Task<PagedResult<EntityDto>> GetAll(PageableQueryContext context, Guid? userId = null)
        {
            var entities = await _repository.GetPaginatedResultAsync(context, userId);
            return entities.Translate<Entity, EntityDto>(_mapper);
        }

        public async Task<PagedResult<EntityDto>> GetAll(PageableQueryContext context, string? firebaseId)
        {
            if (string.IsNullOrEmpty(firebaseId))
            {
                return await GetAll(context);
            }

            var user = await _usersRepository.GetUserByFirebaseId(firebaseId);

            if (user == null)
            {
                throw new Exception($"User with Firebase ID {firebaseId} not found");
            }

            return await GetAll(context, user.Id);
        }

        public async Task<EntityDto> Get(Guid entityId, Guid? userId = null)
        {
            var entity = await _repository.GetByIdAsync(entityId, userId);
            return entity.Translate<Entity, EntityDto>(_mapper);
        }

        public async Task<EntityDto> Get(Guid entityId, string? firebaseId)
        {
            if (string.IsNullOrEmpty(firebaseId))
            {
                return await Get(entityId);
            }

            var user = await _usersRepository.GetUserByFirebaseId(firebaseId);

            if (user == null)
            {
                throw new Exception($"User with Firebase ID {firebaseId} not found");
            }

            return await Get(entityId, user.Id);
        }
    }
}
