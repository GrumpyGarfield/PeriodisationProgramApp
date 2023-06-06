import { Box, Grid, Typography, Button } from "@mui/material";
import { useLocation, useParams } from "react-router-dom";
import { Loader } from "../../common/loader/Loader";
import { AxiosError } from "axios";
import { ExercisePageHeader } from "./ExercisePageHeader";
import { NavigationButton } from "../../common/navigation/NavigationButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ExercisePageIndexCard from "./ExercisePageIndexCard";
import { auth } from "../../../firebase/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import useExercise from "../../../context/entityContext/entities/exercise/useExercise";
import { UserRatingProps } from "../../../types/UserRatingProps";
import ExercisePageMuscleGroups from "./ExercisePageMuscleGroups";
import ExercisePageSimilarExercises from "./ExercisePageSimilarExercises";
import { MuscleGroupRole } from "../../../enums/MuscleGroupRole";
import YoutubeEmbed from "../../common/embed/YoutubeEmbed";
import { Article } from "../../common/text/Article";
import { PageContent } from "../../common/pageContent/PageContent";
import { PageContentPanel } from "../../common/pageContent/PageContentPanel";
import { ExercisesProvider } from "../../../context/entityContext/entities/exercise/ExercisesContextProvider";

type Params = {
  id: string;
};

export function ExercisePage() {
  const [user] = useAuthState(auth);
  const { id } = useParams<Params>();
  const location = useLocation();
  const { status, exercise, error, isLoading, like, rate } = useExercise(id!);

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

  const targetMuscleGroup = exercise.exerciseMuscleGroups.find(
    (g) => g.muscleGroupRole === MuscleGroupRole.Target
  );

  const pageContentPanel = () => {
    return (
      <PageContentPanel>
        {exercise.user?.firebaseId === user?.uid ? (
          <>
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
          </>
        ) : null}
      </PageContentPanel>
    );
  };

  return (
    <PageContent pageContentPanel={pageContentPanel()}>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <ExercisePageHeader
            id={exercise.id}
            title={exercise.name}
            likes={exercise.likes}
            isLiked={exercise.isLiked}
            rating={exercise.rating}
            userRatingInfo={{
              isRated: exercise.isRated,
              rating: exercise.userRating,
            }}
            handleLike={handleLike}
            handleRate={handleRate}
          />
        </Grid>
        <Grid item xs={4}>
          <ExercisePageIndexCard
            exercise={exercise}
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
            <Article text={exercise.description} />
          </Grid>
          {exercise.youtubeLink ? (
            <Grid item xs={2} sm={2} md={1}>
              <YoutubeEmbed
                embedId={exercise.youtubeLink.split("/").pop()!}
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
          exerciseMuscleGroups={exercise.exerciseMuscleGroups}
        />
      </Box>
      <Box sx={{ pb: 3 }}>
        <Typography variant="h5" sx={{ pb: 3 }}>
          Similar Exercises
        </Typography>
        <ExercisesProvider
          initialFilters={[
            {
              name: "targetMuscleGroup",
              value: targetMuscleGroup!.muscleGroup.type,
            },
            {
              name: "id",
              value: `!${exercise.id}`,
            },
          ]}
        >
          <ExercisePageSimilarExercises id={targetMuscleGroup!.id} />
        </ExercisesProvider>
      </Box>
    </PageContent>
  );
}
