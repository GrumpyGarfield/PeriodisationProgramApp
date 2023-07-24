import { Grid, Typography, Button, Card } from "@mui/material";
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
import { PageContentItem } from "../../common/pageContent/PageContentItem";
import Scrollbar from "../../common/scrollbar/Scrollbar";

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

  const [descriptionHeight, setDescriptionHeight] = useState<number>(0);

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
        <Grid item xs={8}>
          <ExercisePageHeader exercise={exercise} />
        </Grid>
        <Grid item xs={4}>
          <ExercisePageIndexCard exercise={exercise} />
        </Grid>
        {exercise.description !== undefined &&
          exercise.description !== null &&
          exercise.description !== "" && (
            <>
              <PageContentItem>
                <Typography variant="h5">Description</Typography>
              </PageContentItem>
              <PageContentItem sm={12} md={exercise.youtubeLink ? 6 : 12}>
                <Card
                  sx={{
                    height:
                      descriptionHeight === 0 ? "100%" : descriptionHeight,
                    py: 3,
                  }}
                >
                  <Scrollbar sx={{ px: 3 }}>
                    <Article text={exercise.description} />
                  </Scrollbar>
                </Card>
              </PageContentItem>
              {exercise.youtubeLink ? (
                <PageContentItem sm={12} md={6}>
                  <Card>
                    <YoutubeEmbed
                      url={exercise.youtubeLink}
                      width={"100%"}
                      height={descriptionHeight}
                      setHeight={setDescriptionHeight}
                    />
                  </Card>
                </PageContentItem>
              ) : null}
            </>
          )}
        <PageContentItem title="Muscle Groups">
          <ExercisePageMuscleGroups
            exerciseMuscleGroups={exercise.exerciseMuscleGroups}
          />
        </PageContentItem>
        <PageContentItem title="Similar Exercises">
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
        </PageContentItem>
      </PageContent>
    </>
  );
}
