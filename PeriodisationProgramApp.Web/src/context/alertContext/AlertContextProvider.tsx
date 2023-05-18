import {
  FC,
  PropsWithChildren,
  createContext,
  useContext,
  useState,
} from "react";

import { IAlertContext } from "./IAlertContext";
import { AlertColor } from "@mui/material";

const AlertContext = createContext<IAlertContext | undefined>(undefined);

const useAlertContext = () => {
  const context = useContext<IAlertContext>(
    AlertContext as unknown as React.Context<IAlertContext>
  );

  if (!context) {
    throw new Error("useAlertContext must be used within a AlertProvider");
  }
  return context;
};

const AlertProvider: FC<PropsWithChildren> = (props: PropsWithChildren) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState<string>();
  const [severity, setSeverity] = useState<AlertColor>();

  const AlertContextValue = {
    isOpen,
    setIsOpen,
    message,
    setMessage,
    severity,
    setSeverity,
  };

  return <AlertContext.Provider value={AlertContextValue} {...props} />;
};

export { AlertProvider, useAlertContext };
