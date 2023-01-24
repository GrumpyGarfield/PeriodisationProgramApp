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
        protected TrainingLevel _trainingLevel;
        protected List<Exercise> _exercises = new List<Exercise>();
        protected List<MuscleGroupType> _muscleGroupTypes = new List<MuscleGroupType>();

        public BaseTrainingSessionBuilder(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public void SetExercises()
        {
            foreach (var muscleGroupType in (_muscleGroupTypes))
            {
                _exercises.AddRange(_unitOfWork.Exercises.GetRandomExercisesForMuscleGroup(muscleGroupType, 5));
            }
        }

        public void SetMesocycleLength(int mesocycleLength)
        {
            _mesocycleLength = mesocycleLength;
        }

        public void SetNumberOfWeekSessions(int numberOfWeekSessions)
        {
            _numberOfWeekSessions = numberOfWeekSessions;
        }

        public void SetTrainingLevel(TrainingLevel trainingLevel)
        {
            _trainingLevel = trainingLevel;
        }

        public virtual TrainingSession GetTrainingSession(int week, DayOfWeek dayOfWeek, bool roundUp)
        {
            var repsInReserve = GetRepsInReserve(week);
            var trainingSession = new TrainingSession(week, dayOfWeek, repsInReserve);

            foreach (var muscleGroupType in _muscleGroupTypes)
            {
                var muscleGroupExercises = GetTrainingSessionExercises(muscleGroupType, week, roundUp);
                trainingSession.Exercises.AddRange(muscleGroupExercises);
            }

            return trainingSession;
        }

        protected List<TrainingSessionExercise> GetTrainingSessionExercises(MuscleGroupType muscleGroupType, int week, bool roundUp)
        {
            var trainingSessionExercises = new List<TrainingSessionExercise>();

            var muscleGroup = _unitOfWork.MuscleGroups.GetMuscleGroupByType(muscleGroupType);
            var muscleGroupSets = muscleGroup.GetTrainingSessionSets(week, _mesocycleLength, _numberOfWeekSessions, roundUp);
            var muscleGroupExercisesNumber = (int)Math.Ceiling((double)muscleGroupSets / 4);
            var selectedMuscleGroupExercises = _exercises.TargetExercises(muscleGroupType).Take(muscleGroupExercisesNumber).ToList();

            if (!selectedMuscleGroupExercises.Any())
            {
                return trainingSessionExercises;
            }

            for (var i = 0; i < muscleGroupExercisesNumber; i++)
            {
                var trainingSessionExercise = new TrainingSessionExercise();

                try
                {
                    trainingSessionExercise.Exercise = selectedMuscleGroupExercises[i];
                }
                catch
                {
                    trainingSessionExercise.Exercise = selectedMuscleGroupExercises.Last();
                }

                var existingExercise = trainingSessionExercises.Any() ? trainingSessionExercises.First(t => t.Exercise!.Id == trainingSessionExercise!.Exercise!.Id) : null;
                var trainingSessionExerciseSets = muscleGroupSets / muscleGroupExercisesNumber + (int)Math.Ceiling((muscleGroupSets % muscleGroupExercisesNumber - i) / (double)muscleGroupExercisesNumber);
                
                if (existingExercise != null)
                {
                    existingExercise.Sets += trainingSessionExerciseSets;
                }
                else
                {
                    trainingSessionExercise.Sets = trainingSessionExerciseSets;
                    trainingSessionExercises.Add(trainingSessionExercise);
                }
            }

            return trainingSessionExercises;
        }

        private int GetRepsInReserve(int week)
        {
            return (int)Math.Round(3 - 3 * ((double)(week - 1) / (_mesocycleLength - 1)));
        }
    }
}
