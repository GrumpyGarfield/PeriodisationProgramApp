using PeriodisationProgramApp.Domain.Enums;

namespace PeriodisationProgramApp.Domain.Entities
{
    public class ExerciseMuscleGroup : BaseEntity
    {
        public Guid ExerciseId { get; set; }

        public MuscleGroup? MuscleGroup { get; set; }

        public MuscleGroupRole MuscleGroupRole { get; set; }

        public void Update(ExerciseMuscleGroup other)
        {
            MuscleGroupRole = other.MuscleGroupRole;
        }
    }
}
