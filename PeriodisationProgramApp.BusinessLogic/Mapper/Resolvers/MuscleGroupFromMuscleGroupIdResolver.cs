using AutoMapper;
using PeriodisationProgramApp.BusinessLogic.Domain.Dto;
using PeriodisationProgramApp.Domain.Entities;
using PeriodisationProgramApp.Domain.Interfaces;

public class MuscleGroupFromMuscleGroupIdResolver<T1, T2> : IMemberValueResolver<T1, T2, Guid, MuscleGroup?>
            where T1 : class
            where T2 : BaseEntity
{
    private readonly IUnitOfWork _unitOfWork;

    public MuscleGroupFromMuscleGroupIdResolver(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    public MuscleGroup Resolve(T1 source, T2 destination, Guid sourceMember, MuscleGroup? destinationMember, ResolutionContext context)
    {
        var muscleGroup = _unitOfWork.MuscleGroups.GetById(sourceMember);

        if (muscleGroup == null)
        {
            throw new Exception($"Muscle group with ID {sourceMember} not found");
        }

        return muscleGroup;
    }
}