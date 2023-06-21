import { useForm } from "react-hook-form";
import { TrainingSessionExercise } from "../../../../types/enitities/TrainingSessionExercise";
import { FormStepper, StepProps } from "../../../common/stepper/FormStepper";
import { FormLabel, Stack, TextField } from "@mui/material";
import ExercisesSearch from "../../../exercises/exercisesPage/ExercisesSearch";
import ExercisesFilterSidebar from "../../../exercises/exercisesPage/ExercisesFilterSidebar";
import ExercisesSort from "../../../exercises/exercisesPage/ExercisesSort";
import { ExercisesProvider } from "../../../../context/entityContext/entities/exercise/ExercisesContextProvider";
import TrainingProgramPageAddExerciseList from "./TrainingProgramPageAddExerciseList";
import InfoPopover from "../../../common/popover/InfoPopover";
import { SetsInfo } from "../../../info/SetsInfo";

type Props = {
  onSubmit: (trainingSessionExercise: TrainingSessionExercise) => void;
};

export function TrainingProgramPageAddExerciseModal({ onSubmit }: Props) {
  const {
    control,
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<TrainingSessionExercise>({
    mode: "onBlur",
    reValidateMode: "onBlur",
  });

  const validate = async (fields: (keyof TrainingSessionExercise)[]) => {
    return trigger(fields);
  };

  const addExerciseStep = (
    <ExercisesProvider>
      <Stack
        direction="row"
        flexWrap="wrap-reverse"
        alignItems="center"
        justifyContent="space-between"
        sx={{ mb: 3, mt: 5, px: 2 }}
      >
        <ExercisesSearch />
        <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
          <ExercisesFilterSidebar />
          <ExercisesSort />
        </Stack>
      </Stack>
      <TrainingProgramPageAddExerciseList control={control} />
    </ExercisesProvider>
  );

  const numberOfSetsStep = (
    <Stack spacing={2} sx={{ py: 3 }}>
      <Stack
        direction="row"
        spacing={1}
        sx={{ display: "flex", alignItems: "center" }}
      >
        <FormLabel>Provide number of sets</FormLabel>
        <InfoPopover>
          <SetsInfo />
        </InfoPopover>
      </Stack>
      <TextField
        type="number"
        fullWidth
        id="sets"
        label="Sets"
        {...register("sets", {
          required: "Must be higher than 0",
          min: { value: 1, message: "Must be higher than 0" },
        })}
        helperText={errors.sets?.message}
        error={errors.sets !== undefined}
      />
    </Stack>
  );

  const steps: StepProps<TrainingSessionExercise>[] = [
    {
      label: "Exercise",
      content: addExerciseStep,
      requiredFields: ["exercise"],
    },
    {
      label: "Number of sets",
      content: numberOfSetsStep,
      requiredFields: ["sets"],
    },
  ];

  return (
    <FormStepper
      steps={steps}
      handleFinish={handleSubmit(onSubmit)}
      validate={validate}
      errors={errors}
    />
  );
}
