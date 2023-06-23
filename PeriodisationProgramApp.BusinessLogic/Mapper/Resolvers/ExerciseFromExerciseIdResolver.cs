using AutoMapper;
using PeriodisationProgramApp.Domain.Entities;
using PeriodisationProgramApp.Domain.Interfaces;

public class ExerciseFromExerciseIdResolver<T1, T2> : IMemberValueResolver<T1, T2, Guid, Exercise?>
            where T1 : class
            where T2 : BaseEntity
{
    private readonly IUnitOfWork _unitOfWork;

    public ExerciseFromExerciseIdResolver(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    public Exercise Resolve(T1 source, T2 destination, Guid sourceMember, Exercise? destinationMember, ResolutionContext context)
    {
        var exercise = _unitOfWork.Exercises.GetById(sourceMember);

        if (exercise == null)
        {
            throw new Exception($"Exercise with ID {sourceMember} not found");
        }

        return exercise;
    }
}
