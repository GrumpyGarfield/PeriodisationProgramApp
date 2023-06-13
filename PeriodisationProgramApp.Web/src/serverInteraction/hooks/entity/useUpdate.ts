import { useMutation, useQueryClient } from "react-query";
import { AxiosError } from "axios";
import useAlert from "../../../context/alertContext/useAlert";
import { BaseEntity } from "../../../types/enitities/BaseEntity";
import EntityService from "../../services/entity/EntityInteractionService";

const useUpdate = <T1, T2 extends BaseEntity>(
  entityName: string,
  onSuccess?: (entity: T2) => void,
  onError?: (error: any) => void
) => {
  const { showSuccess, showError } = useAlert();
  const queryClient = useQueryClient();

  const { mutateAsync, isLoading } = useMutation(EntityService.update<T1, T2>, {
    onSuccess: onSuccess
      ? onSuccess
      : (entity) => {
          queryClient.setQueryData<T2 | undefined>(
            [entityName, entity.id],
            () => {
              showSuccess("Saved successfully!");
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
  });

  const update = async (id: string, updateProps: T1) => {
    return mutateAsync({ entityName, id, updateProps });
  };

  return { update, isUpdating: isLoading };
};

export default useUpdate;
