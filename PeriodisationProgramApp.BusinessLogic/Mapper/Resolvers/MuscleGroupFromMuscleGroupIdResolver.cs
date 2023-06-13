using AutoMapper;
using PeriodisationProgramApp.BusinessLogic.Domain.Dto;
using PeriodisationProgramApp.Domain.Entities;
using PeriodisationProgramApp.Domain.Interfaces;

public class MuscleGroupFromMuscleGroupIdResolver : IMemberValueResolver<CreateExerciseMuscleGroupDto, ExerciseMuscleGroup, Guid, MuscleGroup?>
{
    private readonly IUnitOfWork _unitOfWork;

    public MuscleGroupFromMuscleGroupIdResolver(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    public MuscleGroup Resolve(CreateExerciseMuscleGroupDto source, ExerciseMuscleGroup destination, Guid sourceMember, MuscleGroup? destinationMember, ResolutionContext context)
    {
        var muscleGroup = _unitOfWork.MuscleGroups.GetById(sourceMember);

        if (muscleGroup == null)
        {
            throw new Exception($"Muscle group with ID {sourceMember} not found");
        }

        return muscleGroup;
    }
}