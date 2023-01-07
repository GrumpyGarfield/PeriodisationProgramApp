using PeriodisationProgramApp.Domain.Enums;

namespace PeriodisationProgramApp.Domain.Entities
{
    public class ExerciseMuscleGroup : Entity
    {
        public Guid ExerciseId { get; set; }

        public MuscleGroup? MuscleGroup { get; set; }

        public MuscleGroupKind MuscleGroupKind { get; set; }

        public void Update(ExerciseMuscleGroup other)
        {
            MuscleGroupKind = other.MuscleGroupKind;
        }
    }
}
