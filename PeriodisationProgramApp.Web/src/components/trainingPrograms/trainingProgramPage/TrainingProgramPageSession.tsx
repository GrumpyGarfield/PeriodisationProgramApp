import { Grid, Typography, Box, Link } from "@mui/material";
import { DropResult } from "react-beautiful-dnd";
import ArrayHelper from "../../../helpers/ArrayHelper";
import { useState } from "react";
import { DayOfWeek } from "../../../enums/DayOfWeek";
import useEnumHelper from "../../../helpers/useEnumHelper";
import { theme } from "../../../styling/Theme";
import { Link as RouterLink } from "react-router-dom";
import { TrainingProgramPageSessionExercisePopover } from "./TrainingProgramPageSessionExercisePopover";
import { TrainingProgramPageSessionExerciseItemProps } from "./TrainingProgramPageSessionExerciseItem";
import TrainingProgramPageSessionExerciseList from "./TrainingProgramPageSessionExerciseList";
import { TrainingSession } from "../../../types/enitities/TrainingSession";
import useTrainingSchedule from "../../../context/trainingScheduleContext/useTrainingSchedule";
import { TrainingProgramPageAddExerciseButton } from "./addExercise/TrainingProgramPageAddExerciseButton";
import { TrainingSessionExercise } from "../../../types/enitities/TrainingSessionExercise";

type Props = {
  trainingSession: TrainingSession;
  handleUpdate: (trainingSession: TrainingSession) => void;
};

const trainingSessionExerciseToItemProps = (
  trainingSessionExercise: TrainingSessionExercise
) => {
  return {
    id: trainingSessionExercise.exercise.id,
    title: (
      <Link
        underline="hover"
        component={RouterLink}
        to={`/exercises/${trainingSessionExercise.exercise.id}`}
      >
        {trainingSessionExercise.exercise.name}
      </Link>
    ),
    subtitle: `${trainingSessionExercise.sets} sets`,
    popover: (
      <TrainingProgramPageSessionExercisePopover
        trainingSessionExercise={trainingSessionExercise}
      />
    ),
  };
};

export function TrainingProgramPageSession({
  trainingSession,
  handleUpdate,
}: Props) {
  const { translate } = useEnumHelper();
  const { isEditMode } = useTrainingSchedule();

  const [items, setItems] = useState<
    TrainingProgramPageSessionExerciseItemProps[]
  >([
    ...trainingSession.exercises
      .sort((a, b) => (a.order > b.order ? 1 : -1))
      .map((trainingSessionExercise) => {
        return trainingSessionExerciseToItemProps(trainingSessionExercise);
      }),
  ]);

  const onDragEnd = ({ destination, source }: DropResult) => {
    if (!destination) return;

    const newItems = ArrayHelper.reorder(
      items,
      source.index,
      destination.index
    );

    setItems(newItems);
    console.log(newItems);

    const updatedTrainingSession = {
      ...trainingSession,
      exercises: trainingSession.exercises.map((exercise) => {
        return {
          ...exercise,
          order: newItems.indexOf(
            newItems.find((i) => i.id === exercise.exercise.id)!
          ),
        };
      }),
    };

    handleUpdate(updatedTrainingSession);
  };

  const onDelete = (index: number) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
    console.log(newItems);

    const updatedTrainingSession = {
      ...trainingSession,
      exercises: trainingSession.exercises
        .filter((exercise) => exercise.order !== index)
        .map((exercise) => {
          return {
            ...exercise,
            order: newItems.indexOf(
              newItems.find((i) => i.id === exercise.exercise.id)!
            ),
          };
        }),
    };

    handleUpdate(updatedTrainingSession);
  };

  const onAdd = (trainingSessionExercise: TrainingSessionExercise) => {
    trainingSessionExercise.order = trainingSession.exercises.length;

    const newItems = [...items];
    newItems.push(trainingSessionExerciseToItemProps(trainingSessionExercise));
    setItems(newItems);

    const updatedTrainingSession = { ...trainingSession };
    updatedTrainingSession.exercises.push(trainingSessionExercise);
    handleUpdate(updatedTrainingSession);
  };

  return (
    <Grid item xs={1}>
      <Typography
        variant="h6"
        sx={{
          p: 2,
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
        }}
      >
        {translate("DayOfWeek", DayOfWeek[trainingSession.dayOfWeek])}
      </Typography>
      <Box className="bg-gray-100">
        <TrainingProgramPageSessionExerciseList
          items={items}
          onDragEnd={onDragEnd}
          onDelete={onDelete}
        />
        {isEditMode && <TrainingProgramPageAddExerciseButton onAdd={onAdd} />}
      </Box>
    </Grid>
  );
}
