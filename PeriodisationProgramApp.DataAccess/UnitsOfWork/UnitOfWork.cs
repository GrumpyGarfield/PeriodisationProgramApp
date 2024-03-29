﻿using PeriodisationProgramApp.Configuration.Interfaces;
using PeriodisationProgramApp.DataAccess.Repositories;
using PeriodisationProgramApp.Domain.Interfaces;

namespace PeriodisationProgramApp.DataAccess.UnitsOfWork
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly ApplicationContext _context;
        private readonly IDefaultDataSettings _defaultDataSettings;

        public UnitOfWork(ApplicationContext context, IDefaultDataSettings defaultDataSettings)
        {
            _context = context;
            _defaultDataSettings = defaultDataSettings;

            Users = new UserRepository(_context, _defaultDataSettings);
            MuscleGroups = new MuscleGroupRepository(_context);
            Exercises = new ExerciseRepository(_context);
            ExerciseMuscleGroups = new ExerciseMuscleGroupRepository(_context, _defaultDataSettings);
            TrainingPrograms = new TrainingProgramRepository(_context);
            TrainingSessions = new TrainingSessionRepository(_context);
            TrainingSessionExercises = new TrainingSessionExerciseRepository(_context);
        }

        public IUserRepository Users { get; private set; } 

        public IMuscleGroupRepository MuscleGroups { get; private set; }

        public IExerciseRepository Exercises { get; private set; }

        public IExerciseMuscleGroupRepository ExerciseMuscleGroups { get; private set; }

        public ITrainingProgramRepository TrainingPrograms { get; private set; }

        public ITrainingSessionRepository TrainingSessions { get; private set; }

        public ITrainingSessionExerciseRepository TrainingSessionExercises { get; private set; }

        public int Complete()
        {
            return _context.SaveChanges();
        }

        public async Task<int> CompleteAsync()
        {
            return await _context.SaveChangesAsync();
        }

        public void Dispose()
        {
            _context.Dispose();
        }
    }
}
