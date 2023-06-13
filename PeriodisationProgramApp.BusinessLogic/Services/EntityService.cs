using AutoMapper;
using PeriodisationProgramApp.BusinessLogic.Domain.Dto;
using PeriodisationProgramApp.BusinessLogic.Extensions;
using PeriodisationProgramApp.BusinessLogic.Services.Interfaces;
using PeriodisationProgramApp.DataAccess;
using PeriodisationProgramApp.DataAccess.QueryContext;
using PeriodisationProgramApp.DataAccess.UnitsOfWork;
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
        protected readonly IGenericRepositoryWithUserData<Entity> _repository;
        protected readonly IUsersRepository _usersRepository;
        protected readonly IMapper _mapper;

        public EntityService(ApplicationContext context, IGenericRepositoryWithUserData<Entity> repository, IUsersRepository usersRepository, IMapper mapper)
        {
            _context = context;
            _repository = repository;
            _usersRepository = usersRepository;
            _mapper = mapper;
        }

        public async Task<PagedResult<EntityDto>> GetEntities(PageableQueryContext context, Guid? userId = null)
        {
            var entities = await _repository.GetPaginatedResultAsync(context, userId);
            return entities.Translate<Entity, EntityDto>(_mapper);
        }

        public async Task<PagedResult<EntityDto>> GetEntities(PageableQueryContext context, string? firebaseId)
        {
            if (string.IsNullOrEmpty(firebaseId))
            {
                return await GetEntities(context);
            }

            var user = await _usersRepository.GetUserByFirebaseId(firebaseId);

            if (user == null)
            {
                throw new Exception($"User with Firebase ID {firebaseId} not found");
            }

            return await GetEntities(context, user.Id);
        }

        public async Task<EntityDto> GetEntity(Guid entityId, Guid? userId = null)
        {
            var entity = await _repository.GetByIdAsync(entityId, userId);
            return entity.Translate<Entity, EntityDto>(_mapper);
        }

        public async Task<EntityDto> GetEntity(Guid entityId, string? firebaseId)
        {
            if (string.IsNullOrEmpty(firebaseId))
            {
                return await GetEntity(entityId);
            }

            var user = await _usersRepository.GetUserByFirebaseId(firebaseId);

            if (user == null)
            {
                throw new Exception($"User with Firebase ID {firebaseId} not found");
            }

            return await GetEntity(entityId, user.Id);
        }
    }
}
