import { Box, Grid, Typography, Button, Card } from "@mui/material";
import { useLocation, useNavigate, useParams } from "react-router-dom";
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
import ExercisePageMuscleGroups from "./ExercisePageMuscleGroups";
import ExercisePageSimilarExercises from "./ExercisePageSimilarExercises";
import YoutubeEmbed from "../../common/embed/YoutubeEmbed";
import { Article } from "../../common/text/Article";
import { PageContent } from "../../common/pageContent/PageContent";
import { PageContentPanel } from "../../common/pageContent/PageContentPanel";
import { ExercisesProvider } from "../../../context/entityContext/entities/exercise/ExercisesContextProvider";
import { DeleteDialogModal } from "../../common/modal/DeleteDialogModal";
import { useState } from "react";
import { PageTitle } from "../../common/pageTitle/PageTitle";
import { SimpleAccordion } from "../../common/accordion/SimpleAccordion";

type Params = {
  id: string;
};

export function ExercisePage() {
  const [user] = useAuthState(auth);
  const { id } = useParams<Params>();
  const location = useLocation();
  const { status, exercise, error, isLoading, remove } = useExercise(id!);
  const [isModalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

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

  const handleDelete = async () => {
    setModalOpen(false);
    const result = await remove();

    if (result) {
      navigate("/exercises");
    }
  };

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
              onClick={() => setModalOpen(true)}
            >
              Delete
            </Button>
            <DeleteDialogModal
              entityName="exercise"
              isOpen={isModalOpen}
              handleClose={() => setModalOpen(false)}
              handleDelete={handleDelete}
            />
          </>
        ) : null}
      </PageContentPanel>
    );
  };

  return (
    <>
      <PageTitle title={`${exercise.name} | Exercises`} />
      <PageContent pageContentPanel={pageContentPanel()}>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <ExercisePageHeader exercise={exercise} />
          </Grid>
          <Grid item xs={4}>
            <ExercisePageIndexCard exercise={exercise} />
          </Grid>
        </Grid>
        {exercise.description !== undefined &&
          exercise.description !== null &&
          exercise.description !== "" && (
            <SimpleAccordion title="Description">
              <Grid container spacing={2} columns={2}>
                <Grid item xs={2} sm={2} md={1}>
                  <Card sx={{ height: "100%" }}>
                    <Article text={exercise.description} />
                  </Card>
                </Grid>
                {exercise.youtubeLink ? (
                  <Grid item xs={2} sm={2} md={1}>
                    <Card>
                      <YoutubeEmbed url={exercise.youtubeLink} width={"100%"} />
                    </Card>
                  </Grid>
                ) : null}
              </Grid>
            </SimpleAccordion>
          )}
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
                value: exercise.targetMuscleGroup.type,
              },
              {
                name: "id",
                value: `!${exercise.id}`,
              },
            ]}
          >
            <ExercisePageSimilarExercises id={exercise.targetMuscleGroup.id} />
          </ExercisesProvider>
        </Box>
      </PageContent>
    </>
  );
}
