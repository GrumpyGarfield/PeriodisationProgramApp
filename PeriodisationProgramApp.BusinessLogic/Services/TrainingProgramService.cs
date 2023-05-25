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
            var trainingPrograms = await _unitOfWork.TrainingPrograms.GetPaginatedResultAsync(context, userId);
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
            var trainingPrograms = await _unitOfWork.TrainingPrograms.GetUserCreated(context, userId);
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
            var trainingPrograms = await _unitOfWork.TrainingPrograms.GetUserLiked(context, userId);
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

        public async Task<TrainingProgramDto> SetRating(Guid trainingProgramId, Guid userId, int rating)
        {
            var trainingProgram = await _unitOfWork.TrainingPrograms.SetRating(trainingProgramId, userId, rating);
            await _unitOfWork.CompleteAsync();

            return trainingProgram.TranslateToDto(_mapper, userId);
        }

        public async Task<TrainingProgramDto> SetRating(Guid trainingProgramId, string firebaseId, int rating)
        {
            var user = await _unitOfWork.Users.GetUserByFirebaseId(firebaseId);

            if (user == null)
            {
                throw new Exception($"User with Firebase ID {firebaseId} not found");
            }

            return await SetRating(trainingProgramId, user.Id, rating);
        }

        public async Task<TrainingProgramDto> UnsetRating(Guid trainingProgramId, Guid userId)
        {
            var trainingProgram = await _unitOfWork.TrainingPrograms.UnsetRating(trainingProgramId, userId);
            await _unitOfWork.CompleteAsync();

            return trainingProgram.TranslateToDto(_mapper, userId);
        }

        public async Task<TrainingProgramDto> UnsetRating(Guid trainingProgramId, string firebaseId)
        {
            var user = await _unitOfWork.Users.GetUserByFirebaseId(firebaseId);

            if (user == null)
            {
                throw new Exception($"User with Firebase ID {firebaseId} not found");
            }

            return await UnsetRating(trainingProgramId, user.Id);
        }
    }
}
