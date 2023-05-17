using AutoMapper;
using PeriodisationProgramApp.BusinessLogic.Domain.Dto;
using PeriodisationProgramApp.BusinessLogic.Extensions;
using PeriodisationProgramApp.BusinessLogic.Services.Interfaces;
using PeriodisationProgramApp.DataAccess.QueryContext;
using PeriodisationProgramApp.Domain.Interfaces;
using PeriodisationProgramApp.Domain.Pagination;

namespace PeriodisationProgramApp.BusinessLogic.Services
{
    public class TrainingProgramService : ITrainingProgramService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public TrainingProgramService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<PagedResult<TrainingProgramDto>> GetTrainingPrograms(PageableQueryContext context, Guid? userId = null)
        {
            var trainingPrograms = await _unitOfWork.TrainingPrograms.GetPaginatedResultAsync(context);
            return trainingPrograms.TranslateToDto(_mapper, userId);
        }

        public async Task<PagedResult<TrainingProgramDto>> GetTrainingPrograms(PageableQueryContext context, string? firebaseId)
        {
            if (string.IsNullOrEmpty(firebaseId))
            {
                return await GetTrainingPrograms(context);
            }

            var user = await _unitOfWork.Users.GetUserByFirebaseId(firebaseId);

            if (user == null)
            {
                throw new Exception($"User with Firebase ID {firebaseId} not found");
            }

            return await GetTrainingPrograms(context, user.Id);
        }

        public async Task<PagedResult<TrainingProgramDto>> GetUserCreatedTrainingPrograms(PageableQueryContext context, Guid userId)
        {
            var trainingPrograms = await _unitOfWork.TrainingPrograms.GetUserCreatedTrainingPrograms(context, userId);
            return trainingPrograms.TranslateToDto(_mapper, userId);
        }

        public async Task<PagedResult<TrainingProgramDto>> GetUserCreatedTrainingPrograms(PageableQueryContext context, string firebaseId)
        {
            var user = await _unitOfWork.Users.GetUserByFirebaseId(firebaseId);

            if (user == null)
            {
                throw new Exception($"User with Firebase ID {firebaseId} not found");
            }

            return await GetUserCreatedTrainingPrograms(context, user.Id);
        }

        public async Task<PagedResult<TrainingProgramDto>> GetUserLikedTrainingPrograms(PageableQueryContext context, Guid userId)
        {
            var trainingPrograms = await _unitOfWork.TrainingPrograms.GetUserLikedTrainingPrograms(context, userId);
            return trainingPrograms.TranslateToDto(_mapper, userId);
        }

        public async Task<PagedResult<TrainingProgramDto>> GetUserLikedTrainingPrograms(PageableQueryContext context, string firebaseId)
        {
            var user = await _unitOfWork.Users.GetUserByFirebaseId(firebaseId);

            if (user == null)
            {
                throw new Exception($"User with Firebase ID {firebaseId} not found");
            }

            return await GetUserLikedTrainingPrograms(context, user.Id);
        }

        public async Task<TrainingProgramDto> SetLike(Guid trainingProgramId, Guid userId)
        {
            var trainingProgram = await _unitOfWork.TrainingPrograms.SetLike(trainingProgramId, userId);
            await _unitOfWork.CompleteAsync();

            return trainingProgram.TranslateToDto(_mapper, userId);
        }

        public async Task<TrainingProgramDto> SetLike(Guid trainingProgramId, string firebaseId)
        {
            var user = await _unitOfWork.Users.GetUserByFirebaseId(firebaseId);

            if (user == null)
            {
                throw new Exception($"User with Firebase ID {firebaseId} not found");
            }

            return await SetLike(trainingProgramId, user.Id);
        }

        public async Task<TrainingProgramDto> UnsetLike(Guid trainingProgramId, Guid userId)
        {
            var trainingProgram = await _unitOfWork.TrainingPrograms.UnsetLike(trainingProgramId, userId);
            await _unitOfWork.CompleteAsync();

            return trainingProgram.TranslateToDto(_mapper, userId);
        }

        public async Task<TrainingProgramDto> UnsetLike(Guid trainingProgramId, string firebaseId)
        {
            var user = await _unitOfWork.Users.GetUserByFirebaseId(firebaseId);

            if (user == null)
            {
                throw new Exception($"User with Firebase ID {firebaseId} not found");
            }

            return await UnsetLike(trainingProgramId, user.Id);
        }
    }
}
