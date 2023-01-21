using PeriodisationProgramApp.BusinessLogic.Builders.Interfaces;
using PeriodisationProgramApp.Domain.Entities;
using PeriodisationProgramApp.Domain.Interfaces;
using PeriodisationProgramApp.Domain.Enums;
using PeriodisationProgramApp.Domain.Extensions;

namespace PeriodisationProgramApp.BusinessLogic.Builders.TrainingSessionBuilders
{
    public abstract class BaseTrainingSessionBuilder : ITrainingSessionBuilder
    {
        protected readonly IUnitOfWork _unitOfWork;
        protected int _mesocycleLength;
        protected int _numberOfWeekSessions;
        protected List<Exercise> _exercises = new List<Exercise>();
        protected List<MuscleGroupType> _muscleGroupTypes = new List<MuscleGroupType>();

        public BaseTrainingSessionBuilder(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public void SetExercises(List<Exercise> exercises)
        {
            _exercises = exercises;
        }

        public void SetMesocycleLength(int mesocycleLength)
        {
            _mesocycleLength = mesocycleLength;
        }

        public void SetNumberOfWeekSessions(int numberOfWeekSessions)
        {
            _numberOfWeekSessions = numberOfWeekSessions;
        }

        public virtual TrainingSession GetTrainingSession(int week, DayOfWeek dayOfWeek, int repsInReserve, bool roundUp)
        {
            var trainingSession = new TrainingSession(week, dayOfWeek, repsInReserve);

            foreach (var muscleGroupType in _muscleGroupTypes)
            {
                var muscleGroupExercises = GetTrainingSessionExercises(muscleGroupType, week, roundUp);
                trainingSession.Exercises.AddRange(muscleGroupExercises);
            }

            RegulateVolume(trainingSession.Exercises);

            return trainingSession;
        }

        protected List<TrainingSessionExercise> GetTrainingSessionExercises(MuscleGroupType muscleGroupType, int week, bool roundUp)
        {
            var trainingSessionExercises = new List<TrainingSessionExercise>();

            var muscleGroup = _unitOfWork.MuscleGroups.GetMuscleGroupByType(muscleGroupType);
            var muscleGroupSets = muscleGroup.GetTrainingSessionSets(week, _mesocycleLength, _numberOfWeekSessions, roundUp);
            var muscleGroupExercisesNumber = (int)Math.Ceiling((double)muscleGroupSets / 4);
            var selectedMuscleGroupExercises = _exercises.TargetExercises(muscleGroupType).Take(muscleGroupExercisesNumber).ToList();

            for (var i = 0; i < muscleGroupExercisesNumber; i++)
            {
                var trainingSessionExercise = new TrainingSessionExercise(selectedMuscleGroupExercises[i]);
                trainingSessionExercise.Sets = muscleGroupSets / muscleGroupExercisesNumber + (int)Math.Ceiling((muscleGroupSets % muscleGroupExercisesNumber - i) / (double)muscleGroupExercisesNumber);
                trainingSessionExercises.Add(trainingSessionExercise);
            }

            return trainingSessionExercises;
        }

        protected void RegulateVolume(List<TrainingSessionExercise> trainingSessionExercises)
        {
            foreach (var muscleGroupType in _muscleGroupTypes)
            {
                var targetVolume = trainingSessionExercises.GetTargetVolume(muscleGroupType) * 1.1;

                while (trainingSessionExercises.GetVolume(muscleGroupType) > targetVolume)
                {
                    trainingSessionExercises.FirstOrDefault(t => t.Exercise!.HasTargetMuscleGroup(muscleGroupType))!.Sets--;
                }
            }
        }
    }
}
