import { useMutation } from "react-query";
import { AxiosError } from "axios";
import useAlert from "../../../context/alertContext/useAlert";
import { BaseEntity } from "../../../types/enitities/BaseEntity";
import { useNavigate } from "react-router-dom";
import EntityService from "../../services/entity/EntityInteractionService";
import useLoader from "../../../context/loaderContext/useLoader";

const useClone = <T extends BaseEntity>(
  entityName: string,
  onSuccess?: (entity: T) => void,
  onError?: (error: any) => void
) => {
  const { showError } = useAlert();
  const { setIsLoaderOpen: setIsOpen } = useLoader();
  const navigate = useNavigate();

  const { mutateAsync, isLoading } = useMutation(EntityService.clone<T>, {
    onMutate: () => {
      setIsOpen(true);
    },
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
    onSettled: () => {
      setIsOpen(false);
    },
  });

  const clone = async (id: string, entity: T) => {
    return mutateAsync({ entityName, id, entity });
  };

  return { clone, isCloning: isLoading };
};

export default useClone;
