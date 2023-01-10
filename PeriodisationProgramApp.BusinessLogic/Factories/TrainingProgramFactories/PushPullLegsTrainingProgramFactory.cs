using PeriodisationProgramApp.BusinessLogic.Enums;
using PeriodisationProgramApp.BusinessLogic.Factories.Interfaces;
using PeriodisationProgramApp.Domain.Entities;
using PeriodisationProgramApp.Domain.Interfaces;

namespace PeriodisationProgramApp.BusinessLogic.Factories.TrainingProgramFactories
{
    public class PushPullLegsTrainingProgramFactory : BaseTrainingProgramFactory
    {
        public PushPullLegsTrainingProgramFactory(IUnitOfWork unitOfWork, ITrainingSessionFactory trainingSessionFactory) : base(unitOfWork, trainingSessionFactory) { }

        public override TrainingProgram GetProgram()
        {
            var trainingProgram = new TrainingProgram();
            var trainingSession = _trainingSessionFactory.GetInstance(TrainingSessionType.Push).GetTrainingSession(_exercises);

            trainingProgram.Sessions.Add(trainingSession);

            return trainingProgram;
        }
    }
}
