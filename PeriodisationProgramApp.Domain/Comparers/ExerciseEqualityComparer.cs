using PeriodisationProgramApp.Domain.Entities;

namespace PeriodisationProgramApp.Domain.Comparers
{
    public class ExerciseEqualityComparer : IEqualityComparer<Exercise>
    {
        public bool Equals(Exercise? exercise, Exercise? otherExercise)
        {
            if (exercise == null && otherExercise == null) return true;

            if (exercise == null || otherExercise == null) return false;

            if (exercise.Name != otherExercise.Name) return false;

            if (exercise.RawStimulusMagnitude != otherExercise.RawStimulusMagnitude) return false;

            if (exercise.FatigueMagnitude != otherExercise.FatigueMagnitude) return false;

            if (exercise.StimulusToFatigueRatio != otherExercise.StimulusToFatigueRatio) return false;

            if (exercise.IsPublic != otherExercise.IsPublic) return false;

            return true;
        }

        public int GetHashCode(Exercise exercise)
        {
            int code = exercise.Name!.Length + (exercise.RawStimulusMagnitude * exercise.FatigueMagnitude * (int)exercise.StimulusToFatigueRatio);
            return code.GetHashCode();
        }
    }
}
