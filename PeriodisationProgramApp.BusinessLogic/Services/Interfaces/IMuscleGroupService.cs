using PeriodisationProgramApp.BusinessLogic.Domain.Dto;
using PeriodisationProgramApp.Domain.Entities;

namespace PeriodisationProgramApp.BusinessLogic.Services.Interfaces
{
    public interface IMuscleGroupService : IEntityService<MuscleGroup, MuscleGroupDto>
    {
        Task<MuscleGroupDto> UpdateMuscleGroupUserData(Guid muscleGroupId, Guid userId, MuscleGroupUserDataDto muscleGroupUserDataDto);

        Task<MuscleGroupDto> UpdateMuscleGroupUserData(Guid muscleGroupId, string firebaseId, MuscleGroupUserDataDto muscleGroupUserDataDto);
    }
}
