import { useEffect, useState } from "react";
import { ExerciseMuscleGroup } from "../types/ExerciseMuscleGroup";
import { MuscleGroupRole } from "../enums/MuscleGroupRole";
import { Exercise } from "../types/enitities/Exercise";

const useMuscleGroupRoles = (exercise?: Exercise) => {
  const [targetMuscleGroupId, setTargetMuscleGroupId] = useState<string>("");
  const [majorSynergistIds, setMajorSynergistIds] = useState<string[]>([]);
  const [minorSynergistIds, setMinorSynergistIds] = useState<string[]>([]);

  useEffect(() => {
    if (exercise === undefined) {
      return;
    }

    const targetMuscleGroup = exercise.exerciseMuscleGroups.find(
      (exerciseMuscleGroup: ExerciseMuscleGroup) =>
        exerciseMuscleGroup.muscleGroupRole === MuscleGroupRole.Target
    )!.muscleGroup;

    const majorSynergists = exercise.exerciseMuscleGroups
      .filter(
        (exerciseMuscleGroup: ExerciseMuscleGroup) =>
          exerciseMuscleGroup.muscleGroupRole === MuscleGroupRole.MajorSynergist
      )
      .map((exerciseMuscleGroup) => exerciseMuscleGroup.muscleGroup);

    const minorSynergists = exercise.exerciseMuscleGroups
      .filter(
        (exerciseMuscleGroup: ExerciseMuscleGroup) =>
          exerciseMuscleGroup.muscleGroupRole === MuscleGroupRole.MinorSynergist
      )
      .map((exerciseMuscleGroup) => exerciseMuscleGroup.muscleGroup);

    setTargetMuscleGroupId(targetMuscleGroup.id);
    setMajorSynergistIds(
      majorSynergists.map((majorSynergist) => majorSynergist.id)
    );
    setMinorSynergistIds(
      minorSynergists.map((minorSynergist) => minorSynergist.id)
    );
  }, [exercise]);

  return {
    targetMuscleGroupId,
    setTargetMuscleGroupId,
    majorSynergistIds,
    setMajorSynergistIds,
    minorSynergistIds,
    setMinorSynergistIds,
  };
};

export default useMuscleGroupRoles;
