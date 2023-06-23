import { Box, Grid, Typography, Button } from "@mui/material";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Loader } from "../../common/loader/Loader";
import { AxiosError } from "axios";
import { NavigationButton } from "../../common/navigation/NavigationButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { auth } from "../../../firebase/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Article } from "../../common/text/Article";
import { PageContent } from "../../common/pageContent/PageContent";
import { PageContentPanel } from "../../common/pageContent/PageContentPanel";
import { DeleteDialogModal } from "../../common/modal/DeleteDialogModal";
import { useState } from "react";
import useTrainingProgram from "../../../context/entityContext/entities/trainingProgram/useTrainingProgram";
import { TrainingProgramPageHeader } from "./TrainingProgramPageHeader";
import { TrainingProgramPageSchedule } from "./TrainingProgramPageSchedule";
import { TrainingScheduleProvider } from "../../../context/trainingScheduleContext/TrainingScheduleContextProvider";
import { PageTitle } from "../../common/pageTitle/PageTitle";

type Params = {
  id: string;
};

export function TrainingProgramPage() {
  const [user] = useAuthState(auth);
  const { id } = useParams<Params>();
  const location = useLocation();
  const { status, trainingProgram, error, isLoading, remove } =
    useTrainingProgram(id!);
  const [isModalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

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

  const handleDelete = async () => {
    setModalOpen(false);
    const result = await remove();

    if (result) {
      navigate("/training-programs");
    }
  };

  const pageContentPanel = () => {
    return (
      <PageContentPanel>
        {trainingProgram.user?.firebaseId === user?.uid ? (
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
              entityName="training program"
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
      <PageTitle title={`${trainingProgram.name} | Training Programs`} />
      <PageContent pageContentPanel={pageContentPanel()}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TrainingProgramPageHeader trainingProgram={trainingProgram} />
          </Grid>
        </Grid>
        {trainingProgram.description !== undefined &&
          trainingProgram.description !== null &&
          trainingProgram.description !== "" && (
            <Box sx={{ pb: 3 }}>
              <Typography variant="h5" sx={{ pb: 3 }}>
                Description
              </Typography>
              <Article text={trainingProgram.description} />
            </Box>
          )}
        <Box sx={{ pb: 3 }}>
          <Typography variant="h5" sx={{ pb: 3 }}>
            Schedule
          </Typography>
          <Grid container spacing={2} columns={2}>
            <Grid item xs={2} sm={2} md={2}>
              <TrainingScheduleProvider>
                <TrainingProgramPageSchedule
                  numberOfSessions={trainingProgram.numberOfSessions}
                  sessions={trainingProgram.sessions}
                />
              </TrainingScheduleProvider>
            </Grid>
          </Grid>
        </Box>
      </PageContent>
    </>
  );
}
