import { MuscleGroup } from "../../../types/enitities/MuscleGroup";
import {
  IndexCardList,
  IndexCardListItemProps,
} from "../../common/indexCard/IndexCardList";
import useMuscleGroup from "../../../context/entityContext/entities/muscleGroup/useMuscleGroup";
import { SyntheticEvent } from "react";
import useAuthentication from "../../../hooks/useAuthentication";

type Props = {
  muscleGroup: MuscleGroup;
};

export default function MuscleGroupPageIndexCard({ muscleGroup }: Props) {
  const { isUserAuthenticated } = useAuthentication();
  const { registerUserData, userDataOnBlur, userDataFormErrors } =
    useMuscleGroup(muscleGroup.id);

  const muscleGroupIndexCardListItems: IndexCardListItemProps[] = [
    {
      id: "maintenanceVolume",
      label: "MV",
      tooltip: "Maintenance Volume",
      register: {
        ...registerUserData("maintenanceVolume", {
          min: { value: 0, message: "Must be at least 0" },
          max: { value: 50, message: "Must be lower than 50" },
          valueAsNumber: true,
          onBlur: (event: SyntheticEvent<HTMLInputElement>) =>
            userDataOnBlur(event.currentTarget.value, "maintenanceVolume"),
        }),
      },
      errors: userDataFormErrors,
      readonly: !isUserAuthenticated,
    },
    {
      id: "minimumEffectiveVolume",
      label: "MEV",
      tooltip: "Minimum Effective Volume",
      register: {
        ...registerUserData("minimumEffectiveVolume", {
          min: { value: 0, message: "Must be at least 0" },
          max: { value: 50, message: "Must be lower than 50" },
          valueAsNumber: true,
          onBlur: (event: SyntheticEvent<HTMLInputElement>) =>
            userDataOnBlur(event.currentTarget.value, "minimumEffectiveVolume"),
        }),
      },
      errors: userDataFormErrors,
      readonly: !isUserAuthenticated,
    },
    {
      id: "maximumRecoverableVolume",
      label: "MRV",
      tooltip: "Maximum Recoverable Volume",
      register: {
        ...registerUserData("maximumRecoverableVolume", {
          min: { value: 0, message: "Must be at least 0" },
          max: { value: 50, message: "Must be lower than 50" },
          valueAsNumber: true,
          onBlur: (event: SyntheticEvent<HTMLInputElement>) =>
            userDataOnBlur(
              event.currentTarget.value,
              "maximumRecoverableVolume"
            ),
        }),
      },
      errors: userDataFormErrors,
      readonly: !isUserAuthenticated,
    },
  ];

  return <IndexCardList items={muscleGroupIndexCardListItems} />;
}
