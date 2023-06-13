import { useLoaderContext } from "./LoaderContextProvider";

export const useLoader = () => {
  const { isOpen: isLoaderOpen, setIsOpen: setIsLoaderOpen } =
    useLoaderContext();

  return {
    isLoaderOpen,
    setIsLoaderOpen,
  };
};

export default useLoader;
