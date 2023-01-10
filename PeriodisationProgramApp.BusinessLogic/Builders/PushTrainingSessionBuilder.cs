using PeriodisationProgramApp.BusinessLogic.Builders.Interfaces;
using PeriodisationProgramApp.Domain.Entities;
using PeriodisationProgramApp.Domain.Interfaces;
using PeriodisationProgramApp.Domain.Enums;
using PeriodisationProgramApp.Domain.Extensions;

namespace PeriodisationProgramApp.BusinessLogic.Builders
{
    public class PushTrainingSessionBuilder : ITrainingSessionBuilder
    {
        private readonly IUnitOfWork _unitOfWork;

        public PushTrainingSessionBuilder(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public TrainingSession GetTrainingSession(List<Exercise> exercises)
        {
            var trainingSession = new TrainingSession();

            var chestExercises = exercises.TargetExercises(MuscleGroupType.Chest);
            var tricepsExercises = exercises.TargetExercises(MuscleGroupType.Triceps);
            var fronDeltsExercises = exercises.TargetExercises(MuscleGroupType.FrontDelts);
            var sideDeltsExercises = exercises.TargetExercises(MuscleGroupType.SideDelts);

            var chest = _unitOfWork.MuscleGroups.GetMuscleGroupByType(MuscleGroupType.Chest);
            var chestSets = (int)Math.Ceiling((double)chest.MinimumEffectiveVolume / 2);
            var chestExercisesNumber = (int)Math.Ceiling((double)chestSets / 4);
            var selectedChestExercises = chestExercises.Take(chestExercisesNumber).ToList();

            for (var i = 0; i < chestExercisesNumber; i++)
            {
                var trainingSessionExercise = new TrainingSessionExercise(selectedChestExercises[i]);
                trainingSessionExercise.Sets = chestSets / chestExercisesNumber + (int)Math.Ceiling((chestSets % chestExercisesNumber - i) / (double)chestExercisesNumber);
                trainingSession.Exercises.Add(trainingSessionExercise);
            }

            return trainingSession;
        }
    }
}
