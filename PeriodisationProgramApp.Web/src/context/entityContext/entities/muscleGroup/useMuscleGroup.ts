import { useMutation } from "react-query";
import { MuscleGroup } from "../../../../types/enitities/MuscleGroup";
import useEntity from "../../useEntity";
import useAlert from "../../../alertContext/useAlert";
import { AxiosError } from "axios";
import { useMuscleGroupContext } from "./MuscleGroupContextProvider";
import { useEffect } from "react";
import MuscleGroupService from "../../../../serverInteraction/services/MuscleGroupService";

const useMuscleGroup = (id: string) => {
  const {
    maintenanceVolume,
    setMaintenanceVolume,
    minimumEffectiveVolume,
    setMinimumEffectiveVolume,
    maximumRecoverableVolume,
    setMaximumRecoverableVolume,
  } = useMuscleGroupContext();

  const { showError } = useAlert();

  const { status, data, error, isLoading, isFetching, isRefetching, refetch } =
    useEntity<MuscleGroup>(
      ["muscleGroup", id],
      async (): Promise<MuscleGroup> => {
        return await MuscleGroupService.get(id);
      }
    );

  const { mutateAsync: mutateUpdateUserData, isLoading: isSubmiting } =
    useMutation(MuscleGroupService.updateUserData<MuscleGroup>, {
      onError: (error) => {
        console.log(error);

        if (error instanceof AxiosError) {
          showError(error.message);
        }
      },
    });

  const updateUserData = async (propName: string, value: number) => {
    const data: any = {
      id,
      maintenanceVolume: maintenanceVolume ? maintenanceVolume : 0,
      minimumEffectiveVolume: minimumEffectiveVolume
        ? minimumEffectiveVolume
        : 0,
      maximumRecoverableVolume: maximumRecoverableVolume
        ? maximumRecoverableVolume
        : 0,
    };

    data[propName] = value;

    return mutateUpdateUserData(data);
  };

  const resetToDefault = async () => {};

  useEffect(() => {
    if (data === undefined) {
      return;
    }

    const mv =
      data.muscleGroupUserData === null
        ? data.maintenanceVolume
        : data.muscleGroupUserData.maintenanceVolume;
    const mev =
      data.muscleGroupUserData === null
        ? data.minimumEffectiveVolume
        : data.muscleGroupUserData.minimumEffectiveVolume;
    const mrv =
      data.muscleGroupUserData === null
        ? data.maximumRecoverableVolume
        : data.muscleGroupUserData.maximumRecoverableVolume;

    setMaintenanceVolume(mv);
    setMinimumEffectiveVolume(mev);
    setMaximumRecoverableVolume(mrv);
  }, [
    data,
    setMaintenanceVolume,
    setMaximumRecoverableVolume,
    setMinimumEffectiveVolume,
  ]);

  return {
    status,
    data,
    error,
    isLoading,
    isFetching,
    isRefetching,
    refetch,
    maintenanceVolume,
    setMaintenanceVolume,
    minimumEffectiveVolume,
    setMinimumEffectiveVolume,
    maximumRecoverableVolume,
    setMaximumRecoverableVolume,
    updateUserData,
    isSubmiting,
    resetToDefault,
  };
};

export default useMuscleGroup;
