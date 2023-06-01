import { useMutation } from "react-query";
import { CommunityEntity } from "../types/enitities/CommunityEntity";
import { AxiosError } from "axios";
import useAlert from "../context/alertContext/useAlert";
import CommunityEntityService from "../serverInteraction/CommunityEntityInteractionService";

const useRate = <T extends CommunityEntity>(
  entity: string,
  onSuccess?: (item: T) => void,
  onError?: (error: any) => void
) => {
  const { showError } = useAlert();

  const { mutateAsync } = useMutation(CommunityEntityService.rate<T>, {
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

  const rate = async (id: string, isRated: boolean, rating: number | null) => {
    return mutateAsync({ entity, id, isRated, rating });
  };

  return { rate };
};

export default useRate;
