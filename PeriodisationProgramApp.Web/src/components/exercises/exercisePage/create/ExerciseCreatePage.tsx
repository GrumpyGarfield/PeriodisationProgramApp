import { PageContentPanel } from "../../../common/pageContent/PageContentPanel";
import { PageContent } from "../../../common/pageContent/PageContent";
import { PageHeader } from "../../../common/pageHeader/PageHeader";
import {
  FormControlLabel,
  FormLabel,
  Grid,
  Stack,
  Switch,
  TextField,
} from "@mui/material";
import { FormStepper, StepProps } from "../../../common/stepper/FormStepper";
import { CreateExerciseProps } from "../../../../types/services/exercise/CreateExerciseProps";
import { Controller, useForm } from "react-hook-form";
import { ControlledRadioGroup } from "../../../common/inputs/ControlledRadioGroup";
import useEnumHelper from "../../../../helpers/useEnumHelper";
import { ExerciseType } from "../../../../enums/ExerciseType";
import useMuscleGroupRoles from "../../../../hooks/useMuscleGroupRoles";
import { MuscleGroupsProvider } from "../../../../context/entityContext/entities/muscleGroup/MuscleGroupsContextProvider";
import { ExerciseCreatePageMuscleGroups } from "./ExerciseCreatePageMuscleGroups";
import { MuscleGroupRole } from "../../../../enums/MuscleGroupRole";
import InfoPopover from "../../../common/popover/InfoPopover";
import { RsmIndexInfo } from "../../../info/RsmIndexInfo";
import { FmIndexInfo } from "../../../info/FmIndexInfo";
import useCreate from "../../../../serverInteraction/hooks/entity/useCreate";
import { Exercise } from "../../../../types/enitities/Exercise";

