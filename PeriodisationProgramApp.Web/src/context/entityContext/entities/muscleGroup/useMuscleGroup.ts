import { useMutation, useQueryClient } from "react-query";
import { MuscleGroup } from "../../../../types/enitities/MuscleGroup";
import useEntity from "../../useEntity";
import useAlert from "../../../alertContext/useAlert";
import { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { MuscleGroupIndexData } from "../../../../types/MuscleGroupIndexData";
import MuscleGroupService from "../../../../serverInteraction/services/MuscleGroupService";

const useMuscleGroup = (id: string) => {
  const { showError } = useAlert();
  const queryClient = useQueryClient();

  const {
    status,
    data: muscleGroup,
    error,
    isLoading,
    isFetching,
    isRefetching,
    refetch,
  } = useEntity<MuscleGroup>(
    ["muscleGroup", id],
    async (): Promise<MuscleGroup> => {
      return await MuscleGroupService.get(id);
    }
  );

  const { mutateAsync: mutateUpdateUserData } = useMutation(
    MuscleGroupService.updateUserData<MuscleGroup>,
    {
      onSuccess: (muscleGroup) => {
        queryClient.setQueryData<MuscleGroup | undefined>(
          ["muscleGroup", id],
          () => {
            return muscleGroup;
          }
        );
      },
      onError: (error) => {
        console.log(error);

        if (error instanceof AxiosError) {
          showError(error.message);
        }
      },
    }
  );

  const parseIndexData = (
    muscleGroup: MuscleGroup | undefined
  ): MuscleGroupIndexData | undefined => {
    if (muscleGroup === undefined) {
      return undefined;
    }

    if (muscleGroup.muscleGroupUserData !== null) {
      return {
        maintenanceVolume: muscleGroup.muscleGroupUserData.maintenanceVolume,
        minimumEffectiveVolume:
          muscleGroup.muscleGroupUserData.minimumEffectiveVolume,
        maximumRecoverableVolume:
          muscleGroup.muscleGroupUserData.maximumRecoverableVolume,
      };
    }

    return {
      maintenanceVolume: muscleGroup.maintenanceVolume,
      minimumEffectiveVolume: muscleGroup.minimumEffectiveVolume,
      maximumRecoverableVolume: muscleGroup.maximumRecoverableVolume,
    };
  };

  const onSubmitUserData = async (
    muscleGroupIndexData: MuscleGroupIndexData
  ) => {
    await mutateUpdateUserData({
      id: id,
      maintenanceVolume: muscleGroupIndexData.maintenanceVolume
        ? muscleGroupIndexData.maintenanceVolume
        : 0,
      minimumEffectiveVolume: muscleGroupIndexData.minimumEffectiveVolume
        ? muscleGroupIndexData.minimumEffectiveVolume
        : 0,
      maximumRecoverableVolume: muscleGroupIndexData.maximumRecoverableVolume
        ? muscleGroupIndexData.maximumRecoverableVolume
        : 0,
    });
  };

  const {
    register: registerUserData,
    handleSubmit: handleSubmitUserData,
    formState: { errors: userDataFormErrors },
  } = useForm<MuscleGroupIndexData>({
    mode: "onBlur",
    reValidateMode: "onBlur",
    values: parseIndexData(muscleGroup),
  });

  const submitUserData = handleSubmitUserData(onSubmitUserData);

  return {
    status,
    muscleGroup,
    error,
    isLoading,
    isFetching,
    isRefetching,
    refetch,
    registerUserData,
    submitUserData,
    userDataFormErrors,
  };
};

export default useMuscleGroup;
