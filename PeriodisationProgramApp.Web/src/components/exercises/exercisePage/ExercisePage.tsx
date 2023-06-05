import {
  Box,
  Container,
  Grid,
  Stack,
  Toolbar,
  Typography,
  Button,
} from "@mui/material";
import { useLocation, useParams } from "react-router-dom";
import { Loader } from "../../common/loader/Loader";
import { AxiosError } from "axios";
import { ExercisePageHeader } from "./ExercisePageHeader";
import { NavigationButton } from "../../common/navigation/NavigationButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ExercisePageIndexCard from "./ExercisePageIndexCard";
import { auth } from "../../../firebase/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import useExercise from "../../../context/entityContext/entities/exercise/useExercise";
import { UserRatingProps } from "../../../types/UserRatingProps";
import ExercisePageMuscleGroups from "./ExercisePageMuscleGroups";
import { EntitiesProvider } from "../../../context/entityContext/EntitiesContextProvider";
import ExercisePageSimilarExercises from "./ExercisePageSimilarExercises";
import { MuscleGroupRole } from "../../../enums/MuscleGroupRole";
import YoutubeEmbed from "../../common/embed/YoutubeEmbed";
import { Article } from "../../common/text/Article";

type Params = {
  id: string;
};

export function ExercisePage() {
  const [user] = useAuthState(auth);
  const { id } = useParams<Params>();
  const location = useLocation();
  const { status, data, error, isLoading, like, rate } = useExercise(id!);

  const handleLike = async (id: string, isLiked: boolean) => {
    return like(id, isLiked).then((exercise) => exercise.isLiked);
  };

  const handleRate = async (
    id: string,
    isRated: boolean,
    rating: number | null
  ) => {
    return rate(id, isRated, rating).then((exercise): UserRatingProps => {
      const result: UserRatingProps = {
        isRated: exercise.isRated,
        rating: exercise.userRating,
      };
      return result;
    });
  };

  const isAuthenticated = user !== null && user !== undefined;

  if (isLoading || data === undefined) {
    return <Loader />;
  }

  if (status === "error" && error instanceof AxiosError) {
    return (
      <Typography variant="h6" align="center">
        Error: {error.message}
      </Typography>
    );
  }

  const targetMuscleGroup = data.exerciseMuscleGroups.find(
    (g) => g.muscleGroupRole === MuscleGroupRole.Target
  );

  return (
    <Container sx={{ margin: 0, p: 2 }} maxWidth={false} disableGutters={true}>
      <Toolbar />
      <Stack
        direction="row"
        flexWrap="wrap-reverse"
        alignItems="center"
        justifyContent="space-between"
      >
        <NavigationButton text="back" icon={<ArrowBackIcon />} />
        {data.user?.firebaseId === user?.uid ? (
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ pr: 3 }}>
            <NavigationButton
              text="edit"
              icon={<EditIcon />}
              to={`${location.pathname}/edit`}
            />
            <Button
              variant="text"
              startIcon={<DeleteIcon />}
              sx={{ width: 100 }}
            >
              Delete
            </Button>
          </Stack>
        ) : null}
      </Stack>
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <ExercisePageHeader
              id={data.id}
              title={data.name}
              likes={data.likes}
              isLiked={data.isLiked}
              rating={data.rating}
              userRatingInfo={{
                isRated: data.isRated,
                rating: data.userRating,
              }}
              handleLike={handleLike}
              handleRate={handleRate}
            />
          </Grid>
          <Grid item xs={4}>
            <ExercisePageIndexCard
              exercise={data}
              isAuthenticated={isAuthenticated}
            />
          </Grid>
        </Grid>
        <Box sx={{ pb: 3 }}>
          <Typography variant="h5" sx={{ pb: 3 }}>
            Description
          </Typography>
          <Grid container spacing={2} columns={2}>
            <Grid item xs={2} sm={2} md={1}>
              <Article text={data.description} />
            </Grid>
            {data.youtubeLink ? (
              <Grid item xs={2} sm={2} md={1}>
                <YoutubeEmbed
                  embedId={data.youtubeLink.split("/").pop()!}
                  width={"100%"}
                />
              </Grid>
            ) : null}
          </Grid>
        </Box>
        <Box sx={{ pb: 3 }}>
          <Typography variant="h5" sx={{ pb: 3 }}>
            Muscle Groups
          </Typography>
          <ExercisePageMuscleGroups
            exerciseMuscleGroups={data.exerciseMuscleGroups}
          />
        </Box>
        <Box sx={{ pb: 3 }}>
          <Typography variant="h5" sx={{ pb: 3 }}>
            Similar Exercises
          </Typography>
          <EntitiesProvider
            initialFilters={[
              {
                name: "targetMuscleGroup",
                value: targetMuscleGroup!.muscleGroup.type,
              },
              {
                name: "id",
                value: `!${data.id}`,
              },
            ]}
          >
            <ExercisePageSimilarExercises id={targetMuscleGroup!.id} />
          </EntitiesProvider>
        </Box>
      </Box>
    </Container>
  );
}
