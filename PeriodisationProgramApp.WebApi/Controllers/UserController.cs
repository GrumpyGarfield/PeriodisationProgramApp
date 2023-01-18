using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PeriodisationProgramApp.BusinessLogic.Builders.TrainingProgramBuilders;
using PeriodisationProgramApp.BusinessLogic.Enums;
using PeriodisationProgramApp.BusinessLogic.Factories.Interfaces;
using PeriodisationProgramApp.DataAccess;
using PeriodisationProgramApp.Domain.Enums;
using PeriodisationProgramApp.Domain.Interfaces;

namespace PeriodisationProgramApp.WebApi.Controllers
{
    [ApiController]
    [Route("[controller]/[action]")]
    public class UserController : ControllerBase
    {
        private readonly ILogger<UserController> _logger;
        private readonly IUnitOfWork _unitOfWork;
        private readonly ITrainingProgramFactory _trainingProgramFactory;

        public UserController(ILogger<UserController> logger, IUnitOfWork unitOfWork, ITrainingProgramFactory trainingProgramFactory)
        {
            _logger = logger;
            _unitOfWork = unitOfWork;
            _trainingProgramFactory = trainingProgramFactory;
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
            var exercises = _unitOfWork.Exercises.GetRandomExercisesOfType(MuscleGroupType.Chest, number);
            return Ok(exercises);
        }

        [HttpGet(Name = "GetPushPullLegsProgram")]
        public IActionResult GetPushPullLegsProgram()
        {
            var trainingProgramBuilder = _trainingProgramFactory.GetInstance(TrainingProgramType.PushPullLegs);
            var trainingProgram = trainingProgramBuilder.GetProgram();
            return Ok(trainingProgram);
        }
    }
}