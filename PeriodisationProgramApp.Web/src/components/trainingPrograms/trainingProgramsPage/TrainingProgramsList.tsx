import { Grid, GridProps, Box, Typography } from "@mui/material";
import TrainingProgramsCard from "./trainingProgramsCard/TrainingProgramsCard";
import { Loader } from "../../common/loader/Loader";
import { useInView } from "react-intersection-observer";
import React from "react";
import { AxiosError } from "axios";
import useTrainingPrograms from "../../../context/entityContext/entities/useTrainingPrograms";
import { TrainingProgram } from "../../../types/enitities/TrainingProgram";
import { UserRatingProps } from "../../../types/UserRatingProps";

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

  const handleLike = async (id: string, isLiked: boolean) => {
    return like(id, isLiked).then((trainingProgram) => trainingProgram.isLiked);
  };

  const handleRate = async (
    id: string,
    isRated: boolean,
    rating: number | null
  ) => {
    return rate(id, isRated, rating).then(
      (trainingProgram): UserRatingProps => {
        const result: UserRatingProps = {
          isRated: trainingProgram.isRated,
          rating: trainingProgram.userRating,
        };
        return result;
      }
    );
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
          page.items.map((trainingProgram: TrainingProgram) => (
            <Grid key={trainingProgram.id} item xs={12} sm={6} md={4}>
              <TrainingProgramsCard
                trainingProgram={trainingProgram}
                handleLike={handleLike}
                handleRate={handleRate}
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
