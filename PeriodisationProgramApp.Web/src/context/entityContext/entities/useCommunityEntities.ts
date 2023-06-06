import { PagedResult } from "../../../types/PagedResult";
import { InfiniteData, useQueryClient } from "react-query";
import { CommunityEntity } from "../../../types/enitities/CommunityEntity";
import useLike from "../../../hooks/useLike";
import useRate from "../../../hooks/useRate";

const useCommunityEntities = <T extends CommunityEntity>(
  entity: string,
  optionalParams?: any
) => {
  const queryClient = useQueryClient();

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
    like,
    rate,
  };
};

export default useCommunityEntities;
