using AutoMapper;
using Microsoft.EntityFrameworkCore;
using PeriodisationProgramApp.BusinessLogic.Domain.Dto;
using PeriodisationProgramApp.BusinessLogic.Extensions;
using PeriodisationProgramApp.BusinessLogic.Services.Interfaces;
using PeriodisationProgramApp.DataAccess.QueryContext;
using PeriodisationProgramApp.Domain.Entities;
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

        public async Task<PagedResult<TrainingProgramDto>> GetTrainingPrograms(PageableQueryContext context)
        {
            var trainingPrograms = await _unitOfWork.TrainingPrograms.GetPaginatedResultAsync(context);
            return trainingPrograms.Translate<TrainingProgram, TrainingProgramDto>(_mapper);
        }

        public async Task<PagedResult<TrainingProgramDto>> GetUserCreatedTrainingPrograms(PageableQueryContext context, Guid userId)
        {
            var trainingPrograms = await _unitOfWork.TrainingPrograms.GetUserCreatedTrainingPrograms(context, userId);
            return trainingPrograms.Translate<TrainingProgram, TrainingProgramDto>(_mapper);
        }

        public async Task<PagedResult<TrainingProgramDto>> GetUserLikedTrainingPrograms(PageableQueryContext context, Guid userId)
        {
            var trainingPrograms = await _unitOfWork.TrainingPrograms.GetUserLikedTrainingPrograms(context, userId);
            return trainingPrograms.Translate<TrainingProgram, TrainingProgramDto>(_mapper);
        }

        public async Task<PagedResult<TrainingProgramDto>> GetUserCreatedTrainingProgramsByFirebaseId(PageableQueryContext context, string firebaseId)
        {
            var user = await _unitOfWork.Users.GetUserByFirebaseId(firebaseId);

            if (user == null)
            {
                throw new Exception($"User with Firebase ID {firebaseId} not found");
            }

            return await GetUserCreatedTrainingPrograms(context, user.Id);
        }

        public async Task<PagedResult<TrainingProgramDto>> GetUserLikedTrainingProgramsByFirebaseId(PageableQueryContext context, string firebaseId)
        {
            var user = await _unitOfWork.Users.GetUserByFirebaseId(firebaseId);

            if (user == null)
            {
                throw new Exception($"User with Firebase ID {firebaseId} not found");
            }

            return await GetUserLikedTrainingPrograms(context, user.Id);
        }
    }
}
