using AutoMapper;
using PeriodisationProgramApp.BusinessLogic.Domain.Dto;
using PeriodisationProgramApp.BusinessLogic.Dto;
using PeriodisationProgramApp.BusinessLogic.Extensions;
using PeriodisationProgramApp.BusinessLogic.Factories.Interfaces;
using PeriodisationProgramApp.BusinessLogic.Services.Interfaces;
using PeriodisationProgramApp.DataAccess;
using PeriodisationProgramApp.DataAccess.QueryContext;
using PeriodisationProgramApp.Domain.Entities;
using PeriodisationProgramApp.Domain.Enums;
using PeriodisationProgramApp.Domain.Interfaces;
using PeriodisationProgramApp.Domain.Pagination;
using System.Linq;

namespace PeriodisationProgramApp.BusinessLogic.Services
{
    public class TrainingProgramService : CommunityEntityService<TrainingProgram, TrainingProgramDto, UserTrainingProgramLike, UserTrainingProgramRating>, ITrainingProgramService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly ITrainingProgramFactory _trainingProgramFactory;

        public TrainingProgramService(ApplicationContext context, ITrainingProgramRepository repository, IUserRepository usersRepository, IMapper mapper, IUnitOfWork unitOfWork, ITrainingProgramFactory trainingProgramFactory) : base(context, repository, usersRepository, mapper)
        {
            _unitOfWork = unitOfWork;
            _trainingProgramFactory = trainingProgramFactory;
        }

        public override async Task<TrainingProgramDto> Create<CreateEntityDto>(Guid userId, CreateEntityDto createDto)
        {
            var createTrainingProgramDto = createDto as CreateTrainingProgramDto;

            if (createTrainingProgramDto == null)
            {
                throw new Exception($"CreateDto is of the wrong class");
            }

            var trainingProgramBuilder = _trainingProgramFactory.GetInstance(createTrainingProgramDto.Type);
            var trainingProgram = trainingProgramBuilder.GetProgram(createTrainingProgramDto.NumberOfSessions, createTrainingProgramDto.MesocycleLength, createTrainingProgramDto.TrainingLevel);
            trainingProgram = createDto.Translate(trainingProgram, _mapper);
            trainingProgram.UserId = userId;

            await _repository.AddAsync(trainingProgram);
            await _context.SaveChangesAsync();

            return trainingProgram.TranslateToDto(_mapper, userId);
        }

        //public override async Task<TrainingProgramDto> Update<UpdateEntityDto>(Guid entityId, Guid userId, UpdateEntityDto updateDto)
        //{
        //    var updateTrainingProgramDto = updateDto as UpdateTrainingProgramDto;

        //    if (updateTrainingProgramDto == null)
        //    {
        //        throw new Exception($"UpdateDto is of the wrong class");
        //    }

        //    var trainingProgram = await _repository.GetByIdAsync(entityId);
        //    trainingProgram = updateTrainingProgramDto.Translate(trainingProgram, _mapper);

        //    foreach (var sessionDto in updateTrainingProgramDto.Sessions)
        //    {
        //        var session = trainingProgram.Sessions.First(s => s.Id == sessionDto.Id);

        //        session.Exercises = session.Exercises.Where(s => sessionDto.Exercises.Select(e => e.Id).Contains(s.Id)).ToList();

        //        var newExercises = sessionDto.Exercises.Where(s => !session.Exercises.Select(e => e.Id).Contains(s.Id)).ToList();

        //        foreach (var exerciseDto in newExercises)
        //        {
        //            var newExercise = exerciseDto.Translate<TrainingSessionExerciseDto, TrainingSessionExercise>(_mapper);
        //            session.Exercises.Add(newExercise);
        //        }
        //    }

        //    _repository.Update(trainingProgram);
        //    await _context.SaveChangesAsync();

        //    return trainingProgram.TranslateToDto(_mapper, userId);
        //}
    }
}
