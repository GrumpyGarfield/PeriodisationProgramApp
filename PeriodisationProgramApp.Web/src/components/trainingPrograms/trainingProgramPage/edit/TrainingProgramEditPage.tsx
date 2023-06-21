import { Box, Grid, Typography, Button } from "@mui/material";
import { useParams } from "react-router-dom";
import { Loader } from "../../../common/loader/Loader";
import { AxiosError } from "axios";
import SaveIcon from "@mui/icons-material/Save";
import { Article } from "../../../common/text/Article";
import { PageContent } from "../../../common/pageContent/PageContent";
import { PageContentPanel } from "../../../common/pageContent/PageContentPanel";
import useTrainingProgram from "../../../../context/entityContext/entities/trainingProgram/useTrainingProgram";
import { TrainingProgramPageSchedule } from "../TrainingProgramPageSchedule";
import { TrainingScheduleProvider } from "../../../../context/trainingScheduleContext/TrainingScheduleContextProvider";
import { PageHeader } from "../../../common/pageHeader/PageHeader";

type Params = {
  id: string;
};

export function TrainingProgramEditPage() {
  const { id } = useParams<Params>();
  const { status, trainingProgram, error, isLoading } = useTrainingProgram(id!);

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
        >
          Save
        </Button>
      </PageContentPanel>
    );
  };

  return (
    <PageContent pageContentPanel={pageContentPanel()}>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <PageHeader text={`Edit ${trainingProgram.name}`} />
        </Grid>
        <Grid item xs={4}></Grid>
      </Grid>
      <Box sx={{ pb: 3 }}>
        <Typography variant="h5" sx={{ pb: 3 }}>
          Description
        </Typography>
        <Grid container spacing={2} columns={2}>
          <Grid item xs={2} sm={2} md={1}>
            <Article text={trainingProgram.description} />
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ pb: 3 }}>
        <Typography variant="h5" sx={{ pb: 3 }}>
          Schedule
        </Typography>
        <Grid container spacing={2} columns={2}>
          <Grid item xs={2} sm={2} md={2}>
            <TrainingScheduleProvider>
              <TrainingProgramPageSchedule
                numberOfSessions={trainingProgram.numberOfSessions}
                trainingSessions={trainingProgram.sessions}
                isEditMode
              />
            </TrainingScheduleProvider>
          </Grid>
        </Grid>
      </Box>
    </PageContent>
  );
}
