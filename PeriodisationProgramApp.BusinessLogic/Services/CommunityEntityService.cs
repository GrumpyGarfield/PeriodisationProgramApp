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
    public abstract class CommunityEntityService<Entity, EntityDto, UserLike, UserRating> : EntityService<Entity, EntityDto>, ICommunityEntityService<Entity, EntityDto, UserLike, UserRating>
        where Entity : CommunityEntity<UserLike, UserRating>
        where EntityDto: CommunityEntityDto
        where UserLike : IUserLike
        where UserRating : IUserRating
    {
        protected new readonly ICommunityEntityRepository<Entity, UserLike, UserRating> _repository;

        public CommunityEntityService(ApplicationContext context, ICommunityEntityRepository<Entity, UserLike, UserRating> repository, IUserRepository usersRepository, IMapper mapper) : base (context, repository, usersRepository, mapper)
        {
            _repository = repository;
        }

        public virtual async Task<EntityDto> Create<CreateEntityDto>(Guid userId, CreateEntityDto createDto)
            where CreateEntityDto : class
        {
            var entity = _mapper.Map<Entity>(createDto);
            entity.UserId = userId;

            await _repository.AddAsync(entity);
            await _context.SaveChangesAsync();

            return entity.TranslateToDto<Entity, EntityDto, UserLike, UserRating>(_mapper, userId);
        }

        public virtual async Task<EntityDto> Create<CreateEntityDto>(string firebaseId, CreateEntityDto createDto)
            where CreateEntityDto : class
        {
            var user = await _usersRepository.GetUserByFirebaseId(firebaseId);

            if (user == null)
            {
                throw new Exception($"User with Firebase ID {firebaseId} not found");
            }

            return await Create(user.Id, createDto);
        }

        public virtual async Task<EntityDto> Update<UpdateEntityDto>(Guid entityId, Guid userId, UpdateEntityDto updateDto)
           where UpdateEntityDto : class
        {
            var entity = await _repository.GetByIdAsync(entityId);

            if (entity == null)
            {
                throw new Exception($"Entity with ID {entityId} not found");
            }

            entity = updateDto.Translate(entity, _mapper);

            _repository.Update(entity);
            await _context.SaveChangesAsync();

            return entity.TranslateToDto<Entity, EntityDto, UserLike, UserRating>(_mapper, userId);
        }

        public virtual async Task<EntityDto> Update<UpdateEntityDto>(Guid entityId, string firebaseId, UpdateEntityDto updateDto)
            where UpdateEntityDto : class
        {
            var user = await _usersRepository.GetUserByFirebaseId(firebaseId);

            if (user == null)
            {
                throw new Exception($"User with Firebase ID {firebaseId} not found");
            }

            return await Update(entityId, user.Id, updateDto);
        }

        public virtual async Task<bool> Delete(Guid entityId, Guid userId)
        {
            var entity = await _repository.GetByIdAsync(entityId);

            if (entity == null)
            {
                throw new Exception($"Entity with ID {entity} not found");
            }

            if (entity.UserId != userId)
            {
                return false;
            }

            entity.IsDeleted = true;

            _repository.Update(entity);
            await _context.SaveChangesAsync();

            return true;
        }

        public virtual async Task<bool> Delete(Guid entityId, string firebaseId)
        {
            var user = await _usersRepository.GetUserByFirebaseId(firebaseId);

            if (user == null)
            {
                throw new Exception($"User with Firebase ID {firebaseId} not found");
            }

            return await Delete(entityId, user.Id);
        }

        public virtual async Task<EntityDto> Clone(Guid entityId, Guid userId)
        {
            var entity = await _repository.GetByIdAsync(entityId);

            if (entity == null)
            {
                throw new Exception($"Entity with ID {entityId} not found");
            }

            var newEntity = _mapper.Map<Entity>(entity);

            await _repository.AddAsync(newEntity);
            await _context.SaveChangesAsync();

            return entity.TranslateToDto<Entity, EntityDto, UserLike, UserRating>(_mapper, userId);
        }

        public virtual async Task<EntityDto> Clone(Guid entityId, string firebaseId)
        {
            var user = await _usersRepository.GetUserByFirebaseId(firebaseId);

            if (user == null)
            {
                throw new Exception($"User with Firebase ID {firebaseId} not found");
            }

            return await Clone(entityId, user.Id);
        }

        public virtual async Task<EntityDto> SetLike(Guid entityId, Guid userId)
        {
            var entity = await _repository.SetLike(entityId, userId);
            await _context.SaveChangesAsync();

            return entity.TranslateToDto<Entity, EntityDto, UserLike, UserRating>(_mapper, userId);
        }

        public virtual async Task<EntityDto> SetLike(Guid entityId, string firebaseId)
        {
            var user = await _usersRepository.GetUserByFirebaseId(firebaseId);

            if (user == null)
            {
                throw new Exception($"User with Firebase ID {firebaseId} not found");
            }

            return await SetLike(entityId, user.Id);
        }

        public virtual async Task<EntityDto> UnsetLike(Guid entityId, Guid userId)
        {
            var entity = await _repository.UnsetLike(entityId, userId);
            await _context.SaveChangesAsync();

            return entity.TranslateToDto<Entity, EntityDto, UserLike, UserRating>(_mapper, userId);
        }

        public virtual async Task<EntityDto> UnsetLike(Guid entityId, string firebaseId)
        {
            var user = await _usersRepository.GetUserByFirebaseId(firebaseId);

            if (user == null)
            {
                throw new Exception($"User with Firebase ID {firebaseId} not found");
            }

            return await UnsetLike(entityId, user.Id);
        }

        public virtual async Task<EntityDto> SetRating(Guid exerciseId, Guid userId, int rating)
        {
            var entity = await _repository.SetRating(exerciseId, userId, rating);
            await _context.SaveChangesAsync();

            return entity.TranslateToDto<Entity, EntityDto, UserLike, UserRating>(_mapper, userId);
        }

        public virtual async Task<EntityDto> SetRating(Guid exerciseId, string firebaseId, int rating)
        {
            var user = await _usersRepository.GetUserByFirebaseId(firebaseId);

            if (user == null)
            {
                throw new Exception($"User with Firebase ID {firebaseId} not found");
            }

            return await SetRating(exerciseId, user.Id, rating);
        }

        public virtual async Task<EntityDto> UnsetRating(Guid exerciseId, Guid userId)
        {
            var entity = await _repository.UnsetRating(exerciseId, userId);
            await _context.SaveChangesAsync();

            return entity.TranslateToDto<Entity, EntityDto, UserLike, UserRating>(_mapper, userId);
        }

        public virtual async Task<EntityDto> UnsetRating(Guid exerciseId, string firebaseId)
        {
            var user = await _usersRepository.GetUserByFirebaseId(firebaseId);

            if (user == null)
            {
                throw new Exception($"User with Firebase ID {firebaseId} not found");
            }

            return await UnsetRating(exerciseId, user.Id);
        }

        public virtual async Task<PagedResult<EntityDto>> GetUserCreated(PageableQueryContext context, Guid userId)
        {
            var entities = await _repository.GetUserCreated(context, userId);
            return entities.TranslateToDto<Entity, EntityDto, UserLike, UserRating>(_mapper, userId);
        }

        public virtual async Task<PagedResult<EntityDto>> GetUserCreated(PageableQueryContext context, string firebaseId)
        {
            var user = await _usersRepository.GetUserByFirebaseId(firebaseId);

            if (user == null)
            {
                throw new Exception($"User with Firebase ID {firebaseId} not found");
            }

            return await GetUserCreated(context, user.Id);
        }

        public virtual async Task<PagedResult<EntityDto>> GetUserLiked(PageableQueryContext context, Guid userId)
        {
            var exercises = await _repository.GetUserLiked(context, userId);
            return exercises.TranslateToDto<Entity, EntityDto, UserLike, UserRating>(_mapper, userId);
        }

        public virtual async Task<PagedResult<EntityDto>> GetUserLiked(PageableQueryContext context, string firebaseId)
        {
            var user = await _usersRepository.GetUserByFirebaseId(firebaseId);

            if (user == null)
            {
                throw new Exception($"User with Firebase ID {firebaseId} not found");
            }

            return await GetUserLiked(context, user.Id);
        }
    }
}
