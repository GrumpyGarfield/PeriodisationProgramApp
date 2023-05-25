using PeriodisationProgramApp.Domain.Entities;

namespace PeriodisationProgramApp.Domain.Comparers
{
    public class ExerciseMuscleGroupEqualityComparer : IEqualityComparer<ExerciseMuscleGroup>
    {
        public bool Equals(ExerciseMuscleGroup? exerciseMuscleGroup, ExerciseMuscleGroup? otherExerciseMuscleGroup)
        {
            if (exerciseMuscleGroup == null && otherExerciseMuscleGroup == null) return true;

            if (exerciseMuscleGroup == null || otherExerciseMuscleGroup == null) return false;

            if (exerciseMuscleGroup.MuscleGroupType != otherExerciseMuscleGroup.MuscleGroupType) return false;

            if (exerciseMuscleGroup.MuscleGroupRole != otherExerciseMuscleGroup.MuscleGroupRole) return false;

            return true;
        }

        public int GetHashCode(ExerciseMuscleGroup exerciseMuscleGroup)
        {
            int code = exerciseMuscleGroup.MuscleGroupType.GetHashCode() + (int)exerciseMuscleGroup.MuscleGroupRole;
            return code.GetHashCode();
        }
    }
}
