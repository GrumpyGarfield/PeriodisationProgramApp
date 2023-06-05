import { Grid, SelectChangeEvent } from "@mui/material";
import useMuscleGroups from "../../../../context/entityContext/entities/useMuscleGroups";
import useEnumHelper from "../../../../helpers/useEnumHelper";
import { MuscleGroupType } from "../../../../enums/MuscleGroupType";
import { ControlledSelect } from "../../../common/inputs/ControlledSelect";
import { Loader } from "../../../common/loader/Loader";
import { MuscleGroup } from "../../../../types/enitities/MuscleGroup";
import { ControlledSelectMultiple } from "../../../common/inputs/ControlledSelectMultiple";

type Props = {
  targetMuscleGroupId: string;
  setTargetMuscleGroupId: (targetMuscleGroupId: string) => void;
  majorSynergistIds: string[];
  setMajorSynergistIds: (majorSynergistIds: string[]) => void;
  minorSynergistIds: string[];
  setMinorSynergistIds: (minorSynergistIds: string[]) => void;
};

export function ExerciseEditPageMuscleGroups({
  targetMuscleGroupId,
  setTargetMuscleGroupId,
  majorSynergistIds,
  setMajorSynergistIds,
  minorSynergistIds,
  setMinorSynergistIds,
}: Props) {
  const { data: muscleGroups } = useMuscleGroups();
  const { translate } = useEnumHelper();

  const targetMuscleGroupHandleChange = (event: SelectChangeEvent) => {
    setTargetMuscleGroupId(event.target.value);
    setMajorSynergistIds(
      majorSynergistIds.filter((id) => id !== event.target.value)
    );
    setMinorSynergistIds(
      minorSynergistIds.filter((id) => id !== event.target.value)
    );
  };
  const majorSynergistHandleChange = (event: SelectChangeEvent<any>) => {
    setMajorSynergistIds(event.target.value);
    setMinorSynergistIds(
      minorSynergistIds.filter((id) => !event.target.value.includes(id))
    );
  };
  const minorSynergistsHandleChange = (event: SelectChangeEvent<any>) => {
    setMinorSynergistIds(event.target.value);
    setMajorSynergistIds(
      majorSynergistIds.filter((id) => !event.target.value.includes(id))
    );
  };

  const getItemLabel = (item: MuscleGroup) => {
    return translate("MuscleGroupType", MuscleGroupType[item.type]);
  };

  if (muscleGroups === undefined) {
    return <Loader />;
  }

  return (
    <>
      <Grid item xs={3} sm={12} md={4}>
        <ControlledSelect
          label={"Target Muscle Group *"}
          items={muscleGroups.pages[0].items}
          selectedItemKey={targetMuscleGroupId}
          handleChange={targetMuscleGroupHandleChange}
          getItemLabel={getItemLabel}
          keyPropertyName="id"
        />
      </Grid>
      <Grid item xs={12} sm={12} md={4}>
        <ControlledSelectMultiple
          label={"Major Synergists"}
          items={muscleGroups.pages[0].items.filter(
            (item) => item.id !== targetMuscleGroupId
          )}
          selectedItemKeys={majorSynergistIds}
          handleChange={majorSynergistHandleChange}
          getItemLabel={getItemLabel}
          keyPropertyName="id"
        />
      </Grid>
      <Grid item xs={12} sm={12} md={4}>
        <ControlledSelectMultiple
          label={"Minor Synergists"}
          items={muscleGroups.pages[0].items.filter(
            (item) => item.id !== targetMuscleGroupId
          )}
          selectedItemKeys={minorSynergistIds}
          handleChange={minorSynergistsHandleChange}
          getItemLabel={getItemLabel}
          keyPropertyName="id"
        />
      </Grid>
    </>
  );
}
