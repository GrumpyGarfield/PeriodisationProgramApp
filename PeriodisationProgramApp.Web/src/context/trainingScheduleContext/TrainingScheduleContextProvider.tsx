import {
  FC,
  PropsWithChildren,
  createContext,
  useContext,
  useState,
} from "react";
import { ITrainingScheduleContext } from "./ITrainingScheduleContext";

const TrainingScheduleContext = createContext<
  ITrainingScheduleContext | undefined
>(undefined);

const useTrainingScheduleContext = () => {
  const context = useContext<ITrainingScheduleContext>(
    TrainingScheduleContext as unknown as React.Context<ITrainingScheduleContext>
  );

  if (!context) {
    throw new Error(
      "useTrainingScheduleContext must be used within a TrainingScheduleProvider"
    );
  }
  return context;
};

const TrainingScheduleProvider: FC<PropsWithChildren> = (
  props: PropsWithChildren
) => {
  const [isEditMode, setIsEditMode] = useState(false);

  const TrainingScheduleContextValue = {
    isEditMode,
    setIsEditMode,
  };

  return (
    <TrainingScheduleContext.Provider
      value={TrainingScheduleContextValue}
      {...props}
    />
  );
};

export { TrainingScheduleProvider, useTrainingScheduleContext };
