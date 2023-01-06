using Microsoft.EntityFrameworkCore;
using PeriodisationProgramApp.Configuration.Interfaces;
using PeriodisationProgramApp.Domain.Comparers;
using PeriodisationProgramApp.Domain.Entities;
using PeriodisationProgramApp.Domain.Enums;

namespace PeriodisationProgramApp.DataAccess
{
    public static class DataInitializer
    {
        public static async Task SeedData(ApplicationContext context, IDefaultDataSettings defaultDataSettings)
        {
            var defaultUser = await context.Users
                    .Include(u => u.MuscleGroups)
                    .Include(u => u.Exercises)
                    .FirstOrDefaultAsync(u => u.Id == defaultDataSettings.DefaultUser!.Id);

            if (defaultUser == null)
            {
                await context.Users.AddAsync(defaultDataSettings.DefaultUser!);
                await context.SaveChangesAsync();
            }
            else
            {          
                if (!defaultUser!.Equals(defaultDataSettings.DefaultUser))
                {
                    context.Entry(defaultUser!).State = EntityState.Detached;
                    context.Entry(defaultDataSettings.DefaultUser!).State = EntityState.Modified;
                    context.Users.Update(defaultDataSettings.DefaultUser!);
                }

                UpdateMuscleGroups(context, defaultUser.MuscleGroups, defaultDataSettings.DefaultUser!.MuscleGroups);
                UpdateExercises(context, defaultUser.Exercises, defaultDataSettings.DefaultUser!.Exercises);

                await context.SaveChangesAsync();
            }
        }

        private static void UpdateMuscleGroups(ApplicationContext context, List<MuscleGroup> oldMuscleGroups, List<MuscleGroup> newMuscleGroups)
        {
            var comparer = new MuscleGroupEqualityComparer();

            var muscleGroupsToRemove = oldMuscleGroups.Where(o => newMuscleGroups.All(n => n.Name != o.Name));
            var muscleGroupsToAdd = newMuscleGroups.Where(n => oldMuscleGroups.All(o => o.Name != n.Name));
            var muscleGroupsToUpdate = oldMuscleGroups.Except(muscleGroupsToRemove, comparer).Except(newMuscleGroups, comparer);

            context.MuscleGroups.RemoveRange(muscleGroupsToRemove);
            context.MuscleGroups.AddRange(muscleGroupsToAdd);
            
            foreach (var muscleGroup in muscleGroupsToUpdate)
            {
                muscleGroup.Update(newMuscleGroups.Find(m => m.Name == muscleGroup.Name)!);
                context.MuscleGroups.Update(muscleGroup);
            }
        }

        private static void UpdateExercises(ApplicationContext context, List<Exercise> oldExercises, List<Exercise> newExercises)
        {
            var comparer = new ExerciseEqualityComparer();

            var exercisesToRemove = oldExercises.Where(o => newExercises.All(n => n.Name != o.Name));
            var exercisesToAdd = newExercises.Where(n => oldExercises.All(o => o.Name != n.Name));
            var exercisesToUpdate = oldExercises.Except(exercisesToRemove, comparer).Except(newExercises, comparer);

            context.Exercises.RemoveRange(exercisesToRemove);
            context.Exercises.AddRange(exercisesToAdd);

            foreach (var exercise in exercisesToUpdate)
            {
                exercise.Update(newExercises.Find(m => m.Name == exercise.Name)!);
                context.Exercises.Update(exercise);
            }
        }
    }    
}
