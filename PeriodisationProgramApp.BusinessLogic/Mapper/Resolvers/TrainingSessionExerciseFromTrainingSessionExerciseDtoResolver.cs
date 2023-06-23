using AutoMapper;
using PeriodisationProgramApp.BusinessLogic.Dto;
using PeriodisationProgramApp.BusinessLogic.Extensions;
using PeriodisationProgramApp.Domain.Entities;
using PeriodisationProgramApp.Domain.Interfaces;

public class TrainingSessionExerciseFromTrainingSessionExerciseDtoResolver<T1, T2> : IMemberValueResolver<T1, T2, List<TrainingSessionExerciseDto>, List<TrainingSessionExercise>>
            where T1 : class
            where T2 : BaseEntity
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IMapper _mapper;

    public TrainingSessionExerciseFromTrainingSessionExerciseDtoResolver(IUnitOfWork unitOfWork, IMapper mapper)
    {
        _unitOfWork = unitOfWork;
        _mapper = mapper;
    }

    public List<TrainingSessionExercise> Resolve(T1 source, T2 destination, List<TrainingSessionExerciseDto> sourceMember, List<TrainingSessionExercise> destinationMember, ResolutionContext context)
    {
        var result = new List<TrainingSessionExercise>();

        foreach (var trainingSessionExerciseDto in sourceMember)
        {
            var trainingSessionExercise = new TrainingSessionExercise();

            if (trainingSessionExerciseDto.Id != Guid.Empty)
            {
                trainingSessionExercise = _unitOfWork.TrainingSessionExercises.GetById(trainingSessionExerciseDto.Id);

                if (trainingSessionExercise == null)
                {
                    throw new Exception($"TrainingSessionExercise with ID {trainingSessionExerciseDto} not found");
                }
            }

            trainingSessionExercise = trainingSessionExerciseDto.Translate(trainingSessionExercise, _mapper);

            result.Add(trainingSessionExercise);
        }

        return result;
    }
}


