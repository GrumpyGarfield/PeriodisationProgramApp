import { FormLabel, Grid, SelectChangeEvent, Stack } from "@mui/material";
import useMuscleGroups from "../../../../context/entityContext/entities/muscleGroup/useMuscleGroups";
import useEnumHelper from "../../../../helpers/useEnumHelper";
import { MuscleGroupType } from "../../../../enums/MuscleGroupType";
import { ControlledSelect } from "../../../common/inputs/ControlledSelect";
import { Loader } from "../../../common/loader/Loader";
import { MuscleGroup } from "../../../../types/enitities/MuscleGroup";
import { ControlledSelectMultiple } from "../../../common/inputs/ControlledSelectMultiple";
import { FieldErrors } from "react-hook-form";

type Props = {
  targetMuscleGroupId: string;
  setTargetMuscleGroupId: (targetMuscleGroupId: string) => void;
  majorSynergistIds: string[];
  setMajorSynergistIds: (majorSynergistIds: string[]) => void;
  minorSynergistIds: string[];
  setMinorSynergistIds: (minorSynergistIds: string[]) => void;
  errors: FieldErrors;
  validate: () => void;
};

export function ExerciseCreatePageMuscleGroups({
  targetMuscleGroupId,
  setTargetMuscleGroupId,
  majorSynergistIds,
  setMajorSynergistIds,
  minorSynergistIds,
  setMinorSynergistIds,
  errors,
  validate,
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
      <Grid item xs={12}>
        <Stack spacing={2}>
          <FormLabel>Select target muscle group</FormLabel>
          <ControlledSelect
            label={"Target Muscle Group *"}
            items={muscleGroups.items}
            selectedItemKey={targetMuscleGroupId}
            handleChange={targetMuscleGroupHandleChange}
            getItemLabel={getItemLabel}
            keyPropertyName="id"
            error={errors.exerciseMuscleGroups !== undefined}
            errorText="Must select target muscle group"
            onBlur={validate}
          />
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <Stack spacing={2}>
          <FormLabel>Select major synergists</FormLabel>
          <ControlledSelectMultiple
            label={"Major Synergists"}
            items={muscleGroups.items.filter(
              (item) => item.id !== targetMuscleGroupId
            )}
            selectedItemKeys={majorSynergistIds}
            handleChange={majorSynergistHandleChange}
            getItemLabel={getItemLabel}
            keyPropertyName="id"
          />
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <Stack spacing={2}>
          <FormLabel>Select minor synergists</FormLabel>
          <ControlledSelectMultiple
            label={"Minor Synergists"}
            items={muscleGroups.items.filter(
              (item) => item.id !== targetMuscleGroupId
            )}
            selectedItemKeys={minorSynergistIds}
            handleChange={minorSynergistsHandleChange}
            getItemLabel={getItemLabel}
            keyPropertyName="id"
          />
        </Stack>
      </Grid>
    </>
  );
}
