﻿using PeriodisationProgramApp.Domain.Interfaces;

namespace PeriodisationProgramApp.Domain.Entities
{
    public class UserTrainingProgramRating : BaseEntity, IUserRating
    {
        public Guid UserId { get; set; }

        public Guid TrainingProgramId { get; set; }

        public int Rating { get; set; }
    }
}

