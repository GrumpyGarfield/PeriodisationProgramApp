import { AlertColor } from "@mui/material";

export interface IAlertContext {
  isOpen: boolean;
  setIsOpen(state: boolean): void;
  message: string | undefined;
  setMessage(message: string | undefined): void;
  severity: AlertColor | undefined;
  setSeverity(severity: AlertColor | undefined): void;
}
