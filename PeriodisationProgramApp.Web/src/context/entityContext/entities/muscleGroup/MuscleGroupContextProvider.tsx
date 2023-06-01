import {
  FC,
  PropsWithChildren,
  createContext,
  useContext,
  useState,
} from "react";

import { IMuscleGroupContext } from "./IMuscleGroupContext";
import { MuscleGroup } from "../../../../types/enitities/MuscleGroup";

const MuscleGroupContext = createContext<IMuscleGroupContext | undefined>(
  undefined
);

const useMuscleGroupContext = () => {
  const context = useContext<IMuscleGroupContext>(
    MuscleGroupContext as unknown as React.Context<IMuscleGroupContext>
  );

  if (!context) {
    throw new Error(
      "useMuscleGroupContext must be used within a MuscleGroupContextProvider"
    );
  }
  return context;
};

const MuscleGroupProvider: FC<PropsWithChildren> = (
  props: PropsWithChildren
) => {
  const [isFetching, setIsFetching] = useState(false);
  const [entity, setEntity] = useState<MuscleGroup>();
  const [maintenanceVolume, setMaintenanceVolume] = useState<number>();
  const [minimumEffectiveVolume, setMinimumEffectiveVolume] =
    useState<number>();
  const [maximumRecoverableVolume, setMaximumRecoverableVolume] =
    useState<number>();

  const MuscleGroupContextValue: IMuscleGroupContext = {
    isFetching,
    setIsFetching,
    entity,
    setEntity,
    maintenanceVolume,
    setMaintenanceVolume,
    minimumEffectiveVolume,
    setMinimumEffectiveVolume,
    maximumRecoverableVolume,
    setMaximumRecoverableVolume,
  };

  return (
    <MuscleGroupContext.Provider value={MuscleGroupContextValue} {...props} />
  );
};

export { MuscleGroupProvider, useMuscleGroupContext };
