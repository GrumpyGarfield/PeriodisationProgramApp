import { useMutation, useQueryClient } from "react-query";
import { AxiosError } from "axios";
import { CommunityEntity } from "../../../types/enitities/CommunityEntity";
import useAlert from "../../../context/alertContext/useAlert";
import CommunityEntityService from "../../CommunityEntityInteractionService";

const useLike = <T extends CommunityEntity>(
  entityName: string,
  onSuccess?: (item: T) => void,
  onError?: (error: any) => void
) => {
  const queryClient = useQueryClient();
  const { showError } = useAlert();

  const { mutateAsync } = useMutation(CommunityEntityService.like<T>, {
    onSuccess: onSuccess
      ? onSuccess
      : (entity) => {
          queryClient.setQueryData<T | undefined>(
            [entityName, entity.id],
            () => {
              return entity;
            }
          );
        },
    onError: onError
      ? onError
      : (error) => {
          console.log(error);

          if (error instanceof AxiosError) {
            error.response?.status === 401
              ? showError("Sign in or sign up to be able to like and rate")
              : showError(error.message);
          }
        },
  });

  const like = async (id: string, isLiked: boolean) => {
    return mutateAsync({ entityName, id, isLiked });
  };

  return { like };
};

export default useLike;
