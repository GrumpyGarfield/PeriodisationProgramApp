import { MuscleGroup } from "../../../../types/enitities/MuscleGroup";
import { useForm } from "react-hook-form";
import { MuscleGroupIndexData } from "../../../../types/MuscleGroupIndexData";
import useGet from "../../../../serverInteraction/hooks/entity/useGet";
import useUpdateUserData from "../../../../serverInteraction/hooks/communityEntity/useUpdateUserData";

const useMuscleGroup = (id: string) => {
  const entityName = "muscleGroup";

  const {
    status,
    entity: muscleGroup,
    error,
    isLoading,
    isFetching,
    isRefetching,
    refetch,
  } = useGet<MuscleGroup>(entityName, id);

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

  const { updateUserData } = useUpdateUserData(entityName, id);

  const {
    register: registerUserData,
    handleSubmit: handleSubmitUserData,
    formState: { errors: userDataFormErrors },
    setValue: setUserDataValue,
  } = useForm<MuscleGroupIndexData>({
    mode: "onBlur",
    reValidateMode: "onBlur",
    values: parseIndexData(muscleGroup),
  });

  const submitUserData = handleSubmitUserData(updateUserData);

  const userDataOnBlur = (
    value: string,
    fieldName: keyof MuscleGroupIndexData
  ) => {
    if (value === "") {
      setUserDataValue(fieldName, 0);
    }
    submitUserData();
  };

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
    userDataOnBlur,
  };
};

export default useMuscleGroup;
