﻿using PeriodisationProgramApp.Domain.Entities;

namespace PeriodisationProgramApp.BusinessLogic.Dto
{
    public class TrainingSessionDto
    {
        public int Week { get; set; }

        public DayOfWeek DayOfWeek { get; set; }

        public int RepsInReserve { get; set; }

        public List<TrainingSessionExerciseDto> Exercises { get; set; } = new();
    }
}