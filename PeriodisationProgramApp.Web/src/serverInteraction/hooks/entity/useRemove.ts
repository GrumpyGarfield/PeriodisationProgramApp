import { useMutation } from "react-query";
import { AxiosError } from "axios";
import useAlert from "../../../context/alertContext/useAlert";
import useLoader from "../../../context/loaderContext/useLoader";
import EntityService from "../../services/entity/EntityInteractionService";

const useRemove = (
  entityName: string,
  onSuccess?: (result: boolean) => void,
  onError?: (error: any) => void
) => {
  const { showError } = useAlert();
  const { setIsLoaderOpen: setIsOpen } = useLoader();

  const { mutateAsync, isLoading } = useMutation(EntityService.remove, {
    onMutate: () => {
      setIsOpen(true);
    },
    onSuccess: onSuccess,
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

  const remove = async (id: string) => {
    return mutateAsync({ entityName, id });
  };

  return { remove, isRemoving: isLoading };
};

export default useRemove;
