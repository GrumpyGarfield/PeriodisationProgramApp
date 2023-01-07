using PeriodisationProgramApp.Domain.Entities;
using System.Linq;

namespace PeriodisationProgramApp.Domain.Comparers
{
    public class ExerciseEqualityComparer : IEqualityComparer<Exercise>
    {
        private ExerciseMuscleGroupEqualityComparer exerciseMuscleGroupComparer;

        public ExerciseEqualityComparer()
        {
            exerciseMuscleGroupComparer = new ExerciseMuscleGroupEqualityComparer();
        }

        public bool Equals(Exercise? exercise, Exercise? otherExercise)
        {
            if (exercise == null && otherExercise == null) return true;

            if (exercise == null || otherExercise == null) return false;

            if (exercise.Name != otherExercise.Name) return false;

            if (exercise.RawStimulusMagnitude != otherExercise.RawStimulusMagnitude) return false;

            if (exercise.FatigueMagnitude != otherExercise.FatigueMagnitude) return false;

            if (exercise.IsPublic != otherExercise.IsPublic) return false;

            if (exercise.ExerciseMuscleGroups.Intersect(otherExercise.ExerciseMuscleGroups, exerciseMuscleGroupComparer).Count() != exercise.ExerciseMuscleGroups.Count()) return false;

            if (exercise.ExerciseMuscleGroups.Count < otherExercise.ExerciseMuscleGroups.Count) return false;

            return true;
        }

        public int GetHashCode(Exercise exercise)
        {
            int code = exercise.Name!.GetHashCode() + exercise.RawStimulusMagnitude + exercise.FatigueMagnitude;
            return code.GetHashCode();
        }
    }
}
