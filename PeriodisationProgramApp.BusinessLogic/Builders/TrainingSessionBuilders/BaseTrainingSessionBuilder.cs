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

        public virtual void SetExercises()
        {
            foreach (var muscleGroupType in _muscleGroupTypes)
            {
                _exercises.AddRange(_unitOfWork.Exercises.GetRandomExercisesOfTypeForMuscleGroup(muscleGroupType, ExerciseType.Compound, 2));
                _exercises.AddRange(_unitOfWork.Exercises.GetRandomExercisesOfTypeForMuscleGroup(muscleGroupType, ExerciseType.Isolation, 2));
            }
        }

        public virtual TrainingSession GetTrainingSession(int week, DayOfWeek dayOfWeek, bool isEven)
        {
            var repsInReserve = GetRepsInReserve(week);
            var trainingSession = new TrainingSession(week, dayOfWeek, repsInReserve);

            foreach (var muscleGroupType in _muscleGroupTypes)
            {
                var muscleGroupExercises = GetTrainingSessionExercises(muscleGroupType, week, isEven);
                trainingSession.Exercises.AddRange(muscleGroupExercises);
            }

            var exercises = trainingSession.Exercises.OrderBy(e => e.Exercise!.Type)
                                                                    //.ThenBy(e => e.Exercise!.ExerciseMuscleGroups.First(m => m.MuscleGroupRole == MuscleGroupRole.Target))                                                                    
                                                                    .ToList();

            for (var i = 0; i < exercises.Count; i++)
            {
                exercises[i].Order = i;
            }

            return trainingSession;
        }

        protected List<TrainingSessionExercise> GetTrainingSessionExercises(MuscleGroupType muscleGroupType, int week, bool isEven)
        {
            var trainingSessionExercises = new List<TrainingSessionExercise>();

            var muscleGroup = _unitOfWork.MuscleGroups.GetMuscleGroupByType(muscleGroupType);
            var muscleGroupSets = muscleGroup.GetTrainingSessionSets(week, _mesocycleLength, _numberOfWeekSessions, isEven);
            var muscleGroupExercisesNumber = (int)Math.Ceiling((double)muscleGroupSets / 4);
            var selectedMuscleGroupExercises = _exercises.TargetExercises(muscleGroupType).Take(muscleGroupExercisesNumber).ToList();

            if (!selectedMuscleGroupExercises.Any())
            {
                return trainingSessionExercises;
            }

            muscleGroupExercisesNumber = selectedMuscleGroupExercises.Count;

            for (var i = 0; i < muscleGroupExercisesNumber; i++)
            {
                var trainingSessionExerciseSets = muscleGroupSets / muscleGroupExercisesNumber + (int)Math.Ceiling((muscleGroupSets % muscleGroupExercisesNumber - i) / (double)muscleGroupExercisesNumber);
                var trainingSessionExercise = new TrainingSessionExercise()
                {
                    Exercise = selectedMuscleGroupExercises[i],
                    Sets = trainingSessionExerciseSets
                };
                trainingSessionExercises.Add(trainingSessionExercise);
            }

            return trainingSessionExercises;
        }

        private int GetRepsInReserve(int week)
        {
            return (int)Math.Round(3 - 3 * ((double)(week - 1) / (_mesocycleLength - 1)));
        }
    }
}
