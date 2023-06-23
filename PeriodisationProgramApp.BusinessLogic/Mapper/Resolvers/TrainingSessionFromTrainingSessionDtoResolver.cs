using AutoMapper;
using PeriodisationProgramApp.BusinessLogic.Dto;
using PeriodisationProgramApp.BusinessLogic.Extensions;
using PeriodisationProgramApp.Domain.Entities;
using PeriodisationProgramApp.Domain.Interfaces;

public class TrainingSessionFromTrainingSessionDtoResolver<T1, T2> : IMemberValueResolver<T1, T2, List<TrainingSessionDto>, List<TrainingSession>>
            where T1 : class
            where T2 : BaseEntity
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IMapper _mapper;

    public TrainingSessionFromTrainingSessionDtoResolver(IUnitOfWork unitOfWork, IMapper mapper)
    {
        _unitOfWork = unitOfWork;
        _mapper = mapper;
    }

    public List<TrainingSession> Resolve(T1 source, T2 destination, List<TrainingSessionDto> sourceMember, List<TrainingSession> destinationMember, ResolutionContext context)
    {
        var result = new List<TrainingSession>();

        foreach (var trainingSessionDto in sourceMember) {
            var trainingSession = new TrainingSession();

            if (trainingSessionDto.Id != Guid.Empty)
            {
                trainingSession = _unitOfWork.TrainingSessions.GetById(trainingSessionDto.Id);

                if (trainingSession == null)
                {
                    throw new Exception($"TrainingSession with ID {trainingSessionDto} not found");
                }
            }

            trainingSession = trainingSessionDto.Translate(trainingSession, _mapper);

            result.Add(trainingSession);
        }

        return result;
    }
}

