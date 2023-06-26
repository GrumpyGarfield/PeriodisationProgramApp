import {
  Button,
  FormControlLabel,
  FormLabel,
  Grid,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { Loader } from "../../../common/loader/Loader";
import { AxiosError } from "axios";
import { auth } from "../../../../firebase/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import useExercise from "../../../../context/entityContext/entities/exercise/useExercise";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { Exercise } from "../../../../types/enitities/Exercise";
import { PageHeader } from "../../../common/pageHeader/PageHeader";
import { ExerciseEditPageMuscleGroups } from "./ExerciseEditPageMuscleGroups";
import { MuscleGroupRole } from "../../../../enums/MuscleGroupRole";
import { UpdateExerciseProps } from "../../../../types/services/exercise/UpdateExerciseProps";
import { ControlledRadioGroup } from "../../../common/inputs/ControlledRadioGroup";
import useEnumHelper from "../../../../helpers/useEnumHelper";
import { ExerciseType } from "../../../../enums/ExerciseType";
import { MuscleGroupsProvider } from "../../../../context/entityContext/entities/muscleGroup/MuscleGroupsContextProvider";
import { PageContentPanel } from "../../../common/pageContent/PageContentPanel";
import { PageContent } from "../../../common/pageContent/PageContent";
import useMuscleGroupRoles from "../../../../hooks/useMuscleGroupRoles";
import SaveIcon from "@mui/icons-material/Save";
import { PageTitle } from "../../../common/pageTitle/PageTitle";

type Params = {
  id: string;
};

export function ExerciseEditPage() {
  const { id } = useParams<Params>();
  const { status, exercise, error, isLoading, update } = useExercise(id!);
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  const { translate, getValuesOfEnum } = useEnumHelper();
  const {
    targetMuscleGroupId,
    setTargetMuscleGroupId,
    majorSynergistIds,
    setMajorSynergistIds,
    minorSynergistIds,
    setMinorSynergistIds,
  } = useMuscleGroupRoles(exercise);

  const parseLines = (value: string | undefined) =>
    value ? value.replace(/(\\n)/g, "\n") : undefined;

  const parseData = (value: Exercise | undefined) => {
    if (value === undefined) {
      return value;
    }

    const newData: Exercise = { ...value };
    newData.description = parseLines(newData.description);

    return newData;
  };

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Exercise>({
    mode: "onBlur",
    reValidateMode: "onBlur",
    values: parseData(exercise),
  });

  useEffect(() => {
    if (loading) {
      return;
    }
    if (user === null || user === undefined) navigate(-1);
  }, [user, loading, navigate, exercise]);

  const onSubmit = async (exercise: Exercise) => {
    const editedExercise: UpdateExerciseProps = {
      name: exercise.name,
      description: exercise.description,
      youtubeLink: exercise.youtubeLink,
      type: exercise.type,
      rawStimulusMagnitude: exercise.rawStimulusMagnitude,
      fatigueMagnitude: exercise.fatigueMagnitude,
      isPublic: exercise.isPublic,
      exerciseMuscleGroups: [
        {
          muscleGroupRole: MuscleGroupRole.Target,
          muscleGroupId: targetMuscleGroupId,
        },
      ],
    };

    majorSynergistIds.map((id) =>
      editedExercise.exerciseMuscleGroups.push({
        muscleGroupRole: MuscleGroupRole.MajorSynergist,
        muscleGroupId: id,
      })
    );

    minorSynergistIds.map((id) =>
      editedExercise.exerciseMuscleGroups.push({
        muscleGroupRole: MuscleGroupRole.MinorSynergist,
        muscleGroupId: id,
      })
    );

    await update(editedExercise);
  };

  if (isLoading || exercise === undefined) {
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
          sx={{ minWidth: 100 }}
          onClick={handleSubmit(onSubmit)}
        >
          {isSubmitting ? "Saving..." : "Save"}
        </Button>
      </PageContentPanel>
    );
  };

  return (
    <>
      <PageTitle title={`Edit ${exercise.name} | Exercises`} />
      <PageContent pageContentPanel={pageContentPanel()}>
        <Grid item xs={12} sm={12} md={12}>
          <PageHeader text={`Edit ${exercise.name}`} />
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
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <Controller
            control={control}
            name="type"
            render={({ field: { onChange, value } }) => (
              <ControlledRadioGroup
                id="type"
                label="Type"
                value={value}
                items={getValuesOfEnum(ExerciseType, "ExerciseType")}
                onChange={onChange}
                getItemLabel={(item) =>
                  translate("ExerciseType", ExerciseType[item])
                }
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <FormLabel>Muscle Groups</FormLabel>
        </Grid>
        <MuscleGroupsProvider>
          <ExerciseEditPageMuscleGroups
            targetMuscleGroupId={targetMuscleGroupId}
            setTargetMuscleGroupId={setTargetMuscleGroupId}
            majorSynergistIds={majorSynergistIds}
            setMajorSynergistIds={setMajorSynergistIds}
            minorSynergistIds={minorSynergistIds}
            setMinorSynergistIds={setMinorSynergistIds}
          />
        </MuscleGroupsProvider>
        <Grid item xs={12} sm={12} md={12}>
          <FormLabel>Base Indexes</FormLabel>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <TextField
            required
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
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <TextField
            required
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
