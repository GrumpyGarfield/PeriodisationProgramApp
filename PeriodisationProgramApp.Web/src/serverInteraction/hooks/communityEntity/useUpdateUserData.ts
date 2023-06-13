import { useMutation, useQueryClient } from "react-query";
import { AxiosError } from "axios";
import { CommunityEntity } from "../../../types/enitities/CommunityEntity";
import useAlert from "../../../context/alertContext/useAlert";
import CommunityEntityService from "../../CommunityEntityInteractionService";

const useUpdateUserData = <T1, T2 extends CommunityEntity>(
  entityName: string,
  id: string,
  onSuccess?: (entity: T2) => void,
  onError?: (error: any) => void
) => {
  const queryClient = useQueryClient();
  const { showError } = useAlert();

  const { mutateAsync } = useMutation(
    CommunityEntityService.updateUserData<T1, T2>,
    {
      onSuccess: onSuccess
        ? onSuccess
        : (entity) => {
            queryClient.setQueryData<T2 | undefined>(
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
              showError(error.message);
            }
          },
    }
  );

  const updateUserData = async (updateUserDataProps: T1) => {
    return mutateAsync({ entityName, id, updateUserDataProps });
  };

  return { updateUserData };
};

export default useUpdateUserData;
