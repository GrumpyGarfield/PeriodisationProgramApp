import { useMutation } from "react-query";
import CommunityEntityService from "../serverInteraction/CommunityEntityInteractionService";
import { CommunityEntity } from "../types/enitities/CommunityEntity";
import { AxiosError } from "axios";
import useAlert from "../context/alertContext/useAlert";

const useLike = <T extends CommunityEntity>(
  entity: string,
  onSuccess?: (item: T) => void,
  onError?: (error: any) => void
) => {
  const { showError } = useAlert();

  const { mutateAsync } = useMutation(CommunityEntityService.like<T>, {
    onSuccess: onSuccess,
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
    return mutateAsync({ entity, id, isLiked });
  };

  return { like };
};

export default useLike;
