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
using PeriodisationProgramApp.BusinessLogic.Dto;
using PeriodisationProgramApp.BusinessLogic.Domain.Dto;
using FirebaseAdmin.Auth;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace PeriodisationProgramApp.WebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
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

        [HttpGet(Name = "GetFullBodyProgram")]
        public IActionResult GetFullBodyProgram(int numberOfWeekSessions, int mesocycleLength)
        {
            var trainingProgramBuilder = _trainingProgramFactory.GetInstance(TrainingProgramType.FullBody);
            var trainingProgram = trainingProgramBuilder.GetProgram(numberOfWeekSessions, mesocycleLength, TrainingLevel.Intermediate);
            var trainingProgramDto = _mapper.Map<TrainingProgramDto>(trainingProgram);
            var trainingProgramVolume = trainingProgram.GetVolume();

            return Ok(trainingProgramDto);
        }

        [HttpGet(Name = "InsertTestUsers")]
        public IActionResult InsertTestUsers(int count = 1)
        {
            for (var i = 0; i < count; i++)
            {
                var guid = Guid.NewGuid();
                var rnd = new Random();

                _unitOfWork.Users.Add(new User()
                {
                    Id = guid,
                    Username = $"User {guid}",
                    Email = $"testuser{count}@gmail.com",                    
                });
            }

            return Ok(_unitOfWork.Complete());
        }

        [HttpGet(Name = "AddUser")]
        public async Task<IActionResult> AddUserAsync(string username, string email, string password)
        {
            var args = new UserRecordArgs()
            {
                Email = email,
                EmailVerified = true,
                Password = password,
                DisplayName = username,
                PhotoUrl = "https://s5o.ru/storage/simple/ru/ugc/50/59/29/95/ruueab4b8ab2d.113.150x300.jpg",
                Disabled = false
            };

            var userRecord = await FirebaseAuth.DefaultInstance.CreateUserAsync(args);

            return Ok(userRecord);
        }

        [Authorize]
        [HttpGet(Name = "AddThisUser")]
        public async Task<IActionResult> AddThisUser()
        {
            var uid = User.FindFirstValue("user_id");
            var firebaseUser = await FirebaseAuth.DefaultInstance.GetUserAsync(uid);

            await _unitOfWork.Users.AddAsync(new User()
            {
                Id = Guid.NewGuid(),
                FirebaseId = uid,
                Email = firebaseUser.Email,
                Username = firebaseUser.DisplayName
            });

            await _unitOfWork.CompleteAsync();

            return Ok(true);
        }
    }
}