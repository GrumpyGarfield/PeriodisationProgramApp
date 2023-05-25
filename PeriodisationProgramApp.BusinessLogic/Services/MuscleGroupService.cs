using AutoMapper;
using PeriodisationProgramApp.BusinessLogic.Domain.Dto;
using PeriodisationProgramApp.BusinessLogic.Extensions;
using PeriodisationProgramApp.BusinessLogic.Services.Interfaces;
using PeriodisationProgramApp.DataAccess.QueryContext;
using PeriodisationProgramApp.Domain.Entities;
using PeriodisationProgramApp.Domain.Interfaces;
using PeriodisationProgramApp.Domain.Pagination;

namespace PeriodisationProgramApp.BusinessLogic.Services
{
    public class MuscleGroupService : IMuscleGroupService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public MuscleGroupService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<PagedResult<MuscleGroupDto>> GetMuscleGroups(PageableQueryContext context, Guid? userId = null)
        {
            var muscleGroups = await _unitOfWork.MuscleGroups.GetPaginatedResultAsync(context, userId);
            return muscleGroups.Translate<MuscleGroup, MuscleGroupDto>(_mapper);
        }

        public async Task<PagedResult<MuscleGroupDto>> GetMuscleGroups(PageableQueryContext context, string? firebaseId)
        {
            if (string.IsNullOrEmpty(firebaseId))
            {
                return await GetMuscleGroups(context);
            }

            var user = await _unitOfWork.Users.GetUserByFirebaseId(firebaseId);

            if (user == null)
            {
                throw new Exception($"User with Firebase ID {firebaseId} not found");
            }

            return await GetMuscleGroups(context, user.Id);
        }
    }
}

