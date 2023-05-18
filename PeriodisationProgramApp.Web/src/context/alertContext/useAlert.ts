import { useAlertContext } from "./AlertContextProvider";
import { AlertColor } from "@mui/material";

export const useAlert = () => {
  const { isOpen, setIsOpen, message, setMessage, severity, setSeverity } =
    useAlertContext();

  const showAlert = (message: string, severity: AlertColor) => {
    setIsOpen(true);
    setMessage(message);
    setSeverity(severity);
  };

  const showError = (message: string) => {
    showAlert(message, "error");
  };

  const showWarning = (message: string) => {
    showAlert(message, "warning");
  };

  const showSuccess = (message: string) => {
    showAlert(message, "success");
  };

  return {
    isOpen,
    setIsOpen,
    message,
    setMessage,
    severity,
    setSeverity,
    showError,
    showWarning,
    showSuccess,
  };
};

export default useAlert;
