using PeriodisationProgramApp.Domain.Entities;

namespace PeriodisationProgramApp.Domain.Comparers
{
    public class MuscleGroupEqualityComparer : IEqualityComparer<MuscleGroup>
    {
        public bool Equals(MuscleGroup? muscleGroup, MuscleGroup? otherMuscleGroup)
        {
            if (muscleGroup == null && otherMuscleGroup == null) return true;

            if (muscleGroup == null || otherMuscleGroup == null) return false;

            if (muscleGroup.Name != otherMuscleGroup.Name) return false;

            if (muscleGroup.MaintenanceVolume != otherMuscleGroup.MaintenanceVolume) return false;

            if (muscleGroup.MinimumEffectiveVolume != otherMuscleGroup.MinimumEffectiveVolume) return false;

            if (muscleGroup.MaximumRecoverableVolume != otherMuscleGroup.MaximumRecoverableVolume) return false;

            if (muscleGroup.MaximumRecoverableVolumeMultiplicator != otherMuscleGroup.MaximumRecoverableVolumeMultiplicator) return false;

            if (muscleGroup.AverageRecoveryTime != otherMuscleGroup.AverageRecoveryTime) return false;

            return true;
        }

        public int GetHashCode(MuscleGroup muscleGroup)
        {
            int code = muscleGroup.Name!.GetHashCode() + muscleGroup.MaintenanceVolume + muscleGroup.MinimumEffectiveVolume + muscleGroup.MaximumRecoverableVolume;
            return code.GetHashCode();
        }
    }
}
