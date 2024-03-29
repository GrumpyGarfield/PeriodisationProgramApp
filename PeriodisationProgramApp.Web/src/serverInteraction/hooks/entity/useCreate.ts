import { useMutation } from "react-query";
import { AxiosError } from "axios";
import useAlert from "../../../context/alertContext/useAlert";
import { BaseEntity } from "../../../types/enitities/BaseEntity";
import { useNavigate } from "react-router-dom";
import EntityService from "../../services/entity/EntityInteractionService";
import useLoader from "../../../context/loaderContext/useLoader";

const useCreate = <T1, T2 extends BaseEntity>(
  entityName: string,
  onSuccess?: (entity: T2) => void,
  onError?: (error: any) => void
) => {
  const { showError } = useAlert();
  const { setIsLoaderOpen } = useLoader();
  const navigate = useNavigate();

  const { mutateAsync, isLoading } = useMutation(EntityService.create<T1, T2>, {
    onMutate: () => setIsLoaderOpen(true),
    onSuccess: onSuccess
      ? onSuccess
      : (entity) => {
          navigate(`/${entityName}/${entity.id}`);
        },
    onError: onError
      ? onError
      : (error) => {
          console.log(error);

          if (error instanceof AxiosError) {
            showError(error.message);
          }
        },
    onSettled: () => setIsLoaderOpen(false),
  });

  const create = async (createProps: T1) => {
    return mutateAsync({ entityName, createProps });
  };

  return { create, isCreating: isLoading };
};

export default useCreate;
