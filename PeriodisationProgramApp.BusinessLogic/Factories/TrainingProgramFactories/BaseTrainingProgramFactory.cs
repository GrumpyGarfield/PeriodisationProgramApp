using PeriodisationProgramApp.BusinessLogic.Factories.Interfaces;
using PeriodisationProgramApp.Domain.Entities;
using PeriodisationProgramApp.Domain.Enums;
using PeriodisationProgramApp.Domain.Interfaces;

namespace PeriodisationProgramApp.BusinessLogic.Factories.TrainingProgramFactories
{
    public abstract class BaseTrainingProgramFactory
    {
        protected readonly IUnitOfWork _unitOfWork;
        protected readonly ITrainingSessionFactory _trainingSessionFactory;
        protected List<Exercise> _exercises;

        public BaseTrainingProgramFactory(IUnitOfWork unitOfWork, ITrainingSessionFactory trainingSessionFactory)
        {
            _unitOfWork = unitOfWork;
            _trainingSessionFactory = trainingSessionFactory;
            _exercises = GetExercises();
        }

        protected List<Exercise> GetExercises()
        {
            var exercises = new List<Exercise>();

            foreach (var muscleGroupType in (MuscleGroupType[])Enum.GetValues(typeof(MuscleGroupType)))
            {
                exercises.AddRange(_unitOfWork.Exercises.GetRandomExercisesOfType(muscleGroupType, 5));
            }

            return exercises;
        }

        public abstract TrainingProgram GetProgram();
    }
}
