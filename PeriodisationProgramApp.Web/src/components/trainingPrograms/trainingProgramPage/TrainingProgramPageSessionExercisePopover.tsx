import { Box, FormControlLabel, ListItemText, Stack } from "@mui/material";
import { TrainingSessionExercise } from "../../../types/enitities/TrainingSessionExercise";
import { Star } from "@mui/icons-material";
import useEnumHelper from "../../../helpers/useEnumHelper";
import { ExerciseType } from "../../../enums/ExerciseType";
import { MuscleGroupType } from "../../../enums/MuscleGroupType";

type Props = {
  trainingSessionExercise: TrainingSessionExercise;
};

export function TrainingProgramPageSessionExercisePopover({
  trainingSessionExercise,
}: Props) {
  const { translate } = useEnumHelper();
  return (
    <Box sx={{ width: "300px", p: 1 }}>
      <Stack
        direction="row"
        flexWrap="wrap-reverse"
        alignItems="start"
        justifyContent="space-between"
      >
        <ListItemText
          primary={trainingSessionExercise.exercise.name}
          secondary={`${translate(
            "MuscleGroupType",
            MuscleGroupType[
              trainingSessionExercise.exercise.targetMuscleGroup.type
            ]
          )}, ${translate(
            "ExerciseType",
            ExerciseType[trainingSessionExercise.exercise.type]
          )}`}
          sx={{ m: 0, maxWidth: "calc(100% - 50px)" }}
        />
        <FormControlLabel
          control={<Star sx={{ pr: 0.5 }} color="secondary" />}
          label={trainingSessionExercise.exercise.rating.toFixed(1)}
          sx={{ mr: 0 }}
        />
      </Stack>
      <Stack
        direction="row"
        flexWrap="wrap-reverse"
        alignItems="start"
        justifyContent="space-between"
        sx={{ pt: 1 }}
      >
        <Box>
          RSM:{" "}
          {trainingSessionExercise.exercise.exerciseUserData
            ? trainingSessionExercise.exercise.exerciseUserData
                .rawStimulusMagnitude
            : trainingSessionExercise.exercise.rawStimulusMagnitude}
        </Box>
        <Box>
          FM:{" "}
          {trainingSessionExercise.exercise.exerciseUserData
            ? trainingSessionExercise.exercise.exerciseUserData.fatigueMagnitude
            : trainingSessionExercise.exercise.fatigueMagnitude}
        </Box>
        <Box>
          SFR:{" "}
          {trainingSessionExercise.exercise.exerciseUserData
            ? trainingSessionExercise.exercise.exerciseUserData.stimulusToFatigueRatio.toFixed(
                1
              )
            : trainingSessionExercise.exercise.stimulusToFatigueRatio.toFixed(
                1
              )}
        </Box>
      </Stack>
    </Box>
  );
}
