import {
  FC,
  PropsWithChildren,
  createContext,
  useContext,
  useState,
} from "react";

import { IExerciseContext } from "./IExerciseContext";
import { Exercise } from "../../../../types/enitities/Exercise";

const ExerciseContext = createContext<IExerciseContext | undefined>(undefined);

const useExerciseContext = () => {
  const context = useContext<IExerciseContext>(
    ExerciseContext as unknown as React.Context<IExerciseContext>
  );

  if (!context) {
    throw new Error(
      "useExerciseContext must be used within a ExerciseContextProvider"
    );
  }
  return context;
};

const ExerciseProvider: FC<PropsWithChildren> = (props: PropsWithChildren) => {
  const [isFetching, setIsFetching] = useState(false);
  const [entity, setEntity] = useState<Exercise>();
  const [rawStimulusMagnitude, setRawStimulusMagnitude] = useState<number>();
  const [fatigueMagnitude, setFatigueMagnitude] = useState<number>();
  const [stimulusToFatigueRatio, setStimulusToFatigueRatio] =
    useState<number>();

  const ExerciseContextValue: IExerciseContext = {
    isFetching,
    setIsFetching,
    entity,
    setEntity,
    rawStimulusMagnitude,
    setRawStimulusMagnitude,
    fatigueMagnitude,
    setFatigueMagnitude,
    stimulusToFatigueRatio,
    setStimulusToFatigueRatio,
  };

  return <ExerciseContext.Provider value={ExerciseContextValue} {...props} />;
};

export { ExerciseProvider, useExerciseContext };