export function ExerciseCreatePage() {
  const entityName = "exercise";
  const { create } = useCreate<CreateExerciseProps, Exercise>(entityName);
  const {
    control,
    register,
    handleSubmit,
    trigger,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<CreateExerciseProps>({
    mode: "onBlur",
    reValidateMode: "onBlur",
    defaultValues: {
      type: ExerciseType.Compound,
      rawStimulusMagnitude: 5,
      fatigueMagnitude: 5,
    },
  });
  const { translate, getValuesOfEnum } = useEnumHelper();
  const {
    targetMuscleGroupId,
    setTargetMuscleGroupId,
    majorSynergistIds,
    setMajorSynergistIds,
    minorSynergistIds,
    setMinorSynergistIds,
  } = useMuscleGroupRoles();

  const validate = async (fields: (keyof CreateExerciseProps)[]) => {
    const exerciseMuscleGroupsIndex = fields.indexOf("exerciseMuscleGroups");

    if (exerciseMuscleGroupsIndex > -1) {
      if (targetMuscleGroupId === "") {
        setError("exerciseMuscleGroups", {
          message: "Must select target muscle group",
        });
        return false;
      }

      clearErrors("exerciseMuscleGroups");
      fields.splice(exerciseMuscleGroupsIndex, 1);
    }

    return trigger(fields);
  };

  const generalStep = (
    <Grid container spacing={4} sx={{ py: 3 }}>
      <Grid item xs={12}>
        <Stack spacing={2}>
          <FormLabel>Name your exercise</FormLabel>
          <TextField
            required
            fullWidth
            id="name"
            label="Name"
            autoComplete="name"
            {...register("name", {
              required: "Enter exercise name",
              minLength: {
                value: 3,
                message: "Name length must be more than 3 symbols",
              },
              maxLength: {
                value: 100,
                message: "Name length must be less than 100 symbols",
              },
            })}
            helperText={errors.name?.message}
            error={errors.name !== undefined}
          />
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <Stack spacing={2}>
          <FormLabel>Choose exercise type</FormLabel>
          <Controller
            control={control}
            name="type"
            render={({ field: { onChange, value } }) => (
              <ControlledRadioGroup
                id="type"
                value={value}
                items={getValuesOfEnum(ExerciseType, "ExerciseType")}
                onChange={onChange}
                getItemLabel={(item) =>
                  translate("ExerciseType", ExerciseType[item])
                }
              />
            )}
          />
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <Stack spacing={2}>
          <FormLabel>Add a description</FormLabel>
          <TextField
            multiline
            fullWidth
            id="description"
            label="Description"
            autoComplete="description"
            rows={4}
            {...register("description", {
              maxLength: {
                value: 5000,
                message: "Description length must be less than 5000 symbols",
              },
            })}
            helperText={errors.description?.message}
            error={errors.description !== undefined}
          />
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <Stack spacing={2}>
          <FormLabel>Provide youtube link</FormLabel>
          <TextField
            fullWidth
            id="youtubeLink"
            label="Youtube Link"
            autoComplete="youtubeLink"
            {...register("youtubeLink", {
              maxLength: {
                value: 500,
                message: "Youtube Link length must be less than 500 symbols",
              },
              pattern: {
                value:
                  /http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-_]*)(&(amp;)?‌​[\w?‌​=]*)?/,
                message: "Invalid link",
              },
            })}
            helperText={errors.youtubeLink?.message}
            error={errors.youtubeLink !== undefined}
          />
        </Stack>
      </Grid>
    </Grid>
  );

  const muscleGroupsStep = (
    <Grid container spacing={4} sx={{ py: 3 }}>
      <MuscleGroupsProvider>
        <ExerciseCreatePageMuscleGroups
          targetMuscleGroupId={targetMuscleGroupId}
          setTargetMuscleGroupId={setTargetMuscleGroupId}
          majorSynergistIds={majorSynergistIds}
          setMajorSynergistIds={setMajorSynergistIds}
          minorSynergistIds={minorSynergistIds}
          setMinorSynergistIds={setMinorSynergistIds}
          errors={errors}
          validate={() => validate(["exerciseMuscleGroups"])}
        />
      </MuscleGroupsProvider>
    </Grid>
  );

  const indexesStep = (
    <Grid container spacing={4} sx={{ py: 3 }}>
      <Grid item xs={12}>
        <Stack spacing={2}>
          <Stack
            direction="row"
            spacing={1}
            sx={{ display: "flex", alignItems: "center" }}
          >
            <FormLabel>Provide Raw Stimulus Magnitude index (0-9)</FormLabel>
            <InfoPopover>
              <RsmIndexInfo />
            </InfoPopover>
          </Stack>
          <TextField
            type="number"
            fullWidth
            id="rawStimulusMagnitude"
            label="Raw Stimulus Magnitude"
            {...register("rawStimulusMagnitude", {
              required: "Must be between 0 and 9",
              min: { value: 0, message: "Must be between 0 and 9" },
              max: { value: 9, message: "Must be between 0 and 9" },
            })}
            helperText={errors.rawStimulusMagnitude?.message}
            error={errors.rawStimulusMagnitude !== undefined}
          />
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <Stack spacing={2}>
          <Stack
            direction="row"
            spacing={1}
            sx={{ display: "flex", alignItems: "center" }}
          >
            <FormLabel>Provide Fatigue Magnitude index (0-9)</FormLabel>
            <InfoPopover>
              <FmIndexInfo />
            </InfoPopover>
          </Stack>
          <TextField
            type="number"
            fullWidth
            id="fatigueMagnitude"
            label="Fatigue Magnitude"
            {...register("fatigueMagnitude", {
              required: "Must be between 0 and 9",
              min: { value: 0, message: "Must be between 0 and 9" },
              max: { value: 9, message: "Must be between 0 and 9" },
            })}
            helperText={errors.fatigueMagnitude?.message}
            error={errors.fatigueMagnitude !== undefined}
          />
        </Stack>
      </Grid>
    </Grid>
  );

  const finishStep = (
    <Grid container spacing={4} sx={{ py: 3 }}>
      <Grid item xs={12}>
        <Stack spacing={2}>
          <FormLabel>Make exercise public</FormLabel>
          <FormControlLabel
            control={<Switch {...register("isPublic")} color="primary" />}
            label="Public"
          />
        </Stack>
      </Grid>
    </Grid>
  );

  const steps: StepProps<CreateExerciseProps>[] = [
    {
      label: "General",
      content: generalStep,
      requiredFields: ["name", "type"],
    },
    {
      label: "Muscle groups",
      content: muscleGroupsStep,
      requiredFields: ["exerciseMuscleGroups"],
    },
    {
      label: "Indexes",
      content: indexesStep,
      requiredFields: ["rawStimulusMagnitude", "fatigueMagnitude"],
      isOptional: true,
    },
    { label: "Finish", content: finishStep },
  ];

  const onSubmit = async (exercise: CreateExerciseProps) => {
    const createdExercise: CreateExerciseProps = { ...exercise };

    createdExercise.exerciseMuscleGroups = [
      {
        muscleGroupRole: MuscleGroupRole.Target,
        muscleGroupId: targetMuscleGroupId,
      },
    ];

    majorSynergistIds.map((id) =>
      createdExercise.exerciseMuscleGroups.push({
        muscleGroupRole: MuscleGroupRole.MajorSynergist,
        muscleGroupId: id,
      })
    );

    minorSynergistIds.map((id) =>
      createdExercise.exerciseMuscleGroups.push({
        muscleGroupRole: MuscleGroupRole.MinorSynergist,
        muscleGroupId: id,
      })
    );

    await create(createdExercise);
  };

  return (
    <PageContent pageContentPanel={<PageContentPanel />}>
      <PageHeader text="Create Exercise" />
      <FormStepper
        steps={steps}
        handleFinish={handleSubmit(onSubmit)}
        validate={validate}
        errors={errors}
      />
    </PageContent>
  );
}
