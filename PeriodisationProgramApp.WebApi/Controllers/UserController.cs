using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PeriodisationProgramApp.DataAccess;
using PeriodisationProgramApp.Domain.Entities;
using PeriodisationProgramApp.Domain.Interfaces;

namespace PeriodisationProgramApp.WebApi.Controllers
{
    [ApiController]
    [Route("[controller]/[action]")]
    public class UserController : ControllerBase
    {
        private readonly ILogger<UserController> _logger;
        private readonly IUnitOfWork _unitOfWork;
        private readonly ApplicationContext _db;

        public UserController(ILogger<UserController> logger, IUnitOfWork unitOfWork, ApplicationContext db)
        {
            _logger = logger;
            _unitOfWork = unitOfWork;
            _db = db;
        }

        [HttpGet(Name = "GetMuscleGroups")]
        public IActionResult GetMuscleGroups()
        {
            var muscleGroups = _unitOfWork.MuscleGroups.GetDefaultMuscleGroups();
            return Ok(muscleGroups);
        }
    }
}