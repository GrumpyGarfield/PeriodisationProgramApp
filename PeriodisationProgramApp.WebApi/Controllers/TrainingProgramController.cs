﻿using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using PeriodisationProgramApp.DataAccess.QueryContext;
using PeriodisationProgramApp.Domain.Interfaces;
using PeriodisationProgramApp.Domain.Entities;
using PeriodisationProgramApp.WebApi.Extensions;
using Microsoft.AspNetCore.Http;
using PeriodisationProgramApp.BusinessLogic.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Net.Http.Headers;
using FirebaseAdmin.Auth;
using System.Security.Claims;
using PeriodisationProgramApp.WebApi.Dto;
using PeriodisationProgramApp.BusinessLogic.Domain.Dto;
using PeriodisationProgramApp.BusinessLogic.Services;

namespace PeriodisationProgramApp.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TrainingProgramController : ControllerBase
    {
        private readonly ILogger<TrainingProgramController> _logger;
        private readonly IUnitOfWork _unitOfWork;
        private readonly ITrainingProgramService _trainingProgramService;
        private readonly IUserService _userService;

        public TrainingProgramController(ILogger<TrainingProgramController> logger, IUnitOfWork unitOfWork, ITrainingProgramService trainingProgramService, IUserService userService)
        {
            _logger = logger;
            _unitOfWork = unitOfWork;
            _trainingProgramService = trainingProgramService;
            _userService = userService;
        }

        [HttpGet]
        [Route("InsertTestPrograms")]
        public IActionResult InsertTestPrograms(int count = 1)
        {
            for (var i = 0; i < count; i++)
            {
                var guid = Guid.NewGuid();
                var rnd = new Random();

                _unitOfWork.TrainingPrograms.Add(new TrainingProgram()
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

        [HttpGet]
        [Route("items")]
        public async Task<IActionResult> GetTrainingPrograms(int offset, int limit, bool isCreated = false, bool isLiked = false)
        {
            var uid = User.FindFirstValue("user_id");
            var filters = this.CreateFilters();
            var sortBy = this.GetSortField();
            var sortDir = this.GetSortDirection();

            var context = new PageableQueryContext()
            {
                Offset = offset,
                Limit = limit,
                SortField = sortBy,
                SortDirection = sortDir,
                Filters = filters
            };

            if (isCreated)
            {
                return Ok(await _trainingProgramService.GetUserCreated(context, uid));
            }

            if (isLiked)
            {
                return Ok(await _trainingProgramService.GetUserLiked(context, uid));
            }

            return Ok(await _trainingProgramService.GetAll(context, uid));
        }

        [Authorize]
        [HttpPost]
        [Route("{trainingProgramId}/like")]
        public async Task<IActionResult> Like(Guid trainingProgramId, [FromBody]LikeRequestDto likeRequestDto)
        {
            var uid = User.FindFirstValue("user_id");

            if (likeRequestDto.isLiked)
            {
                return Ok(await _trainingProgramService.SetLike(trainingProgramId, uid));
            }
            else
            {
                return Ok(await _trainingProgramService.UnsetLike(trainingProgramId, uid));
            }
        }

        [Authorize]
        [HttpPost]
        [Route("{trainingProgramId}/rate")]
        public async Task<IActionResult> Rate(Guid trainingProgramId, [FromBody] RateRequestDto rateRequestDto)
        {
            var uid = User.FindFirstValue("user_id");

            if (rateRequestDto.isRated)
            {
                if (rateRequestDto.Rating == null)
                {
                    return BadRequest("Rating can't be null");
                }

                return Ok(await _trainingProgramService.SetRating(trainingProgramId, uid, rateRequestDto.Rating.GetValueOrDefault()));
            }
            else
            {
                return Ok(await _trainingProgramService.UnsetRating(trainingProgramId, uid));
            }
        }

        [HttpGet]
        [Route("{trainingProgramId}")]
        public async Task<IActionResult> GetTrainingProgram(Guid trainingProgramId)
        {
            var uid = User.FindFirstValue("user_id");

            return Ok(await _trainingProgramService.Get(trainingProgramId, uid));
        }

        [Authorize]
        [HttpPost]
        [Route("")]
        public async Task<IActionResult> CreateTrainingProgram([FromBody] CreateTrainingProgramDto createTrainingProgramDto)
        {
            var uid = User.FindFirstValue("user_id");

            return Ok(await _trainingProgramService.Create(uid, createTrainingProgramDto));
        }

        [Authorize]
        [HttpPut]
        [Route("{trainingProgramId}")]
        public async Task<IActionResult> UpdateTrainingProgram(Guid trainingProgramId, [FromBody] UpdateTrainingProgramDto updateTrainingProgramDto)
        {
            var uid = User.FindFirstValue("user_id");

            return Ok(await _trainingProgramService.Update(trainingProgramId, uid, updateTrainingProgramDto));
        }

        [Authorize]
        [HttpDelete]
        [Route("{trainingProgramId}")]
        public async Task<IActionResult> DeleteTrainingProgram(Guid trainingProgramId)
        {
            var uid = User.FindFirstValue("user_id");

            return Ok(await _trainingProgramService.Delete(trainingProgramId, uid));
        }

        [Authorize]
        [HttpPost]
        [Route("{trainingProgramId}/clone")]
        public async Task<IActionResult> CloneTrainingProgram(Guid trainingProgramId)
        {
            var uid = User.FindFirstValue("user_id");

            return Ok(await _trainingProgramService.Clone(trainingProgramId, uid));
        }
    }
}
