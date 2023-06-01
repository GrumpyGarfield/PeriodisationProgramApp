import { MuscleGroup } from "../../../types/enitities/MuscleGroup";
import {
  IndexCardList,
  IndexCardListItemProps,
} from "../../common/indexCard/IndexCardList";
import useMuscleGroup from "../../../context/entityContext/entities/muscleGroup/useMuscleGroup";

type Props = {
  muscleGroup: MuscleGroup;
  isAuthenticated: boolean;
};

export default function MuscleGroupPageIndexCard({
  muscleGroup,
  isAuthenticated,
}: Props) {
  const {
    maintenanceVolume,
    setMaintenanceVolume,
    minimumEffectiveVolume,
    setMinimumEffectiveVolume,
    maximumRecoverableVolume,
    setMaximumRecoverableVolume,
    updateUserData,
  } = useMuscleGroup(muscleGroup.id);

  const muscleGroupIndexCardListItems: IndexCardListItemProps[] = [
    {
      label: "MV",
      tooltip: "Maintenance Volume",
      value: maintenanceVolume,
      onChange: isAuthenticated
        ? (e: React.ChangeEvent<HTMLInputElement>) => {
            const value =
              e.currentTarget.value === ""
                ? 0
                : parseInt(e.currentTarget.value);
            setMaintenanceVolume(value);
            updateUserData("maintenanceVolume", value);
          }
        : undefined,
    },
    {
      label: "MEV",
      tooltip: "Minimum Effective Volume",
      value: minimumEffectiveVolume,
      onChange: isAuthenticated
        ? (e: React.ChangeEvent<HTMLInputElement>) => {
            const value =
              e.currentTarget.value === ""
                ? 0
                : parseInt(e.currentTarget.value);
            setMinimumEffectiveVolume(value);
            updateUserData("minimumEffectiveVolume", value);
          }
        : undefined,
    },
    {
      label: "MRV",
      tooltip: "Maximum Recoverable Volume",
      value: maximumRecoverableVolume,
      onChange: isAuthenticated
        ? (e: React.ChangeEvent<HTMLInputElement>) => {
            const value =
              e.currentTarget.value === ""
                ? 0
                : parseInt(e.currentTarget.value);
            setMaximumRecoverableVolume(value);
            updateUserData("maximumRecoverableVolume", value);
          }
        : undefined,
    },
  ];

  return <IndexCardList items={muscleGroupIndexCardListItems} />;
}
