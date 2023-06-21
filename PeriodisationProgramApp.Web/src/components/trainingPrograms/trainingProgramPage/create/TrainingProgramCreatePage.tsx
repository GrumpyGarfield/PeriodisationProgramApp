import { PageContentPanel } from "../../../common/pageContent/PageContentPanel";
import { PageContent } from "../../../common/pageContent/PageContent";
import { PageHeader } from "../../../common/pageHeader/PageHeader";
import {
  FormControlLabel,
  FormLabel,
  Grid,
  Slider,
  Stack,
  Switch,
  TextField,
} from "@mui/material";
import { FormStepper, StepProps } from "../../../common/stepper/FormStepper";
import { Controller, useForm } from "react-hook-form";
import useEnumHelper from "../../../../helpers/useEnumHelper";
import useCreate from "../../../../serverInteraction/hooks/entity/useCreate";
import { useNavigate } from "react-router-dom";
import { CreateTrainingProgramProps } from "../../../../types/services/trainingProgram/CreateTrainingProgramProps";
import { TrainingProgram } from "../../../../types/enitities/TrainingProgram";
import { TrainingProgramType } from "../../../../enums/TrainingProgramType";
import { TogglePlateGroup } from "../../../common/toggle/TogglePlateGroup";
import { TrainingLevel } from "../../../../enums/TrainingLevel";

