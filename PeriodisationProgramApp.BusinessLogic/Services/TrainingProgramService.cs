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
    public class TrainingProgramService : CommunityEntityService<TrainingProgram, TrainingProgramDto, UserTrainingProgramLike, UserTrainingProgramRating>, ITrainingProgramService
    {
        private readonly IUnitOfWork _unitOfWork;

        public TrainingProgramService(ApplicationContext context, ITrainingProgramRepository repository, IUserRepository usersRepository, IMapper mapper, IUnitOfWork unitOfWork) : base(context, repository, usersRepository, mapper)
        {
            _unitOfWork = unitOfWork;
        }
    }
}
