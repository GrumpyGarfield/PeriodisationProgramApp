import { Grid, GridProps, Box, Typography } from "@mui/material";
import { useInView } from "react-intersection-observer";
import React from "react";
import { AxiosError } from "axios";
import useExercises from "../../../../context/entityContext/entities/exercise/useExercises";
import { Loader } from "../../../common/loader/Loader";
import { Exercise } from "../../../../types/enitities/Exercise";
import TrainingProgramPageAddExerciseCard from "./TrainingProgramPageAddExerciseCard";
import Scrollbar from "../../../common/scrollbar/Scrollbar";
import { Control, Controller } from "react-hook-form";
import { TrainingSessionExercise } from "../../../../types/enitities/TrainingSessionExercise";

type Props = {
  control: Control<TrainingSessionExercise, any>;
} & GridProps;

export default function TrainingProgramPageAddExerciseList({
  control,
  ...other
}: Props) {
  const { ref, inView } = useInView();

  const {
    status,
    data,
    error,
    isLoading,
    isFetchingNextPage,
    isRefetching,
    fetchNextPage,
    hasNextPage,
  } = useExercises();

  React.useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  if (
    isLoading ||
    (isRefetching && !isFetchingNextPage) ||
    data === undefined
  ) {
    return <Loader />;
  }

  if (status === "error" && error instanceof AxiosError) {
    return (
      <Typography variant="h6" align="center">
        Error: {error.message}
      </Typography>
    );
  }

  return (
    <Controller
      control={control}
      name="exercise"
      render={({ field: { onChange, value } }) => (
        <Box sx={{ height: "50vh", overflow: "hidden" }}>
          <Scrollbar>
            <Grid container spacing={3} {...other} sx={{ px: 2, py: 1 }}>
              {data.pages.map((page) =>
                page.items.map((exercise: Exercise) => (
                  <Grid key={exercise.id} item sm={12} md={6} lg={4} xl={3}>
                    <TrainingProgramPageAddExerciseCard
                      exercise={exercise}
                      selectedExercise={value}
                      handleSelect={onChange}
                    />
                  </Grid>
                ))
              )}
            </Grid>
            <Box ref={ref} sx={{ py: hasNextPage ? 3 : 0 }}>
              {isFetchingNextPage ? (
                <Loader />
              ) : hasNextPage ? (
                <Loader />
              ) : null}
            </Box>
          </Scrollbar>
        </Box>
      )}
    />
  );
}
