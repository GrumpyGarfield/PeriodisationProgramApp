import {
  Button,
  Container,
  Stack,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { Loader } from "../../../common/loader/Loader";
import { AxiosError } from "axios";
import { NavigationButton } from "../../../common/navigation/NavigationButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { auth } from "../../../../firebase/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import useExercise from "../../../../context/entityContext/entities/exercise/useExercise";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Exercise } from "../../../../types/enitities/Exercise";
import { PageHeader } from "../../../common/pageHeader/PageHeader";
import { EntitiesProvider } from "../../../../context/entityContext/EntitiesContextProvider";
import { ExerciseEditPageMuscleGroups } from "./ExerciseEditPageMuscleGroups";

type Params = {
  id: string;
};

export function ExerciseEditPage() {
  const { id } = useParams<Params>();
  const { status, data: exercise, error, isLoading, update } = useExercise(id!);
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  const parseLines = (value: string | undefined) =>
    value ? value.replace(/(\\n)/g, "\n") : undefined;

  const parseData = (value: Exercise | undefined) => {
    if (value === undefined) {
      return value;
    }

    const newData: Exercise = { ...value };
    newData.description = parseLines(newData.description);
    newData.youtubeLink = newData.youtubeLink
      ? `https://youtu.be/${newData.youtubeLink}`
      : undefined;

    return newData;
  };

  const {
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
    await update(exercise);
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

  return (
    <Container sx={{ margin: 0, p: 2 }} maxWidth={false} disableGutters={true}>
      <Toolbar />
      <NavigationButton text="back" icon={<ArrowBackIcon />} />
      <Stack
        component="form"
        noValidate
        sx={{ flexGrow: 1, p: 3 }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <PageHeader text={`Edit ${exercise.name}`} />
        <TextField
          margin="normal"
          required
          fullWidth
          id="name"
          label="Name"
          autoComplete="name"
          sx={{ maxWidth: 500 }}
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
        <TextField
          margin="normal"
          multiline
          fullWidth
          id="description"
          label="Description"
          autoComplete="description"
          sx={{ maxWidth: 500 }}
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
        <TextField
          margin="normal"
          fullWidth
          id="youtubeLink"
          label="Youtube Link"
          autoComplete="youtubeLink"
          sx={{ maxWidth: 500 }}
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
        <EntitiesProvider>
          <ExerciseEditPageMuscleGroups
            registerTargetMuscleGroup={{ ...register("exerciseMuscleGroups") }}
          />
        </EntitiesProvider>
        <Button
          variant="contained"
          sx={{ mt: 3, mb: 2, maxWidth: 100 }}
          type="submit"
        >
          {isSubmitting ? "Savling..." : "Save"}
        </Button>
      </Stack>
    </Container>
  );
}
