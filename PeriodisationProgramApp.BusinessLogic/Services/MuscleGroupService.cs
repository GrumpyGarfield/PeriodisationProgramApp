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
    public class MuscleGroupService : EntityService<MuscleGroup, MuscleGroupDto>, IMuscleGroupService
    {
        public MuscleGroupService(ApplicationContext context, IMuscleGroupRepository repository, IUserRepository usersRepository, IMapper mapper) : base(context, repository, usersRepository, mapper)
        {
        }

        public async Task<PagedResult<MuscleGroupDto>> GetMuscleGroups(PageableQueryContext context, Guid? userId = null)
        {
            var muscleGroups = await _repository.GetPaginatedResultAsync(context, userId);
            return muscleGroups.Translate<MuscleGroup, MuscleGroupDto>(_mapper);
        }

        public async Task<PagedResult<MuscleGroupDto>> GetMuscleGroups(PageableQueryContext context, string? firebaseId)
        {
            if (string.IsNullOrEmpty(firebaseId))
            {
                return await GetMuscleGroups(context);
            }

            var user = await _usersRepository.GetUserByFirebaseId(firebaseId);

            if (user == null)
            {
                throw new Exception($"User with Firebase ID {firebaseId} not found");
            }

            return await GetMuscleGroups(context, user.Id);
        }

        public async Task<MuscleGroupDto> GetMuscleGroup(Guid muscleGroupId, Guid? userId = null)
        {
            var muscleGroup = await _repository.GetByIdAsync(muscleGroupId, userId);
            return muscleGroup.Translate<MuscleGroup, MuscleGroupDto>(_mapper);
        }

        public async Task<MuscleGroupDto> GetMuscleGroup(Guid muscleGroupId, string? firebaseId)
        {
            if (string.IsNullOrEmpty(firebaseId))
            {
                return await GetMuscleGroup(muscleGroupId);
            }

            var user = await _usersRepository.GetUserByFirebaseId(firebaseId);

            if (user == null)
            {
                throw new Exception($"User with Firebase ID {firebaseId} not found");
            }

            return await GetMuscleGroup(muscleGroupId, user.Id);
        }

        public async Task<MuscleGroupDto> UpdateMuscleGroupUserData(Guid muscleGroupId, Guid userId, MuscleGroupUserDataDto muscleGroupUserDataDto)
        {
            var muscleGroup = await _repository.GetWithUsersDataAsync(muscleGroupId);
            var muscleGroupUserData = muscleGroup.MuscleGroupUsersData.FirstOrDefault(d => d.UserId == userId);

            if (muscleGroupUserData == null)
            {
                muscleGroupUserData = new MuscleGroupUserData()
                {
                    UserId = userId,
                };

                muscleGroup.MuscleGroupUsersData.Add(muscleGroupUserData);
            }

            muscleGroupUserData.MaintenanceVolume = muscleGroupUserDataDto.MaintenanceVolume;
            muscleGroupUserData.MinimumEffectiveVolume = muscleGroupUserDataDto.MinimumEffectiveVolume;
            muscleGroupUserData.MaximumRecoverableVolume = muscleGroupUserDataDto.MaximumRecoverableVolume;

            _repository.Update(muscleGroup);
            await _context.SaveChangesAsync();

            muscleGroup.MuscleGroupUsersData = muscleGroup.MuscleGroupUsersData.Where(d => d.UserId == userId).ToList();
            return muscleGroup.Translate<MuscleGroup, MuscleGroupDto>(_mapper);
        }

        public async Task<MuscleGroupDto> UpdateMuscleGroupUserData(Guid muscleGroupId, string firebaseId, MuscleGroupUserDataDto muscleGroupUserDataDto)
        {
            var user = await _usersRepository.GetUserByFirebaseId(firebaseId);

            if (user == null)
            {
                throw new Exception($"User with Firebase ID {firebaseId} not found");
            }

            return await UpdateMuscleGroupUserData(muscleGroupId, user.Id, muscleGroupUserDataDto);
        }
    }
}

