import { Grid, GridProps, Box, Typography } from "@mui/material";
import ExercisesCard from "./exercisesCard/ExercisesCard";
import { Loader } from "../../common/loader/Loader";
import { useInView } from "react-intersection-observer";
import React from "react";
import { AxiosError } from "axios";
import useExercises from "../../../context/entityContext/entities/exercise/useExercises";
import { Exercise } from "../../../types/enitities/Exercise";

export default function ExercisesList({ ...other }: GridProps) {
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
    like,
    rate,
    remove,
  } = useExercises();

  const handleDelete = async (id: string) => {
    return await remove(id);
  };

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
    <div>
      <Grid container spacing={3} {...other}>
        {data.pages.map((page) =>
          page.items.map((exercise: Exercise) => (
            <Grid key={exercise.id} item sm={12} md={6} lg={4} xl={3}>
              <ExercisesCard
                exercise={exercise}
                handleLike={like}
                handleRate={rate}
                handleDelete={handleDelete}
              />
            </Grid>
          ))
        )}
      </Grid>
      <Box ref={ref} sx={{ py: hasNextPage ? 3 : 0 }}>
        {isFetchingNextPage ? <Loader /> : hasNextPage ? <Loader /> : null}
      </Box>
    </div>
  );
}
