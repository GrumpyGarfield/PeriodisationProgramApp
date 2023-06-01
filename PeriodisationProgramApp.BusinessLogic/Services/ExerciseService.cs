using AutoMapper;
using PeriodisationProgramApp.BusinessLogic.Domain.Dto;
using PeriodisationProgramApp.BusinessLogic.Dto;
using PeriodisationProgramApp.BusinessLogic.Extensions;
using PeriodisationProgramApp.BusinessLogic.Services.Interfaces;
using PeriodisationProgramApp.DataAccess.QueryContext;
using PeriodisationProgramApp.Domain.Entities;
using PeriodisationProgramApp.Domain.Interfaces;
using PeriodisationProgramApp.Domain.Pagination;

namespace PeriodisationProgramApp.BusinessLogic.Services
{
    public class ExerciseService : IExerciseService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public ExerciseService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<PagedResult<ExerciseDto>> GetExercises(PageableQueryContext context, Guid? userId = null)
        {
            var exercises = await _unitOfWork.Exercises.GetPaginatedResultAsync(context, userId);
            return exercises.TranslateToDto(_mapper, userId);
        }

        public async Task<PagedResult<ExerciseDto>> GetExercises(PageableQueryContext context, string? firebaseId)
        {
            if (string.IsNullOrEmpty(firebaseId))
            {
                return await GetExercises(context);
            }

            var user = await _unitOfWork.Users.GetUserByFirebaseId(firebaseId);

            if (user == null)
            {
                throw new Exception($"User with Firebase ID {firebaseId} not found");
            }

            return await GetExercises(context, user.Id);
        }

        public async Task<PagedResult<ExerciseDto>> GetUserCreatedExercises(PageableQueryContext context, Guid userId)
        {
            var exercises = await _unitOfWork.Exercises.GetUserCreated(context, userId);
            return exercises.TranslateToDto(_mapper, userId);
        }

        public async Task<PagedResult<ExerciseDto>> GetUserCreatedExercises(PageableQueryContext context, string firebaseId)
        {
            var user = await _unitOfWork.Users.GetUserByFirebaseId(firebaseId);

            if (user == null)
            {
                throw new Exception($"User with Firebase ID {firebaseId} not found");
            }

            return await GetUserCreatedExercises(context, user.Id);
        }

        public async Task<PagedResult<ExerciseDto>> GetUserLikedExercises(PageableQueryContext context, Guid userId)
        {
            var exercises = await _unitOfWork.Exercises.GetUserLiked(context, userId);
            return exercises.TranslateToDto(_mapper, userId);
        }

        public async Task<PagedResult<ExerciseDto>> GetUserLikedExercises(PageableQueryContext context, string firebaseId)
        {
            var user = await _unitOfWork.Users.GetUserByFirebaseId(firebaseId);

            if (user == null)
            {
                throw new Exception($"User with Firebase ID {firebaseId} not found");
            }

            return await GetUserLikedExercises(context, user.Id);
        }

        public async Task<ExerciseDto> SetLike(Guid exerciseId, Guid userId)
        {
            var exercise = await _unitOfWork.Exercises.SetLike(exerciseId, userId);
            await _unitOfWork.CompleteAsync();

            return exercise.TranslateToDto(_mapper, userId);
        }

        public async Task<ExerciseDto> SetLike(Guid exerciseId, string firebaseId)
        {
            var user = await _unitOfWork.Users.GetUserByFirebaseId(firebaseId);

            if (user == null)
            {
                throw new Exception($"User with Firebase ID {firebaseId} not found");
            }

            return await SetLike(exerciseId, user.Id);
        }

        public async Task<ExerciseDto> UnsetLike(Guid exerciseId, Guid userId)
        {
            var exercise = await _unitOfWork.Exercises.UnsetLike(exerciseId, userId);
            await _unitOfWork.CompleteAsync();

            return exercise.TranslateToDto(_mapper, userId);
        }

