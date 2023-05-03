import { Grid, GridProps, Box, Typography } from "@mui/material";
import TrainingProgramsCard from "./trainingProgramsCard/TrainingProgramsCard";
//import { useQuery } from "react-query";
import TrainingProgramService from "../../../serverInteraction/services/TrainingProgramService";
import { Loader } from "../../common/loader/Loader";
import { useInfiniteQuery } from "react-query";
import { useInView } from "react-intersection-observer";
import React from "react";
import { AxiosError } from "axios";

export default function ProductList({ ...other }: GridProps) {
  const { ref, inView } = useInView();

  const {
    status,
    data,
    error,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    ["qweasd"],
    async ({ pageParam = 0 }) => {
      return await TrainingProgramService.getAll(pageParam);
    },
    {
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.offset + lastPage.limit < lastPage.totalItems) {
          return lastPage.offset + lastPage.limit;
        }
        return undefined;
      },
    }
  );

  React.useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  if (isLoading || data === undefined) {
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
          page.items.map((trainingProgram) => (
            <Grid key={trainingProgram.id} item xs={12} sm={6} md={4}>
              <TrainingProgramsCard trainingProgram={trainingProgram} />
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
