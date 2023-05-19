import TrainingProgramService from "../../../serverInteraction/services/TrainingProgramService";
import useEntities from "../useEntities";
import { TrainingProgram } from "../../../types/enitities/TrainingProgram";
import { PagedResult } from "../../../types/PagedResult";
import { InfiniteData, useMutation, useQueryClient } from "react-query";

const useTrainingPrograms = () => {
  const queryClient = useQueryClient();
  const {
    status,
    data,
    error,
    isLoading,
    isFetching,
    isRefetching,
    isFetchingNextPage,
    isFetchingPreviousPage,
    fetchNextPage,
    hasNextPage,
    filterEntities,
    filters,
    sortParams,
    setSortParams,
    optionalParams,
    setOptionalParams,
    refetch,
  } = useEntities<TrainingProgram>(
    ["trainingPrograms"],
    async ({ pageParam = 0 }): Promise<PagedResult<TrainingProgram>> => {
      return await TrainingProgramService.getAll(
        pageParam,
        9,
        filters,
        sortParams === undefined ? { sortBy: "rating" } : sortParams,
        optionalParams
      );
    }
  );

  const { mutateAsync: like } = useMutation(TrainingProgramService.like, {
    onSuccess: (trainingProgram) => {
      queryClient.setQueryData<InfiniteData<PagedResult<TrainingProgram>>>(
        ["trainingPrograms"],
        (data): InfiniteData<PagedResult<TrainingProgram>> => {
          if (data === undefined) {
            return { pages: [], pageParams: [] };
          }

          data.pages = data.pages.map((page) => {
            page.items = page.items.map((item) =>
              item.id === trainingProgram.id ? trainingProgram : item
            );

            if (Object.hasOwn(optionalParams, "isLiked")) {
              page.items = page.items.filter((item) => item.isLiked);
            }

            return page;
          });

          return data;
        }
      );
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const { mutateAsync: rate } = useMutation(TrainingProgramService.rate, {
    onSuccess: (trainingProgram) => {
      queryClient.setQueryData<InfiniteData<PagedResult<TrainingProgram>>>(
        ["trainingPrograms"],
        (data): InfiniteData<PagedResult<TrainingProgram>> => {
          if (data === undefined) {
            return { pages: [], pageParams: [] };
          }

          data.pages = data.pages.map((page) => {
            page.items = page.items.map((item) =>
              item.id === trainingProgram.id ? trainingProgram : item
            );

            return page;
          });

          return data;
        }
      );
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return {
    status,
    data,
    error,
    isLoading,
    isFetching,
    isRefetching,
    isFetchingNextPage,
    isFetchingPreviousPage,
    fetchNextPage,
    hasNextPage,
    filterTrainingPrograms: filterEntities,
    filters,
    sortParams,
    setSortParams,
    refetch,
    optionalParams,
    setOptionalParams,
    like,
    rate,
  };
};

export default useTrainingPrograms;
