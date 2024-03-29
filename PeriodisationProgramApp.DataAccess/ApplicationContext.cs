﻿using Microsoft.EntityFrameworkCore;
using PeriodisationProgramApp.Domain.Entities;

namespace PeriodisationProgramApp.DataAccess
{
    public class ApplicationContext : DbContext
    {
        public ApplicationContext(DbContextOptions<ApplicationContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }  
        public DbSet<Exercise> Exercises { get; set; }
        public DbSet<MuscleGroup> MuscleGroups { get; set; }
        public DbSet<ExerciseMuscleGroup> ExerciseMuscleGroups { get; set; }    
        public DbSet<TrainingProgram> TrainingPrograms { get; set; }
        public DbSet<TrainingSession> TrainingSessions { get; set; }
        public DbSet<TrainingSessionExercise> TrainingSessionsExercises { get; set; }
        public DbSet<UserTrainingProgramLike> UserTrainingProgramLikes { get; set; }
        public DbSet<UserTrainingProgramRating> UserTrainingProgramRatings { get; set; }
        public DbSet<UserExerciseLike> UserExerciseLikes { get; set; }
        public DbSet<UserExerciseRating> UserExerciseRatings { get; set; }
        public DbSet<ExerciseUserData> ExerciseUsersData { get; set; }
        public DbSet<MuscleGroupUserData> MuscleGroupUsersData { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.LogTo(Console.WriteLine);
            optionsBuilder.EnableSensitiveDataLogging();
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfigurationsFromAssembly(typeof(ApplicationContext).Assembly);
        }
    }
}
