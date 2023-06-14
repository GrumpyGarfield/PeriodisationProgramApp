import { Grid, GridProps, Box, Typography } from "@mui/material";
import TrainingProgramsCard from "./trainingProgramsCard/TrainingProgramsCard";
import { Loader } from "../../common/loader/Loader";
import { useInView } from "react-intersection-observer";
import React from "react";
import { AxiosError } from "axios";
import useTrainingPrograms from "../../../context/entityContext/entities/trainingProgram/useTrainingPrograms";
import { TrainingProgram } from "../../../types/enitities/TrainingProgram";

export default function TrainingProgramList({ ...other }: GridProps) {
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
  } = useTrainingPrograms();

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
          page.items.map((trainingProgram: TrainingProgram) => (
            <Grid key={trainingProgram.id} item sm={12} md={6} lg={4} xl={3}>
              <TrainingProgramsCard
                trainingProgram={trainingProgram}
                handleLike={like}
                handleRate={rate}
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
