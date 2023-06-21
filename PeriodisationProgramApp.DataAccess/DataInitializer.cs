using Microsoft.EntityFrameworkCore;
using PeriodisationProgramApp.Configuration.Interfaces;
using PeriodisationProgramApp.Configuration.Models;
using PeriodisationProgramApp.Domain.Comparers;
using PeriodisationProgramApp.Domain.Entities;
using PeriodisationProgramApp.Domain.Enums;
using PeriodisationProgramApp.Domain.Interfaces;
using System.Xml.Linq;

namespace PeriodisationProgramApp.DataAccess
{
    public static class DataInitializer
    {
        private static IDefaultDataSettings? _defaultDataSettings;
        private static IUnitOfWork? _unitOfWork;
        private static User? _defaultUser;

        public static async Task SeedData(IUnitOfWork unitOfWork, IDefaultDataSettings defaultDataSettings)
        {
            _unitOfWork = unitOfWork;
            _defaultDataSettings = defaultDataSettings;

            var defaultUser = await _unitOfWork.Users.GetDefaultUserWithData();

            if (defaultUser == null)
            {
                await _unitOfWork.Users.AddAsync(_defaultDataSettings.DefaultUser!);
                await _unitOfWork.CompleteAsync();
            }
            else
            {
                _defaultUser = defaultUser;

                if (!_defaultUser!.Equals(_defaultDataSettings.DefaultUser))
                {
                    _defaultUser.Update(_defaultDataSettings.DefaultUser!);
                    _unitOfWork.Users.Update(_defaultDataSettings.DefaultUser!);
                }

                //UpdateMuscleGroups(_defaultUser.MuscleGroups, _defaultDataSettings.DefaultUser!.MuscleGroups);
                //UpdateExercises(defaultUser.Exercises, _defaultDataSettings.DefaultUser!.Exercises);

                await _unitOfWork.CompleteAsync();
            }
        }

        private static void UpdateMuscleGroups(List<MuscleGroup> oldMuscleGroups, List<MuscleGroup> newMuscleGroups)
        {
            var comparer = new MuscleGroupEqualityComparer();

            var muscleGroupsToRemove = oldMuscleGroups.Where(o => newMuscleGroups.All(n => n.Type != o.Type));
            var muscleGroupsToAdd = newMuscleGroups.Where(n => oldMuscleGroups.All(o => o.Type != n.Type)).ToList();
            var muscleGroupsToUpdate = oldMuscleGroups.Except(muscleGroupsToRemove, comparer).Except(newMuscleGroups, comparer);

            _unitOfWork!.MuscleGroups.RemoveRange(muscleGroupsToRemove);

            foreach (var muscleGroup in muscleGroupsToUpdate)
            {
                muscleGroup.Update(newMuscleGroups.Find(m => m.Type == muscleGroup.Type)!);
                _unitOfWork.MuscleGroups.Update(muscleGroup);
            }

            _unitOfWork.MuscleGroups.AddRange(muscleGroupsToAdd);
        }

        private static void UpdateExercises(List<Exercise> oldExercises, List<Exercise> newExercises)
        {
            var comparer = new ExerciseEqualityComparer();

            var exercisesToRemove = oldExercises.Where(o => newExercises.All(n => n.Name != o.Name));
            var exercisesToAdd = newExercises.Where(n => oldExercises.All(o => o.Name != n.Name));
            var exercisesToUpdate = oldExercises.Except(exercisesToRemove, comparer).Except(newExercises, comparer);

            _unitOfWork!.Exercises.RemoveRange(exercisesToRemove);

            foreach (var exercise in exercisesToUpdate)
            {
                var newExercise = newExercises.Find(m => m.Name == exercise.Name)!;

                exercise.Update(newExercise);
                _unitOfWork.Exercises.Update(exercise);

                UpdateExerciseMuscleGroups(exercise.Id, exercise.ExerciseMuscleGroups, newExercise.ExerciseMuscleGroups);
            }

            foreach (var exercise in exercisesToAdd)
            {
                exercise.UserId = _defaultUser!.Id;
                exercise.ExerciseMuscleGroups.ForEach(e => e.MuscleGroup = _unitOfWork.MuscleGroups.Find(m => m.Type == e.MuscleGroup!.Type).FirstOrDefault());
                _unitOfWork.Exercises.Add(exercise);
            }
        }

        private static void UpdateExerciseMuscleGroups(Guid exerciseId, List<ExerciseMuscleGroup> oldExerciseMuscleGroups, List<ExerciseMuscleGroup> newExerciseMuscleGroups)
        {
            var comparer = new ExerciseMuscleGroupEqualityComparer();

            var exerciseMuscleGroupsToRemove = oldExerciseMuscleGroups.Where(o => newExerciseMuscleGroups.All(n => n.MuscleGroup!.Type != o.MuscleGroup!.Type));
            var exerciseMuscleGroupsToAdd = newExerciseMuscleGroups.Where(n => oldExerciseMuscleGroups.All(o => o.MuscleGroup!.Type != n.MuscleGroup!.Type));
            var exerciseMuscleGroupsToUpdate = oldExerciseMuscleGroups.Except(exerciseMuscleGroupsToRemove, comparer).Except(newExerciseMuscleGroups, comparer);

            _unitOfWork!.ExerciseMuscleGroups.RemoveRange(exerciseMuscleGroupsToRemove);

            foreach (var exerciseMuscleGroup in exerciseMuscleGroupsToUpdate)
            {
                exerciseMuscleGroup.Update(newExerciseMuscleGroups.Find(m => m.MuscleGroup!.Type == exerciseMuscleGroup.MuscleGroup!.Type)!);
                _unitOfWork.ExerciseMuscleGroups.Update(exerciseMuscleGroup);
            }

            foreach (var exerciseMuscleGroup in exerciseMuscleGroupsToAdd)
            {
                exerciseMuscleGroup.ExerciseId = exerciseId;
                exerciseMuscleGroup.MuscleGroup = _unitOfWork.MuscleGroups.Find(m => m.Type == exerciseMuscleGroup.MuscleGroup!.Type).FirstOrDefault();
                _unitOfWork.ExerciseMuscleGroups.Add(exerciseMuscleGroup);
            }
        }
    }
}