export function TrainingProgramCreatePage() {
  const entityName = "trainingProgram";
  const navigate = useNavigate();
  const { create } = useCreate<CreateTrainingProgramProps, TrainingProgram>(
    entityName,
    (entity) => {
      navigate(`/training-programs/${entity.id}`);
    }
  );
  const {
    control,
    register,
    handleSubmit,
    trigger,
    getValues,
    formState: { errors },
  } = useForm<CreateTrainingProgramProps>({
    mode: "onBlur",
    reValidateMode: "onBlur",
    defaultValues: {
      numberOfSessions: 2,
      type: TrainingProgramType.UpperLower,
    },
  });
  const { translate } = useEnumHelper();

  const validate = async (fields: (keyof CreateTrainingProgramProps)[]) => {
    return trigger(fields);
  };

  const generalStep = (
    <Grid container spacing={4} sx={{ py: 3 }}>
      <Grid item xs={12}>
        <Stack spacing={2}>
          <FormLabel>Name your program</FormLabel>
          <TextField
            required
            fullWidth
            id="name"
            label="Name"
            autoComplete="name"
            {...register("name", {
              required: "Enter program name",
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
    </Grid>
  );

  const numberOfSessionsStep = (
    <Grid container spacing={4} sx={{ py: 3 }}>
      <Grid item xs={12}>
        <Stack spacing={2}>
          <FormLabel>Choose number of weekly sessions</FormLabel>
          <Controller
            control={control}
            name="numberOfSessions"
            render={({ field: { onChange, value } }) => (
              <Slider
                aria-label="Number of sessions"
                getAriaValueText={(value) => value.toString()}
                step={1}
                valueLabelDisplay="auto"
                marks={[
                  { value: 2, label: "2" },
                  { value: 3, label: "3" },
                  { value: 4, label: "4" },
                  { value: 5, label: "5" },
                  { value: 6, label: "6" },
                ]}
                min={2}
                max={6}
                value={value}
                onChange={onChange}
              />
            )}
          />
        </Stack>
      </Grid>
    </Grid>
  );

  const typeStep = (
    <Grid container spacing={4} sx={{ py: 3 }}>
      <Grid item xs={12}>
        <Stack spacing={2}>
          <FormLabel>Choose training split</FormLabel>
          <Controller
            control={control}
            name="type"
            render={({ field: { onChange, value } }) => (
              <TogglePlateGroup
                value={value}
                onChange={onChange}
                items={[
                  {
                    item: TrainingProgramType.UpperLower,
                    label: translate(
                      "TrainingProgramType",
                      TrainingProgramType[TrainingProgramType.UpperLower]
                    ),
                    icon: "lucide:arrow-up-down",
                    subtitle: "4/6 sessions per week",
                    disabled:
                      getValues("numberOfSessions") !== 4 &&
                      getValues("numberOfSessions") !== 6,
                  },
                  {
                    item: TrainingProgramType.PushPullLegs,
                    label: translate(
                      "TrainingProgramType",
                      TrainingProgramType[TrainingProgramType.PushPullLegs]
                    ),
                    icon: "ph:recycle",
                    subtitle: "6 sessions per week",
                    disabled: getValues("numberOfSessions") !== 6,
                  },
                  {
                    item: TrainingProgramType.FullBody,
                    label: translate(
                      "TrainingProgramType",
                      TrainingProgramType[TrainingProgramType.FullBody]
                    ),
                    icon: "ion:body",
                    subtitle: "2-6 sessions per week",
                  },
                ]}
              />
            )}
          />
        </Stack>
      </Grid>
    </Grid>
  );

  const trainingLevelStep = (
    <Grid container spacing={4} sx={{ py: 3 }}>
      <Grid item xs={12}>
        <Stack spacing={2}>
          <FormLabel>Choose yout training level</FormLabel>
          <Controller
            control={control}
            name="trainingLevel"
            render={({ field: { onChange, value } }) => (
              <TogglePlateGroup
                value={value}
                onChange={onChange}
                items={[
                  {
                    item: TrainingLevel.Beginner,
                    label: translate(
                      "TrainingLevel",
                      TrainingLevel[TrainingLevel.Beginner]
                    ),
                    icon: "carbon:skill-level-basic",
                    subtitle: "0-2 years of training experience",
                  },
                  {
                    item: TrainingLevel.Intermediate,
                    label: translate(
                      "TrainingLevel",
                      TrainingLevel[TrainingLevel.Intermediate]
                    ),
                    icon: "carbon:skill-level-intermediate",
                    subtitle: "3-6 years of training experience",
                  },
                  {
                    item: TrainingLevel.Advanced,
                    label: translate(
                      "TrainingLevel",
                      TrainingLevel[TrainingLevel.Advanced]
                    ),
                    icon: "carbon:skill-level-advanced",
                    subtitle: "6+ years of training experience",
                  },
                ]}
              />
            )}
          />
        </Stack>
      </Grid>
    </Grid>
  );

  const mesocycleLengthStep = (
    <Grid container spacing={4} sx={{ py: 3 }}>
      <Grid item xs={12}>
        <Stack spacing={2}>
          <FormLabel>Choose mesocycle length</FormLabel>
          <Controller
            control={control}
            name="mesocycleLength"
            render={({ field: { onChange, value } }) => (
              <Slider
                aria-label="Mesocycle Length"
                getAriaValueText={(value) => value.toString()}
                step={1}
                valueLabelDisplay="auto"
                marks={[
                  { value: 4, label: "4" },
                  { value: 5, label: "5" },
                  { value: 6, label: "6" },
                  { value: 7, label: "7" },
                  { value: 8, label: "8" },
                ]}
                min={4}
                max={8}
                value={value}
                onChange={onChange}
              />
            )}
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

  const steps: StepProps<CreateTrainingProgramProps>[] = [
    {
      label: "General",
      content: generalStep,
      requiredFields: ["name"],
    },
    {
      label: "Training Level",
      content: trainingLevelStep,
      requiredFields: ["trainingLevel"],
    },
    {
      label: "Weekly Sessions",
      content: numberOfSessionsStep,
      requiredFields: ["numberOfSessions"],
    },
    {
      label: "Training Split",
      content: typeStep,
      requiredFields: ["type"],
    },
    {
      label: "Mesocycle Length",
      content: mesocycleLengthStep,
      requiredFields: ["mesocycleLength"],
    },
    { label: "Finish", content: finishStep },
  ];

  const onSubmit = async (trainingProgram: CreateTrainingProgramProps) => {
    const createdTrainingProgram = { ...trainingProgram };
    await create(createdTrainingProgram);
  };

  return (
    <PageContent pageContentPanel={<PageContentPanel />}>
      <PageHeader text="Create Training Program" />
      <FormStepper
        steps={steps}
        handleFinish={handleSubmit(onSubmit)}
        validate={validate}
        errors={errors}
      />
    </PageContent>
  );
}
