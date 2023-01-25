using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PeriodisationProgramApp.BusinessLogic.Builders.TrainingProgramBuilders;
using PeriodisationProgramApp.BusinessLogic.Enums;
using PeriodisationProgramApp.BusinessLogic.Extensions;
using PeriodisationProgramApp.BusinessLogic.Factories.Interfaces;
using PeriodisationProgramApp.DataAccess;
using PeriodisationProgramApp.Domain.Entities;
using PeriodisationProgramApp.Domain.Enums;
using PeriodisationProgramApp.Domain.Interfaces;
using PeriodisationProgramApp.WebApi.Dto;

namespace PeriodisationProgramApp.WebApi.Controllers
{
    [ApiController]
    [Route("[controller]/[action]")]
    public class UserController : ControllerBase
    {
        private readonly ILogger<UserController> _logger;
        private readonly IUnitOfWork _unitOfWork;
        private readonly ITrainingProgramFactory _trainingProgramFactory;
        private readonly IMapper _mapper;

        public UserController(ILogger<UserController> logger, IUnitOfWork unitOfWork, ITrainingProgramFactory trainingProgramFactory, IMapper mapper)
        {
            _logger = logger;
            _unitOfWork = unitOfWork;
            _trainingProgramFactory = trainingProgramFactory;
            _mapper = mapper;
        }

        [HttpGet(Name = "GetDefaultMuscleGroups")]
        public IActionResult GetDefaultMuscleGroups()
        {
            var muscleGroups = _unitOfWork.MuscleGroups.GetDefaultMuscleGroups();
            return Ok(muscleGroups);
        }

        [HttpGet(Name = "GetDefaultExercises")]
        public IActionResult GetDefaultExercises()
        {
            var exercises = _unitOfWork.Exercises.GetDefaultExercises();
            return Ok(exercises);
        }

        [HttpGet(Name = "GetRandomChestExercises")]
        public IActionResult GetRandomChestExercises(int number)
        {
            var exercises = _unitOfWork.Exercises.GetRandomExercisesForMuscleGroup(MuscleGroupType.Chest, number);
            return Ok(exercises);
        }

        [HttpGet(Name = "GetPushPullLegsProgram")]
        public IActionResult GetPushPullLegsProgram(int numberOfWeekSessions, int mesocycleLength)
        {
            var trainingProgramBuilder = _trainingProgramFactory.GetInstance(TrainingProgramType.PushPullLegs);
            var trainingProgram = trainingProgramBuilder.GetProgram(numberOfWeekSessions, mesocycleLength, TrainingLevel.Intermediate);
            var trainingProgramDto = _mapper.Map<TrainingProgramDto>(trainingProgram);
            var trainingProgramVolume = trainingProgram.GetVolume();

            return Ok(trainingProgramDto);
        }

        [HttpGet(Name = "GetUpperLowerProgram")]
        public IActionResult GetUpperLowerProgram(int numberOfWeekSessions, int mesocycleLength)
        {
            var trainingProgramBuilder = _trainingProgramFactory.GetInstance(TrainingProgramType.UpperLower);
            var trainingProgram = trainingProgramBuilder.GetProgram(numberOfWeekSessions, mesocycleLength, TrainingLevel.Intermediate);
            var trainingProgramDto = _mapper.Map<TrainingProgramDto>(trainingProgram);
            var trainingProgramVolume = trainingProgram.GetVolume();

            return Ok(trainingProgramDto);
        }
    }
}