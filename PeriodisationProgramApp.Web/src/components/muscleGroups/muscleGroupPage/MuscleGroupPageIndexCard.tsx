import { MuscleGroup } from "../../../types/enitities/MuscleGroup";
import {
  IndexCardList,
  IndexCardListItemProps,
} from "../../common/indexCard/IndexCardList";
import useMuscleGroup from "../../../context/entityContext/entities/muscleGroup/useMuscleGroup";
import { SyntheticEvent } from "react";

type Props = {
  muscleGroup: MuscleGroup;
  isAuthenticated: boolean;
};

export default function MuscleGroupPageIndexCard({
  muscleGroup,
  isAuthenticated,
}: Props) {
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
    },
  ];

  return <IndexCardList items={muscleGroupIndexCardListItems} />;
}
