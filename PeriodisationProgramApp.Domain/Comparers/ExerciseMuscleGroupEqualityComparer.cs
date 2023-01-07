using PeriodisationProgramApp.Domain.Entities;

namespace PeriodisationProgramApp.Domain.Comparers
{
    public class ExerciseMuscleGroupEqualityComparer : IEqualityComparer<ExerciseMuscleGroup>
    {
        public bool Equals(ExerciseMuscleGroup? exerciseMuscleGroup, ExerciseMuscleGroup? otherExerciseMuscleGroup)
        {
            if (exerciseMuscleGroup == null && otherExerciseMuscleGroup == null) return true;

            if (exerciseMuscleGroup == null || otherExerciseMuscleGroup == null) return false;

            if (exerciseMuscleGroup.MuscleGroup!.Name != otherExerciseMuscleGroup.MuscleGroup!.Name) return false;

            if (exerciseMuscleGroup.MuscleGroupKind != otherExerciseMuscleGroup.MuscleGroupKind) return false;

            return true;
        }

        public int GetHashCode(ExerciseMuscleGroup exerciseMuscleGroup)
        {
            int code = exerciseMuscleGroup.MuscleGroup!.Name!.GetHashCode() + (int)exerciseMuscleGroup.MuscleGroupKind;
            return code.GetHashCode();
        }
    }
}
