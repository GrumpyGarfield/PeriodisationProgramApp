import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import useMuscleGroups from "../../../../context/entityContext/entities/useMuscleGroups";
import useEnumHelper from "../../../../helpers/useEnumHelper";
import { MuscleGroupType } from "../../../../enums/MuscleGroupType";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

type Props = {
  registerTargetMuscleGroup: any;
};

export function ExerciseEditPageMuscleGroups({
  registerTargetMuscleGroup,
}: Props) {
  const { data: muscleGroups } = useMuscleGroups();
  const { translate } = useEnumHelper();

  return (
    <FormControl sx={{ mt: 1, maxWidth: 500 }}>
      <InputLabel id="target-muscle-group-label">
        Target Muscle Group
      </InputLabel>
      <Select
        fullWidth
        labelId="target-muscle-group-label"
        autoComplete="targetMuscleGroup"
        label="Target Muscle Group"
        MenuProps={MenuProps}
        {...registerTargetMuscleGroup}
      >
        {muscleGroups?.pages[0].items.map((muscleGroup) => (
          <MenuItem key={muscleGroup.id} value={muscleGroup.type}>
            {translate("MuscleGroupType", MuscleGroupType[muscleGroup.type])}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
