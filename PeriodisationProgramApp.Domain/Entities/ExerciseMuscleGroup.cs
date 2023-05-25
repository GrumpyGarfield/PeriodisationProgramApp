using PeriodisationProgramApp.Domain.Enums;

namespace PeriodisationProgramApp.Domain.Entities
{
    public class ExerciseMuscleGroup : Entity
    {
        public Guid ExerciseId { get; set; }

        public MuscleGroupType MuscleGroupType { get; set; }

        public MuscleGroupRole MuscleGroupRole { get; set; }

        public void Update(ExerciseMuscleGroup other)
        {
            MuscleGroupRole = other.MuscleGroupRole;
        }
    }
}
