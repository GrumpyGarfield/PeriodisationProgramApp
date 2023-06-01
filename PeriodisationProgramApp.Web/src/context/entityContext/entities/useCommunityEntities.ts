import useEntities from "../useEntities";
import { PagedResult } from "../../../types/PagedResult";
import { InfiniteData, useQueryClient } from "react-query";
import { CommunityEntity } from "../../../types/enitities/CommunityEntity";
import CommunityEntityService from "../../../serverInteraction/CommunityEntityInteractionService";
import useLike from "../../../hooks/useLike";
import useRate from "../../../hooks/useRate";

const useCommunityEntities = <T extends CommunityEntity>(
  entity: string,
  offset: number,
  limit: number
) => {
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
  } = useEntities<T>(
    [entity],
    async ({ pageParam = offset }): Promise<PagedResult<T>> => {
      return await CommunityEntityService.getAll<T>(
        entity,
        pageParam,
        limit,
        filters,
        sortParams === undefined ? { sortBy: "rating" } : sortParams,
        optionalParams
      );
    }
  );

  const { like } = useLike<T>(entity, (communityEntity) => {
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
  });

  const { rate } = useRate<T>(entity, (communityEntity) => {
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