        public async Task<ExerciseDto> UnsetLike(Guid exerciseId, string firebaseId)
        {
            var user = await _unitOfWork.Users.GetUserByFirebaseId(firebaseId);

            if (user == null)
            {
                throw new Exception($"User with Firebase ID {firebaseId} not found");
            }

            return await UnsetLike(exerciseId, user.Id);
        }

        public async Task<ExerciseDto> SetRating(Guid exerciseId, Guid userId, int rating)
        {
            var exercise = await _unitOfWork.Exercises.SetRating(exerciseId, userId, rating);
            await _unitOfWork.CompleteAsync();

            return exercise.TranslateToDto(_mapper, userId);
        }

        public async Task<ExerciseDto> SetRating(Guid exerciseId, string firebaseId, int rating)
        {
            var user = await _unitOfWork.Users.GetUserByFirebaseId(firebaseId);

            if (user == null)
            {
                throw new Exception($"User with Firebase ID {firebaseId} not found");
            }

            return await SetRating(exerciseId, user.Id, rating);
        }

        public async Task<ExerciseDto> UnsetRating(Guid exerciseId, Guid userId)
        {
            var exercise = await _unitOfWork.Exercises.UnsetRating(exerciseId, userId);
            await _unitOfWork.CompleteAsync();

            return exercise.TranslateToDto(_mapper, userId);
        }

        public async Task<ExerciseDto> UnsetRating(Guid exerciseId, string firebaseId)
        {
            var user = await _unitOfWork.Users.GetUserByFirebaseId(firebaseId);

            if (user == null)
            {
                throw new Exception($"User with Firebase ID {firebaseId} not found");
            }

            return await UnsetRating(exerciseId, user.Id);
        }

        public async Task<ExerciseDto> GetExercise(Guid exerciseId, Guid? userId = null)
        {
            var exercise = await _unitOfWork.Exercises.GetByIdAsync(exerciseId, userId);
            return exercise.TranslateToDto(_mapper, userId);
        }

        public async Task<ExerciseDto> GetExercise(Guid exerciseId, string? firebaseId)
        {
            if (string.IsNullOrEmpty(firebaseId))
            {
                return await GetExercise(exerciseId);
            }

            var user = await _unitOfWork.Users.GetUserByFirebaseId(firebaseId);

            if (user == null)
            {
                throw new Exception($"User with Firebase ID {firebaseId} not found");
            }

            return await GetExercise(exerciseId, user.Id);
        }

        public async Task<ExerciseDto> UpdateExerciseUserData(Guid exerciseId, Guid userId, ExerciseUserDataDto exerciseUserDataDto)
        {
            var exercise = await _unitOfWork.Exercises.GetWithUsersDataAsync(exerciseId);
            var exerciseUserData = exercise.ExerciseUsersData.FirstOrDefault(d => d.UserId == userId);

            if (exerciseUserData == null)
            {
                exerciseUserData = new ExerciseUserData()
                {
                    UserId = userId,
                };

                exercise.ExerciseUsersData.Add(exerciseUserData);
            }

            exerciseUserData.RawStimulusMagnitude = exerciseUserDataDto.RawStimulusMagnitude;
            exerciseUserData.FatigueMagnitude = exerciseUserDataDto.FatigueMagnitude;
            exerciseUserData.StimulusToFatigueRatio = (double)(exerciseUserData.RawStimulusMagnitude + 1) / (exerciseUserDataDto.FatigueMagnitude + 1);

            _unitOfWork.Exercises.Update(exercise);
            _unitOfWork.Complete();

            exercise.ExerciseUsersData = exercise.ExerciseUsersData.Where(d => d.UserId == userId).ToList();
            return exercise.TranslateToDto(_mapper, userId);
        }

        public async Task<ExerciseDto> UpdateExerciseUserData(Guid exerciseId, string firebaseId, ExerciseUserDataDto exerciseUserDataDto)
        {
            var user = await _unitOfWork.Users.GetUserByFirebaseId(firebaseId);

            if (user == null)
            {
                throw new Exception($"User with Firebase ID {firebaseId} not found");
            }

            return await UpdateExerciseUserData(exerciseId, user.Id, exerciseUserDataDto);
        }
    }
}
