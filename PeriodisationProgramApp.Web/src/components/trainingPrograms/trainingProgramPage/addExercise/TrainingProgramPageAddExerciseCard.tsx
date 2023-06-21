import {
  Box,
  FormControlLabel,
  Link,
  ListItemText,
  Stack,
} from "@mui/material";
import React from "react";
import { MuscleGroupType } from "../../../../enums/MuscleGroupType";
import { useEnumHelper } from "../../../../helpers/useEnumHelper";
import { Exercise } from "../../../../types/enitities/Exercise";
import { ExerciseType } from "../../../../enums/ExerciseType";
import { Link as RouterLink } from "react-router-dom";
import { Star } from "@mui/icons-material";
import { TogglePlate } from "../../../common/toggle/TogglePlate";

type Props = {
  exercise: Exercise;
  selectedExercise: Exercise;
  handleSelect: (...event: any[]) => void;
};

export default function TrainingProgramPageAddExerciseCard({
  exercise,
  selectedExercise,
  handleSelect,
}: Props) {
  const { translate } = useEnumHelper();

  return (
    <TogglePlate
      item={exercise}
      value={selectedExercise}
      onChange={handleSelect}
      selected={
        selectedExercise !== undefined && exercise.id === selectedExercise.id
      }
      color="success"
      sx={{ p: 0, width: "100%", textAlign: "inherit", textTransform: "none" }}
    >
      <Stack spacing={2} sx={{ p: 2, width: "100%" }}>
        <Stack
          direction="row"
          flexWrap="wrap-reverse"
          alignItems="start"
          justifyContent="space-between"
        >
          <ListItemText
            primary={
              <Link
                underline="hover"
                component={RouterLink}
                to={`/exercises/${exercise.id}`}
              >
                {exercise.name}
              </Link>
            }
            secondary={`${translate(
              "MuscleGroupType",
              MuscleGroupType[exercise.targetMuscleGroup.type]
            )}, ${translate("ExerciseType", ExerciseType[exercise.type])}`}
            sx={{ m: 0, maxWidth: "calc(100% - 50px)" }}
          />
          <FormControlLabel
            control={<Star sx={{ pr: 0.5 }} color="secondary" />}
            label={exercise.rating.toFixed(1)}
            sx={{ mr: 0, pointerEvents: "none" }}
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
            {exercise.exerciseUserData
              ? exercise.exerciseUserData.rawStimulusMagnitude
              : exercise.rawStimulusMagnitude}
          </Box>
          <Box>
            FM:{" "}
            {exercise.exerciseUserData
              ? exercise.exerciseUserData.fatigueMagnitude
              : exercise.fatigueMagnitude}
          </Box>
          <Box>
            SFR:{" "}
            {exercise.exerciseUserData
              ? exercise.exerciseUserData.stimulusToFatigueRatio.toFixed(1)
              : exercise.stimulusToFatigueRatio.toFixed(1)}
          </Box>
        </Stack>
      </Stack>
    </TogglePlate>
  );
}
