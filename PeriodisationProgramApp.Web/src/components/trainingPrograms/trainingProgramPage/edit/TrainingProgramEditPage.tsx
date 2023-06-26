import {
  Grid,
  Typography,
  Button,
  FormLabel,
  FormControlLabel,
  Switch,
  TextField,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { Loader } from "../../../common/loader/Loader";
import { AxiosError } from "axios";
import SaveIcon from "@mui/icons-material/Save";
import { PageContent } from "../../../common/pageContent/PageContent";
import { PageContentPanel } from "../../../common/pageContent/PageContentPanel";
import useTrainingProgram from "../../../../context/entityContext/entities/trainingProgram/useTrainingProgram";
import { TrainingProgramPageSchedule } from "../TrainingProgramPageSchedule";
import { TrainingScheduleProvider } from "../../../../context/trainingScheduleContext/TrainingScheduleContextProvider";
import { PageHeader } from "../../../common/pageHeader/PageHeader";
import { TrainingProgram } from "../../../../types/enitities/TrainingProgram";
import { Controller, useForm } from "react-hook-form";
import { UpdateTrainingProgramProps } from "../../../../types/services/trainingProgram/UpdateTrainingProgramProps";
import { PageTitle } from "../../../common/pageTitle/PageTitle";

type Params = {
  id: string;
};

export function TrainingProgramEditPage() {
  const { id } = useParams<Params>();
  const { status, trainingProgram, error, isLoading, update, isUpdating } =
    useTrainingProgram(id!);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TrainingProgram>({
    mode: "onBlur",
    reValidateMode: "onBlur",
    values: trainingProgram,
  });

  const onSubmit = async (trainingProgram: TrainingProgram) => {
    const editedTrainingProgram: UpdateTrainingProgramProps = {
      name: trainingProgram.name,
      description: trainingProgram.description,
      isPublic: trainingProgram.isPublic,
      sessions: trainingProgram.sessions,
      trainingLevel: trainingProgram.trainingLevel,
      numberOfSessions: trainingProgram.numberOfSessions,
    };

    await update(editedTrainingProgram);
  };

  if (isLoading || trainingProgram === undefined) {
    return <Loader />;
  }

  if (status === "error" && error instanceof AxiosError) {
    return (
      <Typography variant="h6" align="center">
        Error: {error.message}
      </Typography>
    );
  }

  const pageContentPanel = () => {
    return (
      <PageContentPanel>
        <Button
          variant="contained"
          startIcon={<SaveIcon />}
          sx={{ width: 100 }}
          onClick={handleSubmit(onSubmit)}
        >
          {isUpdating ? "Saving..." : "Save"}
        </Button>
      </PageContentPanel>
    );
  };

  return (
    <>
      <PageTitle title={`Edit ${trainingProgram.name} | Training Programs`} />
      <PageContent pageContentPanel={pageContentPanel()}>
        <Grid item xs={12} sm={12} md={12}>
          <PageHeader text={`Edit ${trainingProgram.name}`} />
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <FormLabel>General</FormLabel>
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
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
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
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
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <FormLabel>Schedule</FormLabel>
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <TrainingScheduleProvider>
            <Controller
              control={control}
              name="sessions"
              render={({ field: { onChange, value } }) => (
                <TrainingProgramPageSchedule
                  numberOfSessions={trainingProgram.numberOfSessions}
                  sessions={value}
                  handleChange={onChange}
                  isEditMode
                />
              )}
            />
          </TrainingScheduleProvider>
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <FormLabel>Is Public</FormLabel>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <Controller
            control={control}
            name="isPublic"
            render={({ field: { onChange, value } }) => (
              <FormControlLabel
                id="isPublic"
                control={
                  <Switch color="primary" checked={value} onChange={onChange} />
                }
                label="Public"
              />
            )}
          />
        </Grid>
      </PageContent>
    </>
  );
}
