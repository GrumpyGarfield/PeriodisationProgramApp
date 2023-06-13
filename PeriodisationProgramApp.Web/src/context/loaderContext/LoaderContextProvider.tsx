import {
  FC,
  PropsWithChildren,
  createContext,
  useContext,
  useState,
} from "react";

import { ILoaderContext } from "./ILoaderContext";

const LoaderContext = createContext<ILoaderContext | undefined>(undefined);

const useLoaderContext = () => {
  const context = useContext<ILoaderContext>(
    LoaderContext as unknown as React.Context<ILoaderContext>
  );

  if (!context) {
    throw new Error("useLoaderContext must be used within a LoaderProvider");
  }
  return context;
};

const LoaderProvider: FC<PropsWithChildren> = (props: PropsWithChildren) => {
  const [isOpen, setIsOpen] = useState(false);
  const LoaderContextValue = {
    isOpen,
    setIsOpen,
  };

  return <LoaderContext.Provider value={LoaderContextValue} {...props} />;
};

export { LoaderProvider, useLoaderContext };
