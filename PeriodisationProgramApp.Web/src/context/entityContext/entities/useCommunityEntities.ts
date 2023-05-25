import useEntities from "../useEntities";
import { PagedResult } from "../../../types/PagedResult";
import { InfiniteData, useMutation, useQueryClient } from "react-query";
import { CommunityEntity } from "../../../types/enitities/CommunityEntity";
import CommunityEntityService from "../../../serverInteraction/CommunityEntityInteractionService";
import useAlert from "../../alertContext/useAlert";
import { AxiosError } from "axios";
const useCommunityEntities = <T extends CommunityEntity>(entity: string) => {
  const queryClient = useQueryClient();
  const { showError } = useAlert();
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
  } = useEntities<T>(
    [entity],
    async ({ pageParam = 0 }): Promise<PagedResult<T>> => {
      return await CommunityEntityService.getAll<T>(
        entity,
        pageParam,
        9,
        filters,
        sortParams === undefined ? { sortBy: "rating" } : sortParams,
        optionalParams
      );
    }
  );

  const { mutateAsync: mutateLike } = useMutation(
    CommunityEntityService.like<T>,
    {
      onSuccess: (communityEntity) => {
        queryClient.setQueryData<InfiniteData<PagedResult<T>>>(
          [entity],
          (data): InfiniteData<PagedResult<T>> => {
            if (data === undefined) {
              return { pages: [], pageParams: [] };
            }

            data.pages = data.pages.map((page) => {
              page.items = page.items.map((item) =>
                item.id === communityEntity.id ? communityEntity : item
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

        if (error instanceof AxiosError) {
          error.response?.status === 401
            ? showError("Sign in or sign up to be able to like and rate")
            : showError(error.message);
        }
      },
    }
  );

  const { mutateAsync: mutateRate } = useMutation(
    CommunityEntityService.rate<T>,
    {
      onSuccess: (communityEntity) => {
        queryClient.setQueryData<InfiniteData<PagedResult<T>>>(
          [entity],
          (data): InfiniteData<PagedResult<T>> => {
            if (data === undefined) {
              return { pages: [], pageParams: [] };
            }

            data.pages = data.pages.map((page) => {
              page.items = page.items.map((item) =>
                item.id === communityEntity.id ? communityEntity : item
              );

              return page;
            });

            return data;
          }
        );
      },
      onError: (error) => {
        console.log(error);

        if (error instanceof AxiosError) {
          error.response?.status === 401
            ? showError("Sign in or sign up to be able to like and rate")
            : showError(error.message);
        }
      },
    }
  );

  const like = async (id: string, isLiked: boolean) => {
    return mutateLike({ entity, id, isLiked });
  };

  const rate = async (id: string, isRated: boolean, rating: number | null) => {
    return mutateRate({ entity, id, isRated, rating });
  };

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
    filterEntities,
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

export default useCommunityEntities;
