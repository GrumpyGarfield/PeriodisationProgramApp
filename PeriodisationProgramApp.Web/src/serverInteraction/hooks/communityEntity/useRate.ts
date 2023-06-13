import { useMutation, useQueryClient } from "react-query";
import { CommunityEntity } from "../../../types/enitities/CommunityEntity";
import { AxiosError } from "axios";
import useAlert from "../../../context/alertContext/useAlert";
import CommunityEntityService from "../../CommunityEntityInteractionService";

const useRate = <T extends CommunityEntity>(
  entityName: string,
  onSuccess?: (item: T) => void,
  onError?: (error: any) => void
) => {
  const queryClient = useQueryClient();
  const { showError } = useAlert();

  const { mutateAsync } = useMutation(CommunityEntityService.rate<T>, {
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

  const rate = async (id: string, isRated: boolean, rating: number | null) => {
    return mutateAsync({ entityName, id, isRated, rating });
  };

  return { rate };
};

export default useRate;
