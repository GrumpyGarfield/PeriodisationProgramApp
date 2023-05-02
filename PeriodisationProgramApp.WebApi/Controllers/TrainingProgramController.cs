using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using PeriodisationProgramApp.DataAccess.QueryContext;
using PeriodisationProgramApp.Domain.Interfaces;
using PeriodisationProgramApp.Domain.Entities;
using PeriodisationProgramApp.WebApi.Extensions;
using Microsoft.AspNetCore.Http;

namespace PeriodisationProgramApp.WebApi.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class TrainingProgramController : ControllerBase
    {
        private readonly ILogger<TrainingProgramController> _logger;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public TrainingProgramController(ILogger<TrainingProgramController> logger, IUnitOfWork unitOfWork, IMapper mapper)
        {
            _logger = logger;
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        [HttpGet(Name = "InsertTestPrograms")]
        public IActionResult InsertTestPrograms(int count = 1)
        {
            for (var i = 0; i < count; i++)
            {
                var guid = Guid.NewGuid();
                var rnd = new Random();

                _unitOfWork.TrainingProgramRepository.Add(new TrainingProgram()
                {
                    Name = $"TP {guid}",
                    Sessions = new List<TrainingSession>(),
                    UserId = Guid.Parse("01faeb35-159a-454e-bf45-7343fb9cf14c"),
                    IsPublic = true,
                    Likes = rnd.Next(1, 1000),
                    Rating = rnd.NextDouble() * 5,
                    Type = (Domain.Enums.TrainingProgramType)rnd.Next(0, 3),
                    TrainingLevel = (Domain.Enums.TrainingLevel)rnd.Next(0, 3)
                });
            }

            return Ok(_unitOfWork.Complete());
        }


        [HttpGet(Name = "GetTrainingPrograms")]
        public async Task<IActionResult> GetTrainingPrograms(int page = 1, int pageSize = 24)
        {
            var filters = this.CreateFilters();
            var sortBy = this.GetSortField();
            var sortDir = this.GetSortDirection();

            var trainingPrograms = await _unitOfWork.TrainingProgramRepository.GetPaginatedResultAsync(new PageableQueryContext()
            {
                Page = page,
                PageSize = pageSize,
                SortField = sortBy,
                SortDirection = sortDir,
                Filters = filters
            });

            return Ok(trainingPrograms);
        }
    }
}
