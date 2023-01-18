using PeriodisationProgramApp.BusinessLogic.Builders.Interfaces;
using PeriodisationProgramApp.Domain.Entities;
using PeriodisationProgramApp.Domain.Interfaces;
using PeriodisationProgramApp.Domain.Enums;
using PeriodisationProgramApp.Domain.Extensions;

namespace PeriodisationProgramApp.BusinessLogic.Builders.TrainingSessionBuilders
{
    public class PushTrainingSessionBuilder : BaseTrainingSessionBuilder
    {
        private List<Exercise> _chestExercises = new List<Exercise>();
        private List<Exercise> _tricepsExercises = new List<Exercise>();
        private List<Exercise> _fronDeltsExercises = new List<Exercise>();
        private List<Exercise> _sideDeltsExercises = new List<Exercise>();

        public PushTrainingSessionBuilder(IUnitOfWork unitOfWork) : base(unitOfWork) { }

        public override void SetExercises(List<Exercise> exercises)
        {
            _chestExercises = exercises.TargetExercises(MuscleGroupType.Chest).ToList();
            _tricepsExercises = exercises.TargetExercises(MuscleGroupType.Triceps).ToList();
            _fronDeltsExercises = exercises.TargetExercises(MuscleGroupType.FrontDelts).ToList();
            _sideDeltsExercises = exercises.TargetExercises(MuscleGroupType.SideDelts).ToList();
        }

        public override TrainingSession GetTrainingSession(int week, DayOfWeek dayOfWeek, int repsInReserve)
        {
            var trainingSession = new TrainingSession(week, dayOfWeek, repsInReserve);

            var chest = _unitOfWork.MuscleGroups.GetMuscleGroupByType(MuscleGroupType.Chest);
            var chestSets = (int)Math.Ceiling((double)chest.MinimumEffectiveVolume / 2);
            var chestExercisesNumber = (int)Math.Ceiling((double)chestSets / 4);
            var selectedChestExercises = _chestExercises.Take(chestExercisesNumber).ToList();

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
