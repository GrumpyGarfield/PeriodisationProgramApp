﻿using PeriodisationProgramApp.BusinessLogic.Dto;
using PeriodisationProgramApp.Domain.Enums;

namespace PeriodisationProgramApp.BusinessLogic.Domain.Dto
{
    public class UpdateTrainingProgramDto
    {
        public string? Name { get; set; }

        public string? Description { get; set; }

        public TrainingLevel TrainingLevel { get; set; }

        public int NumberOfSessions { get; set; }

        public List<TrainingSessionDto> Sessions { get; set; } = new();

        public bool IsPublic { get; set; }
    }
}

